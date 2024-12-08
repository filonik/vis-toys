import{w as re,r as O,c as T,i as Pe,p as Me,d as L,o as je,a as qe,n as q,b as F,e as N,f as b,u as Re,g as I,h as pe,j as w,k as ne,l as B,m as K,t as j,F as Z,q as Y,v as H,s as ze,x as Ke,y as Ze,z as Ye,_ as He,A as We,S as Qe,B as Je,C as et}from"./index-Be3N5kUb.js";import{c as Se,o as k,w as Ce,h as De,i as tt,u as nt,A as ae,a as ie,s as rt,N as xe,b as R,v as at,d as ve,_ as Oe,O as ot,r as M,e as $e,m as U,f as ce,g as lt,l as st,j as ut,k as _e,n as ct,p as ge,q as ft,t as it,x as mt,y as ye,I as dt,z as he,B as pt,C as xt,D as vt,E as _t,F as gt}from"./webgpu-utils.module-bPSLuptB.js";function yt(){return/iPhone/gi.test(window.navigator.platform)||/Mac/gi.test(window.navigator.platform)&&window.navigator.maxTouchPoints>0}function ht(){return/Android/gi.test(window.navigator.userAgent)}function wt(){return yt()||ht()}function te(e,l,t){Se.isServer||re(s=>{document.addEventListener(e,l,t),s(()=>document.removeEventListener(e,l,t))})}function bt(e,l,t){Se.isServer||re(s=>{window.addEventListener(e,l,t),s(()=>window.removeEventListener(e,l,t))})}function At(e,l,t=T(()=>!0)){function s(r,n){if(!t.value||r.defaultPrevented)return;let a=n(r);if(a===null||!a.getRootNode().contains(a))return;let i=function g(v){return typeof v=="function"?g(v()):Array.isArray(v)||v instanceof Set?v:[v]}(e);for(let g of i){if(g===null)continue;let v=g instanceof HTMLElement?g:k(g);if(v!=null&&v.contains(a)||r.composed&&r.composedPath().includes(v))return}return!Ce(a,De.Loose)&&a.tabIndex!==-1&&r.preventDefault(),l(r,a)}let u=O(null);te("pointerdown",r=>{var n,a;t.value&&(u.value=((a=(n=r.composedPath)==null?void 0:n.call(r))==null?void 0:a[0])||r.target)},!0),te("mousedown",r=>{var n,a;t.value&&(u.value=((a=(n=r.composedPath)==null?void 0:n.call(r))==null?void 0:a[0])||r.target)},!0),te("click",r=>{wt()||u.value&&(s(r,()=>u.value),u.value=null)},!0),te("touchend",r=>s(r,()=>r.target instanceof HTMLElement?r.target:null),!0),bt("blur",r=>s(r,()=>window.document.activeElement instanceof HTMLIFrameElement?window.document.activeElement:null),!0)}function we(e){return[e.screenX,e.screenY]}function It(){let e=O([-1,-1]);return{wasMoved(l){let t=we(l);return e.value[0]===t[0]&&e.value[1]===t[1]?!1:(e.value=t,!0)},update(l){e.value=we(l)}}}function kt({container:e,accept:l,walk:t,enabled:s}){re(()=>{let u=e.value;if(!u||s!==void 0&&!s.value)return;let r=tt(e);if(!r)return;let n=Object.assign(i=>l(i),{acceptNode:l}),a=r.createTreeWalker(u,NodeFilter.SHOW_ELEMENT,n,!1);for(;a.nextNode();)t(a.currentNode)})}let Ve=Symbol("Context");var W=(e=>(e[e.Open=1]="Open",e[e.Closed=2]="Closed",e[e.Closing=4]="Closing",e[e.Opening=8]="Opening",e))(W||{});function Pt(){return Pe(Ve,null)}function Mt(e){Me(Ve,e)}function Rt(e){throw new Error("Unexpected object: "+e)}var V=(e=>(e[e.First=0]="First",e[e.Previous=1]="Previous",e[e.Next=2]="Next",e[e.Last=3]="Last",e[e.Specific=4]="Specific",e[e.Nothing=5]="Nothing",e))(V||{});function St(e,l){let t=l.resolveItems();if(t.length<=0)return null;let s=l.resolveActiveIndex(),u=s??-1;switch(e.focus){case 0:{for(let r=0;r<t.length;++r)if(!l.resolveDisabled(t[r],r,t))return r;return s}case 1:{u===-1&&(u=t.length);for(let r=u-1;r>=0;--r)if(!l.resolveDisabled(t[r],r,t))return r;return s}case 2:{for(let r=u+1;r<t.length;++r)if(!l.resolveDisabled(t[r],r,t))return r;return s}case 3:{for(let r=t.length-1;r>=0;--r)if(!l.resolveDisabled(t[r],r,t))return r;return s}case 4:{for(let r=0;r<t.length;++r)if(l.resolveId(t[r],r,t)===e.id)return r;return s}case 5:return null;default:Rt(e)}}let be=/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;function Ae(e){var l,t;let s=(l=e.innerText)!=null?l:"",u=e.cloneNode(!0);if(!(u instanceof HTMLElement))return s;let r=!1;for(let a of u.querySelectorAll('[hidden],[aria-hidden],[role="img"]'))a.remove(),r=!0;let n=r?(t=u.innerText)!=null?t:"":s;return be.test(n)&&(n=n.replace(be,"")),n}function Ct(e){let l=e.getAttribute("aria-label");if(typeof l=="string")return l.trim();let t=e.getAttribute("aria-labelledby");if(t){let s=t.split(" ").map(u=>{let r=document.getElementById(u);if(r){let n=r.getAttribute("aria-label");return typeof n=="string"?n.trim():Ae(r).trim()}return null}).filter(Boolean);if(s.length>0)return s.join(", ")}return Ae(e).trim()}function Dt(e){let l=O(""),t=O("");return()=>{let s=k(e);if(!s)return"";let u=s.innerText;if(l.value===u)return t.value;let r=Ct(s).trim().toLowerCase();return l.value=u,t.value=r,r}}var Ot=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(Ot||{}),$t=(e=>(e[e.Pointer=0]="Pointer",e[e.Other=1]="Other",e))($t||{});function Vt(e){requestAnimationFrame(()=>requestAnimationFrame(e))}let Be=Symbol("MenuContext");function oe(e){let l=Pe(Be,null);if(l===null){let t=new Error(`<${e} /> is missing a parent <Menu /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(t,oe),t}return l}let Bt=L({name:"Menu",props:{as:{type:[Object,String],default:"template"}},setup(e,{slots:l,attrs:t}){let s=O(1),u=O(null),r=O(null),n=O([]),a=O(""),i=O(null),g=O(1);function v(o=x=>x){let x=i.value!==null?n.value[i.value]:null,m=ot(o(n.value.slice()),S=>k(S.dataRef.domRef)),_=x?m.indexOf(x):null;return _===-1&&(_=null),{items:m,activeItemIndex:_}}let p={menuState:s,buttonRef:u,itemsRef:r,items:n,searchQuery:a,activeItemIndex:i,activationTrigger:g,closeMenu:()=>{s.value=1,i.value=null},openMenu:()=>s.value=0,goToItem(o,x,m){let _=v(),S=St(o===V.Specific?{focus:V.Specific,id:x}:{focus:o},{resolveItems:()=>_.items,resolveActiveIndex:()=>_.activeItemIndex,resolveId:A=>A.id,resolveDisabled:A=>A.dataRef.disabled});a.value="",i.value=S,g.value=m??1,n.value=_.items},search(o){let x=a.value!==""?0:1;a.value+=o.toLowerCase();let m=(i.value!==null?n.value.slice(i.value+x).concat(n.value.slice(0,i.value+x)):n.value).find(S=>S.dataRef.textValue.startsWith(a.value)&&!S.dataRef.disabled),_=m?n.value.indexOf(m):-1;_===-1||_===i.value||(i.value=_,g.value=1)},clearSearch(){a.value=""},registerItem(o,x){let m=v(_=>[..._,{id:o,dataRef:x}]);n.value=m.items,i.value=m.activeItemIndex,g.value=1},unregisterItem(o){let x=v(m=>{let _=m.findIndex(S=>S.id===o);return _!==-1&&m.splice(_,1),m});n.value=x.items,i.value=x.activeItemIndex,g.value=1}};return At([u,r],(o,x)=>{var m;p.closeMenu(),Ce(x,De.Loose)||(o.preventDefault(),(m=k(u))==null||m.focus())},T(()=>s.value===0)),Me(Be,p),Mt(T(()=>nt(s.value,{0:W.Open,1:W.Closed}))),()=>{let o={open:s.value===0,close:p.closeMenu};return ae({ourProps:{},theirProps:e,slot:o,slots:l,attrs:t,name:"Menu"})}}}),Ft=L({name:"MenuButton",props:{disabled:{type:Boolean,default:!1},as:{type:[Object,String],default:"button"},id:{type:String,default:null}},setup(e,{attrs:l,slots:t,expose:s}){var u;let r=(u=e.id)!=null?u:`headlessui-menu-button-${ie()}`,n=oe("MenuButton");s({el:n.buttonRef,$el:n.buttonRef});function a(p){switch(p.key){case R.Space:case R.Enter:case R.ArrowDown:p.preventDefault(),p.stopPropagation(),n.openMenu(),q(()=>{var o;(o=k(n.itemsRef))==null||o.focus({preventScroll:!0}),n.goToItem(V.First)});break;case R.ArrowUp:p.preventDefault(),p.stopPropagation(),n.openMenu(),q(()=>{var o;(o=k(n.itemsRef))==null||o.focus({preventScroll:!0}),n.goToItem(V.Last)});break}}function i(p){switch(p.key){case R.Space:p.preventDefault();break}}function g(p){e.disabled||(n.menuState.value===0?(n.closeMenu(),q(()=>{var o;return(o=k(n.buttonRef))==null?void 0:o.focus({preventScroll:!0})})):(p.preventDefault(),n.openMenu(),Vt(()=>{var o;return(o=k(n.itemsRef))==null?void 0:o.focus({preventScroll:!0})})))}let v=rt(T(()=>({as:e.as,type:l.type})),n.buttonRef);return()=>{var p;let o={open:n.menuState.value===0},{...x}=e,m={ref:n.buttonRef,id:r,type:v.value,"aria-haspopup":"menu","aria-controls":(p=k(n.itemsRef))==null?void 0:p.id,"aria-expanded":n.menuState.value===0,onKeydown:a,onKeyup:i,onClick:g};return ae({ourProps:m,theirProps:x,slot:o,attrs:l,slots:t,name:"MenuButton"})}}}),Nt=L({name:"MenuItems",props:{as:{type:[Object,String],default:"div"},static:{type:Boolean,default:!1},unmount:{type:Boolean,default:!0},id:{type:String,default:null}},setup(e,{attrs:l,slots:t,expose:s}){var u;let r=(u=e.id)!=null?u:`headlessui-menu-items-${ie()}`,n=oe("MenuItems"),a=O(null);s({el:n.itemsRef,$el:n.itemsRef}),kt({container:T(()=>k(n.itemsRef)),enabled:T(()=>n.menuState.value===0),accept(o){return o.getAttribute("role")==="menuitem"?NodeFilter.FILTER_REJECT:o.hasAttribute("role")?NodeFilter.FILTER_SKIP:NodeFilter.FILTER_ACCEPT},walk(o){o.setAttribute("role","none")}});function i(o){var x;switch(a.value&&clearTimeout(a.value),o.key){case R.Space:if(n.searchQuery.value!=="")return o.preventDefault(),o.stopPropagation(),n.search(o.key);case R.Enter:if(o.preventDefault(),o.stopPropagation(),n.activeItemIndex.value!==null){let m=n.items.value[n.activeItemIndex.value];(x=k(m.dataRef.domRef))==null||x.click()}n.closeMenu(),Oe(k(n.buttonRef));break;case R.ArrowDown:return o.preventDefault(),o.stopPropagation(),n.goToItem(V.Next);case R.ArrowUp:return o.preventDefault(),o.stopPropagation(),n.goToItem(V.Previous);case R.Home:case R.PageUp:return o.preventDefault(),o.stopPropagation(),n.goToItem(V.First);case R.End:case R.PageDown:return o.preventDefault(),o.stopPropagation(),n.goToItem(V.Last);case R.Escape:o.preventDefault(),o.stopPropagation(),n.closeMenu(),q(()=>{var m;return(m=k(n.buttonRef))==null?void 0:m.focus({preventScroll:!0})});break;case R.Tab:o.preventDefault(),o.stopPropagation(),n.closeMenu(),q(()=>at(k(n.buttonRef),o.shiftKey?ve.Previous:ve.Next));break;default:o.key.length===1&&(n.search(o.key),a.value=setTimeout(()=>n.clearSearch(),350));break}}function g(o){switch(o.key){case R.Space:o.preventDefault();break}}let v=Pt(),p=T(()=>v!==null?(v.value&W.Open)===W.Open:n.menuState.value===0);return()=>{var o,x;let m={open:n.menuState.value===0},{..._}=e,S={"aria-activedescendant":n.activeItemIndex.value===null||(o=n.items.value[n.activeItemIndex.value])==null?void 0:o.id,"aria-labelledby":(x=k(n.buttonRef))==null?void 0:x.id,id:r,onKeydown:i,onKeyup:g,role:"menu",tabIndex:0,ref:n.itemsRef};return ae({ourProps:S,theirProps:_,slot:m,attrs:l,slots:t,features:xe.RenderStrategy|xe.Static,visible:p.value,name:"MenuItems"})}}}),Tt=L({name:"MenuItem",inheritAttrs:!1,props:{as:{type:[Object,String],default:"template"},disabled:{type:Boolean,default:!1},id:{type:String,default:null}},setup(e,{slots:l,attrs:t,expose:s}){var u;let r=(u=e.id)!=null?u:`headlessui-menu-item-${ie()}`,n=oe("MenuItem"),a=O(null);s({el:a,$el:a});let i=T(()=>n.activeItemIndex.value!==null?n.items.value[n.activeItemIndex.value].id===r:!1),g=Dt(a),v=T(()=>({disabled:e.disabled,get textValue(){return g()},domRef:a}));je(()=>n.registerItem(r,v)),qe(()=>n.unregisterItem(r)),re(()=>{n.menuState.value===0&&i.value&&n.activationTrigger.value!==0&&q(()=>{var A,X;return(X=(A=k(a))==null?void 0:A.scrollIntoView)==null?void 0:X.call(A,{block:"nearest"})})});function p(A){if(e.disabled)return A.preventDefault();n.closeMenu(),Oe(k(n.buttonRef))}function o(){if(e.disabled)return n.goToItem(V.Nothing);n.goToItem(V.Specific,r)}let x=It();function m(A){x.update(A)}function _(A){x.wasMoved(A)&&(e.disabled||i.value||n.goToItem(V.Specific,r,0))}function S(A){x.wasMoved(A)&&(e.disabled||i.value&&n.goToItem(V.Nothing))}return()=>{let{disabled:A,...X}=e,le={active:i.value,disabled:A,close:n.closeMenu};return ae({ourProps:{id:r,ref:a,role:"menuitem",tabIndex:A===!0?void 0:-1,"aria-disabled":A===!0?!0:void 0,onClick:p,onFocus:o,onPointerenter:m,onMouseenter:m,onPointermove:_,onMousemove:_,onPointerleave:S,onMouseleave:S},theirProps:{...t,...X},slot:le,attrs:t,slots:l,name:"MenuItem"})}}});function Et(e,l){return F(),N("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true","data-slot":"icon"},[b("path",{d:"M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z"}),b("path",{d:"M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z"}),b("path",{d:"M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z"})])}function Ut(e,l){return F(),N("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true","data-slot":"icon"},[b("path",{d:"M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"}),b("path",{"fill-rule":"evenodd",d:"M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z","clip-rule":"evenodd"})])}const Lt=L({__name:"ToggleVisibleButton",props:{modelValue:{type:Boolean}},emits:["update:modelValue"],setup(e,{emit:l}){const u=Re(e,"modelValue",l),r=()=>{u.value=!u.value};return(n,a)=>(F(),N("button",{class:"rounded-lg p-2",type:"button",onClick:a[0]||(a[0]=i=>r())},[I(w(Et),{class:pe(["w-5 h-5",[w(u)?"hidden":"visible"]])},null,8,["class"]),I(w(Ut),{class:pe(["w-5 h-5",[w(u)?"visible":"hidden"]])},null,8,["class"])]))}}),Xt=["onUpdate:modelValue"],Gt=["onUpdate:modelValue"],jt=L({__name:"ExtentInput",props:{modelValue:{}},emits:["update:modelValue"],setup(e,{emit:l}){const u=Re(e,"modelValue",l),r=(i,g)=>{u.value=[u.value[0].map((v,p)=>i==p?g[0]:v),u.value[1].map((v,p)=>i==p?g[1]:v)]},n=T(()=>M(0,u.value[0].length)),a=[{name:"-1, +1",value:[-1,1]},{name:"-π, +π",value:[-Math.PI,+Math.PI]},{name:"-π/2, +π/2",value:[-Math.PI/2,+Math.PI/2]}];return(i,g)=>(F(!0),N(Z,null,ne(n.value,v=>(F(),N("div",{class:"flex flex-row items-center gap-2",key:v},[I(w(Bt),{as:"div",class:"relative inline-block text-left"},{default:B(()=>[I(w(Ft),{class:"w-16 text-xs text-right font-mono"},{default:B(()=>[K("x["+j(v)+"]:",1)]),_:2},1024),I(w(Nt),{class:"absolute left-0 mt-2 w-32 origin-top-left divide-y divide-border bg-background-mute shadow-lg ring-1 ring-border-hover focus:outline-none z-50"},{default:B(()=>[(F(),N(Z,null,ne(a,p=>I(w(Tt),{as:"div",class:"menu-item text-center",onClick:o=>r(v,p.value)},{default:B(()=>[K(j(p.name),1)]),_:2},1032,["onClick"])),64))]),_:2},1024)]),_:2},1024),Y(b("input",{class:"w-16",type:"number",step:"0.1","onUpdate:modelValue":p=>w(u)[0][v]=p},null,8,Xt),[[H,w(u)[0][v]]]),Y(b("input",{class:"w-16",type:"number",step:"0.1","onUpdate:modelValue":p=>w(u)[1][v]=p},null,8,Gt),[[H,w(u)[1][v]]])]))),128))}}),qt=$e(jt,[["__scopeId","data-v-abc9a19b"]]),zt=(e,l)=>t=>Math.max(e,Math.min(t,l)),Ie=zt(-100,-.1);function Kt(e,l){const t=ze({isDown:!1,position:e??[-1,0,0],origin:[0,0,0]});let s;const u={wheel:a=>{a.preventDefault();const i=a.deltaY/100;t.position[0]=Ie(t.position[0]+i)},pointerdown:a=>{t.isDown=!0,a.target.setPointerCapture(a.pointerId)},pointermove:a=>{if(!t.isDown)return;const i=a.target,g=[i.width,i.height],v=Math.min(...g),p=[+a.movementX*4/v,+a.movementY*4/v,0];if(a.altKey||a.metaKey){const o=-t.position[0]/4.8;t.origin[0]+=p[0]*o,t.origin[1]-=p[1]*o}else t.position[1]+=p[0],t.position[2]+=p[1]},pointerup:a=>{t.isDown=!1},touchstart:a=>{a.preventDefault()},touchmove:a=>{if(a.preventDefault(),a.targetTouches.length===2){const i=a.targetTouches[0],g=a.targetTouches[1];let v=Math.hypot(i.pageX-g.pageX,i.pageY-g.pageY);if(s!==void 0){const p=v/s;t.position[0]=Ie(t.position[0]*p)}s=v}},touchend:a=>{a.preventDefault(),s=void 0}},r=a=>(U.identity(a),U.translate(a,[0,0,t.position[0]],a),U.rotateY(a,t.position[2],a),U.rotateZ(a,t.position[1],a),U.translate(a,t.origin,a),a),n=T(()=>r(U.create()));return{listeners:u,transform:n,transformInplace:r}}const Zt={0:"point-list",1:"line-list",2:"triangle-list"},Yt=e=>lt(e.map(l=>st(-1,1,l))),Ht=e=>{const l=e.length,t=ut(e);switch(l){case 1:return M(0,e[0]-1).map(u=>[(u+0)*t[0],(u+1)*t[0]]);case 2:{const s=M(0,e[0]).flatMap(r=>M(0,e[1]-1).map(n=>[r*t[0]+(n+0)*t[1],r*t[0]+(n+1)*t[1]])),u=M(0,e[1]).flatMap(r=>M(0,e[0]-1).map(n=>[(n+0)*t[0]+r*t[1],(n+1)*t[0]+r*t[1]]));return _e(s,u)}case 3:{const s=M(0,e[0]).flatMap(n=>M(0,e[1]).flatMap(a=>M(0,e[2]-1).map(i=>[n*t[0]+a*t[1]+(i+0)*t[2],n*t[0]+a*t[1]+(i+1)*t[2]]))),u=M(0,e[0]).flatMap(n=>M(0,e[2]).flatMap(a=>M(0,e[1]-1).map(i=>[n*t[0]+(i+0)*t[1]+a*t[2],n*t[0]+(i+1)*t[1]+a*t[2]]))),r=M(0,e[1]).flatMap(n=>M(0,e[2]).flatMap(a=>M(0,e[0]-1).map(i=>[(i+0)*t[0]+n*t[1]+a*t[2],(i+1)*t[0]+n*t[1]+a*t[2]])));return _e(s,u,r)}}return[]},Wt=e=>{const l=Yt(e).map(u=>[1,u[0]??0,u[1]??0,u[2]??0]),t=ce([1,1,1,1],l.length),s=Ht(e);return{position:{data:l.flat(1),type:Float32Array,numComponents:4},color:{data:t.flat(1),type:Float32Array,numComponents:4},indices:{data:s.flat(1),type:Uint32Array}}},Qt=`const mat2x2f_I = mat2x2f(1,0,0,1);
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
`,tn=`
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
`,nn=`
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
`,rn=()=>`
${tn}
${Jt}
${nn}
${en}
${Qt}
`,an=e=>{const l=/@plot\s+fn\s+(?<name>\w+)\s*\(\w+:\s*(?<domain>\w+)\)\s*->\s*(?<codomain>\w+)/g,t=[];let s;do s=l.exec(e),s&&s.groups&&t.push({name:s.groups.name,domain:{name:s.groups.domain},codomain:{name:s.groups.codomain}});while(s);return{functions:t}},fe=e=>{switch(e.name){case"vec1f":return 1;case"vec2f":return 2;case"vec3f":return 3;case"vec4f":return 4}return 0},ke=e=>[fe(e.domain),fe(e.codomain)],on=`@plot
fn f(x: vec2f) -> vec3f {
  return vec3f(x[0], x[1], sin(x[0])*cos(x[1]));
}`,ln={source:on,options:{args:[0,0,0,0],functions:[{color:"#ffffff",extent:[[-Math.PI,-Math.PI],[+Math.PI,+Math.PI]],visible:!0}]}},me=e=>(Je("data-v-e1910b6a"),e=e(),et(),e),sn={class:"flex flex-row items-center h-12 p-1 border-b-2 border-border"},un=me(()=>b("h1",{class:"px-2"},"Parametric Surface",-1)),cn=me(()=>b("span",{class:"flex-grow"},null,-1)),fn={class:"flex flex-row items-center justify-center overflow-hidden show-focus-within"},mn={class:"flex flex-col p-2"},dn=me(()=>b("summary",{class:"flex flex-row items-center gap-2 my-1"},[b("h2",null,"Global")],-1)),pn={class:"w-16 text-xs text-right font-mono"},xn=["onUpdate:modelValue"],vn=["onUpdate:modelValue"],_n={class:"flex flex-row items-center gap-2 my-1"},gn=["onUpdate:modelValue"],yn={class:"flex-grow"},hn={class:"text-text text-base"},wn=`
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
`,An=L({__name:"ParametricSurfaceView",setup(e){const l=O(ln),t=Ke(l),s=`
${wn}
${bn}

@group(0) @binding(0) var<uniform> uGlobal: GlobalData;
@group(0) @binding(1) var<uniform> uSurface: SurfaceData;
`,u=(c,[f,d])=>{const y=h=>{switch(h){case 1:return"vec1f(position.y)";case 2:return"position.yz";case 3:return"position.yzw";default:return"0.0"}};return`fn surface(position: vec4f) -> vec4f {
  return ${(h=>D=>{switch(h){case 1:return`vec4(1.0, ${D}[0], 0.0, 0.0)`;case 2:return`vec4(1.0, ${D}, 0.0)`;case 3:return`vec4(1.0, ${D})`;default:return"vec4(1.0, 0.0, 0.0, 0.0)"}})(d)(`${c}(${y(f)})`)};
}`},r=(c,f)=>`
${rn()}

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

${s}

${c}

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
`,n=O(null),a=ct(s),i=ge(a.uniforms.uGlobal);i.set({projection:U.perspective(Math.PI/4,1920/1080,.1,1e3),view:U.translation([0,0,0]),args:[0,0,0,0]});const g={},v={alphaMode:"premultiplied",size:[1920,1080],autoResize:!1},p=c=>{const f={state:null,valid:!1,onCreate(d){console.log("Resource::onCreate"),!f.state&&(f.state=c.create(d))},onUpdate(d){var y,C;f.valid||((y=f.onDelete)==null||y.call(f,d),(C=f.onCreate)==null||C.call(f,d),f.valid=!0)},onDelete(d){console.log("Resource::onDelete"),f.state&&(c.delete(d,f.state),f.state=null)}};return f},o=c=>[[],[Math.pow(c,3*2)],[Math.pow(c,3),Math.pow(c,3)],[Math.pow(c,2),Math.pow(c,2),Math.pow(c,2)]],x=p({create({device:c}){return o(3).map(Wt).map(d=>({vertices:vt(c,d,{shaderLocation:0,stepMode:"vertex",interleave:!0}),topology:1}))},delete({device:c},f){}}),m=p({create({device:c,format:f}){return{uniforms:c.createBuffer({size:i.arrayBuffer.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST})}},delete({device:c},f){}}),_=p({create({device:c,format:f}){if(!m.state||!x.state||!n.value)return null;const{source:d,info:y}=n.value;return y.functions.map((C,h)=>{const[D,E]=ke(C),$=c.createShaderModule({code:r(d,u(C.name,[D,E]))}),{uniforms:P}=m.state,{vertices:Q}=x.state[D],z=c.createRenderPipeline({layout:"auto",vertex:{module:$,entryPoint:"vertexMain",buffers:Q.bufferLayouts},fragment:{module:$,entryPoint:"fragmentMain",targets:[{format:f}]},primitive:{topology:Zt[1]}});g[h]=ge(a.uniforms.uSurface);const J=c.createBuffer({size:g[h].arrayBuffer.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),G=c.createBindGroup({layout:z.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:P}},{binding:1,resource:{buffer:J}}]});return{pipeline:z,bindGroup:G,uniforms:J}})},delete({device:c},f){}}),{listeners:S,transformInplace:A}=Kt([-8,0,0]),X={onCreate(c){var f,d,y;console.log("ParametricSurfaceView::onCreate"),(f=m.onUpdate)==null||f.call(m,c),m.state&&((d=x.onUpdate)==null||d.call(x,c),x.state&&((y=_.onUpdate)==null||y.call(_,c),_.state))},onRender(c){var P,Q,z;const{device:f,context:d,timestamp:y}=c;if((P=m.onUpdate)==null||P.call(m,c),!m.state||((Q=x.onUpdate)==null||Q.call(x,c),!x.state)||((z=_.onUpdate)==null||z.call(_,c),!_.state))return;const C=f.createCommandEncoder(),h=C.beginRenderPass({colorAttachments:[{clearValue:Float32Array.of(0,0,0,0),loadOp:"clear",storeOp:"store",view:d.getCurrentTexture().createView()}]});if(!n.value)return null;const{info:D}=n.value,{uniforms:E}=m.state;i.set({args:t.options.args,time:y/1e3}),A(i.views.view),f.queue.writeBuffer(E,0,i.arrayBuffer),D.functions.forEach((J,G)=>{const[Ue,In]=ke(J),ue=t.options.functions[G];if(!ue.visible)return;const{vertices:ee}=x.state[Ue],{pipeline:Le,bindGroup:Xe,uniforms:Ge}=_.state[G];g[G].set({model:_t(ue.extent),color:gt(ue.color).gl()}),f.queue.writeBuffer(Ge,0,g[G].arrayBuffer),h.setPipeline(Le),h.setBindGroup(0,Xe),h.setVertexBuffer(0,ee.buffers[0]),h.setIndexBuffer(ee.indexBuffer,ee.indexFormat),h.drawIndexed(ee.numElements)}),h.end();const $=C.finish();f.queue.submit([$])},onDelete(c){var f,d,y;console.log("ParametricSurfaceView::Delete"),(f=_.onDelete)==null||f.call(_,c),(d=x.onDelete)==null||d.call(x,c),(y=m.onDelete)==null||y.call(m,c)}},le=c=>({source:c.replaceAll("@plot","/*@plot*/"),info:an(c)}),Fe=c=>{const f=fe(c.domain);return[ce(-1,f),ce(1,f)]},Ne=({info:c})=>({functions:c.functions.map(f=>({name:f.name,color:"#ffffff",extent:Fe(f),visible:!0}))}),Te=(c,f)=>{var d;return{args:c.args??f.args,functions:((d=c.functions)==null?void 0:d.map((y,C)=>{const h=f.functions[C];return{color:(h==null?void 0:h.color)??y.color,extent:[y.extent[0].map((D,E)=>{var $,P;return((P=($=h==null?void 0:h.extent)==null?void 0:$[0])==null?void 0:P[E])??D}),y.extent[1].map((D,E)=>{var $,P;return((P=($=h==null?void 0:h.extent)==null?void 0:$[1])==null?void 0:P[E])??D})],visible:(h==null?void 0:h.visible)??y.visible}}))??f.functions}},de=c=>{const f=le(c.source);n.value=f,c.options=Te(Ne(f),c.options),_.valid=!1},Ee=c=>{switch(c.key){case"Enter":return c.shiftKey;case"s":case"S":return c.ctrlKey||c.metaKey;default:return!1}};Ze(document,"keydown",c=>{Ee(c)&&(c.stopPropagation(),c.preventDefault(),de(t))}),Ye(l,de,{immediate:!0});const se=c=>{var f,d,y;return(y=(d=(f=n.value)==null?void 0:f.info)==null?void 0:d.functions)==null?void 0:y[c]};return(c,f)=>(F(),N(Z,null,[b("header",sn,[un,cn,I(ft,{modelValue:l.value,"onUpdate:modelValue":f[0]||(f[0]=d=>l.value=d)},null,8,["modelValue"]),I(it)]),I(w(xt),{as:"main",class:"flex-grow flex flex-col overflow-hidden","default-index":2},{default:B(()=>[I(w(mt),{class:"flex flex-row md:hidden"},{default:B(()=>[I(w(ye),{class:"tab"},{default:B(()=>[K("Input")]),_:1}),I(w(ye),{class:"tab"},{default:B(()=>[K("Output")]),_:1})]),_:1}),I(w(dt),{class:"h-full md:grid md:grid-cols-2 border-y-2 border-border"},{default:B(()=>[I(w(he),{class:"h-full ui-not-selected:hidden md:ui-not-selected:grid grid grid-rows-1 overflow-hidden",static:!0},{default:B(()=>[I(He,{modelValue:w(t).source,"onUpdate:modelValue":f[1]||(f[1]=d=>w(t).source=d)},null,8,["modelValue"])]),_:1}),I(w(he),{class:"h-full ui-not-selected:hidden md:ui-not-selected:grid grid grid-rows-2 overflow-hidden",static:!0},{default:B(()=>[(F(),We(Qe,null,{default:B(()=>[b("div",fn,[I(pt,{renderer:X,listeners:w(S),options:v},null,8,["listeners"])])]),_:1})),b("div",mn,[b("details",null,[dn,(F(!0),N(Z,null,ne(M(0,4),d=>(F(),N("div",{class:"flex flex-row items-center gap-2",key:d},[b("label",pn,"args["+j(d)+"]:",1),Y(b("input",{class:"w-16",type:"number",step:"0.1","onUpdate:modelValue":y=>w(t).options.args[d]=y},null,8,xn),[[H,w(t).options.args[d]]]),Y(b("input",{class:"flex-grow",type:"range",min:"-1",max:"1",step:"0.01","onUpdate:modelValue":y=>w(t).options.args[d]=y},null,8,vn),[[H,w(t).options.args[d]]])]))),128))]),(F(!0),N(Z,null,ne(w(t).options.functions,(d,y)=>{var C,h,D,E,$;return F(),N("details",{key:y},[b("summary",_n,[Y(b("input",{class:"w-8 h-8",name:"fill",type:"color","onUpdate:modelValue":P=>d.color=P},null,8,gn),[[H,d.color]]),b("h2",yn,[K(j((C=se(y))==null?void 0:C.name)+": ",1),b("span",hn,j((D=(h=se(y))==null?void 0:h.domain)==null?void 0:D.name)+" → "+j(($=(E=se(y))==null?void 0:E.codomain)==null?void 0:$.name),1)]),I(Lt,{modelValue:d.visible,"onUpdate:modelValue":P=>d.visible=P},null,8,["modelValue","onUpdate:modelValue"])]),I(qt,{modelValue:d.extent,"onUpdate:modelValue":P=>d.extent=P},null,8,["modelValue","onUpdate:modelValue"])])}),128))])]),_:1})]),_:1})]),_:1})],64))}}),Mn=$e(An,[["__scopeId","data-v-e1910b6a"]]);export{Mn as default};
