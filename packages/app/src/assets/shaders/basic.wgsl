struct VertexIn {
  @location(0) position: vec4f,
  @location(1) color: vec4f,
}

struct FragmentIn {
  @builtin(position) position: vec4f,
  @location(0) color: vec4f,
}

struct UniformIn {
  projection: mat4x4f,
};
 
@group(0) @binding(0) var<uniform> uIn: UniformIn;

@vertex
fn vertexMain(in: VertexIn) -> FragmentIn {
  var out: FragmentIn;
  out.position = uIn.projection * in.position;
  out.color = in.color;
  return out;
}

@fragment
fn fragmentMain(in: FragmentIn) -> @location(0) vec4f {
  return in.color;
}