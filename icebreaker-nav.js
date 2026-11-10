const back=document.getElementById('classroom-return');
const p=new URLSearchParams(location.search);
back.href=(location.hostname.endsWith('.chatgpt.site')?'/learn':'./')+(p.has('session')?'?'+new URLSearchParams({session:p.get('session')}):'');
