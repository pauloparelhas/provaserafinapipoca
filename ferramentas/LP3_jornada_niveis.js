/* ============================================================
   LP3_jornada_niveis.js — as fases DESENHADAS À MÃO em tiles.
   Tile = 45 px; 12 linhas (0 = topo, 10-11 = chão). Cada fase é
   uma sequência de "pedaços" (desenhados aqui em ASCII, arrumados
   à mão em LP3_jornada_fases.js) + um SUBMUNDO próprio.

   LEGENDA
     #  chão/bloco sólido        =  plataforma (só por cima)
     B  tijolo quebrável         ?  caixa → ARENA (5 perguntas)   M  caixa → ARENA GRANDE (10 rápidas)
     o  moeda                    O  moeda grande
     H  pote de mel (cresce)     A  capa (planar)   J  bota (pulo duplo)   N  pinhas (3 arremessos)   Z  patins
     ^  espinhos no chão         v  pingente de gelo (cai quando passa)
     S  mola                     f  plataforma que cai
     W  água (cair = volta)      m  plataforma móvel (vai e volta →)
     n  plataforma móvel (↕)     T  gerador de troncos rolando (←)
     1-4 cano (2 colunas, "11"; mesmo número = par no outro mundo)
     c  checkpoint   F  mastro final   U  início do urso
     b castor  r guaxinim  k gambá  g ganso-do-canadá (voa)  w carcaju
     e  bicho "da fase" (substituído pelos bichos da fase, em rodízio)
   Os pedaços que carregam um item recebem o caractere do item (it):
   '?' arena, 'H' mel, 'A' capa, 'J' bota, 'N' pinhas, 'O' moeda grande.
   ============================================================ */
