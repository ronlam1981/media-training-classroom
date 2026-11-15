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
