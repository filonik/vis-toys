import * as wgh from 'webgpu-utils'

import * as A from "@/lib/arrays"

// 0-Simplex Domain (Points)
// Vertex (p0: vec4, t: vec0f)

// 1-Simplex Domain (Lines)
// Vertex (p0: vec4, p1: vec4, t: vec1f)

// 2-Simplex Domain (Triangles)
// Vertex (p0: vec4, p1: vec4, p2: vec4, t: vec2f)

/*`
struct VertexIn {
  @location(0) p0: vec4f,
  @location(1) p1: vec4f,
  @location(2) c0: vec4f,
  @location(3) c1: vec4f,
  @location(4) t: f32,
}
`*/

export const PRIMITIVES: Record<number, GPUPrimitiveTopology> = {
  0: 'point-list',
  1: 'line-list',
  2: 'triangle-list',
}

const normalGridPositions: (lengths: Array<number>) => Array<Array<number>> = (lengths) => {
  return A.cartesianProduct(lengths.map((length) => A.linspaceInclusive(-1.0, +1.0, length)))
}

const normalGridIndices: (lengths: Array<number>) => Array<Array<number>> = (lengths) => {
  const n = lengths.length
  const strides = A.reverse(A.cumProduct(A.reverse(lengths)))

  const flatIndex1 = (i: number) =>  i*strides[0]
  const flatIndex2 = (i: number, j: number) =>  i*strides[0] + j*strides[1]
  const flatIndex3 = (i: number, j: number, k: number) =>  i*strides[0] + j*strides[1] + k*strides[2]

  switch (n) {
    case 1: {
      const segments = A.range(0,lengths[0]-1).map(
        (i) => [flatIndex1(i+0), flatIndex1(i+1)]
      )
      return segments
    }
    case 2: {
      const segments0 = A.range(0, lengths[0]).flatMap(
        (i) => A.range(0,lengths[1]-1).map(
          (j) => [flatIndex2(i, j+0), flatIndex2(i, j+1)]
        )
      )
      const segments1 = A.range(0, lengths[1]).flatMap(
        (j) => A.range(0,lengths[0]-1).map(
          (i) => [flatIndex2(i+0, j), flatIndex2(i+1, j)]
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
