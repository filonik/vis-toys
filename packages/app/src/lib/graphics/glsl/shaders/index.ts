import * as A from "@/lib/arrays"

export const UNARY_OPERATORS: Record<string, string> = {
  "+": "_pos_",
  "-": "_neg_",
  "~": "_inv_",
  "!": "_not_",
}

export const BINARY_OPERATORS: Record<string, string> = {
  "+": "_add_",
  "-": "_sub_",
  "*": "_mul_",
  "/": "_div_",
  "%": "_mod_",
  "<<": "_lshift_",
  ">>": "_rshift_",
  "<": "_lt_",
  ">": "_gt_",
  "<=": "_le_",
  ">=": "_ge_",
  "==": "_eq_",
  "!=": "_ne_",
  "&": "_and_",
  "|": "_or_",
  "^": "_xor_",
}

export const TERNARY_OPERATORS: Record<string, string> = {
  "?:": "_cond_",
}

export const UNARY_FUNCTIONS: Record<string, string> = {
  "exp": "_exp_",
  "log": "_log_",
  "cos": "_cos_",
  "sin": "_sin_",
  "tan": "_tan_",
  "acos": "_acos_",
  "asin": "_asin_",
  "atan": "_atan_",
  "cosh": "_cosh_",
  "sinh": "_sinh_",
  "tanh": "_tanh_",
  "acosh": "_acosh_",
  "asinh": "_asinh_",
  "atanh": "_atanh_",
  "sqrt": "_sqrt_",
  "abs": "_abs_",
  "ceil": "_ceil_",
  "floor": "_floor_",
}

export const BINARY_FUNCTIONS: Record<string, string> = {
  "atan": "_atan_",
  "pow": "_pow_",
  "min": "_min_",
  "max": "_max_",
}

export const TERNARY_FUNCTIONS: Record<string, string> = {
  "mix": "_mix_",
}

type ArrayType = {
  name: string,
  shape: Array<number>,
  valueType: string
}

const ARRAY_TYPES: Array<ArrayType> = [
  {
    name: "float",
    shape: [],
    valueType: "float",
  },
  {
    name: "vec1",
    shape: [1],
    valueType: "float",
  },
  {
    name: "vec2",
    shape: [2],
    valueType: "float",
  },
  {
    name: "vec3",
    shape: [3],
    valueType: "float",
  },
  {
    name: "vec4",
    shape: [4],
    valueType: "float",
  },
  {
    name: "mat1",
    shape: [1,1],
    valueType: "float",
  },
  {
    name: "mat2",
    shape: [2,2],
    valueType: "float",
  },
  {
    name: "mat3",
    shape: [3,3],
    valueType: "float",
  },
  {
    name: "mat4",
    shape: [4,4],
    valueType: "float",
  },
  {
    name: "mat5",
    shape: [5,5],
    valueType: "float",
  },
  {
    name: "d2e2",
    shape: [],
    valueType: "d2e2",
  },
  {
    name: "d2e2vec1",
    shape: [1],
    valueType: "d2e2",
  },
  {
    name: "d2e2vec2",
    shape: [2],
    valueType: "d2e2",
  },
  {
    name: "d2e2vec3",
    shape: [3],
    valueType: "d2e2",
  },
  {
    name: "d2e2vec4",
    shape: [4],
    valueType: "d2e2",
  },
  {
    name: "d2e3",
    shape: [],
    valueType: "d2e3",
  },
  {
    name: "d2e3vec1",
    shape: [1],
    valueType: "d2e3",
  },
  {
    name: "d2e3vec2",
    shape: [2],
    valueType: "d2e3",
  },
  {
    name: "d2e3vec3",
    shape: [3],
    valueType: "d2e3",
  },
  {
    name: "d2e3vec4",
    shape: [4],
    valueType: "d2e3",
  },
]
const ARRAY_TYPES_BY_NAME = Object.fromEntries(ARRAY_TYPES.map((type) => [type.name, type]))

const BUILTIN_SCALAR_TYPE_NAMES: Array<string> = ['float']
const BUILTIN_VECTOR_TYPE_NAMES: Array<string> = ['vec2', 'vec3', 'vec4']
const BUILTIN_MATRIX_TYPE_NAMES: Array<string> = ['mat2', 'mat3', 'mat4']

