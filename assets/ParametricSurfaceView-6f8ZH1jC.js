import{d as le,r as T,t as de,u as me,w as fe,c as b,a as c,b as v,e as h,f as w,F as N,o as _,g as O,_ as pe,h as ve,S as xe,i as we,j as ge,k as M,v as U,l as A}from"./index-AwyQvBZw.js";import{d as he,a as _e,s as ye,m as Ve,b as be,c as y,_ as Me,e as Ue,p as Ie,x as Y,I as Ce,y as K,f as Se,g as Pe,h as R,i as De,P as Fe,j as Be,l as $e,k as Ae,r as u,n as W}from"./meshes-BYiE_D9j.js";const Re=m=>f=>f.map(m),ke=m=>m.length,Ee=m=>Math.min(...m),Ge=m=>Ee(m.map(ke)),ze=m=>(...f)=>Array.from({length:Ge(f)},(g,I)=>m(...f.map(D=>D[I]))),Le=ze,X=Le,Te=X(_e),Ne=X(ye),Oe=m=>(f,g)=>Re(I=>m(I,g))(f),q=Oe(he),Ye=()=>`
const PI = radians(180.0);
const TAU = radians(360.0);
`,Ke={class:"flex flex-row items-center h-12 p-1 border-b-2 border-border"},We=c("h1",{class:"px-2"},"Parametric Surface",-1),qe=c("span",{class:"flex-grow"},null,-1),je={class:"flex flex-row items-center justify-center overflow-hidden"},Xe={class:"flex flex-col p-2"},Ze={class:"my-2 text-lg"},He={key:0,class:"flex flex-row items-center gap-2"},Je=c("span",{class:"w-8 text-xs text-right font-mono"},"x[0]:",-1),Qe=["onUpdate:modelValue"],et=["onUpdate:modelValue"],tt={key:1,class:"flex flex-row items-center gap-2"},nt=c("span",{class:"w-8 text-xs text-right font-mono"},"x[1]:",-1),at=["onUpdate:modelValue"],ot=["onUpdate:modelValue"],st={key:2,class:"flex flex-row items-center gap-2"},rt=c("span",{class:"w-8 text-xs text-right font-mono"},"x[2]:",-1),ct=["onUpdate:modelValue"],it=["onUpdate:modelValue"],ut=`@plot
fn f(x: f32) -> vec2f {
  return vec2f(x, sin(x));
}

@plot
fn g(x: f32) -> vec2f {
  return vec2f(x, cos(x));
}`,j=`
struct CameraData {
  projection: mat4x4f,
  view: mat4x4f,
  model: mat4x4f,
}
  
@group(0) @binding(0) var<uniform> uCamera: CameraData;`,mt=le({__name:"ParametricSurfaceView",setup(m){const f=T({source:ut,output:{functions:[]},material:{fill:"#ffffff",stroke:"#888888",strokeWidth:10}}),g=de(f),I=(e,n)=>{const t=o=>{switch(o){case 1:return"position.y";case 2:return"position.yz";case 3:return"position.yzw";default:return"0.0"}};return`fn surface(position: vec4f) -> vec4f {
  return ${(o=>r=>{switch(o){case 1:return`vec4(1.0, ${r}, 0.0, 0.0)`;case 2:return`vec4(1.0, ${r}, 0.0)`;case 3:return`vec4(1.0, ${r})`;default:return"vec4(1.0, 0.0, 0.0, 0.0)"}})(n)(`f(${t(e)})`)};
}`},D=(e,n)=>`
${Ye()}

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

${j}

${e}

${n}

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
`,C=T(null),Z=Ve(j),x=be(Z.uniforms.uCamera);x.set({projection:y.perspective(Math.PI/4,1920/1080,.1,1e3),view:y.translation([0,0,-3]),model:y.identity()});const H={alphaMode:"premultiplied",size:[1920,1080],autoResize:!1},k=e=>{const n={state:null,valid:!1,onCreate(t){console.log("Resource::onCreate"),!n.state&&(n.state=e.create(t))},onUpdate(t){var a,o;n.valid||((a=n.onDelete)==null||a.call(n,t),(o=n.onCreate)==null||o.call(n,t),n.valid=!0)},onDelete(t){console.log("Resource::onDelete"),n.state&&(e.delete(t,n.state),n.state=null)}};return n},J=e=>Be(e.map(n=>$e(-1,1,n))),Q=e=>{const n=e.length,t=Ae(e);switch(n){case 1:return u(0,e[0]-1).map(o=>[(o+0)*t[0],(o+1)*t[0]]);case 2:{const a=u(0,e[0]).flatMap(r=>u(0,e[1]-1).map(s=>[r*t[0]+(s+0)*t[1],r*t[0]+(s+1)*t[1]])),o=u(0,e[1]).flatMap(r=>u(0,e[0]-1).map(s=>[(s+0)*t[0]+r*t[1],(s+1)*t[0]+r*t[1]]));return W(a,o)}case 3:{const a=u(0,e[0]).flatMap(s=>u(0,e[1]).flatMap(p=>u(0,e[2]-1).map(d=>[s*t[0]+p*t[1]+(d+0)*t[2],s*t[0]+p*t[1]+(d+1)*t[2]]))),o=u(0,e[0]).flatMap(s=>u(0,e[2]).flatMap(p=>u(0,e[1]-1).map(d=>[s*t[0]+(d+0)*t[1]+p*t[2],s*t[0]+(d+1)*t[1]+p*t[2]]))),r=u(0,e[1]).flatMap(s=>u(0,e[2]).flatMap(p=>u(0,e[0]-1).map(d=>[(d+0)*t[0]+s*t[1]+p*t[2],(d+1)*t[0]+s*t[1]+p*t[2]])));return W(a,o,r)}}return[]},ee=e=>{const n=J(e).map(o=>[1,o[0]??0,o[1]??0,o[2]??0]),t=R([1,1,1,1],n.length),a=Q(e);return{position:{data:n.flat(1),type:Float32Array,numComponents:4},color:{data:t.flat(1),type:Float32Array,numComponents:4},indices:{data:a.flat(1),type:Uint32Array}}},te=e=>[[],[Math.pow(e,3*2)],[Math.pow(e,3),Math.pow(e,3)],[Math.pow(e,2),Math.pow(e,2),Math.pow(e,2)]],i=k({create({device:e}){return te(3).map(ee).map(t=>({vertices:De(e,t,{shaderLocation:0,stepMode:"vertex",interleave:!0}),topology:1}))},delete({device:e},n){}}),F=e=>{switch(e.name){case"f32":return 1;case"vec2f":return 2;case"vec3f":return 3;case"vec4f":return 4}return 0},E=e=>[F(e.domain),F(e.codomain)],ne=e=>{const n=F(e.domain);return[R(-1,n),R(1,n)]},ae=e=>{const n=q(Te(e[0],e[1]),2),t=q(Ne(e[0],e[1]),2);return y.st(t,n)},l=k({create({device:e,format:n}){if(!C.value)return null;const{source:t,info:a}=C.value,[o,r]=E(a.functions[0]),s=e.createShaderModule({code:D(t,I(o,r))});if(!i.state)return null;const{vertices:p}=i.state[o],d=e.createRenderPipeline({layout:"auto",vertex:{module:s,entryPoint:"vertexMain",buffers:p.bufferLayouts},fragment:{module:s,entryPoint:"fragmentMain",targets:[{format:n}]},primitive:{topology:Fe[1]}}),S=e.createBuffer({size:x.arrayBuffer.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),$=e.createBindGroup({layout:d.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:S}}]});return{pipeline:d,bindGroup:$,camera:S}},delete({device:e},n){}}),V={state:null,onCreate(e){var n,t;console.log("ParametricSurfaceView::onCreate"),!V.state&&((n=i.onUpdate)==null||n.call(i,e),i.state&&((t=l.onUpdate)==null||t.call(l,e),l.state&&(V.state={})))},onRender(e){var z,L;const{device:n,context:t}=e;if(!V.state||((z=i.onUpdate)==null||z.call(i,e),!i.state)||((L=l.onUpdate)==null||L.call(l,e),!l.state))return;const a=n.createCommandEncoder(),o=a.beginRenderPass({colorAttachments:[{clearValue:Float32Array.of(0,0,0,0),loadOp:"clear",storeOp:"store",view:t.getCurrentTexture().createView()}]});if(!C.value)return null;const{info:r}=C.value,[s,p]=E(r.functions[0]),{pipeline:d,camera:S,bindGroup:$}=l.state,{vertices:P}=i.state[s],ie=g.output.functions[0];x.set({model:ae(ie.extent)}),n.queue.writeBuffer(S,0,x.arrayBuffer),o.setPipeline(d),o.setBindGroup(0,$),o.setVertexBuffer(0,P.buffers[0]),o.setIndexBuffer(P.indexBuffer,P.indexFormat),o.drawIndexed(P.numElements),o.end();const ue=a.finish();n.queue.submit([ue])},onDelete(e){var n,t;console.log("ParametricSurfaceView::Delete"),V.state&&((n=l.onDelete)==null||n.call(l,e),(t=i.onDelete)==null||t.call(i,e),V.state=null)}},B={down:!1},oe={pointerdown:e=>{B.down=!0,e.target.setPointerCapture(e.pointerId)},pointermove:e=>{if(!B.down)return;const n=e.target,t=[n.width,n.height],a=Math.min(...t),o=[+e.movementX*4/a,+e.movementY*4/a,0];y.rotateZ(x.views.view,o[0],x.views.view),y.rotateY(x.views.view,o[1],x.views.view)},pointerup:e=>{B.down=!1},wheel:e=>{const n=e.deltaY/100;y.translate(x.views.view,[0,0,n],x.views.view)}},se=e=>{const n=/@plot\s+fn\s+(?<name>\w+)\s*\(\w+:\s*(?<domain>\w+)\)\s*->\s*(?<codomain>\w+)/g,t=[];let a;do a=n.exec(e),a&&a.groups&&t.push({name:a.groups.name,domain:{name:a.groups.domain},codomain:{name:a.groups.codomain}});while(a);return{functions:t}},re=e=>({source:e.replaceAll("@plot","/*@plot*/"),info:se(e)}),G=e=>{const n=re(e.source);C.value=n,e.output={functions:n.info.functions.map(t=>({name:t.name,extent:ne(t)}))},l.valid=!1},ce=e=>{switch(e.key){case"Enter":return e.shiftKey;case"s":case"S":return e.ctrlKey||e.metaKey;default:return!1}};return me(document,"keydown",e=>{ce(e)&&(e.stopPropagation(),e.preventDefault(),G(g))}),fe(f,G,{immediate:!0}),(e,n)=>(_(),b(N,null,[c("header",Ke,[We,qe,v(Me,{modelValue:f.value,"onUpdate:modelValue":n[0]||(n[0]=t=>f.value=t)},null,8,["modelValue"]),v(Ue)]),v(w(Pe),{as:"main",class:"flex-grow flex flex-col overflow-hidden","default-index":2},{default:h(()=>[v(w(Ie),{class:"flex flex-row md:hidden"},{default:h(()=>[v(w(Y),{class:"tab"},{default:h(()=>[O("Input")]),_:1}),v(w(Y),{class:"tab"},{default:h(()=>[O("Output")]),_:1})]),_:1}),v(w(Ce),{class:"h-full md:grid md:grid-cols-2 border-y-2 border-border"},{default:h(()=>[v(w(K),{class:"h-full ui-not-selected:hidden md:ui-not-selected:grid grid grid-rows-1 overflow-hidden",static:!0},{default:h(()=>[v(pe,{modelValue:w(g).source,"onUpdate:modelValue":n[1]||(n[1]=t=>w(g).source=t)},null,8,["modelValue"])]),_:1}),v(w(K),{class:"h-full ui-not-selected:hidden md:ui-not-selected:grid grid grid-rows-2 overflow-hidden",static:!0},{default:h(()=>[(_(),ve(xe,null,{default:h(()=>[c("div",je,[v(Se,{renderer:V,listeners:oe,options:H})])]),_:1})),c("div",Xe,[(_(!0),b(N,null,we(w(g).output.functions,t=>(_(),b("div",null,[c("h2",Ze,ge(t.name),1),t.extent[0].length>0?(_(),b("div",He,[Je,M(c("input",{class:"w-16",name:"domain00",type:"number",step:"0.1","onUpdate:modelValue":a=>t.extent[0][0]=a},null,8,Qe),[[U,t.extent[0][0]]]),M(c("input",{class:"w-16",name:"domain01",type:"number",step:"0.1","onUpdate:modelValue":a=>t.extent[1][0]=a},null,8,et),[[U,t.extent[1][0]]])])):A("",!0),t.extent[0].length>1?(_(),b("div",tt,[nt,M(c("input",{class:"w-16",name:"domain10",type:"number",step:"0.1","onUpdate:modelValue":a=>t.extent[0][1]=a},null,8,at),[[U,t.extent[0][1]]]),M(c("input",{class:"w-16",name:"domain11",type:"number",step:"0.1","onUpdate:modelValue":a=>t.extent[1][1]=a},null,8,ot),[[U,t.extent[1][1]]])])):A("",!0),t.extent[0].length>2?(_(),b("div",st,[rt,M(c("input",{class:"w-16",name:"domain10",type:"number",step:"0.1","onUpdate:modelValue":a=>t.extent[0][2]=a},null,8,ct),[[U,t.extent[0][2]]]),M(c("input",{class:"w-16",name:"domain11",type:"number",step:"0.1","onUpdate:modelValue":a=>t.extent[1][2]=a},null,8,it),[[U,t.extent[1][2]]])])):A("",!0)]))),256))])]),_:1})]),_:1})]),_:1})],64))}});export{mt as default};
