// Approved SmartAIIntel article layout. All metadata escaped; article HTML comes from safe Markdown rendering.
const svgSprite='<svg aria-hidden="true" style="display:none" xmlns="http://www.w3.org/2000/svg"><symbol id="ic-share" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></symbol><symbol id="ic-whatsapp" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.82 14.01c-.24.68-1.4 1.3-1.95 1.38-.51.08-1.16.11-1.88-.12-.44-.14-1-.33-1.72-.64-3.02-1.3-4.99-4.35-5.14-4.55-.15-.2-1.23-1.64-1.23-3.12 0-1.48.78-2.21 1.05-2.51.28-.3.6-.38.8-.38.2 0 .4 0 .58.01.18.01.43-.07.67.51.24.58.83 2.02.9 2.17.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.18-.31.39-.45.53-.15.15-.3.31-.13.61.18.3.78 1.29 1.68 2.09 1.15 1.03 2.12 1.35 2.42 1.5.3.15.48.13.65-.08.18-.2.75-.88.95-1.18.2-.3.4-.25.68-.15.28.1 1.77.84 2.07.99.3.15.5.23.58.35.07.13.07.73-.17 1.41z"/></symbol><symbol id="ic-x" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></symbol><symbol id="ic-facebook" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></symbol><symbol id="ic-telegram" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></symbol><symbol id="ic-linkedin" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></symbol><symbol id="ic-pinterest" viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 2C6.486 2 2 6.486 2 12.017c0 4.242 2.636 7.868 6.357 9.329-.088-.792-.167-2.008.035-2.872.182-.781 1.174-4.976 1.174-4.976s-.3-.6-.3-1.486c0-1.392.807-2.432 1.812-2.432.854 0 1.267.641 1.267 1.41 0 .859-.547 2.144-.83 3.335-.236.998.5 1.812 1.484 1.812 1.782 0 3.151-1.879 3.151-4.59 0-2.401-1.725-4.079-4.188-4.079-2.853 0-4.527 2.139-4.527 4.351 0 .862.332 1.786.746 2.288a.3.3 0 0 1 .069.288c-.076.316-.245.998-.278 1.138-.044.184-.146.223-.337.134-1.249-.582-2.03-2.408-2.03-3.876 0-3.156 2.293-6.054 6.611-6.054 3.471 0 6.168 2.473 6.168 5.779 0 3.448-2.174 6.223-5.192 6.223-1.014 0-1.968-.527-2.294-1.149l-.624 2.38c-.226.868-.836 1.956-1.245 2.62.938.29 1.933.447 2.967.447 5.531 0 10.017-4.486 10.017-10.017C22.034 6.486 17.548 2 12.017 2z"/></symbol><symbol id="ic-flipboard" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h18v18H3V3zm3.6 3.6v10.8h3.6v-3.6h3.6v-3.6h3.6V6.6H6.6z"/></symbol><symbol id="ic-copy" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></symbol><symbol id="ic-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></symbol><symbol id="ic-mail" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></symbol><symbol id="ic-print" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></symbol></svg>';

const ownerShieldScript="<script>(function(){try{var k='sai_owner',u=new URL(location.href),q=u.searchParams.get('owner'),m='';if(location.pathname.indexOf('/admin')===0){localStorage.setItem(k,'1')}if(q!==null){var v=q.toLowerCase();if(v==='1'||v==='true'||v==='on'){localStorage.setItem(k,'1');m='Owner Mode ON \\u2014 Your visits on this browser will not be counted in SmartAIIntel analytics.'}else if(v==='0'||v==='false'||v==='off'){localStorage.removeItem(k);m='Owner Mode OFF \\u2014 Normal visitor counting restored on this browser.'}else{m=localStorage.getItem(k)==='1'?'Owner Mode is ACTIVE on this browser (visits excluded).':'Owner Mode is OFF on this browser.'}u.searchParams.delete('owner');history.replaceState(null,'',u.pathname+u.search+u.hash);addEventListener('DOMContentLoaded',function(){var d=document.createElement('div');d.textContent=m;d.style.cssText='position:fixed;bottom:18px;left:50%;transform:translateX(-50%);background:#111827;color:#fff;padding:11px 18px;border-radius:999px;font:600 13px/1.4 -apple-system,BlinkMacSystemFont,Segoe UI,Arial,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.28);z-index:99999;max-width:92vw;text-align:center;border:1px solid #10b981';document.body.appendChild(d);setTimeout(function(){d.remove()},4500)})}if(localStorage.getItem(k)!=='1')return;var rx=/cloudflareinsights\\.com|\\/cdn-cgi\\/rum|google-analytics\\.com|analytics\\.google\\.com|googletagmanager\\.com/i;if(navigator.sendBeacon){var sb=navigator.sendBeacon.bind(navigator);navigator.sendBeacon=function(url,data){if(rx.test(String(url)))return true;return sb(url,data)}}if(window.fetch){var fe=window.fetch.bind(window);window.fetch=function(inp,init){var url=typeof inp==='string'?inp:(inp&&inp.url)||'';if(rx.test(url))return Promise.resolve(new Response(null,{status:204}));return fe(inp,init)}}if(window.XMLHttpRequest){var xo=XMLHttpRequest.prototype.open,xs=XMLHttpRequest.prototype.send;XMLHttpRequest.prototype.open=function(mth,url){this.__saiBlk=rx.test(String(url));return xo.apply(this,arguments)};XMLHttpRequest.prototype.send=function(){if(this.__saiBlk)return;return xs.apply(this,arguments)}}if(window.MutationObserver){new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var ns=ms[i].addedNodes;for(var j=0;j<ns.length;j++){var n=ns[j];if(n&&n.tagName==='SCRIPT'&&rx.test(n.src||'')){n.removeAttribute('src');n.type='javascript/blocked';n.remove()}}}}).observe(document.documentElement,{childList:true,subtree:true})}}catch(e){}})();</script>";

