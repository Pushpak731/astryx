import{i as e,s as t}from"./preload-helper-CT_b8DTk.js";import{t as n}from"./react-B7Te67-h.js";import{t as r}from"./jsx-runtime-DqZldVDK.js";import{t as i}from"./Text-BsKv-syz.js";import{t as a}from"./Button-DA0IvI_z.js";import{t as o}from"./Button-CdztB0UK.js";import{t as s}from"./Text-_U_Unoi1.js";import{o as c,t as l}from"./Link-CckA_OXG.js";import{$r as u,Br as d,Gr as f,Hr as ee,Jr as p,Kr as te,Lr as ne,Qr as re,Rr as m,Ur as ie,Vr as ae,Wr as h,Xr as oe,Yr as se,Zr as ce,gi as le,mi as ue,qr as g,vi as de}from"./iframe-C_-I7RLe.js";function fe(e,t){if(typeof e!=`object`||!e)return e;let n=t?.get(e);if(n!=null)return n;if(Array.isArray(e)){let n=[];t??=new Map,t.set(e,n);for(let r of e)n.push(fe(r,t));return n}if(Object.getPrototypeOf(e)!==Object.prototype)return e;let r={},i=t;for(let t in e){let n=e[t];typeof n==`object`&&n?(i===void 0&&(i=new Map,i.set(e,r)),r[t]=fe(n,i)):r[t]=n}return r}function pe(e,t,n){if(!n||t>=e.length)return t+1;let r=e.charCodeAt(t);if(r<55296||r>56319||t+1>=e.length)return t+1;let i=e.charCodeAt(t+1);return i>=56320&&i<=57343?t+2:t+1}function me(e,t,n,r,i){let a=t.pattern.ignoreCase?void 0:t.requiredSubstrings;if(a!=null&&!a.some(t=>e.includes(t)))return null;let o=i.busy?new RegExp(t.pattern.source,t.pattern.flags):i.pattern,s=o!==i.pattern;s||(i.busy=!0),o.lastIndex=0;let c=[],l=0,u=!1,d;for(;(d=o.exec(e))!=null;){let i=d.index,a=i+d[0].length,s=t.getEndIndex?.(e,d)??a;if(s===!1){d[0].length===0&&(o.lastIndex=pe(e,o.lastIndex,o.unicode||o.flags.includes(`v`)));continue}if(!Number.isInteger(s)||s<a||s<i||s>e.length)throw TypeError(`Markdown text transform returned an invalid end index`);if(i<l)continue;i>l&&c.push({type:`text`,value:e.slice(l,i)});let f=t.replace(d,{parentType:n});if(Array.isArray(f)){let e=[];for(let t of f)e.push(be.has(t)?fe(t):t);ie(e,r);for(let t of e)be.add(t);c.push(...e)}else{let e=f,t=be.has(e)?fe(e):e;ee(t,r),be.add(t),c.push(t)}l=s,o.lastIndex=s===i?pe(e,o.lastIndex,o.unicode||o.flags.includes(`v`)):Math.max(o.lastIndex,s),u=!0}return s||(i.busy=!1),u?(l<e.length&&c.push({type:`text`,value:e.slice(l)}),c):null}function he(e,t,n,r,i){let a;for(let o=0;o<e.length;o++){let s=e[o];if(s.type===`text`){let c=me(s.value,t,n,r,i);if(c==null){a?.push(s);continue}a??=e.slice(0,o);for(let e of c)a.push(e);continue}if(s.type===`strong`||s.type===`emphasis`||s.type===`delete`){let n=he(s.children,t,s.type,r,i);if(n===s.children){a?.push(s);continue}a??=e.slice(0,o),a.push({...s,children:n});continue}a?.push(s)}return a??e}function ge(e,t,n){let r=n.requiredSubstrings;if(t===void 0||r===void 0)return!0;let i=e.position?.start.offset,a=e.position?.end.offset;if(typeof i!=`number`||typeof a!=`number`)return!0;for(let e of r){let n=t.indexOf(e,i);if(n>=0&&n<a)return!0}return!1}function _e(e,t,n,r,i){let a;for(let o=0;o<e.length;o++){let s=e[o];if(!ge(s,i,t)){a?.push(s);continue}let c;switch(s.type){case`heading`:case`paragraph`:{let e=he(s.children,t,s.type,n,r);c=e===s.children?s:{...s,children:e};break}case`blockquote`:{let e=_e(s.children,t,n,r,i);c=e===s.children?s:{...s,children:e};break}case`list`:{let e;for(let a=0;a<s.children.length;a++){let o=s.children[a],c=_e(o.children,t,n,r,i);if(c===o.children){e?.push(o);continue}e??=s.children.slice(0,a),e.push({...o,children:c})}c=e==null?s:{...s,children:e};break}case`table`:{let e;for(let i=0;i<s.children.length;i++){let a=s.children[i],o;for(let e=0;e<a.children.length;e++){let i=a.children[e],s=he(i.children,t,`tableCell`,n,r);if(s===i.children){o?.push(i);continue}o??=a.children.slice(0,e),o.push({...i,children:s})}if(o==null){e?.push(a);continue}e??=s.children.slice(0,i),e.push({...a,children:o})}c=e==null?s:{...s,children:e};break}case`code`:case`math`:case`image`:case`thematicBreak`:case`extension`:c=s;break}a===void 0&&c!==s&&(a=e.slice(0,o)),a?.push(c)}return a??e}function ve(e){if(!e.pattern.global)throw TypeError(`Markdown text transform patterns must use the global flag`);if(e.requiredSubstrings!=null&&(!Array.isArray(e.requiredSubstrings)||e.requiredSubstrings.length===0||e.requiredSubstrings.some(e=>typeof e!=`string`||e===``)))throw TypeError(`Markdown text transform requiredSubstrings must be non-empty strings`);let t=e.requiredSubstrings==null?void 0:Object.freeze([...e.requiredSubstrings]),n=Object.freeze({pattern:new RegExp(e.pattern.source,e.pattern.flags),requiredSubstrings:t,getEndIndex:e.getEndIndex,replace:e.replace}),r=oe((e,r)=>{let i=te(r)??ye,a=_e(e.children,n,i,{pattern:new RegExp(n.pattern.source,n.pattern.flags),busy:!1},i.sourceUnchanged&&t!=null&&!n.pattern.ignoreCase?r.source:void 0);return a===e.children?e:{...e,children:a}});return t==null||e.pattern.ignoreCase?r:se(r,e=>t.some(t=>e.includes(t)))}var ye,be,xe=e((()=>{g(),ye=Object.freeze({pluginName:`\0unowned`,hasRenderer:()=>!1,sourceUnchanged:!1}),be=new WeakSet}));function Se(e){return typeof e==`object`&&!!e&&!Array.isArray(e)}function Ce(e){if(typeof e!=`object`||!e)return e;if(Array.isArray(e))return Object.freeze(e.map(Ce));let t={};for(let[n,r]of Object.entries(e))t[n]=Ce(r);return Object.freeze(t)}function we(e){throw TypeError(`Markdown source decoration: ${e}`)}function Te(e,t){let n=[],r=new Set;for(let i of t){(!Number.isInteger(i.start)||!Number.isInteger(i.end)||i.start<0||i.end<=i.start)&&we(`ranges must be ordered, non-empty, non-negative UTF-16 offsets`),i.data!==void 0&&!p(i.data)&&we(`range data must be finite JSON-like plugin data`);let t=i.data===void 0?void 0:Ce(i.data),a=`${i.start}\u0000${i.end}\u0000${t===void 0?``:JSON.stringify(t)}`;r.has(a)||(r.add(a),n.push({start:i.start,end:i.end,entry:Object.freeze(t===void 0?{name:e}:{name:e,data:t}),key:a}))}return n.sort((e,t)=>e.start-t.start||e.end-t.end||(e.key<t.key?-1:+(e.key>t.key))),Object.freeze(n.map(({start:e,end:t,entry:n})=>Object.freeze({start:e,end:t,entry:n})))}function Ee(e){if(e===void 0)return-1;let t=e.start.offset,n=e.end.offset;return typeof t==`number`&&typeof n==`number`&&t>=0&&n>=t?t:-1}function De(e){if(e===void 0)return;if(!Se(e))return null;let t=e[Re];if(t!==void 0)return!Se(t)||t.kind!==ze||t.version!==Be||!Array.isArray(t.entries)||!t.entries.every(Oe)?null:t.entries}function Oe(e){return Se(e)&&typeof e.name==`string`}function ke(e){return{kind:ze,version:Be,entries:e}}function Ae(e){e.hasReported||(e.hasReported=!0,e.report(`skipped a node whose data is not a Core-owned source-decoration envelope`))}function je(e,t,n){let r=De(e.data);if(r===null){Ae(n);return}let i=ke(r===void 0?t:[...r,...t]);return e.data===void 0?{[Re]:i}:{...e.data,[Re]:i}}function Me(e){let t=-1;for(let n=0;n<e.length;n++){let r=Ee(e[n].position);if(!(r<0)){if(r<t){let t=[];for(let n=0;n<e.length;n++)Ee(e[n].position)>=0&&t.push(n);return t.sort((t,n)=>Ee(e[t].position)-Ee(e[n].position)||t-n),t}t=r}}}function Ne(e,t,n,r){let i=0,a=n;for(;i<a;){let n=i+a>>>1,o=e[t?.[n]??n].position?.end.offset;typeof o==`number`&&o<=r?i=n+1:a=n}return i}function Pe(e,t,n){let r=Me(e),i=r?.length??e.length,a,o=0,s=[],c=r===void 0?Ne(e,r,i,t[0].start):0;for(;c<i&&!(o>=t.length&&s.length===0);c++){let l=r?.[c]??c,u=e[l],d=Ee(u.position);if(d<0)continue;let f=u.position?.end.offset;for(;o<t.length&&t[o].start<f;)s.push(t[o++]);let ee=0;for(let e=0;e<s.length;e++)s[e].end>d&&(s[ee++]=s[e]);if(s.length=ee,ee===0){if(r===void 0&&o<t.length&&t[o].start>f){let n=Ne(e,r,i,t[o].start);n>c&&(c=n-1)}continue}let p=Fe(u,s,n);p!==u&&(a??=e.slice(),a[l]=p)}return a??e}function Fe(e,t,n){if(e.type===`extension`)return e;let r=je(e,t.map(e=>e.entry),n);return r===void 0?e:{...e,data:r}}function Ie(e){(typeof e.name!=`string`||e.name.trim()===``)&&we(`name must be a non-empty string`),Array.isArray(e.ranges)||we(`ranges must be an array`);let t=Te(e.name,e.ranges),n=t.length===0?-1:t[0].start;return oe(se((e,n)=>{if(!n.isFinal||t.length===0)return e;let r=t[t.length-1].start<n.source.length?t:t.filter(e=>e.start<n.source.length);if(r.length===0)return e;let i=e;if(i.children==null)return e;let a=Pe(i.children,r,{report:e=>n.report(e),hasReported:!1});return a===i.children?e:{...e,children:a}},e=>n>=0&&e.length>n))}function Le(e){let t=De(e.data);return t==null||t.length===0?Ve:t}var Re,ze,Be,Ve,He=e((()=>{g(),Re=`astryx:sourceDecorations`,ze=`astryx.markdown.sourceDecorations`,Be=1,Ve=Object.freeze([])}));function Ue(e){return typeof e==`object`&&e&&!Array.isArray(e)?e:{}}function We(e){if(typeof e!=`object`||!e||Array.isArray(e))return;let t=e;return t.brand===Je&&t.version===Ye&&t.values!=null&&typeof t.values==`object`&&!Array.isArray(t.values)?t:void 0}function Ge(e){let t=e.startsWith(`---\r
`)?5:e.startsWith(`---
`)?4:0;if(t===0)return{status:`none`};let n=e.slice(t),r=/(?:^|\r?\n)---(?=\r?\n|$)/.exec(n);if(r==null)return{status:`defer`};let i=Object.create(null);for(let e of n.slice(0,r.index).split(/\r?\n/)){if(e.trim()===``)continue;let t=e.indexOf(`:`),n=e.slice(0,t).trim();if(t<=0||n===``||Object.hasOwn(i,n))return{status:`none`};i[n]=e.slice(t+1).trim()}let a=t+r.index+r[0].length;return e.startsWith(`\r
`,a)?a+=2:e[a]===`
`&&(a+=1),{status:`match`,end:a,fields:Object.freeze(i)}}function Ke(e){if(e.name.trim()===``)throw TypeError(`Markdown frontmatter name must be non-empty`);let t=e.name,n=(t,n=!0)=>{let r=Ge(t);if(r.status===`defer`)return n?{status:`none`}:r;if(r.status===`none`)return r;let i=e.parse(r.fields);if(!p(i))throw TypeError(`Markdown frontmatter metadata must be finite JSON-like data`);return{status:`match`,contentStart:r.end,metadata:f(i)}},r=h({name:t,apiVersion:1,transform:oe((e,r)=>{let i=n(r.source,r.isFinal);if(i.status===`none`)return e;if(i.status===`defer`)return{...e,children:[]};let a=Ue(e.data),o=We(a[qe]),s=Object.freeze({brand:Je,version:Ye,values:Object.freeze({...o?.values,[t]:i.metadata})});return{...e,data:Object.freeze({...a,[qe]:s}),children:e.children.filter(e=>(e.position?.end.offset??1/0)>i.contentStart)}})});return Object.freeze({plugin:r,parse:n,getMetadata(e){return We(Ue(e.data)[qe])?.values[t]}})}var qe,Je,Ye,Xe=e((()=>{g(),qe=`astryx:frontmatter`,Je=`astryx.markdown.frontmatter`,Ye=1}));function Ze(e){let t=/\r?\n|\r/g,n=t.exec(e);if(n==null)return null;let r=[],i=0;do n.index>i&&r.push({type:`text`,value:e.slice(i,n.index)}),r.push({type:`break`}),i=n.index+n[0].length,n=t.exec(e);while(n!=null);return i<e.length&&r.push({type:`text`,value:e.slice(i)}),r}function Qe(e){let t;for(let n=0;n<e.length;n++){let r=e[n];if(r.type===`text`){let i=Ze(r.value);i==null?t?.push(r):(t??=e.slice(0,n),t.push(...i));continue}if(r.type===`strong`||r.type===`emphasis`||r.type===`delete`||r.type===`link`){let i=Qe(r.children);i===r.children?t?.push(r):(t??=e.slice(0,n),t.push({...r,children:i}));continue}t?.push(r)}return t??e}function $e(e){let t=Qe(e.children);return t===e.children?e:{...e,children:t}}function et(e){let t=e.children.map($e);return t.every((t,n)=>t===e.children[n])?e:{...e,children:t}}function tt(e){let t=nt(e.children);return t===e.children?e:{...e,children:t}}function nt(e){let t;for(let n=0;n<e.length;n++){let r=e[n],i=r;switch(r.type){case`heading`:case`paragraph`:{let e=Qe(r.children);e!==r.children&&(i={...r,children:e});break}case`blockquote`:{let e=nt(r.children);e!==r.children&&(i={...r,children:e});break}case`list`:{let e=r.children.map(tt);e.some((e,t)=>e!==r.children[t])&&(i={...r,children:e});break}case`table`:{let e=r.children.map(et);e.some((e,t)=>e!==r.children[t])&&(i={...r,children:e});break}case`code`:case`math`:case`thematicBreak`:case`image`:case`extension`:break;default:}i!==r&&(t??=e.slice(0,n)),t?.push(i)}return t??e}var rt,it,at=e((()=>{g(),rt=e=>{let t=nt(e.children);return t===e.children?e:{...e,children:t}},it=h({name:`soft-breaks`,apiVersion:1,transform:rt})})),ot=e((()=>{g(),xe(),ae(),He(),Xe(),at()}));function st(e,t){let n=!1,r=new Promise(e=>{setTimeout(()=>{n=!0,e()},t)});return{read(){if(!n)throw r;return e}}}function ct({label:e}){return(0,_.jsxs)(`mark`,{children:[`@`,e.read()]})}function lt(e=3e3){let t=new Map;return h({...dt,renderers:{mention:{render:({node:n})=>{let r=t.get(n.data.label);return r??(r=st(n.data.label,e),t.set(n.data.label,r)),(0,_.jsx)(ct,{label:r})},toText:e=>`@${e.data.label}`}}})}function ut(e,t){let n=e.indexOf(t),r=[];return{plugins:[h({name:`demo-search-hits`,apiVersion:1,transform:Ie({name:`search-hit`,ranges:n<0?[]:[{start:n,end:n+t.length,data:{query:t}}]})}),h({name:`demo-decoration-readout`,apiVersion:1,transform(e){return r.length=0,e.children.forEach((e,t)=>{for(let n of Le(e))r.push(`block ${t} (${e.type}) — ${n.name}`)}),e}})],readout:r}}var _,dt,ft,pt,mt,ht,gt,_t,vt=e((()=>{ot(),_=r(),dt={name:`demo-mentions`,apiVersion:1,parseKey:`v1`,syntax:{inline:[{startsWith:[`@{`],maxSpan:80,tokenize({source:e,offset:t,end:n,isFinal:r}){let i=e.indexOf(`}`,t+2);return i<0||i>=n?r?{status:`no-match`}:{status:`defer`}:{status:`match`,end:i+1,node:{type:`extension`,plugin:`demo-mentions`,name:`mention`,display:`inline`,data:{label:e.slice(t+2,i)}}}}}]},renderers:{mention:{render:({node:e})=>(0,_.jsxs)(`mark`,{children:[`@`,e.data.label]}),toText:e=>`@${e.data.label}`}}},ft={name:`demo-callouts`,apiVersion:1,parseKey:`v1`,syntax:{block:[{startsWith:[`:::note`],maxSpan:500,tokenize({source:e,offset:t,end:n,isFinal:r}){let i=e.indexOf(`
:::`,t+7);return i<0||i+4>n?r?{status:`no-match`}:{status:`defer`}:{status:`match`,end:i+4,node:{type:`extension`,plugin:`demo-callouts`,name:`callout`,display:`block`,data:{body:e.slice(t+7,i).trim()}}}}}]},renderers:{callout:{render:({node:e})=>(0,_.jsx)(`aside`,{role:`note`,"aria-label":`Note`,children:e.data.body}),toText:e=>e.data.body}}},pt=h({name:`demo-todos`,apiVersion:1,transform:ve({pattern:/\bTODO\b/g,requiredSubstrings:[`TODO`],replace:()=>({type:`extension`,plugin:`demo-todos`,name:`todo`,display:`inline`,data:{label:`TODO`}})}),renderers:{todo:{render:({node:e})=>(0,_.jsx)(`mark`,{children:e.data.label}),toText:e=>e.data.label}}}),mt=h({name:`demo-semantic-fences`,apiVersion:1,transform:d({languages:[`diagram`],createNode:({code:e,meta:t})=>({type:`extension`,plugin:`demo-semantic-fences`,name:`diagram`,display:`block`,data:{code:e,...t==null?{}:{label:t}}})}),renderers:{diagram:{render:({node:e})=>(0,_.jsxs)(`figure`,{"aria-label":e.data.label??`Workflow diagram`,children:[(0,_.jsx)(`figcaption`,{children:e.data.label??`Workflow diagram`}),(0,_.jsx)(`pre`,{children:e.data.code})]}),toText:e=>e.data.code}}}),ht=mt,gt=Ke({name:`demo-document-metadata`,parse:e=>({title:e.title??`Untitled`,status:e.status??`unknown`})}),_t=[h(dt),h(ft),pt]}));function yt(e){if(typeof e!=`string`)throw TypeError(`Expected a string`);return e.replace(/[|\\{}()[\]^$+*?.]/g,`\\$&`).replace(/-/g,`\\x2d`)}var bt=e((()=>{}));function xt(e){let t=[],n=-1;for(;++n<e.length;)t[n]=Dt(e[n]);return wt(r);function r(...e){let n=-1;for(;++n<t.length;)if(t[n].apply(this,e))return!0;return!1}}function St(e){let t=e;return wt(n);function n(n){let r=n,i;for(i in e)if(r[i]!==t[i])return!1;return!0}}function Ct(e){return wt(t);function t(t){return t&&t.type===e}}function wt(e){return t;function t(t,n,r){return!!(Et(t)&&e.call(this,t,typeof n==`number`?n:void 0,r||void 0))}}function Tt(){return!0}function Et(e){return typeof e==`object`&&!!e&&`type`in e}var Dt,Ot=e((()=>{Dt=(function(e){if(e==null)return Tt;if(typeof e==`function`)return wt(e);if(typeof e==`object`)return Array.isArray(e)?xt(e):St(e);if(typeof e==`string`)return Ct(e);throw Error(`Expected function, string, or object as test`)})})),kt=e((()=>{Ot()}));function At(e){return e}var jt=e((()=>{}));function Mt(e,t,n,r){let i;typeof t==`function`&&typeof n!=`function`?(r=n,n=t):i=t;let a=Dt(i),o=r?-1:1;s(e,void 0,[])();function s(e,i,c){let l=e&&typeof e==`object`?e:{};if(typeof l.type==`string`){let t=typeof l.tagName==`string`?l.tagName:typeof l.name==`string`?l.name:void 0;Object.defineProperty(u,"name",{value:`node (`+At(e.type+(t?`<`+t+`>`:``))+`)`})}return u;function u(){let l=Pt,u,d,f;if((!t||a(e,i,c[c.length-1]||void 0))&&(l=Nt(n(e,c)),l[0]===!1))return l;if(`children`in e&&e.children){let t=e;if(t.children&&l[0]!==`skip`)for(d=(r?t.children.length:-1)+o,f=c.concat(t);d>-1&&d<t.children.length;){let e=t.children[d];if(u=s(e,d,f)(),u[0]===!1)return u;d=typeof u[1]==`number`?u[1]:d+o}}return l}}}function Nt(e){return Array.isArray(e)?e:typeof e==`number`?[!0,e]:e==null?Pt:[e]}var Pt,Ft=e((()=>{kt(),jt(),Pt=[]})),It=e((()=>{Ft()}));function Lt(e,t,n){let r=Dt((n||{}).ignore||[]),i=Rt(t),a=-1;for(;++a<i.length;)Mt(e,`text`,o);function o(e,t){let n=-1,i;for(;++n<t.length;){let e=t[n],a=i?i.children:void 0;if(r(e,a?a.indexOf(e):void 0,i))return;i=e}if(i)return s(e,t)}function s(e,t){let n=t[t.length-1],r=i[a][0],o=i[a][1],s=0,c=n.children.indexOf(e),l=!1,u=[];r.lastIndex=0;let d=r.exec(e.value);for(;d;){let n=d.index,i={index:d.index,input:d.input,stack:[...t,e]},a=o(...d,i);if(typeof a==`string`&&(a=a.length>0?{type:`text`,value:a}:void 0),a===!1?r.lastIndex=n+1:(s!==n&&u.push({type:`text`,value:e.value.slice(s,n)}),Array.isArray(a)?u.push(...a):a&&u.push(a),s=n+d[0].length,l=!0),!r.global)break;d=r.exec(e.value)}return l?(s<e.value.length&&u.push({type:`text`,value:e.value.slice(s)}),n.children.splice(c,1,...u)):u=[e],c+u.length}}function Rt(e){let t=[];if(!Array.isArray(e))throw TypeError(`Expected find and replace tuple or list of tuples`);let n=!e[0]||Array.isArray(e[0])?e:[e],r=-1;for(;++r<n.length;){let e=n[r];t.push([zt(e[0]),Bt(e[1])])}return t}function zt(e){return typeof e==`string`?new RegExp(yt(e),`g`):e}function Bt(e){return typeof e==`function`?e:function(){return e}}var Vt=e((()=>{bt(),It(),kt()})),Ht=e((()=>{Vt()}));function Ut(e){Lt(e,[/\r?\n|\r/g,Wt])}function Wt(){return{type:`break`}}var Gt=e((()=>{Ht()})),Kt=e((()=>{Gt()}));function qt(){return function(e){Ut(e)}}var Jt=e((()=>{Kt()})),Yt=e((()=>{Jt()}));function Xt(){return{failed:!1,reason:null}}function v(e){S!=null&&!S.failed&&(S.failed=!0,S.reason=e);let t=new Fn(e);throw In.set(t,e),t}function Zt(e,t){let n=S;S=e;try{return t()}finally{S=n}}function Qt(e){if(typeof e!=`object`&&typeof e!=`function`||e===null)return!1;let t;try{t=e.then}catch{return!0}if(typeof t!=`function`)return!1;try{t.call(e,()=>{},()=>{})}catch{}return!0}function y(e){return typeof e==`string`&&(Object.prototype.hasOwnProperty.call(jn,e)||Mn.has(e))?e:`unknown`}function $t(e){let t=typeof e==`symbol`?`unknown`:e;return C.has(t)||Nn.has(t)?t:`unknown`}function en(e,t){return t===`position`||t===`data`||t===`type`||En.includes(t)||(jn[e]?.includes(t)??!1)?t:`unknown`}function b(e){if(typeof e!=`object`||!e||Array.isArray(e))return!1;let t=Object.getPrototypeOf(e);return t===Object.prototype||t===null}function tn(e,t){if(!b(e)||!b(t))return!1;for(let n of[e,t])for(let e of Object.keys(n))if(!Ln.includes(e))return!1;return Ln.every(n=>e[n]===t[n])}function nn(e,t){if(e===void 0||t===void 0)return e===t;if(!b(e)||!b(t))return!1;for(let n of[e,t])for(let e of Object.keys(n))if(!Rn.includes(e))return!1;return tn(e.start,t.start)&&tn(e.end,t.end)}function rn(e){if(!b(e))return;let t={};return typeof e.line==`number`&&(t.line=e.line),typeof e.column==`number`&&(t.column=e.column),typeof e.offset==`number`&&(t.offset=e.offset),t}function an(e){if(!b(e))return;let t=rn(e.start),n=rn(e.end);return t==null||n==null?void 0:{start:t,end:n}}function on(e){if(Array.isArray(e)){let t=[];for(let n of e)t.push(on(n));return t}if(b(e)){let t={};for(let[n,r]of Object.entries(e))t[n]=on(r);return t}return e}function sn(e,t){if(e===t)return!0;if(Array.isArray(e)&&Array.isArray(t))return e.length===t.length&&e.every((e,n)=>sn(e,t[n]));if(b(e)&&b(t)){let n=Object.keys(e),r=Object.keys(t);return n.length===r.length&&n.every(n=>n in t&&sn(e[n],t[n]))}return!1}function cn(){return{all:new Set}}function ln(e,t){t.all.add(e)}function un(e,t){return Array.isArray(e)?e.map(e=>dn(e,t)):[]}function dn(e,t){ln(e,t);let n={type:e.type};switch(e.type){case`root`:case`paragraph`:case`blockquote`:case`strong`:case`emphasis`:case`delete`:case`tableRow`:case`tableCell`:case`listItem`:e.type===`listItem`&&typeof e.checked==`boolean`&&(n.checked=e.checked),n.children=un(e.children,t);break;case`heading`:n.depth=e.depth,n.children=un(e.children,t);break;case`text`:case`inlineCode`:case`inlineMath`:case`math`:n.value=e.value;break;case`code`:n.lang=e.lang??null,n.meta=e.meta??null,n.value=e.value;break;case`link`:n.url=e.url,n.title=null,n.children=un(e.children,t);break;case`image`:n.url=e.url,n.title=null,n.alt=e.alt;break;case`list`:n.ordered=e.ordered,e.start!==void 0&&(n.start=e.start),e.spread!==void 0&&(n.spread=e.spread),e.delimiter!==void 0&&(n.delimiter=e.delimiter),n.children=un(e.children,t);break;case`table`:n.align=Array.isArray(e.align)?[...e.align]:[],n.children=un(e.children,t);break;case`citation`:n.sourceId=e.sourceId;break;case`extension`:n.plugin=e.plugin,n.name=e.name,n.display=e.display,e.source!==void 0&&(n.source=e.source);break;default:break}e.data!==void 0&&(n.data=on(e.data));let r=an(e.position);return r!=null&&(n.position=r),Object.defineProperty(n,Tn,{configurable:!1,enumerable:!0,value:e,writable:!1}),n}function fn(e,t,n){let r=e[Tn];return r===void 0?null:((!b(r)||!n.index.all.has(r))&&v(`a "${y(t)}" node carries forged provenance`),r.type!==t&&v(`a source "${y(r.type)}" node cannot be retyped`),n.used.has(r)&&v(`a source "${y(t)}" node cannot be duplicated`),n.used.add(r),r)}function pn(e,t){let n=jn[e];for(let r of Object.keys(t))r!==`type`&&r!==`position`&&r!==`data`&&!n.includes(r)&&v(`a "${y(e)}" node cannot carry the unsupported field "${en(e,r)}"`)}function mn(e,t){if(t!==void 0){if(b(t))for(let n of En)n in t&&v(`a "${y(e)}" node cannot carry the raw-markup data channel "${n}"`);return p(t)||v(`a "${y(e)}" node's data must be finite JSON-like values`),on(t)}}function hn(e,t,n){return typeof n!=`string`&&v(`a "${y(e)}" node requires a string "${en(e,t)}"`),n}function gn(e,t,n){n!=null&&n!==``&&v(`a "${y(e)}" node's "${en(e,t)}" has no Astryx representation`)}function _n(e,t,n,r){if(n==null)return;e===`root`&&v(`a document can only contain one root`);let i=e===`extension`?t.display:void 0,a=Dn.has(e)||i===`inline`,o=On.has(e)||i===`block`;(kn.has(n)&&!a||An.has(n)&&!o||n===`list`&&e!==`listItem`||n===`table`&&e!==`tableRow`||n===`tableRow`&&e!==`tableCell`)&&v(`a "${y(e)}" node cannot be a child of a "${y(n)}" node`),r&&e===`link`&&v(`a link cannot be nested inside another link`)}function vn(e,t){let n=Object.keys(e).filter(t=>t!==`type`&&e[t]!==void 0),r=Object.keys(t).filter(e=>t[e]!==void 0);if(n.length!==r.length)return!1;for(let n of r){let r=t[n],i=e[n];if(r!==i){if(Array.isArray(r)&&Array.isArray(i)){if(r.length!==i.length||r.some((e,t)=>e!==i[t]))return!1;continue}if(!sn(r,i))return!1}}return!0}function yn(e,t,n){if(n!=null&&vn(n,t))return n;let r={type:e,...t};if(n!=null)for(let e of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,e)&&Object.defineProperty(r,e,{configurable:!1,enumerable:!0,value:n[e],writable:!1});return r}function x(e,t,n,r){return Array.isArray(e)||v(`a "${y(t)}" node requires a children array`),e.map(e=>bn(e,t,n||t===`link`,r))}function bn(e,t,n,r){b(e)||v(`every transformed node must be a plain object`);let i=e.type;typeof i!=`string`&&v(`every transformed node requires a string type`),i===`html`&&v(`raw HTML has no Astryx representation`),i in jn||v(`the node type "${y(i)}" is outside the supported MDAST subset`),pn(i,e),_n(i,e,t,n);let a=fn(e,i,r);a==null?e.position!==void 0&&v(`a new "${y(i)}" node cannot carry a source position`):nn(e.position,a.position)||v(`a source "${y(i)}" node's position must stay exactly as Core authored it`);let o={};switch(i){case`root`:case`paragraph`:case`blockquote`:case`strong`:case`emphasis`:case`delete`:case`tableRow`:case`tableCell`:o.children=x(e.children,i,n,r);break;case`heading`:{let t=e.depth;(typeof t!=`number`||!Number.isInteger(t)||t<1||t>6)&&v(`a heading requires a depth between 1 and 6`),a!=null&&a.depth!==t&&v(`a source heading's depth cannot change`),o.depth=t,o.children=x(e.children,i,n,r);break}case`listItem`:{let t=e.checked;t!=null&&(typeof t!=`boolean`&&v(`a list item requires a boolean "checked" value`),o.checked=t),e.spread===!0&&v(`a loose list item has no Astryx representation`),o.children=x(e.children,i,n,r);break}case`text`:case`inlineCode`:case`inlineMath`:case`math`:o.value=hn(i,`value`,e.value);break;case`code`:{let t=e.lang;t!=null&&typeof t!=`string`&&v(`a code node requires a string or null "lang"`);let n=e.meta;n!=null&&typeof n!=`string`&&v(`a code node requires a string or null "meta"`),o.lang=t??null,n!=null&&n!==``&&(o.meta=n),o.value=hn(i,`value`,e.value);break}case`link`:{let t=hn(i,`url`,e.url);re(t)||v(`a link destination was rejected by the navigation owner`),gn(i,`title`,e.title),o.url=t,o.children=x(e.children,i,n,r);break}case`image`:{let t=hn(i,`url`,e.url);re(t)||v(`an image source was rejected by the resource owner`),gn(i,`title`,e.title),typeof e.alt!=`string`&&v(`an image requires its text alternative`),o.url=t,o.alt=e.alt;break}case`list`:{typeof e.ordered!=`boolean`&&v(`a list requires a boolean "ordered" value`),o.ordered=e.ordered;let t=e.start;t!=null&&((typeof t!=`number`||!Number.isFinite(t))&&v(`a list requires a finite "start" value`),o.start=t),typeof e.spread==`boolean`&&(o.spread=e.spread);let a=e.delimiter;a!==void 0&&(a!==`.`&&a!==`)`&&v(`a list requires a "." or ")" delimiter`),o.delimiter=a),o.children=x(e.children,i,n,r);break}case`table`:{let t=e.align;(!Array.isArray(t)||!t.every(e=>e===null||e===`left`||e===`center`||e===`right`))&&v(`a table requires normalized alignment values`),o.align=[...t],o.children=x(e.children,i,n,r);break}case`thematicBreak`:case`break`:break;case`citation`:case`extension`:return a!=null&&sn(e.data,a.data)&&(i===`citation`?e.sourceId===a.sourceId:e.plugin===a.plugin&&e.name===a.name&&e.display===a.display&&e.source===a.source)||v(`an Astryx "${y(i)}" node cannot be authored or changed here`),a;default:v(`the node type "${y(i)}" is outside the supported MDAST subset`)}let s=mn(i,e.data);s!==void 0&&(o.data=s),a!=null&&a.position!==void 0&&(o.position=a.position);let c=yn(i,o,a);if(i===`table`&&c!==a){let e=o.children,t=e[0]?.children?.length??0;e.some(e=>e.children?.length!==t)&&v(`a transformed table cannot have ragged rows`)}return c}function xn(e,t,n){let r=e instanceof Error?e.message:e;return{reason:r,fatal:!1,place:t??null,ruleId:n??null,toString(){return r}}}function Sn(e){let t=[],n={data:{}},r={get value(){return e},get data(){return n.data},get messages(){return t},message(e,n,r){let i=xn(e,n,r);return t.push(i),i},fail(e,n,r){let i=xn(e,n,r);i.fatal=!0,t.push(i),v(Pn)},toString(){return e}};return{file:new Proxy(r,{get(e,t,n){return typeof t==`symbol`||C.has(t)||v(`the file has no "${$t(t)}" in this profile`),Reflect.get(r,t,n)},set(e,t){v(`the file's "${$t(t)}" cannot be assigned in this profile`)},defineProperty(e,t){v(`the file's "${$t(t)}" cannot be assigned in this profile`)},deleteProperty(e,t){v(`the file's "${$t(t)}" cannot be assigned in this profile`)},has(e,t){return typeof t==`symbol`||C.has(t)},ownKeys(){return[...C]},getOwnPropertyDescriptor(e,t){return typeof t!=`symbol`&&!C.has(t)?void 0:Reflect.getOwnPropertyDescriptor(r,t)}}),state:n}}function Cn(e){return(e instanceof Fn?In.get(e):void 0)??`the plugin threw an error`}function wn(e,...t){if(typeof e!=`function`)throw TypeError(`Markdown Remark adapter: plugin must be a function`);let n=!1,r=null,i=null,a=()=>{n=!0;let a=Xt();Zt(a,()=>{try{let n=e.apply(zn,t),o=Qt(n);if(a.failed&&v(a.reason??Pn),o&&v(`an asynchronous plugin is outside the adapter`),typeof n!=`function`){i=`only a transform-only plugin returning one synchronous transformer is supported`;return}if(n.length>=3){i=`a callback-style (asynchronous) transformer is outside the adapter`;return}r=n}catch(e){i=Cn(e)}}),a.failed&&i==null&&(i=a.reason,r=null)};return(e,t)=>{n||a();let o=r;if(o==null)return t.report(`Remark adapter: ${i??`the plugin failed`}`),e;let s=cn(),{file:c,state:l}=Sn(t.source),u=Xt();return Zt(u,()=>{try{let n=dn(e,s),r=o(n,c),i=Qt(r);u.failed&&v(u.reason??Pn),i&&v(`an asynchronous transformer is outside the adapter`);let a=r??n;p(l.data)||v(`file data must be finite JSON-like values`);let d=bn(a,null,!1,{index:s,used:new Set});d.type!==`root`&&v(`a transformer must return the document root`);let f=d.children;return t.display===`inline`&&(f.length!==1||f[0]?.type!==`paragraph`)&&v(`an inline document must stay one paragraph of phrasing content`),u.failed&&v(u.reason??Pn),d}catch(n){return t.report(`Remark adapter: ${u.reason??Cn(n)}`),e}})}}var Tn,En,Dn,On,kn,An,jn,Mn,Nn,Pn,Fn,In,S,Ln,Rn,C,w,zn,Bn=e((()=>{g(),ce(),Tn=Symbol(`astryx.markdown.remarkOrigin`),En=[`hName`,`hProperties`,`hChildren`],Dn=new Set([`text`,`inlineCode`,`inlineMath`,`break`,`strong`,`emphasis`,`delete`,`link`,`image`,`citation`]),On=new Set([`heading`,`paragraph`,`code`,`math`,`blockquote`,`list`,`table`,`thematicBreak`,`image`]),kn=new Set([`heading`,`paragraph`,`strong`,`emphasis`,`delete`,`link`,`tableCell`]),An=new Set([`root`,`blockquote`,`listItem`]),jn={root:[`children`],paragraph:[`children`],heading:[`depth`,`children`],blockquote:[`children`],strong:[`children`],emphasis:[`children`],delete:[`children`],tableRow:[`children`],tableCell:[`children`],text:[`value`],inlineCode:[`value`],inlineMath:[`value`],math:[`value`],code:[`lang`,`meta`,`value`],link:[`url`,`title`,`children`],image:[`url`,`title`,`alt`],list:[`ordered`,`start`,`spread`,`delimiter`,`children`],listItem:[`checked`,`spread`,`children`],table:[`align`,`children`],thematicBreak:[],break:[],citation:[`sourceId`],extension:[`plugin`,`name`,`display`,`source`]},Mn=new Set([`html`,`yaml`,`toml`,`definition`,`footnote`,`footnoteDefinition`,`footnoteReference`,`imageReference`,`linkReference`,`containerDirective`,`leafDirective`,`textDirective`,`mdxjsEsm`,`mdxFlowExpression`,`mdxTextExpression`,`mdxJsxFlowElement`,`mdxJsxTextElement`]),Nn=new Set([`path`,`cwd`,`history`,`basename`,`dirname`,`extname`,`stem`,`stored`,`result`,`map`,`contents`]),Pn=`the plugin reported the document as unsupported`,Fn=class extends Error{},In=new WeakMap,S=null,Ln=[`line`,`column`,`offset`],Rn=[`start`,`end`],C=new Set([`value`,`data`,`messages`,`message`,`fail`,`toString`]),w=`processor registration is outside the adapter`,zn=new Proxy(Object.freeze({}),{get(){v(w)},set(){v(w)},defineProperty(){v(w)},deleteProperty(){v(w)},apply(){v(w)},has(){return!1},ownKeys(){return[]}})}));function Vn(e,t){t(e);for(let n of[...e.children??[]])Vn(n,t)}var Hn,Un,Wn,Gn,Kn,qn,Jn,Yn,Xn,Zn,Qn=e((()=>{Yt(),ot(),Bn(),Hn=r(),Un=/\bSPEC-\d+\b/,Wn=({basePath:e})=>t=>{Vn(t,t=>{t.children==null||t.type===`link`||(t.children=t.children.flatMap(t=>{if(t.type!==`text`||typeof t.value!=`string`)return[t];let n=t.value.split(RegExp(`(${Un.source})`,`g`));return n.length===1?[t]:n.filter(e=>e!==``).map(t=>RegExp(`^${Un.source}$`).test(t)?{type:`link`,url:`${e}/${t.slice(5)}`,title:null,children:[{type:`text`,value:t}]}:{type:`text`,value:t})}))})},Gn=()=>e=>{e.children?.push({type:`html`,value:`<button onclick="alert(1)">Injected</button>`})},Kn=()=>e=>{Vn(e,e=>{e.type===`link`&&(e.url=`javascript:alert(1)`)})},qn=h({name:`demo-spec-badges`,apiVersion:1,transform:ve({pattern:new RegExp(Un.source,`g`),requiredSubstrings:[`SPEC-`],replace:e=>({type:`extension`,plugin:`demo-spec-badges`,name:`badge`,display:`inline`,data:{label:e[0]}})}),renderers:{badge:{render:({node:e})=>(0,Hn.jsx)(`mark`,{"data-spec-badge":!0,children:e.data.label}),toText:e=>e.data.label}}}),Jn=h({name:`demo-remark-breaks`,apiVersion:1,transform:wn(qt)}),Yn=h({name:`demo-remark-spec-links`,apiVersion:1,transform:wn(Wn,{basePath:`/specs`})}),Xn=h({name:`demo-remark-raw-html`,apiVersion:1,transform:wn(Gn)}),Zn=h({name:`demo-remark-unsafe-links`,apiVersion:1,transform:wn(Kn)})}));function T({width:e,children:t}){return(0,D.jsx)(`div`,{style:{width:Number(e),maxWidth:`100%`,padding:12,outline:`1px dashed #c33`},children:(0,D.jsx)(m,{children:t})})}var E,D,O,$n,k,er,tr,nr,A,rr,j,M,N,P,F,I,ir,ar,L,or,sr,R,z,cr,lr,ur,B,V,H,U,W,G,K,dr,q,J,Y,fr,X,pr,Z,mr,hr,gr,_r,vr,yr,br,xr,Sr,Cr,wr,Q,$,Tr;e((()=>{E=t(n()),ne(),u(),ot(),o(),l(),s(),vt(),Qn(),D=r(),{expect:O,userEvent:$n,within:k}=__STORYBOOK_MODULE_TEST__,er={title:`Core/Markdown`,component:m,tags:[`autodocs`],argTypes:{density:{control:`select`,options:[`default`,`compact`]},headingLevelStart:{control:`select`,options:[1,2,3,4,5,6]},isStreaming:{control:`boolean`},display:{control:`select`,options:[`block`,`inline`]}}},tr=[`# Markdown Demo`,``,`Renders **markdown** with *design-system-consistent* styling.`,``,`## Features`,``,`- Headings mapped to Astryx type scale`,`- **Bold**, *italic*, and ~~strikethrough~~ text`,`- [Links](https://example.com) with external detection`,"- Inline `code` and fenced code blocks",``,`### Code Block`,``,"```typescript",`interface User {`,`  id: string;`,`  name: string;`,`}`,``,`function greet(user: User) {`,"  return `Hello, ${user.name}!`;",`}`,"```",``,`### Blockquote`,``,`> Design systems free teams to focus on problems that matter.`,``,`### Table`,``,`| Component | Status | Tests |`,`|:----------|:------:|------:|`,`| Markdown | Active | 73 |`,`| CodeBlock | Active | 44 |`,``,`### Task List`,``,`- [x] Parser`,`- [x] Renderer`,`- [ ] Storybook stories`,``,`---`,``,`1. First ordered item`,`2. Second ordered item`].join(`
`),nr=[`## Setting Up a Design System`,``,`A design system is more than a component library — it's a **shared language** between design and engineering. Here's how to build one that scales.`,``,`### 1. Start with Tokens`,``,`Design tokens are the atomic values that define your visual language:`,``,"```typescript",`const tokens = {`,`  color: {`,`    primary: '#0066FF',`,`    secondary: '#6B7280',`,`    success: '#10B981',`,`    danger: '#EF4444',`,`  },`,`  spacing: {`,`    xs: '4px',`,`    sm: '8px',`,`    md: '16px',`,`    lg: '24px',`,`    xl: '32px',`,`  },`,`  radius: {`,`    sm: '4px',`,`    md: '8px',`,`    lg: '16px',`,`    full: '9999px',`,`  },`,`};`,"```",``,`These tokens should be the *single source of truth* for every component.`,``,`### 2. Component Architecture`,``,`Good components follow these principles:`,``,`- **Composable** — small pieces that combine into complex UIs`,`- **Accessible** — keyboard navigation and screen reader support built-in`,`- **Themeable** — visual customization without forking`,`- **Documented** — usage examples, props tables, and do/don't guidelines`,``,`> The best design systems are *opinionated enough* to ensure consistency, but *flexible enough* to handle edge cases gracefully.`,``,`### 3. Adoption Strategy`,``,`Rolling out a design system requires planning:`,``,`| Phase | Duration | Goal |`,`|:------|:--------:|:-----|`,`| Alpha | 4 weeks | Core components, internal dogfooding |`,`| Beta | 8 weeks | Expanded component set, 2-3 pilot teams |`,`| GA | Ongoing | Full adoption, migration support |`,``,`Key metrics to track:`,``,`1. **Component coverage** — what percentage of UI patterns are served`,`2. **Adoption rate** — teams actively using the system`,`3. **Contribution rate** — external PRs and feature requests`,`4. **Consistency score** — visual audits across products`,``,`### 4. Maintenance`,``,`A design system is a *living product*. Plan for:`,``,`- [x] Automated visual regression testing`,`- [x] Semantic versioning with changelogs`,`- [ ] Breaking change codemods`,`- [ ] Cross-platform support (web, mobile, native)`,``,`---`,``,`The most important thing? **Ship early, iterate often.** A design system that exists and is used beats a perfect one that's still in planning.`].join(`
`),A={args:{children:tr}},rr={args:{children:tr,density:`compact`}},j={name:`AI Response`,args:{children:nr,density:`compact`,headingLevelStart:3}},M={name:`Lazy continuations`,args:{children:[`## Wrapped container paragraphs`,``,`> A quoted paragraph can wrap onto another source line`,`without repeating the quote marker.`,`>`,`> A later paragraph can wrap too`,`and remain in the same quote.`,``,`- A list item can wrap the same way`,`without repeating its indentation.`,``,`- [ ] A task item also keeps`,`its unindented continuation.`,``,`> 1. > Nested quote text`,`continues in the deepest open paragraph.`,``,`This paragraph follows all containers.`].join(`
`)}},N={name:`Shifted Headings (start at h3)`,args:{children:tr,headingLevelStart:3}},P={name:`Inline Display`,render:()=>(0,D.jsxs)(`div`,{style:{maxWidth:680,display:`grid`,gap:16},children:[(0,D.jsx)(i,{type:`large`,display:`block`,children:(0,D.jsx)(m,{display:`inline`,children:"Use `value` with **controlled state** and [read the docs](https://example.com) without creating block wrappers."})}),(0,D.jsxs)(`div`,{style:{border:`1px solid #ddd`,borderRadius:8,padding:12,display:`grid`,gap:6},children:[(0,D.jsx)(i,{type:`body`,weight:`bold`,display:`block`,children:`Prop description`}),(0,D.jsx)(i,{type:`body`,color:`secondary`,display:`block`,children:(0,D.jsx)(m,{display:`inline`,children:'Accepts an action item `{label, onClick?, icon?}`, a divider `{type: "divider"}`, or a section `{type: "section", items: [...]}`.'})})]})]})},F={name:`Table`,args:{children:[`## Comparison Table`,``,`| Feature | React | Vue | Svelte |`,`|:--------|:-----:|:---:|-------:|`,`| Virtual DOM | Yes | Yes | No |`,`| Bundle Size | ~40KB | ~30KB | ~2KB |`,`| TypeScript | Native | Plugin | Native |`,`| Learning Curve | Medium | Easy | Easy |`].join(`
`)}},I={width:{control:`select`,options:[`320`,`390`,`528`,`1024`],description:`Width of the reading column the table renders inside, in px`}},ir=[`| Step | Time | Code | Tier | Runs | Team |`,`|---|---|---|---|---|---|`,`| Init | 12 ms | 200 | A | 3 | Core |`,`| Sync | 84 ms | 200 | A | 1 | Core |`,`| Lint | 2.1 s | 422 | B | 2 | Docs |`,`| Ship | 9.4 s | 200 | A | 1 | Docs |`].join(`
`),ar=[`| Identifier | Endpoint | Status | Accessibility status and remediation owner |`,`|---|---|---|---|`,"| D116586407 | https://example.com/v2/pipelines/build/runs/1284/logs | `needs_revision_before_landing_v2` | Pass |","| D116586999 | https://example.com/v2/pipelines/docs/runs/97/logs | `ContentNegotiationMiddleware` | Review |"].join(`
`),L={name:`Table — six short columns`,parameters:{docs:{description:{story:"Six short columns fit the reading column instead of squashing. Each column keeps a content-derived floor in `ch` on its text box, so the floor means the same number of characters whatever the cell padding is, and a table this narrow never needs to scroll."}}},argTypes:I,args:{width:`390`},render:({width:e})=>(0,D.jsx)(T,{width:e,children:ir})},or=[`| Stage | What it does | When it runs | What it needs | What it emits | Who reads it |`,`|---|---|---|---|---|---|`,`| Parse | Turns the source text into blocks and inline nodes | On every edit | The raw document | A canonical tree | The renderer |`,`| Render | Maps each node in the tree onto a part | After a parse | A canonical tree | Rendered output | The reader |`].join(`
`),sr=[`| Status | Owner |`,`|---|---|`,``,`| A | B | C |`,`|---|---|---|`,`|  | only the middle cell has content |  |`,``,`| Key | Value |`,`|---|---|`,`| digest | ${`a1b2c3d4e5`.repeat(18)} |`,``,`| Ref | Where it points |`,`|---|---|`,"| [the parser guide](https://example.com/docs/parser) and `parseDocument` | Both in one cell |",``,`| Id | Description |`,`|---|---|`,`| 7 | A column at the minimum floor next to one that reaches the cap and keeps going well past it |`].join(`
`),R={name:`Table — six prose columns`,parameters:{docs:{description:{story:`Prose columns have no long tokens, so min-content alone would let six of them wrap one word per line. The readable floor — half the longest cell, capped — gives each column enough width to wrap to a couple of lines instead.`}}},argTypes:I,args:{width:`390`},render:({width:e})=>(0,D.jsx)(T,{width:e,children:or})},z={name:`Table — edge shapes`,parameters:{docs:{description:{story:`Five shapes that stress the column floor: a header row with no body, empty cells, a 180-character token far past the floor cap (the column grows to its min-content rather than breaking the token), a cell mixing a link with inline code, and a minimum-floor column beside a capped one.`}}},argTypes:I,args:{width:`390`},render:({width:e})=>(0,D.jsx)(T,{width:e,children:sr})},cr=[`| Method | Path | Behavior | Response |`,`|---|---|---|---|`,"| `GET` | `/v2/projects/{projectId}/documents` | Lists documents in the project, newest first. Paginates with `cursor`. | `200` `DocumentPage` |","| `POST` | `/v2/projects/{projectId}/documents` | Creates a document. Rejects a duplicate `slug` in the same project. | `201` `Document`, `409` on conflict |","| `PATCH` | `/v2/documents/{documentId}` | Updates title, body, or tags. Fields left out are untouched. | `200` `Document` |","| `DELETE` | `/v2/documents/{documentId}` | Soft-deletes the document; it stays readable for 30 days. | `204` no content |"].join(`
`),lr=[`| Service | Environment | Version | State | Updated | Owner |`,`|---|---|---|---|---|---|`,"| `web-gateway` | production | `4.12.0` | Healthy | 2 h ago | Platform |","| `web-gateway` | staging | `4.13.0-rc.2` | Rolling out | 11 min ago | Platform |","| `search-indexer` | production | `2.8.4` | Degraded — reindexing a shard after a failed migration | 40 min ago | Search |","| `notifications` | production | `1.30.1` | Healthy | 6 h ago | Messaging |"].join(`
`),ur=[`| Capability | Available on the free plan | Included in the team plan | Notes for administrators |`,`|---|---|---|---|`,`| Single sign-on | No | Yes | Requires a verified domain and a SAML or OIDC provider. |`,`| Audit log retention | 7 days | 400 days | Exportable as newline-delimited JSON from the admin console. |`,`| Scheduled exports | No | Yes | Runs nightly; a failed run retries twice before it alerts the owner. |`,`| Seats included | 3 | 25 | Additional seats are billed monthly and prorated. |`].join(`
`),B={name:`Table — API reference`,parameters:{docs:{description:{story:"A real API reference in a narrow reading column: a two-character method column beside routes that must stay readable. The path column is floored by its own content, so `/v2/projects/{projectId}/documents` does not split across lines, and the table scrolls rather than squashing the method column to nothing."}}},argTypes:I,args:{width:`390`},render:({width:e})=>(0,D.jsx)(T,{width:e,children:cr})},V={name:`Table — release status`,parameters:{docs:{description:{story:"A deployment dashboard pasted into a narrow column: six columns, most of them short, one carrying a sentence. Version strings such as `4.13.0-rc.2` stay whole, and the short columns keep their minimum floor instead of collapsing to a character apiece."}}},argTypes:I,args:{width:`390`},render:({width:e})=>(0,D.jsx)(T,{width:e,children:lr})},H={name:`Table — feature comparison`,parameters:{docs:{description:{story:"A plan comparison matrix, where the headers are longer than the cells under them. Each header reads on one line up to its cap and wraps past it — never truncating to `Availabl…` — and a two-character cell such as `No` still gets a readable column."}}},argTypes:I,args:{width:`390`},render:({width:e})=>(0,D.jsx)(T,{width:e,children:ur})},U={name:`Table — wide, token-heavy content`,parameters:{docs:{description:{story:`Long identifiers, a long URL, and inline code stay whole: the column is never narrower than its longest unbreakable token, and the table scrolls in Table’s own Scroll region rather than shredding words. Header labels wrap past their one-line cap instead of ellipsizing.`}}},argTypes:I,args:{width:`390`},render:({width:e})=>(0,D.jsx)(T,{width:e,children:ar})},W={name:`Table — in a chat message`,parameters:{docs:{description:{story:"The narrow reading column as chat surfaces actually have it: a deployment status table — the kind an assistant answers with — inside a `ChatMessageBubble`, which already accepts Markdown as its content. The bubble constrains the message, and the table still keeps its column floors and scrolls inside Table’s own Scroll region — the bubble adds no second scroller."}}},argTypes:I,args:{width:`390`},render:({width:e})=>(0,D.jsx)(`div`,{style:{width:Number(e),maxWidth:`100%`,padding:12,outline:`1px dashed #c33`},children:(0,D.jsxs)(de,{children:[(0,D.jsx)(le,{sender:`user`,children:(0,D.jsx)(ue,{children:`Which services are still rolling out?`})}),(0,D.jsx)(le,{sender:`assistant`,children:(0,D.jsx)(ue,{children:(0,D.jsx)(m,{density:`compact`,children:lr})})})]})})},G={render:()=>{let e=nr,[t,n]=(0,E.useState)(0),[r,i]=(0,E.useState)(!0),[o,s]=(0,E.useState)(0);return(0,E.useEffect)(()=>{if(!r)return;if(t>=e.length){i(!1);return}let a=Math.floor(Math.random()*8)+2,o=30+Math.random()*60,s=setTimeout(()=>{n(t=>Math.min(t+a,e.length))},o);return()=>clearTimeout(s)},[t,r,e]),(0,D.jsxs)(`div`,{children:[(0,D.jsxs)(`div`,{style:{marginBlockEnd:12,display:`flex`,gap:8,alignItems:`center`},children:[(0,D.jsx)(a,{label:`Replay`,variant:`secondary`,size:`sm`,onClick:(0,E.useCallback)(()=>{n(0),i(!0),s(e=>e+1)},[]),isDisabled:r}),(0,D.jsx)(`span`,{style:{fontSize:12,color:`var(--color-text-secondary)`},children:r?`Streaming... ${t}/${e.length}`:`Complete`})]}),(0,D.jsx)(m,{isStreaming:r,density:`compact`,headingLevelStart:3,children:e.slice(0,t)},o)]})}},K={name:`With Images`,render:()=>(0,D.jsx)(`div`,{style:{maxWidth:800},children:(0,D.jsx)(m,{children:`
Here is some text before the image.

![A landscape photo](https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=680&h=400&fit=crop&auto=format)

Text between two images.

![A tall portrait photo](https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=600&fit=crop&auto=format)

And here's a really wide one:

![Wide panoramic shot](https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200&h=300&fit=crop&auto=format)

Final paragraph after all images.
`})})},dr=`
# Content Alignment

This paragraph is constrained by \`contentWidth\`. Notice how it's narrower than the code block and table below. The alignment prop controls where this narrow prose sits within the wider container.

Here's a bullet list that also respects prose width:
- First item with some explanation text
- Second item that wraps to show the width constraint
- Third item for good measure

\`\`\`typescript
// Code blocks break out to full container width regardless of contentAlign
export function calculateLayout(items: Item[], containerWidth: number): Layout {
  const columns = Math.floor(containerWidth / COLUMN_MIN_WIDTH);
  return { columns, gap: GRID_GAP, items: distributeItems(items, columns) };
}
\`\`\`

Back to prose — this paragraph is aligned according to the \`contentAlign\` prop while the code block above spans the full width.

| Component | Status | Notes |
|-----------|--------|-------|
| Button | Stable | Full API |
| CodeBlock | Stable | With collapsible |
| Markdown | In progress | Adding alignment |

Final paragraph after the table.
`,q={name:`Content Align: Start`,render:()=>(0,D.jsx)(`div`,{style:{maxWidth:900,border:`1px dashed #ccc`,padding:16},children:(0,D.jsx)(m,{contentWidth:580,contentAlign:`start`,children:dr})})},J={name:`Content Align: Center`,render:()=>(0,D.jsx)(`div`,{style:{maxWidth:900,border:`1px dashed #ccc`,padding:16},children:(0,D.jsx)(m,{contentWidth:580,contentAlign:`center`,children:dr})})},Y={name:`Inline Plugins`,render:()=>(0,D.jsx)(`div`,{style:{maxWidth:680},children:(0,D.jsx)(m,{inlinePlugins:[{pattern:/\b([A-Z][A-Z0-9]+-\d+)\b/g,render:(e,t)=>(0,D.jsx)(c,{href:`https://issues.example.com/browse/${e[1]}`,isExternalLink:!0,weight:`semibold`,children:e[0]},t)},{pattern:/#(\d+)/g,render:(e,t)=>(0,D.jsx)(c,{href:`https://github.com/org/repo/issues/${e[1]}`,isExternalLink:!0,weight:`semibold`,children:e[0]},t)}],density:`compact`,headingLevelStart:2,children:[`## Release Notes — v2.1.0`,``,`This release fixes several issues reported in PROJ-42 and introduces`,`the inline plugins feature requested in #1873.`,``,`### Bug Fixes`,``,`- Fixed crash in streaming mode (BUG-789)`,`- Resolved memory leak in chat components (PROJ-101)`,`- **Bold context**: Plugin works inside **PROJ-55 formatting**`,``,`### Code Example (not linkified)`,``,"```typescript",`// PROJ-999 and BUG-888 should NOT become links inside code blocks`,`const ticketId = "PROJ-999";`,"```",``,"Inline code is also safe: `PROJ-999` stays as plain text.",``,`### Migration Guide`,``,`See PROJ-200 for the full pattern. Also check [the docs](/docs/markdown)`,`for usage alongside regular markdown links.`].join(`
`)})})},fr=({value:e,display:t})=>(0,D.jsx)(t===`block`?`div`:`span`,{role:`math`,"aria-label":`Formula: ${e}`,style:{display:t===`block`?`block`:`inline`,padding:t===`block`?`12px 16px`:`1px 4px`,marginBlock:t===`block`?12:void 0,border:`1px solid var(--color-border)`,borderRadius:6,fontFamily:`serif`,fontStyle:`italic`,textAlign:t===`block`?`center`:void 0},children:e}),X={name:`Custom Math Renderer`,render:()=>(0,D.jsx)(`div`,{style:{maxWidth:680},children:(0,D.jsx)(m,{components:{math:fr},children:`A renderer can typeset inline math such as $E = mc^2$ without preprocessing the source.

$$
\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}
$$

Code remains opaque: \`$not_math$\`.`})})},pr=[`First line`,`Second **emphasized** line`,``,`[Linked`,`label](/docs) stays one protected link.`,``,"```text",`fenced`,`code`,"```"].join(`
`),Z={name:`First-party soft breaks`,parameters:{docs:{description:{story:`The first-party native plugin matches adapted remark-breaks output for supported prose. Links and code remain protected in both paths.`}}},render:()=>(0,D.jsxs)(`div`,{style:{display:`grid`,gap:24,maxWidth:680},children:[(0,D.jsxs)(`section`,{"data-soft-breaks":`native`,children:[(0,D.jsx)(i,{children:`Native first-party plugin`}),(0,D.jsx)(m,{plugins:[it],children:pr})]}),(0,D.jsxs)(`section`,{"data-soft-breaks":`remark`,children:[(0,D.jsx)(i,{children:`Adapted remark-breaks`}),(0,D.jsx)(m,{plugins:[Jn],children:pr})]})]}),play:async({canvasElement:e})=>{let t=t=>{let n=e.querySelector(`[data-soft-breaks="${t}"]`);if(n==null)throw Error(`missing soft-breaks pane: ${t}`);return n},n=t(`native`),r=t(`remark`);await O(n.querySelectorAll(`br`)).toHaveLength(2),await O(r.querySelectorAll(`br`)).toHaveLength(2),await O(n.querySelector(`p`)?.innerHTML).toBe(r.querySelector(`p`)?.innerHTML),await O(k(n).getByRole(`link`,{name:`Linked label`})).toHaveAttribute(`href`,`/docs`),await O(k(r).getByRole(`link`,{name:`Linked label`})).toHaveAttribute(`href`,`/docs`),await O(n.querySelector(`code`)?.textContent).toBe(`fenced
code`),await O(r.querySelector(`code`)?.textContent).toBe(`fenced
code`)}},mr={name:`Syntax Plugins`,render:()=>(0,D.jsx)(`div`,{style:{maxWidth:680},children:(0,D.jsx)(m,{plugins:_t,children:`# Plugin composition

Hello @{Ada}. Ordinary **Markdown** keeps its behavior, while TODO becomes a transform-owned node.

:::note
This callout and mention are typed extension nodes.
:::

Protected contexts stay literal: \`TODO @{Linus}\` and [TODO @{Grace}](/people).`})})},hr={name:`Plugin renderer with Suspense`,render:()=>{let[e,t]=(0,E.useState)(0),n=(0,E.useMemo)(()=>lt(),[e]);return(0,D.jsxs)(`div`,{style:{maxWidth:680},children:[(0,D.jsx)(`div`,{style:{marginBlockEnd:12},children:(0,D.jsx)(a,{label:`Replay delayed renderer`,variant:`secondary`,size:`sm`,onClick:()=>t(e=>e+1)})}),(0,D.jsx)(m,{plugins:[n],children:`Before the async node.

Hello @{Ada}. This sibling Markdown renders immediately.

After the async node.`},e)]})}},gr={name:`Semantic Fence`,render:()=>(0,D.jsx)(`div`,{style:{maxWidth:680},children:(0,D.jsx)(m,{plugins:[ht],children:"# Build flow\n\n```diagram Checkout to deploy\nCheckout --> Test --> Deploy\n```\n\nThe plugin renderer presents typed data only for declared languages. Other fences keep the ordinary copyable code fallback:\n\n```text\npnpm test\n```"})})},_r=`# Release notes

The parser now streams incrementally.

Everything else is unchanged.`,vr={name:`Source Decoration Metadata`,render:()=>{let{plugins:e,readout:t}=ut(_r,`The parser now streams incrementally.`);return(0,D.jsxs)(`div`,{style:{maxWidth:680},children:[(0,D.jsx)(m,{plugins:e,children:_r}),(0,D.jsxs)(i,{children:[`Decorations recorded while rendering: `,t.join(`, `)||`none`,`. The document above is identical with and without them because the helper records metadata rather than visual presentation.`]})]})}},yr=[`# Plugin composition`,``,`Hello @{Ada}. TODO becomes a transform-owned node, and SPEC-4821 is claimed`,`by whichever plugin runs first, next to an [Authored link](/people).`,``,`:::note`,`Native syntax and an adapted Remark transform share one ordered list.`,`:::`,``,"Protected contexts stay literal: `TODO @{Linus} SPEC-9999`.",``,"```txt",`SPEC-9999 stays copyable`,"```"].join(`
`),br=[..._t,qn,Yn],xr=[..._t,Yn,qn],Sr={name:`Native and Remark plugins`,parameters:{docs:{description:{story:`Native syntax plugins and one adapted synchronous Remark transform run in the same ordered list, and the order decides the outcome. Both claim SPEC-4821: running the native badge first leaves the Remark transform nothing to link, and running the Remark transform first puts the text inside a link, which the native helper treats as a protected context. Astryx keeps ownership of the transformed destination, and code stays copyable either way.`}}},render:()=>(0,D.jsxs)(`div`,{style:{display:`grid`,gap:24,maxWidth:680},children:[(0,D.jsxs)(`section`,{"data-order":`native-first`,children:[(0,D.jsx)(i,{children:`Native badge plugin first`}),(0,D.jsx)(m,{plugins:br,children:yr})]}),(0,D.jsxs)(`section`,{"data-order":`remark-first`,children:[(0,D.jsx)(i,{children:`Adapted Remark plugin first`}),(0,D.jsx)(m,{plugins:xr,children:yr})]})]}),play:async({canvasElement:e})=>{let t=k(e),n=t=>{let n=e.querySelector(`[data-order="${t}"]`);if(n==null)throw Error(`missing pane: ${t}`);return n},r=k(n(`native-first`)),i=k(n(`remark-first`));await O(r.getByText(`@Ada`)).toBeInTheDocument(),await O(r.getByLabelText(`Note`)).toBeInTheDocument(),await O(r.getByText(`TODO`)).toBeInTheDocument();let a=r.getByText(`SPEC-4821`);await O(a).toHaveAttribute(`data-spec-badge`),await O(r.queryByRole(`link`,{name:`SPEC-4821`})).not.toBeInTheDocument();let o=i.getByRole(`link`,{name:`SPEC-4821`});await O(o).toHaveAttribute(`href`,`/specs/4821`),await O(i.getByText(`SPEC-4821`)).not.toHaveAttribute(`data-spec-badge`),await O(t.getAllByText(`TODO @{Linus} SPEC-9999`)).toHaveLength(2),await O(t.getAllByText(`SPEC-9999 stays copyable`)).toHaveLength(2),await O(i.getAllByRole(`link`).map(e=>e.textContent)).toEqual([`SPEC-4821`,`Authored link`]),o.focus(),await O(o).toHaveFocus(),await $n.tab(),await O(i.getByRole(`link`,{name:`Authored link`})).toHaveFocus()}},Cr=[`---`,`title: Plugin rollout`,`status: ready`,`---`,`# Plugin rollout`,``,`Hello @{Ada}. TODO tracks SPEC-4821.`,``,"```diagram Release path",`Author --> Review --> Publish`,"```"].join(`
`),wr={name:`Native frontmatter with full plugin stack`,render:()=>{let e=gt.parse(Cr),{plugins:t}=ut(Cr,`Plugin rollout`),n=[gt.plugin,..._t,ht,Yn,...t];return(0,D.jsxs)(`div`,{style:{maxWidth:680},children:[(0,D.jsxs)(i,{children:[`Document metadata: `,e.status===`match`?`${e.metadata.title} — ${e.metadata.status}`:`No document metadata`]}),(0,D.jsx)(m,{plugins:n,children:Cr})]})},play:async({canvasElement:e})=>{let t=k(e);await O(t.getByText(`Document metadata: Plugin rollout — ready`)).toBeInTheDocument(),await O(t.getByRole(`heading`,{name:`Plugin rollout`})).toBeInTheDocument(),await O(t.getByText(`@Ada`)).toBeInTheDocument(),await O(t.getByText(`TODO`)).toBeInTheDocument(),await O(t.getByRole(`link`,{name:`SPEC-4821`})).toHaveAttribute(`href`,`/specs/4821`),await O(t.getByRole(`figure`,{name:`Release path`})).toBeVisible(),await O(t.queryByText(`title: Plugin rollout`)).not.toBeInTheDocument()}},Q={name:`Remark outside the profile`,parameters:{docs:{description:{story:`A plugin that emits raw HTML or a rejected destination falls closed: the last valid document stays readable, no markup is injected, and the authored destination survives.`}}},render:()=>(0,D.jsx)(`div`,{style:{maxWidth:680},children:(0,D.jsx)(m,{plugins:[Xn,Zn],children:`# Still readable

Prose survives with its [authored link](/people).`})}),play:async({canvasElement:e})=>{let t=k(e);await O(t.getByRole(`heading`,{name:`Still readable`})).toBeInTheDocument(),await O(t.getByRole(`link`,{name:`authored link`})).toHaveAttribute(`href`,`/people`),await O(t.queryByText(`Injected`)).not.toBeInTheDocument()}},$={name:`Plugins omitted baseline`,parameters:{docs:{description:{story:`The same source without plugins. Extension syntax stays literal, no badge or transformed link exists, so opting in is the only thing that changes behavior.`}}},render:()=>(0,D.jsx)(`div`,{style:{maxWidth:680},children:(0,D.jsx)(m,{children:yr})}),play:async({canvasElement:e})=>{let t=k(e);await O(t.queryByRole(`link`,{name:`SPEC-4821`})).not.toBeInTheDocument(),await O(t.queryByLabelText(`Note`)).not.toBeInTheDocument(),await O(t.getByText(/Hello @\{Ada\}/)).toBeInTheDocument(),await O(t.getByRole(`link`,{name:`Authored link`})).toBeInTheDocument()}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    children: SAMPLE_MD
  }
}`,...A.parameters?.docs?.source}}},rr.parameters={...rr.parameters,docs:{...rr.parameters?.docs,source:{originalSource:`{
  args: {
    children: SAMPLE_MD,
    density: 'compact'
  }
}`,...rr.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  name: 'AI Response',
  args: {
    children: STREAMING_RESPONSE,
    density: 'compact',
    headingLevelStart: 3
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  name: 'Lazy continuations',
  args: {
    children: ['## Wrapped container paragraphs', '', '> A quoted paragraph can wrap onto another source line', 'without repeating the quote marker.', '>', '> A later paragraph can wrap too', 'and remain in the same quote.', '', '- A list item can wrap the same way', 'without repeating its indentation.', '', '- [ ] A task item also keeps', 'its unindented continuation.', '', '> 1. > Nested quote text', 'continues in the deepest open paragraph.', '', 'This paragraph follows all containers.'].join('\\n')
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  name: 'Shifted Headings (start at h3)',
  args: {
    children: SAMPLE_MD,
    headingLevelStart: 3
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  name: 'Inline Display',
  render: () => <div style={{
    maxWidth: 680,
    display: 'grid',
    gap: 16
  }}>
      <Text type="large" display="block">
        <Markdown display="inline">
          {'Use \`value\` with **controlled state** and [read the docs](https://example.com) without creating block wrappers.'}
        </Markdown>
      </Text>

      <div style={{
      border: '1px solid #ddd',
      borderRadius: 8,
      padding: 12,
      display: 'grid',
      gap: 6
    }}>
        <Text type="body" weight="bold" display="block">
          Prop description
        </Text>
        <Text type="body" color="secondary" display="block">
          <Markdown display="inline">
            {'Accepts an action item \`{label, onClick?, icon?}\`, a divider \`{type: "divider"}\`, or a section \`{type: "section", items: [...]}\`.'}
          </Markdown>
        </Text>
      </div>
    </div>
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  name: 'Table',
  args: {
    children: ['## Comparison Table', '', '| Feature | React | Vue | Svelte |', '|:--------|:-----:|:---:|-------:|', '| Virtual DOM | Yes | Yes | No |', '| Bundle Size | ~40KB | ~30KB | ~2KB |', '| TypeScript | Native | Plugin | Native |', '| Learning Curve | Medium | Easy | Easy |'].join('\\n')
  }
}`,...F.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  name: 'Table — six short columns',
  parameters: {
    docs: {
      description: {
        story: 'Six short columns fit the reading column instead of squashing. Each column keeps a content-derived floor in \`ch\` on its text box, so the floor means the same number of characters whatever the cell padding is, and a table this narrow never needs to scroll.'
      }
    }
  },
  argTypes: NARROW_WIDTH_ARG_TYPES,
  args: {
    width: '390'
  },
  render: ({
    width
  }) => <ReadingColumn width={width}>{SHORT_SIX_COLUMN_TABLE}</ReadingColumn>
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  name: 'Table — six prose columns',
  parameters: {
    docs: {
      description: {
        story: 'Prose columns have no long tokens, so min-content alone would let six of them wrap one word per line. The readable floor — half the longest cell, capped — gives each column enough width to wrap to a couple of lines instead.'
      }
    }
  },
  argTypes: NARROW_WIDTH_ARG_TYPES,
  args: {
    width: '390'
  },
  render: ({
    width
  }) => <ReadingColumn width={width}>{SIX_PROSE_COLUMN_TABLE}</ReadingColumn>
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  name: 'Table — edge shapes',
  parameters: {
    docs: {
      description: {
        story: 'Five shapes that stress the column floor: a header row with no body, empty cells, a 180-character token far past the floor cap (the column grows to its min-content rather than breaking the token), a cell mixing a link with inline code, and a minimum-floor column beside a capped one.'
      }
    }
  },
  argTypes: NARROW_WIDTH_ARG_TYPES,
  args: {
    width: '390'
  },
  render: ({
    width
  }) => <ReadingColumn width={width}>{EDGE_SHAPE_TABLES}</ReadingColumn>
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  name: 'Table — API reference',
  parameters: {
    docs: {
      description: {
        story: 'A real API reference in a narrow reading column: a two-character method column beside routes that must stay readable. The path column is floored by its own content, so \`/v2/projects/{projectId}/documents\` does not split across lines, and the table scrolls rather than squashing the method column to nothing.'
      }
    }
  },
  argTypes: NARROW_WIDTH_ARG_TYPES,
  args: {
    width: '390'
  },
  render: ({
    width
  }) => <ReadingColumn width={width}>{API_REFERENCE_TABLE}</ReadingColumn>
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  name: 'Table — release status',
  parameters: {
    docs: {
      description: {
        story: 'A deployment dashboard pasted into a narrow column: six columns, most of them short, one carrying a sentence. Version strings such as \`4.13.0-rc.2\` stay whole, and the short columns keep their minimum floor instead of collapsing to a character apiece.'
      }
    }
  },
  argTypes: NARROW_WIDTH_ARG_TYPES,
  args: {
    width: '390'
  },
  render: ({
    width
  }) => <ReadingColumn width={width}>{RELEASE_STATUS_TABLE}</ReadingColumn>
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  name: 'Table — feature comparison',
  parameters: {
    docs: {
      description: {
        story: 'A plan comparison matrix, where the headers are longer than the cells under them. Each header reads on one line up to its cap and wraps past it — never truncating to \`Availabl…\` — and a two-character cell such as \`No\` still gets a readable column.'
      }
    }
  },
  argTypes: NARROW_WIDTH_ARG_TYPES,
  args: {
    width: '390'
  },
  render: ({
    width
  }) => <ReadingColumn width={width}>{FEATURE_COMPARISON_TABLE}</ReadingColumn>
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  name: 'Table — wide, token-heavy content',
  parameters: {
    docs: {
      description: {
        story: 'Long identifiers, a long URL, and inline code stay whole: the column is never narrower than its longest unbreakable token, and the table scrolls in Table’s own Scroll region rather than shredding words. Header labels wrap past their one-line cap instead of ellipsizing.'
      }
    }
  },
  argTypes: NARROW_WIDTH_ARG_TYPES,
  args: {
    width: '390'
  },
  render: ({
    width
  }) => <ReadingColumn width={width}>{WIDE_TOKEN_TABLE}</ReadingColumn>
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  name: 'Table — in a chat message',
  parameters: {
    docs: {
      description: {
        story: 'The narrow reading column as chat surfaces actually have it: a deployment status table — the kind an assistant answers with — inside a \`ChatMessageBubble\`, which already accepts Markdown as its content. The bubble constrains the message, and the table still keeps its column floors and scrolls inside Table’s own Scroll region — the bubble adds no second scroller.'
      }
    }
  },
  argTypes: NARROW_WIDTH_ARG_TYPES,
  args: {
    width: '390'
  },
  render: ({
    width
  }) => <div style={{
    width: Number(width),
    maxWidth: '100%',
    padding: 12,
    outline: '1px dashed #c33'
  }}>
      <ChatMessageList>
        <ChatMessage sender="user">
          <ChatMessageBubble>
            Which services are still rolling out?
          </ChatMessageBubble>
        </ChatMessage>
        <ChatMessage sender="assistant">
          <ChatMessageBubble>
            <Markdown density="compact">{RELEASE_STATUS_TABLE}</Markdown>
          </ChatMessageBubble>
        </ChatMessage>
      </ChatMessageList>
    </div>
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => {
    const text = STREAMING_RESPONSE;
    const [charIndex, setCharIndex] = useState(0);
    const [isStreaming, setIsStreaming] = useState(true);
    const [key, setKey] = useState(0);
    useEffect(() => {
      if (!isStreaming) {
        return;
      }
      if (charIndex >= text.length) {
        setIsStreaming(false);
        return;
      }
      const chunkSize = Math.floor(Math.random() * 8) + 2;
      const delay = 30 + Math.random() * 60;
      const timer = setTimeout(() => {
        setCharIndex(prev => Math.min(prev + chunkSize, text.length));
      }, delay);
      return () => clearTimeout(timer);
    }, [charIndex, isStreaming, text]);
    const replay = useCallback(() => {
      setCharIndex(0);
      setIsStreaming(true);
      setKey(k => k + 1);
    }, []);
    return <div>
        <div style={{
        marginBlockEnd: 12,
        display: 'flex',
        gap: 8,
        alignItems: 'center'
      }}>
          <Button label="Replay" variant="secondary" size="sm" onClick={replay} isDisabled={isStreaming} />
          <span style={{
          fontSize: 12,
          color: 'var(--color-text-secondary)'
        }}>
            {isStreaming ? \`Streaming... \${charIndex}/\${text.length}\` : 'Complete'}
          </span>
        </div>
        <Markdown key={key} isStreaming={isStreaming} density="compact" headingLevelStart={3}>
          {text.slice(0, charIndex)}
        </Markdown>
      </div>;
  }
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  name: 'With Images',
  render: () => <div style={{
    maxWidth: 800
  }}>
      <Markdown>{\`
Here is some text before the image.

![A landscape photo](https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=680&h=400&fit=crop&auto=format)

Text between two images.

![A tall portrait photo](https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=600&fit=crop&auto=format)

And here's a really wide one:

![Wide panoramic shot](https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200&h=300&fit=crop&auto=format)

Final paragraph after all images.
\`}</Markdown>
    </div>
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  name: 'Content Align: Start',
  render: () => <div style={{
    maxWidth: 900,
    border: '1px dashed #ccc',
    padding: 16
  }}>
      <Markdown contentWidth={580} contentAlign="start">
        {CONTENT_ALIGN_TEXT}
      </Markdown>
    </div>
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  name: 'Content Align: Center',
  render: () => <div style={{
    maxWidth: 900,
    border: '1px dashed #ccc',
    padding: 16
  }}>
      <Markdown contentWidth={580} contentAlign="center">
        {CONTENT_ALIGN_TEXT}
      </Markdown>
    </div>
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  name: 'Inline Plugins',
  render: () => {
    const inlinePlugins = [{
      // JIRA-style ticket references: PROJ-123, BUG-456, etc.
      pattern: /\\b([A-Z][A-Z0-9]+-\\d+)\\b/g,
      render: (match: RegExpMatchArray, key: string) => <Link key={key} href={\`https://issues.example.com/browse/\${match[1]}\`} isExternalLink weight="semibold">
            {match[0]}
          </Link>
    }, {
      // GitHub-style issue references: #123, #456, etc.
      pattern: /#(\\d+)/g,
      render: (match: RegExpMatchArray, key: string) => <Link key={key} href={\`https://github.com/org/repo/issues/\${match[1]}\`} isExternalLink weight="semibold">
            {match[0]}
          </Link>
    }];
    const markdown = ['## Release Notes — v2.1.0', '', 'This release fixes several issues reported in PROJ-42 and introduces', 'the inline plugins feature requested in #1873.', '', '### Bug Fixes', '', '- Fixed crash in streaming mode (BUG-789)', '- Resolved memory leak in chat components (PROJ-101)', '- **Bold context**: Plugin works inside **PROJ-55 formatting**', '', '### Code Example (not linkified)', '', '\`\`\`typescript', '// PROJ-999 and BUG-888 should NOT become links inside code blocks', 'const ticketId = "PROJ-999";', '\`\`\`', '', 'Inline code is also safe: \`PROJ-999\` stays as plain text.', '', '### Migration Guide', '', 'See PROJ-200 for the full pattern. Also check [the docs](/docs/markdown)', 'for usage alongside regular markdown links.'].join('\\n');
    return <div style={{
      maxWidth: 680
    }}>
        <Markdown inlinePlugins={inlinePlugins} density="compact" headingLevelStart={2}>
          {markdown}
        </Markdown>
      </div>;
  }
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  name: 'Custom Math Renderer',
  render: () => <div style={{
    maxWidth: 680
  }}>
      <Markdown components={{
      math: StoryMath
    }}>
        {'A renderer can typeset inline math such as $E = mc^2$ without preprocessing the source.\\n\\n$$\\n\\\\sum_{i=1}^{n} i = \\\\frac{n(n+1)}{2}\\n$$\\n\\nCode remains opaque: \`$not_math$\`.'}
      </Markdown>
    </div>
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  name: 'First-party soft breaks',
  parameters: {
    docs: {
      description: {
        story: 'The first-party native plugin matches adapted remark-breaks output for supported prose. Links and code remain protected in both paths.'
      }
    }
  },
  render: () => <div style={{
    display: 'grid',
    gap: 24,
    maxWidth: 680
  }}>
      <section data-soft-breaks="native">
        <Text>Native first-party plugin</Text>
        <Markdown plugins={[markdownSoftBreaksPlugin]}>
          {softBreaksSource}
        </Markdown>
      </section>
      <section data-soft-breaks="remark">
        <Text>Adapted remark-breaks</Text>
        <Markdown plugins={[remarkBreaksPlugin]}>{softBreaksSource}</Markdown>
      </section>
    </div>,
  play: async ({
    canvasElement
  }) => {
    const pane = (kind: string): HTMLElement => {
      const element = canvasElement.querySelector<HTMLElement>(\`[data-soft-breaks="\${kind}"]\`);
      if (element == null) {
        throw new Error(\`missing soft-breaks pane: \${kind}\`);
      }
      return element;
    };
    const nativePane = pane('native');
    const remarkPane = pane('remark');
    await expect(nativePane.querySelectorAll('br')).toHaveLength(2);
    await expect(remarkPane.querySelectorAll('br')).toHaveLength(2);
    await expect(nativePane.querySelector('p')?.innerHTML).toBe(remarkPane.querySelector('p')?.innerHTML);
    await expect(within(nativePane).getByRole('link', {
      name: 'Linked label'
    })).toHaveAttribute('href', '/docs');
    await expect(within(remarkPane).getByRole('link', {
      name: 'Linked label'
    })).toHaveAttribute('href', '/docs');
    await expect(nativePane.querySelector('code')?.textContent).toBe('fenced\\ncode');
    await expect(remarkPane.querySelector('code')?.textContent).toBe('fenced\\ncode');
  }
}`,...Z.parameters?.docs?.source}}},mr.parameters={...mr.parameters,docs:{...mr.parameters?.docs,source:{originalSource:`{
  name: 'Syntax Plugins',
  render: () => <div style={{
    maxWidth: 680
  }}>
      <Markdown plugins={markdownDemoPlugins}>
        {'# Plugin composition\\n\\nHello @{Ada}. Ordinary **Markdown** keeps its behavior, while TODO becomes a transform-owned node.\\n\\n:::note\\nThis callout and mention are typed extension nodes.\\n:::\\n\\nProtected contexts stay literal: \`TODO @{Linus}\` and [TODO @{Grace}](/people).'}
      </Markdown>
    </div>
}`,...mr.parameters?.docs?.source}}},hr.parameters={...hr.parameters,docs:{...hr.parameters?.docs,source:{originalSource:`{
  name: 'Plugin renderer with Suspense',
  render: () => {
    const [run, setRun] = useState(0);
    const delayedPlugin = useMemo(() => createDelayedMarkdownDemoPlugin(), [run]);
    return <div style={{
      maxWidth: 680
    }}>
        <div style={{
        marginBlockEnd: 12
      }}>
          <Button label="Replay delayed renderer" variant="secondary" size="sm" onClick={() => setRun(value => value + 1)} />
        </div>
        <Markdown key={run} plugins={[delayedPlugin]}>
          {'Before the async node.\\n\\nHello @{Ada}. This sibling Markdown renders immediately.\\n\\nAfter the async node.'}
        </Markdown>
      </div>;
  }
}`,...hr.parameters?.docs?.source}}},gr.parameters={...gr.parameters,docs:{...gr.parameters?.docs,source:{originalSource:"{\n  name: 'Semantic Fence',\n  render: () => <div style={{\n    maxWidth: 680\n  }}>\n      <Markdown plugins={[markdownSemanticFenceDemoPlugin]}>\n        {'# Build flow\\n\\n```diagram Checkout to deploy\\nCheckout --> Test --> Deploy\\n```\\n\\nThe plugin renderer presents typed data only for declared languages. Other fences keep the ordinary copyable code fallback:\\n\\n```text\\npnpm test\\n```'}\n      </Markdown>\n    </div>\n}",...gr.parameters?.docs?.source}}},vr.parameters={...vr.parameters,docs:{...vr.parameters?.docs,source:{originalSource:`{
  name: 'Source Decoration Metadata',
  render: () => {
    const {
      plugins,
      readout
    } = createSourceDecorationDemo(decorationSource, 'The parser now streams incrementally.');
    return <div style={{
      maxWidth: 680
    }}>
        <Markdown plugins={plugins}>{decorationSource}</Markdown>
        <Text>
          Decorations recorded while rendering: {readout.join(', ') || 'none'}.
          The document above is identical with and without them because the
          helper records metadata rather than visual presentation.
        </Text>
      </div>;
  }
}`,...vr.parameters?.docs?.source}}},Sr.parameters={...Sr.parameters,docs:{...Sr.parameters?.docs,source:{originalSource:`{
  name: 'Native and Remark plugins',
  parameters: {
    docs: {
      description: {
        story: 'Native syntax plugins and one adapted synchronous Remark transform run in the same ordered list, and the order decides the outcome. Both claim SPEC-4821: running the native badge first leaves the Remark transform nothing to link, and running the Remark transform first puts the text inside a link, which the native helper treats as a protected context. Astryx keeps ownership of the transformed destination, and code stays copyable either way.'
      }
    }
  },
  render: () => <div style={{
    display: 'grid',
    gap: 24,
    maxWidth: 680
  }}>
      <section data-order="native-first">
        <Text>Native badge plugin first</Text>
        <Markdown plugins={nativeFirst}>{nativeAndRemarkSource}</Markdown>
      </section>
      <section data-order="remark-first">
        <Text>Adapted Remark plugin first</Text>
        <Markdown plugins={remarkFirst}>{nativeAndRemarkSource}</Markdown>
      </section>
    </div>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const pane = (order: string): HTMLElement => {
      const element = canvasElement.querySelector<HTMLElement>(\`[data-order="\${order}"]\`);
      if (element == null) {
        throw new Error(\`missing pane: \${order}\`);
      }
      return element;
    };
    const nativeFirstPane = within(pane('native-first'));
    const remarkFirstPane = within(pane('remark-first'));

    // Native syntax and transform plugins still own their own nodes.
    await expect(nativeFirstPane.getByText('@Ada')).toBeInTheDocument();
    await expect(nativeFirstPane.getByLabelText('Note')).toBeInTheDocument();
    await expect(nativeFirstPane.getByText('TODO')).toBeInTheDocument();

    // Native first: the badge consumed the prose, so no link was produced.
    const badge = nativeFirstPane.getByText('SPEC-4821');
    await expect(badge).toHaveAttribute('data-spec-badge');
    await expect(nativeFirstPane.queryByRole('link', {
      name: 'SPEC-4821'
    })).not.toBeInTheDocument();

    // Reversed: the Remark transform consumed it, and the native helper left
    // the link's children alone — so the same source renders differently.
    const specLink = remarkFirstPane.getByRole('link', {
      name: 'SPEC-4821'
    });
    await expect(specLink).toHaveAttribute('href', '/specs/4821');
    await expect(remarkFirstPane.getByText('SPEC-4821')).not.toHaveAttribute('data-spec-badge');

    // Protected contexts and copyable code are untouched in both orders.
    await expect(canvas.getAllByText('TODO @{Linus} SPEC-9999')).toHaveLength(2);
    await expect(canvas.getAllByText('SPEC-9999 stays copyable')).toHaveLength(2);

    // Keyboard order follows document order: the transformed link is an
    // ordinary tab stop that hands focus on to the authored link.
    await expect(remarkFirstPane.getAllByRole('link').map(link => link.textContent)).toEqual(['SPEC-4821', 'Authored link']);
    specLink.focus();
    await expect(specLink).toHaveFocus();
    await userEvent.tab();
    await expect(remarkFirstPane.getByRole('link', {
      name: 'Authored link'
    })).toHaveFocus();
  }
}`,...Sr.parameters?.docs?.source}}},wr.parameters={...wr.parameters,docs:{...wr.parameters?.docs,source:{originalSource:`{
  name: 'Native frontmatter with full plugin stack',
  render: () => {
    const metadata = markdownFrontmatterDemo.parse(fullStackFrontmatterSource);
    const {
      plugins: decorationPlugins
    } = createSourceDecorationDemo(fullStackFrontmatterSource, 'Plugin rollout');
    const plugins = [markdownFrontmatterDemo.plugin, ...markdownDemoPlugins, markdownSemanticFenceDemoPlugin, remarkSpecLinkPlugin, ...decorationPlugins];
    const label = metadata.status === 'match' ? \`\${metadata.metadata.title} — \${metadata.metadata.status}\` : 'No document metadata';
    return <div style={{
      maxWidth: 680
    }}>
        <Text>Document metadata: {label}</Text>
        <Markdown plugins={plugins}>{fullStackFrontmatterSource}</Markdown>
      </div>;
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Document metadata: Plugin rollout — ready')).toBeInTheDocument();
    await expect(canvas.getByRole('heading', {
      name: 'Plugin rollout'
    })).toBeInTheDocument();
    await expect(canvas.getByText('@Ada')).toBeInTheDocument();
    await expect(canvas.getByText('TODO')).toBeInTheDocument();
    await expect(canvas.getByRole('link', {
      name: 'SPEC-4821'
    })).toHaveAttribute('href', '/specs/4821');
    await expect(canvas.getByRole('figure', {
      name: 'Release path'
    })).toBeVisible();
    await expect(canvas.queryByText('title: Plugin rollout')).not.toBeInTheDocument();
  }
}`,...wr.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  name: 'Remark outside the profile',
  parameters: {
    docs: {
      description: {
        story: 'A plugin that emits raw HTML or a rejected destination falls closed: the last valid document stays readable, no markup is injected, and the authored destination survives.'
      }
    }
  },
  render: () => <div style={{
    maxWidth: 680
  }}>
      <Markdown plugins={[remarkRawHtmlPlugin, remarkUnsafeLinkPlugin]}>
        {'# Still readable\\n\\nProse survives with its [authored link](/people).'}
      </Markdown>
    </div>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', {
      name: 'Still readable'
    })).toBeInTheDocument();
    await expect(canvas.getByRole('link', {
      name: 'authored link'
    })).toHaveAttribute('href', '/people');
    await expect(canvas.queryByText('Injected')).not.toBeInTheDocument();
  }
}`,...Q.parameters?.docs?.source}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  name: 'Plugins omitted baseline',
  parameters: {
    docs: {
      description: {
        story: 'The same source without plugins. Extension syntax stays literal, no badge or transformed link exists, so opting in is the only thing that changes behavior.'
      }
    }
  },
  render: () => <div style={{
    maxWidth: 680
  }}>
      <Markdown>{nativeAndRemarkSource}</Markdown>
    </div>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByRole('link', {
      name: 'SPEC-4821'
    })).not.toBeInTheDocument();
    await expect(canvas.queryByLabelText('Note')).not.toBeInTheDocument();
    await expect(canvas.getByText(/Hello @\\{Ada\\}/)).toBeInTheDocument();
    await expect(canvas.getByRole('link', {
      name: 'Authored link'
    })).toBeInTheDocument();
  }
}`,...$.parameters?.docs?.source}}},Tr=`Default.Compact.AIResponse.LazyContinuations.ShiftedHeadings.InlineDisplay.TableFocused.TableNarrowShortColumns.TableNarrowProseColumns.TableNarrowEdgeShapes.TableRealisticApiReference.TableRealisticReleaseStatus.TableRealisticComparison.TableNarrowWideContent.TableInChatMessage.Streaming.WithImages.ContentAlignStart.ContentAlignCenter.InlinePlugins.CustomMath.SoftBreaks.SyntaxPlugins.SuspenseRenderer.SemanticFence.SourceDecoration.NativeAndRemarkPlugins.NativeFrontmatterWithFullStack.RemarkOutsideTheProfile.PluginsOmittedBaseline`.split(`.`)}))();export{j as AIResponse,rr as Compact,J as ContentAlignCenter,q as ContentAlignStart,X as CustomMath,A as Default,P as InlineDisplay,Y as InlinePlugins,M as LazyContinuations,Sr as NativeAndRemarkPlugins,wr as NativeFrontmatterWithFullStack,$ as PluginsOmittedBaseline,Q as RemarkOutsideTheProfile,gr as SemanticFence,N as ShiftedHeadings,Z as SoftBreaks,vr as SourceDecoration,G as Streaming,hr as SuspenseRenderer,mr as SyntaxPlugins,F as TableFocused,W as TableInChatMessage,z as TableNarrowEdgeShapes,R as TableNarrowProseColumns,L as TableNarrowShortColumns,U as TableNarrowWideContent,B as TableRealisticApiReference,H as TableRealisticComparison,V as TableRealisticReleaseStatus,K as WithImages,Tr as __namedExportsOrder,er as default};