const base='/classroom';
const pagesPortal=!!document.querySelector('meta[name="workshop-portal"]');
const hostedBase='https://news-writing-workshop-1116.ronlam1981.chatgpt.site';
const sitePortal=pagesPortal&&location.origin===hostedBase;
const portalHome=sitePortal?'/learn':'./';
const pagesHome='https://ronlam1981.github.io/media-training-classroom/';
const portalLinks=[
 ['','主頁'],['ice','四組破冰'],['angle','揀角度'],['relay','傳話'],
 ['writing','標題與導語'],['summary','100 字濃縮'],['caption','選圖與圖片說明'],
 ['response','首份回應'],['interview','四組專訪'],['team','綜合實戰'],
 ['crisis','突發回應'],['application','個人應用']
];
const params=new URLSearchParams(location.search);
const route=pagesPortal?(params.get('activity')||''):(location.pathname.split('/').filter(Boolean)[1]??'');
const teacher=route==='teacher';
if(teacher)document.title='傳媒協作力提升｜導師版';
const activeId=Object.hasOwn(activities,route)?route:'';
const main=document.getElementById('main');
const nav=document.getElementById('class-nav');
const sessionLabel=document.getElementById('session-label');
const teacherKey='workshop-teacher';
let pinnedSession=params.get('session')||'';
let legacyCode=params.get('code')||'';
function studentHref(path){
 if(!pinnedSession&&!legacyCode)return path;
 return path+'?'+new URLSearchParams(pinnedSession?{session:pinnedSession}:{code:legacyCode});
}
function courseHref(id=''){
 if(!pagesPortal)return studentHref(base+(id?'/'+id:''));
 const query=new URLSearchParams();
 if(id&&id!=='ice')query.set('activity',id);
 if(pinnedSession)query.set('session',pinnedSession);
 if(legacyCode)query.set('code',legacyCode);
 return (id==='ice'?'./icebreaker.html':portalHome)+(query.size?'?'+query:'');
}
function currentClass(){
 return 'session?'+new URLSearchParams({
  activity:activeId,
  ...(pinnedSession?{session:pinnedSession}:legacyCode?{code:legacyCode}:{})
 });
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
function statusLine(){
 const el=node('p','','status');el.setAttribute('role','status');return el;
}
function setStatus(el,text,error=false){
 el.textContent=text;el.dataset.kind=error?'error':'info';
}
function formButton(text){
 const el=node('button',text,'primary');el.type='submit';return el;
}
async function api(role,path,key,payload){
 const res=await fetch((pagesPortal?hostedBase:'')+'/api/classroom/'+role+'/'+path,{
  method:payload===undefined?'GET':'POST',
  headers:{...(key?{authorization:'Bearer '+key}:{}),...(payload===undefined?{}:{'content-type':'application/json'})},
  body:payload===undefined?undefined:JSON.stringify(payload),
  cache:'no-store'
 });
 const data=await res.json();
 if(!res.ok)throw new Error(data.error||'暫時未能連線。');
 return data;
}
function title(value,subtitle){
 const intro=node('section','','intro');
 intro.append(node('h1',value),node('p',subtitle,'dek'));
 return intro;
}
function briefing(heading,value){
 const el=node('section','','brief');el.append(node('h2',heading),node('p',value));return el;
}
function makeNav(){
 nav.replaceChildren();
 if(pagesPortal){
  for(const [id,label] of portalLinks){
   const a=link(label,courseHref(id));
   if(id===route)a.setAttribute('aria-current','page');
   nav.append(a);
  }
  return;
 }
 const links=[['主頁',base],...Object.entries(activities).map(([id,a])=>[a.title,base+'/'+id])];
 if(teacher)links.push(['導師控制台',base+'/teacher']);
 for(const [label,href] of links){
  const a=link(label,teacher?href:studentHref(href));
  if(location.pathname.replace(/\/$/,'')===href)a.setAttribute('aria-current','page');
  nav.append(a);
 }
}
makeNav();

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
   const src='./caption-all-'+choice.toLowerCase()+'.jpg';
   image.src=src;image.alt='原稿圖片 '+choice;image.loading='lazy';image.width=1024;image.height=768;
   const zoom=link('',src);zoom.target='_blank';zoom.rel='noopener noreferrer';
   zoom.setAttribute('aria-label','放大圖片 '+choice);zoom.append(image);
   figure.append(zoom,node('figcaption','圖片 '+choice));grid.append(figure);
  }
  main.append(grid);
 }
}
async function renderStudent(){
 if(pagesPortal&&Object.hasOwn(oral,route)){
  const [heading,context,steps,review]=oral[route];
  main.append(title(heading,context),briefing('現場做法',steps),briefing('分享與點評',review));
  return;
 }

 const a=activities[activeId];
 main.classList.add('student');
 const intro=title(a?a.title:'傳媒協作力提升',a?'第 '+a.page+' 頁｜'+a.task:'學員互動網站');
 if(pagesPortal&&!a)intro.classList.add('portal-intro');
 main.append(intro);
 main.querySelector('[data-classroom-loading]')?.remove();
 if(a){
  main.append(briefing('題目背景',a.context));
  if(activeId==='relay'){
   const debrief=node('details','','brief');
   debrief.append(node('summary','傳話後討論｜由中心發出，到居民收到'),
    briefing('原始資訊','先核對事實、受影響對象同安排。'),
    briefing('媒體呈現','先交代讀者最需要知道嘅變化，再補原因、影響範圍同核實聯絡人。'),
    briefing('受眾接收','中心按對象直接通知，講清楚居民下一步要點做。'));
   main.append(briefing('傳話規則',relay.pass.join(' ')),debrief);
  }
  extraMaterials(activeId);
  if(['crisis','application'].includes(activeId))main.append(briefing('作答要求',a.task));
  if(activeId==='summary'){const source=node('section');main.append(source);void materials(source);}
  if(activeId==='caption'){
   const source=node('p','','intro');
   const original=link('主辦機構原稿及照片 ↗',captionOriginal);
   original.target='_blank';original.rel='noopener noreferrer';
   source.append(original);main.append(source);
  }
 }else if(pagesPortal){
  const list=node('section','','portal-grid');
  for(const [id,label] of portalLinks.slice(1)){
   const item=link('',courseHref(id),'class-card');
   item.append(node('small',activities[id]?(activities[id].group?'小組交答':'個人交答'):'現場討論'),node('strong',label),node('p',activities[id]?.task??oral[id]?.[1]??'四組各讀一張照片和短稿，討論讀者、證據和新聞價值。','hint'));
   list.append(item);
  }
  main.append(list);
 }else{
  const list=node('section','','sheet');
  list.append(node('h2','活動清單'));
  for(const [id,act] of Object.entries(activities)){
   const item=link('',studentHref(base+'/'+id),'class-card');
   item.append(node('strong','第 '+act.page+' 頁　'+act.title),node('p',act.task,'hint'));list.append(item);
  }
  const extras=node('section','','brief');
  extras.append(node('h2','現場口頭活動'),node('p','組內舉手、鄰座快談、四組受訪。'));
  const p=node('p');p.append(link('四組破冰閱讀材料 ↗',studentHref('/icebreaker.html')),'　',link('揀新聞角度 ↗','/learn?activity=angle'),'　',link('四組受訪 ↗','/learn?activity=interview'));extras.append(p);
  main.append(extras,list);
 }
 const panel=node('div','','class-section');main.append(panel);
 const status=statusLine();
 panel.append(status);
 if(!a){
  const teacherLink=node('p','','class-section hint');
  teacherLink.append(link('導師控制台 ↗',(pagesPortal?hostedBase:'')+base+'/teacher'));
  main.append(teacherLink);
 }
 let session;
 try {
  session=await api('student',currentClass());
  if(legacyCode&&session.id){
   legacyCode='';
   pinnedSession=session.id;
   const canonical=new URL(location.href);canonical.searchParams.delete('code');canonical.searchParams.set('session',pinnedSession);history.replaceState(null,'',canonical.href);
   for(const a of document.querySelectorAll('a[href*="?code="]')){
    const href=new URL(a.href);
    if(href.origin===location.origin){href.searchParams.delete('code');href.searchParams.set('session',pinnedSession);a.href=href.href;}
   }
  }
  sessionLabel.textContent=session.id?session.date+'　'+session.label:'';
 }catch(err){setStatus(status,err.message,true);panel.append(link('返回學員主頁',courseHref()));return;}
 if(!a){
  const current=session.active&&activities[session.active];
  panel.prepend(current?link('前往練習：'+current.title,courseHref(session.active)):node('p',session.id?'請從頁眉選擇練習。':'未有課堂場次。請向導師索取場次連結。','subtle'));
  return;
 }
 const fieldSpecs=activeId==='relay'?a.fields.slice(1):a.fields;
 const fieldControls=fieldSpecs.map(([label,spec])=>input(label,Array.isArray(spec)?{choices:spec,required:true}:{max:spec,multi:spec>=150,required:true}));
 const group=a.group?input('組別',{choices:[],required:true}):null;
 const form=node('form','','sheet stack');const submit=formButton(a.group?'提交小組答案':'匿名提交');
 form.append(node('h2',a.group?'每組交一份':'交一份練習'),node('p',a.group?'請選擇本組。答案可供本堂點評，請勿填寫姓名、聯絡方式或可辨認個案的資料。':'直接提交即可。答案可供本堂點評，請勿填寫姓名、聯絡方式或可辨認個案的資料。','hint'));
 if(group)form.append(group.wrap);
 for(const f of fieldControls)form.append(f.wrap);
 if(activeId==='summary'){
  const text=fieldControls[1].el;
  const count=node('p','0 字（不計標點及空格）','hint');
  const updateCount=()=>{count.textContent=(text.value.match(/[\p{L}\p{N}]/gu)?.length??0)+' 字（不計標點及空格）';};
  fieldControls[1].wrap.append(count);text.addEventListener('input',updateCount);
  form.addEventListener('reset',()=>queueMicrotask(updateCount));
 }
 form.append(submit);
 const collected=statusLine();
 panel.prepend(collected,form);
 form.append(status);
 let done=false, formSession=session.id, formRound=session.round??0, busy=false, groupCount=null;
 const fallbackIds=new Map();
 function submissionId(){
  const key='workshop.answer.v1.'+formSession+'.'+activeId;
  if(fallbackIds.has(key))return fallbackIds.get(key);
  let id;
  try{
   id=localStorage.getItem(key);
   if(!id){id=crypto.randomUUID();localStorage.setItem(key,id);}
  }catch{id=crypto.randomUUID();}
  fallbackIds.set(key,id);
  return id;
 }
 function updateSession(data){
  const round=data.round??0;
  if(data.id===formSession&&round<formRound)return;
  if(!busy&&(formSession!==data.id||formRound!==round)){
   const advanced=formSession===data.id;
   formSession=data.id;formRound=round;done=false;
   if(!advanced)form.reset();
   setStatus(status,advanced?'導師已重設本題，可以重新交答。':'');
  }
  if(group&&groupCount!==data.teams){
   const choice=group.el.value;
   groupCount=data.teams;
   group.el.replaceChildren(new Option('請選擇',''),...Array.from({length:groupCount??0},(_,i)=>new Option(relayGroupLabel(i+1,groupCount),String(i+1))));
   if(Number(choice)<=groupCount)group.el.value=choice;
  }
  sessionLabel.textContent=data.id?data.date+'　'+data.label:'';
  submit.disabled=busy||done||!data.open;
  if(!data.id){setStatus(collected,'未有課堂場次。請向導師索取場次連結。');return;}
  const tally='已收 '+data.count+(data.target===null?'':' / '+data.target)+' 份';
  setStatus(collected,(data.open?'收答中':'此題已截止')+'　'+tally);
 }
 updateSession(session);
 const refresh=setInterval(async()=>{
  if(document.hidden)return;
  try{updateSession(await api('student',currentClass()));}catch{}
 },5000);
 window.addEventListener('pagehide',()=>clearInterval(refresh),{once:true});
 form.onsubmit=async e=>{
  e.preventDefault();if(!formSession||busy||done)return;
  busy=true;submit.disabled=true;
  try {
   const result=await api('student','answer',null,{session:formSession,round:formRound,activity:activeId,...(group?{group:Number(group.el.value)}:{submission:submissionId()}),fields:fieldControls.map(x=>x.el.value)});
   done=true;
   const label=group?relayGroupLabel(Number(group.el.value),groupCount):'';
   setStatus(status,group?(result.already?label+'已交過，保留第一份答案。':'已收到'+label+'的答案。'):(result.already?'已交過，保留第一份答案。':'已收到你的匿名答案。'));
   form.reset();
  }catch(err){submit.disabled=false;setStatus(status,err.message,true);}
  finally{busy=false;}
 };
}

