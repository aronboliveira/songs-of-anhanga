"use strict";(()=>{var e={};e.id=3823,e.ids=[3823,2888,660],e.modules={4784:(e,s,t)=>{t.a(e,async(e,r)=>{try{t.d(s,{Z:()=>i});var a=t(1849),n=t(997),c=e([a]);function i(e){let s=(0,a.qM)(e.className);return(0,n.jsxs)("p",{className:"pClassDesc",id:`pClassDesc${s}`,children:[n.jsx("strong",{className:"classDescName",id:`classDescName${s}`,children:`${s}s`}),(0,n.jsxs)("span",{className:"classDescIs",id:`classDescIs${s}`,children:["\xa0",`${e.is}`,"\xa0"]}),n.jsx("b",{className:"classDescFocus",id:`classDescFocus${s}`,children:`${e.focus}`}),e.have&&n.jsx("span",{className:"classDescHave",id:`classDescHave${s}`,children:e.have}),e.ability&&n.jsx("em",{children:(0,n.jsxs)("b",{className:"classDescAbility",id:`classDescAbility${s}`,style:{fontWeight:"600"},children:["\xa0",`${e.ability}`,"\xa0"]})}),e.complement&&(0,n.jsxs)("span",{className:"classDescComplement",id:`classDescComplement${s}`,children:["\xa0",`${e.complement}`]})]})}a=(c.then?(await c)():c)[0],r()}catch(e){r(e)}})},4155:(e,s,t)=>{t.d(s,{Z:()=>n});var r=t(6689),a=t(997);function n(e){let s=(0,r.useRef)(null);return(0,r.useEffect)(()=>{},[]),(0,a.jsxs)("figure",{className:`classPanelFigure classPanelFigure${e.idf}`,id:`fig-${e.idf}-count`,ref:s,children:[a.jsx("img",{src:`${e.imgSrc}`,alt:`${e.idf}`,loading:"lazy",id:`img${e.idf}-count`,className:`classPanelImg classPanelImg${e.idf}`}),a.jsx("figcaption",{className:`classPanelCapt classPanelCapt${e.idf}`,children:e.caption?e.caption:a.jsx("span",{children:"TEXTO"})})]})}},8894:(e,s,t)=>{t.a(e,async(e,r)=>{try{t.d(s,{Z:()=>o});var a=t(1849),n=t(8065),c=t.n(n),i=t(997),l=e([a]);function o(e){let s=(0,a.qM)(e.mainclass);return(0,i.jsxs)("p",{children:[(0,i.jsxs)("span",{className:`titleSubClassList titleSubClassList${s}`,children:["They can choose between ",`${e.num}`," main subclasses:"]}),i.jsx("ol",{className:`subClassList subClassList${s}`,children:e.subclasses.map((t,r)=>{try{let n=(0,a.qM)(t);return i.jsx("li",{className:`subClassItem subClassItem${s}`,id:`subclassItem${s}-${n}`,children:i.jsx("strong",{children:i.jsx(c(),{href:`/classes/${e.mainclass.replaceAll("__","/").toLowerCase()}/${t.toLowerCase().replaceAll(" ","_")}`,id:`anchor${s}-${n}`,children:`${n}`})})},`subclass_${s}_${r}`)}catch(e){return console.error(`Error executing iteration ${r} for subclasses filling:${e.message}`),i.jsx(i.Fragment,{})}})})]})}a=(l.then?(await l)():l)[0],r()}catch(e){r(e)}})},160:(e,s,t)=>{t.a(e,async(e,r)=>{try{t.d(s,{Z:()=>g});var a=t(6689),n=t(6812),c=t(1849),i=t(7138),l=t(1163),o=t(5574),u=t(2520),d=t(4155),m=t(997),p=e([n,c,i,o]);function g(e){let s=(0,l.useRouter)(),t=(0,a.useRef)(null),{0:r,1:p}=(0,a.useState)(!1),g=(0,c.fm)(e.className);return(0,a.useEffect)(()=>{p(!0)},[]),(0,a.useEffect)(()=>{try{if(!(t.current instanceof HTMLElement))throw(0,u.oQ)(t.current,"validation of ClassPanel Main Reference");(0,i.Ej)(t.current),(0,i.gI)(g,t.current),document.querySelectorAll("figure").forEach((e,s)=>{try{e.id=e.id.replaceAll("-counter",`-${s+1}`)}catch(e){console.error(`Error executing cicle ${s} for filling figure counts:
${e.message}`)}}),document.querySelectorAll("figcaption").forEach((e,s)=>{try{e.id=e.id.replaceAll("-counter",`-${s+1}`)}catch(e){console.error(`Error executing cicle ${s} for filling caption counts:
${e.message}`)}}),document.querySelectorAll("img").forEach((e,s)=>{try{if(!(e instanceof HTMLImageElement))throw(0,u.oQ)(e,"validation of Img Element",["HTMLImageElement"]);e.id=e.id.replaceAll("-count",`-${s+1}`)}catch(e){console.error(`Error executing iteration ${s} of img counting filling:
${e.message}`)}})}catch(s){console.error(`Error executing useEffect for panel of ${e.className}:${s.message}`)}},[r]),r?m.jsx(n.ErrorBoundary,{FallbackComponent:()=>m.jsx(o.Z,{message:`Error loading page for ${e.className}`}),children:m.jsx("div",{className:"classPanelMainDiv",id:`classPanelMainDiv${g}`,ref:t,children:(0,m.jsxs)("article",{className:"classArtc",id:`artc${g}`,children:[(0,m.jsxs)("header",{className:"classHdr",id:`header${g}`,children:[m.jsx("h1",{className:"classHdn",id:`heading${g}`,children:`${g}`}),m.jsx("button",{className:"classReturn btn-secondary",onClick:()=>s.push("/"),children:"Return to Main Page"})]}),m.jsx("main",{className:"classBody",id:`body${g}`,children:e.imgDir.map((s,t)=>{try{if("string"!=typeof s)throw(0,u.Ao)(s,`validation of argument img ${t} type`,["string"]);return m.jsx(d.Z,{imgSrc:s,idf:g,caption:e.captions?e.captions[t]:"TEXTO"},`${s}_${t}`)}catch(e){return console.error(`Error executing iteration ${t} for rendering Class Figures:
${e.message}`),m.jsx(m.Fragment,{})}})})]})})}):m.jsx(m.Fragment,{})}[n,c,i,o]=p.then?(await p)():p,r()}catch(e){r(e)}})},8904:(e,s,t)=>{t.r(s),t.d(s,{default:()=>u,gameName:()=>o});var r=t(8416),a=t.n(r),n=t(6859),c=t.n(n),i=t(997);function l(e,s){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);s&&(r=r.filter(function(s){return Object.getOwnPropertyDescriptor(e,s).enumerable})),t.push.apply(t,r)}return t}let o=void 0;function u(){return(0,i.jsxs)(n.Html,{lang:"en-US",children:[(0,i.jsxs)(n.Head,{children:[i.jsx("meta",{charSet:"utf-8"}),i.jsx("meta",{name:"keywords",content:"RPG, Gaming, Folklore, Brazil, Next.js"}),i.jsx("meta",{name:"description",content:`Landing page for login ${o||"undefined"}`}),i.jsx("meta",{name:"theme-color",content:"#000000"}),i.jsx("meta",{name:"x-ua-compatible",content:"IE=edge"}),i.jsx("meta",{httpEquiv:"content-type",content:"text/html; charset=UTF-8"}),i.jsx("link",{rel:"icon",href:"/img/icons/favicon/SVG/dall-e-tree-export.svg"}),i.jsx("link",{href:"https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",rel:"stylesheet",integrity:"sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH",crossOrigin:"anonymous"})]}),i.jsx("body",{children:i.jsx(n.Main,{})}),i.jsx(n.NextScript,{})]})}u.getInitialProps=async e=>(function(e){for(var s=1;s<arguments.length;s++){var t=null!=arguments[s]?arguments[s]:{};s%2?l(Object(t),!0).forEach(function(s){a()(e,s,t[s])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach(function(s){Object.defineProperty(e,s,Object.getOwnPropertyDescriptor(t,s))})}return e})({},await c().getInitialProps(e))},1129:(e,s,t)=>{t.a(e,async(e,r)=>{try{t.r(s),t.d(s,{default:()=>m});var a=t(6689),n=t(6812),c=t(4784),i=t(8894),l=t(5574),o=t(160),u=t(997),d=e([n,c,i,l,o]);function m(){return(0,a.useEffect)(()=>{},[]),(0,u.jsxs)(n.ErrorBoundary,{FallbackComponent:()=>u.jsx(l.Z,{message:"Error loading page"}),children:[" ",u.jsx(o.Z,{className:"Priest",imgDir:["/img/classes/sorcerer/Priest/dall-e-priest-38.jpeg","/img/classes/sorcerer/Priest/dall-e-priest-9.jpeg"],captions:[u.jsx(c.Z,{className:"Priest",is:"are sorcerers heavily connected to",focus:"spiritual, sacred and supportive magic,",complement:"frequently represented by religious leaders and political representants."}),u.jsx(i.Z,{num:"two",subclasses:["Cleric","Shaman"],mainclass:"Sorcerer__Priest"})]})," "]})}[n,c,i,l,o]=d.then?(await d)():d,r()}catch(e){r(e)}})},1323:(e,s)=>{Object.defineProperty(s,"l",{enumerable:!0,get:function(){return function e(s,t){return t in s?s[t]:"then"in s&&"function"==typeof s.then?s.then(s=>e(s,t)):"function"==typeof s&&"default"===t?s:void 0}}})},7024:(e,s,t)=>{t.a(e,async(e,r)=>{try{t.r(s),t.d(s,{config:()=>f,default:()=>d,getServerSideProps:()=>g,getStaticPaths:()=>p,getStaticProps:()=>m,reportWebVitals:()=>x,routeModule:()=>$,unstable_getServerProps:()=>y,unstable_getServerSideProps:()=>P,unstable_getStaticParams:()=>b,unstable_getStaticPaths:()=>j,unstable_getStaticProps:()=>h});var a=t(7093),n=t(5244),c=t(1323),i=t(8904),l=t(979),o=t(1129),u=e([l,o]);[l,o]=u.then?(await u)():u;let d=(0,c.l)(o,"default"),m=(0,c.l)(o,"getStaticProps"),p=(0,c.l)(o,"getStaticPaths"),g=(0,c.l)(o,"getServerSideProps"),f=(0,c.l)(o,"config"),x=(0,c.l)(o,"reportWebVitals"),h=(0,c.l)(o,"unstable_getStaticProps"),j=(0,c.l)(o,"unstable_getStaticPaths"),b=(0,c.l)(o,"unstable_getStaticParams"),y=(0,c.l)(o,"unstable_getServerProps"),P=(0,c.l)(o,"unstable_getServerSideProps"),$=new a.PagesRouteModule({definition:{kind:n.x.PAGES,page:"/classes/sorcerer/priest",pathname:"/classes/sorcerer/priest",bundlePath:"",filename:""},components:{App:l.default,Document:i.default},userland:o});r()}catch(e){r(e)}})},5244:(e,s)=>{var t;Object.defineProperty(s,"x",{enumerable:!0,get:function(){return t}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(t||(t={}))},2929:e=>{e.exports=require("bootstrap")},3903:e=>{e.exports=require("core-js/modules/es.regexp.flags.js")},2934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},2785:e=>{e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},968:e=>{e.exports=require("next/head")},1423:e=>{e.exports=require("path")},6689:e=>{e.exports=require("react")},6405:e=>{e.exports=require("react-dom")},7849:e=>{e.exports=require("react-dom/client")},997:e=>{e.exports=require("react/jsx-runtime")},3258:e=>{e.exports=import("@reduxjs/toolkit")},6812:e=>{e.exports=import("react-error-boundary")},3291:e=>{e.exports=import("react-redux")},7147:e=>{e.exports=require("fs")},2781:e=>{e.exports=require("stream")},9796:e=>{e.exports=require("zlib")}};var s=require("../../../webpack-runtime.js");s.C(e);var t=e=>s(s.s=e),r=s.X(0,[2005,7970,6859,979],()=>t(7024));module.exports=r})();