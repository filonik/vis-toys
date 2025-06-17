import type { GeneralEventListener } from '@vueuse/core'

export type HTMLElementEventListenerMap = Partial<{
  [E in keyof HTMLElementEventMap]: GeneralEventListener<HTMLElementEventMap[E]>
}>;
