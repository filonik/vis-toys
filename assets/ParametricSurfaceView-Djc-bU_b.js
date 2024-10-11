import{d as K,r as S,t as q,u as W,w as X,c as Z,a as l,b as u,e as p,f as s,F as H,o as U,g as B,_ as J,h as Q,S as ee,i as _,v as h}from"./index-BuIB1ruo.js";import{m as te,a as ae,b as v,_ as ne,c as oe,p as se,x as M,I as re,y as F,d as ie,e as ce,f as le,P as ue,g as de,h as fe,l as me,i as pe,r as g,j as ve}from"./meshes-BWoDo7Ww.js";const we={class:"flex flex-row items-center h-12 p-1 border-b-2 border-border"},ge=l("h1",{class:"px-2"},"Parametric Surface",-1),xe=l("span",{class:"flex-grow"},null,-1),ye={class:"p-2"},_e=l("h2",{class:"my-2 text-lg"},"Domains",-1),he={class:"flex flex-row items-center gap-2"},Ie=l("span",{class:"w-8 text-sm text-right"},"x0:",-1),Ve={class:"flex flex-row items-center gap-2"},be=l("span",{class:"w-8 text-sm text-right"},"x1:",-1),Pe=`@plot
fn f(x: vec2f) -> vec3f {
  return vec3f(x, sin(x[0])*cos(x[1]));
}`,R=`
struct CameraData {
  projection: mat4x4f,
  view: mat4x4f,
  model: mat4x4f,
}
  
@group(0) @binding(0) var<uniform> uCamera: CameraData;`,Ue=K({__name:"ParametricSurfaceView",setup(Ce){const x=S({source:Pe,domains:[[-Math.PI,+Math.PI],[-Math.PI,+Math.PI],[-Math.PI,+Math.PI]],material:{fill:"#ffffff",stroke:"#888888",strokeWidth:10}}),o=q(x),A=(e,t)=>`fn surface(position: vec4f) -> vec4f {
  return vec4(1.0, f(position.yz));
}`,G=(e,t)=>`
struct VertexIn {
  @location(0) position: vec4f,
  @location(1) color: vec4f,
}

struct FragmentIn {
  @builtin(position) position: vec4f,
  @location(0) color: vec4f,
}

struct VaryingData {
  position: vec4f,
  color: vec4f,
}

${R}

${e}

${t}

fn fromVertexIn(in: VertexIn) -> VaryingData {
  return VaryingData(
    uCamera.view * surface(uCamera.model * in.position),
    in.color,
  );
}

fn toFragmentIn(in: VaryingData) -> FragmentIn {
  return FragmentIn(
    uCamera.projection * in.position.yzwx,
    in.color,
  );
}

@vertex
fn vertexMain(in: VertexIn) -> FragmentIn {
  return toFragmentIn(fromVertexIn(in));
}

@fragment
fn fragmentMain(in: FragmentIn) -> @location(0) vec4f {
  return in.color;
}
`,V=S(""),k=te(R),d=ae(k.uniforms.uCamera);d.set({projection:v.perspective(Math.PI/4,1920/1080,.1,1e3),view:v.translation([0,0,-3]),model:v.identity()});const E={alphaMode:"premultiplied",autoResize:!1},b=e=>{const t={state:null,valid:!1,onCreate(a){console.log("Resource::onCreate"),!t.state&&(t.state=e.create(a))},onUpdate(a){var r,n;t.valid||((r=t.onDelete)==null||r.call(t,a),(n=t.onCreate)==null||n.call(t,a),t.valid=!0)},onDelete(a){console.log("Resource::onDelete"),t.state&&(e.delete(a,t.state),t.state=null)}};return t},$=e=>fe(e.map(t=>me(-1,1,t))),L=e=>{const t=e.length,a=pe(e);switch(t){case 1:return g(0,e[0]-1).map(n=>[(n+0)*a[0],(n+1)*a[0]]);case 2:{const r=g(0,e[0]).map(f=>g(0,e[1]-1).map(m=>[f*a[0]+(m+0)*a[1],f*a[0]+(m+1)*a[1]])),n=g(0,e[1]).map(f=>g(0,e[0]-1).map(m=>[(m+0)*a[0]+f*a[1],(m+1)*a[0]+f*a[1]]));return ve(r.flat(1),n.flat(1))}}return[]},O=e=>{const t=$(e).map(n=>[1,n[0]??0,n[1]??0,n[2]??0]),a=de([1,1,1,1],t.length),r=L(e);return{position:{data:t.flat(1),type:Float32Array,numComponents:4},color:{data:a.flat(1),type:Float32Array,numComponents:4},indices:{data:r.flat(1),type:Uint32Array}}},i=b({create({device:e}){const t=O([51,51]);return{vertices:le(e,t,{shaderLocation:0,stepMode:"vertex",interleave:!0}),topology:1}},delete({device:e},t){}}),c=b({create({device:e,format:t}){const a=e.createShaderModule({code:G(V.value,A())});if(!i.state)return null;const{vertices:r}=i.state,n=e.createRenderPipeline({layout:"auto",vertex:{module:a,entryPoint:"vertexMain",buffers:r.bufferLayouts},fragment:{module:a,entryPoint:"fragmentMain",targets:[{format:t}]},primitive:{topology:ue[1]}}),f=e.createBuffer({size:d.arrayBuffer.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),m=e.createBindGroup({layout:n.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:f}}]});return{pipeline:n,bindGroup:m,camera:f}},delete({device:e},t){}}),w={state:null,onCreate(e){var t,a;console.log("ParametricSurfaceView::onCreate"),!w.state&&((t=i.onUpdate)==null||t.call(i,e),i.state&&((a=c.onUpdate)==null||a.call(c,e),c.state&&(w.state={})))},onRender(e){var C,D;const{device:t,context:a}=e;if(!w.state||((C=i.onUpdate)==null||C.call(i,e),!i.state)||((D=c.onUpdate)==null||D.call(c,e),!c.state))return;const r=t.createCommandEncoder(),n=r.beginRenderPass({colorAttachments:[{clearValue:Float32Array.of(0,0,0,0),loadOp:"clear",storeOp:"store",view:a.getCurrentTexture().createView()}]}),{pipeline:f,camera:m,bindGroup:Y}=c.state,{vertices:y}=i.state;v.scaling([(o.domains[0][1]-o.domains[0][0])/2,(o.domains[1][1]-o.domains[1][0])/2,(o.domains[2][1]-o.domains[2][0])/2],d.views.model),t.queue.writeBuffer(m,0,d.arrayBuffer),n.setPipeline(f),n.setBindGroup(0,Y),n.setVertexBuffer(0,y.buffers[0]),n.setIndexBuffer(y.indexBuffer,y.indexFormat),n.drawIndexed(y.numElements),n.end();const j=r.finish();t.queue.submit([j])},onDelete(e){var t,a;console.log("ParametricSurfaceView::Delete"),w.state&&((t=c.onDelete)==null||t.call(c,e),(a=i.onDelete)==null||a.call(i,e),w.state=null)}},I={down:!1},T={pointerdown:e=>{I.down=!0,e.target.setPointerCapture(e.pointerId)},pointermove:e=>{if(!I.down)return;const t=e.target,a=[t.width,t.height],r=Math.min(...a),n=[+e.movementX*4/r,+e.movementY*4/r,0];v.rotateZ(d.views.view,n[0],d.views.view),v.rotateY(d.views.view,n[1],d.views.view)},pointerup:e=>{I.down=!1},wheel:e=>{const t=e.deltaY/100;v.translate(d.views.view,[0,0,t],d.views.view)}},z=e=>e.replace("@plot","/*@plot*/"),P=e=>{V.value=z(e.source),c.valid=!1},N=e=>{switch(e.key){case"Enter":return e.shiftKey;case"s":case"S":return e.ctrlKey||e.metaKey;default:return!1}};return W(document,"keydown",e=>{N(e)&&(e.stopPropagation(),e.preventDefault(),P(o))}),X(x,P,{immediate:!0}),(e,t)=>(U(),Z(H,null,[l("header",we,[ge,xe,u(ne,{modelValue:x.value,"onUpdate:modelValue":t[0]||(t[0]=a=>x.value=a)},null,8,["modelValue"]),u(oe)]),u(s(ce),{as:"main",class:"flex-grow flex flex-col overflow-hidden","default-index":2},{default:p(()=>[u(s(se),{class:"flex flex-row md:hidden"},{default:p(()=>[u(s(M),{class:"tab"},{default:p(()=>[B("Input")]),_:1}),u(s(M),{class:"tab"},{default:p(()=>[B("Output")]),_:1})]),_:1}),u(s(re),{class:"h-full md:grid md:grid-cols-2 border-y-2 border-border"},{default:p(()=>[u(s(F),{class:"h-full ui-not-selected:hidden md:ui-not-selected:grid grid grid-rows-1",static:!0},{default:p(()=>[u(J,{modelValue:s(o).source,"onUpdate:modelValue":t[1]||(t[1]=a=>s(o).source=a)},null,8,["modelValue"])]),_:1}),u(s(F),{class:"h-full ui-not-selected:hidden md:ui-not-selected:grid grid grid-rows-2",static:!0},{default:p(()=>[(U(),Q(ee,null,{default:p(()=>[u(ie,{class:"h-full w-full object-cover",renderer:w,listeners:T,options:E})]),_:1})),l("div",ye,[_e,l("div",he,[Ie,_(l("input",{class:"w-16",name:"domain00",type:"number",step:"0.1","onUpdate:modelValue":t[2]||(t[2]=a=>s(o).domains[0][0]=a)},null,512),[[h,s(o).domains[0][0]]]),_(l("input",{class:"w-16",name:"domain01",type:"number",step:"0.1","onUpdate:modelValue":t[3]||(t[3]=a=>s(o).domains[0][1]=a)},null,512),[[h,s(o).domains[0][1]]])]),l("div",Ve,[be,_(l("input",{class:"w-16",name:"domain10",type:"number",step:"0.1","onUpdate:modelValue":t[4]||(t[4]=a=>s(o).domains[1][0]=a)},null,512),[[h,s(o).domains[1][0]]]),_(l("input",{class:"w-16",name:"domain11",type:"number",step:"0.1","onUpdate:modelValue":t[5]||(t[5]=a=>s(o).domains[1][1]=a)},null,512),[[h,s(o).domains[1][1]]])])])]),_:1})]),_:1})]),_:1})],64))}});export{Ue as default};
