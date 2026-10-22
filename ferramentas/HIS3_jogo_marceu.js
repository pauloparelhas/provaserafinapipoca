/* ============================================================
   HIS3_jogo_marceu.js — desafios do RECIFE (nado) e do CÉU (voo)
   (Game Design v2, B.4 e B.5):
     j  água-viva: sobe e desce 3 tiles (período 2,4 s); encostar = dano.
     p  baiacu: a cada 3 s INCHA espinhento por 1 s (aviso: treme 0,5 s);
        murcho pode ser pisado (ou estrela); inchado machuca.
     <  >  corrente (zona de 5x3 tiles) que empurra 120 px/s; bolhas
        mostram a direção.
     Z  nuvem de tempestade: escurece e pisca 1 s (aviso), depois RAIO
        vertical por 0,7 s (período 3 s); encostar no raio = dano.
     ~  zona de vento para BAIXO (5x4 tiles): puxa 160 px/s; segurar
        PULAR para vencer.
   ============================================================ */
window.MARCEU = (function(){
'use strict';
var G=window.JOGO, J=G.J, A=window.ARTE, T=45;

function parse(ch,x,y,L){
  switch(ch){
    case 'j': L.inimigos.push({tipo:'agua_viva',x:x+T/2,y:y+T,x0:x+T/2,y0:y+T,dir:-1,v:0,voa:false,fase:x*.013,fixo:true,espinho:true}); return true;
    case 'p': L.inimigos.push({tipo:'baiacu',x:x+T/2,y:y+T,x0:x+T/2,y0:y+T,dir:-1,v:0,voa:false,fase:x*.017,fixo:true}); return true;
    case '<': case '>': L.correntes=L.correntes||[]; L.correntes.push({x:x-2*T,y:y-T,w:5*T,h:3*T,vx:ch==='<'?-120:120}); return true;
    case 'Z': L.tempestades=L.tempestades||[]; L.tempestades.push({x:x-T,y:y,w:3*T,fase:x*.009}); return true;
    case '~': L.ventos=L.ventos||[]; L.ventos.push({x:x-2*T,y:y-2*T,w:5*T,h:4*T,vy:160}); return true;
  }
  return false;
}
function cicloTempestade(z){ if(z.calmaT>0) return 'calma'; var k=((J.t+z.fase)%4.5)/4.5; return k<.55?'calma':(k<.85?'aviso':'raio'); } /* 18/10: aviso mais longo, raio mais curto (as crianças-robo caíam ali) */
function atualiza(dt){
  var M=J.mundo, u=J.urso; if(!M) return; var R=G.ursoRet(), vivo=u.invT<=0&&u.tontoT<=0&&J.estado==='nivel';
  M.inimigos.forEach(function(e){
    if(e.tipo==='agua_viva'){ e.y=e.y0-60+Math.sin(J.t*2*Math.PI/3.4+e.fase)*60; } /* mais lenta: dá para passar */
    if(e.tipo==='baiacu'){ var k=((J.t+e.fase)%3); e.inchado=k>2; e.treme=k>1.5&&k<=2; e.espinho=e.inchado; e.y=e.y0-20+Math.sin(J.t*2+e.fase)*12; }
  });
  (M.correntes||[]).forEach(function(cr){ if(G.colideRet(R.x,R.y,R.w,R.h,cr.x,cr.y,cr.w,cr.h)) u.x+=cr.vx*dt*(u.noChao?.4:1); });
  (M.ventos||[]).forEach(function(v){ if(G.colideRet(R.x,R.y,R.w,R.h,v.x,v.y,v.w,v.h)) u.vy+=v.vy*dt*6; });
  (M.tempestades||[]).forEach(function(z){ if(cicloTempestade(z)==='raio'&&vivo&&G.colideRet(R.x,R.y,R.w,R.h,z.x+z.w/2-14,z.y+40,28,M.h)){ if(u.tam>0) G.machucado(); else { u.vx=-320; u.x-=50; u.invT=1.6; u.tontoT=.4; SOM.fx('tonto'); J.shake=4; } } }); /* 15/10: o raio empurra para trás, não manda de volta ao checkpoint */
}
/* inimigos novos: o dano de encostar é o do motor (machucado); o baiacu inchado não se pisa */
function inimigo(c,e,t){
  if(e.tipo==='agua_viva'){ c.save(); c.translate(e.x,e.y-30); var pul=1+Math.sin(t*6+e.fase)*.08;
    c.fillStyle='rgba(129,140,248,.85)'; c.beginPath(); c.ellipse(0,0,20*pul,16/pul,0,Math.PI,0); c.fill();
    c.strokeStyle='rgba(165,180,252,.8)'; c.lineWidth=3; for(var i=-2;i<=2;i++){ c.beginPath(); c.moveTo(i*7,0); c.quadraticCurveTo(i*7+Math.sin(t*5+i)*6,16,i*7,30); c.stroke(); }
    c.fillStyle='#fff'; A.circ(c,-6,-6,3); c.fill(); A.circ(c,6,-6,3); c.fill(); c.fillStyle='#111'; A.circ(c,-6,-6,1.5); c.fill(); A.circ(c,6,-6,1.5); c.fill(); c.restore(); return true; }
  if(e.tipo==='baiacu'){ c.save(); c.translate(e.x+(e.treme?Math.sin(t*14)*1.5:0),e.y-24); var r=e.inchado?24:15;
    if(e.inchado){ c.fillStyle='#1e1b4b'; for(var k=0;k<14;k++){ var a=k*Math.PI/7; c.beginPath(); c.moveTo(Math.cos(a)*r*.8,Math.sin(a)*r*.8); c.lineTo(Math.cos(a)*(r+9),Math.sin(a)*(r+9)); c.lineTo(Math.cos(a+.15)*r*.8,Math.sin(a+.15)*r*.8); c.fill(); } }
    var g=c.createRadialGradient(-4,-6,2,0,0,r); g.addColorStop(0,'#a5b4fc'); g.addColorStop(1,'#3730a3'); c.fillStyle=g; A.circ(c,0,0,r); c.fill();
    c.fillStyle='#4338ca'; c.beginPath(); c.moveTo(r-2,0); c.lineTo(r+10,-7); c.lineTo(r+10,7); c.fill();
    c.fillStyle='#fff'; A.circ(c,-r*.4,-r*.25,4); c.fill(); c.fillStyle='#111'; A.circ(c,-r*.45,-r*.25,2); c.fill(); c.restore(); return true; }
  return false;
}
function desenha(c,t){
  var M=J.mundo; if(!M) return;
  (M.correntes||[]).forEach(function(cr){ c.save(); c.globalAlpha=.5; for(var i=0;i<10;i++){ var fx=((i*37+t*cr.vx)%cr.w+cr.w)%cr.w, fy=(i*29)%cr.h; c.fillStyle='#e0f2fe'; A.circ(c,cr.x+fx,cr.y+fy,3+(i%3)); c.fill(); } c.strokeStyle='rgba(224,242,254,.6)'; c.lineWidth=3; for(var k=0;k<3;k++){ var ax=cr.x+cr.w/2+(cr.vx>0?1:-1)*((t*60+k*40)%cr.w-cr.w/2)*.5, ay=cr.y+20+k*40; c.beginPath(); c.moveTo(ax,ay); c.lineTo(ax+(cr.vx>0?16:-16),ay); c.lineTo(ax+(cr.vx>0?8:-8),ay-6); c.stroke(); } c.restore(); });
  (M.ventos||[]).forEach(function(v){ c.save(); c.strokeStyle='rgba(255,255,255,.55)'; c.lineWidth=3; for(var i=0;i<5;i++){ var x=v.x+20+i*v.w/5, y=v.y+((t*140+i*37)%v.h); c.beginPath(); c.moveTo(x,y); c.lineTo(x,y+22); c.lineTo(x-6,y+14); c.moveTo(x,y+22); c.lineTo(x+6,y+14); c.stroke(); } c.restore(); });
  (M.tempestades||[]).forEach(function(z){ var est=cicloTempestade(z), cx=z.x+z.w/2;
    c.save(); var cor=est==='calma'?'#94a3b8':(est==='aviso'?'#475569':'#334155'); c.fillStyle=cor; A.circ(c,cx-30,z.y+20,26); c.fill(); A.circ(c,cx,z.y+10,32); c.fill(); A.circ(c,cx+30,z.y+20,26); c.fill(); A.rr(c,cx-56,z.y+18,112,26,13); c.fill();
    c.fillStyle='#fff'; A.circ(c,cx-10,z.y+20,4); c.fill(); A.circ(c,cx+10,z.y+20,4); c.fill(); c.strokeStyle='#fff'; c.lineWidth=2; c.beginPath(); c.arc(cx,z.y+34,7,1.15*Math.PI,1.85*Math.PI); c.stroke();
    if(est==='aviso'){ c.fillStyle='rgba(253,224,71,'+(.18+.32*(.5+.5*Math.sin(t*5)))+')'; A.circ(c,cx,z.y+28,40); c.fill(); }
    if(est==='raio'){ c.strokeStyle='#fde047'; c.lineWidth=7; c.shadowColor='#fde047'; c.shadowBlur=16; c.beginPath(); c.moveTo(cx,z.y+44); var yy=z.y+44; for(var k=0;k<8;k++){ yy+=55; c.lineTo(cx+(k%2?14:-14),yy); } c.stroke(); }
    c.restore(); });
}
return {parse:parse, atualiza:atualiza, inimigo:inimigo, desenha:desenha};
})();
