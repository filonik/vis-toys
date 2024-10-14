//import { WgslReflect } from 'wgsl_reflect'

export type TypeInfo = {
  name: string
}

export type FunctionInfo = {
  name: string
  domain: TypeInfo
  codomain: TypeInfo
}

export type SourceInfo = {
  functions: Array<FunctionInfo>
}

// TODO: I really whish I could use wgsl_reflect for this...
export const reflect: (source: string) => SourceInfo = (source) => {
  const re = /@plot\s+fn\s+(?<name>\w+)\s*\(\w+:\s*(?<domain>\w+)\)\s*->\s*(?<codomain>\w+)/g
  const functions: Array<FunctionInfo> = []
  let match
  do {
    match = re.exec(source);
    if (match && match.groups) {
      functions.push({
        name: match.groups.name,
        domain: {
          name: match.groups.domain,
        },
        codomain: {
          name: match.groups.codomain,
        },
      })
    }
  } while (match);
  return { functions }
}

export const elementCount: (t: TypeInfo) => number = (t) => {
  switch (t.name) {
    //case "f32":
    //  return 1
    case "vec1f":
      return 1
    case "vec2f":
      return 2
    case "vec3f":
      return 3
    case "vec4f":
      return 4
  }
  return 0
}

export const functionShape: (f: FunctionInfo) => [number,number] = (f) => [elementCount(f.domain), elementCount(f.codomain)]
