import{w as re,r as O,c as T,i as Me,p as Re,d as L,o as qe,a as ze,n as q,b as F,e as N,f as h,u as Se,g as A,h as me,j as w,k as ne,l as B,m as K,t as G,F as Z,q as Y,v as H,s as Ke,x as Ze,y as Ye,z as He,_ as We,A as Qe,S as Je,B as et,C as tt}from"./index-CDDXiIMs.js";import{c as Ce,o as I,w as De,h as Oe,i as nt,u as rt,A as ae,a as ie,s as at,N as pe,b as R,v as ot,d as ve,_ as $e,O as lt,r as M,f as se,e as ct,l as ut,g as _e,j as st,k as ge,m as ft,n as it,p as dt,x as ye,I as xt,y as ke,q as mt}from"./ToggleDarkButton.vue_vue_type_script_setup_true_lang-BdetDtwM.js";import{_ as Ve,m as U,a as pt,b as we,c as vt,d as _t,r as gt,e as yt}from"./webgpu-utils.module-DseAyB5g.js";function kt(){return/iPhone/gi.test(window.navigator.platform)||/Mac/gi.test(window.navigator.platform)&&window.navigator.maxTouchPoints>0}function wt(){return/Android/gi.test(window.navigator.userAgent)}function ht(){return kt()||wt()}function te(e,l,t){Ce.isServer||re(c=>{document.addEventListener(e,l,t),c(()=>document.removeEventListener(e,l,t))})}function bt(e,l,t){Ce.isServer||re(c=>{window.addEventListener(e,l,t),c(()=>window.removeEventListener(e,l,t))})}function At(e,l,t=T(()=>!0)){function c(r,n){if(!t.value||r.defaultPrevented)return;let a=n(r);if(a===null||!a.getRootNode().contains(a))return;let f=function _(d){return typeof d=="function"?_(d()):Array.isArray(d)||d instanceof Set?d:[d]}(e);for(let _ of f){if(_===null)continue;let d=_ instanceof HTMLElement?_:I(_);if(d!=null&&d.contains(a)||r.composed&&r.composedPath().includes(d))return}return!De(a,Oe.Loose)&&a.tabIndex!==-1&&r.preventDefault(),l(r,a)}let s=O(null);te("pointerdown",r=>{var n,a;t.value&&(s.value=((a=(n=r.composedPath)==null?void 0:n.call(r))==null?void 0:a[0])||r.target)},!0),te("mousedown",r=>{var n,a;t.value&&(s.value=((a=(n=r.composedPath)==null?void 0:n.call(r))==null?void 0:a[0])||r.target)},!0),te("click",r=>{ht()||s.value&&(c(r,()=>s.value),s.value=null)},!0),te("touchend",r=>c(r,()=>r.target instanceof HTMLElement?r.target:null),!0),bt("blur",r=>c(r,()=>window.document.activeElement instanceof HTMLIFrameElement?window.document.activeElement:null),!0)}function he(e){return[e.screenX,e.screenY]}function It(){let e=O([-1,-1]);return{wasMoved(l){let t=he(l);return e.value[0]===t[0]&&e.value[1]===t[1]?!1:(e.value=t,!0)},update(l){e.value=he(l)}}}function Pt({container:e,accept:l,walk:t,enabled:c}){re(()=>{let s=e.value;if(!s||c!==void 0&&!c.value)return;let r=nt(e);if(!r)return;let n=Object.assign(f=>l(f),{acceptNode:l}),a=r.createTreeWalker(s,NodeFilter.SHOW_ELEMENT,n,!1);for(;a.nextNode();)t(a.currentNode)})}let Be=Symbol("Context");var W=(e=>(e[e.Open=1]="Open",e[e.Closed=2]="Closed",e[e.Closing=4]="Closing",e[e.Opening=8]="Opening",e))(W||{});function Mt(){return Me(Be,null)}function Rt(e){Re(Be,e)}function St(e){throw new Error("Unexpected object: "+e)}var V=(e=>(e[e.First=0]="First",e[e.Previous=1]="Previous",e[e.Next=2]="Next",e[e.Last=3]="Last",e[e.Specific=4]="Specific",e[e.Nothing=5]="Nothing",e))(V||{});function Ct(e,l){let t=l.resolveItems();if(t.length<=0)return null;let c=l.resolveActiveIndex(),s=c??-1;switch(e.focus){case 0:{for(let r=0;r<t.length;++r)if(!l.resolveDisabled(t[r],r,t))return r;return c}case 1:{s===-1&&(s=t.length);for(let r=s-1;r>=0;--r)if(!l.resolveDisabled(t[r],r,t))return r;return c}case 2:{for(let r=s+1;r<t.length;++r)if(!l.resolveDisabled(t[r],r,t))return r;return c}case 3:{for(let r=t.length-1;r>=0;--r)if(!l.resolveDisabled(t[r],r,t))return r;return c}case 4:{for(let r=0;r<t.length;++r)if(l.resolveId(t[r],r,t)===e.id)return r;return c}case 5:return null;default:St(e)}}let be=/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;function Ae(e){var l,t;let c=(l=e.innerText)!=null?l:"",s=e.cloneNode(!0);if(!(s instanceof HTMLElement))return c;let r=!1;for(let a of s.querySelectorAll('[hidden],[aria-hidden],[role="img"]'))a.remove(),r=!0;let n=r?(t=s.innerText)!=null?t:"":c;return be.test(n)&&(n=n.replace(be,"")),n}function Dt(e){let l=e.getAttribute("aria-label");if(typeof l=="string")return l.trim();let t=e.getAttribute("aria-labelledby");if(t){let c=t.split(" ").map(s=>{let r=document.getElementById(s);if(r){let n=r.getAttribute("aria-label");return typeof n=="string"?n.trim():Ae(r).trim()}return null}).filter(Boolean);if(c.length>0)return c.join(", ")}return Ae(e).trim()}function Ot(e){let l=O(""),t=O("");return()=>{let c=I(e);if(!c)return"";let s=c.innerText;if(l.value===s)return t.value;let r=Dt(c).trim().toLowerCase();return l.value=s,t.value=r,r}}var $t=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))($t||{}),Vt=(e=>(e[e.Pointer=0]="Pointer",e[e.Other=1]="Other",e))(Vt||{});function Bt(e){requestAnimationFrame(()=>requestAnimationFrame(e))}let Fe=Symbol("MenuContext");function oe(e){let l=Me(Fe,null);if(l===null){let t=new Error(`<${e} /> is missing a parent <Menu /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(t,oe),t}return l}let Ft=L({name:"Menu",props:{as:{type:[Object,String],default:"template"}},setup(e,{slots:l,attrs:t}){let c=O(1),s=O(null),r=O(null),n=O([]),a=O(""),f=O(null),_=O(1);function d(o=v=>v){let v=f.value!==null?n.value[f.value]:null,x=lt(o(n.value.slice()),S=>I(S.dataRef.domRef)),g=v?x.indexOf(v):null;return g===-1&&(g=null),{items:x,activeItemIndex:g}}let p={menuState:c,buttonRef:s,itemsRef:r,items:n,searchQuery:a,activeItemIndex:f,activationTrigger:_,closeMenu:()=>{c.value=1,f.value=null},openMenu:()=>c.value=0,goToItem(o,v,x){let g=d(),S=Ct(o===V.Specific?{focus:V.Specific,id:v}:{focus:o},{resolveItems:()=>g.items,resolveActiveIndex:()=>g.activeItemIndex,resolveId:b=>b.id,resolveDisabled:b=>b.dataRef.disabled});a.value="",f.value=S,_.value=x??1,n.value=g.items},search(o){let v=a.value!==""?0:1;a.value+=o.toLowerCase();let x=(f.value!==null?n.value.slice(f.value+v).concat(n.value.slice(0,f.value+v)):n.value).find(S=>S.dataRef.textValue.startsWith(a.value)&&!S.dataRef.disabled),g=x?n.value.indexOf(x):-1;g===-1||g===f.value||(f.value=g,_.value=1)},clearSearch(){a.value=""},registerItem(o,v){let x=d(g=>[...g,{id:o,dataRef:v}]);n.value=x.items,f.value=x.activeItemIndex,_.value=1},unregisterItem(o){let v=d(x=>{let g=x.findIndex(S=>S.id===o);return g!==-1&&x.splice(g,1),x});n.value=v.items,f.value=v.activeItemIndex,_.value=1}};return At([s,r],(o,v)=>{var x;p.closeMenu(),De(v,Oe.Loose)||(o.preventDefault(),(x=I(s))==null||x.focus())},T(()=>c.value===0)),Re(Fe,p),Rt(T(()=>rt(c.value,{0:W.Open,1:W.Closed}))),()=>{let o={open:c.value===0,close:p.closeMenu};return ae({ourProps:{},theirProps:e,slot:o,slots:l,attrs:t,name:"Menu"})}}}),Nt=L({name:"MenuButton",props:{disabled:{type:Boolean,default:!1},as:{type:[Object,String],default:"button"},id:{type:String,default:null}},setup(e,{attrs:l,slots:t,expose:c}){var s;let r=(s=e.id)!=null?s:`headlessui-menu-button-${ie()}`,n=oe("MenuButton");c({el:n.buttonRef,$el:n.buttonRef});function a(p){switch(p.key){case R.Space:case R.Enter:case R.ArrowDown:p.preventDefault(),p.stopPropagation(),n.openMenu(),q(()=>{var o;(o=I(n.itemsRef))==null||o.focus({preventScroll:!0}),n.goToItem(V.First)});break;case R.ArrowUp:p.preventDefault(),p.stopPropagation(),n.openMenu(),q(()=>{var o;(o=I(n.itemsRef))==null||o.focus({preventScroll:!0}),n.goToItem(V.Last)});break}}function f(p){switch(p.key){case R.Space:p.preventDefault();break}}function _(p){e.disabled||(n.menuState.value===0?(n.closeMenu(),q(()=>{var o;return(o=I(n.buttonRef))==null?void 0:o.focus({preventScroll:!0})})):(p.preventDefault(),n.openMenu(),Bt(()=>{var o;return(o=I(n.itemsRef))==null?void 0:o.focus({preventScroll:!0})})))}let d=at(T(()=>({as:e.as,type:l.type})),n.buttonRef);return()=>{var p;let o={open:n.menuState.value===0},{...v}=e,x={ref:n.buttonRef,id:r,type:d.value,"aria-haspopup":"menu","aria-controls":(p=I(n.itemsRef))==null?void 0:p.id,"aria-expanded":n.menuState.value===0,onKeydown:a,onKeyup:f,onClick:_};return ae({ourProps:x,theirProps:v,slot:o,attrs:l,slots:t,name:"MenuButton"})}}}),Tt=L({name:"MenuItems",props:{as:{type:[Object,String],default:"div"},static:{type:Boolean,default:!1},unmount:{type:Boolean,default:!0},id:{type:String,default:null}},setup(e,{attrs:l,slots:t,expose:c}){var s;let r=(s=e.id)!=null?s:`headlessui-menu-items-${ie()}`,n=oe("MenuItems"),a=O(null);c({el:n.itemsRef,$el:n.itemsRef}),Pt({container:T(()=>I(n.itemsRef)),enabled:T(()=>n.menuState.value===0),accept(o){return o.getAttribute("role")==="menuitem"?NodeFilter.FILTER_REJECT:o.hasAttribute("role")?NodeFilter.FILTER_SKIP:NodeFilter.FILTER_ACCEPT},walk(o){o.setAttribute("role","none")}});function f(o){var v;switch(a.value&&clearTimeout(a.value),o.key){case R.Space:if(n.searchQuery.value!=="")return o.preventDefault(),o.stopPropagation(),n.search(o.key);case R.Enter:if(o.preventDefault(),o.stopPropagation(),n.activeItemIndex.value!==null){let x=n.items.value[n.activeItemIndex.value];(v=I(x.dataRef.domRef))==null||v.click()}n.closeMenu(),$e(I(n.buttonRef));break;case R.ArrowDown:return o.preventDefault(),o.stopPropagation(),n.goToItem(V.Next);case R.ArrowUp:return o.preventDefault(),o.stopPropagation(),n.goToItem(V.Previous);case R.Home:case R.PageUp:return o.preventDefault(),o.stopPropagation(),n.goToItem(V.First);case R.End:case R.PageDown:return o.preventDefault(),o.stopPropagation(),n.goToItem(V.Last);case R.Escape:o.preventDefault(),o.stopPropagation(),n.closeMenu(),q(()=>{var x;return(x=I(n.buttonRef))==null?void 0:x.focus({preventScroll:!0})});break;case R.Tab:o.preventDefault(),o.stopPropagation(),n.closeMenu(),q(()=>ot(I(n.buttonRef),o.shiftKey?ve.Previous:ve.Next));break;default:o.key.length===1&&(n.search(o.key),a.value=setTimeout(()=>n.clearSearch(),350));break}}function _(o){switch(o.key){case R.Space:o.preventDefault();break}}let d=Mt(),p=T(()=>d!==null?(d.value&W.Open)===W.Open:n.menuState.value===0);return()=>{var o,v;let x={open:n.menuState.value===0},{...g}=e,S={"aria-activedescendant":n.activeItemIndex.value===null||(o=n.items.value[n.activeItemIndex.value])==null?void 0:o.id,"aria-labelledby":(v=I(n.buttonRef))==null?void 0:v.id,id:r,onKeydown:f,onKeyup:_,role:"menu",tabIndex:0,ref:n.itemsRef};return ae({ourProps:S,theirProps:g,slot:x,attrs:l,slots:t,features:pe.RenderStrategy|pe.Static,visible:p.value,name:"MenuItems"})}}}),Et=L({name:"MenuItem",inheritAttrs:!1,props:{as:{type:[Object,String],default:"template"},disabled:{type:Boolean,default:!1},id:{type:String,default:null}},setup(e,{slots:l,attrs:t,expose:c}){var s;let r=(s=e.id)!=null?s:`headlessui-menu-item-${ie()}`,n=oe("MenuItem"),a=O(null);c({el:a,$el:a});let f=T(()=>n.activeItemIndex.value!==null?n.items.value[n.activeItemIndex.value].id===r:!1),_=Ot(a),d=T(()=>({disabled:e.disabled,get textValue(){return _()},domRef:a}));qe(()=>n.registerItem(r,d)),ze(()=>n.unregisterItem(r)),re(()=>{n.menuState.value===0&&f.value&&n.activationTrigger.value!==0&&q(()=>{var b,j;return(j=(b=I(a))==null?void 0:b.scrollIntoView)==null?void 0:j.call(b,{block:"nearest"})})});function p(b){if(e.disabled)return b.preventDefault();n.closeMenu(),$e(I(n.buttonRef))}function o(){if(e.disabled)return n.goToItem(V.Nothing);n.goToItem(V.Specific,r)}let v=It();function x(b){v.update(b)}function g(b){v.wasMoved(b)&&(e.disabled||f.value||n.goToItem(V.Specific,r,0))}function S(b){v.wasMoved(b)&&(e.disabled||f.value&&n.goToItem(V.Nothing))}return()=>{let{disabled:b,...j}=e,le={active:f.value,disabled:b,close:n.closeMenu};return ae({ourProps:{id:r,ref:a,role:"menuitem",tabIndex:b===!0?void 0:-1,"aria-disabled":b===!0?!0:void 0,onClick:p,onFocus:o,onPointerenter:x,onMouseenter:x,onPointermove:g,onMousemove:g,onPointerleave:S,onMouseleave:S},theirProps:{...t,...j},slot:le,attrs:t,slots:l,name:"MenuItem"})}}});function Ut(e,l){return F(),N("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true","data-slot":"icon"},[h("path",{d:"M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z"}),h("path",{d:"M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z"}),h("path",{d:"M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z"})])}function Lt(e,l){return F(),N("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true","data-slot":"icon"},[h("path",{d:"M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"}),h("path",{"fill-rule":"evenodd",d:"M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z","clip-rule":"evenodd"})])}const jt=L({__name:"ToggleVisibleButton",props:{modelValue:{type:Boolean}},emits:["update:modelValue"],setup(e,{emit:l}){const s=Se(e,"modelValue",l),r=()=>{s.value=!s.value};return(n,a)=>(F(),N("button",{class:"rounded-lg p-2",type:"button",onClick:a[0]||(a[0]=f=>r())},[A(w(Ut),{class:me(["w-5 h-5",[w(s)?"hidden":"visible"]])},null,8,["class"]),A(w(Lt),{class:me(["w-5 h-5",[w(s)?"visible":"hidden"]])},null,8,["class"])]))}}),Xt=["onUpdate:modelValue"],Gt=["onUpdate:modelValue"],qt=L({__name:"ExtentInput",props:{modelValue:{}},emits:["update:modelValue"],setup(e,{emit:l}){const s=Se(e,"modelValue",l),r=(f,_)=>{s.value=[s.value[0].map((d,p)=>f==p?_[0]:d),s.value[1].map((d,p)=>f==p?_[1]:d)]},n=T(()=>M(0,s.value[0].length)),a=[{name:"-1, +1",value:[-1,1]},{name:"-π, +π",value:[-Math.PI,+Math.PI]},{name:"-π/2, +π/2",value:[-Math.PI/2,+Math.PI/2]}];return(f,_)=>(F(!0),N(Z,null,ne(n.value,d=>(F(),N("div",{class:"flex flex-row items-center gap-2",key:d},[A(w(Ft),{as:"div",class:"relative inline-block text-left"},{default:B(()=>[A(w(Nt),{class:"w-16 text-xs text-right font-mono"},{default:B(()=>[K("x["+G(d)+"]:",1)]),_:2},1024),A(w(Tt),{class:"absolute left-0 mt-2 w-32 origin-top-left divide-y divide-border bg-background-mute shadow-lg ring-1 ring-border-hover focus:outline-none z-50"},{default:B(()=>[(F(),N(Z,null,ne(a,p=>A(w(Et),{as:"div",class:"menu-item text-center",onClick:o=>r(d,p.value)},{default:B(()=>[K(G(p.name),1)]),_:2},1032,["onClick"])),64))]),_:2},1024)]),_:2},1024),Y(h("input",{class:"w-16",type:"number",step:"0.1","onUpdate:modelValue":p=>w(s)[0][d]=p},null,8,Xt),[[H,w(s)[0][d]]]),Y(h("input",{class:"w-16",type:"number",step:"0.1","onUpdate:modelValue":p=>w(s)[1][d]=p},null,8,Gt),[[H,w(s)[1][d]]])]))),128))}}),zt=Ve(qt,[["__scopeId","data-v-abc9a19b"]]),Kt=(e,l)=>t=>Math.max(e,Math.min(t,l)),Ie=Kt(-100,-.1);function Zt(e,l){const t=Ke({isDown:!1,position:e??[-1,0,0],origin:[0,0,0]});let c;const s={wheel:a=>{a.preventDefault();const f=a.deltaY/100;t.position[0]=Ie(t.position[0]+f)},pointerdown:a=>{t.isDown=!0,a.target.setPointerCapture(a.pointerId)},pointermove:a=>{if(!t.isDown)return;const f=a.target,_=[f.width,f.height],d=Math.min(..._),p=[+a.movementX*4/d,+a.movementY*4/d,0];if(a.altKey||a.metaKey){const o=-t.position[0]/4.8;t.origin[0]+=p[0]*o,t.origin[1]-=p[1]*o}else t.position[1]+=p[0],t.position[2]+=p[1]},pointerup:a=>{t.isDown=!1},touchstart:a=>{a.preventDefault()},touchmove:a=>{if(a.preventDefault(),a.targetTouches.length===2){const f=a.targetTouches[0],_=a.targetTouches[1];let d=Math.hypot(f.pageX-_.pageX,f.pageY-_.pageY);if(c!==void 0){const p=d/c;t.position[0]=Ie(t.position[0]*p)}c=d}},touchend:a=>{a.preventDefault(),c=void 0}},r=a=>(U.identity(a),U.translate(a,[0,0,t.position[0]],a),U.rotateY(a,t.position[2],a),U.rotateZ(a,t.position[1],a),U.translate(a,t.origin,a),a),n=T(()=>r(U.create()));return{listeners:s,transform:n,transformInplace:r}}const Yt={0:"point-list",1:"line-list",2:"triangle-list"},Ht=e=>ct(e.map(l=>ut(-1,1,l))),Wt=e=>{const l=e.length,t=_e(st(_e(e))),c=r=>r*t[0],s=(r,n)=>r*t[0]+n*t[1];switch(l){case 1:return M(0,e[0]-1).map(n=>[c(n+0),c(n+1)]);case 2:{const r=M(0,e[0]).flatMap(a=>M(0,e[1]-1).map(f=>[s(a,f+0),s(a,f+1)])),n=M(0,e[1]).flatMap(a=>M(0,e[0]-1).map(f=>[s(f+0,a),s(f+1,a)]));return ge(r,n)}case 3:{const r=M(0,e[0]).flatMap(f=>M(0,e[1]).flatMap(_=>M(0,e[2]-1).map(d=>[f*t[0]+_*t[1]+(d+0)*t[2],f*t[0]+_*t[1]+(d+1)*t[2]]))),n=M(0,e[0]).flatMap(f=>M(0,e[2]).flatMap(_=>M(0,e[1]-1).map(d=>[f*t[0]+(d+0)*t[1]+_*t[2],f*t[0]+(d+1)*t[1]+_*t[2]]))),a=M(0,e[1]).flatMap(f=>M(0,e[2]).flatMap(_=>M(0,e[0]-1).map(d=>[(d+0)*t[0]+f*t[1]+_*t[2],(d+1)*t[0]+f*t[1]+_*t[2]])));return ge(r,n,a)}}return[]},Qt=e=>{const l=Ht(e).map(s=>[1,s[0]??0,s[1]??0,s[2]??0]),t=se([1,1,1,1],l.length),c=Wt(e);return{position:{data:l.flat(1),type:Float32Array,numComponents:4},color:{data:t.flat(1),type:Float32Array,numComponents:4},indices:{data:c.flat(1),type:Uint32Array}}},Jt=`const mat2x2f_I = mat2x2f(1,0,0,1);
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
`,en=`struct cf32 {
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
`,tn=`alias gcf32 = vec2f;

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
`,nn=`alias dcl2vec = vec2f;
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
`,rn=`
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
`,an=`
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
`,on=()=>`
${rn}
${en}
${an}
${tn}
${nn}
${Jt}
`,ln=e=>{const l=/@plot\s+fn\s+(?<name>\w+)\s*\(\w+:\s*(?<domain>\w+)\)\s*->\s*(?<codomain>\w+)/g,t=[];let c;do c=l.exec(e),c&&c.groups&&t.push({name:c.groups.name,domain:{name:c.groups.domain},codomain:{name:c.groups.codomain}});while(c);return{functions:t}},fe=e=>{switch(e.name){case"vec1f":return 1;case"vec2f":return 2;case"vec3f":return 3;case"vec4f":return 4}return 0},Pe=e=>[fe(e.domain),fe(e.codomain)],cn=`@plot
fn f(x: vec2f) -> vec3f {
  return vec3f(x[0], x[1], sin(x[0])*cos(x[1]));
}`,un={source:cn,options:{args:[0,0,0,0],functions:[{color:"#ffffff",extent:[[-Math.PI,-Math.PI],[+Math.PI,+Math.PI]],visible:!0}]}},de=e=>(et("data-v-421b8168"),e=e(),tt(),e),sn={class:"flex flex-row items-center h-12 p-1 border-b-2 border-border"},fn=de(()=>h("h1",{class:"px-2"},"Parametric Surface",-1)),dn=de(()=>h("span",{class:"flex-grow"},null,-1)),xn={class:"flex flex-row items-center justify-center overflow-hidden show-focus-within"},mn={class:"flex flex-col p-2"},pn=de(()=>h("summary",{class:"flex flex-row items-center gap-2 my-1"},[h("h2",null,"Global")],-1)),vn={class:"w-16 text-xs text-right font-mono"},_n=["onUpdate:modelValue"],gn=["onUpdate:modelValue"],yn={class:"flex flex-row items-center gap-2 my-1"},kn=["onUpdate:modelValue"],wn={class:"flex-grow"},hn={class:"text-text text-base"},bn=`
struct GlobalData {
  projection: mat4x4f,
  view: mat4x4f,
  args: vec4f,
  time: f32,
}
`,An=`
struct SurfaceData {
  model: mat4x4f,
  color: vec4f,
}
`,In=L({__name:"ParametricSurfaceView",setup(e){const l=O(un),t=Ze(l),c=`
${bn}
${An}

@group(0) @binding(0) var<uniform> uGlobal: GlobalData;
@group(0) @binding(1) var<uniform> uSurface: SurfaceData;
`,s=(u,[i,m])=>{const y=k=>{switch(k){case 1:return"vec1f(position.y)";case 2:return"position.yz";case 3:return"position.yzw";default:return"0.0"}};return`fn surface(position: vec4f) -> vec4f {
  return ${(k=>D=>{switch(k){case 1:return`vec4(1.0, ${D}[0], 0.0, 0.0)`;case 2:return`vec4(1.0, ${D}, 0.0)`;case 3:return`vec4(1.0, ${D})`;default:return"vec4(1.0, 0.0, 0.0, 0.0)"}})(m)(`${u}(${y(i)})`)};
}`},r=(u,i)=>`
${on()}

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

${u}

${i}

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
`,n=O(null),a=pt(c),f=we(a.uniforms.uGlobal);f.set({projection:U.perspective(Math.PI/4,1920/1080,.1,1e3),view:U.translation([0,0,0]),args:[0,0,0,0]});const _={},d={alphaMode:"premultiplied",size:[1920,1080],autoResize:!1},p=u=>{const i={state:null,valid:!1,onCreate(m){console.log("Resource::onCreate"),!i.state&&(i.state=u.create(m))},onUpdate(m){var y,C;i.valid||((y=i.onDelete)==null||y.call(i,m),(C=i.onCreate)==null||C.call(i,m),i.valid=!0)},onDelete(m){console.log("Resource::onDelete"),i.state&&(u.delete(m,i.state),i.state=null)}};return i},o=u=>[[],[Math.pow(u,3*2)],[Math.pow(u,3),Math.pow(u,3)],[Math.pow(u,2),Math.pow(u,2),Math.pow(u,2)]],v=p({create({device:u}){return o(3).map(Qt).map(m=>({vertices:_t(u,m,{shaderLocation:0,stepMode:"vertex",interleave:!0}),topology:1}))},delete({device:u},i){}}),x=p({create({device:u,format:i}){return{uniforms:u.createBuffer({size:f.arrayBuffer.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST})}},delete({device:u},i){}}),g=p({create({device:u,format:i}){if(!x.state||!v.state||!n.value)return null;const{source:m,info:y}=n.value;return y.functions.map((C,k)=>{const[D,E]=Pe(C),$=u.createShaderModule({code:r(m,s(C.name,[D,E]))}),{uniforms:P}=x.state,{vertices:Q}=v.state[D],z=u.createRenderPipeline({layout:"auto",vertex:{module:$,entryPoint:"vertexMain",buffers:Q.bufferLayouts},fragment:{module:$,entryPoint:"fragmentMain",targets:[{format:i}]},primitive:{topology:Yt[1]}});_[k]=we(a.uniforms.uSurface);const J=u.createBuffer({size:_[k].arrayBuffer.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),X=u.createBindGroup({layout:z.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:P}},{binding:1,resource:{buffer:J}}]});return{pipeline:z,bindGroup:X,uniforms:J}})},delete({device:u},i){}}),{listeners:S,transformInplace:b}=Zt([-8,0,0]),j={onCreate(u){var i,m,y;console.log("ParametricSurfaceView::onCreate"),(i=x.onUpdate)==null||i.call(x,u),x.state&&((m=v.onUpdate)==null||m.call(v,u),v.state&&((y=g.onUpdate)==null||y.call(g,u),g.state))},onRender(u){var P,Q,z;const{device:i,context:m,timestamp:y}=u;if((P=x.onUpdate)==null||P.call(x,u),!x.state||((Q=v.onUpdate)==null||Q.call(v,u),!v.state)||((z=g.onUpdate)==null||z.call(g,u),!g.state))return;const C=i.createCommandEncoder(),k=C.beginRenderPass({colorAttachments:[{clearValue:Float32Array.of(0,0,0,0),loadOp:"clear",storeOp:"store",view:m.getCurrentTexture().createView()}]});if(!n.value)return null;const{info:D}=n.value,{uniforms:E}=x.state;f.set({args:t.options.args,time:y/1e3}),b(f.views.view),i.queue.writeBuffer(E,0,f.arrayBuffer),D.functions.forEach((J,X)=>{const[Le,Pn]=Pe(J),ue=t.options.functions[X];if(!ue.visible)return;const{vertices:ee}=v.state[Le],{pipeline:je,bindGroup:Xe,uniforms:Ge}=g.state[X];_[X].set({model:gt(ue.extent),color:yt(ue.color).gl()}),i.queue.writeBuffer(Ge,0,_[X].arrayBuffer),k.setPipeline(je),k.setBindGroup(0,Xe),k.setVertexBuffer(0,ee.buffers[0]),k.setIndexBuffer(ee.indexBuffer,ee.indexFormat),k.drawIndexed(ee.numElements)}),k.end();const $=C.finish();i.queue.submit([$])},onDelete(u){var i,m,y;console.log("ParametricSurfaceView::Delete"),(i=g.onDelete)==null||i.call(g,u),(m=v.onDelete)==null||m.call(v,u),(y=x.onDelete)==null||y.call(x,u)}},le=u=>({source:u.replaceAll("@plot","/*@plot*/"),info:ln(u)}),Ne=u=>{const i=fe(u.domain);return[se(-1,i),se(1,i)]},Te=({info:u})=>({functions:u.functions.map(i=>({name:i.name,color:"#ffffff",extent:Ne(i),visible:!0}))}),Ee=(u,i)=>{var m;return{args:u.args??i.args,functions:((m=u.functions)==null?void 0:m.map((y,C)=>{const k=i.functions[C];return{color:(k==null?void 0:k.color)??y.color,extent:[y.extent[0].map((D,E)=>{var $,P;return((P=($=k==null?void 0:k.extent)==null?void 0:$[0])==null?void 0:P[E])??D}),y.extent[1].map((D,E)=>{var $,P;return((P=($=k==null?void 0:k.extent)==null?void 0:$[1])==null?void 0:P[E])??D})],visible:(k==null?void 0:k.visible)??y.visible}}))??i.functions}},xe=u=>{const i=le(u.source);n.value=i,u.options=Ee(Te(i),u.options),g.valid=!1},Ue=u=>{switch(u.key){case"Enter":return u.shiftKey;case"s":case"S":return u.ctrlKey||u.metaKey;default:return!1}};Ye(document,"keydown",u=>{Ue(u)&&(u.stopPropagation(),u.preventDefault(),xe(t))}),He(l,xe,{immediate:!0});const ce=u=>{var i,m,y;return(y=(m=(i=n.value)==null?void 0:i.info)==null?void 0:m.functions)==null?void 0:y[u]};return(u,i)=>(F(),N(Z,null,[h("header",sn,[fn,dn,A(ft,{modelValue:l.value,"onUpdate:modelValue":i[0]||(i[0]=m=>l.value=m)},null,8,["modelValue"]),A(it)]),A(w(mt),{as:"main",class:"flex-grow flex flex-col overflow-hidden","default-index":2},{default:B(()=>[A(w(dt),{class:"flex flex-row md:hidden"},{default:B(()=>[A(w(ye),{class:"tab"},{default:B(()=>[K("Input")]),_:1}),A(w(ye),{class:"tab"},{default:B(()=>[K("Output")]),_:1})]),_:1}),A(w(xt),{class:"h-full md:grid md:grid-cols-2 border-y-2 border-border"},{default:B(()=>[A(w(ke),{class:"h-full ui-not-selected:hidden md:ui-not-selected:grid grid grid-rows-1 overflow-hidden",static:!0},{default:B(()=>[A(We,{modelValue:w(t).source,"onUpdate:modelValue":i[1]||(i[1]=m=>w(t).source=m)},null,8,["modelValue"])]),_:1}),A(w(ke),{class:"h-full ui-not-selected:hidden md:ui-not-selected:grid grid grid-rows-2 overflow-hidden",static:!0},{default:B(()=>[(F(),Qe(Je,null,{default:B(()=>[h("div",xn,[A(vt,{renderer:j,listeners:w(S),options:d},null,8,["listeners"])])]),_:1})),h("div",mn,[h("details",null,[pn,(F(!0),N(Z,null,ne(M(0,4),m=>(F(),N("div",{class:"flex flex-row items-center gap-2",key:m},[h("label",vn,"args["+G(m)+"]:",1),Y(h("input",{class:"w-16",type:"number",step:"0.1","onUpdate:modelValue":y=>w(t).options.args[m]=y},null,8,_n),[[H,w(t).options.args[m]]]),Y(h("input",{class:"flex-grow",type:"range",min:"-1",max:"1",step:"0.01","onUpdate:modelValue":y=>w(t).options.args[m]=y},null,8,gn),[[H,w(t).options.args[m]]])]))),128))]),(F(!0),N(Z,null,ne(w(t).options.functions,(m,y)=>{var C,k,D,E,$;return F(),N("details",{key:y},[h("summary",yn,[Y(h("input",{class:"w-8 h-8",name:"fill",type:"color","onUpdate:modelValue":P=>m.color=P},null,8,kn),[[H,m.color]]),h("h2",wn,[K(G((C=ce(y))==null?void 0:C.name)+": ",1),h("span",hn,G((D=(k=ce(y))==null?void 0:k.domain)==null?void 0:D.name)+" → "+G(($=(E=ce(y))==null?void 0:E.codomain)==null?void 0:$.name),1)]),A(jt,{modelValue:m.visible,"onUpdate:modelValue":P=>m.visible=P},null,8,["modelValue","onUpdate:modelValue"])]),A(zt,{modelValue:m.extent,"onUpdate:modelValue":P=>m.extent=P},null,8,["modelValue","onUpdate:modelValue"])])}),128))])]),_:1})]),_:1})]),_:1})],64))}}),Cn=Ve(In,[["__scopeId","data-v-421b8168"]]);export{Cn as default};
