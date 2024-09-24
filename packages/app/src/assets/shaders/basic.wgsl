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

struct UniformData {
  projection: mat4x4f,
}

fn minimum(x: vec4f) -> f32 {
  return min(min(min(x[0], x[1]), x[2]), x[3]);
}

fn maximum(x: vec4f) -> f32 {
  return max(max(max(x[0], x[1]), x[2]), x[3]);
}

@group(0) @binding(0) var<uniform> uIn: UniformData;

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
    uIn.projection * in.transform,
    in.distance,
    in.fill,
    in.stroke
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

@fragment
fn fragmentMain(in: FragmentIn) -> @location(0) vec4f {
  let d = minimum(in.distance);
  //return in.color;
  //return vec4f(vec3f(d), 1.0);
  return mix(in.fill, in.stroke, step(d, 0.1));
}
