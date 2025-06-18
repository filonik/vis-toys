
const spherical2 = `fn sperical2(x: vec2f) -> vec2f {
  return vec2f(
    x[0]*cos(x[1]),
    x[0]*sin(x[1]),
  );
}`

const spherical3 = `fn sperical3(x: vec3f) -> vec3f {
  return vec3f(
    x[0]*cos(x[2])*cos(x[1]),
    x[0]*sin(x[2]),
    x[0]*cos(x[2])*sin(x[1]),  
  );
}`

const generalSpherical2 = `fn generalSperical2(k: f32, x: vec2f) -> vec2f {
  return vec2f(
    x[0]*cosk(k, x[1]),
    x[0]*sink(k, x[1]),
  );
}`

const generalSpherical3 = `fn generalSperical3(k: f32, x: vec3f) -> vec3f {
  return vec3f(
    x[0]*cosk(k, x[2])*cos(x[1]),
    x[0]*cosk(k, x[2])*sin(x[1]),
    x[0]*sink(k, x[2]),
  );
}`

export const sphere2 = `${spherical2}

@plot
fn f(x: vec1f) -> vec2f {
  return sperical2(vec2f(1.0, x[0]));
}`

export const generalSphere2Source = `${generalSpherical2}

@plot
fn f(x: vec2f) -> vec2f {
  let k = uGlobal.args[0];
  return generalSperical2(k, x);
}

@plot
fn g(x: vec1f) -> vec2f {
  let k = uGlobal.args[0];
  return generalSperical2(k, vec2f(1.0, x[0]));
}`

export const generalSphere2 = {
  source: generalSphere2Source,
  options: {
    args: [1.0, 0.0, 0.0, 0.0],
    functions: [{
      color: '#444444',
      extent: [
        [0, -Math.PI],
        [2, +Math.PI],
      ],
      visible: true,
    },{
      color: '#ffffff',
      extent: [
        [-Math.PI],
        [+Math.PI],
      ],
      visible: true,
    }]
  },
}

export const generalSphere3 = `${generalSpherical3}

fn f(x: vec3f) -> vec3f {
  let k = uGlobal.args[0];
  return generalSperical3(k, x);
}

@plot
fn g(x: vec2f) -> vec3f {
  let k = uGlobal.args[0];
  return generalSperical3(k, vec3f(1.0, x[0], x[1]));
}`

export const sphere3 = `${spherical3}

@plot
fn f(x: vec2f) -> vec3f {
  return sperical3(vec3f(1.0, x[0], x[1]));
}`

export const wave1Source = `@plot
fn f(x: vec1f) -> vec2f {
  return vec2f(x[0], sin(x[0]));
}`

export const wave1 = {
  source: wave1Source,
  options: {
    args: [0.0, 0.0, 0.0, 0.0],
    functions: [{
      color: '#ffffff',
      extent: [
        [-Math.PI],
        [+Math.PI],
      ],
      visible: true,
    }]
  },
}

export const wave2Source = `@plot
fn f(x: vec2f) -> vec3f {
  return vec3f(x[0], x[1], sin(x[0])*cos(x[1]));
}`

export const wave2 = {
  source: wave2Source,
  options: {
    args: [0.0, 0.0, 0.0, 0.0],
    functions: [{
      color: '#ffffff',
      extent: [
        [-Math.PI, -Math.PI],
        [+Math.PI, +Math.PI],
      ],
      visible: true,
    }]
  },
}

export const animatedWave2 = `@plot
fn f(x: vec1f) -> vec2f {
  let t = uGlobal.time;
  return vec2f(x[0], sin(t+x[0]));
}`

export const animatedWave3 = `@plot
fn f(x: vec2f) -> vec3f {
  let t = uGlobal.time;
  return vec3f(x[0], x[1], sin(t+x[0])*cos(t+x[1]));
}`

const torus2Source = `@plot
fn f(x: vec2f) -> vec3f {
  let r = uGlobal.args.xy;
  return r[0] * vec3f(
    cos(x[0]),
    sin(x[0]),
    0,
  ) + r[1] * vec3f(
    cos(x[1])*cos(x[0]),
    cos(x[1])*sin(x[0]),
    sin(x[1]),
  );
}`

export const torus2 = {
  source: torus2Source,
  options: {
    args: [1.0, 0.5, 0.0, 0.0],
    functions: [{
      color: '#ffffff',
      extent: [
        [-Math.PI, -Math.PI],
        [+Math.PI, +Math.PI],
      ],
      visible: true,
    }]
  },
}

