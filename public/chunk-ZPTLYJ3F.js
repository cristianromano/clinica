import{a as q,b as ie,d as re,e as oe,f as ne,g as ae}from"./chunk-TI77SLQM.js";import{a as B,b as j,c as a,d as L,e as z,f as G,g as h,h as Z,i as W,j as $,k as H,l as J,m as K,n as Q,o as X,p as Y,q as ee,r as te}from"./chunk-THIV2M5Z.js";import{D as P,I as U,P as D,Q as se,b as M,c as T,d as O,h as V}from"./chunk-HJSWAYP6.js";import{Ja as g,Ka as c,Ma as i,Na as t,Oa as _,Pa as C,Qa as F,Ra as n,Sa as S,Ta as N,Ua as A,Va as I,Xa as k,aa as b,d as le,ea as w,f as E,ya as d,za as x}from"./chunk-7K466J6D.js";var R=le(se());function me(r,l){r&1&&(i(0,"div",30),n(1," El nombre solo acepta letras. "),t())}function de(r,l){r&1&&(i(0,"div",30),n(1," El apellido solo acepta letras. "),t())}function ce(r,l){r&1&&(i(0,"div",30),n(1," La edad debe estar en el rango de 18 a 99. "),t())}function ue(r,l){r&1&&(i(0,"div",30),n(1," El DNI debe tener al menos 8 d\xEDgitos. "),t())}function pe(r,l){r&1&&(i(0,"div",30),n(1," la obra social debe contener texto. "),t())}function fe(r,l){if(r&1&&(i(0,"div",8)(1,"label",31),n(2,"Obra social"),t(),_(3,"input",32),g(4,pe,2,0,"div",11),t()),r&2){let p,u=F();d(4),c("ngIf",u.formRegistro==null||(p=u.formRegistro.get("obrasocial"))==null||p.errors==null?null:p.errors.pattern)}}function ge(r,l){if(r&1&&(i(0,"option",36),n(1),t()),r&2){let p=l.$implicit;c("value",p.valor),d(),S(" ",p.etiqueta," ")}}function he(r,l){if(r&1&&(i(0,"div",8)(1,"label",33),n(2,"Especialidad"),t(),i(3,"select",34),g(4,ge,2,2,"option",35),t()()),r&2){let p=F();d(4),c("ngForOf",p.opciones)}}function ve(r,l){r&1&&(i(0,"div",30),n(1," ingrese un email valido. "),t())}function _e(r,l){if(r&1&&(i(0,"li",37),n(1),t()),r&2){let p=l.$implicit;d(),S(" ",p.name," ")}}var Ve=(()=>{let l=class l{constructor(u,m,e){this.formBuilder=u,this.firestoreService=m,this.authService=e,this.opciones=[{etiqueta:"Opci\xF3n 1",valor:"opcion1"},{etiqueta:"Opci\xF3n 2",valor:"opcion2"},{etiqueta:"Opci\xF3n 3",valor:"opcion3"}],this.storage=b(ie),this.firestore=b(U),this.auth=b(P),this.storageUpload=oe(),this.savedFileNames=[],this.tipoUsuario="Paciente",this.isChecked=!1,this.router=b(V),this.formRegistro=new G({nombre:new h("",[a.required,a.pattern("[a-zA-Z ]*")]),apellido:new h("",[a.required,a.pattern("[a-zA-Z ]*")]),edad:new h("",[a.required,a.pattern("[0-9]*"),a.min(18),a.max(99)]),dni:new h("",[a.required,a.minLength(8),a.maxLength(8)]),obrasocial:new h("",[a.required,a.pattern("[a-zA-Z ]*")]),email:new h("",[a.required,a.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}")]),especialidad:new h(""),password:new h("",[a.required]),imagenes:this.formBuilder.array([])})}ngOnInit(){}submitForm(){return E(this,null,function*(){let u=this.formRegistro.get("imagenes"),m=[];for(let o of u.controls)if(o.value!==""){let f=ne(this.storage,`imagenes/${o.value.name}`);yield ae(f,o.value).then(v=>E(this,null,function*(){m.push(yield re(v.ref))}))}let e=this.formRegistro.get("email")?.value,s=this.formRegistro.get("password")?.value;this.tipoUsuario==="Paciente"?e&&s&&this.authService.crearUsuario(e,s,m[0]).then(o=>{this.firestoreService.agregarFirestorePaciente(this.formRegistro,m[0]).then(()=>{this.savedFileNames=[],this.formRegistro.reset(),R.default.fire({title:"Registro exitoso",text:"Se ha registrado correctamente",icon:"success",confirmButtonText:"Aceptar"})})}).catch(o=>{R.default.fire({title:"Error",text:o.message,icon:"error",confirmButtonText:"Aceptar"})}):e&&s&&this.authService.crearUsuario(e,s,m[0]).then(o=>{this.firestoreService.agregarFirestoreProfesional(this.formRegistro,m).then(()=>{this.savedFileNames=[],this.formRegistro.reset(),R.default.fire({title:"Registro exitoso",text:"Se ha registrado correctamente",icon:"success",confirmButtonText:"Aceptar"})})}).catch(o=>{let f=this.firebaseErrors(o.code);R.default.fire({title:"Error",text:f,icon:"error",confirmButtonText:"Aceptar"})})})}onFileChange(u){let m=u.target.files;if(m){let e=this.formRegistro.get("imagenes");for(let s=0;s<m.length;s++)if(this.tipoUsuario==="Paciente"){this.savedFileNames=[],e.removeAt(0);let o=m[s];this.savedFileNames.push({name:o.name}),e.push(this.formBuilder.control(o))}else if(this.tipoUsuario==="Profesional"){console.log(this.savedFileNames.length),this.savedFileNames.length>1&&(this.savedFileNames.pop(),e.removeAt(1));let o=m[s];this.savedFileNames.push({name:o.name}),e.push(this.formBuilder.control(o))}}}onCheckboxChange(){this.formRegistro.reset(),this.savedFileNames=[],this.isChecked?(this.tipoUsuario="Profesional",this.formRegistro.get("obrasocial")?.clearValidators(),this.formRegistro.get("obrasocial")?.updateValueAndValidity(),this.formRegistro.get("especialidad")?.addValidators(a.required),this.formRegistro.get("especialidad")?.updateValueAndValidity()):(this.tipoUsuario="Paciente",this.formRegistro.get("especialidad")?.clearValidators(),this.formRegistro.get("especialidad")?.updateValueAndValidity(),this.formRegistro.get("obrasocial")?.addValidators(a.required),this.formRegistro.get("obrasocial")?.updateValueAndValidity())}irLogin(){this.router.navigate(["/login"])}firebaseErrors(u){switch(u){case"auth/email-already-in-use":return"Direcci\xF3n de correo electr\xF3nico en uso.";case"auth/weak-password":return"contrase\xF1a debil ingrese una mas segura.";case"auth/user-not-found":return"Usuario no encontrado.";case"auth/invalid-credential":return"Credenciales invalidas.";default:return"Ocurri\xF3 un error. Por favor, int\xE9ntelo nuevamente m\xE1s tarde."}}};l.\u0275fac=function(m){return new(m||l)(x(Y),x(q),x(D))},l.\u0275cmp=w({type:l,selectors:[["app-registro"]],standalone:!0,features:[k],decls:55,vars:12,consts:[[1,"full-background"],[1,"container-fluid","d-flex","justify-content-evenly","align-items-center"],[1,"card","p-4","shadow","mt-3",2,"width","30rem"],[1,"form-check","form-switch","me-5"],["role","alert",1,"alert","alert-danger","d-flex","flex-column","justify-content-center","align-items-center"],["type","checkbox","role","switch","id","flexSwitchCheckDefault",1,"form-check-input",2,"height","30px","width","50px",3,"ngModelChange","ngModel"],[1,"text-center","mb-4","mt-1"],[3,"ngSubmit","formGroup"],[1,"mb-3"],["for","nombre",1,"form-label"],["type","text","id","nombre","formControlName","nombre",1,"form-control"],["class","text-danger",4,"ngIf"],["type","text","id","apellido","formControlName","apellido",1,"form-control"],["for","edad",1,"form-label"],["type","number","id","edad","formControlName","edad",1,"form-control"],["for","dni",1,"form-label"],["type","text","id","dni","formControlName","dni",1,"form-control"],["class","mb-3",4,"ngIf"],["for","email",1,"form-label"],["type","email","id","email","formControlName","email",1,"form-control"],["for","password",1,"form-label"],["type","password","id","password","formControlName","password",1,"form-control"],[1,"d-flex","justify-content-center","align-items-center"],["type","submit",1,"btn","btn-primary",3,"disabled"],["type","button",1,"btn","btn-success","ms-3",3,"click"],[1,"mb-3","card","p-4","shadow"],["for","imagenes",1,"form-label"],["type","file","id","imagenes","multiple","","accept","image/*","formControlName","imagenes",1,"form-control",3,"change"],[1,"saved-files"],["class","text-success",4,"ngFor","ngForOf"],[1,"text-danger"],["for","obrasocial",1,"form-label"],["type","text","id","obrasocial","formControlName","obrasocial",1,"form-control"],["for","especialidad",1,"form-label"],["id","especialidad","formControlName","especialidad",1,"form-select"],[3,"value",4,"ngFor","ngForOf"],[3,"value"],[1,"text-success"]],template:function(m,e){if(m&1&&(i(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4),n(5," Aprete para cambiar de formulario. "),i(6,"input",5),I("ngModelChange",function(o){return A(e.isChecked,o)||(e.isChecked=o),o}),C("ngModelChange",function(){return e.onCheckboxChange()}),t()()(),i(7,"h2",6),n(8),t(),i(9,"form",7),C("ngSubmit",function(){return e.submitForm()}),i(10,"div",8)(11,"label",9),n(12,"Nombre:"),t(),_(13,"input",10),g(14,me,2,0,"div",11),t(),i(15,"div",8)(16,"label",9),n(17,"Apellido:"),t(),_(18,"input",12),g(19,de,2,0,"div",11),t(),i(20,"div",8)(21,"label",13),n(22,"Edad:"),t(),_(23,"input",14),g(24,ce,2,0,"div",11),t(),i(25,"div",8)(26,"label",15),n(27,"DNI:"),t(),_(28,"input",16),g(29,ue,2,0,"div",11),t(),g(30,fe,5,1,"div",17)(31,he,5,1,"div",17),i(32,"div",8)(33,"label",18),n(34,"Email"),t(),_(35,"input",19),t(),g(36,ve,2,0,"div",11),i(37,"div",8)(38,"label",20),n(39,"Contrase\xF1a"),t(),_(40,"input",21),t(),i(41,"div",22)(42,"button",23),n(43," Guardar datos "),t(),i(44,"button",24),C("click",function(){return e.irLogin()}),n(45," Ir a ingreso "),t()()()(),i(46,"div",25)(47,"label",26),n(48,"Imagenes"),t(),i(49,"input",27),C("change",function(o){return e.onFileChange(o)}),t(),i(50,"div",28)(51,"h5"),n(52,"Archivos cargados:"),t(),i(53,"ul"),g(54,_e,2,1,"li",29),t()()()()()),m&2){let s,o,f,v,y;d(6),N("ngModel",e.isChecked),d(2),S("Formulario de ",e.tipoUsuario,""),d(),c("formGroup",e.formRegistro),d(5),c("ngIf",e.formRegistro==null||(s=e.formRegistro.get("nombre"))==null||s.errors==null?null:s.errors.pattern),d(5),c("ngIf",e.formRegistro==null||(o=e.formRegistro.get("apellido"))==null||o.errors==null?null:o.errors.pattern),d(5),c("ngIf",(e.formRegistro==null||(f=e.formRegistro.get("edad"))==null||f.errors==null?null:f.errors.min)||(e.formRegistro==null||(f=e.formRegistro.get("edad"))==null||f.errors==null?null:f.errors.max)),d(5),c("ngIf",((v=e.formRegistro.get("dni"))==null||v.errors==null?null:v.errors.minlength)||((v=e.formRegistro.get("dni"))==null||v.errors==null?null:v.errors.maxlength)),d(),c("ngIf",e.tipoUsuario=="Paciente"),d(),c("ngIf",e.tipoUsuario=="Profesional"),d(5),c("ngIf",e.formRegistro==null||(y=e.formRegistro.get("email"))==null||y.errors==null?null:y.errors.pattern),d(6),c("disabled",!(e.formRegistro!=null&&e.formRegistro.valid)||!e.savedFileNames.length),d(12),c("ngForOf",e.savedFileNames)}},dependencies:[te,W,Q,X,j,$,B,K,L,z,H,J,O,M,T,ee,Z],styles:["[_nghost-%COMP%]{display:block;background-image:url(/assets/pattern.jpg)}.full-background[_ngcontent-%COMP%]{width:100vw;height:100vh}.saved-files[_ngcontent-%COMP%]{margin-top:20px}.text-success[_ngcontent-%COMP%]{color:green;font-weight:700}.ms-5[_ngcontent-%COMP%]{margin-left:150px!important}"]});let r=l;return r})();export{Ve as RegistroComponent};