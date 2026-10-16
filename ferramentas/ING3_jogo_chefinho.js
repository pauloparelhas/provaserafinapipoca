/* ============================================================
   ING3_jogo_chefinho.js — o MINI-CHEFE do fim de cada reino (E).
   Reino 1 "The Big Blot": mancha grande que pula em arco a cada 2 s
   (aviso: encolhe 0,6 s antes de pular). Pisar nela (ou acertar a
   estrela) 3 vezes; a cada acerto ela solta 1 manchinha (16/10: eram 2 e o trecho matava várias vezes seguidas), do lado de longe do herói; vencida, nenhuma. Encostar
   de lado machuca. Vencida, vira um monte de borboletas e libera
   o caminho. Outros reinos usam o mesmo motor com outra pele.
   ============================================================ */
window.CHEFINHO = (function(){
'use strict';
var G=window.JOGO, J=G.J, A=window.ARTE;

function atualiza(dt){
  var M=J.mundo; if(!M||!M.chefinhos) return; var u=J.urso, R=G.ursoRet();
  M.chefinhos.forEach(function(ch){
    if(ch.vencido) return; ch.t+=dt; if(ch.inv>0) ch.inv-=dt;
    var perto=Math.abs(u.x-ch.x)<560; if(!perto) return;
    if(ch.estado==='anda'){ ch.dir=u.x<ch.x?-1:1; ch.x+=ch.dir*40*dt; if(ch.t>1.4){ ch.estado='prepara'; ch.t=0; } }
    else if(ch.estado==='prepara'){ if(ch.t>.6){ ch.estado='pulo'; ch.t=0; ch.vy=-620; ch.vx=ch.dir*170; SOM.fx('pulo'); } }
    else if(ch.estado==='pulo'){ ch.vy+=1500*dt; ch.x+=ch.vx*dt; ch.y+=ch.vy*dt; if(ch.y>=ch.y0){ ch.y=ch.y0; ch.estado='anda'; ch.t=0; if(Math.abs(ch.x-(J.cam+480))<480) J.shake=Math.max(J.shake,2); SOM.fx('aterra'); G.poeira(ch.x,ch.y,10); } }
    ch.x=Math.max(ch.x0-380,Math.min(ch.x0+200,ch.x));
    if(u.invT>0||u.tontoT>0||J.estado!=='nivel') return;
    var w=34, h=70;
    if(G.colideRet(R.x+4,R.y+4,R.w-8,R.h-4,ch.x-w,ch.y-h,w*2,h)){
      /* pisar vale sempre que o herói vem de CIMA (pés na metade de cima do bicho); antes a margem era de 26 px
         e a queda rápida atravessava a margem num quadro: pular em cima matava o herói (Paulo) */
      var pesAntes=u.y-u.vy*.034;
      if(u.vy>0&&(u.y<ch.y-h*.45||pesAntes<=ch.y-h+30)){ u.vy=-600; u.noChao=false; u.lancado=true; u.invT=Math.max(u.invT,.35); acerta(ch); }
      else G.machucado();
    }
  });
}
function acerta(ch){
  if(ch.inv>0||ch.vencido) return; ch.inv=.5; ch.hp--; SOM.fx('chefao'); J.shake=8; G.brilho(ch.x,ch.y-60,12,'#c7d2fe');
  if(ch.hp<=0){ ch.vencido=true; SOM.fx('vitoria'); G.pontua(300,ch.x,ch.y-80); for(var i=0;i<9;i++) J.part.push({x:ch.x,y:ch.y-30,vx:(Math.random()-.5)*300,vy:-150-Math.random()*200,vida:1.6,max:1.6,tipo:'borboleta',cor:['#f472b6','#60a5fa','#fbbf24'][i%3],r:8}); G.toast('You did it! The Big Blot is gone!',2400,'Conseguiu! A Grande Mancha sumiu!'); return; }
  /* solta duas manchinhas */
  if(ch.vencido) return; var M=J.mundo; [ch.x<J.urso.x?-1:1].forEach(function(d){ M.inimigos.push({tipo:'tinta',x:ch.x+d*40,y:ch.y0,x0:ch.x+d*40,y0:ch.y0,dir:d,v:60,voa:false}); });
}
function desenha(c,t){
  var M=J.mundo; if(!M||!M.chefinhos) return;
  M.chefinhos.forEach(function(ch){
    if(ch.vencido) return; var alC=ch.inv>0?.6:1;
    var sy=ch.estado==='prepara'?.78:(ch.estado==='pulo'?1.12:1+Math.sin(t*5)*.04), sx=2-sy;
    c.save(); c.globalAlpha=alC; c.translate(ch.x,ch.y);
    c.fillStyle='rgba(0,0,0,.25)'; A.el(c,0,ch.y0-ch.y+3,40,8); c.fill();
    c.scale(sx,sy);
    var g=c.createRadialGradient(-12,-50,6,0,-36,58); g.addColorStop(0,'#6366f1'); g.addColorStop(.6,'#312e81'); g.addColorStop(1,'#1e1b4b'); c.fillStyle=g;
    c.beginPath(); c.moveTo(-40,0); c.quadraticCurveTo(-50,-46,-24,-68); c.quadraticCurveTo(0,-82,24,-68); c.quadraticCurveTo(50,-46,40,0);
    for(var i=0;i<5;i++) c.quadraticCurveTo(30-i*16,10+(i%2)*6,24-i*16,0); c.closePath(); c.fill();
    c.fillStyle='rgba(255,255,255,.3)'; A.el(c,-16,-54,10,6); c.fill();
    var d=u0(); c.fillStyle='#fff'; A.el(c,-12+d*4,-42,10,12); c.fill(); A.el(c,12+d*4,-42,10,12); c.fill();
    c.fillStyle='#111'; A.circ(c,-11+d*7,-40,5); c.fill(); A.circ(c,13+d*7,-40,5); c.fill();
    c.strokeStyle='#1e1b4b'; c.lineWidth=4; c.beginPath(); c.moveTo(-22,-58); c.lineTo(-4,-52); c.moveTo(22,-58); c.lineTo(4,-52); c.stroke();
    c.strokeStyle='#c7d2fe'; c.lineWidth=3; c.beginPath(); c.arc(0,-22,10,.1*Math.PI,.9*Math.PI); c.stroke();
    c.restore();
    /* corações do chefinho */
    for(var k=0;k<ch.max;k++){ c.fillStyle=k<ch.hp?'#a78bfa':'rgba(255,255,255,.25)'; A.circ(c,ch.x-18+k*18,ch.y-100,6); c.fill(); }
    function u0(){ return J.urso.x<ch.x?-1:1; }
  });
}
return {atualiza:atualiza, desenha:desenha, acerta:acerta};
})();
