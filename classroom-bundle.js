const captionOriginal = 'https://skhssco.org.mo/news/%E6%B7%B1%E8%80%95%E9%9D%92%E5%B9%B4%E6%8A%80%E8%83%BD%E5%9F%B9%E8%82%B2%EF%BC%9A%E8%81%96%E5%85%AC%E6%9C%83%E6%B0%B9%E4%BB%94%E9%9D%92%E5%B9%B4%E6%9C%8D%E5%8B%99%E9%9A%8A%E5%B8%B6%E9%A0%98%E9%9D%92/';
const captionChoices = ['A','B','C','D','E'];
const summarySources = [
 {
  "label": "秘密的相癒展覽",
  "title": "「秘密的相癒」賭者家人藝術創作展覽",
  "date": "2026年9月19日",
  "focus": "面向一般市民。留意展覽何時何地舉行、展示了甚麼，以及與賭者家人有何關係。",
  "count": 651,
  "url": "https://skhssco.org.mo/news/%E8%81%96%E5%85%AC%E6%9C%83%E8%88%89%E8%BE%A6%E3%80%8C%E7%A7%98%E5%AF%86%E7%9A%84%E7%9B%B8%E7%99%92%E3%80%8D%E8%B3%AD%E8%80%85%E5%AE%B6%E4%BA%BA%E8%97%9D%E8%A1%93%E5%89%B5%E4%BD%9C%E5%B1%95%E8%A6%BD/",
  "lines": 5
 },
 {
  "label": "琴澳兒童健康生活",
  "title": "琴澳共建交流暨健康生活走進社區2026系列活動",
  "date": "2026年9月11日",
  "focus": "面向家長。分清已完成的培訓及交流，以及原稿當時預告的社區活動。",
  "count": 459,
  "url": "https://skhssco.org.mo/news/%E7%90%B4%E6%BE%B3%E5%85%B1%E5%BB%BA%E4%BA%A4%E6%B5%81%E6%9A%A8%E5%81%A5%E5%BA%B7%E7%94%9F%E6%B4%BB%E8%B5%B0%E9%80%B2%E7%A4%BE%E5%8D%802026%E7%B3%BB%E5%88%97%E6%B4%BB%E5%8B%95/",
  "lines": 5
 },
 {
  "label": "深澳僱員支援交流",
  "title": "聖公會僱員支援服務赴深圳易普斯交流",
  "date": "2026年8月20日",
  "focus": "面向企業同事。交代兩地交流的目的、具體做法及討論重點，勿把期望寫成成果。",
  "count": 1135,
  "url": "https://skhssco.org.mo/news/%E8%81%96%E5%85%AC%E6%9C%83%E5%83%B1%E5%93%A1%E6%94%AF%E6%8F%B4%E6%9C%8D%E5%8B%99%E8%B5%B4%E6%B7%B1%E5%9C%B3%E6%98%93%E6%99%AE%E6%96%AF%E4%BA%A4%E6%B5%81-%E4%BF%83%E9%80%B2%E6%B7%B1%E6%BE%B3%E5%85%A9/",
  "lines": 12
 }
];
const activities = {
 relay: {page:14, title:'分組傳話', group:true, task:'每組最後一位交一份收到的訊息。寫答題紙或在這裏交答。', context:'各組各自傳話，題目按導師指示分配。最後一起比較原文和各組結果。', rubric:'比較時間、地點、對象和行動安排有何遺漏、改動或新增。', fields:[['組別',['A','B','C','D']],['傳到最後的訊息',600]]},
 writing: {page:22, title:'標題與導語', task:'寫一個標題、約 60 字導語及兩項待核資料。寫完可與鄰座互看，提交自己的一份。', context:'虛構｜一間社區機構擬為青少年家長舉辦兩場工作坊。社工會帶領情境演練，包括先聽完再回應、辨認易引起對立的問法。日期、地點、名額、費用及報名安排尚未確認。', rubric:'對照第 23 頁：重點、對象、事實。請全班指出兩項仍要核實的資料。', fields:[['標題',100],['導語',220],['待核資料一',120],['待核資料二',120]]},
 summary: {page:24, title:'100 字濃縮', task:'自由選一篇聖公會中文新聞稿，不設每篇人數上限。寫約 100 字短稿，另列一項待核資料。', context:'開啟主辦單位原稿。先圈三項必留事實，再按 5W1H 檢查人物、事件、時間、地點、目的及做法。', rubric:'對照原稿，查重點、時點、數字口徑及原意。原稿未交代的資料另外標待核。', fields:[['底稿',summarySources.map(s=>s.label)],['約 100 字短稿',280],['待核資料',120]]},
 caption: {page:28, title:'選圖與圖片說明', task:'從原稿五張相片選一張，寫一句圖片說明，再交代選圖理由。', context:'2026 年 8 月 13 至 14 日，聖公會氹仔青年服務隊帶領 8 名本澳青少年到江門，參訪咖啡企業及博物館。以下五張相片依原稿次序排列。', rubric:'圖片說明同畫面是否相符？哪些是看得到或原稿可核實的資料？', fields:[['相片',captionChoices],['一句圖片說明',160],['選圖理由',180]]},
 response: {page:31, title:'首份回應', task:'扮演當值同事，寫三句話。先照顧人，再交代事，最後說明行動。', context:'虛構｜家庭支援站的照顧者小組因場地需檢查而延期，已有三名照顧者到場。新日期未定，當值社工會在今天下午四時前聯絡受影響家庭。家屬問：「我特登搵人照顧屋企人先嚟到，咁今日點安排？」', rubric:'有否回應家屬的具體不便？有否分開已知與未知？跟進承諾可否兌現？', fields:[['先照顧人',180],['再交代事',180],['說明行動',180]]},
 team: {page:37, title:'綜合實戰', group:true, task:'每組交一份。按手上案例寫標題、核心訊息、配圖構思、圖說及一項待核資料。請勿填寫姓名。', context:'四份案例可在本頁閱讀。以手上案例為準，核心訊息寫成一句受眾聽得明、而且有事實支持的話。', rubric:'標題與核心訊息是否各有作用？配圖與圖說能否支持角度？最重要的待核資料是甚麼？', fields:[['標題',120],['一句核心訊息',180],['配圖構思',180],['一句圖說',180],['待核資料',120]]},
 crisis: {page:43, title:'突發回應', group:true, task:'按本組情境卡交一份答案。寫最需要先照顧的人、一段約 30 秒的首份回應，以及一項要核實的資料。', context:'以下四張情境卡均屬虛構。閱讀導師分配給本組的卡，想像你是當值同事，需要先照顧受影響的人，再交代已知、下一步及更新安排。', rubric:'感受、事實、行動、更新。追問誰負責及何時會有下次更新。', fields:[['先照顧誰',120],['30 秒回應',350],['待核工作',160]]},
 application: {page:45, title:'個人應用', optional:true, task:'想像你是當值同事。寫你會先做的一個動作、一項要核實的資料及一個負責跟進的崗位。可自願提交。', context:'虛構｜家庭支援站的照顧者支援小組今早因場地需要檢查而臨時延期，已有 3 名照顧者到場，新日期未定。當值社工會在今天下午 4 時前聯絡受影響家庭。一名照顧者說：「我特登搵人照顧屋企人先嚟到，咁今日點安排？」你也可以用自己工作中無法辨認當事人的情境作答。', rubric:'抽 1 至 2 份作結。問全班哪個動作最具體，以及怎樣知道已做到。', fields:[['一個實際動作',180],['一項要核實的資料',180],['一個負責崗位',100]]}
};

