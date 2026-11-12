import {articlePage} from './article-template.mjs';
import {createHash} from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import {homepage,categoryPage,topicPage,inFocusTopics,matchTopicArticles} from './homepage.mjs';
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
for(const file of ['index.html','styles.css','script.js','article.css','homepage-live.js','_headers','manifest.json','sw.js','ads.txt','favicon.ico','favicon-48x48.png','favicon-96x96.png','favicon-192x192.png','apple-touch-icon.png','assets','admin']){try{await fs.cp(path.join(root,file),path.join(dest,file),{recursive:true})}catch(e){if(e.code!=='ENOENT')throw e}}
await fs.mkdir('content/articles',{recursive:true});
const input=await fs.readdir('content/articles');const articles=[],heldArticles=[];
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
   heldArticles.push({slug,notBefore});
   console.log(`Held ${file}: release/source threshold ${notBefore} is later than the build clock.`);
   continue;
  }
  resolvedDate=await publicationDate(slug,d.title,notBefore);
 }
 const date=stamp(resolvedDate),updated=d.updated?stamp(d.updated):date;if(updated<date)throw Error(`${file}: update predates publication.`);
 if(new Date(date)>new Date())throw Error(`${file}: future publication dates need a scheduled publishing service, not yet configured.`);
 if(d.image){if(!/^\/assets\/[a-zA-Z0-9_./-]+$/.test(d.image)||d.image.includes('..')||!d.image_alt||!d.image_credit)throw Error(`${file}: local image, alt text and rights note required.`);const imgBuf=await fs.readFile(path.join(dest,d.image.slice(1)));d.image=`${d.image}?v=${createHash('md5').update(imgBuf).digest('hex').slice(0,8)}`}
 articles.push({...d,slug,date,updated,rawBody:content,html:md.render(content),sectionLabel:sections[d.section][0],author:d.author==='SmartAIIntel News Desk'?'SmartAIIntel News Desk':sections[d.section][1],url:origin+'/articles/'+slug+'/'});
}
articles.sort((a,b)=>b.date.localeCompare(a.date));
const bbcCssHash=createHash('md5').update(await fs.readFile(path.join(dest,'assets/bbc-breaking.css'))).digest('hex').slice(0,8);
const bbcJsHash=createHash('md5').update(await fs.readFile(path.join(dest,'assets/bbc-breaking.js'))).digest('hex').slice(0,8);
const stylesCssHash=createHash('md5').update(await fs.readFile(path.join(dest,'styles.css'))).digest('hex').slice(0,8);
const homeJsHash=createHash('md5').update(await fs.readFile(path.join(dest,'homepage-live.js'))).digest('hex').slice(0,8);
const logoWideHash=createHash('md5').update(await fs.readFile(path.join(dest,'assets/smartai-news-logo-wide.webp'))).digest('hex').slice(0,8);
const logoDarkHash=createHash('md5').update(await fs.readFile(path.join(dest,'assets/smartai-news-logo-dark.webp'))).digest('hex').slice(0,8);
const brandLogoUrl=`/assets/smartai-news-logo-wide.webp?v=${logoWideHash}`;
const brandLogoDarkUrl=`/assets/smartai-news-logo-dark.webp?v=${logoDarkHash}`;
const stampHomeAssets=s=>s.replace('/styles.css?v=4',`/styles.css?v=${stylesCssHash}`).replace('/homepage-live.js?v=4',`/homepage-live.js?v=${homeJsHash}`).replaceAll('/assets/smartai-news-logo-wide.webp',brandLogoUrl);
const brandIdentityHead='<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png"><link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png"><link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png"><link rel="icon" href="/favicon.ico" sizes="48x48"><link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"><meta property="og:site_name" content="SMARTAI News"><meta name="application-name" content="SMARTAI News"><meta name="apple-mobile-web-app-title" content="SMARTAI News">';
const publisherSchema={'@type':'NewsMediaOrganization',name:'SMARTAI News',alternateName:['SN','SAI News','SMARTAI NEWS','SmartAI Intel News','SmartAIIntel'],url:`${origin}/`,logo:{'@type':'ImageObject',url:`${origin}/assets/smartai-news-logo-wide.png`,width:436,height:372}};
const homeWebsiteSchema={'@context':'https://schema.org','@type':'WebSite',name:'SMARTAI News',alternateName:['SN','SAI News','SMARTAI NEWS','SmartAI News','SmartAI Intel News','SmartAIIntel','smartaiintel.com'],url:`${origin}/`};
const homeOrgSchema={'@context':'https://schema.org',...publisherSchema,publishingPrinciples:`${origin}/editorial-policy/`,correctionsPolicy:`${origin}/editorial-policy/`,actionableFeedbackPolicy:`${origin}/contact/`,contactPoint:{'@type':'ContactPoint',contactType:'editorial',email:'bloggerinvitro@gmail.com',url:`${origin}/contact/`}};
const adsenseHead='<meta name="google-adsense-account" content="ca-pub-7562364456725440"><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7562364456725440" crossorigin="anonymous"></script>';
const bbcBreakingHead=`<link rel="manifest" href="/manifest.json"><link rel="stylesheet" href="/assets/bbc-breaking.css?v=${bbcCssHash}"><script src="/assets/bbc-breaking.js?v=${bbcJsHash}" defer></script>`;
const ownerShieldScript="<script>(function(){try{var k='sai_owner',u=new URL(location.href),q=u.searchParams.get('owner'),m='';if(location.pathname.indexOf('/admin')===0){localStorage.setItem(k,'1')}if(q!==null){var v=q.toLowerCase();if(v==='1'||v==='true'||v==='on'){localStorage.setItem(k,'1');m='Owner Mode ON \\u2014 Your visits on this browser will not be counted in SmartAIIntel analytics.'}else if(v==='0'||v==='false'||v==='off'){localStorage.removeItem(k);m='Owner Mode OFF \\u2014 Normal visitor counting restored on this browser.'}else{m=localStorage.getItem(k)==='1'?'Owner Mode is ACTIVE on this browser (visits excluded).':'Owner Mode is OFF on this browser.'}u.searchParams.delete('owner');history.replaceState(null,'',u.pathname+u.search+u.hash);addEventListener('DOMContentLoaded',function(){var d=document.createElement('div');d.textContent=m;d.style.cssText='position:fixed;bottom:18px;left:50%;transform:translateX(-50%);background:#111827;color:#fff;padding:11px 18px;border-radius:999px;font:600 13px/1.4 -apple-system,BlinkMacSystemFont,Segoe UI,Arial,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.28);z-index:99999;max-width:92vw;text-align:center;border:1px solid #10b981';document.body.appendChild(d);setTimeout(function(){d.remove()},4500)})}if(localStorage.getItem(k)!=='1')return;var rx=/cloudflareinsights\\.com|\\/cdn-cgi\\/rum|google-analytics\\.com|analytics\\.google\\.com|googletagmanager\\.com/i;if(navigator.sendBeacon){var sb=navigator.sendBeacon.bind(navigator);navigator.sendBeacon=function(url,data){if(rx.test(String(url)))return true;return sb(url,data)}}if(window.fetch){var fe=window.fetch.bind(window);window.fetch=function(inp,init){var url=typeof inp==='string'?inp:(inp&&inp.url)||'';if(rx.test(url))return Promise.resolve(new Response(null,{status:204}));return fe(inp,init)}}if(window.XMLHttpRequest){var xo=XMLHttpRequest.prototype.open,xs=XMLHttpRequest.prototype.send;XMLHttpRequest.open=function(mth,url){this.__saiBlk=rx.test(String(url));return xo.apply(this,arguments)};XMLHttpRequest.prototype.send=function(){if(this.__saiBlk)return;return xs.apply(this,arguments)}}if(window.MutationObserver){new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var ns=ms[i].addedNodes;for(var j=0;j<ns.length;j++){var n=ns[j];if(n&&n.tagName==='SCRIPT'&&rx.test(n.src||'')){n.removeAttribute('src');n.type='javascript/blocked';n.remove()}}}}).observe(document.documentElement,{childList:true,subtree:true})}}catch(e){}})();</script>";
const policyLinks='<a href="/about/">About</a> · <a href="/contact/">Contact</a> · <a href="/editorial-policy/">Editorial &amp; Corrections</a> · <a href="/privacy/">Privacy Policy</a>';
const shell=(title,body,extra='',includeAds=true)=>`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)} | SMARTAI News</title><link rel="stylesheet" href="/article.css">${brandIdentityHead}${extra}${includeAds?adsenseHead:''}${bbcBreakingHead}${ownerShieldScript}</head><body><a class="skip" href="#main">Skip to content</a><header class="wrap"><a href="/" style="justify-self:start;font:700 11px Arial;letter-spacing:.8px;color:#555">‹ HOME</a><a class="brand brand-has-logo" href="/" aria-label="SMARTAI News"><img class="brand-logo" src="${brandLogoUrl}" alt="SMARTAI News" width="436" height="372" decoding="async"></a><a href="/articles/" style="justify-self:end;font:700 11px Arial;color:#b80000">All articles →</a></header><nav><div class="wrap"><div id="navlinks" style="display:flex;flex-wrap:wrap;gap:18px"><a href="/">Home</a><a href="/us-news/">US News</a><a href="/world/">World</a><a href="/security/">War &amp; Security</a><a href="/technology/">Technology</a><a href="/business/">Business</a><a href="/sports/">Sports</a><a href="/articles/">All Articles</a></div></div></nav><main class="wrap" id="main">${body}</main><footer><div class="wrap"><a class="brand brand-has-logo" href="/" aria-label="SMARTAI News"><img class="brand-logo footer-logo" src="${brandLogoUrl}" alt="SMARTAI News" width="436" height="372" loading="lazy" decoding="async"></a><p>SMARTAI News editorial publication</p><p>${policyLinks}</p><a href="#main">Back to top ↑</a></div></footer></body></html>`;
const publicationPages=JSON.parse(await fs.readFile('content/pages.json','utf8'));
for(const page of publicationPages){
 if(!['about','contact','editorial-policy','privacy'].includes(page.slug))throw Error('Unexpected policy slug');
 await fs.mkdir(`${dest}/${page.slug}`,{recursive:true});
 await fs.writeFile(`${dest}/${page.slug}/index.html`,shell(page.title,`<article class="article-body" style="max-width:800px;margin:32px auto 64px"><h1>${esc(page.title)}</h1>${md.render(page.body)}</article>`,`<meta name="robots" content="index,follow"><link rel="canonical" href="${origin}/${page.slug}/">`));
}
for(const a of articles){
 const pool=articles.filter(b=>b.slug!==a.slug&&b.editorial_approved===true&&b.indexable===true);
 const sameSec=pool.filter(b=>b.section===a.section);
 const diffSec=pool.filter(b=>b.section!==a.section);
 const mapItem=({slug,title,seo_title,summary,sectionLabel,image,image_alt,image_credit})=>({slug,title,seo_title,summary,sectionLabel,image,image_alt,image_credit});
 const w1=[...sameSec,...diffSec].slice(0,3);
 const used1=new Set(w1.map(x=>x.slug));
 const w2=[...diffSec.filter(x=>!used1.has(x.slug)),...sameSec.filter(x=>!used1.has(x.slug))].slice(0,3);
 const used12=new Set([...used1,...w2.map(x=>x.slug)]);
 const side=[...sameSec.filter(x=>!used12.has(x.slug)),...diffSec.filter(x=>!used12.has(x.slug))].slice(0,3);
 const related=side.length?side:w1;
 a.midRelated1=w1.map(mapItem);
 a.midRelated2=w2.map(mapItem);
 a.related=related.map(mapItem);
 a.brandLogo=brandLogoUrl;
 a.brandLogoDark=brandLogoDarkUrl;
 await fs.mkdir(`${dest}/articles/${a.slug}`,{recursive:true});await fs.writeFile(`${dest}/articles/${a.slug}/index.html`,articlePage(a,brandIdentityHead+adsenseHead+bbcBreakingHead));
}
await fs.mkdir(dest+'/articles',{recursive:true});
await fs.writeFile(dest+'/articles/index.html',shell('Latest articles',`<div class="breadcrumbs">SMARTAI NEWS / ARTICLES</div><section style="min-height:50vh"><h1>Latest articles</h1>${articles.length?articles.map(a=>`<article style="padding:24px 0;border-bottom:1px solid #ddd"><span class="eyebrow">${esc(a.sectionLabel)}</span><h2><a href="/articles/${a.slug}/">${esc(a.title)}</a></h2><p>${esc(a.summary)}</p><p>By ${esc(a.author)}</p></article>`).join(''):'<p>No articles have been published yet.</p>'}</section>`,`<meta name="robots" content="index,follow"><link rel="canonical" href="${origin}/articles/"><link rel="alternate" type="application/rss+xml" title="SMARTAI News" href="${origin}/rss.xml">`));
// Retain the approved homepage verbatim: only add a clearly identified article-list link.
const rawHomeTemplate=await fs.readFile(dest+'/index.html','utf8');
let home=homepage(rawHomeTemplate,articles);
const homeTitle='SMARTAI News | Breaking US News, World Affairs & Global Context';
const homeDesc='Read SMARTAI News breaking reporting and global analysis across US news, world affairs, war and security, technology, business and sports.';
home=home.replace('</head>',`<link rel="canonical" href="${origin}/"><link rel="alternate" type="application/rss+xml" title="SMARTAI News" href="${origin}/rss.xml"></head>`);
if(!home.includes('href="/articles/"'))home=home.replace('</nav>','</nav><div style="max-width:1220px;margin:auto;padding:10px 30px;font:12px Arial"><a href="/articles/" style="color:#b80000">Read our published articles →</a></div>');
home=home.replace('<div class="footer-bottom">',`<div style="padding:18px 0">${policyLinks}</div><div class="footer-bottom">`);
// Launch cleanup applies only to the generated public homepage, not the design source or admin.
home=home.replace('<meta name="robots" content="noindex">','<meta name="robots" content="index,follow">');
home=home.replace(/<div class="preview">[\s\S]*?<\/div>/,'');
home=home.replace('Editorial policies and launch checks in progress.','Independent reporting. Clear editorial standards.');
home=home.replace(/<title>[^<]*<\/title>/,`<title>${esc(homeTitle)}</title>`);
home=home.replace('</head>',`${brandIdentityHead}<meta name="description" content="${esc(homeDesc)}"><meta property="og:type" content="website"><meta property="og:title" content="${esc(homeTitle)}"><meta property="og:description" content="${esc(homeDesc)}"><meta property="og:url" content="${origin}/"><meta property="og:image" content="${origin}/assets/smartai-news-icon-512.png"><meta name="twitter:card" content="summary_large_image"><script type="application/ld+json">${json(homeWebsiteSchema)}</script><script type="application/ld+json">${json(homeOrgSchema)}</script>`+adsenseHead+bbcBreakingHead+ownerShieldScript+'</head>');
home=home.replace(/(<article class="story lead"[\s\S]*?<img[^>]*?)loading="lazy"/,'$1loading="eager" fetchpriority="high"');
for(const a of articles){
 const oldDate=new Date(a.date).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'});
 const newDate=new Date(a.date).toLocaleDateString('en-US',{day:'numeric',month:'short',year:'numeric',timeZone:'America/New_York'});
 home=home.split(`<time datetime="${a.date}">${oldDate}</time>`).join(`<time datetime="${a.date}">${newDate}</time>`);
}
await fs.writeFile(dest+'/index.html',stampHomeAssets(home));

