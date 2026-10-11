/* ============================================================
   LP3_jornada_arte4.js — o GLOBO (projeção ortográfica dos litorais
   das Américas, Groenlândia, Europa e África, simplificados) e o
   MAPA DO CANADÁ estilizado (Pacífico → Atlântico, Baía de Hudson,
   Grandes Lagos, ilhas do Ártico) com os marcos de cada fase.
   ============================================================ */
(function(){
'use strict';
var A=window.ARTE, W=A.W, H=A.H, PI=Math.PI, TAU=PI*2, rr=A.rr, el=A.el, circ=A.circ, lin=A.lin, hash=A.hash;

/* ---------- litorais (lon,lat) simplificados ---------- */
var LITORAIS=[
  /* América do Norte (com Baía de Hudson) */
  [[-168,66],[-162,70],[-150,71],[-128,70],[-115,69],[-100,68],[-90,69],[-82,67],[-86,64],[-94,61],[-92,57],[-85,55],[-80,52],[-78,55],[-77,60],[-70,62],[-65,60],[-58,52],[-56,48],[-60,46],[-66,44],[-70,42],[-74,40],[-76,35],[-80,32],[-81,25],[-83,29],[-89,30],[-97,27],[-97,21],[-90,19],[-87,15],[-83,9],[-78,8],[-85,12],[-92,15],[-105,20],[-110,23],[-115,30],[-117,33],[-121,37],[-124,42],[-124,48],[-128,52],[-133,56],[-140,60],[-150,60],[-155,57],[-165,55]],
  /* Groenlândia */
  [[-55,60],[-45,60],[-40,65],[-22,70],[-20,76],[-30,82],[-55,82],[-68,78],[-58,72],[-52,66]],
  /* América do Sul */
  [[-78,8],[-72,11],[-62,10],[-52,4],[-50,0],[-44,-2],[-35,-6],[-38,-13],[-40,-20],[-48,-26],[-53,-34],[-58,-38],[-65,-43],[-68,-50],[-70,-54],[-74,-50],[-72,-42],[-71,-33],[-70,-20],[-76,-10],[-80,-3]],
  /* África */
  [[-17,15],[-17,21],[-10,30],[-5,36],[10,37],[20,32],[32,31],[43,12],[51,12],[40,-2],[40,-15],[35,-25],[20,-35],[12,-18],[9,4],[-5,5]],
  /* Europa */
  [[-9,37],[-9,43],[-2,48],[3,51],[10,54],[20,55],[30,60],[25,70],[15,68],[5,58],[-2,56],[-5,50]],
  /* Ilhas do Ártico canadense (Baffin, estilizada) */
  [[-80,63],[-66,62],[-62,66],[-70,72],[-85,73],[-88,68]]
];
var CANADA_LL=[[-125,49],[-128,52],[-133,56],[-140,60],[-141,69],[-128,70],[-115,69],[-100,68],[-90,69],[-82,67],[-86,64],[-94,61],[-92,57],[-85,55],[-80,52],[-78,55],[-77,60],[-70,62],[-65,60],[-58,52],[-56,48],[-60,46],[-66,44],[-70,46],[-80,45],[-90,48],[-100,49],[-110,49]];

/* projeção ortográfica: lon0/lat0 = centro visível; devolve [x,y,visivel] */
function proj(lon,lat,lon0,lat0,R){
  var la=lat*PI/180, lo=(lon-lon0)*PI/180, la0=lat0*PI/180;
  var cosc=Math.sin(la0)*Math.sin(la)+Math.cos(la0)*Math.cos(la)*Math.cos(lo);
  var x=R*Math.cos(la)*Math.sin(lo), y=-R*(Math.cos(la0)*Math.sin(la)-Math.sin(la0)*Math.cos(la)*Math.cos(lo));
  return [x,y,cosc>0,cosc];
}
A.projGlobo=proj;
/* ---------- o globo: centro (cx,cy), raio R, rotação lon0, inclinação lat0 ---------- */
A.globo=function(c,cx,cy,R,lon0,lat0,t,luz){
  c.save(); c.translate(cx,cy);
  /* halo */
  var hg=c.createRadialGradient(0,0,R*.95,0,0,R*1.25); hg.addColorStop(0,'rgba(125,211,252,.35)'); hg.addColorStop(1,'rgba(125,211,252,0)'); c.fillStyle=hg; circ(c,0,0,R*1.25); c.fill();
  /* oceano */
  var og=c.createRadialGradient(-R*.35,-R*.35,R*.1,0,0,R); og.addColorStop(0,'#7dd3fc'); og.addColorStop(.6,'#0ea5e9'); og.addColorStop(1,'#0c4a6e'); c.fillStyle=og; circ(c,0,0,R); c.fill();
  c.save(); circ(c,0,0,R); c.clip();
  /* terra */
  LITORAIS.forEach(function(poly,pi){
    c.beginPath(); var alg=false;
    poly.forEach(function(p){ var q=proj(p[0],p[1],lon0,lat0,R); if(q[2]){ if(!alg){ c.moveTo(q[0],q[1]); alg=true; } else c.lineTo(q[0],q[1]); } else { alg=false; } });
    c.closePath(); var g=c.createLinearGradient(0,-R,0,R); g.addColorStop(0,'#bbf7d0'); g.addColorStop(.5,'#4ade80'); g.addColorStop(1,'#15803d'); c.fillStyle=pi===1?'#f1f5f9':g; c.fill(); c.strokeStyle='rgba(255,255,255,.5)'; c.lineWidth=1.2; c.stroke();
  });
  /* Canadá em destaque */
  c.beginPath(); var alg2=false; CANADA_LL.forEach(function(p){ var q=proj(p[0],p[1],lon0,lat0,R); if(q[2]){ if(!alg2){ c.moveTo(q[0],q[1]); alg2=true; } else c.lineTo(q[0],q[1]); } else alg2=false; }); c.closePath();
  c.fillStyle='rgba(254,240,138,'+(.35+.25*Math.sin(t*2))+')'; c.fill(); c.strokeStyle='#fde68a'; c.lineWidth=2; c.stroke();
  /* nuvens */
  c.save(); c.globalAlpha=.55; for(var i=0;i<9;i++){ var q2=proj((hash(i)*360-180+t*4)%360, hash(i+20)*120-60, lon0, lat0, R*1.02); if(q2[2]){ c.fillStyle='#fff'; el(c,q2[0],q2[1],(14+hash(i+3)*18)*Math.max(.3,q2[3]),6+hash(i+5)*5); c.fill(); } } c.restore();
  /* terminador dia/noite + brilho */
  var ng=c.createLinearGradient(-R,0,R,0); ng.addColorStop(0,'rgba(2,6,23,0)'); ng.addColorStop(.6,'rgba(2,6,23,0)'); ng.addColorStop(1,'rgba(2,6,23,.55)'); c.fillStyle=ng; c.fillRect(-R,-R,2*R,2*R);
  var sg=c.createRadialGradient(-R*.45,-R*.45,R*.05,-R*.3,-R*.3,R*.7); sg.addColorStop(0,'rgba(255,255,255,.45)'); sg.addColorStop(1,'rgba(255,255,255,0)'); c.fillStyle=sg; circ(c,0,0,R); c.fill();
  c.restore();
  c.strokeStyle='rgba(255,255,255,.6)'; c.lineWidth=2; circ(c,0,0,R); c.stroke();
  c.restore();
};
A.ceuEspaco=function(c,t){
  var g=c.createLinearGradient(0,0,0,H); g.addColorStop(0,'#020617'); g.addColorStop(1,'#0f172a'); c.fillStyle=g; c.fillRect(0,0,W,H);
  c.fillStyle='#fff'; for(var s=0;s<90;s++){ c.globalAlpha=.3+.7*Math.abs(Math.sin(t*1.2+s)); circ(c,hash(s)*W,hash(s+50)*H,hash(s+9)*1.6+.4); c.fill(); } c.globalAlpha=1;
};

/* ---------- MAPA DO CANADÁ (estilizado, coordenadas do canvas) ---------- */
var TERRA=[[60,320],[66,268],[82,222],[104,180],[122,128],[180,112],[250,104],[330,118],[400,146],[436,166],[428,205],[418,240],[436,272],[468,294],[498,278],[506,230],[532,186],[566,166],[612,174],[666,204],[720,236],[762,252],[800,282],[836,308],[882,324],[876,352],[800,352],[742,376],[708,412],[660,432],[612,420],[566,400],[500,382],[420,382],[300,382],[160,380],[92,372]];
var LAGOS=[[640,428,36,12],[690,418,30,10],[612,404,22,9],[740,400,20,8],[585,380,16,7]];
var ILHAS=[[200,66,44,16],[300,56,52,18],[420,76,40,14],[500,58,36,12],[590,118,56,26],[55,330,10,22],[772,232,16,11]];
A.mapaFundo=function(c,t){
  var g=c.createLinearGradient(0,0,0,H); g.addColorStop(0,'#0c1a3a'); g.addColorStop(1,'#0e4f7a'); c.fillStyle=g; c.fillRect(0,0,W,H);
  c.strokeStyle='rgba(255,255,255,.08)'; c.lineWidth=1; for(var i=0;i<12;i++){ c.beginPath(); c.moveTo(0,i*48+Math.sin(t*.5+i)*4); c.lineTo(W,i*48+Math.cos(t*.4+i)*4); c.stroke(); }
  c.save(); c.shadowColor='rgba(0,0,0,.5)'; c.shadowBlur=24; c.shadowOffsetY=8;
  var tg=c.createLinearGradient(0,60,0,420); tg.addColorStop(0,'#e2e8f0'); tg.addColorStop(.3,'#86efac'); tg.addColorStop(1,'#4d7c0f');
  c.beginPath(); TERRA.forEach(function(p,i){ if(i)c.lineTo(p[0],p[1]); else c.moveTo(p[0],p[1]); }); c.closePath(); c.fillStyle=tg; c.fill();
  ILHAS.forEach(function(p){ el(c,p[0],p[1],p[2],p[3]); c.fillStyle=p[1]<130?'#e2e8f0':'#86efac'; c.fill(); });
  c.restore();
  c.strokeStyle='rgba(255,255,255,.7)'; c.lineWidth=3; c.beginPath(); TERRA.forEach(function(p,i){ if(i)c.lineTo(p[0],p[1]); else c.moveTo(p[0],p[1]); }); c.closePath(); c.stroke();
  ILHAS.forEach(function(p){ el(c,p[0],p[1],p[2],p[3]); c.stroke(); });
  /* lagos, neve do norte, pinheiros, rochosas */
  c.fillStyle='#38bdf8'; LAGOS.forEach(function(p){ el(c,p[0],p[1],p[2],p[3]); c.fill(); });
  c.fillStyle='rgba(255,255,255,.55)'; c.beginPath(); c.moveTo(122,128); c.quadraticCurveTo(300,150,436,166); c.lineTo(400,146); c.lineTo(330,118); c.lineTo(250,104); c.lineTo(180,112); c.fill();
  for(var m=0;m<6;m++){ A.montanha(c,120+m*22,300-m*12,34,34+hash(m)*14,'#64748b',true); }
  for(var p2=0;p2<7;p2++){ A.pinheiro(c,560+p2*34+hash(p2)*10,250+hash(p2+3)*30,22,'#166534'); }
  c.fillStyle='#fde68a'; for(var w=0;w<5;w++){ c.fillRect(230+w*14,348,4,16); el(c,232+w*14,346,4,7); c.fill(); }
  /* ilha do treino */
  el(c,70,490,54,18); c.fillStyle='#86efac'; c.fill(); c.strokeStyle='rgba(255,255,255,.7)'; c.stroke();
  /* nomes */
  c.fillStyle='rgba(255,255,255,.4)'; c.font='900 13px "Nunito","Segoe UI",Arial'; c.textAlign='center'; c.fillText('OCEANO ÁRTICO',480,24); c.fillText('OCEANO PACÍFICO',70,440); c.fillText('OCEANO ATLÂNTICO',880,440); c.fillText('BAÍA DE HUDSON',465,228);
  c.font='900 11px "Nunito",Arial'; c.fillText('ESTADOS UNIDOS',480,470);
  c.save(); c.translate(920,70); c.strokeStyle='#fff'; c.lineWidth=2; c.beginPath(); c.moveTo(0,22); c.lineTo(0,-22); c.moveTo(-8,-10); c.lineTo(0,-22); c.lineTo(8,-10); c.stroke(); c.fillStyle='#fff'; c.font='900 14px Arial'; c.fillText('N',0,-28); c.restore();
};
/* ---------- marco de cada fase (ícone pequeno sobre o nó) ---------- */
A.marco=function(c,id,x,y,t){
  c.save(); c.translate(x,y);
  switch(id){
    case 1: c.fillStyle='#7c2d12'; rr(c,-5,-30,10,30,2); c.fill(); c.fillStyle='#0ea5e9'; rr(c,-5,-28,10,8,1); c.fill(); c.fillStyle='#facc15'; rr(c,-5,-18,10,8,1); c.fill(); c.fillStyle='#0ea5e9'; c.beginPath(); c.moveTo(-14,-30); c.lineTo(-5,-34); c.lineTo(-5,-26); c.fill(); c.beginPath(); c.moveTo(14,-30); c.lineTo(5,-34); c.lineTo(5,-26); c.fill(); break;
    case 2: A.montanha(c,0,0,36,30,'#475569',true); c.fillStyle='#2dd4bf'; el(c,0,2,16,4); c.fill(); break;
    case 3: c.fillStyle='#b91c1c'; c.fillRect(-12,-18,24,18); c.fillStyle='#7f1d1d'; c.beginPath(); c.moveTo(-14,-18); c.lineTo(0,-30); c.lineTo(14,-18); c.fill(); c.fillStyle='#fde68a'; for(var i=0;i<3;i++){ c.fillRect(16+i*5,-10,2,10); } break;
    case 4: c.fillStyle='#f8fafc'; el(c,0,-10,16,9); c.fill(); circ(c,13,-14,7); c.fill(); c.fillStyle='#111'; circ(c,15,-15,1.5); c.fill(); c.fillStyle='#f8fafc'; c.fillRect(-10,-4,5,6); c.fillRect(6,-4,5,6); break;
    case 5: c.fillStyle='#38bdf8'; c.fillRect(-16,-28,32,8); c.fillStyle='rgba(224,242,254,.9)'; for(var k=0;k<4;k++){ c.fillRect(-14+k*8,-20+((t*60+k*7)%14),5,14); } c.fillStyle='rgba(255,255,255,.6)'; el(c,0,0,18,5); c.fill(); break;
    case 6: c.fillStyle='#334155'; c.fillRect(-3,-34,6,34); c.fillStyle='#475569'; el(c,0,-24,9,4); c.fill(); c.fillRect(-1.5,-46,3,14); c.fillStyle='#ef4444'; circ(c,0,-47,2); c.fill(); break;
    case 7: c.fillStyle='#1e293b'; c.fillRect(-14,-14,28,14); c.fillRect(-4,-30,8,16); c.beginPath(); c.moveTo(-5,-30); c.lineTo(0,-40); c.lineTo(5,-30); c.fill(); c.fillStyle='#fde68a'; c.fillRect(-10,-10,4,6); c.fillRect(6,-10,4,6); break;
    case 8: A.folha(c,0,-16,14,0,'#dc2626',1.5); break;
    case 9: c.fillStyle='#f5f5f4'; c.beginPath(); c.moveTo(-7,0); c.lineTo(-4,-28); c.lineTo(4,-28); c.lineTo(7,0); c.fill(); c.fillStyle='#dc2626'; c.fillRect(-5,-30,10,6); c.fillStyle='rgba(253,224,71,'+(.5+.5*Math.sin(t*3))+')'; circ(c,0,-27,3); c.fill(); break;
    case 10: c.fillStyle='rgba(191,219,254,.95)'; c.fillRect(-16,-24,32,24); c.fillRect(-20,-30,8,30); c.fillRect(12,-30,8,30); c.beginPath(); c.moveTo(-20,-30); c.lineTo(-16,-40); c.lineTo(-12,-30); c.fill(); c.beginPath(); c.moveTo(12,-30); c.lineTo(16,-40); c.lineTo(20,-30); c.fill(); c.fillStyle='#1e3a8a'; c.fillRect(-4,-12,8,12); break;
    default: c.fillStyle='#fde68a'; c.font='900 16px "Nunito",Arial'; c.textAlign='center'; c.fillText('?',0,-10);
  }
  c.restore();
};
})();
