const portalLinks=[
 ['','主頁'],['ice','四組破冰'],['angle','揀角度'],['relay','傳話'],
 ['writing','標題與導語'],['summary','100 字濃縮'],['caption','選圖與圖片說明'],
 ['response','首份回應'],['interview','四組專訪'],['team','綜合實戰'],
 ['crisis','突發回應'],['application','個人應用']
];

const params=new URLSearchParams(location.search);
const route=params.get('activity')||'';
const sessionId=params.get('session');
const workshopAPI='https://news-writing-workshop-1116.ronlam1981.chatgpt.site/api/classroom/student/';
const main=document.getElementById('main');
const nav=document.getElementById('class-nav');
const captionImages=Object.fromEntries(['大合','1','2','4','3-1'].map((name,i)=>[
 'ABCDE'[i],'https://skhssco.org.mo/wp-content/uploads/2026/09/'+encodeURIComponent(name)+'-1024x768.jpg'
]));
function courseHref(id=''){
  if(id==='ice')return './icebreaker.html';
 const query=new URLSearchParams();
 if(id)query.set('activity',id);
 if(sessionId)query.set('session',sessionId);
 return './'+(query.size?'?'+query:'');
}
function node(tag,text='',className=''){
 const el=document.createElement(tag);
 if(text)el.textContent=text;
 if(className)el.className=className;
 return el;
}
function link(text,href,className=''){
 const el=node('a',text,className);el.href=href;return el;
}
function button(text,fn,primary=false){
 const el=node('button',text,primary?'primary':'secondary');el.type='button';
 el.onclick=fn;return el;
}
function input(label,options={}){
 const wrap=node('label','','class-field');
 const caption=node('span',label);wrap.append(caption);
 const el=node(options.choices?'select':options.multi?'textarea':'input');
 if(options.choices){
  el.append(new Option('請選擇',''));
  for(const value of options.choices)el.append(new Option(value,value));
 }
 if(options.type)el.type=options.type;
 if(options.max)el.maxLength=options.max;
 if(options.multi)el.rows=4;
 if(options.value!==undefined)el.value=options.value;
 if(options.required)el.required=true;
 wrap.append(el);
 return {wrap,el};
}
function title(value,subtitle){
 const intro=node('section','','intro');
 intro.append(node('h1',value),node('p',subtitle,'dek'));
 return intro;
}
function briefing(heading,value){
 const el=node('section','','brief');el.append(node('h2',heading),node('p',value));return el;
}
function materials(box,selected){
 for(const source of summarySources){
  if(selected&&source.label!==selected)continue;
  const details=node('details','','brief');
  if(selected)details.open=true;
  const anchor=link('閱讀主辦單位原稿 ↗',source.url);
  anchor.target='_blank';anchor.rel='noopener noreferrer';
  details.append(node('summary',source.label+'｜'+source.count.toLocaleString('en-US')+' 字'),
   node('p',source.title),node('p','聖公會澳門社會服務處｜'+source.date),node('p',source.focus),anchor);
  box.append(details);
 }
 if(!selected)box.append(node('p','字數計正文的文字及數字，標題、圖說、標點和空格不計。','hint'));
 if(selected&&!box.children.length)box.append(node('p','這是較早期的練習底稿。','hint'));
}
const oral={
 angle:['揀一個值得報道的角度','16 名中學生參加半日職涯探索，聽服務業介紹，再分組練接待及模擬查詢。','找身旁一人，一人代入家長，一人代入一般讀者。讀題 30 秒，各用 1 分鐘說明角度及理由，最後 30 秒揀一個角度，並提出一項寫稿前要確認的資料。','例如題目未說明中心會否再辦同類活動，可向主辦方查問。'],
 interview:['四組模擬專訪','虛構｜家庭支援站向長者照顧者提供初步諮詢、資源資訊及轉介。收費、輪候及即日安排尚未核實。','4 分鐘準備一句核心訊息及一項待核資料。導師扮記者，A 至 D 組每組受訪 4 分鐘。其後全班用 4 分鐘比較答法。','先回答問題，補已核實事實，再說下一步。代表先答，組員可補充。']
};
const teamCards=[
 ['第 1 組（A）｜青年咖啡研學','2026 年 8 月 13–14 日，聖公會氹仔青年服務隊帶 8 名澳門青少年到江門參訪咖啡企業及博物館。','從青年學習出發，寫標題和圖片說明。','這次參訪對職涯有何幫助？如何核實長期成效？'],
 ['第 2 組（B）｜童行拾星','計劃支援兒童、青少年及家庭的情緒健康與特殊學習需要。機構公布，前三年推出 7 項服務行動及計劃，近 500 受惠人次。','交代籌款用途及可公開的素材。','可否安排受助兒童及家長受訪？'],
 ['第 3 組（C）｜琴澳兒童健康生活活動','2026 年 7–8 月，49 名 5 至 8 歲澳門兒童參加健康生活培訓，內容包括營養、應對陌生人邀請及琴澳交流。','從家長角度寫標題、選相及寫圖片說明。','如何知道孩子真的掌握方法？'],
 ['第 4 組（D）｜沉默的籌碼','2025 年 11 月 16 日，聖公會舉辦沉浸式體驗，讓公眾了解受賭博問題影響的家人。機構報道有 57 人次參與。','從家人處境找新聞角度。','可否邀請家人現身？如何保障意願與私隱？']
];
const crisisCards=[
 ['第 1 組（A）｜活動名額','24 個名額，收到 41 份申請。家長質疑先到先得與取錄安排不符。','先照顧誰？怎樣回應家長，下一步查甚麼？'],
 ['第 2 組（B）｜兒童受訪','記者要求當日下午訪問及拍攝正面。兒童及家庭意願、授權範圍待核。','如何先回應記者？要向誰核對意願和授權？'],
 ['第 3 組（C）｜活動安全','網傳約 12 秒片段見孩子跌倒。事發經過及身體情況待核。','如何先照顧受影響的人？有甚麼可以交代？'],
 ['第 4 組（D）｜服務聯絡','家屬稱昨晚致電兩次未接。值班、通話紀錄及個案需要待核。','怎樣回應家屬的不安？由誰跟進、何時更新？']
];
function extraMaterials(id){
 if(id==='team'||id==='crisis'){
  const panel=node('section','','stack class-section');
  panel.append(node('h2',id==='team'?'四份實戰案例':'四份突發案例'),node('p','點選案例標題查看內容，按導師分配的案例作答。','hint'));
  for(const [heading,text,task,question] of (id==='team'?teamCards:crisisCards)){
   const card=node('details','','brief');
   card.append(node('summary',heading),node('p',text));
   if(task)card.append(node('p','任務｜'+task));
   if(question)card.append(node('p','追問｜'+question));
   panel.append(card);
  }
  main.append(panel);
 }
 if(id==='caption'){
  const grid=node('div','','caption-gallery');
  for(const choice of captionChoices){
   const figure=node('figure'),image=node('img');
   const src=captionImages[choice];
   image.src=src;image.alt='原稿圖片 '+choice;image.loading='lazy';image.width=1024;image.height=768;
   const zoom=link('',src);zoom.target='_blank';zoom.rel='noopener noreferrer';
   zoom.setAttribute('aria-label','放大圖片 '+choice);zoom.append(image);
   figure.append(zoom,node('figcaption','圖片 '+choice));grid.append(figure);
  }
  main.append(grid);
 }
}

