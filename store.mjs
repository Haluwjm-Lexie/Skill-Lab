import {seedSkills} from './seed.mjs';
import {replay} from './replay.mjs';
import {validate,validateFiles,validateDB,mergeDB,checkSkill,slug,safe,LIMIT} from './core.mjs';
import {zipSync,unzipSync} from './vendor/fflate.mjs';
export {replay};
export function makeStore(storage,key){
 const raw=storage.getItem(key);let db=raw?validateDB(JSON.parse(raw)):{format:'lexie-skill-lab-pages',schema:1,skills:structuredClone(seedSkills),runs:[],backups:[]};
 const commit=next=>{validateDB(next);try{storage.setItem(key,JSON.stringify(next));}catch{throw Error('浏览器保存失败：可能空间不足或禁止存储。原记录未覆盖，请先导出备份。');}db=next;};
 const list=files=>Object.entries(files).map(([path,content])=>({path,size:new TextEncoder().encode(content).length}));
 const findSkill=id=>{const s=db.skills.find(x=>x.id===id);if(!s)throw Error('Skill 不存在');return s;};
 const findRun=id=>id===replay.id?replay:db.runs.find(x=>x.id===id);
 function install(files){const meta=validateFiles(files);if(db.skills.some(s=>s.id===meta.name))throw Error('同名 Skill 已存在，请更名后导入');const next=structuredClone(db);next.skills.push({id:meta.name,files,source:'访客导入'});commit(next);return{id:meta.name};}
 return {exportDB:()=>structuredClone(db),restore:value=>{const result=mergeDB(db,value);commit(result.value);return result;},install,
 async api(url,data){const u=new URL(url,'https://local.invalid'),p=u.pathname,id=u.searchParams.get('id');
 if(p==='/api/state')return{skills:db.skills.map(s=>{let description='',valid=true;try{description=validate(s.files['SKILL.md'],s.id).description;}catch(e){valid=false;description=e.message;}return{id:s.id,description,valid,files:Object.keys(s.files).length};}),runs:[...db.runs].reverse(),runtimeReady:true,configured:false,model:'无需密钥',dataPath:'当前浏览器 · 本网站独立存储'};
 if(p==='/api/files')return list(findSkill(u.searchParams.get('skill')).files);
 if(p==='/api/file'){const files=findSkill(u.searchParams.get('skill')).files;const content=files[safe(u.searchParams.get('path'))];if(content===undefined)throw Error('文件不存在');return{content};}
 if(p==='/api/save'){const next=structuredClone(db),s=next.skills.find(x=>x.id===data.skill);if(!s)throw Error('Skill 不存在');safe(data.path);if(typeof data.content!=='string'||data.content.length>512000)throw Error('单个文本文件上限 500 KB');if(data.path==='SKILL.md')validate(data.content,s.id);if(Object.hasOwn(s.files,data.path))next.backups.push({skill:s.id,path:data.path,content:s.files[data.path],at:new Date().toISOString()});next.backups=next.backups.slice(-30);s.files[data.path]=data.content;validateFiles(s.files,s.id);commit(next);return{ok:true};}
 if(p==='/api/create'){const name=slug(data.name),description=String(data.description||'整理用户提供的资料').replace(/\r?\n/g,' ').slice(0,1024);return install({'SKILL.md':`---\nname: ${name}\ndescription: ${JSON.stringify(description)}\n---\n# ${name}\n\n## 输入\n用户提供的资料与目标。\n\n## 步骤\n1. 确认材料完整。\n2. 按目标处理，不编造事实。\n\n## 输出要求\n给出 3 条建议，并说明理由。\n`});}
 if(p==='/api/run'&&data){if(data.mode!=='inspect')throw Error('在线演示版仅做结构检查，不调用模型');const run=checkSkill(findSkill(data.skill));const next=structuredClone(db);next.runs.push(run);commit(next);return run;}
 if(p==='/api/run'){const r=findRun(id);if(!r)throw Error('记录不存在');return{...r,artifacts:list(r.artifacts),snapshot:list(r.snapshot)};}
 if(p==='/api/artifact'){const r=findRun(id);if(!r)throw Error('记录不存在');const content=(u.searchParams.get('snapshot')==='true'?r.snapshot:r.artifacts)[safe(u.searchParams.get('path'))];if(content===undefined)throw Error('产物不存在');return{content};}
 throw Error('该操作需要本地完整版，本演示页不提供模型或脚本执行');},
 zip(url){const u=new URL(url,'https://local.invalid');let files;if(u.searchParams.has('skill'))files=findSkill(u.searchParams.get('skill')).files;else{const r=findRun(u.searchParams.get('id'));if(!r)throw Error('记录不存在');files={'meta.json':JSON.stringify(r,null,2),...Object.fromEntries(Object.entries(r.artifacts).map(([p,c])=>['artifacts/'+p,c])),...Object.fromEntries(Object.entries(r.snapshot).map(([p,c])=>['snapshot/'+p,c]))};}return zipSync(Object.fromEntries(Object.entries(files).map(([p,t])=>[p,new TextEncoder().encode(t)])));},
 importZip(bytes,subpath=''){if(bytes.length>LIMIT)throw Error('在线演示版 ZIP 上限 2 MB');let count=0,total=0;const all=unzipSync(bytes,{filter:e=>{if(++count>1000||(total+=e.originalSize)>LIMIT)throw Error('ZIP 解压后上限 2 MB / 1000 条目');safe(e.name.replace(/\/$/,''));return !e.name.endsWith('/');}});let roots=Object.keys(all).filter(p=>p==='SKILL.md'||p.endsWith('/SKILL.md')).map(p=>p.slice(0,-8));if(subpath){const q=subpath.replace(/^\/+|\/+$/g,'')+'/';roots=roots.filter(p=>p===q||p.endsWith('/'+q));}if(!roots.length)throw Error('未找到 SKILL.md，请检查 ZIP 内容或子目录');if(roots.length!==1)throw Error('包含多个 Skill，请填写子目录后重试');const prefix=roots[0],files={};const decoder=new TextDecoder('utf-8',{fatal:true});for(const[p,b]of Object.entries(all))if(p.startsWith(prefix)){const rel=p.slice(prefix.length);if(!/\.(md|txt|json|yaml|yml|py|js|mjs|csv|html|css|toml|xml|svg)$/i.test(rel)&&!/^LICENSE$/i.test(rel))throw Error('在线版仅导入文本文件，当前包含：'+rel);try{files[rel]=decoder.decode(b);}catch{throw Error('包含非 UTF-8 文本：'+rel);}}return install(files);}
 };
}
