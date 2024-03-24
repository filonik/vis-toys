import { onMounted, onBeforeUnmount } from 'vue'
import type { Ref } from 'vue'

import { useRafFn, useResizeObserver } from '@vueuse/core'
import type { UseRafFnCallbackArguments } from '@vueuse/core'

export type WebGpuState = {
  adapter: GPUAdapter
  device: GPUDevice
  context: GPUCanvasContext
  format: GPUTextureFormat
}

export type CreateArguments = WebGpuState
export type ResizeArguments = WebGpuState & DOMRect
export type RenderArguments = WebGpuState & UseRafFnCallbackArguments
export type DeleteArguments = WebGpuState

export interface WebGpuResource {
  onCreate?(args: CreateArguments): void
  onResize?(args: ResizeArguments): void
  onRender?(args: RenderArguments): void
  onDelete?(args: DeleteArguments): void
}

export default async function useWebGpu(
  canvasRef: Ref<HTMLCanvasElement | undefined>,
  renderer: WebGpuResource
) {
  let state: WebGpuState | null = null

  const { pause, resume } = useRafFn(
    (args) => {
      if (state) {
        renderer.onRender?.({ ...state, ...args })
      }
    },
    { immediate: false }
  )

  useResizeObserver(canvasRef, (entries) => {
    if (state) {
      const args = entries[0].contentRect
      renderer.onResize?.({ ...state, ...args })
    }
  })

  onMounted(() => {
    initialize()
    if (state) {
      renderer.onCreate?.(state)
      resume()
    }
  })

  onBeforeUnmount(() => {
    if (state) {
      pause()
      renderer.onDelete?.(state)
    }
    finalize()
  })

  if (!navigator.gpu) {
    console.log('WebGPU not supported.')
    return
  }

  const adapter = await navigator.gpu.requestAdapter()

  if (!adapter) {
    console.log('Invalid adapter.')
    return
  }

  const device = await adapter.requestDevice()

  if (!device) {
    console.log('Invalid device.')
    return
  }

  const initialize = () => {
    console.log('useWebGpu::initialize')

    const canvas = canvasRef.value

    if (!canvas) {
      console.log('Invalid canvas.')
      return
    }

    const context = canvas.getContext('webgpu')

    if (!context) {
      console.log('Invalid context.')
      return
    }

    const format = navigator.gpu.getPreferredCanvasFormat()

    context.configure({ device, format })

    state = { adapter, device, context, format }
  }

  const finalize = () => {
    console.log('useWebGpu::finalize')

    state = null
  }

  return null
}
