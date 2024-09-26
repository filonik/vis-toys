import { onMounted, onBeforeUnmount } from 'vue'
import type { Ref } from 'vue'

import { useEventListener, useRafFn, useResizeObserver } from '@vueuse/core'
import type { UseRafFnCallbackArguments, GeneralEventListener } from '@vueuse/core'

export type HTMLElementEventListenerMap = Partial<{
  [E in keyof HTMLElementEventMap]: GeneralEventListener<HTMLElementEventMap[E]>
}>;

export type WebGpuState = {
  adapter: GPUAdapter
  device: GPUDevice
  context: GPUCanvasContext
  format: GPUTextureFormat
  display: [number,number]
}

export type UseWebGpuOptions = {
  alphaMode?: GPUCanvasAlphaMode
  format?: GPUTextureFormat
}

export type CreateArguments = WebGpuState
export type ResizeArguments = WebGpuState & {entries: readonly ResizeObserverEntry[]}
export type RenderArguments = WebGpuState & UseRafFnCallbackArguments
export type UpdateArguments = WebGpuState
export type DeleteArguments = WebGpuState

export interface WebGpuResource {
  onCreate?(args: CreateArguments): void
  onResize?(args: ResizeArguments): void
  onRender?(args: RenderArguments): void
  onUpdate?(args: UpdateArguments): void
  onDelete?(args: DeleteArguments): void
}

export default async function useWebGpu(
  canvasRef: Ref<HTMLCanvasElement | undefined>,
  renderer: WebGpuResource,
  listeners: HTMLElementEventListenerMap = {},
  options: UseWebGpuOptions = {},
) {
  let state: WebGpuState | null = null

  const updateDisplaySize = (entry: ResizeObserverEntry) => {
    let w
    let h
    let dpr

    if (entry.devicePixelContentBoxSize) {
      w = entry.devicePixelContentBoxSize[0].inlineSize
      h = entry.devicePixelContentBoxSize[0].blockSize
      dpr = 1
    } else {
      w = entry.contentRect.width
      h = entry.contentRect.height
      dpr = window.devicePixelRatio
    }

    state!.display = [Math.round(w * dpr), Math.round(h * dpr)]
  }

  const resizeCanvasToDisplaySize = (canvas: HTMLCanvasElement) => {
    const [w, h] = state!.display
  
    const needResize = canvas.width !== w || canvas.height !== h;
  
    if (needResize) {
      //console.log("Resize", w, h)
      canvas.width = w;
      canvas.height = h;
    }
  
    return needResize;
  }

  const { pause, resume } = useRafFn(
    (args) => {
      if (state) {
        const canvas = canvasRef.value!

        resizeCanvasToDisplaySize(canvas)

        renderer.onRender?.({ ...state, ...args })
      }
    },
    { immediate: false }
  )

  useResizeObserver(canvasRef, (entries) => {
    if (state) {
      updateDisplaySize(entries[0])

      renderer.onResize?.({ ...state, entries })
    }
  })

  for (const [event, listener] of Object.entries(listeners)) {
    useEventListener(canvasRef, event, listener as any)
  }

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

    const { alphaMode } = options

    context.configure({ device, format, alphaMode })

    state = { adapter, device, context, format, display: [1920,1080] }
  }

  const finalize = () => {
    console.log('useWebGpu::finalize')

    state = null
  }

  return null
}
