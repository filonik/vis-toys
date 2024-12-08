const mat2x2f_I = mat2x2f(1,0,0,1);
const mat3x3f_I = mat3x3f(1,0,0,0,1,0,0,0,1);
const mat4x4f_I = mat4x4f(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);

const N_APPROX = 25;

fn mat2x2f_expm1m_approx(A: mat2x2f) -> mat2x2f {
  var R = A;
  for(var i=0; i<N_APPROX; i++) {
    let s = (1./f32(N_APPROX-i));
    R = (mat2x2f_I + R) * (A*s);
  }
  return R;
}

fn mat3x3f_expm1m_approx(A: mat3x3f) -> mat3x3f {
  var R = A;
  for(var i=0; i<N_APPROX; i++) {
    let s = (1./f32(N_APPROX-i));
    R = (mat3x3f_I + R) * (A*s);
  }
  return R;
}

fn mat4x4f_expm1m_approx(A: mat4x4f) -> mat4x4f {
  var R = A;
  for(var i=0; i<N_APPROX; i++) {
    let s = (1./f32(N_APPROX-i));
    R = (mat4x4f_I + R) * (A*s);
  }
  return R;
}

fn mat2x2f_logp1m_approx(B: mat2x2f) -> mat2x2f {
  var R = B * (powNegOne(N_APPROX+2)/f32(N_APPROX+1));
  for(var i=0; i<N_APPROX; i++) {
    let s = powNegOne(N_APPROX-i+1)/f32(N_APPROX-i);    
    R = B * (mat2x2f_I*s + R);
  }
  return R;
}

fn mat3x3f_logp1m_approx(B: mat3x3f) -> mat3x3f {
  var R = B * (powNegOne(N_APPROX+2)/f32(N_APPROX+1));
  for(var i=0; i<N_APPROX; i++) {
    let s = powNegOne(N_APPROX-i+1)/f32(N_APPROX-i);    
    R = B * (mat3x3f_I*s + R);
  }
  return R;
}

fn mat2x2f_expm(A: mat2x2f) -> mat2x2f {
  return mat2x2f_expm1m_approx(A) + mat2x2f_I;
}

fn mat3x3f_expm(A: mat3x3f) -> mat3x3f {
  return mat3x3f_expm1m_approx(A) + mat3x3f_I;
}

fn mat4x4f_expm(A: mat4x4f) -> mat4x4f {
  return mat4x4f_expm1m_approx(A) + mat4x4f_I;
}

fn mat2x2f_logm(B: mat2x2f) -> mat2x2f {
  return mat2x2f_logp1m_approx(B - mat2x2f_I);
}

fn mat3x3f_logm(B: mat3x3f) -> mat3x3f {
  return mat3x3f_logp1m_approx(B - mat3x3f_I);
}

fn mat2x2f_adj(A: mat2x2f) -> mat2x2f {
  return mat2x2f(
    A[1][1], -A[0][1],
    -A[1][0], A[0][0],
  );
}

fn mat2x2f_mul_inv(A: mat2x2f) -> mat2x2f {
  let det = determinant(A);
  return mat2x2f_adj(A)*(1./det);
}

fn mat2x2f_mix2(A: mat2x2f, B: mat2x2f, t: vec1f) -> mat2x2f {
  let logDelta = mat2x2f_logm(mat2x2f_mul_inv(A)*B);
  return A * mat2x2f_expm(logDelta * t[0]);
}

fn mat3x3f_adj(A: mat3x3f) -> mat3x3f {
  return mat3x3f(
    A[1][1]*A[2][2] - A[1][2]*A[2][1], -A[0][1]*A[2][2] + A[0][2]*A[2][1], A[0][1]*A[1][2] - A[0][2]*A[1][1],
    -A[1][0]*A[2][2] + A[1][2]*A[2][0], A[0][0]*A[2][2] - A[0][2]*A[2][0], -A[0][0]*A[1][2] + A[0][2]*A[1][0],
    A[1][0]*A[2][1] - A[1][1]*A[2][0], -A[0][0]*A[2][1] + A[0][1]*A[2][0], A[0][0]*A[1][1] - A[0][1]*A[1][0],
  );
}

fn mat3x3f_mul_inv(A: mat3x3f) -> mat3x3f {
  let det = determinant(A);
  return mat3x3f_adj(A)*(1./det);
}
