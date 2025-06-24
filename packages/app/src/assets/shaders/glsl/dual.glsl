#ifndef DUAL_H_
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

d2e3 _pow_(in d2e3 a, in float b)
{
    float v = pow(a.s, b); // value f(a(x))
    float da = b*pow(a.s,b-1.0); // first derivative f'(a(x))
    float dda = b*(b-1.0)*pow(a.s,b-2.0); // second derivative f''(a(x))
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

d2e3vec3 _mul_(in d2e3vec3 x, in float y) { return d2e3vec3(_mul_(x[0], y),_mul_(x[1], y),_mul_(x[2], y)); }
d2e3vec3 _mul_(in float x, in d2e3vec3 y) { return d2e3vec3(_mul_(x, y[0]),_mul_(x, y[1]),_mul_(x, y[2])); }

#endif // DUAL_H_
