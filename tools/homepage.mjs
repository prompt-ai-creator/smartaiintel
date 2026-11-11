const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const categories={'us-news':'US News',world:'World',security:'War & Security',technology:'Technology',business:'Business',sports:'Football & Sports'};
const ids={'us-news':'us-news',world:'world-news',security:'security-news',technology:'technology-news',business:'business-news',sports:'sports-news'};

const navItems=[
 ['home','Home','/'],
 ['us-news','US News','/us-news/'],
 ['world','World','/world/'],
 ['security','War & Security','/security/'],
 ['technology','Technology','/technology/'],
 ['business','Business','/business/'],
 ['sports','Football & Sports','/sports/']
];

export const inFocusTopics=[
 {slug:'united-states',label:'United States',patterns:[/\bUnited States\b/i,/\bU\.S\./,/\bUS\b/,/\bWashington\b/i,/\bWhite House\b/i,/\bSenate\b/i,/\bHouse\b/i,/\bCongress\b/i,/\bPentagon\b/i,/\bTreasury\b/i,/\bTrump\b/i,/\bFederal Reserve\b/i,/\bFBI\b/]},
 {slug:'china',label:'China',patterns:[/\bChina\b/i,/\bChinese\b/i,/\bBeijing\b/i]},
 {slug:'russia',label:'Russia',patterns:[/\bRussia\b/i,/\bRussian\b/i,/\bMoscow\b/i,/\bKremlin\b/i,/\bUkraine\b/i,/\bUkrainian\b/i,/\bKyiv\b/i]},
 {slug:'iran',label:'Iran',patterns:[/\bIran\b/i,/\bIranian\b/i,/\bTehran\b/i,/\bHormuz\b/i]},
 {slug:'asia-pacific',label:'Asia-Pacific',patterns:[/\bAsia-Pacific\b/i,/\bAsia\b/i,/\bAsian\b/i,/\bIndo-Pacific\b/i,/\bJapan\b/i,/\bJapanese\b/i,/\bSouth Korea\b/i,/\bNorth Korea\b/i,/\bTaiwan\b/i,/\bChina\b/i,/\bChinese\b/i,/\bBeijing\b/i,/\bIndia\b/i,/\bAustralia\b/i]},
 {slug:'artificial-intelligence',label:'Artificial intelligence',patterns:[/\bartificial intelligence\b/i,/\bAI\b/,/\bOpenAI\b/i,/\bAnthropic\b/i,/\bClaude\b/i,/\bNvidia\b/i,/\bdata center/i,/\bsemiconductor/i,/\bLLM\b/]}
];

export function matchTopicArticles(topic,articles){
 const test=txt=>topic.patterns.some(rx=>rx.test(txt));
 const hits=[];
 for(const a of articles){
  if(a.test_only===true||a.indexable!==true)continue;
  const headText=[a.title,a.seo_title,a.summary,a.description].filter(Boolean).join(' ');
  const bodyText=a.rawBody||String(a.html||'').replace(/<[^>]+>/g,' ');
  const inHead=test(headText);
  const inBody=!inHead&&test(bodyText);
  if(inHead||inBody)hits.push({tier:inHead?1:2,article:a});
 }
 hits.sort((x,y)=>x.tier-y.tier||y.article.date.localeCompare(x.article.date));
 return hits.map(h=>h.article);
}

function buildNavLinks(activeKey){
 return navItems.map(([key,label,href])=>`<a href="${href}"${key===activeKey?' class="active" aria-current="page"':''}>${esc(label)}</a>`).join('');
}

function buildTopicStrip(activeTopicSlug=''){
 return `<div class="wrap topic-strip" id="regions"><span>IN FOCUS</span>${inFocusTopics.map(t=>`<a class="topic-link${t.slug===activeTopicSlug?' active':''}" href="/topics/${t.slug}/"${t.slug===activeTopicSlug?' aria-current="page"':''}>${esc(t.label)}</a>`).join('')}</div>`;
}

const footerSectionLinks='<a href="/us-news/">US News</a><a href="/world/">World</a><a href="/security/">War &amp; Security</a><a href="/technology/">Technology &amp; AI</a><a href="/business/">Business</a><a href="/sports/">Football &amp; Sports</a><a href="/articles/">All articles</a>';

