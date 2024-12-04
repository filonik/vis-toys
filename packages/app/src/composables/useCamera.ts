import { computed, reactive } from 'vue'

import type { GeneralEventListener } from '@vueuse/core'

import { type BaseArgType } from 'wgpu-matrix'

import { mat4f } from "@/lib/tensors"

export type HTMLElementEventListenerMap = Partial<{
  [E in keyof HTMLElementEventMap]: GeneralEventListener<HTMLElementEventMap[E]>
}>;

export default function useCamera(position?: Array<number>, origin?: Array<number>) {
  const state = reactive({
    isDown: false,
    position: position ?? [-1, 0, 0], // r, theta, phi
    origin: origin ?? [0, 0, 0],
  })

  const listeners: HTMLElementEventListenerMap = {
    pointerdown: (event: PointerEvent) => {
      state.isDown = true
      const canvas = event.target as HTMLCanvasElement
      canvas.setPointerCapture(event.pointerId)
    },
    pointermove: (event: PointerEvent) => {
      if (!state.isDown) return;
      const canvas = event.target as HTMLCanvasElement
      const display = [canvas.width, canvas.height]
      const aspect = Math.min(...display)
      const delta = [
        +event.movementX * 4.0/aspect,
        +event.movementY * 4.0/aspect,
        0
      ]
      if (event.altKey || event.metaKey) {
        state.origin[0] += delta[0]
        state.origin[1] -= delta[1]
      } else {
        state.position[1] += delta[0]
        state.position[2] += delta[1]
      }
    },
    pointerup: (event: PointerEvent) => {
      state.isDown = false
    },
    wheel: (event: WheelEvent) => {
      const delta = event.deltaY/100.0
      state.position[0] += delta
    }
  }

  const transformInplace = (dst: BaseArgType) => {
    mat4f.identity(dst)
    mat4f.translate(dst, [0, 0, state.position[0]], dst)
    mat4f.rotateY(dst, state.position[2], dst)
    mat4f.rotateZ(dst, state.position[1], dst)
    mat4f.translate(dst, state.origin, dst)
    return dst
  }

  const transform = computed(() => {
    return transformInplace(mat4f.create())
  })

  return { listeners, transform, transformInplace }
}