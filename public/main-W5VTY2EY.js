import{b as R}from"./chunk-YRRMV7HI.js";import{a as I}from"./chunk-INTZAYHF.js";import{b as j,d as O}from"./chunk-JYAU4QYE.js";import{a as G}from"./chunk-PAPPUINV.js";import{D as S,E as A,H as M,J as k,O as w,T as _,U as F,e as b,f as d,g as C,h as x,i as l,k as y}from"./chunk-ORWQQMWF.js";import{$a as m,Ha as v,Za as p,_a as a,bb as u,ca as r,d as z,ga as n,jb as s,la as h,qb as c}from"./chunk-WIFXGSG2.js";var B=(()=>{let e=class e{constructor(o){this.firestoreS=o,this.router=r(l)}ngOnInit(){}irLogin(){this.router.navigate(["/login"])}irRegistro(){this.router.navigate(["/registro"])}};e.\u0275fac=function(i){return new(i||e)(v(F))},e.\u0275cmp=n({type:e,selectors:[["app-bienvenido"]],standalone:!0,features:[c],decls:12,vars:0,consts:[[1,"d-flex","justify-content-center","align-items-center","vh-100"],[1,"card","p-4","shadow-lg"],[1,"container"],[1,"row","justify-content-center"],[1,"col-md-8","text-center"],[1,"mb-4"],["src","/assets/logo.png","alt","Angular",1,"img-fluid","rounded-circle","mb-4"],["type","button",1,"btn","btn-success","ms-3",3,"click"]],template:function(i,f){i&1&&(p(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"h1",5),s(6,"Bienvenido a Clinica Online"),a(),m(7,"img",6),p(8,"button",7),u("click",function(){return f.irLogin()}),s(9," Ir a login "),a(),p(10,"button",7),u("click",function(){return f.irRegistro()}),s(11," Ir a Registro "),a()()()()()())},styles:["[_nghost-%COMP%]{display:block;height:100vh;background-image:url(/assets/pattern.jpg);color:#fff}.full-background[_ngcontent-%COMP%]{width:100vw;height:100vh}.vh-100[_ngcontent-%COMP%]{height:100vh}.card[_ngcontent-%COMP%]{max-width:600px;border-radius:15px;border:1px solid #000000;background-color:#fff;box-shadow:#00000040 0 54px 55px,#0000001f 0 -12px 30px,#0000001f 0 4px 6px,#0000002b 0 12px 13px,#00000017 0 -3px 5px}img[_ngcontent-%COMP%]{border:10px solid #000000}"]});let t=e;return t})();var P=z(G()),T=(t,e)=>{let g=r(I),o=r(l);return g.logueado(),g.logueado()?!0:(o.navigate(["/login"]),P.default.fire({title:"Error",text:"No estas logueado",icon:"error"}),!1)};var D=[{path:"",redirectTo:"bienvenida",pathMatch:"full"},{path:"bienvenida",component:B},{path:"login",loadComponent:()=>import("./chunk-23I6WUOU.js").then(t=>t.LoginComponent)},{path:"registro",loadComponent:()=>import("./chunk-JEEL56KI.js").then(t=>t.RegistroComponent)},{path:"home",loadComponent:()=>import("./chunk-NQQ6LNFS.js").then(t=>t.HomeComponent),canActivate:[T]},{path:"notfound",loadComponent:()=>import("./chunk-44KC2FFG.js").then(t=>t.NotfoundComponent)},{path:"administracion",loadComponent:()=>import("./chunk-7USQJ7OU.js").then(t=>t.AdministracionComponent)},{path:"**",redirectTo:"notfound"}];var E={providers:[b,d(),y(D)]};var H=(()=>{let e=class e{constructor(){this.title="clinica"}};e.\u0275fac=function(i){return new(i||e)},e.\u0275cmp=n({type:e,selectors:[["app-root"]],standalone:!0,features:[c],decls:1,vars:0,template:function(i,f){i&1&&m(0,"router-outlet")},dependencies:[x]});let t=e;return t})();var L={firebaseConfig:{apiKey:"AIzaSyCqTIgNsgygEPaiQ5B63l-AwJj9DdFdigE",authDomain:"clinica-b786b.firebaseapp.com",projectId:"clinica-b786b",storageBucket:"clinica-b786b.appspot.com",messagingSenderId:"487621160218",appId:"1:487621160218:web:1b7b77887c92b19046d0a3"}};C(H,{providers:[d(),E.providers,h(R.forRoot(),S(()=>A(L.firebaseConfig)),M(()=>k()),w(()=>_()),j(()=>O()))]});