;
const relay = {
 title: '一則通告，傳到最後變成咩？',
 write: '最後一位有 60 秒寫低收到嘅訊息。每組交一份，可用答題紙或網上交答。',
 pass: [
  '單數組同題，雙數組同題。按導師指示抽題，各組分開傳。',
  '導師開始計時。頭 15 秒只限每組第一位睇卡，計入 90 秒。',
  '睇完反轉張卡，再逐位細聲傳。每人只聽一次、只講一次，唔追問、唔做筆記。'
 ],
 questions: [
  '同一個題目，各組保留咗邊啲相同嘅重點？',
  '邊個時間、地點、對象或安排有遺漏、改動或多咗？',
  '邊個差異最可能令居民做錯下一步？'
 ]
};

function relayGroupLabel(group,count){
 return '第 '+group+' 組'+(count===4&&group>=1&&group<=4?'（'+'ABCD'[group-1]+'）':'');
}
function relayPairs(count){
 const groups=Array.from({length:count},(_,i)=>i+1);
 return [groups.filter(n=>n%2===1),groups.filter(n=>n%2===0)];
}

;
function relayReview(sessionId, groupCount, getReview, getTopics, comparison, helpers) {
 const {node,input,button,link,briefing,statusLine,setStatus}=helpers;
 const key='workshop.relay.'+sessionId;
 let saved={};
 try{saved=JSON.parse(sessionStorage.getItem(key))||{};}catch{}
 const pairs=relayPairs(groupCount);
 const buckets=pairs.map(pair=>pair.map(group=>relayGroupLabel(group,groupCount)).join('、'));
 const labels=pairs[1].length?buckets:[buckets[0],'題目 2 分配給本組'];
 const allocation=input('題目 1 派給邊啲組？',{choices:pairs[1].length?labels:[labels[0],'本場用題目 2']});
 const oldAllocation={'A／C':labels[0],'B／D':labels[1]};
 allocation.el.value=oldAllocation[saved.allocation]??saved.allocation??'';
 const fields=Object.fromEntries(pairs.flat().sort((a,b)=>a-b).map(group=>[
  group,input(relayGroupLabel(group,groupCount)+'｜紙本或網上結果',{multi:true,max:600,value:saved.drafts?.[group]??saved.drafts?.['ABCD'[group-1]]??''})
 ]));
 const status=statusLine();
 const save=()=>sessionStorage.setItem(key,JSON.stringify({allocation:allocation.el.value,drafts:Object.fromEntries(Object.entries(fields).map(([g,f])=>[g,f.el.value]))}));
 allocation.el.onchange=save;
 Object.values(fields).forEach(f=>f.el.oninput=save);
 const grid=node('div','','review-grid');
 grid.append(...Object.values(fields).map(f=>f.wrap));
 comparison.replaceChildren(node('h2','原文與各組結果'),node('p','單數組一題，雙數組另一題。記下實際抽籤結果。紙本可逐字輸入，網上答案可一鍵帶入。投影前請核對內容。','hint'),
  allocation.wrap,link('列印題目卡及答題紙 ↗','/relay?step=print&groups='+groupCount),grid,button('截止後揭曉原文及投影',project,true),status);
 async function project(){
  if(!allocation.el.value){setStatus(status,'請先選擇抽籤結果。',true);return;}
  const review=getReview();
  if(!review||review.open){setStatus(status,'請先確認收答已截止，再揭曉原文。',true);return;}
  if(!Object.values(fields).some(f=>f.el.value.trim())){setStatus(status,'請先輸入紙本答案或帶入網上答案。',true);return;}
  const win=window.open('about:blank','classroom-projection');
  if(!win){setStatus(status,'請允許開啟投影視窗。',true);return;}
  let topics;
  try{({topics}=await getTopics());}catch(err){win.close();setStatus(status,err.message,true);return;}
  const doc=win.document;
  doc.title='分組傳話｜原文與結果對照';
  doc.head.replaceChildren(...['app.css','classroom.css','relay.css'].map(file=>{
   const css=doc.createElement('link');css.rel='stylesheet';css.href=location.origin+'/'+file;return css;
  }));
  const body=node('main','','wrap stack project-content');
  body.append(node('h1','分組傳話｜原文與結果對照'));
  const first=allocation.el.value===labels[0]?0:1;
  [first,1-first].forEach((pairIndex,topicIndex)=>{
   const pair=pairs[pairIndex];
   if(!pair.length)return;
   const section=node('section','','sheet stack');
   const row=node('div','','relay-comparison');
   row.append(briefing('原文',topics[topicIndex]),...pair.map(group=>briefing(relayGroupLabel(group,groupCount)+'最後收到',fields[group].el.value.trim()||'暫未有可展示答案')));
   section.append(node('h2','題目 '+(topicIndex+1)+'｜'+buckets[pairIndex]),row);
   body.append(section);
  });
  body.append(briefing('點評',relay.questions.join(' ')));
  doc.body.replaceChildren(body);
  win.focus();
 }
 return (answers)=>{
  for(const [group,field] of Object.entries(fields)){
   const answer=answers.find(a=>a.group===Number(group));
   field.el.placeholder=answer?(answer.show?'已收網上答案，可帶入':'網上答案只供導師閱覽'):'可輸入紙本答案';
   let bring=field.wrap.querySelector('button');
   if(answer?.show){
    if(!bring){bring=button('帶入 '+relayGroupLabel(Number(group),groupCount)+'網上答案',()=>{});field.wrap.append(bring);}
    bring.onclick=()=>{field.el.value=answer.fields[1];save();};
   }else bring?.remove();
  }
 };
}

