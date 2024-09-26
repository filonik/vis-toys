import * as A from "@/lib/arrays"
import * as F from "@/lib/functors"

export type LazyScalar<T> = () => T
export type LazyVector<T> = (i: number) => T
export type LazyMatrix<T> = (i: number, j: number) => T
export type LazyTensor<T> = (...indices: number[]) => T

type EagerScalar<T> = T
type EagerVector<T> = Array<T>
type EagerMatrix<T> = Array<Array<T>>

type LazyScalarType = {
  fromEager<T>(value: F.Maybe<T>): LazyScalar<F.Maybe<T>>
  fromValue<T>(value: F.Maybe<T>): LazyScalar<F.Maybe<T>>
  set<T>(value: LazyScalar<T>, newValue: LazyScalar<F.Maybe<T>>): LazyScalar<T>
  I(): LazyScalar<number>
  toEager<T>(value: LazyScalar<T>): () => EagerScalar<T>
}

type LazyVectorType = {
  fromEager<T>(value: F.Maybe<Array<T>>): LazyVector<F.Maybe<T>>
  fromValue<T>(value: F.Maybe<T | Array<T>>): LazyVector<F.Maybe<T>>
  set<T>(value: LazyVector<T>, newValue: LazyVector<F.Maybe<T>>): LazyVector<T>
  ones(): LazyVector<number>
  zeros(): LazyVector<number>
  unit(i: number): LazyVector<number>
  toEager<T>(value: LazyVector<T>): (n: number) => EagerVector<T>
}

type LazyMatrixType = {
  fromEager<T>(value: F.Maybe<Array<Array<T>>>): LazyMatrix<F.Maybe<T>>
  fromValue<T>(value: F.Maybe<T| Array<T> | Array<Array<T>>>): LazyMatrix<F.Maybe<T>>
  set<T>(value: LazyMatrix<T>, newValue: LazyMatrix<F.Maybe<T>>): LazyMatrix<T>
  I(): LazyMatrix<number>
  ts(t: LazyVector<number>, s: LazyVector<number>): LazyMatrix<number>
  toEager<T>(value: LazyMatrix<T>): (m: number, n: number) => EagerMatrix<T> 
}

function isScalar<T>(value: any): value is T {
  return !Array.isArray(value)
}
function isVector<T>(value: any): value is T[] {
  return Array.isArray(value) && isScalar(value[0])
}
function isMatrix<T>(value: any): value is T[][] {
  return Array.isArray(value) && isVector(value[0])
}

export const lsca: LazyScalarType = {
  fromEager(value) {
    return () => value
  },
  fromValue(value) {
    return () => value
  },
  set(value, newValue) {
    return () => newValue() ?? value()
  },
  I() {
    return () => 1.0
  },
  toEager(value) {
    return value
  }
}

export const lvec: LazyVectorType = {
  fromEager(value) {
    return (i) => value?.[i]
  },
  fromValue(value) {
    return isVector(value)? lvec.fromEager(value): lsca.fromValue(value)
  },
  set(value, newValue) {
    return (i) => newValue(i) ?? value(i)
  },
  ones() {
    return () => 1.0
  },
  zeros() {
    return () => 0.0
  },
  unit(i) {
    return (j) => i==j? 1.0: 0.0
  },
  toEager(value) {
    return (n) => A.from((i) => value(i), n)
  }
}

export const lmat: LazyMatrixType = {
  fromEager(value) {
    return (i,j) => value?.[i]?.[j]
  },
  fromValue(value) {
    return isMatrix(value)? lmat.fromEager(value): lvec.fromValue(value)
  },
  set(value, newValue) {
    return (i,j) => newValue(i,j) ?? value(i,j)
  },
  I() {
    return (i,j) => i==j? 1.0: 0.0
  },
  ts(t, s) {
    return (i,j) => i==0 && j==0? 1.0: i==0? t(j-1): i==j? s(j-1): 0.0
  },
  toEager(value) {
    return (m, n) => A.from((i) => A.from((j) => value(i,j), m), n)
  }
}
