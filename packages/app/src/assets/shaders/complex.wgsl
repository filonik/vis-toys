struct cf32 {
  re: f32,
  im: f32,
}

fn cf32_add(x: cf32, y: cf32) -> cf32 {
  return cf32(
    x.re + y.re,
    x.im + y.im,
  );
}

fn cf32_mul(x: cf32, y: cf32) -> cf32 {
  return cf32(
    (x.re * y.re) - (x.im * y.im),
    (x.re * y.im) + (x.im * y.re),
  );
}

fn cf32_conjugate(x: cf32) -> cf32 {
  return cf32(x.re, -x.im);
}

fn cf32_norm2(x: cf32) -> f32 {
  return cf32_mul(x, cf32_conjugate(x)).re;
}

fn cf32_add_inv(x: cf32) -> cf32 {
  return cf32(-x.re, -x.im);
}

fn cf32_mul_inv(x: cf32) -> cf32 {
  let y = cf32_conjugate(x);
  let n = cf32_mul(x, y).re;
  return cf32_divs(y, n);
}

fn cf32_sub(x: cf32, y: cf32) -> cf32 {
  return cf32_add(x, cf32_add_inv(y));
}

fn cf32_div(x: cf32, y: cf32) -> cf32 {
  return cf32_mul(x, cf32_mul_inv(y));
}

fn cf32_adds(x: cf32, y: f32) -> cf32 {
  // cf32_add(x, cf32(y, 0))
  return cf32(x.re + y, x.im);
}

fn cf32_subs(x: cf32, y: f32) -> cf32 {
  // cf32_sub(x, cf32(y, 0))
  return cf32(x.re - y, x.im);
}

fn cf32_muls(x: cf32, y: f32) -> cf32 {
  // cf32_mul(x, cf32(y, 0))
  return cf32(x.re * y, x.im * y);
}

fn cf32_divs(x: cf32, y: f32) -> cf32 {
  // cf32_div(x, cf32(y, 0))
  return cf32(x.re / y, x.im / y);
}

fn cf32_rect_to_polar(x: cf32) -> cf32 {
  return cf32(
    sqrt(cf32_norm2(x)),
    atan2(x.im, x.re)
  );
}

fn cf32_polar_to_rect(x: cf32) -> cf32 {
  return cf32(
    x.re*cos(x.im),
    x.re*sin(x.im)
  );
}

fn cf32_exp_to_polar(x: cf32) -> cf32 {
    return cf32(exp(x.re), x.im);
}

fn cf32_log_to_rect(x: cf32) -> cf32 {
    return cf32(log(x.re), x.im);
}

fn cf32_exp(x: cf32) -> cf32 {
  return cf32_polar_to_rect(cf32_exp_to_polar(x));
}

fn cf32_log(x: cf32) -> cf32 {
  return cf32_log_to_rect(cf32_rect_to_polar(x));
}

fn cf32_pow(x: cf32, y: cf32) -> cf32 {
  return cf32_exp(cf32_mul(cf32_log(x), y));
}
