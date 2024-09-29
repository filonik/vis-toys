import * as O from "@/lib/operators"

export type LeftMonoid<S, T> = {
  append: (x: T, y: S) => T,
  empty: () => T
}

export type Monoid<T> = LeftMonoid<T,T>

export const And: Monoid<boolean> = {
  append: O.and,
  empty: () => true
}

export const Or: Monoid<boolean> = {
  append: O.or,
  empty: () => false
}

export const Add: Monoid<number> = {
  append: O.add,
  empty: () => 0
}

export const Mul: Monoid<number> = {
  append: O.mul,
  empty: () => 1
}
