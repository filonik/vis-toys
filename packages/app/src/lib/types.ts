export type Morphism<S, T> = (value: S) => T
export type Endomorphism<T> = Morphism<T, T>
export type Isomorphism<S,T> = Morphism<S, T> & { inv: Isomorphism<T, S> }

export type Multimorphism<S extends unknown[], T> = (...values: S) => T


// Functors and Applicatives
// Unfortunately, this is not supported:
// export type Map<F, T extends unknown[]> = { [K in keyof T]: F<T[K]> }
//
// So instead:

export type Maybe<T> = T | undefined
export type Maybes<T extends unknown[]> = { [K in keyof T]: Maybe<T[K]> }

//export type Array<T>
export type Arrays<T extends unknown[]> = { [K in keyof T]: Array<T[K]> }

//export type Generator<T>
export type Generators<T extends unknown[]> = { [K in keyof T]: Generator<T[K]> }
