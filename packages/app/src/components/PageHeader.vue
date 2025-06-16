<script lang="ts" setup>
import { useVModel } from "@vueuse/core"

import ShareLinkButton from '@/components/ShareLinkButton.vue'
import ToggleDarkButton from '@/components/ToggleDarkButton.vue'

export interface Props {
  modelValue: object
  title: string
}

const props = defineProps<Props>()

const emit = defineEmits(['update:modelValue'])

const value = useVModel(props, 'modelValue', emit)
</script>

<template>
  <header class="flex flex-row items-center h-12 p-1 border-b-2 border-border">
    <h1 class="px-2">{{ title }}</h1>
    <span class="flex-grow"></span>
    <ShareLinkButton v-model="value"/>
    <ToggleDarkButton/>
  </header>
</template>