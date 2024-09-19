struct VertexIn {
  @location(0) transform0: vec4f,
  @location(1) transform1: vec4f,
  @location(2) transform2: vec4f,
  @location(3) transform3: vec4f,
  @location(4) color: vec4f,
}

struct FragmentIn {
  @builtin(position) position: vec4f,
  @location(0) color: vec4f,
}

struct VertexData {
  transform: mat4x4f,
  color: vec4f,
};

struct UniformData {
  projection: mat4x4f,
};

@group(0) @binding(0) var<uniform> uIn: UniformData;

fn fromVertexIn(x: VertexIn) -> VertexData {
  return VertexData(
    mat4x4f(x.transform0, x.transform1, x.transform2, x.transform3),
    x.color
  );
}

fn transform(x: VertexData) -> VertexData {
  return VertexData(
    uIn.projection * x.transform,
    x.color,
  );
}

fn toFragmentIn(x: VertexData) -> FragmentIn {
  return FragmentIn(
    x.transform[0].yzwx,
    x.color,
  );
}

@vertex
fn vertexMain(in: VertexIn) -> FragmentIn {
  return toFragmentIn(transform(fromVertexIn(in)));
}

@fragment
fn fragmentMain(in: FragmentIn) -> @location(0) vec4f {
  return in.color;
}
