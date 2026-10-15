/* ============================================================
   ING3_jogo_corrida.js — Real or Make-believe RALLY (reino 3), v3.
   18/10 (Paulo: "a corrida continua péssima … só sobe … não dá para
   ultrapassar … carros mecânicos … carrinhos sem tema"). Reescrita
   inspirada em projetos abertos (MIT) e no Red Bull Soapbox Race:
   · PISTA de verdade, vista de cima, que vira para todos os lados
     (construída por trechos: retas, arcos, grampos, chicanes, saltos,
     ponte, pântano, 3 pit stops); a CÂMERA gira com a pista, então
     ◀ é sempre esquerda (spacejack/carphysics2d · raceforge · javascript-racer).
   · FÍSICA de bicicleta com pivô no eixo traseiro: o raio de curva
     cresce com a velocidade e, passando da aderência, o carrinho
     escorrega (sai de frente) e perde embalo; zebra, grama, lama,
     riacho e tinta mudam a aderência. Direção assistida (sem tocar,
     o carrinho se endireita) e RESGATE pela fada depois de 1,5 s fora.
   · RIVAIS com personalidade que ERRAM à vista: abrem a curva, rodam
     na tinta, cortam a chicane, aterrissam torto, se esbarram; vácuo
     e pads de turbo deixam ULTRAPASSAR pilotando bem; os 3 da frente
     só se alcançam com os turbos das respostas certas.
   · MOEDAS que importam (+0,5% de velocidade cada, até 10) e PADS de
     turbo na saída das curvas; nada de estrelas soltas.
   · CARRINHOS DE ROLIMÃ temáticos (ING3_jogo_carrinhos.js) descendo a
     rampa de largada na apresentação.
   · 3 PIT STOPS: a perguntas (uma de conceito, uma historinha, uma
     rápida); cada acerto = 1 TURBO. Durante o pit nada corre.
   Sem dano, sem derrota: todo mundo ganha medalha.
   ============================================================ */
