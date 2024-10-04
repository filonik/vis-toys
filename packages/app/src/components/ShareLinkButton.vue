<script lang="ts" setup>
import type { Ref } from 'vue'
import { useVModel } from "@vueuse/core"

import { ArrowUpOnSquareIcon } from '@heroicons/vue/24/outline'

import useQueryState, { Base64UrlCodec } from "@/composables/useQueryState"

import * as M from "@/lib/morphisms"
import * as S from "@/lib/strings"

export interface Props {
  modelValue: object
}

const props = defineProps<Props>()

const emit = defineEmits(['update:modelValue'])

const value = useVModel(props, 'modelValue', emit)

const stringToJson = M.iso.maybe(S.stringToJson5())

const { copy } = useQueryState(value, M.iso(
  ({ state }) => stringToJson(Base64UrlCodec(state)),
  (value) => ({ state: Base64UrlCodec.inv(stringToJson.inv(value)) }),
))
</script>

<template>
  <button class="rounded-lg p-2" type="button" @click="copy()" >
    <ArrowUpOnSquareIcon class="w-5 h-5"/>
  </button>
</template>

<style scoped>
</style>
