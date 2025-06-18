export type ShaderInfo = {
    source: {vs:string, fs:string},
    attributes: Record<string, {type:string, location: number}>
    uniforms: Record<string, {type:string, location: WebGLUniformLocation|null}>
}

export const passthroughShader: () => ShaderInfo  = () => ({
    source: {
        vs: `#version 300 es
in vec4 aPosition;
in vec4 aColor;

uniform mat4 uView;
uniform mat4 uProjection;

out vec4 vsColor;

void main() {
    gl_Position = aPosition.yzwx;
    vsColor = aColor;
}
`,
        fs: `#version 300 es
precision highp float;
in vec4 vsColor;
out vec4 fsColor;
void main() {
    fsColor = vsColor;
}
`,
    },
    attributes: {
        aPosition: {
            type: "vec4",
            location: -1,
        },
        aColor: {
            type: "vec4",
            location: -1,
        }
    },
    uniforms: {
        uProjection: {
            type: "mat4",
            location: null,
        },
        uView: {
            type: "mat4",
            location: null,
        }
    }
})

const CAMERA_H = `#ifndef CAMERA_H_
#define CAMERA_H_


// This assumes the pixel position px to be in [0,1], 
// which can be done by (x+0.5)/w or (y+0.5)/h (or h-y +0.5 for screens
// with top left origin) to sample pixel centers
vec3 createRay(vec2 px, mat4 PInv, mat4 VInv)
{
	 
	// convert pixel to NDS
	// [0,1] -> [-1,1]
	vec2 pxNDS = px*2. - 1.;

	// choose an arbitrary point in the viewing volume
	// z = -1 equals a point on the near plane, i.e. the screen
	vec3 pointNDS = vec3(pxNDS, -1.);

	// as this is in homogenous space, add the last homogenous coordinate
	vec4 pointNDSH = vec4(pointNDS, 1.0);
	// transform by inverse projection to get the point in view space
	vec4 dirEye = PInv * pointNDSH;

	// since the camera is at the origin in view space by definition,
	// the current point is already the correct direction (dir(0,P) = P - 0 = P
	// as a direction, an infinite point, the homogenous component becomes 0
	// the scaling done by the w-division is not of interest, as the direction
	// in xyz will stay the same and we can just normalize it later
	dirEye.w = 0.;

	// compute world ray direction by multiplying the inverse view matrix
	vec3 dirWorld = (VInv * dirEye).xyz;

	// now normalize direction
	return normalize(dirWorld); 
}



mat4 ortho(float l, float r, float b, float t, float n, float f)
{

    
       // translation and scale
    return scale(vec3(2./(r-l),2./(t-b),2./(f-n))) * 
                 translate(vec3(-(l+r)/2.,-(t+b)/2.,-(f+n)/2.));
    
}

mat4 orthoInv(float l, float r, float b, float t, float n, float f)
{
    return translateInv(vec3(-(l+r)/2.,-(t+b)/2.,-(f+n)/2.)) *
        scaleInv(vec3(2./(r-l),2./(t-b),2./(f-n)));
}

mat4 projection(float n, float f)
{
 	// n 0 0 0	0
    // 0 n 0 0	0
    // 0 0 n+f	-fn
    // 0 0 1	0
    return mat4(
        vec4(n,0.,0.,0.),
        vec4(0.,n,0.,0.),
        vec4(0.,0.,n+f,1.),
        vec4(0.,0.,-f*n,0.)
        );
}

mat4 projectionInv(float n, float f)
{
 	// 1/n 	0 	0 		0
    // 0 	1/n	0 		0
    // 0	0	0 		1
    // 0	0	-1/fn	(f+n)/fn
    
    return mat4(
        vec4(1./n,0.,0.,0.),
        vec4(0.,1./n,0.,0.),
        vec4(0.,0.,0.,-1./(f*n)),
        vec4(0.,0.,1.,(f+n)/(f*n))
        );
}


mat4 perspective(float fov, float aspect, float n, float f)
{
 	   float l = tan(fov/2.)*n;
       float b = l/aspect;
    
    	return ortho(-l,l,-b,b,n,f)*
            projection(n,f)*rightToLeft();
}


mat4 perspectiveInv(float fov, float aspect,float n, float f)
{
     float l = tan(fov/2.)*n;
       float b = l/aspect;
    
    return rightToLeftInv()*
        projectionInv(n,f)*
        orthoInv(-l,l,-b,b,n,f);
}

mat4 lookAt(vec3 eye, vec3 center, vec3 up)
{
 	
    vec3 z = normalize(eye-center);
    vec3 x = normalize(cross(up,z));
    vec3 y = cross(z,x);
    
    mat4 v = mat4(
        vec4(x.x,y.x,z.x,0.),
        vec4(x.y,y.y,z.y,0.),
        vec4(x.z,y.z,z.z,0.),
        vec4(0.,0.,0.,1.)
        );
    
    return v*translate(-eye);
}

mat4 lookAtInv(vec3 eye, vec3 center, vec3 up)
{
 	vec3 z = normalize(eye-center);
    vec3 x = normalize(cross(up,z));
    vec3 y = cross(z,x);  
    
    return translateInv(-eye)*mat4(
        vec4(x,0.),
        vec4(y,0.),
        vec4(z,0.),
        vec4(0.,0.,0.,1.)
        );
}



#endif //CAMERA_H_`

