import type { Ref } from 'vue'
import { computed, watch } from 'vue'
import type {LocationQuery, LocationQueryValue} from "vue-router"
import { useRoute, stringifyQuery } from "vue-router"

import { useClipboard } from '@vueuse/core'

import type { Maybe } from '@/lib/functors'
import type { Isomorphism } from '@/lib/morphisms'

import { unArray } from "@/lib/arrays"
import { iso } from "@/lib/morphisms"
import { base64UrlToString } from "@/lib/strings"

type AttributeCodec<T> = Isomorphism<LocationQueryValue | LocationQueryValue[], Maybe<T>>
type AttributeCodecs<T> = {[K in keyof T]: AttributeCodec<T[K]>}

export const StringCodec: AttributeCodec<string> = iso(
  (value) => unArray(value) ?? undefined,
  (value) => value ?? null
)

export const Base64UrlCodec: AttributeCodec<string> = iso.compose(StringCodec, iso.maybe(base64UrlToString))

export const isDefined: (v: any) => boolean = (v) => v !== null && v !== undefined
export const mapAndFilterValues: (f: (value: any, key?: any) => any, g: (value: any, key?: any) => boolean) => (value: any) => any = (f,g) => (value) => Object.fromEntries(
  Object.entries(value)
    .map(([k, v]) => [k, f(v, k)])
    .filter(([k, v]) => g(v, k))
)

// TODO: This is still wonky...
// S <~Codec~> T
// mapAndFilterValues((v, k) => v(value[k]), isDefined)(codecs)
// vs
// mapAndFilterValues((v, k) => codecs[k](v), isDefined)(value)
// ?
export const queryToState: <T>(codecs: AttributeCodecs<T>) => Isomorphism<LocationQuery, Partial<T>> = (codecs) => iso(
 (value) => mapAndFilterValues((v, k) => v(value[k]), isDefined)(codecs),
 (value) => mapAndFilterValues((v, k) => v.inv(value[k]), isDefined)(codecs),
)

export default function useQuerySource<T>(state: Ref<T>, codecs: AttributeCodecs<T>) {
  const route = useRoute()

  const iso = queryToState(codecs)

  const source = computed(() => {
    const origin = window.location.origin
    const baseUrl = window.location.pathname
    const query = iso.inv(state.value)
    return origin + baseUrl + "#" + route.path + "?" + stringifyQuery(query)
  })
  
  const { copy } = useClipboard({ source })

  const update = (value: LocationQuery) => {
    state.value = {
      ...state.value,
      ...iso(value)
    }
  }

  watch(
    () => route.query,
    update,
    { immediate: true }
  )

  return { copy, source }
}