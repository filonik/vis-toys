import{d as Z,r as R,s as ee,x as ne,y as te,e as re,f as s,g as l,l as p,j as a,F as ae,b as E,m as G,z as se,S as oe,q as T,v as F,A as ie,B as le}from"./index-BkrPRDKK.js";import{_ as fe,b as ce,P as ue,c as W,a as de}from"./meshes-C0_D2i27.js";import{t as me,z as pe,m as ge,n as he,p as ye,x as A,I as ve,y as q,q as xe}from"./ToggleDarkButton.vue_vue_type_script_setup_true_lang-C4A39BZ3.js";import{m as we,a as D,_ as be,b as N}from"./webgpu-utils.module-ORw-k-9c.js";import{m as g,_ as ke}from"./_plugin-vue_export-helper-CVrkuu__.js";const Y=`struct VertexIn {
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
`,y=v=>(ie("data-v-186cab30"),v=v(),le(),v),Ie={class:"basis-12 flex flex-row items-center"},_e=y(()=>s("h1",{class:"px-2"},"Instanced Simplicial Mesh",-1)),Ve=y(()=>s("span",{class:"flex-grow"},null,-1)),Se=y(()=>s("h2",null,"Material",-1)),Be={class:"flex flex-row gap-2 items-center p-1 hover:bg-background-soft"},Ue=y(()=>s("label",{class:"w-12 text-right",for:"fill"},"Fill:",-1)),De={class:"flex flex-row gap-2 items-center p-1 hover:bg-background-soft"},Me=y(()=>s("label",{class:"w-12 text-right",for:"stroke"},"Stroke:",-1)),Ce={class:"flex flex-row gap-2 items-center p-1 hover:bg-background-soft"},Pe=y(()=>s("label",{class:"w-12 text-right",for:"strokeWidth"},"Width:",-1)),Le=`{
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
}`,Te=Z({__name:"InstancedSimplicialMeshView",setup(v){const j=me.maybe(pe()),x=R({source:Le,material:{fill:"#ffffff",stroke:"#888888",strokeWidth:10}}),o=ee(x),z=R(null);let h=null,u=null;const r={valid:!1,onCreate({device:n}){var m;if(console.log("SimplicialMesh::onCreate"),u)return;const e=z.value,t=W(n,(e==null?void 0:e.shape)??null,{shaderLocation:0,stepMode:"vertex",interleave:!0}),i=W(n,(e==null?void 0:e.layer)??null,{shaderLocation:7,stepMode:"instance",interleave:!0}),f=((m=e==null?void 0:e.shape)==null?void 0:m.primitive)??0;u={shapeVertices:t,layerVertices:i,topology:f}},onUpdate(n){var e,t;r.valid||((e=r.onDelete)==null||e.call(r,n),(t=r.onCreate)==null||t.call(r,n),r.valid=!0)},onDelete(n){console.log("SimplicialMesh::onDelete"),u&&(u=null)}},w=we(Y),b=D(w.uniforms.uCamera),k=D(w.uniforms.uMaterial),M=D(w.uniforms.uShape),d=D(w.uniforms.uLayer);b.set({transform:g.identity()}),M.set({transform:g.scaling([.1,.1,.1])}),d.set({transform:g.scaling([.5,.5,.5])}),k.set({fill:[1,1,1,1],stroke:[1,1,1,1],strokeWidth:10});const K=n=>{const e=Math.min(...n);return g.scaling([e/n[0],e/n[1],1])},$={onCreate(n){var S;console.log("InstancedSimplicialMeshView::onCreate");const{device:e,format:t}=n;if(h||((S=r.onCreate)==null||S.call(r,n),!u))return;const{shapeVertices:i,layerVertices:f}=u,m=e.createShaderModule({code:Y}),c=e.createBuffer({size:b.arrayBuffer.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),I=e.createBuffer({size:k.arrayBuffer.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),_=e.createBuffer({size:M.arrayBuffer.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),V=e.createBuffer({size:d.arrayBuffer.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});h=Object.fromEntries(Object.entries(de).map(([P,L])=>{const B=e.createRenderPipeline({layout:"auto",vertex:{module:m,entryPoint:"vertexMain",buffers:[...i.bufferLayouts,...f.bufferLayouts]},fragment:{module:m,entryPoint:"fragmentMain",targets:[{format:t}]},primitive:{topology:L}}),U=e.createBindGroup({layout:B.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:c}},{binding:1,resource:{buffer:I}},{binding:2,resource:{buffer:_}},{binding:3,resource:{buffer:V}}]});return[P,{pipeline:B,bindGroup:U,camera:c,material:I,shape:_,layer:V}]}))},onRender(n){var U;const{device:e,context:t}=n;if(!h||((U=r.onUpdate)==null||U.call(r,n),!u))return;const{shapeVertices:i,layerVertices:f}=u,m=e.createCommandEncoder(),c=m.beginRenderPass({colorAttachments:[{clearValue:Float32Array.of(0,0,0,0),loadOp:"clear",storeOp:"store",view:t.getCurrentTexture().createView()}]}),{pipeline:I,bindGroup:_,camera:V,material:S,shape:P,layer:L}=h[u.topology];b.set({transform:K([1920,1080])}),k.set({fill:N(o.material.fill).gl(),stroke:N(o.material.stroke).gl(),strokeWidth:o.material.strokeWidth}),e.queue.writeBuffer(V,0,b.arrayBuffer),e.queue.writeBuffer(S,0,k.arrayBuffer),e.queue.writeBuffer(P,0,M.arrayBuffer),e.queue.writeBuffer(L,0,d.arrayBuffer),c.setPipeline(I),c.setBindGroup(0,_),c.setVertexBuffer(0,i.buffers[0]),c.setVertexBuffer(1,f.buffers[0]),c.setIndexBuffer(i.indexBuffer,i.indexFormat),c.drawIndexed(i.numElements,f.numElements),c.end();const B=m.finish();e.queue.submit([B])},onDelete(n){var e;console.log("InstancedSimplicialMeshView::Delete"),h&&((e=r.onDelete)==null||e.call(r,n),h=null)}},C={down:!1},J=n=>{const e=[0,0,0];switch(n){case"ArrowLeft":e[0]-=1;break;case"ArrowUp":e[1]+=1;break;case"ArrowRight":e[0]+=1;break;case"ArrowDown":e[1]-=1;break}return e},X={keydown:n=>{console.log(n)},keyup:n=>{const e=J(n.key),t=n.shiftKey?.5:.05;g.translate(d.views.transform,[e[0]*t,e[1]*t,e[2]*t],d.views.transform)},pointerdown:n=>{C.down=!0,n.target.setPointerCapture(n.pointerId)},pointermove:n=>{if(!C.down)return;const e=n.target,t=[e.width,e.height],i=Math.min(...t),f=[+n.movementX*4/i,-n.movementY*4/i,0];g.translate(d.views.transform,[f[0],f[1],f[2]],d.views.transform)},pointerup:n=>{C.down=!1},wheel:n=>{const e=1+n.deltaY/100;g.scale(d.views.transform,[e,e,1],d.views.transform)}},H={alphaMode:"premultiplied",autoResize:!1},O=n=>{try{const e=j(n.source);z.value=ce.parse(e),r.valid=!1}catch(e){if(e instanceof SyntaxError)console.error(e.message);else if(e instanceof ue)for(let t of e.issues)console.error(t.message);else throw e}},Q=n=>{switch(n.key){case"Enter":return n.shiftKey;case"s":case"S":return n.ctrlKey||n.metaKey;default:return!1}};return ne(document,"keydown",n=>{Q(n)&&(n.stopPropagation(),n.preventDefault(),O(o))}),te(x,O,{immediate:!0}),(n,e)=>(E(),re(ae,null,[s("header",Ie,[_e,Ve,l(ge,{modelValue:x.value,"onUpdate:modelValue":e[0]||(e[0]=t=>x.value=t)},null,8,["modelValue"]),l(he)]),l(a(xe),{as:"main",class:"flex-grow flex flex-col overflow-hidden","default-index":2},{default:p(()=>[l(a(ye),{class:"flex flex-row md:hidden"},{default:p(()=>[l(a(A),{class:"tab"},{default:p(()=>[G("Input")]),_:1}),l(a(A),{class:"tab"},{default:p(()=>[G("Output")]),_:1})]),_:1}),l(a(ve),{class:"h-full md:grid md:grid-cols-2 border-y-2 border-border"},{default:p(()=>[l(a(q),{class:"h-full ui-not-selected:hidden md:ui-not-selected:grid grid grid-rows-1",static:!0},{default:p(()=>[l(fe,{modelValue:a(o).source,"onUpdate:modelValue":e[1]||(e[1]=t=>a(o).source=t)},null,8,["modelValue"])]),_:1}),l(a(q),{class:"h-full ui-not-selected:hidden md:ui-not-selected:grid grid grid-rows-2",static:!0},{default:p(()=>[(E(),se(oe,null,{default:p(()=>[l(be,{class:"h-full w-full object-cover show-focus",renderer:$,listeners:X,options:H})]),_:1})),s("div",null,[Se,s("div",Be,[Ue,T(s("input",{class:"w-16",name:"fill",type:"color","onUpdate:modelValue":e[2]||(e[2]=t=>a(o).material.fill=t)},null,512),[[F,a(o).material.fill]])]),s("div",De,[Me,T(s("input",{class:"w-16",name:"stroke",type:"color","onUpdate:modelValue":e[3]||(e[3]=t=>a(o).material.stroke=t)},null,512),[[F,a(o).material.stroke]])]),s("div",Ce,[Pe,T(s("input",{class:"w-16",name:"strokeWidth",type:"number","onUpdate:modelValue":e[4]||(e[4]=t=>a(o).material.strokeWidth=t)},null,512),[[F,a(o).material.strokeWidth]])])])]),_:1})]),_:1})]),_:1})],64))}}),Ge=ke(Te,[["__scopeId","data-v-186cab30"]]);export{Ge as default};
