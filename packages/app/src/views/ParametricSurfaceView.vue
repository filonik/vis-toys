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

import * as wgh from 'webgpu-utils'

import * as A from "@/lib/arrays"

import { mat4f, scaleToFitContain } from "@/lib/tensors"

//http://localhost:5173/#/parametric-surface/?state=e3NvdXJjZTonQHBsb3RcbmZuIGYoeDogdmVjMmYpIC0-IHZlYzNmIHtcbiAgcmV0dXJuIHZlYzNmKFxuICAgIHNpbih4WzBdKSxcbiAgICBjb3MoeFswXSkqc2luKHhbMV0pLFxuICAgIGNvcyh4WzBdKSpjb3MoeFsxXSksXG4gICk7XG59XG4nLG1hdGVyaWFsOntmaWxsOicjZmZmZmZmJyxzdHJva2U6JyM4ODg4ODgnLHN0cm9rZVdpZHRoOjEwfX0

const DEFAULT_SOURCE = `@plot
fn f(x: vec2f) -> vec3f {
  return vec3f(x, sin(x[0])*cos(x[1]));
}`

type State = {
  source: string
  domains: Array<[number, number]>
  material: {
    fill: string
    stroke: string
    strokeWidth: number
  }
}

const stateRef = ref<State>({
  source: DEFAULT_SOURCE,
  domains: [
    [-Math.PI,+Math.PI],
    [-Math.PI,+Math.PI],
    [-Math.PI,+Math.PI],
  ],
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
  if (n == 1 && m == 3) {
    return `fn surface(position: vec4f) -> vec4f {
  return vec4(1.0, f(position.y))
}`
  }
  if (n == 2 && m == 3) {
    return `fn surface(position: vec4f) -> vec4f {
  return vec4(1.0, f(position.yz));
}`
  }
  if (n == 3 && m == 3) {
    return `fn surface(position: vec4f) -> vec4f {
  return vec4(1.0, f(position.yzw));
}`
  }
  return ""
}

const shaderSource = (transformSource: string, surfaceSource: string) => `
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

const processedSource = ref("")

const defs = wgh.makeShaderDataDefinitions(cameraSource);

const uCamera = wgh.makeStructuredView(defs.uniforms.uCamera);

uCamera.set({
  //transform: scaleToFitContain([1920,1080])
  projection: mat4f.perspective(Math.PI/4, 1920/1080, 0.1, 1000.0),
  view: mat4f.translation([0,0,-3]), ///mat4f.mul(mat4f.translation([0,0,1]), mat4f.rotationY(Math.PI/2)), //mat4f.mul(mat4f.rotationZ(Math.PI/2), mat4f.translation([0,0,-1])),
  model: mat4f.identity(),
})

type MeshState = {
  vertices: wgh.BuffersAndAttributes
  topology: number
}

type PipelineState = {
  pipeline: GPURenderPipeline
  bindGroup: GPUBindGroup
  camera: GPUBuffer
}

type RendererState = {
}

const options: UseWebGpuOptions = {
  alphaMode: 'premultiplied',
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
      const segments0 = A.range(0, lengths[0]).map(
        (i) => A.range(0,lengths[1]-1).map(
          (j) => [i*strides[0]+(j+0)*strides[1], i*strides[0]+(j+1)*strides[1]]
        )
      )
      const segments1 = A.range(0, lengths[1]).map(
        (j) => A.range(0,lengths[0]-1).map(
          (i) => [(i+0)*strides[0]+j*strides[1], (i+1)*strides[0]+j*strides[1]]
        )
      )
      return A.concat(segments0.flat(1), segments1.flat(1))
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

const mesh = statefulResource<MeshState>({
  create({device}) {
    const arrays = normalGridArrays([51,51])
    const vertices = wgh.createBuffersAndAttributesFromArrays(device, arrays, {
      shaderLocation: 0,
      stepMode: 'vertex',
      interleave: true,
    })
    const topology = 1
    return {vertices, topology}
  },
  delete({device}, value) {
    // TODO: Destroy buffers.
  },
})

const pipeline = statefulResource<PipelineState>({
  create({device, format}) {
    const module = device.createShaderModule({
      code: shaderSource(
        processedSource.value,
        surfaceSource(2,3)
      )
    })

    if (!mesh.state) return null

    const {vertices} = mesh.state

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

    const {pipeline: gpuPipeline, camera, bindGroup} = pipeline.state
    const {vertices} = mesh.state

    mat4f.scaling([
      (state.domains[0][1] - state.domains[0][0])/2.0,
      (state.domains[1][1] - state.domains[1][0])/2.0,
      (state.domains[2][1] - state.domains[2][0])/2.0,
    ], uCamera.views.model)

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

const process = (source: string) => {
  return source.replace("@plot", "/*@plot*/");
}

const save = (state: State) => {
  processedSource.value = process(state.source)
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
      <TabPanel class="h-full ui-not-selected:hidden md:ui-not-selected:grid grid grid-rows-1" :static="true">
        <CodeEditor v-model="state.source"/>
      </TabPanel>
      <TabPanel class="h-full ui-not-selected:hidden md:ui-not-selected:grid grid grid-rows-2" :static="true">
        <Suspense>
          <WebGpuCanvas class="h-full w-full object-cover" :renderer :listeners :options/>
        </Suspense>
        <div class="p-2">
          <h2 class="text-lg">Domains</h2>
          <div class="flex flex-row items-center gap-2">
            <span class="text-sm">x0:</span>
            <input class="w-16" name="domain00" type="number" v-model="state.domains[0][0]"/>
            <input class="w-16" name="domain01" type="number" v-model="state.domains[0][1]"/>
          </div>
          <div class="flex flex-row items-center gap-2">
            <span class="text-sm">x1:</span>
            <input class="w-16" name="domain10" type="number" v-model="state.domains[1][0]"/>
            <input class="w-16" name="domain11" type="number" v-model="state.domains[1][1]"/>
          </div>
        </div>
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>

<style scoped>
</style>