for(const [id,label] of portalLinks){
 const anchor=link(label,courseHref(id));
 if(id===route)anchor.setAttribute('aria-current','page');
 nav.append(anchor);
}
const lesson=Object.hasOwn(activities,route)?activities[route]:null;
const oralLesson=Object.hasOwn(oral,route)?oral[route]:null;
function taskText(id){
 return id==='relay'?'每組最後一位填寫收到的訊息，按「傳送答案」。':activities[id]?.task;
}
if(lesson){
 document.title=lesson.title+'｜傳媒協作力提升';
 main.classList.add('student');
 main.append(title(lesson.title,taskText(route)),briefing('題目背景',lesson.context));
 if(route==='relay')main.append(briefing('傳話規則',relay.pass.join(' ')));
 extraMaterials(route);
 if(route==='summary'){
  const originals=node('section');materials(originals);main.append(originals);
 }
 if(route==='caption'){
  const original=link('主辦機構原稿及照片 ↗',captionOriginal);
  original.target='_blank';original.rel='noopener noreferrer';
  main.append(original);
 }
 renderAnswer(lesson);
}else if(oralLesson){
 const [heading,context,steps,review]=oralLesson;
 main.append(title(heading,context),briefing('現場做法',steps),briefing('分享與點評',review));
}else{
 main.append(title('傳媒協作力提升','學員網站｜閱讀題目，填妥後按「傳送答案」。'));
 const list=node('section','','portal-grid');
 for(const [id,label] of portalLinks.slice(1)){
  const activity=activities[id];
  const item=link('',courseHref(id),'class-card');
  item.append(node('small',activity?(activity.group?'小組練習':'個人練習'):'現場討論'),node('strong',label),
   node('p',taskText(id)??oral[id]?.[1]??'四組各讀一張照片和短稿，討論讀者、證據和新聞價值。','hint'));
  list.append(item);
 }
 main.append(list);
}

