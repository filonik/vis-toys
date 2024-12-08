alias gcf32 = vec2f;

fn gc_add(x: gcf32, y: gcf32) -> gcf32 {
  return gcf32(
    x[0] + y[0],
    x[1] + y[1],
  );
}

fn gc_mul(k: f32, x: gcf32, y: gcf32) -> gcf32 {
  return gcf32(x[0]*y[0] - k*x[1]*y[1], x[0]*y[1] + x[1]*y[0]);
}

fn gc_conjugate(x: vec2f) -> vec2f {
  return vec2f(x[0], -x[1]);
}

fn gc_norm2(k: f32, x: vec2f) -> f32 {
  return x[0]*x[0] + k*x[1]*x[1];
}

fn gc_add_inv(x: vec2f) -> vec2f {
  return vec2f(
    -x[0],
    -x[1],
  );
}

fn gc_mul_inv(k: f32, x: vec2f) -> vec2f {
  return gc_conjugate(x)/gc_norm2(k, x);
}

fn gc_sub(x: gcf32, y: gcf32) -> gcf32 {
  return gc_add(x, gc_add_inv(y));
}

fn gc_div(k: f32, x: gcf32, y: gcf32) -> gcf32 {
  return gc_mul(k, x, gc_mul_inv(k, y));
}

fn gc_rect_to_polar(k: f32, x: vec2f) -> vec2f {
  return vec2f(
    sqrt(gc_norm2(k, x)),
    atan2k(k, x[1], x[0])
  );
}

fn gc_polar_to_rect(k: f32, x: vec2f) -> vec2f {
  return vec2(
    x[0]*cosk(k, x[1]),
    x[0]*sink(k, x[1])
  );
}

fn gc_exp_to_polar(x: vec2f) -> vec2f {
    return vec2f(exp(x[0]), x[1]);
}

fn gc_log_to_rect(x: vec2f) -> vec2f {
    return vec2f(log(x[0]), x[1]);
}

fn gc_exp(k: f32, x: vec2f) -> vec2f {
  return gc_polar_to_rect(k, gc_exp_to_polar(x));
}

fn gc_log(k: f32, x: vec2f) -> vec2f {
  return gc_log_to_rect(gc_rect_to_polar(k, x));
}

fn gc_pow(k:f32, x: gcf32, y: gcf32) -> gcf32 {
  return gc_exp(k, gc_mul(k, gc_log(k, x), y));
}

fn gc_mix2(k: f32, x: vec2f, y: vec2f, t: vec1f) -> vec2f {
  let delta = gc_mul(k, gc_mul_inv(k, x), y);
  return gc_mul(k, x, gc_exp(k, gc_log(k, delta) * t[0]));
}
