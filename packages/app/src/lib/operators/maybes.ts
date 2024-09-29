import * as O from "@/lib/operators"

import { mapN } from "@/lib/functors/maybes"

export const add = mapN(O.add)
export const sub = mapN(O.sub)
export const mul = mapN(O.mul)
export const div = mapN(O.div)

export const quo = mapN(O.quo)
export const rem = mapN(O.rem)
export const mod = mapN(O.mod)
