/* ============================================================
   LP3_jornada_motor.js — o jogo em si: máquina de estados
   (intro → mapa → fase → pergunta → fim de fase → ... → chefão →
   créditos), física com delta-time limitado, câmera, colisões,
   fila de perguntas por tema (sem repetir enquanto houver nova;
   errada volta pro fim da fila), progresso em localStorage.
   Depende de: LP3 (banco), SOM, ARTE, FASES. A UI (DOM) fica em
   LP3_jornada_ui.js e conversa por window.UI.
   ============================================================ */
window.JOGO = (function(){
'use strict';
var W=960, H=540, A=window.ARTE, F=window.FASES;
var GRAV=1900, VPULO=-700, VAND=270, URSO_W=36, URSO_H=88;
var canvas, ctx, escala=1, offX=0, offY=0, dpr=1;
var J={
  estado:'boot', pausado:false, t:0, tFase:0,
  in:{left:false,right:false,jump:false}, jumpBuf:0, jumpSolto:true,
  prog:null, nivel:null, urso:null, cam:0, part:[], clima:[], shake:0,
  faseAtual:null, sel:0, mapaAnim:null, intro:0, flash:0,
  fila:[], ultimaId:null, caixaAtual:null, pergRestantes:0, caixaErrou:false,
  stats:{perguntas:0,primeira:0}, moedas:0, tut:null, arremesso:null, fimFase:null, chefe:null, toastT:0
};
var CHAVE='lp3_jornada_v1';

/* ---------- progresso ---------- */
function carrega(){
  var p=null; try{ p=JSON.parse(localStorage.getItem(CHAVE)||'null'); }catch(e){}
  if(!p||typeof p!=='object') p={};
  p.fases=p.fases||{}; p.moedas=p.moedas||0; p.intro=!!p.intro; p.tutorial=!!p.tutorial; p.zerado=!!p.zerado;
  J.prog=p; J.moedas=p.moedas; return p;
}
function salva(){ try{ J.prog.moedas=J.moedas; localStorage.setItem(CHAVE,JSON.stringify(J.prog)); }catch(e){} }
function faseFeita(id){ return !!(J.prog.fases[id]&&J.prog.fases[id].estrelas); }
function faseLiberada(id){ if(J.prog.zerado) return true; if(id===1) return true; return faseFeita(id-1); }
function proximaFase(){ for(var i=0;i<F.LISTA.length;i++){ if(!faseFeita(F.LISTA[i].id)) return i; } return F.LISTA.length-1; }
function recomecar(){ J.prog={fases:{},moedas:0,intro:true,tutorial:true,zerado:false}; J.moedas=0; salva(); J.sel=0; irMapa(false); }

/* ---------- utilidades ---------- */
function embaralha(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i];a[i]=a[j];a[j]=t; } return a; }
function emite(n,fn){ for(var i=0;i<n;i++) J.part.push(fn(i)); }
function toast(txt,dur){ if(window.UI) UI.toast(txt,dur||2200); }
function hud(){ if(window.UI) UI.hud(J.faseAtual?J.faseAtual.nome:'A Jornada do Urso', J.moedas); }

/* ---------- canvas / escala ---------- */
function redimensiona(){
  var vw=window.innerWidth, vh=window.innerHeight;
  dpr=Math.min(2,window.devicePixelRatio||1);
  escala=Math.min(vw/W,vh/H);
  var cw=Math.floor(W*escala), ch=Math.floor(H*escala);
  canvas.style.width=cw+'px'; canvas.style.height=ch+'px';
  canvas.width=Math.floor(cw*dpr); canvas.height=Math.floor(ch*dpr);
  offX=Math.floor((vw-cw)/2); offY=Math.floor((vh-ch)/2);
  var ui=document.getElementById('ui'); ui.style.left=offX+'px'; ui.style.top=offY+'px'; ui.style.transform='scale('+escala+')';
  document.body.classList.toggle('portrait', vh>vw*1.05);
}
function paraLogico(cx,cy){ return {x:(cx-offX)/escala, y:(cy-offY)/escala}; }

/* ---------- fila de perguntas ---------- */
function montaFila(temas){
  var listas=temas.map(function(k){ return embaralha(LP3.doTema(k)); });
  var fila=[], mais=true;
  while(mais){ mais=false; for(var i=0;i<listas.length;i++){ if(listas[i].length){ fila.push(listas[i].shift()); mais=true; } } }
  J.fila=fila; J.usadas=[];
}
function proximaPergunta(facil){
  if(facil){ var f=LP3.doTema('conto'); return f[Math.floor(Math.random()*Math.min(2,f.length))]; }
  if(!J.fila.length){ J.fila=embaralha(J.usadas); J.usadas=[]; }
  if(J.fila.length>1 && J.fila[0].id===J.ultimaId){ J.fila.push(J.fila.shift()); }
  var it=J.fila.shift(); J.ultimaId=it.id; return it;
}
function respondeu(item,acertou){ if(acertou) J.usadas.push(item); else J.fila.push(item); }

/* ---------- carregar fase ---------- */
function novoUrso(x){ return {x:x,y:F.CHAO_Y,vx:0,vy:0,noChao:true,dir:1,estado:'idle',anim:0,tontoT:0,invT:0}; }
function iniciaFase(f){
  J.faseAtual=f;
  var L= f.tutorial?F.tutorial(): (f.chefao?F.chefao():F.gerar(f));
  J.nivel=L; J.urso=novoUrso(L.inicioX); J.cam=0; J.part=[]; J.clima=[]; J.shake=0; J.tFase=0; J.fimFase=null; J.vit=null; J.arremesso=null; J.bolas=[]; J.folhas=[];
  J.sub=0; J.respawn=L.inicioX; J.stats={perguntas:0,primeira:0}; J.caixaErrou=false; J.ultimaId=null;
  L.caixas.forEach(function(c){ c.aberta=false; c.bump=0; c.cooldown=0; c.feitas=0; });
  L.inimigos.forEach(function(e){ e.achatado=false; e.morto=false; e.tAch=0; });
  montaFila(f.temas);
  J.tut= L.passos?{i:0,t:0}:null;
  J.chefe= L.gigante?L.gigante:null; if(J.chefe){ J.chefe.hp=J.chefe.max; J.chefe.estado='idle'; J.chefe.t=0; J.chefe.proxBola=3; J.bolas=[]; J.folhas=[]; }
  J.estado='nivel'; J.flash=1;
  SOM.musica(A.CENAS[L.cena].musica); hud();
  if(window.UI) UI.modoNivel(true);
}

