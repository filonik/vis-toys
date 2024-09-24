<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue"
import { useEventListener, toReactive } from '@vueuse/core';

import { ArrowUpOnSquareIcon } from '@heroicons/vue/24/outline'

import useQuerySource, { Base64UrlCodec } from "@/composables/useQuerySource"

import CodeEditor from '@/components/CodeEditor.vue'
import WebGpuCanvas from '@/components/WebGpuCanvas.vue'
import ToggleDarkButton from '@/components/ToggleDarkButton.vue'

import { stringToJson5 } from "@/lib/strings"

import { BasicSimplicialMesh, ParseError } from "@/lib/loaders/meshes"

const stringToJson = stringToJson5({space: 2})

const DEFAULT_SOURCE = `{
  "vertices": [
    {"position": [-0.5, -0.5], "distance": [1,0,0,1], "color": "red"},
    {"position": [-0.5, 0.5], "distance": [1,1,0,0], "color": "green"},
    {"position": [0.5, -0.5], "distance": [0,0,1,1], "color": "blue"},
    {"position": [0.5, 0.5], "distance": [0,1,1,0], "color": "yellow"}
  ],
  "indices": [0, 1, 2, 1, 2, 3]
}`

type State = {
  source: string
}

const stateRef = ref<State>({
  source: DEFAULT_SOURCE,
})

const meshRef = ref<BasicSimplicialMesh|null>(null)

const state = toReactive(stateRef)

const { copy } = useQuerySource(stateRef, {
  source: Base64UrlCodec
})

const save = (state: State) => {
  try {
    const value = stringToJson(state.source)
    meshRef.value = BasicSimplicialMesh.parse(value)
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error(error.message)
    } else if (error instanceof ParseError) {
      for (let issue of error.issues) {
        console.error(issue.message)
      }
    } else {
      throw error;
    }
  }
}

const isShortcutSave: (event: KeyboardEvent) => boolean = (event) => {
  switch(event.key) {
    case "Enter":
      return event.shiftKey
    case "s":
    case "S":
      return event.ctrlKey || event.metaKey
    default:
      return false
  }
}

useEventListener(document, 'keydown', (event) => {
  if (isShortcutSave(event)) {
    event.stopPropagation()
    event.preventDefault()
    save(state)
  }
})

watch(stateRef, save)

save(state)
</script>

<template>
  <header class="flex flex-row items-center h-12 p-1 border-b-2 border-border">
    <h1 class="px-2">Simplicial Mesh</h1>
    <span class="flex-grow"></span>
    <button class="rounded-lg p-2" type="button" @click="copy()" >
      <ArrowUpOnSquareIcon class="w-5 h-5"/>
    </button>
    <ToggleDarkButton/>
  </header>
  <main class="h-full grid grid-rows-2 grid-cols-none md:grid-rows-none md:grid-cols-2">
    <CodeEditor v-model="state.source"/>
    <pre class="text-xs">{{ stringToJson.inv(meshRef) }}</pre>
    <!--
    <Suspense>
      <WebGpuCanvas class="h-full w-full" :renderer :listeners :options/>
    </Suspense>
    -->
  </main>
</template>

<style scoped>
</style>