// Generate dedicated indexable Category Hub pages (/us-news/, /world/, /security/, /technology/, /business/, /sports/)
for(const [secSlug,[secLabel]] of Object.entries(sections)){
 let catHtml=categoryPage(rawHomeTemplate,secSlug,secLabel,articles);
 const catStructured={'@context':'https://schema.org','@type':'CollectionPage',name:`${secLabel} | SMARTAI News`,description:`Latest ${secLabel} reporting, breaking news, and analysis from SMARTAI News.`,url:`${origin}/${secSlug}/`,publisher:publisherSchema};
 catHtml=catHtml.replace('</head>',`${brandIdentityHead}<link rel="canonical" href="${origin}/${secSlug}/"><link rel="alternate" type="application/rss+xml" title="SMARTAI News" href="${origin}/rss.xml"><meta name="description" content="Latest ${esc(secLabel)} reporting, breaking news, and analysis from SMARTAI News."><meta property="og:type" content="website"><meta property="og:title" content="${esc(secLabel)} | SMARTAI News"><meta property="og:url" content="${origin}/${secSlug}/"><script type="application/ld+json">${json(catStructured)}</script>`+adsenseHead+bbcBreakingHead+ownerShieldScript+'</head>');
 catHtml=catHtml.replace('<div class="footer-bottom">',`<div style="padding:18px 0">${policyLinks}</div><div class="footer-bottom">`);
 catHtml=catHtml.replace('<meta name="robots" content="noindex">','<meta name="robots" content="index,follow">');
 catHtml=catHtml.replace(/<div class="preview">[\s\S]*?<\/div>/,'');
 catHtml=catHtml.replace('Editorial policies and launch checks in progress.','Independent reporting. Clear editorial standards.');
 catHtml=catHtml.replace(/<title>[^<]*<\/title>/,`<title>${esc(secLabel)} | SMARTAI News</title>`);
 await fs.mkdir(`${dest}/${secSlug}`,{recursive:true});
 await fs.writeFile(`${dest}/${secSlug}/index.html`,stampHomeAssets(catHtml));
}

