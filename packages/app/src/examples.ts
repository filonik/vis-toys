
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

export const generalSphere2 = `${generalSpherical2}

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

export const wave2 = `@plot
fn f(x: vec1f) -> vec2f {
  return vec2f(x[0], sin(x[0]));
}`

export const wave3 = `@plot
fn f(x: vec2f) -> vec3f {
  return vec3f(x[0], x[1], sin(x[0])*cos(x[1]));
}`

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
