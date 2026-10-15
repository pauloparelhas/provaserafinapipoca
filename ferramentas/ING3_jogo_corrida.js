/* ============================================================
   ING3_jogo_corrida.js — Real or Make-believe RALLY (reino 3), v4 (2,5D).
   18/10 (Paulo: "vista de cima deixa tonto, não dá para entender os
   carros nem os personagens… volte à lógica do Enduro, em 2,5D ou 2D").
   Pista em PSEUDO-3D (técnica de jakesgordon/javascript-racer, MIT,
   reescrita aqui): a estrada vai até o horizonte, com curvas suaves e
   morros; a câmera fica atrás do carrinho e NÃO gira. Os carrinhos e os
   pilotos aparecem DE COSTAS (ING3_jogo_carrinhos.js · desenhaTras), cada
   um com o que o identifica (coroa, chapéu de bruxa, orelhas, capuz…).
   · Acelera sozinho; ◀ ▶ trocam de faixa; sem tocar, volta para a pista.
   · Os rivais andam, erram (rodam na tinta, saem da pista) e se passa por
     eles só andando bem: 7 deles são mais lentos que o herói. Os 3 líderes
     só se alcançam com os TURBOS das respostas certas. Ninguém fica em
     último (o herói é mais rápido que a maioria).
   · 3 PIT STOPS: o box só serve para as PERGUNTAS (cada acerto = 1 turbo).
     TODOS os carrinhos param no box o MESMO tempo (2,5 s); durante o quiz
     o mundo congela.
   · Moedas deixam o carrinho mais rápido; setas no chão dão impulso; o
     Conde Rabisco, no fim, solta poças de tinta do tinteiro dele.
   ============================================================ */