// Generate dedicated IN FOCUS Topic Hub pages (/topics/united-states/, /topics/china/, /topics/russia/, /topics/iran/, /topics/asia-pacific/, /topics/artificial-intelligence/)
const indexableTopicPaths=[];
for(const topic of inFocusTopics){
 const matched=matchTopicArticles(topic,articles);
 let topHtml=topicPage(rawHomeTemplate,topic,articles);
 const topicUrl=`${origin}/topics/${topic.slug}/`;
 const topicDesc=`Latest ${topic.label} news, breaking developments, and global context from SMARTAI News.`;
 const topicStructured={'@context':'https://schema.org','@type':'CollectionPage',name:`${topic.label} News & Analysis | SMARTAI News`,description:topicDesc,url:topicUrl,publisher:publisherSchema};
 topHtml=topHtml.replace('</head>',`${brandIdentityHead}<link rel="canonical" href="${topicUrl}"><link rel="alternate" type="application/rss+xml" title="SMARTAI News" href="${origin}/rss.xml"><meta name="description" content="${esc(topicDesc)}"><meta property="og:type" content="website"><meta property="og:title" content="${esc(topic.label)} News &amp; Analysis | SMARTAI News"><meta property="og:url" content="${topicUrl}"><script type="application/ld+json">${json(topicStructured)}</script>`+adsenseHead+bbcBreakingHead+ownerShieldScript+'</head>');
 topHtml=topHtml.replace('<div class="footer-bottom">',`<div style="padding:18px 0">${policyLinks}</div><div class="footer-bottom">`);
 topHtml=topHtml.replace('<meta name="robots" content="noindex">',`<meta name="robots" content="${matched.length?'index,follow':'noindex,follow'}">`);
 topHtml=topHtml.replace(/<div class="preview">[\s\S]*?<\/div>/,'');
 topHtml=topHtml.replace('Editorial policies and launch checks in progress.','Independent reporting. Clear editorial standards.');
 topHtml=topHtml.replace(/<title>[^<]*<\/title>/,`<title>${esc(topic.label)} News &amp; Analysis | SMARTAI News</title>`);
 await fs.mkdir(`${dest}/topics/${topic.slug}`,{recursive:true});
 await fs.writeFile(`${dest}/topics/${topic.slug}/index.html`,stampHomeAssets(topHtml));
 if(matched.length)indexableTopicPaths.push(`/topics/${topic.slug}/`);
}