function renderAnswer(lesson){
 const form=node('form','','sheet stack');
 form.append(node('h2','寫低答案'),node('p','請勿填寫姓名或可辨認個案嘅資料。若連線不穩，可複製答案或用答題紙。','hint'));
 const specs=route==='relay'?lesson.fields.slice(1):lesson.fields;
 const controls=specs.map(([label,spec])=>[label,input(label,Array.isArray(spec)?{choices:spec,required:true}:{max:spec,multi:spec>=150,required:true})]);
 if(lesson.group)controls.unshift(['組別',input('組別',{choices:Array.from({length:4},(_,i)=>relayGroupLabel(i+1,4)),required:true})]);
 for(const [,field] of controls)form.append(field.wrap);
 if(route==='summary'){
  const text=controls[1][1].el;
  const count=node('p','0 字（不計標點及空格）','hint');
  controls[1][1].wrap.append(count);
  text.addEventListener('input',()=>{count.textContent=(text.value.match(/[\p{L}\p{N}]/gu)?.length??0)+' 字（不計標點及空格）';});
 }
 const send=node('button','傳送答案','primary');send.type='submit';
 const copy=node('button','複製答案（備用）','secondary');copy.type='button';
 const status=node('p','','hint');status.setAttribute('role','status');
 const result=node('textarea');result.hidden=true;result.readOnly=true;result.rows=8;
 result.setAttribute('aria-label','可手動複製的答案');
 form.append(send,copy,status,result);
 let submitted=false;
 let pending=false;
 let draftId;
 const fields=()=>controls.slice(lesson.group?1:0).map(([,field])=>field.el.value.trim());
 async function getSession(){
  const query=new URLSearchParams({activity:route});
  if(sessionId)query.set('session',sessionId);
  return workshopRequest('session?'+query);
 }
 function updateGroups(session){
  if(!lesson.group||session.teams===controls[0][1].el.options.length-1)return;
  const group=controls[0][1].el;
  const saved=group.value;
  const previousIndex=group.selectedIndex;
  group.replaceChildren(new Option('請選擇',''),...Array.from({length:session.teams},(_,i)=>new Option(relayGroupLabel(i+1,session.teams),String(i+1))));
  group.selectedIndex=saved&&previousIndex<=session.teams?previousIndex:0;
 }
 const initial=getSession().then(session=>{
  if(session.id)updateGroups(session);
  if(!pending&&!submitted&&(!session.id||!session.open))status.textContent='目前暫停收答。';
 }).catch(()=>{
  if(!pending&&!submitted)status.textContent='暫時未能連到收答服務。可重試傳送，或先複製答案。';
 });
 form.addEventListener('submit',async event=>{
  event.preventDefault();
  if(pending||submitted)return;
  pending=true;
  send.disabled=true;
  status.textContent='傳送中…';
  try{
   await initial;
   const session=await getSession();
   if(!session.id||!session.open)throw Error('目前暫停收答。');
   const group=lesson.group?Number(controls[0][1].el.selectedIndex):undefined;
   if(lesson.group&&(group<1||group>session.teams)){
    updateGroups(session);
    throw Error('請選擇本組，再傳送答案。');
   }
   const payload={session:session.id,activity:route,fields:fields()};
   if(lesson.group)payload.group=group;
   else{
    const key='workshop.answer.v1.'+session.id+'.'+route;
    if(!draftId){
     try{
      draftId=localStorage.getItem(key)||crypto.randomUUID();
      localStorage.setItem(key,draftId);
     }catch{draftId=crypto.randomUUID();}
    }
    payload.submission=draftId;
   }
   const receipt=await workshopRequest('answer',payload);
   if(!receipt.received)throw Error('未收到收件確認，請重試。');
   submitted=true;
   status.textContent=receipt.already?'已經交答，系統保留第一份答案。':'已傳送，導師已收到答案。';
  }catch(error){status.textContent=error.message;}
  finally{pending=false;send.disabled=submitted;}
 });
 copy.addEventListener('click',async()=>{
  const answer=[lesson.title,...controls.map(([label,field])=>label+'：'+(label==='組別'?field.el.selectedOptions[0]?.text??'':field.el.value.trim()))].join('\n');
  result.value=answer;
  try{
   await navigator.clipboard.writeText(answer);
   status.textContent='已複製。請貼到導師指定嘅收集渠道。';
  }catch{
   result.hidden=false;result.select();
   status.textContent='請長按或用快捷鍵複製下方答案。';
  }
 });
 main.append(form);
}

async function workshopRequest(path,payload){
 let response;
 try{
  response=await fetch(workshopAPI+path,{
   method:payload?'POST':'GET',
   headers:payload?{'content-type':'application/json'}:{},
   body:payload?JSON.stringify(payload):undefined,
   credentials:'omit',
   cache:'no-store',
   signal:AbortSignal.timeout(8000)
  });
 }catch{throw Error('未能連到收答服務。請重試，或複製答案交畀導師。');}
 const data=await response.json().catch(()=>null);
 if(!response.ok||!data)throw Error(data?.error||'未收到收件確認，請重試。');
 return data;
}