const shareScript='<script>function saiCopy(b){var u=location.href,t=b.querySelector(".copy-txt"),i=b.querySelector("use"),s=document.getElementById("status");function ok(){b.classList.add("copied");if(t)t.textContent="Link copied \\u2713";if(i)i.setAttribute("href","#ic-check");if(s)s.textContent="Article link copied.";setTimeout(function(){b.classList.remove("copied");if(t)t.textContent="Copy link";if(i)i.setAttribute("href","#ic-copy");if(s)s.textContent=""},2200)}if(navigator.clipboard){navigator.clipboard.writeText(u).then(ok).catch(function(){if(s)s.textContent=u})}else if(s){s.textContent=u}}function saiShare(b){if(navigator.share){navigator.share({title:document.title.replace(/\\s*\\|\\s*(?:SMARTAI News|SmartAIIntel)$/,""),url:location.href}).catch(function(){})}else{var c=b.parentNode.querySelector(".copy-btn");if(c)saiCopy(c)}}</script>';

const template=`<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"/><meta content="width=device-width,initial-scale=1" name="viewport"/><meta content="%%ROBOTS%%" name="robots"/><title>%%TITLE%% | SMARTAI News</title><style>*{box-sizing:border-box}html,body{max-width:100%;overflow-x:hidden}body{margin:0;color:#202124;background:white;font-family:Arial,Helvetica,sans-serif}a{color:inherit}button{font:inherit;cursor:pointer}.preview{background:#f0ede8;text-align:center;font-size:11px;letter-spacing:1.3px;padding:10px 16px;color:#5d554d}.mast{background:#fff;color:#202124;border-top:3px solid #b50920;border-bottom:1px solid #e6e6e6}.top{max-width:1200px;margin:auto;height:56px;padding:0 28px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center}.home-back{font-size:11px;font-weight:700;letter-spacing:.8px;color:#444;text-decoration:none;justify-self:start;display:inline-flex;align-items:center;gap:5px}.home-back:hover{color:#b50920}.brand{text-decoration:none;display:inline-flex;align-items:center;justify-content:center;justify-self:center;line-height:0}.brand-logo{height:42px;width:auto;display:block;object-fit:contain}.footer-logo-dark{height:46px;width:auto;display:block;object-fit:contain}.tag{font-size:9.5px;font-weight:800;letter-spacing:1.5px;color:#52565e;justify-self:end}.nav{border-bottom:1px solid #ddd}.nav div{max-width:1200px;margin:auto;padding:10px 28px;display:flex;gap:28px;font-size:12px;font-weight:bold;overflow-x:auto;white-space:nowrap;scrollbar-width:none;-webkit-overflow-scrolling:touch}.nav div::-webkit-scrollbar{display:none}.nav a{text-decoration:none}.nav .active{color:#b50920}.shell{max-width:1120px;margin:42px auto 0;padding:0 28px}.kicker{font-weight:bold;font-size:12px;letter-spacing:1.8px;color:#b50920;margin-bottom:15px}.grid{display:grid;grid-template-columns:minmax(0,760px) 240px;gap:56px}.grid>*{min-width:0;max-width:100%}h1{font-size:48px;line-height:1.08;letter-spacing:-1.8px;margin:0 0 18px;font-weight:800;overflow-wrap:break-word}.summary{font-size:19px;line-height:1.5;color:#595959;margin:0 0 24px}.byline{font-weight:bold;font-size:13px;margin-bottom:7px}.time{font-size:11px;color:#686868;line-height:1.7}.share-zone{border-top:1px solid #dedede;border-bottom:1px solid #ededed;padding:13px 0;margin:18px 0 8px}.share-zone.bottom-zone{margin:34px 0 14px;background:#faf9f6;padding:16px 18px;border-radius:6px;border:1px solid #e5e2dc}.bottom-zone-label{font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#5e5a54;margin-bottom:11px}.pill-bar{display:flex;flex-wrap:wrap;align-items:center;gap:7px}.pill-btn{display:inline-flex;align-items:center;gap:6px;background:white;border:1px solid #d0d0d0;border-radius:999px;padding:7px 12px;font-size:12px;font-weight:700;color:#202124;text-decoration:none;white-space:nowrap;transition:background .14s ease,border-color .14s ease}.pill-btn:hover{background:#f6f5f2;border-color:#888}.pill-btn.primary-share{background:#b50920;border-color:#b50920;color:white}.pill-btn.primary-share:hover{background:#96071a;border-color:#96071a}.pill-btn.copied{background:#e8f5e9;border-color:#2e7d32;color:#1b5e20}.s-icon{width:15px;height:15px;flex-shrink:0;display:inline-block;vertical-align:middle}.ic-wa{color:#1fa855}.ic-x{color:#111}.ic-fb{color:#1877f2}.ic-tg{color:#229ED9}.ic-li{color:#0a66c2}.ic-pi{color:#e60023}.ic-fl{color:#e12828}.ic-util{color:#444}.status{font-size:12px;color:#2e7d32;min-height:16px;margin-bottom:4px}figure{margin:6px 0 28px}figure img{display:block;width:100%;height:auto}figcaption.two-line-cap{padding:9px 0 11px;border-bottom:1px solid #ddd;font-family:Arial,Helvetica,sans-serif}figcaption.two-line-cap .cap-line1{display:block;font-size:11.5px;line-height:1.45;color:#303236;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}figcaption.two-line-cap .cap-line2{display:block;font-size:11px;line-height:1.45;color:#6b6e73;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}figcaption.two-line-cap a{color:#8f1020;text-decoration:underline;text-underline-offset:2px}.body{max-width:680px;font:19px/1.75 Georgia,'Times New Roman',serif;overflow-wrap:break-word}.body p{margin:0 0 24px}.body a{color:#8f1020;text-decoration:underline;text-underline-offset:3px}.body h2{font-family:Arial,sans-serif;letter-spacing:-.5px;line-height:1.25;font-size:27px;margin:37px 0 18px}.body strong{font-weight:700}.mid-related{font-family:Arial,Helvetica,sans-serif;margin:30px 0 32px;padding:16px 0;border-top:3px solid #b50920;border-bottom:1px solid #dcdcdc}.mid-related-hdr{display:flex;align-items:center;justify-content:space-between;margin:0 0 12px}.mid-related-title{font-size:11.5px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:#b50920}.mid-related-sub{font-size:10px;font-weight:700;letter-spacing:.9px;text-transform:uppercase;color:#6b7280}.mid-related-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:13px}.body .mid-related a.mid-card{display:flex;flex-direction:column;text-decoration:none;color:#16181d;background:#faf9f6;border:1px solid #eae7e0;border-radius:6px;overflow:hidden;transition:border-color .15s ease,background .15s ease}.body .mid-related a.mid-card:hover{background:#f3f1ec;border-color:#b50920}.body .mid-related a.mid-card:hover .mid-hl{color:#b50920;text-decoration:underline;text-underline-offset:2px}.mid-related img.mid-thumb{width:100%;height:112px;object-fit:cover;display:block;background:#eceae4}.mid-pad{padding:9px 10px 11px;min-width:0}.mid-meta{font-size:9.5px;font-weight:800;letter-spacing:1px;text-transform:uppercase;color:#9a1224;margin-bottom:4px;line-height:1.2}.mid-hl{font-size:13px;font-weight:700;line-height:1.33;color:#16181d;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}@media(max-width:680px){.mid-related-grid{display:flex;flex-direction:column;gap:10px}.body .mid-related a.mid-card{flex-direction:row;gap:11px;align-items:center;padding:8px}.mid-related img.mid-thumb{width:92px;height:64px;border-radius:4px;flex-shrink:0}.mid-pad{padding:0}.mid-hl{font-size:13.2px}}.aside{padding-top:6px}.aside h2{font-size:12px;letter-spacing:1.5px;border-top:4px solid #b50920;padding-top:15px;margin:0}.aside p{font-size:13px;line-height:1.7;color:#626262}.aside .label{font-size:10px;letter-spacing:1.2px;font-weight:bold;color:#9a1224}.context{border-bottom:1px solid #ddd;padding:18px 0}.context-card{display:block;text-decoration:none;color:inherit}.context-card:hover h3{color:#b50920;text-decoration:underline;text-underline-offset:2px}.context-thumb{width:100%;height:136px;object-fit:cover;border-radius:6px;display:block;margin:0 0 10px;background:#eceae4}.context-copy{min-width:0}.context h3{font-size:16.5px;line-height:1.34;margin:6px 0 7px;color:#16181d}.context p{margin:0;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}@media(max-width:950px){.aside h2{margin-bottom:4px}.context{padding:14px 0}.context-card{display:flex;gap:13px;align-items:flex-start}.context-thumb{width:110px;height:76px;margin:0;flex-shrink:0;border-radius:5px}.context h3{font-size:15.5px;line-height:1.32;margin:4px 0 5px}.context p{font-size:12.5px;line-height:1.45;-webkit-line-clamp:2}}.end{font-size:12px;line-height:1.7;padding:24px;background:#f6f5f2;border-top:3px solid #b50920;margin:28px 0 35px}.end strong{display:block;font-size:13px;margin-bottom:7px}footer{margin-top:65px;background:#151515;color:white;padding:35px 28px}footer>div{max-width:1120px;margin:auto}footer p{font-size:12px;color:#aaa;line-height:1.7}.article-end{border-top:1px solid #ddd;padding-top:20px;font:12px Arial;color:#666}@media(max-width:950px){.grid{grid-template-columns:minmax(0,1fr);gap:30px}.aside{border-top:1px solid #ddd;padding-top:22px}.aside .context{display:block;width:100%}h1{font-size:38px;letter-spacing:-1.2px}.body{max-width:100%}.tag{display:none}}@media(max-width:640px){.pill-bar{flex-wrap:wrap;gap:6px;overflow:visible}.pill-btn{width:34px;height:34px;padding:0;justify-content:center;border-radius:999px}.pill-btn span{display:none!important}.pill-btn .s-icon{width:16px;height:16px}figcaption.two-line-cap .cap-line1,figcaption.two-line-cap .cap-line2{white-space:normal;overflow:visible;text-overflow:clip}}@media(max-width:550px){.top{height:48px;padding:0 16px}.home-back span{display:none}.brand-logo{height:36px}.footer-logo-dark{height:42px}.nav div{padding:9px 16px;gap:18px;font-size:11.5px}.shell{padding:0 16px;margin-top:20px}.kicker{font-size:11px;margin-bottom:10px}h1{font-size:clamp(25px,6.8vw,30px);letter-spacing:-.6px;line-height:1.16;margin:0 0 13px}.summary{font-size:16px;line-height:1.48;margin:0 0 16px}figure{margin:6px 0 22px}figure img{border-radius:4px}.body{font-size:17.5px;line-height:1.72}.body p{margin:0 0 20px}.body h2{font-size:21.5px;line-height:1.25;margin:28px 0 13px}.end{padding:18px 16px}footer{padding:28px 16px}.preview{font-size:9px;letter-spacing:.7px}}@media print{.share-zone,.mid-related,.nav,.aside,footer,.status{display:none!important}.grid{display:block}}</style><link href="%%URL%%" rel="canonical"/><meta content="%%DESCRIPTION%%" name="description"/><meta content="%%TITLE%%" property="og:title"/><meta content="%%URL%%" property="og:url"/><meta content="article" property="og:type"/><meta content="max-image-preview:large" name="robots"/></head><body>${svgSprite}<header class="mast"><div class="top"><a class="home-back" href="/" aria-label="SMARTAI News Home"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18M5 6h14M5 18h14"/></svg><span>NEWS HOME</span></a><a class="brand" href="/" aria-label="SMARTAI News"><img class="brand-logo" src="%%BRANDLOGO%%" alt="SMARTAI News" width="436" height="372" decoding="async"/></a><span class="tag">SMARTAI NEWS &middot; US &amp; WORLD</span></div></header><nav aria-label="Sections" class="nav"><div><a href="/">HOME</a><a class="active" href="/articles/">US NEWS</a><a href="/articles/">WORLD</a><a href="/articles/">SECURITY</a><a href="/articles/">TECHNOLOGY</a><a href="/articles/">BUSINESS</a><a href="/articles/">SPORTS</a></div></nav><main class="shell" id="main"><div class="kicker"><a href="/%%SECTIONSLUG%%/" style="text-decoration:none">%%SECTION%% ›</a></div><div class="grid"><article><h1>%%HEADLINE%%</h1><p class="summary">%%SUMMARY%%</p><div class="byline">By %%AUTHOR%%</div><div class="time">%%DATES%%</div>%%SHARETOP%%<div aria-live="polite" class="status" id="status"></div>%%FIGURE%%<div class="body">%%BODY%%</div>%%SHAREBOTTOM%%<div class="end"><strong>Our reporting standards</strong>Read our <a href="/editorial-policy/" rel="noopener" target="_blank">Editorial &amp; Corrections Policy</a>. To report an error, email <a href="mailto:bloggerinvitro@gmail.com">bloggerinvitro@gmail.com</a>.</div></article><aside class="aside" id="context">%%SIDEBAR%%</aside></div></main><footer><div><a class="brand" href="/" aria-label="SMARTAI News"><img class="footer-logo-dark" src="%%BRANDLOGODARK%%" alt="SMARTAI News" width="393" height="338" loading="lazy" decoding="async"/></a><p><strong style="color:#fff">SMARTAI News</strong> &middot; US NEWS. GLOBAL CONTEXT.</p><p><a href="/about/">About</a> · <a href="/contact/">Contact</a> · <a href="/editorial-policy/">Editorial &amp; Corrections</a> · <a href="/privacy/">Privacy Policy</a></p></div></footer>${shareScript}</body></html>`;

