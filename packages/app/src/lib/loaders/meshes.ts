import chroma from "chroma-js"
import * as wgh from 'webgpu-utils'
import { z } from "zod"

import * as A from "@/lib/arrays"
import * as T from "@/lib/tensors"

export type ParseError = z.ZodError
export const ParseError = z.ZodError

export const PRIMITIVES: Record<number, GPUPrimitiveTopology> = {
  0: 'point-list',
  1: 'line-list',
  2: 'triangle-list',
}

const Scalar = z.number()
const Vector = z.array(z.number())
const Matrix = z.array(z.array(z.number()))

const BScalar = Scalar
const BVector = Vector.or(BScalar)
const BMatrix = Matrix.or(BVector)

const Color = Vector.or(z.string()).transform(
  (value) => Array.isArray(value)? value: chroma(value).gl()
)

const BasicVertex = z.object({
  transform: BMatrix.optional(),
  position: BVector.optional(),
  size: BVector.optional(),
  distance: BVector.optional(),
  fill: Color.optional(),
  stroke: Color.optional(),
  color: Color.optional()
}).transform(
  ({transform, position, size, distance, fill, stroke, color}) => ({
    transform: transform !== undefined?
      T.lmat.assign(T.lmat.I(), T.lmat.fromValue(transform)):
      T.lmat.ts(
        T.lvec.assign(T.lvec.zeros(), T.lvec.fromValue(position)),
        T.lvec.assign(T.lvec.ones(), T.lvec.fromValue(size)),
      ),
    //transform: transform ?? (position !== undefined? [vectorFrom(position)]: undefined) ?? [[]],
    distance: T.lvec.assign(T.lvec.ones(), T.lvec.fromValue(distance)),
    //distance: distance !== undefined? vectorFrom(distance): [],
    fill: T.lvec.assign(T.lvec.ones(), T.lvec.fromValue(fill ?? color)),
    stroke: T.lvec.assign(T.lvec.ones(), T.lvec.fromValue(stroke ?? color)),
  })
)

const SimplicialMesh = <T extends z.ZodType>(vertex: T) => z.object({
  primitive: z.number().int().default(0),
  vertices: z.array(vertex),
  indices: z.array(z.number()).optional()
}).transform(({primitive, vertices, indices}) => ({
  primitive,
  vertices,
  indices: indices ?? A.range(0, vertices.length)
}))

const InstancedSimplicialMesh = <T extends z.ZodType>(vertex: T) => z.object({
  shape: SimplicialMesh(vertex),
  layer: SimplicialMesh(vertex),
})

export const BasicSimplicialMesh = SimplicialMesh(BasicVertex)
export const BasicInstancedSimplicialMesh = InstancedSimplicialMesh(BasicVertex)

export type Scalar = z.infer<typeof Scalar>
export type Vector = z.infer<typeof Vector>
export type Matrix = z.infer<typeof Matrix>

export type BScalar = z.infer<typeof BScalar>
export type BVector = z.infer<typeof BVector>
export type BMatrix = z.infer<typeof BMatrix>

export type Color = z.infer<typeof Color>

export type BasicVertex = z.infer<typeof BasicVertex>

export type SimplicialMesh<T> = z.infer<ReturnType<typeof SimplicialMesh<z.ZodType<T>>>>
export type InstancedSimplicialMesh<T> = z.infer<ReturnType<typeof InstancedSimplicialMesh<z.ZodType<T>>>>

export type BasicSimplicialMesh = z.infer<typeof BasicSimplicialMesh>
export type BasicInstancedSimplicialMesh = z.infer<typeof BasicInstancedSimplicialMesh>

const vec = (n: number) => ({
  fromLazy(f: T.LazyVector<number>) {
    return A.from(f, n)
  },
})

const mat = (n: number, m: number) => ({
  fromLazy(f: T.LazyMatrix<number>) {
    return A.from((i) => A.from((j) => f(i,j), m), n)
  }
})

const vec4 = vec(4)
const mat4 = mat(4, 4)

const aosToSoa = (vertices?: Array<BasicVertex>) => ( {
  transform: vertices?.map(({transform}) => mat4.fromLazy(transform)).flat(2) ?? [],
  distance: vertices?.map(({distance}) => vec4.fromLazy(distance)).flat(1) ?? [],
  fill: vertices?.map(({fill}) => vec4.fromLazy(fill)).flat(1) ?? [],
  stroke: vertices?.map(({stroke}) => vec4.fromLazy(stroke)).flat(1) ?? [],
})

export const createBuffersAndAttributes = (device: GPUDevice, mesh: BasicSimplicialMesh | null, options: wgh.ArraysOptions) => {
  // Array of Structs to Struct of Arrays...
  const data = {
    vertices: aosToSoa(mesh?.vertices),
    indices: mesh?.indices ?? [],
  }

  //console.log(data)
  
  return wgh.createBuffersAndAttributesFromArrays(device, {
    transform: {
      data: data.vertices.transform,
      type: Float32Array,
      numComponents: 16,
    },
    distance: {
      data: data.vertices.distance,
      type: Float32Array,
      numComponents: 4,
    },
    fill: {
      data: data.vertices.fill,
      type: Float32Array,
      numComponents: 4,
    },
    stroke: {
      data: data.vertices.stroke,
      type: Float32Array,
      numComponents: 4,
    },
    indices: {
      data: data.indices,
      type: Uint32Array,
    }
  }, options)
}
