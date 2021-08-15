var app=function(){"use strict";function t(){}function n(t){return t()}function e(){return Object.create(null)}function r(t){t.forEach(n)}function o(t){return"function"==typeof t}function c(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function i(t,n){t.appendChild(n)}function a(t,n,e){t.insertBefore(n,e||null)}function u(t){t.parentNode.removeChild(t)}function f(t){return document.createElement(t)}function s(){return t=" ",document.createTextNode(t);var t}function l(t,n,e,r){return t.addEventListener(n,e,r),()=>t.removeEventListener(n,e,r)}function d(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}let g;function p(t){g=t}const h=[],m=[],$=[],b=[],y=Promise.resolve();let v=!1;function w(t){$.push(t)}let _=!1;const x=new Set;function A(){if(!_){_=!0;do{for(let t=0;t<h.length;t+=1){const n=h[t];p(n),O(n.$$)}for(p(null),h.length=0;m.length;)m.pop()();for(let t=0;t<$.length;t+=1){const n=$[t];x.has(n)||(x.add(n),n())}$.length=0}while(h.length);for(;b.length;)b.pop()();v=!1,_=!1,x.clear()}}function O(t){if(null!==t.fragment){t.update(),r(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(w)}}const S=new Set;function k(t,n){t&&t.i&&(S.delete(t),t.i(n))}function E(t,e,c,i){const{fragment:a,on_mount:u,on_destroy:f,after_update:s}=t.$$;a&&a.m(e,c),i||w((()=>{const e=u.map(n).filter(o);f?f.push(...e):r(e),t.$$.on_mount=[]})),s.forEach(w)}function C(t,n){const e=t.$$;null!==e.fragment&&(r(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function D(t,n){-1===t.$$.dirty[0]&&(h.push(t),v||(v=!0,y.then(A)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function R(n,o,c,i,a,f,s,l=[-1]){const d=g;p(n);const h=n.$$={fragment:null,ctx:null,props:f,update:t,not_equal:a,bound:e(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(d?d.$$.context:o.context||[]),callbacks:e(),dirty:l,skip_bound:!1,root:o.target||d.$$.root};s&&s(h.root);let m=!1;if(h.ctx=c?c(n,o.props||{},((t,e,...r)=>{const o=r.length?r[0]:e;return h.ctx&&a(h.ctx[t],h.ctx[t]=o)&&(!h.skip_bound&&h.bound[t]&&h.bound[t](o),m&&D(n,t)),e})):[],h.update(),m=!0,r(h.before_update),h.fragment=!!i&&i(h.ctx),o.target){if(o.hydrate){const t=function(t){return Array.from(t.childNodes)}(o.target);h.fragment&&h.fragment.l(t),t.forEach(u)}else h.fragment&&h.fragment.c();o.intro&&k(n.$$.fragment),E(n,o.target,o.anchor,o.customElement),A()}p(d)}class I{$destroy(){C(this,1),this.$destroy=t}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(t){var n;this.$$set&&(n=t,0!==Object.keys(n).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function L(n){let e,r,o;return{c(){e=f("input"),d(e,"type","file"),d(e,"accept",".jpg, .jpeg, .png, .webp")},m(t,c){a(t,e,c),r||(o=l(e,"change",n[0]),r=!0)},p:t,i:t,o:t,d(t){t&&u(e),r=!1,o()}}}function j(t,n,e){let{image:r}=n;return t.$$set=t=>{"image"in t&&e(1,r=t.image)},[function(t){e(1,r=t.target.files[0])},r]}class M extends I{constructor(t){super(),R(this,t,j,L,c,{image:1})}}var N,T="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};let U=(function(t){!function(n){function e(t,n){if(!(t=o(t)))return null;var r,c,i,a=1/0;n||(n=e.DEFAULT_COLORS);for(var u=0;u<n.length;++u)c=n[u].rgb,(r=Math.pow(t.r-c.r,2)+Math.pow(t.g-c.g,2)+Math.pow(t.b-c.b,2))<a&&(a=r,i=n[u]);return i.name?{name:i.name,value:i.source,rgb:i.rgb,distance:Math.sqrt(a)}:i.source}function r(t){return t instanceof Array?t.map((function(t){return c(t)})):Object.keys(t).map((function(n){return c(t[n],n)}))}function o(t){if("object"==typeof t)return t;if(t in e.STANDARD_COLORS)return o(e.STANDARD_COLORS[t]);var n=t.match(/^#?((?:[0-9a-f]{3}){1,2})$/i);if(n)return n=3===(n=n[1]).length?[n.charAt(0)+n.charAt(0),n.charAt(1)+n.charAt(1),n.charAt(2)+n.charAt(2)]:[n.substring(0,2),n.substring(2,4),n.substring(4,6)],{r:parseInt(n[0],16),g:parseInt(n[1],16),b:parseInt(n[2],16)};var r=t.match(/^rgb\(\s*(\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d{1,3}%?)\s*\)$/i);if(r)return{r:i(r[1]),g:i(r[2]),b:i(r[3])};throw Error('"'+t+'" is not a valid color')}function c(t,n){var e,r={};if(n&&(r.name=n),"string"==typeof t)r.source=t,r.rgb=o(t);else if("object"==typeof t){if(t.source)return c(t.source,t.name);r.rgb=t,r.source="#"+a((e=t).r.toString(16))+a(e.g.toString(16))+a(e.b.toString(16))}return r}function i(t){return"%"===t.charAt(t.length-1)?Math.round(255*parseInt(t,10)/100):Number(t)}function a(t){return 1===t.length&&(t="0"+t),t}e.from=function t(n){var o=r(n),c=e,i=function(t){return c(t,o)};return i.from=t,i.or=function(t){var n=o.concat(r(t));return e.from(n)},i},e.STANDARD_COLORS={aqua:"#0ff",black:"#000",blue:"#00f",fuchsia:"#f0f",gray:"#808080",green:"#008000",lime:"#0f0",maroon:"#800000",navy:"#000080",olive:"#808000",orange:"#ffa500",purple:"#800080",red:"#f00",silver:"#c0c0c0",teal:"#008080",white:"#fff",yellow:"#ff0"},e.DEFAULT_COLORS=r(["#f00","#f80","#ff0","#0f0","#00f","#008","#808"]),e.VERSION="0.4.4",t&&t.exports?t.exports=e:n.nearestColor=e}(T)}(N={exports:{}},N.exports),N.exports).from({red:"red",black:"black",white:"white"});let q=document.createElement("canvas");document.body.appendChild(q);let B=q.getContext("2d");function F(t){let n,e,r,o,c,d,g,p;function h(n){t[2](n)}let $={};return void 0!==t[0]&&($.image=t[0]),e=new M({props:$}),m.push((()=>function(t,n,e){const r=t.$$.props[n];void 0!==r&&(t.$$.bound[r]=e,e(t.$$.ctx[r]))}(e,"image",h))),{c(){var t;n=f("main"),(t=e.$$.fragment)&&t.c(),o=s(),c=f("button"),c.textContent="Upload"},m(r,u){a(r,n,u),E(e,n,null),i(n,o),i(n,c),d=!0,g||(p=l(c,"click",t[1]),g=!0)},p(t,[n]){const o={};!r&&1&n&&(r=!0,o.image=t[0],function(t){b.push(t)}((()=>r=!1))),e.$set(o)},i(t){d||(k(e.$$.fragment,t),d=!0)},o(t){!function(t,n,e,r){if(t&&t.o){if(S.has(t))return;S.add(t),(void 0).c.push((()=>{S.delete(t),r&&(e&&t.d(1),r())})),t.o(n)}}(e.$$.fragment,t),d=!1},d(t){t&&u(n),C(e),g=!1,p()}}}function P(t,n,e){var r=this&&this.__awaiter||function(t,n,e,r){return new(e||(e=Promise))((function(o,c){function i(t){try{u(r.next(t))}catch(t){c(t)}}function a(t){try{u(r.throw(t))}catch(t){c(t)}}function u(t){var n;t.done?o(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(i,a)}u((r=r.apply(t,n||[])).next())}))};let o,c;return t.$$.update=()=>{1&t.$$.dirty&&r(void 0,void 0,void 0,(function*(){o&&(c=yield async function(t){B.clearRect(0,0,264,176),B.drawImage(await createImageBitmap(t),0,0,264,176);let n=B.getImageData(0,0,q.width,q.height);const e=n.data;for(var r=0;r<e.length;r+=4){if(e[r+3]<200)e[r]=255,e[r+1]=255,e[r+2]=255;else{const t={r:e[r],g:e[r+2],b:e[r+3]};let{r:n,g:o,b:c}=U(t).rgb;e[r]=n,e[r+1]=o,e[r+2]=c}e[r+3]=255}B.putImageData(n,0,0);let o=new Uint8Array(11616);for(r=0;r<e.length;r+=4){let t=Math.floor(r/4),n=0;n=255===e[r]?255===e[r+1]?0:2:1,o[Math.floor(t/4)]|=n<<t%4*2}return o}(o))}))},[o,function(){console.log(c[0]),console.log(c[0]>>0&3),console.log(c[0]>>2&3),console.log(c[0]>>4&3),console.log(c[0]>>6&3),fetch("/image",{method:"post",body:c})},function(t){o=t,e(0,o)}]}q.width=264,q.height=176,B.filter="contrast(5)";return new class extends I{constructor(t){super(),R(this,t,P,F,c,{})}}({target:document.body})}();
