/* ============================================================
   HIS3_jogo_arteC.js — "Detetives do Tempo" (História, 3º tri):
   1) A.MAPA_NOS + A.mapaLivro(c,t): o mapa-múndi de tabuleiro —
      o Brasil grande (verde-amarelo, em relevo) com as casas 1–4 e
      6–9, e à direita o "mundo antigo" (Nilo, Tigre e Eufrates, Rio
      Amarelo) com o nó 5, ligado por rotas de barco no oceano.
      Os nós e o pontilhado são desenhados POR CIMA pelo cena.js.
   2) A.capaLivro(c,t,sel) + LIVRE_Y: a capa do jogo (lupa com o
      Brasil, as 4 cartas de fonte em leque, traçinhas roendo).
   3) A.globo(c,t,k): globo girando; k 0→1 aproxima no Brasil.
   4) A.itemPoder(c,tipo,x,y,t) e A.cartaFonte(c,tipo,x,y,s,t).
   Carregar DEPOIS de arte…arte5. Tudo por código, sem imagem/emoji.
   ============================================================ */
(function(){
'use strict';
var A=window.ARTE, W=A.W, H=A.H, PI=Math.PI, TAU=PI*2, rr=A.rr, el=A.el, circ=A.circ, lin=A.lin, hash=A.hash;
var I=A.ING, OL=I.OL, esc=I.esc, cla=I.cla, brilho=I.brilho, cintila=I.cintila;
var FONTE='"Nunito","Segoe UI Black","Arial Rounded MT Bold","Arial Black",Arial,sans-serif';
var CACHE={};
function cache(key,fn){ if(CACHE[key]) return CACHE[key]; var cv=document.createElement('canvas'); cv.width=W*2; cv.height=H*2; var x=cv.getContext('2d'); x.scale(2,2); x.lineJoin='round'; x.lineCap='round'; fn(x); CACHE[key]=cv; return cv; }
function fonteOk(){ try{ return !document.fonts || document.fonts.check('900 40px "Nunito"'); }catch(e){ return true; } }
function linha(c,x0,y0,x1,y1){ c.beginPath(); c.moveTo(x0,y0); c.lineTo(x1,y1); c.stroke(); }
function traca(p,P){ var n=P.length; p.moveTo((P[n-1][0]+P[0][0])/2,(P[n-1][1]+P[0][1])/2); for(var i=0;i<n;i++){ var a=P[i], b=P[(i+1)%n]; p.quadraticCurveTo(a[0],a[1],(a[0]+b[0])/2,(a[1]+b[1])/2); } p.closePath(); }
function suave(c,P){ c.beginPath(); traca(c,P); }
function abre(c,P){ c.beginPath(); P.forEach(function(p,i){ if(i) c.lineTo(p[0],p[1]); else c.moveTo(p[0],p[1]); }); }
function tri(c,a,b,d){ c.beginPath(); c.moveTo(a[0],a[1]); c.lineTo(b[0],b[1]); c.lineTo(d[0],d[1]); c.closePath(); }
function fsO(c,f,lw){ c.fillStyle=f; c.fill(); c.strokeStyle=OL; c.lineWidth=lw||1.4; c.stroke(); }
function txt(c,s,x,y,px,cor,halo,peso,it){ c.font=(it?'italic ':'')+(peso||900)+' '+px+'px '+FONTE; c.textAlign='center'; c.textBaseline='middle'; if(halo){ c.lineJoin='round'; c.lineWidth=Math.max(2.5,px*.3); c.strokeStyle=halo; c.strokeText(s,x,y); } c.fillStyle=cor; c.fillText(s,x,y); }
function sst(x){ x=Math.max(0,Math.min(1,x)); return x*x*(3-2*x); }
var COR={oral:'#a855f7',escrita:'#3b82f6',visual:'#f97316',material:'#22c55e'};
var NOME={oral:'ORAL',escrita:'ESCRITA',visual:'VISUAL',material:'MATERIAL'};

/* ============================================================
   GEOGRAFIA (lon,lat simplificados)
   ============================================================ */
var BR_LL=[[-60.5,5.2],[-56,2],[-54,2.3],[-51.5,4.3],[-50,1.8],[-50.3,0],[-48.5,-1],[-44,-2.5],[-41,-2.9],[-38.5,-3.7],[-35.2,-5.4],[-34.8,-7.1],[-35,-9],[-37,-11],[-38.5,-13],[-39,-17.5],[-40,-20],[-41,-22],[-43.2,-23],[-45,-23.8],[-47.5,-25],[-48.5,-27],[-48.8,-28.5],[-50,-30.5],[-52,-32.5],[-53.4,-33.7],[-53.5,-32],[-55.5,-30.5],[-57.6,-30.2],[-56,-28],[-54.6,-25.6],[-54.3,-24],[-55.5,-22.5],[-57.8,-22],[-58,-20],[-57.5,-17.5],[-60.2,-16.2],[-60.5,-13.5],[-62.5,-13],[-65.3,-11],[-66.8,-9.8],[-70.5,-11],[-72.5,-10],[-73.8,-7.5],[-73,-5],[-70,-4.2],[-69.5,-1],[-70,1.5],[-67,2],[-64,1.8],[-63.5,3.8]];
var SA_LL=[[-77.5,8.5],[-75,11],[-72,12],[-71,10.5],[-68,10.5],[-64,10.6],[-61.5,10.5],[-60,8.5],[-58,7],[-55,6],[-52.5,5.2]].concat(BR_LL.slice(3,26),[[-55,-34.9],[-57,-34.5],[-58.5,-34.4],[-57.5,-36.5],[-62,-39],[-65,-41],[-65,-45],[-67.5,-46.5],[-66,-48],[-69,-51],[-68.5,-52.3],[-70,-54],[-73,-53],[-74.5,-50],[-75.5,-46],[-73.5,-42],[-73.5,-37],[-71.5,-32],[-71.3,-27],[-70.3,-18.5],[-75.5,-15],[-77,-12],[-79,-8],[-81.2,-5],[-80.2,-2.5],[-80,.5],[-78.8,2],[-77.5,4],[-77.5,7]]);
var NAM_LL=[[-168,66],[-162,70],[-150,71],[-128,70],[-115,69],[-100,68],[-90,69],[-82,67],[-86,64],[-94,61],[-92,57],[-85,55],[-80,52],[-78,55],[-77,60],[-70,62],[-65,60],[-58,52],[-56,48],[-60,46],[-66,44],[-70,42],[-74,40],[-76,35],[-80,32],[-81,25],[-83,29],[-89,30],[-97,27],[-97,21],[-90,19],[-87,15],[-83,9],[-77.5,8.5],[-80,7.5],[-85,12],[-92,15],[-105,20],[-110,23],[-115,30],[-117,33],[-121,37],[-124,42],[-124,48],[-128,52],[-133,56],[-140,60],[-150,60],[-155,57],[-165,55]];
var GRO_LL=[[-55,60],[-45,60],[-40,65],[-22,70],[-20,76],[-30,82],[-55,82],[-68,78],[-58,72],[-52,66]];
var AFR_LL=[[-17,15],[-17,21],[-13,27],[-10,30],[-6,36],[10,37],[11,33],[20,31],[32,31],[35,28],[43,12],[51,12],[48,4],[40,-3],[40,-15],[35,-24],[32,-29],[27,-34],[20,-35],[18,-30],[12,-17],[13,-6],[9,-1],[9,4],[4,6],[-5,5],[-8,4.5],[-13,8],[-16,11]];
var EUA_LL=[[-9,37],[-9,43],[-2,47],[-4,48],[2,51],[8,54],[10,57],[5,59],[5,62],[15,69],[28,71],[40,67],[60,69],[80,73],[100,77],[120,73],[140,72],[160,70],[180,66],[175,62],[160,60],[156,51],[142,54],[140,48],[132,43],[129,35],[122,40],[121,31],[117,24],[108,21],[106,10],[100,13],[100,3],[104,1],[98,8],[98,16],[92,21],[88,22],[80,15],[77,8],[73,17],[68,24],[60,25],[57,26],[50,30],[48,29],[56,24],[59,22],[52,16],[44,13],[39,21],[34,28],[35,32],[36,36],[28,37],[26,40],[23,36],[20,40],[16,38],[13,44],[9,44],[3,43],[-1,37],[-6,36]];
var AUS_LL=[[114,-22],[122,-18],[130,-12],[137,-12],[142,-11],[146,-19],[153,-26],[150,-37],[141,-38],[135,-35],[129,-32],[115,-34]];
var MINI_LL=[[[-5,50],[1.5,51],[0,53],[-3,56],[-5,58.5],[-6,56],[-3,54],[-5,52]],[[130,31],[135,34],[140,35],[141,38],[142,42],[140,41],[136,37],[132,34]],[[44,-25],[47,-25],[50,-15],[49,-12],[44,-17]]];
var GLB=[NAM_LL,GRO_LL,SA_LL,AFR_LL,EUA_LL,AUS_LL].concat(MINI_LL);

/* projeção do tabuleiro: o Brasil grande à esquerda */
function M(p){ return [30+(p[0]+74)*13, 58+(5.3-p[1])*12]; }
var BR=BR_LL.map(M), SA=SA_LL.map(M);
var AMAZ=[[-73.5,-4.4],[-70,-3.6],[-67,-3.1],[-64,-3.6],[-60,-3.2],[-57,-2.6],[-54.5,-2.2],[-52,-1.5],[-50.2,-.6]].map(M);
var SFRA=[[-46.3,-20.2],[-45,-17.5],[-44,-15],[-43.2,-12],[-41.5,-9.5],[-39.5,-9.2],[-37,-10.5]].map(M);
/* o mundo antigo (desenhado à mão, menor, em coordenadas da tela) */
var EURA=[[596,178],[593,160],[603,148],[621,147],[619,128],[634,118],[648,104],[641,84],[662,64],[700,52],[760,46],[840,38],[990,30],[990,140],[958,148],[946,174],[936,204],[918,228],[902,240],[898,268],[886,300],[876,282],[866,252],[856,254],[846,296],[832,262],[818,244],[800,230],[808,246],[826,254],[814,284],[792,291],[780,268],[765,226],[753,210],[754,196],[766,182],[746,182],[738,192],[728,180],[714,178],[710,188],[702,186],[694,176],[676,168],[656,174],[636,170],[622,180]];
var AFR=[[628,228],[652,214],[680,208],[700,216],[722,212],[746,212],[756,218],[770,258],[788,286],[806,294],[830,296],[814,318],[794,350],[780,384],[770,412],[750,442],[728,452],[712,438],[704,404],[698,366],[692,334],[684,312],[668,302],[644,300],[622,296],[604,288],[592,274],[588,256],[600,240]];
var NILO=[[766,338],[756,306],[748,276],[744,248],[740,226],[737,212]], TIGRE=[[782,182],[792,200],[800,214],[804,228]], EUFR=[[772,188],[778,205],[790,219],[801,229]], AMAR=[[872,172],[886,156],[900,150],[910,166],[926,160],[944,167]];

/* ============================================================
   MAPA — nós, marcos e casas especiais
   Livre: y<70 (HUD), x>800 & 60<y<260 (botões), y>340 (cartão).
   ============================================================ */
A.MAPA_NOS=[{x:130,y:215},{x:200,y:155},{x:310,y:150},{x:490,y:215},{x:737,y:200},{x:450,y:300},{x:350,y:305},{x:250,y:280},{x:300,y:222}];
var NOS=A.MAPA_NOS;
var MAR=[['escola',80,250,1],['vovo',200,118,1],['correio',318,116,1],['celeiro',440,258,1],['piramide',726,266,1],['guindaste',432,386,.9],['estadio',350,380,1.1],['relogio',262,348,1],['museu',372,246,1.15],['zigurate',812,212,.8],['pagode',918,214,.8]];
var PLACAS=[['Achou uma fonte!',215,222,'#16a34a',0],['Perdeu uma pista!',139,130,'#dc2626',0],['Avance duas casas',562,332,'#2563eb',1]];
function qp(a,b,u){ var mx=(a.x+b.x)/2, my=(a.y+b.y)/2-24, v=1-u; return [v*v*a.x+2*v*u*mx+u*u*b.x, v*v*a.y+2*v*u*my+u*u*b.y]; }
function trecho(c,a,b){ c.beginPath(); c.moveTo(a.x,a.y); c.quadraticCurveTo((a.x+b.x)/2,(a.y+b.y)/2-24,b.x,b.y); }
var AMOS=[]; for(var ia=0;ia<8;ia++) for(var u=0;u<=1;u+=.05) AMOS.push(qp(NOS[ia],NOS[ia+1],u));
function livre(x,y,m){ var i; for(i=0;i<NOS.length;i++) if(Math.hypot(x-NOS[i].x,y-NOS[i].y)<34+m) return false;
  for(i=0;i<MAR.length;i++){ var k=MAR[i]; if(Math.abs(x-k[1])<26*k[3]+m && y>k[2]-50*k[3]-m && y<k[2]+6+m) return false; }
  for(i=0;i<PLACAS.length;i++){ if(Math.abs(x-PLACAS[i][1])<52+m && Math.abs(y-PLACAS[i][2])<16+m) return false; }
  for(i=0;i<AMOS.length;i++) if(Math.hypot(x-AMOS[i][0],y-AMOS[i][1])<11+m) return false;
  return true; }
var SCR=null, P2={};
function dentro(nome,P,x,y){ if(!SCR) SCR=document.createElement('canvas').getContext('2d'); if(!P2[nome]){ P2[nome]=new Path2D(); traca(P2[nome],P); } return SCR.isPointInPath(P2[nome],x,y); }
function emTerra(x,y){ return dentro('sa',SA,x,y)||dentro('eu',EURA,x,y)||dentro('af',AFR,x,y); }

/* ---------- marcos (origem = base, centro) ---------- */
function chao(c,rx){ c.fillStyle='rgba(0,40,0,.22)'; el(c,0,1,rx,rx*.2); c.fill(); }
var MK={
  escola:function(c){ chao(c,24); rr(c,-19,-24,38,24,2); fsO(c,lin(c,0,-24,0,0,'#fef3c7','#fcd34d')); tri(c,[-23,-23],[0,-38],[23,-23]); fsO(c,'#dc2626');
    rr(c,-5,-45,10,10,1.5); fsO(c,'#fef3c7'); tri(c,[-7,-44],[0,-52],[7,-44]); fsO(c,'#b91c1c'); c.fillStyle='#f59e0b'; circ(c,0,-40,2.3); c.fill();
    rr(c,-4.5,-13,9,13,2); fsO(c,'#7c4a1e',1.1); [-14,8].forEach(function(x){ rr(c,x,-19,6,6,1); fsO(c,'#7dd3fc',1); });
    c.strokeStyle='#4b5563'; c.lineWidth=1.4; linha(c,16,-27,16,-47); c.fillStyle='#16a34a'; c.fillRect(16,-47,12,8); c.fillStyle='#facc15'; c.beginPath(); c.moveTo(22,-46); c.lineTo(27,-43); c.lineTo(22,-40); c.lineTo(17,-43); c.fill(); c.fillStyle='#1d4ed8'; circ(c,22,-43,1.6); c.fill(); },
  vovo:function(c){ chao(c,22); c.fillStyle='#78716c'; c.fillRect(7,-36,6,12); c.strokeStyle=OL; c.lineWidth=1.2; c.strokeRect(7,-36,6,12);
    rr(c,-17,-22,34,22,2); fsO(c,lin(c,0,-22,0,0,'#fdf2f8','#f9a8d4')); tri(c,[-21,-21],[0,-36],[21,-21]); fsO(c,'#c2410c');
    circ(c,0,-27,3); fsO(c,'#fde68a',1); rr(c,-4,-13,8,13,3); fsO(c,'#15803d',1.1); [-14,7].forEach(function(x){ rr(c,x,-17,7,7,1); fsO(c,'#fde68a',1); });
    [[-15,-1,'#ec4899'],[-11,-1,'#facc15'],[12,-1,'#a855f7'],[16,-1,'#ec4899']].forEach(function(f){ c.fillStyle='#16a34a'; c.fillRect(f[0]-.6,f[1]-4,1.2,4); c.fillStyle=f[2]; circ(c,f[0],f[1]-5,2.2); c.fill(); }); },
  correio:function(c){ chao(c,16); c.fillStyle='#6b4423'; c.fillRect(-2.5,-16,5,16); c.beginPath(); c.moveTo(-12,-14); c.lineTo(-12,-26); c.arc(0,-26,12,PI,TAU); c.lineTo(12,-14); c.closePath(); fsO(c,lin(c,0,-38,0,-14,'#fde047','#eab308'));
    c.fillStyle='#1d4ed8'; c.fillRect(-12,-23,24,4); c.fillStyle='#1f2937'; rr(c,-7,-31,14,3,1.5); c.fill();
    c.save(); c.translate(-1,-33); c.rotate(-.18); rr(c,-7,-6,14,9,1); fsO(c,'#fff',1); c.strokeStyle='rgba(60,60,90,.6)'; c.lineWidth=.8; abre(c,[[-7,-6],[0,-1],[7,-6]]); c.stroke(); c.restore();
    c.fillStyle='#ef4444'; c.fillRect(12,-32,2,12); c.fillRect(12,-32,7,4); },
  celeiro:function(c){ chao(c,26); rr(c,10,-30,12,30,2); fsO(c,lin(c,10,0,22,0,'#e5e7eb','#9ca3af')); c.beginPath(); c.arc(16,-30,6,PI,TAU); fsO(c,'#6b7280');
    abre(c,[[-16,0],[-16,-18],[-10,-27],[0,-31],[10,-27],[16,-18],[16,0]]); c.closePath(); fsO(c,lin(c,0,-31,0,0,'#ef4444','#b91c1c'));
    c.strokeStyle='#fff'; c.lineWidth=1.6; abre(c,[[-16,-18],[-10,-27],[0,-31],[10,-27],[16,-18]]); c.stroke();
    rr(c,-6,-13,12,13,1); fsO(c,'#fef2f2',1); c.strokeStyle='#b91c1c'; c.lineWidth=1.3; linha(c,-6,-13,6,0); linha(c,6,-13,-6,0); c.fillStyle='#fff7ed'; c.fillRect(-3,-24,6,5);
    rr(c,-25,-7,9,7,2); fsO(c,'#facc15',1); },
  piramide:function(c){ chao(c,28); function pir(x,s){ tri(c,[x-18*s,0],[x,-26*s],[x+18*s,0]); fsO(c,'#f2c879'); tri(c,[x,-26*s],[x+18*s,0],[x+3*s,0]); c.fillStyle='rgba(160,100,30,.35)'; c.fill();
      c.strokeStyle='rgba(150,100,40,.4)'; c.lineWidth=.8; for(var k=1;k<4;k++){ var yy=-26*s*k/4, w=18*s*(1-k/4); linha(c,x-w,yy,x+w,yy); } }
    pir(10,.72); pir(-6,1); c.strokeStyle='#8a5a2b'; c.lineWidth=2.4; c.beginPath(); c.moveTo(22,0); c.quadraticCurveTo(21,-10,25,-20); c.stroke();
    c.fillStyle='#16a34a'; for(var i=0;i<5;i++){ var a=-PI*.95+i*PI*.22; c.beginPath(); c.moveTo(25,-20); c.quadraticCurveTo(25+Math.cos(a)*8,-26+Math.sin(a)*4,25+Math.cos(a)*12,-20+Math.sin(a)*7+5); c.quadraticCurveTo(25+Math.cos(a)*6,-21+Math.sin(a)*3,25,-20); c.fill(); } },
  guindaste:function(c){ chao(c,26); rr(c,-24,-18,24,18,1); fsO(c,'#cbd5e1'); c.strokeStyle='rgba(71,85,105,.5)'; c.lineWidth=1; linha(c,-24,-9,0,-9); linha(c,-12,-18,-12,0);
    c.fillStyle='#facc15'; c.fillRect(6,-52,7,52); c.strokeStyle='#92400e'; c.lineWidth=1; c.strokeRect(6,-52,7,52); for(var y=-52;y<0;y+=8){ linha(c,6,y,13,y+8); }
    c.fillStyle='#facc15'; c.fillRect(-26,-56,58,4); c.strokeRect(-26,-56,58,4); rr(c,24,-55,9,9,1); fsO(c,'#64748b',1); rr(c,4,-50,11,8,2); fsO(c,'#f59e0b',1);
    c.strokeStyle='#334155'; c.lineWidth=1; linha(c,-20,-52,-20,-30); c.beginPath(); c.arc(-20,-27,3,-PI*.5,PI*.9); c.stroke(); rr(c,-28,-24,16,3.5,1); fsO(c,'#ef4444',.8); },
  estadio:function(c){ c.save(); c.translate(0,-14); c.fillStyle='rgba(0,40,0,.22)'; el(c,0,16,38,6); c.fill(); el(c,0,4,36,14); fsO(c,'#64748b'); el(c,0,0,36,14); fsO(c,'#e2e8f0');
    var cs=['#ef4444','#facc15','#3b82f6','#22c55e','#f97316','#fff']; for(var i=0;i<46;i++){ var a=i/46*TAU, r=.83+hash(i)*.1; c.fillStyle=cs[i%6]; circ(c,Math.cos(a)*30*r,Math.sin(a)*11.5*r,1.4); c.fill(); }
    el(c,0,0,24,8); c.fillStyle='#22c55e'; c.fill(); c.strokeStyle='#fff'; c.lineWidth=1; el(c,0,0,21,6.5); c.stroke(); linha(c,0,-6.5,0,6.5); el(c,0,0,4,2); c.stroke();
    [-31,31].forEach(function(d){ c.strokeStyle='#475569'; c.lineWidth=1.8; linha(c,d,-2,d,-24); rr(c,d-5,-29,10,6,1.5); fsO(c,'#fffbe6',1); }); c.restore(); },
  relogio:function(c){ c.strokeStyle='#7f1d1d'; c.lineWidth=2.4; linha(c,-8,-6,-12,0); linha(c,8,-6,12,0); [-1,1].forEach(function(s){ c.beginPath(); c.arc(s*10,-31,6,PI*(s<0?.9:1.1),PI*(s<0?1.9:2.1)); c.closePath(); fsO(c,'#fbbf24',1.2); });
    c.strokeStyle='#92400e'; c.lineWidth=1.5; linha(c,0,-34,0,-39); circ(c,0,-18,15); fsO(c,lin(c,0,-33,0,-3,'#f87171','#b91c1c')); circ(c,0,-18,11.5); fsO(c,'#fffbeb',1);
    c.strokeStyle='#1f2937'; for(var i=0;i<12;i++){ var a=i*PI/6; c.lineWidth=i%3?.8:1.6; linha(c,Math.cos(a)*9,-18+Math.sin(a)*9,Math.cos(a)*10.8,-18+Math.sin(a)*10.8); }
    c.lineWidth=2; linha(c,0,-18,0,-26); c.lineWidth=1.6; linha(c,0,-18,6,-15); c.fillStyle='#b91c1c'; circ(c,0,-18,1.8); c.fill(); },
  museu:function(c){ chao(c,34); rr(c,-31,-6,62,6,1); fsO(c,'#d6d3d1',1); rr(c,-28,-10,56,4,1); fsO(c,'#e7e5e4',1); rr(c,-25,-37,50,27,1); fsO(c,'#ddd6fe',1);
    c.beginPath(); c.moveTo(-3.5,-10); c.lineTo(-3.5,-19); c.arc(0,-19,3.5,PI,TAU); c.lineTo(3.5,-10); c.closePath(); c.fillStyle='#4c1d95'; c.fill();
    [-20.5,-9.5,3.5,14.5].forEach(function(x){ c.fillStyle=lin(c,x,0,x+6,0,'#ffffff','#cfc9c2'); c.fillRect(x,-36,6,26); c.strokeStyle=OL; c.lineWidth=.8; c.strokeRect(x,-36,6,26); c.fillStyle='#f5f5f4'; c.fillRect(x-1,-38,8,3); });
    rr(c,-29,-43,58,6,1); fsO(c,'#f5f5f4',1); tri(c,[-31,-43],[0,-58],[31,-43]); fsO(c,lin(c,0,-58,0,-43,'#ede9fe','#c4b5fd'));
    c.strokeStyle='#6d28d9'; c.lineWidth=1.6; circ(c,-1.5,-49.5,3.4); c.stroke(); linha(c,1,-47,4.5,-44); c.strokeStyle='#57534e'; c.lineWidth=1.2; linha(c,0,-58,0,-66); c.fillStyle='#a855f7'; abre(c,[[0,-66],[9,-63.5],[0,-61]]); c.fill(); },
  zigurate:function(c){ chao(c,20); [[22,7,'#d9a35b'],[16,7,'#e3b36d'],[10,7,'#edc584']].forEach(function(t,i){ rr(c,-t[0]/1,-7*(i+1),t[0]*2,7,1); fsO(c,t[2],1); }); c.fillStyle='#8a5a2b'; c.fillRect(-2,-21,4,21); },
  pagode:function(c){ chao(c,16); for(var i=0;i<3;i++){ var y=-i*12, w=16-i*4; c.fillStyle='#dc2626'; c.fillRect(-w*.6,y-10,w*1.2,10); c.strokeStyle=OL; c.lineWidth=1; c.strokeRect(-w*.6,y-10,w*1.2,10);
      c.beginPath(); c.moveTo(-w-3,y-8); c.quadraticCurveTo(0,y-15,w+3,y-8); c.quadraticCurveTo(0,y-12,-w-3,y-8); fsO(c,'#166534',1); } c.strokeStyle='#facc15'; c.lineWidth=1.5; linha(c,0,-38,0,-46); }
};
function placa(c,s,x,y,cor,boia){ c.font='900 11px '+FONTE; var w=c.measureText(s).width+16, h=19;
  if(boia){ c.fillStyle='rgba(255,255,255,.45)'; el(c,x,y+19,16,4); c.fill(); c.beginPath(); c.arc(x,y+15,8,PI,TAU); fsO(c,'#ef4444',1); c.fillStyle='#fff'; c.fillRect(x-8,y+12,16,2.5); }
  else { c.fillStyle='#7c4a1e'; c.fillRect(x-1.5,y+h/2-2,3,12); c.fillStyle='rgba(0,40,0,.25)'; el(c,x,y+h/2+10,7,2); c.fill(); }
  c.fillStyle='rgba(0,0,0,.28)'; rr(c,x-w/2+1.5,y-h/2+2.5,w,h,7); c.fill(); rr(c,x-w/2,y-h/2,w,h,7); c.fillStyle=lin(c,0,y-h/2,0,y+h/2,cla(cor,.18),esc(cor,.12)); c.fill(); c.strokeStyle=esc(cor,.5); c.lineWidth=1.4; c.stroke();
  c.strokeStyle='rgba(255,255,255,.55)'; c.lineWidth=1; rr(c,x-w/2+2.5,y-h/2+2.5,w-5,h-5,5); c.stroke(); txt(c,s,x,y+.5,11,'#fff',null);
}
function rosa(c,x,y,r){ c.save(); c.translate(x,y); circ(c,0,0,r); c.fillStyle='rgba(255,248,230,.92)'; c.fill(); c.strokeStyle='#7c5a2a'; c.lineWidth=2; c.stroke(); circ(c,0,0,r*.72); c.lineWidth=.8; c.stroke();
  for(var i=0;i<8;i++){ var a=i*PI/4-PI/2, L=i%2?r*.5:r*.86, w=i%2?r*.1:r*.16; [1,-1].forEach(function(s){ c.beginPath(); c.moveTo(0,0); c.lineTo(Math.cos(a)*L,Math.sin(a)*L); c.lineTo(Math.cos(a+s*PI/2)*w,Math.sin(a+s*PI/2)*w); c.closePath(); c.fillStyle=i===0?(s>0?'#dc2626':'#991b1b'):(s>0?'#64748b':'#1e293b'); c.fill(); }); }
  c.fillStyle='#fbbf24'; circ(c,0,0,r*.1); c.fill(); [['N',0,-1],['S',0,1],['L',1,0],['O',-1,0]].forEach(function(p){ txt(c,p[0],p[1]*(r+8),p[2]*(r+8),11,p[0]==='N'?'#b91c1c':'#334155','rgba(255,255,255,.85)'); }); c.restore(); }
function arvore(c,x,y,r,k){ c.fillStyle='#6b3f1d'; c.fillRect(x-.8,y-1,1.6,r*.7); c.fillStyle=k?'#15803d':'#166534'; circ(c,x,y-r*.35,r); c.fill(); c.fillStyle='rgba(190,242,100,.35)'; circ(c,x-r*.3,y-r*.65,r*.45); c.fill(); }
function rio(c,P,w){ c.lineCap='round'; c.lineJoin='round'; c.strokeStyle='rgba(12,74,140,.35)'; c.lineWidth=w+2; abre(c,P); c.stroke(); c.strokeStyle='#38bdf8'; c.lineWidth=w; abre(c,P); c.stroke(); c.strokeStyle='rgba(255,255,255,.45)'; c.lineWidth=w*.3; abre(c,P); c.stroke(); }
function terra(c,P,cor,lado,dy){ c.save(); c.shadowColor='rgba(0,25,60,.38)'; c.shadowBlur=14; c.shadowOffsetY=dy+4; c.translate(0,dy); suave(c,P); c.fillStyle=lado; c.fill(); c.restore();
  if(dy){ c.save(); c.translate(0,dy*.5); suave(c,P); c.fillStyle=lado; c.fill(); c.restore(); } suave(c,P); c.strokeStyle='rgba(255,255,255,.35)'; c.lineWidth=7; c.stroke(); c.fillStyle=cor; c.fill(); }

function mapaBase(c){
  var g=c.createLinearGradient(0,0,W,H), i, x, y; g.addColorStop(0,'#3ba3e2'); g.addColorStop(.5,'#2186d2'); g.addColorStop(1,'#1665a8'); c.fillStyle=g; c.fillRect(0,0,W,H);
  var rg=c.createRadialGradient(560,250,60,560,250,560); rg.addColorStop(0,'rgba(255,255,255,.12)'); rg.addColorStop(1,'rgba(0,20,60,.3)'); c.fillStyle=rg; c.fillRect(0,0,W,H);
  c.strokeStyle='rgba(255,255,255,.08)'; c.lineWidth=1; for(x=30;x<W;x+=65){ c.beginPath(); c.moveTo(x,0); c.quadraticCurveTo(x+(x-480)*.08,H/2,x,H); c.stroke(); } for(y=58;y<H;y+=60) linha(c,0,y,W,y);
  /* continentes */
  terra(c,SA,lin(c,0,0,0,H,'#f1e3b4','#dcc58c'),'#b89a5c',4); c.strokeStyle='rgba(140,110,60,.55)'; c.lineWidth=1.2; suave(c,SA); c.stroke();
  terra(c,EURA,lin(c,600,0,960,300,'#a7d98a','#d9c88e'),'#7a9a52',4); terra(c,AFR,lin(c,0,210,0,450,'#ecd9a0','#7cb85a'),'#7a8a4a',4);
  [[626,108,7,13],[612,114,4,7],[958,160,5,14]].forEach(function(e){ el(c,e[0],e[1],e[2],e[3]); c.fillStyle='#a7d98a'; c.fill(); });
  c.save(); c.translate(800,402); c.rotate(.3); el(c,0,0,6,19); c.fillStyle='#86c46a'; c.fill(); c.restore();
  c.save(); suave(c,EURA); c.clip(); c.fillStyle='rgba(236,210,150,.75)'; suave(c,[[760,230],[800,232],[824,256],[808,286],[786,290],[770,266]]); c.fill(); c.restore();
  c.save(); suave(c,EURA); c.clip(); c.fillStyle='rgba(236,210,150,.7)'; el(c,880,118,42,16); c.fill(); c.restore();
  for(i=0;i<3;i++){ x=846+i*15; y=232-(i%2)*5; tri(c,[x-9,y+8],[x,y-8],[x+9,y+8]); c.fillStyle='#a8876a'; c.fill(); tri(c,[x-3.4,y-2],[x,y-8],[x+3.4,y-2]); c.fillStyle='#fff'; c.fill(); }
  c.fillStyle=g; el(c,728,151,17,8); c.fill(); el(c,782,138,6,16); c.fill(); c.strokeStyle=g; c.lineCap='round'; [[[650,112],[661,96],[668,80],[682,68]],[[753,214],[765,241],[781,268],[797,290]],[[797,226],[808,239],[821,247]]].forEach(function(P){ c.lineWidth=6; abre(c,P); c.stroke(); });
  c.strokeStyle='rgba(60,90,40,.45)'; c.lineWidth=1.2; suave(c,EURA); c.stroke(); suave(c,AFR); c.stroke();
  for(i=0;i<60;i++){ x=600+hash(i*5.3)*360; y=50+hash(i*7.1)*180; if(dentro('eu',EURA,x,y)&&!(x>850&&x<915&&y<140)&&livre(x,y,3)) arvore(c,x,y,2.2,i%2); }
  for(i=0;i<9;i++){ x=18+hash(i*3.9)*60; y=250+i*30; if(!dentro('sa',SA,x,y+6)) continue; tri(c,[x-9,y+7],[x,y-9],[x+9,y+7]); c.fillStyle='#c4a46a'; c.fill(); tri(c,[x-3,y-4],[x,y-9],[x+3,y-4]); c.fillStyle='#fff'; c.fill(); }
  /* o Brasil: ilha-tabuleiro em relevo, verde com borda amarela */
  terra(c,BR,lin(c,0,60,0,520,'#6ee27c','#1f9d48'),'#145c2c',9);
  c.save(); suave(c,BR); c.clip();
  for(i=0;i<700;i++){ x=30+hash(i*1.7)*520; y=55+hash(i*2.9)*480; c.fillStyle=i%3?'rgba(255,255,255,.07)':'rgba(10,80,30,.12)'; c.fillRect(x,y,2,2); }
  var lu=c.createRadialGradient(240,170,20,280,260,330); lu.addColorStop(0,'rgba(255,255,220,.22)'); lu.addColorStop(1,'rgba(0,60,20,.12)'); c.fillStyle=lu; c.fillRect(0,0,W,H);
  rio(c,AMAZ,4.5); rio(c,SFRA,3); c.restore();
  suave(c,BR); c.strokeStyle='#14532d'; c.lineWidth=7.5; c.stroke(); c.strokeStyle='#facc15'; c.lineWidth=4.5; c.stroke(); c.strokeStyle='rgba(255,255,255,.4)'; c.lineWidth=1; c.stroke();
  rio(c,NILO,3); rio(c,TIGRE,2.2); rio(c,EUFR,2.2); rio(c,AMAR,2.6);
  /* caminhos: estrada na terra, rota de barco no mar */
  c.save(); c.beginPath(); c.rect(0,0,W,H); traca(c,BR); c.clip('evenodd');
  [3,4].forEach(function(k){ trecho(c,NOS[k],NOS[k+1]); c.strokeStyle='rgba(255,255,255,.2)'; c.lineWidth=15; c.stroke(); c.strokeStyle='rgba(255,255,255,.5)'; c.lineWidth=1.4; c.setLineDash([2,7]); c.save(); c.translate(0,-9); trecho(c,NOS[k],NOS[k+1]); c.stroke(); c.translate(0,18); trecho(c,NOS[k],NOS[k+1]); c.stroke(); c.restore(); c.setLineDash([]); }); c.restore();
  c.save(); suave(c,BR); c.clip(); [0,1,2,3,4,5,6,7].forEach(function(k){ trecho(c,NOS[k],NOS[k+1]); c.strokeStyle='rgba(90,60,20,.35)'; c.lineWidth=17; c.stroke(); c.strokeStyle='#f3e2b0'; c.lineWidth=13; c.stroke(); }); c.restore();
  /* árvores e casinhas no Brasil */
  for(i=0;i<900;i++){ x=36+hash(i*3.3+1)*500; y=62+hash(i*5.1+2)*470; var am=x<360&&y<250; if((am||hash(i*7.7)<.3)&&dentro('br',BR,x,y)&&dentro('br',BR,x,y+6)&&livre(x,y,4)) arvore(c,x,y,am?3.4+hash(i)*2:2.6+hash(i)*1.5,i%2); }
  [[338,428],[351,421],[362,432],[326,440],[346,443]].forEach(function(p,k){ rr(c,p[0]-4,p[1]-5,8,5,1); fsO(c,['#fde68a','#fecaca','#bfdbfe'][k%3],.7); tri(c,[p[0]-5,p[1]-5],[p[0],p[1]-9],[p[0]+5,p[1]-5]); c.fillStyle='#c2410c'; c.fill(); });
  for(i=0;i<70;i++){ x=600+hash(i*4.1)*340; y=230+hash(i*6.3)*220; if(dentro('af',AFR,x,y)&&y>300&&livre(x,y,3)) arvore(c,x,y,2.6,i%2); }
  /* marcos */
  MAR.forEach(function(m){ c.save(); c.translate(m[1],m[2]); c.scale(m[3],m[3]); MK[m[0]](c); c.restore(); });
  /* rótulos */
  txt(c,'BRASIL',322,402,24,'rgba(20,83,45,.85)','rgba(255,255,255,.55)'); txt(c,'ÁFRICA',708,350,13,'rgba(80,60,20,.8)','rgba(255,255,255,.6)'); txt(c,'EUROPA',690,124,12,'rgba(40,70,30,.8)','rgba(255,255,255,.6)'); txt(c,'ÁSIA',870,96,12,'rgba(40,70,30,.8)','rgba(255,255,255,.6)');
  txt(c,'Nilo',714,290,11,'#0c4a8c','rgba(255,255,255,.75)',800,1); txt(c,'Tigre e',836,214,10,'#0c4a8c','rgba(255,255,255,.75)',800,1); txt(c,'Eufrates',836,226,10,'#0c4a8c','rgba(255,255,255,.75)',800,1); txt(c,'Rio Amarelo',905,136,10,'#0c4a8c','rgba(255,255,255,.75)',800,1);
  txt(c,'AMÉRICA',150,466,12,'rgba(110,80,30,.75)','rgba(255,255,255,.5)'); txt(c,'DO SUL',150,480,12,'rgba(110,80,30,.75)','rgba(255,255,255,.5)'); txt(c,'OCEANO',575,428,12,'rgba(255,255,255,.55)',null,800,1); txt(c,'ATLÂNTICO',575,443,12,'rgba(255,255,255,.55)',null,800,1);
  PLACAS.forEach(function(p){ placa(c,p[0],p[1],p[2],p[3],p[4]); });
  rosa(c,892,462,30);
  /* moldura de tabuleiro */
  c.save(); c.beginPath(); c.rect(0,0,W,H); c.moveTo(26,11); c.arcTo(W-11,11,W-11,H-11,15); c.arcTo(W-11,H-11,11,H-11,15); c.arcTo(11,H-11,11,11,15); c.arcTo(11,11,W-11,11,15); c.closePath();
  c.fillStyle=lin(c,0,0,W,H,'#9a6233','#5a3417'); c.fill('evenodd'); c.restore(); c.strokeStyle='#e0b04a'; c.lineWidth=2.5; rr(c,11,11,W-22,H-22,15); c.stroke(); c.strokeStyle='rgba(0,0,0,.25)'; c.lineWidth=1; rr(c,14,14,W-28,H-28,13); c.stroke();
  [[6,6],[W-6,6],[6,H-6],[W-6,H-6]].forEach(function(p){ c.fillStyle='#e0b04a'; circ(c,p[0],p[1],4); c.fill(); });
}
var ONDAS=null, BRILHOS=null;
A.mapaLivro=function(c,t){
  t=t||0; var fk=fonteOk()?'n':'f', i;
  c.drawImage(cache('mapaC'+fk,mapaBase),0,0,W,H);
  if(!ONDAS){ ONDAS=[]; BRILHOS=[]; for(i=0;i<400&&ONDAS.length<44;i++){ var x=24+hash(i*9.1)*912, y=24+hash(i*3.7)*490; if(!emTerra(x,y)&&!emTerra(x+8,y)&&!emTerra(x-8,y)&&livre(x,y,6)&&Math.hypot(x-892,y-462)>44) ONDAS.push([x,y]); }
    for(i=0;i<300&&BRILHOS.length<7;i++){ x=40+hash(i*2.3)*480; y=70+hash(i*8.9)*300; if(dentro('br',BR,x,y)&&livre(x,y,6)) BRILHOS.push([x,y]); } }
  c.save(); c.lineCap='round'; c.strokeStyle='#fff'; c.lineWidth=1.5;
  ONDAS.forEach(function(o,k){ var a=.32+.22*Math.sin(t*1.1+k*1.7), dx=Math.sin(t*.6+k)*4; c.globalAlpha=a; c.beginPath(); c.moveTo(o[0]+dx-7,o[1]); c.quadraticCurveTo(o[0]+dx-3.5,o[1]-4,o[0]+dx,o[1]); c.quadraticCurveTo(o[0]+dx+3.5,o[1]-4,o[0]+dx+7,o[1]); c.stroke(); });
  c.restore();
  /* barquinho de papiro indo e voltando pela rota */
  var u=(t*.03)%1, ab=u<.5?NOS[3]:NOS[4], bb=u<.5?NOS[4]:NOS[5], f=(u%.5)*2, p=qp(ab,bb,f), q=qp(ab,bb,Math.min(1,f+.02));
  if(!dentro('br',BR,p[0],p[1])){ c.save(); c.translate(p[0],p[1]+Math.sin(t*3)*1.5); c.scale(q[0]>=p[0]?.62:-.62,.62); c.rotate(Math.sin(t*2.4)*.06); A.itemPoder(c,'barco',0,0,t); c.restore(); }
  /* fumaça da casa da vovó, brilhos, a traçinha rondando o museu */
  for(i=0;i<3;i++){ var fr=(t*.35+i/3)%1; c.fillStyle='rgba(255,255,255,'+(.55*(1-fr)).toFixed(2)+')'; circ(c,210+fr*8+Math.sin(t+i)*2,82-fr*22,2.5+fr*4); c.fill(); }
  BRILHOS.forEach(function(b,k){ var a=Math.sin(t*1.4+k*2.1); if(a>.55) cintila(c,b[0],b[1],2+(a-.55)*9,'rgba(255,250,200,'+a.toFixed(2)+')'); });
  tracinha(c,372+Math.sin(t*1.3)*22,180+Math.sin(t*2.6)*6,.42,t,Math.cos(t*1.3)>0?1:-1,false);
};

/* ============================================================
   TRAÇINHA — vilã cômica (lilás, fofinha). roe=true: mastigando.
   ============================================================ */
function tracinha(c,x,y,s,t,dir,roe,papel){
  c.save(); c.translate(x,y); c.scale(s*(dir||1),s); c.lineJoin='round'; c.lineCap='round';
  var b=roe?.8+Math.sin(t*5)*.15:.3+Math.abs(Math.sin(t*13))*.7, m=roe?Math.abs(Math.sin(t*14))*1.6:0;
  function asa(px,py,rx,ry,rot,cor){ c.save(); c.translate(px,py); c.rotate(rot); c.scale(1,b); c.beginPath(); c.ellipse(0,-ry,rx,ry,0,0,TAU); fsO(c,cor,1.3); c.fillStyle='rgba(140,110,175,.45)'; circ(c,-rx*.2,-ry*1.25,rx*.3); c.fill(); circ(c,rx*.35,-ry*.75,rx*.18); c.fill(); c.restore(); }
  asa(-5,-5,10,13,-.55,'#cbbbe0');
  c.beginPath(); c.ellipse(-3,2,16,11,0,0,TAU); fsO(c,lin(c,0,-9,0,13,'#c7b5da','#8b74a6'));
  c.strokeStyle='rgba(90,60,120,.35)'; c.lineWidth=1.3; for(var i=0;i<3;i++){ c.beginPath(); c.arc(-15+i*6,2,9,-.8,.8); c.stroke(); }
  c.strokeStyle='#5b4570'; c.lineWidth=1.6; [-8,-1,6].forEach(function(lx){ linha(c,lx,11,lx-2,16); });
  asa(1,-6,12,16,-.12,'#e8def3');
  c.beginPath(); c.arc(14,m*.2,10,0,TAU); fsO(c,'#b9a5ce');
  c.strokeStyle='#5b4570'; c.lineWidth=1.4; c.beginPath(); c.moveTo(16,-8); c.quadraticCurveTo(21,-19,28,-21); c.moveTo(11,-9); c.quadraticCurveTo(11,-21,17,-25); c.stroke(); c.fillStyle='#5b4570'; circ(c,28,-21,2.2); c.fill(); circ(c,17,-25,2.2); c.fill();
  c.fillStyle='#fff'; el(c,16.5,-2.5,4.4,5.2); c.fill(); c.fillStyle='#1f1430'; circ(c,18,-2,2.7); c.fill(); c.fillStyle='#fff'; circ(c,18.9,-3.2,1); c.fill();
  c.fillStyle='rgba(244,114,182,.55)'; circ(c,11,4.5,2.4); c.fill();
  c.strokeStyle='#4a2f5c'; c.lineWidth=1.2; c.beginPath(); c.arc(20.5,5+m,3,.15,PI*.85); c.stroke(); c.fillStyle='#fff'; c.fillRect(19.6,6.4+m,2.4,2.6); c.strokeRect(19.6,6.4+m,2.4,2.6);
  if(papel){ c.save(); c.translate(25,8+m); c.rotate(.3); c.fillStyle='#f4e4c1'; c.beginPath(); c.moveTo(0,-3); c.lineTo(8,-4); c.lineTo(9,3); c.lineTo(2,5); c.closePath(); c.fill(); c.strokeStyle='rgba(140,100,50,.6)'; c.lineWidth=.8; c.stroke(); c.restore(); }
  c.restore();
}

/* ============================================================
   CARTAS DE FONTE (s=1 → 44x58) e ITENS DE PODER (~40 px)
   ============================================================ */
A.cartaFonte=function(c,tipo,x,y,s,t){
  var cor=COR[tipo]||COR.oral; s=s||1; t=t||0; c.save(); c.translate(x,y); c.scale(s,s); c.lineJoin='round'; c.lineCap='round';
  c.fillStyle='rgba(0,0,0,.25)'; rr(c,-20.5,-26.5,44,58,7); c.fill();
  rr(c,-22,-29,44,58,7); c.fillStyle=lin(c,-22,-29,22,29,cla(cor,.28),esc(cor,.18)); c.fill(); c.strokeStyle=esc(cor,.5); c.lineWidth=1.5; c.stroke();
  c.strokeStyle='rgba(255,255,255,.5)'; c.lineWidth=1; rr(c,-19.5,-26.5,39,53,5); c.stroke();
  rr(c,-17,-24,34,33,5); c.fillStyle='#fffaf0'; c.fill(); c.strokeStyle=esc(cor,.35); c.lineWidth=1; c.stroke();
  c.save(); c.translate(0,-7.5);
  if(tipo==='escrita'){ rr(c,-9,-11,18,22,1); fsO(c,'#fef3c7',1); [-11,11].forEach(function(yy){ el(c,0,yy,11,2.6); fsO(c,'#f5d78e',1); }); c.strokeStyle=cor; c.lineWidth=1.4; for(var i=0;i<4;i++) linha(c,-6,-6+i*4,i===3?2:6,-6+i*4); }
  else if(tipo==='visual'){ rr(c,-13,-11,26,21,2); fsO(c,'#b45309',1); c.fillStyle=lin(c,0,-8,0,7,'#7dd3fc','#e0f2fe'); c.fillRect(-10,-8,20,15); c.fillStyle='#fbbf24'; circ(c,5,-4,2.6); c.fill(); c.fillStyle='#16a34a'; abre(c,[[-10,7],[-4,-2],[1,4],[5,0],[10,7]]); c.fill(); }
  else if(tipo==='material'){ c.fillStyle='#ef4444'; circ(c,-4,-6,4.5); c.fill(); c.strokeStyle=OL; c.lineWidth=1; c.stroke(); rr(c,2,-10,7,7,1); fsO(c,'#facc15',1); rr(c,-12,-3,24,13,2); fsO(c,lin(c,0,-3,0,10,'#d97706','#92400e'),1); c.strokeStyle='rgba(60,30,10,.5)'; linha(c,-12,3,12,3); c.save(); c.translate(-12,-3); c.rotate(-.5); rr(c,0,-4.5,24,4.5,1.2); fsO(c,'#b45309',1); c.restore(); }
  else { rr(c,-12,-10,24,16,7); fsO(c,'#f3e8ff',1); c.beginPath(); c.moveTo(-5,5); c.lineTo(-8,11); c.lineTo(1,5.5); c.fillStyle='#f3e8ff'; c.fill(); c.strokeStyle=OL; c.lineWidth=1; c.stroke(); c.fillStyle=cor; [-5,0,5].forEach(function(dx,k){ circ(c,dx,-2+Math.sin(t*5+k)*.8,1.9); c.fill(); }); }
  c.restore();
  if(s>=.75) txt(c,NOME[tipo]||'',0,18.5,tipo==='material'?6.6:tipo==='escrita'?7.2:8,'#fff',esc(cor,.45));
  var sw=((t*.4)%2.2)-.6; if(sw<1){ c.save(); rr(c,-22,-29,44,58,7); c.clip(); c.globalAlpha=.35; c.fillStyle='#fff'; c.beginPath(); c.moveTo(-30+sw*70,-30); c.lineTo(-22+sw*70,-30); c.lineTo(-40+sw*70,30); c.lineTo(-48+sw*70,30); c.fill(); c.restore(); }
  c.restore();
};
A.itemPoder=function(c,tipo,x,y,t){
  t=t||0; c.save(); c.translate(x,y); c.lineJoin='round'; c.lineCap='round';
  if(tipo==='lupa'){ c.strokeStyle='#3b2412'; c.lineWidth=9; linha(c,5,5,16,16); c.strokeStyle=lin(c,5,5,16,16,'#a0662f','#6b3f1d'); c.lineWidth=6; linha(c,5,5,16,16);
    circ(c,-4,-4,12); c.fillStyle='rgba(186,230,253,.8)'; c.fill(); c.strokeStyle='rgba(255,255,255,.85)'; c.lineWidth=2; c.beginPath(); c.arc(-4,-4,8,PI*1.1,PI*1.55); c.stroke();
    circ(c,-4,-4,12); c.strokeStyle='#5a3a10'; c.lineWidth=6; c.stroke(); c.strokeStyle=lin(c,-16,-16,8,8,'#fde68a','#d4a017'); c.lineWidth=3.6; c.stroke(); }
  else if(tipo==='lanterna'){ var fl=.8+.2*Math.sin(t*9)+.1*Math.sin(t*23); brilho(c,0,1,26,'rgba(253,224,71,.75)',fl);
    c.strokeStyle='#44403c'; c.lineWidth=2; c.beginPath(); c.arc(0,-15,6,PI,TAU); c.stroke(); rr(c,-9,-14,18,5,2); fsO(c,'#57534e',1.1);
    rr(c,-8,-9,16,19,3); fsO(c,lin(c,0,-9,0,10,'#fffbeb','#fde68a'),1.1); c.fillStyle='#f97316'; c.beginPath(); c.moveTo(0,-5*fl); c.quadraticCurveTo(4,2,0,5); c.quadraticCurveTo(-4,2,0,-5*fl); c.fill(); c.fillStyle='#fde047'; el(c,0,2.5,1.6,2.2); c.fill();
    c.strokeStyle='#57534e'; c.lineWidth=1.4; linha(c,-8,-9,-8,10); linha(c,8,-9,8,10); rr(c,-10,10,20,5,2); fsO(c,'#57534e',1.1); }
  else if(tipo==='chapeu'){ el(c,0,6,21,7.5); fsO(c,lin(c,0,0,0,12,'#f4d58a','#c9a24a')); c.strokeStyle='rgba(140,100,30,.45)'; c.lineWidth=.8; for(var i=-3;i<=3;i++) linha(c,i*5,1,i*6,12);
    c.beginPath(); c.moveTo(-11,5); c.quadraticCurveTo(-12,-13,0,-13); c.quadraticCurveTo(12,-13,11,5); c.closePath(); fsO(c,lin(c,0,-13,0,5,'#f8e1a1','#d9b25c')); rr(c,-11.5,-1,23,4.5,1.5); fsO(c,'#dc2626',1); }
  else if(tipo==='capacete'){ el(c,0,8,21,5); fsO(c,'#eab308'); c.beginPath(); c.arc(0,7,15,PI,TAU); c.closePath(); fsO(c,lin(c,0,-8,0,7,'#fde047','#f59e0b')); rr(c,-3,-9,6,16,2); fsO(c,'#facc15',1); c.fillStyle='rgba(255,255,255,.6)'; c.beginPath(); c.arc(-6,0,6,PI*1.1,PI*1.5); c.lineTo(-6,0); c.fill(); }
  else if(tipo==='barco'){ c.strokeStyle='#6b4423'; c.lineWidth=2; linha(c,0,0,0,-24); c.beginPath(); c.moveTo(-1,-23); c.quadraticCurveTo(10,-16,13,-5); c.lineTo(-1,-5); c.closePath(); fsO(c,lin(c,0,-23,0,-5,'#fffbeb','#fde68a'),1.1); c.fillStyle='#3b82f6'; c.fillRect(0,-12,10.5,2.4);
    c.beginPath(); c.moveTo(-23,-11); c.quadraticCurveTo(-20,-2,-12,2); c.quadraticCurveTo(0,6,12,2); c.quadraticCurveTo(20,-2,23,-11); c.quadraticCurveTo(24,-6,19,-4); c.quadraticCurveTo(10,-3,0,-3); c.quadraticCurveTo(-10,-3,-19,-4); c.quadraticCurveTo(-24,-6,-23,-11); c.closePath(); fsO(c,lin(c,0,-11,0,6,'#eed68a','#a8873a'));
    c.strokeStyle='#7c5a1e'; c.lineWidth=1.3; [-15,-8,0,8,15].forEach(function(bx){ linha(c,bx,-3,bx*1.04,3); }); c.fillStyle='#65a30d'; circ(c,-23,-11,2.3); c.fill(); circ(c,23,-11,2.3); c.fill();
    c.strokeStyle='rgba(255,255,255,.7)'; c.lineWidth=1.2; c.beginPath(); c.moveTo(-16,7); c.quadraticCurveTo(-12,5,-8,7); c.moveTo(6,7); c.quadraticCurveTo(10,5,14,7); c.stroke(); }
  else { rr(c,-18,-12,36,24,3); fsO(c,lin(c,0,-12,0,12,'#fffdf5','#f5e6c8')); c.strokeStyle='rgba(120,90,40,.55)'; c.lineWidth=1.1; abre(c,[[-18,12],[-3,1]]); c.stroke(); abre(c,[[18,12],[3,1]]); c.stroke();
    abre(c,[[-18,-12],[0,3],[18,-12]]); c.fillStyle='#f3e3c0'; c.fill(); c.stroke(); circ(c,0,2,4.5); fsO(c,'#dc2626',1); c.fillStyle='#fca5a5'; circ(c,-1.3,.8,1.3); c.fill(); rr(c,9,-9,6,7,1); fsO(c,'#3b82f6',.8); }
  if(Math.sin(t*2.2)>.8) cintila(c,10,-12,3+(Math.sin(t*2.2)-.8)*20,'rgba(255,255,255,.9)');
  c.restore();
};

/* ============================================================
   GLOBO — gira; k 0→1 para no Brasil e aproxima
   ============================================================ */
function projG(lon,lat,lo0,la0,R){ var la=lat*PI/180, lo=(lon-lo0)*PI/180, l0=la0*PI/180, cl=Math.cos(la);
  return [R*cl*Math.sin(lo), -R*(Math.cos(l0)*Math.sin(la)-Math.sin(l0)*cl*Math.cos(lo)), Math.sin(l0)*Math.sin(la)+Math.cos(l0)*cl*Math.cos(lo)]; }
function poliG(c,P,lo0,la0,R){ var v=0, Q=[]; for(var i=0;i<P.length;i++){ var q=projG(P[i][0],P[i][1],lo0,la0,R), x=q[0], y=q[1]; if(q[2]>0) v++; else { var d=Math.hypot(x,y)||1; x=x/d*R; y=y/d*R; } Q.push([x,y]); }
  if(v===P.length) suave(c,Q); else { abre(c,Q); c.closePath(); } poliG.todo=v===P.length; return v>0; }
function espaco(c){ var g=c.createLinearGradient(0,0,0,H); g.addColorStop(0,'#030712'); g.addColorStop(1,'#111a3a'); c.fillStyle=g; c.fillRect(0,0,W,H);
  [[200,120,'rgba(168,85,247,.16)'],[800,420,'rgba(59,130,246,.16)']].forEach(function(n){ brilho(c,n[0],n[1],260,n[2],1); });
  for(var s=0;s<160;s++){ c.fillStyle='rgba(255,255,255,'+(.3+hash(s+5)*.6).toFixed(2)+')'; circ(c,hash(s)*W,hash(s+50)*H,hash(s+9)*1.3+.3); c.fill(); } }
A.globo=function(c,t,k){
  t=t||0; k=Math.max(0,Math.min(1,k||0)); var e=sst(k/.65), z=sst((k-.2)/.8), i;
  c.drawImage(cache('espaco',espaco),0,0,W,H);
  for(i=0;i<16;i++){ var a=Math.sin(t*1.7+i*2.3); if(a>.6) cintila(c,hash(i+300)*W,hash(i+400)*H,1.5+(a-.6)*8,'rgba(255,255,255,'+a.toFixed(2)+')'); }
  var sp=((t*16)%360+360)%360-180, d=((-52-sp)%360+540)%360-180, lo0=sp+d*e, la0=8-20*e, R=160*Math.pow(4,z);
  c.save(); c.translate(480,280+6*z);
  var hg=c.createRadialGradient(0,0,R*.95,0,0,R*1.22); hg.addColorStop(0,'rgba(125,211,252,.42)'); hg.addColorStop(1,'rgba(125,211,252,0)'); c.fillStyle=hg; circ(c,0,0,R*1.22); c.fill();
  var og=c.createRadialGradient(-R*.35,-R*.4,R*.05,0,0,R); og.addColorStop(0,'#7dd3fc'); og.addColorStop(.55,'#0ea5e9'); og.addColorStop(1,'#0b4a7e'); c.fillStyle=og; circ(c,0,0,R); c.fill();
  c.save(); circ(c,0,0,R); c.clip();
  c.strokeStyle='rgba(255,255,255,.13)'; c.lineWidth=1; var lo, la, q, on;
  for(lo=-180;lo<180;lo+=30){ c.beginPath(); on=false; for(la=-80;la<=80;la+=8){ q=projG(lo,la,lo0,la0,R); if(q[2]>0){ if(on) c.lineTo(q[0],q[1]); else c.moveTo(q[0],q[1]); on=true; } else on=false; } c.stroke(); }
  for(la=-60;la<=60;la+=30){ c.beginPath(); on=false; for(lo=-180;lo<=180;lo+=8){ q=projG(lo,la,lo0,la0,R); if(q[2]>0){ if(on) c.lineTo(q[0],q[1]); else c.moveTo(q[0],q[1]); on=true; } else on=false; } c.stroke(); }
  var tg=c.createLinearGradient(0,-R,0,R); tg.addColorStop(0,'#bbf7d0'); tg.addColorStop(.5,'#4ade80'); tg.addColorStop(1,'#15803d');
  GLB.forEach(function(P,n){ if(poliG(c,P,lo0,la0,R)){ c.fillStyle=n===1?'#f1f5f9':(n===2?'#e8d9a8':tg); c.fill(); if(poliG.todo){ c.strokeStyle='rgba(255,255,255,.55)'; c.lineWidth=1.2+z; c.stroke(); } } });
  if(poliG(c,BR_LL,lo0,la0,R)){ c.save(); c.shadowColor='rgba(250,204,21,'+(.55+.3*Math.sin(t*3)).toFixed(2)+')'; c.shadowBlur=10+14*z; c.fillStyle=lin(c,0,-R*.3,0,R*.3,'#4ade80','#16a34a'); c.fill(); c.restore(); c.strokeStyle='#14532d'; c.lineWidth=2+3*z; c.stroke(); c.strokeStyle='#facc15'; c.lineWidth=1.4+2.6*z; c.stroke(); }
  var sh=c.createRadialGradient(-R*.3,-R*.35,R*.2,0,0,R*1.02); sh.addColorStop(0,'rgba(2,6,23,0)'); sh.addColorStop(.7,'rgba(2,6,23,.08)'); sh.addColorStop(1,'rgba(2,6,23,.55)'); c.fillStyle=sh; circ(c,0,0,R); c.fill();
  c.fillStyle='#fff'; for(i=0;i<10;i++){ q=projG(hash(i)*360-180+t*3,hash(i+20)*110-55,lo0,la0,R); if(q[2]>.15){ c.globalAlpha=.75*(1-z*.85)*Math.min(1,q[2]*2); var cw=(10+hash(i+3)*12)*R/160, sx=Math.max(.35,q[2]); c.beginPath(); for(var j=0;j<3;j++){ var ex=q[0]+(j-1)*cw*.8*sx, ey=q[1]-(j===1?cw*.35:0), erx=cw*.7*sx; c.moveTo(ex+erx,ey); c.ellipse(ex,ey,erx,cw*(j===1?.55:.4),0,0,TAU); } c.fill(); } } c.globalAlpha=1;
  brilho(c,-R*.42,-R*.45,R*.5,'rgba(255,255,255,.35)',1); c.restore();
  c.strokeStyle='rgba(255,255,255,.6)'; c.lineWidth=2; circ(c,0,0,R); c.stroke();
  if(e>.6){ q=projG(-51,-10,lo0,la0,R); var al=Math.min(1,(e-.6)/.4); c.globalAlpha=al; var py=q[1]-30-18*z-Math.abs(Math.sin(t*3))*8*z;
    c.fillStyle='rgba(0,0,0,.25)'; el(c,q[0],q[1]+2,8,3); c.fill(); c.beginPath(); c.moveTo(q[0],q[1]); c.quadraticCurveTo(q[0]-10,py+6,q[0]-10,py); c.arc(q[0],py,10,PI,TAU); c.quadraticCurveTo(q[0]+10,py+6,q[0],q[1]); fsO(c,lin(c,0,py-10,0,q[1],'#f87171','#b91c1c'),1.5); c.fillStyle='#fff'; circ(c,q[0],py,3.8); c.fill();
    txt(c,'BRASIL',q[0],q[1]+20+12*z,16+18*z,'#fde047','#14532d'); c.globalAlpha=1; }
  c.restore();
};

/* ============================================================
   CAPA — mapa antigo na mesa, título, lupa enorme com o Brasil,
   as 4 cartas em leque e as traçinhas roendo os cantos.
   ============================================================ */
function EQ(p){ return [480+p[0]*2.3, 268-p[1]*2.55]; }
var LENTE={x:300,y:296,r:100}, LEQUE=[-26,-8.7,8.7,26].map(function(a){ a=a*PI/180; return {a:a,x:700+330*Math.sin(a),y:640-330*Math.cos(a)}; });
function pergaminho(c){
  var P=[], i; for(i=0;i<=36;i++) P.push([30+i*25,16+(hash(i*1.3)-.5)*5]); for(i=1;i<=19;i++) P.push([930+(hash(i*2.1)-.5)*5,16+i*26]); for(i=35;i>=0;i--) P.push([30+i*25,510+(hash(i*3.7)-.5)*5]); for(i=18;i>=1;i--) P.push([30+(hash(i*4.9)-.5)*5,16+i*26]);
  c.save(); c.shadowColor='rgba(0,0,0,.5)'; c.shadowBlur=18; c.shadowOffsetY=8; abre(c,P); c.closePath(); c.fillStyle='#ead7ad'; c.fill(); c.restore();
  abre(c,P); c.closePath(); var g=c.createRadialGradient(480,250,80,480,270,560); g.addColorStop(0,'#fbf1d6'); g.addColorStop(.7,'#efdcae'); g.addColorStop(1,'#d9bb80'); c.fillStyle=g; c.fill();
  c.save(); abre(c,P); c.closePath(); c.clip();
  c.strokeStyle='rgba(150,110,60,.14)'; c.lineWidth=1; for(i=-180;i<=180;i+=30){ var x=EQ([i,0])[0]; linha(c,x,20,x,506); } for(i=-60;i<=90;i+=30){ var y=EQ([0,i])[1]; linha(c,34,y,926,y); }
  GLB.forEach(function(Q){ abre(c,Q.map(EQ)); c.closePath(); c.fillStyle='rgba(190,150,90,.2)'; c.fill(); c.strokeStyle='rgba(140,100,50,.32)'; c.lineWidth=1.2; c.stroke(); });
  c.setLineDash([3,6]); c.strokeStyle='rgba(180,60,40,.4)'; c.lineWidth=2; var a=EQ([-40,-8]), b=EQ([31,30]); c.beginPath(); c.moveTo(a[0],a[1]); c.quadraticCurveTo((a[0]+b[0])/2,a[1]-90,b[0],b[1]); c.stroke(); c.setLineDash([]);
  for(i=0;i<500;i++){ c.fillStyle=i%3?'rgba(150,110,60,.07)':'rgba(255,255,255,.2)'; c.fillRect(30+hash(i*1.9)*900,16+hash(i*2.3)*494,1.5,1.5); }
  [[860,330,26],[150,470,20]].forEach(function(m){ c.strokeStyle='rgba(150,100,50,.14)'; c.lineWidth=4; circ(c,m[0],m[1],m[2]); c.stroke(); });
  c.strokeStyle='rgba(120,70,20,.22)'; c.lineWidth=10; abre(c,P); c.closePath(); c.stroke(); c.restore();
  /* mordidas das traçinhas */
  c.globalCompositeOperation='destination-out'; [[930,16,24],[906,12,9],[929,44,9],[914,32,6],[30,392,11],[33,410,8],[28,375,6]].forEach(function(m){ circ(c,m[0],m[1],m[2]); c.fill(); }); c.globalCompositeOperation='source-over';
}
function capaBase(c){
  c.fillStyle=lin(c,0,0,0,H,'#6b4426','#3a2213'); c.fillRect(0,0,W,H); c.strokeStyle='rgba(255,220,170,.06)'; c.lineWidth=2;
  for(var y=6;y<H;y+=18){ c.beginPath(); c.moveTo(0,y); for(var x=0;x<=W;x+=40) c.lineTo(x,y+Math.sin(x*.012+y)*3); c.stroke(); }
  var pg=document.createElement('canvas'); pg.width=W*2; pg.height=H*2; var px=pg.getContext('2d'); px.scale(2,2); pergaminho(px); c.drawImage(pg,0,0,W,H);
  [[905,14],[925,52],[30,420],[40,380]].forEach(function(p,k){ c.fillStyle='#ead7ad'; c.save(); c.translate(p[0]+(k<2?-6:12),p[1]+(k<2?28:6)); c.rotate(k); c.fillRect(-2,-1.5,4,3); c.restore(); });
  rosa(c,112,262,32);
  /* título (letra a letra, gordinho) */
  var s='DETETIVES DO TEMPO', fz=72, i; c.font='900 '+fz+'px '+FONTE; var w=c.measureText(s).width; if(w>780){ fz=fz*780/w; c.font='900 '+fz+'px '+FONTE; w=c.measureText(s).width; }
  var L=[], x0=480-w/2; for(i=0;i<s.length;i++){ var cw=c.measureText(s[i]).width; if(s[i]!==' ') L.push({ch:s[i],x:x0+cw/2,y:84+(hash(i*7.7)-.5)*7,r:(hash(i*3.1)-.5)*.13}); x0+=cw; }
  c.textAlign='center'; c.textBaseline='middle'; c.lineJoin='round';
  L.forEach(function(l){ c.save(); c.translate(l.x,l.y); c.rotate(l.r); c.fillStyle='#2a1408'; c.fillText(l.ch,2,7); c.strokeStyle='#2a1408'; c.lineWidth=fz*.2; c.strokeText(l.ch,2,7); c.strokeText(l.ch,0,0); c.restore(); });
  L.forEach(function(l,k){ c.save(); c.translate(l.x,l.y); c.rotate(l.r); var g=c.createLinearGradient(0,-fz*.38,0,fz*.38); g.addColorStop(0,'#fff9c4'); g.addColorStop(.45,'#facc15'); g.addColorStop(1,'#f97316'); c.fillStyle=g; c.fillText(l.ch,0,0);
    c.save(); c.beginPath(); c.rect(-fz,-fz,2*fz,fz*.78); c.clip(); c.fillStyle='rgba(255,255,255,.28)'; c.fillText(l.ch,0,0); c.restore(); c.restore(); });
  /* faixa do subtítulo */
  var sub='Em busca das histórias escondidas'; c.font='800 23px '+FONTE; var sw=c.measureText(sub).width+56, sx=480-sw/2, sy=128, sh=34;
  [-1,1].forEach(function(d){ var bx=d<0?sx:sx+sw; abre(c,[[bx-d*10,sy+9],[bx+d*26,sy+9],[bx+d*14,sy+9+sh/2],[bx+d*26,sy+9+sh],[bx-d*10,sy+9+sh]]); c.closePath(); fsO(c,'#1e3a8a',1.5); });
  rr(c,sx,sy,sw,sh,5); c.fillStyle=lin(c,0,sy,0,sy+sh,'#3b82f6','#1d4ed8'); c.fill(); c.strokeStyle='#172554'; c.lineWidth=1.8; c.stroke(); c.strokeStyle='rgba(255,255,255,.35)'; c.lineWidth=1; rr(c,sx+3,sy+3,sw-6,sh-6,3); c.stroke();
  txt(c,sub,480,sy+sh/2+1,23,'#fff',null,800);
  /* lupa: cabo, conteúdo (o Brasil) e aro */
  var X=LENTE.x, Y=LENTE.y, R=LENTE.r, ca=PI*.75, hx0=X+Math.cos(ca)*(R+6), hy0=Y+Math.sin(ca)*(R+6), hx1=X+Math.cos(ca)*(R+80), hy1=Y+Math.sin(ca)*(R+80);
  c.lineCap='round'; c.strokeStyle='rgba(0,0,0,.3)'; c.lineWidth=30; linha(c,hx0+6,hy0+8,hx1+6,hy1+8); c.strokeStyle='#2a1408'; c.lineWidth=28; linha(c,hx0,hy0,hx1,hy1); c.strokeStyle=lin(c,hx0,hy0-14,hx0+14,hy0,'#a0662f','#6b3f1d'); c.lineWidth=22; linha(c,hx0,hy0,hx1,hy1);
  c.strokeStyle='rgba(255,255,255,.25)'; c.lineWidth=4; linha(c,hx0-6,hy0-4,hx1-6,hy1-4); c.lineCap='butt'; c.strokeStyle='#d4a017'; c.lineWidth=24; linha(c,hx0,hy0,hx0+(hx1-hx0)*.16,hy0+(hy1-hy0)*.16); c.lineCap='round';
  c.save(); circ(c,X,Y,R); c.clip(); c.fillStyle=lin(c,0,Y-R,0,Y+R,'#7cc7f0','#2d8fd4'); c.fillRect(X-R,Y-R,2*R,2*R);
  c.strokeStyle='rgba(255,255,255,.15)'; for(i=-4;i<=4;i++){ linha(c,X+i*24,Y-R,X+i*24,Y+R); linha(c,X-R,Y+i*24,X+R,Y+i*24); }
  c.save(); c.translate(X+8,Y+6); c.scale(.4,.4); c.translate(-286,-292); suave(c,SA); c.fillStyle='#ecdcaa'; c.fill(); c.save(); c.translate(0,9); suave(c,BR); c.fillStyle='#145c2c'; c.fill(); c.restore();
  suave(c,BR); c.fillStyle=lin(c,0,60,0,520,'#6ee27c','#1f9d48'); c.fill(); c.strokeStyle='#14532d'; c.lineWidth=9; c.stroke(); c.strokeStyle='#facc15'; c.lineWidth=6; c.stroke(); rio(c,AMAZ,6);
  c.strokeStyle='#b45309'; c.lineWidth=5; c.setLineDash([4,12]); abre(c,NOS.filter(function(n,k){ return k!==4; }).map(function(n){ return [n.x,n.y]; })); c.stroke(); c.setLineDash([]);
  NOS.forEach(function(n,k){ if(k===4) return; circ(c,n.x,n.y,k===8?18:13); c.fillStyle=k===8?'#7c3aed':'#f59e0b'; c.fill(); c.strokeStyle='#fff'; c.lineWidth=4; c.stroke(); });
  c.restore();
  txt(c,'BRASIL',X+12,Y+72,15,'#14532d','rgba(255,255,255,.75)');
  var gl=c.createLinearGradient(X-R,Y-R,X+R,Y+R); gl.addColorStop(0,'rgba(255,255,255,.35)'); gl.addColorStop(.4,'rgba(255,255,255,.05)'); gl.addColorStop(1,'rgba(30,60,120,.18)'); c.fillStyle=gl; c.fillRect(X-R,Y-R,2*R,2*R);
  c.strokeStyle='rgba(255,255,255,.7)'; c.lineWidth=6; c.beginPath(); c.arc(X,Y,R-16,PI*1.05,PI*1.45); c.stroke(); c.lineWidth=3; c.beginPath(); c.arc(X,Y,R-16,PI*1.52,PI*1.6); c.stroke(); c.restore();
  circ(c,X,Y,R+7); c.strokeStyle='#4a2c08'; c.lineWidth=20; c.stroke(); c.strokeStyle=lin(c,X-R,Y-R,X+R,Y+R,'#fde68a','#b7791f'); c.lineWidth=14; c.stroke(); c.strokeStyle='rgba(255,255,255,.4)'; c.lineWidth=2; circ(c,X,Y,R+11); c.stroke();
}
A.capaLivro=function(c,t,sel){
  t=t||0; var fk=fonteOk()?'n':'f', i; c.save(); c.lineJoin='round'; c.lineCap='round';
  c.drawImage(cache('capaC'+fk,capaBase),0,0,W,H);
  /* brilho que passa na lente */
  var X=LENTE.x, Y=LENTE.y, R=LENTE.r, f=(t*.25)%1.8; if(f<1){ c.save(); circ(c,X,Y,R); c.clip(); c.globalAlpha=.3; c.fillStyle='#fff'; c.beginPath(); var bx=X-R*1.6+f*R*3.2; c.moveTo(bx,Y-R); c.lineTo(bx+26,Y-R); c.lineTo(bx-34,Y+R); c.lineTo(bx-60,Y+R); c.fill(); c.restore(); }
  /* as quatro cartas em leque */
  ['oral','escrita','visual','material'].forEach(function(tp,k){ var L=LEQUE[k]; c.save(); c.translate(L.x,L.y+Math.sin(t*1.6+k*1.3)*2.5); c.rotate(L.a+Math.sin(t*1.1+k)*.015); A.cartaFonte(c,tp,0,0,2.15,t+k*.55); c.restore(); });
  for(i=0;i<6;i++){ var a=Math.sin(t*1.9+i*2.2); if(a>.5) cintila(c,[560,840,690,232,388,820][i],[230,250,212,214,380,410][i],2+(a-.5)*12,'rgba(255,250,210,'+a.toFixed(2)+')'); }
  /* traçinhas: uma roendo o canto, uma voando com o papel, uma na borda */
  tracinha(c,898,44,.95,t,1,true); tracinha(c,64,404,.85,t+1.3,-1,true);
  tracinha(c,892+Math.cos(t*.9)*16,200+Math.sin(t*1.8)*12,.8,t,Math.sin(t*.9)<0?1:-1,false,true);
  for(i=0;i<3;i++){ var fr=(t*.5+i/3)%1; c.globalAlpha=1-fr; c.fillStyle='#ead7ad'; c.save(); c.translate(918+Math.sin(i*4+t)*6,58+fr*60); c.rotate(fr*6+i); c.fillRect(-2,-1.5,4,3); c.restore(); } c.globalAlpha=1;
  c.restore();
};
A.capaLivro.LIVRE_Y=440;
})();
