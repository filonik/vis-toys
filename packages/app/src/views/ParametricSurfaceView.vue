<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue"
import { useEventListener, toReactive } from '@vueuse/core';

import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

import type { HTMLElementEventListenerMap, WebGpuResource, WebGpuState, UseWebGpuOptions } from "@/composables/useWebGpu"

import CodeEditor from '@/components/CodemirrorEditor.vue'
import ShareLinkButton from '@/components/ShareLinkButton.vue'
import ToggleDarkButton from '@/components/ToggleDarkButton.vue'
import WebGpuCanvas from '@/components/WebGpuCanvas.vue'

import { PRIMITIVES } from "@/lib/loaders/meshes"
import { importMath } from "@/lib/shaders"

import * as wgh from 'webgpu-utils'
//import { WgslReflect } from 'wgsl_reflect'

import * as A from "@/lib/arrays"

import { mat4f } from "@/lib/tensors"

//http://localhost:5173/#/parametric-surface/?state=e3NvdXJjZTonQHBsb3RcbmZuIGYoeDogdmVjMmYpIC0-IHZlYzNmIHtcbiAgcmV0dXJuIHZlYzNmKFxuICAgIHNpbih4WzBdKSxcbiAgICBjb3MoeFswXSkqc2luKHhbMV0pLFxuICAgIGNvcyh4WzBdKSpjb3MoeFsxXSksXG4gICk7XG59XG4nLG1hdGVyaWFsOntmaWxsOicjZmZmZmZmJyxzdHJva2U6JyM4ODg4ODgnLHN0cm9rZVdpZHRoOjEwfX0

/*
const DEFAULT_SOURCE = `@plot
fn f(x: vec2f) -> vec3f {
  return vec3f(x, sin(x[0])*cos(x[1]));
}`
*/
const DEFAULT_SOURCE = `@plot
fn f(x: f32) -> vec2f {
  return vec2f(x, sin(x));
}

@plot
fn g(x: f32) -> vec2f {
  return vec2f(x, cos(x));
}`

type TypeInfo = {
  name: string
}

type FunctionInfo = {
  name: string
  domain: TypeInfo
  codomain: TypeInfo
}

type SourceInfo = {
  functions: Array<FunctionInfo>
}

type Extent = [Array<number>, Array<number>]

type State = {
  source: string
  output: {
    functions: Array<{
      name: string,
      extent: Extent
    }>
  },
  material: {
    fill: string
    stroke: string
    strokeWidth: number
  }
}

const stateRef = ref<State>({
  source: DEFAULT_SOURCE,
  output: {
    functions: []
  },
  material: {
    fill: "#ffffff",
    stroke: "#888888",
    strokeWidth: 10.0,
  }
})

const state = toReactive(stateRef)

const cameraSource = `
struct CameraData {
  projection: mat4x4f,
  view: mat4x4f,
  model: mat4x4f,
}
  
@group(0) @binding(0) var<uniform> uCamera: CameraData;`

