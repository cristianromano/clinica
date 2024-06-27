import{a as $}from"./chunk-XT2GHSXG.js";import{a as Q,b as U}from"./chunk-VFF4UERV.js";import{a as R,b as H,c as L}from"./chunk-XL4WQKZB.js";import{b as N,d as j,h as A,q as D,r as V,s as K}from"./chunk-2TE2MQIP.js";import{a as q}from"./chunk-GEZW3YTW.js";import{a as W}from"./chunk-76VRRPFV.js";import{b as F,c as z,f as O}from"./chunk-FWNJSX6N.js";import{$a as _,Ab as x,Ga as l,Ha as f,Ua as S,Wa as g,Za as n,_a as a,cb as b,d as J,f as C,fb as h,ga as v,gb as T,ob as o,pb as p,qa as y,ra as E,sb as w,tb as P,ub as B,wb as M,xb as I,yb as u,zb as k}from"./chunk-CPSHSAPU.js";var r=J(K());var X=c=>({itemsPerPage:5,currentPage:c,id:"profesionales"});function Y(c,s){if(c&1){let d=b();n(0,"tbody",10),h("click",function(){let t=y(d).$implicit,i=T();return E(i.gestionarTurno(t))}),n(1,"tr",11),u(2,"coloresturnos"),n(3,"th",12),o(4),a(),n(5,"td"),o(6),a(),n(7,"td"),o(8),a(),n(9,"td"),o(10),a(),n(11,"td"),o(12),a()()()}if(c&2){let d=s.$implicit,e=s.index;l(),g("ngClass",k(2,6,d.estado)),l(3),p(e+1),l(2),p(d.paciente),l(2),p(d.especialidad),l(2),p(d.hora),l(2),p(d.estado)}}var pe=(()=>{let s=class s{constructor(e,t){this.especialistaService=e,this.authService=t,this.arrTurnos=[],this.p=1,this.searchEspecialista=""}ngOnInit(){this.especialistaService.obtenerTurnosEspecialista(this.authService.getUser()?.email).subscribe(e=>{this.arrTurnos=[],e.forEach(t=>{this.arrTurnos.push(t)})})}gestionarTurno(e){return C(this,null,function*(){if(e.estado==="cancelado"){r.default.fire("Turno ya cancelado","","info");return}if(e.estado==="rechazado"){r.default.fire("Turno ya rechazado","","info");return}if(e.estado==="realizado"||e.reseniaOk===!0){if(e.resenia==null){r.default.fire("No hay rese\xF1a por el momento","","info");return}r.default.fire(`${e.resenia}`,"","info");return}e.estado==="aceptado"&&r.default.fire({showCloseButton:!0,title:"Ingrese diagnostico y el comentario",html:`<input id="input1" class="swal2-input" placeholder="Comentario" required>' 
          <textarea  id="textarea1" class="swal2-textarea" style="resize: none;width:350px;" placeholder="Ingrese diagnostico" required></textarea>`,focusConfirm:!1,preConfirm:()=>{let t=document.getElementById("input1").value,i=document.getElementById("textarea1").value;return(!t||!i)&&r.default.showValidationMessage("Ingrese texto en ambos campos"),[i,t]}}).then(t=>{t.isConfirmed&&(this.especialistaService.gestionarTurnoAceptado(e.id,"realizado",t.value),r.default.fire({title:"Turno realizado",icon:"success"}))}),e.estado==="abierto"&&r.default.fire({title:"\xBFQue desea hacer?",showCloseButton:!0,showDenyButton:!0,showCancelButton:!0,cancelButtonText:"Rechazar turno",confirmButtonText:"Aceptar turno",denyButtonText:"Cancelar turno"}).then(t=>{t.isConfirmed?this.especialistaService.gestionarTurno(e.id,"aceptado"):t.isDenied?r.default.fire({title:"Motivo de cancelaci\xF3n",input:"text",confirmButtonText:"Aceptar",showCancelButton:!0}).then(i=>{i.isConfirmed&&this.especialistaService.gestionarTurnoCancelado(e.id,"cancelado",i.value)}):t.isDismissed&&r.default.fire({title:"Motivo de rechazo de turno",input:"text",confirmButtonText:"Aceptar",showCancelButton:!0}).then(i=>{i.isConfirmed&&this.especialistaService.gestionarTurnoCancelado(e.id,"rechazado",i.value)})})})}};s.\u0275fac=function(t){return new(t||s)(f($),f(W))},s.\u0275cmp=v({type:s,selectors:[["app-especialista-panel"]],standalone:!0,features:[M],decls:26,vars:10,consts:[[1,"full-background"],[1,"d-flex","flex-row","justify-content-center","align-items-center"],[1,"d-flex","flex-column","justify-content-center","align-items-center","panelusuarios"],[1,"d-flex","flex-column","justify-content-center","align-items","mt-3"],[1,"mt-1","mb-1"],["type","text","placeholder","Buscar profesional",1,"form-control",3,"ngModelChange","ngModel"],[1,"table"],["scope","col"],[3,"click",4,"ngFor","ngForOf"],["id","profesionales",1,"my-pagination",3,"pageChange"],[3,"click"],[3,"ngClass"],["scope","row"]],template:function(t,i){t&1&&(n(0,"div",0),_(1,"app-navbar"),n(2,"div",1)(3,"div",2)(4,"div",3)(5,"h4"),o(6,"Buscar por Paciente/Especialidad"),a(),n(7,"div",4)(8,"input",5),B("ngModelChange",function(m){return P(i.searchEspecialista,m)||(i.searchEspecialista=m),m}),a()()(),n(9,"table",6)(10,"thead")(11,"tr")(12,"th",7),o(13,"#"),a(),n(14,"th",7),o(15,"Paciente"),a(),n(16,"th",7),o(17,"Especialidad"),a(),n(18,"th",7),o(19,"Hora"),a(),n(20,"th",7),o(21,"Estado"),a()()(),S(22,Y,13,8,"tbody",8),u(23,"filtro"),u(24,"paginate"),a(),n(25,"pagination-controls",9),h("pageChange",function(m){return i.p=m}),a()()()()),t&2&&(l(8),w("ngModel",i.searchEspecialista),l(14),g("ngForOf",x(24,5,x(23,2,i.arrTurnos,i.searchEspecialista),I(8,X,i.p))))},dependencies:[O,F,z,q,L,R,H,D,N,j,A,Q,V,U],styles:[".full-background[_ngcontent-%COMP%]{width:100vw;height:100vh}[_nghost-%COMP%]{display:block;background-image:url(/assets/pattern.jpg)}.panelusuarios[_ngcontent-%COMP%]{background-color:#f8f9fa;border:1px solid #e9ecef;border-radius:5px;margin-top:10px;padding:50px;background-color:#faebd7;cursor:pointer}.table[_ngcontent-%COMP%]{width:500px}"]});let c=s;return c})();export{pe as EspecialistaPanelComponent};
