<script lang="ts" setup>
import { ref } from "vue" 
import { useVModel } from "@vueuse/core"

import chroma from 'chroma-js'

const DEFAULT_PALETTE = [
  "rgb(246, 53, 56)", 
  "rgb(191, 64, 69)", 
  "rgb(139, 68, 78)", 
  "rgb(65, 69, 84)",
  "rgb(53, 118, 78)",
  "rgb(47, 158, 79)",
  "rgb(48, 204, 90)",
]

const colorScale = chroma.scale(DEFAULT_PALETTE).domain([-1,+1])

export interface Props {
  modelValue: number
  step?: number
}

const props = withDefaults(defineProps<Props>(), {
  step: 1.0
})

const emit = defineEmits(['update:modelValue'])

const value = useVModel(props, 'modelValue', emit)

const divRef = ref<HTMLDivElement>()

let initial: {position?: [number, number], value?: number} = {}
let down = false
const onpointerdown = (event: PointerEvent) => {
  const position: [number,number] = [event.x, event.y]
  initial = {position, value: value.value}
  down = true
  document.body.classList.add("dragging")
  divRef.value?.setPointerCapture(event.pointerId)
  onpointermove(event)
}
const onpointerup = (event: PointerEvent) => {
  if (down) {
    event.preventDefault()
    event.stopPropagation()
    initial = {position: [0,0]}
    down = false
    document.body.classList.remove("dragging")
    divRef.value?.focus()
  }
}
const onpointermove = (event: PointerEvent) => {
  if (down) {
    event.preventDefault()
    event.stopPropagation()
    const position: [number,number]  = [event.x, event.y]
    const delta = position[1] - initial.position![1]
    value.value = initial.value! - delta*props.step
  }
}
const onkeyup = (event: KeyboardEvent) => {
  if (event.code == "Digit0") {
    value.value = 0
  }
  if (event.code == "Digit1") {
    value.value = event.shiftKey? -1: +1
  }
}
</script>

<template>
  <!--
  <input class="w-8 h-8" type="number" step="0.1" v-model="value"/>
  -->
  <div ref="divRef" class="w-5 h-5 border border-border hover:border-heading" :style="{backgroundColor: colorScale(value).hex()}" @pointerdown="onpointerdown" @pointermove="onpointermove" @pointerup="onpointerup" tabindex="0" @keydown="onkeyup"></div>
</template>

<style>
.dragging {
  pointer-events: none;
}
</style>
