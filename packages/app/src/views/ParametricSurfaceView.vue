<script setup lang="ts">
import { ref, watch } from "vue"
import { useEventListener, toReactive } from '@vueuse/core';

import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

import type { WebGpuResource, WebGpuState, UseWebGpuOptions } from "@/composables/useWebGpu"

import CodeEditor from '@/components/CodemirrorEditor.vue'
import ShareLinkButton from '@/components/ShareLinkButton.vue'
import ToggleDarkButton from '@/components/ToggleDarkButton.vue'
import ToggleVisibleButton from '@/components/ToggleVisibleButton.vue'
import ExtentInput from '@/components/ExtentInput.vue'
import WebGpuCanvas from '@/components/WebGpuCanvas.vue'

import useCamera from '@/composables/useCamera'

import chroma from 'chroma-js'
import * as wgh from 'webgpu-utils'

import * as A from "@/lib/arrays"

import { PRIMITIVES, normalGridArrays } from "@/lib/graphics/wgsl/meshes"
import { mat4f, remapExtent, type Extent } from "@/lib/tensors"

import { importMath } from "@/lib/graphics/wgsl/shaders"

import type { SourceInfo, FunctionInfo } from "@/lib/graphics/wgsl/shaders/utilities"
import { reflect, elementCount, functionShape } from "@/lib/graphics/wgsl/shaders/utilities"

import * as examples from "@/examples"

type Options = {
  args: Array<number>
  functions: Array<{
    color: string,
    extent: Extent,
    visible: boolean
  }>
}

type State = {
  source: string
  options: Options
}

const stateRef = ref<State>(examples.wave2)

const state = toReactive(stateRef)

const globalUniformSource = `
struct GlobalData {
  projection: mat4x4f,
  view: mat4x4f,
  args: vec4f,
  time: f32,
}
`

const surfaceUniformSource = `
struct SurfaceData {
  model: mat4x4f,
  color: vec4f,
}
`

const uniformSource = `
${globalUniformSource}
${surfaceUniformSource}

@group(0) @binding(0) var<uniform> uGlobal: GlobalData;
@group(0) @binding(1) var<uniform> uSurface: SurfaceData;
`

const surfaceSource: (name: string, shape: [number, number]) => string = (name, [m,n]) => {
  const inputFragment: (n: number) => string = (n) => {
    switch (n) {
      case 1:
        return "vec1f(position.y)"
      case 2:
        return "position.yz"
      case 3:
        return "position.yzw"
      default:
        return "0.0"
    }
  }
  const outputFragment: (m: number) => (x: string) => string = (m) => (x) => {
    switch (m) {
      case 1:
        return `vec4(1.0, ${x}[0], 0.0, 0.0)`
      case 2:
        return `vec4(1.0, ${x}, 0.0)`
      case 3:
        return `vec4(1.0, ${x})`
      default:
        return "vec4(1.0, 0.0, 0.0, 0.0)"
    }
  }
  return `fn surface(position: vec4f) -> vec4f {
  return ${outputFragment(n)(`${name}(${inputFragment(m)})`)};
}`
}

const shaderSource = (transformSource: string, surfaceSource: string) => `
${importMath()}

struct VertexIn {
  @location(0) position: vec4f,
  @location(1) color: vec4f,
}

struct FragmentIn {
  @builtin(position) position: vec4f,
  @location(0) color: vec4f,
}

struct VaryingData {
  position: vec4f,
  color: vec4f,
}

${uniformSource}

${transformSource}

${surfaceSource}

fn fromVertexIn(in: VertexIn) -> VaryingData {
  return VaryingData(
    uGlobal.view * surface(uSurface.model * in.position),
    uSurface.color * in.color,
  );
}

fn toFragmentIn(in: VaryingData) -> FragmentIn {
  return FragmentIn(
    uGlobal.projection * in.position.yzwx,
    in.color,
  );
}

@vertex
fn vertexMain(in: VertexIn) -> FragmentIn {
  return toFragmentIn(fromVertexIn(in));
}

@fragment
fn fragmentMain(in: FragmentIn) -> @location(0) vec4f {
  return in.color;
}
`

type ProcessedSource = {
  source: string,
  info: SourceInfo
}

const processedSource = ref<ProcessedSource | null>(null)

const defs = wgh.makeShaderDataDefinitions(uniformSource);

const uGlobal: wgh.StructuredView = wgh.makeStructuredView(defs.uniforms.uGlobal);

