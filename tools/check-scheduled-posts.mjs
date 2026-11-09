import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const ORIGIN='https://smartaiintel.com';
const STATE_FILE='.scheduled-publishing/state.json';
const validDate=(value,label)=>{
 // The CMS may save YAML timestamps unquoted. gray-matter's YAML reader
 // parses them as Date objects; JSON frontmatter retains string values.
 // Both represent the same absolute instant and must be accepted.
 if(value instanceof Date){
  if(!Number.isFinite(value.getTime()))throw Error(`${label}: invalid date.`);
  return new Date(value.getTime());
 }
 if(typeof value!=='string'||!/^\d{4}-\d\d-\d\dT\d\d:\d\d(?::\d\d(?:\.\d+)?)?(?:Z|[+-]\d\d:\d\d)$/.test(value))throw Error(`${label}: use an ISO timestamp with an explicit timezone.`);
 const date=new Date(value);if(!Number.isFinite(date.getTime()))throw Error(`${label}: invalid date.`);return date;
};
export function dueArticle(slug,data,now=new Date()){
 if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))throw Error('Invalid article filename.');
 if(data.editorial_approved!==true||data.publication_hold===true)return null;
 if(typeof data.title!=='string'||!data.title.trim())throw Error(`${slug}: title required.`);
 let threshold;
 if(data.date_mode==='first-publication'){
  const source=validDate(data.source_not_before,`${slug}: source_not_before`);
  const release=data.release_not_before?validDate(data.release_not_before,`${slug}: release_not_before`):source;
  threshold=new Date(Math.max(source.getTime(),release.getTime()));
 }else threshold=validDate(data.date,`${slug}: date`);
 return threshold<=now?{slug,title:data.title,threshold:threshold.toISOString()}:null;
}
export function liveArticle(html,url,now=new Date()){
 for(const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)){
  let item;try{item=JSON.parse(match[1])}catch{continue}
  if(item['@type']!=='NewsArticle'||item.mainEntityOfPage!==url)continue;
  const date=new Date(item.datePublished);
  if(!item.datePublished||!Number.isFinite(date.getTime())||date>now)throw Error('Live article has an invalid publication timestamp.');
  return true;
 }
 return false;
}
export function retryDecision(state,signature,now=new Date()){
 const previous=state?.batches?.[signature];
 if(!previous)return {allowed:true,attempts:0};
 const age=now.getTime()-new Date(previous.firstAttempt).getTime();
 if(!Number.isFinite(age)||age<0)throw Error('Scheduler state has an invalid timestamp.');
 if(age>=24*60*60*1000)return {allowed:true,attempts:0};
 if(previous.attempts>=3)return {allowed:false,blocked:true,reason:'Three deployment attempts for these pending articles in 24 hours have already been made. Check Cloudflare build logs before retrying.'};
 if(now.getTime()-new Date(previous.lastAttempt).getTime()<30*60*1000)return {allowed:false,blocked:false,reason:'A deployment was requested recently. Waiting before checking again.'};
 return {allowed:true,attempts:previous.attempts,firstAttempt:previous.firstAttempt};
}
const output=async (name,value)=>{if(process.env.GITHUB_OUTPUT)await fs.appendFile(process.env.GITHUB_OUTPUT,`${name}=${value}\n`)};
const summary=async text=>{console.log(text);if(process.env.GITHUB_STEP_SUMMARY)await fs.appendFile(process.env.GITHUB_STEP_SUMMARY,text+'\n\n')};
export async function main(){
 const now=new Date();const dir='content/articles';const due=[];
 for(const file of (await fs.readdir(dir)).filter(x=>x.endsWith('.md')).sort()){
  const {data}=matter(await fs.readFile(path.join(dir,file),'utf8'));
  const item=dueArticle(file.slice(0,-3),data,now);if(item)due.push(item);
 }
 const pending=[];
 for(const item of due){
  const url=ORIGIN+'/articles/'+item.slug+'/';let response;
  try{response=await fetch(url,{signal:AbortSignal.timeout(15000),redirect:'error',headers:{'Cache-Control':'no-cache','User-Agent':'SmartAIIntel-Scheduled-Publishing/1.0'}})}
  catch{throw Error(`Cannot verify live status of ${item.slug}; no deployment was requested.`)}
  if(response.status===404){pending.push(item);continue}
  if(!response.ok)throw Error(`Live status check for ${item.slug} returned HTTP ${response.status}; no deployment was requested.`);
  if(!liveArticle(await response.text(),url,now))throw Error(`${item.slug} returned a page without matching article metadata; no deployment was requested.`);
 }
 if(!pending.length){await summary('No approved articles are due and unpublished. No Cloudflare build requested.');return}
 const signature=pending.map(x=>x.slug).sort().join('|');let state={batches:{}};
 try{state=JSON.parse(await fs.readFile(STATE_FILE,'utf8'))}catch(e){if(e.code!=='ENOENT')throw Error('Scheduler retry state could not be read. No deployment requested.')}
 const decision=retryDecision(state,signature,now);
 if(!decision.allowed){await summary(decision.reason);if(decision.blocked)throw Error('Deployment retry limit reached. Review Cloudflare logs.');return}
 const secret=process.env.CLOUDFLARE_DEPLOY_HOOK;
 if(!secret)throw Error('Repository secret CLOUDFLARE_DEPLOY_HOOK is missing.');
 let hook;try{hook=new URL(secret)}catch{throw Error('Deploy hook secret is not a valid URL.')}
 if(hook.protocol!=='https:'||hook.hostname!=='api.cloudflare.com'||!hook.pathname.startsWith('/client/v4/pages/webhooks/deploy_hooks/')||hook.username||hook.password)throw Error('Deploy hook must be a Cloudflare Pages HTTPS deploy-hook URL.');
 // Save the attempt BEFORE calling the hook: a network timeout can occur after Cloudflare accepted it.
 const stamp=now.toISOString();state.batches??={};
 state.batches[signature]={attempts:decision.attempts+1,firstAttempt:decision.firstAttempt||stamp,lastAttempt:stamp};
 for(const [key,value] of Object.entries(state.batches))if(now-new Date(value.lastAttempt)>7*24*60*60*1000)delete state.batches[key];
 await fs.mkdir(path.dirname(STATE_FILE),{recursive:true});await fs.writeFile(STATE_FILE,JSON.stringify(state));await output('state_changed','true');
 let response;
 try{response=await fetch(hook,{method:'POST',signal:AbortSignal.timeout(20000),redirect:'error'})}
 catch{throw Error('Cloudflare hook request had a network error. The attempt was recorded; check Cloudflare before retrying.')}
 if(!response.ok)throw Error(`Cloudflare rejected the hook request (HTTP ${response.status}). Check the secret and Cloudflare project.`);
 let result;try{result=await response.json()}catch{throw Error('Cloudflare hook response was not valid JSON. Check deployment status before retrying.')}
 if(result.success!==true)throw Error('Cloudflare did not confirm the deployment request. Check deployment status.');
 await summary(`Cloudflare build requested for ${pending.length} due article(s):\n`+pending.map(x=>`* ${x.slug}`).join('\n')+'\nThis confirms a request, not a successful deployment.');
}
if(process.argv[1]&&path.resolve(process.argv[1])===path.resolve(new URL(import.meta.url).pathname)){
 main().catch(error=>{console.error(error.message);process.exitCode=1});
}
