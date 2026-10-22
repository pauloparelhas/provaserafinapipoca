/* ============================================================
   HIS3_jogo_motor.js — The Lost Endings (Inglês, 3º tri), parte 1:
   estado, progresso (localStorage ing3_jogo_v1), física do herói
   (tamanhos, Pip, capa, bota, squash & stretch), perigos e itens.
   Fork do LP3_jornada_motor.js (WiseBear), com:
     · herói escolhido (Lia, Theo, Bia) no lugar do urso;
     · o Pip (montaria): pulo planado; levou golpe montado = o Pip
       sai correndo e volta a esperar ali perto (não perde vida);
     · as PLACAS de resposta do quiz são sólidas por baixo: bater a
       cabeça nelas responde (HIS3_jogo_quiz.js).
   Spec: trabalho/3tri_ingles/JOGO_SPEC.md
   ============================================================ */
window.JOGO = (function(){
'use strict';
var W=960, H=540, A=window.ARTE, F=window.FASES, T=F.T;
var GRAV=1900, VPULO=-760, VAND=270, VMOLA=-1150, URSO_W=36, URSO_H=88;
var TAM=[.72,1,1.25];
var canvas, ctx, escala=1, offX=0, offY=0, dpr=1;
var J={
  estado:'boot', pausado:false, t:0, tFase:0, tr:false,
  in:{left:false,right:false,jump:false,down:false,act:false}, jumpSolto:true, downSolto:true, actSolto:true,
  prog:null, nivel:null, mundo:null, urso:null, cam:0, camY:0, part:[], clima:[], shake:0, flash:0,
  faseAtual:null, sel:0, mapaAnim:null, trans:null, intro:null, quiz:null,
  pontos:0, moedas:0, stats:null, tut:null, fimFase:null, chefe:null, dica:null, setaT:0, bolasCanhao:[], troncosVivos:[], pip:null
};
var CHAVE='his3_jogo_v1';

/* ---------- progresso ---------- */
function carrega(){
  var p=null; try{ p=JSON.parse(localStorage.getItem(CHAVE)||'null'); }catch(e){}
  if(!p||typeof p!=='object') p={};
  p.fases=p.fases||{}; p.moedas=p.moedas||0; p.pontos=p.pontos||0; p.zerado=!!p.zerado; p.heroi=p.heroi||null; p.cor=p.cor||null; p.introVista=!!p.introVista;
  J.prog=p; J.moedas=p.moedas; return p;
}
function salva(){ try{ J.prog.moedas=J.moedas; localStorage.setItem(CHAVE,JSON.stringify(J.prog)); }catch(e){} }
function faseFeita(id){ return !!(J.prog.fases[id]&&J.prog.fases[id].estrelas); }
function paginas(id){ return (J.prog.fases[id]&&J.prog.fases[id].paginas)||0; }
function proximaFase(){ for(var i=0;i<F.LISTA.length;i++){ var f=F.LISTA[i]; if(F.PRONTOS[f.id]&&!faseFeita(f.id)) return i; } return 0; }
function recomecar(){ var hr=J.prog.heroi, cr=J.prog.cor; J.prog={fases:{},moedas:0,pontos:0,zerado:false,heroi:hr,cor:cr,introVista:true}; J.moedas=0; salva(); J.sel=0; irMapa(false); }

/* ---------- utilidades ---------- */
function emite(n,fn){ for(var i=0;i<n;i++) J.part.push(fn(i)); }
function toast(txt,dur,pt){ if(window.UI) UI.toast(txt,dur||2200,pt); }
function hud(){ if(!window.UI) return; var L=J.nivel, E=L?(L.todasEntradas||L.moradores):[]; var feitas=E.filter(function(m){ return m.feito; }).length, tot=E.length; UI.hud(J.faseAtual?J.faseAtual.nome:'Detetives do Tempo', J.pontos, J.moedas, feitas, tot, !!(L&&tot)); }
function colideRet(ax,ay,aw,ah,bx,by,bw,bh){ return ax<bx+bw && ax+aw>bx && ay<by+bh && ay+ah>by; }
function ursoRet(){ var u=J.urso, s=TAM[u.tam], w=URSO_W*s, h=URSO_H*s; return {x:u.x-w/2,y:u.y-h,w:w,h:h}; }
function poeira(x,y,n){ emite(n||6,function(){ return {x:x+(Math.random()-.5)*24,y:y,vx:(Math.random()-.5)*90,vy:-20-Math.random()*50,vida:.45,max:.45,tipo:'nevoa',r:4+Math.random()*4}; }); }
function brilho(x,y,n,cor){ emite(n||8,function(){ return {x:x,y:y,vx:(Math.random()-.5)*220,vy:-80-Math.random()*200,vida:.8,max:.8,tipo:'estrela',r:4+Math.random()*4,rot:Math.random()*6,g:1,cor:cor||'#fde047'}; }); }
function pontua(n,x,y){ J.pontos+=n; if(x!==undefined) J.part.push({x:x,y:y,vx:0,vy:-60,vida:.9,max:.9,tipo:'texto',txt:'+'+n,r:20,cor:'#fde68a'}); hud(); }

/* ---------- canvas / escala ---------- */
function redimensiona(){
  var vw=window.innerWidth, vh=window.innerHeight;
  dpr=Math.min(2,window.devicePixelRatio||1); escala=Math.min(vw/W,vh/H);
  var cw=Math.floor(W*escala), ch=Math.floor(H*escala);
  canvas.style.width=cw+'px'; canvas.style.height=ch+'px'; canvas.width=Math.floor(cw*dpr); canvas.height=Math.floor(ch*dpr);
  offX=Math.floor((vw-cw)/2); offY=Math.floor((vh-ch)/2);
  var ui=document.getElementById('ui'); ui.style.left=offX+'px'; ui.style.top=offY+'px'; ui.style.transform='scale('+escala+')';
  document.body.classList.toggle('portrait', vh>vw*1.05);
}
function paraLogico(cx,cy){ return {x:(cx-offX)/escala, y:(cy-offY)/escala}; }

/* ---------- carregar reino ---------- */
function novoUrso(x,y){ return {x:x,y:y,vx:0,vy:0,noChao:true,dir:1,estado:'idle',anim:0,tontoT:0,invT:0,tam:1,sx:1,sy:1,poderes:{capa:false,bota:false,estrelas:0,traje:false,guardanapo:false,giz:false,tiro:null,vassoura:false},puloExtra:false,planando:false,cheerT:0,sobre:null,montado:false,quem:J.prog.heroi||'lia'}; }
function iniciaFase(f){
  J.faseAtual=f; J.agarrado=null; J.chefe=null; if(window.CHEFAO) CHEFAO.limpa(); /* nada do castelo vaza para outro reino */ if(window.UI&&UI.poderHud) UI.poderHud(null); J.soltouT=0; if(window.UI&&UI.modoCorrida) UI.modoCorrida(false); if(window.UI&&UI.botaoCapa) UI.botaoCapa(false); if(window.UI) UI.modoMapa(false); J.corrida=null; J.estadio=null;
  if(f.modo==='estadio'&&window.ESTADIO){ J.quiz=null; J.part=[]; J.clima=[]; J.fimFase=null; J.flash=.6; ESTADIO.inicia(f); return; }
  if(f.modo==='corrida'&&window.CORRIDA){ J.quiz=null; J.part=[]; J.clima=[]; J.fimFase=null; J.flash=.6; CORRIDA.inicia(f); return; }
  var L=F.monta(f);
  J.nivel=L; J.mundo=L; J.urso=novoUrso(L.inicioX,L.inicioY); J.cam=0; J.camY=Math.max(0,L.h-H); J.bolasCanhao=[]; J.part=[]; J.clima=[]; J.shake=0; J.tFase=0; J.fimFase=null; J.troncosVivos=[]; J.dica=null; J.setaT=0; J.quiz=null; J.pip=null;
  J.respawn={x:L.inicioX,y:L.inicioY,mundo:'main'}; J.stats={perguntas:0,acertos:0}; J.pontos=0;
  L.ovos.forEach(function(o){ o.chocado=false; o.t=0; });
  J.tut= L.passos?{i:0,t:0}:null; J.log=[]; J.pipCartao=false; if(window.PODERES) PODERES.reinicia();
  J.chefe=null; if(window.CHEFAO) CHEFAO.limpa();
  J.estado='nivel'; J.flash=.6; J.estrelas=[]; J.troncosVivos=[]; J.bolasCanhao=[]; if(window.UI){ UI.coracoes(2); UI.acao(false,0); }
  SOM.musica(f.chefao?'chefao':(window.PARTITURAS&&PARTITURAS.CENAS[L.cena]?L.cena:((A.CENAS[L.cena]||{}).musica||'floresta'))); hud();
  if(window.UI){ UI.modoNivel(true); UI.modoMapa(false); }
  if(f.chefao&&window.CHEFAO) CHEFAO.inicia(L); /* por último: a abertura do chefão congela o herói e esconde os botões */
}

/* ---------- física do herói ---------- */
function solidos(M){
  var s=[]; M.segs.forEach(function(g){ s.push(g); }); M.tijolos.forEach(function(b){ if(b.vivo) s.push({x:b.x,y:b.y,w:b.w,h:b.h,tijolo:b}); });
  M.canos.forEach(function(p){ s.push({x:p.x,y:p.y,w:p.w,h:p.h,cano:p}); });
  if(window.PERIGOS) PERIGOS.solidosExtra(M,s);
  if(window.PODERES) PODERES.solidos(M,s); /* porteiras de tinta: só abrem depois das perguntas */
  if(J.chefe&&window.CHEFAO) CHEFAO.solidos(s); /* letras caídas do Conde: a escada até a sacada */
  return s;
}
function umaVia(M){ var s=M.plats.filter(function(p){ return !p.ritmo||p.visivel; }); M.caindo.forEach(function(p){ if(p.estado!=='sumiu') s.push(p); }); M.movers.forEach(function(p){ s.push(p); }); return s; }
function fisica(dt){
  var u=J.urso, M=J.mundo, s=TAM[u.tam], hw=URSO_W*s/2, hh=URSO_H*s;
  if(u.tontoT>0){ u.tontoT-=dt; u.estado='dizzy'; u.vx=0; u.anim+=dt; return; }
  if(window.APARELHOS&&APARELHOS.ativo()){ APARELHOS.fisica(dt); return; }
  var ax=0; if(J.in.left) ax-=1; if(J.in.right) ax+=1;
  u.abaixado=!!(J.in.down&&u.noChao&&!u.montado); if(u.abaixado) ax*=.35; /* ↓ = se arrastar devagar */
  var alvo=ax*VAND*(u.montado?1.1:1)*(u.sobre&&u.sobre.trave?.7:1);
  if(u.impulsoT>0){ u.impulsoT-=dt; if(ax&&(ax>0)!==(u.vx>0)) u.vx+=(alvo-u.vx)*Math.min(1,dt*16); else if(ax&&Math.abs(u.vx)<Math.abs(alvo)) u.vx+=(alvo-u.vx)*Math.min(1,dt*10); } /* trampolim/cipó: o impulso para a frente não some, mas a criança corrige no ar (18/10) */
  else { u.vx+=(alvo-u.vx)*Math.min(1,dt*18); if(Math.abs(u.vx)<2&&!ax) u.vx=0; }
  if(ax) u.dir=ax>0?1:-1;
  /* pulo (buffer, altura variável, pulo duplo com a bota, planar com a capa ou montado no Pip) */
  var modo=M.modo||'';
  /* recife: só nada com a roupa de mergulho e DENTRO d'água (começa na praia); céu: só voa depois de pegar a capa (Paulo) */
  if(modo==='nado'&&!(u.poderes.traje&&(u.y-hh*.5)>(M.superficie||0))) modo='';
  if(modo==='voo'&&!u.poderes.capa) modo='';
  if(M.modo==='nado'&&!u.poderes.traje&&M.praiaX&&u.x+hw>M.praiaX-4&&u.vx>0){ u.vx=0; u.x=Math.min(u.x,M.praiaX-4-hw); if(!J.avisoTraje){ J.avisoTraje=1.6; toast('Get the diving suit first!',1800,'Pegue a roupa de mergulho primeiro!'); } }
  if(J.avisoTraje>0) J.avisoTraje-=dt;
  if(modo==='nado'){ /* Rhyme Reef: roupa de mergulho; cada toque em PULAR dá uma braçada para cima, afunda devagar */
    if(J.in.jump && J.jumpSolto){ u.vy=-330; J.jumpSolto=false; u.noChao=false; SOM.fx('pulo'); emite(4,function(){ return {x:u.x+(Math.random()-.5)*16,y:u.y-hh,vx:(Math.random()-.5)*30,vy:-60-Math.random()*40,vida:1,max:1,tipo:'neve',r:3,cor:'#e0f2fe'}; }); }
    if(!J.in.jump) J.jumpSolto=true;
    u.vy+=520*dt; if(u.vy>150) u.vy=150; if(u.vy<-380) u.vy=-380; u.planando=false;
  } else if(modo==='voo'){ /* Stanza Skies: a capa voa de verdade; segurar PULAR sobe, soltar desce planando */
    if(J.in.jump){ u.vy-=1500*dt; if(u.vy<-300) u.vy=-300; } else { u.vy+=380*dt; if(u.vy>105) u.vy=105; } /* 18/10: solta e desce flutuando */
    u.planando=!u.noChao;
  } else {
  if(J.in.jump && J.jumpSolto){
    if(u.noChao){ u.vy=VPULO; u.noChao=false; J.jumpSolto=false; u.puloExtra=u.poderes.bota||u.poderes.giz; u.sx=.8; u.sy=1.25; SOM.fx('pulo'); poeira(u.x,u.y,5); u.sobre=null; }
    else if(u.puloExtra){ u.vy=-640; u.puloExtra=false; J.jumpSolto=false; u.lancado=true; u.sx=.85; u.sy=1.2; SOM.fx('pulo'); brilho(u.x,u.y-20,6,'#fbbf24'); if(window.PODERES) PODERES.segundoPulo(); }
  }
  /* soltar PULAR corta o pulo (altura variável) — mas NUNCA o impulso de mola, trampolim, cipó ou barra:
     era esse corte que deixava o pula-pula fraco e o obstáculo depois dele intransponível (Paulo) */
  if(!J.in.jump){ J.jumpSolto=true; if(u.vy<-250&&!u.lancado) u.vy=-250; }
  if(u.lancado&&u.vy>=0) u.lancado=false;
  u.planando= (u.poderes.capa||u.montado||u.poderes.guardanapo) && J.in.jump && !u.noChao && u.vy>0;
  var teto=u.montado?80:(u.poderes.capa?95:170); /* guardanapo: só freia a queda, não é voo */
  u.vy+=GRAV*dt; if(u.planando&&u.vy>teto) u.vy=teto; if(u.vy>900) u.vy=900;
  }
  var nx=u.x+u.vx*dt, ny=u.y+u.vy*dt;
  var sol=solidos(M), via=umaVia(M);
  if(nx<hw) nx=hw; if(nx>M.w-hw) nx=M.w-hw;
  sol.forEach(function(b){ if(b.placa) return; if(colideRet(nx-hw,u.y-hh+6,hw*2,hh-10,b.x,b.y,b.w,b.h)){ nx = u.vx>0? b.x-hw-.01 : b.x+b.w+hw+.01; u.vx=0; } });
  u.x=nx;
  var noChao=false, sobre=null;
  if(u.vy>=0){
    var piso=null;
    via.forEach(function(p){ if(u.x+hw-4>p.x && u.x-hw+4<p.x+p.w && u.y<=p.y+4+(p.vyAnt||0) && ny>=p.y){ if(piso===null||p.y<piso){ piso=p.y; sobre=p; } } });
    sol.forEach(function(b){ if(b.placa) return; if(u.x+hw-2>b.x && u.x-hw+2<b.x+b.w && u.y<=b.y+2 && ny>=b.y){ if(piso===null||b.y<piso){ piso=b.y; sobre=b; } } });
    if(piso!==null){ if(!u.noChao){ u.sx=1.25; u.sy=.75; SOM.fx('aterra'); poeira(u.x,piso,6); } ny=piso; u.vy=0; noChao=true; u.puloExtra=u.poderes.bota||u.poderes.giz; }
  } else {
    var topo=ny-hh;
    sol.forEach(function(b){ if(u.x+hw-6>b.x && u.x-hw+6<b.x+b.w && topo<=b.y+b.h && (u.y-hh)>=b.y+b.h-6){ ny=b.y+b.h+hh; u.vy=120; if(b.tijolo) quebraTijolo(b.tijolo); if(b.placa&&window.QUIZ) QUIZ.bate(b.placa); } });
  }
  u.y=ny; u.noChao=noChao; u.sobre=sobre; if(noChao) u.impulsoT=0;
  if(modo==='nado') u.estado= noChao&&Math.abs(u.vx)<5?'idle':'swim';
  else if(modo==='voo') u.estado= noChao?(Math.abs(u.vx)>5?'walk':'idle'):'fly';
  else if(!noChao) u.estado=u.planando?'glide':(u.vy<0?'jump':'fall'); else u.estado=Math.abs(u.vx)>5?'walk':'idle';
  if(modo==='voo'&&u.y-hh<64){ u.y=64+hh; if(u.vy<0) u.vy=0; } /* teto do céu: abaixo do HUD */
  if(modo==='nado'&&ny-hh<(M.superficie||0)){ u.y=(M.superficie||0)+hh; if(u.vy<0) u.vy=0; }
  if(noChao&&u.estado==='walk'&&Math.random()<dt*6) poeira(u.x-u.dir*10,u.y,1);
  u.anim+=dt; u.sx+=(1-u.sx)*Math.min(1,dt*14); u.sy+=(1-u.sy)*Math.min(1,dt*14);
  if(u.y>M.h+60) caiu('Oops! Back to the checkpoint','Opa! De volta ao checkpoint');
}

/* ---------- itens, perigos ---------- */
function quebraTijolo(b){ b.vivo=false; SOM.fx('tijolo'); J.shake=4; pontua(10,b.x+b.w/2,b.y); emite(8,function(i){ return {x:b.x+b.w/2,y:b.y+b.h/2,vx:(Math.random()-.5)*300,vy:-150-Math.random()*250,vida:.8,max:.8,tipo:'confete',cor:i%2?'#c2410c':'#7c2d12',rot:Math.random()*6,g:1}; }); J.part.push({x:b.x+b.w/2,y:b.y,vx:0,vy:-200,vida:.6,max:.6,tipo:'moeda',r:9,rot:0,g:1}); }
function pegaItem(it){
  var u=J.urso; it.pego=true; brilho(it.x,it.y,12,'#fff'); if(window.PODERES&&PODERES.pega(it)) return;
  switch(it.tipo){
    case 'maca': if(u.tam<2){ u.tam++; u.sx=1.3; u.sy=1.3; } if(window.UI) UI.coracoes(u.tam+1); SOM.fx('moedaG'); pontua(50,it.x,it.y); break;
    case 'capa': u.poderes.capa=true; SOM.fx('destrava');
      if(J.mundo&&J.mundo.modo==='voo'&&window.UI&&UI.aviso){ J.in.left=J.in.right=J.in.jump=false; UI.aviso('capa','The magic cape!','A capa mágica!',
        'Now you can FLY! Hold JUMP (▲) to go up. Let go to float down. The sky is full of surprises…','Agora você pode VOAR! Segure PULAR (▲) para subir. Solte para descer devagar. O céu está cheio de surpresas…',"Let's fly! ▶",'Vamos voar!'); }
      else toast('A cape! Hold JUMP in the air to float',2600,'Uma capa! Segure PULAR no ar para planar'); break;
    case 'traje': u.poderes.traje=true; SOM.fx('destrava'); J.in.left=J.in.right=J.in.jump=false;
      if(window.UI&&UI.aviso) UI.aviso('traje','A diving suit!','Uma roupa de mergulho!',
        'Now you can breathe under the sea! Jump into the water. Under the water, tap JUMP (▲) to swim up.','Agora você respira debaixo do mar! Pule na água. Lá embaixo, toque PULAR (▲) para nadar para cima.','Dive in! ▶','Mergulhar!'); break;
    case 'historia': { /* If You Give a Mouse a Cookie: cada objeto, na ordem do livro, dá um poder */
      var H=[['a cookie','um biscoito','moedas'],['a glass of milk','um copo de leite','cura'],['a straw','um canudo','estrelas'],['a napkin','um guardanapo','capa'],['a mirror','um espelho','moedas'],['scissors','uma tesoura','estrelas'],['a broom','uma vassoura','estrelas'],['tape','fita adesiva','cura'],['a cookie again!','um biscoito de novo!','moedas']];
      var h=H[Math.min(H.length-1,it.ordem||0)], ef=h[2];
      if(ef==='cura'&&u.tam<2){ u.tam++; if(window.UI) UI.coracoes(u.tam+1); }
      if(ef==='estrelas'){ u.poderes.estrelas=Math.min(9,(u.poderes.estrelas||0)+3); if(window.UI) UI.acao(true,u.poderes.estrelas); }
      if(ef==='capa') u.poderes.guardanapo=true;
      if(ef==='moedas'){ J.moedas+=5; }
      SOM.fx('moedaG'); pontua(80,it.x,it.y);
      toast((it.ordem?'Você achou: ':'Comece pela pista: ')+h[1],2600); break; }
    case 'estrelas': u.poderes.estrelas=Math.min(9,(u.poderes.estrelas||0)+3); SOM.fx('moedaG'); if(window.UI) UI.acao(true,u.poderes.estrelas); if(!J.prog.estrelaVista){ J.prog.estrelaVista=true; salva(); toast('Magic stars! Press ★ to throw one',2800,'Estrelas mágicas! Aperte ★ para jogar uma'); } break;
    case 'bota': u.poderes.bota=true; u.puloExtra=true; SOM.fx('destrava'); toast('Magic boots! Press JUMP again in the air',2600,'Botas mágicas! Aperte PULAR de novo no ar'); break;
  }
}
/* montar no Pip: ele choca do ovo (1ª vez) ou volta correndo */
function monta(){ var u=J.urso; u.montado=true; J.pip=null; SOM.fx('destrava'); brilho(u.x,u.y-40,10,'#86efac'); u.sx=1.2; u.sy=.85; }
function machucado(){
  var u=J.urso; if(u.invT>0||u.tontoT>0) return; if(J.teste) J.teste.danos.push({x:Math.round(u.x/45),t:+J.tFase.toFixed(1)});
  setTimeout(function(){ if(window.UI&&J.urso) UI.coracoes(J.urso.tam+1,true); },0);
  if(u.montado){ /* o Pip leva o susto no lugar do herói e espera ali perto */
    u.montado=false; u.invT=1.6; u.vy=-380; u.noChao=false; SOM.fx('tonto'); J.shake=5;
    J.pip={x:u.x,y:u.y,vx:-u.dir*260,vy:-300,t:0,parado:false}; return; }
  if(u.tam>0){ u.tam--; u.invT=1.7; u.vy=-300; u.noChao=false; u.vx=-u.dir*150; SOM.fx('tonto'); J.shake=6; poeira(u.x,u.y,8); }
  else caiu('Ouch! Back to the checkpoint','Ai! De volta ao checkpoint');
}
function caiu(msg,pt){
  if(J.chefe&&window.CHEFAO&&CHEFAO.morreu) CHEFAO.morreu();
  var u=J.urso; if(J.teste) J.teste.quedas.push({x:Math.round(u.x/45),mundo:J.mundo&&J.mundo.mundo,t:+J.tFase.toFixed(1),causa:String(msg).split(' ')[0]}); SOM.fx('tonto'); J.shake=6; J.agarrado=null; J.soltouT=0; u.giro=0;
  if(J.nivel&&J.respawn.mundo&&J.mundo.mundo!==J.respawn.mundo){ J.mundo= J.respawn.mundo==='sub'&&J.nivel.sub?J.nivel.sub:J.nivel; J.troncosVivos=[]; J.bolasCanhao=[]; J.estrelas=[]; }
  u.x=J.respawn.x; u.y=J.respawn.y; u.vx=0; u.vy=0; u.tontoT=.8; u.invT=J.chefe?3.5:2.4; J.flash=.7; /* renasce protegido mais tempo: dá para sair de perto de um chefinho */ u.puloExtra=u.poderes.bota||u.poderes.giz;
  if(u.tam<1){ u.tam=1; setTimeout(function(){ if(window.UI&&J.urso) UI.coracoes(J.urso.tam+1,false); },0); } /* 16/10 (jogador): renasce com 2 corações — um toque logo depois não vira outra queda */
  if(J.pip){ J.pip.x=u.x+50; J.pip.y=u.y; J.pip.vx=0; J.pip.vy=0; }
  J.cam=Math.max(0,Math.min(J.mundo.w-W,u.x-W*.4)); J.camY=Math.max(0,Math.min(J.mundo.h-H,u.y-H*.62)); J.bolasCanhao=[]; 
  J.mundo.caindo.forEach(function(p){ p.estado='ok'; p.x=p.x0; p.y=p.y0; p.t=0; });
}
function perigos(dt){
  var u=J.urso, M=J.mundo, R=ursoRet();
  if(u.invT>0) u.invT-=dt;
  M.moedas.forEach(function(m){ if(!m.pega && colideRet(R.x,R.y,R.w,R.h,m.x-m.r,m.y-m.r,m.r*2,m.r*2)){ m.pega=true; J.moedas+=m.big?5:1; pontua(m.big?50:10,m.x,m.y-10); SOM.fx(m.big?'moedaG':'moeda'); brilho(m.x,m.y,m.big?14:5); } });
  M.itens.forEach(function(it){ if(!it.pego && (it.tipo==='maca'||it.tipo==='bota'||it.tipo==='estrelas'||(it.tipo==='historia'&&it.nome!=='milk'&&!(window.PODERES&&PODERES.peloQuiz(it)))) && colideRet(R.x,R.y,R.w,R.h,it.x-18,it.y-18,36,36)) pegaItem(it);
    else if(!it.pego&&window.PODERES&&PODERES.peloQuiz(it)&&!J.quiz&&J.t>(it.cool||0)&&colideRet(R.x,R.y,R.w,R.h,it.x-24,it.y-30,48,60)){ it.cool=J.t+5; pegaItem(it); } }); /* encostou no objeto da história: o ratinho pergunta (de novo só depois de 5 s ou com ▼) */
  M.ovos.forEach(function(o){ if(!o.chocado && !u.montado && colideRet(R.x,R.y,R.w,R.h,o.x-22,o.y-50,44,50)){ o.chocado=true; monta(); J.urso.poderes.tiro='faisca'; if(!J.prog.pipVisto){ J.prog.pipVisto=true; salva(); } if(!J.pipCartao&&window.PODERES){ J.pipCartao=true; PODERES.cartao('pip',PODERES.TAB[2]); PODERES.hudPoder(); } } });
  if(J.pip){ var p=J.pip; p.t+=dt; if(!p.parado){ p.vy+=1400*dt; p.x+=p.vx*dt; p.y+=p.vy*dt; var piso=null; solidos(M).concat(umaVia(M)).forEach(function(b){ if(p.x>b.x&&p.x<b.x+b.w&&p.y>=b.y&&p.y-p.vy*dt<=b.y+4) piso=b.y; }); if(piso!==null&&p.vy>0){ p.y=piso; p.vy=0; p.vx*=.5; if(Math.abs(p.vx)<20){ p.parado=true; } } if(p.y>M.h+100){ p.x=J.respawn.x+60; p.y=J.respawn.y; p.vy=0; } }
    if(p.t>1 && u.invT<=.3 && colideRet(R.x,R.y,R.w,R.h,p.x-24,p.y-50,48,50)) monta(); }
  M.molas.forEach(function(m){ if(m.t>0) m.t-=dt; if(u.vy>=0 && colideRet(R.x,R.y+R.h-8,R.w,12,m.x,m.y-6,m.w,m.h)){ u.vy=VMOLA; u.lancado=true; u.noChao=false; u.y=m.y; m.t=.3; u.sx=.7; u.sy=1.4; SOM.fx('mola'); poeira(u.x,m.y,8); } });
  if(u.invT<=0&&u.tontoT<=0&&J.estado==='nivel'){
    M.espinhos.forEach(function(s){ if(colideRet(R.x+6,R.y+R.h-10,R.w-12,10,s.x,s.y,s.w,s.h)) caiu('Ouch, thorns! Back to the checkpoint','Ai, espinhos! De volta ao checkpoint'); });
    M.agua.forEach(function(a){ if(u.y>a.y+30 && u.x>a.x && u.x<a.x+a.w) caiu('Splash! Back to the checkpoint','Splash! De volta ao checkpoint'); });
  }
  M.caindo.forEach(function(p){
    if(p.estado==='ok'){ if(u.sobre===p){ p.estado='tremendo'; p.t=0; } }
    else if(p.estado==='tremendo'){ p.t+=dt; if(p.t>.55){ p.estado='caindo'; p.vy=0; p.t=0; } }
    else if(p.estado==='caindo'){ p.vy+=900*dt; p.y+=p.vy*dt; p.t+=dt; if(p.t>2.6){ p.estado='sumiu'; p.t=0; } }
    else if(p.estado==='sumiu'){ p.t+=dt; if(p.t>1.5){ p.estado='ok'; p.x=p.x0; p.y=p.y0; } }
  });
  if(window.PERIGOS) PERIGOS.atualiza(dt);
  if(window.PODERES) PODERES.atualiza(dt);
  if(window.APARELHOS) APARELHOS.atualiza(dt);
  if(window.MARCEU) MARCEU.atualiza(dt);
  M.movers.forEach(function(p){ var k=.5-.5*Math.cos(J.t*6.2832/p.per+(p.x0*.01)); var nx=p.x0+p.dx*k, ny=p.y0+p.dy*k; var ddx=nx-p.x, ddy=ny-p.y; p.vyAnt=Math.max(0,ddy); p.x=nx; p.y=ny; if(u.sobre===p&&u.noChao){ u.x+=ddx; u.y=p.y; } });
}

var api={J:J, W:W, H:H, TAM:TAM, URSO_W:URSO_W, URSO_H:URSO_H, carrega:carrega, salva:salva, faseFeita:faseFeita, paginas:paginas, proximaFase:proximaFase, recomecar:recomecar, emite:emite, toast:toast, hud:hud, colideRet:colideRet, ursoRet:ursoRet, poeira:poeira, brilho:brilho, pontua:pontua, redimensiona:redimensiona, paraLogico:paraLogico, iniciaFase:iniciaFase, fisica:fisica, perigos:perigos, caiu:caiu, pegaItem:pegaItem, machucado:machucado, solidos:solidos, umaVia:umaVia,
  canvas:function(){ return canvas; }, ctx:function(){ return ctx; }, escala:function(){ return escala; }, dpr:function(){ return dpr; },
  setCanvas:function(cv){ canvas=cv; ctx=cv.getContext('2d'); }};
var irMapa=function(){ if(api.irMapa) api.irMapa.apply(null,arguments); };
return api;
})();
