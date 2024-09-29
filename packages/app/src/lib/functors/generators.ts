import type {Generators, Morphism, Multimorphism} from "@/lib/types"

type Map = <S,T>(f: Morphism<S, T>) => Morphism<Generator<S>, Generator<T>> 
type MapN = <S extends unknown[], T>(f: Multimorphism<S,T>) => Multimorphism<Generators<S>, Generator<T>> 

export const map: Map = (f) => {
  return function*(value) {
    for (let v of value) {
      yield f(v)
    }
  }
}


export const mapN: MapN = (f) => {
  return function*(...values) {
    // TODO
  }
}