uGlobal.set({
  //transform: scaleToFitContain([1920,1080])
  projection: mat4f.perspective(Math.PI/4, 1920/1080, 0.1, 1000.0),
  view: mat4f.translation([0,0,0]), ///mat4f.mul(mat4f.translation([0,0,1]), mat4f.rotationY(Math.PI/2)), //mat4f.mul(mat4f.rotationZ(Math.PI/2), mat4f.translation([0,0,-1])),
  args: [0,0,0,0],
})

const uSurfaces: Record<number, wgh.StructuredView> = {} 

type GlobalGpuState = {
  uniforms: GPUBuffer
}

type MeshGpuState = {
  vertices: wgh.BuffersAndAttributes
  topology: number
}

type MeshesGpuState = Record<number, MeshGpuState>

type SurfaceGpuState = {
  pipeline: GPURenderPipeline
  bindGroup: GPUBindGroup
  uniforms: GPUBuffer
}

type SurfacesGpuState = Record<number, SurfaceGpuState>

const options: UseWebGpuOptions = {
  alphaMode: 'premultiplied',
  size: [1920, 1080],
  autoResize: false,
}

type WebGpuStatefulResource<T> = WebGpuResource & {
  state: T | null
  valid: boolean
}

const statefulResource = <T>(resource: {
  create: (state: WebGpuState) => T | null,
  delete: (state: WebGpuState, value: T) => void
}) => {
  const result: WebGpuStatefulResource<T> = {
    state: null,
    valid: false,
    onCreate(args) {
      console.log("Resource::onCreate")

      if (result.state) return

      result.state = resource.create(args)
    },
    onUpdate(args) {
      if (!result.valid) {
        result.onDelete?.(args)
        result.onCreate?.(args)
        result.valid = true
      }
    },
    onDelete(args) {
      console.log("Resource::onDelete")
      
      if (!result.state) return

      resource.delete(args, result.state)

      result.state = null
    }
  }
  return result
}

const gridSizes = (n: number) => [
  [],
  [Math.pow(n, 3*2)],
  [Math.pow(n, 3), Math.pow(n, 3)],
  [Math.pow(n, 2), Math.pow(n, 2), Math.pow(n, 2)]
]

const meshes = statefulResource<MeshesGpuState>({
  create({device}) {
    const arrays = gridSizes(3).map(normalGridArrays)
    return arrays.map((a) => {
      const vertices = wgh.createBuffersAndAttributesFromArrays(device, a, {
        shaderLocation: 0,
        stepMode: 'vertex',
        interleave: true,
      })
      const topology = 1
      return {vertices, topology}
    })
  },
  delete({device}, value) {
    // TODO: Destroy buffers.
  },
})

const global = statefulResource<GlobalGpuState>({
  create({device, format}) { 
    const uniforms = device.createBuffer({
      size: uGlobal.arrayBuffer.byteLength,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });
    return {uniforms}
  },
  delete({device}, value) {
    // TODO
  }
})

const surfaces = statefulResource<SurfacesGpuState>({
  create({device, format}) {
    if (!global.state) return null

    if (!meshes.state) return null

    if (!processedSource.value) return null

    const {source, info} = processedSource.value

    return info.functions.map((f, i) => {
      const [m,n] = functionShape(f)

      const module = device.createShaderModule({
        code: shaderSource(
          source,
          surfaceSource(f.name, [m,n])
        )
      })

      const {uniforms: globalUniforms} = global.state!

      const {vertices} = meshes.state![m]

      const pipeline = device.createRenderPipeline({
        layout: 'auto',
        vertex: {
          module,
          entryPoint: 'vertexMain',
          buffers: vertices.bufferLayouts,
        },
        fragment: {
          module,
          entryPoint: 'fragmentMain',
          targets: [{format}],
        },
        primitive: {
          //cullMode: 'back',
          topology: PRIMITIVES[1],
        },
      })

      uSurfaces[i] = wgh.makeStructuredView(defs.uniforms.uSurface);

      const uniforms = device.createBuffer({
          size: uSurfaces[i].arrayBuffer.byteLength,
          usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        });

      const bindGroup = device.createBindGroup({
        layout: pipeline.getBindGroupLayout(0),
        entries: [
          { binding: 0, resource: { buffer: globalUniforms } },
          { binding: 1, resource: { buffer: uniforms } },
          //{ binding: 2, resource: { buffer: shape } },
          //{ binding: 3, resource: { buffer: layer } },
        ],
      })

      return {pipeline, bindGroup, uniforms}
    })
  },
  delete({device}, value) {
  }
})

