import{a as F,b as se}from"./chunk-VFF4UERV.js";import{a as ce}from"./chunk-UYMU7PDL.js";import{a as re,b as oe,c as ae}from"./chunk-BEBBCVUV.js";import{a as fe}from"./chunk-KURMSICS.js";import{p as ee,q as te}from"./chunk-JX2K3NFS.js";import{a as ne}from"./chunk-UAHUDWA7.js";import{a as ie}from"./chunk-GN3YVZHB.js";import{C as B,E as j,G as Q,H as S,I as w,J as W,L as X,M as k,N as Y,O as Z}from"./chunk-PLM2N6DR.js";import{b as G,c as J,f as K,h as L}from"./chunk-BWXJFDZ4.js";import{$a as D,Ab as v,Da as U,Ga as l,Ha as C,Ua as y,Wa as f,Y as z,Za as i,_a as n,ca as O,cb as T,d as ue,f as $,fb as h,ga as R,gb as m,ja as N,jb as q,ob as o,pb as p,qa as _,qb as M,ra as g,vb as H,wb as A,xb as P,yb as E,zb as V}from"./chunk-CPSHSAPU.js";var d=ue(fe());var de=(()=>{let a=class a{transform(t){return t?t.toDate():null}};a.\u0275fac=function(e){return new(e||a)},a.\u0275pipe=N({name:"convertirfecha",type:a,pure:!0,standalone:!0});let c=a;return c})();var pe=(()=>{let a=class a{constructor(){this.firestore=O(B)}getPacientes(){return W(S(this.firestore,"pacientes"))}ingresarTurnoPaciente(t,e,r,u,x,I,b){return Q(S(this.firestore,"turnos"),{paciente:t,medico:I+" "+b,medicoid:r,especialidad:e,medicoemail:u,hora:x,estado:"abierto",fechaPedido:new Date,reseniaOk:!1,calificacion:null,encuesta:null})}obtenerTurnosPorPaciente(t){let e=X(S(this.firestore,"turnos"),Y("paciente","==",t));return j(e,{idField:"id"})}ingresarEncuesta(t,e){return k(w(this.firestore,"turnos",t),{encuesta:e})}cancelarTurno(t,e){return k(w(this.firestore,"turnos",t),{estado:"cancelado",comentario:e})}ingresarResenia(t,e){return k(w(this.firestore,"turnos",t),{resenia:e,reseniaOk:!0})}ingresarCalificacionMedico(t,e){return k(w(this.firestore,"turnos",t),{calificacion:e})}};a.\u0275fac=function(e){return new(e||a)},a.\u0275prov=z({token:a,factory:a.\u0275fac,providedIn:"root"});let c=a;return c})();var xe=c=>({itemsPerPage:5,currentPage:c,id:"profesionales"}),_e=c=>({itemsPerPage:5,currentPage:c,id:"turnos"}),me=c=>({"table-primary":c});function ge(c,a){if(c&1){let s=T();i(0,"tbody",12),h("click",function(){let e=_(s),r=e.$implicit,u=e.index,x=m();return g(x.getEspecialidadesOpciones(r.valor,u))}),i(1,"tr",13)(2,"th",14),o(3),n(),i(4,"td"),o(5),n()()()}if(c&2){let s=a.$implicit,t=a.index,e=m();l(),f("ngClass",P(3,me,e.selectedRow===t)),l(2),p(t+1),l(2),p(s.valor)}}function Ee(c,a){if(c&1){let s=T();i(0,"tbody",12),h("click",function(){let e=_(s).$implicit,r=m();return g(r.elegirMedico(e))}),i(1,"tr",13)(2,"th",14),o(3),n(),i(4,"td"),D(5,"img",15),n(),i(6,"td"),o(7),n(),i(8,"td"),o(9),n(),i(10,"td"),o(11),n()()()}if(c&2){let s=a.$implicit,t=a.index;l(),f("ngClass",s.autorizado),l(2),p(t+1),l(2),q("src",s.imagenes,U),l(2),p(s.nombre),l(2),p(s.apellido),l(2),p(s.especialidad)}}function be(c,a){if(c&1){let s=T();i(0,"tr",16),h("click",function(){let e=_(s).$implicit,r=m();return g(r.solicitarTurno(e))}),i(1,"th",14),o(2),n(),i(3,"td"),o(4),n(),i(5,"td"),o(6),E(7,"convertirfecha"),E(8,"date"),n()()}if(c&2){let s=a.$implicit,t=a.index,e=m();f("ngClass",P(9,me,e.selectedRow===t)),l(2),p(t+1),l(2),p(s.especialidad),l(2),M(" ",v(8,6,V(7,4,s.timestamp),"shortTime")," ")}}function Ce(c,a){if(c&1){let s=T();i(0,"tbody")(1,"tr",13),E(2,"coloresturnos"),i(3,"th",14),o(4),n(),i(5,"td",12),h("click",function(){let e=_(s).$implicit,r=m();return g(r.manejoTurno(e))}),o(6),n(),i(7,"td",12),h("click",function(){let e=_(s).$implicit,r=m();return g(r.manejoTurno(e))}),o(8),n(),i(9,"td",12),h("click",function(){let e=_(s).$implicit,r=m();return g(r.manejoTurno(e))}),o(10),E(11,"convertirfecha"),E(12,"date"),n(),i(13,"td",12),h("click",function(){let e=_(s).$implicit,r=m();return g(r.manejoTurno(e))}),o(14),n(),i(15,"td")(16,"button",17),h("click",function(){let e=_(s).$implicit,r=m();return g(r.calificarMedico(e))}),o(17," Calificar "),n()(),i(18,"td")(19,"button",17),h("click",function(){let e=_(s).$implicit,r=m();return g(r.realizarEncuesta(e))}),o(20," Encuesta "),n()()()()}if(c&2){let s=a.$implicit,t=a.index;l(),f("ngClass",V(2,8,s.estado)),l(3),p(t+1),l(2),p(s.medico),l(2),p(s.especialidad),l(2),M(" ",v(12,12,V(11,10,s.hora),"shortTime")," "),l(4),p(s.estado),l(2),f("disabled",s.estado!=="realizado"),l(3),f("disabled",s.estado!=="realizado"&&s.comentario!==null)}}var qe=(()=>{let a=class a{constructor(t,e,r,u,x){this.firestoreS=t,this.filtro=e,this.pacienteS=r,this.authS=u,this.especialistaS=x,this.p=1,this.ptwo=1,this.p3=1,this.arrProfesionales=[],this.arrTurnos=[],this.arrPacientes=[],this.usuarioElegidoEmail="",this.user=[],this.opciones=[],this.fechas=[],this.searchEspecialista="",this.firestore=O(B),this.selectedRow=-1}ngOnInit(){this.pacienteS.obtenerTurnosPorPaciente(this.authS.getUser()?.email).subscribe(t=>{this.arrTurnos=[],t.forEach(e=>{this.arrTurnos.push(e)})}),j(S(this.firestore,"especialidades")).subscribe(t=>{this.opciones=[],t.forEach(e=>{this.opciones.push({etiqueta:e.especialidad,valor:e.especialidad})})})}getEspecialidadesOpciones(t,e){this.firestoreS.obtenerEspecialistaPorEspecialidad(t).subscribe(r=>{this.arrProfesionales=[],r.forEach(u=>{this.arrProfesionales.push(u)})})}elegirMedico(t){this.fechas=[];for(let e=0;e<2;e++)this.fechas.push({especialidad:Object.keys(t.fechas[e])[0],timestamp:Object.values(t.fechas[e])[0],medico:t.id})}elegirUsuario(t){d.default.fire(`Usuario elegido:${t.email}`,"","success"),this.usuarioElegidoEmail=t.email}solicitarTurno(t){d.default.fire({title:"\xBFDesea solicitar turno?",showDenyButton:!0,confirmButtonText:"Si",denyButtonText:"No"}).then(e=>{e.isConfirmed?this.especialistaS.obtenerMedicoPorId(t.medico).then(r=>{let u="",x="",I="";r.forEach(b=>{u=b.email,x=b.nombre,I=b.apellido}),this.pacienteS.ingresarTurnoPaciente(this.usuarioElegidoEmail?this.usuarioElegidoEmail:this.authS.getUser()?.email,t.especialidad,t.medico,u,t.timestamp,x,I).then(()=>{d.default.fire("Turno solicitado","","success");let b=this.fechas.splice(this.fechas.indexOf(t),1);this.usuarioElegidoEmail="",this.especialistaS.actualizarHorario(t.medico,b)})}):e.isDenied&&d.default.fire("Turno no solicitado","","info")})}calificarMedico(t){if(t.calificacion){d.default.fire("Calificacion ya realizada","","info");return}d.default.fire({title:"Califique al medico",input:"radio",inputOptions:{1:"1",2:"2",3:"3",4:"4",5:"5"},showDenyButton:!0,confirmButtonText:"Calificar",denyButtonText:"No calificar"}).then(e=>{e.isConfirmed?this.pacienteS.ingresarCalificacionMedico(t.id,e.value).then(()=>{d.default.fire(`Calificacion:${e.value}`,"","success")}):e.isDenied&&d.default.fire("Calificacion no realizada","","info")})}realizarEncuesta(t){return $(this,null,function*(){if(t.encuesta){d.default.fire("Encuesta ya realizada","","info");return}let{value:e}=yield d.default.fire({title:"Realice encuesta",input:"text",inputPlaceholder:"Ingrese encuesta",showCancelButton:!0,inputValidator:r=>!r&&"Complete el campo con texto valido"});e?this.pacienteS.ingresarEncuesta(t.id,e).then(()=>{d.default.fire("Encuesta realizada","","success")}):d.default.fire("Encuesta no realizada","","info")})}manejoTurno(t){if(t.estado==="cancelado"){d.default.fire("Turno ya cancelado","","info");return}if(t.estado==="realizado")if(t.reseniaOk===!0){d.default.fire(`Rese\xF1a:${t.comentario}`,"","info");return}else d.default.fire({title:"\xBFDesea agregar rese\xF1a?",showDenyButton:!0,confirmButtonText:"Si",denyButtonText:"No"}).then(e=>{e.isConfirmed?d.default.fire({title:"Ingrese rese\xF1a",input:"text",inputPlaceholder:"Ingrese rese\xF1a",showCancelButton:!0}).then(r=>{r.isConfirmed&&this.pacienteS.ingresarResenia(t.id,r.value).then(()=>{d.default.fire("Rese\xF1a agregada","","success")})}):e.isDenied&&d.default.fire("Rese\xF1a no agregada","","info")});t.estado==="abierto"&&d.default.fire({title:"\xBFDesea cancelar turno? , ingrese motivo:",showDenyButton:!0,confirmButtonText:"Si",denyButtonText:"No",input:"text"}).then(e=>{e.isConfirmed?this.pacienteS.cancelarTurno(t.id,e.value).then(()=>{d.default.fire("Turno cancelado","","success")}):e.isDenied&&d.default.fire("Turno no cancelado","","info")})}filtrarEspecialista(){this.arrProfesionales=this.filtro.transform(this.arrProfesionales,this.searchEspecialista)}};a.\u0275fac=function(e){return new(e||a)(C(Z),C(F),C(pe),C(ie),C(ce))},a.\u0275cmp=R({type:a,selectors:[["app-paciente-turnos"]],standalone:!0,features:[H([F]),A],decls:66,vars:17,consts:[[1,"full-background"],[1,"d-flex","flex-row","justify-content-start","align-items-start","mt-3","ms-3"],[1,"d-flex","flex-row","justify-content-center","allign-item-center"],[1,"table"],["scope","col"],[3,"click",4,"ngFor","ngForOf"],[1,"d-flex","flex-column","justify-content-center","allign-item-center","ms-3"],[3,"ngClass","click",4,"ngFor","ngForOf"],[1,"card","p-4","shadow","ms-3","mt-3",2,"padding","20px"],[1,"d-flex","flex-column","justify-content-center","align-items-center"],[4,"ngFor","ngForOf"],["id","turnos",1,"my-pagination",3,"pageChange"],[3,"click"],[3,"ngClass"],["scope","row"],["alt","...",2,"height","50px","width","50px",3,"src"],[3,"click","ngClass"],["type","button",1,"btn","btn-primary",3,"click","disabled"]],template:function(e,r){e&1&&(i(0,"div",0),D(1,"app-navbar"),i(2,"div",1)(3,"div",2)(4,"table",3)(5,"thead")(6,"tr")(7,"th",4),o(8,"#"),n(),i(9,"th",4),o(10,"Especialidad"),n()()(),y(11,ge,6,5,"tbody",5),n()(),i(12,"div",6)(13,"table",3)(14,"thead")(15,"tr")(16,"th",4),o(17,"#"),n(),i(18,"th",4),o(19,"Foto"),n(),i(20,"th",4),o(21,"Nombre"),n(),i(22,"th",4),o(23,"Apellido"),n(),i(24,"th",4),o(25,"Especialidad"),n()()(),y(26,Ee,12,6,"tbody",5),E(27,"filtro"),E(28,"paginate"),n(),i(29,"div",2)(30,"table",3)(31,"thead")(32,"tr")(33,"th",4),o(34,"#"),n(),i(35,"th",4),o(36,"Especialidad"),n(),i(37,"th",4),o(38,"Horarios"),n()()(),i(39,"tbody"),y(40,be,9,11,"tr",7),n()()()(),i(41,"div")(42,"div",8)(43,"h4"),o(44,"Turnos"),n(),i(45,"div",9)(46,"table",3)(47,"thead")(48,"tr")(49,"th",4),o(50,"#"),n(),i(51,"th",4),o(52,"Medico"),n(),i(53,"th",4),o(54,"Especialidad"),n(),i(55,"th",4),o(56,"Hora"),n(),i(57,"th",4),o(58,"Estado"),n(),i(59,"th",4),o(60,"Calificar Medico"),n(),i(61,"th",4),o(62,"Encuesta"),n()()(),y(63,Ce,21,15,"tbody",10),E(64,"paginate"),n(),i(65,"pagination-controls",11),h("pageChange",function(x){return r.ptwo=x}),n()()()()()()),e&2&&(l(11),f("ngForOf",r.opciones),l(15),f("ngForOf",v(28,7,v(27,4,r.arrProfesionales,r.searchEspecialista),P(13,xe,r.p))),l(14),f("ngForOf",r.fechas),l(23),f("ngForOf",v(64,10,r.arrTurnos,P(15,_e,r.ptwo))))},dependencies:[L,G,J,K,ne,te,ae,re,oe,ee,F,se,de],styles:[".full-background[_ngcontent-%COMP%]{width:100vw;height:100vh}[_nghost-%COMP%]{display:block;background-image:url(/assets/pattern.jpg)}.my-pagination[_ngcontent-%COMP%]     .ngx-pagination .current{color:#000}.panelusuarios[_ngcontent-%COMP%]{background-color:#f8f9fa;border:1px solid #e9ecef;border-radius:5px;margin-top:10px;padding:50px;background-color:#faebd7;cursor:pointer}.panelturnos[_ngcontent-%COMP%]{border-radius:5px;margin-top:10px;padding:50px;background-color:#faebd7;cursor:pointer}.table[_ngcontent-%COMP%]{width:550px;cursor:pointer}"]});let c=a;return c})();export{qe as PacienteTurnosComponent};