window.CORRIDA = (function(){
'use strict';
var G=window.JOGO, J=G.J, A=window.ARTE, W=G.W, H=G.H, CR=window.CARRINHOS;
var TAU=Math.PI*2, PI=Math.PI;
var VMAX=300, ACEL=150, GRIP=560, LB=30, PASSO=8, HWP=110, CAR_Y=.7*540;
var FONTE='"Nunito","Segoe UI",Arial';
function F(p,px){ return p+' '+px+'px '+FONTE; }
function cl(v,a,b){ return v<a?a:(v>b?b:v); }
function lerp(a,b,k){ return a+(b-a)*k; }
function suave(k){ k=cl(k,0,1); return k*k*(3-2*k); }
function angDif(a,b){ var d=(a-b)%TAU; if(d>PI) d-=TAU; if(d<-PI) d+=TAU; return d; }
function hash(n){ var x=Math.sin(n*127.1+311.7)*43758.5453; return x-Math.floor(x); }
function ord(n){ return n+(n===1?'st':(n===2?'nd':(n===3?'rd':'th'))); }
function rr(c,x,y,w,h,r){ A.rr(c,x,y,w,h,r); }
var semente=1; function rnd(){ semente=(semente*16807)%2147483647; return (semente-1)/2147483646; }

/* ============================================================
   O PERCURSO "Fairy-tale Hill": trechos encadeados (tartaruga)
   ['reta', comprimento, {tags}]  ['arco', graus (+ = direita), raio, {tags}]
   ============================================================ */
/* serpentina de descida (como as pistas de carrinho de rolimã): pernas que sobem e descem a encosta,
   ligadas por GRAMPOS (em cima) e por curvas em U (embaixo); cada perna tem a sua atração. As ondulações
   ("S") e as chicanes abrem sempre para o lado de fora: um trecho nunca encosta no outro (portão). */
function S_(r,tags){ return [['arco',-40,r,tags],['arco',80,r,tags],['arco',-40,r,tags]]; }
function CHI(tags){ return [['arco',-36,200,tags],['arco',72,200,tags],['arco',-36,200,tags]]; }
function GRAMPO(tags){ return [['arco',180,175,tags],['reta',300,{pad:1}]]; }
function UBAIXO(tags){ return [['arco',-90,210,tags],['reta',320,{}],['arco',-90,210,tags]]; }
var TRECHOS=[].concat(
  [['reta',1100,{largada:1,arq:1}]], S_(320,{zi:1,moedas:1}), [['reta',400,{}]],
  GRAMPO({zi:1,zo:1,grampo:1,feno:1,erro:'largo'}),
  [['reta',900,{moedas:1}]], CHI({zi:1,zo:1,chicane:1,erro:'atalho'}), [['reta',500,{}]],
  UBAIXO({zi:1,feno:1}),
  [['reta',2000,{pit:0}],['reta',300,{}]],
  GRAMPO({zi:1,zo:1,grampo:1,feno:1,erro:'largo'}),
  [['reta',380,{}],['reta',90,{rampa:1}],['reta',420,{riacho:1,erro:'aterrissa'}],['reta',400,{}]], S_(360,{lama:1,erro:'oleo'}), [['reta',700,{lama:1,tinta:1}]],
  UBAIXO({zi:1,moedas:1}),
  [['reta',300,{}],['reta',1000,{ponte:1}],['reta',300,{}]], CHI({zi:1,zo:1,chicane:1,erro:'atalho'}), [['reta',400,{}]],
  GRAMPO({zi:1,zo:1,grampo:1,feno:1,erro:'largo'}),
  [['reta',800,{moedas:1}],['reta',2000,{pit:1}],['reta',300,{}]],
  UBAIXO({zi:1,feno:1}),
  S_(270,{zi:1,cogumelo:1}), S_(270,{zi:1,cogumelo:1,moedas:1}), [['reta',300,{}],['reta',90,{rampa:1}],['reta',380,{riacho:1,erro:'aterrissa'}],['reta',400,{}]],
  GRAMPO({zi:1,zo:1,grampo:1,moedas:1,erro:'largo'}),
  CHI({zi:1,zo:1,chicane:1,erro:'atalho'}), [['reta',500,{}],['reta',2000,{pit:2}],['reta',300,{}]],
  UBAIXO({zi:1,feno:1}),
  [['reta',500,{conde:1}]], S_(420,{zi:1}), [['reta',3200,{arq:1,fim:1}],['reta',1200,{arq:1}]]
);
var TRK=null, OBJ=null;
function montaPista(){
  var pts=[], x=0, y=0, h=-PI/2, s=0;
  function poe(tags,k){ pts.push({x:x,y:y,h:h,s:s,k:k||0,tags:tags}); }
  TRECHOS.forEach(function(tr,ti){ var tags=tr[tr.length-1]; tags.ti=ti;
    if(tr[0]==='reta'){ var n=Math.round(tr[1]/PASSO); for(var i=0;i<n;i++){ poe(tags,0); x+=Math.cos(h)*PASSO; y+=Math.sin(h)*PASSO; s+=PASSO; } }
    else { var ang=tr[1]*PI/180, R0=tr[2], len=Math.abs(ang)*R0, n2=Math.max(1,Math.round(len/PASSO)), dh=ang/n2, k=ang/len; for(var j=0;j<n2;j++){ poe(tags,k); h+=dh; x+=Math.cos(h)*PASSO; y+=Math.sin(h)*PASSO; s+=PASSO; } } });
  poe({ti:TRECHOS.length},0);
  var n=pts.length, T={n:n,x:new Float32Array(n),y:new Float32Array(n),h:new Float32Array(n),tx:new Float32Array(n),ty:new Float32Array(n),nx:new Float32Array(n),ny:new Float32Array(n),k:new Float32Array(n),hw:new Float32Array(n),s:new Float32Array(n),tag:[],linha:new Float32Array(n),L:s};
  for(var i=0;i<n;i++){ var p=pts[i]; T.x[i]=p.x; T.y[i]=p.y; T.h[i]=p.h; T.tx[i]=Math.cos(p.h); T.ty[i]=Math.sin(p.h); T.nx[i]=T.ty[i]; T.ny[i]=-T.tx[i]; T.k[i]=p.k; T.s[i]=p.s; T.tag[i]=p.tags; T.hw[i]=p.tags.ponte?72:HWP; }
  /* a ponte afunila e alarga suave */
  for(var a=0;a<n;a++){ if(!T.tag[a].ponte) continue; for(var b=1;b<=30;b++){ if(a-b>=0&&!T.tag[a-b].ponte) T.hw[a-b]=Math.min(T.hw[a-b],lerp(72,HWP,b/30)); if(a+b<n&&!T.tag[a+b].ponte) T.hw[a+b]=Math.min(T.hw[a+b],lerp(72,HWP,b/30)); } }
  /* linha ideal: fora-dentro-fora (desloca para DENTRO da curva antes e no ápice) */
  for(var q=0;q<n;q++){ var ks=0,w=0; for(var dj=-12;dj<=34;dj++){ var qq=cl(q+dj,0,n-1), pe=dj<0?.5:1; ks+=T.k[qq]*pe; w+=pe; } T.linha[q]=-cl((ks/w)*420,-1,1)*.62*T.hw[q]; }
  for(var it=0;it<3;it++){ var cp=T.linha.slice(); for(var z=0;z<n;z++){ var sm=0,c2=0; for(var d=-12;d<=12;d++){ var zz=cl(z+d,0,n-1); sm+=cp[zz]; c2++; } T.linha[z]=sm/c2; } }
  TRK=T; montaObjetos();
}
function amostra(s){ var i=cl(Math.round(s/PASSO),0,TRK.n-1); return i; }
/* ponto da pista mais perto de (x,y), procurando perto do último índice (não confunde trechos vizinhos) */
function proj(x,y,iDica,larga){ var best=0,bd=1e18,r=larga?TRK.n:60, i0=larga?0:Math.max(0,iDica-r), i1=larga?TRK.n-1:Math.min(TRK.n-1,iDica+r);
  for(var i=i0;i<=i1;i++){ var dx=x-TRK.x[i], dy=y-TRK.y[i], q=dx*dx+dy*dy; if(q<bd){ bd=q; best=i; } }
  var dx2=x-TRK.x[best], dy2=y-TRK.y[best];
  return {i:best, s:TRK.s[best]+dx2*TRK.tx[best]+dy2*TRK.ty[best], d:dx2*TRK.nx[best]+dy2*TRK.ny[best]}; }
function pontoEm(s,d){ var i=amostra(s); return {x:TRK.x[i]+TRK.nx[i]*d, y:TRK.y[i]+TRK.ny[i]*d, h:TRK.h[i], i:i}; }

/* ---------- objetos do percurso (derivados das tags) ---------- */
var PIT_S=[], RAMPAS=[], RIACHOS=[], PONTES=[], FIM_S=0, CONDE_S=0;
function montaObjetos(){
  OBJ={moedas:[],lama:[],pads:[],feno:[],cogumelos:[],decor:[],tinta:[]}; PIT_S=[]; RAMPAS=[]; RIACHOS=[]; PONTES=[];
  var T=TRK, ultimo=-1, ini={};
  for(var i=0;i<T.n;i++){ var tg=T.tag[i]; if(tg.ti!==ultimo){ ini[tg.ti]=i; ultimo=tg.ti; } }
  TRECHOS.forEach(function(tr,ti){ var tg=tr[tr.length-1], i0=ini[ti], i1=(ini[ti+1]||T.n)-1; if(i0===undefined) return; var s0=T.s[i0], s1=T.s[i1];
    if(tg.pit!==undefined) PIT_S[tg.pit]={sb:s0+1300, s0:s0, s1:s1};
    if(tg.rampa) RAMPAS.push({s:s0, s1:s1});
    if(tg.riacho) RIACHOS.push({s0:s0, s1:s1});
    if(tg.ponte) PONTES.push({s0:s0, s1:s1});
    if(tg.fim) FIM_S=s0+2400;
    if(tg.conde) CONDE_S=s0;
    if(tg.moedas){ var sm=(s0+s1)/2; for(var m=0;m<5;m++){ var ss=sm-120+m*60, ii=amostra(ss); OBJ.moedas.push({s:ss, d:T.linha[ii]+(tg.zi?-Math.sign(T.k[ii]||1)*8:0), vivo:true}); } }
    if(tg.pad){ var ip=amostra(s0+120); OBJ.pads.push({s:s0+120, d:T.linha[ip]*.6}); }
    if(tg.lama){ for(var l=0;l<Math.floor((s1-s0)/260);l++){ var sl=s0+130+l*260; OBJ.lama.push({s:sl, d:(l%2?1:-1)*58, r:52}); } }
    if(tg.tinta){ OBJ.tinta.push({s:(s0+s1)/2-150, d:30, r:30, fixa:true}); OBJ.tinta.push({s:(s0+s1)/2+200, d:-40, r:30, fixa:true}); }
    if(tg.feno){ for(var f=i0;f<=i1;f+=9){ var lado=T.k[f]>0?1:-1; OBJ.feno.push({s:T.s[f], d:lado*(T.hw[f]+26)}); } }
    if(tg.cogumelo){ for(var g2=i0+20;g2<=i1;g2+=40){ var ld=T.k[g2]>0?1:-1; OBJ.cogumelos.push({s:T.s[g2], d:ld*(T.hw[g2]+16)}); } }
  });
  /* enfeites fora da pista (árvores, arbustos, flores, fardos), longe de qualquer trecho */
  semente=77;
  for(var e=0;e<T.n;e+=7){ for(var lado2=-1;lado2<=1;lado2+=2){ if(rnd()<.45) continue; var dd=lado2*(T.hw[e]+60+rnd()*260), px=T.x[e]+T.nx[e]*dd, py=T.y[e]+T.ny[e]*dd, perto=false;
      for(var c3=0;c3<T.n;c3+=6){ var ax=px-T.x[c3], ay=py-T.y[c3]; if(ax*ax+ay*ay<Math.pow(T.hw[c3]+46,2)){ perto=true; break; } }
      if(perto) continue; var r=rnd(); OBJ.decor.push({x:px,y:py,tipo:r<.5?'arvore':(r<.68?'arbusto':(r<.8?'flores':(r<.9?'pinheiro':'cogu'))),k:e+lado2,s:T.s[e]}); } }
  /* arquibancadas na largada e na chegada; barracas nos pits */
  OBJ.arq=[]; T.tag.forEach(function(tg,i){ if(tg.arq&&i%40===0) [-1,1].forEach(function(l){ OBJ.arq.push({i:i,lado:l}); }); });
}

/* ---------- rivais: personalidade (vmax, aderência, quanto segue a linha, ruído) ---------- */
var RIVAIS_DEF=[
  {id:'dragon', vmax:1.078, grip:1,   lado:.95, ruido:6,  erros:2, lider:1},
  {id:'knight', vmax:1.068, grip:1,   lado:.9,  ruido:8,  erros:2, lider:1},
  {id:'fairy',  vmax:1.06, grip:.98, lado:.9,  ruido:10, erros:2, lider:1},
  {id:'witch',  vmax:1.03, grip:.9,  lado:.7,  ruido:16, erros:4},
  {id:'frog',   vmax:1.02, grip:.92, lado:.8,  ruido:14, erros:3},
  {id:'wolf',   vmax:1.01, grip:.9,  lado:.75, ruido:14, erros:3},
  {id:'red',    vmax:.97,  grip:.95, lado:.85, ruido:10, erros:3},
  {id:'princess',vmax:.96, grip:1,   lado:.95, ruido:6,  erros:2},
  {id:'pig',    vmax:.955, grip:.88, lado:.8,  ruido:12, erros:3}]; /* os 3 líderes só se alcançam com os turbos das respostas */
var COR_HEROI={lia:'#e11d48',theo:'#2563eb',bia:'#9333ea',leo:'#facc15'};
function corHeroi(){ return J.prog.cor||COR_HEROI[J.prog.heroi||'lia']||'#e11d48'; }
var TAREFAS=[{k:'tires',en:'Tires',pt:'Pneus'},{k:'fuel',en:'Fuel',pt:'Combustível'},{k:'water',en:'Water',pt:'Água'}];
var FALAS=[
  [600,"GO! Hold ◀ ▶ to steer. Drive well to pass the others!","Vai! Segure ◀ ▶ para virar. Pilote bem para passar os outros!"],
  ['grampo0',"A hairpin! Slow turn… stay inside!","Uma curva fechada! Fique por dentro!"],
  ['pad',"Drive over the yellow arrows: BOOST!","Passe nas setas amarelas: IMPULSO!"],
  ['pit0',"Pit stop! Follow the tires to the yellow box!","Pit stop! Siga os pneus até a caixa amarela!"],
  ['chicane',"A chicane! Left, right, left!","Uma chicane! Esquerda, direita, esquerda!"],
  ['rampa',"A ramp! Fly over the creek!","Uma rampa! Voe por cima do riacho!"],
  ['lama',"Witch's swamp! Mud and ink!","O pântano da bruxa! Lama e tinta!"],
  ['ponte',"The troll bridge! Stay in the middle!","A ponte do troll! Fique no meio!"],
  ['conde',"Oh no! Count Scribble is here! Watch his ink!","Ah, não! O Conde Rabisco chegou! Cuidado com a tinta!"],
  ['fim',"The final straight! Use ALL your turbos!","A reta final! Use TODOS os turbos!"]];

/* ============================================================
   ESTADO
   ============================================================ */
var R=null;
function novoCarro(id,s,d,eu){ var p=pontoEm(s,d); return {id:id,x:p.x,y:p.y,h:p.h,v:0,b:0,st:0,stIn:0,i:p.i,s:s,d:d,ar:0,rol:0,giro:0,fora:0,resg:0,turbo:0,pad:0,vac:0,vacT:0,moedas:0,eu:!!eu,parado:0,wob:0,tag:0,naTela:false,pitFeito:[false,false,false]}; }
function inicia(f){
  if(!TRK) montaPista(); instalaCena(); semente=4242;
  R={f:f, fase:'apresenta', t:0, latas:0, acertos:0, paginas:0, pitFeito:[false,false,false], pitAtual:-1, pitRes:[], pitAnim:null, pos:10, posPulse:0, anunc:null, fala:null, falou:{}, pt:[], marcas:[], podio:null, acabou:false, final:0, errosIA:[], ultrapassagens:0, conde:null, cam:{x:0,y:0,a:-PI/2,w:0,z:1.3}, auto:null, tSaida:0, resgates:0};
  R.me=novoCarro(J.prog.heroi||'lia',640-4*70,-38,true);
  R.rivais=RIVAIS_DEF.map(function(d,k){ var lin=Math.floor(k/2), c=novoCarro(d.id,640-lin*70+(k%2?0:22),(k%2?38:-38)+0,false); c.p=d; c.cor=CR.LISTA[d.id].cor; c.nome=CR.LISTA[d.id].nome; c.fase=hash(k*3.1)*6; c.erros=agendaErros(d,k); c.errosFeitos=0; return c; });
  /* o herói larga em 10º, atrás de todos */
  var cam=R.cam; cam.x=R.me.x; cam.y=R.me.y; cam.a=R.me.h;
  J.estado='corrida'; J.stats={perguntas:0,acertos:0}; J.pontos=0; J.corrida=R;
  J.nivel={moradores:[{feito:false},{feito:false},{feito:false}], quizIds:[]}; J.mundo=null;
  J.urso={x:0,y:0,vx:0,vy:0,estado:'ride',anim:0,invT:0,tam:1};
  J.in.left=J.in.right=J.in.jump=J.in.down=J.in.act=false;
  SOM.musica('pista'); G.hud();
  if(window.UI){ UI.modoNivel(false); UI.modoMapa(false); UI.modoCorrida(false); UI.quizBotoes(false); }
  botoes(true); document.body.classList.add('nacapa');
  fala('The Soapbox Rally! Meet the racers and their crazy carts!','O Rali dos Carrinhos! Conheça os pilotos e os carrinhos malucos!');
}
/* erros de cada rival, sorteados nos trechos certos (grampo, chicane, pântano, salto) */
function agendaErros(d,k){ var lst=[], tipos=[];
  TRECHOS.forEach(function(tr,ti){ var tg=tr[tr.length-1]; if(tg.erro) tipos.push(ti); });
  semente=1000+k*37; var esc=tipos.slice().sort(function(){ return rnd()-.5; }).slice(0,d.erros);
  esc.forEach(function(ti){ var tg=TRECHOS[ti][TRECHOS[ti].length-1], i0=0; for(var i=0;i<TRK.n;i++){ if(TRK.tag[i].ti===ti){ i0=i; break; } } lst.push({s:TRK.s[i0]+(tg.erro==='aterrissa'?0:40+rnd()*120), tipo:tg.erro, feito:false}); });
  return lst.sort(function(a,b){ return a.s-b.s; }); }
function largar(){ if(!R||R.fase!=='apresenta'||R.t<.5) return false; document.body.classList.remove('nacapa'); R.fase='largada'; R.t=0; SOM.fx('clique'); if(window.UI) UI.modoNivel(true); botoes(true); fala('Ready… set…','Preparar… apontar…'); return true; }
function fala(en,pt){ if(!R) return; R.fala={en:en,pt:pt,t:0}; try{ say(en); }catch(e){} }
function el(id){ return document.getElementById(id); }
function botoes(on){
  ['tDown','tAct'].forEach(function(id){ var b=el(id); if(b) b.style.display=on?'none':''; });
  var bj=el('tJump'); if(bj){ if(on) pintaTurbo(); else { bj.innerHTML='JUMP'; bj.style.flexDirection=''; bj.classList.remove('turbo0'); bj.setAttribute('aria-label','Jump'); } }
  if(!on&&window.UI) UI.acao(false,0);
}
var SVG_RAIO='<svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true"><path d="M14 2 4 14h7l-2 8 11-13h-7z" fill="#fde047" stroke="#92400e" stroke-width="1.6" stroke-linejoin="round"/></svg>';
function pintaTurbo(){ if(!R) return; var n=R.latas, b=el('tJump'); if(!b) return; b.innerHTML=SVG_RAIO+'<small style="display:block;font-size:15px;line-height:1">TURBO '+n+'</small>'; b.style.flexDirection='column'; b.setAttribute('aria-label','Turbo'); b.classList.toggle('turbo0',n<=0); }
function limpa(){ botoes(false); document.body.classList.remove('nacapa'); R=null; J.corrida=null; }

/* ============================================================
   LAÇO
   ============================================================ */
function atualiza(dt){
  if(!R||R.acabou) return; R.t+=dt; if(R.fala) R.fala.t+=dt; if(R.posPulse>0) R.posPulse-=dt; if(R.anunc){ R.anunc.t+=dt; if(R.anunc.t>1.3) R.anunc=null; }
  particulas(dt);
  switch(R.fase){
    case 'apresenta': break;
    case 'largada': var a0=Math.floor((R.t-dt)/.8), a1=Math.floor(R.t/.8); if(a1!==a0&&a1>=1&&a1<=3) SOM.fx(a1<3?'clique':'plim'); if(R.t>=2.4){ R.fase='corre'; R.t=0; R.goT=.9; fala('GO!','JÁ!'); } camera(dt); break;
    case 'corre': if(R.goT>0) R.goT-=dt; corre(dt); break;
    case 'box': if(R.t>.9) abrePit(); camera(dt); break;
    case 'saida': R.tSaida+=dt; if(R.tSaida>1.5){ R.fase='corre'; R.t=0; SOM.fx('plim'); } camera(dt); break;
    case 'chegada': corre(dt); if(R.t>2){ R.fase='podio'; R.t=0; montaPodio(); } break;
    case 'podio': if(R.podio) R.podio.t+=dt; break;
  }
}
function corre(dt){
  var me=R.me, chegando=R.fase==='chegada';
  /* entrada do jogador: ◀ ▶ analógico suave; turbo no ▲ / botão / X */
  var inp=(J.in.right?1:0)-(J.in.left?1:0); if(chegando||me.resg>0) inp=0;
  if(R.auto){ pilotoIA(me,dt,R.auto); }
  else {
    var alvoIn=inp; me.stIn+= (alvoIn-me.stIn)*Math.min(1,dt*(alvoIn?5.5:10));
    if(!inp){ /* direção assistida: sem tocar, o carrinho acompanha a pista e volta do canto */
      var p=proj(me.x,me.y,me.i), ang=TRK.h[cl(p.i+8,0,TRK.n-1)], puxa=Math.abs(p.d)>TRK.hw[p.i]*.72?-Math.sign(p.d)*.35:0;
      var err=angDif(ang+puxa*0,me.h)+(-puxa*0); var corr=cl(err*1.6+(Math.abs(p.d)>TRK.hw[p.i]*.72?(p.d>0?.25:-.25):0),-1,1); me.st=corr*.7; }
    else me.st=me.stIn;
    if((J.in.act||J.in.jump)&&J.actSolto){ J.actSolto=false; usaTurbo(); }
    if(!J.in.act&&!J.in.jump) J.actSolto=true;
  }
  if(chegando) me.st=0;
  fisica(me,dt,chegando?Math.max(0,1-R.t/1.6):1);
  R.rivais.forEach(function(r){ pilotoIA(r,dt,null); fisica(r,dt,1); });
  colisoesCarros(dt); conde(dt); coletas(dt); vacuo(dt); pits(dt); resgate(me,dt); R.rivais.forEach(function(r){ resgate(r,dt); });
  camera(dt); eventos(); turboFinal(dt);
  /* posição: pelo progresso na pista */
  var pos=1; R.rivais.forEach(function(r){ if(r.s>me.s) pos++; });
  if(pos<R.pos){ SOM.fx('plim'); R.posPulse=.7; G.pontua(50); R.anunc={txt:'▲ '+ord(pos)+'!',pt:'Subiu para '+pos+'º!',cor:'#4ade80',t:0}; if(me.turbo<=0) R.ultrapassagens++; }
  else if(pos>R.pos){ R.posPulse=.7; R.anunc={txt:'▼ '+ord(pos),pt:'Caiu para '+pos+'º',cor:'#f87171',t:0}; }
  R.pos=pos;
  if(!chegando&&me.s>=FIM_S){ R.fase='chegada'; R.t=0; R.final=R.pos; SOM.fx('vitoria'); fala(R.pos===1?'Checkered flag! You WIN!':'Checkered flag! You finished '+ord(R.pos)+'!',R.pos===1?'Bandeira quadriculada! Você VENCEU!':'Bandeira quadriculada! Você chegou em '+R.pos+'º!');
    for(var q=0;q<60;q++) R.pt.push({x:me.x+(Math.random()-.5)*500,y:me.y+(Math.random()-.5)*400,vx:(Math.random()-.5)*60,vy:-60-Math.random()*80,vida:2,max:2,tipo:'confete',cor:['#ef4444','#fde047','#3b82f6','#22c55e','#ec4899','#fff'][q%6],r:4,rot:Math.random()*6}); }
}

/* ---------- superfície sob o carro ---------- */
function superficie(k,p){
  var hw=TRK.hw[p.i], ad=Math.abs(p.d), tg=TRK.tag[p.i], S={grip:1,vmax:1,tipo:'asfalto'};
  if(k.ar>0) return {grip:0,vmax:1,tipo:'ar'};
  if(ad>hw){ S={grip:.6,vmax:.55,tipo:'grama'}; }
  else if(ad>hw-16&&((tg.zi&&Math.sign(p.d)===-Math.sign(TRK.k[p.i]||1))||(tg.zo&&Math.sign(p.d)===Math.sign(TRK.k[p.i]||1)))) S={grip:1,vmax:.97,tipo:'zebra'};
  for(var i=0;i<OBJ.lama.length;i++){ var l=OBJ.lama[i]; if(Math.abs(l.s-p.s)<l.r&&Math.abs(l.d-p.d)<l.r) { S={grip:.55,vmax:.55,tipo:'lama'}; break; } }
  for(var j=0;j<OBJ.tinta.length;j++){ var tt=OBJ.tinta[j]; if(Math.abs(tt.s-p.s)<tt.r&&Math.abs(tt.d-p.d)<tt.r) { S={grip:.25,vmax:.8,tipo:'tinta'}; break; } }
  for(var r=0;r<RIACHOS.length;r++){ var rc=RIACHOS[r]; if(p.s>rc.s0&&p.s<rc.s1) { S={grip:.5,vmax:.45,tipo:'agua'}; break; } }
  return S;
}
/* ---------- física: bicicleta com pivô no eixo traseiro + aderência ---------- */
function fisica(k,dt,mult){
  var p=proj(k.x,k.y,k.i); k.i=p.i; k.s=p.s; k.d=p.d; var sup=superficie(k,p); k.sup=sup.tipo;
  if(k.parado>0){ k.parado-=dt; k.v=Math.max(0,k.v-400*dt); return; }
  if(k.resg>0) return;
  var vm=VMAX*(k.eu?1+Math.min(10,k.moedas)*.005:k.p.vmax*banda(k));
  if(k.turbo>0){ k.turbo-=dt; vm*=1.6; } if(k.pad>0){ k.pad-=dt; vm*=1.35; } if(k.vac>0){ k.vac-=dt; vm*=1.1; }
  if(k.giro>0){ vm*=.6; } if(k.wob>0) k.wob-=dt;
  var pz=pitZona(k.s); if(pz&&!k.pitFeito[pz.pi]) vm=Math.min(vm,145);
  vm*=sup.vmax*(k.limite||1)*mult;
  /* esterço: menos ângulo em alta velocidade (raio cresce com a velocidade) */
  var dmax=lerp(.6,.17,cl(k.v/VMAX,0,1)), delta=cl(k.st,-1,1)*dmax;
  if(k.ar>0){ delta=0; k.ar-=dt; if(k.ar<=0){ SOM.fx('aterra'); poeira(k.x,k.y,8,'#d6d3d1'); if(k.eu) J.shake=3; if(Math.abs(k.b)<.12&&k.eu){ k.pad=Math.max(k.pad,.6); } } }
  var yr=k.v*Math.tan(delta)/LB, aLat=k.v*yr, lim=GRIP*(sup.grip||.01)*(k.eu?1:k.p.grip);
  if(k.ar<=0&&Math.abs(aLat)>lim){ var exc=(Math.abs(aLat)-lim)/lim; k.b+=Math.sign(yr)*Math.min(exc,1.5)*dt*1.4; k.v-=exc*110*dt; yr=Math.sign(yr)*lim/Math.max(40,k.v); if(Math.random()<dt*20) marca(k); }
  k.b*=Math.max(0,1-dt*3.2*Math.max(.3,sup.grip||1)); k.b=cl(k.b,-.7,.7);
  if(k.giro>0){ k.giro-=dt; k.h+=dt*TAU/1.2; } else k.h+=yr*dt;
  if(k.v<vm) k.v+=ACEL*dt*(k.v<120?1.6:1)*(k.turbo>0||k.pad>0?3.5:1); /* turbo/pad empurram de verdade */ else k.v=Math.max(vm,k.v-260*dt);
  var dir=k.h-k.b; k.x+=Math.cos(dir)*k.v*dt; k.y+=Math.sin(dir)*k.v*dt;
  k.rol+=((cl(-aLat/GRIP,-1,1)*2.5)-k.rol)*Math.min(1,dt*8);
  /* ponte: guarda-corpo macio (bate e volta) */
  if(PONTES.some(function(pp){ return k.s>pp.s0&&k.s<pp.s1; })&&Math.abs(k.d)>TRK.hw[k.i]-14){ var sg=Math.sign(k.d), i=k.i; k.x-=TRK.nx[i]*sg*(Math.abs(k.d)-(TRK.hw[i]-14)); k.y-=TRK.ny[i]*sg*(Math.abs(k.d)-(TRK.hw[i]-14)); k.h+=(angDif(TRK.h[i],k.h))*.3; k.v*=.97; k.wob=.3; if(k.eu&&Math.random()<dt*8) SOM.fx('pisao'); }
  /* rampa: decola */
  if(k.ar<=0) RAMPAS.forEach(function(rp){ if(k.s>rp.s&&k.s<rp.s+30&&Math.abs(k.d)<TRK.hw[k.i]){ var vao=(RIACHOS.filter(function(rc){ return rc.s0>=rp.s1-4; })[0]||{s1:rp.s+400}).s1-k.s+60; k.ar=vao/Math.max(200,k.v); k.v=Math.max(k.v,230); SOM.fx('mola'); if(k.eu){ texto(k.x,k.y,'WHEEE!','#fde68a'); } } });
  /* fora da pista muito tempo = resgate */
  if(Math.abs(k.d)>TRK.hw[k.i]+30||Math.abs(angDif(k.h,TRK.h[k.i]))>1.9) k.fora+=dt; else k.fora=Math.max(0,k.fora-dt*2);
  /* poeira, grama, água */
  if(k.v>60&&k.ar<=0&&Math.random()<dt*14){ if(sup.tipo==='grama') R.pt.push({x:k.x,y:k.y,vx:(Math.random()-.5)*60,vy:(Math.random()-.5)*60,vida:.5,max:.5,tipo:'grama',cor:Math.random()<.5?'#15803d':'#86efac',r:3}); if(sup.tipo==='lama') R.pt.push({x:k.x,y:k.y,vx:(Math.random()-.5)*80,vy:(Math.random()-.5)*80,vida:.6,max:.6,tipo:'po',cor:'#78350f',r:4}); if(sup.tipo==='agua') R.pt.push({x:k.x,y:k.y,vx:(Math.random()-.5)*120,vy:(Math.random()-.5)*120,vida:.5,max:.5,tipo:'agua',r:3}); }
  if(sup.tipo==='tinta'&&k.giro<=0&&k.ar<=0&&(!k.tintaT||R.t-k.tintaT>2)){ k.tintaT=R.t; k.giro=1.2; k.v*=.75; if(k.eu){ SOM.fx('tonto'); fala('Wheee! Ink! Spin!','Uiii! Tinta! Rodou!'); derrubaMoedas(k); } else logErro(k,'oleo'); }
}
function banda(k){ /* elástico só FORA da tela (os líderes não esperam) */ var ds=k.s-R.me.s; if(Math.abs(ds)<450) return 1; if(ds>700) return k.p.lider?1:.95; if(ds<-500) return 1.06; return 1; }
function pitZona(s){ for(var i=0;i<PIT_S.length;i++){ var P=PIT_S[i]; if(s>P.sb-1000&&s<P.sb+380) return {pi:i,P:P}; } return null; }

/* ---------- piloto automático (rivais e o bot de teste) ---------- */
function pilotoIA(r,dt,bot){
  var perfil=r.p||bot||{vmax:1,grip:1,lado:1,ruido:0}; if(r.resg>0||r.parado>0) return;
  var la=90+.45*r.v, ia=amostra(r.s+la), pz=pitZona(r.s);
  var dA=TRK.linha[ia]*perfil.lado+(perfil.ruido?Math.sin(R.t*(.9+(r.fase||0)*.1)+(r.fase||0))*perfil.ruido:0);
  if(pz&&!r.pitFeito[pz.pi]) dA=-(TRK.hw[ia]-40);
  /* carro mais lento à frente, na mesma faixa: desvia para o lado livre */
  var todos=R.rivais.concat([R.me]); for(var q=0;q<todos.length;q++){ var o=todos[q]; if(o===r) continue; var ds=o.s-r.s; if(ds>10&&ds<170&&Math.abs(o.d-dA)<30&&o.v<r.v+5){ dA=o.d+(o.d>0?-38:38); dA=cl(dA,-TRK.hw[ia]+20,TRK.hw[ia]-20); break; } }
  /* erro em andamento */
  var e=r.erroAtual; if(e){ e.t-=dt; if(e.tipo==='largo') dA=-Math.sign(TRK.k[ia]||1)*(TRK.hw[ia]+30); if(e.tipo==='atalho') dA=Math.sign(TRK.linha[ia]||1)*(TRK.hw[ia]+40); if(e.t<=0) r.erroAtual=null; }
  else if(r.erros) for(var k=0;k<r.erros.length;k++){ var er=r.erros[k]; if(!er.feito&&r.s>er.s&&r.s<er.s+300){ er.feito=true; var visto=Math.abs(r.s-R.me.s)<900; if(rnd()<(visto?.9:.45)) comecaErro(r,er.tipo); } }
  var px=TRK.x[ia]+TRK.nx[ia]*dA, py=TRK.y[ia]+TRK.ny[ia]*dA, alfa=angDif(Math.atan2(py-r.y,px-r.x),r.h);
  var dmax=lerp(.6,.17,cl(r.v/VMAX,0,1)); r.st=cl(Math.atan(2*LB*Math.sin(alfa)/la)/dmax,-1,1);
  /* velocidade de curva (anda mais devagar antes de uma curva fechada) */
  var km=0; for(var a=0;a<=260;a+=16){ km=Math.max(km,Math.abs(TRK.k[amostra(r.s+a)])); } var vc=km<1e-4?1e9:Math.sqrt(GRIP*perfil.grip*.9/km)*(e&&e.tipo==='largo'?1.35:1);
  r.limite=Math.min(1,vc/VMAX/(perfil.vmax||1));
}
function comecaErro(r,tipo){ r.errosFeitos++; if(tipo==='oleo'){ r.giro=1.2; r.v*=.7; } else if(tipo==='aterrissa'){ r.b=(Math.random()<.5?-1:1)*.5; r.wob=.7; } else r.erroAtual={tipo:tipo,t:tipo==='largo'?1.2:.9}; logErro(r,tipo); }
function logErro(r,tipo){ var visto=Math.abs(r.s-R.me.s)<450; R.errosIA.push({id:r.id,tipo:tipo,s:Math.round(r.s),visivel:visto}); if(visto&&!r.eu){ texto(r.x,r.y,tipo==='oleo'?'WHEEE!':(tipo==='largo'?'OOPS!':(tipo==='atalho'?'BUMPY!':'BOING!')),'#fde68a'); } }

/* ---------- colisões entre carrinhos: empurra, balança, nunca machuca ---------- */
function colisoesCarros(dt){
  var todos=[R.me].concat(R.rivais);
  for(var i=0;i<todos.length;i++) for(var j=i+1;j<todos.length;j++){ var a=todos[i], b=todos[j]; if(a.ar>0||b.ar>0||a.resg>0||b.resg>0) continue;
    var ax=a.x+Math.cos(a.h)*14, ay=a.y+Math.sin(a.h)*14, bx=b.x+Math.cos(b.h)*14, by=b.y+Math.sin(b.h)*14, dx=bx-ax, dy=by-ay, d=Math.hypot(dx,dy);
    if(d<30&&d>.01){ var nx=dx/d, ny=dy/d, sep=(30-d)/2; a.x-=nx*sep; a.y-=ny*sep; b.x+=nx*sep; b.y+=ny*sep;
      if(a.wob<=0&&b.wob<=0){ a.wob=.6; b.wob=.6; if(!a.eu) a.v*=.96; if(!b.eu) b.v*=.96; if((a.eu||b.eu)&&(!R.boingT||R.t-R.boingT>1.5)){ R.boingT=R.t; SOM.fx('pisao'); texto((ax+bx)/2,(ay+by)/2,'BOING!','#fde68a'); } else if(!a.eu&&!b.eu&&Math.abs(a.s-R.me.s)<700&&(!a.toqueT||R.t-a.toqueT>4)){ a.toqueT=R.t; logErro(a,'toque'); } }
      if(a.eu&&a.turbo>0){ b.x+=nx*6; b.y+=ny*6; } if(b.eu&&b.turbo>0){ a.x-=nx*6; a.y-=ny*6; } } }
}
/* ---------- vácuo: colado atrás de um rival, ganha embalo ---------- */
function vacuo(dt){ var me=R.me, perto=false; R.rivais.forEach(function(r){ var ds=r.s-me.s; if(ds>30&&ds<150&&Math.abs(r.d-me.d)<24) perto=true; });
  if(perto){ me.vacT+=dt; if(me.vacT>.6&&me.vac<=0){ me.vac=1.5; me.vacT=0; } } else me.vacT=0; }
/* ---------- moedas, pads, fenos, cogumelos ---------- */
function coletas(dt){
  var todos=[R.me].concat(R.rivais);
  OBJ.moedas.forEach(function(m){ if(!m.vivo) return; var me=R.me; if(me.ar<=0&&Math.abs(me.s-m.s)<22&&Math.abs(me.d-m.d)<22){ m.vivo=false; me.moedas=Math.min(10,me.moedas+1); J.moedas++; G.pontua(10); SOM.fx('moeda'); faiscas(pontoEm(m.s,m.d),6,'#fde047'); } });
  todos.forEach(function(k){ if(k.ar>0) return;
    OBJ.pads.forEach(function(p){ if(Math.abs(k.s-p.s)<26&&Math.abs(k.d-p.d)<40&&k.pad<=0){ k.pad=.8; if(k.eu){ SOM.fx('mola'); texto(k.x,k.y,'BOOST!','#fde047'); } } });
    OBJ.feno.concat(OBJ.cogumelos).forEach(function(f){ if(Math.abs(k.s-f.s)<40&&Math.abs(k.d-f.d)<26){ var sg=Math.sign(f.d), i=k.i, empurra=(26-Math.abs(k.d-f.d)); k.x-=TRK.nx[i]*sg*empurra; k.y-=TRK.ny[i]*sg*empurra; k.h+=angDif(TRK.h[i],k.h)*.4; k.v*=.9; if(k.eu&&k.wob<=0){ k.wob=.4; SOM.fx('pisao'); texto(k.x,k.y,'BOING!','#fde68a'); } } }); });
}
function derrubaMoedas(k){ var n=Math.min(2,k.moedas); k.moedas-=n; for(var i=0;i<n;i++) OBJ.moedas.push({s:k.s+80+i*40, d:k.d+(i?20:-20), vivo:true, solta:true}); }
/* ---------- resgate da fada: fora da pista tempo demais → de volta ao meio ---------- */
function resgate(k,dt){
  if(k.resg>0){ k.resg-=dt; if(k.resg<=0){ var p=pontoEm(k.s,0); k.x=p.x; k.y=p.y; k.h=p.h; k.b=0; k.v=VMAX*.45; k.fora=0; k.giro=0; } return; }
  if(k.fora>1.5){ k.resg=.6; k.fora=0; if(k.eu){ R.resgates++; fala('The fairy helps you back on the track!','A fada leva você de volta à pista!'); SOM.fx('destrava'); } }
}
/* ---------- pit stops ---------- */
function pits(dt){
  var me=R.me, pz=pitZona(me.s);
  if(pz&&!me.pitFeito[pz.pi]){ var sb=pz.P.sb, dd=sb-me.s; if(dd<420){ me.limite=Math.max(.08,dd/420); var alvoD=-(TRK.hw[me.i]-40); if(!R.auto) me.st=cl(me.st+cl((alvoD-me.d)*.02,-.5,.5),-1,1); } if(dd<=4){ me.v=0; me.pitFeito[pz.pi]=true; R.pitFeito[pz.pi]=true; me.limite=1; R.fase='box'; R.t=0; R.pitAtual=pz.pi; SOM.fx('checkpoint'); fala('Pit stop! The team is here!','Pit stop! A equipe chegou!'); } }
  else me.limite=1;
  R.rivais.forEach(function(r){ var z=pitZona(r.s); if(z&&!r.pitFeito[z.pi]&&r.s>=z.P.sb-6){ r.pitFeito[z.pi]=true; } }); /* rivais passam pela faixa do pit no limitador (o herói para no quiz, com o mundo congelado) */
}
function turboFinal(dt){ if(R.fase!=='corre'||R.latas<=0) return; var falta=(FIM_S-R.me.s)/VMAX;
  if(falta<2.8*R.latas+2){ R.autoT=(R.autoT||0)-dt; if(R.autoT<=0&&R.me.turbo<=0){ R.autoT=.3; usaTurbo(true); } }
  else if(falta<2.8*R.latas+6&&!R.avisoFinal){ R.avisoFinal=true; fala('USE YOUR TURBO! Press ▲!','USE O SEU TURBO! Aperte ▲!'); } }
function usaTurbo(auto){
  if(!R||R.acabou||R.fase!=='corre') return false;
  if(R.latas<=0){ if(!auto&&(!R.avisoSem||R.t-R.avisoSem>4)){ R.avisoSem=R.t; fala('No turbos yet! Answer right at the pit stop to win one.','Ainda sem turbo! Acerte no pit stop para ganhar um.'); } return false; }
  if(R.me.turbo>0) return false;
  var pz=pitZona(R.me.s); if(pz&&!R.me.pitFeito[pz.pi]){ return false; }
  R.latas--; R.me.turbo=2.5; SOM.fx('arremesso'); pintaTurbo(); fala(auto?'Your crew fires your turbo!':'TURBO!',auto?'A equipe dispara o seu turbo!':'TURBO!'); return true; }
/* ---------- o Conde Rabisco: na frente, solta tinta do tinteiro (a origem é ele) ---------- */
function conde(dt){
  var me=R.me; if(!R.conde){ if(me.s>CONDE_S&&CONDE_S>0){ var c0=novoCarro('count',me.s+420,0,false); c0.p={vmax:.88,grip:1,lado:.6,ruido:30}; c0.cor='#1e1b4b'; c0.tiro=1.5; R.conde=c0; SOM.fx('risada'); SOM.musica('chefao'); } return; }
  var C=R.conde; pilotoIA(C,dt,null); fisica(C,dt,1); resgate(C,dt);
  if(C.s>me.s+800) C.limite=.6; /* espera o herói */
  C.tiro-=dt; if(C.tiro<=0&&C.s>me.s&&C.s<FIM_S-900){ C.tiro=2.4; OBJ.tinta.push({s:C.s-40,d:C.d,r:28,nova:1}); SOM.fx('folha'); }
  OBJ.tinta.forEach(function(tt){ if(tt.nova>0) tt.nova-=dt; });
  if(!C.passado&&me.s>C.s+40){ C.passado=true; fala('You passed Count Scribble!','Você passou o Conde Rabisco!'); G.pontua(150); SOM.fx('acerto'); }
}
function eventos(){ var me=R.me, tg=TRK.tag[me.i];
  FALAS.forEach(function(f,i){ if(R.falou[i]) return; var ok=false;
    if(typeof f[0]==='number') ok=me.s>f[0];
    else if(f[0]==='grampo0') ok=!!tg.grampo; else if(f[0]==='pad') ok=OBJ.pads.length&&me.s>OBJ.pads[0].s-400; else if(f[0]==='pit0') ok=PIT_S[0]&&me.s>PIT_S[0].sb-1500;
    else if(f[0]==='chicane') ok=!!tg.chicane; else if(f[0]==='rampa') ok=RAMPAS[0]&&me.s>RAMPAS[0].s-500; else if(f[0]==='lama') ok=!!tg.lama; else if(f[0]==='ponte') ok=PONTES[0]&&me.s>PONTES[0].s0-400; else if(f[0]==='conde') ok=!!R.conde; else if(f[0]==='fim') ok=me.s>FIM_S-3400;
    if(ok){ R.falou[i]=true; fala(f[1],f[2]); } }); }
function camera(dt){
  var me=R.me, i=amostra(me.s+220), alvo=TRK.h[i], cam=R.cam; if(R.fase==='apresenta') return;
  var da=angDif(alvo,cam.a); cam.w+=(da*9-cam.w*6)*dt; cam.w=cl(cam.w,-1.4,1.4); cam.a+=cam.w*dt;
  cam.x+=(me.x-cam.x)*Math.min(1,dt*8); cam.y+=(me.y-cam.y)*Math.min(1,dt*8);
  var zA=(R.fase==='box'||(R.fase==='saida'))?1.8:(me.ar>0?1.15:1.3); /* carrinhos maiores na tela: dá para ver cada tema */ cam.z+=(zA-cam.z)*Math.min(1,dt*3);
}
function particulas(dt){ for(var i=R.pt.length-1;i>=0;i--){ var p=R.pt[i]; p.vida-=dt; if(p.vida<=0){ R.pt.splice(i,1); continue; } p.x+=p.vx*dt; p.y+=p.vy*dt; if(p.rot!==undefined) p.rot+=dt*8; if(p.tipo!=='texto'){ p.vx*=1-dt*2; p.vy*=1-dt*2; } }
  for(var j=R.marcas.length-1;j>=0;j--){ R.marcas[j].vida-=dt; if(R.marcas[j].vida<=0) R.marcas.splice(j,1); } }
function marca(k){ if(R.marcas.length>220) return; [-1,1].forEach(function(l){ R.marcas.push({x:k.x-Math.sin(k.h)*l*13,y:k.y+Math.cos(k.h)*l*13,vida:4}); }); }
function poeira(x,y,n,cor){ for(var i=0;i<n;i++) R.pt.push({x:x+(Math.random()-.5)*30,y:y+(Math.random()-.5)*30,vx:(Math.random()-.5)*120,vy:(Math.random()-.5)*120,vida:.6,max:.6,tipo:'po',cor:cor||'#e7e5e4',r:5+Math.random()*4}); }
function faiscas(p,n,cor){ for(var i=0;i<n;i++){ var a=Math.random()*TAU, v=80+Math.random()*160; R.pt.push({x:p.x,y:p.y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,vida:.4,max:.4,tipo:'faisca',cor:cor||'#fde047'}); } }
function texto(x,y,txt,cor){ R.pt.push({x:x,y:y,vx:0,vy:0,vida:1,max:1,tipo:'texto',txt:txt,cor:cor||'#fff',r:22}); }

/* ============================================================
   PIT STOP: o quiz (conceito + historinha + rápida)
   ============================================================ */
function abrePit(){
  var pi=R.pitAtual; R.fase='pit'; R.t=0; R.pitRes=[]; R.pitAnim=null;
  var itens=QUIZ.escolhe({tema:'realmb',mix:['conceito','leitura','rapida']},3,J.nivel.quizIds||[]);
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
  J.estado='corrida'; R.fase='saida'; R.t=0; R.tSaida=0;
  SOM.musica(R.conde?'chefao':'pista'); J.in.left=J.in.right=J.in.act=false;
  if(window.UI){ UI.quizBotoes(false); UI.modoNivel(true); } botoes(true);
  if(completo){ R.paginas++; var m=J.nivel.moradores[R.paginas-1]; if(m) m.feito=true; G.pontua(150); SOM.fx('vitoria'); G.toast('You found a lost page! ('+R.paginas+' of 3)',2600,'Você achou uma página perdida! ('+R.paginas+' de 3)'); }
  G.hud(); pintaTurbo();
  var n=R.latas; fala(n>0?('You have '+n+' TURBO'+(n>1?'S':'')+'! Press ▲ to use one!'):'No turbo this time. GO!',n>0?('Você tem '+n+' TURBO'+(n>1?'S':'')+'! Aperte ▲ para usar!'):'Sem turbo desta vez. Vai!');
}
/* ---------- pódio ---------- */
function montaPodio(){
  var lista=[{id:R.me.id,eu:true,s:R.me.s,cor:corHeroi()}]; R.rivais.forEach(function(r){ lista.push({id:r.id,s:r.s,cor:r.cor}); });
  lista.sort(function(a,b){ return b.s-a.s; }); var pos=Math.max(1,R.final||R.pos); lista=lista.filter(function(x){ return !x.eu; }); lista.splice(pos-1,0,{id:R.me.id,eu:true,cor:corHeroi()});
  R.podio={lista:lista.slice(0,3),pos:pos,t:0}; if(window.UI) UI.modoNivel(false);
  G.pontua(pos===1?300:(pos===2?200:(pos===3?150:100)));
  try{ say(pos<=3?['Gold medal!','Silver medal!','Bronze medal!'][pos-1]:'Finisher medal!'); }catch(e){}
}
function continua(){ if(!R||R.fase!=='podio'||R.podio.t<.6) return false; SOM.fx('clique'); termina(); return true; }
function termina(){ var f=R.f; botoes(false); if(window.UI) UI.modoCorrida(false); J.nivel.moradores.forEach(function(m,k){ m.feito=R.paginas>k; }); J.mundo=null; J.faseAtual=f; J.urso={estado:'cheer',anim:0}; R.acabou=true; J.corrida=null; G.fimDeFase(); }
function toque(lx,ly){ if(!R||R.acabou) return false; if(R.fase==='podio'){ continua(); return true; } if(R.fase==='apresenta'){ if(lx>W-260&&ly>H-80) largar(); else if(lx<200&&ly>H-80) largar(); return true; } return false; }
function tecla(k){ if(!R||R.acabou) return false; if(R.fase==='podio'&&(k==='Enter'||k===' '||k==='x'||k==='X')){ continua(); return true; }
  if(R.fase==='apresenta'){ if(k==='Enter'||k===' ') largar(); return true; }
  if(k==='x'||k==='X'||k==='Enter'||k===' '){ usaTurbo(); return true; } return false; }
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
function pneu(c,x,y,r,k){ c.fillStyle='rgba(0,0,0,.25)'; A.circ(c,x+3,y+4,r); c.fill(); c.fillStyle='#18181b'; A.circ(c,x,y,r); c.fill(); c.strokeStyle=(Math.floor(k/26)%2)?'#ef4444':'#f8fafc'; c.lineWidth=3; A.circ(c,x,y,r-3); c.stroke(); c.fillStyle='#52525b'; A.circ(c,x,y,r*.38); c.fill(); }
function quebra(c,txt,larg){ var pal=String(txt).split(' '), linhas=[], cur=''; pal.forEach(function(w){ var tt=cur?cur+' '+w:w; if(c.measureText(tt).width>larg&&cur){ linhas.push(cur); cur=w; } else cur=tt; }); if(cur) linhas.push(cur); return linhas; }

/* ============================================================
   DESENHO
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
  if(J.shake>0) c.translate((Math.random()-.5)*J.shake,(Math.random()-.5)*J.shake);
  desenha(c);
  if(J.quiz&&window.QUIZ){ QUIZ.desenhaTela(c,J.t); molduraPit(c,J.t); }
  if(J.fimFase){ var k=Math.min(1,J.fimFase.t/.8); c.fillStyle='rgba(13,11,30,'+(k*.35)+')'; c.fillRect(0,0,W,H); }
  if(J.flash>0){ c.fillStyle='rgba(255,255,255,'+(J.flash*.5)+')'; c.fillRect(0,0,W,H); }
  if(J.trans) A.iris(c,J.trans.x,J.trans.y,G.raioIris());
  c.restore();
}
/* mundo → tela (para textos que não podem girar com a câmera) */
function tela(x,y){ var cam=R.cam, dx=x-cam.x, dy=y-cam.y, a=-cam.a-PI/2, ca=Math.cos(a), sa=Math.sin(a); return {x:W/2+(dx*ca-dy*sa)*cam.z, y:CAR_Y+(dx*sa+dy*ca)*cam.z}; }
function desenha(c){
  if(!R) return; var t=J.t;
  if(R.fase==='apresenta'){ apresentacao(c,t); return; }
  var cam=R.cam;
  c.fillStyle='#4ade80'; c.fillRect(0,0,W,H);
  c.save(); c.translate(W/2,CAR_Y); c.scale(cam.z,cam.z); c.rotate(-cam.a-PI/2); c.translate(-cam.x,-cam.y);
  var vis=visiveis();
  chao(c,t); aguas(c,t,vis); estrada(c,t,vis); objetos(c,t); marcas(c); decor(c,t); carros(c,t); particulasMundo(c,t);
  c.restore();
  etiquetas(c,t);
  hud(c,t);
  if(R.fase==='largada') largada(c,t);
  if(R.goT>0) textoGrande(c,'GO!','#4ade80',1-R.goT/.9);
  if(R.fase==='podio') podio(c,t);
}
/* trechos da pista perto da câmera (em corridas: índices) */
function visiveis(){ var cam=R.cam, r2=Math.pow(820/cam.z,2), runs=[], a=-1;
  for(var i=0;i<TRK.n;i+=3){ var dx=TRK.x[i]-cam.x, dy=TRK.y[i]-cam.y, dentro=dx*dx+dy*dy<r2; if(dentro&&a<0) a=Math.max(0,i-3); if(!dentro&&a>=0){ runs.push([a,Math.min(TRK.n-1,i+3)]); a=-1; } }
  if(a>=0) runs.push([a,TRK.n-1]); return runs; }
/* grama listrada (faixas de corte em diagonal, presas ao mundo) */
function chao(c,t){ var cam=R.cam, B=140, R0=900/cam.z, x0=Math.floor((cam.x-R0)/B), x1=Math.floor((cam.x+R0)/B), y0=Math.floor((cam.y-R0)/B), y1=Math.floor((cam.y+R0)/B);
  for(var i=x0;i<=x1;i++) for(var j=y0;j<=y1;j++){ c.fillStyle=((i+j)%2+2)%2?'#4ade80':'#46d27a'; c.fillRect(i*B,j*B,B+1,B+1);
    var h=hash(i*31+j*17); if(h>.55){ c.fillStyle='rgba(21,128,61,.3)'; A.el(c,i*B+h*B,j*B+hash(i+j*3)*B,7,3); c.fill(); } if(h>.86){ c.fillStyle=['#fde047','#f472b6','#fff'][Math.floor(h*30)%3]; A.circ(c,i*B+hash(j)*B,j*B+h*90,2.6); c.fill(); } } }
function borda(i,d){ return {x:TRK.x[i]+TRK.nx[i]*d, y:TRK.y[i]+TRK.ny[i]*d}; }
function faixa(c,a,b,d0,d1){ c.beginPath(); for(var i=a;i<=b;i++){ var p=borda(i,d0(i)); c.lineTo(p.x,p.y); } for(var j=b;j>=a;j--){ var q=borda(j,d1(j)); c.lineTo(q.x,q.y); } c.closePath(); }
function ilim(s){ return amostra(s); }
/* riachos (o salto) e o rio da ponte: água atravessando a pista */
function aguas(c,t,vis){
  RIACHOS.concat(PONTES.map(function(p){ return {s0:p.s0-60,s1:p.s1+60,rio:true}; })).forEach(function(w){ var a=ilim(w.s0), b=ilim(w.s1); if(!perto(a,b,vis)) return;
    var g=c.createLinearGradient(TRK.x[a],TRK.y[a],TRK.x[b],TRK.y[b]); g.addColorStop(0,'#0ea5e9'); g.addColorStop(.5,'#0284c7'); g.addColorStop(1,'#0ea5e9');
    c.fillStyle='#fcd34d'; faixa(c,Math.max(0,a-4),Math.min(TRK.n-1,b+4),function(i){ return -TRK.hw[i]-260; },function(i){ return TRK.hw[i]+260; }); c.fill();
    c.fillStyle=g; faixa(c,a,b,function(i){ return -TRK.hw[i]-250; },function(i){ return TRK.hw[i]+250; }); c.fill();
    c.strokeStyle='rgba(255,255,255,.4)'; c.lineWidth=2.5; for(var i=a;i<=b;i+=6){ for(var d=-300;d<300;d+=70){ var p=borda(i,d+Math.sin(t*1.5+i)*12); c.beginPath(); c.moveTo(p.x,p.y); c.lineTo(p.x+TRK.tx[i]*14,p.y+TRK.ty[i]*14); c.stroke(); } } });
}
function perto(a,b,vis){ for(var k=0;k<vis.length;k++){ if(b>=vis[k][0]&&a<=vis[k][1]) return true; } return false; }
function estrada(c,t,vis){
  vis.forEach(function(rn){ var a=rn[0], b=rn[1];
    /* acostamento + asfalto */
    c.fillStyle='#3f3f46'; faixa(c,a,b,function(i){ return -TRK.hw[i]-12; },function(i){ return TRK.hw[i]+12; }); c.fill();
    c.fillStyle='#575f6b'; faixa(c,a,b,function(i){ return -TRK.hw[i]; },function(i){ return TRK.hw[i]; }); c.fill();
    /* ponte: tábuas e guarda-corpo */
    for(var i=a;i<b;i++){ var tg=TRK.tag[i];
      if(tg.ponte){ c.fillStyle=(Math.floor(TRK.s[i]/16)%2)?'#b45309':'#a16207'; var p0=borda(i,-TRK.hw[i]-8), p1=borda(i,TRK.hw[i]+8), p2=borda(i+1,TRK.hw[i+1]+8), p3=borda(i+1,-TRK.hw[i+1]-8); c.beginPath(); c.moveTo(p0.x,p0.y); c.lineTo(p1.x,p1.y); c.lineTo(p2.x,p2.y); c.lineTo(p3.x,p3.y); c.closePath(); c.fill(); }
      /* riacho: a pista some (água) */
      if(tg.riacho){ continue; }
      /* zebras */
      var zz=(Math.floor(TRK.s[i]/24)%2)?'#ef4444':'#f8fafc';
      [-1,1].forEach(function(l){ var zebra=(tg.zi&&l===-Math.sign(TRK.k[i]||1))||(tg.zo&&l===Math.sign(TRK.k[i]||1));
        var q0=borda(i,l*(TRK.hw[i]-(zebra?14:3))), q1=borda(i,l*(TRK.hw[i]+(zebra?2:0))), q2=borda(i+1,l*(TRK.hw[i+1]+(zebra?2:0))), q3=borda(i+1,l*(TRK.hw[i+1]-(zebra?14:3)));
        c.fillStyle=zebra?zz:(tg.ponte?'#78350f':'rgba(255,255,255,.85)'); c.beginPath(); c.moveTo(q0.x,q0.y); c.lineTo(q1.x,q1.y); c.lineTo(q2.x,q2.y); c.lineTo(q3.x,q3.y); c.closePath(); c.fill(); });
      /* tracejado central */
      if(!tg.ponte&&tg.pit===undefined&&(Math.floor(TRK.s[i]/60)%2)===0){ var m0=borda(i,-2), m1=borda(i+1,-2), m2=borda(i+1,2), m3=borda(i,2); c.fillStyle='rgba(255,255,255,.55)'; c.beginPath(); c.moveTo(m0.x,m0.y); c.lineTo(m1.x,m1.y); c.lineTo(m2.x,m2.y); c.lineTo(m3.x,m3.y); c.closePath(); c.fill(); }
    }
    /* guarda-corpo da ponte */
    c.strokeStyle='#78350f'; c.lineWidth=6; [-1,1].forEach(function(l){ c.beginPath(); var on=false; for(var j=a;j<=b;j++){ if(TRK.tag[j].ponte){ var p=borda(j,l*(TRK.hw[j]+8)); if(!on){ c.moveTo(p.x,p.y); on=true; } else c.lineTo(p.x,p.y); } else on=false; } c.stroke(); });
  });
  /* largada e chegada quadriculadas */
  quadriculado(c,640,2); quadriculado(c,FIM_S,3);
  /* rampas: madeira com setas */
  RAMPAS.forEach(function(rp){ var a=ilim(rp.s), b=ilim(rp.s1); c.fillStyle='#d97706'; faixa(c,a,b,function(i){ return -TRK.hw[i]-4; },function(i){ return TRK.hw[i]+4; }); c.fill();
    c.strokeStyle='rgba(120,53,15,.6)'; c.lineWidth=2; for(var i=a;i<=b;i+=2){ var p=borda(i,-TRK.hw[i]), q=borda(i,TRK.hw[i]); c.beginPath(); c.moveTo(p.x,p.y); c.lineTo(q.x,q.y); c.stroke(); }
    for(var k=-1;k<=1;k++){ var mid=ilim((rp.s+rp.s1)/2), ce=borda(mid,k*55); seta(c,ce.x,ce.y,TRK.h[mid],'#fde68a',16); } });
  /* pit stops: placa, caixa amarela, pneus e garagem */
  PIT_S.forEach(function(P,pi){ var ib=ilim(P.sb), bx=borda(ib,-(TRK.hw[ib]-40));
    c.save(); c.translate(bx.x,bx.y); c.rotate(TRK.h[ib]); c.fillStyle='rgba(253,224,71,.95)'; rr(c,-50,-30,100,60,8); c.fill(); c.strokeStyle='#1c1917'; c.lineWidth=4; rr(c,-50,-30,100,60,8); c.stroke(); c.fillStyle='#1c1917'; c.font=F(900,22); c.textAlign='center'; c.textBaseline='middle'; c.save(); c.rotate(PI/2); c.fillText('BOX',0,0); c.restore(); c.restore();
    var gx=borda(ib,-(TRK.hw[ib]+90)); c.save(); c.translate(gx.x,gx.y); c.rotate(TRK.h[ib]); c.fillStyle='#57534e'; c.fillRect(-90,-40,180,80); c.fillStyle=['#3b82f6','#16a34a','#f59e0b'][pi]; c.fillRect(-84,-34,168,68); c.fillStyle='rgba(255,255,255,.25)'; for(var k2=0;k2<6;k2++) c.fillRect(-84+k2*30,-34,14,68); c.restore();
    for(var s2=P.sb-1000;s2<P.sb+380;s2+=60){ var ip=ilim(s2), pe=borda(ip,TRK.hw[ip]+18), pd=borda(ip,-(TRK.hw[ip]+18)); pneu(c,pe.x,pe.y,10,s2); if(s2<P.sb-160||s2>P.sb+160) pneu(c,pd.x,pd.y,10,s2+1); }
    [P.sb-1100,P.sb-700].forEach(function(sp){ var iq=ilim(sp), pp=borda(iq,-(TRK.hw[iq]+50)); c.save(); c.translate(pp.x,pp.y); c.rotate(TRK.h[iq]+PI/2); c.fillStyle='#78350f'; c.fillRect(-3,0,6,30); c.fillStyle='#fde047'; rr(c,-34,-30,68,30,6); c.fill(); c.fillStyle='#1c1917'; c.font=F(900,16); c.textAlign='center'; c.textBaseline='middle'; c.fillText('PIT ▶',0,-15); c.restore(); }); });
}
function seta(c,x,y,h,cor,s){ c.save(); c.translate(x,y); c.rotate(h); c.fillStyle=cor; c.beginPath(); c.moveTo(s,0); c.lineTo(-s*.4,-s*.8); c.lineTo(-s*.1,0); c.lineTo(-s*.4,s*.8); c.closePath(); c.fill(); c.restore(); }
function quadriculado(c,s,linhas){ var i=ilim(s), q=16; for(var r=0;r<linhas;r++) for(var k=-Math.ceil(TRK.hw[i]/q);k<Math.ceil(TRK.hw[i]/q);k++){ var p=borda(i,k*q); c.save(); c.translate(p.x+TRK.tx[i]*r*q,p.y+TRK.ty[i]*r*q); c.rotate(TRK.h[i]); c.fillStyle=(k+r)%2?'#111827':'#f8fafc'; c.fillRect(0,0,q,q); c.restore(); } }
function pneuMundo(c,x,y){ pneu(c,x,y,10,x); }
function objetos(c,t){
  var cam=R.cam, R2=Math.pow(850/cam.z,2); function ve(p){ var dx=p.x-cam.x, dy=p.y-cam.y; return dx*dx+dy*dy<R2; }
  OBJ.lama.forEach(function(l){ var p=pontoEm(l.s,l.d); if(!ve(p)) return; c.save(); c.translate(p.x,p.y); c.rotate(p.h); c.fillStyle='#78350f'; A.el(c,0,0,l.r,l.r*.75); c.fill(); c.fillStyle='#92400e'; A.el(c,-8,-6,l.r*.6,l.r*.4); c.fill(); c.fillStyle='rgba(254,243,199,.3)'; A.circ(c,10,6,5); c.fill(); A.circ(c,-14,10,3); c.fill(); c.restore(); });
  OBJ.tinta.forEach(function(tt){ var p=pontoEm(tt.s,tt.d); if(!ve(p)) return; var k=tt.nova>0?1-tt.nova/1:1; c.save(); c.translate(p.x,p.y); c.scale(k,k); c.fillStyle='#312e81'; A.el(c,0,0,tt.r,tt.r*.8); c.fill(); c.fillStyle='#4338ca'; A.el(c,-6,-5,tt.r*.5,tt.r*.35); c.fill(); for(var q=0;q<5;q++){ A.circ(c,Math.cos(q*1.3)*tt.r*1.1,Math.sin(q*1.3)*tt.r*.9,4); c.fill(); } c.restore(); });
  OBJ.pads.forEach(function(pd){ var p=pontoEm(pd.s,pd.d); if(!ve(p)) return; c.save(); c.translate(p.x,p.y); c.rotate(p.h); c.fillStyle='rgba(250,204,21,.9)'; rr(c,-30,-28,60,56,10); c.fill(); for(var k=0;k<3;k++){ var a=.55+.45*Math.sin(t*10-k); c.fillStyle='rgba(234,88,12,'+a+')'; c.beginPath(); c.moveTo(-20+k*16,-18); c.lineTo(-6+k*16,0); c.lineTo(-20+k*16,18); c.lineTo(-26+k*16,18); c.lineTo(-12+k*16,0); c.lineTo(-26+k*16,-18); c.closePath(); c.fill(); } c.restore(); });
  OBJ.moedas.forEach(function(m){ if(!m.vivo) return; var p=pontoEm(m.s,m.d); if(!ve(p)) return; var w=Math.abs(Math.cos(t*4+m.s*.01)); c.fillStyle='rgba(0,0,0,.2)'; A.el(c,p.x+3,p.y+4,9,4); c.fill(); c.fillStyle='#f59e0b'; A.el(c,p.x,p.y,10*w+2,10); c.fill(); c.fillStyle='#fde047'; A.el(c,p.x,p.y,7*w+1,7); c.fill(); });
  OBJ.feno.forEach(function(f){ var p=pontoEm(f.s,f.d); if(!ve(p)) return; c.save(); c.translate(p.x,p.y); c.rotate(p.h); c.fillStyle='rgba(0,0,0,.2)'; rr(c,-18,-11,40,26,6); c.fill(); c.fillStyle=A.lin(c,-20,0,20,0,'#fde68a','#d97706'); rr(c,-20,-13,40,26,6); c.fill(); c.strokeStyle='rgba(146,64,14,.5)'; c.lineWidth=1.5; for(var k=-14;k<=14;k+=7){ c.beginPath(); c.moveTo(k,-12); c.lineTo(k+2,12); c.stroke(); } c.restore(); });
  OBJ.cogumelos.forEach(function(g){ var p=pontoEm(g.s,g.d); if(!ve(p)) return; var b=1+.06*Math.sin(t*5+g.s); c.save(); c.translate(p.x,p.y); c.scale(b,b); c.fillStyle='rgba(0,0,0,.2)'; A.circ(c,3,4,17); c.fill(); c.fillStyle='#dc2626'; A.circ(c,0,0,17); c.fill(); c.fillStyle='#fff'; [[-7,-5,4],[6,-7,3],[3,6,4],[-6,7,2.5]].forEach(function(q){ A.circ(c,q[0],q[1],q[2]); c.fill(); }); c.restore(); });
  /* arquibancadas com torcida */
  OBJ.arq.forEach(function(a){ var p=borda(a.i,a.lado*(TRK.hw[a.i]+70)); if(!ve(p)) return; c.save(); c.translate(p.x,p.y); c.rotate(TRK.h[a.i]); c.fillStyle='#94a3b8'; c.fillRect(-160,-40,320,80); for(var r2=0;r2<4;r2++){ c.fillStyle=r2%2?'#cbd5e1':'#e2e8f0'; c.fillRect(-160,-40+r2*20,320,18); for(var k3=0;k3<20;k3++){ var hh=hash(a.i*7+r2*31+k3); c.fillStyle=['#ef4444','#3b82f6','#fde047','#22c55e','#f97316','#ec4899'][Math.floor(hh*6)]; A.circ(c,-152+k3*16,-31+r2*20+Math.sin(t*(6+hh*4)+k3)*1.5*(hh>.5?1:0),5); c.fill(); } } c.restore(); });
}
function decor(c,t){ var cam=R.cam, R2=Math.pow(860/cam.z,2);
  OBJ.decor.forEach(function(d){ var dx=d.x-cam.x, dy=d.y-cam.y; if(dx*dx+dy*dy>R2) return; c.save(); c.translate(d.x,d.y);
    if(d.tipo==='arvore'){ var s=.9+hash(d.k)*.5; c.scale(s,s); c.fillStyle='rgba(0,0,0,.2)'; A.circ(c,8,10,28); c.fill(); c.fillStyle='#166534'; A.circ(c,0,0,28); c.fill(); c.fillStyle='#15803d'; A.circ(c,-8,-6,19); c.fill(); A.circ(c,10,-2,17); c.fill(); c.fillStyle='#22c55e'; A.circ(c,-7,-9,11); c.fill(); if(hash(d.k*3)<.35){ c.fillStyle='#ef4444'; [[-10,4],[8,8],[2,-14]].forEach(function(q){ A.circ(c,q[0],q[1],3); c.fill(); }); } }
    else if(d.tipo==='pinheiro'){ c.fillStyle='rgba(0,0,0,.2)'; A.circ(c,6,8,22); c.fill(); [[22,'#14532d'],[15,'#166534'],[8,'#22c55e']].forEach(function(l){ c.fillStyle=l[1]; c.beginPath(); for(var k=0;k<14;k++){ var a=k/14*TAU, r=k%2?l[0]*.7:l[0]; c.lineTo(Math.cos(a)*r,Math.sin(a)*r); } c.closePath(); c.fill(); }); }
    else if(d.tipo==='arbusto'){ c.fillStyle='#15803d'; A.circ(c,-8,0,10); c.fill(); A.circ(c,7,1,11); c.fill(); A.circ(c,0,-6,10); c.fill(); c.fillStyle='#f472b6'; A.circ(c,5,-4,2.5); c.fill(); }
    else if(d.tipo==='flores'){ for(var f=0;f<5;f++){ c.fillStyle=['#fde047','#f472b6','#fff','#a78bfa'][f%4]; A.circ(c,Math.cos(f*1.3)*12,Math.sin(f*1.7)*10,3.5); c.fill(); } }
    else { c.fillStyle='#fef3c7'; c.fillRect(-3,-2,6,10); c.fillStyle='#dc2626'; A.circ(c,0,-3,9); c.fill(); c.fillStyle='#fff'; A.circ(c,-3,-5,2); c.fill(); A.circ(c,4,-2,1.6); c.fill(); }
    c.restore(); }); }
function marcas(c){ c.fillStyle='rgba(30,27,46,.35)'; R.marcas.forEach(function(m){ c.globalAlpha=Math.min(1,m.vida/2)*.5; A.circ(c,m.x,m.y,3); c.fill(); }); c.globalAlpha=1; }
function desenhaCarro(c,k,t){
  if(k.resg>0){ var a=k.resg/.6; c.save(); c.globalAlpha=.4+.6*a; } else c.save();
  var wob=k.wob>0?Math.sin(t*40)*.12:0, arK=k.ar>0?Math.min(1,k.ar*2):0;
  c.translate(k.x,k.y); c.rotate(k.h+wob);
  CR.desenha(c,k.id,{cor:k.eu?corHeroi():(k.cor||'#888'),cap:k.eu?corHeroi():null,st:cl(k.st,-1,1)*.45,t:t,rol:k.rol,ar:arK,turbo:k.turbo>0||k.pad>0,eu:k.eu,giro:k.s*.3});
  c.restore();
  if(k.resg>0){ c.save(); c.translate(k.x,k.y); for(var i=0;i<6;i++){ var aa=t*6+i; A.estrela(c,Math.cos(aa)*30,Math.sin(aa)*30,5,'#fde047',aa); } c.restore(); }
  if(k.vac>0&&k.eu){ c.save(); c.translate(k.x,k.y); c.rotate(k.h); c.strokeStyle='rgba(255,255,255,.7)'; c.lineWidth=2; for(var j=0;j<4;j++){ var o=(t*300+j*40)%120; c.beginPath(); c.moveTo(-o,-22+j*14); c.lineTo(-o-26,-22+j*14); c.stroke(); } c.restore(); }
}
function carros(c,t){ var lst=R.rivais.slice(); if(R.conde) lst.push(R.conde); lst.push(R.me);
  lst.sort(function(a,b){ return (a.ar>0?1:0)-(b.ar>0?1:0); }).forEach(function(k){ var dx=k.x-R.cam.x, dy=k.y-R.cam.y; if(dx*dx+dy*dy<Math.pow(900/R.cam.z,2)) desenhaCarro(c,k,t); }); }
function particulasMundo(c,t){ R.pt.forEach(function(p){ if(p.tipo==='texto') return; var k=p.vida/p.max; c.save(); c.globalAlpha=Math.min(1,k*1.6);
  switch(p.tipo){ case 'po': c.fillStyle=p.cor; A.circ(c,p.x,p.y,p.r*(1.6-k*.6)); c.fill(); break; case 'grama': c.fillStyle=p.cor; c.fillRect(p.x,p.y,3,5); break; case 'agua': c.fillStyle='#e0f2fe'; A.circ(c,p.x,p.y,p.r); c.fill(); break;
    case 'faisca': c.strokeStyle=p.cor; c.lineWidth=2; c.beginPath(); c.moveTo(p.x,p.y); c.lineTo(p.x-p.vx*.04,p.y-p.vy*.04); c.stroke(); break; case 'confete': c.translate(p.x,p.y); c.rotate(p.rot); c.fillStyle=p.cor; c.fillRect(-4,-2,8,4); break; }
  c.restore(); }); }
/* etiquetas e textos SEMPRE de pé (fora da rotação da câmera) */
function etiquetas(c,t){
  R.rivais.forEach(function(r){ var p=tela(r.x,r.y), dentro=p.x>-20&&p.x<W+20&&p.y>40&&p.y<H; if(dentro&&!r.naTela) r.tag=2.5; r.naTela=dentro; if(r.tag>0) r.tag-=1/60;
    if(dentro&&r.tag>0){ c.save(); c.globalAlpha=Math.min(1,r.tag*2); c.font=F(900,13); var tw=c.measureText(r.nome).width+14; c.fillStyle='rgba(13,11,30,.72)'; rr(c,p.x-tw/2,p.y+26,tw,19,9); c.fill(); c.fillStyle='#fff'; c.textAlign='center'; c.textBaseline='middle'; c.fillText(r.nome,p.x,p.y+36); c.restore(); } });
  if(R.conde){ var pc=tela(R.conde.x,R.conde.y); if(pc.y>40&&pc.y<H){ c.font=F(900,13); var nm='Count Scribble', tw=c.measureText(nm).width+16; c.fillStyle='rgba(76,29,149,.9)'; rr(c,pc.x-tw/2,pc.y+28,tw,20,10); c.fill(); c.fillStyle='#fde68a'; c.textAlign='center'; c.textBaseline='middle'; c.fillText(nm,pc.x,pc.y+38.5); } }
  var me=tela(R.me.x,R.me.y); if(R.fase!=='podio'){ var yb=me.y-48+Math.sin(t*6)*3; c.fillStyle='#fde047'; c.strokeStyle='#78350f'; c.lineWidth=2; c.beginPath(); c.moveTo(me.x,yb+10); c.lineTo(me.x-8,yb); c.lineTo(me.x+8,yb); c.closePath(); c.fill(); c.stroke(); c.font=F(900,12); c.fillStyle='rgba(234,179,8,.95)'; rr(c,me.x-18,yb-17,36,16,8); c.fill(); c.fillStyle='#1e1b3a'; c.textAlign='center'; c.textBaseline='middle'; c.fillText('YOU',me.x,yb-8.5); }
  R.pt.forEach(function(p){ if(p.tipo!=='texto') return; var q=tela(p.x,p.y), k=p.vida/p.max; c.save(); c.globalAlpha=Math.min(1,k*1.6); c.font=F(900,p.r); c.textAlign='center'; c.textBaseline='middle'; c.lineWidth=5; c.strokeStyle='rgba(13,11,30,.75)'; c.strokeText(p.txt,q.x,q.y-30-(1-k)*30); c.fillStyle=p.cor; c.fillText(p.txt,q.x,q.y-30-(1-k)*30); c.restore(); });
}
function textoGrande(c,txt,cor,k){ c.save(); c.translate(W/2,H/2-60); var s=1.4-.4*suave(k); c.scale(s,s); c.globalAlpha=1-k; c.font=F(900,96); c.textAlign='center'; c.textBaseline='middle'; c.lineWidth=10; c.strokeStyle='rgba(13,11,30,.8)'; c.strokeText(txt,0,0); c.fillStyle=cor; c.fillText(txt,0,0); c.restore(); }
function largada(c,t){
  var n=Math.floor(R.t/.8), txt=n<3?String(3-n):'GO!', k=(R.t%.8)/.8;
  c.save(); c.translate(W/2,H/2-80); for(var i=0;i<3;i++){ c.fillStyle='#111827'; A.circ(c,-60+i*60,0,24); c.fill(); c.fillStyle=n>i?(n>=3?'#22c55e':'#ef4444'):'#374151'; A.circ(c,-60+i*60,0,18); c.fill(); } c.restore();
  c.save(); c.translate(W/2,H/2); var s=1.4-.4*suave(k); c.scale(s,s); c.font=F(900,80); c.textAlign='center'; c.textBaseline='middle'; c.lineWidth=10; c.strokeStyle='rgba(13,11,30,.8)'; c.strokeText(txt,0,0); c.fillStyle=n<3?'#fde047':'#4ade80'; c.fillText(txt,0,0); c.restore();
  c.fillStyle='rgba(13,11,30,.7)'; rr(c,W/2-230,H-62,460,42,21); c.fill(); c.fillStyle='#fde68a'; c.font=F(900,18); c.textAlign='center'; c.textBaseline='middle'; c.fillText('Hold ◀ ▶ to steer  ·  ▲ = TURBO',W/2,H-41);
}
/* ---------- HUD ---------- */
function hud(c,t){
  var px=W-158, py=62, pul=R.posPulse>0?1+.15*Math.sin(R.posPulse*20):1;
  c.fillStyle='rgba(13,11,30,.72)'; rr(c,px,py,144,66,16); c.fill(); c.strokeStyle='rgba(253,224,71,.6)'; c.lineWidth=2; rr(c,px,py,144,66,16); c.stroke();
  c.fillStyle='#fde68a'; c.font=F(900,12); c.textAlign='left'; c.textBaseline='top'; c.fillText('POSITION',px+14,py+8);
  c.save(); c.translate(px+12,py+20); c.scale(pul,pul); c.fillStyle='#fff'; c.font=F(900,44); c.fillText(ord(R.pos),0,0); c.restore();
  c.fillStyle='rgba(255,255,255,.6)'; c.font=F(900,16); c.textAlign='right'; c.fillText('/ 10',px+134,py+40);
  /* moedas: cada uma deixa o carrinho um pouco mais rápido (até 10) */
  var my=py+74; c.fillStyle='rgba(13,11,30,.6)'; rr(c,px,my,144,30,14); c.fill(); c.fillStyle='#fde68a'; c.font=F(900,11); c.textAlign='left'; c.textBaseline='middle'; c.fillText('SPEED',px+8,my+15);
  for(var k=0;k<10;k++){ c.fillStyle=k<R.me.moedas?'#fde047':'rgba(255,255,255,.2)'; A.circ(c,px+56+k*8.6,my+15,3.6); c.fill(); }
  /* minimapa */
  minimapa(c,12,236,150,120);
  /* aviso do pit */
  var pz=null; for(var i=0;i<PIT_S.length;i++){ if(!R.me.pitFeito[i]&&R.me.s>PIT_S[i].sb-1800&&R.me.s<PIT_S[i].sb) pz=PIT_S[i]; }
  if(pz&&R.fase==='corre'){ var a=.7+.3*Math.sin(t*9); c.save(); c.globalAlpha=a; c.fillStyle='#fde047'; rr(c,W/2-150,H-58,300,40,20); c.fill(); c.fillStyle='#1c1917'; c.font=F(900,20); c.textAlign='center'; c.textBaseline='middle'; c.fillText('PIT STOP ▶  '+Math.max(1,Math.ceil((pz.sb-R.me.s)/VMAX))+' s',W/2,H-38); c.restore(); }
  /* locutor */
  var f=R.fala; if(f&&f.t<3.4&&R.fase!=='podio'&&R.fase!=='pit'){ var al=Math.min(1,f.t*6,(3.4-f.t)*3);
    c.save(); c.globalAlpha=al; c.save(); c.translate(60,206); c.scale(.72,.72); A.morador(c,'announcer',0,0,t,1,f.t<2); c.restore();
    c.font=F(900,18); var l1=quebra(c,f.en,470); c.font=F(700,13); var l2=J.tr&&f.pt?quebra(c,f.pt,470):[];
    var bw=0; c.font=F(900,18); l1.forEach(function(l){ bw=Math.max(bw,c.measureText(l).width); }); c.font=F(700,13); l2.forEach(function(l){ bw=Math.max(bw,c.measureText(l).width); }); bw+=30;
    var bh=14+l1.length*22+(l2.length?l2.length*17+4:0), bx=104, by=64;
    c.fillStyle='#fff'; rr(c,bx,by,bw,bh,16); c.fill(); c.beginPath(); c.moveTo(bx+18,by+bh-2); c.lineTo(bx+2,by+bh+14); c.lineTo(bx+34,by+bh-2); c.closePath(); c.fill();
    c.fillStyle='#1e1b3a'; c.textAlign='left'; c.textBaseline='top'; c.font=F(900,18); l1.forEach(function(l,k){ c.fillText(l,bx+15,by+8+k*22); });
    if(l2.length){ c.fillStyle='#6b5d4f'; c.font=F(700,13); l2.forEach(function(l,k){ c.fillText(l,bx+15,by+11+l1.length*22+k*17); }); } c.restore(); }
  /* turbo: linhas de velocidade só nas laterais */
  if(R.me.turbo>0||R.me.pad>0){ c.strokeStyle='rgba(255,255,255,.55)'; c.lineWidth=3; for(var s2=0;s2<12;s2++){ var hx=hash(s2+Math.floor(t*12)), lx=s2%2?hx*120:W-hx*120, ly=(t*900+s2*97)%H; c.beginPath(); c.moveTo(lx,ly); c.lineTo(lx,ly+60); c.stroke(); } }
  if(R.anunc){ var ka=R.anunc.t, sc=1+.4*Math.max(0,1-ka/.25); c.save(); c.globalAlpha=Math.min(1,(1.3-ka)*3); c.translate(W/2,250); c.scale(sc,sc); c.font=F(900,46); c.textAlign='center'; c.textBaseline='middle'; c.lineWidth=9; c.strokeStyle='rgba(13,11,30,.85)'; c.strokeText(R.anunc.txt,0,0); c.fillStyle=R.anunc.cor; c.fillText(R.anunc.txt,0,0); if(J.tr&&R.anunc.pt){ c.font=F(700,16); c.lineWidth=5; c.strokeText(R.anunc.pt,0,34); c.fillStyle='#fde68a'; c.fillText(R.anunc.pt,0,34); } c.restore(); }
}
/* minimapa: a pista inteira, os carrinhos como bolinhas (o herói pisca) */
var MINI=null;
function minimapa(c,x,y,w,h){
  if(!MINI){ var x0=1e9,x1=-1e9,y0=1e9,y1=-1e9; for(var i=0;i<TRK.n;i+=4){ x0=Math.min(x0,TRK.x[i]); x1=Math.max(x1,TRK.x[i]); y0=Math.min(y0,TRK.y[i]); y1=Math.max(y1,TRK.y[i]); } MINI={x0:x0,y0:y0,s:Math.min((w-16)/(x1-x0),(h-16)/(y1-y0)),w:(x1-x0),h:(y1-y0)}; }
  var M=MINI, ox=x+(w-M.w*M.s)/2, oy=y+(h-M.h*M.s)/2; function P(px,py){ return [ox+(px-M.x0)*M.s, oy+(py-M.y0)*M.s]; }
  c.fillStyle='rgba(13,11,30,.55)'; rr(c,x,y,w,h,14); c.fill();
  c.strokeStyle='rgba(255,255,255,.75)'; c.lineWidth=4; c.beginPath(); for(var i=0;i<TRK.n;i+=8){ var p=P(TRK.x[i],TRK.y[i]); if(i===0) c.moveTo(p[0],p[1]); else c.lineTo(p[0],p[1]); } c.stroke();
  PIT_S.forEach(function(Pt){ var i2=amostra(Pt.sb), p=P(TRK.x[i2],TRK.y[i2]); c.fillStyle='#fde047'; A.circ(c,p[0],p[1],3.5); c.fill(); });
  var pf=P(TRK.x[amostra(FIM_S)],TRK.y[amostra(FIM_S)]); c.fillStyle='#fff'; c.fillRect(pf[0]-4,pf[1]-4,8,8); c.fillStyle='#111'; c.fillRect(pf[0]-4,pf[1]-4,4,4); c.fillRect(pf[0],pf[1],4,4);
  R.rivais.forEach(function(r){ var p=P(r.x,r.y); c.fillStyle=r.cor; A.circ(c,p[0],p[1],3); c.fill(); });
  var pm=P(R.me.x,R.me.y); c.fillStyle=Math.floor(J.t*4)%2?'#fde047':corHeroi(); A.circ(c,pm[0],pm[1],4.5); c.fill(); c.strokeStyle='#fff'; c.lineWidth=1.5; A.circ(c,pm[0],pm[1],4.5); c.stroke();
}

/* ============================================================
   APRESENTAÇÃO: os carrinhos descem a rampa de largada, um a um
   (Red Bull Soapbox: cada equipe se apresenta no alto da rampa)
   ============================================================ */
function apresentacao(c,t){
  var g=c.createLinearGradient(0,0,0,H); g.addColorStop(0,'#7dd3fc'); g.addColorStop(.42,'#bae6fd'); g.addColorStop(.43,'#86efac'); g.addColorStop(1,'#22c55e'); c.fillStyle=g; c.fillRect(0,0,W,H);
  /* castelo ao fundo, torcida e bandeirolas */
  c.fillStyle='#e9d5ff'; c.fillRect(70,70,120,110); for(var k=0;k<5;k++) c.fillRect(70+k*26,58,14,14); c.fillStyle='#c4b5fd'; c.fillRect(110,40,40,140); c.fillStyle='#a78bfa'; c.beginPath(); c.moveTo(104,40); c.lineTo(130,4); c.lineTo(156,40); c.fill();
  for(var r=0;r<3;r++) for(var q=0;q<34;q++){ var hh=hash(r*50+q); c.fillStyle=['#ef4444','#3b82f6','#fde047','#22c55e','#f97316','#ec4899','#fff'][Math.floor(hh*7)]; A.circ(c,230+q*22,150+r*14+Math.sin(t*(5+hh*5)+q)*2*(hh>.5?1:0),6); c.fill(); c.fillStyle='#f5d0a9'; A.circ(c,230+q*22,143+r*14,4); c.fill(); }
  c.strokeStyle='rgba(0,0,0,.35)'; c.lineWidth=2; c.beginPath(); c.moveTo(0,118); for(var x=0;x<=W;x+=60) c.quadraticCurveTo(x+30,136,x+60,118); c.stroke(); for(var b=0;b<16;b++){ c.fillStyle=['#ef4444','#fde047','#3b82f6','#22c55e'][b%4]; c.beginPath(); c.moveTo(b*60+8,121); c.lineTo(b*60+30,133); c.lineTo(b*60+52,121); c.closePath(); c.fill(); }
  /* a rampa de madeira, em perspectiva, do alto até a linha de largada */
  c.fillStyle='#92400e'; c.beginPath(); c.moveTo(420,190); c.lineTo(540,190); c.lineTo(640,400); c.lineTo(320,400); c.closePath(); c.fill(); c.strokeStyle='rgba(69,26,3,.5)'; c.lineWidth=2; for(var y=196;y<400;y+=14){ var kk=(y-190)/210; c.beginPath(); c.moveTo(420-100*kk,y); c.lineTo(540+100*kk,y); c.stroke(); }
  /* pórtico de largada no alto da rampa */ c.fillStyle='#1f2937'; c.fillRect(404,150,10,46); c.fillRect(546,150,10,46); c.fillStyle='#dc2626'; rr(c,396,140,168,26,8); c.fill(); c.fillStyle='#fff'; c.font=F(900,16); c.textAlign='center'; c.textBaseline='middle'; c.fillText('START',480,153);
  c.strokeStyle='#fde68a'; c.lineWidth=5; c.beginPath(); c.moveTo(420,190); c.lineTo(320,400); c.moveTo(540,190); c.lineTo(640,400); c.stroke();
  for(var qd=0;qd<W/20;qd++){ c.fillStyle=qd%2?'#111827':'#f8fafc'; c.fillRect(qd*20,400,20,10); c.fillStyle=qd%2?'#f8fafc':'#111827'; c.fillRect(qd*20,410,20,10); }
  c.save(); c.textAlign='center'; c.textBaseline='middle'; c.font=F(900,30); c.lineWidth=7; c.strokeStyle='rgba(13,11,30,.85)'; c.strokeText('THE SOAPBOX RALLY',W/2,34); c.fillStyle='#fde047'; c.fillText('THE SOAPBOX RALLY',W/2,34);
  c.font=F(900,15); c.lineWidth=5; c.strokeText('Real or Make-believe?',W/2,62); c.fillStyle='#fff'; c.fillText('Real or Make-believe?',W/2,62); c.restore();
  /* os 10 carrinhos: descem a rampa (0,9 s cada) e estacionam no grid */
  var lista=R.rivais.map(function(r){ return {id:r.id,cor:r.cor,nome:r.nome}; }); lista.push({id:R.me.id,cor:corHeroi(),nome:'YOU',eu:true});
  var atual=Math.min(lista.length-1,Math.floor(R.t/.9));
  lista.forEach(function(o,i){ var t0=i*.9, k=cl((R.t-t0)/.7,0,1); if(R.t<t0) return; var gx=60+i*93, gy=468;
    var x=k<1?lerp(480,gx,suave(Math.max(0,(k-.55)/.45))):gx, y=k<1?lerp(200,gy,Math.min(1,k/.55)):gy, sc=k<1?lerp(1.5,1.8,k):1.8;
    if(o.eu&&k>=1){ var lz=c.createRadialGradient(gx,gy,10,gx,gy,90); lz.addColorStop(0,'rgba(253,224,71,.6)'); lz.addColorStop(1,'rgba(253,224,71,0)'); c.fillStyle=lz; A.circ(c,gx,gy,90); c.fill(); }
    c.save(); c.translate(x,y); c.scale(sc,sc); c.rotate(-PI/2); CR.desenha(c,o.id,{cor:o.cor,cap:o.eu?corHeroi():null,t:t+i,eu:o.eu,st:0}); c.restore();
    if(k>=1){ c.font=F(900,o.eu?14:11); var tw=c.measureText(o.nome).width+12; c.fillStyle=o.eu?'#fde047':'rgba(13,11,30,.8)'; rr(c,gx-tw/2,gy+40,tw,19,9); c.fill(); c.fillStyle=o.eu?'#1e1b3a':'#fff'; c.textAlign='center'; c.textBaseline='middle'; c.fillText(o.nome,gx,gy+50); } });
  /* placa grande do carrinho que está descendo */
  var cur=lista[atual]; if(cur&&R.t<lista.length*.9+.3){ c.save(); c.font=F(900,22); var nm=cur.eu?'And YOU!':cur.nome+'!'; var tw2=c.measureText(nm).width+40; c.fillStyle='rgba(255,251,235,.96)'; rr(c,W/2-tw2/2,82,tw2,40,20); c.fill(); c.strokeStyle='#b45309'; c.lineWidth=3; rr(c,W/2-tw2/2,82,tw2,40,20); c.stroke(); c.fillStyle='#78350f'; c.textAlign='center'; c.textBaseline='middle'; c.fillText(nm,W/2,102); c.restore(); }
  var a2=.85+.15*Math.sin(t*5); c.save(); c.globalAlpha=a2; c.fillStyle='#fde047'; rr(c,W-240,H-66,220,56,28); c.fill(); c.strokeStyle='#b45309'; c.lineWidth=3; rr(c,W-240,H-66,220,56,28); c.stroke(); c.fillStyle='#1e1b3a'; c.font=F(900,26); c.textAlign='center'; c.textBaseline='middle'; c.fillText(R.t<lista.length*.9?'Skip ▶':'Race! ▶',W-130,H-38); c.restore();
}
/* ---------- pódio: os carrinhos nos degraus ---------- */
function podio(c,t){
  var P=R.podio; if(!P) return; var k=Math.min(1,P.t/.6);
  c.save(); c.globalAlpha=k; c.fillStyle='rgba(13,11,30,.65)'; c.fillRect(0,0,W,H);
  var pos=P.pos, nomes=['Gold medal!','Silver medal!','Bronze medal!'], nomes_pt=['Medalha de ouro!','Medalha de prata!','Medalha de bronze!'];
  var titulo=pos===1?'You WIN! 1st place!':'You finished '+ord(pos)+'!', med=pos<=3?nomes[pos-1]:'Finisher medal!', med_pt=pos<=3?nomes_pt[pos-1]:'Medalha de chegada!';
  c.textAlign='center'; c.textBaseline='middle'; c.font=F(900,40); c.lineWidth=8; c.strokeStyle='rgba(13,11,30,.85)'; c.strokeText(titulo,W/2,84); c.fillStyle='#fde047'; c.fillText(titulo,W/2,84);
  if(J.tr){ c.font=F(700,15); c.fillStyle='#fde68a'; c.fillText(pos===1?'Você VENCEU! 1º lugar!':'Você chegou em '+pos+'º lugar!',W/2,112); }
  var mc=pos===1?['#fef08a','#ca8a04']:(pos===2?['#f1f5f9','#94a3b8']:(pos===3?['#fed7aa','#c2410c']:['#bfdbfe','#2563eb']));
  c.save(); c.translate(W/2,160+Math.sin(t*2)*3); c.scale(.8,.8); var gg=c.createRadialGradient(-10,-10,4,0,0,44); gg.addColorStop(0,mc[0]); gg.addColorStop(1,mc[1]); c.fillStyle=gg; A.circ(c,0,0,40); c.fill(); A.estrela(c,0,0,20,'rgba(255,255,255,.6)',0); c.restore();
  c.font=F(900,22); c.fillStyle='#fff'; c.fillText(med,W/2,208); if(J.tr){ c.font=F(700,13); c.fillStyle='#fde68a'; c.fillText(med_pt,W/2,226); }
  [[1,W/2,330],[2,W/2-150,360],[3,W/2+150,385]].forEach(function(b){ var who=P.lista[b[0]-1], x=b[1], y=b[2], h=470-y;
    c.fillStyle=b[0]===1?'#facc15':(b[0]===2?'#cbd5e1':'#fb923c'); rr(c,x-66,y,132,h,8); c.fill(); c.fillStyle='rgba(13,11,30,.75)'; c.font=F(900,30); c.fillText(String(b[0]),x,y+h/2+6);
    if(!who) return; c.save(); c.translate(x,y-34+Math.sin(t*4+b[0])*2); c.scale(1.5,1.5); c.rotate(-PI/2); CR.desenha(c,who.id,{cor:who.cor,cap:who.eu?corHeroi():null,t:t,eu:who.eu}); c.restore();
    var nm=who.eu?'YOU':CR.LISTA[who.id].nome; c.font=F(900,13); c.fillStyle=who.eu?'#fde047':'#fff'; c.fillText(nm,x,y-80); });
  c.font=F(900,16); c.fillStyle='#fff'; c.fillText('Pages: '+R.paginas+' of 3   ·   Right answers: '+R.acertos+' of 9',W/2,500);
  if(P.t>.6){ var a=.8+.2*Math.sin(t*5); c.globalAlpha=k*a; c.fillStyle='#fde047'; rr(c,W-210,H-70,180,50,25); c.fill(); c.fillStyle='#1e1b3a'; c.font=F(900,22); c.fillText('Continue ▶',W-120,H-45); }
  c.restore();
}

return {inicia:inicia, atualiza:atualiza, desenha:desenha, toque:toque, tecla:tecla, ativa:function(){ return !!R&&!R.acabou; }, largar:largar,
  /* QA */ _R:function(){ return R; }, _K:{VMAX:VMAX,GRIP:GRIP,LB:LB,PASSO:PASSO,TRECHOS:TRECHOS,TRK:function(){ if(!TRK) montaPista(); return TRK; },OBJ:function(){ if(!TRK) montaPista(); return OBJ; },PIT_S:function(){ return PIT_S; },RAMPAS:function(){ return RAMPAS; },RIACHOS:function(){ return RIACHOS; },FIM_S:function(){ return FIM_S; }},
  _proj:function(x,y,i){ return proj(x,y,i||0,true); }, _auto:function(perfil){ if(R) R.auto=perfil||null; }};
})();