/*
const pipeline = statefulResource<PipelineState>({
  create({device, format}) {
    if (!processedSource.value) return null

    const {source, info} = processedSource.value

    const [m,n] = functionShape(info.functions[0])
    
    const module = device.createShaderModule({
      code: shaderSource(
        source,
        surfaceSource(m,n)
      )
    })

    if (!mesh.state) return null

    const {vertices} = mesh.state[m]

    const pipeline = device.createRenderPipeline({
      layout: 'auto',
      vertex: {
        module,
        entryPoint: 'vertexMain',
        buffers: vertices.bufferLayouts,
      },
      fragment: {
        module,
        entryPoint: 'fragmentMain',
        targets: [{format}],
      },
      primitive: {
        //cullMode: 'back',
        topology: PRIMITIVES[1],
      },
    })

    const camera = device.createBuffer({
      size: uCamera.arrayBuffer.byteLength,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

    const bindGroup = device.createBindGroup({
      layout: pipeline.getBindGroupLayout(0),
      entries: [
        { binding: 0, resource: { buffer: camera } },
        //{ binding: 1, resource: { buffer: material } },
        //{ binding: 2, resource: { buffer: shape } },
        //{ binding: 3, resource: { buffer: layer } },
      ],
    })

    return {pipeline, bindGroup, camera}
  },
  delete({device}, value) {
    // TODO
  }
})
*/

const { listeners, transformInplace } = useCamera([-8, 0, 0])

const renderer: WebGpuResource = {
  onCreate(args) {
    console.log("ParametricSurfaceView::onCreate")

    global.onUpdate?.(args)

    if (!global.state) return

    meshes.onUpdate?.(args)

    if (!meshes.state) return

    surfaces.onUpdate?.(args)

    if (!surfaces.state) return
  },
  onRender(args) {
    const {device, context, timestamp} = args

    global.onUpdate?.(args)

    if (!global.state) return

    meshes.onUpdate?.(args)

    if (!meshes.state) return

    surfaces.onUpdate?.(args)

    if (!surfaces.state) return

    const commandEncoder = device.createCommandEncoder()

    const pass = commandEncoder.beginRenderPass({
      colorAttachments: [
        {
          clearValue: Float32Array.of(0, 0, 0, 0),
          loadOp: 'clear',
          storeOp: 'store',
          view: context.getCurrentTexture().createView(),
        }
      ]
    })

    //pass.setViewport(0, 0, display[0], display[1], 0, 1)

    if (!processedSource.value) return null

    const {info} = processedSource.value

    const {uniforms: globalUniforms} = global.state

    uGlobal.set({
      args: state.options.args,
      time: timestamp/1000.0
    })

    transformInplace(uGlobal.views.view)

    device.queue.writeBuffer(globalUniforms, 0, uGlobal.arrayBuffer);

    info.functions.forEach((f, i) => {
      const [m,n] = functionShape(f)

      const fOptions = state.options.functions[i]

      if (!fOptions.visible) return

      const {vertices} = meshes.state![m]

      const {pipeline, bindGroup, uniforms: surfaceUniforms} = surfaces.state![i]

      uSurfaces[i].set({
        model: remapExtent(fOptions.extent),
        color: chroma(fOptions.color).gl(),
      })

      device.queue.writeBuffer(surfaceUniforms, 0, uSurfaces[i].arrayBuffer);

      pass.setPipeline(pipeline)

      pass.setBindGroup(0, bindGroup)

      pass.setVertexBuffer(0, vertices.buffers[0])
      pass.setIndexBuffer(vertices.indexBuffer!, vertices.indexFormat!)
      pass.drawIndexed(vertices.numElements)
    })

    pass.end()

    const commandBuffer = commandEncoder.finish()

    device.queue.submit([commandBuffer])
  },
  onDelete(args) {
    console.log("ParametricSurfaceView::Delete")
    
    surfaces.onDelete?.(args)
    meshes.onDelete?.(args)
    global.onDelete?.(args)
  }
}

const preprocess: (source: string) => ProcessedSource = (source) => {
  return {
    source: source.replaceAll("@plot", "/*@plot*/"),
    info: reflect(source)
  }
}

const defaultExtent: (f: FunctionInfo) => Extent = (f) => {
  const n = elementCount(f.domain)
  return [A.full(-1, n), A.full(+1, n)]
}

