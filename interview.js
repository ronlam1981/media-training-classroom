const query=new URLSearchParams(location.search);
const requested=Number(query.get('slide')||query.get('p'));
if(query.get('embed')==='1')document.body.classList.add('embedded-timer');
const activity=query.get('activity');
const unique=[...new Set(Object.values(timerPlans))];
const plan=(activity&&unique.find(p=>p.activity===activity))||timerPlans[requested]||timerPlans[32];
const shownPage=timerPlans[requested]===plan?requested:plan.page;
const $=id=>document.getElementById(id);
const storageKey='workshop.timer.v3.'+plan.page;
const length=index=>(plan.steps[index]?.[0]??0)*1000;
const explicitStage=Number(query.get('stage'));
const directStage=query.has('stage')&&Number.isInteger(explicitStage)&&explicitStage>=0&&explicitStage<plan.steps.length?explicitStage:plan.startByPage?.[shownPage]??0;
const initial=()=>({index:directStage,remaining:length(directStage),deadline:null});
function readTimer(){
 try{
  const s=JSON.parse(localStorage.getItem(storageKey));
  if(s&&Number.isInteger(s.index)&&s.index>=0&&s.index<=plan.steps.length&&
   Number.isFinite(s.remaining)&&s.remaining>=0&&s.remaining<=length(s.index)&&
   (s.deadline===null||Number.isFinite(s.deadline)))return s;
 }catch{}
 return initial();
}
let state=readTimer();
if((query.has('stage')||shownPage!==plan.page)&&state.deadline===null&&state.index!==directStage)state=initial();
let stageButtons=[];
function saveTimer(){
 try{localStorage.setItem(storageKey,JSON.stringify(state));}catch{}
}
function countdown(now){return state.deadline===null?state.remaining:Math.max(0,state.deadline-now);}
function drawClock(now=Date.now()){
 const seconds=Math.ceil(countdown(now)/1000);
 $('time').textContent=Math.floor(seconds/60)+':'+String(seconds%60).padStart(2,'0');
 const step=plan.steps[state.index];
 const reading=step?.[3];
 const started=state.deadline!==null||state.remaining<length(state.index);
 const leftToRead=reading&&seconds-(step[0]-reading);
 const cue=seconds===0&&plan.manualAdvance?'時間到。導師可選下一階段。':
  reading&&started?(leftToRead>0?'第一位睇卡｜'+leftToRead+' 秒':'反轉卡，開始逐位傳話'):
  state.deadline!==null&&seconds>0&&seconds<=30?'本階段最後 30 秒':'';
 if($('cue').textContent!==cue)$('cue').textContent=cue;
}
function drawStage(){
 const stage=plan.steps[state.index];
 $('phase').textContent=stage?.[1]??'本活動完成';
 $('steps').textContent=stage?.[2]??'完成點評後，切回投影片繼續。';
 stageButtons.forEach((b,i)=>{
  if(i===state.index)b.setAttribute('aria-current','step');
  else b.removeAttribute('aria-current');
 });
 $('start').disabled=!stage||(!state.remaining&&state.deadline===null);
 $('next').disabled=!stage;
 $('start').textContent=state.deadline!==null?'暫停':state.remaining===length(state.index)?'開始倒數':'繼續倒數';
 drawClock();
}
function go(index,startAt=null){
 const remaining=length(index);
 state={index,remaining,deadline:startAt!==null&&remaining>0?startAt+remaining:null};
}
function tick(){
 const now=Date.now();
 let changed=false;
 while(state.deadline!==null&&now>=state.deadline){
  if(plan.manualAdvance){state={...state,remaining:0,deadline:null};changed=true;break;}
  go(state.index+1,state.deadline);
  changed=true;
 }
 if(changed){saveTimer();drawStage();}
 else drawClock(now);
}
$('timer-title').textContent=plan.title;
const total=(query.has('stage')||shownPage!==plan.page)?length(directStage)/1000:plan.steps.reduce((sum,s)=>sum+s[0],0);
const min=Math.floor(total/60), sec=total%60;
$('activity-page').textContent='P'+shownPage+'　'+(min?min+' 分鐘':'')+(sec?' '+sec+' 秒':'');
$('collect').textContent=plan.collect;
$('review').textContent=plan.review;
if(plan.activity){
 $('online-actions').hidden=false;$('online-hint').hidden=false;
 $('teacher-link').href='./?'+new URLSearchParams({activity:'teacher',exercise:plan.activity});
 $('student-link').href='./?activity='+encodeURIComponent(plan.activity);
 if(plan.activity==='relay'){
  $('teacher-link').textContent='開啟小組收件與原文對照 ↗';
  $('online-hint').textContent='預設收答，各組選組別交答。收齊後截止，核對紙本或網站答案，再揭曉原文。';
 }
}
const picker=$('timer-picker');
for(const activity of unique)picker.append(new Option('P'+activity.page+' '+activity.title,String(activity.page)));
picker.value=String(plan.page);
picker.onchange=()=>{location.href='./timer.html?slide='+Number(picker.value)+(query.get('embed')==='1'?'&embed=1':'');};
stageButtons=plan.steps.map((step,i)=>{
 const b=document.createElement('button');
 b.type='button';b.className='secondary stage-button';
 b.textContent=(i+1)+'. '+step[1];
 b.onclick=()=>{go(i);saveTimer();drawStage();};
 return b;
});
$('stages').replaceChildren(...stageButtons);
$('start').onclick=()=>{
 if(state.index>=plan.steps.length||(!state.remaining&&state.deadline===null))return;
 const now=Date.now();
 if(state.deadline===null)state.deadline=now+state.remaining;
 else{state.remaining=countdown(now);state.deadline=null;}
 saveTimer();drawStage();
};
$('next').onclick=()=>{
 if(state.index>=plan.steps.length)return;
 go(state.index+1,plan.manualAdvance||state.deadline===null?null:Date.now());
 saveTimer();drawStage();
};
$('reset').onclick=()=>{state=initial();saveTimer();drawStage();};
$('fullscreen').onclick=async()=>{
 try{
  if(document.fullscreenElement)await document.exitFullscreen();
  else await document.documentElement.requestFullscreen();
 }catch{}
};
window.addEventListener('storage',e=>{
 if(e.key===storageKey){state=readTimer();drawStage();tick();}
});
setInterval(tick,200);
drawStage();
tick();
