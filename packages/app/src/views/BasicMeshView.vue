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

const empty: <T>() => Array<T> = () => []
const range: (lower: number, upper: number) => Array<number> = (lower, upper) => Array.from({length:upper-lower}, (_, i)=>lower+i)

const BasicVertexParser: {
  position: (value: any, defaultValue: () => Array<number>) => Array<number>,
  color: (value: any, defaultValue: () => Array<number>) => Array<number>,
} = {
  position: (value) => value,
  color: (value, defaultValue) => value? (Array.isArray(value)? value: chroma(value).gl()): defaultValue(),
}

const BasicMeshParser: {
  vertices: (value: any, defaultValue: () => Array<BasicVertex>) => Array<BasicVertex>,
  indices: (value: any, defaultValue: () => Array<number>) => Array<number>,
  topology: (value: any) => number,
} = {
  vertices: (value, defaultValue) => value?.map((vertex: any) => ({
    position: BasicVertexParser.position(vertex.position, empty),
    color: BasicVertexParser.color(vertex.color, empty),
  })) ?? defaultValue(),
  indices: (value, defaultValue) => value ?? defaultValue(),
  topology: (value) => value ?? 0,
}

// Topology <-> Type?
const defaultSource = `{
  "topology": 2,
  "vertices": [
    {"position": [-0.5, -0.5, 0, 1], "color": "red"},
    {"position": [-0.5, 0.5, 0, 1], "color": "green"},
    {"position": [0.5, -0.5, 0, 1], "color": "blue"},
    {"position": [0.5, 0.5, 0, 1], "color": "yellow"}
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
    out[j + 4] = data[i].color[0] ?? 1.0
    out[j + 5] = data[i].color[1] ?? 1.0
    out[j + 6] = data[i].color[2] ?? 1.0
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

const mat4 = () => {
  const shape = [4,4]
  const strides = [1,4]
  const length = shape.reduce((x,y) => x*y, 1)
  const self = {
    shape,
    strides,
    data: new Float32Array(length),
    get(index: [number,number]): number {
      const linearIndex = index[0]*self.strides[0]+index[1]*self.strides[1]
      return self.data[linearIndex];
    },
    set(index: [number,number], value: number) {
      const linearIndex = index[0]*self.strides[0]+index[1]*self.strides[1]
      self.data[linearIndex] = value
    }
  }
  return self;
}

const uniformValues = mat4()
uniformValues.set([0,0], 1.0)
uniformValues.set([1,1], 1.0)
uniformValues.set([2,2], 1.0)
uniformValues.set([3,3], 1.0)

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

const options: UseWebGpuOptions = {
  alphaMode: 'premultiplied',
}

const listeners: HTMLElementEventListenerMap = {
  keydown: (event: KeyboardEvent) => {
    console.log(event)
  },
  keyup: (event: KeyboardEvent) => {
    console.log(event)

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

    const step = event.shiftKey? 0.02: 0.2

    uniformValues.set([0,3], uniformValues.get([0,3])+delta[0]*step)
    uniformValues.set([1,3], uniformValues.get([1,3])+delta[1]*step)

    console.log(uniformValues.data)
  },
  wheel: (event: WheelEvent) => {
    const scale = 1.0 + event.deltaY/100.0
    uniformValues.set([0,0], uniformValues.get([0,0])*scale)
    uniformValues.set([1,1], uniformValues.get([1,1])*scale)
  }
}

watch(
  () => route.query.source,
  (value) => {
    state.source = sourceFromQuery(defaultSource)
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
