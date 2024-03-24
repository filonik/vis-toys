<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useDark, useVModel } from "@vueuse/core"

//import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import * as monaco from 'monaco-editor'

export interface Props {
  modelValue: string
  language?: string
}

const props = withDefaults(defineProps<Props>(), {
  language: "json"
})

const emit = defineEmits(['update:modelValue'])

const value = useVModel(props, 'modelValue', emit)

const elementRef = ref<HTMLElement>()

const isDark = useDark();
const options: monaco.editor.IStandaloneEditorConstructionOptions = {
  language: props.language,
  theme: isDark.value? 'vs-dark': 'vs',
  minimap: { enabled: false },
  autoIndent: "full"
}

let editor: monaco.editor.IStandaloneCodeEditor
onMounted(() => {
  const domElement = elementRef.value
  if(domElement) {
    editor = monaco.editor.create(domElement, {
      ...options,
      value: value.value,  
    })
    editor.onDidChangeModelContent(() => {
      value.value = editor.getValue()
    })
  }
})
</script>

<template>
  <div ref="elementRef"></div>
</template>

<style scoped>
</style>