import { onMounted, onBeforeUnmount } from 'vue'
import type { Ref } from 'vue'

import { useEventListener, useRafFn, useResizeObserver } from '@vueuse/core'
import type { UseRafFnCallbackArguments } from '@vueuse/core'

import type {HTMLElementEventListenerMap} from '@/types'

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
  size?: [number, number]
  autoResize?: boolean
  features?: Array<GPUFeatureName>
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

  const getDisplaySize: (entry: ResizeObserverEntry) => [number,number] = (entry) => {
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

    return [Math.round(w * dpr), Math.round(h * dpr)]
  }

  const resizeCanvas = (canvas: HTMLCanvasElement, size: [number,number]) => {
    const [w, h] = size
  
    const needsResize = canvas.width !== w || canvas.height !== h;
  
    if (needsResize) {
      //console.log("Resize", w, h)
      canvas.width = w
      canvas.height = h
    }
  
    return needsResize
  }

  const { pause, resume } = useRafFn(
    (args) => {
      if (state) {
        if (options.autoResize) {
          const canvas = canvasRef.value
          resizeCanvas(canvas!, state.display)
        }
        renderer.onRender?.({ ...state, ...args })
      }
    },
    { immediate: false }
  )

  useResizeObserver(canvasRef, (entries) => {
    if (state) {
      state.display = getDisplaySize(entries[0])

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
    return false
  }

  const adapter = await navigator.gpu.requestAdapter()

  if (!adapter) {
    console.log('Invalid adapter.')
    return false
  }

  const { features = [] } = options
  const requiredFeatures: Array<GPUFeatureName> = []
  for (let feature of features) {
    if (adapter.features.has(feature)) {
      requiredFeatures.push(feature)
    } else {
      console.warn(`Requested feature not supported: "${feature}".`)
    }
  }

  const device = await adapter.requestDevice({ requiredFeatures })

  if (!device) {
    console.log('Invalid device.')
    return false
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

    const {width, height} = canvas.getBoundingClientRect()

    state = { adapter, device, context, format, display: [width, height] }
  }

  const finalize = () => {
    console.log('useWebGpu::finalize')

    state = null
  }

  return true
}
