/* ============================================================
   LP3_jornada_cena.js — tudo que o canvas desenha, por estado:
   globo → zoom → mapa do Canadá; fase (parallax, tiles, bichos,
   urso com squash & stretch, dicas, seta da saída trancada,
   balões do treino); arena; créditos; íris e flash por cima.
   ============================================================ */
window.CENA = (function(){
'use strict';
var G=window.JOGO, J=G.J, A=window.ARTE, F=window.FASES, W=G.W, H=G.H, TAM=G.TAM, URSO_H=G.URSO_H;

function desenha(){
  var c=G.ctx(), esc=G.escala(), dpr=G.dpr(); if(!c) return;
  c.setTransform(esc*dpr,0,0,esc*dpr,0,0); c.save();
  if(J.shake>0) c.translate((Math.random()-.5)*J.shake,(Math.random()-.5)*J.shake);
  switch(J.estado){
    case 'boot': c.fillStyle='#0d0b1e'; c.fillRect(0,0,W,H); break;
    case 'globo': desenhaGlobo(c); break;
    case 'mapa': desenhaMapa(c); break;
    case 'custom': desenhaCustom(c); break;
    case 'creditos': desenhaCreditos(c); break;
    case 'arena': if(window.ARENA) ARENA.desenha(c); break;
    default: desenhaNivel(c);
  }
  J.clima.forEach(function(p){ A.particula(c,p); });
  if(J.flash>0){ c.fillStyle='rgba(255,255,255,'+(J.flash*.5)+')'; c.fillRect(0,0,W,H); }
  if(J.trans) A.iris(c,J.trans.x,J.trans.y,G.raioIris());
  c.restore();
}

/* ---------- fase ---------- */
function desenhaNivel(c){
  var M=J.mundo, u=J.urso, t=J.t; if(!M) return;
  var cena=M.cena, sub=/^sub_/.test(cena);
  var dy=(M.h-H-J.camY)*.35;
  if(M.chefao){ A.ceu(c,'aurora',t); A.longe(c,'castelo',J.cam*.15,t); A.perto(c,'castelo',J.cam*.45,t); }
  else { A.ceu(c,M.noite?'aurora':cena,t); c.save(); c.translate(0,dy); if(sub) A.fundoSub(c,cena,J.cam*.2,t); else { A.longe(c,cena,J.cam*.15,t); A.perto(c,cena,J.cam*.45,t); } c.restore(); if(M.noite){ c.fillStyle='rgba(2,6,23,.45)'; c.fillRect(0,0,W,H); } }
  c.save(); c.translate(-Math.round(J.cam),-Math.round(J.camY));
  var vx0=J.cam-120, vx1=J.cam+W+120, vis=function(o){ return o.x+(o.w||60)>vx0 && o.x-(o.w?0:60)<vx1; };
  M.agua.forEach(function(a){ if(vis(a)){ var ay=G.mareY(a); A.agua(c,{x:a.x,y:ay,w:a.w,h:a.h+(a.y-ay)},t); } });
  M.segs.forEach(function(s){ if(vis(s)) A.chao(c,s,cena); });
  M.canos.forEach(function(p){ if(vis(p)) A.cano(c,p,cena,t,G.canoSob()===p && G.parDoCano(p)); });
  var feixe=M.farol? ((t*140)%(M.w+600))-300 : null;
  M.plats.forEach(function(p){ if(!vis(p)) return; if(p.oculta){ var lit=feixe!==null?Math.max(0,1-Math.abs(p.x+p.w/2-feixe)/260):0; c.save(); c.globalAlpha=.12+.88*lit; A.plataforma(c,p,cena); c.restore(); } else A.plataforma(c,p,cena); });
  if(feixe!==null){ c.save(); c.globalAlpha=.16; c.fillStyle='#fde68a'; c.beginPath(); c.moveTo(feixe-120,-200); c.lineTo(feixe+120,-200); c.lineTo(feixe+170,M.h); c.lineTo(feixe-170,M.h); c.fill(); c.restore(); }
  M.canhoes.forEach(function(g){ if(Math.abs(g.x-J.cam-W/2)<W) A.canhao(c,g,t); });
  J.bolasCanhao.forEach(function(b){ A.bolaNeve(c,b,t); });
  M.movers.forEach(function(p){ if(vis(p)) A.platMovel(c,p,cena,t); });
  M.caindo.forEach(function(p){ if(p.estado!=='sumiu'&&vis(p)) A.platCaindo(c,p,cena,t); });
  M.espinhos.forEach(function(s){ if(vis(s)) A.espinhos(c,s,cena); });
  M.molas.forEach(function(m){ if(vis(m)) A.mola(c,m,t); });
  M.checkpoints.forEach(function(cp){ if(vis(cp)) A.bandeira(c,cp.x,cp.y,cp.acesa,t); });
  if(M.mastro){ A.mastro(c,M.mastro.x,M.mastro.y,t); if(!M.fase.treino&&G.faltam().length){ c.save(); c.translate(M.mastro.x,M.mastro.y-200); A.cadeado(c,0,0); c.restore(); } }
  M.tijolos.forEach(function(b){ if(vis(b)) A.tijolo(c,b,cena); });
  M.travas.forEach(function(g){ if(vis(g)) A.trava(c,g,t,cena); });
  /* destaque do que ainda falta responder (caixa, porta, cano que leva à arena do submundo) */
  M.caixas.forEach(function(k){ if(!k.aberta&&vis(k)) A.destaque(c,k.x+k.w/2,k.porta?k.y+20:k.y+22,t,k.porta?'porta ?':'arena ?'); });
  if(M.mundo==='main'&&M!==J.nivel.sub&&J.nivel.sub&&J.nivel.sub.caixas.some(function(k){ return !k.aberta; })) M.canos.forEach(function(p){ if(p.id==='1'&&vis(p)) A.destaque(c,p.x+p.w/2,p.y-10,t,'arena no cano'); });
  M.caixas.forEach(function(k){ if(!vis(k)) return; if(k.porta) A.porta(c,k,t,cena); else A.caixa(c,k,t); });
  M.moedas.forEach(function(m){ if(m.x>vx0&&m.x<vx1) A.moeda(c,m,t); });
  M.itens.forEach(function(it){ if(it.x>vx0&&it.x<vx1) A.item(c,it,t); });
  M.pingentes.forEach(function(p){ if(p.x>vx0&&p.x<vx1) A.pingente(c,p,t); });
  J.troncosVivos.forEach(function(b){ if(b.bola) A.bolaRolando(c,b,t,cena); else A.tronco(c,b,t); });
  M.inimigos.forEach(function(e){ if(!e.morto&&e.x>vx0&&e.x<vx1) A.inimigo(c,e,t); });
  J.pinhas.forEach(function(p){ c.save(); c.translate(p.x,p.y); c.rotate(p.rot); c.fillStyle='#78350f'; A.el(c,0,0,7,10); c.fill(); c.restore(); });
  if(J.chefe){ var g=J.chefe; A.gigante(c,g.x,g.y,g.estado,g.t,0); J.bolas.forEach(function(b){ A.bolaNeve(c,b,t); }); J.folhas.forEach(function(f){ if(f.cx!==undefined){ A.folha(c,f.cx,f.cy,18,f.t*10,'#fbbf24',2); } }); }
  /* o urso: tamanho + squash & stretch, pisca quando invencível */
  if(!(u.invT>0 && Math.floor(t*14)%2===0)){ var s=TAM[u.tam]; c.save(); c.translate(u.x,u.y); c.scale(s*u.sx,s*u.sy); A.urso(c,0,0,u.estado,u.anim,u.dir,1); c.restore(); }
  J.part.forEach(function(p){ A.particula(c,p); });
  if(J.dica && J.estado==='nivel') desenhaDica(c,J.dica,t);
  if(J.tut && M.passos && M.passos[J.tut.i]) desenhaTutorial(c,M.passos[J.tut.i]);
  c.restore();
  /* seta para a arena que falta (saída trancada ou perto do mastro) */
  var perto=M.mastro && Math.abs(u.x-M.mastro.x)<420 && G.faltam().length && !M.fase.treino;
  if((J.setaT>0||perto) && J.estado==='nivel'){ var al=G.alvoSeta(); if(al && !(al.x-J.cam>60 && al.x-J.cam<W-60 && al.y-J.camY>100 && al.y-J.camY<H-60)){ var dx=al.x-u.x, dy=al.y-(u.y-40), ang=Math.atan2(dy,dx); var sx=Math.max(50,Math.min(W-50,al.x-J.cam)), sy=Math.max(130,Math.min(H-110,al.y-J.camY)); if(al.x-J.cam<0) sx=50; if(al.x-J.cam>W) sx=W-50; A.setaIndicador(c,sx,sy,ang,t,al.txt); } }
  if(J.chefe) A.barraVida(c,W/2-140,70,280,J.chefe.hp,J.chefe.max);
  if(J.fimFase){ var k=Math.min(1,J.fimFase.t/.8); c.fillStyle='rgba(13,11,30,'+(k*.35)+')'; c.fillRect(0,0,W,H); if(J.fimFase.t>.3){ c.save(); c.translate(W/2,150); var sc=Math.min(1,(J.fimFase.t-.3)*2.5); c.scale(sc,sc); titulo(c,'Fase concluída!',0,0,56); c.restore(); } }
  if(J.estado==='vitoria'){ titulo(c,'O Gigante caiu!',W/2,150,54); var fl=Math.min(1,J.vit.t/2); A.folha(c,J.chefe.x-200*fl, J.chefe.y-250+Math.sin(fl*Math.PI)*-80, 34, J.vit.t*2, '#fbbf24', 3); }
}
/* balão de instrução: texto + teclas + botão de toque, sempre inteiro dentro da tela */
function desenhaDica(c,d,t){
  var pul=Math.sin(t*7)*4; c.save(); c.font='900 16px "Nunito","Segoe UI",Arial';
  var tw=c.measureText(d.txt).width+24, kw=0; (d.teclas||[]).forEach(function(k){ kw+=(k.length>2?k.length*11+14:44)+8; }); if(d.botao) kw+=d.botao.length*11+30;
  var w=Math.max(tw,kw+24), h=(d.teclas?76:34);
  var sx=Math.max(J.cam+w/2+8,Math.min(J.cam+W-w/2-8,d.x)), sy=Math.max(J.camY+h+178,d.y); sy=Math.min(sy,J.camY+H-130);
  c.translate(sx,sy+pul);
  c.fillStyle='#fde68a'; c.beginPath(); c.moveTo(d.x-sx,0); c.lineTo(d.x-sx-10,-14); c.lineTo(d.x-sx+10,-14); c.fill();
  c.fillStyle='rgba(13,11,30,.86)'; A.rr(c,-w/2,-14-h,w,h,12); c.fill(); c.strokeStyle='rgba(253,224,71,.6)'; c.lineWidth=2; A.rr(c,-w/2,-14-h,w,h,12); c.stroke();
  c.fillStyle='#fff'; c.textAlign='center'; c.textBaseline='middle'; c.fillText(d.txt,0,-14-h+18);
  if(d.teclas){ var x=-kw/2; d.teclas.forEach(function(k){ var w2=k.length>2?k.length*11+14:44; A.tecla(c,x,-52,k,w2); x+=w2+8; });
    if(d.botao){ var bw=d.botao.length*11+30; c.fillStyle='rgba(251,191,36,.3)'; c.strokeStyle='rgba(251,191,36,.9)'; c.lineWidth=2; A.rr(c,x+4,-50,bw,36,18); c.fill(); c.stroke(); c.fillStyle='#fff'; c.font='900 14px "Nunito",Arial'; c.fillText(d.botao,x+4+bw/2,-32); }
  }
  c.restore();
  if(window.__lp3) window.__lp3.dicaRect={x:sx-w/2-J.cam,y:sy-14-h-J.camY,w:w,h:h};
}
function titulo(c,txt,x,y,px){ c.save(); c.fillStyle='#fde68a'; c.font='900 '+px+'px "Nunito","Segoe UI",Arial'; c.textAlign='center'; c.textBaseline='middle'; c.strokeStyle='#78350f'; c.lineWidth=8; c.lineJoin='round'; c.strokeText(txt,x,y); c.fillText(txt,x,y); c.restore(); }
function desenhaTutorial(c,p){
  var u=J.urso, by=u.y-URSO_H*TAM[u.tam]-70, w=Math.max(260,p.texto.length*12+40), bx=Math.max(J.cam+w/2+8,Math.min(J.cam+W-w/2-8,u.x));
  A.balao(c,bx,by,w,p.texto);
  c.save(); c.translate(J.cam,0);
  var grupos=p.teclas, larg=grupos.reduce(function(a,g){ return a+g.reduce(function(b,k){ return b+(k.length>2?k.length*11+14:44)+10; },0)+30; },0), x=W/2-larg/2+15;
  c.fillStyle='rgba(13,11,30,.55)'; A.rr(c,x-24,H-130,larg+28,70,16); c.fill();
  grupos.forEach(function(g,gi){ g.forEach(function(k){ var w2=k.length>2?(k.length*11+14):44; A.tecla(c,x,H-115,k,w2); x+=w2+10; }); if(gi<grupos.length-1){ c.fillStyle='#fff'; c.font='900 18px Arial'; c.textAlign='center'; c.textBaseline='middle'; c.fillText('ou',x+8,H-95); x+=30; } });
  c.restore();
}

/* ---------- globo → zoom no Canadá ---------- */
function desenhaGlobo(c){
  var g=J.globo, t=J.t; A.ceuEspaco(c,t);
  var lon0=-96+Math.sin(t*.35)*14, lat0=38, R=200, cx=W/2, cy=H/2+10;
  var k=0; if(g.zoom){ k=Math.min(1,g.zt/1.7); k=k*k*(3-2*k); }
  var p=A.projGlobo(-96,60,lon0,lat0,R); /* ponto do Canadá no globo */
  var zoom=1+k*9, ox=cx+p[0], oy=cy+p[1], tx=ox+(W/2-ox)*k, ty=oy+(H/2-oy)*k;
  c.save(); c.translate(tx,ty); c.scale(zoom,zoom); c.translate(-ox,-oy);
  A.globo(c,cx,cy,R,lon0,lat0,t,true); c.restore();
  if(k>0){ c.save(); c.globalAlpha=Math.min(1,Math.max(0,(k-.55)/.45)); A.mapaFundo(c,t); c.restore(); }
  if(k<.5){ c.save(); c.globalAlpha=1-k*2; titulo(c,'WiseBear Game',W/2,64,46); c.fillStyle='#fff'; c.font='800 18px "Nunito","Segoe UI",Arial'; c.textAlign='center'; c.textBaseline='middle'; c.strokeStyle='rgba(0,0,0,.6)'; c.lineWidth=5; c.strokeText('Português · 3º trimestre',W/2,98); c.fillText('Português · 3º trimestre',W/2,98);
    if(!g.zoom){ var a=.6+.4*Math.sin(t*4); c.globalAlpha=a; c.font='900 20px "Nunito",Arial'; c.strokeText('Toque ou aperte ENTER para viajar ao Canadá',W/2,H-34); c.fillText('Toque ou aperte ENTER para viajar ao Canadá',W/2,H-34); } c.restore(); }
}

/* ---------- mapa ---------- */
function desenhaMapa(c){
  var t=J.t; A.mapaFundo(c,t); A.mapaVivo(c,t);
  var L=F.LISTA;
  for(var i=0;i<L.length-1;i++){
    var pts=F.caminho(L[i],L[i+1]), aberto=G.faseFeita(L[i].id)||J.prog.zerado, frac=1;
    if(J.mapaAnim && J.mapaAnim.de===i){ aberto=true; frac=Math.min(1,J.mapaAnim.t/J.mapaAnim.dur); }
    pts.forEach(function(p,k){ if(k/pts.length>frac) return; c.fillStyle=aberto?'#fde68a':'rgba(255,255,255,.35)'; A.circ(c,p[0],p[1],aberto?4:3); c.fill(); });
  }
  L.concat([F.TREINO]).forEach(function(f,i){
    var treino=!!f.treino, feita=treino?J.prog.treino:G.faseFeita(f.id), lib=G.faseLiberada(f.id), sel=!treino && i===J.sel && !J.mapaAnim;
    if(J.mapaAnim && i===J.mapaAnim.para) lib=J.mapaAnim.t>J.mapaAnim.dur*.9;
    c.save(); c.translate(f.mx,f.my);
    if(sel){ c.fillStyle='rgba(253,224,71,'+(.25+Math.sin(t*5)*.15)+')'; A.circ(c,0,0,44); c.fill(); }
    if(lib) A.marco(c,f.id,0,-26,t);
    var g=c.createRadialGradient(-6,-6,4,0,0,28); if(f.chefao){ g.addColorStop(0,'#c7d2fe'); g.addColorStop(1,'#3730a3'); } else if(treino){ g.addColorStop(0,'#e0f2fe'); g.addColorStop(1,'#0369a1'); } else if(feita){ g.addColorStop(0,'#fef3c7'); g.addColorStop(1,'#d97706'); } else if(lib){ g.addColorStop(0,'#dcfce7'); g.addColorStop(1,'#15803d'); } else { g.addColorStop(0,'#9ca3af'); g.addColorStop(1,'#374151'); }
    c.fillStyle=g; A.circ(c,0,0,26); c.fill(); c.strokeStyle='#fff'; c.lineWidth=3; c.stroke();
    if(!lib) A.cadeado(c,0,2); else if(feita&&!treino) A.folha(c,0,0,14,0,'#b91c1c'); else { c.fillStyle='#fff'; c.font='900 20px "Nunito",Arial'; c.textAlign='center'; c.textBaseline='middle'; c.fillText(treino?'T':String(f.id),0,1); }
    if(feita&&!f.chefao&&!treino){ var est=J.prog.fases[f.id].estrelas; for(var s=0;s<3;s++) A.estrela(c,-18+s*18,34,7,s<est?'#fde047':'rgba(255,255,255,.3)',0); }
    c.fillStyle='rgba(13,11,30,.78)'; c.font='900 13px "Nunito","Segoe UI",Arial'; c.textAlign='center'; var tw=c.measureText(f.nome).width+16, ly=feita&&!f.chefao&&!treino?44:32; A.rr(c,-tw/2,ly,tw,20,7); c.fill(); c.fillStyle=lib?'#fff':'rgba(255,255,255,.6)'; c.textBaseline='middle'; c.fillText(f.nome,0,ly+10);
    c.restore();
  });
  /* o urso no mapa */
  if(J.mapaAnim){ var m=J.mapaAnim, pts2=F.caminho(L[m.de],L[m.para]), k=Math.min(1,m.t/m.dur)*(pts2.length-1), i0=Math.floor(k), p0=pts2[i0], p1=pts2[Math.min(pts2.length-1,i0+1)], fr=k-i0; A.urso(c,p0[0]+(p1[0]-p0[0])*fr,p0[1]+(p1[1]-p0[1])*fr-22,'walk',t,p1[0]>=p0[0]?1:-1,.55); }
  else { var f2=J.sel<0?F.TREINO:L[J.sel]; A.urso(c,f2.mx,f2.my-28+Math.sin(t*3)*3,'idle',t,1,.55); }
  titulo(c,'WiseBear Game',W/2,36,32);
  /* próxima parada sugerida (sem trancar nada) */
  var px=G.proximaFase(); if(!J.prog.zerado&&!J.mapaAnim){ var fp=L[px]; c.save(); c.translate(fp.mx,fp.my); c.strokeStyle='rgba(253,224,71,'+(.5+.4*Math.sin(t*4))+')'; c.lineWidth=3; c.setLineDash([6,6]); c.lineDashOffset=-t*20; A.circ(c,0,0,36); c.stroke(); c.restore(); }
}

/* ---------- customização (preview grande do urso; opções no DOM) ---------- */
function desenhaCustom(c){
  var t=J.t; A.ceu(c,'floresta',t); A.longe(c,'floresta',0,t); A.perto(c,'floresta',0,t); A.chao(c,{x:0,y:450,w:W,h:90},'floresta');
  c.fillStyle='rgba(13,11,30,.35)'; c.fillRect(0,0,W,H);
  A.urso(c,210,440,Math.floor(t)%6===0?'cheer':'idle',t,1,2.6);
  titulo(c,'Monte o seu urso',210,70,34);
}

/* ---------- créditos ---------- */
function desenhaCreditos(c){
  var t=J.t; A.ceu(c,'aurora',t); A.longe(c,'aurora',0,t); A.perto(c,'aurora',0,t); A.chao(c,{x:0,y:450,w:W,h:90},'aurora');
  A.urso(c,480,450,'cheer',t,1,1.3); A.folha(c,480+Math.sin(t*2)*6,250+Math.cos(t*2)*4,40,t*.5,'#fbbf24',3);
  titulo(c,'Você zerou o WiseBear Game!',W/2,70,38);
}

return {desenha:desenha, titulo:titulo};
})();