/* ---------- física do urso ---------- */
function colideRet(ax,ay,aw,ah,bx,by,bw,bh){ return ax<bx+bw && ax+aw>bx && ay<by+bh && ay+ah>by; }
function fisica(dt){
  var u=J.urso, L=J.nivel;
  if(u.tontoT>0){ u.tontoT-=dt; u.estado='dizzy'; u.vx=0; u.anim+=dt; return; }
  var ax=0; if(J.in.left) ax-=1; if(J.in.right) ax+=1;
  if(J.tut && J.tut.i===0 && ax<0) ax=0;
  u.vx=ax*VAND; if(ax) u.dir=ax>0?1:-1;
  /* pulo com buffer e altura variável */
  if(J.in.jump && J.jumpSolto && u.noChao){ u.vy=VPULO; u.noChao=false; J.jumpSolto=false; SOM.fx('pulo'); emite(5,function(){ return {x:u.x+(Math.random()-.5)*20,y:u.y,vx:(Math.random()-.5)*60,vy:-Math.random()*40,vida:.4,max:.4,tipo:'nevoa',r:5}; }); }
  if(!J.in.jump){ J.jumpSolto=true; if(u.vy<-250) u.vy=-250; }
  u.vy+=GRAV*dt; if(u.vy>900) u.vy=900;
  var nx=u.x+u.vx*dt, ny=u.y+u.vy*dt;
  var hw=URSO_W/2;
  /* barreiras e caixas são sólidas horizontalmente */
  var solidos=[];
  L.barreiras.forEach(function(b){ if(b.alpha>.2) solidos.push({x:b.x,y:b.y-b.h,w:40,h:b.h}); });
  L.caixas.forEach(function(c){ solidos.push({x:c.x,y:c.y,w:c.w,h:c.h,caixa:c}); });
  if(J.chefe) solidos.push({x:J.chefe.x-60,y:J.chefe.y-300,w:120,h:300});
  if(nx<hw) nx=hw; if(nx>L.w-hw) nx=L.w-hw;
  solidos.forEach(function(s){
    if(colideRet(nx-hw,u.y-URSO_H+4,URSO_W,URSO_H-8,s.x,s.y,s.w,s.h)){ nx = u.vx>0? s.x-hw-.01 : s.x+s.w+hw+.01; }
  });
  u.x=nx;
  /* vertical: chão e plataformas (plataformas só por cima) */
  var noChao=false;
  if(u.vy>=0){
    var piso=null;
    L.segs.concat(L.plats).forEach(function(s){
      if(u.x+hw>s.x && u.x-hw<s.x+s.w && u.y<=s.y+2 && ny>=s.y){ if(piso===null||s.y<piso) piso=s.y; }
    });
    solidos.forEach(function(s){ if(u.x+hw>s.x && u.x-hw<s.x+s.w && u.y<=s.y+2 && ny>=s.y){ if(piso===null||s.y<piso) piso=s.y; } });
    if(piso!==null){ ny=piso; u.vy=0; noChao=true; }
  } else {
    /* subindo: cabeça bate em caixa */
    var topo=ny-URSO_H;
    solidos.forEach(function(s){
      if(u.x+hw-6>s.x && u.x-hw+6<s.x+s.w && topo<=s.y+s.h && (u.y-URSO_H)>=s.y+s.h-2){
        ny=s.y+s.h+URSO_H; u.vy=120;
        if(s.caixa) bateCaixa(s.caixa);
      }
    });
  }
  u.y=ny; u.noChao=noChao;
  if(!noChao) u.estado=u.vy<0?'jump':'fall'; else u.estado=Math.abs(u.vx)>5?'walk':'idle';
  u.anim+=dt;
  if(u.y>H+80) caiuNoBuraco();
}
function caiuNoBuraco(){
  var u=J.urso; SOM.fx('tonto'); J.shake=6;
  u.x=J.respawn; u.y=F.CHAO_Y; u.vx=0; u.vy=0; u.tontoT=.7; u.invT=1; J.flash=.8;
  toast('Opa! De volta ao checkpoint');
}

/* ---------- caixas "?" e o quadro da pergunta ---------- */
function bateCaixa(c){
  if(c.aberta||c.cooldown>0||J.estado!=='nivel') return;
  c.bump=14; c.cooldown=.5; SOM.fx('plim');
  J.caixaAtual=c; J.pergRestantes=c.n-c.feitas; J.caixaErrou=false;
  J.in.left=J.in.right=J.in.jump=false;
  J.estado='pergunta';
  setTimeout(abrePergunta,350);
}
function abrePergunta(){
  var c=J.caixaAtual; if(!c) return;
  var item=proximaPergunta(c.facil);
  J.itemAtual=item; J.stats.perguntas++;
  UI.pergunta(item,{seq:c.feitas+1,total:c.n,chefao:!!J.chefe},function(acertou){
    respondeu(item,acertou);
    if(acertou){
      if(J.chefe) J.stats.primeira++;
      J.moedas+=J.chefe?3:1; hud(); SOM.fx('acerto');
      var cx=c.x+c.w/2, cy=c.y;
      emite(14,function(i){ return {x:cx,y:cy,vx:(Math.random()-.5)*360,vy:-200-Math.random()*300,vida:1.1,max:1.1,tipo:i%3?'moeda':'estrela',r:7,rot:Math.random()*6,g:1}; });
      J.urso.estado='cheer'; J.urso.cheerT=1.4;
      if(J.chefe) acertoChefao(c);
    } else {
      c.slotErr=c.slotErr||{}; c.slotErr[c.feitas]=1; if(J.chefe) J.stats.erros=(J.stats.erros||0)+1;
      SOM.fx('erro'); J.shake=10; J.caixaErrou=true;
      if(J.chefe) erroChefao();
    }
  },function(){ /* Continuar */
    if(J.caixaErrou){
      if(J.chefe){ c.cooldown=.8; J.estado='nivel'; J.caixaAtual=null; }
      else arremessa();
      return;
    }
    c.feitas++;
    if(c.feitas<c.n){ J.pergRestantes=c.n-c.feitas; setTimeout(abrePergunta,150); return; }
    c.aberta=true; c.feitas=0; J.caixaAtual=null; J.estado='nivel';
    J.stats.primeira+=c.n-Object.keys(c.slotErr||{}).length; c.slotErr=null;
    if(J.chefe){ c.cooldown=1.6; c.aberta=false; c.respawn=1.6; return; }
    checaBarreira(c.sub);
  });
}
function checaBarreira(sub){
  var L=J.nivel, falta=L.caixas.filter(function(k){ return k.sub===sub&&!k.aberta; }).length;
  if(falta>0){ toast(falta>1?('Faltam '+falta+' caixas nesta parte'):'Falta 1 caixa nesta parte'); return; }
  L.barreiras.forEach(function(b){ if(b.sub===sub&&b.alpha>0){ b.sumindo=true; } });
  SOM.fx('destrava'); toast('A barreira sumiu! Siga em frente →',2600);
}