const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=s=>new Intl.DateTimeFormat('en-US',{dateStyle:'long',timeStyle:'short',timeZone:'America/New_York'}).format(new Date(s));
const zone=s=>new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',timeZoneName:'short'}).formatToParts(new Date(s)).find(x=>x.type==='timeZoneName').value;

// Verified Wikimedia Commons file pages for early articles published before Source: URLs were added to frontmatter
const legacySourceMap={
 '/assets/uploads/nersc-server-racks-2011.webp':'https://commons.wikimedia.org/wiki/File:Front_of_server_racks_at_NERSC.jpg',
 '/assets/uploads/kiewit-plaza-omaha-2010.webp':'https://commons.wikimedia.org/wiki/File:Kiewit_Plaza_Omaha.jpg',
 '/assets/uploads/trump-dana-white-2018.webp':'https://commons.wikimedia.org/wiki/File:President_Donald_Trump_and_Dana_White.jpg',
 '/assets/uploads/merdeka-palace-guard-2010.webp':'https://commons.wikimedia.org/wiki/File:Merdeka_Palace_Changing_Guard_2.jpg',
 '/assets/uploads/sarah-huckabee-sanders-2017.webp':'https://commons.wikimedia.org/wiki/File:Sarah-Huckabee-Sanders-2017-05-05.png',
 '/assets/uploads/cybertruck-oslo-2024.webp':'https://commons.wikimedia.org/wiki/File:Tesla_Cybertruck_at_Sk%C3%B8yen,_Norway_(2024).jpg'
};