const builtinGetItem: (type: ArrayType, index: Array<number>) => string = (type, index) => {
  if (type.shape.length == 0) {
    return ''
  } else {
    const strides = A.strides(type.shape)
    const i = A.sum(A.mul(index, strides))
    //const i = A.zipWith((x: number, y: number) => `${x}*${y}`)(index, strides).join('+')
    return `[${i}]`
  }
}

const builtinUnaryOperator = (operator: string) => (t0: ArrayType, r0: ArrayType) => `${r0.name} ${UNARY_OPERATORS[operator]}(in ${t0.name} x) { return ${operator}x; }`
const builtinBinaryOperator = (operator: string) => (t0: ArrayType, t1: ArrayType, r0: ArrayType) => `${r0.name} ${BINARY_OPERATORS[operator]}(in ${t0.name} x, in ${t1.name} y) { return x${operator}y; }`

const builtinUnaryFunction = (func: string) => (t0: ArrayType, r0: ArrayType) => `${r0.name} ${UNARY_FUNCTIONS[func]}(in ${t0.name} x) { return ${func}(x); }`
const builtinBinaryFunction = (func: string) => (t0: ArrayType, t1: ArrayType, r0: ArrayType) => `${r0.name} ${BINARY_FUNCTIONS[func]}(in ${t0.name} x, in ${t1.name} y) { return ${func}(x, y); }`

const customArrayUnaryOperator = (operator: string) => (t0: ArrayType, r0: ArrayType) => `${r0.name} ${UNARY_OPERATORS[operator]}(in ${t0.name} x) { return ${r0.name}(${
  A.indices(r0.shape).map((index) => `${UNARY_OPERATORS[operator]}(x${builtinGetItem(t0, index)})`).join(',')
}); }`
const customArrayBinaryOperator = (operator: string) => (t0: ArrayType, t1: ArrayType, r0: ArrayType) => `${r0.name} ${BINARY_OPERATORS[operator]}(in ${t0.name} x, in ${t1.name} y) { return ${r0.name}(${
  A.indices(r0.shape).map((index) => `${BINARY_OPERATORS[operator]}(x${builtinGetItem(t0, index)}, y${builtinGetItem(t1, index)})`).join(',')
}); }`

const ADDITIVE_OPERATORS = ['+', '-']
const MULTIPLICATIVE_OPERATORS = ['*', '/']

const generateBuiltinScalarOperators: (type: ArrayType) => string[] = (type) => A.concat(
  ADDITIVE_OPERATORS.map((operator) => builtinUnaryOperator(operator)(type, type)),
  ADDITIVE_OPERATORS.map((operator) => builtinBinaryOperator(operator)(type, type, type)),
  MULTIPLICATIVE_OPERATORS.map((operator) => builtinBinaryOperator(operator)(type, type, type)),
)

const generateBuiltinArrayOperators: (type: ArrayType) => string[] = (type) => A.concat(
  ADDITIVE_OPERATORS.map((operator) => builtinUnaryOperator(operator)(type, type)),
  ADDITIVE_OPERATORS.flatMap((operator) => [
    builtinBinaryOperator(operator)(type, ARRAY_TYPES_BY_NAME[type.valueType], type),
    builtinBinaryOperator(operator)(ARRAY_TYPES_BY_NAME[type.valueType], type, type),
    builtinBinaryOperator(operator)(type, type, type),
  ]),
  MULTIPLICATIVE_OPERATORS.flatMap((operator) => [
    builtinBinaryOperator(operator)(type, ARRAY_TYPES_BY_NAME[type.valueType], type),
    builtinBinaryOperator(operator)(ARRAY_TYPES_BY_NAME[type.valueType], type, type),
    builtinBinaryOperator(operator)(type, type, type),
  ])
)

const generateBuiltinScalarFunctions: (type: ArrayType) => string[] = (type) => A.concat(
  Object.keys(UNARY_FUNCTIONS).map((func) => builtinUnaryFunction(func)(type, type)),
  Object.keys(BINARY_FUNCTIONS).map((func) => builtinBinaryFunction(func)(type, type, type)),
)

