import{C as V,x as F,o as H,D as $,d as N,c as D,r as A,b as w,e as I,s as W,y as K,g as C,l as U,F as z,j as b,f,k as Y,t as X,q as B,v as T,A as j,B as J}from"./index-D9WPZsHN.js";import{s as Q,_ as Z,a as ee,p as ne}from"./utilities-DOVoeV72.js";import{f as te,S as _e,_ as ae}from"./index-C7zLqgQ_.js";import{u as re}from"./useCamera-BwMifShr.js";import{r as ie}from"./ToggleDarkButton.vue_vue_type_script_setup_true_lang-BIMD3a6p.js";import{m as de,_ as oe}from"./_plugin-vue_export-helper-CNz2D3kM.js";function xe(r,o,l={},x={}){let c=null;const{pause:a,resume:u}=V(d=>{var _;c&&((_=o.onRender)==null||_.call(o,{...c,...d}))},{immediate:!1});for(const[d,_]of Object.entries(l))F(r,d,_);H(()=>{var d;m(),c&&((d=o.onCreate)==null||d.call(o,c),u())}),$(()=>{var d;c&&(a(),(d=o.onDelete)==null||d.call(o,c)),t()});const m=()=>{console.log("useWebGl::initialize");const d=r.value;if(!d){console.log("Invalid canvas.");return}const _=d.getContext("webgl2",x.options);if(!_){console.log("Invalid context.");return}c={context:_}},t=()=>{console.log("useWebGl::finalize"),c=null};return!0}const ce=["width","height"],ue={key:1,class:"flex items-center justify-center"},le=N({__name:"WebGlCanvas",props:{renderer:{},options:{default:()=>({size:[1920,1080]})},listeners:{default:()=>({})}},setup(r){const o=r,l=D(()=>{var u;return((u=o.options.size)==null?void 0:u[0])??1920}),x=D(()=>{var u;return((u=o.options.size)==null?void 0:u[1])??1080}),c=A(),a=A(!0);return a.value=xe(c,o.renderer,o.listeners,o.options),(u,m)=>a.value?(w(),I("canvas",{key:0,ref_key:"canvasRef",ref:c,class:"cursor-default",width:l.value,height:x.value,tabindex:"1"},null,8,ce)):(w(),I("div",ue,"WebGPU not supported."))}}),k=(r,o,l)=>{const x=r.createShader(l);if(!x)return console.error("Error creating shader."),null;if(r.shaderSource(x,o),r.compileShader(x),!r.getShaderParameter(x,r.COMPILE_STATUS)){const a=r.getShaderInfoLog(x);return console.error(`Error compiling shader: ${a}`),r.deleteShader(x),null}return x},ve=(r,o)=>{const l=r.createProgram();if(!l)return null;if(o.forEach(c=>{c&&r.attachShader(l,c)}),r.linkProgram(l),!r.getProgramParameter(l,r.LINK_STATUS)){const c=r.getProgramInfoLog(l);return console.error(`Error in program linking: ${c}`),r.deleteProgram(l),null}return l},se=`#ifndef BUILTIN_H
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
float _abs_(in float x) { return abs(x); }
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
vec2 _abs_(in vec2 x) { return abs(x); }
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
vec3 _abs_(in vec3 x) { return abs(x); }
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
vec4 _abs_(in vec4 x) { return abs(x); }
vec4 _ceil_(in vec4 x) { return ceil(x); }
vec4 _floor_(in vec4 x) { return floor(x); }
vec4 _atan_(in vec4 x, in vec4 y) { return atan(x, y); }
vec4 _pow_(in vec4 x, in vec4 y) { return pow(x, y); }
vec4 _min_(in vec4 x, in vec4 y) { return min(x, y); }
vec4 _max_(in vec4 x, in vec4 y) { return max(x, y); }

#endif
`,ye=`#ifndef CAMERA_H_
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

#endif //CAMERA_H_
`,fe=`#ifndef DUAL_H_
#define DUAL_H_

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
d2e3 _div_(in d2e3 a, in float b)
{
    return d2e3(_div_(a.s, b), _div_(a.g, b), _div_(a.h, b));
}

d2e3 _div_(in float a, in d2e3 b)
{
    float b1 = b.s;
    float b2 = b1*b1;
    float b3 = b2*b1;

    return d2e3(a / b.s, -a*b.g/b2, 2.0*a/b3*outer(b.g, b.g) - a/b2*b.h);
}

d2e3 _div_(in d2e3 a, in d2e3 b)
{
    float b1 = b.s;
    float b2 = b1*b1;
    float b3 = b2*b1;

    return d2e3(a.s / b.s, (b.s*a.g - a.s*b.g)/b2, 
        2.0*a.s/b3*outer(b.g,b.g) - a.s/b2*b.h + a.h/b1 - outer(a.g/b2, b.g) - outer(b.g/b2, a.g)
    );
}

d2e3 _exp_(in d2e3 a)
{
    float v = exp(a.s); // value f(a(x))
    float da = exp(a.s); // first derivative f'(a(x))
    float dda = exp(a.s); // second derivative f''(a(x))
    return d2e3(v , da * a.g,  da * a.h + dda * outer(a.g,a.g));
}

d2e3 _log_(in d2e3 a)
{
    float v = log(a.s); // value f(a(x))
    float da = 1.0/a.s; // first derivative f'(a(x))
    float dda = -1.0/(a.s * a.s); // second derivative f''(a(x))
    return d2e3(v , da * a.g,  da * a.h + dda * outer(a.g,a.g));
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

d2e3 _tan_(in d2e3 a)
{
    float v = tan(a.s); // value f(a(x))
    float da = 1.0 + pow(tan(a.s),2.0); // first derivative f'(a(x))
    float dda = 2.0*tan(a.s)*(1.0 + pow(tan(a.s),2.0)); // second derivative f''(a(x))
    return d2e3(v , da * a.g,  da * a.h + dda * outer(a.g,a.g));
}

d2e3 _acos_(in d2e3 a)
{
    float v = acos(a.s); // value f(a(x))
    float da = -1.0/sqrt(1.0 - a.s * a.s); // first derivative f'(a(x))
    float dda = -a.s/pow(sqrt(1.0 - a.s * a.s), 3.0); // second derivative f''(a(x))
    return d2e3(v , da * a.g,  da * a.h + dda * outer(a.g,a.g));
}

d2e3 _asin_(in d2e3 a)
{
    float v = asin(a.s); // value f(a(x))
    float da = 1.0/sqrt(1.0 - a.s * a.s); // first derivative f'(a(x))
    float dda = a.s/pow(sqrt(1.0 - a.s * a.s), 3.0); // second derivative f''(a(x))
    return d2e3(v , da * a.g,  da * a.h + dda * outer(a.g,a.g));
}

d2e3 _atan_(in d2e3 a)
{
    float v = atan(a.s); // value f(a(x))
    float da = 1.0/(1.0 + a.s * a.s); // first derivative f'(a(x))
    float dda = -2.0*a.s/pow(1.0 + a.s * a.s, 2.0); // second derivative f''(a(x))
    return d2e3(v , da * a.g,  da * a.h + dda * outer(a.g,a.g));
}

d2e3 _sqrt_(in d2e3 a)
{
    float v = sqrt(a.s); // value f(a(x))
    float da = 0.5/sqrt(a.s); // first derivative f'(a(x))
    float dda = -0.25/pow(sqrt(a.s), 3.0); // second derivative f''(a(x))
    return d2e3(v, da * a.g,  da * a.h + dda * outer(a.g,a.g));
}

d2e3 _abs_(in d2e3 a)
{
    float v = abs(a.s); // value f(a(x))
    float da = a.s < 0.0 ? -1.0 : 1.0; // first derivative f'(a(x))
    float dda = 0.0; // second derivative f''(a(x))
    return d2e3(v , da * a.g,  da * a.h + dda * outer(a.g,a.g));
}

/*
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
*/

d2e3 _pow_(in d2e3 a, in float b)
{
    float v = pow(a.s, b); // value f(a(x))
    float da = b*pow(a.s,b-1.0); // first derivative f'(a(x))
    float dda = b*(b-1.0)*pow(a.s,b-2.0); // second derivative f''(a(x))
    return d2e3(v , da * a.g,  da * a.h + dda * outer(a.g,a.g));
}

d2e3 _pow_(in d2e3 a, in d2e3 b)
{
    return _exp_(_mul_(_log_(a), b));
}

#define d2e2vec1 d2e2[1]
#define d2e2vec2 d2e2[2]
#define d2e2vec3 d2e2[3]
#define d2e2vec4 d2e2[4]

#define d2e3vec1 d2e3[1]
#define d2e3vec2 d2e3[2]
#define d2e3vec3 d2e3[3]
#define d2e3vec4 d2e3[4]

d2e3vec1 _pos_(in d2e3vec1 x) { return d2e3vec1(_pos_(x[0])); }
d2e3vec1 _neg_(in d2e3vec1 x) { return d2e3vec1(_neg_(x[0])); }
d2e3vec1 _add_(in d2e3vec1 x, in d2e3 y) { return d2e3vec1(_add_(x[0], y)); }
d2e3vec1 _add_(in d2e3 x, in d2e3vec1 y) { return d2e3vec1(_add_(x, y[0])); }
d2e3vec1 _add_(in d2e3vec1 x, in d2e3vec1 y) { return d2e3vec1(_add_(x[0], y[0])); }
d2e3vec1 _sub_(in d2e3vec1 x, in d2e3 y) { return d2e3vec1(_sub_(x[0], y)); }
d2e3vec1 _sub_(in d2e3 x, in d2e3vec1 y) { return d2e3vec1(_sub_(x, y[0])); }
d2e3vec1 _sub_(in d2e3vec1 x, in d2e3vec1 y) { return d2e3vec1(_sub_(x[0], y[0])); }
d2e3vec1 _mul_(in d2e3vec1 x, in d2e3 y) { return d2e3vec1(_mul_(x[0], y)); }
d2e3vec1 _mul_(in d2e3 x, in d2e3vec1 y) { return d2e3vec1(_mul_(x, y[0])); }
d2e3vec1 _mul_(in d2e3vec1 x, in d2e3vec1 y) { return d2e3vec1(_mul_(x[0], y[0])); }
d2e3vec1 _div_(in d2e3vec1 x, in d2e3 y) { return d2e3vec1(_div_(x[0], y)); }
d2e3vec1 _div_(in d2e3 x, in d2e3vec1 y) { return d2e3vec1(_div_(x, y[0])); }
d2e3vec1 _div_(in d2e3vec1 x, in d2e3vec1 y) { return d2e3vec1(_div_(x[0], y[0])); }

d2e3vec2 _pos_(in d2e3vec2 x) { return d2e3vec2(_pos_(x[0]),_pos_(x[1])); }
d2e3vec2 _neg_(in d2e3vec2 x) { return d2e3vec2(_neg_(x[0]),_neg_(x[1])); }
d2e3vec2 _add_(in d2e3vec2 x, in d2e3 y) { return d2e3vec2(_add_(x[0], y),_add_(x[1], y)); }
d2e3vec2 _add_(in d2e3 x, in d2e3vec2 y) { return d2e3vec2(_add_(x, y[0]),_add_(x, y[1])); }
d2e3vec2 _add_(in d2e3vec2 x, in d2e3vec2 y) { return d2e3vec2(_add_(x[0], y[0]),_add_(x[1], y[1])); }
d2e3vec2 _sub_(in d2e3vec2 x, in d2e3 y) { return d2e3vec2(_sub_(x[0], y),_sub_(x[1], y)); }
d2e3vec2 _sub_(in d2e3 x, in d2e3vec2 y) { return d2e3vec2(_sub_(x, y[0]),_sub_(x, y[1])); }
d2e3vec2 _sub_(in d2e3vec2 x, in d2e3vec2 y) { return d2e3vec2(_sub_(x[0], y[0]),_sub_(x[1], y[1])); }
d2e3vec2 _mul_(in d2e3vec2 x, in d2e3 y) { return d2e3vec2(_mul_(x[0], y),_mul_(x[1], y)); }
d2e3vec2 _mul_(in d2e3 x, in d2e3vec2 y) { return d2e3vec2(_mul_(x, y[0]),_mul_(x, y[1])); }
d2e3vec2 _mul_(in d2e3vec2 x, in d2e3vec2 y) { return d2e3vec2(_mul_(x[0], y[0]),_mul_(x[1], y[1])); }
d2e3vec2 _div_(in d2e3vec2 x, in d2e3 y) { return d2e3vec2(_div_(x[0], y),_div_(x[1], y)); }
d2e3vec2 _div_(in d2e3 x, in d2e3vec2 y) { return d2e3vec2(_div_(x, y[0]),_div_(x, y[1])); }
d2e3vec2 _div_(in d2e3vec2 x, in d2e3vec2 y) { return d2e3vec2(_div_(x[0], y[0]),_div_(x[1], y[1])); }

d2e3vec3 _pos_(in d2e3vec3 x) { return d2e3vec3(_pos_(x[0]),_pos_(x[1]),_pos_(x[2])); }
d2e3vec3 _neg_(in d2e3vec3 x) { return d2e3vec3(_neg_(x[0]),_neg_(x[1]),_neg_(x[2])); }
d2e3vec3 _add_(in d2e3vec3 x, in d2e3 y) { return d2e3vec3(_add_(x[0], y),_add_(x[1], y),_add_(x[2], y)); }
d2e3vec3 _add_(in d2e3 x, in d2e3vec3 y) { return d2e3vec3(_add_(x, y[0]),_add_(x, y[1]),_add_(x, y[2])); }
d2e3vec3 _add_(in d2e3vec3 x, in d2e3vec3 y) { return d2e3vec3(_add_(x[0], y[0]),_add_(x[1], y[1]),_add_(x[2], y[2])); }
d2e3vec3 _sub_(in d2e3vec3 x, in d2e3 y) { return d2e3vec3(_sub_(x[0], y),_sub_(x[1], y),_sub_(x[2], y)); }
d2e3vec3 _sub_(in d2e3 x, in d2e3vec3 y) { return d2e3vec3(_sub_(x, y[0]),_sub_(x, y[1]),_sub_(x, y[2])); }
d2e3vec3 _sub_(in d2e3vec3 x, in d2e3vec3 y) { return d2e3vec3(_sub_(x[0], y[0]),_sub_(x[1], y[1]),_sub_(x[2], y[2])); }
d2e3vec3 _mul_(in d2e3vec3 x, in d2e3 y) { return d2e3vec3(_mul_(x[0], y),_mul_(x[1], y),_mul_(x[2], y)); }
d2e3vec3 _mul_(in d2e3 x, in d2e3vec3 y) { return d2e3vec3(_mul_(x, y[0]),_mul_(x, y[1]),_mul_(x, y[2])); }
d2e3vec3 _mul_(in d2e3vec3 x, in d2e3vec3 y) { return d2e3vec3(_mul_(x[0], y[0]),_mul_(x[1], y[1]),_mul_(x[2], y[2])); }
d2e3vec3 _div_(in d2e3vec3 x, in d2e3 y) { return d2e3vec3(_div_(x[0], y),_div_(x[1], y),_div_(x[2], y)); }
d2e3vec3 _div_(in d2e3 x, in d2e3vec3 y) { return d2e3vec3(_div_(x, y[0]),_div_(x, y[1]),_div_(x, y[2])); }
d2e3vec3 _div_(in d2e3vec3 x, in d2e3vec3 y) { return d2e3vec3(_div_(x[0], y[0]),_div_(x[1], y[1]),_div_(x[2], y[2])); }

d2e3vec4 _pos_(in d2e3vec4 x) { return d2e3vec4(_pos_(x[0]),_pos_(x[1]),_pos_(x[2]),_pos_(x[3])); }
d2e3vec4 _neg_(in d2e3vec4 x) { return d2e3vec4(_neg_(x[0]),_neg_(x[1]),_neg_(x[2]),_neg_(x[3])); }
d2e3vec4 _add_(in d2e3vec4 x, in d2e3 y) { return d2e3vec4(_add_(x[0], y),_add_(x[1], y),_add_(x[2], y),_add_(x[3], y)); }
d2e3vec4 _add_(in d2e3 x, in d2e3vec4 y) { return d2e3vec4(_add_(x, y[0]),_add_(x, y[1]),_add_(x, y[2]),_add_(x, y[3])); }
d2e3vec4 _add_(in d2e3vec4 x, in d2e3vec4 y) { return d2e3vec4(_add_(x[0], y[0]),_add_(x[1], y[1]),_add_(x[2], y[2]),_add_(x[3], y[3])); }
d2e3vec4 _sub_(in d2e3vec4 x, in d2e3 y) { return d2e3vec4(_sub_(x[0], y),_sub_(x[1], y),_sub_(x[2], y),_sub_(x[3], y)); }
d2e3vec4 _sub_(in d2e3 x, in d2e3vec4 y) { return d2e3vec4(_sub_(x, y[0]),_sub_(x, y[1]),_sub_(x, y[2]),_sub_(x, y[3])); }
d2e3vec4 _sub_(in d2e3vec4 x, in d2e3vec4 y) { return d2e3vec4(_sub_(x[0], y[0]),_sub_(x[1], y[1]),_sub_(x[2], y[2]),_sub_(x[3], y[3])); }
d2e3vec4 _mul_(in d2e3vec4 x, in d2e3 y) { return d2e3vec4(_mul_(x[0], y),_mul_(x[1], y),_mul_(x[2], y),_mul_(x[3], y)); }
d2e3vec4 _mul_(in d2e3 x, in d2e3vec4 y) { return d2e3vec4(_mul_(x, y[0]),_mul_(x, y[1]),_mul_(x, y[2]),_mul_(x, y[3])); }
d2e3vec4 _mul_(in d2e3vec4 x, in d2e3vec4 y) { return d2e3vec4(_mul_(x[0], y[0]),_mul_(x[1], y[1]),_mul_(x[2], y[2]),_mul_(x[3], y[3])); }
d2e3vec4 _div_(in d2e3vec4 x, in d2e3 y) { return d2e3vec4(_div_(x[0], y),_div_(x[1], y),_div_(x[2], y),_div_(x[3], y)); }
d2e3vec4 _div_(in d2e3 x, in d2e3vec4 y) { return d2e3vec4(_div_(x, y[0]),_div_(x, y[1]),_div_(x, y[2]),_div_(x, y[3])); }
d2e3vec4 _div_(in d2e3vec4 x, in d2e3vec4 y) { return d2e3vec4(_div_(x[0], y[0]),_div_(x[1], y[1]),_div_(x[2], y[2]),_div_(x[3], y[3])); }

d2e3vec1 _mul_(in d2e3vec1 x, in float y) { return d2e3vec1(_mul_(x[0], y)); }
d2e3vec1 _mul_(in float x, in d2e3vec1 y) { return d2e3vec1(_mul_(x, y[0])); }

d2e3vec2 _mul_(in d2e3vec2 x, in float y) { return d2e3vec2(_mul_(x[0], y),_mul_(x[1], y)); }
d2e3vec2 _mul_(in float x, in d2e3vec2 y) { return d2e3vec2(_mul_(x, y[0]),_mul_(x, y[1])); }

d2e3vec3 _add_(in d2e3vec3 x, in float y) { return d2e3vec3(_add_(x[0], y),_add_(x[1], y),_add_(x[2], y)); }
d2e3vec3 _add_(in float x, in d2e3vec3 y) { return d2e3vec3(_add_(x, y[0]),_add_(x, y[1]),_add_(x, y[2])); }
d2e3vec3 _sub_(in d2e3vec3 x, in float y) { return d2e3vec3(_add_(x[0], y),_add_(x[1], y),_add_(x[2], y)); }
d2e3vec3 _sub_(in float x, in d2e3vec3 y) { return d2e3vec3(_add_(x, y[0]),_add_(x, y[1]),_add_(x, y[2])); }
d2e3vec3 _mul_(in d2e3vec3 x, in float y) { return d2e3vec3(_mul_(x[0], y),_mul_(x[1], y),_mul_(x[2], y)); }
d2e3vec3 _mul_(in float x, in d2e3vec3 y) { return d2e3vec3(_mul_(x, y[0]),_mul_(x, y[1]),_mul_(x, y[2])); }
d2e3vec3 _div_(in d2e3vec3 x, in float y) { return d2e3vec3(_add_(x[0], y),_add_(x[1], y),_add_(x[2], y)); }
d2e3vec3 _div_(in float x, in d2e3vec3 y) { return d2e3vec3(_add_(x, y[0]),_add_(x, y[1]),_add_(x, y[2])); }

d2e3vec3 _pow_(in d2e3vec3 x, in float y) { return d2e3vec3(_pow_(x[0], y),_pow_(x[1], y),_pow_(x[2], y)); }
//d2e3vec3 _pow_(in float x, in d2e3vec3 y) { return d2e3vec3(_pow_(x, y[0]),_pow_(x, y[1]),_pow_(x, y[2])); }

d2e3vec3 _exp_(in d2e3vec3 x) { return d2e3vec3(_exp_(x[0]),_exp_(x[1]),_exp_(x[2])); }
d2e3vec3 _log_(in d2e3vec3 x) { return d2e3vec3(_log_(x[0]),_log_(x[1]),_log_(x[2])); }
d2e3vec3 _sin_(in d2e3vec3 x) { return d2e3vec3(_sin_(x[0]),_sin_(x[1]),_sin_(x[2])); }
d2e3vec3 _cos_(in d2e3vec3 x) { return d2e3vec3(_cos_(x[0]),_cos_(x[1]),_cos_(x[2])); }
d2e3vec3 _tan_(in d2e3vec3 x) { return d2e3vec3(_tan_(x[0]),_tan_(x[1]),_tan_(x[2])); }
d2e3vec3 _asin_(in d2e3vec3 x) { return d2e3vec3(_asin_(x[0]),_asin_(x[1]),_asin_(x[2])); }
d2e3vec3 _acos_(in d2e3vec3 x) { return d2e3vec3(_acos_(x[0]),_acos_(x[1]),_acos_(x[2])); }
d2e3vec3 _atan_(in d2e3vec3 x) { return d2e3vec3(_atan_(x[0]),_atan_(x[1]),_atan_(x[2])); }
d2e3vec3 _sqrt_(in d2e3vec3 x) { return d2e3vec3(_sqrt_(x[0]),_sqrt_(x[1]),_sqrt_(x[2])); }
d2e3vec3 _abs_(in d2e3vec3 x) { return d2e3vec3(_abs_(x[0]),_abs_(x[1]),_abs_(x[2])); }

// TODO...
/*
bool _isnan_(in d2e3 x) { return isnan(x.s); }
bool _isinf_(in d2e3 x) { return isinf(x.s); }

bvec3 _isnan_(in d2e3vec3 x) { return bvec3(_isnan_(x[0]), _isnan_(x[1]), _isnan_(x[2])); }
bvec3 _isinf_(in d2e3vec3 x) { return bvec3(_isinf_(x[0]), _isinf_(x[1]), _isinf_(x[2])); }

bool _lt_(in d2e3 x, in float y) { return x.s < y; }
bool _lt_(in float x, in d2e3 y) { return x < y.s; }

bvec3 _lt_(in d2e3vec3 x, in float y) { return bvec3(_lt_(x[0], y),_lt_(x[1], y),_lt_(x[2], y)); }
bvec3 _lt_(in float x, in d2e3vec3 y) { return bvec3(_lt_(x, y[0]),_lt_(x, y[1]),_lt_(x, y[2])); }
*/

#endif // DUAL_H_
`,me=`#ifndef MATRIX_OPS_H_
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
`,be=r=>({source:{vs:`#version 300 es
in vec4 aPosition;
in vec4 aColor;

out vec4 vsColor;

void main() {
    gl_Position = aPosition.yzwx;
    vsColor = aColor;
}
`,fs:`#version 300 es

//precision highp float;
precision mediump float;

in vec4 vsColor;
out vec4 fsColor;

layout(std140) uniform Global {
  mat4 projection;
  mat4 view;
  vec4 args;
  vec2 resolution;
  float time;
} uGlobal;

${se}

${me}

${ye}

${fe}

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

${r}

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
  vec2 uv = fragCoord.xy / uGlobal.resolution.xy;

  float aspect = uGlobal.resolution.x / uGlobal.resolution.y;
  
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

  //vec3 eye = (inverse(uGlobal.view)*vec4(1.0, 0.0, 0.0, 0.0)).yzw;

  mat4 PInv = perspectiveInv(radians(90.0), aspect, 0.1, 100.0);
  mat4 VInv = M*inverse(uGlobal.view)*MInv;

  vec3 eye = (VInv*vec4(0.0, 0.0, 0.0, 1.0)).xyz;
  vec3 rayDir = createRay(uv, PInv, VInv);

  LPos += vec3(0., sin(2. * pi / 10. * uGlobal.time), 0.) * 1.5;
  
  vec4 col;
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

    col = vec4(fColor(P, rayDir, result), 1.);
  } else {
#if BACKGROUND == 0
    col = vec4(0.);
#else
    col = vec4(0.9 * pow(texture(iChannel1, rayDir).xyz, vec3(2.2)), 1.);
#endif
  }

#if BACKGROUND == 0
  fragColor = col;
#else
  vec3 tot = col.xyz;
  tot = pow(clamp(tot, 0.0, 1.0), vec3(0.45));	
  fragColor = vec4(tot, col.w);
#endif
}

void main() {
    //fsColor = vsColor;
    mainImage(fsColor, gl_FragCoord.xy);
}
`},attributes:{aPosition:{type:"vec4",location:-1},aColor:{type:"vec4",location:-1}},uniforms:{},uniformBlocks:{Global:{location:-1}}}),pe=r=>(j("data-v-6e0589bc"),r=r(),J(),r),ge={class:"flex flex-col"},he={class:"flex flex-col p-2"},we=pe(()=>f("summary",{class:"flex flex-row items-center gap-2 my-1"},[f("h2",null,"Global")],-1)),Ie={class:"w-16 text-xs text-right font-mono"},Ce=["onUpdate:modelValue"],Ae=["onUpdate:modelValue"],Re=`@plot_implicit
d2e3 f(in d2e3vec3 x) {
  return sin(x[0]) + cos(x[1]) + x[2];
}
`,Ee=N({__name:"ImplicitSurfaceView",setup(r){var E,P;const o={extensions:[te,_e.define(Q)]},l=A({source:Re,options:{args:[0,0,0,0]}}),x=W(l),c={options:{alpha:!0,premultipliedAlpha:!1},size:[1920,1080]};let a=null;const u={data:new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,((E=c.size)==null?void 0:E[0])??0,((P=c.size)==null?void 0:P[1])??0,0,0]),set:e=>{e.args&&(u.data[32]=e.args[0],u.data[33]=e.args[1],u.data[34]=e.args[2],u.data[35]=e.args[3]),e.resolution&&(u.data[36]=e.resolution[0],u.data[37]=e.resolution[1]),e.time&&(u.data[38]=e.time)}},m={mode:0,count:6,attributes:{aPosition:{data:new Float32Array([1,1,1,0,1,-1,1,0,1,1,-1,0,1,-1,-1,0])},aColor:{data:new Float32Array([1,1,0,1,0,1,0,1,1,0,0,1,0,0,0,1])},aIndex:{data:new Int32Array([0,1,2,3,2,1])}}},t={value:null,valid:!1,onCreate({context:e}){if(console.log("Program::onCreate"),!!a&&(t.value=ve(e,[k(e,a.source.vs,e.VERTEX_SHADER),k(e,a.source.fs,e.FRAGMENT_SHADER)]),t.valid=!0,!!t.value)){for(let n of Object.keys(a.attributes))a.attributes[n].location=e.getAttribLocation(t.value,n);for(let n of Object.keys(a.uniforms))a.uniforms[n].location=e.getUniformLocation(t.value,n);for(let n of Object.keys(a.uniformBlocks))a.uniformBlocks[n].location=e.getUniformBlockIndex(t.value,n);t.valid=!0}},onUpdate(e){var n,i;t.valid||((n=t.onDelete)==null||n.call(t,e),(i=t.onCreate)==null||i.call(t,e))},onDelete({context:e}){console.log("Program::onDelete"),e.deleteProgram(t.value),t.value=null}},d={value:null,onCreate({context:e}){d.value=e.createBuffer()},onUpdate({context:e}){if(!a||!d.value)return;e.bindBuffer(e.UNIFORM_BUFFER,d.value),e.bufferData(e.UNIFORM_BUFFER,u.data,e.DYNAMIC_DRAW),e.bindBuffer(e.UNIFORM_BUFFER,null);const n=0;e.bindBufferBase(e.UNIFORM_BUFFER,n,d.value),t.value&&a.uniformBlocks.Global.location!=-1&&e.uniformBlockBinding(t.value,a.uniformBlocks.Global.location,n)},onDelete({context:e}){e.deleteBuffer(d.value),d.value=null}},_={aPosition:{value:null,onCreate({context:e}){_.aPosition.value=e.createBuffer()},onUpdate({context:e}){_.aPosition.value&&(e.bindBuffer(e.ARRAY_BUFFER,_.aPosition.value),e.bufferData(e.ARRAY_BUFFER,m.attributes.aPosition.data,e.STATIC_DRAW))},onDelete({context:e}){e.deleteBuffer(_.aPosition.value),_.aPosition.value=null}},aColor:{value:null,onCreate({context:e}){_.aColor.value=e.createBuffer()},onUpdate({context:e}){_.aColor.value&&(e.bindBuffer(e.ARRAY_BUFFER,_.aColor.value),e.bufferData(e.ARRAY_BUFFER,m.attributes.aColor.data,e.STATIC_DRAW))},onDelete({context:e}){e.deleteBuffer(_.aColor.value),_.aColor.value=null}},aIndex:{value:null,onCreate({context:e}){_.aIndex.value=e.createBuffer()},onUpdate({context:e}){_.aIndex.value&&(e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,_.aIndex.value),e.bufferData(e.ELEMENT_ARRAY_BUFFER,m.attributes.aIndex.data,e.STATIC_DRAW))},onDelete({context:e}){e.deleteBuffer(_.aIndex.value),_.aIndex.value=null}}},v={value:null,valid:!1,onCreate(e){var i,s,y,p,g,h,S;const{context:n}=e;v.value=n.createVertexArray(),(s=(i=_.aPosition).onCreate)==null||s.call(i,e),(p=(y=_.aColor).onCreate)==null||p.call(y,e),(h=(g=_.aIndex).onCreate)==null||h.call(g,e),(S=v.onUpdate)==null||S.call(v,e)},onUpdate(e){var i,s,y,p,g,h;if(!a||!v.value)return;const{context:n}=e;n.bindVertexArray(v.value),(s=(i=_.aPosition).onUpdate)==null||s.call(i,e),a.attributes.aPosition.location!=-1&&(n.enableVertexAttribArray(a.attributes.aPosition.location),n.vertexAttribPointer(a.attributes.aPosition.location,4,n.FLOAT,!1,0,0)),(p=(y=_.aColor).onUpdate)==null||p.call(y,e),a.attributes.aColor.location!=-1&&(n.enableVertexAttribArray(a.attributes.aColor.location),n.vertexAttribPointer(a.attributes.aColor.location,4,n.FLOAT,!1,0,0)),(h=(g=_.aIndex).onUpdate)==null||h.call(g,e),v.valid=!0},onDelete({context:e}){e.deleteVertexArray(v.value),v.value=null}};de.perspective(Math.PI/4,1920/1080,.1,1e3);const{listeners:L,transformInplace:M}=re([-8,0,0]),q={onCreate(e){var n,i,s;console.log("Renderer::onCreate"),(n=t.onCreate)==null||n.call(t,e),(i=d.onCreate)==null||i.call(d,e),(s=v.onCreate)==null||s.call(v,e)},onRender(e){var s,y;if(!a)return;const{context:n,timestamp:i}=e;(s=t.onUpdate)==null||s.call(t,e),t.value&&(u.set({args:x.options.args,time:i/1e3}),M(u.data.subarray(16,32)),(y=d.onUpdate)==null||y.call(d,e),d.value&&(n.clearColor(0,0,0,0),n.clear(n.COLOR_BUFFER_BIT),n.useProgram(t.value),n.bindVertexArray(v.value),n.drawElements(n.TRIANGLES,m.count,n.UNSIGNED_INT,0)))},onDelete(e){var n,i;console.log("Renderer::onDelete"),(n=v.onDelete)==null||n.call(v,e),(i=t.onDelete)==null||i.call(t,e)}},G=e=>({source:e.replaceAll("@plot_implicit","/*@plot_implicit*/")}),R=e=>{const n=G(e.source);n.source=ne(n.source,{quiet:!0}),a=be(n.source),t.valid=!1},O=e=>{switch(e.key){case"Enter":return e.shiftKey;case"s":case"S":return e.ctrlKey||e.metaKey;default:return!1}};return F(document,"keydown",e=>{O(e)&&(e.stopPropagation(),e.preventDefault(),R(x))}),K(l,R,{immediate:!0}),(e,n)=>(w(),I(z,null,[C(Z,{title:"Implicit Surface",modelValue:l.value,"onUpdate:modelValue":n[0]||(n[0]=i=>l.value=i)},null,8,["modelValue"]),C(ee,null,{input:U(()=>[C(ae,{class:"h-full",modelValue:b(x).source,"onUpdate:modelValue":n[1]||(n[1]=i=>b(x).source=i),options:o},null,8,["modelValue"])]),output:U(()=>[f("div",ge,[C(le,{renderer:q,listeners:b(L),options:c},null,8,["listeners"]),f("div",he,[f("details",null,[we,(w(!0),I(z,null,Y(ie(0,4),i=>(w(),I("div",{class:"flex flex-row items-center gap-2",key:i},[f("label",Ie,"args["+X(i)+"]:",1),B(f("input",{class:"w-16",type:"number",step:"0.1","onUpdate:modelValue":s=>b(x).options.args[i]=s},null,8,Ce),[[T,b(x).options.args[i]]]),B(f("input",{class:"flex-grow",type:"range",min:"-1",max:"1",step:"0.01","onUpdate:modelValue":s=>b(x).options.args[i]=s},null,8,Ae),[[T,b(x).options.args[i]]])]))),128))])])])]),_:1})],64))}}),Te=oe(Ee,[["__scopeId","data-v-6e0589bc"]]);export{Te as default};