const BUILTIN_H = `float _pos_(in float x) { return +x; }
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

vec1 _pos_(in vec1 x) { return vec1(_pos_(x[0*1])); }
vec1 _neg_(in vec1 x) { return vec1(_neg_(x[0*1])); }
vec1 _add_(in vec1 x, in float y) { return vec1(_add_(x[0*1], y)); }
vec1 _add_(in float x, in vec1 y) { return vec1(_add_(x, y[0*1])); }
vec1 _add_(in vec1 x, in vec1 y) { return vec1(_add_(x[0*1], y[0*1])); }
vec1 _sub_(in vec1 x, in float y) { return vec1(_sub_(x[0*1], y)); }
vec1 _sub_(in float x, in vec1 y) { return vec1(_sub_(x, y[0*1])); }
vec1 _sub_(in vec1 x, in vec1 y) { return vec1(_sub_(x[0*1], y[0*1])); }
vec1 _mul_(in vec1 x, in float y) { return vec1(_mul_(x[0*1], y)); }
vec1 _mul_(in float x, in vec1 y) { return vec1(_mul_(x, y[0*1])); }
vec1 _mul_(in vec1 x, in vec1 y) { return vec1(_mul_(x[0*1], y[0*1])); }
vec1 _div_(in vec1 x, in float y) { return vec1(_div_(x[0*1], y)); }
vec1 _div_(in float x, in vec1 y) { return vec1(_div_(x, y[0*1])); }
vec1 _div_(in vec1 x, in vec1 y) { return vec1(_div_(x[0*1], y[0*1])); }
`

