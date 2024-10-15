<script lang="ts" setup>
import { computed } from "vue"
import { useVModel } from "@vueuse/core"

import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/solid'

export interface Props {
  modelValue: boolean
}

const props = defineProps<Props>()

const emit = defineEmits(['update:modelValue'])

const value = useVModel(props, 'modelValue', emit)

const toggle = () => {
  value.value = !value.value
}
</script>

<template>
  <button class="rounded-lg p-2" type="button" @click="toggle()">
    <EyeSlashIcon class="w-5 h-5" :class="[value? 'hidden': 'visible']"/>
    <EyeIcon class="w-5 h-5" :class="[value? 'visible': 'hidden']"/>
  </button>
</template>

<style scoped>
</style>
