import{w as re,r as O,c as T,i as Pe,p as Me,d as L,o as Ge,a as qe,n as q,b as F,e as N,f as h,u as Re,g as A,h as me,j as w,k as ne,l as B,m as K,t as G,F as Z,q as Y,v as H,s as ze,x as Ke,y as Ze,z as Ye,_ as He,A as We,S as Qe,B as Je,C as et}from"./index-Dh388K6F.js";import{c as Se,o as I,w as Ce,h as De,i as tt,u as nt,A as ae,a as ie,s as rt,N as pe,b as R,v as at,d as ve,_ as Oe,O as ot,r as M,e as $e,m as U,f as se,g as lt,l as ct,j as ut,k as _e,n as st,p as ge,q as ft,t as it,x as dt,y as ye,I as xt,z as ke,B as mt,C as pt,D as vt,E as _t,F as gt}from"./webgpu-utils.module-DfBjvYAP.js";function yt(){return/iPhone/gi.test(window.navigator.platform)||/Mac/gi.test(window.navigator.platform)&&window.navigator.maxTouchPoints>0}function kt(){return/Android/gi.test(window.navigator.userAgent)}function wt(){return yt()||kt()}function te(e,l,t){Se.isServer||re(c=>{document.addEventListener(e,l,t),c(()=>document.removeEventListener(e,l,t))})}function ht(e,l,t){Se.isServer||re(c=>{window.addEventListener(e,l,t),c(()=>window.removeEventListener(e,l,t))})}function bt(e,l,t=T(()=>!0)){function c(r,n){if(!t.value||r.defaultPrevented)return;let a=n(r);if(a===null||!a.getRootNode().contains(a))return;let i=function g(v){return typeof v=="function"?g(v()):Array.isArray(v)||v instanceof Set?v:[v]}(e);for(let g of i){if(g===null)continue;let v=g instanceof HTMLElement?g:I(g);if(v!=null&&v.contains(a)||r.composed&&r.composedPath().includes(v))return}return!Ce(a,De.Loose)&&a.tabIndex!==-1&&r.preventDefault(),l(r,a)}let u=O(null);te("pointerdown",r=>{var n,a;t.value&&(u.value=((a=(n=r.composedPath)==null?void 0:n.call(r))==null?void 0:a[0])||r.target)},!0),te("mousedown",r=>{var n,a;t.value&&(u.value=((a=(n=r.composedPath)==null?void 0:n.call(r))==null?void 0:a[0])||r.target)},!0),te("click",r=>{wt()||u.value&&(c(r,()=>u.value),u.value=null)},!0),te("touchend",r=>c(r,()=>r.target instanceof HTMLElement?r.target:null),!0),ht("blur",r=>c(r,()=>window.document.activeElement instanceof HTMLIFrameElement?window.document.activeElement:null),!0)}function we(e){return[e.screenX,e.screenY]}function At(){let e=O([-1,-1]);return{wasMoved(l){let t=we(l);return e.value[0]===t[0]&&e.value[1]===t[1]?!1:(e.value=t,!0)},update(l){e.value=we(l)}}}function It({container:e,accept:l,walk:t,enabled:c}){re(()=>{let u=e.value;if(!u||c!==void 0&&!c.value)return;let r=tt(e);if(!r)return;let n=Object.assign(i=>l(i),{acceptNode:l}),a=r.createTreeWalker(u,NodeFilter.SHOW_ELEMENT,n,!1);for(;a.nextNode();)t(a.currentNode)})}let Ve=Symbol("Context");var W=(e=>(e[e.Open=1]="Open",e[e.Closed=2]="Closed",e[e.Closing=4]="Closing",e[e.Opening=8]="Opening",e))(W||{});function Pt(){return Pe(Ve,null)}function Mt(e){Me(Ve,e)}function Rt(e){throw new Error("Unexpected object: "+e)}var V=(e=>(e[e.First=0]="First",e[e.Previous=1]="Previous",e[e.Next=2]="Next",e[e.Last=3]="Last",e[e.Specific=4]="Specific",e[e.Nothing=5]="Nothing",e))(V||{});function St(e,l){let t=l.resolveItems();if(t.length<=0)return null;let c=l.resolveActiveIndex(),u=c??-1;switch(e.focus){case 0:{for(let r=0;r<t.length;++r)if(!l.resolveDisabled(t[r],r,t))return r;return c}case 1:{u===-1&&(u=t.length);for(let r=u-1;r>=0;--r)if(!l.resolveDisabled(t[r],r,t))return r;return c}case 2:{for(let r=u+1;r<t.length;++r)if(!l.resolveDisabled(t[r],r,t))return r;return c}case 3:{for(let r=t.length-1;r>=0;--r)if(!l.resolveDisabled(t[r],r,t))return r;return c}case 4:{for(let r=0;r<t.length;++r)if(l.resolveId(t[r],r,t)===e.id)return r;return c}case 5:return null;default:Rt(e)}}let he=/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;function be(e){var l,t;let c=(l=e.innerText)!=null?l:"",u=e.cloneNode(!0);if(!(u instanceof HTMLElement))return c;let r=!1;for(let a of u.querySelectorAll('[hidden],[aria-hidden],[role="img"]'))a.remove(),r=!0;let n=r?(t=u.innerText)!=null?t:"":c;return he.test(n)&&(n=n.replace(he,"")),n}function Ct(e){let l=e.getAttribute("aria-label");if(typeof l=="string")return l.trim();let t=e.getAttribute("aria-labelledby");if(t){let c=t.split(" ").map(u=>{let r=document.getElementById(u);if(r){let n=r.getAttribute("aria-label");return typeof n=="string"?n.trim():be(r).trim()}return null}).filter(Boolean);if(c.length>0)return c.join(", ")}return be(e).trim()}function Dt(e){let l=O(""),t=O("");return()=>{let c=I(e);if(!c)return"";let u=c.innerText;if(l.value===u)return t.value;let r=Ct(c).trim().toLowerCase();return l.value=u,t.value=r,r}}var Ot=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(Ot||{}),$t=(e=>(e[e.Pointer=0]="Pointer",e[e.Other=1]="Other",e))($t||{});function Vt(e){requestAnimationFrame(()=>requestAnimationFrame(e))}let Be=Symbol("MenuContext");function oe(e){let l=Pe(Be,null);if(l===null){let t=new Error(`<${e} /> is missing a parent <Menu /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(t,oe),t}return l}let Bt=L({name:"Menu",props:{as:{type:[Object,String],default:"template"}},setup(e,{slots:l,attrs:t}){let c=O(1),u=O(null),r=O(null),n=O([]),a=O(""),i=O(null),g=O(1);function v(o=p=>p){let p=i.value!==null?n.value[i.value]:null,d=ot(o(n.value.slice()),S=>I(S.dataRef.domRef)),_=p?d.indexOf(p):null;return _===-1&&(_=null),{items:d,activeItemIndex:_}}let m={menuState:c,buttonRef:u,itemsRef:r,items:n,searchQuery:a,activeItemIndex:i,activationTrigger:g,closeMenu:()=>{c.value=1,i.value=null},openMenu:()=>c.value=0,goToItem(o,p,d){let _=v(),S=St(o===V.Specific?{focus:V.Specific,id:p}:{focus:o},{resolveItems:()=>_.items,resolveActiveIndex:()=>_.activeItemIndex,resolveId:b=>b.id,resolveDisabled:b=>b.dataRef.disabled});a.value="",i.value=S,g.value=d??1,n.value=_.items},search(o){let p=a.value!==""?0:1;a.value+=o.toLowerCase();let d=(i.value!==null?n.value.slice(i.value+p).concat(n.value.slice(0,i.value+p)):n.value).find(S=>S.dataRef.textValue.startsWith(a.value)&&!S.dataRef.disabled),_=d?n.value.indexOf(d):-1;_===-1||_===i.value||(i.value=_,g.value=1)},clearSearch(){a.value=""},registerItem(o,p){let d=v(_=>[..._,{id:o,dataRef:p}]);n.value=d.items,i.value=d.activeItemIndex,g.value=1},unregisterItem(o){let p=v(d=>{let _=d.findIndex(S=>S.id===o);return _!==-1&&d.splice(_,1),d});n.value=p.items,i.value=p.activeItemIndex,g.value=1}};return bt([u,r],(o,p)=>{var d;m.closeMenu(),Ce(p,De.Loose)||(o.preventDefault(),(d=I(u))==null||d.focus())},T(()=>c.value===0)),Me(Be,m),Mt(T(()=>nt(c.value,{0:W.Open,1:W.Closed}))),()=>{let o={open:c.value===0,close:m.closeMenu};return ae({ourProps:{},theirProps:e,slot:o,slots:l,attrs:t,name:"Menu"})}}}),Ft=L({name:"MenuButton",props:{disabled:{type:Boolean,default:!1},as:{type:[Object,String],default:"button"},id:{type:String,default:null}},setup(e,{attrs:l,slots:t,expose:c}){var u;let r=(u=e.id)!=null?u:`headlessui-menu-button-${ie()}`,n=oe("MenuButton");c({el:n.buttonRef,$el:n.buttonRef});function a(m){switch(m.key){case R.Space:case R.Enter:case R.ArrowDown:m.preventDefault(),m.stopPropagation(),n.openMenu(),q(()=>{var o;(o=I(n.itemsRef))==null||o.focus({preventScroll:!0}),n.goToItem(V.First)});break;case R.ArrowUp:m.preventDefault(),m.stopPropagation(),n.openMenu(),q(()=>{var o;(o=I(n.itemsRef))==null||o.focus({preventScroll:!0}),n.goToItem(V.Last)});break}}function i(m){switch(m.key){case R.Space:m.preventDefault();break}}function g(m){e.disabled||(n.menuState.value===0?(n.closeMenu(),q(()=>{var o;return(o=I(n.buttonRef))==null?void 0:o.focus({preventScroll:!0})})):(m.preventDefault(),n.openMenu(),Vt(()=>{var o;return(o=I(n.itemsRef))==null?void 0:o.focus({preventScroll:!0})})))}let v=rt(T(()=>({as:e.as,type:l.type})),n.buttonRef);return()=>{var m;let o={open:n.menuState.value===0},{...p}=e,d={ref:n.buttonRef,id:r,type:v.value,"aria-haspopup":"menu","aria-controls":(m=I(n.itemsRef))==null?void 0:m.id,"aria-expanded":n.menuState.value===0,onKeydown:a,onKeyup:i,onClick:g};return ae({ourProps:d,theirProps:p,slot:o,attrs:l,slots:t,name:"MenuButton"})}}}),Nt=L({name:"MenuItems",props:{as:{type:[Object,String],default:"div"},static:{type:Boolean,default:!1},unmount:{type:Boolean,default:!0},id:{type:String,default:null}},setup(e,{attrs:l,slots:t,expose:c}){var u;let r=(u=e.id)!=null?u:`headlessui-menu-items-${ie()}`,n=oe("MenuItems"),a=O(null);c({el:n.itemsRef,$el:n.itemsRef}),It({container:T(()=>I(n.itemsRef)),enabled:T(()=>n.menuState.value===0),accept(o){return o.getAttribute("role")==="menuitem"?NodeFilter.FILTER_REJECT:o.hasAttribute("role")?NodeFilter.FILTER_SKIP:NodeFilter.FILTER_ACCEPT},walk(o){o.setAttribute("role","none")}});function i(o){var p;switch(a.value&&clearTimeout(a.value),o.key){case R.Space:if(n.searchQuery.value!=="")return o.preventDefault(),o.stopPropagation(),n.search(o.key);case R.Enter:if(o.preventDefault(),o.stopPropagation(),n.activeItemIndex.value!==null){let d=n.items.value[n.activeItemIndex.value];(p=I(d.dataRef.domRef))==null||p.click()}n.closeMenu(),Oe(I(n.buttonRef));break;case R.ArrowDown:return o.preventDefault(),o.stopPropagation(),n.goToItem(V.Next);case R.ArrowUp:return o.preventDefault(),o.stopPropagation(),n.goToItem(V.Previous);case R.Home:case R.PageUp:return o.preventDefault(),o.stopPropagation(),n.goToItem(V.First);case R.End:case R.PageDown:return o.preventDefault(),o.stopPropagation(),n.goToItem(V.Last);case R.Escape:o.preventDefault(),o.stopPropagation(),n.closeMenu(),q(()=>{var d;return(d=I(n.buttonRef))==null?void 0:d.focus({preventScroll:!0})});break;case R.Tab:o.preventDefault(),o.stopPropagation(),n.closeMenu(),q(()=>at(I(n.buttonRef),o.shiftKey?ve.Previous:ve.Next));break;default:o.key.length===1&&(n.search(o.key),a.value=setTimeout(()=>n.clearSearch(),350));break}}function g(o){switch(o.key){case R.Space:o.preventDefault();break}}let v=Pt(),m=T(()=>v!==null?(v.value&W.Open)===W.Open:n.menuState.value===0);return()=>{var o,p;let d={open:n.menuState.value===0},{..._}=e,S={"aria-activedescendant":n.activeItemIndex.value===null||(o=n.items.value[n.activeItemIndex.value])==null?void 0:o.id,"aria-labelledby":(p=I(n.buttonRef))==null?void 0:p.id,id:r,onKeydown:i,onKeyup:g,role:"menu",tabIndex:0,ref:n.itemsRef};return ae({ourProps:S,theirProps:_,slot:d,attrs:l,slots:t,features:pe.RenderStrategy|pe.Static,visible:m.value,name:"MenuItems"})}}}),Tt=L({name:"MenuItem",inheritAttrs:!1,props:{as:{type:[Object,String],default:"template"},disabled:{type:Boolean,default:!1},id:{type:String,default:null}},setup(e,{slots:l,attrs:t,expose:c}){var u;let r=(u=e.id)!=null?u:`headlessui-menu-item-${ie()}`,n=oe("MenuItem"),a=O(null);c({el:a,$el:a});let i=T(()=>n.activeItemIndex.value!==null?n.items.value[n.activeItemIndex.value].id===r:!1),g=Dt(a),v=T(()=>({disabled:e.disabled,get textValue(){return g()},domRef:a}));Ge(()=>n.registerItem(r,v)),qe(()=>n.unregisterItem(r)),re(()=>{n.menuState.value===0&&i.value&&n.activationTrigger.value!==0&&q(()=>{var b,j;return(j=(b=I(a))==null?void 0:b.scrollIntoView)==null?void 0:j.call(b,{block:"nearest"})})});function m(b){if(e.disabled)return b.preventDefault();n.closeMenu(),Oe(I(n.buttonRef))}function o(){if(e.disabled)return n.goToItem(V.Nothing);n.goToItem(V.Specific,r)}let p=At();function d(b){p.update(b)}function _(b){p.wasMoved(b)&&(e.disabled||i.value||n.goToItem(V.Specific,r,0))}function S(b){p.wasMoved(b)&&(e.disabled||i.value&&n.goToItem(V.Nothing))}return()=>{let{disabled:b,...j}=e,le={active:i.value,disabled:b,close:n.closeMenu};return ae({ourProps:{id:r,ref:a,role:"menuitem",tabIndex:b===!0?void 0:-1,"aria-disabled":b===!0?!0:void 0,onClick:m,onFocus:o,onPointerenter:d,onMouseenter:d,onPointermove:_,onMousemove:_,onPointerleave:S,onMouseleave:S},theirProps:{...t,...j},slot:le,attrs:t,slots:l,name:"MenuItem"})}}});function Et(e,l){return F(),N("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true","data-slot":"icon"},[h("path",{d:"M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z"}),h("path",{d:"M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z"}),h("path",{d:"M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z"})])}function Ut(e,l){return F(),N("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true","data-slot":"icon"},[h("path",{d:"M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"}),h("path",{"fill-rule":"evenodd",d:"M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z","clip-rule":"evenodd"})])}const Lt=L({__name:"ToggleVisibleButton",props:{modelValue:{type:Boolean}},emits:["update:modelValue"],setup(e,{emit:l}){const u=Re(e,"modelValue",l),r=()=>{u.value=!u.value};return(n,a)=>(F(),N("button",{class:"rounded-lg p-2",type:"button",onClick:a[0]||(a[0]=i=>r())},[A(w(Et),{class:me(["w-5 h-5",[w(u)?"hidden":"visible"]])},null,8,["class"]),A(w(Ut),{class:me(["w-5 h-5",[w(u)?"visible":"hidden"]])},null,8,["class"])]))}}),jt=["onUpdate:modelValue"],Xt=["onUpdate:modelValue"],Gt=L({__name:"ExtentInput",props:{modelValue:{}},emits:["update:modelValue"],setup(e,{emit:l}){const u=Re(e,"modelValue",l),r=(i,g)=>{u.value=[u.value[0].map((v,m)=>i==m?g[0]:v),u.value[1].map((v,m)=>i==m?g[1]:v)]},n=T(()=>M(0,u.value[0].length)),a=[{name:"-1, +1",value:[-1,1]},{name:"-π, +π",value:[-Math.PI,+Math.PI]},{name:"-π/2, +π/2",value:[-Math.PI/2,+Math.PI/2]}];return(i,g)=>(F(!0),N(Z,null,ne(n.value,v=>(F(),N("div",{class:"flex flex-row items-center gap-2",key:v},[A(w(Bt),{as:"div",class:"relative inline-block text-left"},{default:B(()=>[A(w(Ft),{class:"w-16 text-xs text-right font-mono"},{default:B(()=>[K("x["+G(v)+"]:",1)]),_:2},1024),A(w(Nt),{class:"absolute left-0 mt-2 w-32 origin-top-left divide-y divide-border bg-background-mute shadow-lg ring-1 ring-border-hover focus:outline-none z-50"},{default:B(()=>[(F(),N(Z,null,ne(a,m=>A(w(Tt),{as:"div",class:"menu-item text-center",onClick:o=>r(v,m.value)},{default:B(()=>[K(G(m.name),1)]),_:2},1032,["onClick"])),64))]),_:2},1024)]),_:2},1024),Y(h("input",{class:"w-16",type:"number",step:"0.1","onUpdate:modelValue":m=>w(u)[0][v]=m},null,8,jt),[[H,w(u)[0][v]]]),Y(h("input",{class:"w-16",type:"number",step:"0.1","onUpdate:modelValue":m=>w(u)[1][v]=m},null,8,Xt),[[H,w(u)[1][v]]])]))),128))}}),qt=$e(Gt,[["__scopeId","data-v-abc9a19b"]]),zt=(e,l)=>t=>Math.max(e,Math.min(t,l)),Ae=zt(-100,-.1);function Kt(e,l){const t=ze({isDown:!1,position:e??[-1,0,0],origin:[0,0,0]});let c;const u={wheel:a=>{a.preventDefault();const i=a.deltaY/100;t.position[0]=Ae(t.position[0]+i)},pointerdown:a=>{t.isDown=!0,a.target.setPointerCapture(a.pointerId)},pointermove:a=>{if(!t.isDown)return;const i=a.target,g=[i.width,i.height],v=Math.min(...g),m=[+a.movementX*4/v,+a.movementY*4/v,0];if(a.altKey||a.metaKey){const o=-t.position[0]/4.8;t.origin[0]+=m[0]*o,t.origin[1]-=m[1]*o}else t.position[1]+=m[0],t.position[2]+=m[1]},pointerup:a=>{t.isDown=!1},touchstart:a=>{a.preventDefault()},touchmove:a=>{if(a.preventDefault(),a.targetTouches.length===2){const i=a.targetTouches[0],g=a.targetTouches[1];let v=Math.hypot(i.pageX-g.pageX,i.pageY-g.pageY);if(c!==void 0){const m=v/c;t.position[0]=Ae(t.position[0]*m)}c=v}},touchend:a=>{a.preventDefault(),c=void 0}},r=a=>(U.identity(a),U.translate(a,[0,0,t.position[0]],a),U.rotateY(a,t.position[2],a),U.rotateZ(a,t.position[1],a),U.translate(a,t.origin,a),a),n=T(()=>r(U.create()));return{listeners:u,transform:n,transformInplace:r}}const Zt={0:"point-list",1:"line-list",2:"triangle-list"},Yt=e=>lt(e.map(l=>ct(-1,1,l))),Ht=e=>{const l=e.length,t=ut(e);switch(l){case 1:return M(0,e[0]-1).map(u=>[(u+0)*t[0],(u+1)*t[0]]);case 2:{const c=M(0,e[0]).flatMap(r=>M(0,e[1]-1).map(n=>[r*t[0]+(n+0)*t[1],r*t[0]+(n+1)*t[1]])),u=M(0,e[1]).flatMap(r=>M(0,e[0]-1).map(n=>[(n+0)*t[0]+r*t[1],(n+1)*t[0]+r*t[1]]));return _e(c,u)}case 3:{const c=M(0,e[0]).flatMap(n=>M(0,e[1]).flatMap(a=>M(0,e[2]-1).map(i=>[n*t[0]+a*t[1]+(i+0)*t[2],n*t[0]+a*t[1]+(i+1)*t[2]]))),u=M(0,e[0]).flatMap(n=>M(0,e[2]).flatMap(a=>M(0,e[1]-1).map(i=>[n*t[0]+(i+0)*t[1]+a*t[2],n*t[0]+(i+1)*t[1]+a*t[2]]))),r=M(0,e[1]).flatMap(n=>M(0,e[2]).flatMap(a=>M(0,e[0]-1).map(i=>[(i+0)*t[0]+n*t[1]+a*t[2],(i+1)*t[0]+n*t[1]+a*t[2]])));return _e(c,u,r)}}return[]},Wt=e=>{const l=Yt(e).map(u=>[1,u[0]??0,u[1]??0,u[2]??0]),t=se([1,1,1,1],l.length),c=Ht(e);return{position:{data:l.flat(1),type:Float32Array,numComponents:4},color:{data:t.flat(1),type:Float32Array,numComponents:4},indices:{data:c.flat(1),type:Uint32Array}}},Qt=`const mat2x2f_I = mat2x2f(1,0,0,1);
const mat3x3f_I = mat3x3f(1,0,0,0,1,0,0,0,1);
const mat4x4f_I = mat4x4f(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);

const N_APPROX = 25;

fn mat2x2f_expm1m_approx(A: mat2x2f) -> mat2x2f {
  var R = A;
  for(var i=0; i<N_APPROX; i++) {
    let s = (1./f32(N_APPROX-i));
    R = (mat2x2f_I + R) * (A*s);
  }
  return R;
}

fn mat3x3f_expm1m_approx(A: mat3x3f) -> mat3x3f {
  var R = A;
  for(var i=0; i<N_APPROX; i++) {
    let s = (1./f32(N_APPROX-i));
    R = (mat3x3f_I + R) * (A*s);
  }
  return R;
}

fn mat4x4f_expm1m_approx(A: mat4x4f) -> mat4x4f {
  var R = A;
  for(var i=0; i<N_APPROX; i++) {
    let s = (1./f32(N_APPROX-i));
    R = (mat4x4f_I + R) * (A*s);
  }
  return R;
}

fn mat2x2f_logp1m_approx(B: mat2x2f) -> mat2x2f {
  var R = B * (powNegOne(N_APPROX+2)/f32(N_APPROX+1));
  for(var i=0; i<N_APPROX; i++) {
    let s = powNegOne(N_APPROX-i+1)/f32(N_APPROX-i);    
    R = B * (mat2x2f_I*s + R);
  }
  return R;
}

fn mat3x3f_logp1m_approx(B: mat3x3f) -> mat3x3f {
  var R = B * (powNegOne(N_APPROX+2)/f32(N_APPROX+1));
  for(var i=0; i<N_APPROX; i++) {
    let s = powNegOne(N_APPROX-i+1)/f32(N_APPROX-i);    
    R = B * (mat3x3f_I*s + R);
  }
  return R;
}

fn mat2x2f_expm(A: mat2x2f) -> mat2x2f {
  return mat2x2f_expm1m_approx(A) + mat2x2f_I;
}

fn mat3x3f_expm(A: mat3x3f) -> mat3x3f {
  return mat3x3f_expm1m_approx(A) + mat3x3f_I;
}

fn mat4x4f_expm(A: mat4x4f) -> mat4x4f {
  return mat4x4f_expm1m_approx(A) + mat4x4f_I;
}

fn mat2x2f_logm(B: mat2x2f) -> mat2x2f {
  return mat2x2f_logp1m_approx(B - mat2x2f_I);
}

fn mat3x3f_logm(B: mat3x3f) -> mat3x3f {
  return mat3x3f_logp1m_approx(B - mat3x3f_I);
}

fn mat2x2f_adj(A: mat2x2f) -> mat2x2f {
  return mat2x2f(
    A[1][1], -A[0][1],
    -A[1][0], A[0][0],
  );
}

fn mat2x2f_mul_inv(A: mat2x2f) -> mat2x2f {
  let det = determinant(A);
  return mat2x2f_adj(A)*(1./det);
}

fn mat2x2f_mix2(A: mat2x2f, B: mat2x2f, t: vec1f) -> mat2x2f {
  let logDelta = mat2x2f_logm(mat2x2f_mul_inv(A)*B);
  return A * mat2x2f_expm(logDelta * t[0]);
}

fn mat3x3f_adj(A: mat3x3f) -> mat3x3f {
  return mat3x3f(
    A[1][1]*A[2][2] - A[1][2]*A[2][1], -A[0][1]*A[2][2] + A[0][2]*A[2][1], A[0][1]*A[1][2] - A[0][2]*A[1][1],
    -A[1][0]*A[2][2] + A[1][2]*A[2][0], A[0][0]*A[2][2] - A[0][2]*A[2][0], -A[0][0]*A[1][2] + A[0][2]*A[1][0],
    A[1][0]*A[2][1] - A[1][1]*A[2][0], -A[0][0]*A[2][1] + A[0][1]*A[2][0], A[0][0]*A[1][1] - A[0][1]*A[1][0],
  );
}

fn mat3x3f_mul_inv(A: mat3x3f) -> mat3x3f {
  let det = determinant(A);
  return mat3x3f_adj(A)*(1./det);
}
`,Jt=`struct cf32 {
  re: f32,
  im: f32,
}

fn cf32_add(x: cf32, y: cf32) -> cf32 {
  return cf32(
    x.re + y.re,
    x.im + y.im,
  );
}

fn cf32_mul(x: cf32, y: cf32) -> cf32 {
  return cf32(
    (x.re * y.re) - (x.im * y.im),
    (x.re * y.im) + (x.im * y.re),
  );
}

fn cf32_conjugate(x: cf32) -> cf32 {
  return cf32(x.re, -x.im);
}

fn cf32_norm2(x: cf32) -> f32 {
  return cf32_mul(x, cf32_conjugate(x)).re;
}

fn cf32_add_inv(x: cf32) -> cf32 {
  return cf32(-x.re, -x.im);
}

fn cf32_mul_inv(x: cf32) -> cf32 {
  let y = cf32_conjugate(x);
  let n = cf32_mul(x, y).re;
  return cf32_divs(y, n);
}

fn cf32_sub(x: cf32, y: cf32) -> cf32 {
  return cf32_add(x, cf32_add_inv(y));
}

fn cf32_div(x: cf32, y: cf32) -> cf32 {
  return cf32_mul(x, cf32_mul_inv(y));
}

fn cf32_adds(x: cf32, y: f32) -> cf32 {
  // cf32_add(x, cf32(y, 0))
  return cf32(x.re + y, x.im);
}

fn cf32_subs(x: cf32, y: f32) -> cf32 {
  // cf32_sub(x, cf32(y, 0))
  return cf32(x.re - y, x.im);
}

fn cf32_muls(x: cf32, y: f32) -> cf32 {
  // cf32_mul(x, cf32(y, 0))
  return cf32(x.re * y, x.im * y);
}

fn cf32_divs(x: cf32, y: f32) -> cf32 {
  // cf32_div(x, cf32(y, 0))
  return cf32(x.re / y, x.im / y);
}

fn cf32_rect_to_polar(x: cf32) -> cf32 {
  return cf32(
    sqrt(cf32_norm2(x)),
    atan2(x.im, x.re)
  );
}

fn cf32_polar_to_rect(x: cf32) -> cf32 {
  return cf32(
    x.re*cos(x.im),
    x.re*sin(x.im)
  );
}

fn cf32_exp_to_polar(x: cf32) -> cf32 {
    return cf32(exp(x.re), x.im);
}

fn cf32_log_to_rect(x: cf32) -> cf32 {
    return cf32(log(x.re), x.im);
}

fn cf32_exp(x: cf32) -> cf32 {
  return cf32_polar_to_rect(cf32_exp_to_polar(x));
}

fn cf32_log(x: cf32) -> cf32 {
  return cf32_log_to_rect(cf32_rect_to_polar(x));
}

fn cf32_pow(x: cf32, y: cf32) -> cf32 {
  return cf32_exp(cf32_mul(cf32_log(x), y));
}
`,en=`alias gcf32 = vec2f;

fn gc_add(x: gcf32, y: gcf32) -> gcf32 {
  return gcf32(
    x[0] + y[0],
    x[1] + y[1],
  );
}

fn gc_mul(k: f32, x: gcf32, y: gcf32) -> gcf32 {
  return gcf32(x[0]*y[0] - k*x[1]*y[1], x[0]*y[1] + x[1]*y[0]);
}

fn gc_conjugate(x: vec2f) -> vec2f {
  return vec2f(x[0], -x[1]);
}

fn gc_norm2(k: f32, x: vec2f) -> f32 {
  return x[0]*x[0] + k*x[1]*x[1];
}

fn gc_add_inv(x: vec2f) -> vec2f {
  return vec2f(
    -x[0],
    -x[1],
  );
}

fn gc_mul_inv(k: f32, x: vec2f) -> vec2f {
  return gc_conjugate(x)/gc_norm2(k, x);
}

fn gc_sub(x: gcf32, y: gcf32) -> gcf32 {
  return gc_add(x, gc_add_inv(y));
}

fn gc_div(k: f32, x: gcf32, y: gcf32) -> gcf32 {
  return gc_mul(k, x, gc_mul_inv(k, y));
}

fn gc_rect_to_polar(k: f32, x: vec2f) -> vec2f {
  return vec2f(
    sqrt(gc_norm2(k, x)),
    atan2k(k, x[1], x[0])
  );
}

fn gc_polar_to_rect(k: f32, x: vec2f) -> vec2f {
  return vec2(
    x[0]*cosk(k, x[1]),
    x[0]*sink(k, x[1])
  );
}

fn gc_exp_to_polar(x: vec2f) -> vec2f {
    return vec2f(exp(x[0]), x[1]);
}

fn gc_log_to_rect(x: vec2f) -> vec2f {
    return vec2f(log(x[0]), x[1]);
}

fn gc_exp(k: f32, x: vec2f) -> vec2f {
  return gc_polar_to_rect(k, gc_exp_to_polar(x));
}

fn gc_log(k: f32, x: vec2f) -> vec2f {
  return gc_log_to_rect(gc_rect_to_polar(k, x));
}

fn gc_pow(k:f32, x: gcf32, y: gcf32) -> gcf32 {
  return gc_exp(k, gc_mul(k, gc_log(k, x), y));
}

fn gc_mix2(k: f32, x: vec2f, y: vec2f, t: vec1f) -> vec2f {
  let delta = gc_mul(k, gc_mul_inv(k, x), y);
  return gc_mul(k, x, gc_exp(k, gc_log(k, delta) * t[0]));
}
`,tn=`alias dcl2vec = vec2f;
alias dcl3vec = vec3f;
alias dcl4vec = vec4f;

alias dcl2rot = vec2f;
alias dcl3rot = vec4f;

fn dcl3vec_mul(k: f32, x: dcl3vec, y: dcl3vec) -> dcl3rot {
  return dcl3rot(
    k*x[2]*y[1] - k*x[1]*y[2],
    x[0]*y[2] - x[2]*y[0],
    x[1]*y[0] - x[0]*y[2],
    -x[0]*y[0] - k*x[1]*y[1] - k*x[2]*y[2]
  );
}

fn dcl3rot_mul(k: f32, x: dcl3rot, y: dcl3rot) -> dcl3rot {
  return dcl3rot(
    k*x[2]*y[1] - k*x[1]*y[2] + x[3]*y[0] + x[0]*y[3],
    x[0]*y[2] - x[2]*y[0] + x[3]*y[1] + x[1]*y[3],
    x[1]*y[0] - x[0]*y[1] + x[3]*y[2] + x[2]*y[3],
    -x[0]*y[0] - k*x[1]*y[1] - k*x[2]*y[2] + x[3]*y[3]
  );
}

fn dcl3vec_muls(x: dcl3vec, y: f32) -> dcl3vec {
  return dcl3vec(x[0] * y, x[1] * y, x[2] * y);
}

fn dcl3vec_divs(x: dcl3vec, y: f32) -> dcl3vec {
  return dcl3vec(x[0] / y, x[1] / y, x[2] / y);
}

fn dcl3rot_muls(x: dcl3rot, y: f32) -> dcl3rot {
  return dcl3rot(x[0] * y, x[1] * y, x[2] * y, x[3] * y);
}

fn dcl3rot_divs(x: dcl3rot, y: f32) -> dcl3rot {
  return dcl3rot(x[0] / y, x[1] / y, x[2] / y, x[3] / y);
}

fn dcl3vec_conjugate(x: dcl3vec) -> dcl3vec {
  return dcl3vec(-x[0], -x[1], -x[2]);
}

fn dcl3vec_norm2(k: f32, x: dcl3vec) -> f32 {
  return dcl3vec_mul(k, x, dcl3vec_conjugate(x))[3];
}

fn dcl3vec_mul_inv(k: f32, x: dcl3vec) -> dcl3vec {
  let y = dcl3vec_conjugate(x);
  let n = dcl3vec_mul(k, x, y)[3];
  return dcl3vec_divs(y, n);
}

fn dcl3rot_conjugate(x: dcl3rot) -> dcl3rot {
  return dcl3rot(-x[0], -x[1], -x[2], x[3]);
}

fn dcl3rot_norm2(k: f32, x: dcl3rot) -> f32 {
  return dcl3rot_mul(k, x, dcl3rot_conjugate(x))[3];
}

fn dcl3rot_mul_inv(k: f32, x: dcl3rot) -> dcl3rot {
  let y = dcl3rot_conjugate(x);
  let n = dcl3rot_mul(k, x, y)[3];
  return dcl3rot_divs(y, n);
}

// TODO!
fn dcl3rot_rect_to_polar(k: f32, x: dcl3rot) -> dcl3rot {
  let n = dcl3vec_norm2(k, dcl3vec(x[0], x[1], x[2]));
  return dcl3rot(
    x[0]*atan2k(n, 1, x[3]),
    x[1]*atan2k(n, 1, x[3]),
    x[2]*atan2k(n, 1, x[3]),
    sqrt(dcl3rot_norm2(k, x)),
  );
}

fn dcl3rot_polar_to_rect(k: f32, x: dcl3rot) -> dcl3rot {
  let n = dcl3vec_norm2(k, dcl3vec(x[0], x[1], x[2]));
  return dcl3rot(
    x[3]*x[0]*sink(n, 1),
    x[3]*x[1]*sink(n, 1),
    x[3]*x[2]*sink(n, 1),
    x[3]*cosk(n, 1),
  );
}

fn dcl3rot_exp_to_polar(x: dcl3rot) -> dcl3rot {
    return dcl3rot(x[0], x[1], x[2], exp(x[3]));
}

fn dcl3rot_log_to_rect(x: dcl3rot) -> dcl3rot {
    return dcl3rot(x[0], x[1], x[2], log(x[3]));
}

fn dcl3rot_exp(k: f32, x: dcl3rot) -> dcl3rot {
  return dcl3rot_polar_to_rect(k, dcl3rot_exp_to_polar(x));
}

fn dcl3rot_log(k: f32, x: dcl3rot) -> dcl3rot {
  return dcl3rot_log_to_rect(dcl3rot_rect_to_polar(k, x));
}

fn dcl3rot_pows(k:f32, x: dcl3rot, y: f32) -> dcl3rot {
  return dcl3rot_exp(k, dcl3rot_muls(dcl3rot_log(k, x), y));
}

fn dcl3rot_pow(k:f32, x: dcl3rot, y: dcl3rot) -> dcl3rot {
  return dcl3rot_exp(k, dcl3rot_mul(k, dcl3rot_log(k, x), y));
}

fn dcl3vec_mulr(k: f32, x: dcl3vec, y: dcl3rot) -> dcl3rot {
  return dcl3rot_mul(k, dcl3rot(x, 0), y);
}

fn dcl3rot_sw(k: f32, x: dcl3rot, y: dcl3rot) -> dcl3rot {
 return dcl3rot_mul(k, 
    dcl3rot_mul_inv(k, y),
    dcl3rot_mul(k, x, y)
  );
}

fn dcl3rot_mix(k: f32, x: dcl3rot, y: dcl3rot, t: vec1f) -> dcl3rot {
  let delta = dcl3rot_mul(k, dcl3rot_mul_inv(k, x), y);
  return dcl3rot_mul(k, x, dcl3rot_pows(k, delta, t[0]));
}

fn dcl3vec_mix(k: f32, x: dcl3vec, y: dcl3vec, t: vec1f) -> dcl3vec {
  let delta = dcl3vec_mul(k, dcl3vec_mul_inv(k, x), y);
  return dcl3vec_mulr(k, x, dcl3rot_pows(k, delta, t[0])).xyz;
  //return dcl3rot_sw(k, dcl3rot(x, 0), dcl3rot_pows(k, delta, 0.5*t[0])).xyz;
}
`,nn=`
alias vec1f = array<f32, 1>;
alias mat1x1f = array<vec1f, 1>;

alias t1x1x1f = array<mat1x1f, 1>;
alias t2x2x2f = array<mat2x2f, 2>;
alias t3x3x3f = array<mat3x3f, 3>;
alias t4x4x4f = array<mat4x4f, 4>;

fn t2x2x2f_lmat(C: t2x2x2f, x: vec2f) -> mat2x2f {
  return transpose(mat2x2f(x*C[0], x*C[1]));
}

fn t2x2x2f_rmat(C: t2x2x2f, y: vec2f) -> mat2x2f {
  return mat2x2f(C[0]*y, C[1]*y);
}

fn t2x2x2f_mul(C: t2x2x2f, x: vec2f, y: vec2f) -> vec2f {
  //return t2x2x2f_lmat(C, x) * y;
  return x * t2x2x2f_rmat(C, y);
}

fn t3x3x3f_lmat(C: t3x3x3f, x: vec3f) -> mat3x3f {
  return transpose(mat3x3f(x*C[0], x*C[1], x*C[2]));
}

fn t3x3x3f_rmat(C: t3x3x3f, y: vec3f) -> mat3x3f {
  return mat3x3f(C[0]*y, C[1]*y, C[2]*y);
}

fn t3x3x3f_mul(C: t3x3x3f, x: vec3f, y: vec3f) -> vec3f {
  //return t3x3x3f_lmat(C, x) * y;
  return x * t3x3x3f_rmat(C, y);
}

alias t2x3x4f = array<mat3x4f, 2>;
alias t2x4x3f = array<mat4x3f, 2>;

fn t2x4x3f_lmat(C: t2x4x3f, x: vec3f) -> mat4x2f {
  return transpose(mat2x4f(x*C[0], x*C[1]));
}

fn t2x4x3f_rmat(C: t2x4x3f, y: vec4f) -> mat2x3f {
  return mat2x3f(C[0]*y, C[1]*y);
}

fn t2x4x3f_mul(C: t2x4x3f, x: vec3f, y: vec4f) -> vec2f {
  //return t2x4x3f_lmat(C, x) * y;
  return x * t2x4x3f_rmat(C, y);
}

fn modulo(x:f32, y: f32) -> f32 {
  return (x % y + y) % y;
}

fn isOdd(x:f32) -> f32 {
  return step(modulo(x - 0.5, 2.), 1.0);
}

fn isEven(x:f32) -> f32 {
  return 1. - isOdd(x);
}

fn powNegOne(i: i32) -> f32 {
  //return pow(-1., f32(N_APPROX-i+1));
  //return cf32_pow(cf32(-1., 0.), cf32(f32(i), 0.)).re;
  return (1. - 2.*isOdd(f32(i)));
}
`,rn=`
const PI = radians(180.0);
const TAU = radians(360.0);

fn cosk(k: f32, x: f32) -> f32 {
  if (k > 0.0) {
    let rk = sqrt(k);
    return cos(rk*x);
  }
  if (k < 0.0) {
    let rk = sqrt(-k);
    return cosh(rk*x);
  }
  return 1.0;
}

fn sink(k: f32, x: f32) -> f32 {
  if (k > 0.0) {
    let rk = sqrt(k);
    return sin(rk*x)/rk;
  }
  if (k < 0.0) {
    let rk = sqrt(-k);
    return sinh(rk*x)/rk;
  }
  return x;
}

fn atank(k: f32, x: f32) -> f32 {
  if (k > 0.0) {
    let rk = sqrt(k);
    return atan(rk*x)/rk;
  }
  if (k < 0.0) {
    let rk = sqrt(-k);
    return atanh(rk*x)/rk;
  }
  return x;
}

fn atan2k(k: f32, y: f32, x: f32) -> f32 {
  if (k > 0.0) {
    let rk = sqrt(k);
    return atan2(rk*y, x)/rk;
  }
  return atank(k, y/x);
}
`,an=()=>`
${nn}
${Jt}
${rn}
${en}
${tn}
${Qt}
`,on=e=>{const l=/@plot\s+fn\s+(?<name>\w+)\s*\(\w+:\s*(?<domain>\w+)\)\s*->\s*(?<codomain>\w+)/g,t=[];let c;do c=l.exec(e),c&&c.groups&&t.push({name:c.groups.name,domain:{name:c.groups.domain},codomain:{name:c.groups.codomain}});while(c);return{functions:t}},fe=e=>{switch(e.name){case"vec1f":return 1;case"vec2f":return 2;case"vec3f":return 3;case"vec4f":return 4}return 0},Ie=e=>[fe(e.domain),fe(e.codomain)],ln=`@plot
fn f(x: vec2f) -> vec3f {
  return vec3f(x[0], x[1], sin(x[0])*cos(x[1]));
}`,cn={source:ln,options:{args:[0,0,0,0],functions:[{color:"#ffffff",extent:[[-Math.PI,-Math.PI],[+Math.PI,+Math.PI]],visible:!0}]}},de=e=>(Je("data-v-e1910b6a"),e=e(),et(),e),un={class:"flex flex-row items-center h-12 p-1 border-b-2 border-border"},sn=de(()=>h("h1",{class:"px-2"},"Parametric Surface",-1)),fn=de(()=>h("span",{class:"flex-grow"},null,-1)),dn={class:"flex flex-row items-center justify-center overflow-hidden show-focus-within"},xn={class:"flex flex-col p-2"},mn=de(()=>h("summary",{class:"flex flex-row items-center gap-2 my-1"},[h("h2",null,"Global")],-1)),pn={class:"w-16 text-xs text-right font-mono"},vn=["onUpdate:modelValue"],_n=["onUpdate:modelValue"],gn={class:"flex flex-row items-center gap-2 my-1"},yn=["onUpdate:modelValue"],kn={class:"flex-grow"},wn={class:"text-text text-base"},hn=`
struct GlobalData {
  projection: mat4x4f,
  view: mat4x4f,
  args: vec4f,
  time: f32,
}
`,bn=`
struct SurfaceData {
  model: mat4x4f,
  color: vec4f,
}
`,An=L({__name:"ParametricSurfaceView",setup(e){const l=O(cn),t=Ke(l),c=`
${hn}
${bn}

@group(0) @binding(0) var<uniform> uGlobal: GlobalData;
@group(0) @binding(1) var<uniform> uSurface: SurfaceData;
`,u=(s,[f,x])=>{const y=k=>{switch(k){case 1:return"vec1f(position.y)";case 2:return"position.yz";case 3:return"position.yzw";default:return"0.0"}};return`fn surface(position: vec4f) -> vec4f {
  return ${(k=>D=>{switch(k){case 1:return`vec4(1.0, ${D}[0], 0.0, 0.0)`;case 2:return`vec4(1.0, ${D}, 0.0)`;case 3:return`vec4(1.0, ${D})`;default:return"vec4(1.0, 0.0, 0.0, 0.0)"}})(x)(`${s}(${y(f)})`)};
}`},r=(s,f)=>`
${an()}

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

${c}

${s}

${f}

fn fromVertexIn(in: VertexIn) -> VaryingData {
  return VaryingData(
    uGlobal.view * surface(uSurface.model * in.position),
    uSurface.color * in.color,
  );
}

fn toFragmentIn(in: VaryingData) -> FragmentIn {
  return FragmentIn(
    uGlobal.projection * in.position.yzwx,
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
`,n=O(null),a=st(c),i=ge(a.uniforms.uGlobal);i.set({projection:U.perspective(Math.PI/4,1920/1080,.1,1e3),view:U.translation([0,0,0]),args:[0,0,0,0]});const g={},v={alphaMode:"premultiplied",size:[1920,1080],autoResize:!1},m=s=>{const f={state:null,valid:!1,onCreate(x){console.log("Resource::onCreate"),!f.state&&(f.state=s.create(x))},onUpdate(x){var y,C;f.valid||((y=f.onDelete)==null||y.call(f,x),(C=f.onCreate)==null||C.call(f,x),f.valid=!0)},onDelete(x){console.log("Resource::onDelete"),f.state&&(s.delete(x,f.state),f.state=null)}};return f},o=s=>[[],[Math.pow(s,3*2)],[Math.pow(s,3),Math.pow(s,3)],[Math.pow(s,2),Math.pow(s,2),Math.pow(s,2)]],p=m({create({device:s}){return o(3).map(Wt).map(x=>({vertices:vt(s,x,{shaderLocation:0,stepMode:"vertex",interleave:!0}),topology:1}))},delete({device:s},f){}}),d=m({create({device:s,format:f}){return{uniforms:s.createBuffer({size:i.arrayBuffer.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST})}},delete({device:s},f){}}),_=m({create({device:s,format:f}){if(!d.state||!p.state||!n.value)return null;const{source:x,info:y}=n.value;return y.functions.map((C,k)=>{const[D,E]=Ie(C),$=s.createShaderModule({code:r(x,u(C.name,[D,E]))}),{uniforms:P}=d.state,{vertices:Q}=p.state[D],z=s.createRenderPipeline({layout:"auto",vertex:{module:$,entryPoint:"vertexMain",buffers:Q.bufferLayouts},fragment:{module:$,entryPoint:"fragmentMain",targets:[{format:f}]},primitive:{topology:Zt[1]}});g[k]=ge(a.uniforms.uSurface);const J=s.createBuffer({size:g[k].arrayBuffer.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),X=s.createBindGroup({layout:z.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:P}},{binding:1,resource:{buffer:J}}]});return{pipeline:z,bindGroup:X,uniforms:J}})},delete({device:s},f){}}),{listeners:S,transformInplace:b}=Kt([-8,0,0]),j={onCreate(s){var f,x,y;console.log("ParametricSurfaceView::onCreate"),(f=d.onUpdate)==null||f.call(d,s),d.state&&((x=p.onUpdate)==null||x.call(p,s),p.state&&((y=_.onUpdate)==null||y.call(_,s),_.state))},onRender(s){var P,Q,z;const{device:f,context:x,timestamp:y}=s;if((P=d.onUpdate)==null||P.call(d,s),!d.state||((Q=p.onUpdate)==null||Q.call(p,s),!p.state)||((z=_.onUpdate)==null||z.call(_,s),!_.state))return;const C=f.createCommandEncoder(),k=C.beginRenderPass({colorAttachments:[{clearValue:Float32Array.of(0,0,0,0),loadOp:"clear",storeOp:"store",view:x.getCurrentTexture().createView()}]});if(!n.value)return null;const{info:D}=n.value,{uniforms:E}=d.state;i.set({args:t.options.args,time:y/1e3}),b(i.views.view),f.queue.writeBuffer(E,0,i.arrayBuffer),D.functions.forEach((J,X)=>{const[Ue,In]=Ie(J),ue=t.options.functions[X];if(!ue.visible)return;const{vertices:ee}=p.state[Ue],{pipeline:Le,bindGroup:je,uniforms:Xe}=_.state[X];g[X].set({model:_t(ue.extent),color:gt(ue.color).gl()}),f.queue.writeBuffer(Xe,0,g[X].arrayBuffer),k.setPipeline(Le),k.setBindGroup(0,je),k.setVertexBuffer(0,ee.buffers[0]),k.setIndexBuffer(ee.indexBuffer,ee.indexFormat),k.drawIndexed(ee.numElements)}),k.end();const $=C.finish();f.queue.submit([$])},onDelete(s){var f,x,y;console.log("ParametricSurfaceView::Delete"),(f=_.onDelete)==null||f.call(_,s),(x=p.onDelete)==null||x.call(p,s),(y=d.onDelete)==null||y.call(d,s)}},le=s=>({source:s.replaceAll("@plot","/*@plot*/"),info:on(s)}),Fe=s=>{const f=fe(s.domain);return[se(-1,f),se(1,f)]},Ne=({info:s})=>({functions:s.functions.map(f=>({name:f.name,color:"#ffffff",extent:Fe(f),visible:!0}))}),Te=(s,f)=>{var x;return{args:s.args??f.args,functions:((x=s.functions)==null?void 0:x.map((y,C)=>{const k=f.functions[C];return{color:(k==null?void 0:k.color)??y.color,extent:[y.extent[0].map((D,E)=>{var $,P;return((P=($=k==null?void 0:k.extent)==null?void 0:$[0])==null?void 0:P[E])??D}),y.extent[1].map((D,E)=>{var $,P;return((P=($=k==null?void 0:k.extent)==null?void 0:$[1])==null?void 0:P[E])??D})],visible:(k==null?void 0:k.visible)??y.visible}}))??f.functions}},xe=s=>{const f=le(s.source);n.value=f,s.options=Te(Ne(f),s.options),_.valid=!1},Ee=s=>{switch(s.key){case"Enter":return s.shiftKey;case"s":case"S":return s.ctrlKey||s.metaKey;default:return!1}};Ze(document,"keydown",s=>{Ee(s)&&(s.stopPropagation(),s.preventDefault(),xe(t))}),Ye(l,xe,{immediate:!0});const ce=s=>{var f,x,y;return(y=(x=(f=n.value)==null?void 0:f.info)==null?void 0:x.functions)==null?void 0:y[s]};return(s,f)=>(F(),N(Z,null,[h("header",un,[sn,fn,A(ft,{modelValue:l.value,"onUpdate:modelValue":f[0]||(f[0]=x=>l.value=x)},null,8,["modelValue"]),A(it)]),A(w(pt),{as:"main",class:"flex-grow flex flex-col overflow-hidden","default-index":2},{default:B(()=>[A(w(dt),{class:"flex flex-row md:hidden"},{default:B(()=>[A(w(ye),{class:"tab"},{default:B(()=>[K("Input")]),_:1}),A(w(ye),{class:"tab"},{default:B(()=>[K("Output")]),_:1})]),_:1}),A(w(xt),{class:"h-full md:grid md:grid-cols-2 border-y-2 border-border"},{default:B(()=>[A(w(ke),{class:"h-full ui-not-selected:hidden md:ui-not-selected:grid grid grid-rows-1 overflow-hidden",static:!0},{default:B(()=>[A(He,{modelValue:w(t).source,"onUpdate:modelValue":f[1]||(f[1]=x=>w(t).source=x)},null,8,["modelValue"])]),_:1}),A(w(ke),{class:"h-full ui-not-selected:hidden md:ui-not-selected:grid grid grid-rows-2 overflow-hidden",static:!0},{default:B(()=>[(F(),We(Qe,null,{default:B(()=>[h("div",dn,[A(mt,{renderer:j,listeners:w(S),options:v},null,8,["listeners"])])]),_:1})),h("div",xn,[h("details",null,[mn,(F(!0),N(Z,null,ne(M(0,4),x=>(F(),N("div",{class:"flex flex-row items-center gap-2",key:x},[h("label",pn,"args["+G(x)+"]:",1),Y(h("input",{class:"w-16",type:"number",step:"0.1","onUpdate:modelValue":y=>w(t).options.args[x]=y},null,8,vn),[[H,w(t).options.args[x]]]),Y(h("input",{class:"flex-grow",type:"range",min:"-1",max:"1",step:"0.01","onUpdate:modelValue":y=>w(t).options.args[x]=y},null,8,_n),[[H,w(t).options.args[x]]])]))),128))]),(F(!0),N(Z,null,ne(w(t).options.functions,(x,y)=>{var C,k,D,E,$;return F(),N("details",{key:y},[h("summary",gn,[Y(h("input",{class:"w-8 h-8",name:"fill",type:"color","onUpdate:modelValue":P=>x.color=P},null,8,yn),[[H,x.color]]),h("h2",kn,[K(G((C=ce(y))==null?void 0:C.name)+": ",1),h("span",wn,G((D=(k=ce(y))==null?void 0:k.domain)==null?void 0:D.name)+" → "+G(($=(E=ce(y))==null?void 0:E.codomain)==null?void 0:$.name),1)]),A(Lt,{modelValue:x.visible,"onUpdate:modelValue":P=>x.visible=P},null,8,["modelValue","onUpdate:modelValue"])]),A(qt,{modelValue:x.extent,"onUpdate:modelValue":P=>x.extent=P},null,8,["modelValue","onUpdate:modelValue"])])}),128))])]),_:1})]),_:1})]),_:1})],64))}}),Rn=$e(An,[["__scopeId","data-v-e1910b6a"]]);export{Rn as default};
