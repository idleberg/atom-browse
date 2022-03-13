"use strict";var e=require("path"),t=require("fs"),r=require("util");function s(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}function n(e,t){return t.forEach((function(t){t&&"string"!=typeof t&&!Array.isArray(t)&&Object.keys(t).forEach((function(r){if("default"!==r&&!(r in e)){var s=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(e,r,s.get?s:{enumerable:!0,get:function(){return t[r]}})}}))})),Object.freeze(e)}var c=s(e),o=s(t),i=s(r),a={exports:{}},u={exports:{}};class l{constructor(e){this.value=e,this.next=void 0}}class f{constructor(){this.clear()}enqueue(e){const t=new l(e);this._head?(this._tail.next=t,this._tail=t):(this._head=t,this._tail=t),this._size++}dequeue(){const e=this._head;if(e)return this._head=this._head.next,this._size--,e.value}clear(){this._head=void 0,this._tail=void 0,this._size=0}get size(){return this._size}*[Symbol.iterator](){let e=this._head;for(;e;)yield e.value,e=e.next}}const y=f;const p=e=>{if(!Number.isInteger(e)&&e!==1/0||!(e>0))throw new TypeError("Expected `concurrency` to be a number from 1 and up");const t=new y;let r=0;const s=async(e,s,...n)=>{r++;const c=(async()=>e(...n))();s(c);try{await c}catch{}r--,t.size>0&&t.dequeue()()},n=(n,...c)=>new Promise((o=>{((n,c,...o)=>{t.enqueue(s.bind(null,n,c,...o)),(async()=>{await Promise.resolve(),r<e&&t.size>0&&t.dequeue()()})()})(n,o,...c)}));return Object.defineProperties(n,{activeCount:{get:()=>r},pendingCount:{get:()=>t.size},clearQueue:{value:()=>{t.clear()}}}),n};class d extends Error{constructor(e){super(),this.value=e}}const h=async(e,t)=>t(await e),w=async e=>{const t=await Promise.all(e);if(!0===t[1])throw new d(t[0]);return!1};var v=async(e,t,r)=>{r={concurrency:1/0,preserveOrder:!0,...r};const s=p(r.concurrency),n=[...e].map((e=>[e,s(h,e,t)])),c=p(r.preserveOrder?1:1/0);try{await Promise.all(n.map((e=>c(w,e))))}catch(e){if(e instanceof d)return e.value;throw e}};const x=c.default,m=o.default,{promisify:_}=i.default,b=v,g=_(m.stat),z=_(m.lstat),O={directory:"isDirectory",file:"isFile"};function S({type:e}){if(!(e in O))throw new Error(`Invalid type specified: ${e}`)}const q=(e,t)=>void 0===e||t[O[e]]();u.exports=async(e,t)=>{S(t={cwd:process.cwd(),type:"file",allowSymlinks:!0,...t});const r=t.allowSymlinks?g:z;return b(e,(async e=>{try{const s=await r(x.resolve(t.cwd,e));return q(t.type,s)}catch{return!1}}),t)},u.exports.sync=(e,t)=>{S(t={cwd:process.cwd(),allowSymlinks:!0,type:"file",...t});const r=t.allowSymlinks?m.statSync:m.lstatSync;for(const s of e)try{const e=r(x.resolve(t.cwd,s));if(q(t.type,e))return s}catch{}};var j={exports:{}};const P=o.default,{promisify:E}=i.default,k=E(P.access);j.exports=async e=>{try{return await k(e),!0}catch(e){return!1}},j.exports.sync=e=>{try{return P.accessSync(e),!0}catch(e){return!1}},function(e){const t=c.default,r=u.exports,s=j.exports,n=Symbol("findUp.stop");e.exports=async(e,s={})=>{let c=t.resolve(s.cwd||"");const{root:o}=t.parse(c),i=[].concat(e),a=async t=>{if("function"!=typeof e)return r(i,t);const s=await e(t.cwd);return"string"==typeof s?r([s],t):s};for(;;){const e=await a({...s,cwd:c});if(e===n)return;if(e)return t.resolve(c,e);if(c===o)return;c=t.dirname(c)}},e.exports.sync=(e,s={})=>{let c=t.resolve(s.cwd||"");const{root:o}=t.parse(c),i=[].concat(e),a=t=>{if("function"!=typeof e)return r.sync(i,t);const s=e(t.cwd);return"string"==typeof s?r.sync([s],t):s};for(;;){const e=a({...s,cwd:c});if(e===n)return;if(e)return t.resolve(c,e);if(c===o)return;c=t.dirname(c)}},e.exports.exists=s,e.exports.sync.exists=s.sync,e.exports.stop=n}(a);var A=a.exports,C=Object.freeze(n({__proto__:null,default:A},[a.exports]));exports.index=C;
//# sourceMappingURL=index-1d8a00fc.js.map