/* ---------- errou: arremesso em arco de volta ---------- */
function arremessa(){
  var u=J.urso, L=J.nivel;
  var alvoSub=Math.max(0,(J.caixaAtual?J.caixaAtual.sub:J.sub)-1);
  var alvoX= L.subInicio[alvoSub]!==undefined? Math.max(L.inicioX, L.subInicio[alvoSub]+120) : L.inicioX;
  if(J.faseAtual.tutorial) alvoX=L.inicioX;
  J.caixaAtual=null;
  J.arremesso={x0:u.x,y0:u.y,x1:alvoX,y1:F.CHAO_Y,t:0,dur:Math.min(2.2,.9+Math.abs(u.x-alvoX)/1400)};
  J.estado='arremesso'; SOM.fx('arremesso'); J.shake=12; u.estado='thrown';
  toast('Uooou! De volta para tentar de novo',2200);
}
function atualizaArremesso(dt){
  var a=J.arremesso, u=J.urso; a.t+=dt; var k=Math.min(1,a.t/a.dur);
  u.x=a.x0+(a.x1-a.x0)*k; u.y=a.y0+(a.y1-a.y0)*k-Math.sin(k*Math.PI)*220; u.anim=a.t;
  if(Math.random()<.5) J.part.push({x:u.x,y:u.y-40,vx:(Math.random()-.5)*40,vy:-20,vida:.5,max:.5,tipo:'estrela',r:5,rot:Math.random()*6});
  if(k>=1){ u.y=F.CHAO_Y; u.vx=0; u.vy=0; u.tontoT=1.1; u.dir=1; J.estado='nivel'; J.shake=8; SOM.fx('pisao'); emite(10,function(){ return {x:u.x+(Math.random()-.5)*40,y:u.y,vx:(Math.random()-.5)*160,vy:-Math.random()*120,vida:.6,max:.6,tipo:'nevoa',r:8}; }); }
}

/* ---------- checkpoints, barreiras, inimigos, mastro ---------- */
function atualizaNivel(dt){
  var L=J.nivel, u=J.urso;
  if(u.cheerT>0){ u.cheerT-=dt; u.estado='cheer'; u.anim+=dt; }
  if(u.invT>0) u.invT-=dt;
  L.caixas.forEach(function(c){ if(c.bump>0) c.bump=Math.max(0,c.bump-dt*60); if(c.cooldown>0) c.cooldown-=dt; if(c.flutua){ c.y=c.y0===undefined?(c.y0=c.y):c.y0+Math.sin(J.t*1.6+c.fase0)*10; } });
  L.barreiras.forEach(function(b){ if(b.sumindo&&b.alpha>0){ b.alpha-=dt*1.2; if(Math.random()<.6) J.part.push({x:b.x+Math.random()*40,y:b.y-Math.random()*b.h,vx:(Math.random()-.5)*80,vy:-60-Math.random()*60,vida:.7,max:.7,tipo:b.tipo==='gelo'?'neve':'folha',r:4,cor:'#a16207'}); } });
  L.checkpoints.forEach(function(cp){ if(!cp.acesa&&u.x>cp.x){ cp.acesa=true; J.respawn=cp.x; J.sub=cp.sub+1; SOM.fx('checkpoint'); toast('Checkpoint!',1500); emite(12,function(){ return {x:cp.x,y:cp.y-80,vx:(Math.random()-.5)*200,vy:-100-Math.random()*150,vida:.9,max:.9,tipo:'estrela',r:6,rot:Math.random()*6,g:1}; }); } });
  L.inimigos.forEach(function(e){
    if(e.morto) return;
    if(e.achatado){ e.tAch-=dt; if(e.tAch<=0) e.morto=true; return; }
    e.x+=e.dir*e.v*dt; if(e.x<e.x0){ e.x=e.x0; e.dir=1; } if(e.x>e.x1){ e.x=e.x1; e.dir=-1; }
    if(u.invT>0||u.tontoT>0||J.estado!=='nivel') return;
    if(colideRet(u.x-14,u.y-URSO_H+10,28,URSO_H-10,e.x-16,e.y-34,32,34)){
      if(u.vy>50 && u.y<e.y-18){ e.achatado=true; e.tAch=.7; u.vy=-380; SOM.fx('pisao'); J.moedas++; hud(); emite(6,function(){ return {x:e.x,y:e.y-20,vx:(Math.random()-.5)*200,vy:-100-Math.random()*100,vida:.7,max:.7,tipo:'estrela',r:5,rot:1,g:1}; }); }
      else { empurrao(); }
    }
  });
  if(L.mastro && u.x>L.mastro.x-6 && J.estado==='nivel') fimDeFase();
  if(J.tut) atualizaTutorial(dt);
}
function empurrao(){
  var u=J.urso; SOM.fx('tonto'); J.shake=8; u.invT=1.5;
  J.arremesso={x0:u.x,y0:u.y,x1:Math.max(J.respawn,u.x-260),y1:F.CHAO_Y,t:0,dur:.7};
  J.estado='arremesso'; u.estado='thrown'; toast('Ai! Pule em cima dos bichos',1800);
}
function atualizaTutorial(dt){
  var T=J.tut, L=J.nivel; T.t+=dt; var p=L.passos[T.i]; if(!p) return;
  if(p.ate(J)){ T.i++; T.t=0; SOM.fx('moeda'); if(T.i>=L.passos.length){ J.tut=null; } }
}

