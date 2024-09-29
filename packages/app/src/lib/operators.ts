type Unary<S,T> = (x: S) => T 
type Binary<S,T> = (x: S, y: S) => T 

export const and: Binary<boolean, boolean> = (x, y) => x && y
export const or: Binary<boolean, boolean> = (x, y) => x || y
export const not: Unary<boolean, boolean> = (x) => !x

export const eq: Binary<any, boolean> = (x, y) => x == y
export const neq: Binary<any, boolean> = (x, y) => x != y

export const lt: Binary<number, boolean> = (x, y) => x < y
export const gt: Binary<number, boolean> = (x, y) => x > y
export const leq: Binary<number, boolean> = (x, y) => x <= y
export const geq: Binary<number, boolean> = (x, y) => x >= y

export const add: Binary<number, number> = (x, y) => x + y
export const sub: Binary<number, number> = (x, y) => x - y
export const mul: Binary<number, number> = (x, y) => x * y
export const div: Binary<number, number> = (x, y) => x / y

export const quotient: Binary<number, number> = (x, y) => Math.trunc(x / y)
export const remainder: Binary<number, number> = (x, y) => x % y

export const quo = quotient
export const rem = remainder

export const mod: Binary<number, number> = (n, m) => ((n % m) + m) % m

export const add_inv: Unary<number, number> = (x) => 0 - x
export const mul_inv: Unary<number, number> = (x) => 1 / x

export const min: Binary<number, number> = (x, y) => (x < y ? x : y)
export const max: Binary<number, number> = (x, y) => (x > y ? x : y)
