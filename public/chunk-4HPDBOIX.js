import{a as I}from"./chunk-RBADOQRF.js";import{u as V}from"./chunk-IXUCQNA3.js";import{e as y,j as P,s as b,t as T}from"./chunk-YW5BT2SR.js";import{$ as g,Da as C,Db as S,Ha as l,Ia as f,Wa as x,Ya as p,cb as n,da as h,db as a,eb as v,ib as _,lb as m,mb as c,na as u,oa as d,pb as w,vb as s,xb as k}from"./chunk-LTJRTMYM.js";function N(i,r){if(i&1){let t=_();n(0,"li")(1,"button",12),m("click",function(){u(t);let e=c(2);return d(e.irMisPaciente())}),s(2," Mis Pacientes "),a()()}}function E(i,r){if(i&1){let t=_();n(0,"li")(1,"button",12),m("click",function(){u(t);let e=c(2);return d(e.irListaUsuarios())}),s(2," Usuarios "),a()()}}function O(i,r){if(i&1){let t=_();n(0,"li")(1,"button",12),m("click",function(){u(t);let e=c(2);return d(e.irGraficos())}),s(2," Graficos "),a()()}}function L(i,r){if(i&1){let t=_();n(0,"div",2)(1,"a",3),s(2,"Clinica"),a(),n(3,"button",4),v(4,"span",5),a(),n(5,"div",6),v(6,"ul",7),n(7,"div",8)(8,"button",9),v(9,"img",10),s(10),a(),n(11,"ul",11)(12,"li")(13,"button",12),m("click",function(){u(t);let e=c();return d(e.irPefil())}),s(14," Mi perfil "),a()(),x(15,N,3,0,"li",13)(16,E,3,0,"li",13)(17,O,3,0,"li",13),n(18,"li")(19,"button",12),m("click",function(){u(t);let e=c();return d(e.logOut())}),s(20," Desloguearse "),a()()()()()()}if(i&2){let t=c();l(9),w("src",t.foto,C),l(),k(" ",t.nombre," "),l(5),p("ngIf",t.userPadre.tipo==="profesional"),l(),p("ngIf",t.userPadre.tipo==="administrador"),l(),p("ngIf",t.userPadre.tipo==="administrador")}}var q=(()=>{let r=class r{constructor(o,e){this.route=o,this.authS=e,this.auth=g(V),this.router=g(b)}ngOnInit(){this.user=this.authS.logueado(),this.user&&(this.nombre=this.user.email,this.foto=this.user.photoURL),this.authS.user$.subscribe(o=>{this.userPadre=o,console.log(this.userPadre)})}irBio(){this.route.navigate(["/bio"])}logOut(){this.authS.signOut(),this.route.navigate(["/login"])}irPefil(){this.router.navigate(["miperfil",`${this.user.email}`])}irMisPaciente(){this.router.navigate(["mispacientes"])}irListaUsuarios(){this.router.navigate(["lista-usuarios"])}irGraficos(){this.router.navigate(["graficos"])}};r.\u0275fac=function(e){return new(e||r)(f(b),f(I))},r.\u0275cmp=h({type:r,selectors:[["app-navbar"]],standalone:!0,features:[S],decls:2,vars:1,consts:[[1,"navbar","navbar-expand-lg","bg-body-tertiary"],["class","container-fluid",4,"ngIf"],[1,"container-fluid"],["routerLink","/home",1,"navbar-brand"],["type","button","data-bs-toggle","collapse","data-bs-target","#navbarText","aria-controls","navbarText","aria-expanded","false","aria-label","Toggle navigation",1,"navbar-toggler"],[1,"navbar-toggler-icon"],["id","navbarText",1,"collapse","navbar-collapse"],[1,"navbar-nav","me-auto","mb-2","mb-lg-0"],[1,"dropdown"],["type","button","data-bs-toggle","dropdown","aria-expanded","false",1,"btn","btn-secondary","dropdown-toggle"],["alt","","srcset","",2,"height","30px","width","30px","border-radius","50%","border","1px solid black",3,"src"],[1,"dropdown-menu"],["type","button",1,"dropdown-item","desloguear",3,"click"],[4,"ngIf"]],template:function(e,M){e&1&&(n(0,"nav",0),x(1,L,21,5,"div",1),a()),e&2&&(l(),p("ngIf",M.userPadre))},dependencies:[T,P,y],styles:[".navbar[_ngcontent-%COMP%]{background-color:#3498db}.nav-link[_ngcontent-%COMP%]{text-decoration:none;cursor:pointer}.desloguear[_ngcontent-%COMP%]{cursor:pointer}.desloguear[_ngcontent-%COMP%]:hover{background-color:#e74c3c;color:#fff}"]});let i=r;return i})();export{q as a};
