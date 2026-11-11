const groups=[...document.querySelectorAll('.case[id^="group-"]')];
const groupLinks=[...document.querySelectorAll('.group-links a')];
function showGroup(){
 const id=location.hash.slice(1);
 const selected=groups.find(card=>card.id===id);
 for(const card of groups){
  card.hidden=Boolean(selected)&&card!==selected;
  if(card!==selected)card.querySelector('details').open=false;
 }
 for(const link of groupLinks){
  if(link.hash===location.hash)link.setAttribute('aria-current','true');
  else link.removeAttribute('aria-current');
 }
 if(selected)selected.scrollIntoView({block:'start'});
}
window.addEventListener('hashchange',showGroup);
showGroup();
