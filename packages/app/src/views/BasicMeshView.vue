<script setup lang="ts">
import { reactive } from "vue"
import { useEventListener } from '@vueuse/core'

import CodeEditor from '@/components/CodeEditor.vue'
import WebGpuCanvas from '@/components/WebGpuCanvas.vue'

import type { WebGpuResource, WebGpuState } from "@/composables/useWebGpu"
import triangleShaderCode from '@/assets/shaders/triangle.wgsl?raw'

import JSON5 from 'json5'

const defaultSource = `{
  "vertices": [
    { "position": [-1, -1, 1, 1], "color": [1, 0, 0, 1] },
    { "position": [-1, 1, 1, 1], "color": [0, 1, 0, 1] },
    { "position": [1, -1, 1, 1], "color": [0, 0, 1, 1] },
    { "position": [1, 1, 1, 1], "color": [1, 1, 0, 1] }
  ],
  "indices": [0,1,2,1,2,3]
}`

const state = reactive({
  source: defaultSource,
})

let value = JSON.parse(state.source)

type RendererState = {
  pipeline: GPURenderPipeline
}

type MeshState = {
  vertexBuffer: GPUBuffer
  vertexCount: number
  indexBuffer: GPUBuffer
  indexCount: number
}

let rendererState: RendererState | null = null

let meshState: MeshState | null = null

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
  create: (args: WebGpuState) => MeshState
  delete: (state: MeshState, args: WebGpuState) => void
  validate: (args: WebGpuState) => void
 } = {
  valid: false,
  create({ device }) {
    console.log("Mesh::create")

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

    return { vertexBuffer, vertexCount, indexBuffer, indexCount }
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

    const triangleShaderModule = device.createShaderModule({
      code: triangleShaderCode
    })

    const pipeline = device.createRenderPipeline({
      layout: 'auto',
      vertex: {
        module: triangleShaderModule,
        entryPoint: 'vertexMain',
        buffers: [
          {
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
        ]
      },
      fragment: {
        module: triangleShaderModule,
        entryPoint: 'fragmentMain',
        targets: [{ format }]
      }
    })

    rendererState = { pipeline }
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

    pass.setPipeline(rendererState.pipeline)

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

useEventListener(document, 'keypress', (event) => {
  if (event.key=="Enter" && event.shiftKey) {
    event.stopPropagation()
    event.preventDefault()
    try {
      value = JSON5.parse(state.source)
      mesh.valid = false
    } catch (error) {
      if (error instanceof SyntaxError) {
        console.error(error.message)
      } else {
        throw error;
      }
    }
  }
})

</script>

<template>
  <main class="h-full grid grid-rows-2 grid-cols-none md:grid-rows-none md:grid-cols-2">
    <CodeEditor v-model="state.source"/>
    <Suspense>
      <WebGpuCanvas class="h-full w-full" :renderer/>
    </Suspense>
  </main>
</template>

<style scoped>
</style>
