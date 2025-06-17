import{d as _,U as x,r as c,G as V,H as S,J as g,e as h,g as r,l as n,F as w,b as v,_ as y,j as i,f as E,t as U}from"./index-8W2lkcdb.js";import{s as $,_ as b,a as k,p as B,i as C}from"./utilities-DgAJUZv9.js";import{b as D}from"./index-B9r0VejJ.js";import"./ToggleDarkButton.vue_vue_type_script_setup_true_lang-VTmywXXN.js";const F={class:"h-full text-xs overflow-scroll p-2"},K=`@plot_implicit
d2e2 f(d2e2vec2 x) {
  return x[0]*x[0] + x[1]*x[1] + x[2]*x[2] - 1.;
}
`,N=_({__name:"WebGlPlotView",setup(L){const p={extensions:[D,x.define($)]},o=c({source:K}),a=V(o),m=e=>`${C()}

${e}
`,l=c(null),d=e=>({source:e.replaceAll("@plot_implicit","/*@plot_implicit*/")}),u=e=>{const s=d(e.source);s.source=B(s.source,{quiet:!0}),s.source=m(s.source),l.value=s},f=e=>{switch(e.key){case"Enter":return e.shiftKey;case"s":case"S":return e.ctrlKey||e.metaKey;default:return!1}};return S(document,"keydown",e=>{f(e)&&(e.stopPropagation(),e.preventDefault(),u(a))}),g(o,u,{immediate:!0}),(e,s)=>(v(),h(w,null,[r(b,{title:"Plot View",modelValue:o.value,"onUpdate:modelValue":s[0]||(s[0]=t=>o.value=t)},null,8,["modelValue"]),r(k,null,{input:n(()=>[r(y,{class:"h-full",modelValue:i(a).source,"onUpdate:modelValue":s[1]||(s[1]=t=>i(a).source=t),options:p},null,8,["modelValue"])]),output:n(()=>{var t;return[E("pre",F,U((t=l.value)==null?void 0:t.source),1)]}),_:1})],64))}});export{N as default};
