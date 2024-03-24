<script lang="ts" setup>
import { ref } from 'vue'

import useWebGpu, {type WebGpuResource} from '@/composables/useWebGpu'

export interface Props {
  renderer: WebGpuResource,
  width?: number
  height?: number
}

const props = withDefaults(defineProps<Props>(), {
  width: 1920,
  height: 1080,
})

const canvasRef = ref<HTMLCanvasElement>()

await useWebGpu(canvasRef, props.renderer)
</script>

<template>
  <canvas ref="canvasRef" :width="width" :height="height"></canvas>
</template>

<style scoped>
</style>
