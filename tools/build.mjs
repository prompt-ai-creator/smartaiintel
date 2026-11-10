import {articlePage} from './article-template.mjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import {homepage} from './homepage.mjs';
const root=process.cwd(), dest=path.join(root,'_site');
const md=new MarkdownIt({html:false,linkify:false,typographer:true});
const sections={ 'us-news':['US News','Austin J.'],world:['World & Global Affairs','Ethan R.'],security:['War & Security','Mason T.'],technology:['Technology & AI','Logan M.'],business:['Business & Economy','Carter B.'],sports:['Football & Sports','Jordan W.']};
const origin='https://smartaiintel.com';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const json=o=>JSON.stringify(o).replace(/</g,'\\u003c');
const https=s=>{try{return new URL(s).protocol==='https:'}catch{return false}};
const stamp=v=>{const d=new Date(v);if(!v||!Number.isFinite(d.getTime()))throw Error('Valid date required');return d.toISOString()};
const nice=s=>new Date(s).toLocaleString('en-GB',{dateStyle:'long',timeStyle:'short',timeZone:'UTC'})+' UTC';

// Resolve first-publication metadata from the existing live page, not from a draft placeholder.
// On the initial release, the build timestamp becomes the publication timestamp.
// Later builds retain that original timestamp. Fail closed on unexpected responses.
async function publicationDate(slug,title,notBefore){
 const url=origin+'/articles/'+slug+'/';
 let response;
 try{response=await fetch(url,{signal:AbortSignal.timeout(20000),headers:{'Cache-Control':'no-cache'}})}
 catch(e){throw Error(`${slug}: cannot verify existing publication timestamp (${e.message}). Retry the build; do not invent a date.`)}
 if(response.status===404)return new Date().toISOString();
 if(!response.ok)throw Error(`${slug}: publication date lookup returned HTTP ${response.status}.`);
 const page=await response.text();
 const scripts=[...page.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
 for(const match of scripts){
  let item;try{item=JSON.parse(match[1])}catch{continue}
  if(item['@type']!=='NewsArticle'||item.mainEntityOfPage!==url)continue;
  const published=stamp(item.datePublished);
  if(new Date(published)<new Date(notBefore)||new Date(published)>new Date())throw Error(`${slug}: existing publication date conflicts with the source date or build clock. Manual review required.`);
  return published;
 }
 throw Error(`${slug}: a live page exists but its original publication timestamp could not be verified. Manual review required.`);
}

await fs.rm(dest,{recursive:true,force:true});await fs.mkdir(dest,{recursive:true});
for(const file of ['index.html','styles.css','script.js','article.css','homepage-live.js','_headers','assets','admin']){try{await fs.cp(path.join(root,file),path.join(dest,file),{recursive:true})}catch(e){if(e.code!=='ENOENT')throw e}}
await fs.mkdir('content/articles',{recursive:true});
const input=await fs.readdir('content/articles');const articles=[];
for(const file of input.filter(f=>f.endsWith('.md'))){
 const slug=file.slice(0,-3);if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))throw Error(`Invalid slug: ${file}`);
 const {data:d,content}=matter(await fs.readFile('content/articles/'+file,'utf8'));
 // Unpublished drafts must not block deployment of the existing publication.
 // Approval alone does not override an explicit editorial hold.
 if(d.editorial_approved!==true||d.publication_hold===true){
  console.log(`Skipped unpublished article: ${file}${d.publication_hold===true?' (publication hold)':' (draft)'}`);
  continue;
 }
 for(const field of ['title','summary','description'])if(typeof d[field]!=='string'||!d[field].trim())throw Error(`${file}: ${field} required.`);
 if(!content.trim()||!sections[d.section])throw Error(`${file}: body and valid section required.`);
 if(!Array.isArray(d.sources)||!d.sources.length||d.sources.some(s=>!s.title||!https(s.url)))throw Error(`${file}: named HTTPS sources required.`);
 let resolvedDate=d.date;
 if(d.date_mode==='first-publication'){
  const sourceDate=stamp(d.source_not_before);
  const releaseDate=d.release_not_before?stamp(d.release_not_before):sourceDate;
  const notBefore=sourceDate>releaseDate?sourceDate:releaseDate;
  if(new Date()<new Date(notBefore)){
   console.log(`Held ${file}: release/source threshold ${notBefore} is later than the build clock.`);
   continue;
  }
  resolvedDate=await publicationDate(slug,d.title,notBefore);
 }
 const date=stamp(resolvedDate),updated=d.updated?stamp(d.updated):date;if(updated<date)throw Error(`${file}: update predates publication.`);
 if(new Date(date)>new Date())throw Error(`${file}: future publication dates need a scheduled publishing service, not yet configured.`);
 if(d.image){if(!/^\/assets\/[a-zA-Z0-9_./-]+$/.test(d.image)||d.image.includes('..')||!d.image_alt||!d.image_credit)throw Error(`${file}: local image, alt text and rights note required.`);await fs.access(path.join(dest,d.image.slice(1)))}
 articles.push({...d,slug,date,updated,html:md.render(content),sectionLabel:sections[d.section][0],author:d.author==='SmartAIIntel News Desk'?'SmartAIIntel News Desk':sections[d.section][1],url:origin+'/articles/'+slug+'/'});
}
articles.sort((a,b)=>b.date.localeCompare(a.date));
const ownerShieldScript="<script>(function(){try{var k='sai_owner',u=new URL(location.href),q=u.searchParams.get('owner'),m='';if(location.pathname.indexOf('/admin')===0){localStorage.setItem(k,'1')}if(q!==null){var v=q.toLowerCase();if(v==='1'||v==='true'||v==='on'){localStorage.setItem(k,'1');m='Owner Mode ON \\u2014 Your visits on this browser will not be counted in SmartAIIntel analytics.'}else if(v==='0'||v==='false'||v==='off'){localStorage.removeItem(k);m='Owner Mode OFF \\u2014 Normal visitor counting restored on this browser.'}else{m=localStorage.getItem(k)==='1'?'Owner Mode is ACTIVE on this browser (visits excluded).':'Owner Mode is OFF on this browser.'}u.searchParams.delete('owner');history.replaceState(null,'',u.pathname+u.search+u.hash);addEventListener('DOMContentLoaded',function(){var d=document.createElement('div');d.textContent=m;d.style.cssText='position:fixed;bottom:18px;left:50%;transform:translateX(-50%);background:#111827;color:#fff;padding:11px 18px;border-radius:999px;font:600 13px/1.4 -apple-system,BlinkMacSystemFont,Segoe UI,Arial,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.28);z-index:99999;max-width:92vw;text-align:center;border:1px solid #10b981';document.body.appendChild(d);setTimeout(function(){d.remove()},4500)})}if(localStorage.getItem(k)!=='1')return;var rx=/cloudflareinsights\\.com|\\/cdn-cgi\\/rum|google-analytics\\.com|analytics\\.google\\.com|googletagmanager\\.com/i;if(navigator.sendBeacon){var sb=navigator.sendBeacon.bind(navigator);navigator.sendBeacon=function(url,data){if(rx.test(String(url)))return true;return sb(url,data)}}if(window.fetch){var fe=window.fetch.bind(window);window.fetch=function(inp,init){var url=typeof inp==='string'?inp:(inp&&inp.url)||'';if(rx.test(url))return Promise.resolve(new Response(null,{status:204}));return fe(inp,init)}}if(window.XMLHttpRequest){var xo=XMLHttpRequest.prototype.open,xs=XMLHttpRequest.prototype.send;XMLHttpRequest.prototype.open=function(mth,url){this.__saiBlk=rx.test(String(url));return xo.apply(this,arguments)};XMLHttpRequest.prototype.send=function(){if(this.__saiBlk)return;return xs.apply(this,arguments)}}if(window.MutationObserver){new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var ns=ms[i].addedNodes;for(var j=0;j<ns.length;j++){var n=ns[j];if(n&&n.tagName==='SCRIPT'&&rx.test(n.src||'')){n.removeAttribute('src');n.type='javascript/blocked';n.remove()}}}}).observe(document.documentElement,{childList:true,subtree:true})}}catch(e){}})();</script>";
const policyLinks='<a href="/about/">About</a> · <a href="/contact/">Contact</a> · <a href="/editorial-policy/">Editorial &amp; Corrections</a> · <a href="/privacy/">Privacy Policy</a>';
const shell=(title,body,extra='')=>`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)} | SmartAIIntel</title><link rel="stylesheet" href="/article.css">${extra}${ownerShieldScript}</head><body><a class="skip" href="#main">Skip to content</a><header class="wrap"><a class="brand" href="/">Smart<span>AI</span>Intel<b>.</b><small>US NEWS. GLOBAL CONTEXT.</small></a><a href="/articles/">All articles →</a></header><nav><div class="wrap"><div id="navlinks" style="display:flex;flex-wrap:wrap"><a href="/">Home</a><a href="/articles/">Articles</a></div></div></nav><main class="wrap" id="main">${body}</main><footer><div class="wrap"><a class="brand" href="/">Smart<span>AI</span>Intel<b>.</b></a><p>SmartAIIntel editorial publication</p><p>${policyLinks}</p><a href="#main">Back to top ↑</a></div></footer></body></html>`;
const publicationPages=JSON.parse(await fs.readFile('content/pages.json','utf8'));
for(const page of publicationPages){
 if(!['about','contact','editorial-policy','privacy'].includes(page.slug))throw Error('Unexpected policy slug');
 await fs.mkdir(`${dest}/${page.slug}`,{recursive:true});
 await fs.writeFile(`${dest}/${page.slug}/index.html`,shell(page.title,`<article class="article-body" style="max-width:800px;margin:32px auto 64px"><h1>${esc(page.title)}</h1>${md.render(page.body)}</article>`,`<meta name="robots" content="index,follow"><link rel="canonical" href="${origin}/${page.slug}/">`));
}
for(const a of articles){
 const structured={'@context':'https://schema.org','@type':'NewsArticle',headline:a.title,description:a.description,datePublished:a.date,dateModified:a.updated,author:{'@type':'Person',name:a.author},publisher:{'@type':'Organization',name:'SmartAIIntel'},mainEntityOfPage:a.url,...(a.image?{image:[origin+a.image]}:{})};
 const extra=`<meta name="description" content="${esc(a.description)}"><meta name="robots" content="${a.indexable===true?'index,follow':'noindex,nofollow'}"><link rel="canonical" href="${esc(a.url)}"><meta property="og:type" content="article"><meta property="og:title" content="${esc(a.title)}"><meta property="og:description" content="${esc(a.description)}"><meta property="og:url" content="${esc(a.url)}">${a.image?`<meta property="og:image" content="${esc(origin+a.image)}">`:''}<script type="application/ld+json">${json(structured)}</script>`;
 const related=articles.filter(b=>b.slug!==a.slug&&b.editorial_approved===true&&b.indexable===true).sort((b,c)=>Number(c.section===a.section)-Number(b.section===a.section)||c.date.localeCompare(b.date)).slice(0,3);
 a.related=related.map(({slug,title,summary,sectionLabel})=>({slug,title,summary,sectionLabel}));
 const body=`<div class="breadcrumbs">SMARTAIINTEL / ${esc(a.sectionLabel)}</div><article style="max-width:800px;margin:0 auto 60px"><span class="eyebrow">${esc(a.sectionLabel)}</span><h1>${esc(a.title)}</h1><p class="standfirst">${esc(a.summary)}</p><div class="byline"><strong>By ${esc(a.author)}</strong></div><div class="article-meta"><span>Published <time datetime="${a.date}">${nice(a.date)}</time>${a.updated!==a.date?` · Updated <time datetime="${a.updated}">${nice(a.updated)}</time>`:''}</span></div>${a.image?`<figure><img src="${esc(a.image)}" alt="${esc(a.image_alt)}"><figcaption>${esc(a.image_credit)}</figcaption></figure>`:''}<div class="article-body">${a.html}</div><section class="sources"><h2>Sources & reporting notes</h2><ul>${a.sources.map(s=>`<li><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)}</a></li>`).join('')}</ul></section>${a.correction?`<p class="corrections"><strong>Correction:</strong> ${esc(a.correction)}</p>`:''}${related.length?`<section class="related"><h2>Related reporting</h2>${related.map(b=>`<p><a href="/articles/${b.slug}/">${esc(b.title)}</a></p>`).join('')}</section>`:''}</article>`;
 await fs.mkdir(`${dest}/articles/${a.slug}`,{recursive:true});await fs.writeFile(`${dest}/articles/${a.slug}/index.html`,articlePage(a));
}
await fs.mkdir(dest+'/articles',{recursive:true});
await fs.writeFile(dest+'/articles/index.html',shell('Latest articles',`<div class="breadcrumbs">SMARTAIINTEL / ARTICLES</div><section style="min-height:50vh"><h1>Latest articles</h1>${articles.length?articles.map(a=>`<article style="padding:24px 0;border-bottom:1px solid #ddd"><span class="eyebrow">${esc(a.sectionLabel)}</span><h2><a href="/articles/${a.slug}/">${esc(a.title)}</a></h2><p>${esc(a.summary)}</p><p>By ${esc(a.author)}</p></article>`).join(''):'<p>No articles have been published yet.</p>'}</section>`,`<meta name="robots" content="index,follow"><link rel="canonical" href="${origin}/articles/"><link rel="alternate" type="application/rss+xml" title="SmartAIIntel" href="${origin}/rss.xml">`));
// Retain the approved homepage verbatim: only add a clearly identified article-list link.
let home=homepage(await fs.readFile(dest+'/index.html','utf8'),articles);
home=home.replace('</head>',`<link rel="canonical" href="${origin}/"><link rel="alternate" type="application/rss+xml" title="SmartAIIntel" href="${origin}/rss.xml"></head>`);
if(!home.includes('href="/articles/"'))home=home.replace('</nav>','</nav><div style="max-width:1220px;margin:auto;padding:10px 30px;font:12px Arial"><a href="/articles/" style="color:#b80000">Read our published articles →</a></div>');
home=home.replace('<div class="footer-bottom">',`<div style="padding:18px 0">${policyLinks}</div><div class="footer-bottom">`);
// Launch cleanup applies only to the generated public homepage, not the design source or admin.
home=home.replace('<meta name="robots" content="noindex">','<meta name="robots" content="index,follow">');
home=home.replace(/<div class="preview">[\s\S]*?<\/div>/,'');
home=home.replace('Editorial policies and launch checks in progress.','Independent reporting. Clear editorial standards.');
home=home.replace(/<title>[^<]*<\/title>/,'<title>SmartAIIntel | US News, World Affairs and Technology</title>');
home=home.replace('</head>','<meta name="description" content="Read SmartAIIntel reporting and analysis on US news, world affairs, security, technology, business and sports.">'+ownerShieldScript+'</head>');
home=home.replace(/(<article class="story lead"[\s\S]*?<img[^>]*?)loading="lazy"/,'$1loading="eager" fetchpriority="high"');
for(const a of articles){
 const oldDate=new Date(a.date).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'});
 const newDate=new Date(a.date).toLocaleDateString('en-US',{day:'numeric',month:'short',year:'numeric',timeZone:'America/New_York'});
 home=home.split(`<time datetime="${a.date}">${oldDate}</time>`).join(`<time datetime="${a.date}">${newDate}</time>`);
}
await fs.writeFile(dest+'/index.html',home);
const indexableArticles=articles.filter(a=>a.indexable===true&&!a.test_only);
const latestMod=indexableArticles.reduce((m,a)=>a.updated>m?a.updated:m,'');
const publicPages=['/','/articles/',...publicationPages.map(p=>'/'+p.slug+'/')].map(p=>`<url><loc>${esc(origin+p)}</loc>${(p==='/'||p==='/articles/')&&latestMod?`<lastmod>${latestMod}</lastmod>`:''}</url>`).join('');
const sitemap=publicPages+indexableArticles.map(a=>`<url><loc>${esc(a.url)}</loc><lastmod>${a.updated}</lastmod></url>`).join('');
await fs.writeFile(dest+'/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemap}</urlset>`);
const nowMs=Date.now(),newsWindowMs=48*60*60*1000;
const recentNews=indexableArticles.filter(a=>{const publishedMs=new Date(a.date).getTime();return publishedMs<=nowMs&&(nowMs-publishedMs)<=newsWindowMs}).slice(0,1000);
const newsEntries=recentNews.map(a=>`<url><loc>${esc(a.url)}</loc><lastmod>${a.updated}</lastmod><news:news><news:publication><news:name>SmartAIIntel</news:name><news:language>en</news:language></news:publication><news:publication_date>${esc(a.date)}</news:publication_date><news:title>${esc(a.title)}</news:title></news:news></url>`).join('');
await fs.writeFile(dest+'/news-sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">${newsEntries}</urlset>`);
const rssItems=indexableArticles.slice(0,30).map(a=>`<item><title>${esc(a.title)}</title><link>${esc(a.url)}</link><guid isPermaLink="true">${esc(a.url)}</guid><pubDate>${esc(new Date(a.date).toUTCString())}</pubDate><category>${esc(a.sectionLabel)}</category><description>${esc(a.description)}</description>${a.image?`<media:content url="${esc(origin+a.image)}" medium="image" type="image/webp"/>`:''}</item>`).join('');
await fs.writeFile(dest+'/rss.xml',`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/"><channel><title>SmartAIIntel</title><link>${origin}/</link><description>US news, world affairs, security, technology, business and sports from SmartAIIntel.</description><language>en-us</language><atom:link href="https://pubsubhubbub.appspot.com/" rel="hub"/><atom:link href="${origin}/rss.xml" rel="self" type="application/rss+xml"/>${latestMod?`<lastBuildDate>${esc(new Date(latestMod).toUTCString())}</lastBuildDate>`:''}${rssItems}</channel></rss>`);
const indexNowKey='8f4a2c91e7b04d63a5c8192e0f3b7d4a';
await fs.writeFile(`${dest}/${indexNowKey}.txt`,indexNowKey);
await fs.writeFile(dest+'/robots.txt',`User-agent: *\nDisallow: /admin/\nSitemap: ${origin}/sitemap.xml\nSitemap: ${origin}/news-sitemap.xml\nSitemap: ${origin}/rss.xml\n`);
let headers=await fs.readFile(dest+'/_headers','utf8').catch(()=>'/*\n  Cache-Control: no-cache\n');
headers+=`\n/news-sitemap.xml\n  Cache-Control: no-store, no-cache, must-revalidate, max-age=0\n/sitemap.xml\n  Cache-Control: no-store, no-cache, must-revalidate, max-age=0\n/rss.xml\n  Cache-Control: no-store, no-cache, must-revalidate, max-age=0\n  Link: <https://pubsubhubbub.appspot.com/>; rel="hub", <${origin}/rss.xml>; rel="self"\n/admin/*\n  X-Robots-Tag: noindex, nofollow\n  Cache-Control: no-store\n`;await fs.writeFile(dest+'/_headers',headers);
// A top-level 404.html disables Cloudflare Pages SPA fallback for missing routes.
await fs.writeFile(dest+'/404.html',shell('Page not found',`<section style="min-height:50vh;max-width:760px;margin:50px auto"><span class="eyebrow">404</span><h1>Page not found</h1><p>This address is no longer available or does not exist. Older articles from our previous website have been retired.</p><p><a href="/">Visit the SmartAIIntel homepage</a> or <a href="/articles/">browse our published articles</a>.</p></section>`,'<meta name="robots" content="noindex,follow">'));
console.log(`Built ${articles.length} approved articles into _site. No publication performed.`);
