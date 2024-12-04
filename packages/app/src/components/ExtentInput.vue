<script lang="ts" setup>
import type { Ref } from 'vue'
import { computed } from "vue"
import { useVModel } from "@vueuse/core"

import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

import * as A from "@/lib/arrays"

type Extent = [Array<number>, Array<number>]

export interface Props {
  modelValue: Extent
}

const props = defineProps<Props>()

const emit = defineEmits(['update:modelValue'])

const value = useVModel(props, 'modelValue', emit)

const setExtent: (newValue: [number, number], i: number) => void = (newValue, i) => {
  value.value = [
    value.value[0].map((v, j) => i==j? newValue[0]: v),
    value.value[1].map((v, j) => i==j? newValue[1]: v),
  ]
}

const indices = computed(() => A.range(0, value.value[0].length))

const items: Array<{
  name: string,
  value: [number, number],
}> = [
  {name: "-1, +1", value: [-1, +1]},
  {name: "-π, +π", value: [-Math.PI, +Math.PI]},
  {name: "-π/2, +π/2", value: [-Math.PI/2, +Math.PI/2]},
]
</script>

<template>
  <div v-for="i of indices" class="flex flex-row items-center gap-2" :key="i">
    <Menu as="div" class="relative inline-block text-left">
      <MenuButton class="w-16 text-xs text-right font-mono">x[{{ i }}]:</MenuButton>
      <MenuItems
      class="absolute left-0 mt-2 w-32 origin-top-left divide-y divide-border bg-background-mute shadow-lg ring-1 ring-border-hover focus:outline-none z-50">
        <MenuItem v-for="item of items" as="div" class="menu-item text-center" @click="setExtent(item.value, i)">{{ item.name }}</MenuItem>
      </MenuItems>
    </Menu>
    <input class="w-16" type="number" step="0.1" v-model="value[0][i]"/>
    <input class="w-16" type="number" step="0.1" v-model="value[1][i]"/>
  </div>
</template>

<style scoped>
.menu-item {
  @apply ui-active:bg-blue-500 ui-active:text-white ui-not-active:bg-background-mute ui-not-active:text-text;
}
</style>
