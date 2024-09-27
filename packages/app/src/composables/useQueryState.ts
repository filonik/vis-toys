import type { Ref } from 'vue'
import { computed, watch } from 'vue'
import type {LocationQuery, LocationQueryValue} from "vue-router"
import { useRoute, stringifyQuery } from "vue-router"

import { useClipboard } from '@vueuse/core'

import type { Maybe } from '@/lib/functors'
import type { Isomorphism } from '@/lib/morphisms'

import * as A from "@/lib/arrays"
import * as M from "@/lib/morphisms"
import * as O from "@/lib/objects"
import * as S from "@/lib/strings"

type AttributeCodec<T> = Isomorphism<LocationQueryValue | LocationQueryValue[], Maybe<T>>
type AttributeCodecs<T> = {[K in keyof T]: AttributeCodec<T[K]>}

export const StringCodec: AttributeCodec<string> = M.iso(
  (value) => A.unArray(value) ?? undefined,
  (value) => value ?? null
)

export const Base64UrlCodec: AttributeCodec<string> = M.iso.compose(StringCodec, M.iso.maybe(S.base64UrlToString))

// TODO: This is still wonky...
// S <~Codec~> T
// O.mapValues((v, k) => v(value[k]))(codecs)
// vs
// O.mapValues((v, k) => codecs[k](v))(value)
// ?
export const queryToState: <T>(codecs: AttributeCodecs<T>) => Isomorphism<LocationQuery, Partial<T>> = (codecs) => M.iso(
 (value) => O.mapValues((v, k) => v(value[k]))(codecs),
 (value) => O.mapValues((v, k) => v.inv(value[k]))(codecs),
)

export function useQuerySource<T>(state: Ref<T>, codecs: AttributeCodecs<T>) {
  const route = useRoute()

  const iso = queryToState(codecs)

  const source = computed(() => {
    const origin = window.location.origin
    const baseUrl = window.location.pathname
    const query = iso.inv(state.value)
    return origin + baseUrl + "#" + route.path + "?" + stringifyQuery(query)
  })
  
  const { copy } = useClipboard({ source })

  watch(
    () => route.query,
    (value) => {
      state.value = O.merge(state.value, iso(value))
    },
    { immediate: true }
  )

  return { copy, source }
}

export default function useQueryState<T>(state: Ref<T>, iso: Isomorphism<LocationQuery, Partial<T>>) {
  const route = useRoute()

  const source = computed(() => {
    const origin = window.location.origin
    const baseUrl = window.location.pathname
    const query = iso.inv(state.value)
    return origin + baseUrl + "#" + route.path + "?" + stringifyQuery(query)
  })
  
  const { copy } = useClipboard({ source })

  watch(
    () => route.query,
    (value) => {
      const newValue = iso(value)
      if(newValue) {
        state.value = O.merge(state.value, newValue)
      }
    },
    { immediate: true }
  )

  return { copy, source }
}