async function renderTeacher(){
 main.replaceChildren(title('傳媒協作力提升','導師版｜活動內容、收件狀況及計時'));
 const login=node('form','','sheet stack access');
 const keyField=input('導師密碼',{type:'password',required:true});
 keyField.el.autocomplete='current-password';
 keyField.el.inputMode='numeric';
 login.append(node('p','已設定八位數字密碼的導師可直接輸入。首次設定請先用原有密碼登入。','hint'));
 const loginStatus=statusLine();
 login.append(keyField.wrap,formButton('開啟控制台'),loginStatus);
 main.append(login);
 let key=sessionStorage.getItem(teacherKey)||'';
 login.onsubmit=async e=>{
  e.preventDefault();key=keyField.el.value.trim();await unlock();
 };
 async function unlock(){
  try{
   const {sessions,pinSet}=await api('teacher','sessions',key);
   sessionStorage.setItem(teacherKey,key);
   login.remove();
   teacherPanel(key,sessions,pinSet);
  }catch(err){sessionStorage.removeItem(teacherKey);setStatus(loginStatus,err.message,true);}
 }
 if(key)await unlock();
}

function teacherPanel(key,sessions,pinSet){
 const controls=node('section','','sheet stack');
 const selector=input('選擇日期及場次',{choices:[]});
 const exercise=input('選擇練習',{choices:[]});
 for(const [id,a] of Object.entries(activities))exercise.el.append(new Option('P'+a.page+' '+a.title,id));
 const requestedActivity=params.get('activity');
 exercise.el.value=Object.hasOwn(activities,requestedActivity)?requestedActivity:'writing';
 const pickers=node('div','','review-controls');pickers.append(selector.wrap,exercise.wrap);
 const tally=node('p','請選擇場次。','status');
 const exerciseBrief=node('section','','brief');
 const timerFrame=node('iframe','','teacher-timer-frame');
 timerFrame.title='活動計時';
 const message=statusLine();
 const share=node('p','','class-output');
 const toggle=button('開放本題',()=>void changeState(),true);
 const copyLink=button('複製學員場次連結',()=>void copyShare());
 const refresh=button('更新收件',()=>void loadReview());
 const draw=button('隨機抽一份',()=>void drawOne(),true);
 const timerLink=link('開啟活動計時 ↗','/timer');timerLink.target='_blank';timerLink.rel='noopener';
 const actions=node('div','','class-actions');actions.append(toggle,copyLink,refresh,draw,timerLink);
 const testLink=link('以學員身份試交 ↗','');testLink.target='_blank';testLink.rel='noopener';
 const startTest=button('開啟測試場次',()=>void openTest());
 const resetDraw=button('重設抽答',()=>void resetScope('draw'));
 const resetAnswers=button('清除本題答案',()=>void resetScope('answers'));
 const testTools=node('details','','brief stack');
 testTools.append(node('summary','測試及重設'),node('p','在測試場次試交，正式收件數不會改變。重設抽答會保留答案，並讓已抽答案可再抽。','hint'));
 const testActions=node('div','','class-actions');
 testActions.append(startTest,testLink,resetDraw,resetAnswers);testTools.append(testActions);
 const choice=input('抽答分類',{choices:[]});
 const comparison=node('section','','sheet stack class-section');
 const preview=node('section','','sheet stack class-section');
 const history=node('details','','sheet class-section');
 history.append(node('summary','查看本題答案'));
 const historyList=node('div','','stack');history.append(historyList);
 const archivePanel=node('details','','sheet class-section');
 archivePanel.append(node('summary','日後課堂示例庫'));
 const archiveList=node('div','','stack');archivePanel.append(archiveList);
 archivePanel.ontoggle=()=>{if(archivePanel.open)void loadExamples();};
 controls.append(pickers,exerciseBrief,tally,share,choice.wrap,actions,testTools,message,timerFrame);
 const create=node('details','','sheet class-section');
 create.append(node('summary','建立新場次'));
 const form=node('form','','stack');
 const date=input('課程日期',{type:'date',required:true});
 const label=input('場次名稱',{required:true,max:70});
 const learners=input('預計學員數',{type:'number',required:true,value:'20'});
 const teams=input('組數',{type:'number',required:true,value:'4'});
 learners.el.min=1;learners.el.max=80;teams.el.min=1;teams.el.max=20;
 const createStatus=statusLine();
 const createButton=formButton('建立場次');
 form.append(date.wrap,label.wrap,learners.wrap,teams.wrap,createButton,createStatus);create.append(form);
 const top=node('div','','class-actions');
 top.append(link('全課程活動計時 ↗','/timer?slide=2'),link('舊標題導語答案 ↗','/legacy/teacher'),link('舊濃縮答案 ↗','/summary/teacher'),button('登出導師控制台',()=>{sessionStorage.removeItem(teacherKey);location.reload();}));
 const pinSettings=node('details','','sheet class-section');
 pinSettings.append(node('summary',pinSet?'更改八位數字密碼':'設定八位數字密碼'));
 const pinForm=node('form','','stack');
 const pin=input('新密碼（八位數字）',{type:'password',max:8,required:true});
 const repeat=input('再次輸入新密碼',{type:'password',max:8,required:true});
 for(const field of [pin,repeat]){
  field.el.pattern='[0-9]{8}';field.el.inputMode='numeric';field.el.autocomplete='new-password';
 }
 const savePin=formButton('儲存新密碼');
 const pinStatus=statusLine();
 pinForm.append(node('p','可用 0 開頭，請避免生日及連續數字。儲存後請使用新密碼登入。','hint'),pin.wrap,repeat.wrap,savePin,pinStatus);
 pinSettings.append(pinForm);
 pinForm.onsubmit=async event=>{
  event.preventDefault();
  if(pin.el.value!==repeat.el.value){setStatus(pinStatus,'兩次輸入的密碼不同。',true);return;}
  savePin.disabled=true;
  const next=pin.el.value;
  try{
   await api('teacher','pin',key,{pin:next});
   sessionStorage.setItem(teacherKey,next);
   location.reload();
  }catch(err){setStatus(pinStatus,err.message,true);savePin.disabled=false;}
 };
 main.append(top,controls,comparison,preview,history,create,pinSettings,archivePanel);
 let selected=null, selectedActivity='writing', review=null, requestScope=0;
 function options(id){
  selector.el.replaceChildren(new Option('請選擇',''),...sessions.map(s=>new Option(s.date+'　'+s.label,s.id)));
  selector.el.value=id;
 }
 options(sessions.find(s=>s.id===sessionStorage.getItem('workshop.teacher.session'))?.id??sessions[0]?.id??'');
 const req=(action,payload)=>api('teacher',action,key,payload);
 const scope=()=>({session:selected.id,activity:selectedActivity});
 const query=()=>'?'+new URLSearchParams(scope());
 let resetting=false;
 async function openTest(){
  startTest.disabled=true;
  try{
   const {session}=await req('testsession',{});
   if(!sessions.some(s=>s.id===session.id))sessions.push(session);
   options(session.id);switchScope();setStatus(message,'已切換至測試場次。可按「以學員身份試交」。');
  }catch(err){setStatus(message,err.message,true);}
  finally{startTest.disabled=false;}
 }
 async function resetScope(mode){
  if(!selected||!review||resetting)return;
  const at=requestScope;
  let confirm;
  if(mode==='answers'&&!selected.is_test){
   confirm=window.prompt('將永久清除「'+selected.label+'」的「'+activities[selectedActivity].title+'」全部答案。請輸入「重設」確認。');
   if(confirm!=='重設')return;
  }
  resetting=true;updateControls();
  try{
   const result=await req('reset',{...scope(),mode,confirm,round:review.round});
   if(at===requestScope){
    preview.replaceChildren();
    setStatus(message,mode==='draw'?'抽答記錄已重設，答案已保留。':'已清除本題 '+result.deleted+' 份答案。');
    await loadReview();
   }
  }catch(err){if(at===requestScope)setStatus(message,err.message,true);}
  finally{resetting=false;updateControls();}
 }
 const shareURL=()=>new URL('?session='+selected.id,location.origin+'/classroom/'+selectedActivity).href;
 let syncRelayAnswers=null;
 function updateControls(){
  for(const b of [toggle,copyLink,refresh,draw])b.disabled=!selected;
  toggle.disabled=!selected||!review||resetting;
  draw.disabled=!selected||resetting;
  testLink.hidden=!selected?.is_test;
  if(selected?.is_test)testLink.href=shareURL();
  resetDraw.hidden=selectedActivity==='relay';
  resetDraw.disabled=resetting||!review?.answers.some(a=>a.drawn);
  resetAnswers.disabled=resetting||!review?.answers.length;
  resetAnswers.textContent=selected?.is_test?'清除本題測試答案':'清除本題正式答案';
  draw.hidden=selectedActivity==='relay';
  timerLink.href='/timer?activity='+encodeURIComponent(selectedActivity);
  toggle.textContent=review?.open?'截止本題':'開放本題';
  if(selected){
   share.replaceChildren(node('span','場次連結　'),link(shareURL(),shareURL()));
   const count=review?.answers.length??0;
   const target=review?.target;
   const drawn=review?.answers.filter(a=>a.drawn).length??0;
   tally.textContent=review?(review.open?'收答中':'暫停收答')+'　已收 '+count+(target===null?'':' / '+target)+' 份'+(selectedActivity==='relay'?'':'　已抽 '+drawn+' 份'): '正在讀取收件數';
  }else{share.replaceChildren();tally.textContent='請選擇或建立場次。';}
 }
 function switchScope(){
  requestScope++;
  selected=sessions.find(s=>s.id===selector.el.value)??null;
  selectedActivity=exercise.el.value;
  if(selected)sessionStorage.setItem('workshop.teacher.session',selected.id);
  const selectedPlan=activities[selectedActivity];
  exerciseBrief.replaceChildren(node('h2',selectedPlan.title),node('p',selectedPlan.context),node('p',selectedPlan.task));
  timerFrame.src='/timer?'+new URLSearchParams({activity:selectedActivity,embed:'1'});
  const groups=selectedPlan.fields[0][1];
  choice.wrap.hidden=selectedActivity==='relay'||!Array.isArray(groups);
  choice.el.replaceChildren(new Option('全部合資格答案',''),...(Array.isArray(groups)?groups.map(g=>new Option(g,g)):[]));
  review=null;
  historyList.replaceChildren();preview.replaceChildren();
  comparison.hidden=!selected||selectedActivity!=='relay';
  syncRelayAnswers=comparison.hidden?null:relayReview(selected.id,selected.teams,()=>review,()=>req('relaytopics'),comparison,{node,input,button,link,briefing,statusLine,setStatus});
  if(comparison.hidden)comparison.replaceChildren();
  setStatus(message,'');updateControls();
  if(selected)void loadReview();
 }
 selector.el.onchange=exercise.el.onchange=switchScope;
 form.onsubmit=async e=>{
  e.preventDefault();createButton.disabled=true;
  try{
   const {session}=await req('sessions',{date:date.el.value,label:label.el.value,learners:Number(learners.el.value),teams:Number(teams.el.value)});
   sessions.unshift(session);sessions.sort((a,b)=>b.date.localeCompare(a.date)||a.label.localeCompare(b.label));
   options(session.id);switchScope();setStatus(createStatus,'場次已建立。');create.open=false;
  }catch(err){setStatus(createStatus,err.message,true);}
  finally{createButton.disabled=false;}
 };
 async function copyShare(){
  try{await navigator.clipboard.writeText(shareURL());setStatus(message,'場次連結已複製。');}
  catch{setStatus(message,'請從上方複製場次連結。');}
 }
 async function changeState(){
  const at=requestScope;
  toggle.disabled=true;
  try{
   await req('active',{...scope(),open:!review?.open});
   if(at===requestScope)await loadReview();
  }catch(err){if(at===requestScope)setStatus(message,err.message,true);}
  finally{if(at===requestScope)toggle.disabled=false;}
 }
 async function loadReview(){
  const at=requestScope;
  if(!selected)return;
  try{
   const data=await req('review'+query());
   if(at!==requestScope)return;
   review=data;updateControls();syncRelayAnswers?.(data.answers);
   const classified=Array.isArray(activities[selectedActivity].fields[0][1]);
   historyList.replaceChildren(...review.answers.map((a,i)=>button((a.group?relayGroupLabel(a.group,selected.teams):'匿名答案 '+(i+1))+(classified&&selectedActivity!=='relay'?'　'+a.fields[0]:'')+(a.drawn?'　已抽':'')+(a.show?'':'　只供導師看'),()=>showAnswer(a))));
   if(!review.answers.length)historyList.append(node('p','暫時未有答案。','hint'));
  }catch(err){if(at===requestScope)setStatus(message,err.message,true);}
 }
 async function drawOne(){
  const at=requestScope;
  draw.disabled=true;
  try{
   const {answer}=await req('draw',{...scope(),draw:crypto.randomUUID(),choice:choice.el.value});
   if(at!==requestScope)return;
   if(answer){showAnswer(answer);setStatus(message,'已抽出一份，可先預覽再投影。');}
   else setStatus(message,choice.el.value?'此分類暫無未抽、可展示的答案。':'這題暫無未抽、可展示的答案。');
   await loadReview();
  }catch(err){if(at===requestScope)setStatus(message,err.message,true);}
  finally{if(at===requestScope)draw.disabled=false;}
 }
 function contentBlock(activity,fields){
  const output=node('div','','stack');
  fields.forEach((value,i)=>{
   const item=node('div');
   item.append(node('h2',activities[activity].fields[i][0]),node('p',value,'class-output'));output.append(item);
  });
  return output;
 }
 function project(activity,fields,group=null){
  const win=window.open('about:blank','classroom-projection');
  if(!win){setStatus(message,'瀏覽器未開啟投影視窗，請允許彈出視窗。',true);return;}
  const doc=win.document;doc.title='課堂點評';
  const styles=doc.createElement('link');styles.rel='stylesheet';styles.href=location.origin+'/app.css';
  const classStyles=doc.createElement('link');classStyles.rel='stylesheet';classStyles.href=location.origin+'/classroom.css';
  doc.head.replaceChildren(styles,classStyles);
  const body=node('main','','wrap stack project-content');
  body.append(node('h1',activities[activity].title));
  if(group&&activity!=='relay')body.append(node('p',relayGroupLabel(group,selected.teams)));
  const output=contentBlock(activity,fields);
  if(activity==='summary'||activity==='caption'){
   const comparison=node('div','','review-grid');
   const source=node('section');
   comparison.append(source,output);body.append(comparison);
   const index=activities[activity].fields[0][1].indexOf(fields[0]);
   if(activity==='summary')materials(source,fields[0]);
   if(activity==='caption'){
    const old={'A 合照':'a','B 操作區交流':'b','C 課室講解':'c'};
    const suffix=index>=0?'all-'+fields[0].toLowerCase():old[fields[0]];
    if(suffix){
     const image=node('img','','review-photo');
     image.src=location.origin+'/caption-'+suffix+'.jpg';
     image.alt='原稿圖片 '+fields[0];
     source.append(image,node('p','圖片來源：聖公會澳門社會服務處新聞稿','hint'));
    }

   }
  }else body.append(output);
  body.append(briefing('點評',activities[activity].rubric));
  doc.body.replaceChildren(body);
  win.focus();
 }
 function showAnswer(answer){
  const context=scope();
  const a=activities[context.activity];
  const fields=a.fields.map(([label],i)=>input(label,{multi:true,max:600,value:answer.fields[i]}));
  if(context.activity==='relay')fields[0].el.readOnly=true;
  const edited=()=>fields.map(x=>x.el.value.trim());
  preview.replaceChildren(node('h2',answer.group?relayGroupLabel(answer.group,selected.teams)+'答案預覽':'匿名答案預覽'),
   briefing('點評對照',a.rubric),node('p','投影前可刪去姓名或可辨認資料。此處的編輯只用於投影。','hint'),...fields.map(x=>x.wrap));
  if(answer.show)preview.append(button('投影此份',()=>project(context.activity,edited(),answer.group),true));
  else preview.append(node('p','這份答案只供導師閱覽。','hint'));
 }
 async function loadExamples(){
  try{
   const {examples}=await req('examples');
   archiveList.replaceChildren(node('p','示例按題型保存，供日後課堂調用。','hint'));
   for(const ex of examples){
    const box=node('details','','brief');
    box.append(node('summary',activities[ex.activity].title),contentBlock(ex.activity,ex.fields));
    if(ex.note)box.append(node('p',ex.note,'class-output'));
    box.append(button('投影示例',()=>project(ex.activity,ex.fields)));
    archiveList.append(box);
   }
   if(!examples.length)archiveList.append(node('p','暫未保存示例。'));
  }catch(err){archiveList.replaceChildren(node('p',err.message,'status'));}
 }
 switchScope();
 const timer=setInterval(()=>{if(!document.hidden)void loadReview();},5000);
 window.addEventListener('pagehide',()=>clearInterval(timer),{once:true});
}
if(teacher)void renderTeacher();else void renderStudent();
