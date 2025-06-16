<script setup lang="ts">
import { ref, watch } from "vue"
import { useEventListener, toReactive } from '@vueuse/core';

import PageHeader from '@/components/PageHeader.vue'
import PageMain from '@/components/PageMain.vue'
import CodeEditor from '@/components/CodemirrorEditor.vue'

import { basicSetup } from 'codemirror'

import { StreamLanguage } from "@codemirror/language"
import { shader } from "@codemirror/legacy-modes/mode/clike"

//import { importCommon, importDual } from '@/lib/graphics/glsl/shaders'
import { process } from '@/lib/graphics/glsl/shaders/utilities'

const editorConfig = {
  extensions: [basicSetup, StreamLanguage.define(shader)]
}

type State = {
  source: string
}

const DEFAULT_SOURCE = `@plot_implicit
d2e2 f(d2e2vec2 x) {
  return x[0]*x[0] + x[1]*x[1] + x[2]*x[2] - 1.;
}
`

const stateRef = ref<State>({
  source: DEFAULT_SOURCE
})

const state = toReactive(stateRef)

const shaderSource = (source: string) => `
${source}
`

type ProcessedSource = {
  source: string,
}

const processedSource = ref<ProcessedSource | null>(null)

const preprocess: (source: string) => ProcessedSource = (source) => {
  return {
    source: source.replaceAll("@plot_implicit", "/*@plot_implicit*/"),
    //info: reflect(source)
  }
}

const save = (state: State) => {
  const result = preprocess(state.source)

  result.source = process(result.source, {
    quiet: true
  })

  result.source = shaderSource(result.source)

  processedSource.value = result
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

watch(stateRef, save, { immediate: true })
</script>

<template>
  <PageHeader title="Plot View" v-model="stateRef"></PageHeader>
  <PageMain>
    <template v-slot:input>
      <CodeEditor class="h-full" v-model="state.source" :options="editorConfig"/>
    </template>
    <template v-slot:output>
      <pre class="h-full text-xs overflow-scroll">{{ processedSource?.source }}</pre>
    </template>
  </PageMain>
</template>
