/* ============================================================
   ING3_jogo_corrida.js — Real or Make-believe RALLY (reino 3), v2.
   GAME_DESIGN_v2 B.3: corrida VERTICAL vista de cima (estilo Enduro).
   · A pista rola de cima para baixo (~260 px/s), 420 px de largura,
     o centro desliza em senoide (curvas); grama dos lados = metade da
     velocidade; zebras, árvores, arquibancadas e placas nas laterais.
   · O kart fica embaixo; ◀ ▶ SEGURADOS viram (contínuo, suavizado).
     ACTION (X / ENTER / botão) = turbo, quando há lata de turbo.
   · Pista FIXA (não aleatória) em 3 trechos + a volta final:
     rivais de conto (piscam a seta 0,8 s antes de trocar de lado),
     slalom de cones, pedras (rodar), óleo de tinta (derrapar), lama
     (lento), ponte estreita (sair = splash), rampa (pular), estrelas,
     latas de turbo e a ENGRENAGEM-MONSTRO (monster truck por 8 s).
   · 3 PIT STOPS OBRIGATÓRIOS: placas "PIT ▶", a pista afunila em
     barreiras de pneus até a caixa amarela; o kart freia sozinho e o
     ambiente de questões abre (QUIZ, 3 perguntas 'realmb'). Durante o
     pit NADA corre. Cada pit = 1 página.
   · Final: o Conde Rabisco à frente joga gotas de tinta (a sombra
     avisa 0,8 s antes); turbo para passar; bandeira quadriculada e
     pódio (só medalha; nada se perde). Sem game over.
   Arte 100% por código (canvas), nada de emoji, tela em inglês.
   17/10 (Paulo): karts menores; 10 corredores e CLASSIFICAÇÃO de verdade
   (larga em 10º; só chega em 1º quem acerta TODAS as perguntas: cada
   acerto no pit = 1 TURBO, e cada turbo passa UM carro); turbo no ▲ ou
   no botão com raio; curvas mais fechadas numa pista mais estreita;
   apresentação dos pilotos de macacão antes da largada; rampa que vence
   a lama inteira; trilhas de estrelas arrumadas; nenhum ziguezague
   impossível (portão: trabalho/3tri_ingles/gen/verifica_corrida.js).
   ============================================================ */