const monthsRe='(?:January|February|March|April|May|June|July|August|September|October|November|December|Jan\\.?|Feb\\.?|Mar\\.?|Apr\\.?|Jun\\.?|Jul\\.?|Aug\\.?|Sep\\.?|Sept\\.?|Oct\\.?|Nov\\.?|Dec\\.?)';

function cleanSubjectLine(alt,credit){
 let s=String(alt||credit||'').trim();
 s=s.replace(/^Archive\s+(?:aerial\s+)?(?:photograph|photo|image)\s*(?:of\s+|:|\.|,\s*)/i,'');
 s=s.replace(new RegExp('^'+monthsRe+'\\s+\\d{1,2},?\\s+\\d{4}\\s*[:,-]?\\s*','i'),'');
 s=s.replace(/\.\s*Capture date[^.]*\.?/gi,'');
 s=s.replace(new RegExp(',?\\s*published in [^.,]*?'+monthsRe+'\\s+\\d{4}[^.]*','gi'),'');
 s=s.replace(new RegExp(',?\\s*(?:taken\\s+|on\\s+)?'+monthsRe+'\\s+\\d{1,2},?\\s+\\d{4}','gi'),'');
 s=s.replace(new RegExp(',?\\s*(?:in\\s+)?'+monthsRe+'\\s+\\d{4}','gi'),'');
 s=s.replace(/\b(?:19|20)\d{2}-\d{2}-\d{2}\b/g,'');
 s=s.replace(/^the\s+(?=[A-Z])/i,'');
 s=s.replace(/\s+/g,' ').replace(/[.,;:\s]+$/,'').trim();
 if(s)s=s.charAt(0).toUpperCase()+s.slice(1);
 return s||'Article photograph';
}

