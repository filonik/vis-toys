export const isDefined: (v: any) => boolean = (v) => v !== null && v !== undefined

export const mapValues: (f: (value: any, key?: any) => any) => (value: any) => any = (f) => (value) => Object.fromEntries(
  Object.entries(value).map(([k, v]) => [k, f(v, k)])
)

export const filterValues: (g: (value: any, key?: any) => boolean) => (value: any) => any = (g) => (value) => Object.fromEntries(
  Object.entries(value).filter(([k, v]) => g(v, k))
)

export const mapAndFilterValues: (f: (value: any, key?: any) => any, g: (value: any, key?: any) => boolean) => (value: any) => any = (f,g) => (value) => Object.fromEntries(
  Object.entries(value).map(([k, v]) => [k, f(v, k)]).filter(([k, v]) => g(v, k))
)

export const merge: (value: any, newValue: any) => any = (value, newValue) => {
  return Object.keys(value).reduce<any>((result, k) => {
    result[k] = newValue[k] ?? value[k]
    return result
  }, {})
}
