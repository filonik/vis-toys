// mat

const mat2x2f_I = mat2x2f(1,0,0,1);
const mat3x3f_I = mat3x3f(1,0,0,0,1,0,0,0,1);
const mat4x4f_I = mat4x4f(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);

const N_APPROX = 20;

fn mat2x2f_exp_approx(A: mat2x2f) -> mat2x2f {
  var R = mat2x2f_I;
  for(var i=0; i<N_APPROX; i++) {
    R = mat2x2f_I + A*(1/f32(N_APPROX-i))*R;
  }
  return R;
}

fn mat3x3f_exp_approx(A: mat3x3f) -> mat3x3f {
  var R = mat3x3f_I;
  for(var i=0; i<N_APPROX; i++) {
    R = mat3x3f_I + A*(1/f32(N_APPROX-i))*R;
  }
  return R;
}

fn mat4x4f_exp_approx(A: mat4x4f) -> mat4x4f {
  var R = mat4x4f_I;
  for(var i=0; i<N_APPROX; i++) {
    R = mat4x4f_I + A*(1/f32(N_APPROX-i))*R;
  }
  return R;
}

fn mat2x2f_log_approx(A: mat2x2f) -> mat2x2f {
  return A;
}

// avec

alias avec2f = vec2f;
alias avec3f = vec3f;
alias avec4f = vec4f;

alias t2x2x2f = array<mat2x2f, 2>;
alias t3x3x3f = array<mat3x3f, 3>;
alias t4x4x4f = array<mat4x4f, 4>;

/*
const avec2f_C = t2x2x2f(
  mat2x2f(1, 0, 0, 1),
  mat2x2f(0, 1, -1, 0)
);

const avec3f_C = t3x3x3f(
  mat3x3f(1,0,0,0,1,0,0,0,1),
  mat3x3f(0,1,0,0,0,1,1,0,0),
  mat3x3f(0,0,1,1,0,0,0,1,0)
);
*/

fn avec2f_C(i: i32) -> mat2x2f {
  let m = uAlgebra.C[i];
  return mat2x2f(m[0].xy, m[1].xy);
}

fn avec3f_C(i: i32) -> mat3x3f {
  let m = uAlgebra.C[i];
  return mat3x3f(m[0].xyz, m[1].xyz, m[2].xyz);
}

fn avec4f_C(i: i32) -> mat4x4f {
  return uAlgebra.C[i];
}

//@group(0) @binding(0) var<uniform> uC: array<mat2x2f, 2>;

fn avec4f_mul(x: avec4f, y: avec4f) -> avec4f {
  return x * y;
}

fn avec2f_lmat(x: avec2f) -> mat2x2f {
  return transpose(mat2x2f(avec2f_C(0)*x, avec2f_C(1)*x));
}

fn avec2f_rmat(x: avec2f) -> mat2x2f {
  return transpose(mat2x2f(avec2f_C(0)*x, avec2f_C(1)*x));
}

fn avec2f_lcoords(x: avec2f, y: avec2f) -> avec2f {
  // mat2x2f_exp_approx(avec2f_lmat(vec2(0,1)))*(x[0]*vec2(1,0));
  return mat2x2f_exp_approx(avec2f_lmat(x))*y;
}

fn avec2f_rcoords(x: avec2f, y: avec2f) -> avec2f {
  // mat2x2f_exp_approx(avec2f_lmat(vec2(0,1)))*(x[0]*vec2(1,0));
  return x*mat2x2f_exp_approx(avec2f_rmat(y));
}

fn avec3f_lmat(x: avec3f) -> mat3x3f {
  return transpose(mat3x3f(
    avec3f_C(0)*x,
    avec3f_C(1)*x,
    avec3f_C(2)*x
  ));
}

fn avec3f_rmat(x: avec3f) -> mat3x3f {
  return transpose(mat3x3f(
    avec3f_C(0)*x,
    avec3f_C(1)*x,
    avec3f_C(2)*x
  ));
}

fn avec3f_lcoords(x: avec3f, y: avec3f, z: avec3f) -> avec3f {
  return mat3x3f_exp_approx(avec3f_lmat(x))*mat3x3f_exp_approx(avec3f_lmat(y))*z;
}

fn avec3f_rcoords(x: avec3f, y: avec3f, z: avec3f) -> avec3f {
  return x*mat3x3f_exp_approx(avec3f_rmat(y))*mat3x3f_exp_approx(avec3f_rmat(z));
}

fn avec2f_normal_coords(x: vec2f) -> avec2f {
  return avec2f_rcoords(
    avec2f(x[0],0),
    avec2f(0,x[1])
  );
}

fn avec3f_normal_coords(x: vec3f) -> avec3f {
  return avec3f_rcoords(
    avec3f(x[0],0,0),
    avec3f(0,x[1],0),
    avec3f(0,0,x[2])
  );
}
