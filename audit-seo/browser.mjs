import puppeteer from 'puppeteer';
import {writeFileSync} from 'node:fs';
const browser=await puppeteer.launch({headless:true});
const paths=['/servicios','/packages/disneyland-paris','/paquetes','/destinos/japon','/seo-audit-inexistente-20260929','/contacto'];
const rows=[];
for(const path of paths){
 const p=await browser.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:1});
 try{await p.goto('https://www.saltysoultrips.com'+path,{waitUntil:'networkidle2',timeout:30000});await new Promise(r=>setTimeout(r,1500));
 rows.push({path,...await p.evaluate(()=>({url:location.href,title:document.title,lang:document.documentElement.lang,canonical:document.querySelector('link[rel=canonical]')?.href,h1:[...document.querySelectorAll('#root h1')].map(e=>e.textContent),text:document.querySelector('#root')?.innerText,links:[...document.querySelectorAll('#root main a')].map(e=>({href:e.getAttribute('href'),text:e.textContent})),resources:performance.getEntriesByType('resource').map(e=>({name:e.name,bytes:e.transferSize,duration:e.duration})),overflow:document.documentElement.scrollWidth>innerWidth}))});
 if(path==='/contacto'||path==='/paquetes')await p.screenshot({path:'audit-seo/'+path.slice(1)+'-mobile.png',fullPage:true});
 }catch(e){rows.push({path,error:e.message})}finally{await p.close()}
}
await browser.close();writeFileSync('audit-seo/browser-live.json',JSON.stringify(rows,null,2));
console.log(JSON.stringify(rows.map(({resources,text,...r})=>({...r,text:text?.slice(0,2300),largestResources:resources?.sort((a,b)=>b.bytes-a.bytes).slice(0,5)})),null,2));