function applySharedShellCleanup(out,activeNavKey,activeTopicSlug=''){
 out=out.replace('href="styles.css"','href="/styles.css?v=4"');
 out=out.replace(/href="\.\//g,'href="/');
 out=out.replace('src="script.js"','src="/homepage-live.js?v=4"');
 out=out.replace(/<div class="nav-links" id="nav-links">[\s\S]*?<\/div>/,`<div class="nav-links" id="nav-links">${buildNavLinks(activeNavKey)}</div>`);
 out=out.replace(/<div class="wrap topic-strip" id="regions">[\s\S]*?<\/div>/,buildTopicStrip(activeTopicSlug));
 out=out.replace(/<nav class="footer-sections" aria-label="Footer sections">[\s\S]*?<\/nav>/,`<nav class="footer-sections" aria-label="Footer sections">${footerSectionLinks}</nav>`);
 out=out.replace('<a href="#regions" class="all-regions">Explore regions <span>⌄</span></a>','<a href="/articles/" class="all-regions">All articles <span>→</span></a>');
 out=out.replace('DESIGN PREVIEW','PUBLICATION IN DEVELOPMENT').replace('Full homepage concept · All stories are illustrative, not published news.','Published reporting appears below · Site launch checks in progress.');
 out=out.replace('Search this homepage preview','Search published stories').replace('Homepage design preview','Publication').replace('Homepage design preview','Publication');
 out=out.replace('A homepage built around your journalism.','Clear reporting. Global context.').replace('This is a design concept. Every headline and story position will be replaced with content you provide and approve.','Only published, approved articles appear in the news positions above.');
 out=out.replace('Not affiliated with the BBC. Editorial content pending approval.','Editorial policies and launch checks in progress.');
 out=out.replace(/<dialog id="story-dialog"[\s\S]*?<\/dialog>/,'');
 return out;
}

export function homepage(template,articles){
 const eligible=articles.filter(a=>a.test_only!==true&&a.show_on_homepage!==false);
 const image=a=>a.image?`<a class="image-link" href="/articles/${a.slug}/"><img src="${esc(a.image)}" alt="${esc(a.image_alt)}" width="800" height="533" loading="lazy"></a>`:'';
 const meta=a=>`<div class="meta">By ${esc(a.author)} <b>·</b> <time datetime="${a.date}">${new Date(a.date).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'})}</time></div>`;
 const card=(a,kind='support',heading='h2')=>`<article class="story ${kind}" data-category="${esc(categories[a.section])}" data-search="${esc([a.title,a.summary,a.sectionLabel,a.author].join(' ').toLowerCase())}">${image(a)}<div class="label"><a href="/${esc(a.section)}/">${esc(a.sectionLabel)}</a></div><${heading}><a href="/articles/${a.slug}/">${esc(a.title)}</a></${heading}>${kind==='lead'||kind==='coverage-card'?`<p>${esc(a.summary)}</p>`:''}${meta(a)}</article>`;
 const empty=label=>`<div class="empty-news" style="padding:25px 0;color:#777;font:14px/1.7 Arial">No ${esc(label)} articles published yet.</div>`;
 const top=eligible.length?`<section class="top-grid" aria-label="Top stories">${card(eligible[0],'lead','h1')}<div class="supporting">${eligible.slice(1,3).map(a=>card(a)).join('')||empty('more top-story')}</div><aside class="latest"><h2><span class="red-square"></span> Latest reporting</h2>${eligible.slice(3,7).map(a=>`<article class="story latest-item"><span class="label"><a href="/${esc(a.section)}/">${esc(a.sectionLabel)}</a></span><h3><a href="/articles/${a.slug}/">${esc(a.title)}</a></h3>${meta(a)}</article>`).join('')||empty('additional')}<a class="text-link" href="/articles/">All articles <span>→</span></a></aside></section>`:`<section aria-label="Top stories" style="padding:45px 0;border-bottom:1px solid #ddd"><h1 style="font:44px/1.1 Georgia;margin:0 0 16px">Your world. In context.</h1><p>No articles have been published yet. Our approved reporting will appear here.</p></section>`;
 const coverage=`<section class="coverage" id="coverage"><div class="section-heading"><h2 id="coverage-heading">Across the world <span>›</span></h2><span id="coverage-count">${eligible.length} PUBLISHED ${eligible.length===1?'STORY':'STORIES'}</span></div>${Object.entries(categories).map(([key,label])=>`<section class="news-section" id="${ids[key]}" data-section="${esc(label)}" style="padding:25px 0;border-top:1px solid #ddd"><div style="display:flex;justify-content:space-between;align-items:baseline;margin:0 0 18px"><h2 style="font:27px Georgia;margin:0"><a href="/${key}/">${esc(label)} <span style="color:#b80000">›</span></a></h2><a href="/${key}/" style="font:700 11px Arial;color:#b80000">View all ${esc(label)} →</a></div><div class="coverage-grid">${eligible.filter(a=>a.section===key).slice(0,4).map(a=>card(a,'coverage-card','h3')).join('')||empty(label)}</div></section>`).join('')}<p id="no-results" hidden>No matching published articles.</p><button id="reset-filter" hidden>Show all stories →</button></section>`;
 let out=template.replace(/<section class="top-grid"[\s\S]*?(?=<section class="briefing")/,top+coverage);
 return applySharedShellCleanup(out,'home');
}

function renderHubLayout(template,{kickerTitle,hubFullTitle,shortLabel,hubArticles,otherLatest,activeNavKey,activeTopicSlug}){
 const image=(a,eager=false)=>a.image?`<a class="image-link" href="/articles/${a.slug}/"><img src="${esc(a.image)}" alt="${esc(a.image_alt)}" width="800" height="533" ${eager?'loading="eager" fetchpriority="high"':'loading="lazy"'}></a>`:'';
 const meta=a=>`<div class="meta">By ${esc(a.author)} <b>·</b> <time datetime="${a.date}">${new Date(a.date).toLocaleDateString('en-US',{day:'numeric',month:'short',year:'numeric',timeZone:'America/New_York'})}</time></div>`;
 const card=(a,kind='support',heading='h2',eager=false)=>`<article class="story ${kind}" data-category="${esc(shortLabel)}" data-search="${esc([a.title,a.summary,a.sectionLabel,a.author].join(' ').toLowerCase())}">${image(a,eager)}<div class="label"><a href="/${esc(a.section)}/">${esc(a.sectionLabel)}</a></div><${heading}><a href="/articles/${a.slug}/">${esc(a.title)}</a></${heading}>${kind==='lead'||kind==='coverage-card'?`<p>${esc(a.summary)}</p>`:''}${meta(a)}</article>`;
 const sidebarItems=hubArticles.length>3?hubArticles.slice(3,7):otherLatest;
 const sidebarHeading=hubArticles.length>3?`More on ${shortLabel}`:'Latest across SmartAIIntel';

 const top=hubArticles.length?`<section class="top-grid" aria-label="${esc(hubFullTitle)} top stories">${card(hubArticles[0],'lead','h1',true)}<div class="supporting">${hubArticles.slice(1,3).map(a=>card(a)).join('')}</div><aside class="latest"><h2><span class="red-square"></span> ${esc(sidebarHeading)}</h2>${sidebarItems.map(a=>`<article class="story latest-item"><span class="label"><a href="/${esc(a.section)}/">${esc(a.sectionLabel)}</a></span><h3><a href="/articles/${a.slug}/">${esc(a.title)}</a></h3>${meta(a)}</article>`).join('')}<a class="text-link" href="/articles/">All SmartAIIntel articles <span>→</span></a></aside></section>`:`<section style="padding:45px 0;border-bottom:1px solid #ddd"><h1 style="font:40px/1.1 Georgia;margin:0 0 14px">${esc(hubFullTitle)}</h1><p>No articles have been published on this topic yet.</p></section>`;

 const gridCards=hubArticles.map(a=>card(a,'coverage-card','h3')).join('');
 const archive=`<section class="coverage" id="coverage" style="padding-bottom:36px"><div class="section-heading"><h2 id="coverage-heading">All ${esc(hubFullTitle)} reporting <span>›</span></h2><span id="coverage-count">${hubArticles.length} PUBLISHED ${hubArticles.length===1?'STORY':'STORIES'}</span></div><section class="news-section" data-section="${esc(shortLabel)}" style="border-top:0;margin-top:0;padding-top:6px"><div class="coverage-grid" style="row-gap:30px">${gridCards}</div></section><p id="no-results" hidden>No matching articles in ${esc(shortLabel)}.</p><button id="reset-filter" hidden>Show all ${esc(shortLabel)} stories →</button></section>`;

 let out=template.replace(/<div class="section-kicker">[\s\S]*?<\/div>/,`<div class="section-kicker"><span style="font-size:12px;letter-spacing:1.8px"><i></i> ${esc(kickerTitle)}</span><span class="edition-note">${hubArticles.length} RELATED ${hubArticles.length===1?'REPORT':'REPORTS'}</span></div>`);
 out=out.replace(/<section class="top-grid"[\s\S]*?(?=<section class="editors-note")/,top+archive);
 out=out.replace('href="#briefing"','href="/#briefing"');
 return applySharedShellCleanup(out,activeNavKey,activeTopicSlug);
}

export function categoryPage(template,sectionKey,sectionFullTitle,articles){
 const shortLabel=categories[sectionKey]||sectionFullTitle;
 const secArticles=articles.filter(a=>a.test_only!==true&&a.indexable===true&&a.section===sectionKey);
 const otherLatest=articles.filter(a=>a.test_only!==true&&a.indexable===true&&a.section!==sectionKey).slice(0,4);
 return renderHubLayout(template,{
  kickerTitle:sectionFullTitle.toUpperCase(),
  hubFullTitle:sectionFullTitle,
  shortLabel,
  hubArticles:secArticles,
  otherLatest,
  activeNavKey:sectionKey,
  activeTopicSlug:''
 });
}

export function topicPage(template,topic,articles){
 const matched=matchTopicArticles(topic,articles);
 const matchedSlugs=new Set(matched.map(a=>a.slug));
 const otherLatest=articles.filter(a=>a.test_only!==true&&a.indexable===true&&!matchedSlugs.has(a.slug)).slice(0,4);
 return renderHubLayout(template,{
  kickerTitle:`IN FOCUS · ${topic.label.toUpperCase()}`,
  hubFullTitle:topic.label,
  shortLabel:topic.label,
  hubArticles:matched,
  otherLatest,
  activeNavKey:'',
  activeTopicSlug:topic.slug
 });
}
