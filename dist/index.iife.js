var banotils=function(n){"use strict";function t(n){return(4294967296+n).toString(16).substring(1)}var e={normalizeInput:function(n){let t;if(n instanceof Uint8Array)t=n;else if(n instanceof Buffer)t=new Uint8Array(n);else{if("string"!=typeof n)throw new Error("Input must be an string, Buffer or Uint8Array");t=new Uint8Array(Buffer.from(n,"utf8"))}return t},toHex:function(n){return Array.prototype.map.call(n,(function(n){return(n<16?"0":"")+n.toString(16)})).join("")},debugPrint:function(n,e,r){let o="\n"+n+" = ";for(let i=0;i<e.length;i+=2){if(32===r)o+=t(e[i]).toUpperCase(),o+=" ",o+=t(e[i+1]).toUpperCase();else{if(64!==r)throw new Error("Invalid size "+r);o+=t(e[i+1]).toUpperCase(),o+=t(e[i]).toUpperCase()}i%6==4?o+="\n"+new Array(n.length+4).join(" "):i<e.length-2&&(o+=" ")}console.log(o)},testSpeed:function(n,t,e){let r=(new Date).getTime();const o=new Uint8Array(t);for(let n=0;n<t;n++)o[n]=n%256;const i=(new Date).getTime();console.log("Generated random input in "+(i-r)+"ms"),r=i;for(let i=0;i<e;i++){const e=n(o),i=(new Date).getTime(),a=i-r;r=i,console.log("Hashed in "+a+"ms: "+e.substring(0,20)+"..."),console.log(Math.round(t/(1<<20)/(a/1e3)*100)/100+" MB PER SECOND")}}};const r=e;function o(n,t,e){const r=n[t]+n[e];let o=n[t+1]+n[e+1];r>=4294967296&&o++,n[t]=r,n[t+1]=o}function i(n,t,e,r){let o=n[t]+e;e<0&&(o+=4294967296);let i=n[t+1]+r;o>=4294967296&&i++,n[t]=o,n[t+1]=i}function a(n,t){return n[t]^n[t+1]<<8^n[t+2]<<16^n[t+3]<<24}function u(n,t,e,r,a,u){const c=f[a],s=f[a+1],b=f[u],h=f[u+1];o(l,n,t),i(l,n,c,s);let d=l[r]^l[n],g=l[r+1]^l[n+1];l[r]=g,l[r+1]=d,o(l,e,r),d=l[t]^l[e],g=l[t+1]^l[e+1],l[t]=d>>>24^g<<8,l[t+1]=g>>>24^d<<8,o(l,n,t),i(l,n,b,h),d=l[r]^l[n],g=l[r+1]^l[n+1],l[r]=d>>>16^g<<16,l[r+1]=g>>>16^d<<16,o(l,e,r),d=l[t]^l[e],g=l[t+1]^l[e+1],l[t]=g>>>31^d<<1,l[t+1]=d>>>31^g<<1}const c=new Uint32Array([4089235720,1779033703,2227873595,3144134277,4271175723,1013904242,1595750129,2773480762,2917565137,1359893119,725511199,2600822924,4215389547,528734635,327033209,1541459225]),s=new Uint8Array([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,14,10,4,8,9,15,13,6,1,12,0,2,11,7,5,3,11,8,12,0,5,2,15,13,10,14,3,6,7,1,9,4,7,9,3,1,13,12,11,14,2,6,5,10,4,0,15,8,9,0,5,7,2,4,10,15,14,1,11,12,6,8,3,13,2,12,6,10,0,11,8,3,4,13,7,5,15,14,1,9,12,5,1,15,14,13,4,10,0,7,6,3,9,2,8,11,13,11,7,14,12,1,3,9,5,0,15,4,8,6,2,10,6,15,14,9,11,3,0,8,12,2,13,7,1,4,10,5,10,2,8,4,7,6,1,5,15,11,9,14,3,12,13,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,14,10,4,8,9,15,13,6,1,12,0,2,11,7,5,3].map((function(n){return 2*n}))),l=new Uint32Array(32),f=new Uint32Array(32);function b(n,t){let e=0;for(e=0;e<16;e++)l[e]=n.h[e],l[e+16]=c[e];for(l[24]=l[24]^n.t,l[25]=l[25]^n.t/4294967296,t&&(l[28]=~l[28],l[29]=~l[29]),e=0;e<32;e++)f[e]=a(n.b,4*e);for(e=0;e<12;e++)u(0,8,16,24,s[16*e+0],s[16*e+1]),u(2,10,18,26,s[16*e+2],s[16*e+3]),u(4,12,20,28,s[16*e+4],s[16*e+5]),u(6,14,22,30,s[16*e+6],s[16*e+7]),u(0,10,20,30,s[16*e+8],s[16*e+9]),u(2,12,22,24,s[16*e+10],s[16*e+11]),u(4,14,16,26,s[16*e+12],s[16*e+13]),u(6,8,18,28,s[16*e+14],s[16*e+15]);for(e=0;e<16;e++)n.h[e]=n.h[e]^l[e]^l[e+16]}function h(n,t){if(0===n||n>64)throw new Error("Illegal output length, expected 0 < length <= 64");if(t&&t.length>64)throw new Error("Illegal key, expected Uint8Array with 0 < length <= 64");const e={b:new Uint8Array(128),h:new Uint32Array(16),t:0,c:0,outlen:n};for(let n=0;n<16;n++)e.h[n]=c[n];const r=t?t.length:0;return e.h[0]^=16842752^r<<8^n,t&&(d(e,t),e.c=128),e}function d(n,t){for(let e=0;e<t.length;e++)128===n.c&&(n.t+=n.c,b(n,!1),n.c=0),n.b[n.c++]=t[e]}function g(n){for(n.t+=n.c;n.c<128;)n.b[n.c++]=0;b(n,!0);const t=new Uint8Array(n.outlen);for(let e=0;e<n.outlen;e++)t[e]=n.h[e>>2]>>8*(3&e);return t}function p(n,t,e){e=e||64,n=r.normalizeInput(n);const o=h(e,t);return d(o,n),g(o)}var y={blake2b:p,blake2bHex:function(n,t,e){const o=p(n,t,e);return r.toHex(o)},blake2bInit:h,blake2bUpdate:d,blake2bFinal:g};const w=e;function v(n,t){return n[t]^n[t+1]<<8^n[t+2]<<16^n[t+3]<<24}function x(n,t,e,r,o,i){I[n]=I[n]+I[t]+o,I[r]=A(I[r]^I[n],16),I[e]=I[e]+I[r],I[t]=A(I[t]^I[e],12),I[n]=I[n]+I[t]+i,I[r]=A(I[r]^I[n],8),I[e]=I[e]+I[r],I[t]=A(I[t]^I[e],7)}function A(n,t){return n>>>t^n<<32-t}const m=new Uint32Array([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]),k=new Uint8Array([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,14,10,4,8,9,15,13,6,1,12,0,2,11,7,5,3,11,8,12,0,5,2,15,13,10,14,3,6,7,1,9,4,7,9,3,1,13,12,11,14,2,6,5,10,4,0,15,8,9,0,5,7,2,4,10,15,14,1,11,12,6,8,3,13,2,12,6,10,0,11,8,3,4,13,7,5,15,14,1,9,12,5,1,15,14,13,4,10,0,7,6,3,9,2,8,11,13,11,7,14,12,1,3,9,5,0,15,4,8,6,2,10,6,15,14,9,11,3,0,8,12,2,13,7,1,4,10,5,10,2,8,4,7,6,1,5,15,11,9,14,3,12,13,0]),I=new Uint32Array(16),U=new Uint32Array(16);function B(n,t){let e=0;for(e=0;e<8;e++)I[e]=n.h[e],I[e+8]=m[e];for(I[12]^=n.t,I[13]^=n.t/4294967296,t&&(I[14]=~I[14]),e=0;e<16;e++)U[e]=v(n.b,4*e);for(e=0;e<10;e++)x(0,4,8,12,U[k[16*e+0]],U[k[16*e+1]]),x(1,5,9,13,U[k[16*e+2]],U[k[16*e+3]]),x(2,6,10,14,U[k[16*e+4]],U[k[16*e+5]]),x(3,7,11,15,U[k[16*e+6]],U[k[16*e+7]]),x(0,5,10,15,U[k[16*e+8]],U[k[16*e+9]]),x(1,6,11,12,U[k[16*e+10]],U[k[16*e+11]]),x(2,7,8,13,U[k[16*e+12]],U[k[16*e+13]]),x(3,4,9,14,U[k[16*e+14]],U[k[16*e+15]]);for(e=0;e<8;e++)n.h[e]^=I[e]^I[e+8]}function E(n,t){if(!(n>0&&n<=32))throw new Error("Incorrect output length, should be in [1, 32]");const e=t?t.length:0;if(t&&!(e>0&&e<=32))throw new Error("Incorrect key length, should be in [1, 32]");const r={h:new Uint32Array(m),b:new Uint8Array(64),c:0,t:0,outlen:n};return r.h[0]^=16842752^e<<8^n,e>0&&(_(r,t),r.c=64),r}function _(n,t){for(let e=0;e<t.length;e++)64===n.c&&(n.t+=n.c,B(n,!1),n.c=0),n.b[n.c++]=t[e]}function F(n){for(n.t+=n.c;n.c<64;)n.b[n.c++]=0;B(n,!0);const t=new Uint8Array(n.outlen);for(let e=0;e<n.outlen;e++)t[e]=n.h[e>>2]>>8*(3&e)&255;return t}function S(n,t,e){e=e||32,n=w.normalizeInput(n);const r=E(e,t);return _(r,n),F(r)}var C={blake2s:S,blake2sHex:function(n,t,e){const r=S(n,t,e);return w.toHex(r)},blake2sInit:E,blake2sUpdate:_,blake2sFinal:F};var G={blake2b:y.blake2b,blake2bHex:y.blake2bHex,blake2bInit:y.blake2bInit,blake2bUpdate:y.blake2bUpdate,blake2bFinal:y.blake2bFinal,blake2s:C.blake2s,blake2sHex:C.blake2sHex,blake2sInit:C.blake2sInit,blake2sUpdate:C.blake2sUpdate,blake2sFinal:C.blake2sFinal};const H=function(n){let t;const e=new Float64Array(16);if(n)for(t=0;t<n.length;t++)e[t]=n[t];return e};new Uint8Array(32)[0]=9;const R=H(),M=H([1]);H([56129,1]),H([30883,4953,19914,30187,55467,16705,2637,112,59544,30585,16505,36039,65139,11119,27886,20995]);const D=H([61785,9906,39828,60374,45398,33411,5274,224,53552,61171,33010,6542,64743,22239,55772,9222]),L=H([54554,36645,11616,51542,42930,38181,51040,26924,56412,64982,57905,49316,21502,52590,14035,8553]),T=H([26200,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214]);function P(n,t){let e;for(e=0;e<16;e++)n[e]=0|t[e]}function N(n){let t,e;for(e=0;e<16;e++)n[e]+=65536,t=Math.floor(n[e]/65536),n[(e+1)*(e<15?1:0)]+=t-1+37*(t-1)*(15===e?1:0),n[e]-=65536*t}function j(n,t,e){let r;const o=~(e-1);for(let e=0;e<16;e++)r=o&(n[e]^t[e]),n[e]^=r,t[e]^=r}function O(n,t){let e,r,o;const i=H(),a=H();for(e=0;e<16;e++)a[e]=t[e];for(N(a),N(a),N(a),r=0;r<2;r++){for(i[0]=a[0]-65517,e=1;e<15;e++)i[e]=a[e]-65535-(i[e-1]>>16&1),i[e-1]&=65535;i[15]=a[15]-32767-(i[14]>>16&1),o=i[15]>>16&1,i[14]&=65535,j(a,i,1-o)}for(e=0;e<16;e++)n[2*e]=255&a[e],n[2*e+1]=a[e]>>8}function W(n,t,e){let r;for(r=0;r<16;r++)n[r]=t[r]+e[r]|0}function V(n,t,e){let r;for(r=0;r<16;r++)n[r]=t[r]-e[r]|0}function $(n,t,e){let r,o;const i=new Float64Array(31);for(r=0;r<31;r++)i[r]=0;for(r=0;r<16;r++)for(o=0;o<16;o++)i[r+o]+=t[r]*e[o];for(r=0;r<15;r++)i[r]+=38*i[r+16];for(r=0;r<16;r++)n[r]=i[r];N(n),N(n)}function z(n,t){$(n,t,t)}function q(n,t){const e=H(),r=H(),o=H(),i=H(),a=H(),u=H(),c=H(),s=H(),l=H();V(e,n[1],n[0]),V(l,t[1],t[0]),$(e,e,l),W(r,n[0],n[1]),W(l,t[0],t[1]),$(r,r,l),$(o,n[3],t[3]),$(o,o,D),$(i,n[2],t[2]),W(i,i,i),V(a,r,e),V(u,i,o),W(c,i,o),W(s,r,e),$(n[0],a,u),$(n[1],s,c),$(n[2],c,u),$(n[3],a,s)}function K(n,t,e){let r;for(r=0;r<4;r++)j(n[r],t[r],e)}function J(n,t){const e=H(),r=H(),o=H();!function(n,t){const e=H();let r;for(r=0;r<16;r++)e[r]=t[r];for(r=253;r>=0;r--)z(e,e),2!==r&&4!==r&&$(e,e,t);for(r=0;r<16;r++)n[r]=e[r]}(o,t[2]),$(e,t[0],o),$(r,t[1],o),O(n,r),n[31]^=function(n){const t=new Uint8Array(32);return O(t,n),1&t[0]}(e)<<7}function X(n,t){const e=[H(),H(),H(),H()];P(e[0],L),P(e[1],T),P(e[2],M),$(e[3],L,T),function(n,t,e){let r,o;for(P(n[0],R),P(n[1],M),P(n[2],M),P(n[3],R),o=255;o>=0;--o)r=e[o/8|0]>>(7&o)&1,K(n,t,r),q(t,n),q(n,n),K(n,t,r)}(n,e,t)}H([41136,18958,6951,50414,58488,44335,6150,12099,55207,15867,153,11085,57099,20417,9344,11139]);const Y=n=>{const t=n.length/4*5,e=new Uint8Array(t);for(let r=1;r<=t;r++){const t=r-1,o=r%5,i=t-(r-o)/5,a=n[i-1]<<5-o,u=n[i]>>o;e[t]=(u+a)%16}return e},Q=n=>{const t=new Uint8Array(2*n.length);for(let e=0;e<n.length;e++)t[2*e]=n[e]/16|0,t[2*e+1]=n[e]%16;return t},Z=n=>{const t=n.length/2,e=new Uint8Array(t);for(let r=0;r<t;r++)e[r]=16*n[2*r]+n[2*r+1];return e},nn=n=>{const t="13456789abcdefghijkmnopqrstuwxyz".split(""),e=n.length,r=n.split(""),o=new Uint8Array(e);for(let n=0;n<e;n++)o[n]=t.indexOf(r[n]);return o},tn=n=>{const t=new Uint8Array(n.length);for(let e=0;e<n.length;e++)t[e]=parseInt(n.substr(e,1),16);return t},en=n=>{const t=n.length/5*4,e=new Uint8Array(t);for(let r=1;r<=t;r++){const o=r-1,i=r%4,a=o+(r-i)/4,u=n[a]<<i;let c;c=(t-r)%4==0?n[a-1]<<4:n[a+1]>>4-i,e[o]=(c+u)%32}return e},rn=n=>{const t="13456789abcdefghijkmnopqrstuwxyz".split("");let e="";for(let r=0;r<n.length;r++)e+=t[n[r]];return e},on=new Float64Array([237,211,245,92,26,99,18,88,214,156,247,162,222,249,222,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16]);function an(n,t){let e,r,o,i;for(r=63;r>=32;--r){for(e=0,o=r-32,i=r-12;o<i;++o)t[o]+=e-16*t[r]*on[o-(r-32)],e=t[o]+128>>8,t[o]-=256*e;t[o]+=e,t[r]=0}for(e=0,o=0;o<32;o++)t[o]+=e-(t[31]>>4)*on[o],e=t[o]>>8,t[o]&=255;for(o=0;o<32;o++)t[o]-=e*on[o];for(r=0;r<32;r++)t[r+1]+=t[r]>>8,n[r]=255&t[r]}function un(n){const t=new Float64Array(64);let e;for(e=0;e<64;e++)t[e]=n[e];for(e=0;e<64;e++)n[e]=0;an(n,t)}function cn(n){let t=new Uint8Array(64);const e=[H(),H(),H(),H()],r=new Uint8Array(32),o=G.blake2bInit(64);return G.blake2bUpdate(o,n),t=G.blake2bFinal(o),t[0]&=248,t[31]&=127,t[31]|=64,X(e,t),J(r,e),r}function sn(n){let t=n.substring(4,64);const e=(n=>{const t=n.length-1,e=new Uint8Array(t);for(let r=0;r<t;r++)e[r]=n[r+1];return e})(Y(nn(t.substring(0,52)))),r=Y(nn(t.substring(52,60))),o=Z(e),i=G.blake2b(o,null,5).reverse(),a=r,u=Q(i);if(!((n,t)=>{for(let e=0;e<n.length;e++)if(n[e]!=t[e])return!1;return!0})(a,u)){const n=rn(en(a)),t=rn(en(u));throw new Error(`Incorrect checksum ${n} != ${t}`)}return function(n){const t=new Uint8Array(n.length/2);for(let e=0;e<t.length;++e)t[e]=parseInt(n.substring(2*e+0,2*e+2),16);return t}((n=>{let t="";for(let e=0;e<n.length;e++)t+=n[e].toString(16).toUpperCase();return t})(e))}function ln(n,t){const e=new Uint8Array(64+t.length);!function(n,t,e,r){let o,i,a=new Uint8Array(64),u=new Uint8Array(64),c=new Uint8Array(64);const s=new Float64Array(64),l=[H(),H(),H(),H()],f=cn(r);let b=G.blake2bInit(64,null);G.blake2bUpdate(b,r),a=G.blake2bFinal(b),a[0]&=248,a[31]&=127,a[31]|=64;const h=e+64;for(o=0;o<e;o++)n[64+o]=t[o];for(o=0;o<32;o++)n[32+o]=a[32+o];for(b=G.blake2bInit(64,null),G.blake2bUpdate(b,n.subarray(32)),c=G.blake2bFinal(b),un(c),X(l,c),J(n,l),o=32;o<64;o++)n[o]=f[o-32];for(b=G.blake2bInit(64,null),G.blake2bUpdate(b,n),u=G.blake2bFinal(b),un(u),o=0;o<64;o++)s[o]=0;for(o=0;o<32;o++)s[o]=c[o];for(o=0;o<32;o++)for(i=0;i<32;i++)s[o+i]+=u[o]*a[i];an(n.subarray(32),s)}(e,t,t.length,n);const r=new Uint8Array(64);for(let n=0;n<r.length;n++)r[n]=e[n];return r}const fn=new RegExp("^[0123456789abcdefABCDEF]{64}$");function bn(n){const t=new Uint8Array(n.length/2);for(let e=0;e<t.length;++e)t[e]=parseInt(n.substring(2*e+0,2*e+2),16);return t}function hn(n){return Array.prototype.map.call(n,(n=>("00"+n.toString(16)).slice(-2))).join("").toUpperCase()}function dn(n,t){const e=n.toString().split(""),r=[];let o="";const i=[];for(;e.length;){let n=1*Number(e.shift());for(let t=0;n||t<r.length;++t)n+=10*(r[t]||0),r[t]=n%16,n=(n-r[t])/16}for(;r.length;)i.push(r.pop().toString(16));if(o=i.join(""),o.length%2!=0&&(o="0"+o),t>o.length/2){const n=t-o.length/2;for(let t=0;t<n;t++)o="00"+o}return o}function gn(n){return fn.test(hn(n))}function pn(n,t,e){const r=G.blake2bInit(8);G.blake2bUpdate(r,t),G.blake2bUpdate(r,n);const o=hn(G.blake2bFinal(r).reverse());return BigInt("0x"+o)>e}function yn(n){return"string"==typeof n?sn(n):cn(n)}function wn(n){return function(n){const t=Z(tn(n)),e=rn(en(Q(G.blake2b(t,null,5).reverse())));return`ban_${rn(en(tn(`0${n}`)))}${e}`}(hn(n))}var vn;!function(n){n[n.SEND=0]="SEND",n[n.RECEIVE=1]="RECEIVE"}(vn||(vn={}));function xn(n,t){let e="";for(let r=t-1;r>-1;r--)e+=(n[r]>15?"":"0")+n[r].toString(16);return e}const An=document.createElement("canvas"),mn=An.getContext("webgl2"),kn=mn.createShader(mn.VERTEX_SHADER);mn.shaderSource(kn,"#version 300 es\n  precision highp float;\n  const vec2 vertices[4] = vec2[](\n    vec2(-1, +1),\n    vec2(-1, -1),\n    vec2(+1, +1),\n    vec2(+1, -1)\n  );\n  void main() {\n    gl_Position = vec4(vertices[gl_VertexID], 0.0, 1.0);\n  }\n"),mn.compileShader(kn);const In=mn.createShader(mn.FRAGMENT_SHADER);mn.shaderSource(In,"#version 300 es\n  precision highp float;\n  precision highp int;\n\n  out vec4 fragColor;\n\n  // Random work values\n  // First 2 bytes will be overwritten by texture pixel position\n  // Second 2 bytes will be modified if the canvas size is greater than 256x256\n  uniform uvec4 uWork0;\n  // Last 4 bytes remain as generated externally\n  uniform uvec4 uWork1;\n\n  uniform uvec4 uHash0;\n  uniform uvec4 uHash1;\n\n  // Defined separately from uint v[32] below as the original value is required\n  // to calculate the second uint32 of the digest for threshold comparison\n  #define BLAKE2B_IV32_1 0x6A09E667u\n\n  // Both buffers represent 16 uint64s as 32 uint32s\n  // because that's what GLSL offers, just like Javascript\n\n  // Compression buffer, intialized to 2 instances of the initialization vector\n  // The following values have been modified from the BLAKE2B_IV:\n  // OUTLEN is constant 8 bytes\n  // v[0] ^= 0x01010000u ^ uint(OUTLEN);\n  // INLEN is constant 40 bytes: work value (8) + block hash (32)\n  // v[24] ^= uint(INLEN);\n  // It's always the \"last\" compression at this INLEN\n  // v[28] = ~v[28];\n  // v[29] = ~v[29];\n  uint v[32] = uint[32](\n    0xF2BDC900u, 0x6A09E667u, 0x84CAA73Bu, 0xBB67AE85u,\n    0xFE94F82Bu, 0x3C6EF372u, 0x5F1D36F1u, 0xA54FF53Au,\n    0xADE682D1u, 0x510E527Fu, 0x2B3E6C1Fu, 0x9B05688Cu,\n    0xFB41BD6Bu, 0x1F83D9ABu, 0x137E2179u, 0x5BE0CD19u,\n    0xF3BCC908u, 0x6A09E667u, 0x84CAA73Bu, 0xBB67AE85u,\n    0xFE94F82Bu, 0x3C6EF372u, 0x5F1D36F1u, 0xA54FF53Au,\n    0xADE682F9u, 0x510E527Fu, 0x2B3E6C1Fu, 0x9B05688Cu,\n    0x04BE4294u, 0xE07C2654u, 0x137E2179u, 0x5BE0CD19u\n  );\n  // Input data buffer\n  uint m[32];\n\n  // These are offsets into the input data buffer for each mixing step.\n  // They are multiplied by 2 from the original SIGMA values in\n  // the C reference implementation, which refered to uint64s.\n  const int SIGMA82[192] = int[192](\n    0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,28,20,8,16,18,30,26,12,2,24,\n    0,4,22,14,10,6,22,16,24,0,10,4,30,26,20,28,6,12,14,2,18,8,14,18,6,2,26,\n    24,22,28,4,12,10,20,8,0,30,16,18,0,10,14,4,8,20,30,28,2,22,24,12,16,6,\n    26,4,24,12,20,0,22,16,6,8,26,14,10,30,28,2,18,24,10,2,30,28,26,8,20,0,\n    14,12,6,18,4,16,22,26,22,14,28,24,2,6,18,10,0,30,8,16,12,4,20,12,30,28,\n    18,22,6,0,16,24,4,26,14,2,8,20,10,20,4,16,8,14,12,2,10,30,22,18,28,6,24,\n    26,0,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,28,20,8,16,18,30,26,12,\n    2,24,0,4,22,14,10,6\n  );\n\n  // 64-bit unsigned addition within the compression buffer\n  // Sets v[a,a+1] += b\n  // b0 is the low 32 bits of b, b1 represents the high 32 bits\n  void add_uint64 (int a, uint b0, uint b1) {\n    uint o0 = v[a] + b0;\n    uint o1 = v[a + 1] + b1;\n    if (v[a] > 0xFFFFFFFFu - b0) { // did low 32 bits overflow?\n      o1++;\n    }\n    v[a] = o0;\n    v[a + 1] = o1;\n  }\n  // Sets v[a,a+1] += v[b,b+1]\n  void add_uint64 (int a, int b) {\n    add_uint64(a, v[b], v[b+1]);\n  }\n\n  // G Mixing function\n  void B2B_G (int a, int b, int c, int d, int ix, int iy) {\n    add_uint64(a, b);\n    add_uint64(a, m[ix], m[ix + 1]);\n\n    // v[d,d+1] = (v[d,d+1] xor v[a,a+1]) rotated to the right by 32 bits\n    uint xor0 = v[d] ^ v[a];\n    uint xor1 = v[d + 1] ^ v[a + 1];\n    v[d] = xor1;\n    v[d + 1] = xor0;\n\n    add_uint64(c, d);\n\n    // v[b,b+1] = (v[b,b+1] xor v[c,c+1]) rotated right by 24 bits\n    xor0 = v[b] ^ v[c];\n    xor1 = v[b + 1] ^ v[c + 1];\n    v[b] = (xor0 >> 24) ^ (xor1 << 8);\n    v[b + 1] = (xor1 >> 24) ^ (xor0 << 8);\n\n    add_uint64(a, b);\n    add_uint64(a, m[iy], m[iy + 1]);\n\n    // v[d,d+1] = (v[d,d+1] xor v[a,a+1]) rotated right by 16 bits\n    xor0 = v[d] ^ v[a];\n    xor1 = v[d + 1] ^ v[a + 1];\n    v[d] = (xor0 >> 16) ^ (xor1 << 16);\n    v[d + 1] = (xor1 >> 16) ^ (xor0 << 16);\n\n    add_uint64(c, d);\n\n    // v[b,b+1] = (v[b,b+1] xor v[c,c+1]) rotated right by 63 bits\n    xor0 = v[b] ^ v[c];\n    xor1 = v[b + 1] ^ v[c + 1];\n    v[b] = (xor1 >> 31) ^ (xor0 << 1);\n    v[b + 1] = (xor0 >> 31) ^ (xor1 << 1);\n  }\n\n  void main() {\n    int i;\n    uint uv_x = uint(gl_FragCoord.x);\n    uint uv_y = uint(gl_FragCoord.y);\n    uint x_pos = uv_x % 256u;\n    uint y_pos = uv_y % 256u;\n    uint x_index = (uv_x - x_pos) / 256u;\n    uint y_index = (uv_y - y_pos) / 256u;\n\n    // First 2 work bytes are the x,y pos within the 256x256 area, the next\n    //  two bytes are modified from the random generated value, XOR'd with\n    //   the x,y area index of where this pixel is located\n    m[0] = (x_pos ^ (y_pos << 8) ^ ((uWork0.b ^ x_index) << 16) ^ ((uWork0.a ^ y_index) << 24));\n    // Remaining bytes are un-modified from the random generated value\n    m[1] = (uWork1.r ^ (uWork1.g << 8) ^ (uWork1.b << 16) ^ (uWork1.a << 24));\n\n    // Block hash\n    m[2] = uHash0[0];\n    m[3] = uHash0[1];\n    m[4] = uHash0[2];\n    m[5] = uHash0[3];\n    m[6] = uHash1[0];\n    m[7] = uHash1[1];\n    m[8] = uHash1[2];\n    m[9] = uHash1[3];\n\n    // twelve rounds of mixing\n    for(i=0;i<12;i++) {\n      B2B_G(0, 8, 16, 24, SIGMA82[i * 16 + 0], SIGMA82[i * 16 + 1]);\n      B2B_G(2, 10, 18, 26, SIGMA82[i * 16 + 2], SIGMA82[i * 16 + 3]);\n      B2B_G(4, 12, 20, 28, SIGMA82[i * 16 + 4], SIGMA82[i * 16 + 5]);\n      B2B_G(6, 14, 22, 30, SIGMA82[i * 16 + 6], SIGMA82[i * 16 + 7]);\n      B2B_G(0, 10, 20, 30, SIGMA82[i * 16 + 8], SIGMA82[i * 16 + 9]);\n      B2B_G(2, 12, 22, 24, SIGMA82[i * 16 + 10], SIGMA82[i * 16 + 11]);\n      B2B_G(4, 14, 16, 26, SIGMA82[i * 16 + 12], SIGMA82[i * 16 + 13]);\n      B2B_G(6, 8, 18, 28, SIGMA82[i * 16 + 14], SIGMA82[i * 16 + 15]);\n    }\n\n    // Threshold test, first 4 bytes not significant,\n    //  only calculate digest of the second 4 bytes\n    if((BLAKE2B_IV32_1 ^ v[1] ^ v[17]) > 0xFFFFFE00u) {\n      // Success found, return pixel data so work value can be constructed\n      fragColor = vec4(\n        float(x_index + 1u)/255., // +1 to distinguish from 0 (unsuccessful) pixels\n        float(y_index + 1u)/255., // Same as previous\n        float(x_pos)/255., // Return the 2 custom bytes used in work value\n        float(y_pos)/255.  // Second custom byte\n      );\n    }\n  }\n"),mn.compileShader(In);const Un=mn.createProgram();function Bn(n){try{return{hash:bn(n.hash)}}catch(n){}return null}mn.attachShader(Un,kn),mn.attachShader(Un,In),mn.linkProgram(Un);let En="";async function _n(n){const t=await function(n,t=1){An.width=An.height=256<<t;const e=function(n){let t="";for(let e=n.length;e>0;e-=2)t+=n.slice(e-2,e);return t}(hn(n));return mn.useProgram(Un),mn.viewport(0,0,mn.drawingBufferWidth,mn.drawingBufferHeight),mn.clearColor(0,0,0,1),mn.uniform4uiv(mn.getUniformLocation(Un,"uHash0"),new Uint32Array([parseInt(e.slice(56,64),16),parseInt(e.slice(48,56),16),parseInt(e.slice(40,48),16),parseInt(e.slice(32,40),16)])),mn.uniform4uiv(mn.getUniformLocation(Un,"uHash1"),new Uint32Array([parseInt(e.slice(24,32),16),parseInt(e.slice(16,24),16),parseInt(e.slice(8,16),16),parseInt(e.slice(0,8),16)])),new Promise((n=>{const t=new Uint8Array(4),e=new Uint8Array(4);requestAnimationFrame((function r(){crypto.getRandomValues(t),crypto.getRandomValues(e),mn.uniform4uiv(mn.getUniformLocation(Un,"uWork0"),Array.from(t)),mn.uniform4uiv(mn.getUniformLocation(Un,"uWork1"),Array.from(e)),mn.clear(mn.COLOR_BUFFER_BIT),mn.drawArrays(mn.TRIANGLE_STRIP,0,4);const o=new Uint8Array(mn.drawingBufferWidth*mn.drawingBufferHeight*4);mn.readPixels(0,0,mn.drawingBufferWidth,mn.drawingBufferHeight,mn.RGBA,mn.UNSIGNED_BYTE,o);for(let r=0;r<o.length;r+=4)if(0!==o[r]){const i=xn(e,4),a=xn(new Uint8Array([o[r+2],o[r+3],t[2]^o[r]-1,t[3]^o[r+1]-1]),4);return void n(bn(i+a))}requestAnimationFrame(r)}))}))}(n);if(!pn(n,t,0xfffffe00n))throw new Error(`Generated work '${hn(t)}' is invalid`);return t}async function Fn(n,t,e,r,o){const i=yn(n),a=await _n(t||i),u={type:"state"};return u.account=wn(i),u.previous=hn(t||new Uint8Array(32)),u.representative=wn(e),u.balance=o.toString(10),u.work=hn(a),u.link=hn(r),u.signature=hn(ln(n,function(n){let t=BigInt(n.balance).toString(16);for(;t.length<32;)t="0"+t;const e=G.blake2bInit(32,null);return G.blake2bUpdate(e,bn("0000000000000000000000000000000000000000000000000000000000000006")),G.blake2bUpdate(e,yn(n.account)),G.blake2bUpdate(e,bn(n.previous)),G.blake2bUpdate(e,yn(n.representative)),G.blake2bUpdate(e,bn(t)),G.blake2bUpdate(e,bn(n.link)),G.blake2bFinal(e)}(u))),u}function Sn(n){if(!En)throw new Error("API URL is invalid");return new Promise(((t,e)=>{const r=JSON.stringify(n);fetch(En,{method:"POST",headers:{"Content-Type":"application/json","Content-Length":String(r.length)},body:r}).then((n=>{const e=n.json();t(e)})).catch((n=>{e(n)}))}))}function Cn(n){return!!n&&!n.hasOwnProperty("error")}function Gn(n){const t=new Error("").stack.split("\n")[2].replace(/^\s+at\s+(.+?)\s.+/g,"$1"),e=t.substr(t.lastIndexOf(".")+1).trim();console.warn(`API call '${e}' failed with: '${n}'`)}async function Hn(n){const t=wn(n),e=await Sn({action:"account_info",account:t});return Cn(e)?function(n){try{return{blockCount:parseInt(n.block_count),frontier:bn(n.frontier),representativeBlock:bn(n.representative_block),modificationTimestamp:parseInt(n.modified_timestamp)}}catch(n){}return null}(e):(Gn(e.error),null)}async function Rn(n){const t=wn(n),e=await Sn({action:"accounts_balances",accounts:[t]});return Cn(e)?function(n){try{const t=Object.values(n.balances)[0];return{balance:BigInt(t.balance),pending:BigInt(t.pending)}}catch(n){}return null}(e):(Gn(e.error),null)}async function Mn(n){const t=wn(n),e=await Sn({action:"account_representative",account:t});return Cn(e)?function(n){try{return{account:sn(n.representative)}}catch(n){}return null}(e):(Gn(e.error),null)}async function Dn(n,t=-1){const e=wn(n),r=await Sn({action:"account_history",account:e,count:t,raw:!1});return Cn(r)?function(n){try{if(Array.isArray(n.history)){const t={history:[]};for(const e of n.history)t.history.push({hash:bn(e.hash),amount:BigInt(e.amount),account:sn(e.account),action:"send"===e.type?vn.SEND:vn.RECEIVE});return t}}catch(n){}return null}(r):(Gn(r.error),null)}async function Ln(n,t,e,r){const o=await Fn(n,null,t,e,r),i=await Sn({action:"process",json_block:"true",subtype:"open",block:o});return Cn(i)?Bn(i):(Gn(i.error),null)}return n.bytesToHex=hn,n.decimalToHex=dn,n.getAccountAddress=wn,n.getAccountBalance=Rn,n.getAccountHistory=Dn,n.getAccountInfo=Hn,n.getAccountPending=async function(n,t=-1){const e=wn(n),r=await Sn({action:"accounts_pending",accounts:[e],count:t,threshold:1,source:!0});return Cn(r)?function(n){try{const t={blocks:[]},e=Object.values(n.blocks)[0];for(const[n,r]of Object.entries(e)){const{amount:e,source:o}=r,i={amount:BigInt(e),hash:bn(n),source:sn(o)};t.blocks.push(i)}return t}catch(n){}return null}(r):(Gn(r.error),null)},n.getAccountRepresentative=Mn,n.getAmountFromRaw=function(n){const t=BigInt("1000000000000000000000000000"),e=BigInt("100000000000000000000000000000"),r=n/e,o=(n-r*e)/t;return r.toString()+"."+o.toString().padStart(2,"0")},n.getPrivateKey=function(n,t=0){if(!gn(n))throw new Error(`Invalid seed '${n}'`);const e=bn(dn(t,4)),r=G.blake2bInit(32);return G.blake2bUpdate(r,n),G.blake2bUpdate(r,e),G.blake2bFinal(r)},n.getPublicKey=yn,n.getRawFromAmount=function(n){const t=n.indexOf(".");let e=BigInt("1");if(-1!==t){const r=(n=n.replace(".","")).length-t;e=BigInt("10")**BigInt(r)}return BigInt(n)*BigInt("100000000000000000000000000000")/e},n.hexToBytes=bn,n.isSeedValid=gn,n.isWorkValid=pn,n.openAccount=Ln,n.receiveAccount=async function(n,t,e,r){const o=yn(n),i=await Dn(o),a=await Rn(o);if(!i||0==i.history.length)return Ln(n,t,e,r);const u=r+a.balance,c=(await Hn(o)).frontier,s=await Fn(n,c,t,e,u),l=await Sn({action:"process",json_block:"true",subtype:"receive",block:s});return Cn(l)?Bn(l):(Gn(l.error),null)},n.sendAccount=async function(n,t,e){const r=yn(n),o=await Hn(r),i=await Rn(r),a=await Mn(r),u=i.balance-e;if(i.balance<=0n||u<0n)return null;const c=o.frontier,s=await Fn(n,c,a.account,t,u),l=await Sn({action:"process",json_block:"true",subtype:"send",block:s});return Cn(l)?Bn(l):(Gn(l.error),null)},n.setAPIURL=function(n){if(!n.startsWith("https")&&!n.startsWith("http"))throw new Error("Invalid API URL");En=n},Object.defineProperty(n,"__esModule",{value:!0}),n}({});
