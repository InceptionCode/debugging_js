!function(e){var t={};function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:a})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){"use strict";e.exports={LIST:[{id:1,name:"Darrell"},{id:2,name:"Kevin"}]}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,r=(a=n(0))&&a.__esModule?a:{default:a};t.default={addToList:e=>{let t={id:r.default.LIST.slice().pop().id+1,name:e};r.default.LIST.push(t)},deleteFromList:e=>{const t=r.default.LIST.filter(t=>t.name!==e);r.default.LIST=t}}},function(e,t,n){"use strict";d(n(7));var a=n(0),r=d(n(1));function d(e){return e&&e.__esModule?e:{default:e}}const i=document.querySelector('ul[data-id="people-display"]'),o=document.querySelector('button[data-id="addPerson"]'),u=document.querySelector("input");function l(e){const t=document.createElement("li"),n={name:e,spanName:document.createElement("span"),spanDelete:document.createElement("span"),spanEdit:document.createElement("span")},{spanName:a,spanDelete:r,spanEdit:d}=function({name:e,spanDelete:t,spanEdit:n,spanName:a}){return a.innerHTML=e,t.innerHTML=" x",t.setAttribute("data-id","deletePerson"),n.innerHTML=" e",n.setAttribute("data-id","editPerson"),t.addEventListener("click",c),n.addEventListener("click",s),{spanName:a,spanDelete:t,spanEdit:n}}(n);return t.appendChild(a),t.appendChild(r),t.appendChild(d),t}function c(e){let t=e.target.parentNode;const n=t.children[0].innerHTML;r.default.deleteFromList(n),t.remove()}function s(e){let t=e.target.parentNode.children[0];c(e),u.value=t.innerHTML}a.LIST.forEach(e=>{const t=l(e.name);i.appendChild(t)}),o.addEventListener("click",function(){const e=u.value,t=l(e);i.appendChild(t),r.default.addToList(e),u.value=""})},,,,,function(e,t){}]);