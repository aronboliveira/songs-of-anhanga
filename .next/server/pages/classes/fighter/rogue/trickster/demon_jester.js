"use strict";(()=>{var e={};e.id=2907,e.ids=[2907,2888,660],e.modules={4784:(e,t,r)=>{r.a(e,async(e,s)=>{try{r.d(t,{Z:()=>i});var a=r(1849),n=r(997),c=e([a]);function i(e){let t=(0,a.qM)(e.className);return(0,n.jsxs)("p",{className:"pClassDesc",id:`pClassDesc${t}`,children:[n.jsx("strong",{className:"classDescName",id:`classDescName${t}`,children:`${t}s`}),(0,n.jsxs)("span",{className:"classDescIs",id:`classDescIs${t}`,children:["\xa0",`${e.is}`,"\xa0"]}),n.jsx("b",{className:"classDescFocus",id:`classDescFocus${t}`,children:`${e.focus}`}),e.have&&n.jsx("span",{className:"classDescHave",id:`classDescHave${t}`,children:e.have}),e.ability&&n.jsx("em",{children:(0,n.jsxs)("b",{className:"classDescAbility",id:`classDescAbility${t}`,style:{fontWeight:"600"},children:["\xa0",`${e.ability}`,"\xa0"]})}),e.complement&&(0,n.jsxs)("span",{className:"classDescComplement",id:`classDescComplement${t}`,children:["\xa0",`${e.complement}`]})]})}a=(c.then?(await c)():c)[0],s()}catch(e){s(e)}})},4155:(e,t,r)=>{r.d(t,{Z:()=>n});var s=r(6689),a=r(997);function n(e){let t=(0,s.useRef)(null);return(0,s.useEffect)(()=>{},[]),(0,a.jsxs)("figure",{className:`classPanelFigure classPanelFigure${e.idf}`,id:`fig-${e.idf}-count`,ref:t,children:[a.jsx("img",{src:`${e.imgSrc}`,alt:`${e.idf}`,loading:"lazy",id:`img${e.idf}-count`,className:`classPanelImg classPanelImg${e.idf}`}),a.jsx("figcaption",{className:`classPanelCapt classPanelCapt${e.idf}`,children:e.caption?e.caption:a.jsx("span",{children:"TEXTO"})})]})}},160:(e,t,r)=>{r.a(e,async(e,s)=>{try{r.d(t,{Z:()=>g});var a=r(6689),n=r(6812),c=r(1849),i=r(7138),o=r(1163),l=r(5574),u=r(2520),d=r(4155),m=r(997),p=e([n,c,i,l]);function g(e){let t=(0,o.useRouter)(),r=(0,a.useRef)(null),{0:s,1:p}=(0,a.useState)(!1),g=(0,c.fm)(e.className);return(0,a.useEffect)(()=>{p(!0)},[]),(0,a.useEffect)(()=>{try{if(!(r.current instanceof HTMLElement))throw(0,u.oQ)(r.current,"validation of ClassPanel Main Reference");(0,i.Ej)(r.current),(0,i.gI)(g,r.current),document.querySelectorAll("figure").forEach((e,t)=>{try{e.id=e.id.replaceAll("-counter",`-${t+1}`)}catch(e){console.error(`Error executing cicle ${t} for filling figure counts:
${e.message}`)}}),document.querySelectorAll("figcaption").forEach((e,t)=>{try{e.id=e.id.replaceAll("-counter",`-${t+1}`)}catch(e){console.error(`Error executing cicle ${t} for filling caption counts:
${e.message}`)}}),document.querySelectorAll("img").forEach((e,t)=>{try{if(!(e instanceof HTMLImageElement))throw(0,u.oQ)(e,"validation of Img Element",["HTMLImageElement"]);e.id=e.id.replaceAll("-count",`-${t+1}`)}catch(e){console.error(`Error executing iteration ${t} of img counting filling:
${e.message}`)}})}catch(t){console.error(`Error executing useEffect for panel of ${e.className}:${t.message}`)}},[s]),s?m.jsx(n.ErrorBoundary,{FallbackComponent:()=>m.jsx(l.Z,{message:`Error loading page for ${e.className}`}),children:m.jsx("div",{className:"classPanelMainDiv",id:`classPanelMainDiv${g}`,ref:r,children:(0,m.jsxs)("article",{className:"classArtc",id:`artc${g}`,children:[(0,m.jsxs)("header",{className:"classHdr",id:`header${g}`,children:[m.jsx("h1",{className:"classHdn",id:`heading${g}`,children:`${g}`}),m.jsx("button",{className:"classReturn btn-secondary",onClick:()=>t.push("/"),children:"Return to Main Page"})]}),m.jsx("main",{className:"classBody",id:`body${g}`,children:e.imgDir.map((t,r)=>{try{if("string"!=typeof t)throw(0,u.Ao)(t,`validation of argument img ${r} type`,["string"]);return m.jsx(d.Z,{imgSrc:t,idf:g,caption:e.captions?e.captions[r]:"TEXTO"},`${t}_${r}`)}catch(e){return console.error(`Error executing iteration ${r} for rendering Class Figures:
${e.message}`),m.jsx(m.Fragment,{})}})})]})})}):m.jsx(m.Fragment,{})}[n,c,i,l]=p.then?(await p)():p,s()}catch(e){s(e)}})},8904:(e,t,r)=>{r.r(t),r.d(t,{default:()=>u,gameName:()=>l});var s=r(8416),a=r.n(s),n=r(6859),c=r.n(n),i=r(997);function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,s)}return r}let l=void 0;function u(){return(0,i.jsxs)(n.Html,{lang:"en-US",children:[(0,i.jsxs)(n.Head,{children:[i.jsx("meta",{charSet:"utf-8"}),i.jsx("meta",{name:"keywords",content:"RPG, Gaming, Folklore, Brazil, Next.js"}),i.jsx("meta",{name:"description",content:`Landing page for login ${l||"undefined"}`}),i.jsx("meta",{name:"theme-color",content:"#000000"}),i.jsx("meta",{name:"x-ua-compatible",content:"IE=edge"}),i.jsx("meta",{httpEquiv:"content-type",content:"text/html; charset=UTF-8"}),i.jsx("link",{rel:"icon",href:"/img/icons/favicon/SVG/dall-e-tree-export.svg"}),i.jsx("link",{href:"https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",rel:"stylesheet",integrity:"sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH",crossOrigin:"anonymous"})]}),i.jsx("body",{children:i.jsx(n.Main,{})}),i.jsx(n.NextScript,{})]})}u.getInitialProps=async e=>(function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach(function(t){a()(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e})({},await c().getInitialProps(e))},7637:(e,t,r)=>{r.a(e,async(e,s)=>{try{r.r(t),r.d(t,{default:()=>d});var a=r(6689),n=r(6812),c=r(5574),i=r(160),o=r(4784),l=r(997),u=e([n,c,i,o]);function d(){return(0,a.useEffect)(()=>{},[]),(0,l.jsxs)(n.ErrorBoundary,{FallbackComponent:()=>l.jsx(c.Z,{message:"Error loading page"}),children:[" ",l.jsx(i.Z,{className:"Demon Jester",imgDir:["/img/classes/rogue/trickster/jester/dall-e-jester-2.jpeg","/img/classes/rogue/trickster/jester/dall-e-jester-17.jpeg"],captions:[l.jsx(o.Z,{className:"Demon Jester",is:"are sadistic beings who dedicate their skills to",focus:"play with the mind, torture and make fun",complement:"of enemies using obscure and elusive magic and tactics."})]})]})}[n,c,i,o]=u.then?(await u)():u,s()}catch(e){s(e)}})},1323:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},7176:(e,t,r)=>{r.a(e,async(e,s)=>{try{r.r(t),r.d(t,{config:()=>f,default:()=>d,getServerSideProps:()=>g,getStaticPaths:()=>p,getStaticProps:()=>m,reportWebVitals:()=>x,routeModule:()=>$,unstable_getServerProps:()=>y,unstable_getServerSideProps:()=>b,unstable_getStaticParams:()=>P,unstable_getStaticPaths:()=>j,unstable_getStaticProps:()=>h});var a=r(7093),n=r(5244),c=r(1323),i=r(8904),o=r(979),l=r(7637),u=e([o,l]);[o,l]=u.then?(await u)():u;let d=(0,c.l)(l,"default"),m=(0,c.l)(l,"getStaticProps"),p=(0,c.l)(l,"getStaticPaths"),g=(0,c.l)(l,"getServerSideProps"),f=(0,c.l)(l,"config"),x=(0,c.l)(l,"reportWebVitals"),h=(0,c.l)(l,"unstable_getStaticProps"),j=(0,c.l)(l,"unstable_getStaticPaths"),P=(0,c.l)(l,"unstable_getStaticParams"),y=(0,c.l)(l,"unstable_getServerProps"),b=(0,c.l)(l,"unstable_getServerSideProps"),$=new a.PagesRouteModule({definition:{kind:n.x.PAGES,page:"/classes/fighter/rogue/trickster/demon_jester",pathname:"/classes/fighter/rogue/trickster/demon_jester",bundlePath:"",filename:""},components:{App:o.default,Document:i.default},userland:l});s()}catch(e){s(e)}})},5244:(e,t)=>{var r;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return r}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(r||(r={}))},2929:e=>{e.exports=require("bootstrap")},3903:e=>{e.exports=require("core-js/modules/es.regexp.flags.js")},2934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},2785:e=>{e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},968:e=>{e.exports=require("next/head")},1423:e=>{e.exports=require("path")},6689:e=>{e.exports=require("react")},6405:e=>{e.exports=require("react-dom")},7849:e=>{e.exports=require("react-dom/client")},997:e=>{e.exports=require("react/jsx-runtime")},3258:e=>{e.exports=import("@reduxjs/toolkit")},6812:e=>{e.exports=import("react-error-boundary")},3291:e=>{e.exports=import("react-redux")},7147:e=>{e.exports=require("fs")},2781:e=>{e.exports=require("stream")},9796:e=>{e.exports=require("zlib")}};var t=require("../../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[2005,7970,6859,979],()=>r(7176));module.exports=s})();