const indexableArticles=articles.filter(a=>a.indexable===true&&!a.test_only);
const latestMod=indexableArticles.reduce((m,a)=>a.updated>m?a.updated:m,'');
const publicPages=['/','/articles/',...Object.keys(sections).map(s=>'/'+s+'/'),...indexableTopicPaths,...publicationPages.map(p=>'/'+p.slug+'/')].map(p=>`<url><loc>${esc(origin+p)}</loc>${(p==='/'||p==='/articles/'||sections[p.slice(1,-1)]||p.startsWith('/topics/'))&&latestMod?`<lastmod>${latestMod}</lastmod>`:''}</url>`).join('');
const sitemap=publicPages+indexableArticles.map(a=>`<url><loc>${esc(a.url)}</loc><lastmod>${a.updated}</lastmod></url>`).join('');
await fs.writeFile(dest+'/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemap}</urlset>`);
const nowMs=Date.now(),newsWindowMs=48*60*60*1000;
const recentNews=indexableArticles.filter(a=>{const publishedMs=new Date(a.date).getTime();return publishedMs<=nowMs&&(nowMs-publishedMs)<=newsWindowMs}).slice(0,1000);
const newsEntries=recentNews.map(a=>`<url><loc>${esc(a.url)}</loc><lastmod>${a.updated}</lastmod><news:news><news:publication><news:name>SMARTAI News</news:name><news:language>en</news:language></news:publication><news:publication_date>${esc(a.date)}</news:publication_date><news:title>${esc(a.title)}</news:title></news:news></url>`).join('');
await fs.writeFile(dest+'/news-sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">${newsEntries}</urlset>`);
const rssItems=indexableArticles.slice(0,30).map(a=>`<item><title>${esc(a.title)}</title><link>${esc(a.url)}</link><guid isPermaLink="true">${esc(a.url)}</guid><pubDate>${esc(new Date(a.date).toUTCString())}</pubDate><atom:updated>${esc(a.updated)}</atom:updated><category>${esc(a.sectionLabel)}</category><description>${esc(a.description)}</description>${a.image?`<media:content url="${esc(origin+a.image)}" medium="image" type="image/webp"/>`:''}</item>`).join('');
await fs.writeFile(dest+'/rss.xml',`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/"><channel><title>SMARTAI News</title><link>${origin}/</link><description>Breaking US news, world affairs, security, technology, business and sports from SMARTAI News.</description><language>en-us</language><atom:link href="https://pubsubhubbub.appspot.com/" rel="hub"/><atom:link href="${origin}/rss.xml" rel="self" type="application/rss+xml"/>${latestMod?`<lastBuildDate>${esc(new Date(latestMod).toUTCString())}</lastBuildDate>`:''}${rssItems}</channel></rss>`);
await fs.writeFile(dest+'/schedule-manifest.json',JSON.stringify({generatedAt:new Date().toISOString(),articleCount:indexableArticles.length,heldArticles,latestArticles:indexableArticles.slice(0,10).map(a=>({url:a.url,section:a.section,date:a.date,updated:a.updated}))}));
const indexNowKey='8f4a2c91e7b04d63a5c8192e0f3b7d4a';
await fs.writeFile(`${dest}/${indexNowKey}.txt`,indexNowKey);
await fs.writeFile(dest+'/ads.txt','google.com, pub-7562364456725440, DIRECT, f08c47fec0942fa0\n');
await fs.writeFile(dest+'/robots.txt',`User-agent: *\nDisallow: /admin/\nSitemap: ${origin}/sitemap.xml\nSitemap: ${origin}/news-sitemap.xml\nSitemap: ${origin}/rss.xml\n`);
let headers=await fs.readFile(dest+'/_headers','utf8').catch(()=>'/*\n  Cache-Control: no-cache\n');
headers+=`\n/favicon.ico\n  Cache-Control: public, max-age=86400\n/favicon-48x48.png\n  Cache-Control: public, max-age=86400\n/favicon-96x96.png\n  Cache-Control: public, max-age=86400\n/favicon-192x192.png\n  Cache-Control: public, max-age=86400\n/apple-touch-icon.png\n  Cache-Control: public, max-age=86400\n/ads.txt\n  Cache-Control: no-cache\n/sw.js\n  Cache-Control: no-store, no-cache, must-revalidate, max-age=0\n/manifest.json\n  Cache-Control: no-cache\n/schedule-manifest.json\n  Cache-Control: no-store, no-cache, must-revalidate, max-age=0\n  X-Robots-Tag: noindex, nofollow\n/news-sitemap.xml\n  Cache-Control: no-store, no-cache, must-revalidate, max-age=0\n/sitemap.xml\n  Cache-Control: no-store, no-cache, must-revalidate, max-age=0\n/rss.xml\n  Cache-Control: no-store, no-cache, must-revalidate, max-age=0\n  Link: <https://pubsubhubbub.appspot.com/>; rel="hub", <${origin}/rss.xml>; rel="self"\n/admin/*\n  X-Robots-Tag: noindex, nofollow\n  Cache-Control: no-store\n`;await fs.writeFile(dest+'/_headers',headers);
// A top-level 404.html disables Cloudflare Pages SPA fallback for missing routes.
await fs.writeFile(dest+'/404.html',shell('Page not found',`<section style="min-height:50vh;max-width:760px;margin:50px auto"><span class="eyebrow">404</span><h1>Page not found</h1><p>This address is no longer available or does not exist. Older articles from our previous website have been retired.</p><p><a href="/">Visit the SMARTAI News homepage</a> or <a href="/articles/">browse our published articles</a>.</p></section>`,'<meta name="robots" content="noindex,follow">',false));
if(process.env.CF_PAGES==='1'){
 try{
  const freshUrls=Array.from(new Set(indexableArticles.slice(0,5).flatMap(a=>[a.url,`${origin}/${a.section}/`])));
  const pingRes=await fetch('https://smartaiintel-scheduler.olayiwolafaruk2011.workers.dev/on-deploy',{method:'POST',headers:{'Content-Type':'application/json','User-Agent':'SmartAIIntel-Pages-Build/2.0'},body:JSON.stringify({triggeredBy:'cf-pages-build',freshUrls}),signal:AbortSignal.timeout(4000)});
  console.log(`Queued 18s post-deploy Google WebSub + IndexNow push (HTTP ${pingRes.status}).`);
 }catch(e){
  console.log(`Post-deploy push hook skipped (${e.message}).`);
 }
}
console.log(`Built ${articles.length} approved articles into _site. No publication performed.`);
