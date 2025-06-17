<script lang="ts" setup>
import { computed, ref } from 'vue'

import useWebGpu, { type WebGpuResource, type UseWebGpuOptions } from '@/composables/useWebGpu'
import type {HTMLElementEventListenerMap} from "@/types"

export interface Props {
  renderer: WebGpuResource
  options?: UseWebGpuOptions
  listeners?: HTMLElementEventListenerMap
}

const props = withDefaults(defineProps<Props>(), {
  options: () => ({
    size: [1920, 1080]
  }),
  listeners: () => ({}),
})

const width = computed(() => props.options.size?.[0] ?? 1920)
const height = computed(() => props.options.size?.[1] ?? 1080)

const canvasRef = ref<HTMLCanvasElement>()

const successRef = ref<boolean>(true);

successRef.value = await useWebGpu(canvasRef, props.renderer, props.listeners, props.options)
</script>

<template>
  <canvas v-if="successRef" ref="canvasRef" class="cursor-default" :width="width" :height="height" tabindex="1"></canvas>
  <div v-else class="flex items-center justify-center">WebGPU not supported.</div>
</template>

<style scoped>
</style>
