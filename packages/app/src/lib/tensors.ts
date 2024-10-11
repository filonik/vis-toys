import type {Maybe, Morphism, Multimorphism} from "@/lib/types"

import * as A from "@/lib/arrays"
import * as G from "@/lib/generators"
import * as O from "@/lib/operators"

export type EagerScalar<T> = T
export type EagerVector<T> = Array<T>
export type EagerMatrix<T> = Array<Array<T>>

export type LazyScalar<T> = () => T
export type LazyVector<T> = (i: number) => T
export type LazyMatrix<T> = (i: number, j: number) => T
export type LazyTensor<T> = (...indices: Array<number>) => T

export type PartialLazyScalar<T> = () => T
export type PartialLazyVector<T> = (i?: number) => T
export type PartialLazyMatrix<T> = (i?: number, j?: number) => T
export type PartialLazyTensor<T> = (...indices: Array<Maybe<number>>) => T

export type LazyTensors<T extends unknown[]> = { [K in keyof T]: LazyTensor<T[K]> }

type LazyTensorMap = <S,T>(f: Morphism<S, T>) => Morphism<LazyTensor<S>, LazyTensor<T>> 
type LazyTensorMapN = <S extends unknown[], T>(f: Multimorphism<S,T>) => Multimorphism<LazyTensors<S>, LazyTensor<T>> 

const curry: (unsplit: (is: Array<number>, js: Array<number>) => Iterable<number>) => <T>(value: LazyTensor<T>) => LazyTensor<LazyTensor<T>> = (unsplit) => (value) => {
  return (...is) => (...js) => {
    const ks = unsplit(is, js)
    return value(...ks)
  }
}

const uncurry: (split: (is: Array<number>) => [is: Array<number>, js: Array<number>])=> <T>(value: LazyTensor<LazyTensor<T>>) => LazyTensor<T> = (split) => (value) => {
  return (...ks) => {
    const [is, js] = split(ks)
    return value(...is)(...js)
  }
}

const partial: (merge: (is: Array<Maybe<number>>, js: Array<number>) => Iterable<number>) => <T>(value: LazyTensor<T>) => PartialLazyTensor<LazyTensor<T>> = (merge) => (value) => {
  return (...is) => (...js) => value(...merge(is, js))
}

type LazyTensorType = {
  from<T>(value: LazyTensor<T>): LazyTensor<T>
  full<T>(value: T): LazyTensor<T>
  ones(): LazyTensor<number>
  zeros(): LazyTensor<number>
  assign<T>(value: LazyTensor<T>, newValue: LazyTensor<Maybe<T>>): LazyTensor<T>
  map: LazyTensorMap
  mapN: LazyTensorMapN
  //
  mapIndices<T>(f: Morphism<Array<number>, Array<number>>): Morphism<LazyTensor<T>, LazyTensor<T>>
  mask<T>(p: LazyTensor<boolean>): (value: LazyTensor<T>) => LazyVector<Maybe<T>>
  curry<T>(value: LazyTensor<T>): LazyTensor<LazyTensor<T>>
  partial<T>(value: LazyTensor<T>): PartialLazyTensor<LazyTensor<T>>
  getAxis(n: number): (i: number) => <T>(value: LazyTensor<T>) => LazyTensor<T>
  // Operators
  add(x: LazyTensor<number>, y: LazyTensor<number>): LazyTensor<number>
  sub(x: LazyTensor<number>, y: LazyTensor<number>): LazyTensor<number>
  mul(x: LazyTensor<number>, y: LazyTensor<number>): LazyTensor<number>
  div(x: LazyTensor<number>, y: LazyTensor<number>): LazyTensor<number>
}

type LazyScalarType = LazyTensorType & {
  fromEager<T>(value: Maybe<T>): LazyScalar<Maybe<T>>
  fromValue<T>(value: Maybe<T>): LazyScalar<Maybe<T>>
  toEager<T>(value: LazyScalar<T>): () => EagerScalar<T>
  //partial<T>(value: LazyScalar<T>): PartialLazyScalar<LazyTensor<T>>
}

type LazyVectorType = LazyTensorType & {
  fromEager<T>(value: Maybe<Array<T>>): LazyVector<Maybe<T>>
  fromValue<T>(value: Maybe<T | Array<T>>): LazyVector<Maybe<T>>
  toEager<T>(value: LazyVector<T>): (n: number) => EagerVector<T>
  //partial<T>(value: LazyVector<T>): PartialLazyVector<LazyTensor<T>>
  iota(): LazyVector<number>
  unit(i: number): LazyVector<number>
  slices(lower: number, upper: number): LazyVector<boolean>
  reduce<S,T>(value: LazyVector<S>, f: (r: T, x: S) => T, initial: T): (indices: Iterable<number>) => T
}