/* ---------- fim de fase ---------- */
function fimDeFase(){
  var f=J.faseAtual, s=J.stats;
  var acertosPrimeira=s.primeira, total= J.chefe? Math.max(1,s.primeira+(s.erros||0)) : Math.max(1,J.nivel.caixas.reduce(function(a,c){return a+c.n;},0));
  var razao=acertosPrimeira/total, estrelas= razao>=.99?3:(razao>=.6?2:1);
  J.fimFase={t:0,estrelas:estrelas,acertos:acertosPrimeira,total:total};
  J.estado='fimFase'; SOM.fx('vitoria'); J.urso.estado='cheer'; J.urso.anim=0;
  if(!f.tutorial){
    var ant=J.prog.fases[f.id]||{}; J.prog.fases[f.id]={estrelas:Math.max(ant.estrelas||0,estrelas),acertos:acertosPrimeira,total:total,novo:!ant.estrelas};
  } else { J.prog.tutorial=true; }
  salva();
  if(window.UI) UI.modoNivel(false);
  setTimeout(function(){ if(window.UI) UI.fimFase(f,estrelas,acertosPrimeira,total); },1400);
}
function voltaMapa(){
  var f=J.faseAtual; var destravou = f && !f.tutorial && J.prog.fases[f.id] && J.prog.fases[f.id].novo && f.id<10;
  if(destravou){ J.prog.fases[f.id].novo=false; salva(); }
  irMapa(destravou? f.id : false);
}
function irMapa(animaDe){
  J.estado='mapa'; J.nivel=null; J.chefe=null; J.tut=null; J.part=[]; J.faseAtual=null; J.t=0;
  var idx=proximaFase(); J.sel=idx;
  J.mapaAnim= animaDe? {de:animaDe-1,para:animaDe,t:0,dur:2.2}:null;
  if(J.mapaAnim) J.sel=animaDe-1;
  SOM.musica(J.prog.zerado?'final':'mapa'); hud();
  if(window.UI){ UI.modoNivel(false); UI.modoMapa(true); }
}
function entraFase(idx){
  var f=F.LISTA[idx]; if(!faseLiberada(f.id)) { SOM.fx('clique'); toast('Termine a fase anterior primeiro',1800); return; }
  if(window.UI) UI.modoMapa(false);
  J.sel=idx; iniciaFase(f);
}
function iniciaTutorial(){ if(window.UI){ UI.modoMapa(false); } iniciaFase({id:0,nome:'Como jogar',cena:'floresta',temas:['conto'],tutorial:true}); }

/* ---------- chefão ---------- */
function acertoChefao(c){
  var g=J.chefe; J.folhas.push({x:c.x+c.w/2,y:c.y,tx:g.x,ty:g.y-230,t:0,dur:.8}); SOM.fx('folha');
}
function erroChefao(){
  var g=J.chefe; g.estado='laugh'; g.t=0; SOM.fx('risada'); if(g.hp<g.max) g.hp++;
  toast('O Gigante riu e recuperou 1 ponto!',2200);
}
function atualizaChefao(dt){
  var g=J.chefe, u=J.urso, L=J.nivel; g.t+=dt;
  if(g.estado!=='idle' && g.t>.9 && g.estado!=='down') g.estado='idle';
  L.caixas.forEach(function(c){ if(c.respawn>0){ c.respawn-=dt; if(c.respawn<=0){ c.aberta=false; c.feitas=0; } } });
  /* folhas voando até o Gigante */
  for(var i=J.folhas.length-1;i>=0;i--){ var f=J.folhas[i]; f.t+=dt; var k=Math.min(1,f.t/f.dur); f.cx=f.x+(f.tx-f.x)*k; f.cy=f.y+(f.ty-f.y)*k-Math.sin(k*Math.PI)*120;
    if(k>=1){ J.folhas.splice(i,1); g.hp--; g.estado='hit'; g.t=0; SOM.fx('chefao'); J.shake=10; emite(16,function(){ return {x:g.x,y:g.y-230,vx:(Math.random()-.5)*400,vy:-100-Math.random()*300,vida:1,max:1,tipo:'estrela',r:7,rot:Math.random()*6,g:1,cor:'#f87171'}; });
      if(g.hp<=0){ vitoriaChefao(); } } }
  if(g.hp<=0) return;
  /* bolas de neve lentas */
  if(J.estado==='nivel'){ g.proxBola-=dt; if(g.proxBola<=0){ g.proxBola=3.2+Math.random()*1.5; g.estado='throw'; g.t=0; J.bolas.push({x:g.x-100,y:g.y-330,vx:-(150+Math.random()*60),vy:-120,r:16}); SOM.fx('clique'); } }
  for(var b=J.bolas.length-1;b>=0;b--){ var bl=J.bolas[b]; bl.vy+=500*dt; bl.x+=bl.vx*dt; bl.y+=bl.vy*dt;
    if(bl.y>F.CHAO_Y-bl.r){ bl.vy=-Math.abs(bl.vy)*.45; bl.y=F.CHAO_Y-bl.r; bl.quiques=(bl.quiques||0)+1; emite(4,function(){ return {x:bl.x,y:bl.y+10,vx:(Math.random()-.5)*120,vy:-60,vida:.4,max:.4,tipo:'neve',r:3}; }); }
    if(bl.x<-40||bl.quiques>2){ J.bolas.splice(b,1); continue; }
    if(J.estado==='nivel' && u.invT<=0 && u.tontoT<=0 && colideRet(u.x-14,u.y-URSO_H+10,28,URSO_H-10,bl.x-bl.r,bl.y-bl.r,bl.r*2,bl.r*2)){
      J.bolas.splice(b,1); u.invT=1.4; u.tontoT=.6; u.x=Math.max(60,u.x-90); u.vy=-200; u.noChao=false; SOM.fx('tonto'); J.shake=6; toast('Plaft! Pule para desviar das bolas',1600);
      emite(10,function(){ return {x:u.x,y:u.y-50,vx:(Math.random()-.5)*200,vy:-Math.random()*150,vida:.6,max:.6,tipo:'neve',r:4}; }); } }
}
function vitoriaChefao(){
  var g=J.chefe; g.estado='down'; g.t=0; J.bolas=[]; J.estado='vitoria'; J.vit={t:0}; SOM.musica(''); SOM.fx('vitoria');
  J.urso.estado='cheer'; J.urso.anim=0;
  J.prog.fases[10]={estrelas:3,acertos:J.stats.primeira,total:J.stats.primeira+(J.stats.erros||0),novo:true}; J.prog.zerado=true; salva();
  if(window.UI) UI.modoNivel(false);
  setTimeout(function(){ J.estado='creditos'; J.t=0; SOM.musica('final'); if(window.UI) UI.creditos(); },4200);
}