function formatCreditLine(credit,imagePath){
 const raw=String(credit||'').trim();
 const srcMatch=raw.match(/Source:\s*(https:\/\/[^\s<>]+)/i);
 const licMatch=raw.match(/(?:License|Reuse policy):\s*(https:\/\/[^\s<>]+)/i);
 const cleanImgPath=String(imagePath||'').split('?')[0];
 const sourceUrl=srcMatch?srcMatch[1]:(legacySourceMap[cleanImgPath]||'');
 let licenseUrl=licMatch?licMatch[1]:'';

 let provider='';
 if(/Wikimedia Commons/i.test(raw)||/wikimedia\.org/i.test(sourceUrl))provider='Wikimedia Commons';
 else if(/\bvia\s+CDC\b/i.test(raw)||/\bcdc\.gov\b/i.test(sourceUrl))provider='CDC';
 else if(sourceUrl)provider='Source';

 let author='';
 const safeRaw=raw.replace(/\b(Jr|Sr|Dr|Mr|Ms|St)\./g,'$1\u0000');
 const viaMatch=safeRaw.match(/(?:^|\.\s*|:\s*)([^.:]+?),\s*via\s+(?:Wikimedia Commons|CDC)/i);
 if(viaMatch)author=viaMatch[1].replace(/\u0000/g,'.').trim();
 const cropAfter=raw.match(/Cropped version by\s+([^.,]+)/i);
 if(author&&cropAfter&&!author.includes(cropAfter[1].trim()))author=`${author} / ${cropAfter[1].trim()}`;
 author=author
  .replace(/^Photo:\s*/i,'')
  .replace(/;\s*cropped version by\s+/i,' / ')
  .replace(/^US Army [^,]*?photograph by\s+(.+)$/i,'$1 / US Army')
  .replace(/,\s*Executive Office of the President$/i,' / White House')
  .replace(/^US Department of State$/i,'US Dept. of State')
  .replace(/\s*\([^)]*\)/g,'')
  .trim();

 let licenseLabel='';
 let adapted=/Resized|Converted|Cropped|compressed/i.test(raw);
 if(/Public domain|public-domain/i.test(raw)){
  licenseLabel='Public Domain';
  adapted=false;
 }else if(/\bCC0\b/i.test(raw)){
  licenseLabel='CC0';
  if(!licenseUrl)licenseUrl='https://creativecommons.org/publicdomain/zero/1.0/';
  adapted=false;
 }else{
  const ccSa=raw.match(/(?:Creative Commons Attribution[- ]ShareAlike|CC BY-SA)\s*(\d\.\d)/i);
  const ccBy=raw.match(/(?:Creative Commons Attribution|CC BY)\s*(\d\.\d)/i);
  if(ccSa){
   licenseLabel=`CC BY-SA ${ccSa[1]}`;
   if(!licenseUrl)licenseUrl=`https://creativecommons.org/licenses/by-sa/${ccSa[1]}/`;
  }else if(ccBy){
   licenseLabel=`CC BY ${ccBy[1]}`;
   if(!licenseUrl)licenseUrl=`https://creativecommons.org/licenses/by/${ccBy[1]}/`;
  }else if(licenseUrl){
   licenseLabel='License';
  }
 }

 const parts=[];
 if(author)parts.push(`Photo: ${esc(author)}`);
 if(provider)parts.push(sourceUrl?`<a href="${esc(sourceUrl)}" target="_blank" rel="noopener noreferrer">${esc(provider)}</a>`:esc(provider));
 if(licenseLabel){
  const licHtml=licenseUrl?`<a href="${esc(licenseUrl)}" target="_blank" rel="noopener noreferrer">${esc(licenseLabel)}</a>`:esc(licenseLabel);
  parts.push(adapted?`${licHtml} (WebP)`:licHtml);
 }
 if(!parts.length&&sourceUrl)parts.push(`<a href="${esc(sourceUrl)}" target="_blank" rel="noopener noreferrer">Image source &amp; license</a>`);
 return parts.join(' &middot; ');
}