export const animatedTorus2 = `@plot
fn f(x: vec2f) -> vec3f {
  let t = uGlobal.time;
  let r = uGlobal.args.xy*vec2f(1.0, (sin(t+3*x[0])+2.0)/3.0);
  return r[0] * vec3f(
    cos(x[0]),
    sin(x[0]),
    0,
  ) + r[1] * vec3f(
    cos(x[1])*cos(x[0]),
    cos(x[1])*sin(x[0]),
    sin(x[1]),
  );
}`

export const generalTorus2 = `@plot
fn f(x: vec2f) -> vec3f {
  let r = uGlobal.args.xy;
  let k = uGlobal.args.zw;
  return r[0] * vec3f(
    cosk(k[0], x[0]),
    sink(k[0], x[0]),
    0,
  ) + r[1] * vec3f(
    cosk(k[1], x[1])*cosk(k[0], x[0]),
    cosk(k[1], x[1])*sink(k[0], x[0]),
    sink(k[1], x[1]),
  );
}`

const generalComplexSource = `fn aa_GeneralComplex(k: vec1f) -> t2x2x2f {
  return t2x2x2f(
    mat2x2f(1,0,0,-k[0]),
    mat2x2f(0,1,1,0),
  );
}

fn aa_normalCoords2(C: t2x2x2f, x: vec2f) -> vec2f {
  return vec2f(x[0], 0) * mat2x2f_expm(
    t2x2x2f_rmat(C, vec2f(0, x[1]))
  );
}

@plot
fn f(x: vec2f) -> vec2f {
  let k = vec1f(uGlobal.args[0]);
  let C = aa_GeneralComplex(k);
  return aa_normalCoords2(C, x);
}`

export const generalComplex = {
  source: generalComplexSource,
  options: {
    args: [1.0, 0.0, 0.0, 0.0],
    functions: [{
      color: '#ffffff',
      extent: [
        [0.0, -Math.PI],
        [2.0, +Math.PI],
      ],
      visible: true,
    }]
  },
}

const generalComplexLineSource = `fn aa_GeneralComplex(k: vec1f) -> t2x2x2f {
  return t2x2x2f(
    mat2x2f(1,0,0,-k[0]),
    mat2x2f(0,1,1,0),
  );
}

fn aa_normalCoords2(C: t2x2x2f, x: vec2f) -> vec2f {
  return vec2f(x[0], 0) * mat2x2f_expm(
    t2x2x2f_rmat(C, vec2f(0, x[1]))
  );
}

fn aa_mix2(C: t2x2x2f, x: vec2f, y: vec2f, t: vec1f) -> vec2f {
  let delta = mat2x2f_mul_inv(t2x2x2f_lmat(C, x))*y;
  let logDelta = mat2x2f_logm(t2x2x2f_rmat(C, delta));
  return x*mat2x2f_expm(logDelta * t[0]);
}

@plot
fn f(x: vec2f) -> vec2f {
  let k = vec1f(uGlobal.args[0]);
  let C = aa_GeneralComplex(k);
  return aa_normalCoords2(C, x);
}

@plot
fn gc_l(t: vec1f) -> vec2f {
  let k = uGlobal.args[0];
  let a = gc_polar_to_rect(k, vec2f(1, uGlobal.args[1]));
  let b = gc_polar_to_rect(k, vec2f(1, uGlobal.args[2]));
  return gc_mix2(k, a, b, t);
}
  
@plot
fn aa_l(t: vec1f) -> vec2f {
  let k = vec1f(uGlobal.args[0]);
  let C = aa_GeneralComplex(k);
  let a = aa_normalCoords2(C, vec2f(1, uGlobal.args[1]));
  let b = aa_normalCoords2(C, vec2f(1, uGlobal.args[2]));
  //return mix(a,b,t[0]);
  return aa_mix2(C, a, b, t);
}
`

export const generalComplexLine = {
  source: generalComplexLineSource,
  options: {
    args: [1.0, -0.5, 0.5, 0.0],
    functions: [{
      color: '#555555',
      extent: [
        [0.0, -Math.PI],
        [2.0, +Math.PI],
      ],
      visible: true,
    },{
      color: '#00ffff',
      extent: [
        [0.0],
        [1.0],
      ],
      visible: true,
    },{
      color: '#00ff00',
      extent: [
        [0.0],
        [1.0],
      ],
      visible: true,
    }]
  },
}

