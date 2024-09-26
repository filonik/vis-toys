export type Maybe<T> = T | undefined

export type Morphism<S, T> = (value: S) => T

export type MaybeType = {
  map<S,T>(f: Morphism<S,T>): Morphism<Maybe<S>, Maybe<T>>
}

export const maybe: MaybeType = {
  map: <S,T>(f: Morphism<S,T>) => (value: Maybe<S>) => value !== undefined? f(value): undefined
}
