import{a as w}from"./chunk-E4UZH4GH.js";import{a as E}from"./chunk-WJSC7PN5.js";import"./chunk-RBADOQRF.js";import"./chunk-IXUCQNA3.js";import{d as C,e as y,h as S,j as I,q as _}from"./chunk-YW5BT2SR.js";import{Db as g,Ha as a,Hb as v,Ia as m,Jb as b,Wa as p,Ya as f,cb as e,da as x,db as t,eb as u,mb as h,vb as r,xb as l}from"./chunk-LTJRTMYM.js";import"./chunk-5G567QLT.js";function P(i,n){if(i&1&&(e(0,"li"),r(1),t()),i&2){let o=h().$implicit;a(),l(" Caries:",o.historial.caries.caries," ")}}function k(i,n){if(i&1&&(e(0,"div",3)(1,"div",4)(2,"h5",5),r(3,"Historial Clinico"),t(),e(4,"h6",6),r(5),v(6,"date"),t(),u(7,"p",7),e(8,"h5"),r(9,"Analisis"),t(),e(10,"ul")(11,"li"),r(12),t(),e(13,"li"),r(14),t(),e(15,"li"),r(16),t(),e(17,"li"),r(18),t(),p(19,P,2,1,"li",8),t()()()),i&2){let o=n.$implicit;a(5),l(" ",b(6,6,o.fecha.toDate(),"medium")," "),a(7),l("Altura:",o.historial.altura," cms"),a(2),l("Peso:",o.historial.peso," kgs"),a(2),l("Presion:",o.historial.presion,"mmHg"),a(2),l("Temperatura:",o.historial.temperatura,"\xB0C"),a(),f("ngIf",o.historial.caries.caries!=="")}}var N=(()=>{let n=class n{constructor(c,s){this.route=c,this.pacienteS=s,this.arrHistoriales=[],this.arrHistoriales=[],this.route.params.subscribe(d=>{this.pacienteS.obtenerHistorialClinico(d.id).subscribe(M=>{M.forEach(O=>{this.arrHistoriales.push(O)})})})}ngOnInit(){}};n.\u0275fac=function(s){return new(s||n)(m(_),m(w))},n.\u0275cmp=x({type:n,selectors:[["app-mihistorial"]],standalone:!0,features:[g],decls:4,vars:1,consts:[[1,"full-background"],[1,"d-flex","flex-wrap","justify-content-start","align-items-start","mt-3"],["class","d-flex flex-row justify-content-center align-items-center ms-3",4,"ngFor","ngForOf"],[1,"d-flex","flex-row","justify-content-center","align-items-center","ms-3"],[1,"card-body","d-flex","flex-column","align-items-center",2,"height","250px"],[1,"card-title"],[1,"card-subtitle","mb-2","text-body-secondary"],[1,"card-text"],[4,"ngIf"]],template:function(s,d){s&1&&(e(0,"div",0),u(1,"app-navbar"),e(2,"div",1),p(3,k,20,9,"div",2),t()()),s&2&&(a(3),f("ngForOf",d.arrHistoriales))},dependencies:[I,C,y,S,E],styles:[".full-background[_ngcontent-%COMP%]{width:100vw;height:100vh}[_nghost-%COMP%]{display:block;background-image:url(/assets/pattern.jpg)}.card[_ngcontent-%COMP%]{background-color:#f8f9fa;border:1px solid #f8f9fa;border-radius:10px;box-shadow:0 4px 6px #0000001a;width:350px}.card-body[_ngcontent-%COMP%]{border:1px solid #000000;border-radius:10px;background-color:#faebd7;width:300px}"]});let i=n;return i})();export{N as MihistorialComponent};
