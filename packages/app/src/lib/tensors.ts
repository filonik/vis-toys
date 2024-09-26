import * as A from "@/lib/arrays"
import * as F from "@/lib/functors"

export type EagerScalar<T> = T
export type EagerVector<T> = Array<T>
export type EagerMatrix<T> = Array<Array<T>>

export type LazyScalar<T> = () => T
export type LazyVector<T> = (i: number) => T
export type LazyMatrix<T> = (i: number, j: number) => T
export type LazyTensor<T> = (...indices: number[]) => T

type LazyScalarType = {
  fromEager<T>(value: F.Maybe<T>): LazyScalar<F.Maybe<T>>
  fromValue<T>(value: F.Maybe<T>): LazyScalar<F.Maybe<T>>
  set<T>(value: LazyScalar<T>, newValue: LazyScalar<F.Maybe<T>>): LazyScalar<T>
  ones(): LazyVector<number>
  zeros(): LazyVector<number>
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
  t(t: LazyVector<number>): LazyMatrix<number>
  s(s: LazyVector<number>): LazyMatrix<number>
  ts(t: LazyVector<number>, s: LazyVector<number>): LazyMatrix<number>
  st(s: LazyVector<number>, t: LazyVector<number>): LazyMatrix<number>
  toEager<T>(value: LazyMatrix<T>): (m: number, n: number) => EagerMatrix<T> 
}

type LazyTensorType = {
  set<T>(value: LazyTensor<T>, newValue: LazyTensor<F.Maybe<T>>): LazyTensor<T>
  ones(): LazyTensor<number>
  zeros(): LazyTensor<number>
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

export const ltensor: LazyTensorType = {
  ones() {
    return () => 1.0
  },
  zeros() {
    return () => 0.0
  },
  set(value, newValue) {
    return (...indices) => newValue(...indices) ?? value(...indices)
  }
}

export const lsca: LazyScalarType = {
  ...ltensor,
  fromEager(value) {
    return () => value
  },
  fromValue(value) {
    return () => value
  },
  toEager(value) {
    return value
  }
}

export const lvec: LazyVectorType = {
  ...ltensor,
  fromEager(value) {
    return (i) => value?.[i]
  },
  fromValue(value) {
    return isVector(value)? lvec.fromEager(value): lsca.fromValue(value)
  },
  unit(i) {
    return (j) => i==j? 1.0: 0.0
  },
  toEager(value) {
    return (n) => A.from((i) => value(i), n)
  }
}

export const lmat: LazyMatrixType = {
  ...ltensor,
  fromEager(value) {
    return (i,j) => value?.[i]?.[j]
  },
  fromValue(value) {
    return isMatrix(value)? lmat.fromEager(value): lvec.fromValue(value)
  },
  I() {
    return (i,j) => i==j? 1.0: 0.0
  },
  t(t) {
    return lmat.set(lmat.I(), (i, j) => i==0 && j>0? t(j-1): undefined) 
  },
  s(s) {
    return lmat.set(lmat.I(), (i, j) => i==j && j>0? s(j-1): undefined) 
  },
  ts(t, s) {
    return (i,j) => i==0 && j==0? 1.0: i==0? t(j-1): i==j? s(j-1): 0.0
  },
  st(s, t) {
    return lmat.I()
  },
  toEager(value) {
    return (m, n) => A.from((i) => A.from((j) => value(i,j), m), n)
  }
}
