'use strict';
const $=s=>document.querySelector(s),menu=$('.menu-toggle'),links=$('#nav-links');
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));links.classList.toggle('open',open)});
const search=$('#search'),panel=$('#search-panel'),toggle=$('.search-toggle');let category='All';
function filter(){const query=(search?.value||'').trim().toLowerCase();let count=0;document.querySelectorAll('.news-section[data-section]').forEach(section=>{let sectionCount=0;section.querySelectorAll('.story').forEach(story=>{const show=(category==='All'||story.dataset.category===category)&&(!query||story.dataset.search.includes(query));story.hidden=!show;if(show){sectionCount++;count++}});section.hidden=category!=='All'&&section.dataset.section!==category||!!query&&!sectionCount});$('#no-results').hidden=count>0||(!query&&category==='All');$('#reset-filter').hidden=!query&&category==='All';$('#search-feedback').textContent=query?`${count} matching section stories shown.`:'';}
function closeMenu(){menu?.setAttribute('aria-expanded','false');links?.classList.remove('open')}
document.querySelectorAll('[data-filter]').forEach(a=>a.addEventListener('click',()=>{category=a.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',a===b);b.removeAttribute('aria-current')});a.setAttribute('aria-current','page');filter();closeMenu()}));
toggle?.addEventListener('click',()=>{panel.hidden=!panel.hidden;toggle.setAttribute('aria-expanded',String(!panel.hidden));if(!panel.hidden)search.focus()});search?.addEventListener('input',filter);
$('#clear-search')?.addEventListener('click',()=>{search.value='';filter();search.focus()});$('#reset-filter')?.addEventListener('click',()=>{category='All';search.value='';filter()});
document.querySelectorAll('[data-topic]').forEach(button=>button.addEventListener('click',()=>{panel.hidden=false;toggle.setAttribute('aria-expanded','true');search.value=button.dataset.topic;category='All';filter();$('#coverage').scrollIntoView({behavior:'smooth'})}));
$('#analysis-link')?.addEventListener('click',()=>{category='All';search.value='';filter()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();panel.hidden=true;toggle.setAttribute('aria-expanded','false')}});