const defaultOptions: (result: ProcessedSource) => Partial<Options> = ({info}) => {
  return {
    functions: info.functions.map((f) => ({
      name: f.name,
      color: "#ffffff",
      extent: defaultExtent(f),
      visible: true,
    }))
  }
}

const mergeOptions: (value: Partial<Options>, oldValue: Options) => Options = (value, oldValue) => {
  return {
    args: value.args ?? oldValue.args,
    functions: value.functions?.map((f, i) => {
      const g = oldValue.functions[i]
      return {
        color: g?.color ?? f.color,
        extent: [
          f.extent[0].map((e, i) => g?.extent?.[0]?.[i] ?? e),
          f.extent[1].map((e, i) => g?.extent?.[1]?.[i] ?? e),
        ],
        visible: g?.visible ?? f.visible,
      }
    }) ?? oldValue.functions
  }
}

const save = (state: State) => {
  const result = preprocess(state.source)
  processedSource.value = result
  state.options = mergeOptions(defaultOptions(result), state.options)
  surfaces.valid = false
}

const isShortcutSave: (event: KeyboardEvent) => boolean = (event) => {
  switch(event.key) {
    case "Enter":
      return event.shiftKey
    case "s":
    case "S":
      return event.ctrlKey || event.metaKey
    default:
      return false
  }
}

useEventListener(document, 'keydown', (event) => {
  if (isShortcutSave(event)) {
    event.stopPropagation()
    event.preventDefault()
    save(state)
  }
})

watch(stateRef, save, { immediate: true })

const getFunctionInfo: (i: number) => FunctionInfo | undefined = (i) => {
  return processedSource.value?.info?.functions?.[i]
}
</script>

<template>
  <header class="flex flex-row items-center h-12 p-1 border-b-2 border-border">
    <h1 class="px-2">Parametric Surface</h1>
    <span class="flex-grow"></span>
    <ShareLinkButton v-model="stateRef"/>
    <ToggleDarkButton/>
  </header>
  <TabGroup as="main" class="flex-grow flex flex-col overflow-hidden" :default-index="2">
    <TabList class="flex flex-row md:hidden">
      <Tab class="tab">Input</Tab>
      <Tab class="tab">Output</Tab>
    </TabList>
    <TabPanels class="h-full md:grid md:grid-cols-2 border-y-2 border-border">
      <TabPanel class="h-full ui-not-selected:hidden md:ui-not-selected:grid grid grid-rows-1 overflow-hidden" :static="true">
        <CodeEditor v-model="state.source"/>
      </TabPanel>
      <TabPanel class="h-full ui-not-selected:hidden md:ui-not-selected:grid grid grid-rows-2 overflow-hidden" :static="true">
        <Suspense>
          <div class="flex flex-row items-center justify-center overflow-hidden show-focus-within">
            <WebGpuCanvas :renderer :listeners :options/>
          </div>
        </Suspense>
        <div class="flex flex-col p-2">
          <details>
            <summary class="flex flex-row items-center gap-2 my-1">
              <h2>Global</h2>
            </summary>
            <div v-for="i of A.range(0,4)" class="flex flex-row items-center gap-2" :key="i">
              <label class="w-16 text-xs text-right font-mono">args[{{ i }}]:</label>
              <input class="w-16" type="number" step="0.1" v-model="state.options.args[i]"/>
              <input class="flex-grow" type="range" min="-1" max="1" step="0.01" v-model="state.options.args[i]" />
              <!--
              <div class="flex-grow flex flex-row gap-2">
                <label>-1</label>
                <input class="flex-grow" type="range" min="-1" max="1" step="0.01" v-model="state.options.args[i]" />
                <label>+1</label>
              </div>
              -->
            </div>
          </details>
          <details v-for="f, i of state.options.functions" :key="i">
            <summary class="flex flex-row items-center gap-2 my-1">
                <input class="w-8 h-8" name="fill" type="color" v-model="f.color"/>
                <h2 class="flex-grow">
                  {{getFunctionInfo(i)?.name}}: 
                  <span class="text-text text-base">
                    {{getFunctionInfo(i)?.domain?.name}} &rarr; {{getFunctionInfo(i)?.codomain?.name}} 
                  </span>
                </h2>
                <ToggleVisibleButton v-model="f.visible"/>
            </summary>
            <ExtentInput v-model="f.extent"/>
          </details>
        </div>
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>

<style scoped>
.show-focus-within {
  @apply focus-within:outline-none focus-within:ring focus-within:ring-inset focus-within:ring-border-hover;
}
</style>