const surfaceSource: (n: number, m: number) => string = (n,m) => {
  const inputFragment: (n: number) => string = (n) => {
    switch (n) {
      case 1:
        return "position.y"
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
        return `vec4(1.0, ${x}, 0.0, 0.0)`
      case 2:
        return `vec4(1.0, ${x}, 0.0)`
      case 3:
        return `vec4(1.0, ${x})`
      default:
        return "vec4(1.0, 0.0, 0.0, 0.0)"
    }
  }
  return `fn surface(position: vec4f) -> vec4f {
  return ${outputFragment(m)(`f(${inputFragment(n)})`)};
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

${cameraSource}

${transformSource}

${surfaceSource}

fn fromVertexIn(in: VertexIn) -> VaryingData {
  return VaryingData(
    uCamera.view * surface(uCamera.model * in.position),
    in.color,
  );
}

fn toFragmentIn(in: VaryingData) -> FragmentIn {
  return FragmentIn(
    uCamera.projection * in.position.yzwx,
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

const defs = wgh.makeShaderDataDefinitions(cameraSource);

const uCamera = wgh.makeStructuredView(defs.uniforms.uCamera);

uCamera.set({
  //transform: scaleToFitContain([1920,1080])
  projection: mat4f.perspective(Math.PI/4, 1920/1080, 0.1, 1000.0),
  view: mat4f.translation([0,0,-3]), ///mat4f.mul(mat4f.translation([0,0,1]), mat4f.rotationY(Math.PI/2)), //mat4f.mul(mat4f.rotationZ(Math.PI/2), mat4f.translation([0,0,-1])),
  model: mat4f.identity(),
})

type MeshState = Record<number, {
  vertices: wgh.BuffersAndAttributes
  topology: number
}>

type PipelineState = {
  pipeline: GPURenderPipeline
  bindGroup: GPUBindGroup
  camera: GPUBuffer
}

type RendererState = {}

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

const normalGrid: (lengths: Array<number>) => Array<Array<number>> = (lengths) => {
  return A.cartesianProduct(lengths.map((length) => A.linspaceInclusive(-1.0, +1.0, length)))
}

const normalGridIndices: (lengths: Array<number>) => Array<Array<number>> = (lengths) => {
  const n = lengths.length
  const strides = A.cumProduct(lengths)

  switch (n) {
    case 1: {
      const segments = A.range(0,lengths[0]-1).map(
        (i) => [(i+0)*strides[0], (i+1)*strides[0]]
      )
      return segments
    }
    case 2: {
      const segments0 = A.range(0, lengths[0]).flatMap(
        (i) => A.range(0,lengths[1]-1).map(
          (j) => [i*strides[0]+(j+0)*strides[1], i*strides[0]+(j+1)*strides[1]]
        )
      )
      const segments1 = A.range(0, lengths[1]).flatMap(
        (j) => A.range(0,lengths[0]-1).map(
          (i) => [(i+0)*strides[0]+j*strides[1], (i+1)*strides[0]+j*strides[1]]
        )
      )
      return A.concat(segments0, segments1)
    }
    case 3: {
      const segments0 = A.range(0, lengths[0]).flatMap(
        (i) => A.range(0, lengths[1]).flatMap(
          (j) => A.range(0,lengths[2]-1).map(
            (k) => [
              i*strides[0]+j*strides[1]+(k+0)*strides[2],
              i*strides[0]+j*strides[1]+(k+1)*strides[2],
            ]
          )
        )
      )
      const segments1 = A.range(0, lengths[0]).flatMap(
        (i) => A.range(0, lengths[2]).flatMap(
          (k) => A.range(0,lengths[1]-1).map(
            (j) => [
              i*strides[0]+(j+0)*strides[1]+k*strides[2],
              i*strides[0]+(j+1)*strides[1]+k*strides[2],
            ]
          )
        )
      )
      const segments2 = A.range(0, lengths[1]).flatMap(
        (j) => A.range(0, lengths[2]).flatMap(
          (k) => A.range(0,lengths[0]-1).map(
            (i) => [
              (i+0)*strides[0]+j*strides[1]+k*strides[2],
              (i+1)*strides[0]+j*strides[1]+k*strides[2],
            ]
          )
        )
      )
      return A.concat(segments0, segments1, segments2)
    }
  }

  return []
}

const normalGridArrays: (lengths: Array<number>) => wgh.Arrays = (lengths) => {
  const positions = normalGrid(lengths).map((xs) => [1, xs[0]??0, xs[1]??0, xs[2]??0])
  const colors = A.full([1,1,1,1], positions.length)

  const indices = normalGridIndices(lengths)

  return {
    position: {
      data: positions.flat(1),
      type: Float32Array,
      numComponents: 4,
    },
    color: {
      data: colors.flat(1),
      type: Float32Array,
      numComponents: 4,
    },
    indices: {
      data: indices.flat(1),
      type: Uint32Array,
    }
  }
}

const gridSizes = (n: number) => [
  [],
  [Math.pow(n, 3*2)],
  [Math.pow(n, 3), Math.pow(n, 3)],
  [Math.pow(n, 2), Math.pow(n, 2), Math.pow(n, 2)]
]

const mesh = statefulResource<MeshState>({
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

const elementCount: (t: TypeInfo) => number = (t) => {
  switch (t.name) {
    case "f32":
      return 1
    case "vec2f":
      return 2
    case "vec3f":
      return 3
    case "vec4f":
      return 4
  }
  return 0
}

const functionShape: (f: FunctionInfo) => [number,number] = (f) => {
  return [
    elementCount(f.domain),
    elementCount(f.codomain)
  ]
}

const defaultExtent: (f: FunctionInfo) => Extent = (f) => {
  const n = elementCount(f.domain)
  return [A.full(-1, n), A.full(+1, n)]
}

const remapExtent: (extent: Extent) => any = (extent) => {
  const t = A.divs(A.add(extent[0], extent[1]), 2.0)
  const s = A.divs(A.sub(extent[0], extent[1]), 2.0)
  return mat4f.st(s, t)
}

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



const renderer: WebGpuResource & {state: RendererState | null} = {
  state: null,
  onCreate(args) {
    console.log("ParametricSurfaceView::onCreate")

    if (renderer.state) return

    mesh.onUpdate?.(args)

    if (!mesh.state) return

    pipeline.onUpdate?.(args)

    if (!pipeline.state) return

    renderer.state = {}
  },
  onRender(args) {
    const {device, context} = args

    if (!renderer.state) return

    mesh.onUpdate?.(args)

    if (!mesh.state) return

    pipeline.onUpdate?.(args)

    if (!pipeline.state) return

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

    const [m,n] = functionShape(info.functions[0])

    const {pipeline: gpuPipeline, camera, bindGroup} = pipeline.state
    
    const {vertices} = mesh.state[m]

    const f = state.output.functions[0]

    uCamera.set({model: remapExtent(f.extent)})

    device.queue.writeBuffer(camera, 0, uCamera.arrayBuffer);

    pass.setPipeline(gpuPipeline)

    pass.setBindGroup(0, bindGroup)

    pass.setVertexBuffer(0, vertices.buffers[0])
    pass.setIndexBuffer(vertices.indexBuffer!, vertices.indexFormat!)
    pass.drawIndexed(vertices.numElements)

    pass.end()

    const commandBuffer = commandEncoder.finish()

    device.queue.submit([commandBuffer])
  },
  onDelete(args) {
    console.log("ParametricSurfaceView::Delete")
    
    if(!renderer.state) return
    
    pipeline.onDelete?.(args)
    mesh.onDelete?.(args)

    renderer.state = null
  }
}

const pointerState = {
  down: false
}

const listeners: HTMLElementEventListenerMap = {
  pointerdown: (event: PointerEvent) => {
    pointerState.down = true
    const canvas = event.target as HTMLCanvasElement
    canvas.setPointerCapture(event.pointerId)
  },
  pointermove: (event: PointerEvent) => {
    if (!pointerState.down) return;
    const canvas = event.target as HTMLCanvasElement
    const display = [canvas.width, canvas.height]
    const aspect = Math.min(...display)
    const delta = [
      +event.movementX * 4.0/aspect,
      +event.movementY * 4.0/aspect,
      0
    ]
    mat4f.rotateZ(uCamera.views.view, delta[0], uCamera.views.view)
    mat4f.rotateY(uCamera.views.view, delta[1], uCamera.views.view)
  },
  pointerup: (event: PointerEvent) => {
    pointerState.down = false
  },
  wheel: (event: WheelEvent) => {
    //const scale = 1.0 + event.deltaY/100.0
    //mat4f.scale(uCamera.views.transform, [scale, scale, 1], uCamera.views.transform)
    const scale = event.deltaY/100.0
    mat4f.translate(uCamera.views.view, [0, 0, scale], uCamera.views.view)
    //mat4f.rotateX(uCamera.views.transform, scale, uCamera.views.transform)
  }
}

// TODO: I really whish I could use wgsl_reflect for this...
const reflect: (source: string) => SourceInfo = (source) => {
  const re = /@plot\s+fn\s+(?<name>\w+)\s*\(\w+:\s*(?<domain>\w+)\)\s*->\s*(?<codomain>\w+)/g
  const functions: Array<FunctionInfo> = []
  let match
  do {
    match = re.exec(source);
    if (match && match.groups) {
      functions.push({
        name: match.groups.name,
        domain: {
          name: match.groups.domain,
        },
        codomain: {
          name: match.groups.codomain,
        },
      })
    }
  } while (match);
  return { functions }
}

const process: (source: string) => ProcessedSource = (source) => {
  return {
    source: source.replaceAll("@plot", "/*@plot*/"),
    info: reflect(source)
  }
}

const save = (state: State) => {
  const result = process(state.source)
  processedSource.value = result
  state.output = {
    functions: result.info.functions.map((f) => ({
      name: f.name,
      extent: defaultExtent(f)
    }))
  }
  pipeline.valid = false
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
          <div class="flex flex-row items-center justify-center overflow-hidden">
            <WebGpuCanvas :renderer :listeners :options/>
          </div>
        </Suspense>
        <div class="flex flex-col p-2">
          <div v-for="f of state.output.functions">
            <h2 class="my-2 text-lg">{{f.name}}</h2>
            <div v-if="f.extent[0].length>0" class="flex flex-row items-center gap-2">
              <span class="w-8 text-xs text-right font-mono">x[0]:</span>
              <input class="w-16" name="domain00" type="number" step="0.1" v-model="f.extent[0][0]"/>
              <input class="w-16" name="domain01" type="number" step="0.1" v-model="f.extent[1][0]"/>
            </div>
            <div v-if="f.extent[0].length>1" class="flex flex-row items-center gap-2">
              <span class="w-8 text-xs text-right font-mono">x[1]:</span>
              <input class="w-16" name="domain10" type="number" step="0.1" v-model="f.extent[0][1]"/>
              <input class="w-16" name="domain11" type="number" step="0.1" v-model="f.extent[1][1]"/>
            </div>
            <div v-if="f.extent[0].length>2" class="flex flex-row items-center gap-2">
              <span class="w-8 text-xs text-right font-mono">x[2]:</span>
              <input class="w-16" name="domain10" type="number" step="0.1" v-model="f.extent[0][2]"/>
              <input class="w-16" name="domain11" type="number" step="0.1" v-model="f.extent[1][2]"/>
            </div>
          </div>
        </div>
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>

<style scoped>
</style>