;
const base='/classroom';
const pagesPortal=!!document.querySelector('meta[name="workshop-portal"]');
const hostedBase='https://news-writing-workshop-1116.ronlam1981.chatgpt.site';
const sitePortal=pagesPortal&&location.origin===hostedBase;
const portalHome=sitePortal?'/learn':'./';
const teacherHome=pagesPortal&&!sitePortal?'./?activity=teacher':base+'/teacher';
const teacherTool=path=>pagesPortal?hostedBase+path:path;
const timerPath=pagesPortal?'./timer.html':'/timer';
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
async function api(role,path,key,payload,signal){
 const res=await fetch((pagesPortal?'https://media-training-api-relay.vercel.app':'')+'/api/classroom/'+role+'/'+path,{
  method:payload===undefined?'GET':'POST',
  headers:{...(key?{authorization:'Bearer '+key}:{}),...(payload===undefined?{}:{'content-type':'application/json'})},
  body:payload===undefined?undefined:JSON.stringify(payload),
  cache:'no-store', signal
 });
 const data=await res.json();
 if(!res.ok)throw new Error(data.error||'暫時未能連線。');
 return data;
}

async function loadStudentSession(){
 let lastError;
 for(let attempt=0;attempt<3;attempt++){
  const controller=new AbortController();
  const timeout=setTimeout(()=>controller.abort(),8000);
  try{return await api('student',currentClass(),undefined,undefined,controller.signal);}
  catch(error){
   lastError=error;
   // Retry only transport failures, never a valid API rejection.
   if(error.name!=='AbortError'&&!(error instanceof TypeError))throw error;
  }finally{clearTimeout(timeout);}
  if(attempt<2)await new Promise(resolve=>setTimeout(resolve,400*(attempt+1)));
 }
 throw new Error('暫時未能連接收答服務。已自動重試，請按「重新連接收答」再試。');
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
  teacherLink.append(link('導師控制台 ↗',teacherHome));
  main.append(teacherLink);
 }
 let session;
 try {
  setStatus(status,'正在連接收答服務…');
  session=await loadStudentSession();
  setStatus(status,'');
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
 }catch(err){
  setStatus(status,err.message,true);
  const retry=button('重新連接收答',()=>{
   retry.disabled=true;
   void renderStudent();
  },true);
  panel.append(retry,node('p','題目仍可閱讀。未連接成功前，不代表答案已提交。','hint'));
  if(pagesPortal&&!sitePortal){
   const fallback=link('改用原有收答網站 ↗',studentHref(hostedBase+base+(activeId?'/'+activeId:'')));
   fallback.target='_blank';fallback.rel='noopener noreferrer';
   panel.append(fallback);
  }
  panel.append(link('返回學員主頁',courseHref()));return;
 }
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
 let key=pagesPortal?'':sessionStorage.getItem(teacherKey)||'';
 login.onsubmit=async e=>{
  e.preventDefault();key=keyField.el.value.trim();await unlock();
 };
 async function unlock(){
  try{
   const {sessions,pinSet}=await api('teacher','sessions',key);
   if(!pagesPortal)sessionStorage.setItem(teacherKey,key);
   keyField.el.value='';
   login.remove();
   teacherPanel(key,sessions,pinSet);
  }catch(err){if(!pagesPortal)sessionStorage.removeItem(teacherKey);setStatus(loginStatus,err.message,true);}
 }
 if(key)await unlock();
}

