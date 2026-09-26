'use strict';
const $ = id => document.getElementById(id);
let opening = false;
const audio = $('song');
function play() {
  if (!audio.src) audio.src = 'song.mp3';
  // play() stays in the tap handler, before any asynchronous operation.
  const attempt = audio.play();
  if (attempt && typeof attempt.catch === 'function') attempt.catch(() => musicState());
}
function musicState() {
  const active = !audio.paused && audio.readyState >= 2;
  $('music').textContent = active ? '♫' : '♪';
  $('music').setAttribute('aria-label', active ? 'Pause music' : 'Play music');
  $('music').classList.toggle('on', active);
}
['play','pause','canplay','error','waiting'].forEach(e => audio.addEventListener(e,musicState));
$('open').addEventListener('click', () => {
  if (opening) return;
  opening = true; play();
  $('envelope').classList.add('opening');
  setTimeout(() => {
    $('envelope').hidden = true;
    $('opened').hidden = false;
    burst();
    window.scrollTo({top:0,behavior:'smooth'});
  }, matchMedia('(prefers-reduced-motion: reduce)').matches ? 100 : 1950);
});
$('music').addEventListener('click', () => { if (audio.paused) play(); else audio.pause(); });
$('cut').addEventListener('click', () => { $('scene').classList.add('is-cut'); burst(); setTimeout(() => $('scene').classList.remove('is-cut'),1900); });
$('replay').addEventListener('click', () => { $('opened').hidden=true; $('envelope').hidden=false; $('envelope').classList.remove('opening'); opening=false; window.scrollTo({top:0,behavior:'smooth'}); });
function burst(){const root=$('burst');root.replaceChildren();root.hidden=false;const colors=['#2464a3','#f6c458','#ea8d9f','#79b9d9'];for(let i=0;i<36;i++){const s=document.createElement('span');s.style.left=`${(i*37+13)%98}%`;s.style.background=colors[i%4];s.style.animationDelay=`${(i%12)*.075}s`;root.append(s)}setTimeout(()=>{root.hidden=true},3500)}
const balloons=$('balloons'), rays=$('rays');
const colors=['#4f9cd9','#f5c663','#7bc5ed','#f49ca6','#82aedc'];
for(let i=0;i<16;i++){const s=document.createElement('i');const size=19+(i%4)*6;s.className='balloon';Object.assign(s.style,{left:`${(i*37+7)%94}%`,width:`${size}px`,height:`${size*1.25}px`,background:colors[i%5],animationDelay:`${-(i*1.8)%12}s`});balloons.append(s)}
for(let i=0;i<20;i++){const s=document.createElement('i');s.className='glint';s.textContent='✦';Object.assign(s.style,{left:`${(i*37)%90+5}%`,top:`${(i*29)%78+7}%`,animationDelay:`${(i%5)*.48}s`});rays.append(s)}
