import chroma from "chroma-js"
import { z } from "zod"

import { range } from "@/lib/arrays"

export type ParseError = z.ZodError
export const ParseError = z.ZodError

const vectorFrom = <T>(value: T | T[]) => Array.isArray(value)? value: [value]

const Scalar = z.number()
const Vector = z.array(z.number())
const Matrix = z.array(z.array(z.number()))

const Color = Vector.or(z.string()).transform(
  (value) => Array.isArray(value)? value: chroma(value).gl()
)

const BasicVertex = z.object({
  transform: Matrix.optional(),
  position: Scalar.or(Vector).optional(),
  size: Scalar.or(Vector).optional(),
  fill: Color.optional(),
  stroke: Color.optional(),
  color: Color.optional()
}).transform(
  ({fill, stroke, color, transform, position}) => ({
    fill: fill ?? color ?? [],
    stroke: stroke ?? color ?? [],
    transform: transform ?? (position !== undefined? [vectorFrom(position)]: undefined) ?? [[]],
  })
)

const SimplicialMesh = <T extends z.ZodType>(vertex: T) => z.object({
  primitive: z.number().int().default(0),
  vertices: z.array(vertex),
  indices: z.array(z.number()).optional()
}).transform(({primitive, vertices, indices}) => ({
  primitive,
  vertices,
  indices: indices ?? range(0, vertices.length)
}))

export const BasicSimplicialMesh = SimplicialMesh(BasicVertex)

export type Scalar = z.infer<typeof Scalar>
export type Vector = z.infer<typeof Vector>
export type Matrix = z.infer<typeof Matrix>

export type Color = z.infer<typeof Color>

export type BasicVertex = z.infer<typeof BasicVertex>

export type SimplicialMesh<T> = z.infer<ReturnType<typeof SimplicialMesh<z.ZodType<T>>>>

export type BasicSimplicialMesh = z.infer<typeof BasicSimplicialMesh>
