/*! For license information please see reportData.e05bfba0.js.LICENSE.txt */
(()=>{"use strict";var t={4642:(t,e,r)=>{function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}function o(){o=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",u=i.asyncIterator||"@@asyncIterator",c=i.toStringTag||"@@toStringTag";function l(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(t){l=function(t,e,r){return t[e]=r}}function s(t,e,r,n){var o=e&&e.prototype instanceof p?e:p,i=Object.create(o.prototype),a=new M(n||[]);return i._invoke=function(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return F()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var u=L(a,r);if(u){if(u===h)continue;return u}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var c=f(t,e,r);if("normal"===c.type){if(n=r.done?"completed":"suspendedYield",c.arg===h)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n="completed",r.method="throw",r.arg=c.arg)}}}(t,r,a),i}function f(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=s;var h={};function p(){}function d(){}function y(){}var v={};l(v,a,(function(){return this}));var m=Object.getPrototypeOf,g=m&&m(m(_([])));g&&g!==e&&r.call(g,a)&&(v=g);var w=y.prototype=p.prototype=Object.create(v);function b(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function x(t,e){function o(i,a,u,c){var l=f(t[i],t,a);if("throw"!==l.type){var s=l.arg,h=s.value;return h&&"object"==n(h)&&r.call(h,"__await")?e.resolve(h.__await).then((function(t){o("next",t,u,c)}),(function(t){o("throw",t,u,c)})):e.resolve(h).then((function(t){s.value=t,u(s)}),(function(t){return o("throw",t,u,c)}))}c(l.arg)}var i;this._invoke=function(t,r){function n(){return new e((function(e,n){o(t,r,e,n)}))}return i=i?i.then(n,n):n()}}function L(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,L(t,e),"throw"===e.method))return h;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return h}var n=f(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,h;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,h):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,h)}function E(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function k(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function M(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(E,this),this.reset(!0)}function _(t){if(t){var e=t[a];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:F}}function F(){return{value:void 0,done:!0}}return d.prototype=y,l(w,"constructor",y),l(y,"constructor",d),d.displayName=l(y,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===d||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,l(t,c,"GeneratorFunction")),t.prototype=Object.create(w),t},t.awrap=function(t){return{__await:t}},b(x.prototype),l(x.prototype,u,(function(){return this})),t.AsyncIterator=x,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new x(s(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},b(w),l(w,c,"Generator"),l(w,a,(function(){return this})),l(w,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=_,M.prototype={constructor:M,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(k),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var u=r.call(i,"catchLoc"),c=r.call(i,"finallyLoc");if(u&&c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,h):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),h},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),k(r),h}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;k(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:_(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),h}},t}function i(t,e,r,n,o,i,a){try{var u=t[i](a),c=u.value}catch(t){return void r(t)}u.done?e(c):Promise.resolve(c).then(n,o)}function a(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}r.d(e,{Z:()=>u});var u=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}var e,r,n,u,c;return e=t,r=[{key:"notificationSwal",value:function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1e3,n=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];Swal.fire({text:t,icon:e,timer:r,timerProgressBar:!0}).then((function(t){n&&location.reload()}))}},{key:"requestAxios",value:function(t,e,r){var n=this,o=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];axios({url:t,method:e,data:r}).then((function(t){o?n.notificationSwal(t.data,"success"):n.notificationSwal(t.data,"success",1e3,!1)})).catch((function(t){console.log(t),n.notificationSwal(t,"error")}))}},{key:"request",value:(u=o().mark((function t(e,r,n){var i,a=this;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,axios({url:e,method:r,data:n}).then((function(t){return t})).catch((function(t){console.log(t),a.notificationSwal(t,"error")}));case 2:return i=t.sent,t.abrupt("return",i.data);case 4:case"end":return t.stop()}}),t)})),c=function(){var t=this,e=arguments;return new Promise((function(r,n){var o=u.apply(t,e);function a(t){i(o,r,n,a,c,"next",t)}function c(t){i(o,r,n,a,c,"throw",t)}a(void 0)}))},function(t,e,r){return c.apply(this,arguments)})},{key:"validator",value:function(t){return""!=t&&-1!=t&&(console.log(t),!0)}},{key:"selectValidator",value:function(t){return"0"!=t&&(console.log(t),!0)}},{key:"pieGraph",value:function(t,e,r,n,o){var i=0,a=0,u=0;n.forEach((function(t){t<e?i++:t<r?a++:u++})),new Chart(t,{type:"pie",data:{labels:["Buenos","Malos","Muy Malos"],datasets:[{data:[i,a,u],backgroundColor:["#38B208","#FFDB00","#F90000"]}]},options:{responsive:!0,plugins:{legend:{position:"top"},title:{display:!0,text:"Horas buenas, malas y muy malas para "+o}}}})}},{key:"limitGraph",value:function(t,e,r,n,o,i){var a=[],u=[],c=[];i.forEach((function(){a.push(r),u.push(e)})),n.forEach((function(t){c.push(t)})),new Chart(t,{type:"line",data:{labels:i,datasets:[{label:"Límite NOM (ug/m^3)",data:u,fill:!1,borderColor:"#F90000",tension:.1},{label:"Límite OMS (ug/m^3)",data:a,fill:!1,borderColor:"#33B0FF",tension:.1},{label:"Niveles de contaminante "+o+" (ug/m^3)",data:c,fill:!1,borderColor:"#6AFF33",tension:.1}]},options:{responsive:!0,plugins:{legend:{position:"top"},title:{display:!0,text:"Límites permisibles para "+o}}}})}},{key:"pieGraphMonth",value:function(t,e,r,n,o){var i=0,a=0,u=0;n.forEach((function(t){t.average<e?i++:t.average<r?a++:u++})),new Chart(t,{type:"pie",data:{labels:["Buenos","Malos","Muy Malos"],datasets:[{data:[i,a,u],backgroundColor:["#38B208","#FFDB00","#F90000"]}]},options:{responsive:!0,plugins:{legend:{position:"top"},title:{display:!0,text:"Horas buenas, malas y muy malas para "+o}}}})}},{key:"limitGraphMonth",value:function(t,e,r,n,o,i){var a=[],u=[],c=[];i.forEach((function(){a.push(r),u.push(e)})),n.forEach((function(t){c.push(t.average)})),new Chart(t,{type:"line",data:{labels:i,datasets:[{label:"Límite NOM (ug/m^3)",data:u,fill:!1,borderColor:"#F90000",tension:.1},{label:"Límite OMS (ug/m^3)",data:a,fill:!1,borderColor:"#33B0FF",tension:.1},{label:"Niveles de contaminante "+o+" (ug/m^3)",data:c,fill:!1,borderColor:"#6AFF33",tension:.1}]},options:{responsive:!0,plugins:{legend:{position:"top"},title:{display:!0,text:"Límites permisibles para "+o}}}})}},{key:"frequencyDay",value:function(t,e,r){var n=[],o=[],i=[],a=[],u=[],c=[],l=[];e.forEach((function(t){switch(moment(t.created_at).format("d")){case"1":n.push(t.average);break;case"2":o.push(t.average);break;case"3":i.push(t.average);break;case"4":a.push(t.average);break;case"5":u.push(t.average);break;case"6":c.push(t.average);break;case"0":l.push(t.average)}}));var s=Math.min.apply(null,n),f=Math.min.apply(null,o),h=Math.min.apply(null,i),p=Math.min.apply(null,a),d=Math.min.apply(null,u),y=Math.min.apply(null,c),v=Math.min.apply(null,l),m=[[s,Math.max.apply(null,n)],[f,Math.max.apply(null,o)],[h,Math.max.apply(null,i)],[p,Math.max.apply(null,a)],[d,Math.max.apply(null,u)],[y,Math.max.apply(null,c)],[v,Math.max.apply(null,l)]],g=n.reduce((function(t,e){return e+t})),w=g/n.length,b=(g=o.reduce((function(t,e){return e+t})))/o.length,x=(g=i.reduce((function(t,e){return e+t})))/i.length,L=(g=a.reduce((function(t,e){return e+t})))/a.length,E=(g=u.reduce((function(t,e){return e+t})))/u.length,k=(g=c.reduce((function(t,e){return e+t})))/c.length,M=(g=l.reduce((function(t,e){return e+t})))/l.length;new Chart(t,{type:"bar",data:{labels:["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"],datasets:[{label:"Rango de valores",data:m,borderColor:"#33B0FF",backgroundColor:"#33B0FF",order:1},{label:"Promedio",data:[w,b,x,L,E,k,M],borderColor:"#6AFF33",backgroundColor:"#6AFF33",type:"line",order:0}]},options:{responsive:!0,plugins:{legend:{position:"top"},title:{display:!0,text:"Frecuencias para "+r}}}})}}],r&&a(e.prototype,r),n&&a(e,n),Object.defineProperty(e,"prototype",{writable:!1}),t}()}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var i=e[n]={exports:{}};return t[n](i,i.exports,r),i.exports}r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(){e=function(){return r};var r={},n=Object.prototype,o=n.hasOwnProperty,i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",u=i.asyncIterator||"@@asyncIterator",c=i.toStringTag||"@@toStringTag";function l(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(t){l=function(t,e,r){return t[e]=r}}function s(t,e,r,n){var o=e&&e.prototype instanceof p?e:p,i=Object.create(o.prototype),a=new M(n||[]);return i._invoke=function(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return F()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var u=L(a,r);if(u){if(u===h)continue;return u}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var c=f(t,e,r);if("normal"===c.type){if(n=r.done?"completed":"suspendedYield",c.arg===h)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n="completed",r.method="throw",r.arg=c.arg)}}}(t,r,a),i}function f(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}r.wrap=s;var h={};function p(){}function d(){}function y(){}var v={};l(v,a,(function(){return this}));var m=Object.getPrototypeOf,g=m&&m(m(_([])));g&&g!==n&&o.call(g,a)&&(v=g);var w=y.prototype=p.prototype=Object.create(v);function b(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function x(e,r){function n(i,a,u,c){var l=f(e[i],e,a);if("throw"!==l.type){var s=l.arg,h=s.value;return h&&"object"==t(h)&&o.call(h,"__await")?r.resolve(h.__await).then((function(t){n("next",t,u,c)}),(function(t){n("throw",t,u,c)})):r.resolve(h).then((function(t){s.value=t,u(s)}),(function(t){return n("throw",t,u,c)}))}c(l.arg)}var i;this._invoke=function(t,e){function o(){return new r((function(r,o){n(t,e,r,o)}))}return i=i?i.then(o,o):o()}}function L(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,L(t,e),"throw"===e.method))return h;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return h}var n=f(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,h;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,h):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,h)}function E(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function k(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function M(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(E,this),this.reset(!0)}function _(t){if(t){var e=t[a];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,n=function e(){for(;++r<t.length;)if(o.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return n.next=n}}return{next:F}}function F(){return{value:void 0,done:!0}}return d.prototype=y,l(w,"constructor",y),l(y,"constructor",d),d.displayName=l(y,c,"GeneratorFunction"),r.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===d||"GeneratorFunction"===(e.displayName||e.name))},r.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,l(t,c,"GeneratorFunction")),t.prototype=Object.create(w),t},r.awrap=function(t){return{__await:t}},b(x.prototype),l(x.prototype,u,(function(){return this})),r.AsyncIterator=x,r.async=function(t,e,n,o,i){void 0===i&&(i=Promise);var a=new x(s(t,e,n,o),i);return r.isGeneratorFunction(e)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},b(w),l(w,c,"Generator"),l(w,a,(function(){return this})),l(w,"toString",(function(){return"[object Generator]"})),r.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},r.values=_,M.prototype={constructor:M,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(k),!t)for(var e in this)"t"===e.charAt(0)&&o.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var n=this.tryEntries.length-1;n>=0;--n){var i=this.tryEntries[n],a=i.completion;if("root"===i.tryLoc)return r("end");if(i.tryLoc<=this.prev){var u=o.call(i,"catchLoc"),c=o.call(i,"finallyLoc");if(u&&c){if(this.prev<i.catchLoc)return r(i.catchLoc,!0);if(this.prev<i.finallyLoc)return r(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return r(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return r(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var i=n;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,h):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),h},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),k(r),h}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;k(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:_(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),h}},r}function n(t,e,r,n,o,i,a){try{var u=t[i](a),c=u.value}catch(t){return void r(t)}u.done?e(c):Promise.resolve(c).then(n,o)}function o(t){return function(){var e=this,r=arguments;return new Promise((function(o,i){var a=t.apply(e,r);function u(t){n(a,o,i,u,c,"next",t)}function c(t){n(a,o,i,u,c,"throw",t)}u(void 0)}))}}var i=new(r(4642).Z),a=75,u=50,c="",l=document.getElementById("IdEstacion").getAttribute("name"),s=document.getElementById("piePM2"),f=document.getElementById("piePM10"),h=document.getElementById("LimitsPM2"),p=document.getElementById("LimitsPM10");function d(){return(d=o(e().mark((function t(){var r,n,o,d,y;return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return"/data/report_day","POST",r={station_id:l,date:c},t.next=5,i.request("/data/report_day","POST",r);case 5:n=t.sent,o=[],d=[],y=[],n.forEach((function(t){o.push(t.average_pm2),d.push(t.average_pm10),y.push(moment(t.created_at).format("HH"))})),console.log(o),console.log(d),i.pieGraph(s,25,45,o,"PM 2.5"),i.pieGraph(f,u,a,d,"PM 10"),i.limitGraph(h,u,a,d,"PM 2.5",y),i.limitGraph(p,u,a,d,"PM 10",y);case 16:case"end":return t.stop()}}),t)})))).apply(this,arguments)}window.onload=function(){var t=document.getElementById("lblData");c=moment(t.innerText).format("YYYY-MM-DD"),t.innerText=moment(t.innerText).format("LL"),function(){d.apply(this,arguments)}()},document.getElementById("btnImprimir").addEventListener("click",(function(){window.print()}))})()})();