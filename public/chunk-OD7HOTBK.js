import{a as D,b as M,c as N}from"./chunk-NDDFUNLV.js";import{a as R}from"./chunk-KURMSICS.js";import{a as L,b as f,c as U,d as P,e as F,f as b,h as T,j,k as z,q as A}from"./chunk-GU6MDCDW.js";import{a as B}from"./chunk-HECTSUKL.js";import{C,N as I,u as y}from"./chunk-AON64UGK.js";import{d as E,f as w,l as S}from"./chunk-CHILJPBX.js";import{$a as p,Ga as d,Ha as g,Ua as k,Wa as u,Za as t,_a as i,ca as c,d as O,fb as s,ga as _,ob as n,s as v,wb as x}from"./chunk-CPSHSAPU.js";var l=O(R());function q(G,r){G&1&&(t(0,"div",18),n(1," ingrese un email valido. "),i())}var m=class m{constructor(r,a){this.authS=r,this.firestoreS=a,this.router=c(S),this.firestore=c(C),this.auth=c(y),this.formLogin=new F({email:new b("",[f.required,f.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,3}$")]),password:new b("",f.required)})}irRegistro(){this.router.navigate(["/elegirusuario"])}submitForm(){this.blockUI.start("Ingresando a la aplicacion...");let r=this.formLogin.get("email")?.value,a=this.formLogin.get("password")?.value;this.formLogin.valid&&r&&a&&this.authS.logueo(r,a).then(e=>{e.tipo=="profesional"?e.validado&&"autorizado"in e&&e.autorizado?(this.blockUI.stop(),l.default.fire({title:"Ingreso exitoso",text:"Bienvenido",icon:"success"}),this.router.navigate(["/home"])):e.validado&&"autorizado"in e&&e.autorizado==!1?(this.blockUI.stop(),l.default.fire({title:"Error",text:"Usuario no autorizado por el administrador",icon:"error"})):(this.blockUI.stop(),l.default.fire({title:"Error",text:"Usuario no validado",icon:"error"})):e.tipo=="administrador"?(this.blockUI.stop(),l.default.fire({title:"Ingreso exitoso",text:"Bienvenido",icon:"success"}),this.router.navigate(["/home"])):e.validado?(this.blockUI.stop(),l.default.fire({title:"Ingreso exitoso",text:"Bienvenido",icon:"success"}),this.router.navigate(["/home"])):(this.blockUI.stop(),l.default.fire({title:"Error",text:"Usuario no validado",icon:"error"}))}).catch(e=>{this.blockUI.stop();let o=this.firebaseErrors(e.code);l.default.fire({title:"Error",text:o,icon:"error"}),console.error("Error:",e)})}loginEspecialista(){this.formLogin.setValue({email:"test-3aip0nmqr@srv1.mail-tester.com",password:"asdasd123"})}loginEspecialistaDos(){this.formLogin.setValue({email:"jogeg26673@kinsef.com",password:"asdasd123"})}loginPaciente(){this.formLogin.setValue({email:"gebolis212@mposhop.com",password:"asdasd123"})}loginPacienteDos(){this.formLogin.setValue({email:"test-pootof6dt@srv1.mail-tester.com",password:"asdasd123"})}loginPacienteTres(){this.formLogin.setValue({email:"pakalo2875@nolanzip.com",password:"asdasd123"})}loginAdmin(){this.formLogin.setValue({email:"admindos@admin.com",password:"asdasd123"})}firebaseErrors(r){switch(r){case"auth/email-already-in-use":return"Direcci\xF3n de correo electr\xF3nico en uso.";case"auth/weak-password":return"contrase\xF1a debil ingrese una mas segura.";case"auth/user-not-found":return"Usuario no encontrado.";case"auth/invalid-credential":return"Credenciales invalidas.";default:return"Ocurri\xF3 un error. Por favor, int\xE9ntelo nuevamente m\xE1s tarde."}}};m.\u0275fac=function(a){return new(a||m)(g(B),g(I))},m.\u0275cmp=_({type:m,selectors:[["app-login"]],standalone:!0,features:[x],decls:33,vars:3,consts:[[1,"full-background","d-flex","flex-column","justify-content-center","align-items-center"],[1,"d-flex","justify-content-evenly","align-items-center",2,"border","1px solid black","border-radius","5px","padding","10px","background-color","#f8d7da"],["type","button",1,"btn","btn-danger",2,"padding","10px",3,"click"],["type","button",1,"btn","btn-danger","ms-3",2,"padding","10px",3,"click"],["type","button",1,"btn","btn","btn-danger","ms-3",2,"padding","10px",3,"click"],[1,"d-flex","justify-content-center","align-items-center"],[1,"card","p-4","shadow","mt-3",2,"width","30rem","height","30rem"],["src","/assets/logo.png","alt","","srcset","",1,"mx-auto","d-block","mb-4",2,"height","50px","width","50px"],[3,"ngSubmit","formGroup"],[1,"mb-3"],["for","email",1,"form-label"],["type","email","id","email","formControlName","email",1,"form-control"],["class","text-danger","style","padding: 10px; border-radius: 5px; background-color: #f8d7da",4,"ngIf"],["for","password",1,"form-label"],["type","password","id","password","formControlName","password",1,"form-control"],[1,"d-flex","justify-content-center","align-items-center","mt-5"],["type","submit",1,"btn","btn-primary",3,"disabled"],["type","button",1,"btn","btn-success","ms-3",3,"click"],[1,"text-danger",2,"padding","10px","border-radius","5px","background-color","#f8d7da"]],template:function(a,e){if(a&1&&(t(0,"block-ui")(1,"div",0)(2,"div",1)(3,"button",2),s("click",function(){return e.loginEspecialista()}),n(4," Especialista "),i(),t(5,"button",3),s("click",function(){return e.loginEspecialistaDos()}),n(6," Especialista "),i(),t(7,"button",4),s("click",function(){return e.loginPaciente()}),n(8," Paciente "),i(),t(9,"button",4),s("click",function(){return e.loginPacienteTres()}),n(10," Paciente "),i(),t(11,"button",4),s("click",function(){return e.loginPaciente()}),n(12," Paciente "),i(),t(13,"button",4),s("click",function(){return e.loginAdmin()}),n(14," Administrador "),i()(),t(15,"div",5)(16,"div",6),p(17,"img",7),t(18,"form",8),s("ngSubmit",function(){return e.submitForm()}),t(19,"div",9)(20,"label",10),n(21,"Email"),i(),p(22,"input",11),i(),k(23,q,2,0,"div",12),t(24,"div",9)(25,"label",13),n(26,"Contrase\xF1a"),i(),p(27,"input",14),i(),t(28,"div",15)(29,"button",16),n(30," Ingresar "),i(),t(31,"button",17),s("click",function(){return e.irRegistro()}),n(32," Ir a registro "),i()()()()()()()),a&2){let o;d(18),u("formGroup",e.formLogin),d(5),u("ngIf",e.formLogin==null||(o=e.formLogin.get("email"))==null||o.errors==null?null:o.errors.pattern),d(6),u("disabled",!(e.formLogin!=null&&e.formLogin.valid))}},dependencies:[w,E,A,T,L,U,P,j,z,M,D],styles:["[_nghost-%COMP%]{display:block;background-image:url(/assets/pattern.jpg)}.full-background[_ngcontent-%COMP%]{width:100vw;height:100vh}.card[_ngcontent-%COMP%]{background-color:#fff;border-radius:10px}"]});var h=m;v([N()],h.prototype,"blockUI",void 0);export{h as LoginComponent};
