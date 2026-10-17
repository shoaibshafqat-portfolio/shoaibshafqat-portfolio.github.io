(function(){
var T={neon:{n:'Neon Lab',v:{ink:'8 9 13',panel:'17 19 27',acid:'200 255 61',cyan:'100 232 255',violet:'155 123 255'}},
midnight:{n:'Midnight Blue',v:{ink:'6 11 24',panel:'12 21 42',acid:'96 165 250',cyan:'56 189 248',violet:'129 140 248'}},
charcoal:{n:'Charcoal Orange',v:{ink:'16 16 16',panel:'26 26 26',acid:'255 138 31',cyan:'255 196 98',violet:'255 107 74'}},
slate:{n:'Slate Purple',v:{ink:'15 17 26',panel:'24 27 41',acid:'192 132 252',cyan:'244 114 182',violet:'129 140 248'}},
emerald:{n:'Emerald Dark',v:{ink:'6 15 12',panel:'12 25 20',acid:'52 211 153',cyan:'110 231 183',violet:'45 212 191'}}};
var g=function(o,p){return p.split('.').reduce(function(a,k){return a==null?a:a[k]},o)};
var esc=function(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};
var url=function(u){u=String(u||'');return /^(https?:\/\/|mailto:|tel:)/i.test(u)||/^[\w\-.\/]+$/.test(u)?u:'#'};
function setTheme(id){var t=(T[id]||T.neon).v,r=document.documentElement.style;for(var k in t)r.setProperty('--'+k,t[k]);try{localStorage.setItem('cmsTheme',JSON.stringify(t))}catch(e){}}
function pcard(p,i){var img=p.image?'<img src="'+esc(url(p.image))+'" alt="'+esc(p.title)+'" class="h-full w-full object-cover" loading="lazy">':'<div class="grid h-full place-items-center"><span class="font-display text-7xl font-bold text-acid/30">'+String(i+1).padStart(2,'0')+'</span></div>';
var tags=String(p.tags||'').split(',').map(function(s){return s.trim()}).filter(Boolean).map(function(t){return '<span class="rounded-full bg-white/5 px-3 py-1.5 text-[10px] text-white/60">'+esc(t)+'</span>'}).join('');
return '<article class="reveal visible overflow-hidden rounded-3xl border border-white/10 bg-panel transition hover:-translate-y-1 hover:border-acid/40"><div class="project-art relative h-56 overflow-hidden">'+img+'<div class="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-panel to-transparent"></div></div><div class="p-6"><p class="mono text-[10px] uppercase tracking-widest text-violet">'+esc(p.cat)+'</p><h3 class="mt-3 font-display text-2xl font-bold">'+esc(p.title)+'</h3><p class="mt-3 text-sm leading-6 text-white/50">'+esc(p.desc)+'</p><div class="mt-5 flex flex-wrap gap-2">'+tags+'</div></div></article>'}
function acard(a){return '<article class="reveal visible rounded-3xl border border-white/10 bg-panel p-6">'+(a.image?'<div class="cert-img mb-5" data-src="'+esc(url(a.image))+'" data-title="'+esc(a.title)+'"></div>':'')+'<p class="mono text-[10px] uppercase tracking-widest text-cyan">'+esc(a.tag)+'</p><h3 class="mt-2 font-display text-2xl font-bold">'+esc(a.title)+'</h3><p class="mt-2 text-sm text-white/50">'+esc(a.desc)+'</p></article>'}
function scard(s){return '<article class="reveal visible flex flex-col rounded-3xl border border-white/10 bg-panel p-6 transition hover:-translate-y-1 hover:border-acid/40"><h3 class="font-display text-xl font-bold">'+esc(s.title)+'</h3><p class="mt-3 flex-1 text-sm leading-6 text-white/50">'+esc(s.desc)+'</p><p class="mt-5 font-display text-2xl font-bold text-acid">'+(s.price?esc(s.price):'<span class="text-sm font-medium text-white/50">Contact for a quote</span>')+'</p><a href="index.html#contact" class="mt-4 text-xs uppercase tracking-wider text-cyan hover:text-acid">Ask about this ↗</a></article>'}
function fill(id,html){var e=document.getElementById(id);if(e)e.innerHTML=html}
function apply(c){window.SITE=c;setTheme(c.theme);
document.querySelectorAll('[data-t]').forEach(function(e){var v=g(c,e.dataset.t);if(v!=null&&v!=='')e.textContent=v});
document.querySelectorAll('[data-img]').forEach(function(e){var v=g(c,e.dataset.img);if(v)e.setAttribute('src',url(v))});
var k=c.contact||{};document.querySelectorAll('[data-c=email]').forEach(function(e){e.href='mailto:'+k.email});document.querySelectorAll('[data-c=phone]').forEach(function(e){e.href='tel:'+String(k.phone||'').replace(/[^+\d]/g,'')});
var sv=c.services||{};['services','navSvc'].forEach(function(i){var e=document.getElementById(i);if(e)e.hidden=!(sv.show!==false&&(sv.items||[]).length)});
fill('svcGrid',(sv.items||[]).map(scard).join(''));
if(c.projects){var all=document.getElementById('allProjects');fill('projGrid',c.projects.filter(function(p){return p.featured!==false}).map(pcard).join(''));if(all)all.innerHTML=c.projects.map(pcard).join('')}
if(c.awards)fill('awardsGrid',c.awards.map(acard).join(''));
if(window.buildGrid)buildGrid();if(window.initCerts)initCerts()}
window.CMS={themes:T,setTheme:setTheme,apply:apply};
if(document.documentElement.dataset.noauto)return;
var last='';try{last=localStorage.getItem('cms')||'';if(last)apply(JSON.parse(last))}catch(e){}
fetch('data/content.json?t='+Date.now(),{cache:'no-store'}).then(function(r){return r.text()}).then(function(t){if(t!==last){apply(JSON.parse(t));try{localStorage.setItem('cms',t)}catch(e){}}}).catch(function(){});
})();
