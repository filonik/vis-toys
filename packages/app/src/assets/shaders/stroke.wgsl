fn minimum(x: vec4f) -> f32 {
  return min(min(min(x[0], x[1]), x[2]), x[3]);
}

fn maximum(x: vec4f) -> f32 {
  return max(max(max(x[0], x[1]), x[2]), x[3]);
}

fn distanceUnscaled(value: vec4f) -> f32 {
  return minimum(value);
}

fn distanceScaled(value: vec4f) -> f32 {
  return minimum(value/fwidth(value));
}

fn strokeHard(distance: f32, strokeWidth: f32) -> f32 {
  return 1.0 - step(distance, strokeWidth);
}

fn strokeSoft(distance: f32, strokeWidth: f32) -> f32 {
  let feather = 0.5;
  return smoothstep(
    2.0*strokeWidth - feather,
    2.0*strokeWidth + feather,
    distance
  );
}

// Hard/Step
/*
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
*/

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