/* ---------- partículas e clima ---------- */
var CORES_FESTA=['#f87171','#fbbf24','#4ade80','#60a5fa','#c084fc','#f472b6'];
function atualizaParticulas(dt){
  for(var i=J.part.length-1;i>=0;i--){ var p=J.part[i]; p.vida-=dt; if(p.vida<=0){ J.part.splice(i,1); continue; } if(p.g) p.vy+=900*dt; p.x+=p.vx*dt; p.y+=p.vy*dt; if(p.rot!==undefined) p.rot+=dt*4; }
  var cena=J.nivel?J.nivel.cena:(J.estado==='mapa'?'mapa':''); var tipo=cena&&A.CENAS[cena]?A.CENAS[cena].part:'';
  if(J.estado==='creditos'||J.estado==='vitoria'||J.estado==='fimFase'){
    if(Math.random()<.08){ var fx=100+Math.random()*760, fy=80+Math.random()*200, cor=CORES_FESTA[Math.floor(Math.random()*6)]; for(var k=0;k<22;k++){ var a=k/22*6.283; J.clima.push({x:fx,y:fy,vx:Math.cos(a)*(120+Math.random()*60),vy:Math.sin(a)*(120+Math.random()*60),vida:1.1,max:1.1,tipo:'fogo',cor:cor,r:3,g:1}); } }
    if(Math.random()<.5) J.clima.push({x:Math.random()*W,y:-10,vx:(Math.random()-.5)*40,vy:120+Math.random()*100,vida:4,max:4,tipo:'confete',cor:CORES_FESTA[Math.floor(Math.random()*6)],rot:Math.random()*6});
  }
  if(tipo && J.clima.length<90){
    var n=tipo==='nevoa'?.08:(tipo==='nuvem'?.01:(tipo==='vagalume'?.1:.45));
    if(Math.random()<n){
      var p2={x:Math.random()*W,y:-20,vx:0,vy:0,vida:9,max:9,tipo:tipo,rot:Math.random()*6,alpha:1};
      if(tipo==='folha'){ p2.vx=-40-Math.random()*40; p2.vy=50+Math.random()*50; p2.r=5+Math.random()*4; p2.cor=['#dc2626','#ea580c','#f59e0b'][Math.floor(Math.random()*3)]; }
      else if(tipo==='neve'){ p2.vx=-20+Math.random()*10; p2.vy=40+Math.random()*50; p2.r=1.5+Math.random()*2.5; }
      else if(tipo==='nevoa'){ p2.x=W+40; p2.y=300+Math.random()*180; p2.vx=-30-Math.random()*20; p2.r=20+Math.random()*30; p2.alpha=.5; p2.vida=p2.max=18; }
      else if(tipo==='polen'){ p2.y=Math.random()*H; p2.vx=-30; p2.vy=-10+Math.random()*20; p2.r=1.5+Math.random(); p2.vida=p2.max=6; }
      else if(tipo==='vagalume'){ p2.x=Math.random()*W; p2.y=150+Math.random()*250; p2.vx=(Math.random()-.5)*30; p2.vy=(Math.random()-.5)*20; p2.r=5+Math.random()*4; p2.vida=p2.max=3+Math.random()*3; }
      else if(tipo==='faisca'){ p2.x=Math.random()*W; p2.y=H; p2.vx=(Math.random()-.5)*60; p2.vy=-120-Math.random()*120; p2.r=1.5+Math.random()*1.5; p2.cor=Math.random()<.5?'#fb923c':'#fde68a'; p2.vida=p2.max=1.2; }
      else if(tipo==='nuvem'){ p2.x=W+80; p2.y=40+Math.random()*120; p2.vx=-12-Math.random()*10; p2.r=.8+Math.random()*.8; p2.vida=p2.max=90; }
      J.clima.push(p2);
    }
  }
  for(var j=J.clima.length-1;j>=0;j--){ var q=J.clima[j]; q.vida-=dt; if(q.g) q.vy+=400*dt; q.x+=q.vx*dt; q.y+=q.vy*dt; if(q.rot!==undefined) q.rot+=dt*2; if(q.tipo==='folha') q.x+=Math.sin(J.t*3+q.rot)*1.2; if(q.tipo==='vagalume') q.alpha=.4+.6*Math.abs(Math.sin(J.t*3+q.rot)); if(q.vida<=0||q.y>H+40||q.x<-120) J.clima.splice(j,1); }
}

/* ---------- câmera ---------- */
function atualizaCamera(dt){
  var L=J.nivel, u=J.urso; var alvo=u.x-W*.38; alvo=Math.max(0,Math.min(L.w-W,alvo));
  J.cam+= (alvo-J.cam)*Math.min(1,dt*6);
}

/* ---------- mapa ---------- */
function atualizaMapa(dt){
  if(J.mapaAnim){ var m=J.mapaAnim; m.t+=dt; if(m.t>=m.dur){ J.mapaAnim=null; J.sel=m.para; SOM.fx('destrava'); toast(F.LISTA[m.para].nome+' destravada!',2200); } }
}
function mapaMove(d){ if(J.mapaAnim) return; var n=F.LISTA.length, s=J.sel; for(var i=0;i<n;i++){ s=(s+d+n)%n; if(faseLiberada(F.LISTA[s].id)){ J.sel=s; SOM.fx('clique'); return; } } }
function mapaToque(lx,ly){ if(J.mapaAnim) return; for(var i=0;i<F.LISTA.length;i++){ var f=F.LISTA[i]; if(Math.hypot(lx-f.mx,ly-f.my)<34){ if(J.sel===i) entraFase(i); else { J.sel=i; SOM.fx('clique'); if(faseLiberada(f.id)) entraFase(i); else toast('Termine a fase anterior primeiro',1800); } return; } } }

