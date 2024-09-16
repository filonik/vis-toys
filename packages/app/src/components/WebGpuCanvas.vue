<script lang="ts" setup>
import { ref } from 'vue'

import useWebGpu, {type WebGpuResource, type HTMLElementEventListenerMap} from '@/composables/useWebGpu'

export interface Props {
  renderer: WebGpuResource,
  listeners: HTMLElementEventListenerMap,
  width?: number
  height?: number
}

const props = withDefaults(defineProps<Props>(), {
  listeners: () => ({}),
  width: 1920,
  height: 1080,
})

const canvasRef = ref<HTMLCanvasElement>()

await useWebGpu(canvasRef, props.renderer, props.listeners)
</script>

<template>
  <canvas ref="canvasRef" :width="width" :height="height" tabindex="1"></canvas>
</template>

<style scoped>
</style>
