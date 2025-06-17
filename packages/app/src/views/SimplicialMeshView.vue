<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue"
import { useEventListener, toReactive } from '@vueuse/core';

import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

import type { WebGpuResource, UseWebGpuOptions } from "@/composables/useWebGpu"
import type {HTMLElementEventListenerMap} from '@/types'

import CodeEditor from '@/components/MonacoEditor.vue'
import ShareLinkButton from '@/components/ShareLinkButton.vue'
import ToggleDarkButton from '@/components/ToggleDarkButton.vue'
import WebGpuCanvas from '@/components/WebGpuCanvas.vue'

import { BasicSimplicialMesh, ParseError, createBuffersAndAttributes, PRIMITIVES } from "@/lib/loaders/meshes"

import basicShaderCode from '@/assets/shaders/basic.wgsl?raw'

import chroma from 'chroma-js'
import * as wgh from 'webgpu-utils'

import * as M from "@/lib/morphisms"
import * as S from "@/lib/strings"

import { mat4f } from "@/lib/tensors"

const stringToJson = M.iso.maybe(S.stringToJson5())

const DEFAULT_SOURCE = `{
  "primitive": 2,
  "vertices": [
    {"position": [-1, -1], "distance": [1,0,0,1], "fill": "red", "stroke": "yellow"},
    {"position": [-1, 1], "distance": [1,1,0,0], "fill": "green", "stroke": "blue"},
    {"position": [1, -1], "distance": [0,0,1,1], "fill": "blue", "stroke": "green"},
    {"position": [1, 1], "distance": [0,1,1,0], "fill": "yellow", "stroke": "red"}
  ],
  "indices": [0, 1, 2, 1, 2, 3]
}`

type State = {
  source: string
  material: {
    fill: string
    stroke: string
    strokeWidth: number
  }
}

const stateRef = ref<State>({
  source: DEFAULT_SOURCE,
  material: {
    fill: "#ffffff",
    stroke: "#888888",
    strokeWidth: 20.0,
  }
})

const meshRef = ref<BasicSimplicialMesh | null>(null)

type RendererState = Record<number, {
  pipeline: GPURenderPipeline
  bindGroup: GPUBindGroup
  camera: GPUBuffer
  material: GPUBuffer
}>

type MeshState = {
  vertices: wgh.BuffersAndAttributes
  topology: number
}

let rendererState: RendererState | null = null

let meshState: MeshState | null = null

const options: UseWebGpuOptions = {
  alphaMode: 'premultiplied',
  autoResize: true,
}

const mesh: WebGpuResource & {valid: boolean} = {
  valid: false,
  onCreate({ device }) {
    console.log("SimplicialMesh::onCreate")

    if(meshState) return

    const value = meshRef.value

    const vertices = createBuffersAndAttributes(device, value, {
      shaderLocation: 0,
      stepMode: 'vertex',
      interleave: true,
    })
    
    const topology = value?.primitive ?? 0

    meshState = { vertices, topology }

    //console.log(meshState)
  },
  onUpdate(args) {
    if(!mesh.valid) {
      mesh.onDelete?.(args)
      mesh.onCreate?.(args)
      mesh.valid = true
    }
  },
  onDelete(args) {
    console.log("SimplicialMesh::onDelete")
    
    if(!meshState) return

    // TODO: Destroy buffers

    meshState = null
  }
}

const transforms = {
  //camera: mat4f.identity(),
  camera: mat4f.scaling([0.5,0.5,0.5]),
}

const defs = wgh.makeShaderDataDefinitions(basicShaderCode);

const uCamera = wgh.makeStructuredView(defs.uniforms.uCamera);
const uMaterial = wgh.makeStructuredView(defs.uniforms.uMaterial);

uCamera.set({
  transform: mat4f.identity(),
})

uMaterial.set({
  fill: [1,1,1,1],
  stroke: [1,1,1,1],
  strokeWidth: 10.0, //5.0,
})

const scaleToFitContain = (display: [number, number]) => {
  const aspect = Math.min(...display)
  return mat4f.scaling([aspect/display[0], aspect/display[1], 1])
}

const scaleToFitCover = (display: [number, number]) => {
  const aspect = Math.max(...display)
  return mat4f.scaling([aspect/display[0], aspect/display[1], 1])
}

