import{d as J,r as P,x as H,y as Q,z as X,e as Z,f as s,g as l,l as u,j as a,F as ee,b as E,m as R,A as te,S as ne,q as I,v as D,B as re,C as ae}from"./index-DzwOsM8U.js";import{_ as se}from"./MonacoEditor.vue_vue_type_script_setup_true_lang-DP8IvrEf.js";import{J as oe,K as ie,m as p,t as le,x as A,y as ce,z as fe,B as de,C as O,I as ue,D as T,E as me,F as pe,L as ve,M as he,Q as ge,P as xe,H as G,j as ke}from"./meshes-BBMU-88b.js";const L=`struct VertexIn {
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
`,h=x=>(re("data-v-447689a8"),x=x(),ae(),x),we={class:"flex flex-row items-center h-12 p-1 border-b-2 border-border"},be=h(()=>s("h1",{class:"px-2"},"Simplicial Mesh",-1)),_e=h(()=>s("span",{class:"flex-grow"},null,-1)),ye=h(()=>s("h2",null,"Material",-1)),Se={class:"flex flex-row gap-2 items-center p-1 hover:bg-background-soft"},Me=h(()=>s("label",{class:"w-12 text-right",for:"fill"},"Fill:",-1)),Ve={class:"flex flex-row gap-2 items-center p-1 hover:bg-background-soft"},Be=h(()=>s("label",{class:"w-12 text-right",for:"stroke"},"Stroke:",-1)),Ie={class:"flex flex-row gap-2 items-center p-1 hover:bg-background-soft"},De=h(()=>s("label",{class:"w-12 text-right",for:"strokeWidth"},"Width:",-1)),Ue=`{
  "primitive": 2,
  "vertices": [
    {"position": [-1, -1], "distance": [1,0,0,1], "fill": "red", "stroke": "yellow"},
    {"position": [-1, 1], "distance": [1,1,0,0], "fill": "green", "stroke": "blue"},
    {"position": [1, -1], "distance": [0,0,1,1], "fill": "blue", "stroke": "green"},
    {"position": [1, 1], "distance": [0,1,1,0], "fill": "yellow", "stroke": "red"}
  ],
  "indices": [0, 1, 2, 1, 2, 3]
}`,Ce=J({__name:"SimplicialMeshView",setup(x){const z=oe.maybe(ie()),k=P({source:Ue,material:{fill:"#ffffff",stroke:"#888888",strokeWidth:20}}),U=P(null);let v=null,c=null;const j={alphaMode:"premultiplied",autoResize:!0},r={valid:!1,onCreate({device:t}){if(console.log("SimplicialMesh::onCreate"),c)return;const e=U.value,n=ge(t,e,{shaderLocation:0,stepMode:"vertex",interleave:!0}),d=(e==null?void 0:e.primitive)??0;c={vertices:n,topology:d}},onUpdate(t){var e,n;r.valid||((e=r.onDelete)==null||e.call(r,t),(n=r.onCreate)==null||n.call(r,t),r.valid=!0)},onDelete(t){console.log("SimplicialMesh::onDelete"),c&&(c=null)}},m={camera:p.scaling([.5,.5,.5])},C=le(L),w=A(C.uniforms.uCamera),b=A(C.uniforms.uMaterial);w.set({transform:p.identity()}),b.set({fill:[1,1,1,1],stroke:[1,1,1,1],strokeWidth:10});const K=t=>{const e=Math.min(...t);return p.scaling([e/t[0],e/t[1],1])},N={onCreate(t){var _;console.log("SimplicialMeshView::onCreate");const{device:e,format:n}=t;if(v||((_=r.onCreate)==null||_.call(r,t),!c))return;const{vertices:d}=c,i=e.createShaderModule({code:L}),g=e.createBuffer({size:w.arrayBuffer.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),f=e.createBuffer({size:b.arrayBuffer.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});v=Object.fromEntries(Object.entries(xe).map(([M,V])=>{const y=e.createRenderPipeline({layout:"auto",vertex:{module:i,entryPoint:"vertexMain",buffers:d.bufferLayouts},fragment:{module:i,entryPoint:"fragmentMain",targets:[{format:n}]},primitive:{topology:V}}),B=e.createBindGroup({layout:y.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:g}},{binding:1,resource:{buffer:f}}]});return[M,{pipeline:y,bindGroup:B,camera:g,material:f}]}))},onRender(t){var F;const{device:e,context:n,display:d}=t;if(!v||((F=r.onUpdate)==null||F.call(r,t),!c))return;const{vertices:i}=c,g=e.createCommandEncoder(),f=g.beginRenderPass({colorAttachments:[{clearValue:Float32Array.of(0,0,0,0),loadOp:"clear",storeOp:"store",view:n.getCurrentTexture().createView()}]}),{pipeline:_,bindGroup:M,camera:V,material:y}=v[c.topology],B=K(d);p.mul(B,m.camera,w.views.transform),b.set({fill:G(o.material.fill).gl(),stroke:G(o.material.stroke).gl(),strokeWidth:o.material.strokeWidth}),e.queue.writeBuffer(V,0,w.arrayBuffer),e.queue.writeBuffer(y,0,b.arrayBuffer),f.setPipeline(_),f.setBindGroup(0,M),f.setVertexBuffer(0,i.buffers[0]),f.setIndexBuffer(i.indexBuffer,i.indexFormat),f.drawIndexed(i.numElements),f.end();const $=g.finish();e.queue.submit([$])},onDelete(t){var e;console.log("SimplicialMeshView::Delete"),v&&((e=r.onDelete)==null||e.call(r,t),v=null)}},S={down:!1},q={keydown:t=>{console.log(t)},keyup:t=>{const e=[0,0,0];switch(t.key){case"ArrowLeft":e[0]-=1;break;case"ArrowUp":e[1]+=1;break;case"ArrowRight":e[0]+=1;break;case"ArrowDown":e[1]-=1;break}const n=t.shiftKey?.5:.05;p.translate(m.camera,[e[0]*n,e[1]*n,e[2]*n],m.camera)},pointerdown:t=>{S.down=!0,t.target.setPointerCapture(t.pointerId)},pointermove:t=>{if(!S.down)return;const e=t.target,n=[e.width,e.height],d=Math.min(...n),i=[+t.movementX*4/d,-t.movementY*4/d,0];p.translate(m.camera,[i[0],i[1],i[2]],m.camera)},pointerup:t=>{S.down=!1},wheel:t=>{const e=1+t.deltaY/100;p.scale(m.camera,[e,e,1],m.camera)}},o=H(k),W=t=>{try{const e=z(t.source);U.value=ve.parse(e),r.valid=!1}catch(e){if(e instanceof SyntaxError)console.error(e.message);else if(e instanceof he)for(let n of e.issues)console.error(n.message);else throw e}},Y=t=>{switch(t.key){case"Enter":return t.shiftKey;case"s":case"S":return t.ctrlKey||t.metaKey;default:return!1}};return Q(document,"keydown",t=>{Y(t)&&(t.stopPropagation(),t.preventDefault(),W(o))}),X(k,W,{immediate:!0}),(t,e)=>(E(),Z(ee,null,[s("header",we,[be,_e,l(ce,{modelValue:k.value,"onUpdate:modelValue":e[0]||(e[0]=n=>k.value=n)},null,8,["modelValue"]),l(fe)]),l(a(pe),{as:"main",class:"flex-grow flex flex-col overflow-hidden","default-index":2},{default:u(()=>[l(a(de),{class:"flex flex-row md:hidden"},{default:u(()=>[l(a(O),{class:"tab"},{default:u(()=>[R("Input")]),_:1}),l(a(O),{class:"tab"},{default:u(()=>[R("Output")]),_:1})]),_:1}),l(a(ue),{class:"h-full md:grid md:grid-cols-2 border-y-2 border-border"},{default:u(()=>[l(a(T),{class:"h-full ui-not-selected:hidden md:ui-not-selected:grid grid grid-rows-1",static:!0},{default:u(()=>[l(se,{modelValue:a(o).source,"onUpdate:modelValue":e[1]||(e[1]=n=>a(o).source=n)},null,8,["modelValue"])]),_:1}),l(a(T),{class:"h-full ui-not-selected:hidden md:ui-not-selected:grid grid grid-rows-2",static:!0},{default:u(()=>[(E(),te(ne,null,{default:u(()=>[l(me,{class:"h-full w-full object-cover show-focus",renderer:N,listeners:q,options:j})]),_:1})),s("div",null,[ye,s("div",Se,[Me,I(s("input",{class:"w-16",name:"fill",type:"color","onUpdate:modelValue":e[2]||(e[2]=n=>a(o).material.fill=n)},null,512),[[D,a(o).material.fill]])]),s("div",Ve,[Be,I(s("input",{class:"w-16",name:"stroke",type:"color","onUpdate:modelValue":e[3]||(e[3]=n=>a(o).material.stroke=n)},null,512),[[D,a(o).material.stroke]])]),s("div",Ie,[De,I(s("input",{class:"w-16",name:"strokeWidth",type:"number","onUpdate:modelValue":e[4]||(e[4]=n=>a(o).material.strokeWidth=n)},null,512),[[D,a(o).material.strokeWidth]])])])]),_:1})]),_:1})]),_:1})],64))}}),Ee=ke(Ce,[["__scopeId","data-v-447689a8"]]);export{Ee as default};
