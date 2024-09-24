
export const range: (lower: number, upper: number) => Array<number> = (lower, upper) => {
  const length = upper - lower
  return Array.from({length}, (_, i) => lower + i)
}

export const linspace: (lower: number, upper: number, length: number) => Array<number> = (lower, upper, n) => {
  const step = (upper - lower)/n
  return Array.from({length}, (_, i) => lower + i*step)
}

export const unArray = <T>(value: T|Array<T>) => Array.isArray(value)? value[0]: value
