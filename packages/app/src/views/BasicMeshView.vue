<script setup lang="ts">
import type { Ref } from 'vue'
import { computed, reactive, watch } from "vue"
import { useRoute, } from "vue-router"
import { useClipboard, useDark, useEventListener, useToggle } from '@vueuse/core';

import { SunIcon, MoonIcon, ShareIcon } from '@heroicons/vue/24/solid'
import { ArrowUpOnSquareIcon } from '@heroicons/vue/24/outline'

import CodeEditor from '@/components/CodeEditor.vue'
import WebGpuCanvas from '@/components/WebGpuCanvas.vue'

import type { HTMLElementEventListenerMap, WebGpuResource, WebGpuState, UseWebGpuOptions } from "@/composables/useWebGpu"
import basicShaderCode from '@/assets/shaders/basic.wgsl?raw'

import chroma from "chroma-js"
import JSON5 from 'json5'

import { matf, mat4x4f, range } from "@/mat"

const route = useRoute()

const base64UrlEncode: (str: string) => string = (value) => {
  return btoa(value).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

const base64UrlDecode: (value: string)=> string = (value) => {
  return atob(value.replace(/-/g, '+').replace(/_/g, '/'));
}

type Mesh<T> = {
  vertices: Array<T>,
  indices: Array<number>,
  topology: number,
}

type BasicVertex = {
  transform: Float32Array,
  color: Array<number>
}

type BasicMesh = Mesh<BasicVertex>;

const empty: <T>() => Array<T> = () => []

const BasicVertexParser: {
  transform: (value: any, defaultValue: () => Float32Array) => Float32Array,
  color: (value: any, defaultValue: () => Array<number>) => Array<number>,
} = {
  transform: (value, defaultValue) => value ?? defaultValue(),
  color: (value, defaultValue) => value? (Array.isArray(value)? value: chroma(value).gl()): defaultValue(),
}

const BasicMeshParser: {
  vertices: (value: any, defaultValue: () => Array<BasicVertex>) => Array<BasicVertex>,
  indices: (value: any, defaultValue: () => Array<number>) => Array<number>,
  topology: (value: any) => number,
} = {
  vertices: (value, defaultValue) => value?.map((vertex: any) => ({
    transform: BasicVertexParser.transform(vertex.transform, () => {
      if (vertex.transform) {
        return Float32Array.from({length: 4*4}, (i: number) => vertex.transform[i])
      }
      return mat4x4f.T(vertex.position).data
    }),
    color: BasicVertexParser.color(vertex.color, empty),
  })) ?? defaultValue(),
  indices: (value, defaultValue) => value ?? defaultValue(),
  topology: (value) => value ?? 0,
}

// Topology <-> Type?
const defaultSource = `{
  "topology": 2,
  "vertices": [
    {"position": [-0.5, -0.5], "color": "red"},
    {"position": [-0.5, 0.5], "color": "green"},
    {"position": [0.5, -0.5], "color": "blue"},
    {"position": [0.5, 0.5], "color": "yellow"}
  ],
  "indices": [0, 1, 2, 1, 2, 3]
}`

const unArray = <T>(value: T|Array<T>) => Array.isArray(value)? value[0]: value

const sourceFromQuery: (value: string | null, defaultSource: string) => string = (value, defaultSource) => {
  return value? base64UrlDecode(value): defaultSource
}

const jsonFromString: (value: string) => any = JSON5.parse

const basicMeshFromJson: (value: any) => BasicMesh = (value) => ({
  vertices: BasicMeshParser.vertices(value.vertices, empty),
  indices: BasicMeshParser.indices(value.indices, () => range(0, value.vertices?.length ?? 0)),
  topology: BasicMeshParser.topology(value.topology),
})

const state = reactive({
  source: defaultSource,
})

let value: BasicMesh | null = null

const tryLoad: (source: string) => void = (source) => {
  try {
    value = basicMeshFromJson(jsonFromString(source))
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error(error.message)
    } else {
      throw error;
    }
  }
}

type RendererState = Record<number, {
  pipeline: GPURenderPipeline
  bindGroup: GPUBindGroup
  uniformBuffer: GPUBuffer
}>

type MeshState = {
  vertexBuffer: GPUBuffer
  vertexCount: number
  indexBuffer: GPUBuffer
  indexCount: number
  topology: number
}

let rendererState: RendererState | null = null

let meshState: MeshState | null = null

const PRIMITIVE_TOPOLOGIES: Record<number, GPUPrimitiveTopology> = {
  0: 'point-list',
  1: 'line-list',
  2: 'triangle-list',
}