window.CORRIDA = (function(){
'use strict';
var G=window.JOGO, J=G.J, A=window.ARTE, W=G.W, H=G.H;
var I=A.ING||{}, OL=I.OL||'rgba(48,24,44,.62)';
var cla=I.cla||function(a){ return a; }, esc=I.esc||function(a){ return a; };
var V0=260, VLAT=320, LARG=300, HW=LARG/2-22, CAR_Y=440, PASSO=8, TAU=Math.PI*2, PI=Math.PI, KS=.60; /* 18/10: kart menor (29 px) numa pista de 300 */
var R=null, TRK=null;
var FONTE='"Nunito","Segoe UI",Arial';
function F(p,px){ return p+' '+px+'px '+FONTE; }
function S(t){ return t*V0; }
function cl(v,a,b){ return v<a?a:(v>b?b:v); }
function suave(k){ k=cl(k,0,1); return k*k*(3-2*k); }
function lerp(a,b,k){ return a+(b-a)*k; }
function hash(n){ var x=Math.sin(n*127.1+311.7)*43758.5453; return x-Math.floor(x); }
function ord(n){ return n+(n===1?'st':(n===2?'nd':(n===3?'rd':'th'))); }
function rr(c,x,y,w,h,r){ A.rr(c,x,y,w,h,r); }

/* ============================================================
   O PERCURSO (tudo em "segundos de viagem" a 260 px/s)
   ============================================================ */
/* [t, amplitude da curva (px), período (s)] — interpolado */
/* curvas FECHADAS (Paulo: "pouco desafiadoras"): amplitude maior, período curto, pista mais estreita */
/* 18/10 (revisão da corrida): as curvas antes cabiam INTEIRAS na pista (amplitude 150 < meia-pista): um kart sem
   virar nunca saía do asfalto. Agora a amplitude passa da meia-pista (200-230 px, período 9-9,5 s): é preciso
   virar ~200 px em cada meia-curva, a no máximo 54% da velocidade lateral (portão). Slalom, pedras, pontes e pits ficam
   em RETA (curva + ziguezague juntos era o trecho impossível). A câmera acompanha a pista de lado. */
var GEO=[[0,0,12],[4,0,12],[7,200,9],[17,230,9],[22.5,0,9],[29,0,9],[31.5,200,9],[35,0,9],
  [47,0,9],[59,0,9],[68,0,9],[70,0,9],[77,0,9],[79.5,220,9],[82.5,0,9],
  [93,0,9],[99,0,9],[101.5,230,9.5],[108,230,9.5],[111,0,9],[113,60,7],[119,60,7],[120.5,0,9],[123,200,9],[128.5,200,9],[131.5,0,9],
  [147,0,9],[150,220,9.5],[166,220,9.5],[169,0,9],[400,0,10]];
var PONTES=[[64,67],[115,118]];
var PITS=[42,89,143];
var T_CONDE=150, T_FIM=178;
var TAREFAS=[{k:'tires',en:'Tires',pt:'Pneus'},{k:'fuel',en:'Fuel',pt:'Combustível'},{k:'water',en:'Water',pt:'Água'}];
/* 9 rivais de conto (todos na largada, à frente: o herói larga em ÚLTIMO) */
var RIVAIS_DEF=[
  {id:'dragon', nome:'Dragon', cor:'#ea580c', troca:3.1},
  {id:'princess', nome:'Princess', cor:'#ec4899', troca:3.6},
  {id:'knight', nome:'Knight', cor:'#64748b', troca:2.9},
  {id:'witch', nome:'Witch', cor:'#1f2937', troca:2.6},
  {id:'wolf', nome:'Big Bad Wolf', cor:'#78350f', troca:2.7},
  {id:'fairy', nome:'Fairy', cor:'#38bdf8', troca:3.3},
  {id:'frog', nome:'Frog Prince', cor:'#16a34a', troca:4.1},
  {id:'red', nome:'Red Riding Hood', cor:'#b91c1c', troca:3.0},
  {id:'pig', nome:'Little Pig', cor:'#f9a8d4', troca:3.8}];
var N_CORREDORES=RIVAIS_DEF.length+1;
/* chassi de cada um (vista de cima): bolha (pig, frog, princess), angular (dragon, wolf, knight), fino (witch, fairy, red) */
var FORMA={pig:'bolha',frog:'bolha',princess:'bolha',dragon:'angular',wolf:'angular',knight:'angular',witch:'fino',fairy:'fino',red:'fino'};
/* cor do rival parecida com a do herói (distância RGB < 80) troca por uma reserva: nunca dois karts iguais */
var RESERVA=['#0f766e','#a16207','#475569','#be185d','#7c2d12','#4d7c0f','#1e3a8a','#0e7490','#86198f'];
function rgb(h){ h=h.replace('#',''); return [parseInt(h.substr(0,2),16),parseInt(h.substr(2,2),16),parseInt(h.substr(4,2),16)]; }
function distCor(a,b){ var x=rgb(a), y=rgb(b); return Math.hypot(x[0]-y[0],x[1]-y[1],x[2]-y[2]); }
function corHeroi(){ return J.prog.cor||COR_HEROI[J.prog.heroi||'lia']||'#e11d48'; }
var FALAS=[
  [1.2,"GO! You start in LAST place. Hold ◀ ▶ to steer!","Vai! Você larga em ÚLTIMO. Segure ◀ ▶ para virar!"],
  [9,"Every right answer at the PIT STOP gives you a TURBO. Each turbo passes one car!","Cada resposta certa no PIT STOP dá um TURBO. Cada turbo passa um carro!"],
  [20.5,"Watch out, rocks! If you spin, a car passes you!","Cuidado, pedras! Se você rodar, um carro passa você!"],
  [35.5,"Pit stop ahead! Follow the tires to the yellow box!","Pit stop! Siga os pneus até a caixa amarela!"],
  [54.4,"Cones! Find the gap!","Cones! Ache o espaço!"],
  [59,"Ink oil on the road! It is slippery!","Óleo de tinta na pista! Escorrega!"],
  [61.6,"A narrow bridge! Stay in the middle!","Uma ponte estreita! Fique no meio!"],
  [68.8,"A monster gear! Grab it and smash the rocks!","Uma engrenagem-monstro! Pegue e esmague as pedras!"],
  [82.6,"Pit stop ahead!","Pit stop logo ali!"],
  [95.4,"A ramp! Drive on it and fly over the mud!","Uma rampa! Suba nela e voe por cima da lama!"],
  [112.6,"Another bridge, with a curve!","Outra ponte, com curva!"],
  [120.6,"Monster gear! Drive through the mud!","Engrenagem-monstro! Passe pela lama!"],
  [136.6,"The last pit stop!","O último pit stop!"],
  [149.5,"Oh no! Count Scribble is here!","Ah, não! O Conde Rabisco chegou!"],
  [153.5,"Watch the shadows! Ink is falling!","Olhe as sombras! Vem tinta!"],
  [164,"The final laps! Use ALL your turbos!","As voltas finais! Use TODOS os turbos!"]];

/* ---------- a pista: tabela amostrada a cada 8 px ---------- */
function montaPista(){
  var L=S(T_FIM+14), n=Math.ceil(L/PASSO)+2;
  var T={n:n, c:new Float32Array(n), l:new Float32Array(n), r:new Float32Array(n), hw:new Float32Array(n), ag:new Int8Array(n), pz:new Int8Array(n), ln:new Int8Array(n), L:L};
  var fase=0, g=0;
  for(var i=0;i<n;i++){
    var s=i*PASSO, t=s/V0;
    while(g<GEO.length-2&&GEO[g+1][0]<=t) g++;
    var a=GEO[g], b=GEO[g+1], k=cl((t-a[0])/(b[0]-a[0]),0,1);
    var amp=lerp(a[1],b[1],k), per=lerp(a[2],b[2],k);
    fase+=TAU*PASSO/(per*V0);
    var cc=480+amp*Math.sin(fase), w=LARG;
    for(var p=0;p<PONTES.length;p++){ var s0=S(PONTES[p][0]), s1=S(PONTES[p][1]);
      if(s>s0-320&&s<s0) w=lerp(LARG,160,suave((s-(s0-320))/320));
      else if(s>=s0&&s<=s1) w=160;
      else if(s>s1&&s<s1+260) w=lerp(160,LARG,suave((s-s1)/260));
      if(s>s0-60&&s<s1+60) T.ag[i]=p+1; }
    var ll=cc-w/2, rt=cc+w/2;
    for(var q=0;q<PITS.length;q++){ var sb=S(PITS[q]);
      if(s>sb-1300&&s<sb+1000){ T.pz[i]=q+1; var k2= s<sb-700?suave((s-(sb-1300))/600):(s<=sb+500?1:1-suave((s-(sb+500))/500));
        ll=lerp(ll,cc+10,k2); if(s>sb-720&&s<sb+520) T.ln[i]=1; } }
    T.c[i]=cc; T.l[i]=ll; T.r[i]=rt; T.hw[i]=w/2;
  }
  TRK=T;
}
function pista(s){
  var f=s/PASSO; if(f<0) f=0; var i=Math.floor(f), k=f-i; if(i>=TRK.n-1){ i=TRK.n-2; k=1; }
  var j=Math.min(TRK.n-1,Math.round(f));
  return {c:lerp(TRK.c[i],TRK.c[i+1],k), l:lerp(TRK.l[i],TRK.l[i+1],k), r:lerp(TRK.r[i],TRK.r[i+1],k), hw:lerp(TRK.hw[i],TRK.hw[i+1],k), ag:TRK.ag[j], pz:TRK.pz[j], ln:TRK.ln[j]};
}
function yDe(s){ return CAR_Y-(s-R.dist); }
function sDe(y){ return R.dist+(CAR_Y-y); }

/* ---------- objetos fixos do percurso ---------- */
var OB=[];
function poe(tipo,t,off,o){ var x={tipo:tipo,s:S(t),off:off||0,vivo:true}; if(o) for(var k in o) x[k]=o[k]; OB.push(x); return x; }
/* trilha de estrelas ARRUMADA: uma fila, espaçada (Paulo: "um monte de estrelas juntas que não fazem sentido") */
function trilha(t0,t1,off0,off1,dt){ dt=dt||.3; for(var t=t0;t<=t1+1e-6;t+=dt){ var k=(t-t0)/Math.max(.01,t1-t0); poe('estrela',t,lerp(off0,off1,suave(k))); } }
/* fileira de cones/pedras com UMA passagem larga (gap = centro da passagem, em px do centro da pista) */
function cones(t,gap){ for(var off=-HW;off<=HW+1;off+=30){ if(Math.abs(off-gap)<58) continue; poe('cone',t,off,{gap:gap}); } }
function pedras(t,gap){ for(var off=-HW+6;off<=HW;off+=52){ if(Math.abs(off-gap)<72) continue; poe('pedra',t,off,{r:14+hash(t*9+off)*3,gap:gap}); } }
function montaObjetos(){
  OB=[];
  /* trecho 1 (40 s): aprender a virar; pedras isoladas; estrelas em fila */
  trilha(4,6,0,0); trilha(10,12,-70,70); trilha(15,17,90,-60);
  poe('pedra',19.5,-70,{r:18}); poe('pedra',21,70,{r:18}); poe('pedra',22.5,-20,{r:18});
  cones(26,-70); cones(27.5,70); trilha(29,31,0,0); /* fileiras alcançáveis: |Δx| <= 0,45·VLAT·(Δt-0,6)+2·folga (verifica_corrida.js) */
  poe('placa',36,-HW-80,{txt:'PIT'}); poe('placa',38,-HW-80,{txt:'PIT'}); poe('placa',40,-HW-30,{txt:'PIT'});
  /* trecho 2 (45 s): curvas fortes, slalom (passagens alternadas, sempre alcançáveis), óleo, ponte, engrenagem + pedras */
  trilha(47,49,-60,60);
  cones(51.6,-80); cones(53.2,80); cones(54.8,-80); cones(56.4,80); cones(58,-20); /* slalom em RETA, 1,6 s entre fileiras */
  poe('oleo',59.6,-60,{w:84,h:48}); poe('oleo',60.8,70,{w:80,h:46});
  trilha(64.3,66.7,0,0,.4);
  poe('engrenagem',69.4,0);
  pedras(71.5,-70); pedras(72.6,50); pedras(73.7,-40); pedras(74.8,70); pedras(75.9,-50);
  trilha(78,80,60,-60); poe('lama',81.6,90,{w:90,h:56});
  poe('placa',83,-HW-80,{txt:'PIT'}); poe('placa',85,-HW-80,{txt:'PIT'}); poe('placa',87,-HW-30,{txt:'PIT'});
  /* trecho 3 (50 s): RAMPA sobre o lamaçal inteiro (o pulo cobre tudo), 2ª ponte com curva, lama em xadrez */
  trilha(93,94.6,-60,60);
  poe('rampa',96.6,0,{w:LARG-30,h:60}); /* rampa da largura da pista: errar a rampa não é mais cair na lama */
  [97.25,97.7,98.15].forEach(function(t){ poe('lama',t,-100,{w:110,h:70}); poe('lama',t,0,{w:110,h:70}); poe('lama',t,100,{w:110,h:70}); });
  trilha(97.3,98.5,0,0,.4);
  trilha(107,108.6,-80,80);
  trilha(115.4,117.6,0,0,.4);
  poe('engrenagem',121.4,40);
  for(var k=0;k<6;k++){ var tt=123.5+k*1.05; if(k%2===0){ poe('lama',tt,-105,{w:80,h:52}); poe('lama',tt,105,{w:80,h:52}); } else poe('lama',tt,0,{w:96,h:52}); }
  trilha(131,133,-60,60); poe('pedra',134.6,50,{r:18}); poe('pedra',135.4,-60,{r:18});
  poe('placa',137,-HW-80,{txt:'PIT'}); poe('placa',139,-HW-80,{txt:'PIT'}); poe('placa',141,-HW-30,{txt:'PIT'});
  /* final: a volta do Conde */
  trilha(150,152,0,0); trilha(158,160,-80,80); trilha(170,172,0,0);
  OB.sort(function(a,b){ return a.s-b.s; });
}

/* ============================================================
   CICLO
   ============================================================ */
function inicia(f){
  if(!TRK) montaPista(); montaObjetos(); instalaCena();
  R={f:f, fase:'apresenta', t:0, dist:0, v:0, x:480, vx:0, ang:0, giro:0, giroDur:.8, derrapa:0, deslize:0, tonto:0, lama:0, ar:0, arDur:1.9, turbo:0, latas:0, monstro:0, splash:0, pisca:0, imune:0,
     estrelas:0, paginas:0, pitFeito:[false,false,false], pitAtual:-1, pitRes:[], pitAnim:null, comb:1, pos:N_CORREDORES, posAnt:N_CORREDORES, posPulse:0, fala:null, falaI:0, pt:[], gotas:[], conde:null,
     rivais:[], crewT:-1, msgT:0, final:0, podio:null, acabou:false, primeiraLata:true, primeiroMonstro:true, tSaida:0, grama:false, acertos:0, turbosUsados:0, anunc:null, camX:0, ar0:0, ar1:0, autoT:0};
  /* grid: 9 rivais em fila dupla À FRENTE; o herói larga em 10º (último) */
  var usadas=[corHeroi()];
  RIVAIS_DEF.forEach(function(d,i){ var lin=8-i, off=(i%2?1:-1)*70; var cor=d.cor;
    if(distCor(corHeroi(),cor)<80) cor=RESERVA.filter(function(q){ return !usadas.some(function(u){ return distCor(u,q)<80; }) && !RIVAIS_DEF.some(function(x){ return distCor(x.cor,q)<60; }); })[0]||cor; /* só troca quem parece o herói */
    usadas.push(cor);
    var r={d:d, cor:cor, s:110+lin*62, off:off, alvo:off, v:0, ativo:true, estado:'frente', pisca:0, dirP:0, tTroca:d.troca*(.5+hash(i)*.6), giro:0, passado:false, tag:0, naTela:false};
    R.rivais.push(r); });
  J.estado='corrida'; J.stats={perguntas:0,acertos:0}; J.pontos=0; J.corrida=R;
  J.nivel={moradores:[{feito:false},{feito:false},{feito:false}], quizIds:[]}; J.mundo=null;
  J.urso={x:0,y:0,vx:0,vy:0,estado:'ride',anim:0,invT:0,tam:1};
  J.in.left=J.in.right=J.in.jump=J.in.down=J.in.act=false;
  SOM.musica('pista'); G.hud();
  if(window.UI){ UI.modoNivel(true); UI.modoMapa(false); UI.modoCorrida(false); UI.quizBotoes(false); }
  botoes(true); if(window.UI) UI.modoNivel(false); document.body.classList.add('nacapa');
  fala('Meet the racers! You start in 10th place. Win TURBOS at the pit stops and pass them all!','Conheça os pilotos! Você larga em 10º lugar. Ganhe TURBOS nos pit stops e passe todos eles!');
}
function largar(){ if(!R||R.fase!=='apresenta'||R.t<.8) return false; document.body.classList.remove('nacapa'); R.fase='largada'; R.t=0; SOM.fx('clique'); if(window.UI) UI.modoNivel(true); botoes(true); fala('Ready… set…','Preparar… apontar…'); return true; }
function fala(en,pt){ if(!R) return; R.fala={en:en,pt:pt,t:0}; try{ say(en); }catch(e){} }
/* botões de toque: só ◀ ▶ e ACTION (turbo) */
function el(id){ return document.getElementById(id); }
var tActLigado=false;
function botoes(on){
  ['tDown','tAct'].forEach(function(id){ var b=el(id); if(b) b.style.display=on?'none':''; });
  var bj=el('tJump'); if(bj){ if(on) pintaTurbo(); else { bj.innerHTML='JUMP'; bj.style.flexDirection=''; bj.classList.remove('turbo0'); bj.setAttribute('aria-label','Jump'); } }
  if(!on&&window.UI) UI.acao(false,0);
}
var SVG_TURBO='<svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true"><path d="M8 26 L20 6 L32 26 Z" fill="#fde047" stroke="#b45309" stroke-width="2" stroke-linejoin="round"/><path d="M14 26 Q20 40 26 26 Z" fill="#f97316"/><path d="M17 26 Q20 34 23 26 Z" fill="#fef08a"/><rect x="17" y="13" width="6" height="9" rx="2" fill="#1e3a8a"/></svg>';
var SVG_RAIO='<svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true"><path d="M14 2 4 14h7l-2 8 11-13h-7z" fill="#fde047" stroke="#92400e" stroke-width="1.6" stroke-linejoin="round"/></svg>';
function pintaTurbo(){
  if(!R) return; var n=R.latas, b=el('tJump'); if(!b) return;
  b.innerHTML=SVG_RAIO+'<small style="display:block;font-size:15px;line-height:1">TURBO '+n+'</small>'; b.style.flexDirection='column'; b.setAttribute('aria-label','Turbo'); b.classList.toggle('turbo0',n<=0);
}
function limpa(){ botoes(false); document.body.classList.remove('nacapa'); R=null; J.corrida=null; }

function atualiza(dt){
  if(!R||R.acabou) return; R.t+=dt; if(R.fala) R.fala.t+=dt; if(R.anunc){ R.anunc.t+=dt; if(R.anunc.t>1.3) R.anunc=null; } if(R.posPulse>0) R.posPulse-=dt; if(R.msgT>0) R.msgT-=dt;
  particulas(dt);
  var zAlvo=(R.fase==='box'||(R.fase==='saida'&&R.tSaida<1.2))?1.7:1; R.zoom=(R.zoom||1)+(zAlvo-(R.zoom||1))*Math.min(1,dt*(zAlvo>1?4:2.5));
  switch(R.fase){
    case 'apresenta': break;
    case 'largada':
      var antes=Math.floor((R.t-dt)/.8), ag=Math.floor(R.t/.8); if(ag!==antes&&ag>=1&&ag<=3) SOM.fx(ag<3?'clique':'plim');
      if(R.t>=2.4){ R.fase='corre'; R.t=0; R.goT=.9; fala('GO!','JÁ!'); } break;
    case 'corre': R.tSaida+=dt; if(R.goT>0) R.goT-=dt; dirige(dt); break;
    case 'box': R.crewT+=dt; if(R.t>1){ abrePit(); } break;
    case 'saida': R.crewT+=dt; R.tSaida+=dt; saidaPit(dt); break;
    case 'chegada': dirige(dt); if(R.t>1.8){ R.fase='podio'; R.t=0; montaPodio(); } break;
    case 'podio': break;
  }
}

/* ---------- dirigir ---------- */
function dirige(dt){
  var P=pista(R.dist), chegando=R.fase==='chegada';
  /* entrada lateral contínua (segurar ◀ ▶) */
  var inp=(J.in.right?1:0)-(J.in.left?1:0); if(chegando) inp=0;
  if(R.giro>0||R.splash>0){ inp=0; }
  if(R.derrapa>0){ R.vx+= (R.deslize-R.vx)*Math.min(1,dt*3); R.derrapa-=dt; }
  else R.vx+=(inp*VLAT-R.vx)*Math.min(1,dt*9);
  /* turbo: ▲ (PULAR / botão com raio) ou X/ENTER */
  if((J.in.act||J.in.jump)&&J.actSolto){ J.actSolto=false; usaTurbo(); }
  if(!J.in.act&&!J.in.jump) J.actSolto=true;
  /* timers */
  if(R.giro>0) R.giro=Math.max(0,R.giro-dt); if(R.tonto>0) R.tonto-=dt; if(R.lama>0) R.lama-=dt; if(R.turbo>0) R.turbo-=dt; if(R.imune>0) R.imune-=dt; if(R.pisca>0) R.pisca-=dt;
  if(R.monstro>0){ R.monstro-=dt; if(R.monstro<=0){ SOM.fx('cano'); fala('Back to a kart!','De volta ao kart!'); } }
  if(R.splash>0){ R.splash-=dt; if(R.splash<=0){ R.pisca=1; R.x=P.c; R.vx=0; R.imune=1; } }
  /* rampa: o voo é por DISTÂNCIA, até depois do último obstáculo (18/10: por tempo, chegando devagar caía na lama) */
  if(R.ar>0){ if(R.dist>=R.ar1){ R.ar=0; SOM.fx('aterra'); poeira(R.dist,R.x,10,'#d6d3d1'); J.shake=3; } }
  if(R.ar>0&&R.splash<=0){ var Pr=pista(R.dist); R.x+=(Pr.c-R.x)*Math.min(1,dt*.8); } /* no ar, o kart segue a pista */
  /* velocidade */
  var mult=1, mons=R.monstro>0;
  R.grama= R.ar<=0 && !P.ag && (R.x<P.l-6||R.x>P.r+6);
  if(R.grama) mult*= mons?.85:.5;
  if(R.lama>0&&!mons) mult*=.55;
  if(R.giro>0) mult*=.35; if(R.tonto>0) mult*=.7; if(R.derrapa>0) mult*=.85; if(R.splash>0) mult*=.25;
  if(R.turbo>0) mult*=1.6; if(mons) mult*=1.05; if(R.ar>0) mult=Math.max(mult,1.1);
  if(chegando) mult=Math.max(0,1-R.t/1.6);
  var alvo=V0*mult;
  /* pit obrigatório: dentro da faixa do pit o kart freia sozinho até a caixa amarela */
  var pi=proxPit(), sb=pi>=0?S(PITS[pi]):1e9, dd=sb-R.dist;
  if(pi>=0&&dd<390){ alvo=Math.min(alvo,Math.max(36,V0*dd/390)); R.turbo=0; R.x+=(boxX(pi)-R.x)*Math.min(1,dt*2.6); }
  R.v+=(alvo-R.v)*Math.min(1,dt*(alvo>R.v?2.4:5)); if(pi>=0&&dd<390) R.v=Math.min(R.v,Math.max(36,V0*dd/390)+4);
  R.dist+=R.v*dt;
  if(pi>=0&&sb-R.dist<=2){ R.dist=sb; R.v=0; R.vx=0; R.fase='box'; R.t=0; R.pitAtual=pi; R.crewT=0; SOM.fx('checkpoint'); fala('Pit stop! The team is here!','Pit stop! A equipe chegou!'); return; }
  /* movimento lateral e limites */
  if(R.splash<=0) R.x+=R.vx*dt;
  P=pista(R.dist);
  if(P.pz){ /* barreiras de pneus: não dá para sair do caminho do box */
    var lo=P.l+22, hi=P.r-22;
    if(R.x<lo){ R.x=Math.min(lo,R.x+Math.max(160,(lo-R.x)*6)*dt); if(R.vx<0){ R.vx=0; if(Math.random()<dt*6) SOM.fx('pisao'); } }
    if(R.x>hi){ R.x=hi; if(R.vx>0) R.vx=0; }
  } else {
    R.x=cl(R.x,Math.max(26,P.l-34),Math.min(W-26,P.r+34)); /* a grama do lado é estreita: não se entra na arquibancada */
  }
  /* ponte: fora da madeira = splash */
  if(P.ag&&R.ar<=0&&R.splash<=0&&R.pisca<=0&&(R.x<P.l-4||R.x>P.r+4)){ splash(); }
  if(R.pisca>0&&P.ag) R.x=cl(R.x,P.l+20,P.r-20);
  /* ângulo do kart */
  var alvoAng=R.vx/VLAT*.22;
  if(R.giro>0){ var k=1-R.giro/R.giroDur; R.ang=alvoAng+suave(k)*TAU; }
  else if(R.derrapa>0) R.ang=Math.sin(J.t*14)*.42*(R.derrapa/.8)+alvoAng;
  else if(R.tonto>0) R.ang=Math.sin(J.t*34)*.14+alvoAng;
  else { var an=((R.ang%TAU)+TAU+PI)%TAU-PI; R.ang=an+(alvoAng-an)*Math.min(1,dt*10); }
  /* poeira/grama/escape */
  if(R.v>40&&R.ar<=0&&R.splash<=0){
    if(R.grama&&Math.random()<dt*30) R.pt.push({s:R.dist-30,x:R.x+(Math.random()-.5)*30,vx:(Math.random()-.5)*80,vs:-40-Math.random()*60,vida:.5,max:.5,tipo:'grama',cor:Math.random()<.5?'#15803d':'#4ade80',r:3});
    if(R.lama>0&&!mons&&Math.random()<dt*24) R.pt.push({s:R.dist-28,x:R.x+(Math.random()-.5)*34,vx:(Math.random()-.5)*90,vs:-30-Math.random()*80,vida:.6,max:.6,tipo:'po',cor:'#78350f',r:4});
    if(R.turbo>0&&Math.random()<dt*40) R.pt.push({s:R.dist-46,x:R.x+(Math.random()-.5)*12,vx:(Math.random()-.5)*30,vs:-120,vida:.35,max:.35,tipo:'fogo',r:6});
  }
  /* combustível desce até o próximo box */
  if(pi>=0){ var ini=pi?S(PITS[pi-1]):0; R.comb=cl(1-(R.dist-ini)/(sb-ini)*.85,.08,1); }
  colisoes(); rivais(dt); conde(dt); gotas(dt); eventos(); turboFinal(dt);
  /* câmera de lado: acompanha a curva (o kart continua tendo de virar no mundo) */
  var cAlvo=(pista(R.dist+120).c-480)*.8; R.camX+=(cAlvo-R.camX)*Math.min(1,dt*3);
  /* posição */
  var pos=posicao(); if(pos<R.pos){ SOM.fx('plim'); R.posPulse=.7; G.pontua(50); R.anunc={txt:'▲ '+ord(pos)+'!',pt:'Subiu para '+pos+'º!',cor:'#4ade80',t:0}; } else if(pos>R.pos){ R.posPulse=.7; R.anunc={txt:'▼ '+ord(pos),pt:'Caiu para '+pos+'º',cor:'#f87171',t:0}; } R.pos=pos;
  if(!chegando&&R.dist>=S(T_FIM)){ R.rivais.forEach(function(r){ if(r.estado==='ultrapassado'&&r.s>=R.dist){ r.s=R.dist-40; r.estado='tras'; if(!r.semConta) R.turbosUsados++; } }); R.pos=posicao(); /* turbo usado = carro passado, mesmo na linha */
    R.fase='chegada'; R.t=0; R.final=R.pos; SOM.fx('vitoria'); fala(R.pos===1?'Checkered flag! You WIN!':'Checkered flag! You finished '+ord(R.pos)+'!',R.pos===1?'Bandeira quadriculada! Você VENCEU!':'Bandeira quadriculada! Você chegou em '+R.pos+'º!');
    for(var q=0;q<60;q++) R.pt.push({s:R.dist+Math.random()*300,x:Math.random()*W,vx:(Math.random()-.5)*60,vs:-80-Math.random()*120,vida:2,max:2,tipo:'confete',cor:['#ef4444','#fde047','#3b82f6','#22c55e','#ec4899','#fff'][q%6],r:4,rot:Math.random()*6}); }
}
/* TURBO = passar UM carro, sempre e na tela (18/10): o carro mais perto à frente (em qualquer estado) vira
   'ultrapassado' e fica para trás; a posição final é exatamente 10 - turbos usados = 10 - respostas certas. */
function usaTurbo(auto){
  if(!R||R.acabou||R.fase!=='corre') return false;
  if(R.latas<=0){ if(!auto&&(!R.avisoSemTurbo||R.t-R.avisoSemTurbo>4)){ R.avisoSemTurbo=R.t; fala(proxPit()>=0?'No turbos yet! Answer right at the pit stop to win one.':'No turbos left!',proxPit()>=0?'Ainda sem turbo! Acerte no pit stop para ganhar um.':'Acabaram os turbos!'); } return false; }
  if(R.turbo>0) return false;
  if(pitPerto()||pista(R.dist).pz){ if(!auto&&(!R.avisoPit||R.t-R.avisoPit>3)){ R.avisoPit=R.t; fala('Save it! Use the turbo on the race track.','Guarde! Use o turbo na pista.'); } return false; }
  var alvo=null; R.rivais.forEach(function(r){ if(r.s>R.dist&&r.estado!=='ultrapassado'&&(!alvo||r.s<alvo.s)) alvo=r; });
  R.latas--; R.turbo=2.0; SOM.fx('arremesso'); faiscas(R.dist-40,R.x,10,'#fde047'); pintaTurbo();
  if(alvo){ if(alvo.s-R.dist>300) alvo.s=R.dist+300; /* o carro passado aparece na tela */
    alvo.estado='ultrapassado'; alvo.tUlt=0; var Pa=pista(alvo.s), lado=(R.x-Pa.c)>0?-1:1; alvo.alvo=lado*Math.max(40,Pa.hw-40); alvo.pisca=0; alvo.cede=2.5; alvo.tag=2.5;
    fala((auto?'Your crew fires your turbo! ':'TURBO! ')+'Pass the '+alvo.d.nome+'!',(auto?'A equipe dispara o seu turbo! ':'TURBO! ')+'Passe '+alvo.d.nome+'!'); }
  else fala('TURBO! You are in the lead!','TURBO! Você está na frente!');
  return true; }
/* turbo esquecido: no fim ele avisa e, por último, a equipe dispara sozinha (a posição é das respostas, não do botão) */
function turboFinal(dt){
  if(R.fase!=='corre'||R.latas<=0) return;
  var falta=2.6*R.latas+6; /* cada turbo leva ~2,2 s para passar o carro: dispara a tempo de todos valerem */
  if(R.dist>S(T_FIM-falta)){ R.autoT-=dt; if(R.autoT<=0&&R.turbo<=0){ R.autoT=.3; usaTurbo(true); } }
  else if(R.dist>S(T_FIM-falta-4)&&!R.avisoFinal){ R.avisoFinal=true; fala('USE YOUR TURBO! Press ▲!','USE O SEU TURBO! Aperte ▲!'); }
}
/* bateu (pedra, ponte, tinta do Conde): o carro logo atrás passa (Paulo: o "aaah") */
function perdePosicao(){ var r0=null; R.rivais.forEach(function(r){ if(r.estado==='tras'&&r.s<R.dist&&(!r0||r.s>r0.s)) r0=r; }); if(r0){ r0.estado='passa'; r0.s=Math.max(r0.s,R.dist-150); r0.tag=2.5; r0.tLivre=0; } } /* o carro que passou fica lento à frente: dá para repassar (se não der em 5 s, ele perde o embalo) */
function pitPerto(){ var pi=proxPit(); return pi>=0&&S(PITS[pi])-R.dist<700; }
function proxPit(){ for(var i=0;i<PITS.length;i++) if(!R.pitFeito[i]) return i; return -1; }
function boxX(pi){ return pista(S(PITS[pi])).c+110; }
function splash(){
  R.splash=.55; R.vx=0; SOM.fx('cano'); J.shake=5;
  for(var i=0;i<26;i++){ var a=Math.random()*TAU, v=60+Math.random()*160; R.pt.push({s:R.dist,x:R.x,vx:Math.cos(a)*v,vs:Math.sin(a)*v,vida:.7,max:.7,tipo:'agua',r:3+Math.random()*4}); }
  perdePosicao();
  fala('Splash! Back on the bridge! A car passed you.','Splash! De volta à ponte! Um carro passou você.');
}
function poeira(s,x,n,cor){ for(var i=0;i<n;i++) R.pt.push({s:s+(Math.random()-.5)*20,x:x+(Math.random()-.5)*40,vx:(Math.random()-.5)*120,vs:(Math.random()-.5)*120,vida:.6,max:.6,tipo:'po',cor:cor||'#e7e5e4',r:5+Math.random()*4}); }
function faiscas(s,x,n,cor){ for(var i=0;i<n;i++){ var a=Math.random()*TAU, v=80+Math.random()*200; R.pt.push({s:s,x:x,vx:Math.cos(a)*v,vs:Math.sin(a)*v,vida:.4,max:.4,tipo:'faisca',cor:cor||'#fde047',r:3}); } } /* 18/10: risco curto (estrela só a que se pega) */
function texto(s,x,txt,cor){ R.pt.push({s:s,x:x,vx:0,vs:50,vida:1,max:1,tipo:'texto',txt:txt,cor:cor||'#fff',r:22}); }

/* ---------- colisões com os objetos ---------- */
function tamCarro(){ var sc=(R.monstro>0?1.4:1)*KS; return {hw:17*sc, hh:30*sc}; }
function colisoes(){
  var T=tamCarro(), mons=R.monstro>0||R.turbo>0, noAr=R.ar>0; /* turbo também esmaga cone e pedra: turbo nunca termina em batida */
  for(var i=0;i<OB.length;i++){ var o=OB[i]; if(o.s<R.dist-90) continue; if(o.s>R.dist+90) break; if(!o.vivo) continue;
    var ox=pista(o.s).c+o.off, dx=Math.abs(ox-R.x), ds=Math.abs(o.s-R.dist);
    switch(o.tipo){
      case 'estrela': if(dx<T.hw+12&&ds<T.hh+12){ o.vivo=false; R.estrelas++; J.moedas++; G.pontua(10); SOM.fx('moeda'); faiscas(o.s,ox,6,'#fde047'); } break;
      case 'lata': if(dx<T.hw+14&&ds<T.hh+16){ o.vivo=false; R.latas=Math.min(3,R.latas+1); SOM.fx('moedaG'); faiscas(o.s,ox,10,'#60a5fa'); pintaTurbo();
        if(R.primeiraLata){ R.primeiraLata=false; fala('A turbo can! Press ACTION (or X) for a boost!','Uma lata de turbo! Aperte AÇÃO (ou X) para acelerar!'); } else texto(o.s,ox,'+TURBO','#93c5fd'); } break;
      case 'engrenagem': if(dx<T.hw+20&&ds<T.hh+20){ o.vivo=false; R.monstro=8; SOM.fx('destrava'); J.shake=6; faiscas(o.s,ox,18,'#fbbf24');
        fala(R.primeiroMonstro?'MONSTER TRUCK! Smash everything!':'MONSTER TRUCK again!',R.primeiroMonstro?'MONSTER TRUCK! Esmague tudo!':'MONSTER TRUCK de novo!'); R.primeiroMonstro=false; } break;
      case 'cone': if(noAr) break; if(dx<T.hw+9&&ds<T.hh+9){ o.vivo=false; o.voa={t:0,vx:(ox<R.x?-1:1)*180,vs:240}; if(mons){ esmaga(o.s,ox,'#f97316'); } else if(R.imune<=0){ R.tonto=.45; SOM.fx('tijolo'); } } break;
      case 'pedra': if(noAr) break; if(dx<T.hw+o.r-2&&ds<T.hh+o.r-2){ if(mons){ o.vivo=false; esmaga(o.s,ox,'#9ca3af'); } else if(R.imune<=0&&R.giro<=0){ R.giro=.8; R.giroDur=.8; R.imune=1.2; SOM.fx('tonto'); J.shake=5; poeira(o.s,ox,6,'#d6d3d1'); perdePosicao(); fala('Spin! A car passed you! Steer around the rocks!','Rodou! Um carro passou você! Desvie das pedras!'); } } break;
      case 'oleo': case 'tinta': if(noAr||mons) break; if(dx<T.hw+o.w/2-10&&ds<T.hh+o.h/2-10&&R.derrapa<=0&&R.imune<=0){ R.derrapa=.8; R.deslize=(Math.random()<.5?-1:1)*140; SOM.fx('folha'); } break;
      case 'lama': if(noAr||mons) break; if(dx<T.hw+o.w/2-10&&ds<T.hh+o.h/2-10){ if(R.lama<=0) SOM.fx('pisao'); R.lama=1; } break;
      case 'rampa': if(noAr) break; if(dx<o.w/2&&ds<T.hh+o.h/2-14&&R.dist<o.s){ R.ar=1; R.ar0=R.dist; R.ar1=pousoDaRampa(o); R.v=Math.max(R.v,V0*1.1); SOM.fx('mola'); texto(o.s+60,ox,'WHEEE!','#fde68a'); } break;
    }
  }
}
/* pouso = fim do último obstáculo depois da rampa + folga de 20% do vão (mínimo 60 px) */
function pousoDaRampa(o){ var fim=o.s+o.h/2; OB.forEach(function(q){ if(q!==o&&q.s>o.s&&q.s<o.s+900&&(q.tipo==='lama'||q.tipo==='cone'||q.tipo==='pedra'||q.tipo==='oleo')) fim=Math.max(fim,q.s+(q.h||30)/2+30*KS); }); return fim+Math.max(60,.2*(fim-o.s)); }
function esmaga(s,x,cor){ SOM.fx('quebra'); J.shake=4; G.pontua(20); for(var i=0;i<10;i++){ var a=Math.random()*TAU, v=90+Math.random()*180; R.pt.push({s:s,x:x,vx:Math.cos(a)*v,vs:Math.sin(a)*v,vida:.7,max:.7,tipo:'detrito',cor:cor,r:3+Math.random()*5,rot:Math.random()*6}); } texto(s+20,x,'CRUSH!','#fde047'); }

/* ---------- rivais ---------- */
/* CLASSIFICAÇÃO (Paulo: "só fica em 1º se acerta todas"): os carros à frente ('frente') seguram a distância —
   só um TURBO os alcança (o turbo deixa o da frente 'livre', mais lento, e o herói passa). Os de trás ('tras')
   ficam atrás; se o herói BATE, o de trás 'passa' e fica 'livre' à frente: dá para repassar dirigindo bem. */
function rivais(dt){
  var T=tamCarro(), corre=R.fase==='corre'||R.fase==='chegada', vRef=Math.max(R.v,R.fase==='chegada'?0:150);
  var frente=R.rivais.filter(function(r){ return r.estado==='frente'; }).sort(function(a,b){ return a.s-b.s; });
  var tras=R.rivais.filter(function(r){ return r.estado==='tras'; }).sort(function(a,b){ return b.s-a.s; });
  var topoLivre=R.dist; R.rivais.forEach(function(r){ if((r.estado==='livre'||r.estado==='passa')&&r.s>topoLivre) topoLivre=r.s; });
  /* PELOTÃO VISÍVEL (18/10): os carros da frente ficam 170-420 px à frente, "respirando", não um só colado */
  frente.forEach(function(r,k){ r.alvoS=Math.max(R.dist+170,topoLivre+130)+k*120+40*Math.sin(R.t*.8+k*1.7); });
  tras.forEach(function(r,k){ r.alvoS=R.dist-210-k*230; });
  R.rivais.forEach(function(r){
    if(!corre) return;
    var v;
    if(R.fase==='corre'&&R.tSaida<2.2&&r.estado!=='passa') v=R.v; /* largada/saída do box: todos juntos */
    else if(r.estado==='frente'||r.estado==='tras') v=cl(vRef+(r.alvoS-r.s)*1.1,40,430);
    else if(r.estado==='passa'){ v=R.v+170; if(r.s>R.dist+150){ r.estado='livre'; r.tLivre=0; } }
    else if(r.estado==='ultrapassado'){ r.tUlt+=dt; v=Math.max(20,R.v-180); if(r.s<R.dist-60){ r.estado='tras'; if(!r.semConta) R.turbosUsados++; r.semConta=false; SOM.fx('plim'); } }
    else { r.tLivre=(r.tLivre||0)+dt; v=Math.min(V0*.72,Math.max(60,R.v-40)); if(r.tLivre>5&&r.s>R.dist){ r.estado='ultrapassado'; r.tUlt=0; r.semConta=true; } }
    if(r.giro>0){ v*=.4; r.giro-=dt; }
    r.v=v; r.s+=v*dt;
    if(r.estado==='livre'&&r.s<R.dist-50){ r.estado='tras'; }
    /* etiqueta com o nome: só ao aparecer na tela ou ao ser passado (18/10: as etiquetas engordavam os carros) */
    var yy=yDe(r.s), dentro=yy>-40&&yy<H; if(dentro&&!r.naTela) r.tag=2.5; r.naTela=dentro; if(r.tag>0) r.tag-=dt;
    if(r.estado==='tras'&&r.s>R.dist+10&&!R.splash){ r.s=R.dist-60; }
    var P=pista(r.s), lim=Math.max(30,P.hw-30);
    /* trocar de lado: pisca a seta 0,8 s ANTES */
    var fila=filaAFrente(r.s); /* desvia das fileiras de cones/pedras pelo vão */
    if(r.cede>0){ r.cede-=dt; } else if(fila!==null){ r.alvo=cl(fila+((RIVAIS_DEF.indexOf(r.d)%2)?-18:18),-lim,lim); r.pisca=0; } else if(r.d.troca){ if(r.pisca>0){ r.pisca-=dt; if(r.pisca<=0) r.alvo=r.novo; }
      else { r.tTroca-=dt; if(r.tTroca<=0){ r.tTroca=r.d.troca; var lado=r.off>0?-1:1; r.novo=cl(lado*(55+hash(r.s)*70),-lim,lim); r.dirP=r.novo>r.off?1:-1; r.pisca=.8; } } }
    r.off+=cl(r.alvo-r.off,-110*dt,110*dt); r.off=cl(r.off,-lim,lim);
    if(P.pz) return; /* no trecho do pit os rivais passam pela pista principal (não batem) */
    /* encostar no rival: só empurra / roda, nunca dano */
    var rx=P.c+r.off, dx=R.x-rx, ds=R.dist-r.s;
    if(Math.abs(dx)<T.hw+12&&Math.abs(ds)<T.hh+22&&R.splash<=0&&R.ar<=0){
      if(P.ag||pista(R.dist).ag){ if(ds>=0) r.s=R.dist-(T.hh+24); else { R.dist=r.s-(T.hh+22); R.v=Math.min(R.v,r.v||V0); } }
      else if(R.monstro>0){ if(r.giro<=0){ r.giro=1; r.off+= dx>0?-70:70; SOM.fx('pisao'); texto(r.s,rx,'BUMP!','#fde047'); } }
      else if(ds<0&&Math.abs(dx)<T.hw+6){ R.dist=r.s-(T.hh+22); R.v=Math.min(R.v,r.v||V0); R.vx+= dx>=0?120:-120; if(R.imune<=0){ SOM.fx('pisao'); R.imune=.5; R.tonto=.3; } }
      else { R.vx+= dx>=0?200:-200; r.off+= dx>=0?-12:12; if(R.imune<=0){ SOM.fx('pisao'); R.imune=.4; } }
    }
    if(!r.passado&&r.s<R.dist-40){ r.passado=true; texto(R.dist+40,R.x,'PASS!','#bbf7d0'); }
    if(r.s>R.dist) r.passado=false;
  });
}
function filaAFrente(s){ for(var i=0;i<OB.length;i++){ var o=OB[i]; if(o.s<s) continue; if(o.s>s+240) break; if(o.gap!==undefined) return o.gap; } return null; }
function posicao(){ var n=1; R.rivais.forEach(function(r){ if(r.s>R.dist) n++; }); return n; } /* o Conde não está na classificação: ele é o vilão */

/* ---------- o Conde Rabisco (final) ---------- */
function conde(dt){
  var C=R.conde;
  if(!C){ if(R.dist>=S(T_CONDE)){ R.conde={s:R.dist+520, off:0, alvo:0, pisca:0, dirP:0, tTroca:2.6, tTiro:2.6, passado:false, giro:0}; SOM.fx('risada'); SOM.musica('chefao'); } return; }
  if(R.fase!=='corre'&&R.fase!=='chegada') return;
  var gap=C.s-R.dist, v;
  if(C.passado) v=205; else v= gap>285?V0-70:V0;
  if(C.giro>0){ C.giro-=dt; v*=.5; }
  C.s+=v*dt;
  var P=pista(C.s), lim=P.hw-34;
  if(C.pisca>0){ C.pisca-=dt; if(C.pisca<=0) C.alvo=C.novo; } else { C.tTroca-=dt; if(C.tTroca<=0){ C.tTroca=2.6; C.novo=cl((C.off>0?-1:1)*(60+hash(C.s)*60),-lim,lim); C.dirP=C.novo>C.off?1:-1; C.pisca=.8; } }
  C.off+=cl(C.alvo-C.off,-100*dt,100*dt); C.off=cl(C.off,-lim,lim);
  /* gotas de tinta para trás: a sombra marca 0,8 s antes */
  if(!C.passado&&gap<420&&R.dist>S(T_CONDE+3)&&R.dist<S(T_FIM-8)){ C.tTiro-=dt; /* os 8 s finais ficam limpos: dá tempo de repassar */ if(C.tTiro<=0){ C.tTiro=1.7;
    var sa=R.dist+V0*.8+30, Pa=pista(sa), xa=cl(R.x+(Math.random()-.5)*70,Pa.l+24,Pa.r-24);
    R.gotas.push({s0:C.s-30,x0:P.c+C.off,sa:sa,xa:xa,t:0,dur:.8}); SOM.fx('arremesso'); } }
  var T=tamCarro(), cx=P.c+C.off, dx=R.x-cx, ds=R.dist-C.s;
  if(Math.abs(dx)<T.hw+14&&Math.abs(ds)<T.hh+25&&R.ar<=0){
    if(R.monstro>0&&C.giro<=0){ C.giro=1; C.off+=dx>0?-60:60; SOM.fx('pisao'); }
    else if(ds<0&&Math.abs(dx)<T.hw+8){ R.dist=C.s-(T.hh+25); R.v=Math.min(R.v,v); R.vx+=dx>=0?140:-140; if(R.imune<=0){ SOM.fx('pisao'); R.imune=.5; } }
    else { R.vx+=dx>=0?200:-200; }
  }
  if(!C.passado&&R.dist>C.s+40){ C.passado=true; SOM.fx('acerto'); fala('You passed Count Scribble!','Você passou o Conde Rabisco!'); G.pontua(150); }
  else if(C.passado&&C.s>R.dist+10){ C.passado=false; }
}
function gotas(dt){
  for(var i=R.gotas.length-1;i>=0;i--){ var g=R.gotas[i]; g.t+=dt; if(g.t<g.dur) continue;
    R.gotas.splice(i,1); SOM.fx('folha');
    var T=tamCarro(); if(Math.abs(R.x-g.xa)<T.hw+22&&Math.abs(R.dist-g.sa)<T.hh+20&&R.monstro<=0&&R.ar<=0&&R.giro<=0&&R.imune<=0){ R.giro=.6; R.giroDur=.6; R.imune=1; SOM.fx('tonto'); perdePosicao(); }
    var Pa=pista(g.sa); OB.push({tipo:'tinta',s:g.sa,off:g.xa-Pa.c,w:62,h:44,vivo:true}); OB.sort(function(a,b){ return a.s-b.s; });
    for(var k=0;k<10;k++){ var a=Math.random()*TAU, v=60+Math.random()*120; R.pt.push({s:g.sa,x:g.xa,vx:Math.cos(a)*v,vs:Math.sin(a)*v,vida:.5,max:.5,tipo:'tinta',r:3+Math.random()*3}); }
  }
}
function eventos(){ while(R.falaI<FALAS.length&&R.dist>=S(FALAS[R.falaI][0])){ var f=FALAS[R.falaI++]; fala(f[1],f[2]); } }

/* ---------- partículas (no mundo: a poeira fica para trás) ---------- */
function particulas(dt){
  for(var i=R.pt.length-1;i>=0;i--){ var p=R.pt[i]; p.vida-=dt; if(p.vida<=0){ R.pt.splice(i,1); continue; } p.x+=p.vx*dt; p.s+=p.vs*dt; if(p.rot!==undefined) p.rot+=dt*8; if(p.tipo!=='texto'){ p.vx*=1-dt*2; p.vs*=1-dt*2; } }
  OB.forEach(function(o){ if(o.voa){ o.voa.t+=dt; } });
}

/* ============================================================
   PIT STOP
   ============================================================ */
function abrePit(){
  var pi=R.pitAtual; R.fase='pit'; R.t=0; R.pitRes=[]; R.pitAnim=null;
  var itens=QUIZ.escolhe({tema:'realmb'},3,J.nivel.quizIds||[]);
  R.mPit={x:110,y:350,tipo:'announcer',falando:0};
  J.in.left=J.in.right=J.in.act=false;
  QUIZ.inicia(R.mPit,{itens:itens,
    aoResponder:function(ok){ if(!R) return; R.pitRes.push(ok); R.pitAnim={k:R.pitRes.length-1,ok:ok,t0:J.t}; if(ok){ R.acertos++; R.latas=Math.min(9,R.latas+1); SOM.fx('moedaG'); R.anunc={txt:'+1 TURBO',pt:'+1 turbo',cor:'#fde047',t:0}; } },
    aoTerminar:function(){ fimPit(true); },
    aoSair:function(){ fimPit(false); }});
  if(J.estado!=='quiz') fimPit(false);
}
function fimPit(completo){
  if(!R||R.fase!=='pit') return;
  J.estado='corrida'; R.fase='saida'; R.t=0; R.tSaida=0; R.crewT=Math.max(R.crewT,1); R.comb=1; R.pitFeito[R.pitAtual]=true;
  SOM.musica(R.conde?'chefao':'pista'); J.in.left=J.in.right=J.in.act=false;
  if(window.UI){ UI.quizBotoes(false); UI.modoNivel(true); } botoes(true);
  if(completo){ R.paginas++; var m=J.nivel.moradores[R.paginas-1]; if(m) m.feito=true; G.pontua(150); SOM.fx('vitoria');
    G.toast('You found a lost page! ('+R.paginas+' of 3)',2600,'Você achou uma página perdida! ('+R.paginas+' de 3)'); }
  G.hud(); pintaTurbo();
  var n=R.latas; fala(n>0?('You have '+n+' TURBO'+(n>1?'S':'')+'! Press ▲ (the TURBO button) to pass a car!'):'No turbo this time. GO!',n>0?('Você tem '+n+' TURBO'+(n>1?'S':'')+'! Aperte ▲ (botão TURBO) para passar um carro!'):'Sem turbo desta vez. Vai!');
}
function saidaPit(dt){
  var sb=S(PITS[R.pitAtual]), t=R.tSaida;
  if(t<1.1){ if(Math.random()<dt*20){ var lado=Math.random()<.5?-1:1; faiscas(sb+(Math.random()<.5?-22:20),boxX(R.pitAtual)+lado*22,2,'#fde68a'); } if(t-dt<.15&&t>=.15){ texto(sb+10,boxX(R.pitAtual)-60,'BRRRT!','#fde68a'); SOM.fx('tijolo'); } if(t-dt<.6&&t>=.6){ texto(sb-10,boxX(R.pitAtual)+64,'BRRRT!','#fde68a'); SOM.fx('tijolo'); } }
  if(t>=1.5){ R.fase='corre'; R.t=0; SOM.fx('plim'); }
}

/* ============================================================
   PÓDIO
   ============================================================ */
function montaPodio(){
  var lista=[{id:'me',s:R.dist}];
  R.rivais.forEach(function(r){ lista.push({id:r.d.id,s:r.s,cor:r.d.cor}); });
  lista.sort(function(a,b){ return b.s-a.s; });
  var pos=Math.max(1,R.final||R.pos); lista=lista.filter(function(x){ return x.id!=='me'; }); lista.splice(pos-1,0,{id:'me'});
  R.podio={lista:lista.slice(0,3),pos:pos,t:0};
  if(window.UI) UI.modoNivel(false);
  G.pontua(pos===1?300:(pos===2?200:(pos===3?150:100)));
  try{ say(pos<=3?['Gold medal!','Silver medal!','Bronze medal!'][pos-1]:'Finisher medal!'); }catch(e){}
}
function continua(){ if(!R||R.fase!=='podio'||R.t<.6) return false; SOM.fx('clique'); termina(); return true; }
function termina(){
  var f=R.f; botoes(false); if(window.UI) UI.modoCorrida(false);
  J.nivel.moradores.forEach(function(m,k){ m.feito=R.paginas>k; });
  J.mundo=null; J.faseAtual=f; J.urso={estado:'cheer',anim:0}; R.acabou=true; J.corrida=null;
  G.fimDeFase();
}

/* ---------- entradas ---------- */
function toque(lx,ly){ if(!R||R.acabou) return false; if(R.fase==='podio'){ continua(); return true; } if(R.fase==='apresenta'){ if(lx>W-260&&ly>H-80) largar(); return true; } return false; }
function tecla(k){ if(!R||R.acabou) return false; if(R.fase==='podio'&&(k==='Enter'||k===' '||k==='x'||k==='X')){ continua(); return true; }
  if(R.fase==='apresenta'){ if(k==='Enter'||k===' ') largar(); return true; }
  if(k==='x'||k==='X'||k==='Enter'){ usaTurbo(); return true; } return false; }

/* ============================================================
   DESENHO
   ============================================================ */
/* o motor desenha o reino comum quando o QUIZ está aberto (J.estado='quiz'):
   aqui a corrida continua visível (congelada) atrás do ambiente de questões. */
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
  if(J.shake>0) c.translate((Math.random()-.5)*J.shake,(Math.random()-.5)*J.shake);
  desenha(c);
  if(J.quiz&&window.QUIZ){ QUIZ.desenhaTela(c,J.t); molduraPit(c,J.t); }
  if(J.fimFase){ var k=Math.min(1,J.fimFase.t/.8); c.fillStyle='rgba(13,11,30,'+(k*.35)+')'; c.fillRect(0,0,W,H); }
  if(J.flash>0){ c.fillStyle='rgba(255,255,255,'+(J.flash*.5)+')'; c.fillRect(0,0,W,H); }
  if(J.trans) A.iris(c,J.trans.x,J.trans.y,G.raioIris());
  c.restore();
}

function desenha(c){
  if(!R) return; var t=J.t;
  if(R.fase==='apresenta'){ apresentacao(c,t); return; }
  var z=R.zoom||1, cx=R.camX||0; c.save();
  if(z>1.002){ var k=(z-1)/.7; c.translate(lerp(R.x-cx,W/2,k),lerp(CAR_Y,330,k)); c.scale(z,z); c.translate(-(R.x-cx),-CAR_Y); }
  c.translate(-cx,0); /* câmera de lado: o mundo anda com a curva */
  chao(c,t);
  decoracao(c,t);
  estrada(c,t);
  objetos(c,t);
  sombrasGotas(c,t);
  corredores(c,t);
  equipe(c,t);
  gotasNoAr(c,t);
  desenhaParticulas(c,t);
  portais(c,t);
  c.restore();
  hud(c,t);
  if(R.fase==='largada') largada(c,t);
  if(R.goT>0) textoGrande(c,'GO!','#4ade80',1-R.goT/.9);
  if(R.fase==='podio'||R.acabou) podio(c,t);
}

/* ---------- chão: grama listrada, lago das pontes ---------- */
function chao(c,t){
  var sTop=sDe(-40), sBot=sDe(H+40), B=110, cx=R.camX||0; c.save(); c.translate(cx,0); /* grama e lago: faixas da largura da tela */
  for(var k=Math.floor(sBot/B);k<=Math.floor(sTop/B);k++){ var y0=yDe((k+1)*B), y1=yDe(k*B); c.fillStyle= ((k%2)+2)%2?'#4ade80':'#3fcf72'; c.fillRect(0,y0,W,y1-y0+1); }
  /* tufos e flores fixos na grama */
  for(var i=Math.floor(sBot/46);i<=Math.floor(sTop/46);i++){ var h=hash(i*3.7), x=h*(W+800)-400-cx, y=yDe(i*46+hash(i)*40); c.fillStyle='rgba(21,128,61,.35)'; A.el(c,x,y,7,3); c.fill(); if(h>.8){ c.fillStyle=['#fde047','#f472b6','#fff'][i%3]; A.circ(c,x+6,y-2,2.2); c.fill(); A.circ(c,x+10,y+1,2.2); c.fill(); } }
  PONTES.forEach(function(p,pi){ var s0=S(p[0])-60, s1=S(p[1])+60; if(s1<sBot-60||s0>sTop+60) return;
    var y0=yDe(s1), y1=yDe(s0);
    c.fillStyle='#fcd34d'; c.fillRect(0,y0-36,W,36); c.fillRect(0,y1,W,36);
    c.fillStyle='rgba(180,83,9,.25)'; for(var x=0;x<W;x+=23){ A.circ(c,x+hash(x+pi)*10,y0-18+hash(x*1.3)*14,2); c.fill(); A.circ(c,x+hash(x+7)*10,y1+18+hash(x*.7)*14,2); c.fill(); }
    var g=c.createLinearGradient(0,y0,0,y1); g.addColorStop(0,'#0ea5e9'); g.addColorStop(.5,'#0284c7'); g.addColorStop(1,'#0ea5e9'); c.fillStyle=g; c.fillRect(0,y0,W,y1-y0);
    c.fillStyle='rgba(255,255,255,.5)'; c.fillRect(0,y0,W,3); c.fillRect(0,y1-3,W,3);
    c.strokeStyle='rgba(255,255,255,.35)'; c.lineWidth=2.5; c.lineCap='round';
    for(var ss=Math.floor(s0/40)*40;ss<s1;ss+=40){ var yy=yDe(ss); if(yy<y0+6||yy>y1-6) continue; for(var xx=0;xx<W;xx+=120){ var ox=xx+((ss*1.7)%120)+Math.sin(t*1.5+ss)*10; c.beginPath(); c.moveTo(ox,yy); c.quadraticCurveTo(ox+10,yy-5,ox+20,yy); c.stroke(); } }
    for(var lp=0;lp<8;lp++){ var ls=s0+80+hash(lp+pi*9)*(s1-s0-160), lx=hash(lp*5+pi)<.5?60+hash(lp)*120:W-60-hash(lp*2)*120, ly=yDe(ls); c.fillStyle='#16a34a'; c.beginPath(); c.arc(lx,ly,14,.3,TAU-.3); c.lineTo(lx,ly); c.fill(); if(lp%3===0){ c.fillStyle='#f9a8d4'; A.circ(c,lx+3,ly-2,4); c.fill(); } }
  });
  c.restore();
}

/* ---------- laterais: árvores, arbustos, fardos, bandeiras, arquibancadas, boxes ---------- */
function arquibancadaZonas(){ return [[-420,900],[S(T_FIM)-760,S(T_FIM)+700],[S(T_CONDE)-200,S(T_CONDE)+500]]; }
function decoracao(c,t){
  var sTop=sDe(-80), sBot=sDe(H+80), Z=arquibancadaZonas();
  function emArq(s){ for(var i=0;i<Z.length;i++) if(s>Z[i][0]&&s<Z[i][1]) return true; return false; }
  function emPit(s){ for(var i=0;i<PITS.length;i++){ var sb=S(PITS[i]); if(s>sb-700&&s<sb+480) return true; } return false; }
  /* arquibancadas */
  Z.forEach(function(z){ if(z[1]<sBot||z[0]>sTop) return; [-1,1].forEach(function(lado){ arquibancada(c,z,lado,t); }); });
  /* boxes (garagens) à direita, nos pits */
  PITS.forEach(function(tb,pi){ var sb=S(tb); if(sb+480<sBot||sb-700>sTop) return; garagens(c,sb,pi,t); });
  for(var i=Math.floor(sBot/64);i<=Math.floor(sTop/64);i++){
    [-1,1].forEach(function(lado){
      var s=i*64+hash(i*2.1+lado)*30, h=hash(i*7.3+lado*3.1); var P=pista(s); if(P.ag) return;
      var lake=false; PONTES.forEach(function(p){ if(s>S(p[0])-110&&s<S(p[1])+110) lake=true; }); if(lake) return;
      if(emArq(s)) return; if(lado>0&&emPit(s)) return;
      var borda=P.c+lado*P.hw, x=borda+lado*(48+hash(i*1.9+lado)*170), y=yDe(s);
      if(lado<0&&P.pz&&x>P.l-30) return;
      if(x-(R.camX||0)<-40||x-(R.camX||0)>W+40) return;
      if(h<.46) arvore(c,x,y,.85+hash(i+lado*.5)*.45,i,t);
      else if(h<.6) arbusto(c,x,y,i);
      else if(h<.68) fardo(c,x,y);
      else if(h<.73) bandeirola(c,x,y,i,t);
      else if(h<.78) pinheiro(c,x,y,1+hash(i)*.3);
    });
  }
}
function arvore(c,x,y,s,i,t){
  c.save(); c.translate(x,y); c.scale(s,s);
  c.fillStyle='rgba(0,0,0,.22)'; A.el(c,10,12,30,24); c.fill();
  var tons=hash(i)<.5?['#166534','#15803d','#22c55e','#86efac']:['#14532d','#166534','#16a34a','#4ade80'];
  c.fillStyle=tons[0]; A.circ(c,0,0,28); c.fill();
  c.fillStyle=tons[1]; A.circ(c,-9,-6,19); c.fill(); A.circ(c,10,-2,18); c.fill(); A.circ(c,0,10,17); c.fill();
  c.fillStyle=tons[2]; A.circ(c,-8,-9,12); c.fill(); A.circ(c,7,-8,10); c.fill();
  c.fillStyle=tons[3]; c.globalAlpha=.55; A.circ(c,-10,-12,6); c.fill(); A.circ(c,4,-12,4); c.fill(); c.globalAlpha=1;
  if(hash(i*4.4)<.3){ c.fillStyle='#ef4444'; [[-12,4],[8,8],[2,-14],[14,-6],[-4,14]].forEach(function(p){ A.circ(c,p[0],p[1],3); c.fill(); }); }
  c.restore();
}
function pinheiro(c,x,y,s){
  c.save(); c.translate(x,y); c.scale(s,s); c.fillStyle='rgba(0,0,0,.22)'; A.el(c,8,10,24,20); c.fill();
  [[22,'#14532d'],[16,'#166534'],[10,'#15803d'],[4,'#22c55e']].forEach(function(l){ c.fillStyle=l[1]; c.beginPath(); for(var k=0;k<16;k++){ var a=k/16*TAU, r=k%2?l[0]*.72:l[0]; c.lineTo(Math.cos(a)*r,Math.sin(a)*r); } c.closePath(); c.fill(); });
  c.restore();
}
function arbusto(c,x,y,i){ c.fillStyle='rgba(0,0,0,.18)'; A.el(c,x+5,y+6,20,12); c.fill(); c.fillStyle='#15803d'; A.circ(c,x-8,y,10); c.fill(); A.circ(c,x+7,y+1,11); c.fill(); A.circ(c,x,y-6,10); c.fill(); c.fillStyle='#4ade80'; A.circ(c,x-2,y-8,4); c.fill(); if(i%2){ c.fillStyle='#f472b6'; A.circ(c,x+6,y-4,2.6); c.fill(); A.circ(c,x-6,y+2,2.6); c.fill(); } }
function fardo(c,x,y){ c.fillStyle='rgba(0,0,0,.2)'; rr(c,x-18,y-8,42,24,8); c.fill(); c.fillStyle=A.lin(c,x-20,y,x+20,y,'#fde68a','#d97706'); rr(c,x-22,y-13,42,24,8); c.fill(); c.strokeStyle='rgba(146,64,14,.55)'; c.lineWidth=1.5; for(var k=-14;k<=14;k+=7){ c.beginPath(); c.moveTo(x+k,y-12); c.lineTo(x+k+2,y+10); c.stroke(); } c.strokeStyle='#b91c1c'; c.lineWidth=2; c.beginPath(); c.moveTo(x-22,y-2); c.lineTo(x+20,y-2); c.stroke(); }
function bandeirola(c,x,y,i,t){ c.fillStyle='rgba(0,0,0,.2)'; A.el(c,x+4,y+3,6,3); c.fill(); c.strokeStyle='#e5e7eb'; c.lineWidth=3; c.beginPath(); c.moveTo(x,y); c.lineTo(x,y-46); c.stroke(); var cor=['#ef4444','#3b82f6','#fde047','#a855f7'][i%4], w=Math.sin(t*6+i)*4; c.fillStyle=cor; c.beginPath(); c.moveTo(x,y-46); c.quadraticCurveTo(x+14,y-50+w,x+28,y-42+w); c.lineTo(x,y-32); c.closePath(); c.fill(); }
function arquibancada(c,z,lado,t){
  var y0=Math.max(-60,yDe(z[1])), y1=Math.min(H+60,yDe(z[0])); if(y1<=y0) return;
  var P=pista((sDe(y0)+sDe(y1))/2), borda=P.c+lado*P.hw, xi=borda+lado*40, xo=borda+lado*168, xa=Math.min(xi,xo), w=Math.abs(xo-xi);
  c.fillStyle='rgba(0,0,0,.25)'; c.fillRect(xa+(lado>0?10:-10),y0+8,w,y1-y0);
  c.fillStyle='#94a3b8'; c.fillRect(xa,y0,w,y1-y0);
  var degraus=5, dw=w/degraus;
  for(var d=0;d<degraus;d++){ var xx= lado>0?xi+d*dw:xi-(d+1)*dw; c.fillStyle= d%2?'#cbd5e1':'#e2e8f0'; c.fillRect(xx,y0,dw-3,y1-y0);
    for(var yy=y0+8-((sDe(y0))%16+16)%16;yy<y1;yy+=16){ var k=Math.floor(sDe(yy)/16)*7+d*13, hh=hash(k); if(hh<.14) continue; var px=xx+dw/2+(hash(k*2)-.5)*6, py=yy+Math.sin(t*(6+hh*4)+k)*1.6*(hh>.5?1:0);
      c.fillStyle=['#ef4444','#3b82f6','#fde047','#22c55e','#f97316','#ec4899','#a855f7','#fff'][Math.floor(hh*8)]; A.el(c,px,py+3,6,4); c.fill();
      c.fillStyle=['#7c2d12','#facc15','#1c1917','#a16207','#f5d0a9'][Math.floor(hash(k*3)*5)]; A.circ(c,px,py,3.6); c.fill(); } }
  c.fillStyle='#475569'; c.fillRect(lado>0?xo-8:xo,y0,8,y1-y0);
  c.fillStyle='#ef4444'; for(var b=y0;b<y1;b+=40){ c.fillRect(lado>0?xi-6:xi,b,6,20); } c.fillStyle='#fff'; for(b=y0+20;b<y1;b+=40){ c.fillRect(lado>0?xi-6:xi,b,6,20); }
}
function garagens(c,sb,pi,t){
  var s0=sb-700, s1=sb+480, P=pista(sb), xr=P.r+16, xA=xr+46, w=W+(R.camX||0)-xA+20;
  var y0=Math.max(-60,yDe(s1)), y1=Math.min(H+60,yDe(s0));
  c.fillStyle='#d6d3d1'; c.fillRect(xr,y0,xA-xr,y1-y0); /* pátio de concreto */
  c.fillStyle='#fde047'; c.fillRect(xr+4,y0,3,y1-y0);
  for(var g=0;g<8;g++){ var gs=s0+40+g*140, gy=yDe(gs+130), gh=124; if(gy>H+20||gy+gh<-20) continue;
    var minha=Math.abs(gs+65-sb)<75, cor=minha?(J.prog.cor||'#e11d48'):['#3b82f6','#16a34a','#f59e0b','#8b5cf6','#0ea5e9','#ef4444','#14b8a6','#a855f7'][g];
    c.fillStyle='rgba(0,0,0,.25)'; c.fillRect(xA+8,gy+8,w,gh);
    c.fillStyle='#57534e'; c.fillRect(xA,gy,w,gh); c.fillStyle=cor; c.fillRect(xA+4,gy+4,w-8,gh-8);
    c.fillStyle='rgba(255,255,255,.18)'; for(var k=0;k<5;k++) c.fillRect(xA+4,gy+10+k*22,w-8,8);
    c.fillStyle='#1c1917'; c.fillRect(xA-4,gy+14,8,gh-28);
    c.fillStyle='#fff'; c.font=F(900,20); c.textAlign='center'; c.textBaseline='middle'; c.fillText(minha?'BOX':String(g+1),xA+w/2-6,gy+gh/2);
  }
}

/* ---------- a estrada ---------- */
function estrada(c,t){
  var linhas=[], y;
  for(y=-40;y<=H+40;y+=6){ var s=sDe(y), P=pista(s); P.y=y; P.s=s; linhas.push(P); }
  var n=linhas.length, i, a, b;
  /* acostamento escuro + asfalto */
  c.fillStyle='#3f3f46'; c.beginPath(); for(i=0;i<n;i++) c.lineTo(linhas[i].l-14,linhas[i].y); for(i=n-1;i>=0;i--) c.lineTo(linhas[i].r+14,linhas[i].y); c.closePath(); c.fill();
  var g=c.createLinearGradient(0,0,W,0); g.addColorStop(0,'#4b5563'); g.addColorStop(.5,'#565e6b'); g.addColorStop(1,'#4b5563');
  c.fillStyle=g; c.beginPath(); for(i=0;i<n;i++) c.lineTo(linhas[i].l,linhas[i].y); for(i=n-1;i>=0;i--) c.lineTo(linhas[i].r,linhas[i].y); c.closePath(); c.fill();
  /* textura (grãos fixos no asfalto) */
  c.fillStyle='rgba(255,255,255,.07)';
  for(var q=Math.floor(sDe(H+40)/22);q<=Math.floor(sDe(-40)/22);q++){ var Pq=pista(q*22); for(var m=0;m<3;m++){ var hx=hash(q*3+m), xx=Pq.l+8+hx*(Pq.r-Pq.l-16); A.circ(c,xx,yDe(q*22+hash(q+m)*20),1.3+hx); c.fill(); } }
  /* faixa do pit (asfalto mais claro, linhas brancas) */
  c.fillStyle='rgba(203,213,225,.22)';
  for(i=0;i<n-1;i++){ a=linhas[i]; b=linhas[i+1]; if(!a.ln||!b.ln) continue; c.beginPath(); c.moveTo(a.l,a.y); c.lineTo(a.r,a.y); c.lineTo(b.r,b.y); c.lineTo(b.l,b.y); c.closePath(); c.fill(); }
  /* sombra nas bordas */
  c.lineWidth=10; c.strokeStyle='rgba(0,0,0,.16)'; c.beginPath(); for(i=0;i<n;i++) c.lineTo(linhas[i].l+5,linhas[i].y); c.stroke(); c.beginPath(); for(i=0;i<n;i++) c.lineTo(linhas[i].r-5,linhas[i].y); c.stroke();
  /* ilha do pit (grama entre a borda antiga e a barreira) */
  for(i=0;i<n-1;i++){ a=linhas[i]; b=linhas[i+1]; if(!a.pz) continue; var la=a.c-a.hw-14, lb=b.c-b.hw-14; if(a.l-la<6) continue;
    c.fillStyle=((Math.floor(a.s/110)%2)+2)%2?'#4ade80':'#3fcf72'; c.beginPath(); c.moveTo(la,a.y); c.lineTo(a.l-12,a.y); c.lineTo(b.l-12,b.y); c.lineTo(lb,b.y); c.closePath(); c.fill(); }
  /* zebras */
  var ver=new Path2D(), bra=new Path2D();
  for(i=0;i<n-1;i++){ a=linhas[i]; b=linhas[i+1]; if(a.ag) continue; var p=(Math.floor(a.s/34)%2+2)%2?ver:bra;
    if(!(a.pz&&a.l-(a.c-a.hw)>6)){ p.moveTo(a.l-14,a.y); p.lineTo(a.l,a.y); p.lineTo(b.l,b.y); p.lineTo(b.l-14,b.y); p.closePath(); }
    if(!a.ln){ p.moveTo(a.r,a.y); p.lineTo(a.r+14,a.y); p.lineTo(b.r+14,b.y); p.lineTo(b.r,b.y); p.closePath(); } }
  c.fillStyle='#ef4444'; c.fill(ver); c.fillStyle='#f8fafc'; c.fill(bra);
  /* linha branca da faixa do pit */
  c.strokeStyle='#f8fafc'; c.lineWidth=3; c.beginPath(); var on=false; for(i=0;i<n;i++){ a=linhas[i]; if(a.ln){ if(!on){ c.moveTo(a.r-6,a.y); on=true; } else c.lineTo(a.r-6,a.y); } else on=false; } c.stroke();
  /* tracejado central */
  c.fillStyle='rgba(255,255,255,.75)';
  for(i=0;i<n-1;i++){ a=linhas[i]; b=linhas[i+1]; if(a.ag||a.pz||((Math.floor(a.s/70)%2)+2)%2) continue; c.beginPath(); c.moveTo(a.c-3,a.y); c.lineTo(a.c+3,a.y); c.lineTo(b.c+3,b.y); c.lineTo(b.c-3,b.y); c.closePath(); c.fill(); }
  /* pontes de madeira */
  for(i=0;i<n-1;i++){ a=linhas[i]; b=linhas[i+1]; if(!a.ag) continue; var tab=((Math.floor(a.s/16))%2+2)%2;
    c.fillStyle=tab?'#b45309':'#a16207'; c.beginPath(); c.moveTo(a.l-8,a.y); c.lineTo(a.r+8,a.y); c.lineTo(b.r+8,b.y+.5); c.lineTo(b.l-8,b.y+.5); c.closePath(); c.fill();
    if(((Math.floor(a.s/16)*16)-a.s+16)%16<6){ c.fillStyle='rgba(69,26,3,.5)'; c.fillRect(a.l-8,a.y,a.r-a.l+16,1.5); } }
  c.strokeStyle='#78350f'; c.lineWidth=5; [ 'l','r' ].forEach(function(k){ c.beginPath(); var on2=false; for(i=0;i<n;i++){ a=linhas[i]; var xx=k==='l'?a.l-8:a.r+8; if(a.ag){ if(!on2){ c.moveTo(xx,a.y); on2=true; } else c.lineTo(xx,a.y); } else on2=false; } c.stroke(); });
  for(var ps=Math.floor(sDe(H+40)/90)*90;ps<sDe(-40);ps+=90){ var Pp=pista(ps); if(!Pp.ag) continue; var py=yDe(ps); c.fillStyle='#451a03'; rr(c,Pp.l-14,py-5,10,10,2); c.fill(); rr(c,Pp.r+4,py-5,10,10,2); c.fill(); }
  /* largada, chegada, grid e caixa do box */
  linhaQuadriculada(c,0,2); linhaQuadriculada(c,S(T_FIM),3);
  [0,170,340].forEach(function(gs,k){ var Pg=pista(gs), gx=k===0?480:Pg.c+(k===1?-95:95), gy=yDe(gs); if(gy<-60||gy>H+60) return; c.strokeStyle='rgba(255,255,255,.85)'; c.lineWidth=3; c.beginPath(); c.moveTo(gx-26,gy-40); c.lineTo(gx-26,gy-48); c.lineTo(gx+26,gy-48); c.lineTo(gx+26,gy-40); c.stroke(); });
  PITS.forEach(function(tb,pi){ var sb=S(tb), yb=yDe(sb); if(yb<-140||yb>H+140) return; var bx=boxX(pi);
    c.fillStyle='rgba(253,224,71,.95)'; rr(c,bx-44,yb-62,88,124,8); c.fill();
    c.strokeStyle='#1c1917'; c.lineWidth=4; rr(c,bx-44,yb-62,88,124,8); c.stroke();
    c.save(); rr(c,bx-44,yb-62,88,124,8); c.clip(); c.fillStyle='rgba(28,25,23,.85)'; for(var k=-130;k<130;k+=24){ c.beginPath(); c.moveTo(bx-44+k,yb-62); c.lineTo(bx-30+k,yb-62); c.lineTo(bx-30+k+124*.5,yb+62); c.lineTo(bx-44+k+124*.5,yb+62); c.closePath(); c.fill(); } c.restore();
    c.fillStyle='#fde047'; rr(c,bx-34,yb-52,68,104,6); c.fill();
    c.fillStyle='rgba(28,25,23,.8)'; c.font=F(900,22); c.textAlign='center'; c.textBaseline='middle'; if(R.pitFeito[pi]&&R.fase!=='saida'&&R.fase!=='box') c.globalAlpha=.6; c.fillText('BOX',bx,yb+80); c.globalAlpha=1;
    /* setas pintadas no funil */
    for(var k2=0;k2<3;k2++){ var sa=sb-1150+k2*170, Pa=pista(sa), ya=yDe(sa), xa=lerp(Pa.c-90,Pa.c+70,k2/2); c.save(); c.translate(xa,ya); c.rotate(.5); c.fillStyle='rgba(255,255,255,.7)'; c.beginPath(); c.moveTo(0,-26); c.lineTo(16,-6); c.lineTo(6,-6); c.lineTo(6,22); c.lineTo(-6,22); c.lineTo(-6,-6); c.lineTo(-16,-6); c.closePath(); c.fill(); c.restore(); }
    var sp=sb-420, yp=yDe(sp); c.fillStyle='rgba(255,255,255,.75)'; c.font=F(900,34); c.textAlign='center'; c.fillText('PIT',boxX(pi),yp);
  });
  /* barreiras de pneus ao longo do funil e da faixa do pit */
  PITS.forEach(function(tb){ var sb=S(tb);
    for(var ss=Math.ceil((sb-1290)/26)*26;ss<sb+990;ss+=26){ var yy=yDe(ss); if(yy<-20||yy>H+20) continue; var Pb=pista(ss); if(Pb.l-(Pb.c-Pb.hw)>4) pneu(c,Pb.l-12,yy,11,ss);
      if(ss<sb-650||ss>sb+500) pneu(c,Pb.r+12,yy,11,ss+1); } });
}
function linhaQuadriculada(c,s,linhas){
  var y=yDe(s); if(y<-40||y>H+40) return; var P=pista(s), q=16, cols=Math.ceil((P.r-P.l)/q);
  for(var r=0;r<linhas;r++) for(var k=0;k<cols;k++){ c.fillStyle=(k+r)%2?'#111827':'#f8fafc'; c.fillRect(P.l+k*q,y-r*q,Math.min(q,P.r-(P.l+k*q)),q); }
}
function pneu(c,x,y,r,k){ c.fillStyle='rgba(0,0,0,.25)'; A.circ(c,x+3,y+4,r); c.fill(); c.fillStyle='#18181b'; A.circ(c,x,y,r); c.fill(); c.strokeStyle=(Math.floor(k/26)%2)?'#ef4444':'#f8fafc'; c.lineWidth=3; A.circ(c,x,y,r-3); c.stroke(); c.fillStyle='#52525b'; A.circ(c,x,y,r*.38); c.fill(); }

/* ---------- objetos ---------- */
function objetos(c,t){
  var sTop=sDe(-80), sBot=sDe(H+80);
  /* chão primeiro (lama, óleo, rampa), depois o resto */
  for(var pass=0;pass<2;pass++) for(var i=0;i<OB.length;i++){ var o=OB[i]; if(o.s<sBot) continue; if(o.s>sTop) break;
    var chao=o.tipo==='lama'||o.tipo==='oleo'||o.tipo==='tinta'||o.tipo==='rampa'; if((pass===0)!==chao) continue;
    var P=pista(o.s), x=P.c+o.off, y=yDe(o.s);
    if(!o.vivo){ if(o.voa&&o.voa.t<.8){ var k=o.voa.t; c.save(); c.globalAlpha=1-k/.8; c.translate(x+o.voa.vx*k,y-o.voa.vs*k+300*k*k); c.rotate(k*12); cone(c,0,0); c.restore(); } continue; }
    switch(o.tipo){
      case 'estrela': estrelaColeta(c,x,y,t,o); break;
      case 'lata': lata(c,x,y,t); break;
      case 'engrenagem': engrenagem(c,x,y,t); break;
      case 'cone': cone(c,x,y); break;
      case 'pedra': pedra(c,x,y,o.r,o.s); break;
      case 'oleo': oleo(c,x,y,o.w,o.h,t,o.s); break;
      case 'tinta': oleo(c,x,y,o.w,o.h,t,o.s,true); break;
      case 'lama': lama(c,x,y,o.w,o.h,o.s); break;
      case 'rampa': rampa(c,x,y,o.w,o.h); break;
      case 'placa': placa(c,x,y,o.txt,t); break;
    }
  }
}
function estrelaColeta(c,x,y,t,o){
  var b=Math.sin(t*4+o.s*.02)*2, gl=c.createRadialGradient(x,y+b,2,x,y+b,22); gl.addColorStop(0,'rgba(253,224,71,.6)'); gl.addColorStop(1,'rgba(253,224,71,0)'); c.fillStyle=gl; A.circ(c,x,y+b,22); c.fill();
  c.fillStyle='rgba(0,0,0,.18)'; A.el(c,x+3,y+10,9,3); c.fill();
  A.estrela(c,x,y+b,13,'#f59e0b',Math.sin(t*2+o.s)*.2); A.estrela(c,x-1,y+b-1,10,'#fde047',Math.sin(t*2+o.s)*.2);
  c.fillStyle='rgba(255,255,255,.85)'; A.circ(c,x-3,y+b-4,2); c.fill();
}
function lata(c,x,y,t){
  var b=Math.sin(t*5)*2; c.save(); c.translate(x,y+b);
  var gl=c.createRadialGradient(0,0,3,0,0,30); gl.addColorStop(0,'rgba(96,165,250,.55)'); gl.addColorStop(1,'rgba(96,165,250,0)'); c.fillStyle=gl; A.circ(c,0,0,30); c.fill();
  c.fillStyle='rgba(0,0,0,.22)'; A.el(c,4,16,14,5); c.fill();
  var f=Math.random()*4; c.fillStyle='#f97316'; c.beginPath(); c.moveTo(-6,14); c.quadraticCurveTo(0,26+f,6,14); c.fill(); c.fillStyle='#fde047'; c.beginPath(); c.moveTo(-3,14); c.quadraticCurveTo(0,21+f,3,14); c.fill();
  c.fillStyle=A.lin(c,-12,0,12,0,'#1d4ed8','#60a5fa'); rr(c,-12,-16,24,30,6); c.fill(); c.strokeStyle='#1e3a8a'; c.lineWidth=2; rr(c,-12,-16,24,30,6); c.stroke();
  c.fillStyle='#e2e8f0'; A.el(c,0,-15,11,4); c.fill(); c.fillStyle='#94a3b8'; A.el(c,0,-15,6,2); c.fill();
  c.fillStyle='#fde047'; c.beginPath(); c.moveTo(2,-10); c.lineTo(-5,1); c.lineTo(0,1); c.lineTo(-2,10); c.lineTo(6,-2); c.lineTo(1,-2); c.closePath(); c.fill();
  c.fillStyle='rgba(255,255,255,.45)'; rr(c,-9,-10,3,18,2); c.fill();
  c.restore();
}
function engrenagem(c,x,y,t){
  c.save(); c.translate(x,y); var pul=1+.08*Math.sin(t*6);
  var gl=c.createRadialGradient(0,0,6,0,0,46*pul); gl.addColorStop(0,'rgba(251,191,36,.7)'); gl.addColorStop(1,'rgba(251,191,36,0)'); c.fillStyle=gl; A.circ(c,0,0,46*pul); c.fill();
  c.fillStyle='rgba(0,0,0,.25)'; A.el(c,5,24,22,6); c.fill();
  c.rotate(t*1.5); c.beginPath(); for(var k=0;k<20;k++){ var a=k/20*TAU, r=(k%2)?18:24; c.lineTo(Math.cos(a-.08)*r,Math.sin(a-.08)*r); c.lineTo(Math.cos(a+.08)*r,Math.sin(a+.08)*r); } c.closePath();
  c.fillStyle=A.lin(c,-24,-24,24,24,'#fde68a','#b45309'); c.fill(); c.strokeStyle='#78350f'; c.lineWidth=2; c.stroke();
  c.fillStyle='#18181b'; A.circ(c,0,0,13); c.fill(); c.strokeStyle='#52525b'; c.lineWidth=3; for(var j=0;j<8;j++){ var a2=j/8*TAU; c.beginPath(); c.moveTo(Math.cos(a2)*10,Math.sin(a2)*10); c.lineTo(Math.cos(a2)*13,Math.sin(a2)*13); c.stroke(); }
  c.fillStyle='#d4d4d8'; A.circ(c,0,0,6); c.fill(); c.fillStyle='#fde047'; A.circ(c,0,0,2.5); c.fill();
  c.restore();
}
function cone(c,x,y){
  c.fillStyle='rgba(0,0,0,.25)'; A.el(c,x+4,y+5,12,7); c.fill();
  c.fillStyle='#1c1917'; rr(c,x-12,y-12,24,24,4); c.fill(); c.fillStyle='#ea580c'; rr(c,x-10,y-10,20,20,3); c.fill();
  c.fillStyle='#f97316'; A.circ(c,x,y,8.5); c.fill(); c.strokeStyle='#fff'; c.lineWidth=2.6; A.circ(c,x,y,5.5); c.stroke(); c.fillStyle='#fdba74'; A.circ(c,x-1,y-1,2.2); c.fill();
}
function pedra(c,x,y,r,s){
  c.fillStyle='rgba(0,0,0,.28)'; A.el(c,x+5,y+6,r+2,r*.7); c.fill();
  c.beginPath(); for(var k=0;k<9;k++){ var a=k/9*TAU, rr2=r*(.82+hash(s+k)*.3); c.lineTo(x+Math.cos(a)*rr2,y+Math.sin(a)*rr2); } c.closePath();
  c.fillStyle=A.lin(c,x-r,y-r,x+r,y+r,'#d6d3d1','#57534e'); c.fill(); c.strokeStyle='#44403c'; c.lineWidth=2; c.stroke();
  c.strokeStyle='rgba(41,37,36,.5)'; c.lineWidth=1.5; c.beginPath(); c.moveTo(x-r*.3,y-r*.4); c.lineTo(x,y); c.lineTo(x+r*.4,y+r*.1); c.stroke();
  c.fillStyle='rgba(255,255,255,.35)'; A.el(c,x-r*.35,y-r*.4,r*.3,r*.18); c.fill();
  c.fillStyle='rgba(74,222,128,.7)'; A.el(c,x+r*.3,y+r*.45,r*.3,r*.15); c.fill();
}
function oleo(c,x,y,w,h,t,s,fresca){
  c.save(); c.translate(x,y); c.beginPath(); for(var k=0;k<14;k++){ var a=k/14*TAU, rr2=1+(hash(s+k*1.7)-.5)*.32; c.lineTo(Math.cos(a)*w/2*rr2,Math.sin(a)*h/2*rr2); } c.closePath();
  c.fillStyle=fresca?'#312e81':'#1e1b4b'; c.fill();
  c.save(); c.clip(); var g=c.createLinearGradient(-w/2,-h/2,w/2,h/2); g.addColorStop(0,'rgba(168,85,247,0)'); g.addColorStop(.45,'rgba(168,85,247,.45)'); g.addColorStop(.55,'rgba(56,189,248,.35)'); g.addColorStop(.7,'rgba(74,222,128,.25)'); g.addColorStop(1,'rgba(168,85,247,0)'); c.fillStyle=g; c.fillRect(-w/2,-h/2,w,h); c.restore();
  c.fillStyle='rgba(255,255,255,.5)'; A.el(c,-w*.18,-h*.18,w*.12,h*.08); c.fill(); A.circ(c,w*.2,-h*.05,2); c.fill();
  c.restore();
}
function lama(c,x,y,w,h,s){
  c.save(); c.translate(x,y); c.beginPath(); for(var k=0;k<16;k++){ var a=k/16*TAU, rr2=1+(hash(s*.3+k)-.5)*.28; c.lineTo(Math.cos(a)*w/2*rr2,Math.sin(a)*h/2*rr2); } c.closePath();
  c.fillStyle='#78350f'; c.fill(); c.strokeStyle='#5b2a0c'; c.lineWidth=3; c.stroke();
  c.fillStyle='#92400e'; A.el(c,-w*.12,-h*.08,w*.28,h*.22); c.fill(); A.el(c,w*.22,h*.12,w*.16,h*.14); c.fill();
  c.fillStyle='rgba(254,215,170,.35)'; A.circ(c,-w*.25,h*.1,3); c.fill(); A.circ(c,w*.1,-h*.2,2.4); c.fill(); A.circ(c,w*.3,-h*.08,2); c.fill();
  c.restore();
}
function rampa(c,x,y,w,h){
  c.fillStyle='rgba(0,0,0,.3)'; c.fillRect(x-w/2+8,y-h/2+8,w,h);
  c.fillStyle=A.lin(c,0,y+h/2,0,y-h/2,'#a16207','#fde68a'); c.fillRect(x-w/2,y-h/2,w,h);
  c.strokeStyle='rgba(120,53,15,.5)'; c.lineWidth=2; for(var k=1;k<6;k++){ c.beginPath(); c.moveTo(x-w/2,y-h/2+k*h/6); c.lineTo(x+w/2,y-h/2+k*h/6); c.stroke(); }
  for(var j=0;j<2;j++){ var sx=j?x+w/2-12:x-w/2; c.fillStyle='#1c1917'; c.fillRect(sx,y-h/2,12,h); c.fillStyle='#fde047'; for(var q=0;q<h;q+=14) c.fillRect(sx,y-h/2+q,12,7); }
  c.fillStyle='rgba(255,255,255,.85)'; for(var a=0;a<3;a++){ var ay=y+h/2-12-a*16; c.beginPath(); c.moveTo(x-18,ay+6); c.lineTo(x,ay-6); c.lineTo(x+18,ay+6); c.lineTo(x+18,ay+11); c.lineTo(x,ay-1); c.lineTo(x-18,ay+11); c.closePath(); c.fill(); }
}
function placa(c,x,y,txt,t){
  c.fillStyle='rgba(0,0,0,.25)'; A.el(c,x+8,y+4,30,6); c.fill();
  c.fillStyle='#57534e'; c.fillRect(x-3,y-40,6,42);
  var pis=.75+.25*Math.sin(t*8);
  c.fillStyle='#1c1917'; rr(c,x-58,y-92,116,56,10); c.fill(); c.fillStyle='rgba(253,224,71,'+pis+')'; rr(c,x-54,y-88,108,48,8); c.fill();
  c.fillStyle='#1c1917'; c.font=F(900,28); c.textAlign='center'; c.textBaseline='middle'; c.fillText(txt,x-12,y-63);
  c.beginPath(); c.moveTo(x+22,y-78); c.lineTo(x+44,y-64); c.lineTo(x+22,y-50); c.closePath(); c.fill();
}

/* ---------- portais (pórticos por cima da pista) ---------- */
function portais(c,t){
  portico(c,60,'START',['#16a34a','#bbf7d0'],t,true);
  portico(c,S(T_FIM)+30,'FINISH',['#111827','#fde047'],t,false);
  PITS.forEach(function(tb,pi){ portico(c,S(tb)-1300,'PIT STOP ▶',['#ca8a04','#fef08a'],t,false); });
}
function portico(c,s,txt,cor,t,luzes){
  var y=yDe(s); if(y<-60||y>H+60) return; var P=pista(s), x0=P.c-P.hw-26, x1=P.c+P.hw+26;
  c.fillStyle='rgba(0,0,0,.2)'; c.fillRect(x0+18,y+14,x1-x0,22);
  c.fillStyle='#475569'; rr(c,x0-8,y-12,16,24,3); c.fill(); rr(c,x1-8,y-12,16,24,3); c.fill();
  c.fillStyle='#64748b'; c.fillRect(x0,y-6,x1-x0,12);
  c.fillStyle=cor[0]; rr(c,P.c-120,y-20,240,34,8); c.fill(); c.strokeStyle='#0f172a'; c.lineWidth=2; rr(c,P.c-120,y-20,240,34,8); c.stroke();
  c.fillStyle=cor[1]; c.font=F(900,22); c.textAlign='center'; c.textBaseline='middle'; c.fillText(txt,P.c,y-2);
  if(luzes){ var k=R.fase==='largada'?Math.floor(R.t/.8):4; for(var i=0;i<3;i++){ var lx=P.c+150+i*24-24, acesa= k>=3?'#22c55e':(i<k+1?'#ef4444':'#3f3f46'); c.fillStyle='#0f172a'; A.circ(c,lx,y-2,11); c.fill(); c.fillStyle=acesa; A.circ(c,lx,y-2,8); c.fill(); }
    for(i=0;i<3;i++){ var lx2=P.c-150-i*24+24, ac2= k>=3?'#22c55e':(i<k+1?'#ef4444':'#3f3f46'); c.fillStyle='#0f172a'; A.circ(c,lx2,y-2,11); c.fill(); c.fillStyle=ac2; A.circ(c,lx2,y-2,8); c.fill(); } }
}

/* ---------- o KART visto de cima ---------- */
function roda(c,x,y,w,h,ang,giro){
  c.save(); c.translate(x,y); c.rotate(ang||0);
  c.fillStyle='#0b0b0f'; rr(c,-w/2,-h/2,w,h,Math.min(w,h)*.3); c.fill();
  c.fillStyle='#3f3f46'; var passo=h/5, off=((giro||0)%passo+passo)%passo; for(var k=-h/2+off;k<h/2;k+=passo){ c.fillRect(-w/2+1,k,w-2,1.6); }
  c.fillStyle='rgba(255,255,255,.18)'; rr(c,-w/2+1,-h/2+2,2,h-4,1); c.fill();
  c.restore();
}
/* o: {cor, piloto(c), esc, ang, mons(0..1), turbo, pisca:{lado,on}, alt, giroRodas, steer, nome} */
function kart(c,x,y,o){
  var s=(o.esc||1)*(o.semKS?1:KS), alt=o.alt||0, m=o.mons||0;
  c.save(); c.translate(x,y);
  /* sombra (afasta quando no ar) */
  c.save(); c.translate(5+alt*.6,8+alt*.9); c.rotate(o.ang||0); c.scale(s,s); c.fillStyle='rgba(0,0,0,'+(.3-Math.min(.15,alt*.004))+')'; rr(c,-24-m*10,-38,48+m*20,80,18); c.fill(); c.restore();
  c.rotate(o.ang||0); var sa=s*(1+alt*.007); c.scale(sa,sa);
  var cor=o.cor, gr=o.giroRodas||0, st=o.steer||0, bob=m?Math.sin(J.t*22)*1.6:0;
  /* turbo: chamas do escapamento */
  if(o.turbo){ for(var f=0;f<2;f++){ var fx=f?7:-7, fl=14+Math.random()*12; c.fillStyle='rgba(249,115,22,.9)'; c.beginPath(); c.moveTo(fx-5,38); c.quadraticCurveTo(fx,38+fl*1.4,fx+5,38); c.fill(); c.fillStyle='rgba(254,240,138,.95)'; c.beginPath(); c.moveTo(fx-2.6,38); c.quadraticCurveTo(fx,38+fl*.8,fx+2.6,38); c.fill(); } }
  /* rodas */
  if(m){ var wx=lerp(21,34,m), ww=lerp(12,22,m), wh=lerp(20,32,m);
    c.strokeStyle='#facc15'; c.lineWidth=3; [[-1,-22],[1,-22],[-1,22],[1,22]].forEach(function(p,k){ c.beginPath(); for(var q=0;q<5;q++){ c.lineTo(p[0]*(12+q*(wx-12)/5),p[1]+(q%2?3:-3)); } c.stroke(); });
    [[-wx,-22+bob,st],[wx,-22-bob,st],[-wx,22-bob,0],[wx,22+bob,0]].forEach(function(p){ roda(c,p[0],p[1],ww,wh,p[2],gr); c.fillStyle='#a1a1aa'; A.circ(c,p[0],p[1],ww*.22); c.fill(); });
  } else { roda(c,-20,-22,11,18,st,gr); roda(c,20,-22,11,18,st,gr); roda(c,-21,21,13,22,0,gr); roda(c,21,21,13,22,0,gr); }
  c.translate(0,m?-3+bob*.4:0);
  /* aerofólio dianteiro */
  c.fillStyle='#1f2937'; rr(c,-21,-46,42,8,3); c.fill(); c.fillStyle=cor; rr(c,-17,-45,34,3,1.5); c.fill();
  /* carroceria */
  c.beginPath();
  if(o.forma==='bolha'){ c.moveTo(0,-41); c.bezierCurveTo(16,-41,22,-24,22,0); c.bezierCurveTo(22,22,16,31,0,31); c.bezierCurveTo(-16,31,-22,22,-22,0); c.bezierCurveTo(-22,-24,-16,-41,0,-41); }
  else if(o.forma==='angular'){ c.moveTo(0,-47); c.lineTo(10,-30); c.lineTo(21,-15); c.lineTo(21,12); c.lineTo(16,31); c.lineTo(-16,31); c.lineTo(-21,12); c.lineTo(-21,-15); c.lineTo(-10,-30); }
  else if(o.forma==='fino'){ c.moveTo(0,-47); c.quadraticCurveTo(7,-45,8,-30); c.lineTo(12,-6); c.lineTo(14,18); c.lineTo(12,31); c.lineTo(-12,31); c.lineTo(-14,18); c.lineTo(-12,-6); c.lineTo(-8,-30); c.quadraticCurveTo(-7,-45,0,-47); }
  else { c.moveTo(0,-42); c.quadraticCurveTo(9,-42,11,-36); c.lineTo(13,-22); c.lineTo(19,-12); c.lineTo(20,14); c.lineTo(17,31); c.lineTo(-17,31); c.lineTo(-20,14); c.lineTo(-19,-12); c.lineTo(-13,-22); c.lineTo(-11,-36); c.quadraticCurveTo(-9,-42,0,-42); }
  c.closePath();
  c.fillStyle=A.lin(c,-20,0,20,0,esc(cor,.28),cla(cor,.25)); c.fill(); c.strokeStyle=esc(cor,.5); c.lineWidth=1.6; c.stroke();
  c.fillStyle='rgba(255,255,255,.28)'; c.beginPath(); c.moveTo(-3,-40); c.lineTo(3,-40); c.lineTo(5,-20); c.lineTo(-5,-20); c.closePath(); c.fill();
  /* laterais */
  c.fillStyle=esc(cor,.35); rr(c,-24,-8,7,26,3); c.fill(); rr(c,17,-8,7,26,3); c.fill();
  c.fillStyle='rgba(255,255,255,.25)'; rr(c,-23,-6,2,20,1); c.fill();
  /* número no bico + a marca de cada piloto (Paulo: carros mais customizados) */
  c.fillStyle='#fff'; A.circ(c,0,-30,6); c.fill(); c.fillStyle=esc(cor,.45); c.font=F(900,8); c.textAlign='center'; c.textBaseline='middle'; c.fillText(String(o.num||''),0,-29.5);
  if(o.marca) marcaKart(c,o.marca,cor);
  /* aerofólio traseiro + escapamentos */
  c.fillStyle='#71717a'; A.circ(c,-7,35,3.2); c.fill(); A.circ(c,7,35,3.2); c.fill(); c.fillStyle='#27272a'; A.circ(c,-7,35,1.6); c.fill(); A.circ(c,7,35,1.6); c.fill();
  c.fillStyle='#1f2937'; rr(c,-25,28,50,9,3); c.fill(); c.fillStyle=cor; rr(c,-21,30,42,3,1.5); c.fill();
  /* cockpit, volante, piloto */
  c.fillStyle='#111827'; A.el(c,0,3,12,16); c.fill();
  c.strokeStyle='#0b0b0f'; c.lineWidth=2.5; c.beginPath(); c.arc(0,-9,6,PI+.35,TAU-.35); c.stroke();
  if(o.piloto) o.piloto(c);
  /* seta piscando antes de trocar de lado */
  if(o.pisca&&o.pisca.on){ var lx=o.pisca.lado*24; c.fillStyle='#fb923c'; A.circ(c,lx,-40,4); c.fill(); A.circ(c,lx,32,4); c.fill(); c.save(); c.globalAlpha=.9; c.fillStyle='#f97316'; c.strokeStyle='#7c2d12'; c.lineWidth=2; c.beginPath(); var ax=o.pisca.lado*36; c.moveTo(ax,-14); c.lineTo(ax+o.pisca.lado*20,0); c.lineTo(ax,14); c.lineTo(ax,6); c.lineTo(ax-o.pisca.lado*10,6); c.lineTo(ax-o.pisca.lado*10,-6); c.lineTo(ax,-6); c.closePath(); c.fill(); c.stroke(); c.restore(); }
  c.restore();
}
/* piloto: ombros, braços, capacete */
function piloto(c,camisa,capCor,deco,quem){
  c.fillStyle=camisa; A.el(c,0,9,13,7); c.fill(); c.strokeStyle='rgba(0,0,0,.25)'; c.lineWidth=1; c.stroke();
  c.strokeStyle=camisa; c.lineWidth=4.5; c.lineCap='round'; c.beginPath(); c.moveTo(-10,6); c.lineTo(-6,-8); c.moveTo(10,6); c.lineTo(6,-8); c.stroke();
  c.fillStyle='#f5d0a9'; A.circ(c,-6,-9,2.8); c.fill(); A.circ(c,6,-9,2.8); c.fill();
  c.save(); c.translate(0,3); capacete(c,capCor,deco,quem); c.restore();
}
function capacete(c,cor,deco,quem){
  if(deco==='hair'){ c.fillStyle=quem==='bia'?'#1c1917':'#7c2d12'; c.beginPath(); c.moveTo(-4,8); c.quadraticCurveTo(0,26+Math.sin(J.t*9)*2,5,8); c.fill(); }
  if(deco==='cape'){ var w=Math.sin(J.t*10)*4; c.fillStyle='#6d28d9'; c.beginPath(); c.moveTo(-14,4); c.quadraticCurveTo(-18+w,22,-10+w,40); c.lineTo(10+w,40); c.quadraticCurveTo(18+w,22,14,4); c.closePath(); c.fill(); c.fillStyle='#b91c1c'; c.beginPath(); c.moveTo(-10,6); c.lineTo(-8+w*.6,34); c.lineTo(8+w*.6,34); c.lineTo(10,6); c.closePath(); c.fill(); }
  if(deco==='plume'){ var w2=Math.sin(J.t*12)*2; c.fillStyle='#dc2626'; c.beginPath(); c.moveTo(0,-6); c.quadraticCurveTo(5+w2,6,w2,22); c.quadraticCurveTo(-5+w2,6,0,-6); c.fill(); }
  if(deco==='hat'){ c.fillStyle='#3b0764'; A.circ(c,0,0,15); c.fill(); c.strokeStyle='#22c55e'; c.lineWidth=2.4; A.circ(c,0,0,9.5); c.stroke(); c.fillStyle='#6d28d9'; A.circ(c,0,1,8.4); c.fill(); c.fillStyle='#8b5cf6'; A.circ(c,0,2.4,5.2); c.fill(); c.fillStyle='#a78bfa'; A.circ(c,0,4,2.2); c.fill(); return; }
  if(deco==='tophat'){ c.fillStyle='#0b0b0f'; A.el(c,0,0,14,13); c.fill(); c.strokeStyle='#7c3aed'; c.lineWidth=2.6; A.circ(c,0,0,9); c.stroke(); c.fillStyle='#1c1917'; A.circ(c,0,0,7.6); c.fill(); c.fillStyle='rgba(255,255,255,.18)'; A.el(c,-2.5,-2.5,3,2); c.fill(); return; }
  if(deco==='frog'){ c.fillStyle=A.lin(c,-11,0,11,0,'#15803d','#4ade80'); A.circ(c,0,0,11); c.fill(); c.strokeStyle='#14532d'; c.lineWidth=1.5; c.stroke(); [-6,6].forEach(function(ex){ c.fillStyle='#4ade80'; A.circ(c,ex,-8,5); c.fill(); c.fillStyle='#fff'; A.circ(c,ex,-9,3.4); c.fill(); c.fillStyle='#0b0b0f'; A.circ(c,ex,-10,1.7); c.fill(); }); c.fillStyle='#fbbf24'; c.beginPath(); for(var k=0;k<10;k++){ var a=k/10*TAU, r2=k%2?2.6:4.6; c.lineTo(Math.cos(a)*r2,2+Math.sin(a)*r2); } c.closePath(); c.fill(); return; }
  if(deco==='wolf'||deco==='pig'){ var orelha=deco==='wolf'?'#57534e':'#f472b6'; c.fillStyle=orelha; [-1,1].forEach(function(l){ c.beginPath(); c.moveTo(l*5,-6); c.lineTo(l*14,-12); c.lineTo(l*11,0); c.closePath(); c.fill(); }); }
  c.fillStyle=A.lin(c,-11,-11,11,11,cla(cor,.35),esc(cor,.2)); A.circ(c,0,0,11); c.fill(); c.strokeStyle=esc(cor,.5); c.lineWidth=1.4; c.stroke();
  if(deco==='wolf'){ c.fillStyle='#78716c'; A.el(c,0,-11,5,6); c.fill(); c.fillStyle='#0b0b0f'; A.circ(c,0,-15,2.2); c.fill(); }
  else if(deco==='pig'){ c.fillStyle='#f9a8d4'; A.el(c,0,-11,5,3.6); c.fill(); c.fillStyle='#9d174d'; A.circ(c,-1.8,-11,1); c.fill(); A.circ(c,1.8,-11,1); c.fill(); }
  /* viseira para a frente (para cima) */
  if(deco==='knight'){ c.fillStyle='#0f172a'; rr(c,-8,-8,16,3,1.5); c.fill(); c.fillStyle='#94a3b8'; rr(c,-1,-10,2,14,1); c.fill(); }
  else if(deco!=='wolf'&&deco!=='pig'){ c.beginPath(); c.arc(0,0,11,-PI*.86,-PI*.14); c.arc(0,0,6,-PI*.14,-PI*.86,true); c.closePath(); c.fillStyle='#0f172a'; c.fill(); c.fillStyle='rgba(147,197,253,.55)'; c.beginPath(); c.arc(0,0,10,-PI*.78,-PI*.62); c.arc(0,0,7,-PI*.62,-PI*.78,true); c.closePath(); c.fill(); }
  if(deco==='crown'){ c.fillStyle='#fbbf24'; c.beginPath(); for(var j=0;j<10;j++){ var a2=j/10*TAU-PI/2, r3=j%2?3.4:6.6; c.lineTo(Math.cos(a2)*r3,3+Math.sin(a2)*r3); } c.closePath(); c.fill(); c.fillStyle='#ef4444'; A.circ(c,0,3,1.6); c.fill(); c.fillStyle='#fde047'; c.beginPath(); c.moveTo(-6,9); c.quadraticCurveTo(0,16,6,9); c.lineTo(4,12); c.lineTo(-4,12); c.fill(); }
  else if(deco==='star'){ A.estrela(c,0,3,5,'#fde047',0); }
  else if(deco==='stripe'||deco==='hair'){ c.fillStyle='rgba(255,255,255,.85)'; rr(c,-1.6,0,3.2,10.5,1.5); c.fill(); }
  c.fillStyle='rgba(255,255,255,.45)'; A.el(c,-4,3,3,2); c.fill();
}
var COR_HEROI={lia:'#e11d48',theo:'#2563eb',bia:'#9333ea',leo:'#16a34a'};
function pilotoHeroi(cor){ var quem=J.prog.heroi||'lia', deco=quem==='lia'||quem==='bia'?'hair':(quem==='theo'?'star':'stripe'); return function(c){ piloto(c,'#f8fafc',cor,deco,quem); }; }
var DECO={princess:'crown',frog:'frog',knight:'knight',wolf:'wolf',pig:'pig',witch:'hat',fairy:'star',dragon:'stripe',red:'hood'};
var CAMISA={princess:'#fbcfe8',frog:'#86efac',knight:'#cbd5e1',wolf:'#a8a29e',pig:'#fce7f3',witch:'#581c87',fairy:'#ede9fe',dragon:'#fecaca',red:'#fee2e2'};

function corredores(c,t){
  var lista=[];
  R.rivais.forEach(function(r){ if(!r.ativo) return; var P=pista(r.s); if(P.pz) return; var y=yDe(r.s); if(y<-80||y>H+80) return; lista.push({y:y,f:function(){ desenhaRival(c,r,P.c+r.off,y,t); }}); });
  if(R.conde){ var C=R.conde, Pc=pista(C.s), yc=yDe(C.s); if(yc>-90&&yc<H+90) lista.push({y:yc,f:function(){ desenhaConde(c,C,Pc.c+C.off,yc,t); }}); }
  lista.sort(function(a,b){ return a.y-b.y; }); lista.forEach(function(x){ x.f(); });
  if(R.fase!=='podio'&&!R.acabou) desenhaJogador(c,t);
}
function desenhaRival(c,r,x,y,t){
  var d=r.d, ang=r.giro>0?r.giro*TAU*1.2:(r.alvo-r.off)/110*.25, num=RIVAIS_DEF.indexOf(d)+1;
  kart(c,x,y,{cor:r.cor||d.cor,forma:FORMA[d.id],ang:ang,num:num,marca:d.id,giroRodas:J.t*(r.v||200)*.12,steer:cl((r.alvo-r.off)/80,-.4,.4),pisca:r.pisca>0?{lado:r.dirP,on:Math.floor(r.pisca*8)%2===0}:null,
    piloto:function(c2){ piloto(c2,CAMISA[d.id]||'#fff',r.cor||d.cor,DECO[d.id],d.id); }});
  if(r.tag>0||r.estado==='ultrapassado'){ c.save(); c.globalAlpha=Math.min(1,Math.max(r.tag,r.estado==='ultrapassado'?1:0)*2); c.font=F(900,13); var tw=c.measureText(d.nome).width+14; c.fillStyle=r.estado==='ultrapassado'?'rgba(22,101,52,.85)':'rgba(13,11,30,.7)'; rr(c,x-tw/2,y+24,tw,19,9); c.fill(); c.fillStyle='#fff'; c.textAlign='center'; c.textBaseline='middle'; c.fillText(d.nome,x,y+34); c.restore(); }
}
/* marcas pintadas no capô / acessórios de cada kart (vista de cima) */
function marcaKart(c,id,cor){
  c.save();
  if(id==='princess'){ c.fillStyle='#fbbf24'; c.beginPath(); c.moveTo(-8,-14); c.lineTo(-8,-22); c.lineTo(-4,-17); c.lineTo(0,-23); c.lineTo(4,-17); c.lineTo(8,-22); c.lineTo(8,-14); c.closePath(); c.fill(); }
  else if(id==='frog'){ c.fillStyle='#4ade80'; c.beginPath(); c.arc(0,-18,7,.4,TAU-.4); c.lineTo(0,-18); c.fill(); }
  else if(id==='knight'){ c.fillStyle='#e2e8f0'; c.beginPath(); c.moveTo(-6,-23); c.lineTo(6,-23); c.lineTo(6,-17); c.quadraticCurveTo(0,-10,0,-10); c.quadraticCurveTo(-6,-14,-6,-17); c.closePath(); c.fill(); c.fillStyle='#dc2626'; c.fillRect(-1,-22,2,10); c.fillRect(-5,-19,10,2); }
  else if(id==='wolf'){ c.fillStyle='#d6d3d1'; A.el(c,0,-16,4,3.4); c.fill(); [-4,0,4].forEach(function(px){ A.el(c,px,-22,2,2.4); c.fill(); }); }
  else if(id==='pig'){ c.strokeStyle='#f472b6'; c.lineWidth=2.4; c.beginPath(); c.arc(0,40,4,0,TAU*.8); c.stroke(); c.fillStyle='#fbcfe8'; A.el(c,0,-17,5,3.5); c.fill(); }
  else if(id==='witch'){ c.strokeStyle='#92400e'; c.lineWidth=3; c.beginPath(); c.moveTo(0,30); c.lineTo(0,50); c.stroke(); c.fillStyle='#facc15'; c.beginPath(); c.moveTo(-6,48); c.lineTo(6,48); c.lineTo(8,60); c.lineTo(-8,60); c.closePath(); c.fill(); A.estrela(c,0,-17,5,'#fde047',0); }
  else if(id==='fairy'){ c.fillStyle='rgba(224,231,255,.85)'; [-1,1].forEach(function(l){ c.beginPath(); c.ellipse(l*30,-2,12,7,l*.5,0,TAU); c.fill(); c.beginPath(); c.ellipse(l*28,14,9,5,-l*.4,0,TAU); c.fill(); }); A.estrela(c,0,-17,5,'#f0abfc',0); }
  else if(id==='dragon'){ c.fillStyle='#fbbf24'; for(var k=0;k<4;k++){ c.beginPath(); c.moveTo(-3,-20+k*12); c.lineTo(0,-27+k*12); c.lineTo(3,-20+k*12); c.closePath(); c.fill(); } c.fillStyle=esc(cor,.2); c.beginPath(); c.moveTo(-5,36); c.quadraticCurveTo(10,52,0,64); c.quadraticCurveTo(4,50,-5,36); c.fill(); }
  else if(id==='red'){ c.fillStyle='#7f1d1d'; c.beginPath(); c.moveTo(-12,6); c.quadraticCurveTo(-16,24,-10,34); c.lineTo(10,34); c.quadraticCurveTo(16,24,12,6); c.closePath(); c.fill(); c.fillStyle='#fbbf24'; rr(c,-3,-22,6,8,2); c.fill(); }
  else if(id==='lia'){ c.strokeStyle='#e5e7eb'; c.lineWidth=2.6; c.beginPath(); c.moveTo(0,-24); c.lineTo(0,-10); c.moveTo(-5,-14); c.lineTo(5,-14); c.stroke(); }
  else if(id==='theo'){ A.estrela(c,0,-17,6,'#fde047',0); }
  else if(id==='bia'){ c.fillStyle='#fbcfe8'; [-1,1].forEach(function(l){ c.beginPath(); c.ellipse(l*4,-17,5,3,l*.5,0,TAU); c.fill(); }); c.fillStyle='#ec4899'; A.circ(c,0,-17,2); c.fill(); }
  else if(id==='leo'){ c.fillStyle='#fff'; A.circ(c,0,-17,5.5); c.fill(); c.fillStyle='#111'; A.circ(c,0,-17,2); c.fill(); }
  c.restore();
}
function desenhaConde(c,C,x,y,t){
  var ang=C.giro>0?C.giro*TAU:(C.alvo-C.off)/110*.25;
  kart(c,x,y,{cor:'#27272a',ang:ang,esc:1.15,giroRodas:J.t*30,steer:cl((C.alvo-C.off)/80,-.4,.4),pisca:C.pisca>0?{lado:C.dirP,on:Math.floor(C.pisca*8)%2===0}:null,
    piloto:function(c2){ piloto(c2,'#1c1917','#1c1917','cape'); c2.save(); c2.translate(0,3); capacete(c2,'#000','tophat'); c2.restore(); }});
  /* frasco de tinta na traseira */
  c.save(); c.translate(x,y+40); c.fillStyle='#1e1b4b'; rr(c,-8,-4,16,14,4); c.fill(); c.fillStyle='#a78bfa'; rr(c,-4,-8,8,5,2); c.fill(); c.restore();
  c.font=F(900,13); var nm='Count Scribble', tw=c.measureText(nm).width+16; c.fillStyle='rgba(76,29,149,.9)'; rr(c,x-tw/2,y+50,tw,20,10); c.fill(); c.fillStyle='#fde68a'; c.textAlign='center'; c.textBaseline='middle'; c.fillText(nm,x,y+60.5);
}
function desenhaJogador(c,t){
  if(R.splash>0&&R.splash>.15) return;
  if(R.pisca>0&&Math.floor(t*14)%2===0) return;
  var kAr=R.ar>0?cl((R.dist-R.ar0)/Math.max(1,R.ar1-R.ar0),0,1):0, alt=R.ar>0?Math.sin(PI*kAr)*56:0;
  var m=R.monstro>0?Math.min(1,(8-R.monstro)/.3,R.monstro/.3):0, sc=1+.4*m;
  var cor=corHeroi();
  /* o SEU kart: aura dourada embaixo e seta "YOU" em cima (18/10: não se confunde com nenhum rival) */
  var au=c.createRadialGradient(R.x,CAR_Y,4,R.x,CAR_Y,40); au.addColorStop(0,'rgba(253,224,71,.55)'); au.addColorStop(1,'rgba(253,224,71,0)'); c.fillStyle=au; A.el(c,R.x,CAR_Y,34,42); c.fill();
  kart(c,R.x,CAR_Y,{cor:cor,ang:R.ang,esc:sc,mons:m,alt:alt,turbo:R.turbo>0,num:10,marca:J.prog.heroi||'lia',giroRodas:R.dist*.35,steer:cl(R.vx/VLAT*.45,-.45,.45),piloto:pilotoHeroi(cor)});
  var yb=CAR_Y-46-alt*.6+Math.sin(t*6)*3; c.fillStyle='#fde047'; c.strokeStyle='#78350f'; c.lineWidth=2; c.beginPath(); c.moveTo(R.x,yb+10); c.lineTo(R.x-8,yb); c.lineTo(R.x+8,yb); c.closePath(); c.fill(); c.stroke();
  c.font=F(900,12); var tw=36; c.fillStyle='rgba(234,179,8,.95)'; rr(c,R.x-tw/2,yb-17,tw,16,8); c.fill(); c.fillStyle='#1e1b3a'; c.textAlign='center'; c.textBaseline='middle'; c.fillText('YOU',R.x,yb-8.5);
  /* barra do monster truck */
  if(R.monstro>0){ var bw=70, k=R.monstro/8; c.fillStyle='rgba(13,11,30,.7)'; rr(c,R.x-bw/2-3,CAR_Y+52,bw+6,12,6); c.fill(); c.fillStyle=k<.25?'#f97316':'#fbbf24'; rr(c,R.x-bw/2,CAR_Y+54.5,bw*k,7,3.5); c.fill(); }
}
/* equipe do box (vista de cima) */
function mecanico(c,x,y,ang,cor,ferr,t,k){
  c.save(); c.translate(x,y); c.scale(1.35,1.35); c.rotate(ang);
  c.fillStyle='rgba(0,0,0,.25)'; A.el(c,3,5,12,8); c.fill();
  c.strokeStyle=cor; c.lineWidth=5; c.lineCap='round'; var bm=Math.sin(t*12+k)*2; c.beginPath(); c.moveTo(-9,0); c.lineTo(-6,-11+bm); c.moveTo(9,0); c.lineTo(6,-11-bm); c.stroke();
  if(ferr==='arma'){ c.fillStyle='#52525b'; rr(c,-4,-22,8,12,2); c.fill(); c.fillStyle='#fde047'; rr(c,-2,-26,4,5,1); c.fill(); }
  if(ferr==='pirulito'){ c.strokeStyle='#e5e7eb'; c.lineWidth=2.5; c.beginPath(); c.moveTo(6,-11); c.lineTo(6,-30); c.stroke(); c.fillStyle=R.fase==='saida'&&R.tSaida>1.1?'#22c55e':'#ef4444'; A.circ(c,6,-36,10); c.fill(); c.save(); c.translate(6,-36); c.rotate(-ang); c.fillStyle='#fff'; c.font=F(900,8); c.textAlign='center'; c.textBaseline='middle'; c.fillText(R.fase==='saida'&&R.tSaida>1.1?'GO':'STOP',0,0); c.restore(); }
  c.fillStyle=cor; A.el(c,0,0,11,7); c.fill(); c.strokeStyle='rgba(0,0,0,.25)'; c.lineWidth=1; c.stroke();
  c.fillStyle='#f5d0a9'; A.circ(c,-6,-11,2.6); c.fill(); A.circ(c,6,-11,2.6); c.fill();
  c.fillStyle='#1f2937'; A.circ(c,0,0,6.4); c.fill(); c.fillStyle=cor; A.circ(c,0,.6,5); c.fill(); c.fillStyle='#1f2937'; rr(c,-4,-7,8,3,1.5); c.fill();
  c.strokeStyle='#e5e7eb'; c.lineWidth=1.4; c.beginPath(); c.arc(0,0,6.6,PI*.1,PI*.9); c.stroke();
  c.restore();
}
function equipe(c,t){
  var cor=J.prog.cor||COR_HEROI[J.prog.heroi||'lia'];
  var postos=[[-50,-22,PI/2,'arma'],[50,-22,-PI/2,'arma'],[-52,24,PI/2,'arma'],[52,24,-PI/2,'arma'],[0,-104,PI,'pirulito'],[64,0,-PI/2,null]];
  PITS.forEach(function(tb,pi){
    var sb=S(tb), y0=yDe(sb); if(y0<-160||y0>H+160) return;
    var bx=boxX(pi), casaX=pista(sb).r+30, k=0, fase=R.fase;
    if(pi===R.pitAtual){
      if(fase==='box') k=suave(R.crewT/.8);
      else if(fase==='pit') k=1;
      else if(fase==='saida'||fase==='corre') k=R.tSaida<1.3?1:1-suave((R.tSaida-1.3)/.6);
    }
    postos.forEach(function(p,i){ var px=lerp(casaX,bx+p[0],k), ps=lerp(sb+60-i*26,sb-p[1],k), y=yDe(ps);
      var ac=k<.05?Math.sin(t*4+i)*.25:0; /* esperando: acenam */
      mecanico(c,px,y,k>.5?p[2]:-PI/2+ac,i===4?'#1f2937':cor,p[3],t,i); });
    if(k>.6){ /* mangueira de combustível do pátio até o kart */
      c.strokeStyle='#18181b'; c.lineWidth=5; c.beginPath(); c.moveTo(casaX+20,y0+14); c.quadraticCurveTo(bx+90,y0+40,bx+22,y0+4); c.stroke(); c.fillStyle='#ef4444'; rr(c,bx+16,y0-2,14,10,3); c.fill(); }
    /* água: a garrafinha sobe ao lado do piloto */
    if(pi===R.pitAtual&&fase==='saida'&&R.tSaida>.3&&R.tSaida<1.4){ var by=y0-50-Math.sin(R.tSaida*6)*3; c.fillStyle='#38bdf8'; rr(c,bx-34,by,12,22,4); c.fill(); c.fillStyle='#1d4ed8'; rr(c,bx-32,by-5,8,6,2); c.fill(); c.fillStyle='rgba(255,255,255,.6)'; rr(c,bx-31,by+4,3,12,1.5); c.fill(); }
  });
}
function textoGrande(c,txt,cor,k){
  c.save(); c.translate(W/2,H/2-60); var s=1.4-.4*suave(k); c.scale(s,s); c.globalAlpha=1-k*.6;
  c.font=F(900,96); c.textAlign='center'; c.textBaseline='middle'; c.lineWidth=10; c.strokeStyle='rgba(13,11,30,.8)'; c.strokeText(txt,0,0); c.fillStyle=cor; c.fillText(txt,0,0); c.restore();
}
function sombrasGotas(c,t){ R.gotas.forEach(function(g){ var k=g.t/g.dur, Pa=pista(g.sa), y=yDe(g.sa); c.fillStyle='rgba(30,27,75,'+(.2+.35*k)+')'; A.el(c,g.xa,y,10+20*k,6+12*k); c.fill(); c.strokeStyle='rgba(239,68,68,'+(.4+.5*Math.abs(Math.sin(t*14)))+')'; c.lineWidth=2.5; A.el(c,g.xa,y,32,20); c.stroke(); }); }
function gotasNoAr(c,t){ R.gotas.forEach(function(g){ var k=g.t/g.dur, s=lerp(g.s0,g.sa,k), x=lerp(g.x0,g.xa,k), y=yDe(s)-Math.sin(PI*k)*120*(1-k*.3), r=8+6*k;
  c.fillStyle='#312e81'; c.beginPath(); c.moveTo(x,y-r*1.5); c.quadraticCurveTo(x+r,y,x,y+r); c.quadraticCurveTo(x-r,y,x,y-r*1.5); c.fill(); c.fillStyle='rgba(196,181,253,.7)'; A.circ(c,x-r*.3,y-r*.1,r*.25); c.fill(); }); }
function desenhaParticulas(c,t){
  R.pt.forEach(function(p){ var y=yDe(p.s), k=p.vida/p.max; c.save(); c.globalAlpha=Math.min(1,k*1.6);
    switch(p.tipo){
      case 'po': c.fillStyle=p.cor||'#e7e5e4'; A.circ(c,p.x,y,p.r*(1.6-k*.6)); c.fill(); break;
      case 'grama': c.fillStyle=p.cor; c.fillRect(p.x,y,3,5); break;
      case 'fogo': c.fillStyle=k>.5?'#fde047':'#f97316'; A.circ(c,p.x,y,p.r*k); c.fill(); break;
      case 'agua': c.fillStyle='#e0f2fe'; A.circ(c,p.x,y,p.r); c.fill(); break;
      case 'tinta': c.fillStyle='#312e81'; A.circ(c,p.x,y,p.r); c.fill(); break;
      case 'estrela': A.estrela(c,p.x,y,p.r,p.cor,p.rot); break;
      case 'faisca': c.strokeStyle=p.cor; c.lineWidth=2; c.lineCap='round'; c.beginPath(); c.moveTo(p.x,y); c.lineTo(p.x-p.vx*.04,y+p.vs*.04); c.stroke(); break;
      case 'detrito': c.translate(p.x,y); c.rotate(p.rot); c.fillStyle=p.cor; c.fillRect(-p.r/2,-p.r/2,p.r,p.r*.7); break;
      case 'confete': c.translate(p.x,y); c.rotate(p.rot); c.fillStyle=p.cor; c.fillRect(-4,-2,8,4); break;
      case 'texto': c.font=F(900,p.r); c.textAlign='center'; c.textBaseline='middle'; c.lineWidth=5; c.strokeStyle='rgba(13,11,30,.75)'; c.strokeText(p.txt,p.x,y); c.fillStyle=p.cor; c.fillText(p.txt,p.x,y); break;
    }
    c.restore(); });
}

/* ---------- HUD da corrida ---------- */
function hud(c,t){
  /* posição */
  var px=W-158, py=62, pul=R.posPulse>0?1+.15*Math.sin(R.posPulse*20):1;
  c.fillStyle='rgba(13,11,30,.72)'; rr(c,px,py,144,66,16); c.fill(); c.strokeStyle='rgba(253,224,71,.6)'; c.lineWidth=2; rr(c,px,py,144,66,16); c.stroke();
  c.fillStyle='#fde68a'; c.font=F(900,12); c.textAlign='left'; c.textBaseline='top'; c.fillText('POSITION',px+14,py+8);
  c.save(); c.translate(px+12,py+20); c.scale(pul,pul); c.fillStyle='#fff'; c.font=F(900,44); c.fillText(ord(R.pos),0,0); c.restore();
  c.fillStyle='rgba(255,255,255,.6)'; c.font=F(900,16); c.textAlign='right'; c.fillText('/ '+N_CORREDORES,px+132,py+40);
  if(J.tr){ c.fillStyle='#fde68a'; c.font=F(700,11); c.textAlign='left'; c.fillText('Posição',px+84,py+8); }
  /* turbos ganhos nas respostas certas (cada um passa UM carro) */
  var ly=py+74; c.fillStyle='rgba(13,11,30,.6)'; rr(c,px,ly,144,34,14); c.fill(); c.fillStyle='#bfdbfe'; c.font=F(900,11); c.textAlign='left'; c.textBaseline='middle'; c.fillText('TURBO',px+10,ly+17);
  for(var k=0;k<Math.max(3,Math.min(9,R.latas));k++){ var on=k<R.latas, kx=px+60+(k%5)*17, ky=ly+(R.latas>5?(k<5?10:24):17); c.save(); c.translate(kx,ky); c.globalAlpha=on?1:.22; c.scale(R.latas>5?.5:.68,R.latas>5?.5:.68); c.fillStyle='#fde047'; c.strokeStyle='#92400e'; c.lineWidth=3; c.beginPath(); c.moveTo(4,-16); c.lineTo(-12,4); c.lineTo(0,4); c.lineTo(-4,18); c.lineTo(13,-4); c.lineTo(1,-4); c.closePath(); c.fill(); c.stroke(); c.restore(); }
  /* combustível */
  var fy=ly+42, baixo=R.comb<.3&&R.fase==='corre', pisca=baixo&&Math.floor(t*4)%2===0;
  c.fillStyle=pisca?'rgba(185,28,28,.85)':'rgba(13,11,30,.6)'; rr(c,px,fy,144,34,14); c.fill();
  c.fillStyle='#fecaca'; c.font=F(900,11); c.textAlign='left'; c.fillText('FUEL',px+10,fy+17);
  c.fillStyle='rgba(255,255,255,.2)'; rr(c,px+50,fy+11,84,12,6); c.fill(); c.fillStyle=R.comb<.3?'#ef4444':(R.comb<.6?'#f59e0b':'#22c55e'); rr(c,px+50,fy+11,84*R.comb,12,6); c.fill();
  /* barra do percurso (pits e chegada) */
  var bx=24, by0=410, by1=232, tot=S(T_FIM);
  c.fillStyle='rgba(13,11,30,.55)'; rr(c,bx-9,by1-14,18,by0-by1+28,9); c.fill();
  c.fillStyle='rgba(255,255,255,.25)'; c.fillRect(bx-2,by1,4,by0-by1);
  PITS.forEach(function(tb,i){ var yy=lerp(by0,by1,S(tb)/tot); c.fillStyle=R.pitFeito[i]?'#22c55e':'#fde047'; A.circ(c,bx,yy,6); c.fill(); c.fillStyle='#1c1917'; c.font=F(900,8); c.textAlign='center'; c.textBaseline='middle'; c.fillText('P',bx,yy+.5); });
  for(var q=0;q<4;q++) for(var w=0;w<2;w++){ c.fillStyle=(q+w)%2?'#111':'#fff'; c.fillRect(bx-6+w*6,by1-12+q*3,6,3); }
  var ey=lerp(by0,by1,Math.min(1,R.dist/tot)); c.fillStyle=J.prog.cor||COR_HEROI[J.prog.heroi||'lia']; A.circ(c,bx,ey,7); c.fill(); c.strokeStyle='#fff'; c.lineWidth=2; A.circ(c,bx,ey,7); c.stroke();
  /* aviso do pit */
  var pi=proxPit(); if(pi>=0&&R.fase==='corre'){ var dd=S(PITS[pi])-R.dist; if(dd<S(6.2)&&dd>0){ var a=.7+.3*Math.sin(t*9); c.save(); c.globalAlpha=a; c.fillStyle='#fde047'; rr(c,W/2-150,H-58,300,40,20); c.fill(); c.fillStyle='#1c1917'; c.font=F(900,20); c.textAlign='center'; c.textBaseline='middle'; c.fillText('PIT STOP ▶  '+Math.max(1,Math.ceil(dd/V0))+' s',W/2,H-38); c.restore(); } }
  /* o locutor narra na pista */
  var f=R.fala; if(f&&f.t<3.4&&R.fase!=='podio'&&R.fase!=='pit'){ var al=Math.min(1,f.t*6,(3.4-f.t)*3);
    c.save(); c.globalAlpha=al; c.save(); c.translate(64,214); c.scale(.82,.82); A.morador(c,'announcer',0,0,t,1,f.t<2); c.restore();
    c.font=F(900,19); var l1=quebra(c,f.en,520); c.font=F(700,13); var l2=J.tr&&f.pt?quebra(c,f.pt,520):[];
    var bw=0; c.font=F(900,19); l1.forEach(function(l){ bw=Math.max(bw,c.measureText(l).width); }); c.font=F(700,13); l2.forEach(function(l){ bw=Math.max(bw,c.measureText(l).width); }); bw+=32;
    var bh=16+l1.length*24+(l2.length?l2.length*17+4:0), bxx=112, byy=66;
    c.fillStyle='#fff'; rr(c,bxx,byy,bw,bh,16); c.fill(); c.beginPath(); c.moveTo(bxx+18,byy+bh-2); c.lineTo(bxx+2,byy+bh+16); c.lineTo(bxx+34,byy+bh-2); c.closePath(); c.fill();
    c.fillStyle='#1e1b3a'; c.textAlign='left'; c.textBaseline='top'; c.font=F(900,19); l1.forEach(function(l,k){ c.fillText(l,bxx+16,byy+9+k*24); });
    if(l2.length){ c.fillStyle='#6b5d4f'; c.font=F(700,13); l2.forEach(function(l,k){ c.fillText(l,bxx+16,byy+12+l1.length*24+k*17); }); }
    c.restore(); }
  /* linhas de velocidade no turbo */
  if(R.turbo>0){ c.strokeStyle='rgba(255,255,255,.5)'; c.lineWidth=3; for(var s2=0;s2<12;s2++){ var hx=hash(s2+Math.floor(t*12)), lx=s2%2?hx*130:W-hx*130, ly2=(t*900+s2*97)%H; c.beginPath(); c.moveTo(lx,ly2); c.lineTo(lx,ly2+60); c.stroke(); } } /* só nas laterais: nada de "chuva" na pista */
  else if(R.fase==='corre'&&R.v>40){ c.strokeStyle='rgba(255,255,255,'+(.12*R.v/V0)+')'; c.lineWidth=2; for(var s3=0;s3<6;s3++){ var lx3=s3%2?20+hash(s3)*60:W-20-hash(s3)*60, ly3=(t*R.v*1.6+s3*130)%H; c.beginPath(); c.moveTo(lx3,ly3); c.lineTo(lx3,ly3+34); c.stroke(); } }
  /* aviso grande no meio: subiu/caiu de posição, ganhou turbo */
  if(R.anunc){ var ka=R.anunc.t, sc=1+.4*Math.max(0,1-ka/.25); c.save(); c.globalAlpha=Math.min(1,(1.3-ka)*3); c.translate(W/2,170); c.scale(sc,sc); c.font=F(900,46); c.textAlign='center'; c.textBaseline='middle'; c.lineWidth=9; c.strokeStyle='rgba(13,11,30,.85)'; c.strokeText(R.anunc.txt,0,0); c.fillStyle=R.anunc.cor; c.fillText(R.anunc.txt,0,0); if(J.tr&&R.anunc.pt){ c.font=F(700,16); c.lineWidth=5; c.strokeText(R.anunc.pt,0,34); c.fillStyle='#fde68a'; c.fillText(R.anunc.pt,0,34); } c.restore(); }
}
function quebra(c,txt,larg){ var pal=String(txt).split(' '), linhas=[], cur=''; pal.forEach(function(w){ var tt=cur?cur+' '+w:w; if(c.measureText(tt).width>larg&&cur){ linhas.push(cur); cur=w; } else cur=tt; }); if(cur) linhas.push(cur); return linhas; }
function largada(c,t){
  var n=Math.floor(R.t/.8), txt=n<3?String(3-n):'GO!', k=(R.t%.8)/.8;
  c.save(); c.translate(W/2,H/2-60); var s=1.4-.4*suave(k); c.scale(s,s); c.globalAlpha=1-k*.3;
  c.font=F(900,96); c.textAlign='center'; c.textBaseline='middle'; c.lineWidth=10; c.strokeStyle='rgba(13,11,30,.8)'; c.strokeText(txt,0,0); c.fillStyle=n<3?'#fde047':'#4ade80'; c.fillText(txt,0,0);
  c.restore();
  c.fillStyle='rgba(13,11,30,.7)'; rr(c,W/2-210,H-62,420,42,21); c.fill(); c.fillStyle='#fde68a'; c.font=F(900,18); c.textAlign='center'; c.textBaseline='middle'; c.fillText('Hold ◀ ▶ to steer  ·  ▲ = TURBO',W/2,H-41);
}

/* ---------- moldura do pit stop (por cima do ambiente de questões) ---------- */
function molduraPit(c,t){
  var q=J.quiz; if(!q) return; var ent=q.fase==='entra'?Math.min(1,q.t/.7):(q.fase==='pagina'?Math.max(0,1-q.t/1.2):1);
  c.save(); c.globalAlpha=ent;
  for(var x=12;x<W;x+=34){ pneu(c,x,H-12,12,x*3); }
  for(var y=70;y<H-30;y+=34){ pneu(c,12,y,11,y*5); pneu(c,W-12,y,11,y*7); }
  for(var k=0;k<W/12;k++){ c.fillStyle=k%2?'#111827':'#f8fafc'; c.fillRect(k*12,0,12,6); c.fillStyle=k%2?'#f8fafc':'#111827'; c.fillRect(k*12,6,12,6); }
  /* tarefas: pneus · combustível · água */
  var cx0=262, cy=92;
  c.fillStyle='rgba(13,11,30,.7)'; rr(c,cx0-40,cy-34,232,70,20); c.fill();
  TAREFAS.forEach(function(tf,i){ var x2=cx0+i*76, feito=i<R.pitRes.length, atual=i===q.i&&!feito, an=R.pitAnim&&R.pitAnim.k===i?(J.t-R.pitAnim.t0):9;
    c.save(); c.translate(x2,cy-4);
    if(an<1.2){ if(R.pitAnim.ok) c.rotate(Math.sin(an*18)*.18*(1-an/1.2)); else c.translate(Math.sin(an*30)*5*(1-an/1.2),0); var sc=1+.25*Math.max(0,1-an/0.5); c.scale(sc,sc); }
    var pul=atual?1+.06*Math.sin(t*6):1; c.scale(pul,pul);
    c.fillStyle=feito?(R.pitRes[i]?'#dcfce7':'#ffedd5'):(atual?'#fffbeb':'rgba(255,255,255,.35)'); A.circ(c,0,0,24); c.fill();
    c.strokeStyle=feito?(R.pitRes[i]?'#16a34a':'#f97316'):(atual?'#f59e0b':'rgba(255,255,255,.4)'); c.lineWidth=3.5; A.circ(c,0,0,24); c.stroke();
    iconeTarefa(c,tf.k,t,an,feito&&R.pitRes[i]);
    if(feito){ c.fillStyle=R.pitRes[i]?'#16a34a':'#f97316'; A.circ(c,17,-17,9); c.fill(); c.strokeStyle='#fff'; c.lineWidth=2.6; c.beginPath(); if(R.pitRes[i]){ c.moveTo(12,-17); c.lineTo(16,-13); c.lineTo(22,-21); } else { c.moveTo(14,-20); c.lineTo(20,-14); c.moveTo(20,-20); c.lineTo(14,-14); } c.stroke(); }
    c.restore();
    c.fillStyle=atual?'#fde68a':'rgba(255,255,255,.8)'; c.font=F(900,12); c.textAlign='center'; c.textBaseline='top'; c.fillText(tf.en,x2,cy+22);
    if(an<1.2){ c.save(); c.globalAlpha=ent*(1-an/1.2); c.font=F(900,16); c.lineWidth=4; c.strokeStyle='rgba(13,11,30,.8)'; var tx=R.pitAnim.ok?['Brrrt!','Glug glug!','Ahh!'][i]:'Oops!'; c.strokeText(tx,x2,cy-50-an*20); c.fillStyle=R.pitAnim.ok?'#bbf7d0':'#fed7aa'; c.fillText(tx,x2,cy-50-an*20); c.restore(); }
  });
  c.restore();
}
function iconeTarefa(c,k,t,an,ok){
  if(k==='tires'){ var rot=an<1.2?an*(ok?14:6):0, dx=(!ok&&an<1.2)?an*10:0; c.save(); c.translate(dx,0); c.rotate(rot); c.fillStyle='#18181b'; A.circ(c,0,0,15); c.fill(); c.strokeStyle='#3f3f46'; c.lineWidth=2; for(var j=0;j<10;j++){ var a=j/10*TAU; c.beginPath(); c.moveTo(Math.cos(a)*11,Math.sin(a)*11); c.lineTo(Math.cos(a)*15,Math.sin(a)*15); c.stroke(); } c.fillStyle='#d4d4d8'; A.circ(c,0,0,7); c.fill(); c.fillStyle='#71717a'; A.circ(c,0,0,2.6); c.fill(); c.restore(); }
  else if(k==='fuel'){ c.fillStyle='#dc2626'; rr(c,-11,-12,20,25,4); c.fill(); c.fillStyle='#fecaca'; rr(c,-7,-8,12,7,2); c.fill(); var nv=ok&&an<1.2?Math.min(1,an/.8):1; c.fillStyle='#fde047'; c.fillRect(-7,4-8*nv+6,12,8*nv*.75); c.strokeStyle='#18181b'; c.lineWidth=3; c.beginPath(); c.moveTo(9,-6); c.quadraticCurveTo(16,-6,15,6); c.stroke(); c.fillStyle='#18181b'; rr(c,12,4,6,8,2); c.fill(); }
  else { c.fillStyle='#38bdf8'; rr(c,-7,-9,14,22,5); c.fill(); c.fillStyle='#1d4ed8'; rr(c,-4,-15,8,7,2); c.fill(); c.fillStyle='rgba(255,255,255,.65)'; rr(c,-4,-5,3,14,1.5); c.fill(); c.fillStyle='#e0f2fe'; c.beginPath(); c.moveTo(-7,2); c.quadraticCurveTo(0,6,7,2); c.lineTo(7,9); c.lineTo(-7,9); c.fill(); }
}

/* ============================================================
   APRESENTAÇÃO DOS PILOTOS (Paulo: "só colocar o nome a imersão é
   zero"): todos em pé, de macacão de corrida, capacete na mão, na
   ordem do grid; o herói por último, com holofote. Botão "Race! ▶".
   ============================================================ */
var ROSTO={
  dragon:{pele:'#dc2626',tipo:'dragao'}, princess:{pele:'#f6cfae',cab:'#facc15',tipo:'humano',chapeu:'coroa',longo:true},
  knight:{pele:'#e8b48f',tipo:'humano',chapeu:'elmo',cab:'#78350f'}, witch:{pele:'#bef264',cab:'#1c1917',tipo:'humano',chapeu:'bruxa',longo:true},
  wolf:{pele:'#78716c',tipo:'lobo'}, fairy:{pele:'#fde2e4',cab:'#f0abfc',tipo:'humano',asas:true,chapeu:'estrela'},
  frog:{pele:'#4ade80',tipo:'sapo',chapeu:'coroa'}, red:{pele:'#f1c6a0',cab:'#7c2d12',tipo:'humano',chapeu:'capuz'}, pig:{pele:'#f9a8d4',tipo:'porco'}};
var CAB_HEROI={lia:{pele:'#fcdcc4',cab:'#8d5530',longo:true},theo:{pele:'#b97a4e',cab:'#2c1a10'},bia:{pele:'#d9a072',cab:'#3d2416',coque:true},leo:{pele:'#c68b59',cab:'#2a160b',cacho:true}};
function pilotoEmPe(c,x,y,o,t,s){
  c.save(); c.translate(x,y); c.scale(s,s);
  var suit=o.suit, sd=esc(suit,.3), b=Math.sin(t*2+o.k)*1.5;
  c.fillStyle='rgba(0,0,0,.28)'; A.el(c,0,2,30,6); c.fill();
  if(o.r.asas){ c.fillStyle='rgba(224,231,255,.8)'; [-1,1].forEach(function(l){ c.beginPath(); c.ellipse(l*26,-88,20,11,l*.6,0,TAU); c.fill(); c.beginPath(); c.ellipse(l*22,-66,13,7,-l*.5,0,TAU); c.fill(); }); }
  /* pernas e botas */
  c.fillStyle=sd; rr(c,-15,-50,13,48,5); c.fill(); c.fillStyle=suit; rr(c,2,-50,13,48,5); c.fill();
  c.fillStyle='#111827'; rr(c,-17,-8,16,9,4); c.fill(); rr(c,1,-8,16,9,4); c.fill();
  /* tronco do macacão: listras, zíper, cinto, número */
  c.fillStyle=A.lin(c,-20,0,20,0,suit,sd); rr(c,-20,-100+b*.3,40,56,12); c.fill();
  c.fillStyle='rgba(255,255,255,.9)'; c.fillRect(-20,-74+b*.3,40,5); c.fillStyle=o.faixa||'#fde047'; c.fillRect(-20,-69+b*.3,40,3);
  c.strokeStyle='rgba(0,0,0,.35)'; c.lineWidth=1.5; c.beginPath(); c.moveTo(0,-98+b*.3); c.lineTo(0,-50); c.stroke();
  c.fillStyle='#1f2937'; c.fillRect(-20,-54,40,6); c.fillStyle='#d4d4d8'; rr(c,-5,-55,10,8,2); c.fill();
  c.fillStyle='#fff'; A.circ(c,-10,-86+b*.3,7); c.fill(); c.fillStyle='#111827'; c.font=F(900,9); c.textAlign='center'; c.textBaseline='middle'; c.fillText(String(o.num),-10,-85.5+b*.3);
  /* braço com o capacete debaixo do braço (direita) e luva acenando (esquerda) */
  c.fillStyle=suit; rr(c,15,-96+b*.3,10,34,5); c.fill(); c.fillStyle='#111827'; A.circ(c,22,-60+b*.3,6); c.fill();
  var cap=o.cap||suit; c.fillStyle=A.lin(c,10,-80,40,-50,cla(cap,.3),esc(cap,.2)); A.circ(c,30,-64+b*.3,14); c.fill(); c.fillStyle='#0f172a'; c.beginPath(); c.arc(30,-64+b*.3,14,-.5,.9); c.lineTo(30,-64+b*.3); c.fill(); c.fillStyle='rgba(147,197,253,.6)'; c.beginPath(); c.arc(30,-64+b*.3,11,-.3,.5); c.lineTo(30,-64+b*.3); c.fill();
  var aceno=Math.sin(t*5+o.k)*.35; c.save(); c.translate(-18,-94+b*.3); c.rotate(-2.5+aceno*(o.eu?1:.3)); c.fillStyle=suit; rr(c,-5,0,10,32,5); c.fill(); c.fillStyle='#111827'; A.circ(c,0,34,6); c.fill(); c.restore();
  /* cabeça */
  c.save(); c.translate(0,-118+b*.3); cabecaPiloto(c,o.r,t,o.k); c.restore();
  c.restore();
}
function cabecaPiloto(c,r,t,k){
  var pele=r.pele;
  if(r.tipo==='humano'){
    if(r.longo){ c.fillStyle=r.cab; rr(c,-18,-8,36,34,12); c.fill(); }
    if(r.chapeu==='capuz'){ c.fillStyle='#b91c1c'; c.beginPath(); c.arc(0,0,23,PI*.95,TAU*1.02); c.lineTo(22,24); c.lineTo(-22,24); c.closePath(); c.fill(); }
    c.fillStyle=pele; A.circ(c,0,0,17); c.fill();
    if(r.cab&&r.chapeu!=='elmo'){ c.fillStyle=r.cab; c.beginPath(); c.arc(0,-2,17.5,PI*1.05,TAU*.97); c.quadraticCurveTo(4,-8,-10,-6); c.closePath(); c.fill(); }
    if(r.coque){ c.fillStyle=r.cab; A.circ(c,0,-19,8); c.fill(); }
    if(r.cacho){ c.fillStyle=r.cab; for(var q=0;q<7;q++){ A.circ(c,-14+q*4.6,-13-Math.abs(q-3)*.6,5.4); c.fill(); } }
    c.fillStyle='#1f2937'; A.circ(c,-6,1,2.4); c.fill(); A.circ(c,6,1,2.4); c.fill(); c.fillStyle='#fff'; A.circ(c,-5.3,.3,.8); c.fill(); A.circ(c,6.7,.3,.8); c.fill();
    c.fillStyle='rgba(244,114,182,.45)'; A.circ(c,-10,7,3.4); c.fill(); A.circ(c,10,7,3.4); c.fill();
    c.strokeStyle='#7c2d12'; c.lineWidth=2; c.beginPath(); c.arc(0,6,5,.2*PI,.8*PI); c.stroke();
    if(r.chapeu==='coroa'){ c.fillStyle='#fbbf24'; c.beginPath(); c.moveTo(-11,-14); c.lineTo(-11,-26); c.lineTo(-5,-19); c.lineTo(0,-28); c.lineTo(5,-19); c.lineTo(11,-26); c.lineTo(11,-14); c.closePath(); c.fill(); c.fillStyle='#ef4444'; A.circ(c,0,-18,2); c.fill(); }
    if(r.chapeu==='bruxa'){ c.fillStyle='#1c1917'; A.el(c,0,-14,26,5); c.fill(); c.beginPath(); c.moveTo(-13,-15); c.lineTo(6,-48); c.lineTo(13,-15); c.closePath(); c.fill(); c.fillStyle='#a855f7'; c.fillRect(-12,-19,25,4); }
    if(r.chapeu==='elmo'){ c.fillStyle=A.lin(c,-18,-20,18,10,'#e2e8f0','#64748b'); c.beginPath(); c.arc(0,-2,19,PI,TAU); c.lineTo(19,6); c.lineTo(-19,6); c.closePath(); c.fill(); c.fillStyle='#334155'; c.fillRect(-14,-4,28,4); c.fillStyle='#dc2626'; c.beginPath(); c.moveTo(0,-20); c.quadraticCurveTo(14,-34,22,-22); c.quadraticCurveTo(10,-26,0,-20); c.fill(); }
    if(r.chapeu==='estrela'){ A.estrela(c,0,-22,7,'#fde047',Math.sin(t*3)*.3); }
    return; }
  if(r.tipo==='sapo'){ c.fillStyle=pele; A.el(c,0,2,21,15); c.fill(); [-9,9].forEach(function(ex){ c.fillStyle=pele; A.circ(c,ex,-11,8); c.fill(); c.fillStyle='#fff'; A.circ(c,ex,-12,5); c.fill(); c.fillStyle='#111'; A.circ(c,ex,-12,2.4); c.fill(); }); c.strokeStyle='#14532d'; c.lineWidth=2; c.beginPath(); c.arc(0,4,10,.15*PI,.85*PI); c.stroke(); c.fillStyle='#fbbf24'; c.beginPath(); c.moveTo(-7,-17); c.lineTo(-7,-25); c.lineTo(-3,-20); c.lineTo(0,-27); c.lineTo(3,-20); c.lineTo(7,-25); c.lineTo(7,-17); c.closePath(); c.fill(); return; }
  if(r.tipo==='lobo'||r.tipo==='porco'||r.tipo==='dragao'){
    var lobo=r.tipo==='lobo', porco=r.tipo==='porco';
    c.fillStyle=pele; [-1,1].forEach(function(l){ c.beginPath(); if(r.tipo==='dragao'){ c.moveTo(l*8,-12); c.lineTo(l*14,-30); c.lineTo(l*15,-10); } else { c.moveTo(l*6,-12); c.lineTo(l*16,-26); c.lineTo(l*17,-6); } c.closePath(); c.fill(); });
    if(r.tipo==='dragao'){ c.fillStyle='#fbbf24'; [-1,1].forEach(function(l){ c.beginPath(); c.moveTo(l*8,-13); c.lineTo(l*13,-28); c.lineTo(l*12,-12); c.closePath(); c.fill(); }); }
    c.fillStyle=pele; A.circ(c,0,0,17); c.fill();
    c.fillStyle=lobo?'#d6d3d1':(porco?'#fbcfe8':'#fca5a5'); A.el(c,0,8,lobo?10:9,lobo?8:7); c.fill();
    c.fillStyle=porco?'#9d174d':'#111'; if(porco){ A.circ(c,-2.5,8,1.6); c.fill(); A.circ(c,2.5,8,1.6); c.fill(); } else { A.el(c,0,4,3.4,2.4); c.fill(); }
    c.fillStyle='#fff'; A.circ(c,-6.5,-4,4); c.fill(); A.circ(c,6.5,-4,4); c.fill(); c.fillStyle=r.tipo==='dragao'?'#ca8a04':'#111'; A.circ(c,-6,-4,2.2); c.fill(); A.circ(c,7,-4,2.2); c.fill();
    if(r.tipo==='dragao'){ var f=Math.sin(t*4+k); if(f>.6){ c.fillStyle='rgba(148,163,184,.6)'; A.circ(c,14,4,3+f*3); c.fill(); } }
    return; }
}
function apresentacao(c,t){
  /* fundo: o box dos pilotos, de dia, com bandeirolas */
  var g=c.createLinearGradient(0,0,0,H); g.addColorStop(0,'#7dd3fc'); g.addColorStop(.55,'#bae6fd'); g.addColorStop(.56,'#52525b'); g.addColorStop(1,'#3f3f46'); c.fillStyle=g; c.fillRect(0,0,W,H);
  for(var a=0;a<12;a++){ c.fillStyle=a%2?'#e5e7eb':'#cbd5e1'; c.fillRect(a*80,150,80,150); c.fillStyle='rgba(0,0,0,.3)'; c.fillRect(a*80+6,170,68,122); c.fillStyle=['#ef4444','#3b82f6','#16a34a','#f59e0b','#8b5cf6','#0ea5e9'][a%6]; c.fillRect(a*80+6,158,68,8); }
  c.strokeStyle='rgba(0,0,0,.35)'; c.lineWidth=2; c.beginPath(); c.moveTo(0,118); for(var x=0;x<=W;x+=60) c.quadraticCurveTo(x+30,138,x+60,118); c.stroke();
  for(var b2=0;b2<16;b2++){ c.fillStyle=['#ef4444','#fde047','#3b82f6','#22c55e'][b2%4]; c.beginPath(); c.moveTo(b2*60+8,121); c.lineTo(b2*60+30,121+12); c.lineTo(b2*60+52,121); c.closePath(); c.fill(); }
  for(var q=0;q<W/20;q++){ c.fillStyle=q%2?'#111827':'#f8fafc'; c.fillRect(q*20,300,20,10); c.fillStyle=q%2?'#f8fafc':'#111827'; c.fillRect(q*20,310,20,10); }
  c.save(); c.textAlign='center'; c.textBaseline='middle'; c.font=F(900,30); c.lineWidth=7; c.strokeStyle='rgba(13,11,30,.85)'; c.strokeText('REAL OR MAKE-BELIEVE RALLY',W/2,46); c.fillStyle='#fde047'; c.fillText('REAL OR MAKE-BELIEVE RALLY',W/2,46);
  c.font=F(900,17); c.lineWidth=5; c.strokeText('Meet the racers!',W/2,80); c.fillStyle='#fff'; c.fillText('Meet the racers!',W/2,80); if(J.tr){ c.font=F(700,13); c.fillStyle='#fde68a'; c.fillText('Conheça os pilotos!',W/2,100); } c.restore();
  /* os 10 pilotos, na ordem do grid (1º à esquerda); o herói é o 10º */
  var quem=J.prog.heroi||'lia', corH=J.prog.cor||COR_HEROI[quem];
  var lista=RIVAIS_DEF.map(function(d,i){ var cr=(R.rivais[i]&&R.rivais[i].cor)||d.cor; return {r:ROSTO[d.id],suit:cr,cap:cr,faixa:CAMISA[d.id],num:i+1,nome:d.nome,k:i}; });
  var ch=CAB_HEROI[quem]||CAB_HEROI.lia; lista.push({r:{tipo:'humano',pele:ch.pele,cab:ch.cab,longo:ch.longo,coque:ch.coque,cacho:ch.cacho},suit:corH,cap:corH,faixa:'#fff',num:10,nome:'YOU',k:9,eu:true});
  lista.forEach(function(o,i){
    var ap=cl((R.t-i*.14)/.35,0,1); if(ap<=0) return; var x=60+i*93, y=438+(1-suave(ap))*80;
    if(o.eu){ var lz=c.createRadialGradient(x,360,10,x,360,120); lz.addColorStop(0,'rgba(253,224,71,.5)'); lz.addColorStop(1,'rgba(253,224,71,0)'); c.fillStyle=lz; c.fillRect(x-120,220,240,280); }
    c.save(); c.globalAlpha=ap; pilotoEmPe(c,x,y-60,o,t,o.eu?1.12:.98);
    c.font=F(900,o.eu?14:11); var tw=c.measureText(o.nome).width+12; c.fillStyle=o.eu?'#fde047':'rgba(13,11,30,.78)'; rr(c,x-tw/2,y-46,tw,19,9); c.fill(); c.fillStyle=o.eu?'#1e1b3a':'#fff'; c.textAlign='center'; c.textBaseline='middle'; c.fillText(o.nome,x,y-36);
    c.fillStyle='rgba(255,255,255,.85)'; c.font=F(900,12); c.fillText(ord(o.num),x,y-16);
    c.restore(); });
  /* o locutor fala; botão para largar */
  var f=R.fala; if(f){ c.save(); c.translate(70,214); c.scale(.7,.7); A.morador(c,'announcer',0,0,t,1,f.t<3); c.restore();
    c.font=F(900,16); var l1=quebra(c,f.en,560); c.font=F(700,12); var l2=J.tr&&f.pt?quebra(c,f.pt,560):[]; var bw=0; c.font=F(900,16); l1.forEach(function(l){ bw=Math.max(bw,c.measureText(l).width); }); bw+=28; var bh=12+l1.length*20+(l2.length?l2.length*15+4:0);
    c.fillStyle='#fff'; rr(c,118,128,bw,bh,14); c.fill(); c.fillStyle='#1e1b3a'; c.textAlign='left'; c.textBaseline='top'; l1.forEach(function(l,k){ c.fillText(l,132,135+k*20); }); if(l2.length){ c.font=F(700,12); c.fillStyle='#6b5d4f'; l2.forEach(function(l,k){ c.fillText(l,132,138+l1.length*20+k*15); }); } }
  if(R.t>.8){ var a2=.85+.15*Math.sin(t*5); c.save(); c.globalAlpha=a2; c.fillStyle='#fde047'; rr(c,W-240,H-66,220,56,28); c.fill(); c.strokeStyle='#b45309'; c.lineWidth=3; rr(c,W-240,H-66,220,56,28); c.stroke(); c.fillStyle='#1e1b3a'; c.font=F(900,26); c.textAlign='center'; c.textBaseline='middle'; c.fillText('Race! ▶',W-130,H-38); c.restore(); }
}

/* ---------- pódio ---------- */
function podio(c,t){
  var P=R.podio; if(!P) return; var k=Math.min(1,R.t/.6);
  c.save(); c.globalAlpha=k; c.fillStyle='rgba(13,11,30,.62)'; c.fillRect(0,0,W,H);
  var luz=c.createRadialGradient(W/2,250,20,W/2,250,380); luz.addColorStop(0,'rgba(253,230,138,.35)'); luz.addColorStop(1,'rgba(253,230,138,0)'); c.fillStyle=luz; c.fillRect(0,0,W,H);
  var pos=P.pos, nomes=['Gold medal!','Silver medal!','Bronze medal!'], nomes_pt=['Medalha de ouro!','Medalha de prata!','Medalha de bronze!'];
  var titulo=pos===1?'You WIN! 1st place!':'You finished '+ord(pos)+'!', med=pos<=3?nomes[pos-1]:'Finisher medal!', med_pt=pos<=3?nomes_pt[pos-1]:'Medalha de chegada!';
  c.textAlign='center'; c.textBaseline='middle'; c.font=F(900,40); c.lineWidth=8; c.strokeStyle='rgba(13,11,30,.85)'; c.strokeText(titulo,W/2,84); c.fillStyle='#fde047'; c.fillText(titulo,W/2,84);
  if(J.tr){ c.font=F(700,15); c.fillStyle='#fde68a'; c.fillText(pos===1?'Você VENCEU! 1º lugar!':'Você chegou em '+pos+'º lugar!',W/2,112); }
  /* medalha */
  var mc=pos===1?['#fef08a','#ca8a04']:(pos===2?['#f1f5f9','#94a3b8']:(pos===3?['#fed7aa','#c2410c']:['#bfdbfe','#2563eb']));
  c.save(); c.translate(W/2,158+Math.sin(t*2)*3); c.scale(.8,.8);
  c.fillStyle='#dc2626'; c.beginPath(); c.moveTo(-30,-72); c.lineTo(-8,-20); c.lineTo(4,-26); c.lineTo(-14,-72); c.closePath(); c.fill(); c.fillStyle='#2563eb'; c.beginPath(); c.moveTo(30,-72); c.lineTo(8,-20); c.lineTo(-4,-26); c.lineTo(14,-72); c.closePath(); c.fill();
  var g=c.createRadialGradient(-10,-10,4,0,0,44); g.addColorStop(0,mc[0]); g.addColorStop(1,mc[1]); c.fillStyle=g; A.circ(c,0,0,40); c.fill(); c.strokeStyle=esc(mc[1],.3); c.lineWidth=4; A.circ(c,0,0,40); c.stroke(); c.strokeStyle='rgba(255,255,255,.5)'; c.lineWidth=2; A.circ(c,0,0,31); c.stroke();
  A.estrela(c,0,0,20,esc(mc[1],.15),0); c.fillStyle='rgba(255,255,255,.55)'; A.el(c,-14,-16,8,4); c.fill();
  c.restore();
  c.font=F(900,22); c.fillStyle='#fff'; c.fillText(med,W/2,206); if(J.tr){ c.font=F(700,13); c.fillStyle='#fde68a'; c.fillText(med_pt,W/2,224); }
  /* blocos do pódio com os karts */
  var blocos=[[1,W/2,330,96],[2,W/2-130,360,66],[3,W/2+130,380,46]];
  blocos.forEach(function(b){ var who=P.lista[b[0]-1]; var x=b[1], y=b[2], h=470-y;
    c.fillStyle=b[0]===1?'#facc15':(b[0]===2?'#cbd5e1':'#fb923c'); rr(c,x-60,y,120,h,8); c.fill(); c.fillStyle='rgba(0,0,0,.15)'; c.fillRect(x-60,y+h-10,120,10);
    c.fillStyle='rgba(13,11,30,.75)'; c.font=F(900,30); c.fillText(String(b[0]),x,y+h/2+6);
    if(!who) return;
    if(who.id==='me'){ var quem=J.prog.heroi||'lia', ch=CAB_HEROI[quem]||CAB_HEROI.lia, cor=corHeroi(); pilotoEmPe(c,x,y,{r:{tipo:'humano',pele:ch.pele,cab:ch.cab,longo:ch.longo,coque:ch.coque,cacho:ch.cacho},suit:cor,cap:cor,faixa:'#fff',num:10,k:9,eu:true},t,.68); }
    else { var d=RIVAIS_DEF.filter(function(r){ return r.id===who.id; })[0], rv=R.rivais.filter(function(r){ return r.d===d; })[0]; if(d) pilotoEmPe(c,x,y,{r:ROSTO[d.id],suit:(rv&&rv.cor)||d.cor,cap:(rv&&rv.cor)||d.cor,faixa:CAMISA[d.id],num:RIVAIS_DEF.indexOf(d)+1,k:RIVAIS_DEF.indexOf(d)},t,.62); }
    });
  c.font=F(900,16); c.fillStyle='#fff'; c.fillText('Pages: '+R.paginas+' of 3   ·   Stars: '+R.estrelas,W/2,488);
  if(R.t>.6){ var a=.8+.2*Math.sin(t*5); c.globalAlpha=k*a; c.fillStyle='#fde047'; rr(c,W-210,H-70,180,50,25); c.fill(); c.fillStyle='#1e1b3a'; c.font=F(900,22); c.fillText('Continue ▶',W-120,H-45); }
  c.restore();
}

return {inicia:inicia, atualiza:function(dt){ atualiza(dt); if(R&&R.fase==='podio'&&R.podio) R.podio.t+=dt; }, desenha:desenha, toque:toque, tecla:tecla, ativa:function(){ return !!R&&!R.acabou; },
  /* QA */ _R:function(){ return R; }, _pista:function(s){ return pista(s); }, _OB:function(){ if(!TRK) montaPista(); if(!OB.length) montaObjetos(); return OB; }, _K:{V0:V0,VLAT:VLAT,KS:KS,LARG:LARG,CAR_Y:CAR_Y,GEO:GEO,PONTES:PONTES,PITS:PITS,S:S,T_FIM:T_FIM,pouso:function(o){ return pousoDaRampa(o); }}, largar:largar};
})();