const triplexSource = `fn aa_Triplex() -> t3x3x3f {
  return t3x3x3f(
    mat3x3f(1,0,0,0,0,1,0,1,0),
    mat3x3f(0,1,0,1,0,0,0,0,1),
    mat3x3f(0,0,1,0,1,0,1,0,0),
  );
}

@plot
fn f(x: vec2f) -> vec3f {
  let C = aa_Triplex();
  return vec3f(1, 0, 0) * mat3x3f_expm(
    t3x3x3f_rmat(C, vec3f(0, x[0], 0))
  ) * mat3x3f_expm(
    t3x3x3f_rmat(C, vec3f(0, 0, x[1]))
  );
}`

export const triplex = {
  source: triplexSource,
  options: {
    args: [1.0, 0.0, 0.0, 0.0],
    functions: [{
      color: '#ffffff',
      extent: [
        [-1, -1],
        [+1, +1],
      ],
      visible: true,
    }]
  },
}

const triplexLineSource = `fn aa_Triplex() -> t3x3x3f {
  return t3x3x3f(
    mat3x3f(1,0,0,0,0,1,0,1,0),
    mat3x3f(0,1,0,1,0,0,0,0,1),
    mat3x3f(0,0,1,0,1,0,1,0,0),
  );
}

fn aa_normalCoords3(C: t3x3x3f, x: vec3f) -> vec3f {
  return vec3f(x[0], 0, 0) * mat3x3f_expm(
    t3x3x3f_rmat(C, vec3f(0, x[1], 0))
  ) * mat3x3f_expm(
    t3x3x3f_rmat(C, vec3f(0, 0, x[2]))
  );
}

fn aa_mix3(C: t3x3x3f, x: vec3f, y: vec3f, t: vec1f) -> vec3f {
  let delta = mat3x3f_mul_inv(t3x3x3f_lmat(C, x))*y;
  let logDelta = mat3x3f_logm(t3x3x3f_rmat(C, delta));
  return x * mat3x3f_expm(logDelta * t[0]);
}

@plot
fn f(x: vec2f) -> vec3f {
  let C = aa_Triplex();
  return aa_normalCoords3(C, vec3f(1, x));
}
  
@plot
fn aa_l(t: vec1f) -> vec3f {
  let C = aa_Triplex();
  let a = aa_normalCoords3(C, vec3f(1, uGlobal.args.xy));
  let b = aa_normalCoords3(C, vec3f(1, uGlobal.args.zw));
  //return mix(a,b,t[0]);
  return aa_mix3(C, a, b, t);
}
`

export const triplexLine = {
  source: triplexLineSource,
  options: {
    args: [0.25, 0.25, -0.25, -0.25],
    functions: [{
      color: '#555555',
      extent: [
        [-1, -1],
        [+1, +1],
      ],
      visible: true,
    },{
      color: '#ffffff',
      extent: [
        [0],
        [1],
      ],
      visible: true,
    }]
  },
}

const dcl3Source = `fn dcl3_ncoord(k: f32, x: vec2f) -> dcl3vec {
  let e0 = dcl3rot(1,0,0,0);
  let r01 = dcl3rot_exp(k, dcl3rot(0, 0, 0.5*x[0], 0));
  let r12 = dcl3rot_exp(k, dcl3rot(0.5*x[1], 0, 0, 0));
  let r = dcl3rot_mul(k, r01, r12);
  return dcl3rot_sw(k, e0, r).xyz;
}

@plot
fn f(x: vec2f) -> vec3f {
  let k = uGlobal.args[0];
  return dcl3_ncoord(k, x);
}
`

export const dcl3 = {
  source: dcl3Source,
  options: {
    args: [0,0,0,0],
    functions: [{
      color: '#555555',
      extent: [
        [0, -Math.PI],
        [Math.PI, +Math.PI],
      ],
      visible: true,
    }]
  },
}

const dcl3LineSource = `fn dcl3_ncoord(k: f32, x: vec2f) -> dcl3rot {
  let e0 = dcl3rot(1,0,0,0);
  let r01 = dcl3rot_exp(k, dcl3rot(0, 0, 0.5*x[0], 0));
  let r12 = dcl3rot_exp(k, dcl3rot(0.5*x[1], 0, 0, 0));
  let r = dcl3rot_mul(k, r01, r12);
  return dcl3rot_sw(k, e0, r);
}

@plot
fn f(x: vec2f) -> vec3f {
  let k = uGlobal.args[0];
  return dcl3_ncoord(k, x).xyz;
}

@plot
fn l(t: vec1f) -> vec3f {
  let k = uGlobal.args[0];
  let a = dcl3_ncoord(k, vec2f(uGlobal.args.yz));
  let b = dcl3_ncoord(k, vec2f(uGlobal.args.w,0));
  return dcl3rot_mix(k, a, b, t).xyz;
}

@plot
fn l_mix(t: vec1f) -> vec3f {
  let k = uGlobal.args[0];
  let a = dcl3_ncoord(k, vec2f(uGlobal.args.yz));
  let b = dcl3_ncoord(k, vec2f(uGlobal.args.w,0));
  return mix(a,b,t[0]).xyz;
}
`

