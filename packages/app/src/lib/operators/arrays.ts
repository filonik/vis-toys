import * as O from "@/lib/operators"

import { map, mapN } from "@/lib/functors/arrays"

export const add = mapN(O.add)
export const sub = mapN(O.sub)
export const mul = mapN(O.mul)
export const div = mapN(O.div)

export const quo = mapN(O.quo)
export const rem = mapN(O.rem)
export const mod = mapN(O.mod)


type MapL = <S0, S1, T>(f: (x: S0, y: S1) => T) => (xs: Array<S0>, y: S1) => Array<T>
type MapR = <S0, S1, T>(f: (x: S0, y: S1) => T) => (x: S0, ys: Array<S1>) => Array<T>

export const mapL: MapL = <S0, S1, T>(f: (x: S0, y: S1) => T) => (xs: S0[], y: S1) => map<S0,T>((x) => f(x, y))(xs)
export const mapR: MapR = <S0, S1, T>(f: (x: S0, y: S1) => T) => (x: S0, ys: S1[]) => map<S1,T>((y) => f(x, y))(ys)

export const adds = mapL(O.add)
export const subs = mapL(O.sub)
export const muls = mapL(O.mul)
export const divs = mapL(O.div)
