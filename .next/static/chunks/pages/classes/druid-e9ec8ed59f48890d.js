(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2792],{4784:function(c,e,s){"use strict";s.d(e,{Z:function(){return t}});var a=s(6175),n=s(5893);function t(c){let e=(0,a.qM)(c.className);return(0,n.jsxs)("p",{className:"pClassDesc",id:"pClassDesc".concat(e),children:[(0,n.jsx)("strong",{className:"classDescName",id:"classDescName".concat(e),children:"".concat(e,"s")}),(0,n.jsxs)("span",{className:"classDescIs",id:"classDescIs".concat(e),children:["\xa0","".concat(c.is),"\xa0"]}),(0,n.jsx)("b",{className:"classDescFocus",id:"classDescFocus".concat(e),children:"".concat(c.focus)}),c.have&&(0,n.jsx)("span",{className:"classDescHave",id:"classDescHave".concat(e),children:c.have}),c.ability&&(0,n.jsx)("em",{children:(0,n.jsxs)("b",{className:"classDescAbility",id:"classDescAbility".concat(e),style:{fontWeight:"600"},children:["\xa0","".concat(c.ability),"\xa0"]})}),c.complement&&(0,n.jsxs)("span",{className:"classDescComplement",id:"classDescComplement".concat(e),children:["\xa0","".concat(c.complement)]})]})}},8894:function(c,e,s){"use strict";s.d(e,{Z:function(){return r}});var a=s(6175),n=s(8065),t=s.n(n),i=s(5893);function r(c){let e=(0,a.qM)(c.mainclass);return(0,i.jsxs)("p",{children:[(0,i.jsxs)("span",{className:"titleSubClassList titleSubClassList".concat(e),children:["They can choose between ","".concat(c.num)," main subclasses:"]}),(0,i.jsx)("ol",{className:"subClassList subClassList".concat(e),children:c.subclasses.map((s,n)=>{try{let r=(0,a.qM)(s);return(0,i.jsx)("li",{className:"subClassItem subClassItem".concat(e),id:"subclassItem".concat(e,"-").concat(r),children:(0,i.jsx)("strong",{children:(0,i.jsx)(t(),{href:"/classes/".concat(c.mainclass.replaceAll("__","/").toLowerCase(),"/").concat(s.toLowerCase().replaceAll(" ","_")),id:"anchor".concat(e,"-").concat(r),children:"".concat(r)})})},"subclass_".concat(e,"_").concat(n))}catch(c){return console.error("Error executing iteration ".concat(n," for subclasses filling:").concat(c.message)),(0,i.jsx)(i.Fragment,{})}})})]})}},5949:function(c,e,s){"use strict";s.d(e,{Z:function(){return m}});var a=s(7294),n=s(4511),t=s(6175),i=s(7138),r=s(1163),o=s(5574),l=s(2520),u=s(5893);function d(c){let e=(0,a.useRef)(null);return(0,a.useEffect)(()=>{},[]),(0,u.jsxs)("figure",{className:"classPanelFigure classPanelFigure".concat(c.idf),id:"fig-".concat(c.idf,"-count"),ref:e,children:[(0,u.jsx)("img",{src:"".concat(c.imgSrc),alt:"".concat(c.idf),loading:"lazy",id:"img".concat(c.idf,"-count"),className:"classPanelImg classPanelImg".concat(c.idf)}),(0,u.jsx)("figcaption",{className:"classPanelCapt classPanelCapt".concat(c.idf),children:c.caption?c.caption:(0,u.jsx)("span",{children:"TEXTO"})})]})}function m(c){let e=(0,r.useRouter)(),s=(0,a.useRef)(null),{0:m,1:f}=(0,a.useState)(!1),g=(0,t.fm)(c.className);return(0,a.useEffect)(()=>{f(!0)},[]),(0,a.useEffect)(()=>{try{if(!(s.current instanceof HTMLElement))throw(0,l.oQ)(s.current,"validation of ClassPanel Main Reference");(0,i.Ej)(s.current),(0,i.gI)(g,s.current),document.querySelectorAll("figure").forEach((c,e)=>{try{c.id=c.id.replaceAll("-counter","-".concat(e+1))}catch(c){console.error("Error executing cicle ".concat(e," for filling figure counts:\n").concat(c.message))}}),document.querySelectorAll("figcaption").forEach((c,e)=>{try{c.id=c.id.replaceAll("-counter","-".concat(e+1))}catch(c){console.error("Error executing cicle ".concat(e," for filling caption counts:\n").concat(c.message))}}),document.querySelectorAll("img").forEach((c,e)=>{try{if(!(c instanceof HTMLImageElement))throw(0,l.oQ)(c,"validation of Img Element",["HTMLImageElement"]);c.id=c.id.replaceAll("-count","-".concat(e+1))}catch(c){console.error("Error executing iteration ".concat(e," of img counting filling:\n").concat(c.message))}})}catch(e){console.error("Error executing useEffect for panel of ".concat(c.className,":").concat(e.message))}},[m]),m?(0,u.jsx)(n.SV,{FallbackComponent:()=>(0,u.jsx)(o.Z,{message:"Error loading page for ".concat(c.className)}),children:(0,u.jsx)("div",{className:"classPanelMainDiv",id:"classPanelMainDiv".concat(g),ref:s,children:(0,u.jsxs)("article",{className:"classArtc",id:"artc".concat(g),children:[(0,u.jsxs)("header",{className:"classHdr",id:"header".concat(g),children:[(0,u.jsx)("h1",{className:"classHdn",id:"heading".concat(g),children:"".concat(g)}),(0,u.jsx)("button",{className:"classReturn btn-secondary",onClick:()=>e.push("/"),children:"Return to Main Page"})]}),(0,u.jsx)("main",{className:"classBody",id:"body".concat(g),children:c.imgDir.map((e,s)=>{try{if("string"!=typeof e)throw(0,l.Ao)(e,"validation of argument img ".concat(s," type"),["string"]);return(0,u.jsx)(d,{imgSrc:e,idf:g,caption:c.captions?c.captions[s]:"TEXTO"},"".concat(e,"_").concat(s))}catch(c){return console.error("Error executing iteration ".concat(s," for rendering Class Figures:\n").concat(c.message)),(0,u.jsx)(u.Fragment,{})}})})]})})}):(0,u.jsx)(u.Fragment,{})}},3798:function(c,e,s){"use strict";s.r(e),s.d(e,{default:function(){return u}});var a=s(7294),n=s(4511),t=s(4784),i=s(8894),r=s(5574),o=s(5949),l=s(5893);function u(){return(0,a.useEffect)(()=>{},[]),(0,l.jsxs)(n.SV,{FallbackComponent:()=>(0,l.jsx)(r.Z,{message:"Error loading page"}),children:[" ",(0,l.jsx)(o.Z,{className:"Druid",imgDir:["/img/classes/druids/dall-e-druid-hawk-3.jpeg","/img/classes/druids/dall-e-mannedwolf-1.jpeg"],captions:[(0,l.jsx)(t.Z,{className:"Druid",is:"are beings devoted to the primal forces of the",focus:"living nature",have:", having a deep, spiritual connection to the beings they bond with. Their connections can grow so strong they can",ability:"shapeshift",complement:"into hybrids or completely mutate into the beings they form their connections."}),(0,l.jsx)(i.Z,{num:"three",subclasses:["Aerial","Aquatic","Terrestrial"],mainclass:"Druid"})]})," "]})}},7291:function(c,e,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/classes/druid",function(){return s(3798)}])}},function(c){c.O(0,[2888,9774,179],function(){return c(c.s=7291)}),_N_E=c.O()}]);