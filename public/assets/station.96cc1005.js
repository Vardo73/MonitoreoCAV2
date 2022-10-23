/*! For license information please see station.96cc1005.js.LICENSE.txt */
(()=>{"use strict";var t,e,n={4642:(t,e,n)=>{function r(t){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(t)}function o(){o=function(){return t};var t={},e=Object.prototype,n=e.hasOwnProperty,a="function"==typeof Symbol?Symbol:{},i=a.iterator||"@@iterator",l=a.asyncIterator||"@@asyncIterator",u=a.toStringTag||"@@toStringTag";function c(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(t){c=function(t,e,n){return t[e]=n}}function s(t,e,n,r){var o=e&&e.prototype instanceof h?e:h,a=Object.create(o.prototype),i=new L(r||[]);return a._invoke=function(t,e,n){var r="suspendedStart";return function(o,a){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===o)throw a;return I()}for(n.method=o,n.arg=a;;){var i=n.delegate;if(i){var l=x(i,n);if(l){if(l===f)continue;return l}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var u=d(t,e,n);if("normal"===u.type){if(r=n.done?"completed":"suspendedYield",u.arg===f)continue;return{value:u.arg,done:n.done}}"throw"===u.type&&(r="completed",n.method="throw",n.arg=u.arg)}}}(t,n,i),a}function d(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}t.wrap=s;var f={};function h(){}function p(){}function m(){}var v={};c(v,i,(function(){return this}));var y=Object.getPrototypeOf,g=y&&y(y(S([])));g&&g!==e&&n.call(g,i)&&(v=g);var b=m.prototype=h.prototype=Object.create(v);function E(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function w(t,e){function o(a,i,l,u){var c=d(t[a],t,i);if("throw"!==c.type){var s=c.arg,f=s.value;return f&&"object"==r(f)&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){o("next",t,l,u)}),(function(t){o("throw",t,l,u)})):e.resolve(f).then((function(t){s.value=t,l(s)}),(function(t){return o("throw",t,l,u)}))}u(c.arg)}var a;this._invoke=function(t,n){function r(){return new e((function(e,r){o(t,n,e,r)}))}return a=a?a.then(r,r):r()}}function x(t,e){var n=t.iterator[e.method];if(void 0===n){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,x(t,e),"throw"===e.method))return f;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return f}var r=d(n,t.iterator,e.arg);if("throw"===r.type)return e.method="throw",e.arg=r.arg,e.delegate=null,f;var o=r.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,f):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,f)}function B(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function k(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function L(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(B,this),this.reset(!0)}function S(t){if(t){var e=t[i];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,o=function e(){for(;++r<t.length;)if(n.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:I}}function I(){return{value:void 0,done:!0}}return p.prototype=m,c(b,"constructor",m),c(m,"constructor",p),p.displayName=c(m,u,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===p||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,c(t,u,"GeneratorFunction")),t.prototype=Object.create(b),t},t.awrap=function(t){return{__await:t}},E(w.prototype),c(w.prototype,l,(function(){return this})),t.AsyncIterator=w,t.async=function(e,n,r,o,a){void 0===a&&(a=Promise);var i=new w(s(e,n,r,o),a);return t.isGeneratorFunction(n)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},E(b),c(b,u,"Generator"),c(b,i,(function(){return this})),c(b,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=S,L.prototype={constructor:L,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(k),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(n,r){return i.type="throw",i.arg=t,e.next=n,r&&(e.method="next",e.arg=void 0),!!r}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],i=a.completion;if("root"===a.tryLoc)return r("end");if(a.tryLoc<=this.prev){var l=n.call(a,"catchLoc"),u=n.call(a,"finallyLoc");if(l&&u){if(this.prev<a.catchLoc)return r(a.catchLoc,!0);if(this.prev<a.finallyLoc)return r(a.finallyLoc)}else if(l){if(this.prev<a.catchLoc)return r(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return r(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,f):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),f},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),k(n),f}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;k(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:S(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=void 0),f}},t}function a(t,e,n,r,o,a,i){try{var l=t[a](i),u=l.value}catch(t){return void n(t)}l.done?e(u):Promise.resolve(u).then(r,o)}function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}n.d(e,{Z:()=>l});var l=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}var e,n,r,l,u;return e=t,n=[{key:"notificationSwal",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1e3,r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];Swal.fire({text:t,icon:e,timer:n,timerProgressBar:!0}).then((function(t){r&&location.reload()}))}},{key:"requestAxios",value:function(t,e,n){var r=this,o=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];axios({url:t,method:e,data:n}).then((function(t){o?r.notificationSwal(t.data,"success"):r.notificationSwal(t.data,"success",1e3,!1)})).catch((function(t){console.log(t),r.notificationSwal(t,"error")}))}},{key:"request",value:(l=o().mark((function t(e,n,r){var a,i=this;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,axios({url:e,method:n,data:r}).then((function(t){return t})).catch((function(t){console.log(t),i.notificationSwal(t,"error")}));case 2:return a=t.sent,t.abrupt("return",a.data);case 4:case"end":return t.stop()}}),t)})),u=function(){var t=this,e=arguments;return new Promise((function(n,r){var o=l.apply(t,e);function i(t){a(o,n,r,i,u,"next",t)}function u(t){a(o,n,r,i,u,"throw",t)}i(void 0)}))},function(t,e,n){return u.apply(this,arguments)})},{key:"validator",value:function(t){return""!=t&&-1!=t&&(console.log(t),!0)}},{key:"selectValidator",value:function(t){return"0"!=t&&(console.log(t),!0)}},{key:"pieGraph",value:function(t,e,n,r,o){var a=0,i=0,l=0;r.forEach((function(t){t<e?a++:t<n?i++:l++})),new Chart(t,{type:"pie",data:{labels:["Buenos","Malos","Muy Malos"],datasets:[{data:[a,i,l],backgroundColor:["#38B208","#FFDB00","#F90000"]}]},options:{responsive:!0,plugins:{legend:{position:"top"},title:{display:!0,text:"Horas buenas, malas y muy malas para "+o}}}})}},{key:"limitGraph",value:function(t,e,n,r,o,a){var i=[],l=[],u=[];a.forEach((function(){i.push(n),l.push(e)})),r.forEach((function(t){u.push(t)})),new Chart(t,{type:"line",data:{labels:a,datasets:[{label:"Límite NOM (ug/m^3)",data:l,fill:!1,borderColor:"#F90000",tension:.1},{label:"Límite OMS (ug/m^3)",data:i,fill:!1,borderColor:"#33B0FF",tension:.1},{label:"Niveles de contaminante "+o+" (ug/m^3)",data:u,fill:!1,borderColor:"#6AFF33",tension:.1}]},options:{responsive:!0,plugins:{legend:{position:"top"},title:{display:!0,text:"Límites permisibles para "+o}}}})}},{key:"pieGraphMonth",value:function(t,e,n,r,o){var a=0,i=0,l=0;r.forEach((function(t){t.average<e?a++:t.average<n?i++:l++})),new Chart(t,{type:"pie",data:{labels:["Buenos","Malos","Muy Malos"],datasets:[{data:[a,i,l],backgroundColor:["#38B208","#FFDB00","#F90000"]}]},options:{responsive:!0,plugins:{legend:{position:"top"},title:{display:!0,text:"Horas buenas, malas y muy malas para "+o}}}})}},{key:"limitGraphMonth",value:function(t,e,n,r,o,a){var i=[],l=[],u=[];a.forEach((function(){i.push(n),l.push(e)})),r.forEach((function(t){u.push(t.average)})),new Chart(t,{type:"line",data:{labels:a,datasets:[{label:"Límite NOM (ug/m^3)",data:l,fill:!1,borderColor:"#F90000",tension:.1},{label:"Límite OMS (ug/m^3)",data:i,fill:!1,borderColor:"#33B0FF",tension:.1},{label:"Niveles de contaminante "+o+" (ug/m^3)",data:u,fill:!1,borderColor:"#6AFF33",tension:.1}]},options:{responsive:!0,plugins:{legend:{position:"top"},title:{display:!0,text:"Límites permisibles para "+o}}}})}},{key:"frequencyDay",value:function(t,e,n){var r=[],o=[],a=[],i=[],l=[],u=[],c=[];e.forEach((function(t){switch(moment(t.created_at).format("d")){case"1":r.push(t.average);break;case"2":o.push(t.average);break;case"3":a.push(t.average);break;case"4":i.push(t.average);break;case"5":l.push(t.average);break;case"6":u.push(t.average);break;case"0":c.push(t.average)}}));var s=Math.min.apply(null,r),d=Math.min.apply(null,o),f=Math.min.apply(null,a),h=Math.min.apply(null,i),p=Math.min.apply(null,l),m=Math.min.apply(null,u),v=Math.min.apply(null,c),y=[[s,Math.max.apply(null,r)],[d,Math.max.apply(null,o)],[f,Math.max.apply(null,a)],[h,Math.max.apply(null,i)],[p,Math.max.apply(null,l)],[m,Math.max.apply(null,u)],[v,Math.max.apply(null,c)]],g=r.reduce((function(t,e){return e+t})),b=g/r.length,E=(g=o.reduce((function(t,e){return e+t})))/o.length,w=(g=a.reduce((function(t,e){return e+t})))/a.length,x=(g=i.reduce((function(t,e){return e+t})))/i.length,B=(g=l.reduce((function(t,e){return e+t})))/l.length,k=(g=u.reduce((function(t,e){return e+t})))/u.length,L=(g=c.reduce((function(t,e){return e+t})))/c.length;new Chart(t,{type:"bar",data:{labels:["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"],datasets:[{label:"Rango de valores",data:y,borderColor:"#33B0FF",backgroundColor:"#33B0FF",order:1},{label:"Promedio",data:[b,E,w,x,B,k,L],borderColor:"#6AFF33",backgroundColor:"#6AFF33",type:"line",order:0}]},options:{responsive:!0,plugins:{legend:{position:"top"},title:{display:!0,text:"Frecuencias para "+n}}}})}}],n&&i(e.prototype,n),r&&i(e,r),Object.defineProperty(e,"prototype",{writable:!1}),t}()}},r={};function o(t){var e=r[t];if(void 0!==e)return e.exports;var a=r[t]={exports:{}};return n[t](a,a.exports,o),a.exports}o.d=(t,e)=>{for(var n in e)o.o(e,n)&&!o.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},o.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),t=new(o(4642).Z),e=0,document.getElementById("btnCreateStation").addEventListener("click",(function(){var e=document.getElementById("slug").value.trim(),n=document.getElementById("name").value.trim(),r=document.getElementById("channel").value.trim(),o=document.getElementById("apikey").value.trim(),a=document.getElementById("model_id").value.trim(),i=document.getElementById("active").value.trim(),l=document.getElementById("latitude").value.trim(),u=document.getElementById("longitude").value.trim(),c=document.getElementById("suburb").value.trim();if(t.validator(n)&&t.validator(e)&&t.validator(a)&&t.validator(i)&&t.validator(c)&&t.validator(l)&&t.validator(u)&&t.validator(r)&&t.validator(o)){var s={slug:e,name:n,channel:r,apikey:o,model_id:a,active:i,suburb:c,latitude:l,longitude:u};console.log(JSON.stringify(s)),t.requestAxios("/station/store","POST",s)}else t.notificationSwal("Faltan campos por llenar.","warning")})),window.onload=function(){document.querySelectorAll(".btnDelete").forEach((function(e){e.addEventListener("click",(function(){!function(e){0!=e&&Swal.fire({title:"Está seguro de eliminar este elemento? Se borrarán los datos optenidos por ese monitor.",showCancelButton:!0,confirmButtonText:"Eliminar",denyButtonText:"Cancelar"}).then((function(n){if(n.isConfirmed){var r="station/delete",o="POST",a={id:e};t.requestAxios(r,o,a)}}))}(parseInt(e.getAttribute("name")))}))})),document.querySelectorAll(".btnEdit").forEach((function(n){n.addEventListener("click",(function(){!function(n){e=n;var r=document.getElementById("slugEdit"),o=document.getElementById("nameEdit"),a=document.getElementById("channelEdit"),i=document.getElementById("apikeyEdit"),l=document.getElementById("model_idEdit"),u=document.getElementById("activeEdit"),c=document.getElementById("latitudeEdit"),s=document.getElementById("longitudeEdit"),d=document.getElementById("suburbEdit");axios({method:"POST",url:"/station/showStation",data:{id:n}}).then((function(t){r.value=t.data.slug,o.value=t.data.name,a.value=t.data.channel,i.value=t.data.apikey,c.value=t.data.latitude,s.value=t.data.longitude,l.value=t.data.model_id,u.value=t.data.active,d.value=t.data.suburb})).catch((function(e){t.notificationSwal(e,"error")}))}(parseInt(n.getAttribute("name")))}))}))},document.getElementById("btnEditStation").addEventListener("click",(function(){var n=document.getElementById("slugEdit").value.trim(),r=document.getElementById("nameEdit").value.trim(),o=document.getElementById("channelEdit").value.trim(),a=document.getElementById("apikeyEdit").value.trim(),i=document.getElementById("model_idEdit").value.trim(),l=document.getElementById("activeEdit").value.trim(),u=document.getElementById("latitudeEdit").value.trim(),c=document.getElementById("longitudeEdit").value.trim(),s=document.getElementById("suburbEdit").value.trim();if(t.validator(r)&&t.validator(n)&&t.validator(i)&&t.validator(l)&&t.validator(s)&&t.validator(u)&&t.validator(c)&&t.validator(o)&&t.validator(a)){var d={id:e,slug:n,name:r,channel:o,apikey:a,model_id:i,active:l,suburb:s,latitude:u,longitude:c};t.requestAxios("/station/edit","POST",d)}else t.notificationSwal("Faltan campos por llenar.","warning")}))})();