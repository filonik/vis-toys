#ifndef BUILTIN_H
#define BUILTIN_H

float _pos_(in float x) { return +x; }
float _neg_(in float x) { return -x; }
float _add_(in float x, in float y) { return x+y; }
float _sub_(in float x, in float y) { return x-y; }
float _mul_(in float x, in float y) { return x*y; }
float _div_(in float x, in float y) { return x/y; }

vec2 _pos_(in vec2 x) { return +x; }
vec2 _neg_(in vec2 x) { return -x; }
vec2 _add_(in vec2 x, in float y) { return x+y; }
vec2 _add_(in float x, in vec2 y) { return x+y; }
vec2 _add_(in vec2 x, in vec2 y) { return x+y; }
vec2 _sub_(in vec2 x, in float y) { return x-y; }
vec2 _sub_(in float x, in vec2 y) { return x-y; }
vec2 _sub_(in vec2 x, in vec2 y) { return x-y; }
vec2 _mul_(in vec2 x, in float y) { return x*y; }
vec2 _mul_(in float x, in vec2 y) { return x*y; }
vec2 _mul_(in vec2 x, in vec2 y) { return x*y; }
vec2 _div_(in vec2 x, in float y) { return x/y; }
vec2 _div_(in float x, in vec2 y) { return x/y; }
vec2 _div_(in vec2 x, in vec2 y) { return x/y; }

vec3 _pos_(in vec3 x) { return +x; }
vec3 _neg_(in vec3 x) { return -x; }
vec3 _add_(in vec3 x, in float y) { return x+y; }
vec3 _add_(in float x, in vec3 y) { return x+y; }
vec3 _add_(in vec3 x, in vec3 y) { return x+y; }
vec3 _sub_(in vec3 x, in float y) { return x-y; }
vec3 _sub_(in float x, in vec3 y) { return x-y; }
vec3 _sub_(in vec3 x, in vec3 y) { return x-y; }
vec3 _mul_(in vec3 x, in float y) { return x*y; }
vec3 _mul_(in float x, in vec3 y) { return x*y; }
vec3 _mul_(in vec3 x, in vec3 y) { return x*y; }
vec3 _div_(in vec3 x, in float y) { return x/y; }
vec3 _div_(in float x, in vec3 y) { return x/y; }
vec3 _div_(in vec3 x, in vec3 y) { return x/y; }

vec4 _pos_(in vec4 x) { return +x; }
vec4 _neg_(in vec4 x) { return -x; }
vec4 _add_(in vec4 x, in float y) { return x+y; }
vec4 _add_(in float x, in vec4 y) { return x+y; }
vec4 _add_(in vec4 x, in vec4 y) { return x+y; }
vec4 _sub_(in vec4 x, in float y) { return x-y; }
vec4 _sub_(in float x, in vec4 y) { return x-y; }
vec4 _sub_(in vec4 x, in vec4 y) { return x-y; }
vec4 _mul_(in vec4 x, in float y) { return x*y; }
vec4 _mul_(in float x, in vec4 y) { return x*y; }
vec4 _mul_(in vec4 x, in vec4 y) { return x*y; }
vec4 _div_(in vec4 x, in float y) { return x/y; }
vec4 _div_(in float x, in vec4 y) { return x/y; }
vec4 _div_(in vec4 x, in vec4 y) { return x/y; }

mat2 _pos_(in mat2 x) { return +x; }
mat2 _neg_(in mat2 x) { return -x; }
mat2 _add_(in mat2 x, in float y) { return x+y; }
mat2 _add_(in float x, in mat2 y) { return x+y; }
mat2 _add_(in mat2 x, in mat2 y) { return x+y; }
mat2 _sub_(in mat2 x, in float y) { return x-y; }
mat2 _sub_(in float x, in mat2 y) { return x-y; }
mat2 _sub_(in mat2 x, in mat2 y) { return x-y; }
mat2 _mul_(in mat2 x, in float y) { return x*y; }
mat2 _mul_(in float x, in mat2 y) { return x*y; }
mat2 _mul_(in mat2 x, in mat2 y) { return x*y; }
mat2 _div_(in mat2 x, in float y) { return x/y; }
mat2 _div_(in float x, in mat2 y) { return x/y; }
mat2 _div_(in mat2 x, in mat2 y) { return x/y; }

mat3 _pos_(in mat3 x) { return +x; }
mat3 _neg_(in mat3 x) { return -x; }
mat3 _add_(in mat3 x, in float y) { return x+y; }
mat3 _add_(in float x, in mat3 y) { return x+y; }
mat3 _add_(in mat3 x, in mat3 y) { return x+y; }
mat3 _sub_(in mat3 x, in float y) { return x-y; }
mat3 _sub_(in float x, in mat3 y) { return x-y; }
mat3 _sub_(in mat3 x, in mat3 y) { return x-y; }
mat3 _mul_(in mat3 x, in float y) { return x*y; }
mat3 _mul_(in float x, in mat3 y) { return x*y; }
mat3 _mul_(in mat3 x, in mat3 y) { return x*y; }
mat3 _div_(in mat3 x, in float y) { return x/y; }
mat3 _div_(in float x, in mat3 y) { return x/y; }
mat3 _div_(in mat3 x, in mat3 y) { return x/y; }

mat4 _pos_(in mat4 x) { return +x; }
mat4 _neg_(in mat4 x) { return -x; }
mat4 _add_(in mat4 x, in float y) { return x+y; }
mat4 _add_(in float x, in mat4 y) { return x+y; }
mat4 _add_(in mat4 x, in mat4 y) { return x+y; }
mat4 _sub_(in mat4 x, in float y) { return x-y; }
mat4 _sub_(in float x, in mat4 y) { return x-y; }
mat4 _sub_(in mat4 x, in mat4 y) { return x-y; }
mat4 _mul_(in mat4 x, in float y) { return x*y; }
mat4 _mul_(in float x, in mat4 y) { return x*y; }
mat4 _mul_(in mat4 x, in mat4 y) { return x*y; }
mat4 _div_(in mat4 x, in float y) { return x/y; }
mat4 _div_(in float x, in mat4 y) { return x/y; }
mat4 _div_(in mat4 x, in mat4 y) { return x/y; }

float _exp_(in float x) { return exp(x); }
float _log_(in float x) { return log(x); }
float _cos_(in float x) { return cos(x); }
float _sin_(in float x) { return sin(x); }
float _tan_(in float x) { return tan(x); }
float _acos_(in float x) { return acos(x); }
float _asin_(in float x) { return asin(x); }
float _atan_(in float x) { return atan(x); }
float _cosh_(in float x) { return cosh(x); }
float _sinh_(in float x) { return sinh(x); }
float _tanh_(in float x) { return tanh(x); }
float _acosh_(in float x) { return acosh(x); }
float _asinh_(in float x) { return asinh(x); }
float _atanh_(in float x) { return atanh(x); }
float _sqrt_(in float x) { return sqrt(x); }
float _ceil_(in float x) { return ceil(x); }
float _floor_(in float x) { return floor(x); }
float _atan_(in float x, in float y) { return atan(x, y); }
float _pow_(in float x, in float y) { return pow(x, y); }
float _min_(in float x, in float y) { return min(x, y); }
float _max_(in float x, in float y) { return max(x, y); }

#endif