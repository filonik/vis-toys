import * as F from "@/lib/functors"
import * as M from "@/lib/morphisms"

export const getitem: <T>(value: Array<T>) => (i: number) => F.Maybe<T> = (value) => (i) => value[i]
export const itemgetter: (i: number) => <T>(value: Array<T>) => F.Maybe<T> = (i) => (value) => value[i]

export const withDefault: <T>(f: (i: number) => F.Maybe<T>, g: (i: number) => T) => (i: number) => T = (f, g) => (i) => f(i) ?? g(i)

export const from: <T>(f: (i: number) => T, length: number) => Array<T> = (f, length) => {
  return Array.from({length}, (_, i) => f(i))
}

export const repeat: <T>(value: T, length: number) => Array<T> = (value, length) => from(M.constant(value), length)

export const range: (lower: number, upper: number) => Array<number> = (lower, upper) => {
  const length = upper - lower
  return from((i) => lower + i, length)
}

export const linspace: (lower: number, upper: number, length: number) => Array<number> = (lower, upper, n) => {
  const step = (upper - lower)/n
  return from((i) => lower + i*step, length)
}

export const unArray = <T>(value: T | Array<T>) => Array.isArray(value)? value[0]: value
