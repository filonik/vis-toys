<script lang="ts" setup>
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useDark, useResizeObserver, useVModel } from "@vueuse/core"

import { EditorState, Compartment, type Extension, type EditorStateConfig } from '@codemirror/state'
import { EditorView, ViewUpdate } from '@codemirror/view'
import { oneDark } from '@codemirror/theme-one-dark'

const oneLight: any = []

export interface Props {
  options?: EditorStateConfig,
  modelValue: string
}

const props = defineProps<Props>()

const emit = defineEmits(['focus', 'blur', 'update:modelValue'])

const modelValue = useVModel(props, 'modelValue', emit)

const elementRef = ref<HTMLElement>()

const isDark = useDark()
const theme = computed(() => isDark.value? oneDark: oneLight)

let state: EditorState | null = null
let view: EditorView | null = null
let themeConfig: Compartment | null = null

const doc = (view: EditorView) => {
  const result = {
    get value() {
      return view.state.doc.toString()
    },
    set value(value: string) {
      if (value !== result.value) {
        view.dispatch({
          changes: {
            from: 0,
            to: view.state.doc.length,
            insert: value
          }
        })
      }
    }
  }
  return result
}

const onFocus = (viewUpdate: ViewUpdate) => {
  emit('focus')
}
const onBlur = (viewUpdate: ViewUpdate) => {
  emit('blur')
}
const onChange = (value: string, viewUpdate: ViewUpdate) => {
  modelValue.value = value
}

onMounted(() => {
  themeConfig = new Compartment()
  
  const userConfig: EditorStateConfig = props.options ?? {}

  const baseConfig: EditorStateConfig = {
    doc: modelValue.value,
    extensions: [
      EditorView.updateListener.of((viewUpdate) => {
        // https://discuss.codemirror.net/t/codemirror-6-proper-way-to-listen-for-changes/2395/11
        //onUpdate(viewUpdate)
        
        if (viewUpdate.docChanged) {
          onChange(viewUpdate.state.doc.toString(), viewUpdate)
        }
        
        if (viewUpdate.focusChanged) {
          viewUpdate.view.hasFocus ? onFocus(viewUpdate) : onBlur(viewUpdate)
        }
      }),
      themeConfig.of(theme.value)
    ]
  }

  const config: EditorStateConfig = {
    ...userConfig,
    ...baseConfig,
    extensions: [
      userConfig.extensions ?? [],
      baseConfig.extensions ?? [],
    ]
  }

  state = EditorState.create(config)

  view = new EditorView({
    parent: elementRef.value,
    state,
  })
})

onBeforeUnmount(() => {
  if (view) {
    view.destroy()
  }
})

watch(theme, (value) => {
  if (view && themeConfig) {
    view.dispatch({
      effects: themeConfig.reconfigure(value)
    });
  }
})

watch(modelValue, (value) => {
  if (view) {
    doc(view).value = value
  }
})
</script>

<template>
  <div ref="elementRef"></div>
</template>

<style>
.cm-editor {
  @apply h-full bg-white dark:bg-[#222];
}
.cm-gutters {
  @apply !bg-white dark:!bg-[#222];
}
</style>