const renderer: WebGpuResource = {
  onCreate(args) {
    console.log("SimplicialMeshView::onCreate")

    const {device, format} = args

    if (rendererState) return

    mesh.onCreate?.(args)

    if (!meshState) return

    const {vertices} = meshState

    const module = device.createShaderModule({
      code: basicShaderCode
    })

    const camera = device.createBuffer({
      size: uCamera.arrayBuffer.byteLength,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });
    const material = device.createBuffer({
      size: uMaterial.arrayBuffer.byteLength,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

    rendererState = Object.fromEntries(Object.entries(PRIMITIVES).map(([key, value]) => {
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
          topology: value,
          //cullMode: 'back',
        },
      })

      const bindGroup = device.createBindGroup({
        layout: pipeline.getBindGroupLayout(0),
        entries: [
          { binding: 0, resource: { buffer: camera } },
          { binding: 1, resource: { buffer: material } },
        ],
      })

      return [key, {pipeline, bindGroup, camera, material }]
    }))

    //console.log(rendererState)
  },
  onRender(args) {
    const {device, context, display} = args

    if (!rendererState) return

    mesh.onUpdate?.(args)

    if (!meshState) return

    const {vertices} = meshState

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

    const {pipeline, bindGroup, camera, material} = rendererState[meshState.topology]

    const displayTransform = scaleToFitContain(display)
    mat4f.mul(displayTransform, transforms.camera, uCamera.views.transform)

    uMaterial.set({
      fill: chroma(state.material.fill).gl(),
      stroke: chroma(state.material.stroke).gl(),
      strokeWidth: state.material.strokeWidth,
    })

    device.queue.writeBuffer(camera, 0, uCamera.arrayBuffer);
    device.queue.writeBuffer(material, 0, uMaterial.arrayBuffer);

    pass.setPipeline(pipeline)
    pass.setBindGroup(0, bindGroup)
    pass.setVertexBuffer(0, vertices.buffers[0])
    //passEncoder.setVertexBuffer(1, instancedVerts.buffers[0])
    //passEncoder.setVertexBuffer(2, instancedVerts.buffers[1])
    pass.setIndexBuffer(vertices.indexBuffer!, vertices.indexFormat!)
    //pass.drawIndexed(meshState.vertices.numElements, instancedVerts.numElements)
    pass.drawIndexed(vertices.numElements)
    pass.end()

    const commandBuffer = commandEncoder.finish()

    device.queue.submit([commandBuffer])
  },
  onDelete(args) {
    console.log("SimplicialMeshView::Delete")
    
    if(!rendererState) return

    mesh.onDelete?.(args)

    rendererState = null
  }
}

const keyboardState = null
const pointerState = {
  down: false
}

const listeners: HTMLElementEventListenerMap = {
  keydown: (event: KeyboardEvent) => {
    console.log(event)
  },
  keyup: (event: KeyboardEvent) => {
    const delta = [0,0,0]

    switch (event.key) {
      case 'ArrowLeft':
        delta[0] -= 1
        break
      case 'ArrowUp':
        delta[1] += 1
        break
      case 'ArrowRight':
        delta[0] += 1
        break
      case 'ArrowDown':
        delta[1] -= 1
        break
    }

    const step = event.shiftKey? 0.5: 0.05
    mat4f.translate(transforms.camera, [delta[0]*step, delta[1]*step, delta[2]*step], transforms.camera)
  },
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
      -event.movementY * 4.0/aspect,
      0
    ]
    mat4f.translate(transforms.camera, [delta[0], delta[1], delta[2]], transforms.camera)
  },
  pointerup: (event: PointerEvent) => {
    pointerState.down = false
  },
  wheel: (event: WheelEvent) => {
    const scale = 1.0 + event.deltaY/100.0
    mat4f.scale(transforms.camera, [scale, scale, 1], transforms.camera)
  }
}

const state = toReactive(stateRef)

const save = (state: State) => {
  try {
    const value = stringToJson(state.source)
    meshRef.value = BasicSimplicialMesh.parse(value)
    mesh.valid = false
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error(error.message)
    } else if (error instanceof ParseError) {
      for (let issue of error.issues) {
        console.error(issue.message)
      }
    } else {
      throw error;
    }
  }
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
    <h1 class="px-2">Simplicial Mesh</h1>
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
          <WebGpuCanvas class="h-full w-full object-cover show-focus" :renderer :listeners :options/>
        </Suspense>
        <div>
          <h2>Material</h2>
          <div class="flex flex-row gap-2 items-center p-1 hover:bg-background-soft">
            <label class="w-12 text-right" for="fill">Fill:</label>
            <input class="w-16" name="fill" type="color" v-model="state.material.fill"/>
          </div>
          <div class="flex flex-row gap-2 items-center p-1 hover:bg-background-soft">
            <label class="w-12 text-right" for="stroke">Stroke:</label>
            <input class="w-16" name="stroke" type="color" v-model="state.material.stroke"/>
          </div>
          <div class="flex flex-row gap-2 items-center p-1 hover:bg-background-soft">
            <label class="w-12 text-right" for="strokeWidth">Width:</label>
            <input class="w-16" name="strokeWidth" type="number" v-model="state.material.strokeWidth"/>
          </div>
        </div>
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>

<style scoped>
.show-focus {
  @apply focus:outline-none focus:ring focus:ring-inset focus:ring-border-hover;
}
</style>