function teacherPanel(key,sessions,pinSet){
 const controls=node('section','','sheet stack');
 const selector=input('選擇日期及場次',{choices:[]});
 const exercise=input('選擇練習',{choices:[]});
 for(const [id,a] of Object.entries(activities))exercise.el.append(new Option('P'+a.page+' '+a.title,id));
 const requestedActivity=params.get(pagesPortal?'exercise':'activity');
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
 const timerLink=link('開啟活動計時 ↗',timerPath);timerLink.target='_blank';timerLink.rel='noopener';
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
 top.append(link('全課程活動計時 ↗',timerPath+'?slide=2'),link('舊標題導語答案 ↗',teacherTool('/legacy/teacher')),link('舊濃縮答案 ↗',teacherTool('/summary/teacher')),button('登出導師控制台',()=>{if(!pagesPortal)sessionStorage.removeItem(teacherKey);location.reload();}));
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
   if(!pagesPortal)sessionStorage.setItem(teacherKey,next);
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
   confirm=window.prompt('將清除控制台內「'+selected.label+'」的「'+activities[selectedActivity].title+'」全部答案。私人 GitHub 備份會保留。請輸入「重設」確認。');
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
 const shareURL=()=>pagesPortal
  ?new URL('./?'+new URLSearchParams({activity:selectedActivity,session:selected.id}),location.href).href
  :new URL('?session='+selected.id,location.origin+'/classroom/'+selectedActivity).href;
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
  timerLink.href=timerPath+'?activity='+encodeURIComponent(selectedActivity);
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
  timerFrame.src=timerPath+'?'+new URLSearchParams({activity:selectedActivity,embed:'1'});
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
  const projectionAsset=name=>new URL(pagesPortal&&!sitePortal?'./'+name:'/'+name,location.href).href;
  const styles=doc.createElement('link');styles.rel='stylesheet';styles.href=projectionAsset('app.css');
  const classStyles=doc.createElement('link');classStyles.rel='stylesheet';classStyles.href=projectionAsset('classroom.css');
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
     image.src=projectionAsset('caption-'+suffix+'.jpg');
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
