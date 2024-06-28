import{g as R}from"./chunk-CHILJPBX.js";import{$ as a,Ba as A,G as x,Ha as d,Na as m,Va as I,Y as y,Z as l,ba as o,ga as j,ha as f,l as u,m as E,w,wa as C,xa as p}from"./chunk-CPSHSAPU.js";var D=new a("recaptcha-language"),B=new a("recaptcha-base-url"),M=new a("recaptcha-nonce-tag"),k=new a("recaptcha-settings"),S=new a("recaptcha-v3-site-key"),L=new a("recaptcha-loader-options");function T(n,e,b,{url:i,lang:t,nonce:r}={}){window.ng2recaptchaloaded=()=>{b(grecaptcha)};let s=document.createElement("script");s.innerHTML="";let{url:c,nonce:v}=e(new URL(i||"https://www.google.com/recaptcha/api.js"));c.searchParams.set("render",n==="explicit"?n:n.key),c.searchParams.set("onload","ng2recaptchaloaded"),c.searchParams.set("trustedtypes","true"),t&&c.searchParams.set("hl",t),s.src=c.href;let h=v||r;h&&s.setAttribute("nonce",h),s.async=!0,s.defer=!0,document.head.appendChild(s)}function N({v3SiteKey:n,onBeforeLoad:e,onLoaded:b}){let i=n?{key:n}:"explicit";O.loadScript(i,e,b)}var O={loadScript:T,newLoadScript:N};function z(n){return n.asObservable().pipe(x(e=>e!==null))}var g=(()=>{let e=class e{constructor(i,t,r,s,c,v){this.platformId=i,this.language=t,this.baseUrl=r,this.nonce=s,this.v3SiteKey=c,this.options=v;let h=this.init();this.ready=h?z(h):w()}init(){if(e.ready)return e.ready;if(!R(this.platformId))return;let i=new E(null);return e.ready=i,O.newLoadScript({v3SiteKey:this.v3SiteKey,onBeforeLoad:t=>{if(this.options?.onBeforeLoad)return this.options.onBeforeLoad(t);let r=new URL(this.baseUrl??t);return this.language&&r.searchParams.set("hl",this.language),{url:r,nonce:this.nonce}},onLoaded:t=>{let r=t;this.options?.onLoaded&&(r=this.options.onLoaded(t)),i.next(r)}}),i}};e.ready=null,e.\u0275fac=function(t){return new(t||e)(o(A),o(D,8),o(B,8),o(M,8),o(S,8),o(L,8))},e.\u0275prov=y({token:e,factory:e.\u0275fac});let n=e;return n})(),P=0,oe=(()=>{let e=class e{constructor(i,t,r,s){this.elementRef=i,this.loader=t,this.zone=r,this.id=`ngrecaptcha-${P++}`,this.errorMode="default",this.resolved=new p,this.error=new p,this.errored=new p,s&&(this.siteKey=s.siteKey,this.theme=s.theme,this.type=s.type,this.size=s.size,this.badge=s.badge)}ngAfterViewInit(){this.subscription=this.loader.ready.subscribe(i=>{i!=null&&i.render instanceof Function&&(this.grecaptcha=i,this.renderRecaptcha())})}ngOnDestroy(){this.grecaptchaReset(),this.subscription&&this.subscription.unsubscribe()}execute(){this.size==="invisible"&&(this.widget!=null?this.grecaptcha.execute(this.widget):this.executeRequested=!0)}reset(){this.widget!=null&&(this.grecaptcha.getResponse(this.widget)&&this.resolved.emit(null),this.grecaptchaReset())}get __unsafe_widgetValue(){return this.widget!=null?this.grecaptcha.getResponse(this.widget):null}expired(){this.resolved.emit(null)}onError(i){this.error.emit(i),this.errored.emit(i)}captchaResponseCallback(i){this.resolved.emit(i)}grecaptchaReset(){this.widget!=null&&this.zone.runOutsideAngular(()=>this.grecaptcha.reset(this.widget))}renderRecaptcha(){let i={badge:this.badge,callback:t=>{this.zone.run(()=>this.captchaResponseCallback(t))},"expired-callback":()=>{this.zone.run(()=>this.expired())},sitekey:this.siteKey,size:this.size,tabindex:this.tabIndex,theme:this.theme,type:this.type};this.errorMode==="handled"&&(i["error-callback"]=(...t)=>{this.zone.run(()=>this.onError(t))}),this.widget=this.grecaptcha.render(this.elementRef.nativeElement,i),this.executeRequested===!0&&(this.executeRequested=!1,this.execute())}};e.\u0275fac=function(t){return new(t||e)(d(C),d(g),d(m),d(k,8))},e.\u0275cmp=j({type:e,selectors:[["re-captcha"]],hostVars:1,hostBindings:function(t,r){t&2&&I("id",r.id)},inputs:{id:"id",siteKey:"siteKey",theme:"theme",type:"type",size:"size",tabIndex:"tabIndex",badge:"badge",errorMode:"errorMode"},outputs:{resolved:"resolved",error:"error",errored:"errored"},exportAs:["reCaptcha"],decls:0,vars:0,template:function(t,r){},encapsulation:2});let n=e;return n})(),H=(()=>{let e=class e{};e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=f({type:e}),e.\u0275inj=l({});let n=e;return n})(),ce=(()=>{let e=class e{};e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=f({type:e}),e.\u0275inj=l({providers:[g],imports:[H]});let n=e;return n})(),F=(()=>{let e=class e{constructor(i,t,r){this.recaptchaLoader=t,this.zone=i,this.siteKey=r,this.init()}get onExecute(){return this.onExecuteSubject||(this.onExecuteSubject=new u,this.onExecuteObservable=this.onExecuteSubject.asObservable()),this.onExecuteObservable}get onExecuteError(){return this.onExecuteErrorSubject||(this.onExecuteErrorSubject=new u,this.onExecuteErrorObservable=this.onExecuteErrorSubject.asObservable()),this.onExecuteErrorObservable}execute(i){let t=new u;return this.grecaptcha?this.executeActionWithSubject(i,t):(this.actionBacklog||(this.actionBacklog=[]),this.actionBacklog.push([i,t])),t.asObservable()}executeActionWithSubject(i,t){let r=s=>{this.zone.run(()=>{t.error(s),this.onExecuteErrorSubject&&this.onExecuteErrorSubject.next({action:i,error:s})})};this.zone.runOutsideAngular(()=>{try{this.grecaptcha.execute(this.siteKey,{action:i}).then(s=>{this.zone.run(()=>{t.next(s),t.complete(),this.onExecuteSubject&&this.onExecuteSubject.next({action:i,token:s})})},r)}catch(s){r(s)}})}init(){this.recaptchaLoader.ready.subscribe(i=>{this.grecaptcha=i,this.actionBacklog&&this.actionBacklog.length>0&&(this.actionBacklog.forEach(([t,r])=>this.executeActionWithSubject(t,r)),this.actionBacklog=void 0)})}};e.\u0275fac=function(t){return new(t||e)(o(m),o(g),o(S))},e.\u0275prov=y({token:e,factory:e.\u0275fac});let n=e;return n})(),ae=(()=>{let e=class e{};e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=f({type:e}),e.\u0275inj=l({providers:[F,g]});let n=e;return n})();export{k as a,S as b,oe as c,ce as d,F as e,ae as f};