function buildShareBar(a,isBottom){
 const u=encodeURIComponent(a.url);
 const t=encodeURIComponent(a.title);
 const wt=encodeURIComponent(`${a.title} ${a.url}`);
 const imgAbs=a.image?new URL(a.image,a.url).href:'';
 const pin=`https://pinterest.com/pin/create/button/?url=${u}${imgAbs?`&media=${encodeURIComponent(imgAbs)}`:''}&description=${t}`;
 const wa=`https://wa.me/?text=${wt}`;
 const x=`https://x.com/intent/post?text=${t}&url=${u}`;
 const fb=`https://www.facebook.com/sharer/sharer.php?u=${u}`;
 const tg=`https://t.me/share/url?url=${u}&text=${t}`;
 const li=`https://www.linkedin.com/sharing/share-offsite/?url=${u}`;
 const fl=`https://share.flipboard.com/bookmarklet/popout?v=2&title=${t}&url=${u}`;
 const em=`mailto:?subject=${t}&body=${u}`;
 const pills=`<div class="pill-bar"><button aria-label="Share" class="pill-btn primary-share" onclick="saiShare(this)" title="Share" type="button"><svg class="s-icon"><use href="#ic-share"/></svg><span>Share</span></button><a aria-label="Share on WhatsApp" class="pill-btn" href="${esc(wa)}" rel="noopener noreferrer" target="_blank" title="WhatsApp"><svg class="s-icon ic-wa"><use href="#ic-whatsapp"/></svg><span>WhatsApp</span></a><a aria-label="Share on X" class="pill-btn" href="${esc(x)}" rel="noopener noreferrer" target="_blank" title="X"><svg class="s-icon ic-x"><use href="#ic-x"/></svg><span>X</span></a><a aria-label="Share on Facebook" class="pill-btn" href="${esc(fb)}" rel="noopener noreferrer" target="_blank" title="Facebook"><svg class="s-icon ic-fb"><use href="#ic-facebook"/></svg><span>Facebook</span></a><a aria-label="Share on Telegram" class="pill-btn" href="${esc(tg)}" rel="noopener noreferrer" target="_blank" title="Telegram"><svg class="s-icon ic-tg"><use href="#ic-telegram"/></svg><span>Telegram</span></a><a aria-label="Share on LinkedIn" class="pill-btn" href="${esc(li)}" rel="noopener noreferrer" target="_blank" title="LinkedIn"><svg class="s-icon ic-li"><use href="#ic-linkedin"/></svg><span>LinkedIn</span></a><a aria-label="Share on Pinterest" class="pill-btn" href="${esc(pin)}" rel="noopener noreferrer" target="_blank" title="Pinterest"><svg class="s-icon ic-pi"><use href="#ic-pinterest"/></svg><span>Pinterest</span></a><a aria-label="Share on Flipboard" class="pill-btn" href="${esc(fl)}" rel="noopener noreferrer" target="_blank" title="Flipboard"><svg class="s-icon ic-fl"><use href="#ic-flipboard"/></svg><span>Flipboard</span></a><button aria-label="Copy link" class="pill-btn copy-btn" onclick="saiCopy(this)" title="Copy link" type="button"><svg class="s-icon ic-util"><use href="#ic-copy"/></svg><span class="copy-txt">Copy link</span></button><a aria-label="Email story" class="pill-btn" href="${esc(em)}" title="Email"><svg class="s-icon ic-util"><use href="#ic-mail"/></svg><span>Email</span></a><button aria-label="Print story" class="pill-btn" onclick="window.print()" title="Print" type="button"><svg class="s-icon ic-util"><use href="#ic-print"/></svg><span>Print</span></button></div>`;
 return isBottom
  ?`<div aria-label="Share article" class="share-zone bottom-zone"><div class="bottom-zone-label">Share this SMARTAI News report</div>${pills}</div>`
  :`<div aria-label="Share article" class="share-zone">${pills}</div>`;
}


