import{t as _,n as x}from"./ToggleDarkButton.vue_vue_type_script_setup_true_lang-C0swAkkG.js";import{s as S,_ as V,a as g,p as h,i as w}from"./utilities-CRrxKng2.js";import{f as v,S as y,_ as k}from"./index-C4bhh_pM.js";import{d as E,r as n,q as $,e as B,g as r,k as c,F as C,b as U,u as i,f as b,t as D}from"./index-DPoGpCrM.js";const F={class:"h-full text-xs overflow-scroll p-2"},K=`@plot_implicit
d2e2 f(d2e2vec2 x) {
  return x[0]*x[0] + x[1]*x[1] + x[2]*x[2] - 1.;
}
`,N=E({__name:"WebGlPlotView",setup(L){const p={extensions:[v,y.define(S)]},o=n({source:K}),a=_(o),m=e=>`${w()}

${e}
`,l=n(null),f=e=>({source:e.replaceAll("@plot_implicit","/*@plot_implicit*/")}),u=e=>{const s=f(e.source);s.source=h(s.source,{quiet:!0}),s.source=m(s.source),l.value=s},d=e=>{switch(e.key){case"Enter":return e.shiftKey;case"s":case"S":return e.ctrlKey||e.metaKey;default:return!1}};return x(document,"keydown",e=>{d(e)&&(e.stopPropagation(),e.preventDefault(),u(a))}),$(o,u,{immediate:!0}),(e,s)=>(U(),B(C,null,[r(V,{title:"Plot View",modelValue:o.value,"onUpdate:modelValue":s[0]||(s[0]=t=>o.value=t)},null,8,["modelValue"]),r(g,null,{input:c(()=>[r(k,{class:"h-full",modelValue:i(a).source,"onUpdate:modelValue":s[1]||(s[1]=t=>i(a).source=t),options:p},null,8,["modelValue"])]),output:c(()=>{var t;return[b("pre",F,D((t=l.value)==null?void 0:t.source),1)]}),_:1})],64))}});export{N as default};
