import{a as ue}from"./chunk-NIWE6QPI.js";import"./chunk-FK6H3RFT.js";import{a as he}from"./chunk-L7GHGVGE.js";import{a as pe}from"./chunk-E4UZH4GH.js";import{a as Se}from"./chunk-7VGHOT3T.js";import{a as Q,c as X,d as Y,e as Z,f as M,g as ee,h as te,j as ie,k as re,l as ne,m as ae,n as oe,o as le,p as se,q as ce}from"./chunk-IDY3ZXSF.js";import{a as me}from"./chunk-WJSC7PN5.js";import{a as de}from"./chunk-RBADOQRF.js";import{P as K,u as q}from"./chunk-IXUCQNA3.js";import{d as W,e as $,g as z,j as U,q as J}from"./chunk-YW5BT2SR.js";import{$ as O,Ab as V,Bb as H,Da as R,Db as G,Ha as l,Hb as E,Ia as S,Ib as A,Jb as N,Wa as v,Ya as u,cb as t,da as j,db as e,eb as w,ga as D,ib as C,lb as I,mb as g,na as _,oa as b,vb as a,wb as x,xb as f,zb as P}from"./chunk-LTJRTMYM.js";import{a as B,b as k,e as xe,g as L}from"./chunk-5G567QLT.js";var y=xe(Se());var fe=(()=>{let d=class d{transform(r,n){if(!r||!n)return r;let o=[],p=n.toLowerCase();return r.forEach(m=>{(m.historial.altura.toString().toLowerCase().includes(p)||m.historial.peso.toString().toLowerCase().includes(p)||m.historial.presion.toString().toLowerCase().includes(p)||m.historial.temperatura.toString().toLowerCase().includes(p)||m.especialidad!==void 0&&m.especialidad.toString().toLowerCase().includes(p)||m.paciente!==void 0&&m.paciente.toString().toLowerCase().includes(p))&&o.push(m)}),o.length===0?r:o}};d.\u0275fac=function(n){return new(n||d)},d.\u0275pipe=D({name:"buscarMiPefil",type:d,pure:!0,standalone:!0});let s=d;return s})();function be(s,d){if(s&1&&(t(0,"option",17),a(1),e()),s&2){let i=d.$implicit;u("ngValue",i),l(),f(" ",i," ")}}function ve(s,d){if(s&1&&(t(0,"option",17),a(1),e()),s&2){let i=d.$implicit;u("ngValue",i),l(),f(" ",i," ")}}function Ce(s,d){if(s&1){let i=C();t(0,"div",4)(1,"h2",5),a(2),E(3,"titlecase"),e(),t(4,"div",6)(5,"form",7),I("ngSubmit",function(){_(i);let n=g();return b(n.submitForm())}),t(6,"div",8)(7,"h3"),a(8,"Elige dia y hora para todo el mes"),e(),t(9,"label",9),a(10,"Dia"),e(),t(11,"select",10),v(12,be,2,2,"option",11),e(),t(13,"label",12),a(14,"Horario"),e(),w(15,"input",13),t(16,"label",14),a(17,"Especialidades"),e(),t(18,"select",15),v(19,ve,2,2,"option",11),e(),t(20,"button",16),I("click",function(){_(i);let n=g();return b(n.agregarFecha())}),a(21," Agregar horario "),e()()()()()}if(s&2){let i=g();l(2),f(" Bienvenido/a ",A(3,4,i.nombre),"! "),l(3),u("formGroup",i.formRegistro),l(7),u("ngForOf",i.dias),l(7),u("ngForOf",i.especialidades)}}function Ee(s,d){if(s&1&&(t(0,"tbody")(1,"tr")(2,"th",23),a(3),e(),t(4,"td"),a(5),e(),t(6,"td"),a(7),e(),t(8,"td"),a(9),e(),t(10,"td"),a(11),e(),t(12,"td"),a(13),e(),t(14,"td"),a(15),e()()()),s&2){let i=d.$implicit,r=d.index;l(3),x(r+1),l(2),x(i.paciente),l(2),f("",i.historial.altura," cms"),l(2),f("",i.historial.peso," kgs"),l(2),f("",i.historial.presion," mmHg"),l(2),f("",i.historial.temperatura," \xB0C"),l(2),x(i.historial.caries.caries)}}function ye(s,d){if(s&1){let i=C();t(0,"table",18)(1,"thead")(2,"tr")(3,"th",19)(4,"div",20)(5,"input",21),H("ngModelChange",function(n){_(i);let o=g();return V(o.searchAll,n)||(o.searchAll=n),b(n)}),e()()(),t(6,"th",19),a(7,"Paciente"),e(),t(8,"th",19),a(9,"Altura"),e(),t(10,"th",19),a(11,"Peso"),e(),t(12,"th",19),a(13,"Presion"),e(),t(14,"th",19),a(15,"Temperatura"),e(),t(16,"th",19),a(17,"Caries"),e()()(),v(18,Ee,16,7,"tbody",22),E(19,"buscarMiPefil"),e()}if(s&2){let i=g();l(5),P("ngModel",i.searchAll),l(13),u("ngForOf",N(19,2,i.arrHistorial,i.searchAll))}}function we(s,d){if(s&1&&(t(0,"div",4)(1,"h2",5),a(2),E(3,"titlecase"),e(),w(4,"img",24),e()),s&2){let i=g();l(2),f(" Bienvenido/a ",A(3,2,i.nombre),"! "),l(2),u("src",i.imagen,R)}}function Ie(s,d){if(s&1){let i=C();t(0,"tbody")(1,"tr")(2,"th",23),a(3),e(),t(4,"td"),a(5),e(),t(6,"td"),a(7),e(),t(8,"td"),a(9),e(),t(10,"td"),a(11),e(),t(12,"td"),a(13),e(),t(14,"td"),a(15),e(),t(16,"td"),a(17),e(),t(18,"td")(19,"button",25),I("click",function(){let n=_(i).$implicit,o=g(2);return b(o.descargarHistorial(n))}),a(20," Descargar "),e()()()()}if(s&2){let i=d.$implicit,r=d.index;l(3),x(r+1),l(2),x(i.medico),l(2),x(i.especialidad),l(2),f("",i.historial.altura," cms"),l(2),f("",i.historial.peso," kgs"),l(2),f("",i.historial.presion," mmHg"),l(2),f("",i.historial.temperatura," \xB0C"),l(2),x(i.historial.caries.caries)}}function Me(s,d){if(s&1){let i=C();t(0,"table",18)(1,"thead")(2,"tr")(3,"th",19)(4,"div",20)(5,"input",21),H("ngModelChange",function(n){_(i);let o=g();return V(o.searchAll,n)||(o.searchAll=n),b(n)}),e()()(),t(6,"th",19),a(7,"Medico"),e(),t(8,"th",19),a(9,"Especialidad"),e(),t(10,"th",19),a(11,"Altura"),e(),t(12,"th",19),a(13,"Peso"),e(),t(14,"th",19),a(15,"Presion"),e(),t(16,"th",19),a(17,"Temperatura"),e(),t(18,"th",19),a(19,"Caries"),e(),t(20,"th",19),a(21,"Historial"),e()()(),v(22,Ie,21,8,"tbody",22),E(23,"buscarMiPefil"),e()}if(s&2){let i=g();l(5),P("ngModel",i.searchAll),l(17),u("ngForOf",N(23,2,i.arrHistorial,i.searchAll))}}var $e=(()=>{let d=class d{constructor(r,n,o,p,m,F){this.route=r,this.firestoreS=n,this.formBuilder=o,this.especilistaS=p,this.authS=m,this.pacienteS=F,this.auth=O(q),this.dias=["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"],this.arrHistorial=[],this.searchAll="",this.arrTurnosMedico=[],this.tipo="",this.email="",this.nombre="",this.imagen="",this.tieneData=!0,this.especialidades=[],this.formRegistro=new Z({dias:new M(""),horario:new M(""),especialidades:new M("")})}ngOnDestroy(){}ngOnInit(){this.authS.user$.subscribe(r=>{this.tipo=r.tipo,this.email=r.email,this.nombre=r.nombre,this.imagen=r.imagenes}),this.route.params.subscribe(r=>{console.log(r.usuarios),this.tipo==="profesional"?this.firestoreS.obtenerFirestoreUsuario(r.usuarios).then(n=>{this.user=n[0],this.perfil=this.user.tipo,this.especialidades=this.user.especialidad}).then(()=>{this.user.tipo==="profesional"&&this.especilistaS.obtenerEspecialista(this.user.email).subscribe(n=>{this.id=n[0].id,this.especilistaS.obtenerHistorialClinico(n[0].id).subscribe(o=>{this.arrHistorial=[],o.forEach(p=>{this.arrHistorial.push(p)})})})}):this.tipo==="paciente"&&this.pacienteS.obtenerHistorialClinico(this.email).subscribe(n=>{this.arrHistorial=[],n.forEach(o=>{this.especilistaS.obtenerTurnoPorId(o.idTurno).then(p=>{debugger;this.arrHistorial.push(k(B({},o),{especialidad:p.data()?.especialidad,medico:p.data()?.medico,medicoId:p.data()?.medicoid}))})})})})}agregarFecha(){let r=this.formRegistro.get("dias")?.value,n=this.formRegistro.get("horario")?.value,o=this.formRegistro.get("especialidades")?.value,p=Number(n.split(":")[0]);if(n!=null&&p>8&&p<18){if(r==="Sabado"&&p>14){y.default.fire("Horario incorrecto","El horario debe ser entre las 8 y las 13","error");return}r&&n&&o&&(this.firestoreS.actualizarHorasEspecialista(r,n.split(":")[0],n.split(":")[1],o,this.id).then(()=>{y.default.fire({icon:"success",title:"Se agrego el horario mensual correctamente",showConfirmButton:!1,timer:1500})}),this.formRegistro.reset())}else{y.default.fire("Horario incorrecto","Fijarse los datos ingresados como el horario y el dia seleccionado","error");return}}descargarHistorial(r){let n="",o="",p="";this.especilistaS.obtenerMedicoPorId(r.medicoId).then(m=>{n=m.data()?.nombre+" "+m.data()?.apellido,o=m.data()?.email,p=m.data()?.especialidad;let F=r.historial.caries.caries?r.historial.caries.caries:"no tiene";this.especilistaS.obtenerTurnoPorId(r.idTurno).then(ge=>{let T=ge.data(),h=new ue,c=10;h.addImage("/assets/logo.png","PNG",10,c,20,20),c+=30,h.text("Fecha de emision: "+new Date().toLocaleTimeString(),10,c),c+=10,h.text("Historial Clinico de "+r.paciente,10,c),h.setFont("bold"),h.setFont("normal"),c+=10,h.text("idTurno: "+r.idTurno,10,c),c+=10,h.text("Especialista: "+n,10,c),c+=10,h.text("Especialista email: "+o,10,c),c+=10,h.text("Especialidad: "+T?.especialidad,10,c),c+=10,h.text("Comentario: "+T?.comentario,10,c),c+=10,h.text("Diagnostico: "+T?.diagnostico,10,c),c+=10,h.text("Paciente: "+r.paciente,10,c),c+=10,h.text("Altura: "+r.historial.altura+" cms",10,c),c+=10,h.text("Peso: "+r.historial.peso+" kgs",10,c),c+=10,h.text("Presion: "+r.historial.presion+" mmHg",10,c),c+=10,h.text("Temperatura: "+r.historial.temperatura+" \xB0C",10,c),c+=10,h.text("Caries: "+F,10,c),h.save(`historial_${new Date().toLocaleTimeString()}.pdf`)})}),y.default.fire({icon:"success",title:"Se descargo el historial correctamente",showConfirmButton:!1,timer:1500})}submitForm(){return L(this,null,function*(){console.log(this.arrTurnosMedico)})}};d.\u0275fac=function(n){return new(n||d)(S(J),S(K),S(le),S(he),S(de),S(pe))},d.\u0275cmp=j({type:d,selectors:[["app-miperfil"]],standalone:!0,features:[G],decls:7,vars:4,consts:[[1,"full-background"],[1,"container-fluid","d-flex","justify-content-start","align-items-start"],["style","width: 30rem","class","card p-4 shadow mt-3",4,"ngIf"],["class","table mt-3 ms-3","style","width: 770px",4,"ngIf"],[1,"card","p-4","shadow","mt-3",2,"width","30rem"],[1,"text-center","mb-4","mt-1"],[1,"d-flex","flex-column","justify-content-center","align-items-center"],[3,"ngSubmit","formGroup"],[1,"mb-3"],["for","dia"],["name","dias","id","dias","formControlName","dias",1,"form-select"],[3,"ngValue",4,"ngFor","ngForOf"],["for","fecha"],["type","time","id","horario","min","08:00","max","18:00","formControlName","horario",1,"form-control"],["for","horario",1,"form-label"],["id","especialidades","formControlName","especialidades",1,"form-select"],["type","button",1,"btn","btn-primary","mt-2",3,"click"],[3,"ngValue"],[1,"table","mt-3","ms-3",2,"width","770px"],["scope","col"],[1,"mt-1","mb-1"],["type","text","placeholder","Buscar",1,"form-control",3,"ngModelChange","ngModel"],[4,"ngFor","ngForOf"],["scope","row"],["alt","","srcset","",3,"src"],["type","button",1,"btn","btn-primary",3,"click"]],template:function(n,o){n&1&&(t(0,"div",0),w(1,"app-navbar"),t(2,"div",1),v(3,Ce,22,6,"div",2)(4,ye,20,5,"table",3)(5,we,5,4,"div",2)(6,Me,24,5,"table",3),e()()),n&2&&(l(3),u("ngIf",o.perfil==="profesional"),l(),u("ngIf",o.perfil==="profesional"),l(),u("ngIf",o.tipo==="paciente"),l(),u("ngIf",o.tipo==="paciente"))},dependencies:[U,W,$,z,ce,te,ae,oe,Q,ne,X,Y,ie,re,me,se,ee,fe],styles:["[_nghost-%COMP%]{display:block;background-image:url(/assets/pattern.jpg)}.full-background[_ngcontent-%COMP%]{width:100vw;height:100vh}"]});let s=d;return s})();export{$e as MiperfilComponent};