import{d as _,r as c,s as x,x as S,y as V,e as g,g as r,l as n,F as h,b as w,j as i,f as y,t as v}from"./index-CgPJedCE.js";import{s as E,_ as $,a as k,p as B,i as C}from"./utilities-D609ABx5.js";import{f as U,S as b,_ as D}from"./index-_kIe-FH2.js";import"./ToggleDarkButton.vue_vue_type_script_setup_true_lang-BgZrDap7.js";const F={class:"h-full text-xs overflow-scroll p-2"},K=`@plot_implicit
d2e2 f(d2e2vec2 x) {
  return x[0]*x[0] + x[1]*x[1] + x[2]*x[2] - 1.;
}
`,j=_({__name:"WebGlPlotView",setup(L){const p={extensions:[U,b.define(E)]},o=c({source:K}),a=x(o),m=e=>`${C()}

${e}
`,l=c(null),d=e=>({source:e.replaceAll("@plot_implicit","/*@plot_implicit*/")}),u=e=>{const s=d(e.source);s.source=B(s.source,{quiet:!0}),s.source=m(s.source),l.value=s},f=e=>{switch(e.key){case"Enter":return e.shiftKey;case"s":case"S":return e.ctrlKey||e.metaKey;default:return!1}};return S(document,"keydown",e=>{f(e)&&(e.stopPropagation(),e.preventDefault(),u(a))}),V(o,u,{immediate:!0}),(e,s)=>(w(),g(h,null,[r($,{title:"Plot View",modelValue:o.value,"onUpdate:modelValue":s[0]||(s[0]=t=>o.value=t)},null,8,["modelValue"]),r(k,null,{input:n(()=>[r(D,{class:"h-full",modelValue:i(a).source,"onUpdate:modelValue":s[1]||(s[1]=t=>i(a).source=t),options:p},null,8,["modelValue"])]),output:n(()=>{var t;return[y("pre",F,v((t=l.value)==null?void 0:t.source),1)]}),_:1})],64))}});export{j as default};