window.NIVEIS = (function(){
'use strict';
var T=45, LINHAS=12;

function P(w,g,rows){ return {w:w,g:g,rows:rows||{}}; }
function rep(ch,n){ var s=''; while(n-->0) s+=ch; return s; }
var G=function(n){ return rep('#',n); };
function I(it){ return it||'?'; }

/* ---------- biblioteca de pedaços ---------- */
var C={
  start:     function(){ return P(6,G(6),{9:'  U   '}); },
  flat:      function(n){ return P(n,G(n)); },
  gap:       function(n){ return P(n,rep(' ',n)); },
  water:     function(n){ return P(n,rep('W',n)); },
  coins:     function(){ return P(7,G(7),{7:' ooooo '}); },
  coinsArc:  function(){ return P(9,G(9),{7:'  o   o  ',6:'   ooo   '}); },
  box:       function(it){ return P(7,G(7),{6:'   '+I(it)+'   '}); },
  boxM:      function(){ return P(7,G(7),{6:'   M   ',8:' o   o '}); },
  boxHi:     function(it){ return P(9,G(9),{3:'    '+I(it)+'    ',8:'  ===    ',7:'    o    '}); },
  stairs:    function(it){ return P(13,G(13),{2:'      '+I(it)+'      ',6:'    ===      ',8:' ===         ',5:'     o o     '}); },
  stairsDown:function(it){ return P(13,G(13),{2:'      '+I(it)+'      ',6:'      ===    ',8:'         === ',5:'     o o     '}); },
  bricks:    function(it){ return P(9,G(9),{6:'  BB'+I(it)+'BB  '}); },
  bricksHi:  function(it){ return P(11,G(11),{3:'  '+I(it)+'        ',5:'   BBBBB   ',7:'    ooo    ',8:'  ==   ==  '}); },
  pipe:      function(d){ return P(8,G(8),{8:'   '+d+d+'   '}); },
  enemy:     function(){ return P(10,G(10),{9:'    e     ',7:'  o    o  '}); },
  enemy2:    function(){ return P(14,G(14),{9:'   e     e    ',7:'   o o o o    '}); },
  spikes:    function(){ return P(9,G(9),{9:'   ^^^   '}); },
  spikesPlat:function(it){ return P(11,G(11),{9:'  ^^^^^^   ',7:'  =======  ',3:'     '+I(it)+'     '}); },
  spring:    function(it){ return P(12,G(12),{9:'  S         ',4:'     ====   ',3:'      O     ',1:'       '+I(it)+'    '}); },
  springCoin:function(){ return P(10,G(10),{9:'   S      ',2:'     O    ',4:'    ===   '}); },
  moverH:    function(){ return P(14,G(2)+rep(' ',10)+G(2),{8:'  m           '}); },
  moverH2:   function(){ return P(16,G(2)+rep(' ',12)+G(2),{8:'  m           ',5:'      o o     '}); },
  moverV:    function(it){ return P(12,G(12),{9:'  n         ',4:'     ====   ',3:'      O     ',1:'      '+I(it)+'     '}); },
  falling:   function(){ return P(12,G(2)+rep(' ',8)+G(2),{8:'   ff  ff   '}); },
  icicles:   function(){ return P(10,G(10),{0:G(10),1:G(10),2:G(10),3:'  vvvvvv  ',7:'    oo    '}); },
  goose:     function(){ return P(12,G(12),{5:'     g      ',7:' o        o '}); },
  tronco:    function(it){ return P(16,G(16),{9:'              T ',6:'    '+I(it)+'     o     '}); },
  checkpoint:function(){ return P(5,G(5),{9:'  c  '}); },
  end:       function(){ return P(12,G(12),{9:'     F      '}); },
  hill:      function(it){ return P(12,G(12),{4:'      '+I(it)+'     ',8:'    ####    ',9:'    ####    '}); },
  hill2:     function(it){ return P(14,G(14),{8:'    ######    ',9:'    ######    ',6:'       ##     ',7:'       ##     ',3:'      '+I(it)+'       ',4:'        o     '}); },
  bigcoin:   function(){ return P(9,G(9),{8:' ==      ',6:'    ==   ',4:'      == ',3:'       O '}); },
  pitfall:   function(){ return P(10,G(3)+rep(' ',4)+G(3),{7:'   ====   ',5:'    oo    '}); },
  pitfallW:  function(){ return P(10,G(3)+rep('W',4)+G(3),{7:'   ====   ',5:'    oo    '}); },
  tower:     function(it){ return P(12,G(12),{8:'  ==   ==   ',6:'    ===     ',4:'  ==   ==   ',2:'    ==      ',1:'     O      ',0:'   '+I(it)+'        '}); },
  logs:      function(){ return P(16,G(2)+rep('W',12)+G(2),{8:'  m     m     ',5:'      o  o    '}); },
  skyBox:    function(it){ return P(10,G(10),{7:'   ====   ',3:'    '+I(it)+'     ',5:'    o     '}); },
  item:      function(it){ return P(6,G(6),{7:'  '+I(it)+'   '}); },
  vines:     function(){ return P(14,G(3)+rep(' ',8)+G(3),{6:'      oo      ',8:'   ff   ff    '}); }
};

/* ---------- submundos (mapas inteiros, à mão) ---------- */
var SUBS={
  caverna:[
    '############################',
    '############################',
    '##                        ##',
    '##     o o o              ##',
    '##                   H    ##',
    '##        ===             ##',
    '##      ?       BBB  ===  ##',
    '##                        ##',
    '##  11       o o      22  ##',
    '##  11   ===        o 22  ##',
    '############################',
    '############################'],
  gelo:[
    '############################',
    '############################',
    '##     vv        vv       ##',
    '##                        ##',
    '##                 ?      ##',
    '##   H                    ##',
    '##          ===           ##',
    '##       o o o            ##',
    '##  11   ===      ===  22 ##',
    '##  11      ^^^   O    22 ##',
    '############################',
    '############################'],
  mina:[
    '############################',
    '############################',
    '##          o o o         ##',
    '##                        ##',
    '##    H       ?           ##',
    '##        ===             ##',
    '##                  BBB   ##',
    '##                        ##',
    '##  11    ===    o o  22  ##',
    '##  11          ===   22  ##',
    '############################',
    '############################']
};

/* ---------- monta a grade de uma fase a partir dos pedaços ---------- */
function grade(pedacos){
  var rows=[]; for(var r=0;r<LINHAS;r++) rows.push('');
  pedacos.forEach(function(p){
    for(var r=0;r<LINHAS;r++){
      var s= r>=10 ? (p.rows[r]||p.g) : (p.rows[r]||'');
      rows[r]+=(s+rep(' ',p.w)).slice(0,p.w);
    }
  });
  return rows;
}
function bichos(rows,lista){
  var k=0;
  return rows.map(function(s){ return s.replace(/e/g,function(){ var b=lista[k%lista.length]; k++; return b; }); });
}

return {T:T, LINHAS:LINHAS, C:C, SUBS:SUBS, grade:grade, bichos:bichos};
})();