function buildRecircBox(items,title,sub){
 if(!items||!items.length)return '';
 const cards=items.slice(0,3).map(x=>{
  const thumbAlt=cleanSubjectLine(x.image_alt,x.image_credit);
  const thumb=x.image?`<img class="mid-thumb" src="${esc(x.image)}" alt="${esc(thumbAlt)}" width="320" height="214" loading="lazy" decoding="async" onerror="this.style.display='none'">`:'';
  const hl=x.seo_title||x.title;
  return `<a class="mid-card" href="/articles/${esc(x.slug)}/">${thumb}<div class="mid-pad">${x.sectionLabel?`<div class="mid-meta">${esc(x.sectionLabel)}</div>`:''}<div class="mid-hl">${esc(hl)}</div></div></a>`;
 }).join('');
 return `<aside class="mid-related" aria-label="${esc(title)}"><div class="mid-related-hdr"><span class="mid-related-title">${esc(title)}</span><span class="mid-related-sub">${esc(sub)}</span></div><div class="mid-related-grid">${cards}</div></aside>`;
}

function stripTagsWords(s){
 return String(s||'').replace(/<[^>]+>/g,' ').trim().split(/\s+/).filter(Boolean).length;
}

function injectTwoSpacedWidgets(html,w1Html,w2Html){
 if(!html||!w1Html)return html;
 const h2s=[...html.matchAll(/<h2\b[^>]*>/gi)];
 if(h2s.length>=2){
  const pBefore0=(html.slice(0,h2s[0].index).match(/<\/p>/gi)||[]).length;
  const idx1=pBefore0>=2?h2s[0].index:h2s[1].index;
  let idx2=-1;
  if(w2Html){
   const lastIdx=h2s[h2s.length-1].index;
   if(lastIdx>idx1&&stripTagsWords(html.slice(idx1,lastIdx))>=220){
    idx2=lastIdx;
   }else if(stripTagsWords(html.slice(idx1))>=380){
    const psAfter=[...html.slice(idx1).matchAll(/<\/p>/gi)];
    if(psAfter.length>=4){
     const targetP=psAfter[psAfter.length-2];
     idx2=idx1+targetP.index+targetP[0].length;
    }
   }
  }
  if(idx2>idx1){
   return html.slice(0,idx1)+w1Html+html.slice(idx1,idx2)+w2Html+html.slice(idx2);
  }
  return html.slice(0,idx1)+w1Html+html.slice(idx1);
 }
 const ps=[...html.matchAll(/<\/p>/gi)];
 if(ps.length>=4){
  const cut1=ps[2].index+ps[2][0].length;
  if(w2Html&&ps.length>=8&&stripTagsWords(html.slice(cut1,ps[ps.length-2].index))>=220){
   const cut2=ps[ps.length-3].index+ps[ps.length-3][0].length;
   return html.slice(0,cut1)+w1Html+html.slice(cut1,cut2)+w2Html+html.slice(cut2);
  }
  return html.slice(0,cut1)+w1Html+html.slice(cut1);
 }
 return html;
}

