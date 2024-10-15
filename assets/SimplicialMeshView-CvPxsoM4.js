import{d as Y,r as W,s as $,x as J,y as H,e as X,f as s,g as l,l as u,j as a,F as Q,b as F,m as P,z as Z,S as ee,q as V,v as B}from"./index-su5XpW-6.js";import{_ as te}from"./MonacoEditor.vue_vue_type_script_setup_true_lang-PEqWFSoS.js";import{H as ne,J as re,k as p,m as ae,j as E,l as se,n as ie,p as oe,x as R,I as le,y as O,q as ce,t as fe,K as de,L as ue,M as me,P as pe,C as T}from"./meshes-COpM7DSp.js";const A=`struct VertexIn {
  @location(0) transform0: vec4f,
  @location(1) transform1: vec4f,
  @location(2) transform2: vec4f,
  @location(3) transform3: vec4f,
  @location(4) distance: vec4f,
  @location(5) fill: vec4f,
  @location(6) stroke: vec4f,
}

struct FragmentIn {
  @builtin(position) position: vec4f,
  @location(0) distance: vec4f,
  @location(1) fill: vec4f,
  @location(2) stroke: vec4f,
}

struct VertexData {
  transform: mat4x4f,
  distance: vec4f,
  fill: vec4f,
  stroke: vec4f,
}

struct MaterialData {
  fill: vec4f,
  stroke: vec4f,
  strokeWidth: f32,
}

struct CameraData {
  transform: mat4x4f,
}

fn minimum(x: vec4f) -> f32 {
  return min(min(min(x[0], x[1]), x[2]), x[3]);
}

fn maximum(x: vec4f) -> f32 {
  return max(max(max(x[0], x[1]), x[2]), x[3]);
}

@group(0) @binding(0) var<uniform> uCamera: CameraData;
@group(0) @binding(1) var<uniform> uMaterial: MaterialData;

fn fromVertexIn(in: VertexIn) -> VertexData {
  return VertexData(
    mat4x4f(in.transform0, in.transform1, in.transform2, in.transform3),
    in.distance,
    in.fill,
    in.stroke
  );
}

fn transform(in: VertexData) -> VertexData {
  return VertexData(
    uCamera.transform * in.transform,
    in.distance,
    uMaterial.fill * in.fill,
    uMaterial.stroke * in.stroke
  );
}

fn toFragmentIn(in: VertexData) -> FragmentIn {
  return FragmentIn(
    in.transform[0].yzwx,
    in.distance,
    in.fill,
    in.stroke
  );
}

@vertex
fn vertexMain(in: VertexIn) -> FragmentIn {
  return toFragmentIn(transform(fromVertexIn(in)));
}

// Original
// See: https://github.com/rreusser/glsl-solid-wireframe
/*
fn strokeScaled(distance: vec4f) -> f32 {
  let d = fwidth(distance);
  let w = smoothstep(
    d * (2.0*uMaterial.strokeWidth - 0.5),
    d * (2.0*uMaterial.strokeWidth + 0.5),
    distance
  );
  return minimum(w);
}
*/

fn distanceUnscaled(value: vec4f) -> f32 {
  return minimum(value);
}

fn distanceScaled(value: vec4f) -> f32 {
  return minimum(value/fwidth(value));
}

// Alternative to fwidth?
//let w = length(vec2(dpdx(d), dpdy(d)));

// Hard/Step
fn strokeUnscaled(distance: vec4f) -> f32 {
  let d = minimum(distance);
  let f = 1.0 - step(d, uMaterial.strokeWidth);
  return f;
}

fn strokeScaled(distance: vec4f) -> f32 {
  let d = minimum(distance/fwidth(distance));
  let f = 1.0 - step(d, uMaterial.strokeWidth);
  return f;
}

// Soft/Smoothstep
/*
fn strokeUnscaled(distance: vec4f) -> f32 {
  let d = minimum(distance);
  let f = smoothstep(
    2.0*uMaterial.strokeWidth - 0.5,
    2.0*uMaterial.strokeWidth + 0.5,
    d*100.0
  );
  return f;
}

fn strokeScaled(distance: vec4f) -> f32 {
  let d = minimum(distance/fwidth(distance));
  let f = smoothstep(
    2.0*uMaterial.strokeWidth - 0.5,
    2.0*uMaterial.strokeWidth + 0.5,
    d
  );
  return f;
}
*/

@fragment
fn fragmentMain(in: FragmentIn) -> @location(0) vec4f {
  //return in.fill;
  //return in.stroke;
  //return vec4f(vec3f(distanceUnscaled(in.distance)), 1.0);
  //return vec4f(vec3f(distanceScaled(in.distance)), 1.0);
  
  // Scaled
  return mix(in.stroke, in.fill, strokeScaled(in.distance));
  //return mix(in.stroke, in.fill, strokeUnscaled(in.distance));
}
`,ve={class:"flex flex-row items-center h-12 p-1 border-b-2 border-border"},ge=s("h1",{class:"px-2"},"Simplicial Mesh",-1),he=s("span",{class:"flex-grow"},null,-1),xe=s("h2",null,"Material",-1),ke={class:"flex flex-row gap-2 items-center p-1 hover:bg-background-soft"},we=s("label",{class:"w-12 text-right",for:"fill"},"Fill:",-1),be={class:"flex flex-row gap-2 items-center p-1 hover:bg-background-soft"},ye=s("label",{class:"w-12 text-right",for:"stroke"},"Stroke:",-1),_e={class:"flex flex-row gap-2 items-center p-1 hover:bg-background-soft"},Me=s("label",{class:"w-12 text-right",for:"strokeWidth"},"Width:",-1),Se=`{
  "primitive": 2,
  "vertices": [
    {"position": [-1, -1], "distance": [1,0,0,1], "fill": "red", "stroke": "yellow"},
    {"position": [-1, 1], "distance": [1,1,0,0], "fill": "green", "stroke": "blue"},
    {"position": [1, -1], "distance": [0,0,1,1], "fill": "blue", "stroke": "green"},
    {"position": [1, 1], "distance": [0,1,1,0], "fill": "yellow", "stroke": "red"}
  ],
  "indices": [0, 1, 2, 1, 2, 3]
}`,Ce=Y({__name:"SimplicialMeshView",setup(Ve){const G=ne.maybe(re()),h=W({source:Se,material:{fill:"#ffffff",stroke:"#888888",strokeWidth:20}}),D=W(null);let v=null,c=null;const L={alphaMode:"premultiplied",autoResize:!0},r={valid:!1,onCreate({device:t}){if(console.log("SimplicialMesh::onCreate"),c)return;const e=D.value,n=me(t,e,{shaderLocation:0,stepMode:"vertex",interleave:!0}),d=(e==null?void 0:e.primitive)??0;c={vertices:n,topology:d}},onUpdate(t){var e,n;r.valid||((e=r.onDelete)==null||e.call(r,t),(n=r.onCreate)==null||n.call(r,t),r.valid=!0)},onDelete(t){console.log("SimplicialMesh::onDelete"),c&&(c=null)}},m={camera:p.scaling([.5,.5,.5])},U=ae(A),x=E(U.uniforms.uCamera),k=E(U.uniforms.uMaterial);x.set({transform:p.identity()}),k.set({fill:[1,1,1,1],stroke:[1,1,1,1],strokeWidth:10});const j=t=>{const e=Math.min(...t);return p.scaling([e/t[0],e/t[1],1])},q={onCreate(t){var w;console.log("SimplicialMeshView::onCreate");const{device:e,format:n}=t;if(v||((w=r.onCreate)==null||w.call(r,t),!c))return;const{vertices:d}=c,o=e.createShaderModule({code:A}),g=e.createBuffer({size:x.arrayBuffer.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),f=e.createBuffer({size:k.arrayBuffer.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});v=Object.fromEntries(Object.entries(pe).map(([_,M])=>{const b=e.createRenderPipeline({layout:"auto",vertex:{module:o,entryPoint:"vertexMain",buffers:d.bufferLayouts},fragment:{module:o,entryPoint:"fragmentMain",targets:[{format:n}]},primitive:{topology:M}}),S=e.createBindGroup({layout:b.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:g}},{binding:1,resource:{buffer:f}}]});return[_,{pipeline:b,bindGroup:S,camera:g,material:f}]}))},onRender(t){var I;const{device:e,context:n,display:d}=t;if(!v||((I=r.onUpdate)==null||I.call(r,t),!c))return;const{vertices:o}=c,g=e.createCommandEncoder(),f=g.beginRenderPass({colorAttachments:[{clearValue:Float32Array.of(0,0,0,0),loadOp:"clear",storeOp:"store",view:n.getCurrentTexture().createView()}]}),{pipeline:w,bindGroup:_,camera:M,material:b}=v[c.topology],S=j(d);p.mul(S,m.camera,x.views.transform),k.set({fill:T(i.material.fill).gl(),stroke:T(i.material.stroke).gl(),strokeWidth:i.material.strokeWidth}),e.queue.writeBuffer(M,0,x.arrayBuffer),e.queue.writeBuffer(b,0,k.arrayBuffer),f.setPipeline(w),f.setBindGroup(0,_),f.setVertexBuffer(0,o.buffers[0]),f.setIndexBuffer(o.indexBuffer,o.indexFormat),f.drawIndexed(o.numElements),f.end();const N=g.finish();e.queue.submit([N])},onDelete(t){var e;console.log("SimplicialMeshView::Delete"),v&&((e=r.onDelete)==null||e.call(r,t),v=null)}},y={down:!1},z={keydown:t=>{console.log(t)},keyup:t=>{const e=[0,0,0];switch(t.key){case"ArrowLeft":e[0]-=1;break;case"ArrowUp":e[1]+=1;break;case"ArrowRight":e[0]+=1;break;case"ArrowDown":e[1]-=1;break}const n=t.shiftKey?.5:.05;p.translate(m.camera,[e[0]*n,e[1]*n,e[2]*n],m.camera)},pointerdown:t=>{y.down=!0,t.target.setPointerCapture(t.pointerId)},pointermove:t=>{if(!y.down)return;const e=t.target,n=[e.width,e.height],d=Math.min(...n),o=[+t.movementX*4/d,-t.movementY*4/d,0];p.translate(m.camera,[o[0],o[1],o[2]],m.camera)},pointerup:t=>{y.down=!1},wheel:t=>{const e=1+t.deltaY/100;p.scale(m.camera,[e,e,1],m.camera)}},i=$(h),C=t=>{try{const e=G(t.source);D.value=de.parse(e),r.valid=!1}catch(e){if(e instanceof SyntaxError)console.error(e.message);else if(e instanceof ue)for(let n of e.issues)console.error(n.message);else throw e}},K=t=>{switch(t.key){case"Enter":return t.shiftKey;case"s":case"S":return t.ctrlKey||t.metaKey;default:return!1}};return J(document,"keydown",t=>{K(t)&&(t.stopPropagation(),t.preventDefault(),C(i))}),H(h,C,{immediate:!0}),(t,e)=>(F(),X(Q,null,[s("header",ve,[ge,he,l(se,{modelValue:h.value,"onUpdate:modelValue":e[0]||(e[0]=n=>h.value=n)},null,8,["modelValue"]),l(ie)]),l(a(fe),{as:"main",class:"flex-grow flex flex-col overflow-hidden","default-index":2},{default:u(()=>[l(a(oe),{class:"flex flex-row md:hidden"},{default:u(()=>[l(a(R),{class:"tab"},{default:u(()=>[P("Input")]),_:1}),l(a(R),{class:"tab"},{default:u(()=>[P("Output")]),_:1})]),_:1}),l(a(le),{class:"h-full md:grid md:grid-cols-2 border-y-2 border-border"},{default:u(()=>[l(a(O),{class:"h-full ui-not-selected:hidden md:ui-not-selected:grid grid grid-rows-1",static:!0},{default:u(()=>[l(te,{modelValue:a(i).source,"onUpdate:modelValue":e[1]||(e[1]=n=>a(i).source=n)},null,8,["modelValue"])]),_:1}),l(a(O),{class:"h-full ui-not-selected:hidden md:ui-not-selected:grid grid grid-rows-2",static:!0},{default:u(()=>[(F(),Z(ee,null,{default:u(()=>[l(ce,{class:"h-full w-full object-cover",renderer:q,listeners:z,options:L})]),_:1})),s("div",null,[xe,s("div",ke,[we,V(s("input",{class:"w-16",name:"fill",type:"color","onUpdate:modelValue":e[2]||(e[2]=n=>a(i).material.fill=n)},null,512),[[B,a(i).material.fill]])]),s("div",be,[ye,V(s("input",{class:"w-16",name:"stroke",type:"color","onUpdate:modelValue":e[3]||(e[3]=n=>a(i).material.stroke=n)},null,512),[[B,a(i).material.stroke]])]),s("div",_e,[Me,V(s("input",{class:"w-16",name:"strokeWidth",type:"number","onUpdate:modelValue":e[4]||(e[4]=n=>a(i).material.strokeWidth=n)},null,512),[[B,a(i).material.strokeWidth]])])])]),_:1})]),_:1})]),_:1})],64))}});export{Ce as default};