window.CORRIDA = (function(){
'use strict';
var G=window.JOGO, J=G.J, A=window.ARTE, W=G.W, H=G.H, CR=window.CARRINHOS;
var TAU=Math.PI*2, PI=Math.PI;
var SEG=200, ROAD=2000, RUMBLE=3, LANES=3, CAM_H=1900, FOV=100, DRAW=230, CAM_D=1/Math.tan((FOV/2)*PI/180), PLAYER_Z=CAM_H*CAM_D;
var VMAX=SEG*24, ACEL=VMAX/4, CARRO_W=430, PIT_T=2.5;
var FONTE='"Nunito","Segoe UI",Arial';
function F(p,px){ return p+' '+px+'px '+FONTE; }
function cl(v,a,b){ return v<a?a:(v>b?b:v); }
function lerp(a,b,k){ return a+(b-a)*k; }
function suave(k){ k=cl(k,0,1); return k*k*(3-2*k); }
function easeIn(a,b,k){ return a+(b-a)*Math.pow(k,2); }
function easeInOut(a,b,k){ return a+(b-a)*((-Math.cos(k*PI)/2)+.5); }
function hash(n){ var x=Math.sin(n*127.1+311.7)*43758.5453; return x-Math.floor(x); }
function ord(n){ return n+(n===1?'st':(n===2?'nd':(n===3?'rd':'th'))); }
function rr(c,x,y,w,h,r){ A.rr(c,x,y,w,h,r); }

/* ============================================================
   A ESTRADA: segmentos com curva e altura; temas por trecho
   ============================================================ */
var TEMAS={
  prado:{grama:['#4ade80','#3fcf72'],zebra:['#ef4444','#f8fafc'],estrada:['#6b7280','#646b77'],faixa:'#f8fafc',ceu:['#7dd3fc','#e0f2fe']},
  floresta:{grama:['#16a34a','#15803d'],zebra:['#ef4444','#f8fafc'],estrada:['#6b7280','#646b77'],faixa:'#f8fafc',ceu:['#86efac','#dcfce7']},
  ponte:{grama:['#0ea5e9','#0284c7'],zebra:['#78350f','#92400e'],estrada:['#b45309','#a16207'],faixa:null,ceu:['#7dd3fc','#e0f2fe']},
  pantano:{grama:['#4d7c0f','#3f6212'],zebra:['#7c3aed','#a78bfa'],estrada:['#57534e','#4b5563'],faixa:'#d6d3d1',ceu:['#a78bfa','#ede9fe']},
  castelo:{grama:['#a78bfa','#8b5cf6'],zebra:['#fde047','#1e1b4b'],estrada:['#4b5563','#374151'],faixa:'#fde68a',ceu:['#4c1d95','#c4b5fd']}
};
var segs=[], TRACK=0, PITS=[], FIM_SEG=0, CONDE_SEG=0;
function ultimaY(){ return segs.length?segs[segs.length-1].p2.world.y:0; }
function addSeg(curva,y,tema,tag){ var n=segs.length; segs.push({i:n,p1:{world:{y:ultimaY(),z:n*SEG},camera:{},screen:{}},p2:{world:{y:y,z:(n+1)*SEG},camera:{},screen:{}},curva:curva,sprites:[],tema:tema,tag:tag||{},cor:Math.floor(n/RUMBLE)%2}); }
function addRoad(entra,fica,sai,curva,altura,tema,tag){ var y0=ultimaY(), y1=y0+altura*SEG, tot=entra+fica+sai, n;
  for(n=0;n<entra;n++) addSeg(easeIn(0,curva,n/entra),easeInOut(y0,y1,n/tot),tema,tag);
  for(n=0;n<fica;n++) addSeg(curva,easeInOut(y0,y1,(entra+n)/tot),tema,tag);
  for(n=0;n<sai;n++) addSeg(easeInOut(curva,0,n/sai),easeInOut(y0,y1,(entra+fica+n)/tot),tema,tag); }
var ESC=.74; /* pista ~2 min de corrida */
function reta(n,tema,tag){ addRoad(0,Math.round(n*ESC),0,0,0,tema,tag); }
function curva(n,c,alt,tema,tag){ n=Math.round(n*ESC); addRoad(Math.round(n*.25),Math.round(n*.5),Math.round(n*.25),c,alt||0,tema,tag); }
function morro(n,alt,tema,tag){ n=Math.round(n*ESC); addRoad(Math.round(n*.3),Math.round(n*.4),Math.round(n*.3),0,alt,tema,tag); }
/* curvas SUAVES (Paulo: "menos mudança de direção"): curvatura 1,5–3 */
function montaPista(){
  segs=[]; PITS=[];
  reta(120,'prado',{largada:1,arq:1});
  curva(140,2,0,'prado',{moedas:1}); morro(120,40,'prado'); curva(160,-2.5,0,'prado'); reta(80,'prado',{pad:1});
  morro(140,-40,'prado',{moedas:1}); curva(140,3,20,'prado');
  PITS.push({ini:segs.length}); reta(220,'prado',{pit:0}); PITS[0].fim=segs.length;
  curva(160,-2,0,'floresta',{moedas:1}); morro(140,60,'floresta'); curva(140,2.5,-30,'floresta'); reta(100,'floresta',{pad:1}); curva(160,-3,-30,'floresta',{moedas:1});
  reta(130,'ponte',{ponte:1}); curva(140,2,0,'pantano',{lama:1}); reta(140,'pantano',{lama:1,tinta:1}); morro(120,-30,'pantano');
  PITS.push({ini:segs.length}); reta(220,'prado',{pit:1}); PITS[1].fim=segs.length;
  curva(150,2.5,30,'floresta',{moedas:1}); curva(150,-2.5,0,'floresta'); reta(80,'floresta',{pad:1}); morro(140,50,'floresta'); curva(140,3,-40,'floresta');
  PITS.push({ini:segs.length}); reta(220,'prado',{pit:2}); PITS[2].fim=segs.length;
  CONDE_SEG=segs.length; curva(160,-2,0,'castelo',{conde:1}); morro(120,-40,'castelo'); curva(140,2,0,'castelo'); reta(260,'castelo',{arq:1,fim:1}); FIM_SEG=segs.length-150; reta(220,'castelo',{arq:1});
  TRACK=segs.length*SEG;
  PITS.forEach(function(P){ P.box=P.ini+70; });
  /* zebras nas curvas, cores por faixa */
  segs.forEach(function(s,i){ if(i>FIM_SEG&&i<FIM_SEG+3) s.chegada=true; if(i>=10&&i<13) s.largadaLinha=true; });
  montaSprites();
}
function segDe(z){ return segs[Math.floor(z/SEG)%segs.length]; }
/* enfeites da beira: árvores, arbustos, fardos, placas, arquibancadas, garagens do box, castelo */
var OBJ=null;
function spr(n,x,tipo,o){ if(n<0||n>=segs.length) return; var s={x:x,tipo:tipo}; if(o) for(var k in o) s[k]=o[k]; segs[n].sprites.push(s); }
function montaSprites(){
  OBJ={moedas:[],pads:[],poças:[]};
  for(var n=20;n<segs.length;n+=7){ var t=segs[n].tema, h=hash(n);
    if(segs[n].tag.ponte) continue;
    var lado=h<.5?-1:1, x=lado*(1.6+hash(n*3)*1.6);
    if(t==='floresta') spr(n,x,h<.7?'pinheiro':'arvore'); else if(t==='pantano') spr(n,x,h<.5?'junco':'arvore_seca'); else if(t==='castelo') spr(n,x,h<.5?'tocha':'bandeira'); else spr(n,x,h<.45?'arvore':(h<.7?'arbusto':(h<.85?'flores':'fardo')));
    if(hash(n*7)<.35) spr(n,-x*1.1,t==='floresta'?'arvore':'arbusto'); }
  segs.forEach(function(s,n){
    if(s.tag.arq&&n%14===0){ spr(n,-1.9,'arquibancada'); spr(n,1.9,'arquibancada'); }
    if(s.tag.ponte&&n%6===0){ spr(n,-1.15,'corrimao'); spr(n,1.15,'corrimao'); }
    if(Math.abs(s.curva)>1.5&&n%10===0) spr(n,s.curva>0?-1.25:1.25,'placa_curva',{dir:s.curva>0?1:-1});
  });
  PITS.forEach(function(P,pi){ spr(P.ini-60,1.45,'placa_pit'); spr(P.ini-25,1.45,'placa_pit'); for(var g=0;g<10;g++) spr(P.box-10+g*4,2.15,'garagem',{k:g===0?9:g-1,pi:pi}); spr(P.box+24,1.32,'caixa_box'); });
  spr(FIM_SEG-40,-1.7,'castelo'); spr(FIM_SEG,0,'portico'); spr(12,0,'portico_largada');
  /* moedas em grupos, sempre na pista; setas de impulso; poças do pântano */
  segs.forEach(function(s,n){ if(s.tag.moedas&&n%40===10){ var off=[-.55,0,.55][Math.floor(hash(n)*3)]; for(var m=0;m<5;m++) OBJ.moedas.push({n:n+m*3,x:off,vivo:true}); }
    if(s.tag.pad&&n%80===20) OBJ.pads.push({n:n,x:[-.5,.5][Math.floor(hash(n*2)*2)]});
    if(s.tag.tinta&&n%30===5) OBJ.poças.push({n:n,x:[-.55,0,.55][Math.floor(hash(n*5)*3)]});
    if(s.tag.lama&&n%26===13) OBJ.poças.push({n:n,x:[-.6,.6][Math.floor(hash(n*9)*2)],lama:true}); });
}

/* ============================================================
   CORREDORES
   ============================================================ */
var RIVAIS_DEF=[
  /* 18/10 (Paulo): o herói é SEMPRE mais rápido que todos; turbo e moedas só aceleram a chegada */
  {id:'dragon', v:.955, lider:1},{id:'knight', v:.95, lider:1},{id:'fairy', v:.945, lider:1},
  {id:'witch', v:.92},{id:'frog', v:.91},{id:'wolf', v:.90},{id:'red', v:.89},{id:'princess', v:.88},{id:'pig', v:.87}];
var COR_HEROI={lia:'#e11d48',theo:'#2563eb',bia:'#9333ea',leo:'#facc15'};
function corHeroi(){ return J.prog.cor||COR_HEROI[J.prog.heroi||'lia']||'#e11d48'; }
var R=null;
function novoCarro(id,z,x,eu){ return {id:id,z:z,x:x,v:0,eu:!!eu,giro:0,wob:0,turbo:0,pad:0,box:0,pitFeito:[false,false,false],tag:0,naTela:false,erroT:3+hash(z)*6,alvoX:x}; }
var FALAS={
  go:['GO! Hold ◀ ▶ to change lanes. Pass the others!','Vai! Segure ◀ ▶ para trocar de faixa. Passe os outros!'],
  pad:['Drive over the yellow arrows: BOOST!','Passe nas setas amarelas: IMPULSO!'],
  coin:['Coins make your cart faster!','As moedas deixam o carrinho mais rápido!'],
  pit:['Pit stop ahead: questions = TURBOS!','Pit stop logo ali: perguntas = TURBOS!'],
  ponte:['The troll bridge!','A ponte do troll!'],
  lama:['Witch swamp! Watch the ink!','O pântano da bruxa! Cuidado com a tinta!'],
  conde:['Count Scribble! Pass him!','O Conde Rabisco! Passe por ele!'],
  fim:['The finish line! Use your turbos!','A chegada! Use os turbos!']};
function inicia(f){
  if(!segs.length) montaPista(); instalaCena();
  R={f:f, fase:'apresenta', t:0, latas:0, acertos:0, paginas:0, pitRes:[], pitAtual:-1, pos:10, posPulse:0, anunc:null, fala:null, falou:{}, pt:[], podio:null, acabou:false, final:0, conde:null, auto:null, ultrap:0, erros:0, errosVistos:0};
  R.me=novoCarro(J.prog.heroi||'lia',2*SEG,0,true);
  R.rivais=RIVAIS_DEF.map(function(d,k){ var c=novoCarro(d.id,(4+Math.floor(k/2)*3+((9-k)>>1)*0)*SEG+ (8-k)*SEG*1.2,(k%2?.5:-.5),false); c.p=d; c.cor=CR.LISTA[d.id].cor; c.nome=CR.LISTA[d.id].nome; return c; });
  R.rivais.forEach(function(c,k){ c.z=(5+(8-k)*2.6+(c.p.lider?(3-k)*12:0))*SEG; }); /* os líderes saem lá na frente: alcançá-los leva a corrida toda */
  J.estado='corrida'; J.stats={perguntas:0,acertos:0}; J.pontos=0; J.corrida=R;
  J.nivel={moradores:[{feito:false},{feito:false},{feito:false}], quizIds:[]}; J.mundo=null;
  J.urso={x:0,y:0,vx:0,vy:0,estado:'ride',anim:0,invT:0,tam:1};
  J.in.left=J.in.right=J.in.jump=J.in.down=J.in.act=false;
  SOM.musica('pista'); G.hud();
  if(window.UI){ UI.modoNivel(false); UI.modoMapa(false); UI.modoCorrida(false); UI.quizBotoes(false); if(UI.poderHud) UI.poderHud(null); }
  botoes(true); document.body.classList.add('nacapa'); document.body.classList.add('emcorrida');
  fala('The Soapbox Rally! Meet the racers!','O Rali dos Carrinhos! Conheça os pilotos!');
}
function largar(){ if(!R||R.fase!=='apresenta'||R.t<.4) return false; document.body.classList.remove('nacapa'); R.fase='largada'; R.t=0; SOM.fx('clique'); if(window.UI) UI.modoNivel(true); botoes(true); fala('Ready… set…','Preparar… apontar…'); return true; }
function fala(en,pt){ if(!R) return; R.fala={en:en,pt:pt,t:0}; try{ say(en); }catch(e){} }
function falaUma(k){ if(R.falou[k]) return; R.falou[k]=true; fala(FALAS[k][0],FALAS[k][1]); }
function el(id){ return document.getElementById(id); }
function botoes(on){
  ['tDown','tAct'].forEach(function(id){ var b=el(id); if(b) b.style.display=on?'none':''; });
  var bj=el('tJump'); if(bj){ if(on) pintaTurbo(); else { bj.innerHTML='JUMP'; bj.style.flexDirection=''; bj.classList.remove('turbo0'); bj.setAttribute('aria-label','Jump'); } }
  if(!on&&window.UI) UI.acao(false,0);
}
var SVG_RAIO='<svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true"><path d="M14 2 4 14h7l-2 8 11-13h-7z" fill="#fde047" stroke="#92400e" stroke-width="1.6" stroke-linejoin="round"/></svg>';
function pintaTurbo(){ if(!R) return; var n=R.latas, b=el('tJump'); if(!b) return; b.innerHTML=SVG_RAIO+'<small style="display:block;font-size:15px;line-height:1">TURBO '+n+'</small>'; b.style.flexDirection='column'; b.setAttribute('aria-label','Turbo'); b.classList.toggle('turbo0',n<=0); }
function limpa(){ botoes(false); document.body.classList.remove('nacapa'); document.body.classList.remove('emcorrida'); R=null; J.corrida=null; }

/* ============================================================
   LAÇO
   ============================================================ */
function atualiza(dt){
  if(!R||R.acabou) return; R.t+=dt; if(R.fala) R.fala.t+=dt; if(R.posPulse>0) R.posPulse-=dt; if(R.anunc){ R.anunc.t+=dt; if(R.anunc.t>1.3) R.anunc=null; }
  for(var i=R.pt.length-1;i>=0;i--){ var p=R.pt[i]; p.vida-=dt; if(p.vida<=0) R.pt.splice(i,1); }
  switch(R.fase){
    case 'apresenta': break;
    case 'largada': var a0=Math.floor((R.t-dt)/.8), a1=Math.floor(R.t/.8); if(a1!==a0&&a1>=1&&a1<=3) SOM.fx(a1<3?'clique':'plim'); if(R.t>=2.4){ R.fase='corre'; R.t=0; R.goT=.9; fala(FALAS.go[0],FALAS.go[1]); } break;
    case 'corre': if(R.goT>0) R.goT-=dt; corre(dt); break;
    case 'box': R.me.v=0; if(R.t>.6) abrePit(); break;
    case 'saida': corre(dt); if(R.me.box<=0){ R.fase='corre'; } break;
    case 'chegada': corre(dt); if(R.t>2.2){ R.fase='podio'; R.t=0; montaPodio(); } break;
    case 'podio': if(R.podio) R.podio.t+=dt; break;
  }
}
function corre(dt){
  var me=R.me, chegando=R.fase==='chegada';
  dirigeHeroi(me,dt,chegando);
  R.rivais.forEach(function(r){ dirigeRival(r,dt); });
  if(R.conde) dirigeConde(dt);
  colisoes(dt); coletas(dt); turboFinal(dt); eventos();
  var pos=1; R.rivais.forEach(function(r){ if(r.z>me.z) pos++; });
  var naZona=pitDe(me.z)||me.box>0||R.rivais.some(function(r){ return r.box>0; }); if(naZona) pos=R.pos; /* no pit, a posição fica congelada (todos param o mesmo tempo) */
  if(pos<R.pos){ SOM.fx('plim'); R.posPulse=.7; G.pontua(50); R.ultrap++; R.anunc={txt:'▲ '+ord(pos)+'!',pt:'Subiu para '+pos+'º!',cor:'#4ade80',t:0}; }
  else if(pos>R.pos){ R.posPulse=.7; R.anunc={txt:'▼ '+ord(pos),pt:'Caiu para '+pos+'º',cor:'#f87171',t:0}; }
  R.pos=pos;
  if(!chegando&&me.z>=FIM_SEG*SEG){ R.fase='chegada'; R.t=0; R.final=R.pos; SOM.fx('vitoria'); fala(R.pos===1?'Checkered flag! You WIN!':'Checkered flag! You finished '+ord(R.pos)+'!',R.pos===1?'Bandeira quadriculada! Você VENCEU!':'Bandeira quadriculada! Você chegou em '+R.pos+'º!'); }
}
function pitDe(z){ var n=Math.floor(z/SEG); for(var i=0;i<PITS.length;i++){ var P=PITS[i]; if(n>=P.ini-30&&n<=P.fim) return {pi:i,P:P}; } return null; }
function boxZ(c,P){ var slot=c.eu?0:R.rivais.indexOf(c)+1; return (P.box-10+slot*4)*SEG; } /* o herói tem a 1ª garagem */
function limitePit(falta){ return Math.max(VMAX*.1,Math.min(VMAX*.5,VMAX*.5*falta/(SEG*12))); } /* faixa do box: o mesmo limite para todos; freia só nos últimos 12 segmentos */
/* o herói: acelera sozinho; ◀ ▶ trocam de faixa; sem tocar, a pista o traz de volta */
function dirigeHeroi(me,dt,chegando){
  var s=segDe(me.z+PLAYER_Z), pz=pitDe(me.z), vm=VMAX*(1+Math.min(10,me.moedas||0)*.005);
  if(me.turbo>0){ me.turbo-=dt; vm*=1.7; } if(me.pad>0){ me.pad-=dt; vm*=1.4; } if(me.wob>0) me.wob-=dt;
  var inp=0;
  if(R.auto){ inp=pilotoAuto(me); }
  else { inp=(J.in.right?1:0)-(J.in.left?1:0); if((J.in.act||J.in.jump)&&J.actSolto){ J.actSolto=false; usaTurbo(); } if(!J.in.act&&!J.in.jump) J.actSolto=true; }
  if(chegando){ inp=0; vm*=Math.max(0,1-R.t/1.8); }
  var k=me.v/VMAX, dx=dt*1.5*Math.max(.35,k);
  /* box: entra na faixa do pit, para na SUA garagem, espera o mesmo tempo que todos */
  if(pz&&!me.pitFeito[pz.pi]){ var zb=boxZ(me,pz.P), falta=zb-me.z; me.x+=(1.4-me.x)*Math.min(1,dt*2); vm=Math.min(vm,falta<0?0:limitePit(falta)); if(falta<=SEG*.5){ me.z=zb; me.v=0; me.pitFeito[pz.pi]=true; R.fase='box'; R.t=0; R.pitAtual=pz.pi; SOM.fx('checkpoint'); fala('Pit stop! Answer to win TURBOS!','Pit stop! Responda para ganhar TURBOS!'); return; } }
  else if(me.box>0){ me.box-=dt; vm=0; me.v=0; if(me.box<=0){ fala(R.latas>0?'GO! Press ▲ to use a TURBO!':'GO!',R.latas>0?'Vai! Aperte ▲ para usar um TURBO!':'Vai!'); } }
  else {
    me.x+=dx*inp;
    if(!inp){ var alvo=cl(me.x,-.75,.75); me.x+=(alvo-me.x)*Math.min(1,dt*1.2); } /* direção assistida: sem tocar, volta para a pista */
    me.x-=dx*k*s.curva*.12; /* força da curva, bem leve */
  }
  if(Math.abs(me.x)>1.15&&!pz) vm*=.55; /* grama: mais devagar, nunca para */
  me.x=cl(me.x,-2,2.2);
  if(me.v<vm) me.v=Math.min(vm,me.v+ACEL*dt*(me.turbo>0||me.pad>0?2.5:1)); else me.v=Math.max(vm,me.v-ACEL*2*dt);
  me.z+=me.v*dt; me.inc=inp;
}
/* rivais: andam na sua velocidade, desviam de quem está à frente, erram à vista, param no box o mesmo tempo */
function dirigeRival(r,dt){
  var pz=pitDe(r.z), vm=VMAX*r.p.v*banda(r);
  if(r.giro>0){ r.giro-=dt; vm*=.35; } if(r.wob>0){ r.wob-=dt; vm*=.7; }
  if(pz&&!r.pitFeito[pz.pi]){ var zb=boxZ(r,pz.P), falta=zb-r.z; r.alvoX=1.4; vm=Math.min(vm,limitePit(falta)); if(falta<=SEG*.5){ r.z=zb; r.v=0; r.pitFeito[pz.pi]=true; r.box=PIT_T; } }
  if(r.box>0){ r.box-=dt; r.v=0; r.x+=(1.4-r.x)*Math.min(1,dt*3); return; }
  if(!pz||r.pitFeito[pz.pi]){ if(Math.abs(r.alvoX)>1) r.alvoX=r.ondaX||0; desvia(r); }
  /* erro de vez em quando — mais perto do herói, para a criança VER */
  r.erroT-=dt; if(r.erroT<=0&&!pz){ var perto=Math.abs(r.z-R.me.z)<SEG*60; r.erroT=(perto?4:9)+hash(r.z)*6; if(perto||hash(r.z*3)<.4){ R.erros++; if(perto) R.errosVistos++; if(hash(r.z*7)<.55){ r.giro=1.2; if(perto) texto(r,'WHEEE!'); } else { r.alvoX=(r.x>0?1:-1)*1.5; r.wob=1.3; if(perto) texto(r,'OOPS!'); } } }
  r.x+=(r.alvoX-r.x)*Math.min(1,dt*1.6);
  if(r.v<vm) r.v=Math.min(vm,r.v+ACEL*.9*dt); else r.v=Math.max(vm,r.v-ACEL*2*dt);
  r.z+=r.v*dt;
}
/* elástico só FORA da tela (os líderes não esperam; os de trás não somem para sempre) */
function banda(r){ var dz=r.z-R.me.z; if(Math.abs(dz)<SEG*80) return 1; if(dz>SEG*140&&!r.p.lider) return .96; if(dz<-SEG*120) return 1.04; return 1; }
function desvia(r){ var a=null; [R.me].concat(R.rivais).forEach(function(o){ if(o===r) return; var dz=o.z-r.z; if(dz>0&&dz<SEG*8&&Math.abs(o.x-r.x)<.45&&o.v<r.v){ if(!a||dz<a.dz) a={o:o,dz:dz}; } });
  if(a){ var lado=a.o.x>0?-1:1; r.alvoX=cl(a.o.x+lado*.7,-.8,.8); } else if(!r.ondaT||R.t>r.ondaT){ r.ondaT=R.t+3+hash(r.z)*4; r.ondaX=[-.55,0,.55][Math.floor(hash(r.z*2+R.t)*3)]; r.alvoX=r.ondaX; } }
function pilotoAuto(me){ var alvo=0, best=null; R.rivais.forEach(function(o){ var dz=o.z-me.z; if(dz>0&&dz<SEG*10&&Math.abs(o.x-me.x)<.5){ best=o; } }); if(best) alvo=best.x>0?-.6:.6; else { OBJ.moedas.forEach(function(m){ if(m.vivo&&m.n*SEG>me.z&&m.n*SEG<me.z+SEG*20) alvo=m.x; }); } var d=alvo-me.x; return Math.abs(d)<.08?0:(d>0?1:-1); }
/* encostar: só balança e freia um pouco, nunca machuca */
function colisoes(dt){ var me=R.me; if(me.box>0) return;
  R.rivais.forEach(function(r){ if(r.box>0) return; var dz=r.z-me.z; if(dz>0&&dz<SEG*.9&&Math.abs(r.x-me.x)<.42){ if(me.turbo>0){ r.x+=me.x<r.x?.3:-.3; r.wob=.4; } else { me.v=Math.min(me.v,r.v*.95); if(me.wob<=0){ me.wob=.5; SOM.fx('pisao'); texto(me,'BOING!'); } } } }); }
function coletas(dt){ var me=R.me, n=Math.floor((me.z+PLAYER_Z)/SEG);
  OBJ.moedas.forEach(function(m){ if(m.vivo&&Math.abs(m.n-n)<1&&Math.abs(m.x-me.x)<.32){ m.vivo=false; me.moedas=Math.min(10,(me.moedas||0)+1); J.moedas++; G.pontua(10); SOM.fx('moeda'); falaUma('coin'); } });
  OBJ.pads.forEach(function(p){ if(Math.abs(p.n-n)<1&&Math.abs(p.x-me.x)<.4&&me.pad<=0){ me.pad=1; SOM.fx('mola'); texto(me,'BOOST!'); } });
  OBJ.poças.forEach(function(p){ if(Math.abs(p.n-n)<1&&Math.abs(p.x-me.x)<.4&&me.wob<=0){ me.wob=.8; me.v*=p.lama?.75:.8; SOM.fx('folha'); texto(me,p.lama?'SPLAT!':'INK!'); } });
  R.rivais.forEach(function(r){ var rn=Math.floor(r.z/SEG); OBJ.poças.forEach(function(p){ if(Math.abs(p.n-rn)<1&&Math.abs(p.x-r.x)<.4&&r.giro<=0&&!p.lama){ r.giro=1.2; R.erros++; if(Math.abs(r.z-me.z)<SEG*60){ R.errosVistos++; texto(r,'WHEEE!'); } } }); }); }
function texto(c,txt){ R.pt.push({c:c,txt:txt,vida:1,max:1}); }
function eventos(){ var me=R.me, s=segDe(me.z+PLAYER_Z*3), n=Math.floor(me.z/SEG);
  if(s.tag.pad) falaUma('pad'); if(s.tag.ponte) falaUma('ponte'); if(s.tag.lama) falaUma('lama'); if(R.conde) falaUma('conde'); if(n>FIM_SEG-160) falaUma('fim');
  PITS.forEach(function(P,i){ if(n>P.ini-90&&n<P.ini&&!R.falou['pit'+i]){ R.falou['pit'+i]=true; fala(FALAS.pit[0],FALAS.pit[1]); } });
  if(!R.conde&&n>CONDE_SEG){ R.conde=novoCarro('count',me.z+SEG*45,0,false); R.conde.v=VMAX*.85; R.conde.tiro=1.5; SOM.fx('risada'); SOM.musica('chefao'); } }
/* o Conde: anda na frente e solta poças de tinta do tinteiro (a origem é ele) */
function dirigeConde(dt){ var C=R.conde, me=R.me; var vm=VMAX*(C.z>me.z+SEG*60?.7:.9); C.v+=(vm-C.v)*Math.min(1,dt*2); C.z+=C.v*dt; C.x+=(Math.sin(R.t*.7)*.6-C.x)*Math.min(1,dt);
  C.tiro-=dt; if(C.tiro<=0&&C.z>me.z&&C.z<FIM_SEG*SEG-SEG*60){ C.tiro=2.2; OBJ.poças.push({n:Math.floor(C.z/SEG)-2,x:C.x,nova:.6}); SOM.fx('folha'); }
  if(!C.passado&&me.z>C.z+SEG){ C.passado=true; fala('You passed Count Scribble!','Você passou o Conde Rabisco!'); G.pontua(150); } }
function turboFinal(dt){ if(R.fase!=='corre'||R.latas<=0) return; var falta=(FIM_SEG*SEG-R.me.z)/VMAX;
  if(falta<2.6*R.latas+2){ R.autoT=(R.autoT||0)-dt; if(R.autoT<=0){ R.autoT=.6; usaTurbo(true); } }
  else if(falta<2.6*R.latas+6&&!R.avisoFinal){ R.avisoFinal=true; fala('USE YOUR TURBO! Press ▲!','USE O SEU TURBO! Aperte ▲!'); } }
function usaTurbo(auto){
  if(!R||R.acabou||(R.fase!=='corre'&&R.fase!=='saida')) return false;
  if(R.latas<=0){ if(!auto&&(!R.avisoSem||R.t-R.avisoSem>4)){ R.avisoSem=R.t; fala('No turbos yet! Answer right at the pit stop.','Ainda sem turbo! Acerte no pit stop.'); } return false; }
  if(R.me.box>0) return false; var pz=pitDe(R.me.z); if(pz&&!R.me.pitFeito[pz.pi]) return false;
  R.latas--; R.me.turbo=R.me.turbo>0?R.me.turbo+2.5:2.5; SOM.fx('arremesso'); pintaTurbo(); if(!auto) fala('TURBO!','TURBO!'); return true; }

/* ============================================================
   PIT STOP: só perguntas (conceito + historinha + rápida)
   ============================================================ */
function abrePit(){
  R.fase='pit'; R.t=0; R.pitRes=[];
  var itens=QUIZ.escolhe({tema:'realmb',mix:['conceito','leitura','rapida']},3,J.nivel.quizIds||[]);
  R.mPit={x:110,y:350,tipo:'announcer',falando:0};
  J.in.left=J.in.right=J.in.act=false;
  QUIZ.inicia(R.mPit,{itens:itens,
    aoResponder:function(ok){ if(!R) return; R.pitRes.push(ok); if(ok){ R.acertos++; R.latas=Math.min(9,R.latas+1); SOM.fx('moedaG'); R.anunc={txt:'+1 TURBO',pt:'+1 turbo',cor:'#fde047',t:0}; } },
    aoTerminar:function(){ fimPit(true); },
    aoSair:function(){ fimPit(false); }});
  if(J.estado!=='quiz') fimPit(false);
}
function fimPit(completo){
  if(!R||R.fase!=='pit') return;
  J.estado='corrida'; R.fase='saida'; R.t=0; R.me.box=PIT_T; /* o mesmo tempo de box que os rivais */
  SOM.musica(R.conde?'chefao':'pista'); J.in.left=J.in.right=J.in.act=false;
  if(window.UI){ UI.quizBotoes(false); UI.modoNivel(true); } botoes(true);
  if(completo){ R.paginas++; var m=J.nivel.moradores[R.paginas-1]; if(m) m.feito=true; G.pontua(150); SOM.fx('vitoria'); G.toast('You found a lost page! ('+R.paginas+' of 3)',2600,'Você achou uma página perdida! ('+R.paginas+' de 3)'); }
  G.hud(); pintaTurbo(); fala(R.latas>0?'The crew is fast! '+R.latas+' TURBO'+(R.latas>1?'S':'')+' ready!':'The crew is fast! Get ready…',R.latas>0?'A equipe é rápida! '+R.latas+' TURBO'+(R.latas>1?'S':'')+' prontos!':'A equipe é rápida! Prepare-se…');
}
function montaPodio(){
  var lista=[{id:R.me.id,eu:true,z:R.me.z,cor:corHeroi()}]; R.rivais.forEach(function(r){ lista.push({id:r.id,z:r.z,cor:r.cor}); });
  lista.sort(function(a,b){ return b.z-a.z; }); var pos=Math.max(1,R.final||R.pos); lista=lista.filter(function(x){ return !x.eu; }); lista.splice(pos-1,0,{id:R.me.id,eu:true,cor:corHeroi()});
  R.podio={lista:lista.slice(0,3),pos:pos,t:0}; if(window.UI) UI.modoNivel(false);
  G.pontua(pos===1?300:(pos===2?200:(pos===3?150:100)));
  try{ say(pos<=3?['Gold medal!','Silver medal!','Bronze medal!'][pos-1]:'Great race!'); }catch(e){}
}
function continua(){ if(!R||R.fase!=='podio'||R.podio.t<.6) return false; SOM.fx('clique'); termina(); return true; }
function termina(){ var f=R.f; botoes(false); document.body.classList.remove('emcorrida'); if(window.UI) UI.modoCorrida(false); J.nivel.moradores.forEach(function(m,k){ m.feito=R.paginas>k; }); J.mundo=null; J.faseAtual=f; J.urso={estado:'cheer',anim:0}; R.acabou=true; J.corrida=null; G.fimDeFase(); }
function toque(lx,ly){ if(!R||R.acabou) return false; if(R.fase==='podio'){ continua(); return true; } if(R.fase==='apresenta'){ if(lx>W-260&&ly>H-80) largar(); return true; } return false; }
function tecla(k){ if(!R||R.acabou) return false; if(R.fase==='podio'&&(k==='Enter'||k===' '||k==='x'||k==='X')){ continua(); return true; }
  if(R.fase==='apresenta'){ if(k==='Enter'||k===' ') largar(); return true; }
  if(k==='x'||k==='X'||k==='Enter'||k===' '){ usaTurbo(); return true; } return false; }

/* ============================================================
   DESENHO 2,5D
   ============================================================ */
function instalaCena(){
  if(!window.CENA||CENA.__corrida) return; var orig=CENA.desenha; CENA.__corrida=true;
  CENA.desenha=function(){
    var st=J.estado;
    if(R&&!R.acabou&&R.fase==='pit'&&(st==='quiz'||st==='nivel')){ if(st==='nivel'&&!J.quiz) fimPit(true); return desenhaProprio(); }
    if(R&&R.acabou&&st==='fimFase') return desenhaProprio();
    if(R&&st!=='corrida'&&st!=='quiz'&&!(st==='nivel'&&R.fase==='pit')) limpa();
    return orig.apply(this,arguments);
  };
}
function desenhaProprio(){
  var c=G.ctx(), e=G.escala(), d=G.dpr(); if(!c) return;
  c.setTransform(e*d,0,0,e*d,0,0); c.save();
  desenha(c);
  if(J.quiz&&window.QUIZ){ QUIZ.desenhaTela(c,J.t); molduraPit(c,J.t); }
  if(J.fimFase){ var k=Math.min(1,J.fimFase.t/.8); c.fillStyle='rgba(13,11,30,'+(k*.35)+')'; c.fillRect(0,0,W,H); }
  if(J.flash>0){ c.fillStyle='rgba(255,255,255,'+(J.flash*.5)+')'; c.fillRect(0,0,W,H); }
  if(J.trans) A.iris(c,J.trans.x,J.trans.y,G.raioIris());
  c.restore();
}
function projeta(p,camX,camY,camZ){ p.camera.x=(p.world.x||0)-camX; p.camera.y=p.world.y-camY; p.camera.z=p.world.z-camZ; p.screen.scale=CAM_D/p.camera.z; p.screen.x=Math.round(W/2+p.screen.scale*p.camera.x*W/2); p.screen.y=Math.round(H/2-p.screen.scale*p.camera.y*H/2); p.screen.w=Math.round(p.screen.scale*ROAD*W/2); }
function poli(c,x1,y1,x2,y2,x3,y3,x4,y4,cor){ c.fillStyle=cor; c.beginPath(); c.moveTo(x1,y1); c.lineTo(x2,y2); c.lineTo(x3,y3); c.lineTo(x4,y4); c.closePath(); c.fill(); }
var VIS=[];
function desenha(c){
  if(!R) return; var t=J.t, me=R.me;
  if(R.fase==='apresenta'){ apresentacao(c,t); return; }
  var base=segDe(me.z), basePct=(me.z%SEG)/SEG, tema=TEMAS[segDe(me.z+PLAYER_Z).tema];
  /* céu e morros distantes (sobem e deslizam com a curva) */
  var g=c.createLinearGradient(0,0,0,H*.55); g.addColorStop(0,tema.ceu[0]); g.addColorStop(1,tema.ceu[1]); c.fillStyle=g; c.fillRect(0,0,W,H);
  R.ceuX=(R.ceuX||0)+base.curva*.002*(me.v/VMAX); fundo(c,t,tema);
  var playerY=lerp(base.p1.world.y,base.p2.world.y,basePct), camX=me.x*ROAD, camY=playerY+CAM_H, camZ=me.z;
  var maxy=H, x=0, dx=-(base.curva*basePct); VIS=[];
  for(var n=0;n<DRAW;n++){
    var s=segs[(base.i+n)%segs.length]; if(base.i+n>=segs.length) break;
    s.p1.world.x=0; s.p2.world.x=0;
    projeta(s.p1,camX-x,camY,camZ); projeta(s.p2,camX-x-dx,camY,camZ); x+=dx; dx+=s.curva;
    s.clip=maxy;
    if(s.p1.camera.z<=CAM_D||s.p2.screen.y>=s.p1.screen.y||s.p2.screen.y>=maxy) continue;
    segmento(c,s);
    maxy=s.p1.screen.y; VIS.push(s);
  }
  /* de trás para a frente: enfeites, objetos do chão já foram; carrinhos */
  for(var k=VIS.length-1;k>=0;k--){ var sg=VIS[k];
    sg.sprites.forEach(function(sp){ var sc=sg.p1.screen.scale, sx=sg.p1.screen.x+sc*sp.x*ROAD*W/2, sy=sg.p1.screen.y; desenhaSprite(c,sp,sx,sy,sc*W/2,t,sg.clip); });
    carrosNoSeg(c,sg,t);
  }
  /* o herói, grande, embaixo e no centro */
  var inc=(me.inc||0)+(me.wob>0?Math.sin(t*30)*.6:0), bob=Math.sin(t*20)*(me.v>VMAX*.3?1.5:0);
  c.save(); c.translate(W/2,H-12+bob); var esc=.95; c.scale(esc,esc); CR.desenhaTras(c,me.id,{cor:corHeroi(),t:t,inc:inc,turbo:me.turbo>0||me.pad>0,eu:true}); c.restore();
  if(R.fase!=='podio'){ c.fillStyle='#fde047'; c.strokeStyle='#78350f'; c.lineWidth=2; var yb=H-150+Math.sin(t*6)*3; c.beginPath(); c.moveTo(W/2,yb+10); c.lineTo(W/2-8,yb); c.lineTo(W/2+8,yb); c.closePath(); c.fill(); c.stroke(); c.font=F(900,12); c.fillStyle='rgba(234,179,8,.95)'; rr(c,W/2-18,yb-17,36,16,8); c.fill(); c.fillStyle='#1e1b3a'; c.textAlign='center'; c.textBaseline='middle'; c.fillText('YOU',W/2,yb-8.5); }
  hud(c,t);
  if(R.fase==='largada') largada(c,t);
  if(R.goT>0) textoGrande(c,'GO!','#4ade80',1-R.goT/.9);
  if(R.fase==='podio') podio(c,t);
}
function fundo(c,t,tema){
  var off=((R.ceuX||0)*400)%W, hz=H*.5;
  c.fillStyle='rgba(255,255,255,.85)'; for(var k=0;k<5;k++){ var nx=((k*230-off*.3)%(W+200)+W+200)%(W+200)-100, ny=60+(k%3)*30; A.circ(c,nx,ny,18); c.fill(); A.circ(c,nx+22,ny-8,22); c.fill(); A.circ(c,nx+46,ny,16); c.fill(); }
  c.fillStyle=tema===TEMAS.castelo?'#5b21b6':'#86b38a'; c.beginPath(); c.moveTo(0,hz); for(var x=0;x<=W;x+=20) c.lineTo(x,hz-30-Math.sin((x+off)*.012)*28-Math.sin((x+off)*.031)*12); c.lineTo(W,hz); c.closePath(); c.fill();
  c.fillStyle=tema===TEMAS.castelo?'#4c1d95':'#5f9a5c'; c.beginPath(); c.moveTo(0,hz); for(var x2=0;x2<=W;x2+=20) c.lineTo(x2,hz-12-Math.sin((x2+off*1.6)*.02)*14); c.lineTo(W,hz); c.closePath(); c.fill();
  c.fillStyle=tema.grama[0]; c.fillRect(0,hz,W,H-hz);
}
function segmento(c,s){
  var T=TEMAS[s.tema], p1=s.p1.screen, p2=s.p2.screen, cor=s.cor;
  c.fillStyle=T.grama[cor]; c.fillRect(0,p2.y,W,p1.y-p2.y);
  if(s.tag.pit!==undefined){ /* faixa do pit à direita: concreto claro */ poli(c,p1.x+p1.w,p1.y,p1.x+p1.w*1.8,p1.y,p2.x+p2.w*1.8,p2.y,p2.x+p2.w,p2.y,cor?'#cbd5e1':'#d6dbe2'); }
  var r1=p1.w/6, r2=p2.w/6;
  poli(c,p1.x-p1.w-r1,p1.y,p1.x-p1.w,p1.y,p2.x-p2.w,p2.y,p2.x-p2.w-r2,p2.y,T.zebra[cor]);
  poli(c,p1.x+p1.w+r1,p1.y,p1.x+p1.w,p1.y,p2.x+p2.w,p2.y,p2.x+p2.w+r2,p2.y,T.zebra[cor]);
  poli(c,p1.x-p1.w,p1.y,p1.x+p1.w,p1.y,p2.x+p2.w,p2.y,p2.x-p2.w,p2.y,T.estrada[cor]);
  if(s.tag.ponte){ c.strokeStyle='rgba(69,26,3,.5)'; c.lineWidth=1; c.beginPath(); c.moveTo(p1.x-p1.w,p1.y); c.lineTo(p1.x+p1.w,p1.y); c.stroke(); }
  if(cor&&T.faixa){ var l1=p1.w/32, l2=p2.w/32; for(var k=1;k<LANES;k++){ var lx1=p1.x-p1.w+p1.w*2/LANES*k, lx2=p2.x-p2.w+p2.w*2/LANES*k; poli(c,lx1-l1/2,p1.y,lx1+l1/2,p1.y,lx2+l2/2,p2.y,lx2-l2/2,p2.y,T.faixa); } }
  if(s.chegada||s.largadaLinha){ var q=12; for(var j=0;j<q;j++){ var a1=p1.x-p1.w+p1.w*2/q*j, a2=p2.x-p2.w+p2.w*2/q*j, b1=p1.x-p1.w+p1.w*2/q*(j+1), b2=p2.x-p2.w+p2.w*2/q*(j+1); poli(c,a1,p1.y,b1,p1.y,b2,p2.y,a2,p2.y,(j+s.i)%2?'#111827':'#f8fafc'); } }
  /* objetos no chão deste segmento */
  OBJ.pads.forEach(function(pd){ if(pd.n!==s.i) return; var cx1=p1.x+p1.w*pd.x, w1=p1.w*.28, cx2=p2.x+p2.w*pd.x, w2=p2.w*.28; poli(c,cx1-w1,p1.y,cx1+w1,p1.y,cx2+w2,p2.y,cx2-w2,p2.y,'#facc15'); c.fillStyle='#ea580c'; c.beginPath(); c.moveTo(cx1-w1*.6,p1.y); c.lineTo((cx1+cx2)/2,(p1.y+p2.y)/2-Math.max(2,(p1.y-p2.y)*.4)); c.lineTo(cx1+w1*.6,p1.y); c.closePath(); c.fill(); });
  OBJ.poças.forEach(function(pc){ if(pc.n!==s.i) return; var cx=lerp(p1.x+p1.w*pc.x,p2.x+p2.w*pc.x,.5), w=p1.w*.25*(pc.nova>0?1-pc.nova:1), h=Math.max(3,(p1.y-p2.y)*1.6); c.fillStyle=pc.lama?'#78350f':'#312e81'; A.el(c,cx,(p1.y+p2.y)/2,w,h); c.fill(); c.fillStyle=pc.lama?'#92400e':'#4338ca'; A.el(c,cx-w*.2,(p1.y+p2.y)/2-h*.2,w*.5,h*.4); c.fill(); });
}
function carrosNoSeg(c,sg,t){
  var lst=R.rivais.slice(); if(R.conde) lst.push(R.conde);
  lst.forEach(function(r){ var n=Math.floor(r.z/SEG); if(n!==sg.i) return; var pct=(r.z%SEG)/SEG, sc=lerp(sg.p1.screen.scale,sg.p2.screen.scale,pct), sx=lerp(sg.p1.screen.x,sg.p2.screen.x,pct)+sc*r.x*ROAD*W/2, sy=lerp(sg.p1.screen.y,sg.p2.screen.y,pct);
    if(sy>sg.clip+2) return; var k=sc*W/2*CARRO_W/120; if(k<.05) return;
    c.save(); c.translate(sx,sy); c.scale(k,k); CR.desenhaTras(c,r.id,{cor:r.cor,t:t+r.z*.001,inc:cl((r.alvoX-r.x)*2,-1,1),giro:r.giro>0?1-r.giro/1.2:0,turbo:false}); c.restore();
    r.scr={x:sx,y:sy-k*110,k:k};
    if(k>.25&&k<1.3&&R.fase!=='largada'&&!(Math.abs(sx-W/2)<120&&sy>H-200)){ var nm=r.nome||'Count Scribble'; c.font=F(900,Math.round(11+k*4)); var tw=c.measureText(nm).width+12; c.fillStyle=r.id==='count'?'rgba(76,29,149,.9)':'rgba(13,11,30,.7)'; rr(c,sx-tw/2,sy-k*120-22,tw,18,9); c.fill(); c.fillStyle=r.id==='count'?'#fde68a':'#fff'; c.textAlign='center'; c.textBaseline='middle'; c.fillText(nm,sx,sy-k*120-13); }
  });
  /* moedas deste segmento */
  OBJ.moedas.forEach(function(m){ if(!m.vivo||m.n!==sg.i) return; var sc=sg.p1.screen.scale, sx=sg.p1.screen.x+sc*m.x*ROAD*W/2, sy=sg.p1.screen.y, r=Math.max(2,sc*W/2*90), w=Math.abs(Math.cos(t*4+m.n)); c.fillStyle='#f59e0b'; A.el(c,sx,sy-r*1.4,r*w+1,r); c.fill(); c.fillStyle='#fde047'; A.el(c,sx,sy-r*1.4,r*.7*w+.5,r*.7); c.fill(); });
  /* textos dos carros (WHEEE!, BOING!) */
  R.pt.forEach(function(p){ if(!p.c||p.c.eu||!p.c.scr||Math.floor(p.c.z/SEG)!==sg.i) return; var a=p.vida/p.max; c.save(); c.globalAlpha=Math.min(1,a*2); c.font=F(900,20); c.textAlign='center'; c.lineWidth=5; c.strokeStyle='rgba(13,11,30,.8)'; c.strokeText(p.txt,p.c.scr.x,p.c.scr.y-20-(1-a)*20); c.fillStyle='#fde68a'; c.fillText(p.txt,p.c.scr.x,p.c.scr.y-20-(1-a)*20); c.restore(); });
}
/* enfeites: tamanho em "unidades do mundo" → pixels pela escala do segmento */
function desenhaSprite(c,sp,x,y,k,t,clip){
  if(y>clip+4) return; var s=k; c.save(); c.translate(x,y);
  switch(sp.tipo){
    case 'arvore': c.scale(s*700/100,s*700/100); c.fillStyle='#78350f'; c.fillRect(-6,-40,12,40); c.fillStyle='#166534'; A.circ(c,0,-62,34); c.fill(); c.fillStyle='#22c55e'; A.circ(c,-12,-72,18); c.fill(); A.circ(c,14,-66,16); c.fill(); break;
    case 'pinheiro': c.scale(s*800/100,s*800/100); c.fillStyle='#78350f'; c.fillRect(-5,-20,10,20); [[0,'#14532d'],[20,'#166534'],[38,'#15803d']].forEach(function(l){ c.fillStyle=l[1]; c.beginPath(); c.moveTo(-34+l[0]*.5,-20-l[0]); c.lineTo(0,-70-l[0]); c.lineTo(34-l[0]*.5,-20-l[0]); c.closePath(); c.fill(); }); break;
    case 'arbusto': c.scale(s*500/100,s*500/100); c.fillStyle='#15803d'; A.circ(c,-14,-14,16); c.fill(); A.circ(c,12,-14,18); c.fill(); A.circ(c,0,-26,16); c.fill(); c.fillStyle='#f472b6'; A.circ(c,6,-22,3); c.fill(); break;
    case 'flores': c.scale(s*400/100,s*400/100); for(var f=0;f<6;f++){ c.fillStyle=['#fde047','#f472b6','#fff','#a78bfa'][f%4]; A.circ(c,-20+f*8,-6-(f%2)*6,5); c.fill(); } break;
    case 'fardo': c.scale(s*500/100,s*500/100); c.fillStyle=A.lin(c,-30,0,30,0,'#fde68a','#d97706'); rr(c,-30,-34,60,34,8); c.fill(); c.strokeStyle='#b91c1c'; c.lineWidth=3; c.beginPath(); c.moveTo(-30,-18); c.lineTo(30,-18); c.stroke(); break;
    case 'junco': c.scale(s*500/100,s*500/100); c.strokeStyle='#3f6212'; c.lineWidth=4; for(var j=0;j<5;j++){ c.beginPath(); c.moveTo(-12+j*6,0); c.lineTo(-16+j*8,-50-j%2*10); c.stroke(); } c.fillStyle='#78350f'; for(var j2=0;j2<3;j2++){ A.el(c,-12+j2*12,-50,4,10); c.fill(); } break;
    case 'arvore_seca': c.scale(s*700/100,s*700/100); c.strokeStyle='#44403c'; c.lineWidth=7; c.beginPath(); c.moveTo(0,0); c.lineTo(0,-60); c.lineTo(-20,-84); c.moveTo(0,-50); c.lineTo(22,-74); c.stroke(); break;
    case 'tocha': c.scale(s*600/100,s*600/100); c.fillStyle='#57534e'; c.fillRect(-4,-60,8,60); var fl=Math.sin(t*14)*3; c.fillStyle='#f97316'; c.beginPath(); c.moveTo(-10,-60); c.quadraticCurveTo(0,-92-fl,10,-60); c.fill(); c.fillStyle='#fde047'; c.beginPath(); c.moveTo(-5,-60); c.quadraticCurveTo(0,-76-fl,5,-60); c.fill(); break;
    case 'bandeira': c.scale(s*600/100,s*600/100); c.strokeStyle='#e5e7eb'; c.lineWidth=4; c.beginPath(); c.moveTo(0,0); c.lineTo(0,-80); c.stroke(); var w=Math.sin(t*6+x)*5; c.fillStyle='#a855f7'; c.beginPath(); c.moveTo(0,-80); c.quadraticCurveTo(18,-84+w,34,-74+w); c.lineTo(0,-62); c.closePath(); c.fill(); break;
    case 'arquibancada': c.scale(s*2400/300,s*2400/300); c.fillStyle='#94a3b8'; c.fillRect(-150,-110,300,110); for(var r2=0;r2<5;r2++){ c.fillStyle=r2%2?'#cbd5e1':'#e2e8f0'; c.fillRect(-150,-110+r2*22,300,20); for(var q=0;q<18;q++){ var hh=hash(r2*31+q+x); c.fillStyle=['#ef4444','#3b82f6','#fde047','#22c55e','#f97316','#ec4899'][Math.floor(hh*6)]; A.circ(c,-142+q*16.6,-98+r2*22+Math.sin(t*(6+hh*4)+q)*1.5,6); c.fill(); c.fillStyle='#f5d0a9'; A.circ(c,-142+q*16.6,-106+r2*22+Math.sin(t*(6+hh*4)+q)*1.5,4); c.fill(); } } break;
    case 'corrimao': c.scale(s*300/100,s*300/100); c.fillStyle='#78350f'; c.fillRect(-4,-40,8,40); c.fillRect(-30,-40,60,6); break;
    case 'placa_curva': c.scale(s*600/100,s*600/100); c.fillStyle='#57534e'; c.fillRect(-3,-40,6,40); c.fillStyle='#fde047'; rr(c,-30,-70,60,32,6); c.fill(); c.fillStyle='#1c1917'; c.beginPath(); var d=sp.dir; c.moveTo(-14*d,-54); c.lineTo(10*d,-64); c.lineTo(10*d,-44); c.closePath(); c.fill(); break;
    case 'placa_pit': c.scale(s*800/100,s*800/100); c.fillStyle='#57534e'; c.fillRect(-4,-50,8,50); c.fillStyle='#fde047'; rr(c,-46,-92,92,44,8); c.fill(); c.strokeStyle='#1c1917'; c.lineWidth=3; rr(c,-46,-92,92,44,8); c.stroke(); c.fillStyle='#1c1917'; c.font=F(900,22); c.textAlign='center'; c.textBaseline='middle'; c.fillText('PIT ▶',0,-70); break;
    case 'garagem': c.scale(s*900/100,s*900/100); c.fillStyle='#57534e'; c.fillRect(-50,-80,100,80); c.fillStyle=['#3b82f6','#16a34a','#f59e0b','#8b5cf6','#0ea5e9','#ef4444','#14b8a6','#a855f7','#f97316','#eab308'][sp.k]; c.fillRect(-44,-74,88,74); c.fillStyle='rgba(255,255,255,.25)'; for(var g2=0;g2<5;g2++) c.fillRect(-44,-68+g2*14,88,6); c.fillStyle='#fff'; c.font=F(900,20); c.textAlign='center'; c.textBaseline='middle'; c.fillText(sp.k===9?'YOU':String(sp.k+1),0,-40); break;
    case 'caixa_box': break;
    case 'castelo': c.scale(s*4000/300,s*4000/300); c.fillStyle='#6d28d9'; c.fillRect(-120,-160,240,160); for(var k3=0;k3<8;k3++) c.fillRect(-120+k3*32,-176,18,18); c.fillStyle='#5b21b6'; c.fillRect(-150,-230,60,230); c.fillRect(90,-230,60,230); c.fillStyle='#a78bfa'; c.beginPath(); c.moveTo(-158,-230); c.lineTo(-120,-300); c.lineTo(-82,-230); c.fill(); c.beginPath(); c.moveTo(82,-230); c.lineTo(120,-300); c.lineTo(158,-230); c.fill(); c.fillStyle='#1e1b4b'; rr(c,-30,-90,60,90,30); c.fill(); break;
    case 'portico': case 'portico_largada': c.scale(s*ROAD*2.6/300,s*ROAD*2.6/300); c.fillStyle='#1f2937'; c.fillRect(-150,-160,12,160); c.fillRect(138,-160,12,160); c.fillStyle=sp.tipo==='portico'?'#111827':'#dc2626'; c.fillRect(-156,-190,312,34); if(sp.tipo==='portico'){ for(var q2=0;q2<24;q2++){ c.fillStyle=q2%2?'#111827':'#f8fafc'; c.fillRect(-156+q2*13,-190,13,17); c.fillStyle=q2%2?'#f8fafc':'#111827'; c.fillRect(-156+q2*13,-173,13,17); } } else { c.fillStyle='#fff'; c.font=F(900,22); c.textAlign='center'; c.textBaseline='middle'; c.fillText('START',0,-173); } break;
  }
  c.restore();
}
function textoGrande(c,txt,cor,k){ c.save(); c.translate(W/2,H/2-60); var s=1.4-.4*suave(k); c.scale(s,s); c.globalAlpha=1-k; c.font=F(900,96); c.textAlign='center'; c.textBaseline='middle'; c.lineWidth=10; c.strokeStyle='rgba(13,11,30,.8)'; c.strokeText(txt,0,0); c.fillStyle=cor; c.fillText(txt,0,0); c.restore(); }
function largada(c,t){
  var n=Math.floor(R.t/.8), txt=n<3?String(3-n):'GO!', k=(R.t%.8)/.8;
  c.save(); c.globalAlpha=.9; c.translate(W/2,96); c.fillStyle='rgba(17,24,39,.85)'; rr(c,-100,-30,200,60,30); c.fill(); for(var i=0;i<3;i++){ c.fillStyle=n>i?(n>=3?'#22c55e':'#ef4444'):'#374151'; A.circ(c,-60+i*60,0,20); c.fill(); } c.restore();
  c.save(); c.translate(W/2,200); var s=1.4-.4*suave(k); c.scale(s,s); c.font=F(900,80); c.textAlign='center'; c.textBaseline='middle'; c.lineWidth=10; c.strokeStyle='rgba(13,11,30,.8)'; c.strokeText(txt,0,0); c.fillStyle=n<3?'#fde047':'#4ade80'; c.fillText(txt,0,0); c.restore();
  c.fillStyle='rgba(13,11,30,.7)'; rr(c,W/2-240,H-200,480,40,20); c.fill(); c.fillStyle='#fde68a'; c.font=F(900,17); c.textAlign='center'; c.textBaseline='middle'; c.fillText(J.tr?'◀ ▶ trocam de faixa  ·  ▲ = TURBO':'◀ ▶ change lanes  ·  ▲ = TURBO',W/2,H-180);
}
/* ---------- HUD ---------- */
function hud(c,t){
  var px=W-158, py=62, pul=R.posPulse>0?1+.15*Math.sin(R.posPulse*20):1;
  c.fillStyle='rgba(13,11,30,.72)'; rr(c,px,py,144,66,16); c.fill(); c.strokeStyle='rgba(253,224,71,.6)'; c.lineWidth=2; rr(c,px,py,144,66,16); c.stroke();
  c.fillStyle='#fde68a'; c.font=F(900,12); c.textAlign='left'; c.textBaseline='top'; c.fillText(J.tr?'POSIÇÃO':'POSITION',px+14,py+8);
  c.save(); c.translate(px+12,py+20); c.scale(pul,pul); c.fillStyle='#fff'; c.font=F(900,44); c.fillText(ord(R.pos),0,0); c.restore();
  c.fillStyle='rgba(255,255,255,.6)'; c.font=F(900,16); c.textAlign='right'; c.fillText('/ 10',px+134,py+40);
  var my=py+74, me=R.me; c.fillStyle='rgba(13,11,30,.6)'; rr(c,px,my,144,30,14); c.fill(); c.fillStyle='#fde68a'; c.font=F(900,11); c.textAlign='left'; c.textBaseline='middle'; c.fillText(J.tr?'MOEDAS':'COINS',px+8,my+15);
  for(var k=0;k<10;k++){ c.fillStyle=k<(me.moedas||0)?'#fde047':'rgba(255,255,255,.2)'; A.circ(c,px+60+k*8,my+15,3.4); c.fill(); }
  /* progresso: a pista em linha, com os pits, o líder e o herói */
  var bx=22, by0=420, by1=210, tot=FIM_SEG*SEG; c.fillStyle='rgba(13,11,30,.55)'; rr(c,bx-10,by1-16,20,by0-by1+32,10); c.fill(); c.fillStyle='rgba(255,255,255,.3)'; c.fillRect(bx-2,by1,4,by0-by1);
  PITS.forEach(function(P,i){ var yy=lerp(by0,by1,P.box*SEG/tot); c.fillStyle=R.me.pitFeito[i]?'#22c55e':'#fde047'; A.circ(c,bx,yy,6); c.fill(); c.fillStyle='#1c1917'; c.font=F(900,8); c.textAlign='center'; c.fillText('P',bx,yy+.5); });
  R.rivais.forEach(function(r){ var yy=lerp(by0,by1,cl(r.z/tot,0,1)); c.fillStyle=r.cor; A.circ(c,bx,yy,3); c.fill(); });
  var ey=lerp(by0,by1,cl(me.z/tot,0,1)); c.fillStyle=corHeroi(); A.circ(c,bx,ey,7); c.fill(); c.strokeStyle='#fff'; c.lineWidth=2; A.circ(c,bx,ey,7); c.stroke();
  for(var q=0;q<4;q++) for(var w=0;w<2;w++){ c.fillStyle=(q+w)%2?'#111':'#fff'; c.fillRect(bx-6+w*6,by1-14+q*3,6,3); }
  /* box: contagem da equipe */
  if(me.box>0){ c.save(); c.fillStyle='rgba(13,11,30,.75)'; rr(c,W/2-150,H-250,300,46,23); c.fill(); c.fillStyle='#fde047'; c.font=F(900,20); c.textAlign='center'; c.textBaseline='middle'; c.fillText((J.tr?'Equipe trabalhando… ':'Crew working… ')+Math.ceil(me.box)+' s',W/2,H-227); c.restore(); }
  var pzp=null; PITS.forEach(function(P,i){ var n=Math.floor(me.z/SEG); if(!me.pitFeito[i]&&n>P.ini-90&&n<P.box) pzp=P; });
  if(pzp&&R.fase==='corre'){ var a=.7+.3*Math.sin(t*9); c.save(); c.globalAlpha=a; c.fillStyle='#fde047'; rr(c,W/2-170,62,340,38,19); c.fill(); c.fillStyle='#1c1917'; c.font=F(900,18); c.textAlign='center'; c.textBaseline='middle'; c.fillText(J.tr?'PIT STOP ▶ perguntas = turbos':'PIT STOP ▶ questions = turbos',W/2,81); c.restore(); }
  /* locutor (frase curta) */
  var f=R.fala; if(f&&f.t<3.2&&R.fase!=='podio'&&R.fase!=='pit'&&!pzp){ var al=Math.min(1,f.t*6,(3.2-f.t)*3);
    c.save(); c.globalAlpha=al; c.font=F(900,18); var tw=Math.min(560,c.measureText(f.en).width)+34, bx2=W/2-tw/2, by2=64, hh=J.tr&&f.pt?54:36;
    c.fillStyle='rgba(255,255,255,.96)'; rr(c,bx2,by2,tw,hh,16); c.fill(); c.fillStyle='#1e1b3a'; c.textAlign='center'; c.textBaseline='top'; c.fillText(f.en,W/2,by2+8,560); if(J.tr&&f.pt){ c.fillStyle='#6b5d4f'; c.font=F(700,13); c.fillText(f.pt,W/2,by2+32,560); } c.restore(); }
  if(me.turbo>0||me.pad>0){ c.strokeStyle='rgba(255,255,255,.55)'; c.lineWidth=3; for(var s2=0;s2<12;s2++){ var hx=hash(s2+Math.floor(t*12)), lx=s2%2?hx*120:W-hx*120, ly=(t*900+s2*97)%H; c.beginPath(); c.moveTo(lx,ly); c.lineTo(lx,ly+60); c.stroke(); } }
  if(R.anunc){ var ka=R.anunc.t, sc=1+.4*Math.max(0,1-ka/.25); c.save(); c.globalAlpha=Math.min(1,(1.3-ka)*3); c.translate(W/2,170); c.scale(sc,sc); c.font=F(900,46); c.textAlign='center'; c.textBaseline='middle'; c.lineWidth=9; c.strokeStyle='rgba(13,11,30,.85)'; c.strokeText(R.anunc.txt,0,0); c.fillStyle=R.anunc.cor; c.fillText(R.anunc.txt,0,0); if(J.tr&&R.anunc.pt){ c.font=F(700,16); c.lineWidth=5; c.strokeText(R.anunc.pt,0,34); c.fillStyle='#fde68a'; c.fillText(R.anunc.pt,0,34); } c.restore(); }
  R.pt.forEach(function(p){ if(!p.c||!p.c.eu) return; var a=p.vida/p.max; c.save(); c.globalAlpha=Math.min(1,a*2); c.font=F(900,24); c.textAlign='center'; c.lineWidth=5; c.strokeStyle='rgba(13,11,30,.8)'; c.strokeText(p.txt,W/2,H-170-(1-a)*30); c.fillStyle='#fde68a'; c.fillText(p.txt,W/2,H-170-(1-a)*30); c.restore(); });
}
/* moldura do pit: só "PIT STOP · perguntas = turbos" (sem pneus/combustível/água) */
function molduraPit(c,t){
  var q=J.quiz; if(!q) return; var ent=q.fase==='entra'?Math.min(1,q.t/.7):(q.fase==='pagina'?Math.max(0,1-q.t/1.2):1);
  c.save(); c.globalAlpha=ent;
  for(var k=0;k<W/12;k++){ c.fillStyle=k%2?'#111827':'#f8fafc'; c.fillRect(k*12,0,12,6); c.fillStyle=k%2?'#f8fafc':'#111827'; c.fillRect(k*12,6,12,6); }
  c.fillStyle='rgba(13,11,30,.75)'; rr(c,W/2-170,H-44,340,36,18); c.fill(); c.fillStyle='#fde047'; c.font=F(900,17); c.textAlign='center'; c.textBaseline='middle';
  c.fillText((J.tr?'Acerte = TURBO! ':'Right answer = TURBO! ')+R.pitRes.filter(Boolean).length+'/'+Math.max(1,(q.itens||[]).length),W/2,H-26);
  c.restore();
}
/* ---------- apresentação: cada piloto aparece no cartão, de costas no seu carrinho ---------- */
function apresentacao(c,t){
  var g=c.createLinearGradient(0,0,0,H); g.addColorStop(0,'#7dd3fc'); g.addColorStop(.5,'#e0f2fe'); g.addColorStop(.5,'#4ade80'); g.addColorStop(1,'#22c55e'); c.fillStyle=g; c.fillRect(0,0,W,H);
  poli(c,W/2-60,H*.5,W/2+60,H*.5,W,H,0,H,'#6b7280');
  for(var r=0;r<3;r++) for(var q=0;q<40;q++){ var hh=hash(r*50+q); c.fillStyle=['#ef4444','#3b82f6','#fde047','#22c55e','#f97316','#ec4899','#fff'][Math.floor(hh*7)]; A.circ(c,q*25,H*.5-12-r*12+Math.sin(t*(5+hh*5)+q)*2*(hh>.5?1:0),6); c.fill(); }
  c.save(); c.textAlign='center'; c.textBaseline='middle'; c.font=F(900,30); c.lineWidth=7; c.strokeStyle='rgba(13,11,30,.85)'; c.strokeText('THE SOAPBOX RALLY',W/2,40); c.fillStyle='#fde047'; c.fillText('THE SOAPBOX RALLY',W/2,40); c.restore();
  var lista=R.rivais.map(function(r){ return {id:r.id,cor:r.cor,nome:r.nome}; }); lista.push({id:R.me.id,cor:corHeroi(),nome:J.tr?'VOCÊ!':'YOU!',eu:true});
  var i=Math.min(lista.length-1,Math.floor(R.t/1)), o=lista[i], k=cl((R.t-i)/.35,0,1);
  /* a fila pequena embaixo (quem já se apresentou) */
  lista.forEach(function(x,j){ if(j>i) return; c.save(); c.translate(70+j*92,H-24); c.scale(.55,.55); CR.desenhaTras(c,x.id,{cor:x.cor,t:t+j}); c.restore(); });
  /* o cartão grande do piloto da vez */
  c.save(); c.translate(W/2,330+(1-suave(k))*60); c.globalAlpha=k; c.fillStyle=o.eu?'rgba(253,224,71,.35)':'rgba(255,255,255,.35)'; A.circ(c,0,-70,120); c.fill(); c.scale(1.9,1.9); CR.desenhaTras(c,o.id,{cor:o.cor,t:t,eu:o.eu}); c.restore();
  c.save(); c.globalAlpha=k; c.font=F(900,30); var tw=c.measureText(o.nome).width+50; c.fillStyle=o.eu?'#fde047':'rgba(255,251,235,.96)'; rr(c,W/2-tw/2,78,tw,50,25); c.fill(); c.fillStyle=o.eu?'#1e1b3a':'#78350f'; c.textAlign='center'; c.textBaseline='middle'; c.fillText(o.nome,W/2,104); c.restore();
  var a2=.85+.15*Math.sin(t*5); c.save(); c.globalAlpha=a2; c.fillStyle='#fde047'; rr(c,W-240,H-66,220,56,28); c.fill(); c.strokeStyle='#b45309'; c.lineWidth=3; rr(c,W-240,H-66,220,56,28); c.stroke(); c.fillStyle='#1e1b3a'; c.font=F(900,26); c.textAlign='center'; c.textBaseline='middle'; c.fillText(R.t<lista.length?'Skip ▶':'Race! ▶',W-130,H-38); c.restore();
}
/* ---------- pódio ---------- */
function podio(c,t){
  var P=R.podio; if(!P) return; var k=Math.min(1,P.t/.6);
  c.save(); c.globalAlpha=k; c.fillStyle='rgba(13,11,30,.7)'; c.fillRect(0,0,W,H);
  var pos=P.pos, nomes=['Gold medal!','Silver medal!','Bronze medal!'], nomes_pt=['Medalha de ouro!','Medalha de prata!','Medalha de bronze!'];
  var titulo=pos===1?'You WIN! 1st place!':'You finished '+ord(pos)+'!';
  c.textAlign='center'; c.textBaseline='middle'; c.font=F(900,40); c.lineWidth=8; c.strokeStyle='rgba(13,11,30,.85)'; c.strokeText(titulo,W/2,70); c.fillStyle='#fde047'; c.fillText(titulo,W/2,70);
  if(J.tr){ c.font=F(700,15); c.fillStyle='#fde68a'; c.fillText(pos===1?'Você VENCEU! 1º lugar!':'Você chegou em '+pos+'º lugar!',W/2,98); }
  c.font=F(900,20); c.fillStyle='#fff'; c.fillText(pos<=3?nomes[pos-1]:'Great race!',W/2,126); if(J.tr){ c.font=F(700,13); c.fillStyle='#fde68a'; c.fillText(pos<=3?nomes_pt[pos-1]:'Ótima corrida!',W/2,146); }
  [[1,W/2,350],[2,W/2-190,380],[3,W/2+190,405]].forEach(function(b){ var who=P.lista[b[0]-1], x=b[1], y=b[2], h=480-y;
    c.fillStyle=b[0]===1?'#facc15':(b[0]===2?'#cbd5e1':'#fb923c'); rr(c,x-80,y,160,h,8); c.fill(); c.fillStyle='rgba(13,11,30,.75)'; c.font=F(900,30); c.fillText(String(b[0]),x,y+h/2+6);
    if(!who) return; c.save(); c.translate(x,y+4); c.scale(1.15,1.15); CR.desenhaTras(c,who.id,{cor:who.cor,t:t,eu:who.eu}); c.restore();
    c.font=F(900,14); c.fillStyle=who.eu?'#fde047':'#fff'; c.fillText(who.eu?(J.tr?'VOCÊ':'YOU'):CR.LISTA[who.id].nome,x,y-150); });
  c.font=F(900,16); c.fillStyle='#fff'; c.fillText((J.tr?'Páginas: ':'Pages: ')+R.paginas+' / 3   ·   '+(J.tr?'Acertos: ':'Right answers: ')+R.acertos+' / 9',W/2,505);
  if(P.t>.6){ var a=.8+.2*Math.sin(t*5); c.globalAlpha=k*a; c.fillStyle='#fde047'; rr(c,W-210,H-70,180,50,25); c.fill(); c.fillStyle='#1e1b3a'; c.font=F(900,22); c.fillText('Continue ▶',W-120,H-45); }
  c.restore();
}

return {inicia:inicia, atualiza:atualiza, desenha:desenha, toque:toque, tecla:tecla, ativa:function(){ return !!R&&!R.acabou; }, largar:largar,
  /* QA */ _R:function(){ return R; }, _K:{VMAX:VMAX,SEG:SEG,PIT_T:PIT_T,segs:function(){ if(!segs.length) montaPista(); return segs; },PITS:function(){ if(!segs.length) montaPista(); return PITS; },FIM:function(){ if(!segs.length) montaPista(); return FIM_SEG; }}, _auto:function(on){ if(R) R.auto=on?{}:null; }};
})();