/* ---------- laço principal ---------- */
var ultimo=0;
function passo(ts){
  requestAnimationFrame(passo);
  var dt=Math.min(.033,(ts-ultimo)/1000||0); ultimo=ts;
  if(J.pausado) { desenha(); return; }
  J.t+=dt; J.tFase+=dt;
  if(J.shake>0) J.shake=Math.max(0,J.shake-dt*30);
  if(J.flash>0) J.flash=Math.max(0,J.flash-dt*2);
  switch(J.estado){
    case 'nivel': fisica(dt); atualizaNivel(dt); if(J.chefe) atualizaChefao(dt); atualizaCamera(dt); break;
    case 'pergunta': if(J.urso.cheerT>0){ J.urso.cheerT-=dt; J.urso.anim+=dt; } J.nivel.caixas.forEach(function(c){ if(c.bump>0) c.bump=Math.max(0,c.bump-dt*60); }); if(J.chefe){ J.chefe.t+=dt; if(J.chefe.estado!=='idle'&&J.chefe.t>.9) J.chefe.estado='idle'; } break;
    case 'arremesso': atualizaArremesso(dt); atualizaCamera(dt); break;
    case 'fimFase': J.fimFase.t+=dt; J.urso.anim+=dt; break;
    case 'vitoria': J.vit.t+=dt; J.urso.anim+=dt; if(J.chefe) J.chefe.t+=dt; break;
    case 'mapa': atualizaMapa(dt); break;
    case 'intro': break;
  }
  atualizaParticulas(dt);
  desenha();
}

/* ============================================================
   DESENHO
   ============================================================ */
function desenha(){
  var c=ctx; c.setTransform(escala*dpr,0,0,escala*dpr,0,0);
  c.save();
  if(J.shake>0) c.translate((Math.random()-.5)*J.shake,(Math.random()-.5)*J.shake);
  switch(J.estado){
    case 'boot': c.fillStyle='#0d0b1e'; c.fillRect(0,0,W,H); break;
    case 'intro': desenhaIntro(c); break;
    case 'mapa': desenhaMapa(c); break;
    case 'creditos': desenhaCreditos(c); break;
    default: desenhaNivel(c);
  }
  /* clima / partículas de tela */
  J.clima.forEach(function(p){ A.particula(c,p); });
  if(J.flash>0){ c.fillStyle='rgba(255,255,255,'+(J.flash*.6)+')'; c.fillRect(0,0,W,H); }
  c.restore();
  /* letterbox fora do 960x540 fica com o fundo do body */
}

function desenhaNivel(c){
  var L=J.nivel, u=J.urso, t=J.t; if(!L) return;
  A.ceu(c,L.cena,t);
  A.longe(c,L.cena,J.cam*.15,t);
  A.perto(c,L.cena,J.cam*.45,t);
  c.save(); c.translate(-Math.round(J.cam),0);
  var vx0=J.cam-100, vx1=J.cam+W+100;
  L.segs.forEach(function(s){ if(s.x+s.w>vx0&&s.x<vx1) A.chao(c,s,L.cena); });
  L.plats.forEach(function(p){ if(p.x+p.w>vx0&&p.x<vx1) A.plataforma(c,p,L.cena); });
  L.checkpoints.forEach(function(cp){ if(cp.x>vx0&&cp.x<vx1) A.bandeira(c,cp.x,cp.y,cp.acesa,t); });
  if(L.mastro) A.mastro(c,L.mastro.x,L.mastro.y,t);
  L.barreiras.forEach(function(b){ if(b.x>vx0&&b.x<vx1) A.barreira(c,b.x,b.y,b.h,b.tipo,b.alpha,t); });
  L.caixas.forEach(function(k){ if(k.x>vx0&&k.x<vx1) A.caixa(c,k,t); });
  L.inimigos.forEach(function(e){ if(!e.morto&&e.x>vx0&&e.x<vx1) A.inimigo(c,e,t); });
  if(J.chefe){ var g=J.chefe; A.gigante(c,g.x,g.y,g.estado,g.t,0); J.bolas.forEach(function(b){ A.bolaNeve(c,b,t); }); J.folhas.forEach(function(f){ if(f.cx!==undefined){ A.folha(c,f.cx,f.cy,18,f.t*10,'#fbbf24',2); c.save(); c.globalAlpha=.5; A.estrela(c,f.cx-12,f.cy+8,6,'#fde68a',f.t*8); c.restore(); } }); }
  /* o urso (pisca quando invencível) */
  if(!(u.invT>0 && Math.floor(t*14)%2===0)) A.urso(c,u.x,u.y,u.estado,u.anim,u.dir);
  J.part.forEach(function(p){ A.particula(c,p); });
  /* balões do tutorial */
  if(J.tut && L.passos[J.tut.i]) desenhaTutorial(c,L.passos[J.tut.i]);
  c.restore();
  if(J.chefe) A.barraVida(c,W/2-140,70,280,J.chefe.hp,J.chefe.max);
  /* placar das caixas da subfase atual */
  if(!J.chefe && !J.faseAtual.tutorial){
    var sub=Math.min(2,J.sub), feitas=L.caixas.filter(function(k){return k.sub===sub&&k.aberta;}).length, tot=L.caixas.filter(function(k){return k.sub===sub;}).length;
    c.fillStyle='rgba(13,11,30,.5)'; A.rr(c,W/2-70,56,140,30,10); c.fill(); c.fillStyle='#fff'; c.font='900 15px Arial'; c.textAlign='center'; c.textBaseline='middle'; c.fillText('Parte '+(sub+1)+'/3 · caixas '+feitas+'/'+tot,W/2,71);
  }
  if(J.fimFase){ var k=Math.min(1,J.fimFase.t/.8); c.fillStyle='rgba(13,11,30,'+(k*.35)+')'; c.fillRect(0,0,W,H); if(J.fimFase.t>.3){ c.save(); c.translate(W/2,150); c.scale(Math.min(1,(J.fimFase.t-.3)*2.5),Math.min(1,(J.fimFase.t-.3)*2.5)); c.fillStyle='#fde68a'; c.font='900 56px "Segoe UI",Arial'; c.textAlign='center'; c.strokeStyle='#78350f'; c.lineWidth=8; c.strokeText('Fase concluída!',0,0); c.fillText('Fase concluída!',0,0); c.restore(); } }
  if(J.estado==='vitoria'){ c.save(); c.fillStyle='#fde68a'; c.font='900 54px "Segoe UI",Arial'; c.textAlign='center'; c.strokeStyle='#78350f'; c.lineWidth=8; c.strokeText('O Gigante caiu!',W/2,150); c.fillText('O Gigante caiu!',W/2,150); var fl=Math.min(1,J.vit.t/2); A.folha(c,J.chefe.x-200*fl, J.chefe.y-250+Math.sin(fl*Math.PI)*-80, 34, J.vit.t*2, '#fbbf24', 3); c.restore(); }
}
function desenhaTutorial(c,p){
  var u=J.urso; var by=u.y-URSO_H-70;
  var w=Math.max(260,p.texto.length*12+40); var bx=Math.max(J.cam+w/2+8,Math.min(J.cam+W-w/2-8,u.x));
  A.balao(c,bx,by,w,p.texto);
  /* teclas e botão de toque: linha de teclas sob o texto, na tela (não no mundo) */
  c.save(); c.translate(J.cam,0);
  var grupos=p.teclas, x=W/2-grupos.reduce(function(a,g){return a+g.length*54+30;},0)/2+15;
  c.fillStyle='rgba(13,11,30,.55)'; A.rr(c,x-24,H-130,grupos.reduce(function(a,g){return a+g.length*54+30;},0)+28,70,16); c.fill();
  grupos.forEach(function(g,gi){ g.forEach(function(k){ var w2=k.length>2?(k.length*11+14):44; A.tecla(c,x,H-115,k,w2); x+=w2+10; }); if(gi<grupos.length-1){ c.fillStyle='#fff'; c.font='900 18px Arial'; c.textAlign='center'; c.textBaseline='middle'; c.fillText('ou',x+8,H-95); x+=30; } });
  c.restore();
}

