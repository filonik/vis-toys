
type MatF = {
  shape: number[];
  strides: number[];
  data: Float32Array;
  get(index: [number, number]): number;
  set(index: [number, number], value: number): void;
};

export const range: (lower: number, upper: number) => Array<number> = (lower, upper) => Array.from({length:upper-lower}, 
  (_, i) => lower + i
)

export const matf = (n: number, m: number) => {
  const matNxMf = () => {
    const shape = [n, m]
    const strides = [1,n]
    const length = shape.reduce((x, y) => x * y, 1)
    const data = Float32Array.from({length}, () => 0.0)
    const self = {
      shape,
      strides,
      data,
      get(index: [number, number]): number {
        const linearIndex = index[0]*self.strides[0]+index[1]*self.strides[1]
        return self.data[linearIndex];
      },
      set(index: [number, number], value: number) {
        const linearIndex = index[0]*self.strides[0]+index[1]*self.strides[1]
        self.data[linearIndex] = value
      }
    }
    return self;
  }

  matNxMf.I = () => {
    const result = matNxMf()
    result.set([0,0], 1.0)
    result.set([1,1], 1.0)
    result.set([2,2], 1.0)
    result.set([3,3], 1.0)
    return result
  }
  
  matNxMf.T = (t: Array<number>) => {
    const result = matNxMf()
    result.set([0,0], 1.0)
    result.set([1,0], t[0] ?? 0.0)
    result.set([2,0], t[1] ?? 0.0)
    result.set([3,0], t[2] ?? 0.0)
    return result
  }
  
  matNxMf.S = (s: Array<number>) => {
    const result = matNxMf()
    result.set([0,0], 1.0)
    result.set([1,1], s[0] ?? 1.0)
    result.set([2,2], s[1] ?? 1.0)
    result.set([3,3], s[2] ?? 1.0)
    return result
  }
  
  matNxMf.TS = (t: Array<number>, s: Array<number>) => {
    const result = matNxMf()
    result.set([0,0], 1.0)
    result.set([1,0], t[0] ?? 0.0)
    result.set([2,0], t[1] ?? 0.0)
    result.set([3,0], t[2] ?? 0.0)
    result.set([1,1], s[0] ?? 1.0)
    result.set([2,2], s[1] ?? 1.0)
    result.set([3,3], s[2] ?? 1.0)
    return result
  }

  return matNxMf
}

matf.mul = (x: MatF, y: MatF, z: MatF) => {
  const [I0, K0] = x.shape
  const [K1, J0] = y.shape
  const [I1, J1] = z.shape
  
  const I = Math.min(I0, I1)
  const J = Math.min(J0, J1)
  const K = Math.min(K0, K1)

  range(0, I).forEach((i) => {
    range(0, J).forEach((j) => {
      const value = range(0, K).map(
        (k) => x.get([i,k]) * y.get([k,j])
      ).reduce(
        (x, y) => x + y, 0
      )
      z.set([i,j], value)
    })
  })
  
  return z
}

export const mat4x4f = matf(4, 4)