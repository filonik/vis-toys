#ifndef MATRIX_OPS_H_
#define MATRIX_OPS_H_

#define vec1 float[1]
#define mat1 float[1*1]

vec1 _pos_(in vec1 x) { return vec1(_pos_(x[0])); }
vec1 _neg_(in vec1 x) { return vec1(_neg_(x[0])); }
vec1 _add_(in vec1 x, in float y) { return vec1(_add_(x[0], y)); }
vec1 _add_(in float x, in vec1 y) { return vec1(_add_(x, y[0])); }
vec1 _add_(in vec1 x, in vec1 y) { return vec1(_add_(x[0], y[0])); }
vec1 _sub_(in vec1 x, in float y) { return vec1(_sub_(x[0], y)); }
vec1 _sub_(in float x, in vec1 y) { return vec1(_sub_(x, y[0])); }
vec1 _sub_(in vec1 x, in vec1 y) { return vec1(_sub_(x[0], y[0])); }
vec1 _mul_(in vec1 x, in float y) { return vec1(_mul_(x[0], y)); }
vec1 _mul_(in float x, in vec1 y) { return vec1(_mul_(x, y[0])); }
vec1 _mul_(in vec1 x, in vec1 y) { return vec1(_mul_(x[0], y[0])); }
vec1 _div_(in vec1 x, in float y) { return vec1(_div_(x[0], y)); }
vec1 _div_(in float x, in vec1 y) { return vec1(_div_(x, y[0])); }
vec1 _div_(in vec1 x, in vec1 y) { return vec1(_div_(x[0], y[0])); }

mat1 outer(in vec1 x, in vec1 y);
mat2 outer(in vec2 x, in vec2 y);
mat3 outer(in vec3 x, in vec3 y);
mat4 outer(in vec4 x, in vec4 y);

mat1 outer(in vec1 x, in vec1 y) {
  return mat1(x[0] * y[0]);
}

mat2 outer(in vec2 x, in vec2 y) {
  return mat2(x * y[0], x * y[1]);
}

mat3 outer(in vec3 x, in vec3 y) {
  return mat3(x * y[0], x * y[1], x * y[2]);
}

mat4 outer(in vec4 x, in vec4 y) {
  return mat4(x * y[0], x * y[1], x * y[2],  x * y[3]);
}

mat4 translate(vec3 t)
{
 	return mat4(
        vec4(1.,0.,0.,0.),
        vec4(0.,1.,0.,0.),
        vec4(0.,0.,1.,0.),
        vec4(t,1.)
        );
}
mat4 translateInv(vec3 t)
{
 	return translate(-t);   
}

mat4 scale(vec3 s)
{
 	return mat4(
        vec4(s.x,0.,0.,0.),
        vec4(0.,s.y,0.,0.),
        vec4(0.,0.,s.z,0.),
        vec4(0.,0.,0.,1.)
        );
}
mat4 scaleInv(vec3 s)
{
 	return scale(1./s);   
}

mat4 rightToLeft()
{
    // 1 0 0  0
    // 0 1 0  0
    // 0 0 -1 0
    // 0 0 0  1
 	return scale(vec3(1.,1.,-1.));
}

mat4 rightToLeftInv()
{
    // same matrix
    return rightToLeft();
}

mat3 rotx(float a) {
  float ca = cos(a);
  float sa = sin(a);

  return mat3(1.0, 0.0, 0.0, 0.0, ca, sa, 0.0, -sa, ca);
}

mat3 roty(float a) {
  float ca = cos(a);
  float sa = sin(a);

  return mat3(ca, 0.0, -sa, 0.0, 1.0, 0.0, sa, 0.0, ca);
}

#endif // MATRIX_OPS_H_
