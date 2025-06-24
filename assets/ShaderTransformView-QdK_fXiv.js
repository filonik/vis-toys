import{d as _,r as n,s as x,x as S,y as V,e as h,g as r,l as c,F as g,b as w,j as i,f as y,t as v}from"./index-BkrPRDKK.js";import{s as $,_ as C,a as E,p as k,i as B,b as U}from"./utilities-CAMlGSVa.js";import{f as b,S as D,_ as F}from"./index-DQ3ju-P6.js";import"./ToggleDarkButton.vue_vue_type_script_setup_true_lang-C4A39BZ3.js";const K={class:"h-full text-xs overflow-scroll p-2"},L=`@plot_implicit
d2e2 f(d2e2vec2 x) {
  return x[0]*x[0] + x[1]*x[1] + x[2]*x[2] - 1.;
}
`,j=_({__name:"ShaderTransformView",setup(R){const p={extensions:[b,D.define($)]},o=n({source:L}),a=x(o),m=e=>`${B()}

${U()}

${e}
`,l=n(null),d=e=>({source:e.replaceAll("@plot_implicit","/*@plot_implicit*/")}),u=e=>{const s=d(e.source);s.source=k(s.source,{quiet:!0}),s.source=m(s.source),l.value=s},f=e=>{switch(e.key){case"Enter":return e.shiftKey;case"s":case"S":return e.ctrlKey||e.metaKey;default:return!1}};return S(document,"keydown",e=>{f(e)&&(e.stopPropagation(),e.preventDefault(),u(a))}),V(o,u,{immediate:!0}),(e,s)=>(w(),h(g,null,[r(C,{title:"Plot View",modelValue:o.value,"onUpdate:modelValue":s[0]||(s[0]=t=>o.value=t)},null,8,["modelValue"]),r(E,null,{input:c(()=>[r(F,{class:"h-full",modelValue:i(a).source,"onUpdate:modelValue":s[1]||(s[1]=t=>i(a).source=t),options:p},null,8,["modelValue"])]),output:c(()=>{var t;return[y("pre",K,v((t=l.value)==null?void 0:t.source),1)]}),_:1})],64))}});export{j as default};
