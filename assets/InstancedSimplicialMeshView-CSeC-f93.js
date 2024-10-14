import{d as Q,r as O,q as X,s as Z,x as ee,e as ne,m as s,g as l,h as p,j as a,F as te,b as R,k as E,y as re,S as ae,l as P,v as L}from"./index-3H7NfZbl.js";import{_ as se}from"./MonacoEditor.vue_vue_type_script_setup_true_lang-DiB2-HLD.js";import{H as oe,J as ie,m as le,j as S,k as g,l as fe,n as ce,p as ue,x as G,I as de,y as z,q as me,t as pe,Q as ge,L as he,M as W,P as ye,C as A}from"./meshes-DnxT3L2C.js";const q=`struct VertexIn {
  @location(0) transform0: vec4f,
  @location(1) transform1: vec4f,
  @location(2) transform2: vec4f,
  @location(3) transform3: vec4f,
  @location(4) distance: vec4f,
  @location(5) fill: vec4f,
  @location(6) stroke: vec4f,
}

struct InstanceIn {
  @location(7) transform0: vec4f,
  @location(8) transform1: vec4f,
  @location(9) transform2: vec4f,
  @location(10) transform3: vec4f,
  @location(11) distance: vec4f,
  @location(12) fill: vec4f,
  @location(13) stroke: vec4f,
}

struct FragmentIn {
  @builtin(position) position: vec4f,
  @location(0) distance: vec4f,
  @location(1) fill: vec4f,
  @location(2) stroke: vec4f,
}

struct VaryingData {
  transform: mat4x4f,
  distance: vec4f,
  fill: vec4f,
  stroke: vec4f,
}

struct UnifromData {
  transform: mat4x4f,
}

struct CameraData {
  transform: mat4x4f,
}

struct MaterialData {
  fill: vec4f,
  stroke: vec4f,
  strokeWidth: f32,
}

// transform = uLayer.transform * layer.transform * uShape.transform * shape.transform
// dualTransform = uLayer.dualTransform * layer.dualTransform * uShape.dualTransform * shape.dualTransform
// position = in.transform[0].yzwx + in.dualTransform[0].yzwx

@group(0) @binding(0) var<uniform> uCamera: CameraData;
@group(0) @binding(1) var<uniform> uMaterial: MaterialData;

@group(0) @binding(2) var<uniform> uShape: UnifromData;
@group(0) @binding(3) var<uniform> uLayer: UnifromData;

fn fromVertexIn(in: VertexIn) -> VaryingData {
  return VaryingData(
    mat4x4f(in.transform0, in.transform1, in.transform2, in.transform3),
    in.distance,
    in.fill,
    in.stroke
  );
}

fn fromInstanceIn(in: InstanceIn) -> VaryingData {
  return VaryingData(
    mat4x4f(in.transform0, in.transform1, in.transform2, in.transform3),
    in.distance,
    in.fill,
    in.stroke
  );
}

fn transform(layer: VaryingData, shape: VaryingData) -> VaryingData {
  return VaryingData(
    uCamera.transform * uLayer.transform*layer.transform * uShape.transform*shape.transform,
    //uCamera.transform * uShape.transform*shape.transform * uLayer.transform*layer.transform,
    shape.distance,
    uMaterial.fill * layer.fill * shape.fill,
    uMaterial.stroke * layer.stroke * shape.stroke
  );
}

fn toFragmentIn(in: VaryingData) -> FragmentIn {
  return FragmentIn(
    in.transform[0].yzwx,
    in.distance,
    in.fill,
    in.stroke
  );
}

@vertex
fn vertexMain(vIn: VertexIn, iIn: InstanceIn) -> FragmentIn {
  let shape = fromVertexIn(vIn);
  let layer = fromInstanceIn(iIn);
  return toFragmentIn(transform(layer, shape));
}

fn minimum(x: vec4f) -> f32 {
  return min(min(min(x[0], x[1]), x[2]), x[3]);
}

fn maximum(x: vec4f) -> f32 {
  return max(max(max(x[0], x[1]), x[2]), x[3]);
}

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
`,ve={class:"basis-12 flex flex-row items-center"},xe=s("h1",{class:"px-2"},"Instanced Simplicial Mesh",-1),we=s("span",{class:"flex-grow"},null,-1),ke=s("h2",null,"Material",-1),be={class:"flex flex-row gap-2 items-center p-1 hover:bg-background-soft"},Ie=s("label",{class:"w-12 text-right",for:"fill"},"Fill:",-1),Ve={class:"flex flex-row gap-2 items-center p-1 hover:bg-background-soft"},_e=s("label",{class:"w-12 text-right",for:"stroke"},"Stroke:",-1),Be={class:"flex flex-row gap-2 items-center p-1 hover:bg-background-soft"},Se=s("label",{class:"w-12 text-right",for:"strokeWidth"},"Width:",-1),Ue=`{
  "shape": {
    "primitive": 2,
    "vertices": [
      {"position": [-1, -1], "distance": [1,0,0,1]},
      {"position": [-1, 1], "distance": [1,1,0,0]},
      {"position": [1, -1], "distance": [0,0,1,1]},
      {"position": [1, 1], "distance": [0,1,1,0]}
    ],
    "indices": [0, 1, 2, 1, 2, 3]
  },
  "layer": {
    "vertices": [
      {"position": [-1, -1], "size": 1.0, "color": "red"},
      {"position": [-1, 1], "size": 1.5, "color": "green"},
      {"position": [1, -1], "size": 2.0, "color": "blue"},
      {"position": [1, 1], "size": 2.5, "color": "yellow"}
    ],
  }
}`,Le=Q({__name:"InstancedSimplicialMeshView",setup(De){const N=oe.maybe(ie()),y=O({source:Ue,material:{fill:"#ffffff",stroke:"#888888",strokeWidth:10}}),o=X(y),T=O(null);let h=null,u=null;const r={valid:!1,onCreate({device:n}){var m;if(console.log("SimplicialMesh::onCreate"),u)return;const e=T.value,t=W(n,(e==null?void 0:e.shape)??null,{shaderLocation:0,stepMode:"vertex",interleave:!0}),i=W(n,(e==null?void 0:e.layer)??null,{shaderLocation:7,stepMode:"instance",interleave:!0}),f=((m=e==null?void 0:e.shape)==null?void 0:m.primitive)??0;u={shapeVertices:t,layerVertices:i,topology:f}},onUpdate(n){var e,t;r.valid||((e=r.onDelete)==null||e.call(r,n),(t=r.onCreate)==null||t.call(r,n),r.valid=!0)},onDelete(n){console.log("SimplicialMesh::onDelete"),u&&(u=null)}},v=le(q),x=S(v.uniforms.uCamera),w=S(v.uniforms.uMaterial),U=S(v.uniforms.uShape),d=S(v.uniforms.uLayer);x.set({transform:g.identity()}),U.set({transform:g.scaling([.1,.1,.1])}),d.set({transform:g.scaling([.5,.5,.5])}),w.set({fill:[1,1,1,1],stroke:[1,1,1,1],strokeWidth:10});const Y=n=>{const e=Math.min(...n);return g.scaling([e/n[0],e/n[1],1])},j={onCreate(n){var V;console.log("InstancedSimplicialMeshView::onCreate");const{device:e,format:t}=n;if(h||((V=r.onCreate)==null||V.call(r,n),!u))return;const{shapeVertices:i,layerVertices:f}=u,m=e.createShaderModule({code:q}),c=e.createBuffer({size:x.arrayBuffer.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),k=e.createBuffer({size:w.arrayBuffer.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),b=e.createBuffer({size:U.arrayBuffer.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),I=e.createBuffer({size:d.arrayBuffer.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});h=Object.fromEntries(Object.entries(ye).map(([M,C])=>{const _=e.createRenderPipeline({layout:"auto",vertex:{module:m,entryPoint:"vertexMain",buffers:[...i.bufferLayouts,...f.bufferLayouts]},fragment:{module:m,entryPoint:"fragmentMain",targets:[{format:t}]},primitive:{topology:C}}),B=e.createBindGroup({layout:_.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:c}},{binding:1,resource:{buffer:k}},{binding:2,resource:{buffer:b}},{binding:3,resource:{buffer:I}}]});return[M,{pipeline:_,bindGroup:B,camera:c,material:k,shape:b,layer:I}]}))},onRender(n){var B;const{device:e,context:t}=n;if(!h||((B=r.onUpdate)==null||B.call(r,n),!u))return;const{shapeVertices:i,layerVertices:f}=u,m=e.createCommandEncoder(),c=m.beginRenderPass({colorAttachments:[{clearValue:Float32Array.of(0,0,0,0),loadOp:"clear",storeOp:"store",view:t.getCurrentTexture().createView()}]}),{pipeline:k,bindGroup:b,camera:I,material:V,shape:M,layer:C}=h[u.topology];x.set({transform:Y([1920,1080])}),w.set({fill:A(o.material.fill).gl(),stroke:A(o.material.stroke).gl(),strokeWidth:o.material.strokeWidth}),e.queue.writeBuffer(I,0,x.arrayBuffer),e.queue.writeBuffer(V,0,w.arrayBuffer),e.queue.writeBuffer(M,0,U.arrayBuffer),e.queue.writeBuffer(C,0,d.arrayBuffer),c.setPipeline(k),c.setBindGroup(0,b),c.setVertexBuffer(0,i.buffers[0]),c.setVertexBuffer(1,f.buffers[0]),c.setIndexBuffer(i.indexBuffer,i.indexFormat),c.drawIndexed(i.numElements,f.numElements),c.end();const _=m.finish();e.queue.submit([_])},onDelete(n){var e;console.log("InstancedSimplicialMeshView::Delete"),h&&((e=r.onDelete)==null||e.call(r,n),h=null)}},D={down:!1},K=n=>{const e=[0,0,0];switch(n){case"ArrowLeft":e[0]-=1;break;case"ArrowUp":e[1]+=1;break;case"ArrowRight":e[0]+=1;break;case"ArrowDown":e[1]-=1;break}return e},$={keydown:n=>{console.log(n)},keyup:n=>{const e=K(n.key),t=n.shiftKey?.5:.05;g.translate(d.views.transform,[e[0]*t,e[1]*t,e[2]*t],d.views.transform)},pointerdown:n=>{D.down=!0,n.target.setPointerCapture(n.pointerId)},pointermove:n=>{if(!D.down)return;const e=n.target,t=[e.width,e.height],i=Math.min(...t),f=[+n.movementX*4/i,-n.movementY*4/i,0];g.translate(d.views.transform,[f[0],f[1],f[2]],d.views.transform)},pointerup:n=>{D.down=!1},wheel:n=>{const e=1+n.deltaY/100;g.scale(d.views.transform,[e,e,1],d.views.transform)}},J={alphaMode:"premultiplied",autoResize:!1},F=n=>{try{const e=N(n.source);T.value=ge.parse(e),r.valid=!1}catch(e){if(e instanceof SyntaxError)console.error(e.message);else if(e instanceof he)for(let t of e.issues)console.error(t.message);else throw e}},H=n=>{switch(n.key){case"Enter":return n.shiftKey;case"s":case"S":return n.ctrlKey||n.metaKey;default:return!1}};return Z(document,"keydown",n=>{H(n)&&(n.stopPropagation(),n.preventDefault(),F(o))}),ee(y,F,{immediate:!0}),(n,e)=>(R(),ne(te,null,[s("header",ve,[xe,we,l(fe,{modelValue:y.value,"onUpdate:modelValue":e[0]||(e[0]=t=>y.value=t)},null,8,["modelValue"]),l(ce)]),l(a(pe),{as:"main",class:"flex-grow flex flex-col overflow-hidden","default-index":2},{default:p(()=>[l(a(ue),{class:"flex flex-row md:hidden"},{default:p(()=>[l(a(G),{class:"tab"},{default:p(()=>[E("Input")]),_:1}),l(a(G),{class:"tab"},{default:p(()=>[E("Output")]),_:1})]),_:1}),l(a(de),{class:"h-full md:grid md:grid-cols-2 border-y-2 border-border"},{default:p(()=>[l(a(z),{class:"h-full ui-not-selected:hidden md:ui-not-selected:grid grid grid-rows-1",static:!0},{default:p(()=>[l(se,{modelValue:a(o).source,"onUpdate:modelValue":e[1]||(e[1]=t=>a(o).source=t)},null,8,["modelValue"])]),_:1}),l(a(z),{class:"h-full ui-not-selected:hidden md:ui-not-selected:grid grid grid-rows-2",static:!0},{default:p(()=>[(R(),re(ae,null,{default:p(()=>[l(me,{class:"h-full w-full object-cover",renderer:j,listeners:$,options:J})]),_:1})),s("div",null,[ke,s("div",be,[Ie,P(s("input",{class:"w-16",name:"fill",type:"color","onUpdate:modelValue":e[2]||(e[2]=t=>a(o).material.fill=t)},null,512),[[L,a(o).material.fill]])]),s("div",Ve,[_e,P(s("input",{class:"w-16",name:"stroke",type:"color","onUpdate:modelValue":e[3]||(e[3]=t=>a(o).material.stroke=t)},null,512),[[L,a(o).material.stroke]])]),s("div",Be,[Se,P(s("input",{class:"w-16",name:"strokeWidth",type:"number","onUpdate:modelValue":e[4]||(e[4]=t=>a(o).material.strokeWidth=t)},null,512),[[L,a(o).material.strokeWidth]])])])]),_:1})]),_:1})]),_:1})],64))}});export{Le as default};
