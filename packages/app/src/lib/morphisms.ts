import * as F from "@/lib/functors"

export type Morphism<S, T> = (value: S) => T
export type Endomorphism<T> = Morphism<T, T>
export type Isomorphism<S,T> = Morphism<S, T> & { inv: Isomorphism<T, S> }

export type IsomorphismType = {
  <S,T>(f: Morphism<S, T>, g: Morphism<T, S>): Isomorphism<S,T>
  compose<S,T,U>(f: Isomorphism<S,T>, g:Isomorphism<T,U>): Isomorphism<S,U>
  inverse<S,T>(f: Isomorphism<S,T>): Isomorphism<T,S>
  maybe<S,T>(i: Isomorphism<S,T>): Isomorphism<F.Maybe<S>,F.Maybe<T>>
}

export const identity: <T>() => Endomorphism<T> = () => (value) => value
export const constant: <S,T>(value: T) => Morphism<S,T> = (value) => () => value
export const compose: <S,T,U>(f: Morphism<S, T>, g: Morphism<T, U>) => Morphism<S, U> = (f, g) => (value) => g(f(value))

export const iso: IsomorphismType = (f, g) => {
  const _f: any = f
  const _g: any = g
  _f.inv = g
  _g.inv = f
  return _f
}

iso.compose = (f, g) => iso(compose(f, g), compose(g.inv, f.inv))
iso.inverse = (i) => iso(i.inv, i)
iso.maybe = (i) => iso(F.maybe.map(i), F.maybe.map(i.inv))

/*
type MapIsomorphism<S, T> = {
  [K in (keyof S & keyof T)]: Isomorphism<S[K], T[K]>
};

export const objectIso: <S, T>(isos: MapIsomorphism<S, T>) => Isomorphism<Partial<S>, Partial<T>> = (isos) => iso(
  (value) => Object.fromEntries(Object.entries(isos).map(
    ([k, v]) => [k, v(value[k])]
  )),
  (value) => Object.fromEntries(Object.entries(isos).map(
    ([k, v]) => [k, v.inv(value[k])]
  ))
)
*/