export const raymarchImplicitShader: (func: string) => ShaderInfo  = (func) => ({
    source: {
        vs: `#version 300 es
in vec4 aPosition;
in vec4 aColor;

out vec4 vsColor;

void main() {
    gl_Position = aPosition.yzwx;
    vsColor = aColor;
}
`,
        fs: `#version 300 es
precision highp float;
in vec4 vsColor;
out vec4 fsColor;

uniform mat4 uView;
uniform mat4 uProjection;

uniform vec4 iResolution;
uniform float iTime;

#ifndef MATRIX_OPS_H_
#define MATRIX_OPS_H_

// matrix operations
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

${CAMERA_H}

#define vec1 float[1]
#define mat1 float[1*1]

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

${BUILTIN_H}

struct d1e1 {
  float s;
  vec1 g;
};

struct d1e2 {
  float s;
  vec2 g;
};

struct d1e3 {
  float s;
  vec3 g;
};

struct d1e4 {
  float s;
  vec4 g;
};


struct d2e1 {
  float s;
  vec1 g;
  mat1 h;
};

struct d2e2 {
  float s;
  vec2 g;
  mat2 h;
};

struct d2e3 {
  float s;
  vec3 g;
  mat3 h;
};

struct d2e4 {
  float s;
  vec4 g;
  mat4 h;
};



d2e1 _pos_(in d2e1 x) { return d2e1(_pos_(x.s), _pos_(x.g), _pos_(x.h)); }
d2e1 _neg_(in d2e1 x) { return d2e1(_neg_(x.s), _neg_(x.g), _neg_(x.h)); }
d2e1 _add_(in d2e1 x, in float y) { return d2e1(_add_(x.s, y), x.g, x.h); }
d2e1 _add_(in float x, in d2e1 y) { return d2e1(_add_(x, y.s), y.g, y.h); }
d2e1 _add_(in d2e1 x, in d2e1 y) { return d2e1(_add_(x.s, y.s), _add_(x.g, y.g), _add_(x.h, y.h)); }
d2e1 _sub_(in d2e1 x, in float y) { return d2e1(_sub_(x.s, y), x.g, x.h); }
d2e1 _sub_(in float x, in d2e1 y) { return d2e1(_sub_(x, y.s), _neg_(y.g), _neg_(y.h)); }
d2e1 _sub_(in d2e1 x, in d2e1 y) { return d2e1(_sub_(x.s, y.s), _sub_(x.g, y.g), _sub_(x.h, y.h)); }
d2e1 _mul_(in d2e1 x, in float y) { return d2e1(_mul_(x.s, y), _mul_(x.g, y), _mul_(x.h, y)); }
d2e1 _mul_(in float x, in d2e1 y) { return d2e1(_mul_(x, y.s), _mul_(x, y.g), _mul_(x, y.h)); }
d2e1 _mul_(in d2e1 x, in d2e1 y) { return d2e1(_mul_(x.s, y.s), _add_(_mul_(x.s, y.g), _mul_(x.g, y.s)), _add_(_add_(_mul_(x.s, y.h), _mul_(x.h, y.s)), _add_(outer(x.g, y.g), outer(y.g, x.g)))); }

d2e2 _pos_(in d2e2 x) { return d2e2(_pos_(x.s), _pos_(x.g), _pos_(x.h)); }
d2e2 _neg_(in d2e2 x) { return d2e2(_neg_(x.s), _neg_(x.g), _neg_(x.h)); }
d2e2 _add_(in d2e2 x, in float y) { return d2e2(_add_(x.s, y), x.g, x.h); }
d2e2 _add_(in float x, in d2e2 y) { return d2e2(_add_(x, y.s), y.g, y.h); }
d2e2 _add_(in d2e2 x, in d2e2 y) { return d2e2(_add_(x.s, y.s), _add_(x.g, y.g), _add_(x.h, y.h)); }
d2e2 _sub_(in d2e2 x, in float y) { return d2e2(_sub_(x.s, y), x.g, x.h); }
d2e2 _sub_(in float x, in d2e2 y) { return d2e2(_sub_(x, y.s), _neg_(y.g), _neg_(y.h)); }
d2e2 _sub_(in d2e2 x, in d2e2 y) { return d2e2(_sub_(x.s, y.s), _sub_(x.g, y.g), _sub_(x.h, y.h)); }
d2e2 _mul_(in d2e2 x, in float y) { return d2e2(_mul_(x.s, y), _mul_(x.g, y), _mul_(x.h, y)); }
d2e2 _mul_(in float x, in d2e2 y) { return d2e2(_mul_(x, y.s), _mul_(x, y.g), _mul_(x, y.h)); }
d2e2 _mul_(in d2e2 x, in d2e2 y) { return d2e2(_mul_(x.s, y.s), _add_(_mul_(x.s, y.g), _mul_(x.g, y.s)), _add_(_add_(_mul_(x.s, y.h), _mul_(x.h, y.s)), _add_(outer(x.g, y.g), outer(y.g, x.g)))); }

d2e3 _pos_(in d2e3 x) { return d2e3(_pos_(x.s), _pos_(x.g), _pos_(x.h)); }
d2e3 _neg_(in d2e3 x) { return d2e3(_neg_(x.s), _neg_(x.g), _neg_(x.h)); }
d2e3 _add_(in d2e3 x, in float y) { return d2e3(_add_(x.s, y), x.g, x.h); }
d2e3 _add_(in float x, in d2e3 y) { return d2e3(_add_(x, y.s), y.g, y.h); }
d2e3 _add_(in d2e3 x, in d2e3 y) { return d2e3(_add_(x.s, y.s), _add_(x.g, y.g), _add_(x.h, y.h)); }
d2e3 _sub_(in d2e3 x, in float y) { return d2e3(_sub_(x.s, y), x.g, x.h); }
d2e3 _sub_(in float x, in d2e3 y) { return d2e3(_sub_(x, y.s), _neg_(y.g), _neg_(y.h)); }
d2e3 _sub_(in d2e3 x, in d2e3 y) { return d2e3(_sub_(x.s, y.s), _sub_(x.g, y.g), _sub_(x.h, y.h)); }
d2e3 _mul_(in d2e3 x, in float y) { return d2e3(_mul_(x.s, y), _mul_(x.g, y), _mul_(x.h, y)); }
d2e3 _mul_(in float x, in d2e3 y) { return d2e3(_mul_(x, y.s), _mul_(x, y.g), _mul_(x, y.h)); }
d2e3 _mul_(in d2e3 x, in d2e3 y) { return d2e3(_mul_(x.s, y.s), _add_(_mul_(x.s, y.g), _mul_(x.g, y.s)), _add_(_add_(_mul_(x.s, y.h), _mul_(x.h, y.s)), _add_(outer(x.g, y.g), outer(y.g, x.g)))); }

d2e4 _pos_(in d2e4 x) { return d2e4(_pos_(x.s), _pos_(x.g), _pos_(x.h)); }
d2e4 _neg_(in d2e4 x) { return d2e4(_neg_(x.s), _neg_(x.g), _neg_(x.h)); }
d2e4 _add_(in d2e4 x, in float y) { return d2e4(_add_(x.s, y), x.g, x.h); }
d2e4 _add_(in float x, in d2e4 y) { return d2e4(_add_(x, y.s), y.g, y.h); }
d2e4 _add_(in d2e4 x, in d2e4 y) { return d2e4(_add_(x.s, y.s), _add_(x.g, y.g), _add_(x.h, y.h)); }
d2e4 _sub_(in d2e4 x, in float y) { return d2e4(_sub_(x.s, y), x.g, x.h); }
d2e4 _sub_(in float x, in d2e4 y) { return d2e4(_sub_(x, y.s), _neg_(y.g), _neg_(y.h)); }
d2e4 _sub_(in d2e4 x, in d2e4 y) { return d2e4(_sub_(x.s, y.s), _sub_(x.g, y.g), _sub_(x.h, y.h)); }
d2e4 _mul_(in d2e4 x, in float y) { return d2e4(_mul_(x.s, y), _mul_(x.g, y), _mul_(x.h, y)); }
d2e4 _mul_(in float x, in d2e4 y) { return d2e4(_mul_(x, y.s), _mul_(x, y.g), _mul_(x, y.h)); }
d2e4 _mul_(in d2e4 x, in d2e4 y) { return d2e4(_mul_(x.s, y.s), _add_(_mul_(x.s, y.g), _mul_(x.g, y.s)), _add_(_add_(_mul_(x.s, y.h), _mul_(x.h, y.s)), _add_(outer(x.g, y.g), outer(y.g, x.g)))); }


//--------------------------------
d2e3 _div_(in float x, in d2e3 y) { return d2e3(_mul_(x, y.s), _mul_(x, y.g), _mul_(x, y.h)); }

d2e3 _sqrt_(in d2e3 a)
{
    float v = sqrt(a.s); // value f(a(x))
    float da = 0.5/sqrt(a.s); // first derivative f'(a(x))
    float dda = -0.25/pow(sqrt(a.s), 3.0); // second derivative f''(a(x))
    return d2e3(v, da * a.g,  da * a.h + dda * outer(a.g,a.g));
}

d2e3 _pow_(in d2e3 a, in float b)
{
    float v = pow(a.s, b); // value f(a(x))
    float da = b*pow(a.s,b-1.0); // first derivative f'(a(x))
    float dda = b*(b-1.0)*pow(a.s,b-2.0); // second derivative f''(a(x))
    return d2e3(v , da * a.g,  da * a.h + dda * outer(a.g,a.g));
}

d2e3 _pow_(in d2e3 x, in int n)
{
    // based on https://en.wikipedia.org/wiki/Exponentiation_by_squaring
    if (n < 0)
    {   
        x = _div_(1.0, x);
        n = -n;
    }
    if (n == 0) 
    {
        return d2e3(1.0, vec3(0), mat3(0));
    }
    d2e3 y = d2e3(1.0, vec3(0), mat3(0));
    while (n > 1)
    {
        if (n % 2 == 0)
        {   
            x = _mul_(x, x);
            
        }
        else
        {    
            y = _mul_(x, y);
            x = _mul_(x, x);
        }

        n = n / 2;
    }
    
    return _mul_(x, y);
}

d2e3 _cos_(in d2e3 a)
{
    float v = cos(a.s); // value f(a(x))
    float da = -sin(a.s); // first derivative f'(a(x))
    float dda = -cos(a.s); // second derivative f''(a(x))
    return d2e3(v , da * a.g,  da * a.h + dda * outer(a.g,a.g));
}

d2e3 _sin_(in d2e3 a)
{
    float v = sin(a.s); // value f(a(x))
    float da = cos(a.s); // first derivative f'(a(x))
    float dda = -sin(a.s); // second derivative f''(a(x))
    return d2e3(v , da * a.g,  da * a.h + dda * outer(a.g,a.g));
}

#define d2e2vec1 d2e2[1]
#define d2e2vec2 d2e2[2]
#define d2e2vec3 d2e2[3]

#define d2e3vec1 d2e3[1]
#define d2e3vec2 d2e3[2]
#define d2e3vec3 d2e3[3]


//*************** INSTRUCTIONS **********************
//
// Press and hold 'f' to use the usual first order approximation
//
// Press and hold 'p' to use an eigenvalue estimate instead of the frobenius
// norm (not really a noticeable effect...)
//
// Change the value of 'SCENE' just below to switch to different implicits
//
// Move the camera by dragging the mouse with left button held down
//
//***************************************************

#define SCENE 2
#define MATERIAL 1
#define BACKGROUND 0

//********************************************************************
//
// Global defines
//
//********************************************************************

// Infinity
#define AUTO_INFINITY 3.402823e+38

const float eps = 0.0001;
const float pi = 3.14159265359;

// Maximum number of sphere trace steps
const int maxSteps = 150;

bool useFirstOrder = false;
bool usePowerMethod = false;


//********************************************************************
//
// Non autodiff code
//
//********************************************************************

float frobenius(in mat3 m) {
  return sqrt(dot(m[0], m[0]) + dot(m[1], m[1]) + dot(m[2], m[2]));
}

// Simple power iteration to find the eigenvalue with largest absolute value
float powerNorm(in mat3 m) {
  vec3 bk = vec3(1.);
  bk = normalize(m * bk);
  bk = normalize(m * bk);
  bk = normalize(m * bk);
  bk = normalize(m * bk);
  return length(m * bk);
}

float calcNorm(in mat3 m) {
  if (usePowerMethod)
    return powerNorm(m);
  else
    return frobenius(m);
}

/*
// Different implicit functions f(x,y,z)
HNum3 implicit(in HNum3 x, in HNum3 y, in HNum3 z) {

#if SCENE == 0
  return sub(a_sqrt(add(add(mult(x, x), mult(y, y)), mult(z, z))), constH3(1.));
#elif SCENE == 1
  return sub(y, a_sin(add(x, y)));
#elif SCENE == 1

  return sub(add(mult(x, x), mult(z, z)),
             mult(z, sub(constH3(1.), mult(y, y))));

#elif SCENE == 2
  return sub(add(add(a_ipow(x, 4), a_ipow(y, 4)), a_ipow(z, 4)), constH3(1.));
#elif SCENE == 3

  return sub(sub(a_ipow(sub(add(add(mult(2., mult(x, x)), mult(2., mult(z, z))),
                                mult(y, y)),
                            constH3(1.)),
                        3),
                 mult(0.1, mult(mult(x, x), a_ipow(y, 3)))),
             mult(mult(z, z), a_ipow(y, 3)));
#elif SCENE == 4
  HNum3 c2 = constH3(2.);
  HNum3 f1 = mult(a_ipow(sub(x, c2), 2), a_ipow(add(x, c2), 2));
  HNum3 f2 = mult(a_ipow(sub(y, c2), 2), a_ipow(add(y, c2), 2));
  HNum3 f3 = mult(a_ipow(sub(z, c2), 2), a_ipow(add(z, c2), 2));
  HNum3 f4 = mult(
      3., add(add(mult(mult(x, x), mult(y, y)), mult(mult(x, x), mult(z, z))),
              mult(mult(y, y), mult(z, z))));

  HNum3 f5 = mult(mult(mult(6., x), y), z);
  HNum3 f6 = mult(-10., add(add(mult(x, x), mult(y, y)), mult(z, z)));

  return add(add(add(add(add(add(f1, f2), f3), f4), f5), f6), constH3(22.));
#elif SCENE == 5
  return add(add(add(mult(mult(a_sin(x), a_sin(y)), a_sin(z)),
                     mult(mult(a_sin(x), a_cos(y)), a_cos(z))),

                 mult(mult(a_cos(x), a_sin(y)), a_cos(z))),

             mult(mult(a_cos(x), a_cos(y)), a_sin(z)));
#else
  HNum3 noise = mult(0.4 * cos(iTime / 10.),
                     mult(mult(a_cos(mult(22., y)), a_sin(mult(15., y))),
                          a_sin(mult(14., z))));

  noise = add(noise, mult(0.4 * sin(iTime / 5.), a_cos(mult(2., z))));
  return add(noise, sub(a_sqrt(add(add(mult(x, x), mult(y, y)), mult(z, z))),
                        constH3(1.)));
#endif
}
*/

vec3 LPos = vec3(2., 5., 2.);

/*
d2e3 f(in d2e3vec3 x) {
#if SCENE == 0
  return _sub_(_sqrt_(_add_(_add_(_mul_(x[0], x[0]), _mul_(x[1], x[1])), _mul_(x[2], x[2]))), 1.);
#elif SCENE == 1
  return _sub_(_sub_(_add_(_add_(_mul_(_mul_(x[0], x[0]), x[0] ), _mul_(_mul_(x[1], x[1]), x[1] )), _mul_(_mul_(x[2], x[2]), x[2] )), _mul_(_mul_(_mul_(3., x[0]), x[1]), x[2] )), 1.);
#elif SCENE == 2
  float R = 2.;
  float r = 1.;
  d2e3 lhs = _sub_(_add_(_add_(_add_(_mul_(x[0], x[0] ), _mul_(x[1], x[1] )), _mul_(x[2], x[2] )), _mul_(R, R )), _mul_(r, r));
  d2e3 rhs = _mul_(_mul_(_mul_(4., R), R), (_add_(_mul_(x[0], x[0] ), _mul_(x[1], x[1]))));
  return _sub_(_mul_(lhs, lhs ), rhs);
#elif SCENE == 3
  return _sub_(_mul_(x[2], x[2]), _mul_(_mul_((_sub_(_mul_(x[1], x[1]), _mul_(_mul_(3., x[0]), x[0]))), (_sub_(_mul_(_mul_(3., x[1]), x[1]), _mul_(x[0], x[0])))), (_sub_(1., x[0]))));
#elif SCENE == 4
  d2e3 c2 = d2e3(2., vec3(0), mat3(0));
  d2e3 f1 = _mul_(_pow_(_sub_(x[0], c2), 2), _pow_(_add_(x[0], c2), 2));
  d2e3 f2 = _mul_(_pow_(_sub_(x[1], c2), 2), _pow_(_add_(x[1], c2), 2));
  d2e3 f3 = _mul_(_pow_(_sub_(x[2], c2), 2), _pow_(_add_(x[2], c2), 2));
  d2e3 f4 = _mul_(3., _add_(_add_(_mul_(_mul_(x[0], x[0]), _mul_(x[1], x[1])), _mul_(_mul_(x[0], x[0]), _mul_(x[2], x[2]))), _mul_(_mul_(x[1], x[1]), _mul_(x[2], x[2]))));

  d2e3 f5 = _mul_(_mul_(_mul_(6., x[0]), x[1]), x[2]);
  d2e3 f6 = _mul_(-10., _add_(_add_(_mul_(x[0], x[0]), _mul_(x[1], x[1])), _mul_(x[2], x[2])));

  return _add_(_add_(_add_(_add_(_add_(_add_(f1, f2), f3), f4), f5), f6), 22.);
#else
  return _sub_(_add_(_add_(_mul_(x[0], x[0]), _mul_(x[1], x[1])), _mul_(x[2], x[2])), 4.);
#endif
}
*/
${func}

float curvature(in d2e3 x) {
  mat4 G = mat4(x.h);
  G[3].xyz = x.g;
  G[0][3] = x.g[0];
  G[1][3] = x.g[1];
  G[2][3] = x.g[2];
  G[3][3] = 0.0;

  float gl2 = dot(x.g, x.g);

  return -determinant(G) / (gl2 * gl2);
}

vec3 fColor(in vec3 P, in vec3 rd, in d2e3 x) {
#if MATERIAL == 0
  return P;
#elif MATERIAL == 1
  vec3 col = normalize(x.g);
  return (col + 1.)/2.;
#elif MATERIAL == 2
  float K = curvature(x);
  return paletteColor(K);
#elif MATERIAL == 3
  vec3 col = vec3(0.0); //vec3(0.4);
  vec3 nor = normalize(x.g);
  
  // specular		
  float fre = pow(clamp(1.0+dot(rd, nor), 0.0, 1.0), 5.0);
  vec3 ref = reflect(rd, nor);
  float rs = 1.0;//softshadow( pos, ref, 32.0 );
  col += 1.0* (0.04 + 1.0*fre) * pow(texture(iChannel1, ref).xyz, vec3(2.0)) * rs;
  
  return col;
#else
  vec3 col = vec3(0.8);
  
  vec3 L = normalize(LPos - P);
  col *= max(dot(L, normalize(x.g)), 0.) + 0.1;

  return col;
#endif
}

/*
void getEye(out vec3 eye, out vec3 center) {
#if SCENE == 0
  eye = vec3(3., 1., 0.);
  center = vec3(0.);
#elif SCENE == 1
  eye = vec3(5., 1., 0.);
  center = vec3(0.);
#elif SCENE == 4
  eye = vec3(7., 1., 0.);
  center = vec3(0.);
#else
  eye = vec3(3., 1., 0.);
  center = vec3(0.);
#endif
}
*/

float DE(vec3 p) {
  d2e3 result = f(d2e3vec3(
    d2e3(p.x, vec3(1,0,0), mat3(0)),
    d2e3(p.y, vec3(0,1,0), mat3(0)),
    d2e3(p.z, vec3(0,0,1), mat3(0))
  ));

  float g2 = dot(result.g, result.g);
  float g = sqrt(g2);
  float v = result.s;

  // First order distance estimation
  if (useFirstOrder) {
    if (g < eps) {
      return v;
    }
    return v / g;
  } else {

    // Second order uses any compatible matrix norm
    // Default here is frobenius ->  fast and simple
    // power method assumes the hessian to be symmetric to calculate spectral
    // norm (should be for functions with continuous second order partials)
    float m = calcNorm(result.h);

    // Special cases for zero values
    if (m < eps) {
      if (g < eps) {
        return v;
      }
      return v / g;
    } else if (g < eps) {
      return sqrt(2. * abs(v) / m) * sign(v);
    }
    
    return (sqrt(g2 / m / m + 2. * abs(v) / m) - g / m) * sign(v);
  }
}

//*
// iq style
vec2 intersect(in vec3 ro, in vec3 rd, out vec3 pos, out int steps) {
	float mind = eps*2.0;
	float maxd = 100.0;
	
    // Clip Sphere
	{
      float r = 4.0;
	  float b = dot(ro,rd);
	  float c = dot(ro,ro) - r*r;
	  float h = b*b - c;
	  if( h<0.0 ) return vec2(-1.0, 0.0);
	  h = sqrt(h);
	  mind = max(mind, -b - h);
	  maxd = min(maxd, -b + h);
    }

    float h = 1.0;
	float t = mind;
    for (int i = 0; i < maxSteps; i++) {
        if(abs(h) < eps || t > maxd) continue;
        pos = ro + rd * t;
	    h = DE(pos);
        t += 0.5*abs(h);
        steps++;
    }

    if(t > maxd) t = -1.0;
    
    return vec2(t, sign(h));
}

bool trace(in vec3 p, in vec3 dir, out float t, out vec3 pos, out int steps) {
  vec2 i = intersect(p, dir, pos, steps);
  t = i.x;
  return i.x > 0.0;
}
/*/
// sibaku style
bool trace(in vec3 ro, in vec3 rd, out float t, out vec3 pos, out int steps) {
  steps = 0;
  //dist = 1000.0;
  t = 0.;

  float lastT = 0.;
  for (int i = 0; i < maxSteps; i++) {
    pos = ro + rd * t;
    float d = DE(pos);

    if (d < eps) {
      //dist = 0.;
      t = lastT;
      return true;
    }

    lastT = t;
    t += d;
    steps++;
    if (t > 100.) {
      return false;
    }
  }

  return false;
}
//*/

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = fragCoord.xy / iResolution.xy;

  float aspect = iResolution.x / iResolution.y;
  
  mat4 M = mat4(
    0,0,0,1,
    1,0,0,0,
    0,1,0,0,
    0,0,1,0
  );
  mat4 MInv = mat4(
    0,1,0,0,
    0,0,1,0,
    0,0,0,1,
    1,0,0,0
  );

  vec3 eye = (inverse(uView)*vec4(1.0, 0.0, 0.0, 0.0)).yzw;
  
  mat4 PInv = perspectiveInv(radians(90.0), aspect, 0.1, 100.0);
  mat4 VInv = M*inverse(uView)*MInv;
  
  vec3 rayDir = createRay(uv, PInv, VInv);

  LPos += vec3(0., sin(2. * pi / 10. * iTime), 0.) * 1.5;
  
  vec3 col;
  float t;
  int steps;
  //float d;
  vec3 P;

  if (trace(eye, rayDir, t, P, steps)) {
    d2e3 result = f(d2e3vec3(
      d2e3(P.x, vec3(1,0,0), mat3(0)),
      d2e3(P.y, vec3(0,1,0), mat3(0)),
      d2e3(P.z, vec3(0,0,1), mat3(0))
    ));

    col = fColor(P, rayDir, result);
  } else {
#if BACKGROUND == 0
    col = vec3(1.);
#else
    col = 0.9 * pow(texture(iChannel1, rayDir).xyz, vec3(2.2));
#endif
  }

#if BACKGROUND == 0
  fragColor = vec4(col, 1.);
#else
  vec3 tot = col;
  tot = pow(clamp(tot, 0.0, 1.0), vec3(0.45));	
  fragColor = vec4(tot, 1.0);
#endif
}

void main() {
    //fsColor = vsColor;
    mainImage(fsColor, gl_FragCoord.xy);
}
`,
    },
    attributes: {
        aPosition: {
            type: "vec4",
            location: -1,
        },
        aColor: {
            type: "vec4",
            location: -1,
        }
    },
    uniforms: {
        uProjection: {
            type: "mat4",
            location: null,
        },
        uView: {
            type: "mat4",
            location: null,
        },
        iResolution: {
            type: "vec4",
            location: null,
        },
        iTime: {
            type: "float",
            location: null,
        }
    }
})
