import * as A from "@/lib/arrays"

import type { Maybe, Maybes, Morphism, Multimorphism } from "@/lib/types"

type Map = <S,T>(f: Morphism<S, T>) => Morphism<Maybe<S>, Maybe<T>> 
type MapN = <S extends unknown[], T>(f: Multimorphism<S,T>) => Multimorphism<Maybes<S>, Maybe<T>> 

export const coalesce: <T>(x: Maybe<T>, y: T) => T = (x,y) => x ?? y

function isDefined<T>(value: Maybe<T>): value is T {
  return value !== undefined
}

function areDefined<T extends unknown[]>(values: Maybes<T>): values is T {
  return A.all(A.map(isDefined)(values))
}

export const map: Map = (f) => (value) => isDefined(value)? f(value): undefined
export const mapN: MapN = (f) => (...values) => areDefined(values)? f(...values): undefined
