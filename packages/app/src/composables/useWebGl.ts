import { onMounted, onBeforeUnmount } from 'vue'
import type { Ref } from 'vue'

import { useEventListener, useRafFn, useResizeObserver } from '@vueuse/core'
import type { UseRafFnCallbackArguments } from '@vueuse/core'

import type {HTMLElementEventListenerMap} from '@/types'

export type WebGlState = {
  context: WebGL2RenderingContext
}

export type UseWebGlOptions = {
    options?: WebGLContextAttributes,
    size?: [number, number]
}

export type CreateArguments = WebGlState
export type RenderArguments = WebGlState & UseRafFnCallbackArguments
export type UpdateArguments = WebGlState
export type DeleteArguments = WebGlState

export interface WebGlResource {
  onCreate?(args: CreateArguments): void
  onRender?(args: RenderArguments): void
  onUpdate?(args: UpdateArguments): void
  onDelete?(args: DeleteArguments): void
}

export default function useWebGl(
  canvasRef: Ref<HTMLCanvasElement | undefined>,
  renderer: WebGlResource,
  listeners: HTMLElementEventListenerMap = {},
  options: UseWebGlOptions = {},
) {
  let state: WebGlState | null = null

  const { pause, resume } = useRafFn(
    (args) => {
      if (state) {
        renderer.onRender?.({ ...state, ...args })
      }
    },
    { immediate: false }
  )

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

  const initialize = () => {
    console.log('useWebGl::initialize')

    const canvas = canvasRef.value

    if (!canvas) {
      console.log('Invalid canvas.')
      return
    }

    const context = canvas.getContext('webgl2', options.options)

    if (!context) {
      console.log('Invalid context.')
      return
    }

    state = { context }
  }

  const finalize = () => {
    console.log('useWebGl::finalize')

    state = null
  }

  return true
}