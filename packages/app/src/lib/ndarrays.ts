import * as A from "@/lib/arrays"

export type NdArray<T> = {
  data: Array<T>,
  shape: Array<number>,
  strides: Array<number>,
}

export const ndarray: <T>(data: Array<T>, shape: Array<number>) => NdArray<T> = (data, shape) => {
  const strides = A.reverse(A.cumProduct(shape))
  return {
    data,
    shape,
    strides
  }
}

export const ndarrayRavel: <T>(xs: NdArray<T>) => (...index: number[])=>number = (xs)=> (...index) => {
  return A.sum(A.mul(index, xs.strides))
}

export const ndarrayGetter: <T>(xs: NdArray<T>) => (...index: number[]) => () => T = (xs) => (...index) => {
  const i = ndarrayRavel(xs)(...index)
  return () => {
    return xs.data[i]
  }
}

export const ndarraySetter: <T>(xs: NdArray<T>) => (...index: number[]) => (value: T) => void = (xs) => (...index) => {
  const i = ndarrayRavel(xs)(...index)
  return (value) => {
    xs.data[i] = value
  }
}

/*
const ndarrayItem: <T>(xs: NdArray<T>) => (...index: number[]) => any = (xs) => (...index) => {
  const get = ndarrayGetter(xs)(...index)
  const set = ndarraySetter(xs)(...index)
  return computed({get, set})
}
*/
