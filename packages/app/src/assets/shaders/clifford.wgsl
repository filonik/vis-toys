alias dcl2vec = vec2f;
alias dcl3vec = vec3f;
alias dcl4vec = vec4f;

alias dcl2rot = vec2f;
alias dcl3rot = vec4f;

fn dcl3vec_mul(k: f32, x: dcl3vec, y: dcl3vec) -> dcl3rot {
  return dcl3rot(
    k*x[2]*y[1] - k*x[1]*y[2],
    x[0]*y[2] - x[2]*y[0],
    x[1]*y[0] - x[0]*y[2],
    -x[0]*y[0] - k*x[1]*y[1] - k*x[2]*y[2]
  );
}

fn dcl3rot_mul(k: f32, x: dcl3rot, y: dcl3rot) -> dcl3rot {
  return dcl3rot(
    k*x[2]*y[1] - k*x[1]*y[2] + x[3]*y[0] + x[0]*y[3],
    x[0]*y[2] - x[2]*y[0] + x[3]*y[1] + x[1]*y[3],
    x[1]*y[0] - x[0]*y[1] + x[3]*y[2] + x[2]*y[3],
    -x[0]*y[0] - k*x[1]*y[1] - k*x[2]*y[2] + x[3]*y[3]
  );
}

fn dcl3vec_muls(x: dcl3vec, y: f32) -> dcl3vec {
  return dcl3vec(x[0] * y, x[1] * y, x[2] * y);
}

fn dcl3vec_divs(x: dcl3vec, y: f32) -> dcl3vec {
  return dcl3vec(x[0] / y, x[1] / y, x[2] / y);
}

fn dcl3rot_muls(x: dcl3rot, y: f32) -> dcl3rot {
  return dcl3rot(x[0] * y, x[1] * y, x[2] * y, x[3] * y);
}

fn dcl3rot_divs(x: dcl3rot, y: f32) -> dcl3rot {
  return dcl3rot(x[0] / y, x[1] / y, x[2] / y, x[3] / y);
}

fn dcl3vec_conjugate(x: dcl3vec) -> dcl3vec {
  return dcl3vec(-x[0], -x[1], -x[2]);
}

fn dcl3vec_norm2(k: f32, x: dcl3vec) -> f32 {
  return dcl3vec_mul(k, x, dcl3vec_conjugate(x))[3];
}

fn dcl3vec_mul_inv(k: f32, x: dcl3vec) -> dcl3vec {
  let y = dcl3vec_conjugate(x);
  let n = dcl3vec_mul(k, x, y)[3];
  return dcl3vec_divs(y, n);
}

fn dcl3rot_conjugate(x: dcl3rot) -> dcl3rot {
  return dcl3rot(-x[0], -x[1], -x[2], x[3]);
}

fn dcl3rot_norm2(k: f32, x: dcl3rot) -> f32 {
  return dcl3rot_mul(k, x, dcl3rot_conjugate(x))[3];
}

fn dcl3rot_mul_inv(k: f32, x: dcl3rot) -> dcl3rot {
  let y = dcl3rot_conjugate(x);
  let n = dcl3rot_mul(k, x, y)[3];
  return dcl3rot_divs(y, n);
}

// TODO!
fn dcl3rot_rect_to_polar(k: f32, x: dcl3rot) -> dcl3rot {
  let n = dcl3vec_norm2(k, dcl3vec(x[0], x[1], x[2]));
  return dcl3rot(
    x[0]*atan2k(n, 1, x[3]),
    x[1]*atan2k(n, 1, x[3]),
    x[2]*atan2k(n, 1, x[3]),
    sqrt(dcl3rot_norm2(k, x)),
  );
}

fn dcl3rot_polar_to_rect(k: f32, x: dcl3rot) -> dcl3rot {
  let n = dcl3vec_norm2(k, dcl3vec(x[0], x[1], x[2]));
  return dcl3rot(
    x[3]*x[0]*sink(n, 1),
    x[3]*x[1]*sink(n, 1),
    x[3]*x[2]*sink(n, 1),
    x[3]*cosk(n, 1),
  );
}

fn dcl3rot_exp_to_polar(x: dcl3rot) -> dcl3rot {
    return dcl3rot(x[0], x[1], x[2], exp(x[3]));
}

fn dcl3rot_log_to_rect(x: dcl3rot) -> dcl3rot {
    return dcl3rot(x[0], x[1], x[2], log(x[3]));
}

fn dcl3rot_exp(k: f32, x: dcl3rot) -> dcl3rot {
  return dcl3rot_polar_to_rect(k, dcl3rot_exp_to_polar(x));
}

fn dcl3rot_log(k: f32, x: dcl3rot) -> dcl3rot {
  return dcl3rot_log_to_rect(dcl3rot_rect_to_polar(k, x));
}

fn dcl3rot_pows(k:f32, x: dcl3rot, y: f32) -> dcl3rot {
  return dcl3rot_exp(k, dcl3rot_muls(dcl3rot_log(k, x), y));
}

fn dcl3rot_pow(k:f32, x: dcl3rot, y: dcl3rot) -> dcl3rot {
  return dcl3rot_exp(k, dcl3rot_mul(k, dcl3rot_log(k, x), y));
}

fn dcl3vec_mulr(k: f32, x: dcl3vec, y: dcl3rot) -> dcl3rot {
  return dcl3rot_mul(k, dcl3rot(x, 0), y);
}

fn dcl3rot_sw(k: f32, x: dcl3rot, y: dcl3rot) -> dcl3rot {
 return dcl3rot_mul(k, 
    dcl3rot_mul_inv(k, y),
    dcl3rot_mul(k, x, y)
  );
}

fn dcl3rot_mix(k: f32, x: dcl3rot, y: dcl3rot, t: vec1f) -> dcl3rot {
  let delta = dcl3rot_mul(k, dcl3rot_mul_inv(k, x), y);
  return dcl3rot_mul(k, x, dcl3rot_pows(k, delta, t[0]));
}

fn dcl3vec_mix(k: f32, x: dcl3vec, y: dcl3vec, t: vec1f) -> dcl3vec {
  let delta = dcl3vec_mul(k, dcl3vec_mul_inv(k, x), y);
  return dcl3vec_mulr(k, x, dcl3rot_pows(k, delta, t[0])).xyz;
  //return dcl3rot_sw(k, dcl3rot(x, 0), dcl3rot_pows(k, delta, 0.5*t[0])).xyz;
}
