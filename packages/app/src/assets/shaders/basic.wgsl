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

@fragment
fn fragmentMain(in: FragmentIn) -> @location(0) vec4f {
  //return vec4f(vec3f(minimum(in.distance)), 1.0);
  
  // Fudged
  /*
  let d = minimum(in.distance);
  let f = step(d, uMaterial.strokeWidth*0.01);
  //return vec4f(vec3f(f), 1.0);
  return mix(in.fill, in.stroke, f);
  */
  
  // Pixel-perfect
  let d = fwidth(in.distance);
  let w = smoothstep(
    d * (2.0*uMaterial.strokeWidth - 0.5),
    d * (2.0*uMaterial.strokeWidth + 0.5),
    in.distance
  );
  let f = minimum(w);
  //return vec4f(vec3f(f), 1.0);
  return mix(in.stroke, in.fill, f);
  
  //let f = fwidth(in.distance);
  //let d = minimum(uMaterial.strokeWidth*f);
  //let d = minimum(fwidth(in.distance))*0.5;

  /*
  //let d = minimum(fwidth(in.distance)*0.5);
  //return in.color;
  //return vec4f(vec3f(minimum(w)), 1.0);
  //let w = length(vec2(dpdx(d), dpdy(d)));
  
  return mix(
    in.fill,
    in.stroke,
    minimum(w)
  );
  */
}
