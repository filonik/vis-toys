<script lang="ts" setup>
import type { Ref } from 'vue'

import { useDark, useToggle } from '@vueuse/core';

import { SunIcon, MoonIcon } from '@heroicons/vue/24/solid'

const isDark: Ref<boolean> = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <button class="rounded-lg p-2" type="button" @click="toggleDark()">
    <MoonIcon class="w-5 h-5" :class="[isDark? 'hidden': 'visible']"/>
    <SunIcon class="w-5 h-5" :class="[isDark? 'visible': 'hidden']"/>
  </button>
</template>

<style scoped>
</style>
