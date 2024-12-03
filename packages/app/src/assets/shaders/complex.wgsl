struct cf32 {
  re: f32,
  im: f32,
}

fn cf32_conjugate(x: cf32) -> cf32 {
  return cf32(x.re, -x.im);
}

fn cf32_add(x: cf32, y: cf32) -> cf32 {
  return cf32(
    x.re + y.re,
    x.im + y.im,
  );
}

fn cf32_sub(x: cf32, y: cf32) -> cf32 {
  return cf32(
    x.re - y.re,
    x.im - y.im,
  );
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

fn cf32_mul(x: cf32, y: cf32) -> cf32 {
  return cf32(
    (x.re * y.re) - (x.im * y.im),
    (x.re * y.im) + (x.im * y.re),
  );
}

fn cf32_div(x: cf32, y: cf32) -> cf32 {
  return cf32_mul(x, cf32_mul_inv(y));
}

fn cf32_add_inv(x: cf32) -> cf32 {
  return cf32(-x.re, -x.im);
}

fn cf32_mul_inv(x: cf32) -> cf32 {
  let y = cf32_conjugate(x);
  return cf32_divs(y, cf32_mul(x, y).re);
}