const generateBuiltinArrayFunctions: (type: ArrayType) => string[] = (type) => A.concat(
  Object.keys(UNARY_FUNCTIONS).map((func) => builtinUnaryFunction(func)(type, type)),
  Object.keys(BINARY_FUNCTIONS).map((func) => builtinBinaryFunction(func)(type, type, type)),
  /*
  Object.keys(BINARY_FUNCTIONS).flatMap((func) => [
    builtinBinaryFunction(func)(type, ARRAY_TYPES_BY_NAME[type.valueType], type),
    builtinBinaryFunction(func)(ARRAY_TYPES_BY_NAME[type.valueType], type, type),
    builtinBinaryFunction(func)(type, type, type)
  ]),
  */
)

const importBuiltinOperators = () => A.concat(
  BUILTIN_SCALAR_TYPE_NAMES.map((type) => generateBuiltinScalarOperators(ARRAY_TYPES_BY_NAME[type]).join('\n')),
  BUILTIN_VECTOR_TYPE_NAMES.map((type) => generateBuiltinArrayOperators(ARRAY_TYPES_BY_NAME[type]).join('\n')),
  BUILTIN_MATRIX_TYPE_NAMES.map((type) => generateBuiltinArrayOperators(ARRAY_TYPES_BY_NAME[type]).join('\n')),
).join('\n\n')

const importBuiltinFunctions = () => A.concat(
  BUILTIN_SCALAR_TYPE_NAMES.map((type) => generateBuiltinScalarFunctions(ARRAY_TYPES_BY_NAME[type]).join('\n')),
  BUILTIN_VECTOR_TYPE_NAMES.map((type) => generateBuiltinArrayFunctions(ARRAY_TYPES_BY_NAME[type]).join('\n')),
  //BUILTIN_MATRIX_TYPE_NAMES.map((type) => generateBuiltinArrayOperators(ARRAY_TYPES_BY_NAME[type]).join('\n')),
).join('\n\n')

export const importBuiltin = () =>`#ifndef BUILTIN_H
#define BUILTIN_H

${importBuiltinOperators()}

${importBuiltinFunctions()}

#endif
`

const CUSTOM_SCALAR_TYPE_NAMES: Array<string> = []
const CUSTOM_VECTOR_TYPE_NAMES: Array<string> = ['vec1'] //['d2e3vec1', 'd2e3vec2', 'd2e3vec3', 'd2e3vec4']
const CUSTOM_MATRIX_TYPE_NAMES: Array<string> = ['mat1']

const generateCustomScalarOperators: (type: ArrayType) => string[] = (type) => []

const generateCustomArrayOperators: (type: ArrayType) => string[] = (type) => A.concat(
  ADDITIVE_OPERATORS.map((operator) => customArrayUnaryOperator(operator)(type, type)),
  ADDITIVE_OPERATORS.flatMap((operator) => [
    customArrayBinaryOperator(operator)(type, ARRAY_TYPES_BY_NAME[type.valueType], type),
    customArrayBinaryOperator(operator)(ARRAY_TYPES_BY_NAME[type.valueType], type, type),
    customArrayBinaryOperator(operator)(type, type, type),
  ]),
  MULTIPLICATIVE_OPERATORS.flatMap((operator) => [
    customArrayBinaryOperator(operator)(type, ARRAY_TYPES_BY_NAME[type.valueType], type),
    customArrayBinaryOperator(operator)(ARRAY_TYPES_BY_NAME[type.valueType], type, type),
    customArrayBinaryOperator(operator)(type, type, type),
  ])
)

const importCustomOperators = () => A.concat(
  CUSTOM_SCALAR_TYPE_NAMES.map((type) => generateCustomScalarOperators(ARRAY_TYPES_BY_NAME[type]).join('\n')),
  CUSTOM_VECTOR_TYPE_NAMES.map((type) => generateCustomArrayOperators(ARRAY_TYPES_BY_NAME[type]).join('\n')),
  CUSTOM_MATRIX_TYPE_NAMES.map((type) => generateCustomArrayOperators(ARRAY_TYPES_BY_NAME[type]).join('\n')),
).join('\n\n')


export const importCustom = () =>`#ifndef CUSTOM_H
#define CUSTOM_H

${importCustomOperators()}

#endif
`