const A=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function o(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerpolicy&&(r.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?r.credentials="include":n.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(n){if(n.ep)return;n.ep=!0;const r=o(n);fetch(n.href,r)}};A();const w=(t,e)=>t/e,C=(t,e)=>t*e,F=(t,e)=>t/e,y=(t,e)=>{const o=t.target.files;if(o&&o.length>0){const a=o[0],n=new FileReader;n.readAsDataURL(a),n.onload=r=>{const s=new Image;s.src=r.target.result,s.onload=()=>{e(s)}}}},E=(t,e,o,a)=>{if(a){const n=F(e,o);t.width=e,t.height=n}else t.width=e},k=(t,e,o,a)=>{if(a){const n=C(e,o);t.width=n,t.height=e}else t.height=e},h=t=>t.checked===!0,O=(t,e,o,a,n)=>{const r=a/2-e/2,s=n/2-o/2;switch(t){case"top-left":return[0,0];case"top-center":return[r,0];case"top-right":return[a-e,0];case"bottom-left":return[0,n-o];case"bottom-center":return[r,n-o];case"bottom-right":return[a-e,n-o];case"center":return[r,s];default:return[0,0]}},i=(t,e,o)=>{e.value=t.width,o.value=t.height},x=(t,e,o,a,n)=>{const r=t.getContext("2d");t.width=e.width,t.height=e.height,r.clearRect(0,0,t.width,t.height),r.drawImage(e,0,0,e.width,e.height),r.globalAlpha=n;const[s,R]=O(a,o.width,o.height,e.width,e.height);r.drawImage(o,s,R,o.width,o.height)},D=t=>{const e=t.toDataURL("image/png"),o=document.createElement("a");o.download="download.png",o.href=e,o.click()},v=document.querySelector("canvas"),N=document.getElementById("baseImageInput"),P=document.getElementById("watermarkImageInput"),u=document.getElementById("baseImageWidth"),l=document.getElementById("baseImageHeight"),B=document.getElementById("baseImageRatioChecked"),m=document.getElementById("watermarkImageWidth"),g=document.getElementById("watermarkImageHeight"),L=document.getElementById("watermarkImageRatioChecked"),S=document.getElementById("watermarkImagePositionInput"),W=document.getElementById("watermarkImageAlpha"),p=document.getElementById("watermarkButton"),q=document.getElementById("inputForm"),b=document.getElementById("saveButton");let c,d,I,f;q.addEventListener("input",()=>{!c||!d?p.disabled=!0:p.disabled=!1});N.addEventListener("input",t=>{y(t,e=>{c=e,I=w(e.width,e.height),i(e,u,l)})});P.addEventListener("input",t=>{y(t,e=>{d=e,f=w(e.width,e.height),i(e,m,g)})});u.addEventListener("input",t=>{const e=parseInt(t.target.value);E(c,e,I,h(B)),i(c,u,l)});l.addEventListener("input",t=>{const e=parseInt(t.target.value);k(c,e,I,h(B)),i(c,u,l)});m.addEventListener("input",t=>{const e=parseInt(t.target.value);E(d,e,f,h(L)),i(d,m,g)});g.addEventListener("input",t=>{const e=parseInt(t.target.value);k(d,e,f,h(L)),i(d,m,g)});p.addEventListener("click",()=>{const t=parseInt(W.value)/100;x(v,c,d,S.value,t),b.disabled=!1});b.addEventListener("click",()=>{D(v)});
