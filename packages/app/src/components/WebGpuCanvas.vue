<script lang="ts" setup>
import { ref } from 'vue'

import useWebGpu, { type HTMLElementEventListenerMap, type WebGpuResource, type UseWebGpuOptions } from '@/composables/useWebGpu'

export interface Props {
  renderer: WebGpuResource
  width?: number
  height?: number
  options?: UseWebGpuOptions
  listeners?: HTMLElementEventListenerMap
}

const props = withDefaults(defineProps<Props>(), {
  width: 1920,
  height: 1080,
  options: () => ({}),
  listeners: () => ({}),
})

const canvasRef = ref<HTMLCanvasElement>()

const successRef = ref<boolean>(true);

successRef.value = await useWebGpu(canvasRef, props.renderer, props.listeners, props.options)
</script>

<template>
  <canvas v-if="successRef" ref="canvasRef" class="cursor-default focus:outline-none focus:ring focus:ring-inset focus:ring-border-hover" :width="width" :height="height" tabindex="1"></canvas>
  <div v-else class="flex items-center justify-center">WebGPU not supported.</div>
</template>

<style scoped>
</style>