type LazyMatrixType = LazyTensorType & {
  fromEager<T>(value: Maybe<Array<Array<T>>>): LazyMatrix<Maybe<T>>
  fromValue<T>(value: Maybe<T| Array<T> | Array<Array<T>>>): LazyMatrix<Maybe<T>>
  toEager<T>(value: LazyMatrix<T>): (m: number, n: number) => EagerMatrix<T>
  //partial<T>(value: LazyMatrix<T>): PartialLazyMatrix<LazyTensor<T>>
  getRow(i: number): <T>(value: LazyMatrix<T>) => LazyVector<T>
  getCol(i: number): <T>(value: LazyMatrix<T>) => LazyVector<T>
  I(): LazyMatrix<number>
  t(t: LazyVector<number>): LazyMatrix<number>
  s(s: LazyVector<number>): LazyMatrix<number>
  ts(t: LazyVector<number>, s: LazyVector<number>): LazyMatrix<number>
  st(s: LazyVector<number>, t: LazyVector<number>): LazyMatrix<number>
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

const ltensorMap: LazyTensorMap = (f) => (value) => (...indices) => f(value(...indices))
const ltensorMapN: LazyTensorMapN = (f) => (...values) => (...indices) => (f as any)(...values.map((value) => value(...indices)))

export const ltensor: LazyTensorType = {
  from(value) {
    return value
  },
  full(value) {
    return () => value
  },
  zeros() {
    return ltensor.full(0)
  },
  ones() {
    return ltensor.full(1)
  },
  assign(value, newValue) {
    return (...indices) => newValue(...indices) ?? value(...indices)
  },
  map: ltensorMap,
  mapN: ltensorMapN,
  mapIndices(f) {
    return (value) => (...indices) => value(...f(indices))
  },
  mask(p) {
    return (value) => (...indices) => p(...indices)? value(...indices): undefined
  },
  curry: curry(A.concat),
  partial: partial(G.complete),
  getAxis(n) {
    const indices = A.itemAt(n)
    return (i) => (value) => ltensor.partial(value)(...indices(i))
  },
  add: ltensorMapN(O.add),
  sub: ltensorMapN(O.sub),
  mul: ltensorMapN(O.mul),
  div: ltensorMapN(O.div),
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
  },
}

export const lvec: LazyVectorType = {
  ...ltensor,
  fromEager(value) {
    return (i) => value?.[i]
  },
  fromValue(value) {
    return isVector(value)? lvec.fromEager(value): lsca.fromValue(value)
  },
  toEager(value) {
    return (n) => A.from((i) => value(i), n)
  },
  iota() {
    return (i) => i
  },
  unit(i) {
    return (j) => i==j? 1.0: 0.0
  },
  slices(lower, upper) {
    return (i) => lower <= i && i < upper
  },
  reduce(value, f, initial) {
    return (indices) => {
      let result = initial
      for (let i of indices) {
        result = f(result, value(i))
      }
      return result
    }
  }
}

export const lmat: LazyMatrixType = {
  ...ltensor,
  fromEager(value) {
    return (i, j) => value?.[i]?.[j]
  },
  fromValue(value) {
    return isMatrix(value)? lmat.fromEager(value): lvec.fromValue(value)
  },
  toEager(value) {
    return (m, n) => A.from((i) => A.from((j) => value(i,j), m), n)
  },
  getRow: ltensor.getAxis(0),
  getCol: ltensor.getAxis(1),
  I() {
    return (i, j) => i==j? 1.0: 0.0
  },
  t(t) {
    return lmat.assign(lmat.I(), (i, j) => i==0 && j>0? t(j-1): undefined) 
  },
  s(s) {
    return lmat.assign(lmat.I(), (i, j) => i==j && j>0? s(j-1): undefined) 
  },
  ts(t, s) {
    return (i,j) => i==0 && j==0? 1.0: i==0? t(j-1): i==j? s(j-1): 0.0
  },
  st(s, t) {
    return lmat.I()
  }
}

// Adapt to our layout...
import {mat4, type BaseArgType} from 'wgpu-matrix'

