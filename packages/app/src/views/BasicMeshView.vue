<script setup lang="ts">
import type { Ref } from 'vue'
import { computed, reactive, watch } from "vue"
import { useRoute, } from "vue-router"
import { useClipboard, useDark, useEventListener, useToggle } from '@vueuse/core';

import { SunIcon, MoonIcon, ShareIcon } from '@heroicons/vue/24/solid'
import { ArrowUpOnSquareIcon } from '@heroicons/vue/24/outline'

import CodeEditor from '@/components/CodeEditor.vue'
import WebGpuCanvas from '@/components/WebGpuCanvas.vue'

import type { HTMLElementEventListenerMap, WebGpuResource, WebGpuState } from "@/composables/useWebGpu"
import basicShaderCode from '@/assets/shaders/basic.wgsl?raw'

import chroma from "chroma-js"
import JSON5 from 'json5'

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
  position: Array<number>,
  color: Array<number>
}

type BasicMesh = Mesh<BasicVertex>;

const BasicVertexParser: {
  position: (value: any) => Array<number>,
  color: (value: any) => Array<number>,
} = {
  position: (value) => value,
  color: (value) => Array.isArray(value)? value: chroma(value).gl(),
}

const BasicMeshParser: {
  vertices: (value: any) => Array<BasicVertex>,
  indices: (value: any) => Array<number>,
  topology: (value: any) => number,
} = {
  vertices: (value) => value.map((vertex: any) => ({
    position: BasicVertexParser.position(vertex.position),
    color: BasicVertexParser.color(vertex.color),
  })),
  indices: (value) => value,
  topology: (value) => value ?? 2,
}

const defaultSource = `{
  "vertices": [
    {"position": [-1, -1, 1, 1], "color": "red"},
    {"position": [-1, 1, 1, 1], "color": "green"},
    {"position": [1, -1, 1, 1], "color": "blue"},
    {"position": [1, 1, 1, 1], "color": "yellow"}
  ],
  "indices": [0, 1, 2, 1, 2, 3]
}`

const unArray = <T>(value: T|Array<T>) => Array.isArray(value)? value[0]: value

const sourceFromQuery: (defaultSource: string) => string = () => {
  const source = unArray(route.query.source)
  return source? base64UrlDecode(source): defaultSource
}

const jsonFromString: (value: string) => any = JSON5.parse

const basicMeshFromJson: (value: any) => BasicMesh = (value) => ({
  vertices: BasicMeshParser.vertices(value.vertices),
  indices: BasicMeshParser.indices(value.indices),
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

type RendererState = {
  pipelines: Record<number, GPURenderPipeline>
}

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
  arrayStride: 32,
  attributes: [
    {
      shaderLocation: 0, // VertexIn.position
      offset: 0,
      format: 'float32x4'
    },
    {
      shaderLocation: 1, // VertexIn.color
      offset: 16,
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
    out[j + 0] = data[i].position[0] ?? 0.0
    out[j + 1] = data[i].position[1] ?? 0.0
    out[j + 2] = data[i].position[2] ?? 0.0
    out[j + 3] = data[i].position[3] ?? 1.0
    out[j + 4] = data[i].color[0] ?? 0.0
    out[j + 5] = data[i].color[1] ?? 0.0
    out[j + 6] = data[i].color[2] ?? 0.0
    out[j + 7] = data[i].color[3] ?? 1.0
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
    const vertexStride: number = 8

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

const renderer: WebGpuResource = {
  onCreate({ device, format }) {
    console.log("BasicMeshView::onCreate")

    if(rendererState) return

    const basicShaderModule = device.createShaderModule({
      code: basicShaderCode
    })

    const pipelines = Object.fromEntries(Object.entries(PRIMITIVE_TOPOLOGIES).map(([key, value]) => [key, device.createRenderPipeline({
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
      })]
    ))

    rendererState = { pipelines }
  },
  onRender(args) {
    const {device, context} = args

    mesh.validate(args)

    if(!rendererState || !meshState) return

    const commandEncoder = device.createCommandEncoder()

    const pass = commandEncoder.beginRenderPass({
      colorAttachments: [
        {
          clearValue: Float32Array.of(0, 0, 0, 1),
          loadOp: 'clear',
          storeOp: 'store',
          view: context.getCurrentTexture().createView(),
        }
      ]
    })

    const pipeline = rendererState.pipelines[meshState.topology]

    pass.setPipeline(pipeline)

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

state.source = sourceFromQuery(defaultSource)
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

const listeners: HTMLElementEventListenerMap = {
  keydown: (event: KeyboardEvent) => {
    console.log(event)
  },
  wheel: (event: WheelEvent) => {
    console.log(event)
  }
}

watch(
  () => route.query.source,
  (value, oldValue) => {
    state.source = sourceFromQuery(defaultSource)
    save()
  }
)

</script>

<template>
  <header class="flex flex-row h-12 p-1">
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
      <WebGpuCanvas class="h-full w-full" :renderer :listeners/>
    </Suspense>
  </main>
</template>

<style scoped>
</style>
