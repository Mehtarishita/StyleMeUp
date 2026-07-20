// Simple horizontal carousel for Style Boards
const track = () => document.getElementById('boardsTrack');
const prev = () => document.querySelector('.carousel .prev');
const next = () => document.querySelector('.carousel .next');

function scrollByCard(dir = 1){
  const el = track();
  if(!el) return;
  const card = el.querySelector('.look-card');
  const w = card ? card.getBoundingClientRect().width + 16 : 280;
  el.scrollBy({ left: w * dir, behavior: 'smooth' });
}

window.addEventListener('load', ()=>{
  prev()?.addEventListener('click', ()=> scrollByCard(-1));
  next()?.addEventListener('click', ()=> scrollByCard(1));
});
