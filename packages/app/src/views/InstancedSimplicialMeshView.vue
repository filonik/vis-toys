<script setup lang="ts">
import { ref, watch } from "vue"
import { useEventListener, toReactive } from '@vueuse/core';

import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

import type { HTMLElementEventListenerMap, WebGpuResource, UseWebGpuOptions } from "@/composables/useWebGpu"

import CodeEditor from '@/components/MonacoEditor.vue'
import ShareLinkButton from '@/components/ShareLinkButton.vue'
import ToggleDarkButton from '@/components/ToggleDarkButton.vue'
import WebGpuCanvas from '@/components/WebGpuCanvas.vue'

import { BasicInstancedSimplicialMesh, createBuffersAndAttributes, ParseError, PRIMITIVES } from "@/lib/loaders/meshes"

import chroma from 'chroma-js'
import * as wgh from 'webgpu-utils'

import * as M from "@/lib/morphisms"
import * as S from "@/lib/strings"

import basicInstancedShaderCode from '@/assets/shaders/basic-instanced.wgsl?raw'

import { mat4f } from "@/lib/tensors"

const stringToJson = M.iso.maybe(S.stringToJson5())

const DEFAULT_SOURCE = `{
  "shape": {
    "primitive": 2,
    "vertices": [
      {"position": [-1, -1], "distance": [1,0,0,1]},
      {"position": [-1, 1], "distance": [1,1,0,0]},
      {"position": [1, -1], "distance": [0,0,1,1]},
      {"position": [1, 1], "distance": [0,1,1,0]}
    ],
    "indices": [0, 1, 2, 1, 2, 3]
  },
  "layer": {
    "vertices": [
      {"position": [-1, -1], "size": 1.0, "color": "red"},
      {"position": [-1, 1], "size": 1.5, "color": "green"},
      {"position": [1, -1], "size": 2.0, "color": "blue"},
      {"position": [1, 1], "size": 2.5, "color": "yellow"}
    ],
  }
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
    strokeWidth: 10.0,
  }
})

const state = toReactive(stateRef)

const meshRef = ref<BasicInstancedSimplicialMesh | null>(null)

type RendererState = Record<number, {
  pipeline: GPURenderPipeline
  bindGroup: GPUBindGroup
  camera: GPUBuffer
  material: GPUBuffer
  shape: GPUBuffer
  layer: GPUBuffer
}>

type MeshState = {
  shapeVertices: wgh.BuffersAndAttributes
  layerVertices: wgh.BuffersAndAttributes
  topology: number
}

let rendererState: RendererState | null = null

let meshState: MeshState | null = null

const mesh: WebGpuResource & {valid: boolean} = {
  valid: false,
  onCreate({ device }) {
    console.log("SimplicialMesh::onCreate")

    if(meshState) return

    const value = meshRef.value

    const shapeVertices = createBuffersAndAttributes(device, value?.shape ?? null, {
      shaderLocation: 0,
      stepMode: 'vertex',
      interleave: true,
    })

    const layerVertices = createBuffersAndAttributes(device, value?.layer ?? null, {
      shaderLocation: 7,
      stepMode: 'instance',
      interleave: true,
    })
    
    const topology = value?.shape?.primitive ?? 0

    meshState = { shapeVertices, layerVertices, topology }

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

const defs = wgh.makeShaderDataDefinitions(basicInstancedShaderCode);

const uCamera = wgh.makeStructuredView(defs.uniforms.uCamera);
const uMaterial = wgh.makeStructuredView(defs.uniforms.uMaterial);

const uShape = wgh.makeStructuredView(defs.uniforms.uShape);
const uLayer = wgh.makeStructuredView(defs.uniforms.uLayer);

uCamera.set({
  transform: mat4f.identity()
})

uShape.set({
  //transform: mat4f.identity()
  transform: mat4f.scaling([0.1,0.1,0.1])
})

uLayer.set({
  //transform: mat4f.identity()
  transform: mat4f.scaling([0.5,0.5,0.5])
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
    console.log("InstancedSimplicialMeshView::onCreate")

    const {device, format} = args

    if (rendererState) return

    mesh.onCreate?.(args)

    if (!meshState) return

    const {shapeVertices, layerVertices} = meshState

    const module = device.createShaderModule({
      code: basicInstancedShaderCode
    })

    const camera = device.createBuffer({
      size: uCamera.arrayBuffer.byteLength,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });
    const material = device.createBuffer({
      size: uMaterial.arrayBuffer.byteLength,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });
    const shape = device.createBuffer({
      size: uShape.arrayBuffer.byteLength,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });
    const layer = device.createBuffer({
      size: uLayer.arrayBuffer.byteLength,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

    rendererState = Object.fromEntries(Object.entries(PRIMITIVES).map(([key, value]) => {
      const pipeline = device.createRenderPipeline({
        layout: 'auto',
        vertex: {
          module,
          entryPoint: 'vertexMain',
          buffers: [
            ...shapeVertices.bufferLayouts,
            ...layerVertices.bufferLayouts,
          ],
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
          { binding: 2, resource: { buffer: shape } },
          { binding: 3, resource: { buffer: layer } },
        ],
      })

      return [key, {pipeline, bindGroup, camera, material, shape, layer }]
    }))

    //console.log(rendererState)
  },
  onRender(args) {
    const {device, context} = args

    if (!rendererState) return

    mesh.onUpdate?.(args)

    if (!meshState) return

    const {shapeVertices, layerVertices} = meshState

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

    const {pipeline, bindGroup, camera, material, shape, layer} = rendererState[meshState.topology]

    uCamera.set({
      transform: scaleToFitContain([1920, 1080])
    })

    uMaterial.set({
      fill: chroma(state.material.fill).gl(),
      stroke: chroma(state.material.stroke).gl(),
      strokeWidth: state.material.strokeWidth,
    })

    device.queue.writeBuffer(camera, 0, uCamera.arrayBuffer);
    device.queue.writeBuffer(material, 0, uMaterial.arrayBuffer);
    device.queue.writeBuffer(shape, 0, uShape.arrayBuffer);
    device.queue.writeBuffer(layer, 0, uLayer.arrayBuffer);

    pass.setPipeline(pipeline)
    pass.setBindGroup(0, bindGroup)
    
    pass.setVertexBuffer(0, shapeVertices.buffers[0])
    pass.setVertexBuffer(1, layerVertices.buffers[0])
    pass.setIndexBuffer(shapeVertices.indexBuffer!, shapeVertices.indexFormat!)

    pass.drawIndexed(shapeVertices.numElements, layerVertices.numElements)
    
    pass.end()

    const commandBuffer = commandEncoder.finish()

    device.queue.submit([commandBuffer])
  },
  onDelete(args) {
    console.log("InstancedSimplicialMeshView::Delete")
    
    if(!rendererState) return

    mesh.onDelete?.(args)

    rendererState = null
  }
}

const pointerState = {
  down: false
}

const keyToDirection = (key: string) => {
  const result = [0,0,0]
  switch (key) {
    case 'ArrowLeft':
      result[0] -= 1
      break
    case 'ArrowUp':
      result[1] += 1
      break
    case 'ArrowRight':
      result[0] += 1
      break
    case 'ArrowDown':
      result[1] -= 1
      break
  }
  return result
}

const listeners: HTMLElementEventListenerMap = {
  keydown: (event: KeyboardEvent) => {
    console.log(event)
  },
  keyup: (event: KeyboardEvent) => {
    const delta = keyToDirection(event.key)
    const step = event.shiftKey? 0.5: 0.05
    mat4f.translate(uLayer.views.transform, [delta[0]*step, delta[1]*step, delta[2]*step], uLayer.views.transform)
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
    mat4f.translate(uLayer.views.transform, [delta[0], delta[1], delta[2]], uLayer.views.transform)
  },
  pointerup: (event: PointerEvent) => {
    pointerState.down = false
  },
  wheel: (event: WheelEvent) => {
    const scale = 1.0 + event.deltaY/100.0
    mat4f.scale(uLayer.views.transform, [scale, scale, 1], uLayer.views.transform)
  }
}

const options: UseWebGpuOptions = {
  alphaMode: 'premultiplied',
  autoResize: false,
}

const save = (state: State) => {
  try {
    const value = stringToJson(state.source)
    meshRef.value = BasicInstancedSimplicialMesh.parse(value)
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
  <header class="basis-12 flex flex-row items-center">
    <h1 class="px-2">Instanced Simplicial Mesh</h1>
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
</style>
