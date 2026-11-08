/* ============================================================
   GEO3_jogo_arteH4.js — Guardiões da Casa Maior. Cenas 4/6:
   'amazonia' (fase 8, a trilha das 6 sementes): a paisagem MUDA ao longo da fase,
   pela posição no mundo — Amazônia (U4 S9: árvores altas, araras, vitória-régia),
   Cerrado (árvores tortas, lobo-guará, sempre-viva), Caatinga (cactos, asa-branca,
   tatu), Pampa, Pantanal e Mata Atlântica (mico-leão, bromélia, o mar ao fundo),
   com uma placa de madeira na entrada de cada bioma;
   'margem' (fase 9, chefão, U4 S18/S20): margem do rio com lixo acumulado, mata
   ciliar derrubada de um lado (tocos, área marrom) e preservada do outro; quando o
   Rei Entulho é vencido (e no final), o rio fica limpo;
   'janela' (abertura): o quarto da Mariana com a janela para a rua e o Bem-te-vi.
   Mesmo contrato de GEO3_jogo_arteH.js (A.TH). Sem imagem, sem emoji, nada pisca.
   ============================================================ */
(function(){
'use strict';
var A=window.ARTE; if(!A||!A.CN||!A.ING||!A.TB||!A.TH) return;
var W=A.W, H=A.H, PI=Math.PI, TAU=PI*2, rr=A.rr, el=A.el, circ=A.circ, lin=A.lin, hash=A.hash;
var I=A.ING, mix=I.mix, esc=I.esc, cla=I.cla, brilho=I.brilho;
var N=A.CN, rep=N.rep, faixa=N.faixa, grade=N.grade, ceuG=N.ceuG, bruma=N.bruma, sol=N.sol, nuvemF=N.nuvemF, linha=N.linha,
    arvoreR=N.arvoreR, arbusto=N.arbusto, flor=N.flor, bordas=N.bordas, sombraPlat=N.sombraPlat;
var T=A.TB, txt=T.txt, topoGrama=T.topoGrama, morro=T.morro, morroY=T.morroY;
var TH=A.TH, nuvens=TH.nuvens, jogo=TH.jogo, camX=TH.camX, FONTE=TH.FONTE, casa=TH.casa, arvoreRua=TH.arvoreRua, poste=TH.poste;

A.CENAS.amazonia={ceu:['#3b9bd8','#9fd6f4','#cfeefc'], chaoTop:'#3f8f3c', chao:'#5a3a22', chaoBase:'#2e1c10', plat:'#8a6a3a', platTop:'#9ad868', part:'polen', musica:'floresta'};
A.CENAS.margem  ={ceu:['#8a9aa0','#c8c2a8','#e0d6b0'], chaoTop:'#7a8a4a', chao:'#6b4a2a', chaoBase:'#3a2614', plat:'#a8743f', platTop:'#d6a46a', part:'', musica:'chefao'};
A.CENAS.janela  ={ceu:['#fde9d0','#f6dcc0','#e8c8a4'], chaoTop:'#c98a4f', chao:'#8a5a2a', chaoBase:'#4a2c12', plat:'#b07a48', platTop:'#e2b27c', part:'polen', musica:'mapa'};

/* ============================================================
   A TRILHA DOS BIOMAS (fase 8)
   ============================================================ */
var BIO=[
  {nome:'AMAZÔNIA', ceu:['#3b9bd8','#cfeefc'], morro:'#1f6b3a', chao:'#5a3a22', grama:{c0:'#5fb84c',c1:'#2f7a34',luz:'#8fd860',fio:['#4fa844','#3f9a3c']}, cor:'#9ccc3c'},
  {nome:'CERRADO',  ceu:['#58b0ec','#ffe4b8'], morro:'#a8884a', chao:'#b5651d', grama:{c0:'#d6b85a',c1:'#a8883a',luz:'#e8cc78',fio:['#c9a84c','#b89a3c']}, cor:'#f06fae'},
  {nome:'CAATINGA', ceu:['#7cc0f0','#ffd9a0'], morro:'#c8a070', chao:'#d2a26a', grama:{c0:'#c8b070',c1:'#9a8450',luz:'#e0c888',fio:['#b89a5a','#a88a4a']}, cor:'#f2e27a'},
  {nome:'PAMPA',    ceu:['#4aa8ee','#fff1c8'], morro:'#8cc472', chao:'#9a5a30', grama:{c0:'#9ad868',c1:'#5aa83c',luz:'#b6ec88',fio:['#7fcf52','#67b844']}, cor:'#f58b4c'},
  {nome:'PANTANAL', ceu:['#6cc0ec','#e0f2e8'], morro:'#4d8a3c', chao:'#8a7040', grama:{c0:'#7fcf6a',c1:'#3f9a4a',luz:'#a8e68a',fio:['#5fb858','#4fa84c']}, cor:'#e9c6e6'},
  {nome:'MATA ATLÂNTICA', ceu:['#3fa0e0','#d6f0ff'], morro:'#2f6f3a', chao:'#4a3a22', grama:{c0:'#6fc85a',c1:'#2f8a3c',luz:'#9ae080',fio:['#4faa4c','#3f9a44']}, cor:'#9fd0ef'}];
var LIM=[0,.3,.45,.6,.7,.82,1.01];
function mapaW(){ try{ var J=jogo(), M=window.MAPAS, f=J&&J.faseAtual; if(f&&M&&M[f.id]) return M[f.id].main[0].length*45; }catch(e){} return 5940; }
function zona(wx){ var u=wx/mapaW(); for(var i=0;i<6;i++) if(u<LIM[i+1]) return i; return 5; }
function zonaK(wx){ /* índice e fração de mistura com o próximo (faixa de 400 px antes da fronteira) */ var u=wx/mapaW(), i=zona(wx), lim=LIM[i+1]*mapaW(), d=lim-wx; return {i:i, j:Math.min(5,i+1), k:d<400&&i<5?1-d/400:0}; }
function heroX(){ return camX()+480; }
function ceuAmz(c,t){ var z=zonaK(heroX()), a=BIO[z.i].ceu, b=BIO[z.j].ceu, c0=mix(a[0],b[0],z.k), c1=mix(a[1],b[1],z.k);
  ceuG(c,[[0,c0],[.6,c1],[1,'#fff2cf']]); sol(c,780,86,30,'#fff3c4','rgba(255,244,200,.35)'); nuvens(c,t,56,5,4); }
/* bichos e plantas de cada bioma */
function arvoreAlta(c,x,y,h,seed){ c.fillStyle='#6b4428'; c.fillRect(x-6,y-h,12,h); c.fillStyle='#5a3618'; c.fillRect(x-6,y-h,3,h); c.fillStyle='#2f7a34'; circ(c,x,y-h,44); c.fill(); circ(c,x-36,y-h+16,30); c.fill(); circ(c,x+36,y-h+14,32); c.fill(); c.fillStyle='#4fa844'; circ(c,x-10,y-h-14,26); c.fill(); circ(c,x+22,y-h-4,22); c.fill();
  c.strokeStyle='#4a6a2a'; c.lineWidth=2; for(var k=0;k<3;k++){ var cx=x-30+k*30+hash(seed+k)*10; c.beginPath(); c.moveTo(cx,y-h+20); c.quadraticCurveTo(cx+8,y-h*.5,cx-4+hash(seed+k*2)*8,y-20-hash(seed+k)*40); c.stroke(); } }
function arara(c,x,y,s,dir,t){ c.save(); c.translate(x,y); c.scale(dir*s,s); c.fillStyle='#dc2626'; el(c,0,0,9,14); c.fill(); c.fillStyle='#2563eb'; c.beginPath(); c.moveTo(-6,-4); c.quadraticCurveTo(-18,8,-10,26); c.lineTo(-2,10); c.fill(); c.fillStyle='#fbbf24'; c.beginPath(); c.moveTo(-3,2); c.lineTo(-10,14); c.lineTo(-1,10); c.fill(); c.fillStyle='#dc2626'; c.beginPath(); c.moveTo(0,12); c.lineTo(-6,40); c.lineTo(3,30); c.fill(); c.fillStyle='#2563eb'; c.beginPath(); c.moveTo(2,12); c.lineTo(2,38); c.lineTo(6,28); c.fill();
  c.fillStyle='#dc2626'; circ(c,2,-16,7); c.fill(); c.fillStyle='#fff'; el(c,5,-17,3.5,3); c.fill(); c.fillStyle='#1f2937'; circ(c,6,-17,1.4); c.fill(); c.beginPath(); c.moveTo(7,-14); c.quadraticCurveTo(14,-12,8,-6); c.fill(); c.restore(); }
function vitoriaRegia(c,x,y,r,seed){ c.fillStyle='#3f9a4a'; circ(c,x,y,r); c.fill(); c.fillStyle='#7fcf5a'; c.beginPath(); c.arc(x,y,r-3,0,TAU); c.fill(); c.fillStyle='#3f9a4a'; c.beginPath(); c.moveTo(x,y); c.lineTo(x+r,y-2); c.lineTo(x+r,y+2); c.fill(); c.strokeStyle='rgba(40,100,40,.3)'; c.lineWidth=1; for(var k=0;k<6;k++){ var a=k*TAU/6+.3; linha(c,x,y,x+Math.cos(a)*r,y+Math.sin(a)*r*.9); } if(hash(seed)>.5){ flor(c,x-r*.3,y-r*.4,4,'#f9a8d4'); } }
function arvoreTorta(c,x,y,h,seed){ c.strokeStyle='#6b4428'; c.lineWidth=7; c.beginPath(); c.moveTo(x,y); c.quadraticCurveTo(x+18,y-h*.5,x-10,y-h); c.stroke(); c.lineWidth=4; c.beginPath(); c.moveTo(x+6,y-h*.5); c.quadraticCurveTo(x+30,y-h*.7,x+34,y-h*.95); c.stroke(); c.fillStyle='#6a9a3a'; el(c,x-12,y-h-6,30,12); c.fill(); el(c,x+34,y-h*.95-6,22,10); c.fill(); c.fillStyle='#8fbf4a'; el(c,x-14,y-h-10,20,7); c.fill(); }
function sempreViva(c,x,y,seed){ c.strokeStyle='#8a9a4a'; c.lineWidth=1.2; for(var k=0;k<4;k++){ var px=x+(k-1.5)*6, h=18+hash(seed+k)*12; linha(c,px,y,px+2,y-h); c.fillStyle='#fff'; circ(c,px+2,y-h-2,3); c.fill(); c.fillStyle='#fde68a'; circ(c,px+2,y-h-2,1.2); c.fill(); } }
function loboGuara(c,x,y,s,dir,t){ c.save(); c.translate(x,y); c.scale(dir*s,s); c.fillStyle='rgba(0,0,0,.15)'; el(c,0,0,18,3); c.fill();
  c.strokeStyle='#1f2937'; c.lineWidth=3.5; linha(c,-10,-18,-12,0); linha(c,-3,-18,-5,0); linha(c,6,-18,5,0); linha(c,12,-18,14,0);
  c.fillStyle='#e0702a'; el(c,0,-24,18,8); c.fill(); c.beginPath(); c.moveTo(-16,-24); c.quadraticCurveTo(-30,-26,-32,-14); c.quadraticCurveTo(-26,-18,-18,-20); c.fill(); c.fillStyle='#1f2937'; el(c,-30,-14,4,3); c.fill();
  c.fillStyle='#e0702a'; el(c,18,-32,9,7); c.fill(); c.beginPath(); c.moveTo(22,-34); c.lineTo(34,-31); c.lineTo(22,-28); c.fill(); c.beginPath(); c.moveTo(12,-38); c.lineTo(14,-50); c.lineTo(19,-38); c.fill(); c.beginPath(); c.moveTo(20,-38); c.lineTo(23,-50); c.lineTo(27,-38); c.fill(); c.fillStyle='#1f2937'; circ(c,24,-33,1.5); c.fill(); circ(c,34,-31,1.5); c.fill(); c.restore(); }
function cacto(c,x,y,h,seed){ c.fillStyle='#3f9a4a'; rr(c,x-8,y-h,16,h,8); c.fill(); if(h>40){ rr(c,x-26,y-h*.6,10,h*.35,5); c.fill(); c.fillRect(x-26,y-h*.6+h*.35-10,24,10); rr(c,x+16,y-h*.75,10,h*.4,5); c.fill(); c.fillRect(x+2,y-h*.75+h*.4-10,24,10); } c.strokeStyle='rgba(255,255,255,.5)'; c.lineWidth=1; for(var k=0;k<Math.floor(h/10);k++){ linha(c,x-4,y-h+8+k*10,x-7,y-h+5+k*10); linha(c,x+4,y-h+8+k*10,x+7,y-h+5+k*10); } if(hash(seed)>.6) flor(c,x,y-h-2,3,'#f472b6'); }
function arvoreSeca(c,x,y,h){ c.strokeStyle='#8a6a4a'; c.lineWidth=6; c.beginPath(); c.moveTo(x,y); c.lineTo(x+2,y-h*.6); c.lineTo(x-16,y-h); c.moveTo(x+2,y-h*.6); c.lineTo(x+20,y-h*.9); c.moveTo(x+1,y-h*.4); c.lineTo(x-14,y-h*.7); c.stroke(); }
function asaBranca(c,x,y,s,dir){ c.save(); c.translate(x,y); c.scale(dir*s,s); c.fillStyle='#9ca3af'; el(c,0,-6,8,5); c.fill(); circ(c,7,-11,3.5); c.fill(); c.fillStyle='#f8fafc'; el(c,-3,-7,4,2); c.fill(); c.fillStyle='#4b5563'; c.beginPath(); c.moveTo(10,-11); c.lineTo(14,-10); c.lineTo(10,-9); c.fill(); c.fillStyle='#1f2937'; circ(c,8,-12,.9); c.fill(); c.strokeStyle='#e06060'; c.lineWidth=1; linha(c,-1,-2,-2,0); linha(c,3,-2,4,0); c.restore(); }
function tatu(c,x,y,s,dir){ c.save(); c.translate(x,y); c.scale(dir*s,s); c.fillStyle='#a8865a'; el(c,0,-8,16,8); c.fill(); c.strokeStyle='#8a6a3a'; c.lineWidth=1.2; for(var k=-10;k<10;k+=5){ c.beginPath(); c.arc(k,-6,8,PI*1.1,PI*1.9); c.stroke(); } c.fillStyle='#b8966a'; el(c,16,-6,7,4); c.fill(); c.fillStyle='#1f2937'; circ(c,19,-7,1); c.fill(); c.fillStyle='#8a6a3a'; c.fillRect(-10,-2,4,3); c.fillRect(6,-2,4,3); c.beginPath(); c.moveTo(-16,-8); c.lineTo(-30,-4); c.lineTo(-16,-4); c.fill(); c.restore(); }
function micoLeao(c,x,y,s,dir,t){ c.save(); c.translate(x,y); c.scale(dir*s,s); c.fillStyle='#f59e0b'; el(c,0,-10,8,10); c.fill(); circ(c,2,-24,8); c.fill(); c.fillStyle='#fbbf24'; circ(c,2,-24,11); c.fill(); c.fillStyle='#f59e0b'; circ(c,2,-24,7); c.fill(); c.fillStyle='#78350f'; el(c,3,-23,4,3.5); c.fill(); c.fillStyle='#fff'; circ(c,2,-24,1.3); c.fill(); circ(c,5,-24,1.3); c.fill(); c.strokeStyle='#f59e0b'; c.lineWidth=3; c.beginPath(); c.moveTo(-6,-6); c.quadraticCurveTo(-22,-4,-20,-26+Math.sin(t)*3); c.stroke(); linha(c,-3,0,-5,6); linha(c,4,0,6,6); c.restore(); }
function placaBioma(c,x,y,nome,cor){ c.fillStyle='#8a5a34'; c.fillRect(x-4,y-70,8,70); c.fillStyle='#a8743f'; rr(c,x-60,y-100,120,34,5); c.fill(); c.strokeStyle='#5a3418'; c.lineWidth=2; rr(c,x-60,y-100,120,34,5); c.stroke(); c.fillStyle=cor; circ(c,x-46,y-83,7); c.fill(); c.save(); c.font='900 13px '+FONTE; c.textAlign='center'; c.textBaseline='middle'; c.fillStyle='#fff7e6'; c.fillText(nome,x+6,y-83); c.restore(); }
function trechoPerto(c,i,ox,t,seed){ /* um trecho de 300 px do bioma i, no plano perto (chão em 452) */
  var y=452, s=seed;
  if(i===0){ arvoreAlta(c,ox+60,y,230+hash(s)*40,s); arvoreAlta(c,ox+230,y,200+hash(s+1)*60,s+1); arara(c,ox+66,y-240,.9,1,t); if(hash(s+2)>.5) arara(c,ox+236,y-210,.8,-1,t);
    c.fillStyle='#2f7a8a'; el(c,ox+150,y,60,8); c.fill(); vitoriaRegia(c,ox+135,y-2,16,s); vitoriaRegia(c,ox+168,y-1,12,s+3); arbusto(c,ox+280,y,36,'#2f7a34','#4fa844',[],s); }
  if(i===1){ arvoreTorta(c,ox+70,y,110,s); arvoreTorta(c,ox+230,y,90,s+1); sempreViva(c,ox+140,y,s); sempreViva(c,ox+170,y,s+1); sempreViva(c,ox+290,y,s+2); if(hash(s)>.4) loboGuara(c,ox+180,y,1,hash(s+3)>.5?1:-1,t); c.fillStyle='#b5651d'; el(c,ox+30,y-6,10,14); c.fill(); el(c,ox+30,y,14,6); c.fill(); }
  if(i===2){ cacto(c,ox+60,y,90,s); cacto(c,ox+200,y,120,s+1); cacto(c,ox+280,y,50,s+2); arvoreSeca(c,ox+130,y,110); asaBranca(c,ox+128,y-96,1,1); if(hash(s)>.4) tatu(c,ox+240,y,1,-1); c.fillStyle='#b89a6a'; el(c,ox+160,y,14,5); c.fill(); }
  if(i===3){ TH.capimPampas(c,ox+40,y,30,t,s); TH.capimPampas(c,ox+150,y,26,t,s+1); TH.capimPampas(c,ox+280,y,34,t,s+2); if(hash(s)>.5) TH.gado(c,ox+200,y,1,-1,t,s); else TH.ema(c,ox+210,y,1,1,t); TH.queroQuero(c,ox+100,y,1.1,1,t); }
  if(i===4){ c.fillStyle='#2f8a7a'; el(c,ox+150,y,120,9); c.fill(); TH.bromelia(c,ox+90,y-2,.7,s); TH.bromelia(c,ox+210,y-2,.6,s+1); TH.tuiuiu(c,ox+60,y,.8,1,t); TH.capivara(c,ox+270,y,.9,-1,t); TH.jacare(c,ox+150,y-3,t,1); }
  if(i===5){ arvoreR(c,ox+60,y,200,'#2f6f3a','#4fa84c','#6b4428'); arvoreR(c,ox+250,y,170,'#3f8a44','#6fbf5e','#6b4428'); TH.bromelia(c,ox+57,y-120,.55,s); TH.bromelia(c,ox+248,y-100,.5,s+1); micoLeao(c,ox+70,y-150,1.1,1,t); arbusto(c,ox+150,y,40,'#2f7a34','#4fa844',['#f472b6','#fde047'],s); if(hash(s)>.5) micoLeao(c,ox+260,y,1,-1,t+1); }
}
function pertoAmz(c,cam,t){ var P=300, z=zonaK(heroX()), mw=mapaW();
  /* a paisagem inteira é a do bioma em que o herói está; perto da fronteira ela se transforma (fusão de 400 px) */
  rep(cam,P,function(ox){ if(ox>W+80||ox<-P-80) return; var n=Math.round((ox+cam)/P);
    if(z.k<1){ c.save(); c.globalAlpha=1-z.k; trechoPerto(c,z.i,ox,t,n); c.restore(); }
    if(z.k>0){ c.save(); c.globalAlpha=z.k; trechoPerto(c,z.j,ox,t,n+7); c.restore(); } });
  /* a placa de cada bioma fica na fronteira, no mundo (mesma paralaxe do plano perto) */
  for(var i=0;i<6;i++){ var wx=LIM[i]*mw+(i?60:120), sx=(wx-480)*.45+480-cam; if(sx<-80||sx>W+80) continue; placaBioma(c,sx,452,BIO[i].nome,BIO[i].cor); }
}
function longeAmz(c,cam,t){ var z=zonaK(heroX()), m=mix(BIO[z.i].morro,BIO[z.j].morro,z.k);
  if(z.i===5||(z.j===5&&z.k>0)){ c.fillStyle='#2f8fd0'; c.fillRect(0,330,W,70); c.fillStyle='rgba(255,255,255,.35)'; for(var x=0;x<W;x+=40) el(c,x+((t*10)%40),336+(x/40%2)*6,10,1.5); c.fill(); }
  morro(c,330,22,.006,cam*.4,cla(m,.2)); morro(c,360,14,.009,cam*.6+200,m);
  var P=120; rep(cam,P,function(ox){ if(ox>W+40||ox<-P-40) return; var L=ox+cam, wx=(L+P/2-480)/.15+480, zi=zona(wx), n=Math.round(L/P), y=morroY(ox+60,360,14,.009,cam*.6+200)+4;
    if(zi===0) arvoreR(c,ox+60,y,40+hash(n)*20,'#1f6b3a','#2f8a44','#4a3018'); else if(zi===1) arvoreTorta(c,ox+60,y,30+hash(n)*14,n); else if(zi===2) cacto(c,ox+60,y,26+hash(n)*16,n); else if(zi===3) TH.capimPampas(c,ox+60,y,12,t,n); else if(zi===4){ c.fillStyle='#5fb3a0'; el(c,ox+60,y,40,5); c.fill(); } else arvoreR(c,ox+60,y,36+hash(n)*18,'#2f6f3a','#4f9a4c','#4a3018'); });
  c.fillStyle=mix(BIO[z.i].grama.c1,BIO[z.j].grama.c1,z.k); c.fillRect(0,392,W,H-392);
  bruma(c,300,452,'rgba(255,242,207,.35)');
}
function chaoAmz(c,s){
  var f=faixa(c,s,30), a=f[0], b=f[1], x; if(b<=a) return;
  c.save(); c.beginPath(); c.rect(s.x,s.y-20,s.w,s.h+20); c.clip();
  for(x=grade(a,45);x<b;x+=45){ var z=BIO[zona(x+22)]; c.fillStyle=lin(c,0,s.y,0,s.y+Math.min(s.h,150),z.chao,esc(z.chao,.5)); c.fillRect(x,s.y,45,s.h);
    c.fillStyle='rgba(0,0,0,.12)'; el(c,x+hash(x)*30,s.y+24+hash(x+1)*(Math.min(s.h,90)-30),5+hash(x+2)*4,3); c.fill();
    topoGrama(c,{x:x,y:s.y,w:45,h:s.h},Math.max(a,x),Math.min(b,x+45),z.grama); }
  bordas(c,s,'rgba(40,20,10,.35)'); c.fillStyle='rgba(0,0,0,.18)'; c.fillRect(s.x,s.y+s.h-8,s.w,8);
  c.restore();
}
function platAmz(c,p){ /* galho grosso com folhas: a trilha passa por cima das árvores */
  sombraPlat(c,p,5); var x;
  c.fillStyle=lin(c,0,p.y,0,p.y+p.h,'#a8743f','#5a3618'); rr(c,p.x,p.y,p.w,p.h,p.h/2); c.fill();
  c.strokeStyle='rgba(40,20,5,.35)'; c.lineWidth=1.2; for(x=p.x+10;x<p.x+p.w-8;x+=18) linha(c,x,p.y+4,x+7,p.y+p.h-4);
  c.fillStyle='rgba(255,255,255,.25)'; c.fillRect(p.x+4,p.y+2,p.w-8,2);
  c.fillStyle='#4fa844'; for(x=p.x+8;x<p.x+p.w-6;x+=14){ if(hash(x*.9)>.35){ el(c,x,p.y-1,8,4); c.fill(); c.fillStyle='#8fd860'; el(c,x-2,p.y-2,3,1.5); c.fill(); c.fillStyle='#4fa844'; } }
  if(p.w>=90&&hash(p.x)>.5) flor(c,p.x+p.w*.75,p.y-5,3,'#f472b6');
}

/* ============================================================
   A MARGEM DO RIO (chefão e final)
   ============================================================ */
function limpo(){ var J=jogo(); if(!J) return 0; if(J.estado==='final') return 1; var C=J.chefe; if(C&&C.fase==='derrota') return Math.min(1,(C.t||0)/2.5); return 0; }
function ceuMar(c,t){ var k=limpo(); ceuG(c,[[0,mix('#8a9aa0','#3f9be6',k)],[.55,mix('#c8c2a8','#a9dcf8',k)],[1,mix('#e0d6b0','#fff2cf',k)]]);
  if(k>0){ c.save(); c.globalAlpha=k; sol(c,790,90,30,'#fff3c4','rgba(255,244,200,.35)'); c.restore(); } nuvens(c,t,60,4,3);
  if(k<1){ c.save(); c.globalAlpha=(1-k)*.5; c.fillStyle='#6b7280'; for(var i=0;i<4;i++){ var x=((i*260+t*6)%(W+300))-150; el(c,x,120+(i%2)*40,70,16); c.fill(); el(c,x+40,110+(i%2)*40,50,14); c.fill(); } c.restore(); }
}
function toco(c,x,y,s){ c.save(); c.translate(x,y); c.scale(s,s); c.fillStyle='#8a5a34'; c.fillRect(-12,-22,24,22); c.fillStyle='#6b4428'; c.fillRect(-12,-22,5,22); c.fillStyle='#e8c89a'; el(c,0,-22,13,5); c.fill(); c.strokeStyle='#b8905a'; c.lineWidth=1; el(c,0,-22,8,3); c.stroke(); el(c,0,-22,4,1.5); c.stroke(); c.fillStyle='#6b4428'; c.beginPath(); c.moveTo(-12,0); c.lineTo(-20,2); c.lineTo(-12,-6); c.fill(); c.beginPath(); c.moveTo(12,0); c.lineTo(20,2); c.lineTo(12,-6); c.fill(); c.restore(); }
function lixo(c,x,y,seed){ var k=Math.floor(hash(seed)*4);
  if(k===0){ c.fillStyle='#1f2937'; el(c,x,y-12,16,12); c.fill(); c.fillStyle='#374151'; el(c,x-4,y-16,6,4); c.fill(); c.fillStyle='#1f2937'; c.fillRect(x-3,y-26,6,8); }
  else if(k===1){ c.fillStyle='#1f2937'; circ(c,x,y-10,12); c.fill(); c.fillStyle='#4b5563'; circ(c,x,y-10,5); c.fill(); }
  else if(k===2){ c.fillStyle='#22c55e'; rr(c,x-4,y-20,8,20,2); c.fill(); c.fillStyle='#86efac'; c.fillRect(x-2,y-24,4,5); c.fillStyle='#f97316'; rr(c,x+6,y-10,7,10,1); c.fill(); }
  else { c.fillStyle='#f8fafc'; rr(c,x-10,y-18,20,18,4); c.fill(); c.fillStyle='#dc2626'; c.fillRect(x-7,y-10,14,3); c.fillStyle='#f8fafc'; rr(c,x+8,y-14,12,14,3); c.fill(); }
}
function longeMar(c,cam,t){ var k=limpo(), x;
  morro(c,300,18,.006,cam*.3,mix('#9aa090','#9fd08a',k)); morro(c,330,14,.009,cam*.5+200,mix('#8a9480','#7fbf6a',k));
  /* o rio: sujo (marrom-cinza, com coisas boiando) ou limpo (azul-verde, com peixes pulando) */
  c.fillStyle=lin(c,0,340,0,400,mix('#8a8a70','#5fb3d0',k),mix('#6a6a56','#2f8fb0',k)); c.fillRect(0,340,W,60);
  c.fillStyle='rgba(255,255,255,'+(.15+.3*k)+')'; for(x=0;x<W;x+=48) el(c,x+((t*12)%48),350+(x/48%2)*8,12,1.5); c.fill();
  rep(cam*.6,1400,function(ox){ if(ox>W+80||ox<-1480) return;
    if(k<1){ c.save(); c.globalAlpha=1-k; c.fillStyle='#4b5563'; [[120,0],[460,1],[900,0],[1200,1]].forEach(function(p){ var px=ox+p[0]+Math.sin(t*.5+p[1])*6, py=362+p[1]*14; el(c,px,py,14,4); c.fill(); if(p[1]) { c.fillStyle='#f8fafc'; rr(c,px-4,py-10,8,10,2); c.fill(); c.fillStyle='#4b5563'; } }); c.restore(); }
    if(k>0){ c.save(); c.globalAlpha=k; for(var i=0;i<3;i++){ var ph=((t*.5+i*.37)%1), fx=ox+300+i*450, fy=372-Math.sin(ph*PI)*30; TH.peixinho(c,fx+ph*40,fy,1,1,'#e8a040'); } c.restore(); }
    /* margem de lá: metade com mata ciliar de pé, metade derrubada (tocos e terra marrom) */
    for(var j=0;j<6;j++) arvoreR(c,ox+50+j*110,340,46+hash(j)*20,'#2f6f3a','#4f9a4c','#4a3018');
    c.fillStyle='#a06a3a'; c.fillRect(ox+700,316,700,24); c.fillStyle='rgba(0,0,0,.08)'; for(x=ox+710;x<ox+1400;x+=36) c.fillRect(x,322,16,3);
    for(j=0;j<7;j++) toco(c,ox+760+j*95,338,.8);
    if(k>0){ c.save(); c.globalAlpha=k; for(j=0;j<5;j++){ c.fillStyle='#4fa844'; el(c,ox+790+j*140,336,9,12); c.fill(); flor(c,ox+820+j*140,334,2.5,'#fde047'); } c.restore(); }
  });
  c.fillStyle=mix('#7a7a5a','#8cc47e',k); c.fillRect(0,400,W,H-400);
  bruma(c,300,452,'rgba(230,220,190,.35)');
}
function pertoMar(c,cam,t){ var k=limpo();
  rep(cam,1200,function(ox){ if(ox>W+80||ox<-1280) return; var i;
    arvoreR(c,ox+80,452,170,'#2f6f3a','#4f9a4c','#6b4428'); toco(c,ox+300,452,1.3); toco(c,ox+900,452,1.1); arvoreR(c,ox+1100,452,150,'#3f8a44','#6fbf5e','#6b4428');
    if(k<1){ c.save(); c.globalAlpha=1-k; for(i=0;i<9;i++) lixo(c,ox+140+i*120+hash(i)*40,452,i+ox*0); c.fillStyle='rgba(120,120,120,.35)'; for(i=0;i<3;i++){ var fy=452-60-((t*12+i*40)%120); el(c,ox+520+i*20+Math.sin(t+i)*6,fy,12+i*3,8); c.fill(); } c.restore(); }
    if(k>0){ c.save(); c.globalAlpha=k; TH.bromelia(c,ox+200,452,.8,1); TH.bromelia(c,ox+700,452,.7,2); TH.capivara(c,ox+500,452,1,-1,t); arara(c,ox+84,452-170,.9,1,t); for(i=0;i<6;i++) flor(c,ox+150+i*180,448,3,['#f472b6','#fde047','#fff'][i%3]); c.restore(); }
    arbusto(c,ox+420,452,40,'#3f7a3c','#5fae4f',k>0?['#f472b6','#fff']:[],11);
  });
}
function chaoMar(c,s){ var k=limpo();
  var f=faixa(c,s,30), a=f[0], b=f[1], x; if(b<=a) return;
  c.save(); c.beginPath(); c.rect(s.x,s.y-20,s.w,s.h+20); c.clip();
  c.fillStyle=lin(c,0,s.y,0,s.y+Math.min(s.h,150),mix('#6b5a3a','#8a5a2a',k),mix('#3a3020','#4a2c12',k)); c.fillRect(s.x,s.y,s.w,s.h);
  c.fillStyle='rgba(0,0,0,.12)'; for(x=grade(a,30);x<b;x+=30){ el(c,x+hash(x)*20,s.y+22+hash(x+1)*(Math.min(s.h,100)-30),5+hash(x+2)*4,3); c.fill(); }
  topoGrama(c,s,a,b,{c0:mix('#8a9a5a','#8fd860',k),c1:mix('#5a6a3a','#4c9c37',k),luz:mix('#a0a870','#a8e67c',k),fio:[mix('#7a8a4a','#74c64e',k),mix('#6a7a3a','#5fb043',k)]});
  if(k<1){ c.save(); c.globalAlpha=1-k; for(x=grade(a,70);x<b;x+=70){ if(hash(x*1.3)>.5){ c.fillStyle=['#f8fafc','#22c55e','#f97316'][Math.floor(hash(x)*3)]; rr(c,x+hash(x+2)*40,s.y-3,8,5,1); c.fill(); } } c.restore(); }
  if(k>0){ c.save(); c.globalAlpha=k; for(x=grade(a,60);x<b;x+=60){ if(hash(x*1.1)>.5) flor(c,x+hash(x+5)*30,s.y-4,2.2,['#fff','#f9a8d4','#fde047'][Math.floor(hash(x)*3)]); } c.restore(); }
  bordas(c,s,'rgba(40,20,10,.35)'); c.fillStyle='rgba(0,0,0,.18)'; c.fillRect(s.x,s.y+s.h-8,s.w,8);
  c.restore();
}
function platMar(c,p){ /* deque de tábuas sobre estacas, na beira do rio */
  sombraPlat(c,p,3); var x;
  c.fillStyle='#5a3618'; for(x=p.x+10;x<p.x+p.w;x+=50) c.fillRect(x-3,p.y+p.h-2,6,16);
  c.fillStyle=lin(c,0,p.y,0,p.y+p.h,'#d6a46a','#8a5a2a'); rr(c,p.x,p.y,p.w,p.h,2); c.fill();
  c.strokeStyle='rgba(60,30,10,.35)'; c.lineWidth=1.2; for(x=p.x+20;x<p.x+p.w;x+=20) linha(c,x,p.y+1,x,p.y+p.h-1); c.fillStyle='rgba(255,255,255,.4)'; c.fillRect(p.x+2,p.y+1,p.w-4,2);
  c.fillStyle='#1f2937'; for(x=p.x+10;x<p.x+p.w-4;x+=20) c.fillRect(x-1,p.y+p.h-4,2,2);
  if(p.w>=90&&limpo()>.5) TH.bromelia(c,p.x+p.w*.75,p.y+2,.5,p.x);
}
/* desenho do chefão que ficava no castelo (tochas e janelas de relâmpago): agora, lampiões da margem */
A.margemDeco=function(c,t,C){ var T=45; [[1.5*T,5*T],[8*T,4*T],[15*T,5*T]].forEach(function(p,i){ c.fillStyle='#4b5563'; c.fillRect(p[0]-2,p[1],4,40); c.fillStyle='#374151'; rr(c,p[0]-8,p[1]-14,16,16,3); c.fill(); var f=.8+.2*Math.sin(t*1.2+i); c.fillStyle='rgba(255,230,150,'+(.25*f)+')'; circ(c,p[0],p[1]-6,22); c.fill(); c.fillStyle='#fde68a'; circ(c,p[0],p[1]-6,4); c.fill(); }); };

/* ============================================================
   A JANELA DA MARIANA (abertura)
   ============================================================ */
function ceuJan(c,t){ ceuG(c,[[0,'#f9e2c8'],[.6,'#f3d2b0'],[1,'#e6bf98']]); c.fillStyle='rgba(255,255,255,.18)'; for(var py=20;py<H;py+=40) for(var px=(py/40%2)*30;px<W;px+=60){ circ(c,px,py,5); c.fill(); } }
function longeJan(c,cam,t){
  /* a janela grande com a rua lá fora */
  var X=330, Y=60, Wj=420, Hj=260; c.fillStyle='#8a5a34'; rr(c,X-14,Y-14,Wj+28,Hj+28,8); c.fill();
  c.save(); c.beginPath(); c.rect(X,Y,Wj,Hj); c.clip(); ceuG(c,[[0,'#3f9be6'],[.5,'#a9dcf8'],[1,'#fff2cf']]); sol(c,X+340,Y+50,22,'#fff3c4','rgba(255,244,200,.35)'); for(var i=0;i<3;i++) nuvemF(c,X+40+i*150+((t*4)%60),Y+30+(i%2)*20,.6,'#fff','#dbe9f6',.9);
  morro(c,Y+150,10,.01,0,'#bcdcc8'); c.fillStyle='#a9d39c'; c.fillRect(X,Y+170,Wj,Hj-170);
  c.save(); c.translate(X-20,Y+208); c.scale(.6,.6); casa(c,0,0,160,92,51); c.translate(230,0); casa(c,0,0,150,84,52); c.translate(220,0); TH.loja(c,0,0,190,96,53,'PADARIA','#d97706',true); c.restore();
  arvoreRua(c,X+150,Y+210,60,54); arvoreRua(c,X+320,Y+210,70,55); poste(c,X+240,Y+210,90);
  c.fillStyle='#4b4f5a'; c.fillRect(X,Y+222,Wj,Hj-222); c.fillStyle='#f5c518'; for(i=X;i<X+Wj;i+=40) c.fillRect(i,Y+240,20,3); TH.carro(c,X+120+Math.sin(t*.3)*10,Y+250,'#2563eb',1);
  c.restore();
  c.strokeStyle='#8a5a34'; c.lineWidth=6; linha(c,X+Wj/2,Y,X+Wj/2,Y+Hj); linha(c,X,Y+Hj*.45,X+Wj,Y+Hj*.45);
  c.fillStyle='#a8743f'; rr(c,X-24,Y+Hj+10,Wj+48,14,3); c.fill(); /* peitoril */
  c.fillStyle='#e11d48'; c.fillRect(X-14,Y-14,30,Hj+28); c.fillRect(X+Wj-16,Y-14,30,Hj+28); c.fillStyle='rgba(0,0,0,.1)'; c.fillRect(X-14,Y-14,8,Hj+28); c.fillRect(X+Wj+6,Y-14,8,Hj+28);
  /* o quarto: cama, estante com plantas, quadro com o croqui do bairro */
  c.fillStyle='#7a4a2a'; c.fillRect(40,392,130,8); c.fillRect(44,400,8,52); c.fillRect(158,400,8,52); c.fillStyle='#f8fafc'; rr(c,44,372,122,22,4); c.fill(); c.fillStyle='#60a5fa'; rr(c,44,386,122,30,4); c.fill(); c.fillStyle='#fff'; rr(c,52,364,36,12,4); c.fill();
  c.fillStyle='#8a5a34'; c.fillRect(60,200,120,8); c.fillRect(60,260,120,8); c.fillStyle='#c2410c'; c.beginPath(); c.moveTo(80,200); c.lineTo(100,200); c.lineTo(97,178); c.lineTo(83,178); c.fill(); c.fillStyle='#22c55e'; el(c,90,172,12,6); c.fill(); for(var k=0;k<5;k++){ c.fillStyle=['#c0392b','#2c6fb5','#2f8f57','#e0a020','#7b4fa8'][k]; c.fillRect(110+k*12,236,10,24); }
  c.fillStyle='#f4ead6'; c.fillRect(800,120,120,90); c.strokeStyle='#92400e'; c.lineWidth=4; c.strokeRect(800,120,120,90); c.strokeStyle='#64748b'; c.lineWidth=1.5; linha(c,800,150,920,150); linha(c,800,180,920,180); linha(c,840,120,840,210); linha(c,880,120,880,210); c.fillStyle='#ef4444'; circ(c,860,165,4); c.fill(); c.fillStyle='#22c55e'; circ(c,820,135,4); c.fill(); c.fillStyle='#2563eb'; circ(c,900,195,4); c.fill();
  c.fillStyle='#a8743f'; c.fillRect(0,440,W,12); c.fillStyle='#8a5a2a'; c.fillRect(0,452,W,H-452);
}
function pertoJan(c,cam,t){ /* o Bem-te-vi no peitoril */ if(A.morador) A.morador(c,'tic',690,330+Math.sin(t*1.2)*3,t,-1,false); }
function chaoJan(c,s){ c.fillStyle='#8a5a2a'; c.fillRect(s.x,s.y,s.w,s.h); c.fillStyle='#a8743f'; c.fillRect(s.x,s.y,s.w,12); }
function platJan(c,p){ c.fillStyle='#a8743f'; rr(c,p.x,p.y,p.w,p.h,3); c.fill(); }

/* ---------- submundo das outras fases: por baixo da cidade/do campo (bueiro, toca, raízes), sem tochas ---------- */
function fundoToca(c,cam,t){
  ceuG(c,[[0,'#2a1a10'],[.5,'#3a2616'],[1,'#4a3220']]);
  rep(cam,420,function(ox){ if(ox>W+40||ox<-460) return; var n=Math.round((ox+cam)/420);
    c.strokeStyle='#5a3a22'; c.lineWidth=5; c.lineCap='round'; for(var k=0;k<4;k++){ var rx=ox+40+k*100+hash(n+k)*40; c.beginPath(); c.moveTo(rx,0); c.quadraticCurveTo(rx+20,80+hash(n*3+k)*60,rx-10+hash(n+k*5)*40,160+hash(n+k)*80); c.stroke(); c.lineWidth=3; c.beginPath(); c.moveTo(rx+8,60); c.lineTo(rx+30,110); c.stroke(); c.lineWidth=5; }
    c.fillStyle='#6b5a4a'; rr(c,ox+200,120,160,34,17); c.fill(); c.fillStyle='#4a3a2a'; rr(c,ox+204,124,152,26,13); c.fill(); c.fillStyle='#8a7a6a'; c.fillRect(ox+230,116,8,42); c.fillRect(ox+320,116,8,42); /* cano do bueiro */
    c.fillStyle='rgba(0,0,0,.25)'; el(c,ox+100+hash(n)*200,300+hash(n+1)*100,40,22); c.fill(); /* toca do tatu */
    var lx=ox+360, f=.8+.2*Math.sin(t*1.1+n); c.fillStyle='#374151'; c.fillRect(lx-2,0,4,60); rr(c,lx-10,58,20,16,4); c.fill(); c.fillStyle='rgba(255,230,150,'+(.22*f)+')'; circ(c,lx,76,90); c.fill(); c.fillStyle='#fde68a'; circ(c,lx,70,5); c.fill(); /* lâmpada de obra */
  });
  c.fillStyle='rgba(0,0,0,.35)'; c.fillRect(0,0,W,90); c.fillStyle='#3a2616'; c.fillRect(0,86,W,8);
}
var subT=A.fundoSub;
A.fundoSub=function(c,cena,cam,t){
  var real=cena; try{ var J=jogo(); if(J&&J.mundo&&J.mundo.cena) real=J.mundo.cena; }catch(e){}
  if(real==='sub_caverna'){ c.save(); fundoToca(c,cam||0,t||0); c.restore(); return; }
  if(subT) subT(c,cena,cam,t);
};

/* ---------- registro das cenas ---------- */
A.TH.F.amazonia={ceu:ceuAmz,longe:longeAmz,perto:pertoAmz,chao:chaoAmz,plat:platAmz};
A.TH.F.margem  ={ceu:ceuMar,longe:longeMar,perto:pertoMar,chao:chaoMar,plat:platMar};
A.TH.F.janela  ={ceu:ceuJan,longe:longeJan,perto:pertoJan,chao:chaoJan,plat:platJan};
A.TH.toco=toco; A.TH.lixo=lixo; A.TH.arara=arara; A.TH.BIO=BIO; A.TH.limpo=limpo;
})();
