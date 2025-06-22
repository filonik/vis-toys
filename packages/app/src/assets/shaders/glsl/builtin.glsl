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

vec2 _exp_(in vec2 x) { return exp(x); }
vec2 _log_(in vec2 x) { return log(x); }
vec2 _cos_(in vec2 x) { return cos(x); }
vec2 _sin_(in vec2 x) { return sin(x); }
vec2 _tan_(in vec2 x) { return tan(x); }
vec2 _acos_(in vec2 x) { return acos(x); }
vec2 _asin_(in vec2 x) { return asin(x); }
vec2 _atan_(in vec2 x) { return atan(x); }
vec2 _cosh_(in vec2 x) { return cosh(x); }
vec2 _sinh_(in vec2 x) { return sinh(x); }
vec2 _tanh_(in vec2 x) { return tanh(x); }
vec2 _acosh_(in vec2 x) { return acosh(x); }
vec2 _asinh_(in vec2 x) { return asinh(x); }
vec2 _atanh_(in vec2 x) { return atanh(x); }
vec2 _sqrt_(in vec2 x) { return sqrt(x); }
vec2 _ceil_(in vec2 x) { return ceil(x); }
vec2 _floor_(in vec2 x) { return floor(x); }
vec2 _atan_(in vec2 x, in vec2 y) { return atan(x, y); }
vec2 _pow_(in vec2 x, in vec2 y) { return pow(x, y); }
vec2 _min_(in vec2 x, in vec2 y) { return min(x, y); }
vec2 _max_(in vec2 x, in vec2 y) { return max(x, y); }

vec3 _exp_(in vec3 x) { return exp(x); }
vec3 _log_(in vec3 x) { return log(x); }
vec3 _cos_(in vec3 x) { return cos(x); }
vec3 _sin_(in vec3 x) { return sin(x); }
vec3 _tan_(in vec3 x) { return tan(x); }
vec3 _acos_(in vec3 x) { return acos(x); }
vec3 _asin_(in vec3 x) { return asin(x); }
vec3 _atan_(in vec3 x) { return atan(x); }
vec3 _cosh_(in vec3 x) { return cosh(x); }
vec3 _sinh_(in vec3 x) { return sinh(x); }
vec3 _tanh_(in vec3 x) { return tanh(x); }
vec3 _acosh_(in vec3 x) { return acosh(x); }
vec3 _asinh_(in vec3 x) { return asinh(x); }
vec3 _atanh_(in vec3 x) { return atanh(x); }
vec3 _sqrt_(in vec3 x) { return sqrt(x); }
vec3 _ceil_(in vec3 x) { return ceil(x); }
vec3 _floor_(in vec3 x) { return floor(x); }
vec3 _atan_(in vec3 x, in vec3 y) { return atan(x, y); }
vec3 _pow_(in vec3 x, in vec3 y) { return pow(x, y); }
vec3 _min_(in vec3 x, in vec3 y) { return min(x, y); }
vec3 _max_(in vec3 x, in vec3 y) { return max(x, y); }

vec4 _exp_(in vec4 x) { return exp(x); }
vec4 _log_(in vec4 x) { return log(x); }
vec4 _cos_(in vec4 x) { return cos(x); }
vec4 _sin_(in vec4 x) { return sin(x); }
vec4 _tan_(in vec4 x) { return tan(x); }
vec4 _acos_(in vec4 x) { return acos(x); }
vec4 _asin_(in vec4 x) { return asin(x); }
vec4 _atan_(in vec4 x) { return atan(x); }
vec4 _cosh_(in vec4 x) { return cosh(x); }
vec4 _sinh_(in vec4 x) { return sinh(x); }
vec4 _tanh_(in vec4 x) { return tanh(x); }
vec4 _acosh_(in vec4 x) { return acosh(x); }
vec4 _asinh_(in vec4 x) { return asinh(x); }
vec4 _atanh_(in vec4 x) { return atanh(x); }
vec4 _sqrt_(in vec4 x) { return sqrt(x); }
vec4 _ceil_(in vec4 x) { return ceil(x); }
vec4 _floor_(in vec4 x) { return floor(x); }
vec4 _atan_(in vec4 x, in vec4 y) { return atan(x, y); }
vec4 _pow_(in vec4 x, in vec4 y) { return pow(x, y); }
vec4 _min_(in vec4 x, in vec4 y) { return min(x, y); }
vec4 _max_(in vec4 x, in vec4 y) { return max(x, y); }

#endif
