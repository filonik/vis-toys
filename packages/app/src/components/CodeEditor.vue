<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useDark, useResizeObserver, useVModel } from "@vueuse/core"

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

const isDark = useDark()
const theme = computed(() => isDark.value? 'vs-dark': 'vs')

const options: monaco.editor.IStandaloneEditorConstructionOptions = {
  language: props.language,
  theme: theme.value,
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

watch(value, (value) => {
  if (editor) {
      if (value !== editor.getValue()) {
        editor.setValue(value)
      }
    }
  }
)

watch(theme, (value) => {
  monaco.editor.setTheme(value)
})

useResizeObserver(elementRef, (entries) => {
  if (editor) {
    const { width, height } = entries[0].contentRect
    //console.log("resize", width, height)
    editor.layout({ width, height })
  }
})
</script>

<template>
  <div ref="elementRef"></div>
</template>

<style scoped>
</style>