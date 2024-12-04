import * as wgh from 'webgpu-utils'

import * as A from "@/lib/arrays"

const normalGridPositions: (lengths: Array<number>) => Array<Array<number>> = (lengths) => {
  return A.cartesianProduct(lengths.map((length) => A.linspaceInclusive(-1.0, +1.0, length)))
}

const normalGridIndices: (lengths: Array<number>) => Array<Array<number>> = (lengths) => {
  const n = lengths.length
  const strides = A.cumProduct(lengths)

  switch (n) {
    case 1: {
      const segments = A.range(0,lengths[0]-1).map(
        (i) => [(i+0)*strides[0], (i+1)*strides[0]]
      )
      return segments
    }
    case 2: {
      const segments0 = A.range(0, lengths[0]).flatMap(
        (i) => A.range(0,lengths[1]-1).map(
          (j) => [i*strides[0]+(j+0)*strides[1], i*strides[0]+(j+1)*strides[1]]
        )
      )
      const segments1 = A.range(0, lengths[1]).flatMap(
        (j) => A.range(0,lengths[0]-1).map(
          (i) => [(i+0)*strides[0]+j*strides[1], (i+1)*strides[0]+j*strides[1]]
        )
      )
      return A.concat(segments0, segments1)
    }
    case 3: {
      const segments0 = A.range(0, lengths[0]).flatMap(
        (i) => A.range(0, lengths[1]).flatMap(
          (j) => A.range(0,lengths[2]-1).map(
            (k) => [
              i*strides[0]+j*strides[1]+(k+0)*strides[2],
              i*strides[0]+j*strides[1]+(k+1)*strides[2],
            ]
          )
        )
      )
      const segments1 = A.range(0, lengths[0]).flatMap(
        (i) => A.range(0, lengths[2]).flatMap(
          (k) => A.range(0,lengths[1]-1).map(
            (j) => [
              i*strides[0]+(j+0)*strides[1]+k*strides[2],
              i*strides[0]+(j+1)*strides[1]+k*strides[2],
            ]
          )
        )
      )
      const segments2 = A.range(0, lengths[1]).flatMap(
        (j) => A.range(0, lengths[2]).flatMap(
          (k) => A.range(0,lengths[0]-1).map(
            (i) => [
              (i+0)*strides[0]+j*strides[1]+k*strides[2],
              (i+1)*strides[0]+j*strides[1]+k*strides[2],
            ]
          )
        )
      )
      return A.concat(segments0, segments1, segments2)
    }
  }

  return []
}

export const normalGridArrays: (lengths: Array<number>) => wgh.Arrays = (lengths) => {
  const positions = normalGridPositions(lengths).map((xs) => [1, xs[0]??0, xs[1]??0, xs[2]??0])
  const colors = A.full([1,1,1,1], positions.length)

  const indices = normalGridIndices(lengths)

  return {
    position: {
      data: positions.flat(1),
      type: Float32Array,
      numComponents: 4,
    },
    color: {
      data: colors.flat(1),
      type: Float32Array,
      numComponents: 4,
    },
    indices: {
      data: indices.flat(1),
      type: Uint32Array,
    }
  }
}
