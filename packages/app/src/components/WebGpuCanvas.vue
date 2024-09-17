<script lang="ts" setup>
import { ref } from 'vue'

import useWebGpu, { type HTMLElementEventListenerMap, type WebGpuResource, type UseWebGpuOptions } from '@/composables/useWebGpu'

export interface Props {
  renderer: WebGpuResource
  listeners: HTMLElementEventListenerMap
  width?: number
  height?: number
  options?: UseWebGpuOptions
}

const props = withDefaults(defineProps<Props>(), {
  width: 1920,
  height: 1080,
  listeners: () => ({}),
  options: () => ({})
})

const canvasRef = ref<HTMLCanvasElement>()

await useWebGpu(canvasRef, props.renderer, props.listeners, props.options)
</script>

<template>
  <canvas ref="canvasRef" :width="width" :height="height" tabindex="1"></canvas>
</template>

<style scoped>
</style>
