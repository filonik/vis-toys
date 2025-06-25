import{w as fe,r as I,c as q,i as Be,p as Ee,d as V,o as ht,a as dt,n as E,b as W,e as Y,f as k,u as Fe,g as X,h as ye,j as $,k as le,l as z,m as L,t as B,F as K,q as J,v as ee,s as pt,x as mt,y as xt,z as Pt,S as gt,A as vt,B as Qt}from"./index-D9WPZsHN.js";import{P as _t,N as $t,a as kt,D as yt,b as Qe,T as oe,I as Xt,s as bt,t as x,i as Tt,c as St,d as Xe,L as wt,e as Rt,_ as At,f as It}from"./index-C7zLqgQ_.js";import{c as He,o as b,w as Ze,h as Le,i as Ut,u as Gt,A as he,a as _e,s as Ct,N as be,b as w,v as zt,d as Te,_ as Ke,O as Wt,r as S,f as ge,e as Yt,l as jt,g as Se,j as qt,k as we,m as Mt,n as Vt,p as Dt,x as Re,I as Nt,y as Ae,q as Bt}from"./ToggleDarkButton.vue_vue_type_script_setup_true_lang-BIMD3a6p.js";import{_ as Je,m as Ie,r as Et}from"./_plugin-vue_export-helper-CNz2D3kM.js";import{m as Ft,a as Ue,_ as Ht,c as Zt,b as Lt}from"./webgpu-utils.module-Cb39H4M0.js";import{u as Kt}from"./useCamera-BwMifShr.js";function Jt(){return/iPhone/gi.test(window.navigator.platform)||/Mac/gi.test(window.navigator.platform)&&window.navigator.maxTouchPoints>0}function er(){return/Android/gi.test(window.navigator.userAgent)}function tr(){return Jt()||er()}function ae(i,e,t){He.isServer||fe(r=>{document.addEventListener(i,e,t),r(()=>document.removeEventListener(i,e,t))})}function rr(i,e,t){He.isServer||fe(r=>{window.addEventListener(i,e,t),r(()=>window.removeEventListener(i,e,t))})}function nr(i,e,t=q(()=>!0)){function r(a,n){if(!t.value||a.defaultPrevented)return;let o=n(a);if(o===null||!o.getRootNode().contains(o))return;let l=function O(f){return typeof f=="function"?O(f()):Array.isArray(f)||f instanceof Set?f:[f]}(i);for(let O of l){if(O===null)continue;let f=O instanceof HTMLElement?O:b(O);if(f!=null&&f.contains(o)||a.composed&&a.composedPath().includes(f))return}return!Ze(o,Le.Loose)&&o.tabIndex!==-1&&a.preventDefault(),e(a,o)}let s=I(null);ae("pointerdown",a=>{var n,o;t.value&&(s.value=((o=(n=a.composedPath)==null?void 0:n.call(a))==null?void 0:o[0])||a.target)},!0),ae("mousedown",a=>{var n,o;t.value&&(s.value=((o=(n=a.composedPath)==null?void 0:n.call(a))==null?void 0:o[0])||a.target)},!0),ae("click",a=>{tr()||s.value&&(r(a,()=>s.value),s.value=null)},!0),ae("touchend",a=>r(a,()=>a.target instanceof HTMLElement?a.target:null),!0),rr("blur",a=>r(a,()=>window.document.activeElement instanceof HTMLIFrameElement?window.document.activeElement:null),!0)}function Ge(i){return[i.screenX,i.screenY]}function sr(){let i=I([-1,-1]);return{wasMoved(e){let t=Ge(e);return i.value[0]===t[0]&&i.value[1]===t[1]?!1:(i.value=t,!0)},update(e){i.value=Ge(e)}}}function ar({container:i,accept:e,walk:t,enabled:r}){fe(()=>{let s=i.value;if(!s||r!==void 0&&!r.value)return;let a=Ut(i);if(!a)return;let n=Object.assign(l=>e(l),{acceptNode:e}),o=a.createTreeWalker(s,NodeFilter.SHOW_ELEMENT,n,!1);for(;o.nextNode();)t(o.currentNode)})}let et=Symbol("Context");var te=(i=>(i[i.Open=1]="Open",i[i.Closed=2]="Closed",i[i.Closing=4]="Closing",i[i.Opening=8]="Opening",i))(te||{});function or(){return Be(et,null)}function ir(i){Ee(et,i)}function lr(i){throw new Error("Unexpected object: "+i)}var C=(i=>(i[i.First=0]="First",i[i.Previous=1]="Previous",i[i.Next=2]="Next",i[i.Last=3]="Last",i[i.Specific=4]="Specific",i[i.Nothing=5]="Nothing",i))(C||{});function Or(i,e){let t=e.resolveItems();if(t.length<=0)return null;let r=e.resolveActiveIndex(),s=r??-1;switch(i.focus){case 0:{for(let a=0;a<t.length;++a)if(!e.resolveDisabled(t[a],a,t))return a;return r}case 1:{s===-1&&(s=t.length);for(let a=s-1;a>=0;--a)if(!e.resolveDisabled(t[a],a,t))return a;return r}case 2:{for(let a=s+1;a<t.length;++a)if(!e.resolveDisabled(t[a],a,t))return a;return r}case 3:{for(let a=t.length-1;a>=0;--a)if(!e.resolveDisabled(t[a],a,t))return a;return r}case 4:{for(let a=0;a<t.length;++a)if(e.resolveId(t[a],a,t)===i.id)return a;return r}case 5:return null;default:lr(i)}}let Ce=/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;function ze(i){var e,t;let r=(e=i.innerText)!=null?e:"",s=i.cloneNode(!0);if(!(s instanceof HTMLElement))return r;let a=!1;for(let o of s.querySelectorAll('[hidden],[aria-hidden],[role="img"]'))o.remove(),a=!0;let n=a?(t=s.innerText)!=null?t:"":r;return Ce.test(n)&&(n=n.replace(Ce,"")),n}function cr(i){let e=i.getAttribute("aria-label");if(typeof e=="string")return e.trim();let t=i.getAttribute("aria-labelledby");if(t){let r=t.split(" ").map(s=>{let a=document.getElementById(s);if(a){let n=a.getAttribute("aria-label");return typeof n=="string"?n.trim():ze(a).trim()}return null}).filter(Boolean);if(r.length>0)return r.join(", ")}return ze(i).trim()}function ur(i){let e=I(""),t=I("");return()=>{let r=b(i);if(!r)return"";let s=r.innerText;if(e.value===s)return t.value;let a=cr(r).trim().toLowerCase();return e.value=s,t.value=a,a}}var fr=(i=>(i[i.Open=0]="Open",i[i.Closed=1]="Closed",i))(fr||{}),hr=(i=>(i[i.Pointer=0]="Pointer",i[i.Other=1]="Other",i))(hr||{});function dr(i){requestAnimationFrame(()=>requestAnimationFrame(i))}let tt=Symbol("MenuContext");function de(i){let e=Be(tt,null);if(e===null){let t=new Error(`<${i} /> is missing a parent <Menu /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(t,de),t}return e}let pr=V({name:"Menu",props:{as:{type:[Object,String],default:"template"}},setup(i,{slots:e,attrs:t}){let r=I(1),s=I(null),a=I(null),n=I([]),o=I(""),l=I(null),O=I(1);function f(u=p=>p){let p=l.value!==null?n.value[l.value]:null,d=Wt(u(n.value.slice()),Q=>b(Q.dataRef.domRef)),g=p?d.indexOf(p):null;return g===-1&&(g=null),{items:d,activeItemIndex:g}}let c={menuState:r,buttonRef:s,itemsRef:a,items:n,searchQuery:o,activeItemIndex:l,activationTrigger:O,closeMenu:()=>{r.value=1,l.value=null},openMenu:()=>r.value=0,goToItem(u,p,d){let g=f(),Q=Or(u===C.Specific?{focus:C.Specific,id:p}:{focus:u},{resolveItems:()=>g.items,resolveActiveIndex:()=>g.activeItemIndex,resolveId:y=>y.id,resolveDisabled:y=>y.dataRef.disabled});o.value="",l.value=Q,O.value=d??1,n.value=g.items},search(u){let p=o.value!==""?0:1;o.value+=u.toLowerCase();let d=(l.value!==null?n.value.slice(l.value+p).concat(n.value.slice(0,l.value+p)):n.value).find(Q=>Q.dataRef.textValue.startsWith(o.value)&&!Q.dataRef.disabled),g=d?n.value.indexOf(d):-1;g===-1||g===l.value||(l.value=g,O.value=1)},clearSearch(){o.value=""},registerItem(u,p){let d=f(g=>[...g,{id:u,dataRef:p}]);n.value=d.items,l.value=d.activeItemIndex,O.value=1},unregisterItem(u){let p=f(d=>{let g=d.findIndex(Q=>Q.id===u);return g!==-1&&d.splice(g,1),d});n.value=p.items,l.value=p.activeItemIndex,O.value=1}};return nr([s,a],(u,p)=>{var d;c.closeMenu(),Ze(p,Le.Loose)||(u.preventDefault(),(d=b(s))==null||d.focus())},q(()=>r.value===0)),Ee(tt,c),ir(q(()=>Gt(r.value,{0:te.Open,1:te.Closed}))),()=>{let u={open:r.value===0,close:c.closeMenu};return he({ourProps:{},theirProps:i,slot:u,slots:e,attrs:t,name:"Menu"})}}}),mr=V({name:"MenuButton",props:{disabled:{type:Boolean,default:!1},as:{type:[Object,String],default:"button"},id:{type:String,default:null}},setup(i,{attrs:e,slots:t,expose:r}){var s;let a=(s=i.id)!=null?s:`headlessui-menu-button-${_e()}`,n=de("MenuButton");r({el:n.buttonRef,$el:n.buttonRef});function o(c){switch(c.key){case w.Space:case w.Enter:case w.ArrowDown:c.preventDefault(),c.stopPropagation(),n.openMenu(),E(()=>{var u;(u=b(n.itemsRef))==null||u.focus({preventScroll:!0}),n.goToItem(C.First)});break;case w.ArrowUp:c.preventDefault(),c.stopPropagation(),n.openMenu(),E(()=>{var u;(u=b(n.itemsRef))==null||u.focus({preventScroll:!0}),n.goToItem(C.Last)});break}}function l(c){switch(c.key){case w.Space:c.preventDefault();break}}function O(c){i.disabled||(n.menuState.value===0?(n.closeMenu(),E(()=>{var u;return(u=b(n.buttonRef))==null?void 0:u.focus({preventScroll:!0})})):(c.preventDefault(),n.openMenu(),dr(()=>{var u;return(u=b(n.itemsRef))==null?void 0:u.focus({preventScroll:!0})})))}let f=Ct(q(()=>({as:i.as,type:e.type})),n.buttonRef);return()=>{var c;let u={open:n.menuState.value===0},{...p}=i,d={ref:n.buttonRef,id:a,type:f.value,"aria-haspopup":"menu","aria-controls":(c=b(n.itemsRef))==null?void 0:c.id,"aria-expanded":n.menuState.value===0,onKeydown:o,onKeyup:l,onClick:O};return he({ourProps:d,theirProps:p,slot:u,attrs:e,slots:t,name:"MenuButton"})}}}),xr=V({name:"MenuItems",props:{as:{type:[Object,String],default:"div"},static:{type:Boolean,default:!1},unmount:{type:Boolean,default:!0},id:{type:String,default:null}},setup(i,{attrs:e,slots:t,expose:r}){var s;let a=(s=i.id)!=null?s:`headlessui-menu-items-${_e()}`,n=de("MenuItems"),o=I(null);r({el:n.itemsRef,$el:n.itemsRef}),ar({container:q(()=>b(n.itemsRef)),enabled:q(()=>n.menuState.value===0),accept(u){return u.getAttribute("role")==="menuitem"?NodeFilter.FILTER_REJECT:u.hasAttribute("role")?NodeFilter.FILTER_SKIP:NodeFilter.FILTER_ACCEPT},walk(u){u.setAttribute("role","none")}});function l(u){var p;switch(o.value&&clearTimeout(o.value),u.key){case w.Space:if(n.searchQuery.value!=="")return u.preventDefault(),u.stopPropagation(),n.search(u.key);case w.Enter:if(u.preventDefault(),u.stopPropagation(),n.activeItemIndex.value!==null){let d=n.items.value[n.activeItemIndex.value];(p=b(d.dataRef.domRef))==null||p.click()}n.closeMenu(),Ke(b(n.buttonRef));break;case w.ArrowDown:return u.preventDefault(),u.stopPropagation(),n.goToItem(C.Next);case w.ArrowUp:return u.preventDefault(),u.stopPropagation(),n.goToItem(C.Previous);case w.Home:case w.PageUp:return u.preventDefault(),u.stopPropagation(),n.goToItem(C.First);case w.End:case w.PageDown:return u.preventDefault(),u.stopPropagation(),n.goToItem(C.Last);case w.Escape:u.preventDefault(),u.stopPropagation(),n.closeMenu(),E(()=>{var d;return(d=b(n.buttonRef))==null?void 0:d.focus({preventScroll:!0})});break;case w.Tab:u.preventDefault(),u.stopPropagation(),n.closeMenu(),E(()=>zt(b(n.buttonRef),u.shiftKey?Te.Previous:Te.Next));break;default:u.key.length===1&&(n.search(u.key),o.value=setTimeout(()=>n.clearSearch(),350));break}}function O(u){switch(u.key){case w.Space:u.preventDefault();break}}let f=or(),c=q(()=>f!==null?(f.value&te.Open)===te.Open:n.menuState.value===0);return()=>{var u,p;let d={open:n.menuState.value===0},{...g}=i,Q={"aria-activedescendant":n.activeItemIndex.value===null||(u=n.items.value[n.activeItemIndex.value])==null?void 0:u.id,"aria-labelledby":(p=b(n.buttonRef))==null?void 0:p.id,id:a,onKeydown:l,onKeyup:O,role:"menu",tabIndex:0,ref:n.itemsRef};return he({ourProps:Q,theirProps:g,slot:d,attrs:e,slots:t,features:be.RenderStrategy|be.Static,visible:c.value,name:"MenuItems"})}}}),Pr=V({name:"MenuItem",inheritAttrs:!1,props:{as:{type:[Object,String],default:"template"},disabled:{type:Boolean,default:!1},id:{type:String,default:null}},setup(i,{slots:e,attrs:t,expose:r}){var s;let a=(s=i.id)!=null?s:`headlessui-menu-item-${_e()}`,n=de("MenuItem"),o=I(null);r({el:o,$el:o});let l=q(()=>n.activeItemIndex.value!==null?n.items.value[n.activeItemIndex.value].id===a:!1),O=ur(o),f=q(()=>({disabled:i.disabled,get textValue(){return O()},domRef:o}));ht(()=>n.registerItem(a,f)),dt(()=>n.unregisterItem(a)),fe(()=>{n.menuState.value===0&&l.value&&n.activationTrigger.value!==0&&E(()=>{var y,D;return(D=(y=b(o))==null?void 0:y.scrollIntoView)==null?void 0:D.call(y,{block:"nearest"})})});function c(y){if(i.disabled)return y.preventDefault();n.closeMenu(),Ke(b(n.buttonRef))}function u(){if(i.disabled)return n.goToItem(C.Nothing);n.goToItem(C.Specific,a)}let p=sr();function d(y){p.update(y)}function g(y){p.wasMoved(y)&&(i.disabled||l.value||n.goToItem(C.Specific,a,0))}function Q(y){p.wasMoved(y)&&(i.disabled||l.value&&n.goToItem(C.Nothing))}return()=>{let{disabled:y,...D}=i,pe={active:l.value,disabled:y,close:n.closeMenu};return he({ourProps:{id:a,ref:o,role:"menuitem",tabIndex:y===!0?void 0:-1,"aria-disabled":y===!0?!0:void 0,onClick:c,onFocus:u,onPointerenter:d,onMouseenter:d,onPointermove:g,onMousemove:g,onPointerleave:Q,onMouseleave:Q},theirProps:{...t,...D},slot:pe,attrs:t,slots:e,name:"MenuItem"})}}});function gr(i,e){return W(),Y("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true","data-slot":"icon"},[k("path",{d:"M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z"}),k("path",{d:"M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z"}),k("path",{d:"M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z"})])}function vr(i,e){return W(),Y("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true","data-slot":"icon"},[k("path",{d:"M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"}),k("path",{"fill-rule":"evenodd",d:"M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z","clip-rule":"evenodd"})])}const Qr=V({__name:"ToggleVisibleButton",props:{modelValue:{type:Boolean}},emits:["update:modelValue"],setup(i,{emit:e}){const s=Fe(i,"modelValue",e),a=()=>{s.value=!s.value};return(n,o)=>(W(),Y("button",{class:"rounded-lg p-2",type:"button",onClick:o[0]||(o[0]=l=>a())},[X($(gr),{class:ye(["w-5 h-5",[$(s)?"hidden":"visible"]])},null,8,["class"]),X($(vr),{class:ye(["w-5 h-5",[$(s)?"visible":"hidden"]])},null,8,["class"])]))}}),_r=["onUpdate:modelValue"],$r=["onUpdate:modelValue"],kr=V({__name:"ExtentInput",props:{modelValue:{}},emits:["update:modelValue"],setup(i,{emit:e}){const s=Fe(i,"modelValue",e),a=(l,O)=>{s.value=[s.value[0].map((f,c)=>l==c?O[0]:f),s.value[1].map((f,c)=>l==c?O[1]:f)]},n=q(()=>S(0,s.value[0].length)),o=[{name:"-1, +1",value:[-1,1]},{name:"-π, +π",value:[-Math.PI,+Math.PI]},{name:"-π/2, +π/2",value:[-Math.PI/2,+Math.PI/2]}];return(l,O)=>(W(!0),Y(K,null,le(n.value,f=>(W(),Y("div",{class:"flex flex-row items-center gap-2",key:f},[X($(pr),{as:"div",class:"relative inline-block text-left"},{default:z(()=>[X($(mr),{class:"w-16 text-xs text-right font-mono"},{default:z(()=>[L("x["+B(f)+"]:",1)]),_:2},1024),X($(xr),{class:"absolute left-0 mt-2 w-32 origin-top-left divide-y divide-border bg-background-mute shadow-lg ring-1 ring-border-hover focus:outline-none z-50"},{default:z(()=>[(W(),Y(K,null,le(o,c=>X($(Pr),{as:"div",class:"menu-item text-center",onClick:u=>a(f,c.value)},{default:z(()=>[L(B(c.name),1)]),_:2},1032,["onClick"])),64))]),_:2},1024)]),_:2},1024),J(k("input",{class:"w-16",type:"number",step:"0.1","onUpdate:modelValue":c=>$(s)[0][f]=c},null,8,_r),[[ee,$(s)[0][f]]]),J(k("input",{class:"w-16",type:"number",step:"0.1","onUpdate:modelValue":c=>$(s)[1][f]=c},null,8,$r),[[ee,$(s)[1][f]]])]))),128))}}),yr=Je(kr,[["__scopeId","data-v-abc9a19b"]]);var We={};class Oe{constructor(e,t,r,s,a,n,o,l,O,f=0,c){this.p=e,this.stack=t,this.state=r,this.reducePos=s,this.pos=a,this.score=n,this.buffer=o,this.bufferBase=l,this.curContext=O,this.lookAhead=f,this.parent=c}toString(){return`[${this.stack.filter((e,t)=>t%3==0).concat(this.state)}]@${this.pos}${this.score?"!"+this.score:""}`}static start(e,t,r=0){let s=e.parser.context;return new Oe(e,[],t,r,r,0,[],0,s?new Ye(s,s.start):null,0,null)}get context(){return this.curContext?this.curContext.context:null}pushState(e,t){this.stack.push(this.state,t,this.bufferBase+this.buffer.length),this.state=e}reduce(e){var t;let r=e>>19,s=e&65535,{parser:a}=this.p,n=this.reducePos<this.pos-25;n&&this.setLookAhead(this.pos);let o=a.dynamicPrecedence(s);if(o&&(this.score+=o),r==0){this.pushState(a.getGoto(this.state,s,!0),this.reducePos),s<a.minRepeatTerm&&this.storeNode(s,this.reducePos,this.reducePos,n?8:4,!0),this.reduceContext(s,this.reducePos);return}let l=this.stack.length-(r-1)*3-(e&262144?6:0),O=l?this.stack[l-2]:this.p.ranges[0].from,f=this.reducePos-O;f>=2e3&&!(!((t=this.p.parser.nodeSet.types[s])===null||t===void 0)&&t.isAnonymous)&&(O==this.p.lastBigReductionStart?(this.p.bigReductionCount++,this.p.lastBigReductionSize=f):this.p.lastBigReductionSize<f&&(this.p.bigReductionCount=1,this.p.lastBigReductionStart=O,this.p.lastBigReductionSize=f));let c=l?this.stack[l-1]:0,u=this.bufferBase+this.buffer.length-c;if(s<a.minRepeatTerm||e&131072){let p=a.stateFlag(this.state,1)?this.pos:this.reducePos;this.storeNode(s,O,p,u+4,!0)}if(e&262144)this.state=this.stack[l];else{let p=this.stack[l-3];this.state=a.getGoto(p,s,!0)}for(;this.stack.length>l;)this.stack.pop();this.reduceContext(s,O)}storeNode(e,t,r,s=4,a=!1){if(e==0&&(!this.stack.length||this.stack[this.stack.length-1]<this.buffer.length+this.bufferBase)){let n=this,o=this.buffer.length;if(o==0&&n.parent&&(o=n.bufferBase-n.parent.bufferBase,n=n.parent),o>0&&n.buffer[o-4]==0&&n.buffer[o-1]>-1){if(t==r)return;if(n.buffer[o-2]>=t){n.buffer[o-2]=r;return}}}if(!a||this.pos==r)this.buffer.push(e,t,r,s);else{let n=this.buffer.length;if(n>0&&this.buffer[n-4]!=0){let o=!1;for(let l=n;l>0&&this.buffer[l-2]>r;l-=4)if(this.buffer[l-1]>=0){o=!0;break}if(o)for(;n>0&&this.buffer[n-2]>r;)this.buffer[n]=this.buffer[n-4],this.buffer[n+1]=this.buffer[n-3],this.buffer[n+2]=this.buffer[n-2],this.buffer[n+3]=this.buffer[n-1],n-=4,s>4&&(s-=4)}this.buffer[n]=e,this.buffer[n+1]=t,this.buffer[n+2]=r,this.buffer[n+3]=s}}shift(e,t,r,s){if(e&131072)this.pushState(e&65535,this.pos);else if(e&262144)this.pos=s,this.shiftContext(t,r),t<=this.p.parser.maxNode&&this.buffer.push(t,r,s,4);else{let a=e,{parser:n}=this.p;(s>this.pos||t<=n.maxNode)&&(this.pos=s,n.stateFlag(a,1)||(this.reducePos=s)),this.pushState(a,r),this.shiftContext(t,r),t<=n.maxNode&&this.buffer.push(t,r,s,4)}}apply(e,t,r,s){e&65536?this.reduce(e):this.shift(e,t,r,s)}useNode(e,t){let r=this.p.reused.length-1;(r<0||this.p.reused[r]!=e)&&(this.p.reused.push(e),r++);let s=this.pos;this.reducePos=this.pos=s+e.length,this.pushState(t,s),this.buffer.push(r,s,this.reducePos,-1),this.curContext&&this.updateContext(this.curContext.tracker.reuse(this.curContext.context,e,this,this.p.stream.reset(this.pos-e.length)))}split(){let e=this,t=e.buffer.length;for(;t>0&&e.buffer[t-2]>e.reducePos;)t-=4;let r=e.buffer.slice(t),s=e.bufferBase+t;for(;e&&s==e.bufferBase;)e=e.parent;return new Oe(this.p,this.stack.slice(),this.state,this.reducePos,this.pos,this.score,r,s,this.curContext,this.lookAhead,e)}recoverByDelete(e,t){let r=e<=this.p.parser.maxNode;r&&this.storeNode(e,this.pos,t,4),this.storeNode(0,this.pos,t,r?8:4),this.pos=this.reducePos=t,this.score-=190}canShift(e){for(let t=new Xr(this);;){let r=this.p.parser.stateSlot(t.state,4)||this.p.parser.hasAction(t.state,e);if(r==0)return!1;if(!(r&65536))return!0;t.reduce(r)}}recoverByInsert(e){if(this.stack.length>=300)return[];let t=this.p.parser.nextStates(this.state);if(t.length>8||this.stack.length>=120){let s=[];for(let a=0,n;a<t.length;a+=2)(n=t[a+1])!=this.state&&this.p.parser.hasAction(n,e)&&s.push(t[a],n);if(this.stack.length<120)for(let a=0;s.length<8&&a<t.length;a+=2){let n=t[a+1];s.some((o,l)=>l&1&&o==n)||s.push(t[a],n)}t=s}let r=[];for(let s=0;s<t.length&&r.length<4;s+=2){let a=t[s+1];if(a==this.state)continue;let n=this.split();n.pushState(a,this.pos),n.storeNode(0,n.pos,n.pos,4,!0),n.shiftContext(t[s],this.pos),n.reducePos=this.pos,n.score-=200,r.push(n)}return r}forceReduce(){let{parser:e}=this.p,t=e.stateSlot(this.state,5);if(!(t&65536))return!1;if(!e.validAction(this.state,t)){let r=t>>19,s=t&65535,a=this.stack.length-r*3;if(a<0||e.getGoto(this.stack[a],s,!1)<0){let n=this.findForcedReduction();if(n==null)return!1;t=n}this.storeNode(0,this.pos,this.pos,4,!0),this.score-=100}return this.reducePos=this.pos,this.reduce(t),!0}findForcedReduction(){let{parser:e}=this.p,t=[],r=(s,a)=>{if(!t.includes(s))return t.push(s),e.allActions(s,n=>{if(!(n&393216))if(n&65536){let o=(n>>19)-a;if(o>1){let l=n&65535,O=this.stack.length-o*3;if(O>=0&&e.getGoto(this.stack[O],l,!1)>=0)return o<<19|65536|l}}else{let o=r(n,a+1);if(o!=null)return o}})};return r(this.state,0)}forceAll(){for(;!this.p.parser.stateFlag(this.state,2);)if(!this.forceReduce()){this.storeNode(0,this.pos,this.pos,4,!0);break}return this}get deadEnd(){if(this.stack.length!=3)return!1;let{parser:e}=this.p;return e.data[e.stateSlot(this.state,1)]==65535&&!e.stateSlot(this.state,4)}restart(){this.storeNode(0,this.pos,this.pos,4,!0),this.state=this.stack[0],this.stack.length=0}sameState(e){if(this.state!=e.state||this.stack.length!=e.stack.length)return!1;for(let t=0;t<this.stack.length;t+=3)if(this.stack[t]!=e.stack[t])return!1;return!0}get parser(){return this.p.parser}dialectEnabled(e){return this.p.parser.dialect.flags[e]}shiftContext(e,t){this.curContext&&this.updateContext(this.curContext.tracker.shift(this.curContext.context,e,this,this.p.stream.reset(t)))}reduceContext(e,t){this.curContext&&this.updateContext(this.curContext.tracker.reduce(this.curContext.context,e,this,this.p.stream.reset(t)))}emitContext(){let e=this.buffer.length-1;(e<0||this.buffer[e]!=-3)&&this.buffer.push(this.curContext.hash,this.pos,this.pos,-3)}emitLookAhead(){let e=this.buffer.length-1;(e<0||this.buffer[e]!=-4)&&this.buffer.push(this.lookAhead,this.pos,this.pos,-4)}updateContext(e){if(e!=this.curContext.context){let t=new Ye(this.curContext.tracker,e);t.hash!=this.curContext.hash&&this.emitContext(),this.curContext=t}}setLookAhead(e){e>this.lookAhead&&(this.emitLookAhead(),this.lookAhead=e)}close(){this.curContext&&this.curContext.tracker.strict&&this.emitContext(),this.lookAhead>0&&this.emitLookAhead()}}class Ye{constructor(e,t){this.tracker=e,this.context=t,this.hash=e.strict?e.hash(t):0}}class Xr{constructor(e){this.start=e,this.state=e.state,this.stack=e.stack,this.base=this.stack.length}reduce(e){let t=e&65535,r=e>>19;r==0?(this.stack==this.start.stack&&(this.stack=this.stack.slice()),this.stack.push(this.state,0,0),this.base+=3):this.base-=(r-1)*3;let s=this.start.p.parser.getGoto(this.stack[this.base-3],t,!0);this.state=s}}class ce{constructor(e,t,r){this.stack=e,this.pos=t,this.index=r,this.buffer=e.buffer,this.index==0&&this.maybeNext()}static create(e,t=e.bufferBase+e.buffer.length){return new ce(e,t,t-e.bufferBase)}maybeNext(){let e=this.stack.parent;e!=null&&(this.index=this.stack.bufferBase-e.bufferBase,this.stack=e,this.buffer=e.buffer)}get id(){return this.buffer[this.index-4]}get start(){return this.buffer[this.index-3]}get end(){return this.buffer[this.index-2]}get size(){return this.buffer[this.index-1]}next(){this.index-=4,this.pos-=4,this.index==0&&this.maybeNext()}fork(){return new ce(this.stack,this.pos,this.index)}}function Z(i,e=Uint16Array){if(typeof i!="string")return i;let t=null;for(let r=0,s=0;r<i.length;){let a=0;for(;;){let n=i.charCodeAt(r++),o=!1;if(n==126){a=65535;break}n>=92&&n--,n>=34&&n--;let l=n-32;if(l>=46&&(l-=46,o=!0),a+=l,o)break;a*=46}t?t[s++]=a:t=new e(a)}return t}class ie{constructor(){this.start=-1,this.value=-1,this.end=-1,this.extended=-1,this.lookAhead=0,this.mask=0,this.context=0}}const je=new ie;class br{constructor(e,t){this.input=e,this.ranges=t,this.chunk="",this.chunkOff=0,this.chunk2="",this.chunk2Pos=0,this.next=-1,this.token=je,this.rangeIndex=0,this.pos=this.chunkPos=t[0].from,this.range=t[0],this.end=t[t.length-1].to,this.readNext()}resolveOffset(e,t){let r=this.range,s=this.rangeIndex,a=this.pos+e;for(;a<r.from;){if(!s)return null;let n=this.ranges[--s];a-=r.from-n.to,r=n}for(;t<0?a>r.to:a>=r.to;){if(s==this.ranges.length-1)return null;let n=this.ranges[++s];a+=n.from-r.to,r=n}return a}clipPos(e){if(e>=this.range.from&&e<this.range.to)return e;for(let t of this.ranges)if(t.to>e)return Math.max(e,t.from);return this.end}peek(e){let t=this.chunkOff+e,r,s;if(t>=0&&t<this.chunk.length)r=this.pos+e,s=this.chunk.charCodeAt(t);else{let a=this.resolveOffset(e,1);if(a==null)return-1;if(r=a,r>=this.chunk2Pos&&r<this.chunk2Pos+this.chunk2.length)s=this.chunk2.charCodeAt(r-this.chunk2Pos);else{let n=this.rangeIndex,o=this.range;for(;o.to<=r;)o=this.ranges[++n];this.chunk2=this.input.chunk(this.chunk2Pos=r),r+this.chunk2.length>o.to&&(this.chunk2=this.chunk2.slice(0,o.to-r)),s=this.chunk2.charCodeAt(0)}}return r>=this.token.lookAhead&&(this.token.lookAhead=r+1),s}acceptToken(e,t=0){let r=t?this.resolveOffset(t,-1):this.pos;if(r==null||r<this.token.start)throw new RangeError("Token end out of bounds");this.token.value=e,this.token.end=r}acceptTokenTo(e,t){this.token.value=e,this.token.end=t}getChunk(){if(this.pos>=this.chunk2Pos&&this.pos<this.chunk2Pos+this.chunk2.length){let{chunk:e,chunkPos:t}=this;this.chunk=this.chunk2,this.chunkPos=this.chunk2Pos,this.chunk2=e,this.chunk2Pos=t,this.chunkOff=this.pos-this.chunkPos}else{this.chunk2=this.chunk,this.chunk2Pos=this.chunkPos;let e=this.input.chunk(this.pos),t=this.pos+e.length;this.chunk=t>this.range.to?e.slice(0,this.range.to-this.pos):e,this.chunkPos=this.pos,this.chunkOff=0}}readNext(){return this.chunkOff>=this.chunk.length&&(this.getChunk(),this.chunkOff==this.chunk.length)?this.next=-1:this.next=this.chunk.charCodeAt(this.chunkOff)}advance(e=1){for(this.chunkOff+=e;this.pos+e>=this.range.to;){if(this.rangeIndex==this.ranges.length-1)return this.setDone();e-=this.range.to-this.pos,this.range=this.ranges[++this.rangeIndex],this.pos=this.range.from}return this.pos+=e,this.pos>=this.token.lookAhead&&(this.token.lookAhead=this.pos+1),this.readNext()}setDone(){return this.pos=this.chunkPos=this.end,this.range=this.ranges[this.rangeIndex=this.ranges.length-1],this.chunk="",this.next=-1}reset(e,t){if(t?(this.token=t,t.start=e,t.lookAhead=e+1,t.value=t.extended=-1):this.token=je,this.pos!=e){if(this.pos=e,e==this.end)return this.setDone(),this;for(;e<this.range.from;)this.range=this.ranges[--this.rangeIndex];for(;e>=this.range.to;)this.range=this.ranges[++this.rangeIndex];e>=this.chunkPos&&e<this.chunkPos+this.chunk.length?this.chunkOff=e-this.chunkPos:(this.chunk="",this.chunkOff=0),this.readNext()}return this}read(e,t){if(e>=this.chunkPos&&t<=this.chunkPos+this.chunk.length)return this.chunk.slice(e-this.chunkPos,t-this.chunkPos);if(e>=this.chunk2Pos&&t<=this.chunk2Pos+this.chunk2.length)return this.chunk2.slice(e-this.chunk2Pos,t-this.chunk2Pos);if(e>=this.range.from&&t<=this.range.to)return this.input.read(e,t);let r="";for(let s of this.ranges){if(s.from>=t)break;s.to>e&&(r+=this.input.read(Math.max(s.from,e),Math.min(s.to,t)))}return r}}class F{constructor(e,t){this.data=e,this.id=t}token(e,t){let{parser:r}=t.p;nt(this.data,e,t,this.id,r.data,r.tokenPrecTable)}}F.prototype.contextual=F.prototype.fallback=F.prototype.extend=!1;class rt{constructor(e,t,r){this.precTable=t,this.elseToken=r,this.data=typeof e=="string"?Z(e):e}token(e,t){let r=e.pos,s=0;for(;;){let a=e.next<0,n=e.resolveOffset(1,1);if(nt(this.data,e,t,0,this.data,this.precTable),e.token.value>-1)break;if(this.elseToken==null)return;if(a||s++,n==null)break;e.reset(n,e.token)}s&&(e.reset(r,e.token),e.acceptToken(this.elseToken,s))}}rt.prototype.contextual=F.prototype.fallback=F.prototype.extend=!1;function nt(i,e,t,r,s,a){let n=0,o=1<<r,{dialect:l}=t.p.parser;e:for(;o&i[n];){let O=i[n+1];for(let p=n+3;p<O;p+=2)if((i[p+1]&o)>0){let d=i[p];if(l.allows(d)&&(e.token.value==-1||e.token.value==d||Tr(d,e.token.value,s,a))){e.acceptToken(d);break}}let f=e.next,c=0,u=i[n+2];if(e.next<0&&u>c&&i[O+u*3-3]==65535){n=i[O+u*3-1];continue e}for(;c<u;){let p=c+u>>1,d=O+p+(p<<1),g=i[d],Q=i[d+1]||65536;if(f<g)u=p;else if(f>=Q)c=p+1;else{n=i[d+2],e.advance();continue e}}break}}function qe(i,e,t){for(let r=e,s;(s=i[r])!=65535;r++)if(s==t)return r-e;return-1}function Tr(i,e,t,r){let s=qe(t,r,e);return s<0||qe(t,r,i)<s}const G=typeof process<"u"&&We&&/\bparse\b/.test(We.LOG);let Pe=null;function Me(i,e,t){let r=i.cursor(Xt.IncludeAnonymous);for(r.moveTo(e);;)if(!(t<0?r.childBefore(e):r.childAfter(e)))for(;;){if((t<0?r.to<e:r.from>e)&&!r.type.isError)return t<0?Math.max(0,Math.min(r.to-1,e-25)):Math.min(i.length,Math.max(r.from+1,e+25));if(t<0?r.prevSibling():r.nextSibling())break;if(!r.parent())return t<0?0:i.length}}class Sr{constructor(e,t){this.fragments=e,this.nodeSet=t,this.i=0,this.fragment=null,this.safeFrom=-1,this.safeTo=-1,this.trees=[],this.start=[],this.index=[],this.nextFragment()}nextFragment(){let e=this.fragment=this.i==this.fragments.length?null:this.fragments[this.i++];if(e){for(this.safeFrom=e.openStart?Me(e.tree,e.from+e.offset,1)-e.offset:e.from,this.safeTo=e.openEnd?Me(e.tree,e.to+e.offset,-1)-e.offset:e.to;this.trees.length;)this.trees.pop(),this.start.pop(),this.index.pop();this.trees.push(e.tree),this.start.push(-e.offset),this.index.push(0),this.nextStart=this.safeFrom}else this.nextStart=1e9}nodeAt(e){if(e<this.nextStart)return null;for(;this.fragment&&this.safeTo<=e;)this.nextFragment();if(!this.fragment)return null;for(;;){let t=this.trees.length-1;if(t<0)return this.nextFragment(),null;let r=this.trees[t],s=this.index[t];if(s==r.children.length){this.trees.pop(),this.start.pop(),this.index.pop();continue}let a=r.children[s],n=this.start[t]+r.positions[s];if(n>e)return this.nextStart=n,null;if(a instanceof oe){if(n==e){if(n<this.safeFrom)return null;let o=n+a.length;if(o<=this.safeTo){let l=a.prop(Qe.lookAhead);if(!l||o+l<this.fragment.to)return a}}this.index[t]++,n+a.length>=Math.max(this.safeFrom,e)&&(this.trees.push(a),this.start.push(n),this.index.push(0))}else this.index[t]++,this.nextStart=n+a.length}}}class wr{constructor(e,t){this.stream=t,this.tokens=[],this.mainToken=null,this.actions=[],this.tokens=e.tokenizers.map(r=>new ie)}getActions(e){let t=0,r=null,{parser:s}=e.p,{tokenizers:a}=s,n=s.stateSlot(e.state,3),o=e.curContext?e.curContext.hash:0,l=0;for(let O=0;O<a.length;O++){if(!(1<<O&n))continue;let f=a[O],c=this.tokens[O];if(!(r&&!f.fallback)&&((f.contextual||c.start!=e.pos||c.mask!=n||c.context!=o)&&(this.updateCachedToken(c,f,e),c.mask=n,c.context=o),c.lookAhead>c.end+25&&(l=Math.max(c.lookAhead,l)),c.value!=0)){let u=t;if(c.extended>-1&&(t=this.addActions(e,c.extended,c.end,t)),t=this.addActions(e,c.value,c.end,t),!f.extend&&(r=c,t>u))break}}for(;this.actions.length>t;)this.actions.pop();return l&&e.setLookAhead(l),!r&&e.pos==this.stream.end&&(r=new ie,r.value=e.p.parser.eofTerm,r.start=r.end=e.pos,t=this.addActions(e,r.value,r.end,t)),this.mainToken=r,this.actions}getMainToken(e){if(this.mainToken)return this.mainToken;let t=new ie,{pos:r,p:s}=e;return t.start=r,t.end=Math.min(r+1,s.stream.end),t.value=r==s.stream.end?s.parser.eofTerm:0,t}updateCachedToken(e,t,r){let s=this.stream.clipPos(r.pos);if(t.token(this.stream.reset(s,e),r),e.value>-1){let{parser:a}=r.p;for(let n=0;n<a.specialized.length;n++)if(a.specialized[n]==e.value){let o=a.specializers[n](this.stream.read(e.start,e.end),r);if(o>=0&&r.p.parser.dialect.allows(o>>1)){o&1?e.extended=o>>1:e.value=o>>1;break}}}else e.value=0,e.end=this.stream.clipPos(s+1)}putAction(e,t,r,s){for(let a=0;a<s;a+=3)if(this.actions[a]==e)return s;return this.actions[s++]=e,this.actions[s++]=t,this.actions[s++]=r,s}addActions(e,t,r,s){let{state:a}=e,{parser:n}=e.p,{data:o}=n;for(let l=0;l<2;l++)for(let O=n.stateSlot(a,l?2:1);;O+=3){if(o[O]==65535)if(o[O+1]==1)O=M(o,O+2);else{s==0&&o[O+1]==2&&(s=this.putAction(M(o,O+2),t,r,s));break}o[O]==t&&(s=this.putAction(M(o,O+1),t,r,s))}return s}}class Rr{constructor(e,t,r,s){this.parser=e,this.input=t,this.ranges=s,this.recovering=0,this.nextStackID=9812,this.minStackPos=0,this.reused=[],this.stoppedAt=null,this.lastBigReductionStart=-1,this.lastBigReductionSize=0,this.bigReductionCount=0,this.stream=new br(t,s),this.tokens=new wr(e,this.stream),this.topTerm=e.top[1];let{from:a}=s[0];this.stacks=[Oe.start(this,e.top[0],a)],this.fragments=r.length&&this.stream.end-a>e.bufferLength*4?new Sr(r,e.nodeSet):null}get parsedPos(){return this.minStackPos}advance(){let e=this.stacks,t=this.minStackPos,r=this.stacks=[],s,a;if(this.bigReductionCount>300&&e.length==1){let[n]=e;for(;n.forceReduce()&&n.stack.length&&n.stack[n.stack.length-2]>=this.lastBigReductionStart;);this.bigReductionCount=this.lastBigReductionSize=0}for(let n=0;n<e.length;n++){let o=e[n];for(;;){if(this.tokens.mainToken=null,o.pos>t)r.push(o);else{if(this.advanceStack(o,r,e))continue;{s||(s=[],a=[]),s.push(o);let l=this.tokens.getMainToken(o);a.push(l.value,l.end)}}break}}if(!r.length){let n=s&&Ir(s);if(n)return G&&console.log("Finish with "+this.stackID(n)),this.stackToTree(n);if(this.parser.strict)throw G&&s&&console.log("Stuck with token "+(this.tokens.mainToken?this.parser.getName(this.tokens.mainToken.value):"none")),new SyntaxError("No parse at "+t);this.recovering||(this.recovering=5)}if(this.recovering&&s){let n=this.stoppedAt!=null&&s[0].pos>this.stoppedAt?s[0]:this.runRecovery(s,a,r);if(n)return G&&console.log("Force-finish "+this.stackID(n)),this.stackToTree(n.forceAll())}if(this.recovering){let n=this.recovering==1?1:this.recovering*3;if(r.length>n)for(r.sort((o,l)=>l.score-o.score);r.length>n;)r.pop();r.some(o=>o.reducePos>t)&&this.recovering--}else if(r.length>1){e:for(let n=0;n<r.length-1;n++){let o=r[n];for(let l=n+1;l<r.length;l++){let O=r[l];if(o.sameState(O)||o.buffer.length>500&&O.buffer.length>500)if((o.score-O.score||o.buffer.length-O.buffer.length)>0)r.splice(l--,1);else{r.splice(n--,1);continue e}}}r.length>12&&r.splice(12,r.length-12)}this.minStackPos=r[0].pos;for(let n=1;n<r.length;n++)r[n].pos<this.minStackPos&&(this.minStackPos=r[n].pos);return null}stopAt(e){if(this.stoppedAt!=null&&this.stoppedAt<e)throw new RangeError("Can't move stoppedAt forward");this.stoppedAt=e}advanceStack(e,t,r){let s=e.pos,{parser:a}=this,n=G?this.stackID(e)+" -> ":"";if(this.stoppedAt!=null&&s>this.stoppedAt)return e.forceReduce()?e:null;if(this.fragments){let O=e.curContext&&e.curContext.tracker.strict,f=O?e.curContext.hash:0;for(let c=this.fragments.nodeAt(s);c;){let u=this.parser.nodeSet.types[c.type.id]==c.type?a.getGoto(e.state,c.type.id):-1;if(u>-1&&c.length&&(!O||(c.prop(Qe.contextHash)||0)==f))return e.useNode(c,u),G&&console.log(n+this.stackID(e)+` (via reuse of ${a.getName(c.type.id)})`),!0;if(!(c instanceof oe)||c.children.length==0||c.positions[0]>0)break;let p=c.children[0];if(p instanceof oe&&c.positions[0]==0)c=p;else break}}let o=a.stateSlot(e.state,4);if(o>0)return e.reduce(o),G&&console.log(n+this.stackID(e)+` (via always-reduce ${a.getName(o&65535)})`),!0;if(e.stack.length>=8400)for(;e.stack.length>6e3&&e.forceReduce(););let l=this.tokens.getActions(e);for(let O=0;O<l.length;){let f=l[O++],c=l[O++],u=l[O++],p=O==l.length||!r,d=p?e:e.split(),g=this.tokens.mainToken;if(d.apply(f,c,g?g.start:d.pos,u),G&&console.log(n+this.stackID(d)+` (via ${f&65536?`reduce of ${a.getName(f&65535)}`:"shift"} for ${a.getName(c)} @ ${s}${d==e?"":", split"})`),p)return!0;d.pos>s?t.push(d):r.push(d)}return!1}advanceFully(e,t){let r=e.pos;for(;;){if(!this.advanceStack(e,null,null))return!1;if(e.pos>r)return Ve(e,t),!0}}runRecovery(e,t,r){let s=null,a=!1;for(let n=0;n<e.length;n++){let o=e[n],l=t[n<<1],O=t[(n<<1)+1],f=G?this.stackID(o)+" -> ":"";if(o.deadEnd&&(a||(a=!0,o.restart(),G&&console.log(f+this.stackID(o)+" (restarted)"),this.advanceFully(o,r))))continue;let c=o.split(),u=f;for(let p=0;c.forceReduce()&&p<10&&(G&&console.log(u+this.stackID(c)+" (via force-reduce)"),!this.advanceFully(c,r));p++)G&&(u=this.stackID(c)+" -> ");for(let p of o.recoverByInsert(l))G&&console.log(f+this.stackID(p)+" (via recover-insert)"),this.advanceFully(p,r);this.stream.end>o.pos?(O==o.pos&&(O++,l=0),o.recoverByDelete(l,O),G&&console.log(f+this.stackID(o)+` (via recover-delete ${this.parser.getName(l)})`),Ve(o,r)):(!s||s.score<o.score)&&(s=o)}return s}stackToTree(e){return e.close(),oe.build({buffer:ce.create(e),nodeSet:this.parser.nodeSet,topID:this.topTerm,maxBufferLength:this.parser.bufferLength,reused:this.reused,start:this.ranges[0].from,length:e.pos-this.ranges[0].from,minRepeatType:this.parser.minRepeatTerm})}stackID(e){let t=(Pe||(Pe=new WeakMap)).get(e);return t||Pe.set(e,t=String.fromCodePoint(this.nextStackID++)),t+e}}function Ve(i,e){for(let t=0;t<e.length;t++){let r=e[t];if(r.pos==i.pos&&r.sameState(i)){e[t].score<i.score&&(e[t]=i);return}}e.push(i)}class Ar{constructor(e,t,r){this.source=e,this.flags=t,this.disabled=r}allows(e){return!this.disabled||this.disabled[e]==0}}class ue extends _t{constructor(e){if(super(),this.wrappers=[],e.version!=14)throw new RangeError(`Parser version (${e.version}) doesn't match runtime version (14)`);let t=e.nodeNames.split(" ");this.minRepeatTerm=t.length;for(let o=0;o<e.repeatNodeCount;o++)t.push("");let r=Object.keys(e.topRules).map(o=>e.topRules[o][1]),s=[];for(let o=0;o<t.length;o++)s.push([]);function a(o,l,O){s[o].push([l,l.deserialize(String(O))])}if(e.nodeProps)for(let o of e.nodeProps){let l=o[0];typeof l=="string"&&(l=Qe[l]);for(let O=1;O<o.length;){let f=o[O++];if(f>=0)a(f,l,o[O++]);else{let c=o[O+-f];for(let u=-f;u>0;u--)a(o[O++],l,c);O++}}}this.nodeSet=new $t(t.map((o,l)=>kt.define({name:l>=this.minRepeatTerm?void 0:o,id:l,props:s[l],top:r.indexOf(l)>-1,error:l==0,skipped:e.skippedNodes&&e.skippedNodes.indexOf(l)>-1}))),e.propSources&&(this.nodeSet=this.nodeSet.extend(...e.propSources)),this.strict=!1,this.bufferLength=yt;let n=Z(e.tokenData);this.context=e.context,this.specializerSpecs=e.specialized||[],this.specialized=new Uint16Array(this.specializerSpecs.length);for(let o=0;o<this.specializerSpecs.length;o++)this.specialized[o]=this.specializerSpecs[o].term;this.specializers=this.specializerSpecs.map(De),this.states=Z(e.states,Uint32Array),this.data=Z(e.stateData),this.goto=Z(e.goto),this.maxTerm=e.maxTerm,this.tokenizers=e.tokenizers.map(o=>typeof o=="number"?new F(n,o):o),this.topRules=e.topRules,this.dialects=e.dialects||{},this.dynamicPrecedences=e.dynamicPrecedences||null,this.tokenPrecTable=e.tokenPrec,this.termNames=e.termNames||null,this.maxNode=this.nodeSet.types.length-1,this.dialect=this.parseDialect(),this.top=this.topRules[Object.keys(this.topRules)[0]]}createParse(e,t,r){let s=new Rr(this,e,t,r);for(let a of this.wrappers)s=a(s,e,t,r);return s}getGoto(e,t,r=!1){let s=this.goto;if(t>=s[0])return-1;for(let a=s[t+1];;){let n=s[a++],o=n&1,l=s[a++];if(o&&r)return l;for(let O=a+(n>>1);a<O;a++)if(s[a]==e)return l;if(o)return-1}}hasAction(e,t){let r=this.data;for(let s=0;s<2;s++)for(let a=this.stateSlot(e,s?2:1),n;;a+=3){if((n=r[a])==65535)if(r[a+1]==1)n=r[a=M(r,a+2)];else{if(r[a+1]==2)return M(r,a+2);break}if(n==t||n==0)return M(r,a+1)}return 0}stateSlot(e,t){return this.states[e*6+t]}stateFlag(e,t){return(this.stateSlot(e,0)&t)>0}validAction(e,t){return!!this.allActions(e,r=>r==t?!0:null)}allActions(e,t){let r=this.stateSlot(e,4),s=r?t(r):void 0;for(let a=this.stateSlot(e,1);s==null;a+=3){if(this.data[a]==65535)if(this.data[a+1]==1)a=M(this.data,a+2);else break;s=t(M(this.data,a+1))}return s}nextStates(e){let t=[];for(let r=this.stateSlot(e,1);;r+=3){if(this.data[r]==65535)if(this.data[r+1]==1)r=M(this.data,r+2);else break;if(!(this.data[r+2]&1)){let s=this.data[r+1];t.some((a,n)=>n&1&&a==s)||t.push(this.data[r],s)}}return t}configure(e){let t=Object.assign(Object.create(ue.prototype),this);if(e.props&&(t.nodeSet=this.nodeSet.extend(...e.props)),e.top){let r=this.topRules[e.top];if(!r)throw new RangeError(`Invalid top rule name ${e.top}`);t.top=r}return e.tokenizers&&(t.tokenizers=this.tokenizers.map(r=>{let s=e.tokenizers.find(a=>a.from==r);return s?s.to:r})),e.specializers&&(t.specializers=this.specializers.slice(),t.specializerSpecs=this.specializerSpecs.map((r,s)=>{let a=e.specializers.find(o=>o.from==r.external);if(!a)return r;let n=Object.assign(Object.assign({},r),{external:a.to});return t.specializers[s]=De(n),n})),e.contextTracker&&(t.context=e.contextTracker),e.dialect&&(t.dialect=this.parseDialect(e.dialect)),e.strict!=null&&(t.strict=e.strict),e.wrap&&(t.wrappers=t.wrappers.concat(e.wrap)),e.bufferLength!=null&&(t.bufferLength=e.bufferLength),t}hasWrappers(){return this.wrappers.length>0}getName(e){return this.termNames?this.termNames[e]:String(e<=this.maxNode&&this.nodeSet.types[e].name||e)}get eofTerm(){return this.maxNode+1}get topNode(){return this.nodeSet.types[this.top[1]]}dynamicPrecedence(e){let t=this.dynamicPrecedences;return t==null?0:t[e]||0}parseDialect(e){let t=Object.keys(this.dialects),r=t.map(()=>!1);if(e)for(let a of e.split(" ")){let n=t.indexOf(a);n>=0&&(r[n]=!0)}let s=null;for(let a=0;a<t.length;a++)if(!r[a])for(let n=this.dialects[t[a]],o;(o=this.data[n++])!=65535;)(s||(s=new Uint8Array(this.maxTerm+1)))[o]=1;return new Ar(e,r,s)}static deserialize(e){return new ue(e)}}function M(i,e){return i[e]|i[e+1]<<16}function Ir(i){let e=null;for(let t of i){let r=t.p.stoppedAt;(t.pos==t.p.stream.end||r!=null&&t.pos>r)&&t.p.parser.stateFlag(t.state,2)&&(!e||e.score<t.score)&&(e=t)}return e}function De(i){if(i.external){let e=i.extend?1:0;return(t,r)=>i.external(t,r)<<1|e}return i.get}const Ur={__proto__:null,enable:12,var:30,function:34,private:36,workgroup:38,uniform:40,storage:42,read:44,write:46,read_write:48,bool:54,f32:56,i32:58,u32:60,vec2i:62,vec3i:64,vec4i:66,vec2u:68,vec3u:70,vec4u:72,vec2f:74,vec3f:76,vec4f:78,vec2h:80,vec3h:82,vec4h:84,vec2:86,vec3:88,vec4:90,ptr:92,array:94,mat2x2:96,mat2x3:98,mat2x4:100,mat3x2:102,mat3x3:104,mat3x4:106,mat4x2:108,mat4x3:110,mat4x4:112,atomic:114,sampler:116,sampler_comparison:118,texture_depth_2d:120,texture_depth_2d_array:122,texture_depth_cube:124,texture_depth_cube_array:126,texture_depth_multisampled_2d:128,texture_1d:130,texture_2d:132,texture_2d_array:134,texture_3d:136,texture_cube:138,texture_cube_array:140,texture_multisampled_2d:142,texture_storage_1d:144,texture_storage_2d:146,texture_storage_2d_array:148,texture_storage_3d:150,rgba8unorm:152,rgba8snorm:154,rgba8uint:156,rgba8sint:158,rgba16uint:160,rgba16sint:162,rgba16float:164,r32uint:166,r32sint:168,r32float:170,rg32uint:172,rg32sint:174,rg32float:176,rgba32uint:178,rgba32sint:180,rgba32float:182,true:188,false:190,const:194,override:196,asm:202,bf16:204,do:206,enum:208,f16:210,f64:212,handle:214,i8:216,i16:218,i64:220,mat:222,premerge:224,regardless:226,typedef:228,u8:230,u16:232,u64:234,unless:236,using:238,vec:240,void:242,while:244,bitcast:248,type:296,struct:300,fn:310,return:322,if:324,else:326,switch:328,case:330,fallthrough:332,default:334,loop:336,continuing:340,for:342,let:344,break:370,continue:372,discard:374,import:378,use:386},Gr=ue.deserialize({version:14,states:"!$WO!QQPOOP!XOPOOO!^QPO'#G{O!eQPO'#CfOOQO'#Gi'#GiO!jQPO'#CeO&_QPO'#CdO&sQPO'#CcOOQO'#Cc'#CcOOQO'#G}'#G}OOQO'#Gh'#GhO&xQPO'#G{QOQPOOO'PQPO'#C`OOQO'#Gg'#GgO'UQPO'#G`O'^QPO'#G`P'cO`O'#C^POOO)CBk)CBkOOQO-E:e-E:eO'nQPO,5=gO'uQPO,59QOOQO-E:g-E:gO+mQPO,59OO+uQPO,5<VO,mQPO'#CjO,uQPO,5:zO,uQPO,5:zO,zQPO,5<PO-PQPO,5<RO-UQPO'#FlOOQO,58},58}OOQO-E:f-E:fO-ZQPO,58zO-`QPO'#GbOOQO,5<z,5<zO-eQQO,5<zO-jQPO,5<zPOOO'#Gf'#GfP.bO`O,58xPOOO,58x,58xO.mQPO1G.lO.{QPO1G.jO3nQPO'#FqOOQO1G1q1G1qO3uQPO'#HTOOQO'#Cl'#ClO4WQQO'#CuOOQO'#Cu'#CuOOQO,59U,59UO,uQPO,59UO4cQPO1G0fO4hQPO1G0fO4pQPO1G1kO4xQPO1G1mO4}QPO,5<WOOQO1G.f1G.fO5SQQO'#GcO5_QPO,5<|O-`QPO,5<|O5gQPO1G2fO'XQPO1G2fPOOO-E:d-E:dPOOO1G.d1G.dOOQO'#HQ'#HQO5lQPO7+$WO.mQPO7+$WOOQO'#H`'#H`O5tQPO'#H`O5yQPO'#H`OOQO'#Cv'#CvOOQO'#Hh'#HhO6OQPO'#HgOOQO'#Hg'#HgOOQO'#E]'#E]OOQO7+$U7+$UO6TQPO'#H^OOQO'#Ha'#HaOOQO'#Hb'#HbOOQO'#Hc'#HcOOQO'#Hd'#HdO6YQPO'#CvO7gQPO'#CvO5tQPO'#CvO7lQPO'#IYOOQO'#Gr'#GrO7tQPO'#I[O8SQQO'#I]O7tQPO'#I]O9WQQO'#I[O;PQQO'#IZOOQO'#Fr'#FrO;ZQPO'#FrOOQO'#Go'#GoO;`QPO,5<]OOQO,5<],5<]OAPQPO'#H}O;gQPO'#IOO;gQPO'#IQOAWQPO'#IUO,uQPO'#IYOA]QPO'#IVOOQO'#I`'#I`OAbQPO,5=oOOQO'#HV'#HVOAjQPO,5=tOOQO1G.p1G.pO.{QPO7+&QO;gQPO7+&QOAjQPO7+'VODxQPO'#FiOOQO7+'X7+'XOETQPO1G1rOE`QPO,5<}OEeQPO1G2hOOQO1G2h1G2hOEmQPO1G2hOOQO-E:q-E:qOOQO7+(Q7+(QOOQO,5=U,5=UOOQO<<Gr<<GrOEuQPO<<GrOOQO-E:h-E:hOAjQPO'#H[OOQO,5=z,5=zOE}QPO'#HeOGRQPO,5>ROAjQPO,5=xOOQO,59b,59bO3uQPO'#H]O;gQPO,5>tOOQO-E:p-E:pOOQO'#I]'#I]OGYQQO,5>vOH^QPO'#HqOHeQPO,5<^OHjQPO,5>wO;gQPO'#HsOHoQPO'#HsOOQO,5>v,5>vOOQO'#I^'#I^O;gQPO,5>uOOQO,5<^,5<^OOQO-E:m-E:mOOQO1G1w1G1wOIiQSO'#CvO;gQPO'#HrOOQO'#Hp'#HpOJoQPO'#HpOK]QSO'#HoOOQO'#Hn'#HnO;gQPO'#HnOMyQSO'#HmO! OQSO'#HlO! }QSO'#HkO!!kQSO'#HjO!#fQPO'#HuO!#}QPO'#HiO!$SQPO'#HiO!$XQPO'#HiO!$^QPO'#HiO!$cQPO'#HiOOQO'#Ed'#EdO5tQPO'#HpOOQO,5>i,5>iO3iQPO,5>jO!$hQPO,5>lO!$mQPO,5>pO!$wQPO,5>tO!%_QPO,5>qOOQO1G3Z1G3ZO!%iQPO1G3ZOOQO1G3`1G3`OOQO<<Il<<IlOOQO'#Ec'#EcOOQO<<Jq<<JqO!%tQPO'#FjO!%yQPO,5<TO!&RQPO,5<TOOQO,5<T,5<TO!%tQPO'#FoO!&ZQPO'#FnO!&RQPO'#FnO!&cQPO7+'^OOQO1G2i1G2iOOQO7+(S7+(SO!&hQPO7+(SP!&pQPO'#GsOOQOAN=^AN=^P!&uQPO'#GjO!&zQPO,5=vO!'PQPO,5>POOQO'#Hf'#HfO!'UQPO1G3mO.{QPO1G3mOOQO1G3m1G3mO!'^QPO1G3dO!'fQPO,5=wOOQO1G4`1G4`OOQO1G4b1G4bO!'kQPO,5>]O;gQPO,5>]OOQO,5>],5>]OOQO1G1x1G1xOOQO1G4c1G4cO!'sQPO,5>_O!(aQQO,5>_OOQO1G4a1G4aO!)dQPO,5>^OOQO,5>[,5>[OOQO,5>Z,5>ZOOQO,5>Y,5>YO;gQPO,5>VO;gQPO,5>XO;gQPO,5>WO;gQPO,5>UO;gQPO,5>aO;gQPO,5>bO;gQPO,5>cO;gQPO,5>dO;gQPO,5>eO@zQPO,5>[O!)iQPO1G4UO!*yQPO1G4WO!+RQPO1G4[O3iQPO'#F{OOQO1G4[1G4[O!+]QPO1G4[O;gQPO1G4`O!+bQQO'#I]O:[QQO'#IZOOQO'#IX'#IXO!,`QPO'#IWO!,gQPO'#IWO!,lQPO1G4]O!,qQPO7+(uOOQO'#HW'#HWO!,vQQO'#HYOOQO,5<U,5<UO!,{QPO1G1oOOQO1G1o1G1oO!-WQPO1G1oOOQO-E:k-E:kOOQO,5<Z,5<ZO!-`QPO,5=YO!-kQPO,5<YOOQO-E:l-E:lO!-sQWO<<JxOOQO<<Kn<<KnPOQO,5=_,5=_OOQO1G3b1G3bO!%iQPO1G3kO!2]QPO7+)XOOQO7+)X7+)XO!2dQPO7+)XOOQO-E:i-E:iOOQO7+)O7+)OO!2lQPO7+)OOAjQPO1G3cO!8aQPO1G3wOOQO1G3w1G3wO!8hQPO1G3wOOQO-E:j-E:jO!9XQQO1G3yOOQO1G3y1G3yOOQO1G3x1G3xO!:[QSO,5>_OOQO1G3q1G3qOOQO1G3s1G3sOOQO'#Hm'#HmO!<`QSO1G3rO!=nQSO'#HmONWQPO'#HlO!=xQPO'#HkOOQO1G3p1G3pO!>eQPO1G3{O!>lQPO1G3|O!>sQPO1G3}O!>zQPO1G4OO!?RQPO1G4POOQO1G3v1G3vO!?YQPO7+)pOOQO'#Gp'#GpO!?bQPO7+)rO!?mQPO'#IRO!@OQQO'#IROOQO7+)v7+)vO!@TQPO7+)vOOQO,5<g,5<gOOQO7+)z7+)zOOQO,5>s,5>sO!@YQPO,5>rO!@kQPO,5>rO!@pQPO,5>rO3iQPO7+)wOOQO<<La<<LaOOQO7+'Z7+'ZO!@wQPO7+'ZP!ASQPO'#GmO!AXQPO1G1tP!AdQPO'#GnO!AiQPO'#FpOOQOAN@dAN@dO!DzQPO7+)VOOQO<<Ls<<LsO!EPQPO<<LsP!EWQPO'#GkOOQO'#H_'#H_O!E]QPO<<LjO!EbQPO7+(}OOQO7+)c7+)cO!EjQPO7+)cP!EqQPO'#GlOOQO7+)e7+)eO!EvQSO1G3yOOQO'#IP'#IPOOQO<<M[<<M[OOQO-E:n-E:nOOQO<<M^<<M^O!GSQQO'#ISO!?mQPO'#ISO!G[QQO,5>mO!GaQPO,5>mOOQO<<Mb<<MbO8SQQO'#I]O!GfQQO'#I_OOQO'#I_'#I_OOQO1G4^1G4^O!GpQPO1G4^O!HRQPO1G4^OOQO<<Mc<<McOOQO<<Ju<<JuPOQO,5=X,5=XPOQO,5=Y,5=YOAjQPO,5<[OOQO<<Lq<<LqOOQOANB_ANB_POQO,5=V,5=VOOQOANBUANBUOOQO<<Li<<LiO!%iQPO<<LiOOQO<<L}<<L}POQO,5=W,5=WOHtQQO'#CvO!HWQQO'#HoO!;hQPO1G3rO!HsQWO,5=]O!HzQQO,5>nOOQO-E:o-E:oO!ISQPO1G4XO!IXQPO1G4XOOQO,5>y,5>yOOQO7+)x7+)xO!IcQPO7+)xOOQO1G1v1G1vO!ItQPOANBTO!IyQWO1G4YP!JQQPO'#GqO!JVQPO7+)sO!JaQPO'#ITO!JkQPO'#ITOOQO7+)s7+)sO!JpQPO7+)sOOQO<<Md<<MdOOQOG27oG27oPOQO,5=],5=]OOQO<<M_<<M_O!JuQPO<<M_OOQO,5>o,5>oOOQOANByANByO!JzQPO'#HsO!KPQPO'#HnO#![QPO,5>_O!KPQPO,5>VO;gQPO,5>WOLiQSO'#HmO;gQPO'#Hs",stateData:"#!j~O%jOSPOS%kPQ~OU]O%T_O%X`O%pXO%rRO_XP#TXP#UXP$YXP$[XP$aXP~O%h%oP~P]O%kaO~O%h%oX~P]OTeO~O%rRO_XX#TXX#UXX$YXX$[XX$aXXTXXkXXlXXmXXnXXoXXpXXqXXrXXsXXtXXuXXvXXwXXxXXyXXzXX{XX|XX}XX!OXX!PXX!QXX!RXX!SXX!TXX!UXX!VXX!WXX!XXX!YXX!ZXX![XX!]XX!^XX!_XX!`XX!aXX!bXX!cXX!dXX!eXX!fXX!gXX!hXX!iXX!jXX!kXX!lXX!mXX~O_iO#TjO#UkO$YlO$[mO$anO~O%poO~O%h%oX~P`OTqO~O%WsO&nrO~O%WuO~O%lvO%mvO%nxO~O%h%oa~P`O%syO_Ya#TYa#UYa$YYa$[Ya$aYa%rYaTYakYalYamYanYaoYapYaqYarYasYatYauYavYawYaxYayYazYa{Ya|Ya}Ya!OYa!PYa!QYa!RYa!SYa!TYa!UYa!VYa!WYa!XYa!YYa!ZYa![Ya!]Ya!^Ya!_Ya!`Ya!aYa!bYa!cYa!dYa!eYa!fYa!gYa!hYa!iYa!jYa!kYa!lYa!mYa~O#OzO%pWa~O&n{O_$_a#T$_a#U$_a$Y$_a$[$_a$a$_a%T$_a%X$_a%h$_a%p$_a%r$_a~OT!PO%x}O~OT!PO~OT!VO~OT!WO~OT!XO~O%p!YO~OT!ZO~O'U!^O~O'V!_O_%Sa#T%Sa#U%Sa$Y%Sa$[%Sa$a%Sa%T%Sa%X%Sa%h%Sa%p%Sa%r%Sa~O%lvO%mvO%n!aO~OT!bOZ!bO[!bO]!bO~OT!hOZ!iO[!iO]!iOk!hOl!hOm!hOn!hOo!hOp!hOq!hOr!hOs!hOt!hOu!hOv!hOw!hOx!hOy!hOz!hO{!sO|!sO}!sO!O!tO!P!nO!Q!sO!R!sO!S!sO!T!sO!U!sO!V!sO!W!sO!X!sO!Y!sO!Z!uO![!oO!]!oO!^!pO!_!pO!`!pO!a!pO!b!pO!c!qO!d!qO!e!qO!f!qO!g!qO!h!qO!i!fO!j!rO!k!rO!l!rO!m!rO#Q!iO#R!iO~OT!yO_iO#v!wO#w!wO$g#SO$h#TO$j#UO$n#VO$q#XO$r#WO%P#YO%Q#YO%R#YO%p!}O%s!zO&n{O~O&o#RO~P2jOa#[Ob#[Oc#[Od#[Oe#[O~O%}#]O#OiX%piX~O#O#_O~O#O#`O%p#Si~O#O#aO%p$Xi~O&n#bO~O%s#dO~O'T#eO%u%VX&o%VX~O%u#fO&o#gO~O%W#jO~O%u#kO%v#lO~O%x#oO~O%x#qO~O%s#rO~O%x#sO~O%x#oO%sjX#OjX%pjX%{jX%ujX&ojX%vjX_jX#TjX#UjX$YjX$[jX$ajX%TjX%XjX%hjX%rjX&njX~O%x#uO~O#O#vO%p&|X~OT#xO#v!wO#w!wO%s!zO~O%s#zO#O'PX#q'PX$s'PX$t'PX$u'PX$v'PX$w'PX$x'PX$y'PX$z'PX${'PX$|'PX$}'PX%O'PX&h'PX~O#q#}O&h$OO#O'OX$s'OX$t'OX$u'OX$v'OX$w'OX$x'OX$y'OX$z'OX${'OX$|'OX$}'OX%O'OX%v'OX~O#O$RO$s$QO$t$QO$u$QO$v$QO$w$QO$x$QO$y$QO$z$QO${$QO$|$QO~O$}#{O%O#{O~P:[O%p$SO~O&o$UO~P2jOT$VOZ!iO[!iO]!iOk!hOl!hOm!hOn!hOo!hOp!hOq!hOr!hOs!hOt!hOu!hOv!hOw!hOx!hOy!hOz!hO{!sO|!sO}!sO!O!tO!P!nO!Q!sO!R!sO!S!sO!T!sO!U!sO!V!sO!W!sO!X!sO!Y!sO!Z!uO![!oO!]!oO!^!pO!_!pO!`!pO!a!pO!b!pO!c!qO!d!qO!e!qO!f!qO!g!qO!h!qO!i!fO!j!rO!k!rO!l!rO!m!rO#Q!iO#R!iO#X$hO#Y$hO#Z$hO#[$hO#]$hO#^$hO#_$hO#`$hO#a$hO#b$hO#c$hO#d$hO#e$hO#f$hO#g$hO#h$hO#i$hO#j$hO#k$hO#l$hO#m$hO#n$hO#p$iO#s$]O#t$]O#u$]O#v$]O#w$]O%s$WO~O%p&qX~P;gO&n$mO~O%s$oO~O%u$qO%{$pO~OT!hOk!hOl!hOm!hOn!hOo!hOp!hOq!hOr!hOs!hOt!hOu!hOv!hOw!hOx!hOy!hOz!hO{!sO|!sO}!sO!O!tO!P!nO!Q!sO!R!sO!S!sO!T!sO!U!sO!V!sO!W!sO!X!sO!Y!sO!Z!uO![!oO!]!oO!^!pO!_!pO!`!pO!a!pO!b!pO!c!qO!d!qO!e!qO!f!qO!g!qO!h!qO!i!fO!j!rO!k!rO!l!rO!m!rO~O%rRO&o$yOTXP~O%rROTXP%v$bP~OT%OO~O&o%POT%ga~O%u%QO&o%PO~O%u#kO%v%SO~O!n%WO!o%WO!p%WO!q%WO!r%WO!s%WO!t%WO!u%WO!v%WO!w%WO!x%WO!y%WO!z%WO!{%WO!|%WO!}%WO~O%v%ZO~P.{O#q#}O&h$OO#O'Oa$s'Oa$t'Oa$u'Oa$v'Oa$w'Oa$x'Oa$y'Oa$z'Oa${'Oa$|'Oa$}'Oa%O'Oa%v'Oa~O%v%bO~P;gO%p%cO~O%v%dO~OT%fO~O#q&dX$T&dX$U&dX%p&dX%sjX%s#oX&h&dX&n&dX%u&dX%v&dX#r&dX~O#s&dX#v&dX#w&dX#x&dX#y&dX#z&dX#{&dX#|&dX#}&dX$O&dX$P&dX$Q&dX$R&dX$S&dX$V&dX$W&dX~PHtO%s#zO~O$T&cX$U&cX%p&cX&n&cX%u&cX%v&cX#r&cX~O#q)WO&h)QO#s&cX#v&cX#w&cX#x&cX#y&cX#z&cX#{&cX#|&cX#}&cX$O&cX$P&cX$Q&cX$R&cX$S&cX$V&cX$W&cX~PJtO#{%lO#|%lO#s&aX#v&aX#x&aX#y&aX#z&aX#}&aX$O&aX$P&aX$Q&aX$R&aX$S&aX$T&aX$U&aX%p&aX&n&aX%u&aX%v&aX#r&aX~O#w&kX$V&lX$W&mX~PLiO#v%mO#x%mO#y%mO#s&`X#z&`X$T&`X$U&`X%p&`X&n&`X%u&`X%v&`X#r&`X~O#}&`X$O&`X$P&`X$Q&`X$R&`X$S&`X~PNWO$T&_X$U&_X%p&_X&n&_X%u&_X%v&_X#r&_X~O#s%nO#z%nO#}&_X$O&_X$P&_X$Q&_X$R&_X$S&_X~P! fO#}%oO$O%oO$P%oO$Q%oO$R%oO$S%oO$T&^X$U&^X%p&^X&n&^X%u&^X%v&^X#r&^X~O$T&iX$U&jX%p&]X&n&]X%u&]X%v&]X#r&]X~O$T%pO~O$U%qO~O#w%rO~O$V%sO~O$W%tO~O&n%wO~O$p%yO&o%zO~P2jO#O%|O~O_iO#v!wO#w!wO$r#WO%s!zO~OT%}O%p&QO~P!$|Of&UOg&UOh&UO~OT&VO~O%u&XO&o&YO~O%rROTXP~O%u&^O%v$bX~O%v&aO~O&o&bOT%ga~O%u&cO~O%u#kO~O%{&dO~O%u&eO~O%u&fO%v&gO~O%u&kO%{&jO~O%u&lO~O%u&mO%v&nO~O#r&qO~O%v&ga$T&ga$U&ga%p&ga&n&ga%u&ga#r&ga~O#q#}O&h$OO#O&ga$s&ga$t&ga$u&ga$v&ga$w&ga$x&ga$y&ga$z&ga${&ga$|&ga$}&ga%O&ga~P!'xO%v&sO~O$i'TOT&ri_&ri#v&ri#w&ri$g&ri$h&ri$j&ri$n&ri$q&ri$r&ri%P&ri%Q&ri%R&ri%p&ri%s&ri&n&ri&o&ri$p&ri$l&ri~O$k'WO$m'XO~O$p%yO&o'YO~P2jO&o'YO~O%s#zO#O'PX#q'PX$s'PX$t'PX$u'PX$v'PX$w'PX$x'PX$y'PX$z'PX${'PX$|'PX&h'PX~O%p'_O~P;gO%p'aO~O%v'bO~O%{'cO~O%}#]O~O&o'dOT%aa%r%aa~O%u'eO&o'dO~OT%ba%r%ba%v$ba~O%u'gO%v$ba~O&p'iO_$dP#T$dP#U$dP$Y$dP$[$dP$a$dP%T$dP%X$dP%h$dP%p$dP%r$dP&n$dP~OT%_aZ%_a[%_a]%_ak%_al%_am%_an%_ao%_ap%_aq%_ar%_as%_at%_au%_av%_aw%_ax%_ay%_az%_a{%_a|%_a}%_a!O%_a!P%_a!Q%_a!R%_a!S%_a!T%_a!U%_a!V%_a!W%_a!X%_a!Y%_a!Z%_a![%_a!]%_a!^%_a!_%_a!`%_a!a%_a!b%_a!c%_a!d%_a!e%_a!f%_a!g%_a!h%_a!i%_a!j%_a!k%_a!l%_a!m%_a#Q%_a#R%_a~O%v'lO~P!.nO%u'mO%v'lO~OT'oOZ'oO['oO~OT%`aZ%`a[%`a]%`ak%`al%`am%`an%`ao%`ap%`aq%`ar%`as%`at%`au%`av%`aw%`ax%`ay%`az%`a{%`a|%`a}%`a!O%`a!P%`a!Q%`a!R%`a!S%`a!T%`a!U%`a!V%`a!W%`a!X%`a!Y%`a!Z%`a![%`a!]%`a!^%`a!_%`a!`%`a!a%`a!b%`a!c%`a!d%`a!e%`a!f%`a!g%`a!h%`a!i%`a!j%`a!k%`a!l%`a!m%`a#Q%`a#R%`a#X%`a#Y%`a#Z%`a#[%`a#]%`a#^%`a#_%`a#`%`a#a%`a#b%`a#c%`a#d%`a#e%`a#f%`a#g%`a#h%`a#i%`a#j%`a#k%`a#l%`a#m%`a#n%`a#p%`a#s%`a#t%`a#u%`a#v%`a#w%`a%s%`a~O%v'rO~P!2wO%u'sO%v'rO~O%v&gi$T&gi$U&gi%p&gi&n&gi%u&gi#r&gi~O#q#}O&h$OO#O&gi$s&gi$t&gi$u&gi$v&gi$w&gi$x&gi$y&gi$z&gi${&gi$|&gi$}&gi%O&gi~P!8pO#q)WO&h)QO#s&ga#v&ga#w&ga#x&ga#y&ga#z&ga#{&ga#|&ga#}&ga$O&ga$P&ga$Q&ga$R&ga$S&ga$V&ga$W&ga~P!'xO#v%mO#x%mO#y%mO#s&`i#z&`i$T&`i$U&`i%p&`i&n&`i%u&`i%v&`i#r&`i~O#}&`i$O&`i$P&`i$Q&`i$R&`i$S&`i~P!;hO#s&aX#v&aX#x&aX#y&aX#z&aX$T&aX$U&aX%p&aX&n&aX%u&aX%v&aX#r&aX~O#{)TO#|)TO~P!<vO#s)UO#z)UO~P! fO%p&]i&n&]i%u&]i%v&]i#r&]i~O$T&ii~P!>SO$U&ji~P!>SO#w&ki~P!>SO$V&li~P!>SO$W&mi~P!>SO$h#TO&n{O~O$k'WO$m'XO&o'zO~OZ!iO[!iO]!iO#Q!iO#R!iO~O%}(OO~O&o(PO~OT(QO#v!wO#w!wO%s!zO%v&za~O%p(UO~O%p(UO~P;gO&o(XOT%aa%r%aa~O%u(YO~OT%ba%r%ba%v$bi~O%u(ZO~O%rROTXPkXPlXPmXPnXPoXPpXPqXPrXPsXPtXPuXPvXPwXPxXPyXPzXP{XP|XP}XP!OXP!PXP!QXP!RXP!SXP!TXP!UXP!VXP!WXP!XXP!YXP!ZXP![XP!]XP!^XP!_XP!`XP!aXP!bXP!cXP!dXP!eXP!fXP!gXP!hXP!iXP!jXP!kXP!lXP!mXP~O%{(]O~O%v(^O~P!.nO%u(_O~O%{(`O~O%u(bO%{(aO~O%v(cO~P!2wO%u(dO~O#q)WO&h)QO#s&gi#v&gi#w&gi#x&gi#y&gi#z&gi#{&gi#|&gi#}&gi$O&gi$P&gi$Q&gi$R&gi$S&gi$V&gi$W&gi~P!8pO%u(hO%}&vX~O%}(kO~O&n(lO~O$}(mO%O(mO~P:[OT(QO#v!wO#w!wO%s!zO%v&zi~O%p(oO~O#q#}O&h$OO~PJtOZ%ea[%ea]%ea#Q%ea#R%ea~O%}&va~P!HbO%u(rO%}&va~O&n(tO~O$l(vO&o(wO~P2jOT(QO#v!wO#w!wO%s!zO%v&zq~O%{(zO~O%}&vi~P!HbO%u({O~O$l(vO&o(|O~P2jO$l(vO&o&wX~P2jO%p)OO~O&o(|O~O&o)PO~OT&tO~OT(eOk!hOl!hOm!hOn!hOo!hOp!hOq!hOr!hOs!hOt!hOu!hOv!hOw!hOx!hOy!hOz!hO{!sO|!sO}!sO!O!tO!P!nO!Q!sO!R!sO!S!sO!T!sO!U!sO!V!sO!W!sO!X!sO!Y!sO!Z!uO![!oO!]!oO!^!pO!_!pO!`!pO!a!pO!b!pO!c!qO!d!qO!e!qO!f!qO!g!qO!h!qO!i!fO!j!rO!k!rO!l!rO!m!rO#X$hO#Y$hO#Z$hO#[$hO#]$hO#^$hO#_$hO#`$hO#a$hO#b$hO#c$hO#d$hO#e$hO#f$hO#g$hO#h$hO#i$hO#j$hO#k$hO#l$hO#m$hO#n$hO#p$iO#s)RO#t)RO#u)RO#v)RO#w)RO%s$WO~P!?mO#r'vO~OP#x][Z#sT[~",goto:"@{'TPP'UP'XPP']'c'i'zPPP(WP(ePPPPPPPP(h(wPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP*OPP'cPP*U*_PPPPPPPPPPPPPPPPPPPPPP*|PPPPPPPPPPPPPPPPPPPPPPP'cP+kP+q+t+k+zP+},Q,W,Z,sPPPPPPPP-OPPPPPPPPPPPPPPPPPP']P-U-[PP-b-h-n-x.W.^.d.j.p.v/Q/W/^/oPPPPPPP/uP/xPP0OPP0UP0X0_P0hP0u1P1S1{1S2O2O2w3p4i4l4o4y5t6l7S7i8O8k9l:Z:z;W;xP<[<l<|=^=nPPP>O>X>e>h>q>u>x>h>h?R?U?X?e?v@[@m@r>ORbPT^OQXXOQZdXVOQZdWUOQZdS$v#b$xS$z#d$|R(['ieSOQTZd#b#d$x$|'iQgUa!v{#Q$m$o%x(l(t(uR!SiQ!RiQ!TjQ!UkQ#^!SR$n#WW!jz#_#r%Y!W$Y#S#T#U#`#v#z#}$R$W$]%a%l%m%n%o%p%q%r%s%t%|&Q'a)R)T)U)WQ$r#]Q$u#aQ%U#oQ%[#sQ'q&lR(p([Q!mzR$s#_Q$s#`Q%^#vR']%|!X$X#S#T#U#`#v#z#}$R$W$]%a%l%m%n%o%p%q%r%s%t%|&Q'a)R)T)U)W!X$Y#S#T#U#`#v#z#}$R$W$]%a%l%m%n%o%p%q%r%s%t%|&Q'a)R)T)U)WXWOQZdR#c!WQ$w#bR&Z$xRhUR$}#dQ${#dR&_$|R'j&aQ|h^!}{#Q$m%x(l(t(uQ%v$kQ'[%yQ'w'TR(W'bW#P{#Q$m%xV(u(l(t(uQ%{$mR'Z%xQt_R#j!_Q![rR#h!]QwaR!`wQQORcQQZOQdQTpZdbTOQZd#b#d$x$|'iRfTQ!dyR#n!dQ%Y#rR&i%YQ%a#zR&p%aQ$x#bR&[$xQ$|#dR&`$|Q#Q{S$T#Q%xR%x$mQ'V%wR'y'VQ'|'WR(j'|h!x{!z#Q$m$o%x'_(U(l(o(t(uR#w!xQ!]rR#i!]R[OXYOQZdQ!cyR#m!dR!OiQ#Z}R%]#uQ&T$qQ'k&eR(q(bY!Qijk!S#WQ&W$vR&]$zQ#p!fS#t!s!uR%u$iR#t!t!m!hz#S#T#U#]#_#`#a#o#r#s#v#z#}$R$W$]%Y%a%l%m%n%o%p%q%r%s%t%|&Q&l'a([)R)T)U)WR'p&k!m!ez#S#T#U#]#_#`#a#o#r#s#v#z#}$R$W$]%Y%a%l%m%n%o%p%q%r%s%t%|&Q&l'a([)R)T)U)W!m!fz#S#T#U#]#_#`#a#o#r#s#v#z#}$R$W$]%Y%a%l%m%n%o%p%q%r%s%t%|&Q&l'a([)R)T)U)W!m!gz#S#T#U#]#_#`#a#o#r#s#v#z#}$R$W$]%Y%a%l%m%n%o%p%q%r%s%t%|&Q&l'a([)R)T)U)WR#p!gR%V#qS!lz#_Q%X#rR&h%YW!kz#_#r%Y!W$X#S#T#U#`#v#z#}$R$W$]%a%l%m%n%o%p%q%r%s%t%|&Q'a)R)T)U)WQ'{'WR(i'|Q$j#SQ$k#TQ$l#UU$t#`#v%|Q%`#zQ%e#}Q%g$RQ%h$WQ&o%aQ'`&QQ(V'aR)S)Wl$b#S#T#U#`#v#z#}$R$W%a%|&Q'a)WQ&}%pR'O%qp$a#S#T#U#`#v#z#}$R$W%a%p%q%|&Q'a)WR&|%op$`#S#T#U#`#v#z#}$R$W%a%p%q%|&Q'a)WR&{%op$_#S#T#U#`#v#z#}$R$W%a%p%q%|&Q'a)WQ&x%nQ&z%oR(g)Ul$^#S#T#U#`#v#z#}$R$W%a%|&Q'a)WS%k$])RS&u%l)TQ&v%mS&w%n)UQ&y%oQ'P%rQ'Q%sQ'R%tT)V%p%q!X$[#S#T#U#`#v#z#}$R$W$]%a%l%m%n%o%p%q%r%s%t%|&Q'a)R)T)U)W!S$Z#S#T#U#`#v#z#}$R$W$]%a%l%m%n%o%p%q%r%s%t%|&Q'a)U)WT(f)R)TQ#{!yQ%i$YQ'^%}R(m(Q!W$X#S#T#U#`#v#z#}$R$W$]%a%l%m%n%o%p%q%r%s%t%|&Q'a)R)T)U)WR'S%uQ$P!{Q%_#yS%j$Z(fS&r%f&tT'u&q'vm$c#S#T#U#`#v#z#}$R$W%a%|&Q'a)Wm$d#S#T#U#`#v#z#}$R$W%a%|&Q'a)Wm$e#S#T#U#`#v#z#}$R$W%a%|&Q'a)Wm$f#S#T#U#`#v#z#}$R$W%a%|&Q'a)Wm$g#S#T#U#`#v#z#}$R$W%a%|&Q'a)W_#O{#Q$m%x(l(t(u^!}{#Q$m%x(l(t(uR'w'TR'x'T_!}{#Q$m%x(l(t(uT'U%w'VR'}'WQ(x(lQ(}(tR)O(uR&S$oR&R$o^#O{#Q$m%x(l(t(uR&P$o^#O{#Q$m%x(l(t(uQ&P$oV(S'_(U(o^!|{#Q$m%x(l(t(uQ#|!zQ&O$oV(R'_(U(oh!{{!z#Q$m$o%x'_(U(l(o(t(uR#y!xV$R!|&O(RQ(T'_Q(n(UR(y(o",nodeNames:"⚠ LineComment BlockComment Program EnableDirective Identifier Directive LocalDeclaration GlobalVariableDeclaration AttributeList Attribute IntLiteral UintLiteral FloatLiteral VariableDeclaration Keyword VariableQualifier Keyword Keyword Keyword Keyword Keyword Keyword Keyword Keyword VariableIdentifier TypeDeclaration Type Type Type Type Type Type Type Type Type Type Type Type Type Type Type Type Type Type Type Type Type Type Type Type Type Type Type Type Type Type Type Type Type Keyword Keyword Keyword Keyword Keyword Type Type Type Type Type Type Keyword Type Type Type Type Type Type Type Type Type Type Type Type Type Type Type Type Type Type Type Type Assign Value Boolean Boolean GlobalConstantDeclaration Keyword Keyword Value Reserved Reserved Reserved Reserved Reserved Reserved Reserved Reserved Reserved Reserved Reserved Reserved Reserved Reserved Reserved Reserved Reserved Reserved Reserved Reserved Reserved Reserved Reserved FunctionCall Keyword LeftBracket RightBracket Sub Bang Tilde Mul And Div Mod Add Left Right Lt Gt Lte Gte Eq Neq OrOr AndAnd Or Xor TypeAliasDeclaration Keyword StructDeclaration Keyword StructBodyDeclaration StructMember FunctionDeclaration FunctionHeader Keyword ParamList Param ReturnType CompoundStatement Statement Keyword Keyword Keyword Keyword Keyword Keyword Keyword Keyword ContinuingStatement Keyword Keyword Keyword AddAssign SubAssign MulAssign DivAssign ModAssign AndAssign XorAssign OrAssign LeftAssign RightAssign Inc Dec Keyword Keyword Keyword ImportDeclaration Keyword ImportDeclarationList ImportDeclarationIdentifier String Keyword",maxTerm:283,skippedNodes:[0,1,2,194],repeatNodeCount:14,tokenData:"8z~R|X^#{pq#{qr$prs$}uv&vvw'Twx'jxy)^yz)cz{)h{|)u|}*[}!O*a!O!P/T!P!Q/]!Q!R0^!R![1x![!]2^!]!^2k!^!_2p!_!`3a!`!a3n!b!c4_!c!}4d!}#O4u#P#Q4z#Q#R5P#R#S4d#T#U5^#U#Y4d#Y#Z6Y#Z#o4d#o#p8U#p#q8Z#q#r8p#r#s8u#y#z#{$f$g#{#BY#BZ#{$IS$I_#{$I|$JO#{$JT$JU#{$KV$KW#{&FU&FV#{~$QY%j~X^#{pq#{#y#z#{$f$g#{#BY#BZ#{$IS$I_#{$I|$JO#{$JT$JU#{$KV$KW#{&FU&FV#{Y$uP#tQ!_!`$xW$}O$SW~%QVOr$}rs%gs#O$}#O#P%l#P;'S$};'S;=`&p<%lO$}~%lO%W~~%oVOr$}rs&Us#O$}#O#P%l#P;'S$};'S;=`&p<%lO$}~&ZV%W~Or$}rs%gs#O$}#O#P%l#P;'S$};'S;=`&p<%lO$}~&sP;=`<%l$}^&{P#yY!_!`'OS'TO$wS~'YQ#wYvw'`!_!`'e~'eO$U~S'jO$xS~'mVOw'jwx%gx#O'j#O#P(S#P;'S'j;'S;=`)W<%lO'j~(VVOw'jwx(lx#O'j#O#P(S#P;'S'j;'S;=`)W<%lO'j~(qV%W~Ow'jwx%gx#O'j#O#P(S#P;'S'j;'S;=`)W<%lO'j~)ZP;=`<%l'j~)cO%s~~)hO%v~^)mP#vY!_!`)pS)uO$uS^)zQ#zY{|*Q!_!`*VS*VO$}SS*[O$sS~*aO%u~~*fU#sY}!O*x!O!P*}!Q!R,Y!R![.h!_!`.y!`!a/OS*}O%OSb+QP!Q![+Tb+YS]b!Q![+T!g!h+f#X#Y+f#Y#Z,Tb+iR{|+r}!O+r!Q![+xb+uP!Q![+xb+}Q]b!Q![+x#Y#Z,Tb,YO]b~,]U!O!P+T!Q![,o!g!h+f!z!{-O#X#Y+f#l#m-Ob,rS!O!P+T!Q![,o!g!h+f#X#Y+f~-RS!O!P-_!Q![.P!c!i.P#T#Z.Pb-bR!Q![-k!c!i-k#T#Z-kb-pT]b!Q![-k!c!i-k!r!s+f#T#Z-k#d#e+f~.UUZ~!O!P-k!Q![.P!c!i.P!r!s+f#T#Z.P#d#e+f~.mSZ~!O!P+T!Q![.h!g!h+f#X#Y+fS/OO$tS`/TO&p`n/YP&h[!Q![+T~/bR#xYz{/k!P!Q/p!_!`0X~/pO%k~~/uSP~OY/pZ;'S/p;'S;=`0R<%lO/p~0UP;=`<%l/pS0^O$vS~0cVZ~!O!P+T!Q![,o!g!h+f!z!{0x#X#Y+f#i#j1s#l#m0x~0{S!O!P-_!Q![1X!c!i1X#T#Z1X~1^VZ~!O!P-k!Q![1X!c!i1X!r!s+f#T#Z1X#d#e+f#i#j1s~1xO[~~1}TZ~!O!P+T!Q![1x!g!h+f#X#Y+f#i#j1sf2cP%}d![!]2fQ2kO'VQ~2pO%p~^2wQ%xQ#}W!^!_2}!_!`3[[3SP#{W!_!`3VS3[O${SW3aO$PW^3fP#OU!_!`3iW3nO$RW^3uQ%{Q$OW!_!`3{!`!a4QW4QO$QW[4VP#|W!_!`4YS4_O$|S~4dO%r~b4iSTb!Q![4d!c!}4d#R#S4d#T#o4d~4zO#q~~5PO#r~^5UP$WY!_!`5XS5^O$ySf5cUTb!Q![4d!c!}4d#R#S4d#T#g4d#g#h5u#h#o4df5|S'TSTb!Q![4d!c!}4d#R#S4d#T#o4df6_UTb!Q![4d!c!}4d#R#S4d#T#f4d#f#g6q#g#o4df6vUTb!Q![4d!c!}4d#R#S4d#T#c4d#c#d7Y#d#o4df7_UTb!Q![4d!c!}4d#R#S4d#T#a4d#a#b7q#b#o4df7xS'USTb!Q![4d!c!}4d#R#S4d#T#o4d~8ZO&n~~8`Q$VY!_!`8f#p#q8kS8kO$zS~8pO$T~~8uO&o~~8zO#u~",tokenizers:[1,2,3,4,new rt("j~RQYZXz{^~^O%m~~aP!P!Qd~iO%n~~",25,212)],topRules:{Program:[0,3]},specialized:[{term:5,get:i=>Ur[i]||-1}],tokenPrec:4295}),Cr=Gr.configure({props:[bt({Assign:x.operator,AddAssign:x.operator,SubAssign:x.operator,MulAssign:x.operator,DivAssign:x.operator,ModAssign:x.operator,LeftAssign:x.operator,RightAssign:x.operator,AndAssign:x.operator,XorAssign:x.operator,OrAssign:x.operator,Add:x.operator,Sub:x.operator,Mul:x.operator,Div:x.operator,Mod:x.operator,Left:x.operator,Right:x.operator,And:x.operator,Xor:x.operator,Or:x.operator,AndAnd:x.operator,OrOr:x.operator,Inc:x.operator,Dec:x.operator,Bang:x.operator,Tilde:x.operator,Eq:x.operator,Neq:x.operator,Lt:x.operator,Lte:x.operator,Gt:x.operator,Gte:x.operator,"<":x.operator,">":x.operator,ReturnType:x.operator,Comment:x.comment,LineComment:x.comment,BlockComment:x.comment,"FunctionHeader/Identifier":x.macroName,"FunctionCall/Identifier":x.macroName,Keyword:x.keyword,Type:x.typeName,TypeDeclaration:x.typeName,Attribute:x.attributeName,"Attribute/Identifier":x.attributeName,"Attribute/IntLiteral":x.number,IntLiteral:x.number,UintLiteral:x.number,FloatLiteral:x.number,String:x.string,true:x.number,false:x.number,Directive:x.keyword,Identifier:x.macroName}),Tt.add({ifStatement:St({except:/^\s*({|else\b)/}),CompoundStatement:Xe({closing:"}"}),StructBodyDeclaration:Xe({closing:"}"})})]}),zr=wt.define({name:"wgsl",parser:Cr,languageData:{closeBrackets:{brackets:["(","[","{","'",'"',"`"]},commentTokens:{line:"//",block:{open:"/*",close:"*/"}},indentOnInput:/^\s*(?:case |default:|\{|\}|<\/)$/,wordChars:"$"}});function Wr(){return new Rt(zr)}const Yr={0:"point-list",1:"line-list",2:"triangle-list"},jr=i=>Yt(i.map(e=>jt(-1,1,e))),qr=i=>{const e=i.length,t=Se(qt(Se(i))),r=n=>n*t[0],s=(n,o)=>n*t[0]+o*t[1],a=(n,o,l)=>n*t[0]+o*t[1]+l*t[2];switch(e){case 1:return S(0,i[0]-1).map(o=>[r(o+0),r(o+1)]);case 2:{const n=S(0,i[0]).flatMap(l=>S(0,i[1]-1).map(O=>[s(l,O+0),s(l,O+1)])),o=S(0,i[1]).flatMap(l=>S(0,i[0]-1).map(O=>[s(O+0,l),s(O+1,l)]));return we(n,o)}case 3:{const n=S(0,i[0]).flatMap(O=>S(0,i[1]).flatMap(f=>S(0,i[2]-1).map(c=>[a(O,f,c+0),a(O,f,c+1)]))),o=S(0,i[0]).flatMap(O=>S(0,i[2]).flatMap(f=>S(0,i[1]-1).map(c=>[a(O,c+0,f),a(O,c+1,f)]))),l=S(0,i[1]).flatMap(O=>S(0,i[2]).flatMap(f=>S(0,i[0]-1).map(c=>[a(c+0,O,f),a(c+1,O,f)])));return we(n,o,l)}}return[]},Mr=i=>{const e=jr(i).map(s=>[1,s[0]??0,s[1]??0,s[2]??0]),t=ge([1,1,1,1],e.length),r=qr(i);return{position:{data:e.flat(1),type:Float32Array,numComponents:4},color:{data:t.flat(1),type:Float32Array,numComponents:4},indices:{data:r.flat(1),type:Uint32Array}}},Vr=`const mat2x2f_I = mat2x2f(1,0,0,1);
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
`,Dr=`struct cf32 {
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
`,Nr=`alias gcf32 = vec2f;

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
`,Br=`alias dcl2vec = vec2f;
alias dcl3vec = vec3f;
alias dcl4vec = vec4f;

alias dcl2rot = vec2f;
alias dcl3rot = vec4f;

const dcl3rot_e01 = dcl3rot(1, 0, 0, 0);
const dcl3rot_e02 = dcl3rot(0, 1, 0, 0);
const dcl3rot_e12 = dcl3rot(0, 0, 1, 0);

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
`,Er=`
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
`,Fr=`
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
`,Hr=()=>`
${Er}
${Dr}
${Fr}
${Nr}
${Br}
${Vr}
`,Zr=i=>{const e=/@plot\s+fn\s+(?<name>\w+)\s*\(\w+:\s*(?<domain>\w+)\)\s*->\s*(?<codomain>\w+)/g,t=[];let r;do r=e.exec(i),r&&r.groups&&t.push({name:r.groups.name,domain:{name:r.groups.domain},codomain:{name:r.groups.codomain}});while(r);return{functions:t}},ve=i=>{switch(i.name){case"vec1f":return 1;case"vec2f":return 2;case"vec3f":return 3;case"vec4f":return 4}return 0},Ne=i=>[ve(i.domain),ve(i.codomain)],Lr=`fn dcl3_rotor(k: f32, x: vec2f) -> dcl3rot {
  let r01 = dcl3rot_exp(k, dcl3rot_muls(dcl3rot_e12, 0.5*x[0]));
  let r12 = dcl3rot_exp(k, dcl3rot_muls(dcl3rot_e01, 0.5*x[1]));
  return dcl3rot_mul(k, r01, r12);
}

fn dcl3_ncoord(k: f32, x: vec2f) -> dcl3rot {
  let r = dcl3_rotor(k, x);
  return dcl3rot_sw(k, dcl3rot_e01, r);
}

const A = vec2f(1., 0.*TAU/3.);
const B = vec2f(1., 1.*TAU/3.);
const C = vec2f(1., 2.*TAU/3.);

@plot
fn f(x: vec2f) -> vec3f {
  let k = uGlobal.args[0];
  return dcl3_ncoord(k, x).xyz;
}

@plot
fn lAB(t: vec1f) -> vec3f {
  let k = uGlobal.args[0];
  let a = dcl3_ncoord(k, A);
  let b = dcl3_ncoord(k, B);
  let view = dcl3_rotor(k, uGlobal.args.yz);
  return dcl3rot_sw(k, dcl3rot_mix(k, a, b, t), view).xyz;
}

@plot
fn lBC(t: vec1f) -> vec3f {
  let k = uGlobal.args[0];
  let b = dcl3_ncoord(k, B);
  let c = dcl3_ncoord(k, C);
  let view = dcl3_rotor(k, uGlobal.args.yz);
  return dcl3rot_sw(k, dcl3rot_mix(k, b, c, t), view).xyz;
}

@plot
fn lCA(t: vec1f) -> vec3f {
  let k = uGlobal.args[0];
  let c = dcl3_ncoord(k, C);
  let a = dcl3_ncoord(k, A);
  let view = dcl3_rotor(k, uGlobal.args.yz);
  return dcl3rot_sw(k, dcl3rot_mix(k, c, a, t), view).xyz;
}
`,Kr={source:Lr,options:{args:[1,0,0,0],functions:[{color:"#555555",extent:[[0,-Math.PI],[Math.PI,+Math.PI]],visible:!0},{color:"#ffffff",extent:[[0],[1]],visible:!0},{color:"#ffffff",extent:[[0],[1]],visible:!0},{color:"#ffffff",extent:[[0],[1]],visible:!0}]}},$e=i=>(vt("data-v-2676965b"),i=i(),Qt(),i),Jr={class:"flex flex-row items-center h-12 p-1 border-b-2 border-border"},en=$e(()=>k("h1",{class:"px-2"},"Parametric Surface",-1)),tn=$e(()=>k("span",{class:"flex-grow"},null,-1)),rn={class:"flex flex-row items-center justify-center overflow-hidden show-focus-within"},nn={class:"flex flex-col p-2"},sn=$e(()=>k("summary",{class:"flex flex-row items-center gap-2 my-1"},[k("h2",null,"Global")],-1)),an={class:"w-16 text-xs text-right font-mono"},on=["onUpdate:modelValue"],ln=["onUpdate:modelValue"],On={class:"flex flex-row items-center gap-2 my-1"},cn=["onUpdate:modelValue"],un={class:"flex-grow"},fn={class:"text-text text-base"},hn=`
struct GlobalData {
  projection: mat4x4f,
  view: mat4x4f,
  args: vec4f,
  time: f32,
}
`,dn=`
struct SurfaceData {
  model: mat4x4f,
  color: vec4f,
}
`,pn=V({__name:"ParametricSurfaceView",setup(i){const e={extensions:[It,Wr()]},t=I(Kr),r=pt(t),s=`
${hn}
${dn}

@group(0) @binding(0) var<uniform> uGlobal: GlobalData;
@group(0) @binding(1) var<uniform> uSurface: SurfaceData;
`,a=(h,[m,P])=>{const v=_=>{switch(_){case 1:return"vec1f(position.y)";case 2:return"position.yz";case 3:return"position.yzw";default:return"0.0"}};return`fn surface(position: vec4f) -> vec4f {
  return ${(_=>A=>{switch(_){case 1:return`vec4(1.0, ${A}[0], 0.0, 0.0)`;case 2:return`vec4(1.0, ${A}, 0.0)`;case 3:return`vec4(1.0, ${A})`;default:return"vec4(1.0, 0.0, 0.0, 0.0)"}})(P)(`${h}(${v(m)})`)};
}`},n=(h,m)=>`
${Hr()}

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

${h}

${m}

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
`,o=I(null),l=Ft(s),O=Ue(l.uniforms.uGlobal);O.set({projection:Ie.perspective(Math.PI/4,1920/1080,.1,1e3),view:Ie.translation([0,0,0]),args:[0,0,0,0]});const f={},c={alphaMode:"premultiplied",size:[1920,1080],autoResize:!1},u=h=>{const m={state:null,valid:!1,onCreate(P){console.log("Resource::onCreate"),!m.state&&(m.state=h.create(P))},onUpdate(P){var v,R;m.valid||((v=m.onDelete)==null||v.call(m,P),(R=m.onCreate)==null||R.call(m,P),m.valid=!0)},onDelete(P){console.log("Resource::onDelete"),m.state&&(h.delete(P,m.state),m.state=null)}};return m},p=h=>[[],[Math.pow(h,3*2)],[Math.pow(h,3),Math.pow(h,3)],[Math.pow(h,2),Math.pow(h,2),Math.pow(h,2)]],d=u({create({device:h}){return p(3).map(Mr).map(P=>({vertices:Zt(h,P,{shaderLocation:0,stepMode:"vertex",interleave:!0}),topology:1}))},delete({device:h},m){}}),g=u({create({device:h,format:m}){return{uniforms:h.createBuffer({size:O.arrayBuffer.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST})}},delete({device:h},m){}}),Q=u({create({device:h,format:m}){if(!g.state||!d.state||!o.value)return null;const{source:P,info:v}=o.value;return v.functions.map((R,_)=>{const[A,j]=Ne(R),U=h.createShaderModule({code:n(P,a(R.name,[A,j]))}),{uniforms:T}=g.state,{vertices:re}=d.state[A],H=h.createRenderPipeline({layout:"auto",vertex:{module:U,entryPoint:"vertexMain",buffers:re.bufferLayouts},fragment:{module:U,entryPoint:"fragmentMain",targets:[{format:m}]},primitive:{topology:Yr[1]}});f[_]=Ue(l.uniforms.uSurface);const ne=h.createBuffer({size:f[_].arrayBuffer.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),N=h.createBindGroup({layout:H.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:T}},{binding:1,resource:{buffer:ne}}]});return{pipeline:H,bindGroup:N,uniforms:ne}})},delete({device:h},m){}}),{listeners:y,transformInplace:D}=Kt([-8,0,0]),pe={onCreate(h){var m,P,v;console.log("ParametricSurfaceView::onCreate"),(m=g.onUpdate)==null||m.call(g,h),g.state&&((P=d.onUpdate)==null||P.call(d,h),d.state&&((v=Q.onUpdate)==null||v.call(Q,h),Q.state))},onRender(h){var T,re,H;const{device:m,context:P,timestamp:v}=h;if((T=g.onUpdate)==null||T.call(g,h),!g.state||((re=d.onUpdate)==null||re.call(d,h),!d.state)||((H=Q.onUpdate)==null||H.call(Q,h),!Q.state))return;const R=m.createCommandEncoder(),_=R.beginRenderPass({colorAttachments:[{clearValue:Float32Array.of(0,0,0,0),loadOp:"clear",storeOp:"store",view:P.getCurrentTexture().createView()}]});if(!o.value)return null;const{info:A}=o.value,{uniforms:j}=g.state;O.set({args:r.options.args,time:v/1e3}),D(O.views.view),m.queue.writeBuffer(j,0,O.arrayBuffer),A.functions.forEach((ne,N)=>{const[Ot,mn]=Ne(ne),xe=r.options.functions[N];if(!xe.visible)return;const{vertices:se}=d.state[Ot],{pipeline:ct,bindGroup:ut,uniforms:ft}=Q.state[N];f[N].set({model:Et(xe.extent),color:Lt(xe.color).gl()}),m.queue.writeBuffer(ft,0,f[N].arrayBuffer),_.setPipeline(ct),_.setBindGroup(0,ut),_.setVertexBuffer(0,se.buffers[0]),_.setIndexBuffer(se.indexBuffer,se.indexFormat),_.drawIndexed(se.numElements)}),_.end();const U=R.finish();m.queue.submit([U])},onDelete(h){var m,P,v;console.log("ParametricSurfaceView::Delete"),(m=Q.onDelete)==null||m.call(Q,h),(P=d.onDelete)==null||P.call(d,h),(v=g.onDelete)==null||v.call(g,h)}},st=h=>({source:h.replaceAll("@plot","/*@plot*/"),info:Zr(h)}),at=h=>{const m=ve(h.domain);return[ge(-1,m),ge(1,m)]},ot=({info:h})=>({functions:h.functions.map(m=>({name:m.name,color:"#ffffff",extent:at(m),visible:!0}))}),it=(h,m)=>{var P;return{args:h.args??m.args,functions:((P=h.functions)==null?void 0:P.map((v,R)=>{const _=m.functions[R];return{color:(_==null?void 0:_.color)??v.color,extent:[v.extent[0].map((A,j)=>{var U,T;return((T=(U=_==null?void 0:_.extent)==null?void 0:U[0])==null?void 0:T[j])??A}),v.extent[1].map((A,j)=>{var U,T;return((T=(U=_==null?void 0:_.extent)==null?void 0:U[1])==null?void 0:T[j])??A})],visible:(_==null?void 0:_.visible)??v.visible}}))??m.functions}},ke=h=>{const m=st(h.source);o.value=m,h.options=it(ot(m),h.options),Q.valid=!1},lt=h=>{switch(h.key){case"Enter":return h.shiftKey;case"s":case"S":return h.ctrlKey||h.metaKey;default:return!1}};mt(document,"keydown",h=>{lt(h)&&(h.stopPropagation(),h.preventDefault(),ke(r))}),xt(t,ke,{immediate:!0});const me=h=>{var m,P,v;return(v=(P=(m=o.value)==null?void 0:m.info)==null?void 0:P.functions)==null?void 0:v[h]};return(h,m)=>(W(),Y(K,null,[k("header",Jr,[en,tn,X(Mt,{modelValue:t.value,"onUpdate:modelValue":m[0]||(m[0]=P=>t.value=P)},null,8,["modelValue"]),X(Vt)]),X($(Bt),{as:"main",class:"flex-grow flex flex-col overflow-hidden","default-index":2},{default:z(()=>[X($(Dt),{class:"flex flex-row md:hidden"},{default:z(()=>[X($(Re),{class:"tab"},{default:z(()=>[L("Input")]),_:1}),X($(Re),{class:"tab"},{default:z(()=>[L("Output")]),_:1})]),_:1}),X($(Nt),{class:"h-full md:grid md:grid-cols-2 border-y-2 border-border"},{default:z(()=>[X($(Ae),{class:"h-full ui-not-selected:hidden md:ui-not-selected:grid grid grid-rows-1 overflow-hidden",static:!0},{default:z(()=>[X(At,{modelValue:$(r).source,"onUpdate:modelValue":m[1]||(m[1]=P=>$(r).source=P),options:e},null,8,["modelValue"])]),_:1}),X($(Ae),{class:"h-full ui-not-selected:hidden md:ui-not-selected:grid grid grid-rows-2 overflow-hidden",static:!0},{default:z(()=>[(W(),Pt(gt,null,{default:z(()=>[k("div",rn,[X(Ht,{renderer:pe,listeners:$(y),options:c},null,8,["listeners"])])]),_:1})),k("div",nn,[k("details",null,[sn,(W(!0),Y(K,null,le(S(0,4),P=>(W(),Y("div",{class:"flex flex-row items-center gap-2",key:P},[k("label",an,"args["+B(P)+"]:",1),J(k("input",{class:"w-16",type:"number",step:"0.1","onUpdate:modelValue":v=>$(r).options.args[P]=v},null,8,on),[[ee,$(r).options.args[P]]]),J(k("input",{class:"flex-grow",type:"range",min:"-1",max:"1",step:"0.01","onUpdate:modelValue":v=>$(r).options.args[P]=v},null,8,ln),[[ee,$(r).options.args[P]]])]))),128))]),(W(!0),Y(K,null,le($(r).options.functions,(P,v)=>{var R,_,A,j,U;return W(),Y("details",{key:v},[k("summary",On,[J(k("input",{class:"w-8 h-8",name:"fill",type:"color","onUpdate:modelValue":T=>P.color=T},null,8,cn),[[ee,P.color]]),k("h2",un,[L(B((R=me(v))==null?void 0:R.name)+": ",1),k("span",fn,B((A=(_=me(v))==null?void 0:_.domain)==null?void 0:A.name)+" → "+B((U=(j=me(v))==null?void 0:j.codomain)==null?void 0:U.name),1)]),X(Qr,{modelValue:P.visible,"onUpdate:modelValue":T=>P.visible=T},null,8,["modelValue","onUpdate:modelValue"])]),X(yr,{modelValue:P.extent,"onUpdate:modelValue":T=>P.extent=T},null,8,["modelValue","onUpdate:modelValue"])])}),128))])]),_:1})]),_:1})]),_:1})],64))}}),$n=Je(pn,[["__scopeId","data-v-2676965b"]]);export{$n as default};
