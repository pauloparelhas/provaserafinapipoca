/* ============================================================
   LP3_jornada_motor2.js — o jogo em si (parte 2): bichos, canos e
   submundo, checkpoints, saída trancada + seta indicadora, dicas de
   proximidade, chefão, mapa, globo, transições em íris, laço principal.
   Estende window.JOGO (criado em LP3_jornada_motor.js).
   ============================================================ */
(function(G){
'use strict';
var J=G.J, W=G.W, H=G.H, A=window.ARTE, F=window.FASES, TAM=G.TAM, URSO_H=G.URSO_H;

/* ---------- bichos ---------- */
function inimigos(dt){
  var u=J.urso, M=J.mundo, R=G.ursoRet();
  M.inimigos.forEach(function(e){
    if(e.morto) return;
    if(e.achatado){ e.tAch-=dt; if(e.tAch<=0) e.morto=true; return; }
    e.t=(e.t||0)+dt;
    if(e.voa){ e.x=e.x0+Math.sin(e.t*.9)*150; e.dir=Math.cos(e.t*.9)>=0?1:-1; e.y=e.y0-110+Math.sin(e.t*2.3)*e.amp; }
    else {
      var px=e.x+e.dir*e.v*dt, apoio=false, parede=false;
      G.solidos(M).forEach(function(s){ if(px+e.dir*14>s.x && px+e.dir*14<s.x+s.w && e.y>=s.y-2 && e.y<=s.y+6) apoio=true; if(G.colideRet(px-14,e.y-30,28,26,s.x,s.y,s.w,s.h)) parede=true; });
      M.plats.forEach(function(s){ if(px+e.dir*14>s.x && px+e.dir*14<s.x+s.w && Math.abs(e.y-s.y)<4) apoio=true; });
      if(!apoio||parede||px<16||px>M.w-16) e.dir=-e.dir; else e.x=px;
    }
    if(u.invT>0||u.tontoT>0||J.estado!=='nivel') return;
    var ew=e.grande?26:16, eh=e.grande?52:34;
    if(G.colideRet(R.x+6,R.y+6,R.w-12,R.h-6,e.x-ew,e.y-eh,ew*2,eh)){
      if(u.vy>50 && u.y<e.y-(e.grande?28:16)){ e.achatado=true; e.tAch=.7; u.vy=-400; u.noChao=false; u.sx=1.3; u.sy=.7; SOM.fx('pisao'); G.pontua(20,e.x,e.y-40); G.brilho(e.x,e.y-20,6); }
      else G.machucado();
    }
  });
}

/* ---------- canos (↓ em cima do cano = troca de mundo) ---------- */
function canoSob(){ var u=J.urso, M=J.mundo, hw=G.URSO_W*TAM[u.tam]/2; for(var i=0;i<M.canos.length;i++){ var p=M.canos[i]; if(u.noChao && u.x+hw-6>p.x && u.x-hw+6<p.x+p.w && Math.abs(u.y-p.y)<3) return p; } return null; }
function parDoCano(p){ var L=J.nivel, outro= J.mundo===L? L.sub : L; if(!outro) return null; for(var i=0;i<outro.canos.length;i++) if(outro.canos[i].id===p.id) return {cano:outro.canos[i], mundo:outro}; return null; }
function entraCano(p){
  var par=parDoCano(p); if(!par) return; var u=J.urso;
  if(false){ /* cano do submundo nunca tranca (Paulo, 11/10) */ SOM.fx('tranca'); J.setaT=6; G.toast('Este cano só abre depois da arena do submundo. Siga a seta!',3000); J.in.down=false; return; }
  J.estado='cano'; J.canoAnim={t:0,dur:.55,p:p,fase:'desce'}; SOM.fx('cano'); u.estado='idle';
  iris(u.x-J.cam,u.y-40,function(){
    G.trocaMundo(par.mundo.mundo); var q=par.cano; u.x=q.x+q.w/2; u.y=q.y; u.vx=0; u.vy=0; J.cam=Math.max(0,Math.min(J.mundo.w-W,u.x-W*.4)); J.clima=[]; J.troncosVivos=[]; J.pinhas=[];
    J.estado='nivel'; J.in.down=false; G.toast(par.mundo.mundo==='sub'?'Submundo! Procure a arena escondida':'De volta à superfície',2000);
  });
}

/* ---------- checkpoints, mastro trancado, seta ---------- */
function faltam(){ var L=J.nivel, lista=[]; [L].concat(L.sub?[L.sub]:[]).forEach(function(M){ M.caixas.forEach(function(c){ if(!c.aberta) lista.push(c); }); }); return lista; }
function alvoSeta(){
  var u=J.urso, M=J.mundo, lista=faltam(); if(!lista.length) return null;
  var aqui=lista.filter(function(c){ return c.mundo===M.mundo; });
  if(aqui.length){ aqui.sort(function(a,b){ return Math.abs(a.x-u.x)-Math.abs(b.x-u.x); }); return {x:aqui[0].x+22,y:aqui[0].y+22,txt:'Falta uma arena ? aqui'}; }
  var canos=M.canos.slice(); if(!canos.length) return null; canos.sort(function(a,b){ return Math.abs(a.x-u.x)-Math.abs(b.x-u.x); });
  return {x:canos[0].x+canos[0].w/2,y:canos[0].y,txt:M.mundo==='main'?'A arena está no submundo: entre pelo cano':'A arena está lá em cima: volte pelo cano'};
}
function atualizaNivel(dt){
  var L=J.nivel, M=J.mundo, u=J.urso;
  if(u.cheerT>0){ u.cheerT-=dt; u.estado='cheer'; u.anim+=dt; }
  M.caixas.forEach(function(c){ if(c.bump>0) c.bump=Math.max(0,c.bump-dt*60); if(c.cooldown>0) c.cooldown-=dt; if(c.flutua){ c.y=c.y0===undefined?(c.y0=c.y):c.y0+Math.sin(J.t*1.6+c.fase0)*10; } });
  M.checkpoints.forEach(function(cp){ if(!cp.acesa&&u.x>cp.x){ cp.acesa=true; J.respawn={x:cp.x,y:cp.y,mundo:M.mundo}; SOM.fx('checkpoint'); G.toast('Checkpoint!',1500); G.brilho(cp.x,cp.y-80,12); } });
  inimigos(dt); G.perigos(dt);
  if(J.in.down && J.downSolto && J.estado==='nivel'){ var p=canoSob(); if(p){ J.downSolto=false; entraCano(p); return; } var pd=null; M.caixas.forEach(function(c){ if(c.porta&&Math.abs(c.x+c.w/2-u.x)<40&&Math.abs(c.y+c.h-u.y)<10&&u.noChao) pd=c; }); if(pd){ J.downSolto=false; G.bateCaixa(pd); return; } }
  if(!J.in.down) J.downSolto=true;
  if(J.in.act && J.actSolto){ J.actSolto=false; G.arremessaPinha(); } if(!J.in.act) J.actSolto=true;
  if(J.setaT>0) J.setaT-=dt;
  if(M.mastro && Math.abs(u.x-M.mastro.x)<30 && Math.abs(u.y-M.mastro.y)<70 && J.estado==='nivel'){
    /* 11/10 (Paulo): a bandeira SEMPRE deixa passar, mesmo faltando arena pelo caminho */
    var nf=faltam().length; fimDeFase();
    if(nf>0&&!L.fase.treino) G.toast('Fase concluída! Ficou'+(nf>1?'ram '+nf+' arenas':' 1 arena')+' para treinar quando quiser.',3500);
  }
  if(J.trancaT>0) J.trancaT-=dt;
  if(J.tut) atualizaTutorial(dt);
  dicas();
}
function dicas(){
  var u=J.urso, M=J.mundo, d=null, R=G.ursoRet();
  var p=canoSob(); if(p&&parDoCano(p)) d={x:p.x+p.w/2,y:p.y-50,txt:'Entre no cano: aperte ↓',teclas:['↓','S'],botao:'▼'};
  if(!d) M.caixas.forEach(function(c){ if(c.aberta){ if(J.chefe) return; if(c.porta){ if(Math.abs(c.x+c.w/2-u.x)<70 && Math.abs(c.y+c.h-u.y)<10) d={x:c.x+c.w/2,y:c.y-30,txt:'Quer treinar mais? Aperte ↓',teclas:['↓','S'],botao:'▼',leve:true}; } else if(Math.abs(c.x+22-u.x)<60 && c.y<u.y && u.y-c.y<320) d={x:c.x+22,y:c.y-40,txt:'Quer treinar mais? Bata na caixa',leve:true}; return; } if(c.porta){ if(Math.abs(c.x+c.w/2-u.x)<70 && Math.abs(c.y+c.h-u.y)<10) d={x:c.x+c.w/2,y:c.y-30,txt:'Entre na porta: aperte ↓',teclas:['↓','S'],botao:'▼'}; } else if(Math.abs(c.x+22-u.x)<80 && c.y<u.y && u.y-c.y<320) d={x:c.x+22,y:c.y-40,txt:'Pule embaixo e bata a cabeça na caixa ?',teclas:['↑','ESPAÇO'],botao:'PULAR'}; });
  if(!d) M.molas.forEach(function(m){ if(Math.abs(m.x+m.w/2-u.x)<80 && u.noChao) d={x:m.x+m.w/2,y:m.y-50,txt:'Pule na mola!'}; });
  if(!d) M.itens.forEach(function(it){ if(!it.pego && Math.abs(it.x-u.x)<110 && Math.abs(it.y-(u.y-40))<120) d={x:it.x,y:it.y-40,txt:{mel:'Pegue o mel para crescer',capa:'Pegue a capa!',bota:'Pegue a bota!',pinhas:'Pegue as pinhas!',patins:'Pegue os patins!'}[it.tipo]}; });
  if(!d) M.tijolos.forEach(function(b){ if(b.vivo && Math.abs(b.x+22-u.x)<50 && u.y-b.y<260 && u.y>b.y) d={x:b.x+22,y:b.y-40,txt:'Quebre o tijolo com a cabeça'}; });
  if(d&&d.y<150) d.y=150;
  J.dica=d;
}
function atualizaTutorial(dt){ var Tt=J.tut, L=J.nivel; Tt.t+=dt; var p=L.passos[Tt.i]; if(!p) return; if(p.ate(J)){ Tt.i++; Tt.t=0; SOM.fx('moeda'); if(Tt.i>=L.passos.length) J.tut=null; } }

/* ---------- fim de fase ---------- */
function fimDeFase(){
  var f=J.faseAtual, s=J.stats, total=Math.max(1,s.perguntas), razao=s.acertos/total;
  var estrelas= razao>=.9?3:(razao>=.7?2:1);
  J.fimFase={t:0,estrelas:estrelas}; J.estado='fimFase'; SOM.musica('vitoria'); SOM.fx('vitoria'); J.urso.estado='cheer'; J.urso.anim=0;
  if(!f.treino){ var ant=J.prog.fases[f.id]||{}; J.prog.fases[f.id]={estrelas:Math.max(ant.estrelas||0,estrelas),pontos:Math.max(ant.pontos||0,J.pontos),acertos:s.acertos,total:total,novo:!ant.estrelas}; J.prog.pontos=Object.keys(J.prog.fases).reduce(function(a,k){ return a+(J.prog.fases[k].pontos||0); },0); }
  else J.prog.treino=true;
  G.salva(); if(window.UI) UI.modoNivel(false);
  setTimeout(function(){ if(window.UI) UI.fimFase(f,estrelas,s.acertos,total,J.pontos,J.moedas); },1500);
}
function voltaMapa(){ var f=J.faseAtual, anda=f&&!f.treino&&J.prog.fases[f.id]&&J.prog.fases[f.id].novo&&f.id<10&&G.proximaFase()===f.id; if(f&&J.prog.fases[f.id]&&J.prog.fases[f.id].novo){ J.prog.fases[f.id].novo=false; G.salva(); } irMapa(anda?f.id:false); }
function irMapa(animaDe){
  J.estado='mapa'; J.nivel=null; J.mundo=null; J.chefe=null; J.tut=null; J.part=[]; J.clima=[]; J.faseAtual=null; J.t=0; J.dica=null; document.body.classList.remove('globo');
  A.LOOK.capa=null; A.LOOK.bota=false; A.LOOK.patins=false;
  var idx=G.proximaFase(); J.sel=idx; J.mapaAnim= animaDe?{de:animaDe-1,para:animaDe,t:0,dur:2.2}:null; if(J.mapaAnim) J.sel=animaDe-1;
  SOM.musica(J.prog.zerado?'final':'mapa'); G.hud();
  if(window.UI){ UI.modoNivel(false); UI.modoMapa(true); UI.hudArena(false); UI.cartaoMapa(J.mapaAnim?null:F.LISTA[J.sel]); }
}
function entraFase(idx){
  var f= idx===-1?F.TREINO:F.LISTA[idx]; if(!G.faseLiberada(f.id)){ SOM.fx('clique'); G.toast('Termine a fase anterior primeiro',1800); return; }
  if(window.UI){ UI.modoMapa(false); UI.cartaoMapa(null); } if(idx>=0) J.sel=idx; SOM.fx('iris');
  iris(f.mx,f.my,function(){ G.iniciaFase(f); if(!f.treino&&window.UI){ setTimeout(function(){ if(J.estado==='nivel'){ G.pausa(true); UI.cartaoRegra(f,function(){ G.pausa(false); }); } },650); } });
}
function iniciaTutorial(){ entraFase(-1); }

/* ---------- transição em íris ---------- */
function iris(x,y,meio){ J.trans={t:0,dur:.55,x:x,y:y,fase:'fecha',meio:meio}; }
function atualizaTrans(dt){ var tr=J.trans; if(!tr) return; tr.t+=dt; if(tr.fase==='fecha'&&tr.t>=tr.dur){ tr.fase='abre'; tr.t=0; if(tr.meio) tr.meio(); var u=J.urso; if(u&&J.estado==='nivel'){ tr.x=u.x-J.cam; tr.y=u.y-40; } else { tr.x=W/2; tr.y=H/2; } } else if(tr.fase==='abre'&&tr.t>=tr.dur) J.trans=null; }
function raioIris(){ var tr=J.trans; if(!tr) return 1e9; var k=Math.min(1,tr.t/tr.dur); return tr.fase==='fecha'? 1100*(1-k)*(1-k) : 1100*k*k; }

/* ---------- chefão (duelo de perguntas rápidas) ---------- */
function atualizaChefao(dt){
  var g=J.chefe, u=J.urso, L=J.nivel, R=G.ursoRet(); g.t+=dt;
  if(g.estado!=='idle' && g.t>.9 && g.estado!=='down') g.estado='idle';
  L.caixas.forEach(function(c){ if(c.respawn>0){ c.respawn-=dt; if(c.respawn<=0){ c.aberta=false; } } });
  for(var i=J.folhas.length-1;i>=0;i--){ var f=J.folhas[i]; f.t+=dt; var k=Math.min(1,f.t/f.dur); f.cx=f.x+(f.tx-f.x)*k; f.cy=f.y+(f.ty-f.y)*k-Math.sin(k*Math.PI)*120;
    if(k>=1){ J.folhas.splice(i,1); g.hp--; g.estado='hit'; g.t=0; SOM.fx('chefao'); J.shake=10; G.brilho(g.x,g.y-230,16,'#f87171'); if(g.hp<=0) vitoriaChefao(); } }
  if(g.hp<=0) return;
  var faseG= g.hp<=2?3:(g.hp<=5?2:1); g.fase=faseG;
  if(J.estado==='nivel'){ g.proxBola-=dt; if(g.proxBola<=0){ g.proxBola=(faseG===3?1.8:3.2)+Math.random()*1.2; g.estado='throw'; g.t=0; J.bolas.push({x:g.x-100,y:g.y-330,vx:-(150+Math.random()*60)*(faseG===3?1.3:1),vy:-120,r:16}); SOM.fx('clique'); }
    if(faseG>=2){ g.proxPisao=(g.proxPisao===undefined?3:g.proxPisao)-dt; if(g.proxPisao<=0){ g.proxPisao=faseG===3?3.2:4.5; g.estado='stomp'; g.t=0; J.shake=14; SOM.fx('chefao'); for(var k=0;k<3;k++){ L.pingentes.push({x:120+Math.random()*560,y:60,y0:60,estado:'tremendo',t:.2}); } G.toast('O Gigante bateu o pé: cuidado com os pingentes!',1800); } } }
  if(L.pingentes.length>12) L.pingentes.splice(0,L.pingentes.length-12);
  for(var b=J.bolas.length-1;b>=0;b--){ var bl=J.bolas[b]; bl.vy+=500*dt; bl.x+=bl.vx*dt; bl.y+=bl.vy*dt;
    if(bl.y>F.CHAO_Y-bl.r){ bl.vy=-Math.abs(bl.vy)*.45; bl.y=F.CHAO_Y-bl.r; bl.quiques=(bl.quiques||0)+1; }
    if(bl.x<-40||bl.quiques>2){ J.bolas.splice(b,1); continue; }
    if(J.estado==='nivel' && u.invT<=0 && u.tontoT<=0 && G.colideRet(R.x,R.y,R.w,R.h,bl.x-bl.r,bl.y-bl.r,bl.r*2,bl.r*2)){ J.bolas.splice(b,1); G.machucado(); G.toast('Plaft! Pule para desviar das bolas',1600); } }
}
function acertoChefao(c){ var g=J.chefe; J.folhas.push({x:c.x+c.w/2,y:c.y,tx:g.x,ty:g.y-230,t:0,dur:.8}); SOM.fx('folha'); }
function erroChefao(){ var g=J.chefe; g.estado='laugh'; g.t=0; SOM.fx('risada'); G.toast('O Gigante riu... mas não ganhou nada! Tente a próxima',2200); } /* sem cura: o chefão sempre termina */
function vitoriaChefao(){
  var g=J.chefe; g.estado='down'; g.t=0; J.bolas=[]; J.estado='vitoria'; J.vit={t:0}; SOM.musica(''); SOM.fx('vitoria'); J.urso.estado='cheer'; J.urso.anim=0;
  J.prog.fases[10]={estrelas:3,pontos:J.pontos,acertos:J.stats.acertos,total:J.stats.perguntas,novo:true}; J.prog.zerado=true; G.salva();
  if(window.UI) UI.modoNivel(false);
  setTimeout(function(){ J.estado='creditos'; J.t=0; SOM.musica('final'); if(window.UI) UI.creditos(); },4200);
}

/* ---------- partículas e clima ---------- */
var CORES_FESTA=['#f87171','#fbbf24','#4ade80','#60a5fa','#c084fc','#f472b6'];
function atualizaParticulas(dt){
  for(var i=J.part.length-1;i>=0;i--){ var p=J.part[i]; p.vida-=dt; if(p.vida<=0){ J.part.splice(i,1); continue; } if(p.g) p.vy+=900*dt; p.x+=p.vx*dt; p.y+=p.vy*dt; if(p.rot!==undefined) p.rot+=dt*4; }
  var cena=J.mundo?J.mundo.cena:(J.estado==='mapa'?'mapa':''); var tipo=cena&&A.CENAS[cena]?A.CENAS[cena].part:'';
  if(J.estado==='creditos'||J.estado==='vitoria'||J.estado==='fimFase'){
    if(Math.random()<.08){ var fx=100+Math.random()*760, fy=80+Math.random()*200, cor=CORES_FESTA[Math.floor(Math.random()*6)]; for(var k=0;k<22;k++){ var a=k/22*6.283; J.clima.push({x:fx,y:fy,vx:Math.cos(a)*(120+Math.random()*60),vy:Math.sin(a)*(120+Math.random()*60),vida:1.1,max:1.1,tipo:'fogo',cor:cor,r:3,g:1}); } }
    if(Math.random()<.5) J.clima.push({x:Math.random()*W,y:-10,vx:(Math.random()-.5)*40,vy:120+Math.random()*100,vida:4,max:4,tipo:'confete',cor:CORES_FESTA[Math.floor(Math.random()*6)],rot:Math.random()*6});
  }
  if(J.mundo&&J.mundo.vento&&Math.random()<.3) J.clima.push({x:W+10,y:Math.random()*H,vx:-200-Math.random()*100,vy:10,vida:5,max:5,tipo:'risco',cor:'rgba(255,255,255,.35)'});
  if(J.mundo&&J.mundo.nevoa&&Math.random()<.05&&J.clima.length<90) J.clima.push({x:W+40,y:300+Math.random()*180,vx:-30-Math.random()*20,vy:0,vida:18,max:18,tipo:'nevoa',r:25+Math.random()*30,alpha:.45});
  if(tipo && J.clima.length<90){
    var n=tipo==='nevoa'?.08:(tipo==='nuvem'?.01:(tipo==='vagalume'?.1:(tipo==='pingo'?.06:.45)));
    if(Math.random()<n){
      var p2={x:Math.random()*W,y:-20,vx:0,vy:0,vida:9,max:9,tipo:tipo,rot:Math.random()*6,alpha:1};
      if(tipo==='folha'){ p2.vx=-40-Math.random()*40; p2.vy=50+Math.random()*50; p2.r=5+Math.random()*4; p2.cor=['#dc2626','#ea580c','#f59e0b'][Math.floor(Math.random()*3)]; }
      else if(tipo==='neve'){ p2.vx=-20+Math.random()*10; p2.vy=40+Math.random()*50; p2.r=1.5+Math.random()*2.5; }
      else if(tipo==='pingo'){ p2.y=90; p2.vy=200+Math.random()*100; p2.r=2; p2.tipo='neve'; p2.cor='#7dd3fc'; p2.vida=p2.max=3; }
      else if(tipo==='nevoa'){ p2.x=W+40; p2.y=300+Math.random()*180; p2.vx=-30-Math.random()*20; p2.r=20+Math.random()*30; p2.alpha=.5; p2.vida=p2.max=18; }
      else if(tipo==='polen'){ p2.y=Math.random()*H; p2.vx=-30; p2.vy=-10+Math.random()*20; p2.r=1.5+Math.random(); p2.vida=p2.max=6; }
      else if(tipo==='vagalume'){ p2.y=150+Math.random()*250; p2.vx=(Math.random()-.5)*30; p2.vy=(Math.random()-.5)*20; p2.r=5+Math.random()*4; p2.vida=p2.max=3+Math.random()*3; }
      else if(tipo==='faisca'){ p2.y=H; p2.vx=(Math.random()-.5)*60; p2.vy=-120-Math.random()*120; p2.r=1.5+Math.random()*1.5; p2.cor=Math.random()<.5?'#fb923c':'#fde68a'; p2.vida=p2.max=1.2; }
      else if(tipo==='nuvem'){ p2.x=W+80; p2.y=40+Math.random()*120; p2.vx=-12-Math.random()*10; p2.r=.8+Math.random()*.8; p2.vida=p2.max=90; }
      J.clima.push(p2);
    }
  }
  for(var j=J.clima.length-1;j>=0;j--){ var q=J.clima[j]; q.vida-=dt; if(q.g) q.vy+=400*dt; q.x+=q.vx*dt; q.y+=q.vy*dt; if(q.rot!==undefined) q.rot+=dt*2; if(q.tipo==='folha') q.x+=Math.sin(J.t*3+q.rot)*1.2; if(q.tipo==='vagalume') q.alpha=.4+.6*Math.abs(Math.sin(J.t*3+q.rot)); if(q.vida<=0||q.y>H+40||q.x<-120) J.clima.splice(j,1); }
}
function atualizaCamera(dt){ var M=J.mundo, u=J.urso; var alvo=u.x-W*.42+u.dir*30; alvo=Math.max(0,Math.min(M.w-W,alvo)); J.cam+=(alvo-J.cam)*Math.min(1,dt*5); var ay=Math.max(0,Math.min(M.h-H,u.y-H*.62)); J.camY+=(ay-J.camY)*Math.min(1,dt*4); }

/* ---------- mapa e globo ---------- */
function atualizaMapa(dt){ if(J.mapaAnim){ var m=J.mapaAnim; m.t+=dt; if(m.t>=m.dur){ J.mapaAnim=null; J.sel=-2; seleciona(m.para); SOM.fx('destrava'); G.toast('Próxima parada: '+F.LISTA[m.para].nome,2200); } } }
function mapaMove(d){ if(J.mapaAnim) return; var n=F.LISTA.length, s=J.sel<0?0:J.sel; s=(s+d+n)%n; seleciona(s); SOM.fx('clique'); }
function noEm(lx,ly){ if(Math.hypot(lx-F.TREINO.mx,ly-F.TREINO.my)<36) return -1; for(var i=0;i<F.LISTA.length;i++){ var f=F.LISTA[i]; if(Math.hypot(lx-f.mx,ly-f.my)<36) return i; } return null; }
function seleciona(i){ if(i===J.sel) return; J.sel=i; if(window.UI) UI.cartaoMapa(i===-1?F.TREINO:F.LISTA[i]); }
function mapaToque(lx,ly){
  if(J.mapaAnim) return; var i=noEm(lx,ly); if(i===null) return;
  if(i===J.sel) entraFase(i); else { seleciona(i); SOM.fx('clique'); }
}
function mapaHover(lx,ly){ if(J.estado!=='mapa'||J.mapaAnim) return; var i=noEm(lx,ly); if(i!==null) seleciona(i); }
function iniciaGlobo(){ J.estado='globo'; J.t=0; J.globo={t:0,zoom:false,zt:0}; SOM.musica('mapa'); document.body.classList.add('globo'); if(window.UI){ UI.modoNivel(false); UI.modoMapa(false); UI.cartaoMapa(null); } }
function atualizaGlobo(dt){ var g=J.globo; g.t+=dt; if(!g.zoom&&g.t>2.6) g.zoom=true; if(g.zoom){ g.zt+=dt; if(g.zt>=1.7){ if(!J.prog.customizado){ J.estado='custom'; if(window.UI) UI.customizar(function(){ J.prog.customizado=true; G.salva(); irMapa(false); }); } else irMapa(false); } } }

/* ---------- laço principal ---------- */
var ultimo=0;
function passo(ts){
  requestAnimationFrame(passo);
  var dt=Math.min(.033,(ts-ultimo)/1000||0); ultimo=ts;
  if(J.pausado){ if(window.CENA) CENA.desenha(); return; }
  J.t+=dt; J.tFase+=dt;
  if(J.shake>0) J.shake=Math.max(0,J.shake-dt*30); if(J.flash>0) J.flash=Math.max(0,J.flash-dt*2);
  atualizaTrans(dt);
  switch(J.estado){
    case 'nivel': if(!J.trans||J.trans.fase==='abre'){ G.fisica(dt); if(J.estado==='nivel') atualizaNivel(dt); if(J.chefe&&J.estado==='nivel') atualizaChefao(dt); if(J.mundo&&J.estado!=='mapa') atualizaCamera(dt); } break;
    case 'cano': break;
    case 'arena': if(window.ARENA) ARENA.atualiza(dt); break;
    case 'pergunta': if(window.ARENA) ARENA.atualizaDuelo(dt); if(J.urso.cheerT>0){ J.urso.cheerT-=dt; J.urso.anim+=dt; } if(J.chefe){ J.chefe.t+=dt; if(J.chefe.estado!=='idle'&&J.chefe.t>.9) J.chefe.estado='idle'; } break;
    case 'fimFase': J.fimFase.t+=dt; J.urso.anim+=dt; break;
    case 'vitoria': J.vit.t+=dt; J.urso.anim+=dt; if(J.chefe) J.chefe.t+=dt; break;
    case 'mapa': atualizaMapa(dt); break;
    case 'globo': atualizaGlobo(dt); break;
  }
  atualizaParticulas(dt);
  if(window.CENA) CENA.desenha();
}

/* ---------- init / API pública ---------- */
function init(){
  var cv=document.getElementById('game'); G.setCanvas(cv);
  G.carrega(); G.redimensiona(); window.addEventListener('resize',G.redimensiona);
  iniciaGlobo(); requestAnimationFrame(passo);
}
function toque(cx,cy){ var p=G.paraLogico(cx,cy); if(J.estado==='globo'){ if(!J.globo.zoom){ J.globo.zoom=true; SOM.fx('iris'); } return true; } if(J.estado==='mapa'&&p.y>60&&!J.trans){ mapaToque(p.x,p.y); return true; } return false; }
function confirmar(){ if(J.estado==='globo'){ if(!J.globo.zoom){ J.globo.zoom=true; SOM.fx('iris'); } return true; } if(J.estado==='mapa'&&!J.trans){ entraFase(J.sel); return true; } return false; }
function pausa(v){ J.pausado=!!v; }

G.init=init; G.toque=toque; G.mapaHover=mapaHover; G.seleciona=seleciona; G.confirmar=confirmar; G.mapaMove=mapaMove; G.pausa=pausa; G.irMapa=function(){ irMapa(false); }; G.voltaMapa=voltaMapa; G.iniciaTutorial=iniciaTutorial; G.entraFase=entraFase;
G.acertoChefao=acertoChefao; G.erroChefao=erroChefao; G.faltam=faltam; G.alvoSeta=alvoSeta; G.raioIris=raioIris; G.iris=iris; G.fimDeFase=fimDeFase; G.canoSob=canoSob; G.parDoCano=parDoCano;
G.jogarDeNovo=function(){ if(J.faseAtual) G.iniciaFase(J.faseAtual); };
G.abrirCustom=function(){ if(J.estado!=='mapa') return; J.estado='custom'; if(window.UI){ UI.cartaoMapa(null); UI.customizar(function(){ G.salva(); irMapa(false); }); } };
G.irGlobo=function(){ J.nivel=null; J.mundo=null; J.chefe=null; J.faseAtual=null; A.LOOK.capa=null; A.LOOK.bota=false; A.LOOK.patins=false; if(window.UI){ UI.cartaoMapa(null); UI.hudArena(false); } G.hud(); iniciaGlobo(); };
})(window.JOGO);