/* ---------- mapa ---------- */
function desenhaMapa(c){
  var t=J.t; A.mapaFundo(c,t);
  var L=F.LISTA;
  /* caminho */
  for(var i=0;i<L.length-1;i++){
    var pts=F.caminho(L[i],L[i+1]), aberto=faseFeita(L[i].id)||J.prog.zerado; var frac=1;
    if(J.mapaAnim && J.mapaAnim.de===i){ aberto=true; frac=Math.min(1,J.mapaAnim.t/J.mapaAnim.dur); }
    pts.forEach(function(p,k){ if(k/pts.length>frac) return; c.fillStyle=aberto?'#fde68a':'rgba(255,255,255,.35)'; A.circ(c,p[0],p[1],aberto?4:3); c.fill(); });
  }
  /* nós */
  L.forEach(function(f,i){
    var feita=faseFeita(f.id), lib=faseLiberada(f.id), sel=i===J.sel && !J.mapaAnim;
    if(J.mapaAnim && i===J.mapaAnim.para) lib=J.mapaAnim.t>J.mapaAnim.dur*.9;
    c.save(); c.translate(f.mx,f.my);
    if(sel){ c.fillStyle='rgba(253,224,71,'+(.25+Math.sin(t*5)*.15)+')'; A.circ(c,0,0,42); c.fill(); }
    var g=c.createRadialGradient(-6,-6,4,0,0,28); if(f.chefao){ g.addColorStop(0,'#c7d2fe'); g.addColorStop(1,'#3730a3'); } else if(feita){ g.addColorStop(0,'#fef3c7'); g.addColorStop(1,'#d97706'); } else if(lib){ g.addColorStop(0,'#dcfce7'); g.addColorStop(1,'#15803d'); } else { g.addColorStop(0,'#9ca3af'); g.addColorStop(1,'#374151'); }
    c.fillStyle=g; A.circ(c,0,0,28); c.fill(); c.strokeStyle='#fff'; c.lineWidth=3; c.stroke();
    if(f.chefao){ c.fillStyle='#fff'; c.beginPath(); c.moveTo(-16,12); c.lineTo(-16,-8); c.lineTo(-8,-2); c.lineTo(0,-14); c.lineTo(8,-2); c.lineTo(16,-8); c.lineTo(16,12); c.closePath(); c.fill(); }
    else if(feita){ A.folha(c,0,0,15,0,'#b91c1c'); }
    else if(!lib){ A.cadeado(c,0,2); }
    else { c.fillStyle='#fff'; c.font='900 22px Arial'; c.textAlign='center'; c.textBaseline='middle'; c.fillText(String(f.id),0,1); }
    if(feita&&!f.chefao){ var est=J.prog.fases[f.id].estrelas; for(var s=0;s<3;s++) A.estrela(c,-20+s*20,-38,8,s<est?'#fde047':'rgba(255,255,255,.3)',0); }
    /* rótulo */
    c.fillStyle='rgba(13,11,30,.75)'; c.font='900 14px "Segoe UI",Arial'; c.textAlign='center'; var tw=c.measureText(f.nome).width+16; A.rr(c,-tw/2,34,tw,22,8); c.fill(); c.fillStyle=lib?'#fff':'rgba(255,255,255,.6)'; c.textBaseline='middle'; c.fillText(f.nome,0,45);
    c.restore();
  });
  /* o urso no mapa */
  var ux,uy; if(J.mapaAnim){ var m=J.mapaAnim, pts2=F.caminho(L[m.de],L[m.para]), k=Math.min(1,m.t/m.dur)*(pts2.length-1), i0=Math.floor(k), p0=pts2[i0], p1=pts2[Math.min(pts2.length-1,i0+1)], fr=k-i0; ux=p0[0]+(p1[0]-p0[0])*fr; uy=p0[1]+(p1[1]-p0[1])*fr; A.urso(c,ux,uy-20,'walk',t,p1[0]>=p0[0]?1:-1,.55); }
  else { var f2=L[J.sel]; A.urso(c,f2.mx,f2.my-26+Math.sin(t*3)*3,'idle',t,1,.55); }
  /* título */
  c.save(); c.textAlign='center'; c.font='900 30px "Segoe UI",Arial'; c.fillStyle='#fde68a'; c.strokeStyle='rgba(0,0,0,.6)'; c.lineWidth=6; c.strokeText('A Jornada do Urso',W/2,74); c.fillText('A Jornada do Urso',W/2,74);
  c.font='800 15px Arial'; c.fillStyle='rgba(255,255,255,.85)'; var sub=J.prog.zerado?'Jogo zerado! Todas as fases liberadas para rejogar':'Recupere a Folha de Bordo Dourada do Gigante'; c.strokeText(sub,W/2,98); c.fillText(sub,W/2,98);
  if(!J.mapaAnim){ var fs=L[J.sel]; c.font='900 17px Arial'; var txt=faseLiberada(fs.id)?('Toque de novo ou aperte ENTER para jogar: '+fs.nome):'Fase trancada'; c.fillStyle='#fff'; c.strokeText(txt,W/2,H-24); c.fillText(txt,W/2,H-24); }
  c.restore();
}