export const dcl3Line = {
  source: dcl3LineSource,
  options: {
    args: [1,1,1,0],
    functions: [{
      color: '#555555',
      extent: [
        [0, -Math.PI],
        [Math.PI, +Math.PI],
      ],
      visible: true,
    },{
      color: '#ffffff',
      extent: [
        [0],
        [1],
      ],
      visible: true,
    },{
      color: '#0000ff',
      extent: [
        [0],
        [1],
      ],
      visible: true,
    }]
  },
}

const dcl3TriangleSource = `fn dcl3_rotor(k: f32, x: vec2f) -> dcl3rot {
  let r01 = dcl3rot_exp(k, dcl3rot_muls(dcl3rot_e12, 0.5*x[0]));
  let r12 = dcl3rot_exp(k, dcl3rot_muls(dcl3rot_e01, 0.5*x[1]));
  return dcl3rot_mul(k, r01, r12);
}

fn dcl3_ncoord(k: f32, x: vec2f) -> dcl3rot {
  let r = dcl3_rotor(k, x);
  return dcl3rot_sw(k, dcl3rot_e01, r);
}

const A = vec2f(1., 0.*TAU/3.);
const B = vec2f(1., 1.*TAU/3.);
const C = vec2f(1., 2.*TAU/3.);

@plot
fn f(x: vec2f) -> vec3f {
  let k = uGlobal.args[0];
  return dcl3_ncoord(k, x).xyz;
}

@plot
fn lAB(t: vec1f) -> vec3f {
  let k = uGlobal.args[0];
  let a = dcl3_ncoord(k, A);
  let b = dcl3_ncoord(k, B);
  let view = dcl3_rotor(k, uGlobal.args.yz);
  return dcl3rot_sw(k, dcl3rot_mix(k, a, b, t), view).xyz;
}

@plot
fn lBC(t: vec1f) -> vec3f {
  let k = uGlobal.args[0];
  let b = dcl3_ncoord(k, B);
  let c = dcl3_ncoord(k, C);
  let view = dcl3_rotor(k, uGlobal.args.yz);
  return dcl3rot_sw(k, dcl3rot_mix(k, b, c, t), view).xyz;
}

@plot
fn lCA(t: vec1f) -> vec3f {
  let k = uGlobal.args[0];
  let c = dcl3_ncoord(k, C);
  let a = dcl3_ncoord(k, A);
  let view = dcl3_rotor(k, uGlobal.args.yz);
  return dcl3rot_sw(k, dcl3rot_mix(k, c, a, t), view).xyz;
}
`

export const dcl3Triangle = {
  source: dcl3TriangleSource,
  options: {
    args: [1,0,0,0],
    functions: [{
      color: '#555555',
      extent: [
        [0, -Math.PI],
        [Math.PI, +Math.PI],
      ],
      visible: true,
    },{
      color: '#ffffff',
      extent: [
        [0],
        [1],
      ],
      visible: true,
    },{
      color: '#ffffff',
      extent: [
        [0],
        [1],
      ],
      visible: true,
    },{
      color: '#ffffff',
      extent: [
        [0],
        [1],
      ],
      visible: true,
    }]
  },
}
/*
const DEFAULT_SOURCE = `@plot
fn f(x: f32) -> vec2f {
  return vec2f(x, sin(x));
}

@plot
fn g(x: f32) -> vec2f {
  return vec2f(x, cos(x));
}`
*/
/*
const DEFAULT_SOURCE = `@plot
fn f(x: vec2f) -> vec3f {
  return vec3f(x, sink(x[0], x[1]));
}`
const DEFAULT_SOURCE = `@plot
fn f(x: vec1f) -> vec2f {
  const k = -0.25;
  return vec2f(
    sink(k, x[0]),
    cosk(k, x[0]),
  );
}`
*/
/*
const DEFAULT_SOURCE = `
struct Parameters {
  k: f32,
}

@group(0)
@binding(2)
var<uniform> uParams: Parameters;

@plot
fn f(x: vec2f) -> vec3f {
  return vec3f(x, sin(x[0])*cos(x[1]));
}`
*/
