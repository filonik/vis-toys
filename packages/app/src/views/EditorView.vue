<script setup lang="ts">
import { reactive } from "vue"

import CodeEditor from '@/components/CodemirrorEditor.vue'

const state = reactive({
  source: "",
})
</script>

<template>
  <main class="h-full flex">
    <CodeEditor class="flex-grow" v-model="state.source"/>
  </main>
</template>

<style scoped>

</style>