const BASIC_VERTEX_LAYOUT: GPUVertexBufferLayout =  {
  arrayStride: 5*4*4,
  attributes: [
    {
      shaderLocation: 0, // VertexIn.transform0
      offset: 0*4*4,
      format: 'float32x4'
    },
    {
      shaderLocation: 1, // VertexIn.transform1
      offset: 1*4*4,
      format: 'float32x4'
    },
    {
      shaderLocation: 2, // VertexIn.transform1
      offset: 2*4*4,
      format: 'float32x4'
    },
    {
      shaderLocation: 3, // VertexIn.transform3
      offset: 3*4*4,
      format: 'float32x4'
    },
    {
      shaderLocation: 4, // VertexIn.color
      offset: 4*4*4,
      format: 'float32x4'
    }
  ]
}

const writeVertexData: (
  out: Float32Array,
  data: any,
  offset?: number,
  stride?: number
) => void = (out, data, offset=0, stride=1) => {
  for (let i = 0; i < data.length; i++) {
    const j = (i + offset) * stride
    out[j + 0] = data[i].transform[0] ?? 1.0
    out[j + 1] = data[i].transform[1] ?? 0.0
    out[j + 2] = data[i].transform[2] ?? 0.0
    out[j + 3] = data[i].transform[3] ?? 0.0
    out[j + 4] = data[i].transform[4] ?? 0.0
    out[j + 5] = data[i].transform[5] ?? 1.0
    out[j + 6] = data[i].transform[6] ?? 0.0
    out[j + 7] = data[i].transform[7] ?? 0.0
    out[j + 8] = data[i].transform[8] ?? 0.0
    out[j + 9] = data[i].transform[9] ?? 0.0
    out[j + 10] = data[i].transform[10] ?? 1.0
    out[j + 11] = data[i].transform[11] ?? 0.0
    out[j + 12] = data[i].transform[12] ?? 0.0
    out[j + 13] = data[i].transform[13] ?? 0.0
    out[j + 14] = data[i].transform[14] ?? 0.0
    out[j + 15] = data[i].transform[15] ?? 1.0
    out[j + 16] = data[i].color[0] ?? 1.0
    out[j + 17] = data[i].color[1] ?? 1.0
    out[j + 18] = data[i].color[2] ?? 1.0
    out[j + 19] = data[i].color[3] ?? 1.0
  }
}

const writeIndexData: (
  out: Uint32Array,
  data: any,
  offset?: number,
  stride?: number
) => void = (out, data, offset=0, stride=1) => {
  for (let i = 0; i < data.length; i++) {
    const j = (i + offset) * stride
    out[j] = data[i]
  }
}

const mesh: {
  valid: boolean,
  create: (args: WebGpuState) => MeshState | null
  delete: (state: MeshState, args: WebGpuState) => void
  validate: (args: WebGpuState) => void
 } = {
  valid: false,
  create({ device }) {
    console.log("Mesh::create")

    if (!value) return null

    const vertexCount: number = value.vertices.length
    const vertexStride: number = 5*4

    const vertexData = new Float32Array(vertexCount * vertexStride)

    writeVertexData(vertexData, value.vertices, 0, vertexStride)

    const vertexBuffer = device.createBuffer({
      size: vertexData.byteLength,
      usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
    })

    device.queue.writeBuffer(vertexBuffer, 0, vertexData)

    const indexCount: number = value.indices.length
    const indexStride: number = 1

    const indexData = new Uint32Array(indexCount * indexStride)

    writeIndexData(indexData, value.indices, 0, indexStride)

    const indexBuffer = device.createBuffer({
      size: indexData.byteLength,
      usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST
    })

    device.queue.writeBuffer(indexBuffer, 0, indexData)

    const topology = value.topology

    return { vertexBuffer, vertexCount, indexBuffer, indexCount, topology }
  },
  delete(state) {
    console.log("Mesh::delete")
    state.vertexBuffer.destroy()
    state.indexBuffer.destroy()
  },
  validate(args) {
    if(!mesh.valid) {
      if (meshState) {
        mesh.delete(meshState, args)
      }
      meshState = mesh.create(args)
      mesh.valid = true
    }
  }
}

const displayValues = mat4x4f.I()
const cameraValues = mat4x4f.I()
const uniformValues = mat4x4f.I()

