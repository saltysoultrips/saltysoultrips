import {writeFileSync,mkdirSync} from 'node:fs';
const base='https://www.saltysoultrips.com';
mkdirSync('audit-seo',{recursive:true});
const xml=await (await fetch(base+'/sitemap.xml')).text();
writeFileSync('audit-seo/sitemap-live.xml',xml);
const urls=[...new Set([...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]).concat([base+'/seo-audit-inexistente-20260929',base+'/destinos/japon', 'https://saltysoultrips.com/','http://www.saltysoultrips.com/']))];
const strip=s=>s.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
const results=[];
for(let i=0;i<urls.length;i+=4) {
  await Promise.all(urls.slice(i,i+4).map(async url=>{
    try {
      const r=await fetch(url,{signal:AbortSignal.timeout(20000)}); const html=await r.text();
      const tags=[...html.matchAll(/<(?:meta|link)\b[^>]*>/g)].map(m=>m[0]);
      const body=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/g,'').replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/g,'');
      const row={url,status:r.status,finalUrl:r.url,bytes:Buffer.byteLength(html),title:strip(html.match(/<title[^>]*>([\s\S]*?)<\/title>/)?.[1]||''),lang:html.match(/<html[^>]*lang="([^"]*)"/)?.[1],canonical:tags.filter(t=>/rel="canonical"/.test(t)),description:tags.filter(t=>/name="description"/.test(t)),robots:tags.filter(t=>/name="robots"/.test(t)),alternates:tags.filter(t=>/hreflang=/.test(t)),h1:[...body.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)].map(m=>strip(m[1])),schemas:[...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m=>{try{return JSON.parse(m[1])}catch{return m[1]}}),links:[...body.matchAll(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g)].map(m=>({href:m[1],text:strip(m[2])})),text:strip(body.replace(/<head\b[^>]*>[\s\S]*?<\/head>/g,'')),scripts:[...html.matchAll(/<script[^>]*src="([^"]+)"/g)].map(m=>m[1])};
      results.push(row);
    }catch(e){results.push({url,error:e.message})}
  }));
}
writeFileSync('audit-seo/crawl-live.json',JSON.stringify(results,null,2));
console.log(JSON.stringify(results.map(({url,status,title,lang,canonical,h1,bytes,error})=>({url,status,title,lang,canonical,h1,bytes,error})),null,2));
