//alias block2x2<type T> = array<array<T, 2>, 2>;
alias block2x2mat8x8f = array<array<mat4x4f, 2>, 2>;

fn mat4x4f_add(x: mat4x4f, y: mat4x4f) -> mat4x4f {
  return x + y;
}

fn mat4x4f_sub(x: mat4x4f, y: mat4x4f) -> mat4x4f {
  return x - y;
}

fn mat4x4f_mul(x: mat4x4f, y: mat4x4f) -> mat4x4f {
  return mat4x4f(
    x[0]*y[0],
    x[1]*y[1],
    x[2]*y[2],
    x[3]*y[3]
  );
}

fn mat4x4f_div(x: mat4x4f, y: mat4x4f) -> mat4x4f {
  return mat4x4f(
    x[0]/y[0],
    x[1]/y[1],
    x[2]/y[2],
    x[3]/y[3]
  );
}

fn mat4x4f_matmul(x: mat4x4f, y: mat4x4f) -> mat4x4f {
  return x * y;
}

struct cvec4f {
  re: vec4f,
  im: vec4f,
}

fn cvec4f_conjugate(x: cvec4f) -> cvec4f {
  return cvec4f(x.re, -x.im);
}

struct cmat4x4f {
  re: mat4x4f,
  im: mat4x4f,
}

alias block2x2cmat8x8f = array<array<cmat4x4f, 2>, 2>;

fn cmat4x4f_conjugate(x: cmat4x4f) -> cmat4x4f {
  return cmat4x4f(x.re, -x.im);
}

fn cmat4x4f_transpose(x: cmat4x4f) -> cmat4x4f {
  return cmat4x4f(transpose(x.re), transpose(x.im));
}

fn cmat4x4f_conjugate_transpose(x: cmat4x4f) -> cmat4x4f {
  return cmat4x4f_conjugate(cmat4x4f_transpose(x));
}

fn cmat4x4f_add(x: cmat4x4f, y: cmat4x4f) -> cmat4x4f {
  return cmat4x4f(
    mat4x4f_add(x.re, y.re),
    mat4x4f_add(x.im, y.im),
  );
}

fn cmat4x4f_sub(x: cmat4x4f, y: cmat4x4f) -> cmat4x4f {
  return cmat4x4f(
    mat4x4f_sub(x.re, y.re),
    mat4x4f_sub(x.im, y.im),
  );
}

fn cmat4x4f_mul(x: cmat4x4f, y: cmat4x4f) -> cmat4x4f {
  return cmat4x4f(
    mat4x4f_sub(mat4x4f_mul(x.re, y.re), mat4x4f_mul(x.im, y.im)),
    mat4x4f_add(mat4x4f_mul(x.re, y.im), mat4x4f_mul(x.im, y.re)),
  );
}

fn cmat4x4f_div(x: cmat4x4f, y: cmat4x4f) -> cmat4x4f {
  return cmat4x4f();
}

fn cmat4x4f_matmul(x: cmat4x4f, y: cmat4x4f) -> cmat4x4f {
  return cmat4x4f(
    mat4x4f_sub(mat4x4f_matmul(x.re, y.re), mat4x4f_matmul(x.im, y.im)),
    mat4x4f_add(mat4x4f_matmul(x.re, y.im), mat4x4f_matmul(x.im, y.re)),
  );
}

struct schur_mat4x4f {
  q: cmat4x4f,
  t: cmat4x4f,
}

fn schur_mat4x4f_expm(x: schur_mat4x4f) -> schur_mat4x4f {
  return schur_mat4x4f(x.q, x.t);
}

fn schur_mat4x4f_logm(x: schur_mat4x4f) -> schur_mat4x4f {
  return schur_mat4x4f(x.q, x.t);
}

fn schur_mat4x4f_to_mat4x4f(x: schur_mat4x4f) -> mat4x4f {
  return cmat4x4f_matmul(cmat4x4f_matmul(x.q, x.t), cmat4x4f_conjugate_transpose(x.q)).re;
}
