import{c as ue,d as fe,e as ge}from"./chunk-A2SUW3BZ.js";import{a as oe,b as ae,c as ne}from"./chunk-NDDFUNLV.js";import{a as se,c as me,d as de,e as ce,f as pe}from"./chunk-JHUPRWQY.js";import{a as ve}from"./chunk-KURMSICS.js";import{a as Z,b as m,c as H,d as K,e as w,f as g,h as $,i as J,j as Q,k as Y,l as W,m as X,n as ee,o as te,p as ie,q as re}from"./chunk-GU6MDCDW.js";import"./chunk-H3WQR7VF.js";import{a as le}from"./chunk-HECTSUKL.js";import{C as G,E as z,F as L,G as I,N as P,u as j}from"./chunk-AON64UGK.js";import{c as B,d as O,f as M,j as D,l as q}from"./chunk-CHILJPBX.js";import{$a as h,Ga as d,Ha as R,Ua as f,Wa as c,Za as r,_a as i,ca as b,cb as T,d as he,f as C,fb as _,ga as N,gb as S,ob as n,qa as k,qb as y,ra as U,s as A,wb as V}from"./chunk-CPSHSAPU.js";var v=he(ve());function be(a,o){a&1&&(r(0,"div",29),n(1," El nombre solo acepta letras. "),i())}function _e(a,o){a&1&&(r(0,"div",29),n(1," El apellido solo acepta letras. "),i())}function xe(a,o){a&1&&(r(0,"div",29),n(1," La edad debe estar en el rango de 18 a 99. "),i())}function Ee(a,o){a&1&&(r(0,"div",29),n(1," El DNI debe tener al menos 8 d\xEDgitos. "),i())}function Re(a,o){a&1&&(r(0,"div",29),n(1," la obra social debe contener texto. "),i())}function Se(a,o){if(a&1&&(r(0,"div",5)(1,"label",30),n(2,"Obra social"),i(),h(3,"input",31),f(4,Re,2,0,"div",8),i()),a&2){let t,e=S();d(4),c("ngIf",e.formRegistro==null||(t=e.formRegistro.get("obrasocial"))==null||t.errors==null?null:t.errors.pattern)}}function Ce(a,o){if(a&1&&(r(0,"option",35),n(1),i()),a&2){let t=o.$implicit;c("value",t.valor),d(),y(" ",t.etiqueta," ")}}function ye(a,o){if(a&1&&(r(0,"div",5)(1,"label",32),n(2,"Especialidad"),i(),r(3,"select",33),f(4,Ce,2,2,"option",34),i()()),a&2){let t=S();d(4),c("ngForOf",t.opciones)}}function Ie(a,o){a&1&&(r(0,"div",29),n(1," ingrese un email valido. "),i())}function we(a,o){if(a&1&&(r(0,"li",36),n(1),i()),a&2){let t=o.$implicit;d(),y(" ",t.name," ")}}function Fe(a,o){a&1&&(r(0,"div",42),n(1," Este campo solo puede contener letras y espacios. "),i())}function Ae(a,o){if(a&1){let t=T();r(0,"form",37),_("ngSubmit",function(){k(t);let l=S();return U(l.agregarEspecialidad())}),r(1,"label",38),n(2,"Agregar especialidad"),i(),h(3,"input",39),f(4,Fe,2,0,"div",40),r(5,"button",41),n(6," Agregar a lista "),i()()}if(a&2){let t,e=S();c("formGroup",e.formEspecialidad),d(4),c("ngIf",(t=e.formEspecialidad.get("especialidadextra"))==null||t.errors==null?null:t.errors.pattern),d(),c("disabled",!(e.formEspecialidad!=null&&e.formEspecialidad.valid))}}var x=class x{constructor(o,t,e,l){this.formBuilder=o,this.firestoreService=t,this.authService=e,this.route=l,this.opciones=[],this.storage=b(se),this.firestore=b(G),this.auth=b(j),this.storageUpload=de(),this.token="",this.recaptchaV3Service=b(ge),this.savedFileNames=[],this.tipoUsuario="",this.isChecked=!1,this.router=b(q),this.formRegistro=new w({nombre:new g("",[m.required,m.pattern("[a-zA-Z ]*")]),apellido:new g("",[m.required,m.pattern("[a-zA-Z ]*")]),edad:new g("",[m.required,m.pattern("[0-9]*"),m.min(18),m.max(99)]),dni:new g("",[m.required,m.minLength(8),m.maxLength(8)]),obrasocial:new g("",[m.required,m.pattern("[a-zA-Z ]*")]),email:new g("",[m.required,m.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}")]),especialidad:new g(""),password:new g("",[m.required]),imagenes:this.formBuilder.array([])}),this.formEspecialidad=new w({especialidadextra:new g("",[m.pattern("[a-zA-Z ]*")])}),this.route.paramMap.subscribe(s=>{this.tipoUsuario=s.get("usuario")})}ngOnInit(){z(I(this.firestore,"especialidades")).subscribe(o=>{this.opciones=[],o.forEach(t=>{this.opciones.push({etiqueta:t.especialidad,valor:t.especialidad})})}),this.onCheckboxChange()}executeReCaptchaV3(o){this.token=o}submitForm(){return C(this,null,function*(){this.blockUI.start("Ingresando datos a la base de datos...");let o=this.formRegistro.get("imagenes"),t=[];for(let p of o.controls)if(p.value!==""){let u=ce(this.storage,`imagenes/${p.value.name}`);yield pe(u,p.value).then(E=>C(this,null,function*(){t.push(yield me(E.ref))}))}let e=this.formRegistro.get("email")?.value,l=this.formRegistro.get("password")?.value,s=this.formRegistro.get("nombre")?.value;this.tipoUsuario==="paciente"?e&&l&&s&&this.authService.crearUsuario(e,l,t[0],s).then(p=>{this.firestoreService.agregarFirestorePaciente(this.formRegistro,t[0]).then(()=>{this.blockUI.stop(),this.savedFileNames=[],this.formRegistro.reset(),v.default.fire({title:"Registro exitoso",text:"Se ha registrado correctamente",icon:"success",confirmButtonText:"Aceptar"})})}).catch(p=>{this.blockUI.stop();let u=this.firebaseErrors(p.code);v.default.fire({title:"Error",text:u,icon:"error",confirmButtonText:"Aceptar"})}):e&&l&&s&&this.authService.crearUsuario(e,l,t[0],s).then(p=>{this.firestoreService.agregarFirestoreProfesional(this.formRegistro,t).then(()=>{this.blockUI.stop(),this.savedFileNames=[],this.formRegistro.reset(),v.default.fire({title:"Registro exitoso",text:"Se ha registrado correctamente",icon:"success",confirmButtonText:"Aceptar"})}),this.router.navigate(["/elegirusuario"])}).catch(p=>{this.blockUI.stop();let u=this.firebaseErrors(p.code);v.default.fire({title:"Error",text:u,icon:"error",confirmButtonText:"Aceptar"})})})}agregarEspecialidad(){return C(this,null,function*(){let o;this.blockUI.start("Agregando especialidad...");let t=this.formEspecialidad.get("especialidadextra")?.value;t&&(o=yield this.firestoreService.obtenerFirestoreEspecialidades(t)),o?(this.blockUI.stop(),v.default.fire({title:"Error",text:"La especialidad ya existe",icon:"error",confirmButtonText:"Aceptar"})):this.formEspecialidad.get("especialidadextra")?.value!==""?L(I(this.firestore,"especialidades"),{especialidad:this.formEspecialidad.get("especialidadextra")?.value}).then(()=>{this.blockUI.stop(),v.default.fire({title:"Especialidad agregada",text:"Se ha agregado la especialidad correctamente",icon:"success",confirmButtonText:"Aceptar"}),this.formEspecialidad.reset()}):(this.blockUI.stop(),v.default.fire({title:"Error",text:"Debe ingresar una especialidad",icon:"error",confirmButtonText:"Aceptar"}))})}onFileChange(o){let t=o.target.files;if(t){let e=this.formRegistro.get("imagenes");for(let l=0;l<t.length;l++)if(this.tipoUsuario==="paciente"){this.savedFileNames=[],e.removeAt(0);let s=t[l];this.savedFileNames.push({name:s.name}),e.push(this.formBuilder.control(s))}else if(this.tipoUsuario==="especialista"){console.log(this.savedFileNames.length),this.savedFileNames.length>1&&(this.savedFileNames.pop(),e.removeAt(1));let s=t[l];this.savedFileNames.push({name:s.name}),e.push(this.formBuilder.control(s))}}}onCheckboxChange(){this.savedFileNames=[],this.tipoUsuario==="especialista"?(this.formRegistro.get("obrasocial")?.clearValidators(),this.formRegistro.get("obrasocial")?.updateValueAndValidity(),this.formRegistro.get("especialidad")?.addValidators(m.required),this.formRegistro.get("especialidad")?.updateValueAndValidity()):(this.formRegistro.get("especialidad")?.clearValidators(),this.formRegistro.get("especialidad")?.updateValueAndValidity(),this.formRegistro.get("obrasocial")?.addValidators(m.required),this.formRegistro.get("obrasocial")?.updateValueAndValidity())}irLogin(){this.router.navigate(["/login"])}firebaseErrors(o){switch(o){case"auth/email-already-in-use":return"Direcci\xF3n de correo electr\xF3nico en uso.";case"auth/weak-password":return"contrase\xF1a debil ingrese una mas segura.";case"auth/user-not-found":return"Usuario no encontrado.";case"auth/invalid-credential":return"Credenciales invalidas.";default:return"Ocurri\xF3 un error. Por favor, int\xE9ntelo nuevamente m\xE1s tarde."}}};x.\u0275fac=function(t){return new(t||x)(R(te),R(P),R(le),R(D))},x.\u0275cmp=N({type:x,selectors:[["app-registro"]],standalone:!0,features:[V],decls:55,vars:12,consts:[[1,"full-background"],[1,"container-fluid","d-flex","justify-content-evenly","align-items-center"],[1,"card","p-4","shadow","mt-3",2,"width","30rem"],[1,"text-center","mb-4","mt-1"],[3,"ngSubmit","formGroup"],[1,"mb-3"],["for","nombre",1,"form-label"],["type","text","id","nombre","formControlName","nombre",1,"form-control"],["class","text-danger",4,"ngIf"],["type","text","id","apellido","formControlName","apellido",1,"form-control"],["for","edad",1,"form-label"],["type","number","id","edad","formControlName","edad",1,"form-control"],["for","dni",1,"form-label"],["type","text","id","dni","formControlName","dni",1,"form-control"],["class","mb-3",4,"ngIf"],["for","email",1,"form-label"],["type","email","id","email","formControlName","email",1,"form-control"],["for","password",1,"form-label"],["type","password","id","password","formControlName","password",1,"form-control"],["siteKey","6LdpHxIpAAAAAH-zYajIe3KgGwpte23vuDHQixJK",1,"d-flex","justify-content-center","align-items-center","mb-3",3,"resolved"],[1,"d-flex","justify-content-center","align-items-center"],["type","submit",1,"btn","btn-primary",3,"disabled"],["type","button",1,"btn","btn-success","ms-3",3,"click"],[1,"mb-3","card","p-4","shadow"],["for","imagenes",1,"form-label"],["type","file","id","imagenes","multiple","","accept","image/*","formControlName","imagenes",1,"form-control",3,"change"],[1,"saved-files"],["class","text-success",4,"ngFor","ngForOf"],["class","mb-3 card p-4 shadow",3,"formGroup","ngSubmit",4,"ngIf"],[1,"text-danger"],["for","obrasocial",1,"form-label"],["type","text","id","obrasocial","formControlName","obrasocial",1,"form-control"],["for","especialidad",1,"form-label"],["id","especialidad","formControlName","especialidad",1,"form-select"],[3,"value",4,"ngFor","ngForOf"],[3,"value"],[1,"text-success"],[1,"mb-3","card","p-4","shadow",3,"ngSubmit","formGroup"],["for","especialidadextra",1,"form-label"],["type","text","id","especialidadextra","formControlName","especialidadextra",1,"form-control"],["style","color: red","class","mt-2",4,"ngIf"],["type","submit",1,"btn","btn-primary","mt-3",3,"disabled"],[1,"mt-2",2,"color","red"]],template:function(t,e){if(t&1&&(r(0,"block-ui")(1,"div",0)(2,"div",1)(3,"div",2)(4,"h2",3),n(5),i(),r(6,"form",4),_("ngSubmit",function(){return e.submitForm()}),r(7,"div",5)(8,"label",6),n(9,"Nombre:"),i(),h(10,"input",7),f(11,be,2,0,"div",8),i(),r(12,"div",5)(13,"label",6),n(14,"Apellido:"),i(),h(15,"input",9),f(16,_e,2,0,"div",8),i(),r(17,"div",5)(18,"label",10),n(19,"Edad:"),i(),h(20,"input",11),f(21,xe,2,0,"div",8),i(),r(22,"div",5)(23,"label",12),n(24,"DNI:"),i(),h(25,"input",13),f(26,Ee,2,0,"div",8),i(),f(27,Se,5,1,"div",14)(28,ye,5,1,"div",14),r(29,"div",5)(30,"label",15),n(31,"Email"),i(),h(32,"input",16),i(),f(33,Ie,2,0,"div",8),r(34,"div",5)(35,"label",17),n(36,"Contrase\xF1a"),i(),h(37,"input",18),i(),r(38,"re-captcha",19),_("resolved",function(s){return e.executeReCaptchaV3(s)}),i(),r(39,"div",20)(40,"button",21),n(41," Guardar datos "),i(),r(42,"button",22),_("click",function(){return e.irLogin()}),n(43," Ir a ingreso "),i()()()(),r(44,"div")(45,"div",23)(46,"label",24),n(47,"Imagenes"),i(),r(48,"input",25),_("change",function(s){return e.onFileChange(s)}),i(),r(49,"div",26)(50,"h5"),n(51,"Archivos cargados:"),i(),r(52,"ul"),f(53,we,2,1,"li",27),i()()(),f(54,Ae,7,3,"form",28),i()()()()),t&2){let l,s,p,u,E;d(5),y(" Formulario de ",e.tipoUsuario," "),d(),c("formGroup",e.formRegistro),d(5),c("ngIf",e.formRegistro==null||(l=e.formRegistro.get("nombre"))==null||l.errors==null?null:l.errors.pattern),d(5),c("ngIf",e.formRegistro==null||(s=e.formRegistro.get("apellido"))==null||s.errors==null?null:s.errors.pattern),d(5),c("ngIf",(e.formRegistro==null||(p=e.formRegistro.get("edad"))==null||p.errors==null?null:p.errors.min)||(e.formRegistro==null||(p=e.formRegistro.get("edad"))==null||p.errors==null?null:p.errors.max)),d(5),c("ngIf",((u=e.formRegistro.get("dni"))==null||u.errors==null?null:u.errors.minlength)||((u=e.formRegistro.get("dni"))==null||u.errors==null?null:u.errors.maxlength)),d(),c("ngIf",e.tipoUsuario=="paciente"),d(),c("ngIf",e.tipoUsuario=="especialista"),d(5),c("ngIf",e.formRegistro==null||(E=e.formRegistro.get("email"))==null||E.errors==null?null:E.errors.pattern),d(7),c("disabled",!(e.formRegistro!=null&&e.formRegistro.valid)||!e.savedFileNames.length||!e.token),d(13),c("ngForOf",e.savedFileNames),d(),c("ngIf",e.tipoUsuario==="especialista")}},dependencies:[re,$,X,ee,Z,J,W,H,K,Q,Y,M,B,O,ie,ae,oe,fe,ue],styles:["[_nghost-%COMP%]{display:block;background-image:url(/assets/pattern.jpg)}.full-background[_ngcontent-%COMP%]{width:100vw;height:100vh}.saved-files[_ngcontent-%COMP%]{margin-top:20px}.text-success[_ngcontent-%COMP%]{color:green;font-weight:700}.ms-5[_ngcontent-%COMP%]{margin-left:150px!important}"]});var F=x;A([ne()],F.prototype,"blockUI",void 0);export{F as RegistroComponent};