/* ---------- intro (3 quadros) ---------- */
var INTRO=[
  {tit:'Era uma vez, no Canadá...', txt:'a Folha de Bordo Dourada brilhava no alto da montanha mais alta.'},
  {tit:'Até que o Gigante...', txt:'o mesmo do pé de feijão, desceu das nuvens e ROUBOU a folha!'},
  {tit:'Um urso corajoso', txt:'vai cruzar o país inteiro para pegá-la de volta. Esse urso é você!'}
];
function desenhaIntro(c){
  var q=INTRO[J.intro], t=J.t;
  A.ceu(c,J.intro===1?'castelo':(J.intro===2?'aurora':'floresta'),t);
  if(J.intro===0){ A.longe(c,'floresta',0,t); A.perto(c,'floresta',0,t); A.montanha(c,480,452,420,300,'#475569',true); var g=c.createRadialGradient(480,180,5,480,180,90); g.addColorStop(0,'rgba(255,240,150,.95)'); g.addColorStop(1,'rgba(255,220,100,0)'); c.fillStyle=g; A.circ(c,480,180,90); c.fill(); A.folha(c,480,180,36,Math.sin(t)*.2,'#fbbf24',3); }
  if(J.intro===1){ A.longe(c,'castelo',0,t); A.gigante(c,640,452,'laugh',t,0); A.folha(c,560+Math.sin(t*3)*4,220,30,t,'#fbbf24',3); }
  if(J.intro===2){ A.longe(c,'aurora',0,t); A.perto(c,'aurora',0,t); A.urso(c,300,452,'idle',t,1,1.6); }
  A.chao(c,{x:0,y:452,w:W,h:88},J.intro===1?'castelo':(J.intro===2?'aurora':'floresta'));
  c.fillStyle='rgba(13,11,30,.72)'; A.rr(c,60,H-190,W-120,120,22); c.fill();
  c.fillStyle='#fde68a'; c.font='900 30px "Segoe UI",Arial'; c.textAlign='center'; c.textBaseline='middle'; c.fillText(q.tit,W/2,H-150);
  c.fillStyle='#fff'; c.font='700 22px "Segoe UI",Arial'; c.fillText(q.txt,W/2,H-108);
  c.fillStyle='rgba(255,255,255,.8)'; c.font='800 15px Arial'; c.fillText('Toque ou aperte ENTER para continuar  ·  '+(J.intro+1)+'/3',W/2,H-30);
}
function avancaIntro(){ SOM.fx('clique'); J.intro++; if(J.intro>=INTRO.length){ J.prog.intro=true; salva(); if(!J.prog.tutorial){ iniciaTutorial(); } else irMapa(false); } }

/* ---------- créditos ---------- */
function desenhaCreditos(c){
  var t=J.t; A.ceu(c,'aurora',t); A.longe(c,'aurora',0,t); A.perto(c,'aurora',0,t); A.chao(c,{x:0,y:452,w:W,h:88},'aurora');
  A.urso(c,480,452,'cheer',t,1,1.3); A.folha(c,480+Math.sin(t*2)*6,250+Math.cos(t*2)*4,40,t*.5,'#fbbf24',3);
  c.fillStyle='#fde68a'; c.font='900 40px "Segoe UI",Arial'; c.textAlign='center'; c.strokeStyle='rgba(0,0,0,.6)'; c.lineWidth=7; c.strokeText('Você zerou a Jornada do Urso!',W/2,70); c.fillText('Você zerou a Jornada do Urso!',W/2,70);
}

/* ---------- init / API ---------- */
function init(){
  canvas=document.getElementById('game'); ctx=canvas.getContext('2d');
  carrega(); redimensiona(); window.addEventListener('resize',redimensiona);
  if(!J.prog.intro){ J.estado='intro'; J.intro=0; } else irMapa(false);
  requestAnimationFrame(passo);
}
function toque(cx,cy){ var p=paraLogico(cx,cy); if(J.estado==='intro'){ avancaIntro(); return true; } if(J.estado==='mapa'&&p.y>120){ mapaToque(p.x,p.y); return true; } return false; }
function confirmar(){ if(J.estado==='intro'){ avancaIntro(); return true; } if(J.estado==='mapa'){ entraFase(J.sel); return true; } return false; }
function pausa(v){ J.pausado=!!v; }

return {J:J, init:init, toque:toque, confirmar:confirmar, mapaMove:mapaMove, pausa:pausa, irMapa:function(){ irMapa(false); }, voltaMapa:voltaMapa,
  iniciaTutorial:iniciaTutorial, recomecar:recomecar, entraFase:entraFase, salva:salva, hud:hud, faseLiberada:faseLiberada, faseFeita:faseFeita,
  jogarDeNovo:function(){ if(J.faseAtual) iniciaFase(J.faseAtual); }};
})();
