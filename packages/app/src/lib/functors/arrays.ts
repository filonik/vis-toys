import type {Arrays, Morphism, Multimorphism} from "@/lib/types"

type Map = <S, T>(f: Morphism<S, T>) => Morphism<Array<S>, Array<T>> 
type MapN = <S extends unknown[], T>(f: Multimorphism<S,T>) => Multimorphism<Arrays<S>, Array<T>> 

export const map: Map = (f) => (xs) => xs.map(f)

const length = <T>(value: Array<T>) => value.length
const minimum = (value: Array<number>) => Math.min(...value)
const maximum = (value: Array<number>) => Math.max(...value)

const minimumLength = <T>(arrays: Array<Array<T>>) => minimum(arrays.map(length))
const maximumLength = <T>(arrays: Array<Array<T>>) => maximum(arrays.map(length))

const zipWithShortest: MapN =
  (f) =>
  (...arrays: any) =>
    Array.from({ length: minimumLength(arrays) }, (_, i) => f(...arrays.map((a: any[]) => a[i])))

const zipWithLongest: MapN =
  (f) =>
  (...arrays: any) =>
    Array.from({ length: maximumLength(arrays) }, (_, i) => f(...arrays.map((a: any[]) => a[i])))

export const zipWith: MapN = zipWithShortest
//export const zipWith: MapN = zipWithLongest

export const mapN: MapN = zipWith
