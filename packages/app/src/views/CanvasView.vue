<script setup lang="ts">
import WebGpuCanvas from '@/components/WebGpuCanvas.vue'

import type { WebGpuResource } from "@/composables/useWebGpu"
import triangleShaderCode from '@/assets/shaders/triangle.wgsl?raw'

type RendererState = {
  pipeline: GPURenderPipeline
  vertexBuffer: GPUBuffer
}

let rendererState: RendererState | null = null

const renderer: WebGpuResource = {
  onCreate({ device, format }) {
    console.log("BasicMeshView::onCreate")

    if (rendererState) return

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

    const vertexData = new Float32Array([
      // X, Y, Z, W   R, G, B, A,
      0, 1, 1, 1, 1, 0, 0, 1, -1, -1, 1, 1, 0, 1, 0, 1, 1, -1, 1, 1, 0, 0, 1, 1
    ])

    const vertexBuffer = device.createBuffer({
      size: vertexData.byteLength,
      usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
    })

    device.queue.writeBuffer(vertexBuffer, 0, vertexData)

    rendererState = { pipeline, vertexBuffer }
  },
  onRender({ device, context }) {
    if(!rendererState) return

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
    pass.setVertexBuffer(0, rendererState.vertexBuffer)
    pass.draw(3)
    
    pass.end()

    const commandBuffer = commandEncoder.finish()

    device.queue.submit([commandBuffer])
  },
  onDelete() {
    console.log("BasicMeshView::onDelete")

    if(!rendererState) return

    rendererState.vertexBuffer.destroy()
    //renderer.state.pipeline.destroy()

    rendererState = null
  }
}
</script>

<template>
  <main class="h-full">
    <Suspense>
      <WebGpuCanvas class="h-full w-full" :renderer/>
    </Suspense>
  </main>
</template>

<style scoped>
</style>
