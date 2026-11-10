const base='/classroom';
const pagesPortal=!!document.querySelector('meta[name="workshop-portal"]');
const hostedBase='https://news-writing-workshop-1116.ronlam1981.chatgpt.site';
const sitePortal=pagesPortal&&location.origin===hostedBase;
const portalHome=sitePortal?'/learn':'./';
const pagesHome='https://ronlam1981.github.io/media-training-classroom/';
const portalLinks=[
 ['','主頁'],['ice','四組破冰'],['angle','揀角度'],['relay','傳話'],
 ['writing','標題與導語'],['summary','100 字濃縮'],['caption','選圖與圖說'],
 ['response','首份回應'],['interview','四組專訪'],['team','綜合實戰'],
 ['crisis','突發回應'],['application','個人應用']
];
const params=new URLSearchParams(location.search);
const route=pagesPortal?(params.get('activity')||''):(location.pathname.split('/').filter(Boolean)[1]??'');
const teacher=route==='teacher';
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
function checkbox(text,initial){
 const label=node('label');const el=node('input');el.type='checkbox';el.checked=initial;
 label.append(el,' '+text);return {label,el};
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

async function materials(box,selected){
 try{
  const html=await (await fetch(pagesPortal&&!sitePortal?'./summary-materials.html':'/summary-materials')).text();
  const doc=new DOMParser().parseFromString(html,'text/html');
  for(const article of doc.querySelectorAll('article')){
   if(selected&&article.dataset.material!==selected)continue;
   const details=node('details','','brief');
   if(selected)details.open=true;
   details.append(node('summary',article.querySelector('h2').textContent));
   for(const p of article.querySelectorAll('p')){
    const copy=node('p');
    const a=p.querySelector('a');
    if(a)copy.append(link(a.textContent,a.href));
    else copy.textContent=p.textContent;
    details.append(copy);
   }
   box.append(details);
  }
 }catch{box.append(node('p','暫時未能載入底稿。請參考第 46 頁。'));}
}
const oral={
 angle:['揀一個值得報道的角度','16 名中學生參加半日職涯探索，聽服務業介紹，再分組練接待及模擬查詢。','找身旁一人，一人代入家長，一人代入一般讀者。讀題 30 秒，各用 1 分鐘說明角度及理由，最後 30 秒揀一個角度，並提出一項寫稿前要確認的資料。','例如題目未說明中心會否再辦同類活動，可向主辦方查問。'],
 relay:['一則通告，傳到最後變成咩？','A、B 兩組各 5 至 7 人，人數相同。導師會把原文卡反面交給各組第一位。','90 秒傳話。頭 15 秒只有第一位可看自己組的卡。反卡後逐位細聲傳下去。每人只聽一次、只講一次。','最後一位有 60 秒寫低收到的訊息。導師讀完兩份答卷才揭曉原文。其餘學員旁觀，保持安靜。'],
 interview:['四組模擬專訪','虛構｜家庭支援站向長者照顧者提供初步諮詢、資源資訊及轉介。收費、輪候及即日安排尚未核實。','4 分鐘準備一句核心訊息及一項待核資料。導師扮記者，A 至 D 組每組受訪 4 分鐘。其後全班用 4 分鐘比較答法。','先回答問題，補已核實事實，再說下一步。代表先答，組員可補充。']
};
const teamCards=[
 ['A 組｜青年咖啡研學','8 名本澳青少年到江門參訪咖啡企業及博物館。用青年學習角度寫標題及圖說。追問：如何核實長期職涯成效？'],
 ['B 組｜童行拾星','計劃支援兒童及青少年的情緒健康與特殊學習需要。交代籌款用途及可公開素材。追問：可否安排受助兒童及家長受訪？'],
 ['C 組｜琴澳兒童健康生活活動','49 名 5 至 8 歲澳門兒童參與培訓。從家長角度寫標題及圖說。追問：怎樣知道孩子真的掌握方法？'],
 ['D 組｜沉默的籌碼','沉浸式體驗呈現受賭博問題影響的家人處境。找家庭支援角度。追問：家人受訪前要怎樣保障意願及私隱？']
];
const crisisCards=[
 ['A 組｜活動名額','24 個名額，收到 41 份申請。家長質疑先到先得與取錄安排不符。'],
 ['B 組｜兒童受訪','記者要求當日下午訪問及拍攝正面。兒童及家庭意願、授權範圍待核。'],
 ['C 組｜活動安全','網傳約 12 秒片段見孩子跌倒。事發經過及身體情況待核。'],
 ['D 組｜服務聯絡','家屬稱昨晚致電兩次未接。值班、通話紀錄及個案需要待核。']
];
function extraMaterials(id){
 if(id==='team'||id==='crisis'){
  const panel=node('section','','stack class-section');
  for(const [heading,text] of (id==='team'?teamCards:crisisCards)){
   const card=node('details','','brief');
   card.append(node('summary',heading),node('p',text));panel.append(card);
  }
  main.append(panel);
 }
 if(id==='caption'){
  const grid=node('div','','portal-photos');
  activities.caption.fields[0][1].forEach((label,i)=>{
   const figure=node('figure'),image=node('img');
   image.src='./caption-'+['a','b','c'][i]+'.jpg';image.alt=label;
   figure.append(image,node('figcaption',label));grid.append(figure);
  });
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
 const intro=title(a?a.title:'傳媒協作力提升',a?'第 '+a.page+' 頁｜'+a.task:'學員互動網站。用頁眉切換環節，跟導師指示閱讀、討論或匿名交答。');
 if(pagesPortal&&!a)intro.classList.add('portal-intro');
 main.append(intro);
 if(a){
  main.append(briefing('題目背景',a.context));
  if(pagesPortal)extraMaterials(activeId);
  if(activeId==='summary'){const source=node('section');main.append(source);void materials(source);}
  if(activeId==='caption'){
   const official='https://skhssco.org.mo/news/深耕青年技能培育：聖公會氹仔青年服務隊帶領青/';
   const source=node('p','','intro');source.append(link('主辦機構原稿及照片 ↗',official));main.append(source);
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
  const p=node('p');p.append(link('破冰四組閱讀材料 ↗',pagesHome+'icebreaker.html'),'　',link('四組受訪倒數 ↗','/interview'));extras.append(p);
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
  panel.prepend(current?link('正在收答：'+current.title,courseHref(session.active)):node('p','目前未開放收答。你可以先從頁眉打開練習。','subtle'));
  return;
 }
 const fieldControls=a.fields.map(([label,spec])=>input(label,Array.isArray(spec)?{choices:spec,required:true}:{max:spec,multi:spec>=150,required:true}));
 const ticket=input('本題匿名交答券',{max:15,required:true});ticket.el.autocomplete='off';ticket.el.spellcheck=false;
 const show=checkbox('同意匿名答案在本堂投影點評',!a.optional);
 const archive=checkbox('同意整理後作日後課堂示例',false);
 const form=node('form','','sheet stack');const submit=formButton('匿名提交');
 form.append(node('h2',a.group?'每組交一份':'交一份練習'),node('p','請勿填寫姓名、聯絡方式、組號或可辨認個案的資料。用導師隨機派發的本題交答券。','hint'));
 for(const f of fieldControls)form.append(f.wrap);
 form.append(ticket.wrap,show.label,archive.label,submit);
 archive.el.disabled=!show.el.checked;
 show.el.onchange=()=>{archive.el.disabled=!show.el.checked;if(!show.el.checked)archive.el.checked=false;};
 const collected=statusLine();
 panel.prepend(collected,form);
 form.append(status);
 let done=false, formSession=session.id, busy=false;
 function updateSession(data){
  if(!busy)formSession=data.id;
  sessionLabel.textContent=data.id?data.date+'　'+data.label:'';
  submit.disabled=busy||done||data.active!==activeId;
  if(!data.id){setStatus(collected,'目前未開放收答。你可以先閱讀要求，等導師開題。');return;}
  const tally='已收 '+data.count+(data.target===null?'':' / '+data.target)+' 份';
  setStatus(collected,(data.active===activeId?'收答中':'此題目前未開放')+'　'+tally);
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
   const result=await api('student','answer',null,{session:formSession,activity:activeId,ticket:ticket.el.value,fields:fieldControls.map(x=>x.el.value),show:show.el.checked,archive:archive.el.checked});
   done=true;setStatus(status,result.already?'這張交答券已有一份有效答案，收件數只計一次。':'已收到你的匿名答案。');form.reset();
  }catch(err){submit.disabled=false;setStatus(status,err.message,true);}
  finally{busy=false;}
 };
}

async function renderTeacher(){
 main.replaceChildren(title('導師控制台','按日期選擇場次，開放練習、看收件數、抽答及保存示例。'));
 const login=node('form','','sheet stack access');
 const keyField=input('導師密碼',{type:'password',required:true});
 keyField.el.autocomplete='current-password';
 const loginStatus=statusLine();
 login.append(keyField.wrap,formButton('開啟控制台'),loginStatus);
 main.append(login);
 let key=sessionStorage.getItem(teacherKey)||'';
 login.onsubmit=async e=>{
  e.preventDefault();key=keyField.el.value.trim();await unlock();
 };
 async function unlock(){
  try{
   const {sessions}=await api('teacher','sessions',key);
   sessionStorage.setItem(teacherKey,key);
   login.remove();
   teacherPanel(key,sessions);
  }catch(err){sessionStorage.removeItem(teacherKey);setStatus(loginStatus,err.message,true);}
 }
 if(key)await unlock();
}

function teacherPanel(key,sessions){
 const controls=node('section','','sheet stack');
 const selector=input('選擇日期及場次',{choices:[]});
 const exercise=input('選擇練習',{choices:[]});
 for(const [id,a] of Object.entries(activities))exercise.el.append(new Option('P'+a.page+' '+a.title,id));
 const requestedActivity=params.get('activity');
 exercise.el.value=Object.hasOwn(activities,requestedActivity)?requestedActivity:'writing';
 const pickers=node('div','','review-controls');pickers.append(selector.wrap,exercise.wrap);
 const tally=node('p','請選擇場次。','status');
 const message=statusLine();
 const share=node('p','','class-output');
 const toggle=button('開放本題',()=>void changeState(),true);
 const copyLink=button('複製學員場次連結',()=>void copyShare());
 const getTickets=button('顯示匿名交答券',()=>void loadTickets());
 const refresh=button('更新收件',()=>void loadReview());
 const draw=button('隨機抽一份',()=>void drawOne(),true);
 const actions=node('div','','class-actions');actions.append(toggle,copyLink,getTickets,refresh,draw);
 const choice=input('抽答分類',{choices:[]});
 const ticketBox=node('div','','stack');ticketBox.id='print-tickets';
 const preview=node('section','','sheet stack class-section');
 const history=node('details','','sheet class-section');
 history.append(node('summary','查看本題匿名答案'));
 const historyList=node('div','','stack');history.append(historyList);
 const archivePanel=node('details','','sheet class-section');
 archivePanel.append(node('summary','日後課堂示例庫'));
 const archiveList=node('div','','stack');archivePanel.append(archiveList);
 archivePanel.ontoggle=()=>{if(archivePanel.open)void loadExamples();};
 controls.append(pickers,tally,share,choice.wrap,actions,message,ticketBox);
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
 top.append(link('舊標題導語答案 ↗','/legacy/teacher'),link('舊濃縮答案 ↗','/summary/teacher'),button('登出導師控制台',()=>{sessionStorage.removeItem(teacherKey);location.reload();}));
 main.append(top,controls,preview,history,create,archivePanel);
 let selected=null, selectedActivity='writing', review=null, requestScope=0, currentPreview=null;
 function options(id){
  selector.el.replaceChildren(new Option('請選擇',''),...sessions.map(s=>new Option(s.date+'　'+s.label,s.id)));
  selector.el.value=id;
 }
 options(sessions.find(s=>s.id===sessionStorage.getItem('workshop.teacher.session'))?.id??sessions[0]?.id??'');
 const req=(action,payload)=>api('teacher',action,key,payload);
 const scope=()=>({session:selected.id,activity:selectedActivity});
 const query=()=>'?'+new URLSearchParams(scope());
 const shareURL=()=>new URL('?session='+selected.id,pagesHome).href;
 function updateControls(){
  for(const b of [toggle,copyLink,getTickets,refresh,draw])b.disabled=!selected;
  toggle.textContent=review?.active===selectedActivity?'截止本題':'開放本題';
  if(selected){
   share.replaceChildren(node('span','場次連結　'),link(shareURL(),shareURL()));
   const count=review?.answers.length??0;
   const target=review?.target;
   const drawn=review?.answers.filter(a=>a.drawn).length??0;
   tally.textContent=review?'已收 '+count+(target===null?'':' / '+target)+' 份　已抽 '+drawn+' 份': '正在讀取收件數';
  }else{share.replaceChildren();tally.textContent='請選擇或建立場次。';}
 }
 function switchScope(){
  requestScope++;
  selected=sessions.find(s=>s.id===selector.el.value)??null;
  selectedActivity=exercise.el.value;
  if(selected)sessionStorage.setItem('workshop.teacher.session',selected.id);
  const groups=activities[selectedActivity].fields[0][1];
  choice.wrap.hidden=!Array.isArray(groups);
  choice.el.replaceChildren(new Option('全部合資格答案',''),...(Array.isArray(groups)?groups.map(g=>new Option(g,g)):[]));
  review=null;
  currentPreview=null;
  ticketBox.replaceChildren();historyList.replaceChildren();preview.replaceChildren();
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
   await req('active',{...scope(),open:review?.active!==selectedActivity});
   if(at===requestScope)await loadReview();
  }catch(err){if(at===requestScope)setStatus(message,err.message,true);}
  finally{if(at===requestScope)toggle.disabled=false;}
 }
 async function loadTickets(){
  const at=requestScope;
  try{
   const {tickets}=await req('tickets'+query());
   if(at!==requestScope)return;
   const heading=node('h2',selected.date+'　'+selected.label+'　'+activities[selectedActivity].title);
   const boxes=node('div','','tickets');boxes.append(...tickets.map(t=>node('code',t)));
   const print=button('列印及剪開',()=>{
    document.body.classList.add('print-tickets');
    try{window.print();}finally{document.body.classList.remove('print-tickets');}
   });
   ticketBox.replaceChildren(heading,node('p','剪開後打亂，每位或每組自取一張。避免抄下交答券與領取者的對照。','hint'),boxes,print);
  }catch(err){if(at===requestScope)setStatus(message,err.message,true);}
 }
 async function loadReview(){
  const at=requestScope;
  if(!selected)return;
  try{
   const data=await req('review'+query());
   if(at!==requestScope)return;
   review=data;updateControls();
   const classified=Array.isArray(activities[selectedActivity].fields[0][1]);
   historyList.replaceChildren(...review.answers.map((a,i)=>button('匿名答案 '+(i+1)+(classified?'　'+a.fields[0]:'')+(a.drawn?'　已抽':'')+(a.show?'':'　只供導師看'),()=>showAnswer(a))));
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
   else setStatus(message,choice.el.value?'此分類暫無未抽、並同意展示的答案。':'這題暫無未抽、並同意展示的答案。');
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
 function project(activity,fields){
  const win=window.open('about:blank','classroom-projection');
  if(!win){setStatus(message,'瀏覽器未開啟投影視窗，請允許彈出視窗。',true);return;}
  const doc=win.document;doc.title='課堂匿名點評';
  const styles=doc.createElement('link');styles.rel='stylesheet';styles.href=location.origin+'/app.css';
  const classStyles=doc.createElement('link');classStyles.rel='stylesheet';classStyles.href=location.origin+'/classroom.css';
  doc.head.replaceChildren(styles,classStyles);
  const body=node('main','','wrap stack project-content');
  body.append(node('h1',activities[activity].title));
  const output=contentBlock(activity,fields);
  if(activity==='summary'||activity==='caption'){
   const comparison=node('div','','review-grid');
   const source=node('section');
   comparison.append(source,output);body.append(comparison);
   const index=activities[activity].fields[0][1].indexOf(fields[0]);
   if(activity==='summary'&&index>=0)void materials(source,['als','family'][index]);
   if(activity==='caption'&&index>=0){
    const image=node('img','','review-photo');
    image.src=location.origin+'/caption-'+['a','b','c'][index]+'.jpg';
    image.alt=fields[0];
    source.append(image,node('p','圖片來源：聖公會澳門社會服務處新聞稿','hint'));
   }
  }else body.append(output);
  body.append(briefing('點評',activities[activity].rubric));
  doc.body.replaceChildren(body);
  win.focus();
 }
 function showAnswer(answer){
  currentPreview=answer.id;
  const context=scope();
  const a=activities[context.activity];
  const fields=a.fields.map(([label],i)=>input(label,{multi:true,max:500,value:answer.fields[i]}));
  const note=input('導師補充點評',{max:500});
  const localStatus=statusLine();
  const edited=()=>fields.map(x=>x.el.value.trim());
  preview.replaceChildren(node('h2','匿名答案預覽'),briefing('點評對照',a.rubric),node('p','投影或保存前，可先刪去不慎填入的姓名或可辨認資料。此處編輯用於本次投影或示例副本。','hint'),...fields.map(x=>x.wrap));
  const actions=node('div','','class-actions');
  if(answer.show)actions.append(button('投影此份',()=>project(context.activity,edited()),true));
  else actions.append(node('p','這份答案只供導師閱覽。','hint'));
  if(answer.archive){
   preview.append(note.wrap);
   actions.append(button('保存示例',async()=>{
    try{
     await req('archive',{...context,answer:answer.id,fields:edited(),note:note.el.value});
     if(currentPreview===answer.id)setStatus(localStatus,'已保存到示例庫。');
     if(archivePanel.open)void loadExamples();
    }catch(err){setStatus(localStatus,err.message,true);}
   }));
  }
  preview.append(actions,localStatus);
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
