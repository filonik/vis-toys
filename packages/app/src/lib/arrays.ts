import type {Maybe, Morphism} from "@/lib/types"

import * as M from "@/lib/monoids"

export * from "@/lib/functors/arrays"
export * from "@/lib/operators/arrays"

export const empty: <T>() => Array<T> = () => []

export const from: <T>(f: (i: number) => T, length: number) => Array<T> = (f, length) => {
  return Array.from({length}, (_, i) => f(i))
}

export const full: <T>(value: T, length: number) => Array<T> = (value, length) => from(() => value, length)

export const range: (lower: number, upper: number) => Array<number> = (lower, upper) => {
  const length = upper - lower
  return from((i) => lower + i, length)
}

export const linspace: (lower: number, upper: number, length: number) => Array<number> = (lower, upper, length) => {
  const step = (upper - lower)/length
  return from((i) => lower + i*step, length)
}

export const itemAt: (i: number) => <T>(v: T) => Array<Maybe<T>> = (i) => (v) => from((j) => i==j? v: undefined, i+1)

export const getItem: <T>(value: Array<T>) => (i: number) => Maybe<T> = (value) => (i) => value[i]
export const itemGetter: (i: number) => <T>(value: Array<T>) => Maybe<T> = (i) => (value) => value[i]

export const reduce: <S,T>(m: M.LeftMonoid<S,T>) => Morphism<Array<S>, T> = ({append, empty}) => {
  return (xs) => {
    let result = empty()
    for (let x of xs) {
      result = append(result, x)
    }
    return result
  }
}

export const all: (values: Array<boolean>) => boolean = reduce(M.And)
export const any: (values: Array<boolean>) => boolean = reduce(M.Or)

export const sum: (values: Array<number>) => number = reduce(M.Add)
export const product: (values: Array<number>) => number = reduce(M.Mul)

export const minimum: (values: Array<number>) => number = reduce(M.Min)
export const maximum: (values: Array<number>) => number = reduce(M.Max)

export const CartesianMul: <T>() => M.LeftMonoid<Array<T>, Array<Array<T>>> = () => ({
  append: (x, y) => x.flatMap((d) => y.map((e) => [...d, e])),
  empty: () => [[]],
})

export const cartesianProduct: <T>(values: Array<Array<T>>) => Array<Array<T>> = reduce(CartesianMul())

//export const sort:
//export const filter:
//export const reverse:

export const reverse: <T>(value: Array<T>) => Array<T> = (value) => value.slice().reverse()

export const unArray = <T>(value: T | Array<T>) => Array.isArray(value)? value[0]: value

export const concat: <T>(...values: Array<Array<T>>) => Array<T> = (...values) => empty().concat(...values) as any



// Different kinds of arrays (see Awkward Arrays)

// Rectangular Arrays
// Independent Domains

// Jagged Arrays 
// Dependend Domains (Indices are Rectangular Array)
//
// type JaggedArray<T> = T | Array<T> | Array<Array<T>> | ...

// Ragged Arrays
// Dependend Domains (Indices are Jagged Array)
// 
// type RaggedArray<T> = T | Array<T | Array<T | ... >>
//
// Conceptually I want to write this as a fixed-point:
// type RaggedArrayF<T, R> = T | Array<R>
// type RaggedArray<T> = RaggedArrayF<T, RaggedArray<T>>
//
// But Typescript doesn't like circular references.
// (see https://stackoverflow.com/questions/72604113/compute-type-fixed-point)
//
// Next best thing:

type TypeRef = { "value": unknown }
type UnRef<R extends TypeRef> = R["value"]

type RaggedArrayF<T, R extends TypeRef> = T | Array<UnRef<R>>
type RaggedArrayRef<T> = {
  "value": RaggedArrayF<T, RaggedArrayRef<T>>
}

export type RaggedArray<T> = UnRef<RaggedArrayRef<T>>
