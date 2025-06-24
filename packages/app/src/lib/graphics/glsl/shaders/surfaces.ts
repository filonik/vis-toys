import BUILTIN_H from '@/assets/shaders/glsl/builtin.glsl?raw'
import CAMERA_H from '@/assets/shaders/glsl/camera.glsl?raw'
import DUAL_H from '@/assets/shaders/glsl/dual.glsl?raw'
import MATRIX_OPS_H from '@/assets/shaders/glsl/matrix_ops.glsl?raw'

export type ShaderInfo = {
    source: {vs:string, fs:string},
    attributes: Record<string, {type:string, location: number}>
    uniforms: Record<string, {type:string, location: WebGLUniformLocation|null}>
    uniformBlocks: Record<string, {location: number}>
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
    },
    uniformBlocks: {}
})

export const raymarchImplicitShader: (func: string) => ShaderInfo  = (func) => ({
    source: {
        vs: /*glsl*/ `#version 300 es
in vec4 aPosition;
in vec4 aColor;

out vec4 vsColor;

void main() {
    gl_Position = aPosition.yzwx;
    vsColor = aColor;
}
`,
        fs: /*glsl*/ `#version 300 es

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

${BUILTIN_H}

${MATRIX_OPS_H}

${CAMERA_H}

${DUAL_H}

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
    /*
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
    */
   uniforms: {},
   uniformBlocks: {
    Global: { location: -1 },
   },
})
