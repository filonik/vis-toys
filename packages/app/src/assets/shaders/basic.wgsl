struct VertexIn {
  @location(0) transform0: vec4f,
  @location(1) transform1: vec4f,
  @location(2) transform2: vec4f,
  @location(3) transform3: vec4f,
  @location(4) distance: vec4f,
  @location(5) fill: vec4f,
  @location(6) stroke: vec4f,
}

struct FragmentIn {
  @builtin(position) position: vec4f,
  @location(0) distance: vec4f,
  @location(1) fill: vec4f,
  @location(2) stroke: vec4f,
}

struct VertexData {
  transform: mat4x4f,
  distance: vec4f,
  fill: vec4f,
  stroke: vec4f,
}

struct MaterialData {
  fill: vec4f,
  stroke: vec4f,
  strokeWidth: f32,
}

struct CameraData {
  transform: mat4x4f,
}

fn minimum(x: vec4f) -> f32 {
  return min(min(min(x[0], x[1]), x[2]), x[3]);
}

fn maximum(x: vec4f) -> f32 {
  return max(max(max(x[0], x[1]), x[2]), x[3]);
}

@group(0) @binding(0) var<uniform> uCamera: CameraData;
@group(0) @binding(1) var<uniform> uMaterial: MaterialData;

fn fromVertexIn(in: VertexIn) -> VertexData {
  return VertexData(
    mat4x4f(in.transform0, in.transform1, in.transform2, in.transform3),
    in.distance,
    in.fill,
    in.stroke
  );
}

fn transform(in: VertexData) -> VertexData {
  return VertexData(
    uCamera.transform * in.transform,
    in.distance,
    uMaterial.fill * in.fill,
    uMaterial.stroke * in.stroke
  );
}

fn toFragmentIn(in: VertexData) -> FragmentIn {
  return FragmentIn(
    in.transform[0].yzwx,
    in.distance,
    in.fill,
    in.stroke
  );
}

@vertex
fn vertexMain(in: VertexIn) -> FragmentIn {
  return toFragmentIn(transform(fromVertexIn(in)));
}

// Original
// See: https://github.com/rreusser/glsl-solid-wireframe
/*
fn strokeScaled(distance: vec4f) -> f32 {
  let d = fwidth(distance);
  let w = smoothstep(
    d * (2.0*uMaterial.strokeWidth - 0.5),
    d * (2.0*uMaterial.strokeWidth + 0.5),
    distance
  );
  return minimum(w);
}
*/

fn distanceUnscaled(value: vec4f) -> f32 {
  return minimum(value);
}

fn distanceScaled(value: vec4f) -> f32 {
  return minimum(value/fwidth(value));
}

// Alternative to fwidth?
//let w = length(vec2(dpdx(d), dpdy(d)));

// Hard/Step
fn strokeUnscaled(distance: vec4f) -> f32 {
  let d = minimum(distance);
  let f = 1.0 - step(d, uMaterial.strokeWidth);
  return f;
}

fn strokeScaled(distance: vec4f) -> f32 {
  let d = minimum(distance/fwidth(distance));
  let f = 1.0 - step(d, uMaterial.strokeWidth);
  return f;
}

// Soft/Smoothstep
/*
fn strokeUnscaled(distance: vec4f) -> f32 {
  let d = minimum(distance);
  let f = smoothstep(
    2.0*uMaterial.strokeWidth - 0.5,
    2.0*uMaterial.strokeWidth + 0.5,
    d*100.0
  );
  return f;
}

fn strokeScaled(distance: vec4f) -> f32 {
  let d = minimum(distance/fwidth(distance));
  let f = smoothstep(
    2.0*uMaterial.strokeWidth - 0.5,
    2.0*uMaterial.strokeWidth + 0.5,
    d
  );
  return f;
}
*/

@fragment
fn fragmentMain(in: FragmentIn) -> @location(0) vec4f {
  //return in.fill;
  //return in.stroke;
  //return vec4f(vec3f(distanceUnscaled(in.distance)), 1.0);
  //return vec4f(vec3f(distanceScaled(in.distance)), 1.0);
  
  // Scaled
  return mix(in.stroke, in.fill, strokeScaled(in.distance));
  //return mix(in.stroke, in.fill, strokeUnscaled(in.distance));
}