export function articlePage(a,extraHead=''){
 const dates=`Published <time datetime="${esc(a.date)}">${esc(fmt(a.date))} ${esc(zone(a.date))}</time>${a.updated!==a.date?` · Updated <time datetime="${esc(a.updated)}">${esc(fmt(a.updated))} ${esc(zone(a.updated))}</time>`:''}`;
 const width=Number.isInteger(a.image_width)&&a.image_width>0?a.image_width:null;
 const height=Number.isInteger(a.image_height)&&a.image_height>0?a.image_height:null;
 const cleanAlt=cleanSubjectLine(a.image_alt,a.image_credit);
 const creditLine=formatCreditLine(a.image_credit,a.image);
 const figure=a.image?`<figure><img src="${esc(a.image)}" alt="${esc(cleanAlt)}"${width&&height?` width="${width}" height="${height}"`:''} decoding="async" fetchpriority="high"><figcaption class="two-line-cap"><span class="cap-line1">${esc(cleanAlt)}</span><span class="cap-line2">${creditLine}</span></figcaption></figure>`:'';
 const validItem=x=>x&&x.slug!==a.slug&&/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(x.slug);
 const related=(a.related||[]).filter(validItem).slice(0,3);
 const mid1=(a.midRelated1||related).filter(validItem).slice(0,3);
 const mid2=(a.midRelated2||[]).filter(validItem).slice(0,3);
 const box1=buildRecircBox(mid1,'More on this story','Related Coverage');
 const box2=buildRecircBox(mid2,'Trending on SMARTAI News','Latest Breaking');
 const bodyWithWidgets=injectTwoSpacedWidgets(a.html,box1,box2);
 const sidebar=`<h2>RELATED POSTS</h2>${related.length?related.map(x=>{const tAlt=cleanSubjectLine(x.image_alt,x.image_credit);const tImg=x.image?`<img class="context-thumb" src="${esc(x.image)}" alt="${esc(tAlt)}" width="320" height="214" loading="lazy" decoding="async" onerror="this.style.display='none'">`:'';return `<div class="context"><a class="context-card" href="/articles/${esc(x.slug)}/">${tImg}<div class="context-copy">${x.sectionLabel?`<div class="label">${esc(x.sectionLabel)}</div>`:''}<h3>${esc(x.seo_title||x.title)}</h3>${x.summary?`<p>${esc(x.summary)}</p>`:''}</div></a></div>`}).join(''):'<p>More related posts will appear here as articles are published.</p>'}`;
 const structured={'@context':'https://schema.org','@type':'NewsArticle',headline:a.title,description:a.description,datePublished:a.date,dateModified:a.updated,author:{'@type':a.author==='SmartAIIntel News Desk'||a.author==='SMARTAI News Desk'?'Organization':'Person',name:a.author},publisher:{'@type':'NewsMediaOrganization',name:'SMARTAI News',alternateName:['SN','SAI News','SMARTAI NEWS','SmartAIIntel'],url:'https://smartaiintel.com/',logo:{'@type':'ImageObject',url:'https://smartaiintel.com/assets/smartai-news-logo-wide.png',width:436,height:372}},mainEntityOfPage:a.url,...(a.image?{image:[new URL(a.image,a.url).href]}:{})};
 const values={TITLE:esc(a.seo_title||a.title),HEADLINE:esc(a.title),SUMMARY:esc(a.summary),DESCRIPTION:esc(a.description),AUTHOR:esc(a.author),SECTION:esc(a.sectionLabel),SECTIONSLUG:esc(a.section),URL:esc(a.url),ROBOTS:a.indexable===true?'index,follow':'noindex,nofollow',DATES:dates,BRANDLOGO:esc(a.brandLogo||'/assets/smartai-news-logo-wide.webp'),BRANDLOGODARK:esc(a.brandLogoDark||'/assets/smartai-news-logo-dark.webp'),SHARETOP:buildShareBar(a,false),SHAREBOTTOM:buildShareBar(a,true),BODY:bodyWithWidgets+(a.editorial_disclosure?`<p class="article-end"><strong>Editorial disclosure:</strong> ${esc(a.editorial_disclosure)}</p>`:'')+(a.correction?`<p class="end"><strong>Correction:</strong> ${esc(a.correction)}</p>`:''),FIGURE:figure,SIDEBAR:sidebar};
 let output=template.replace(/%%([A-Z]+)%%/g,(_,key)=>values[key]??'');
 const sectionNav={'us-news':'US NEWS',world:'WORLD',security:'SECURITY',technology:'TECHNOLOGY',business:'BUSINESS',sports:'SPORTS'};
 const labelSlug={'US NEWS':'us-news',WORLD:'world',SECURITY:'security',TECHNOLOGY:'technology',BUSINESS:'business',SPORTS:'sports'};
 output=output.replace(/<a(?: class="active")? href="\/articles\/">(US NEWS|WORLD|SECURITY|TECHNOLOGY|BUSINESS|SPORTS)<\/a>/g,(_,label)=>`<a${label===sectionNav[a.section]?' class="active" aria-current="page"':''} href="/${labelSlug[label]}/">${label}</a>`);
 const extras=`<link rel="alternate" type="application/rss+xml" title="SMARTAI News" href="https://smartaiintel.com/rss.xml"><script type="application/ld+json">${JSON.stringify(structured).replace(/</g,'\\u003c')}</script>${a.image?`<meta property="og:image" content="${esc(new URL(a.image,a.url).href)}">`:''}`;
 const social=`<meta property="og:description" content="${esc(a.description)}"><meta name="twitter:card" content="${a.image?'summary_large_image':'summary'}">${a.image?`<meta property="og:image:alt" content="${esc(cleanAlt)}">${width&&height?`<meta property="og:image:width" content="${width}"><meta property="og:image:height" content="${height}">`:''}`:''}`;
 return output.replace('</head>',extras+social+extraHead+ownerShieldScript+'</head>');
}
