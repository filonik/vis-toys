#ifndef CAMERA_H_
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