export const mat4f = {
  ...mat4,
  adapt(src: BaseArgType, dst?: BaseArgType): BaseArgType {
    dst = dst ?? mat4.identity()
    dst[3*1 + 0*4] = src[0*1 + 3*4]
    dst[1*1 + 0*4] = src[1*1 + 3*4]
    dst[2*1 + 0*4] = src[2*1 + 3*4]
    dst[0*1 + 0*4] = src[3*1 + 3*4]
    dst[3*1 + 1*4] = src[0*1 + 1*4]
    dst[1*1 + 1*4] = src[1*1 + 1*4]
    dst[2*1 + 1*4] = src[2*1 + 1*4]
    dst[0*1 + 1*4] = src[3*1 + 1*4]
    dst[3*1 + 2*4] = src[0*1 + 2*4]
    dst[1*1 + 2*4] = src[1*1 + 2*4]
    dst[2*1 + 2*4] = src[2*1 + 2*4]
    dst[0*1 + 2*4] = src[3*1 + 2*4]
    dst[3*1 + 3*4] = src[0*1 + 0*4]
    dst[1*1 + 3*4] = src[1*1 + 0*4]
    dst[2*1 + 3*4] = src[2*1 + 0*4]
    dst[0*1 + 3*4] = src[3*1 + 0*4]
    return dst 
  },
  translation(v: ArrayLike<number>, dst?: BaseArgType): BaseArgType {
    dst = dst ?? mat4.identity()
    dst[1*1+0*4] = v[0]
    dst[2*1+0*4] = v[1]
    dst[3*1+0*4] = v[2]
    return dst
  },
  translate(m: ArrayLike<number>, v: ArrayLike<number>, dst?: BaseArgType): BaseArgType {
    dst = dst ?? mat4.identity()
    dst[1*1+0*4] = m[1*1+0*4] + v[0]
    dst[2*1+0*4] = m[2*1+0*4] + v[1]
    dst[3*1+0*4] = m[3*1+0*4] + v[2]
    return dst
  },
  scaling(v: ArrayLike<number>, dst?: BaseArgType): BaseArgType {
    dst = dst ?? mat4.identity()
    dst[1*1+1*4] = v[0]
    dst[2*1+2*4] = v[1]
    dst[3*1+3*4] = v[2]
    return dst
  },
  scale(m: ArrayLike<number>, v: ArrayLike<number>, dst?: BaseArgType): BaseArgType {
    dst = dst ?? mat4.identity()
    dst[1*1+1*4] = m[1*1+1*4] * v[0]
    dst[2*1+2*4] = m[2*1+2*4] * v[1]
    dst[3*1+3*4] = m[3*1+3*4] * v[2]
    return dst
  },
  ts(t: ArrayLike<number>, s: ArrayLike<number>, dst?: BaseArgType) {
    dst = dst ?? mat4f.identity()
    mat4f.translate(dst, t, dst)
    mat4f.scale(dst, s, dst)
    return dst
  },
  st(s: ArrayLike<number>, t: ArrayLike<number>, dst?: BaseArgType) {
    dst = dst ?? mat4f.identity()
    mat4f.scale(dst, s, dst)
    mat4f.translate(dst, t, dst)
    return dst
  },
  rotationX(angleInRadians: number, dst?: BaseArgType): BaseArgType {
    const src = mat4.rotationX(angleInRadians)
    return mat4f.adapt(src, dst)
  },
  rotationY(angleInRadians: number, dst?: BaseArgType): BaseArgType {
    const src = mat4.rotationY(angleInRadians)
    return mat4f.adapt(src, dst)
  },
  rotationZ(angleInRadians: number, dst?: BaseArgType): BaseArgType {
    const src = mat4.rotationZ(angleInRadians)
    return mat4f.adapt(src, dst)
  },
  rotateX(m: BaseArgType, angleInRadians: number, dst?: BaseArgType) {
    return mat4f.mul(m, mat4f.rotationX(angleInRadians), dst)
  },
  rotateY(m: BaseArgType, angleInRadians: number, dst?: BaseArgType) {
    return mat4f.mul(m, mat4f.rotationY(angleInRadians), dst)
  },
  rotateZ(m: BaseArgType, angleInRadians: number, dst?: BaseArgType) {
    return mat4f.mul(m, mat4f.rotationZ(angleInRadians), dst)
  },
  /*
  perspective(fieldOfViewYInRadians: number, aspect: number, zNear: number, zFar: number, dst?: BaseArgType): BaseArgType {
    const src = mat4.perspective(fieldOfViewYInRadians, aspect, zNear, zFar)
    return mat4f.adapt(src, dst)
  }
  */
}

export const scaleToFitContain = (display: [number, number]) => {
  const aspect = Math.min(...display)
  return mat4f.scaling([aspect/display[0], aspect/display[1], 1])
}

export const scaleToFitCover = (display: [number, number]) => {
  const aspect = Math.max(...display)
  return mat4f.scaling([aspect/display[0], aspect/display[1], 1])
}
