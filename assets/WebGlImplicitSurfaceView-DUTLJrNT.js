import{C as k,n as S,t as F}from"./ToggleDarkButton.vue_vue_type_script_setup_true_lang-BiELzYaB.js";import{s as M,_ as B,a as V,p as q}from"./utilities-BjSpYvY9.js";import{f as G,S as H,_ as O}from"./index-CR3NzD-O.js";import{o as j,z as W,d as z,c as R,r as b,b as C,e as I,q as $,g as h,k as P,F as K,u as g,f as Y}from"./index-CB0EF2dQ.js";import{u as X}from"./useCamera-QnfjA7_D.js";import{m as J,_ as Q}from"./_plugin-vue_export-helper-DbqndbrS.js";function Z(_,o,u={},c={}){let l=null;const{pause:a,resume:s}=k(r=>{var d;l&&((d=o.onRender)==null||d.call(o,{...l,...r}))},{immediate:!1});for(const[r,d]of Object.entries(u))S(_,r,d);j(()=>{var r;t(),l&&((r=o.onCreate)==null||r.call(o,l),s())}),W(()=>{var r;l&&(a(),(r=o.onDelete)==null||r.call(o,l)),i()});const t=()=>{console.log("useWebGl::initialize");const r=_.value;if(!r){console.log("Invalid canvas.");return}const d=r.getContext("webgl2",c.options);if(!d){console.log("Invalid context.");return}l={context:d}},i=()=>{console.log("useWebGl::finalize"),l=null};return!0}const nn=["width","height"],en={key:1,class:"flex items-center justify-center"},tn=z({__name:"WebGlCanvas",props:{renderer:{},options:{default:()=>({size:[1920,1080]})},listeners:{default:()=>({})}},setup(_){const o=_,u=R(()=>{var s;return((s=o.options.size)==null?void 0:s[0])??1920}),c=R(()=>{var s;return((s=o.options.size)==null?void 0:s[1])??1080}),l=b(),a=b(!0);return a.value=Z(l,o.renderer,o.listeners,o.options),(s,t)=>a.value?(C(),I("canvas",{key:0,ref_key:"canvasRef",ref:l,class:"cursor-default",width:u.value,height:c.value,tabindex:"1"},null,8,nn)):(C(),I("div",en,"WebGPU not supported."))}}),E=(_,o,u)=>{const c=_.createShader(u);if(!c)return console.error("Error creating shader."),null;if(_.shaderSource(c,o),_.compileShader(c),!_.getShaderParameter(c,_.COMPILE_STATUS)){const a=_.getShaderInfoLog(c);return console.error(`Error compiling shader: ${a}`),_.deleteShader(c),null}return c},an=(_,o)=>{const u=_.createProgram();if(!u)return null;if(o.forEach(l=>{l&&_.attachShader(u,l)}),_.linkProgram(u),!_.getProgramParameter(u,_.LINK_STATUS)){const l=_.getProgramInfoLog(u);return console.error(`Error in program linking: ${l}`),_.deleteProgram(u),null}return u},rn=`#ifndef BUILTIN_H
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
`,_n=`#ifndef CAMERA_H_
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
`,on=`#ifndef DUAL_H_
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

#endif // DUAL_H_
`,ln=`#ifndef MATRIX_OPS_H_
#define MATRIX_OPS_H_

#define vec1 float[1]
#define mat1 float[1*1]

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
`,un=_=>({source:{vs:`#version 300 es
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

uniform mat4 uView;
uniform mat4 uProjection;

uniform vec4 iResolution;
uniform float iTime;

${rn}

${ln}

${_n}

${on}

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

${_}

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
`},attributes:{aPosition:{type:"vec4",location:-1},aColor:{type:"vec4",location:-1}},uniforms:{uProjection:{type:"mat4",location:null},uView:{type:"mat4",location:null},iResolution:{type:"vec4",location:null},iTime:{type:"float",location:null}}}),xn={class:"flex flex-col"},cn=`@plot_implicit
d2e3 f(in d2e3vec3 x) {
  return sin(x[0]) + cos(x[1]) + x[2];
}
`,sn=z({__name:"WebGlImplicitSurfaceView",setup(_){const o={extensions:[G,H.define(M)]},u=b({source:cn}),c=F(u),l={options:{alpha:!0,premultipliedAlpha:!1},size:[1920,1080]};let a=null;const s={mode:0,count:6,attributes:{aPosition:{data:new Float32Array([1,1,1,0,1,-1,1,0,1,1,-1,0,1,-1,-1,0])},aColor:{data:new Float32Array([1,1,0,1,0,1,0,1,1,0,0,1,0,0,0,1])},aIndex:{data:new Int32Array([0,1,2,3,2,1])}}},t={value:null,valid:!1,onCreate({context:n}){if(console.log("Program::onCreate"),!!a&&(t.value=an(n,[E(n,a.source.vs,n.VERTEX_SHADER),E(n,a.source.fs,n.FRAGMENT_SHADER)]),t.valid=!0,!!t.value)){for(let e of Object.keys(a.attributes))a.attributes[e].location=n.getAttribLocation(t.value,e);for(let e of Object.keys(a.uniforms))a.uniforms[e].location=n.getUniformLocation(t.value,e);t.valid=!0}},onUpdate(n){var e,x;t.valid||((e=t.onDelete)==null||e.call(t,n),(x=t.onCreate)==null||x.call(t,n))},onDelete({context:n}){console.log("Program::onDelete"),n.deleteProgram(t.value),t.value=null}},i={aPosition:{value:null,onCreate({context:n}){i.aPosition.value=n.createBuffer()},onUpdate({context:n}){i.aPosition.value&&(n.bindBuffer(n.ARRAY_BUFFER,i.aPosition.value),n.bufferData(n.ARRAY_BUFFER,s.attributes.aPosition.data,n.STATIC_DRAW))},onDelete({context:n}){n.deleteBuffer(i.aPosition.value),i.aPosition.value=null}},aColor:{value:null,onCreate({context:n}){i.aColor.value=n.createBuffer()},onUpdate({context:n}){i.aColor.value&&(n.bindBuffer(n.ARRAY_BUFFER,i.aColor.value),n.bufferData(n.ARRAY_BUFFER,s.attributes.aColor.data,n.STATIC_DRAW))},onDelete({context:n}){n.deleteBuffer(i.aColor.value),i.aColor.value=null}},aIndex:{value:null,onCreate({context:n}){i.aIndex.value=n.createBuffer()},onUpdate({context:n}){i.aIndex.value&&(n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,i.aIndex.value),n.bufferData(n.ELEMENT_ARRAY_BUFFER,s.attributes.aIndex.data,n.STATIC_DRAW))},onDelete({context:n}){n.deleteBuffer(i.aIndex.value),i.aIndex.value=null}}},r={value:null,valid:!1,onCreate(n){var x,v,f,m,y,p,w;const{context:e}=n;r.value=e.createVertexArray(),(v=(x=i.aPosition).onCreate)==null||v.call(x,n),(m=(f=i.aColor).onCreate)==null||m.call(f,n),(p=(y=i.aIndex).onCreate)==null||p.call(y,n),(w=r.onUpdate)==null||w.call(r,n)},onUpdate(n){var x,v,f,m,y,p;if(!a||!r.value)return;const{context:e}=n;e.bindVertexArray(r.value),(v=(x=i.aPosition).onUpdate)==null||v.call(x,n),a.attributes.aPosition.location!=-1&&(e.enableVertexAttribArray(a.attributes.aPosition.location),e.vertexAttribPointer(a.attributes.aPosition.location,4,e.FLOAT,!1,0,0)),(m=(f=i.aColor).onUpdate)==null||m.call(f,n),a.attributes.aColor.location!=-1&&(e.enableVertexAttribArray(a.attributes.aColor.location),e.vertexAttribPointer(a.attributes.aColor.location,4,e.FLOAT,!1,0,0)),(p=(y=i.aIndex).onUpdate)==null||p.call(y,n),r.valid=!0},onDelete({context:n}){n.deleteVertexArray(r.value),r.value=null}},d=J.perspective(Math.PI/4,1920/1080,.1,1e3),{listeners:T,transform:D}=X([-8,0,0]),U={onCreate(n){var e,x;(e=t.onCreate)==null||e.call(t,n),(x=r.onCreate)==null||x.call(r,n)},onRender(n){var v,f,m;if(!a||((v=t.onUpdate)==null||v.call(t,n),!t.value))return;const{context:e,timestamp:x}=n;e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.useProgram(t.value),e.uniformMatrix4fv(a.uniforms.uView.location,!1,D.value),e.uniformMatrix4fv(a.uniforms.uProjection.location,!1,d),e.uniform4fv(a.uniforms.iResolution.location,[((f=l.size)==null?void 0:f[0])??0,((m=l.size)==null?void 0:m[1])??0,0,0]),e.uniform1f(a.uniforms.iTime.location,x/1e3),e.bindVertexArray(r.value),e.drawElements(e.TRIANGLES,s.count,e.UNSIGNED_INT,0)},onDelete(n){var e;(e=t.onDelete)==null||e.call(t,n)}},L=n=>({source:n.replaceAll("@plot_implicit","/*@plot_implicit*/")}),A=n=>{const e=L(n.source);e.source=q(e.source,{quiet:!0}),a=un(e.source),console.log(a.source.fs),t.valid=!1},N=n=>{switch(n.key){case"Enter":return n.shiftKey;case"s":case"S":return n.ctrlKey||n.metaKey;default:return!1}};return S(document,"keydown",n=>{N(n)&&(n.stopPropagation(),n.preventDefault(),A(c))}),$(u,A,{immediate:!0}),(n,e)=>(C(),I(K,null,[h(B,{title:"Implicit Surface",modelValue:u.value,"onUpdate:modelValue":e[0]||(e[0]=x=>u.value=x)},null,8,["modelValue"]),h(V,null,{input:P(()=>[h(O,{class:"h-full",modelValue:g(c).source,"onUpdate:modelValue":e[1]||(e[1]=x=>g(c).source=x),options:o},null,8,["modelValue"])]),output:P(()=>[Y("div",xn,[h(tn,{renderer:U,listeners:g(T),options:l},null,8,["listeners"])])]),_:1})],64))}}),hn=Q(sn,[["__scopeId","data-v-43e8bc2f"]]);export{hn as default};