const renderer: WebGpuResource = {
  onCreate({ device, format }) {
    console.log("BasicMeshView::onCreate")

    if(rendererState) return

    const basicShaderModule = device.createShaderModule({
      code: basicShaderCode
    })
    
    const uniformBuffer = device.createBuffer({
      label: 'uniforms',
      size: uniformValues.data.byteLength,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

    rendererState = Object.entries(PRIMITIVE_TOPOLOGIES).map(([key, value]) => {
      const pipeline = device.createRenderPipeline({
        layout: 'auto',
        vertex: {
          module: basicShaderModule,
          entryPoint: 'vertexMain',
          buffers: [BASIC_VERTEX_LAYOUT]
        },
        fragment: {
          module: basicShaderModule,
          entryPoint: 'fragmentMain',
          targets: [{ format }]
        },
        primitive: {
          topology: value,
        }
      })

      const bindGroup = device.createBindGroup({
        label: 'bind group for object',
        layout: pipeline.getBindGroupLayout(0),
        entries: [
          { binding: 0, resource: { buffer: uniformBuffer }},
        ],
      })

      return {pipeline, bindGroup, uniformBuffer}
    })
  },
  onResize({ entries }) {
    const {width, height} = entries[0].contentRect
    const aspect = Math.min(width, height)
    displayValues.set([1,1], aspect/width)
    displayValues.set([2,2], aspect/height)
    console.log(displayValues)
  },
  onRender(args) {
    const {device, context} = args

    mesh.validate(args)

    if(!rendererState || !meshState) return

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

    const {pipeline, bindGroup, uniformBuffer} = rendererState[meshState.topology]

    pass.setPipeline(pipeline)

    matf.mul(displayValues, cameraValues, uniformValues)

    device.queue.writeBuffer(uniformBuffer, 0, uniformValues.data);
    pass.setBindGroup(0, bindGroup);

    pass.setVertexBuffer(0, meshState.vertexBuffer)
    pass.setIndexBuffer(meshState.indexBuffer, 'uint32')
    //pass.draw(3)

    pass.drawIndexed(meshState.indexCount)
    
    pass.end()

    const commandBuffer = commandEncoder.finish()

    device.queue.submit([commandBuffer])
  },
  onDelete(args) {
    console.log("BasicMeshView::Delete")
    
    if(!rendererState || !meshState) return

    mesh.delete(meshState, args)
    //rendererState.pipeline.destroy()

    rendererState = null
  }
}

const save = () => {
  tryLoad(state.source)
  mesh.valid = false
}

state.source = sourceFromQuery(unArray(route.query.source), defaultSource)
save()

const shortcutSave: (event: KeyboardEvent) => boolean = (event) => {
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

const isDark: Ref<boolean> = useDark()
const toggleDark = useToggle(isDark)

const source = computed(() => {
  const origin = window.location.origin
  const baseUrl = window.location.pathname
  const query = "?source=" + base64UrlEncode(state.source)
  return origin + baseUrl + "#" + route.path + query
})
const { copy } = useClipboard({ source })

useEventListener(document, 'keydown', (event) => {
  if (shortcutSave(event)) {
    event.stopPropagation()
    event.preventDefault()
    try {
      save()
    } catch (error) {
      if (error instanceof SyntaxError) {
        console.error(error.message)
      } else {
        throw error;
      }
    }
  }
})

const options: UseWebGpuOptions = {
  alphaMode: 'premultiplied',
}

const listeners: HTMLElementEventListenerMap = {
  keydown: (event: KeyboardEvent) => {
    console.log(event)
  },
  keyup: (event: KeyboardEvent) => {
    const delta = [0,0]

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
    cameraValues.set([1,0], cameraValues.get([1,0])+delta[0]*step)
    cameraValues.set([2,0], cameraValues.get([2,0])+delta[1]*step)
  },
  wheel: (event: WheelEvent) => {
    const scale = 1.0 + event.deltaY/100.0
    cameraValues.set([1,1], cameraValues.get([1,1])*scale)
    cameraValues.set([2,2], cameraValues.get([2,2])*scale)
  }
}

watch(
  () => route.query.source,
  (value) => {
    state.source = sourceFromQuery(unArray(value), defaultSource)
    save()
  }
)

</script>

<template>
  <header class="flex flex-row items-center h-12 p-1 border-b-2 border-border">
    <h1 class="px-2 text-lg">Mesh</h1>
    <span class="flex-grow"></span>
    <button class="rounded-lg p-2" type="button" @click="copy()" >
      <ArrowUpOnSquareIcon class="w-5 h-5"/>
    </button>
    <button class="rounded-lg p-2" type="button" @click="toggleDark()">
      <MoonIcon class="w-5 h-5" :class="[isDark? 'hidden': 'visible']"/>
      <SunIcon class="w-5 h-5" :class="[isDark? 'visible': 'hidden']"/>
    </button>
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
