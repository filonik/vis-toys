<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue"
import { useEventListener, toReactive } from '@vueuse/core';

import { ArrowUpOnSquareIcon } from '@heroicons/vue/24/outline'

import useQuerySource, { Base64UrlCodec } from "@/composables/useQuerySource"

import CodeEditor from '@/components/CodeEditor.vue'
import WebGpuCanvas from '@/components/WebGpuCanvas.vue'
import ToggleDarkButton from '@/components/ToggleDarkButton.vue'

import { BasicSimplicialMesh, ParseError, createBuffersAndAttributes } from "@/lib/loaders/meshes"

import type { HTMLElementEventListenerMap, WebGpuResource, UseWebGpuOptions } from "@/composables/useWebGpu"
import basicShaderCode from '@/assets/shaders/basic.wgsl?raw'

import {mat4} from 'wgpu-matrix'
import * as wgh from 'webgpu-utils'

import * as A from "@/lib/arrays"
import * as T from "@/lib/tensors"
import * as S from "@/lib/strings"

const mymat4 = {
  translate(m: ArrayLike<number>, v: ArrayLike<number>, r: Float32Array): Float32Array {
    r[1*1+0*4] = m[1*1+0*4] + v[0]
    r[2*1+0*4] = m[2*1+0*4] + v[1]
    r[3*1+0*4] = m[3*1+0*4] + v[2]
    return r
  },
  scale(m: ArrayLike<number>, v: ArrayLike<number>, r: Float32Array): Float32Array {
    r[1*1+1*4] = m[1*1+1*4] * v[0]
    r[2*1+2*4] = m[2*1+2*4] * v[1]
    r[3*1+3*4] = m[3*1+3*4] * v[2]
    return r
  }
}

const stringToJson = S.stringToJson5({space: 2})

const PRIMITIVES: Record<number, GPUPrimitiveTopology> = {
  0: 'point-list',
  1: 'line-list',
  2: 'triangle-list',
}

const DEFAULT_SOURCE = `{
  "primitive": 2,
  "vertices": [
    {"position": [-0.5, -0.5], "distance": [1,0,0,1], "fill": "red", "stroke": "yellow"},
    {"position": [-0.5, 0.5], "distance": [1,1,0,0], "fill": "green", "stroke": "blue"},
    {"position": [0.5, -0.5], "distance": [0,0,1,1], "fill": "blue", "stroke": "green"},
    {"position": [0.5, 0.5], "distance": [0,1,1,0], "fill": "yellow", "stroke": "red"}
  ],
  "indices": [0, 1, 2, 1, 2, 3]
}`

type State = {
  source: string
}

const stateRef = ref<State>({
  source: DEFAULT_SOURCE,
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
  camera: mat4.identity(),
}

const defs = wgh.makeShaderDataDefinitions(basicShaderCode);

const uCamera = wgh.makeStructuredView(defs.uniforms.uCamera);
const uMaterial = wgh.makeStructuredView(defs.uniforms.uMaterial);

uCamera.set({
  transform: mat4.identity(),
})

uMaterial.set({
  fill: [1,1,1,1],
  stroke: [1,1,1,1],
  strokeWidth: 10.0,
})

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

    const aspect = Math.min(...display)
    mat4.mul(mat4.scaling([1, aspect/display[0], aspect/display[1]]), transforms.camera, uCamera.views.transform)

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
    mymat4.translate(transforms.camera, [delta[0]*step, delta[1]*step, delta[2]*step], transforms.camera)
  },
  wheel: (event: WheelEvent) => {
    const scale = 1.0 + event.deltaY/100.0
    mymat4.scale(transforms.camera, [scale, scale, 1], transforms.camera)
  }
}

const state = toReactive(stateRef)

const { copy } = useQuerySource(stateRef, {
  source: Base64UrlCodec
})

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

watch(stateRef, save)

save(state)
</script>

<template>
  <header class="flex flex-row items-center h-12 p-1 border-b-2 border-border">
    <h1 class="px-2">Simplicial Mesh</h1>
    <span class="flex-grow"></span>
    <button class="rounded-lg p-2" type="button" @click="copy()" >
      <ArrowUpOnSquareIcon class="w-5 h-5"/>
    </button>
    <ToggleDarkButton/>
  </header>
  <main class="h-full grid grid-rows-2 grid-cols-none md:grid-rows-none md:grid-cols-2">
    <CodeEditor v-model="state.source"/>
    <Suspense>
      <WebGpuCanvas class="h-full w-full" :renderer :listeners :options/>
    </Suspense>
  </main>
</template>

<style scoped>
</style>
