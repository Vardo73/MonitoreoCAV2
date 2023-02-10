/*! For license information please see station.35edeca3.js.LICENSE.txt */
(()=>{"use strict";var t={4642:(t,e,n)=>{function r(t){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(t)}function o(){o=function(){return t};var t={},e=Object.prototype,n=e.hasOwnProperty,a="function"==typeof Symbol?Symbol:{},i=a.iterator||"@@iterator",l=a.asyncIterator||"@@asyncIterator",u=a.toStringTag||"@@toStringTag";function c(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(t){c=function(t,e,n){return t[e]=n}}function d(t,e,n,r){var o=e&&e.prototype instanceof f?e:f,a=Object.create(o.prototype),i=new I(r||[]);return a._invoke=function(t,e,n){var r="suspendedStart";return function(o,a){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===o)throw a;return L()}for(n.method=o,n.arg=a;;){var i=n.delegate;if(i){var l=B(i,n);if(l){if(l===m)continue;return l}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var u=s(t,e,n);if("normal"===u.type){if(r=n.done?"completed":"suspendedYield",u.arg===m)continue;return{value:u.arg,done:n.done}}"throw"===u.type&&(r="completed",n.method="throw",n.arg=u.arg)}}}(t,n,i),a}function s(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}t.wrap=d;var m={};function f(){}function h(){}function p(){}var v={};c(v,i,(function(){return this}));var y=Object.getPrototypeOf,g=y&&y(y(S([])));g&&g!==e&&n.call(g,i)&&(v=g);var E=p.prototype=f.prototype=Object.create(v);function b(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function w(t,e){function o(a,i,l,u){var c=s(t[a],t,i);if("throw"!==c.type){var d=c.arg,m=d.value;return m&&"object"==r(m)&&n.call(m,"__await")?e.resolve(m.__await).then((function(t){o("next",t,l,u)}),(function(t){o("throw",t,l,u)})):e.resolve(m).then((function(t){d.value=t,l(d)}),(function(t){return o("throw",t,l,u)}))}u(c.arg)}var a;this._invoke=function(t,n){function r(){return new e((function(e,r){o(t,n,e,r)}))}return a=a?a.then(r,r):r()}}function B(t,e){var n=t.iterator[e.method];if(void 0===n){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,B(t,e),"throw"===e.method))return m;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return m}var r=s(n,t.iterator,e.arg);if("throw"===r.type)return e.method="throw",e.arg=r.arg,e.delegate=null,m;var o=r.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,m):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,m)}function x(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function k(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function I(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(x,this),this.reset(!0)}function S(t){if(t){var e=t[i];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,o=function e(){for(;++r<t.length;)if(n.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:L}}function L(){return{value:void 0,done:!0}}return h.prototype=p,c(E,"constructor",p),c(p,"constructor",h),h.displayName=c(p,u,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===h||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,p):(t.__proto__=p,c(t,u,"GeneratorFunction")),t.prototype=Object.create(E),t},t.awrap=function(t){return{__await:t}},b(w.prototype),c(w.prototype,l,(function(){return this})),t.AsyncIterator=w,t.async=function(e,n,r,o,a){void 0===a&&(a=Promise);var i=new w(d(e,n,r,o),a);return t.isGeneratorFunction(n)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},b(E),c(E,u,"Generator"),c(E,i,(function(){return this})),c(E,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=S,I.prototype={constructor:I,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(k),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(n,r){return i.type="throw",i.arg=t,e.next=n,r&&(e.method="next",e.arg=void 0),!!r}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],i=a.completion;if("root"===a.tryLoc)return r("end");if(a.tryLoc<=this.prev){var l=n.call(a,"catchLoc"),u=n.call(a,"finallyLoc");if(l&&u){if(this.prev<a.catchLoc)return r(a.catchLoc,!0);if(this.prev<a.finallyLoc)return r(a.finallyLoc)}else if(l){if(this.prev<a.catchLoc)return r(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return r(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,m):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),m},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),k(n),m}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;k(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:S(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=void 0),m}},t}function a(t,e,n,r,o,a,i){try{var l=t[a](i),u=l.value}catch(t){return void n(t)}l.done?e(u):Promise.resolve(u).then(r,o)}function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}n.d(e,{Z:()=>l});var l=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}var e,n,r,l,u;return e=t,n=[{key:"notificationSwal",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1e3,r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];Swal.fire({text:t,icon:e,timer:n,timerProgressBar:!0}).then((function(t){r&&location.reload()}))}},{key:"requestAxiosFile",value:function(t,e,n){var r=this,o=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];axios({url:t,method:e,data:n,headers:{"Content-Type":"multipart/form-data"}}).then((function(t){o?r.notificationSwal(t.data,"success"):r.notificationSwal(t.data,"success",1e3,!1)})).catch((function(t){console.log(t),r.notificationSwal(t,"error")}))}},{key:"requestAxios",value:function(t,e,n){var r=this,o=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];axios({url:t,method:e,data:n}).then((function(t){o?r.notificationSwal(t.data,"success"):r.notificationSwal(t.data,"success",1e3,!1)})).catch((function(t){console.log(t),r.notificationSwal(t,"error")}))}},{key:"request",value:(l=o().mark((function t(e,n,r){var a,i=this;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,axios({url:e,method:n,data:r}).then((function(t){return t})).catch((function(t){console.log(t),i.notificationSwal(t,"error")}));case 2:return a=t.sent,t.abrupt("return",a.data);case 4:case"end":return t.stop()}}),t)})),u=function(){var t=this,e=arguments;return new Promise((function(n,r){var o=l.apply(t,e);function i(t){a(o,n,r,i,u,"next",t)}function u(t){a(o,n,r,i,u,"throw",t)}i(void 0)}))},function(t,e,n){return u.apply(this,arguments)})},{key:"validator",value:function(t){return""!=t&&-1!=t&&(console.log(t),!0)}},{key:"selectValidator",value:function(t){return"0"!=t&&(console.log(t),!0)}},{key:"pieGraph",value:function(t,e,n,r,o){var a=0,i=0,l=0;r.forEach((function(t){t<e?a++:t<n?i++:l++})),new Chart(t,{type:"pie",data:{labels:["Buenos","Malos","Muy Malos"],datasets:[{data:[a,i,l],backgroundColor:["#38B208","#FFDB00","#F90000"]}]},options:{responsive:!0,plugins:{legend:{position:"top"},title:{display:!0,text:"Horas buenas, malas y muy malas para "+o}}}})}},{key:"limitGraph",value:function(t,e,n,r,o,a){var i=[],l=[],u=[];a.forEach((function(){i.push(n),l.push(e)})),r.forEach((function(t){u.push(t)})),new Chart(t,{type:"line",data:{labels:a,datasets:[{label:"Límite NOM (ug/m^3)",data:l,fill:!1,borderColor:"#F90000",tension:.1},{label:"Límite OMS (ug/m^3)",data:i,fill:!1,borderColor:"#33B0FF",tension:.1},{label:"Niveles de contaminante "+o+" (ug/m^3)",data:u,fill:!1,borderColor:"#6AFF33",tension:.1}]},options:{responsive:!0,plugins:{legend:{position:"top"},title:{display:!0,text:"Límites permisibles para "+o}}}})}},{key:"pieGraphMonth",value:function(t,e,n,r,o){var a=0,i=0,l=0;r.forEach((function(t){t.average<e?a++:t.average<n?i++:l++})),new Chart(t,{type:"pie",data:{labels:["Buenos","Malos","Muy Malos"],datasets:[{data:[a,i,l],backgroundColor:["#38B208","#FFDB00","#F90000"]}]},options:{responsive:!0,plugins:{legend:{position:"top"},title:{display:!0,text:"Horas buenas, malas y muy malas para "+o}}}})}},{key:"limitGraphMonth",value:function(t,e,n,r,o,a){var i=[],l=[],u=[];a.forEach((function(){i.push(n),l.push(e)})),r.forEach((function(t){u.push(t.average)})),new Chart(t,{type:"line",data:{labels:a,datasets:[{label:"Límite NOM (ug/m^3)",data:l,fill:!1,borderColor:"#F90000",tension:.1},{label:"Límite OMS (ug/m^3)",data:i,fill:!1,borderColor:"#33B0FF",tension:.1},{label:"Niveles de contaminante "+o+" (ug/m^3)",data:u,fill:!1,borderColor:"#6AFF33",tension:.1}]},options:{responsive:!0,plugins:{legend:{position:"top"},title:{display:!0,text:"Límites permisibles para "+o}}}})}},{key:"frequencyDay",value:function(t,e,n){var r=[],o=[],a=[],i=[],l=[],u=[],c=[];e.forEach((function(t){switch(moment(t.created_at).format("d")){case"1":r.push(t.average);break;case"2":o.push(t.average);break;case"3":a.push(t.average);break;case"4":i.push(t.average);break;case"5":l.push(t.average);break;case"6":u.push(t.average);break;case"0":c.push(t.average)}}));var d=Math.min.apply(null,r),s=Math.min.apply(null,o),m=Math.min.apply(null,a),f=Math.min.apply(null,i),h=Math.min.apply(null,l),p=Math.min.apply(null,u),v=Math.min.apply(null,c),y=[[d,Math.max.apply(null,r)],[s,Math.max.apply(null,o)],[m,Math.max.apply(null,a)],[f,Math.max.apply(null,i)],[h,Math.max.apply(null,l)],[p,Math.max.apply(null,u)],[v,Math.max.apply(null,c)]],g=r.reduce((function(t,e){return e+t})),E=g/r.length,b=(g=o.reduce((function(t,e){return e+t})))/o.length,w=(g=a.reduce((function(t,e){return e+t})))/a.length,B=(g=i.reduce((function(t,e){return e+t})))/i.length,x=(g=l.reduce((function(t,e){return e+t})))/l.length,k=(g=u.reduce((function(t,e){return e+t})))/u.length,I=(g=c.reduce((function(t,e){return e+t})))/c.length;new Chart(t,{type:"bar",data:{labels:["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"],datasets:[{label:"Rango de valores",data:y,borderColor:"#33B0FF",backgroundColor:"#33B0FF",order:1},{label:"Promedio",data:[E,b,w,B,x,k,I],borderColor:"#6AFF33",backgroundColor:"#6AFF33",type:"line",order:0}]},options:{responsive:!0,plugins:{legend:{position:"top"},title:{display:!0,text:"Frecuencias para "+n}}}})}}],n&&i(e.prototype,n),r&&i(e,r),Object.defineProperty(e,"prototype",{writable:!1}),t}()}},e={};function n(r){var o=e[r];if(void 0!==o)return o.exports;var a=e[r]={exports:{}};return t[r](a,a.exports,n),a.exports}n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t=new(n(4642).Z),e=0;function r(e,n){var r={id:e,bool:n};t.requestAxios("station/active","POST",r)}document.getElementById("btnCancelStation").addEventListener("click",(function(){document.getElementById("slug").value="",document.getElementById("name").value="",document.getElementById("apikey").value="",document.getElementById("model_id").value="",document.getElementById("active").value="",document.getElementById("latitude").value="",document.getElementById("longitude").value="",document.getElementById("suburb").value="",document.getElementsByName("check").forEach((function(t){t.checked=!1}))})),document.getElementById("btnCancelStationEdit").addEventListener("click",(function(){document.getElementById("slugEdit").value="",document.getElementById("nameEdit").value="",document.getElementById("apikeyEdit").value="",document.getElementById("model_idEdit").value="",document.getElementById("activeEdit").value="",document.getElementById("latitudeEdit").value="",document.getElementById("longitudeEdit").value="",document.getElementById("suburbEdit").value="",document.getElementsByName("checkEditSponsor").forEach((function(t){t.checked=!1}))})),document.getElementById("btnCreateStation").addEventListener("click",(function(){var e=document.getElementById("slug").value.trim(),n=document.getElementById("name").value.trim(),r=document.getElementById("apikey").value.trim(),o=document.getElementById("model_id").value.trim(),a=document.getElementById("active").value.trim(),i=document.getElementById("latitude").value.trim(),l=document.getElementById("longitude").value.trim(),u=document.getElementById("suburb").value.trim();if(t.validator(n)&&t.validator(e)&&t.validator(o)&&t.validator(a)&&t.validator(u)&&t.validator(i)&&t.validator(l)&&t.validator(r)){var c=document.getElementsByName("checkSponsor"),d=[],s=0;if(c.forEach((function(t){t.checked&&(d.push(t.value),s++)})),s<1){return t.notificationSwal("Debe seleccionar al menos un patrocinador.","warning"),!1}var m={slug:e,name:n,apikey:r,model_id:o,active:a,suburb:u,latitude:i,longitude:l,sponsors:d};t.requestAxios("/station/store","POST",m)}else t.notificationSwal("Faltan campos por llenar.","warning")})),window.onload=function(){document.querySelectorAll(".btnDelete").forEach((function(e){e.addEventListener("click",(function(){!function(e){0!=e&&Swal.fire({title:"Está seguro de eliminar este elemento? Se borrarán los datos optenidos por ese monitor.",showCancelButton:!0,confirmButtonText:"Eliminar",denyButtonText:"Cancelar"}).then((function(n){if(n.isConfirmed){var r="station/delete",o="POST",a={id:e};t.requestAxios(r,o,a)}}))}(parseInt(e.getAttribute("name")))}))})),document.querySelectorAll(".btnEdit").forEach((function(n){n.addEventListener("click",(function(){!function(n){e=n;var r=document.getElementById("slugEdit"),o=document.getElementById("nameEdit"),a=document.getElementById("apikeyEdit"),i=document.getElementById("model_idEdit"),l=document.getElementById("activeEdit"),u=document.getElementById("latitudeEdit"),c=document.getElementById("longitudeEdit"),d=document.getElementById("suburbEdit"),s=document.getElementsByName("checkEditSponsor");axios({method:"POST",url:"/station/showStation",data:{id:n}}).then((function(t){r.value=t.data[0].slug,o.value=t.data[0].name,a.value=t.data[0].apikey,u.value=t.data[0].latitude,c.value=t.data[0].longitude,i.value=t.data[0].model_id,l.value=t.data[0].active,d.value=t.data[0].suburb,s.forEach((function(e){t.data[1].forEach((function(t){e.value==t.sponsor_id&&(e.checked=!0)}))}))})).catch((function(e){t.notificationSwal(e,"error")}))}(parseInt(n.getAttribute("name")))}))})),document.querySelectorAll(".SwitchActive").forEach((function(t){t.addEventListener("change",(function(){var e=parseInt(t.getAttribute("name"));t.checked?r(e,!0):r(e,!1)}))}))},document.getElementById("btnEditStation").addEventListener("click",(function(){var n=document.getElementById("slugEdit").value.trim(),r=document.getElementById("nameEdit").value.trim(),o=document.getElementById("apikeyEdit").value.trim(),a=document.getElementById("model_idEdit").value.trim(),i=document.getElementById("activeEdit").value.trim(),l=document.getElementById("latitudeEdit").value.trim(),u=document.getElementById("longitudeEdit").value.trim(),c=document.getElementById("suburbEdit").value.trim(),d=document.getElementsByName("checkEditSponsor");console.log(d);var s=[],m=0;if(d.forEach((function(t){t.checked&&(s.push(t.value),m++)})),console.log(s),m<1){return t.notificationSwal("Debe seleccionar al menos un patrocinador.","warning"),!1}if(t.validator(r)&&t.validator(n)&&t.validator(a)&&t.validator(i)&&t.validator(c)&&t.validator(l)&&t.validator(u)&&t.validator(o)){var f={id:e,slug:n,name:r,apikey:o,model_id:a,active:i,suburb:c,latitude:l,longitude:u,sponsors:s};t.requestAxios("/station/edit","POST",f)}else t.notificationSwal("Faltan campos por llenar.","warning")}))})()})();