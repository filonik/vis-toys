<script lang="ts" setup>
import { computed } from "vue"
import { useVModel } from "@vueuse/core"

import * as A from "@/lib/arrays"

import type { NdArray } from "@/lib/ndarrays"
import { ndarrayRavel } from "@/lib/ndarrays"

import NumberInput from '@/components/NumberInput.vue'

export interface Props {
  modelValue: NdArray<number>
  index?: Array<number>
}

const props = withDefaults(defineProps<Props>(), {
  index: () => []
})

const emit = defineEmits(['update:modelValue'])

const value = useVModel(props, 'modelValue', emit)

const isArray = computed(() => props.index.length < props.modelValue.shape.length)

const indices = computed(() => A.range(0, props.modelValue.shape[props.index.length]).map((i) => [...props.index, i]))

const cls = computed(() => ["flex", props.index.length%2 == 0? "flex-row": "flex-col", "gap-1"])
</script>

<template>
  <div v-if="isArray" :class="cls">
    <NdArrayInput v-for="i in indices" v-model="value" :index="i" :key="`i-${i.join('-')}`"/>
  </div>
  <div v-else>
    <NumberInput v-model="value.data[ndarrayRavel(value)(...index)]" :step="0.01"/>
  </div>
</template>

<style scoped>
</style>
