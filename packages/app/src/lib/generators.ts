import type {Maybe, Morphism} from "@/lib/types"

import * as M from "@/lib/monoids"

export * from "@/lib/functors/generators"
export * from "@/lib/operators/generators"

export const reduce: <S,T>(m: M.LeftMonoid<S,T>) => Morphism<Generator<S>, T> = ({append, empty}) => {
  return (xs) => {
    let result = empty()
    for (let x of xs) {
      result = append(result, x)
    }
    return result
  }
}

export const cumulative: <S,T>(m: M.LeftMonoid<S,T>) => Morphism<Generator<S>, Generator<T>> = ({append, empty}) => {
  return function*(xs) {
    let result = empty()
    for (let x of xs) {
      yield result
      result = append(result, x)
    }
  }
}

// Given
// xs = [x0, undefined, x1, undefined, x2]
// ys = [y0, y1, y2, y3]
// Return
// zs =  [x0, y0, x1, y1, x2, y2, y3]
export const complete = function*<T>(xs: Array<Maybe<T>>, ys: Array<T>): Generator<T> {
  for (let i0 = 0, i1 = 0; i0 < xs.length || i1 < ys.length;) {
    const x = xs[i0++]
    if (x !== undefined) {
      yield x
      continue
    }
    const y = ys[i1++]
    if (y !== undefined) {
      yield y
      continue
    }
    // Error: Ran out of values to combine.
    console.error("Ran out of values to combine.")
    break
  }
}
