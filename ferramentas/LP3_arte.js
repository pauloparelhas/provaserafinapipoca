/* ============================================================
   LP3_arte.js — as ILUSTRAÇÕES do Português · 3º trimestre.

   Tudo desenhado em SVG inline (regra do dono: nada de emoji como
   ilustração). Estilo chapado, contorno suave, cores fixas — a figura
   é a mesma nos temas claro e escuro, porque mora dentro de um quadro
   com fundo próprio.

   API
     LP3ARTE.icone(k)        ícone 100x100 de cada lição (k = tema do banco)
     LP3ARTE.cena(k, rotulo) quadrinho 160x110 de uma cena das histórias
     LP3ARTE.CENAS           lista das chaves de cena disponíveis
   Sem texto dentro do desenho: em 360px ele viraria letra de formiga.
   A fala e a legenda moram no HTML, ao lado do quadro.
   ============================================================ */
window.LP3ARTE = (function(){
'use strict';
var SK='#f6c9a0', INK='#2b1d14', BOCH='#f9a8a8';

function g(x,y,s,inner,flip){
  return '<g transform="translate('+x+' '+y+') scale('+(flip?-s:s)+' '+s+')">'+inner+'</g>';
}
/* rosto padrão: olhos, bochecha e sorriso (ou boca brava) */
function rosto(cy,r,bravo){
  var e=r*.36, ey=cy-r*.08;
  return '<circle cx="0" cy="'+cy+'" r="'+r+'" fill="'+SK+'"/>'+
    '<circle cx="'+(-e)+'" cy="'+ey+'" r="'+(r*.14)+'" fill="'+INK+'"/>'+
    '<circle cx="'+e+'" cy="'+ey+'" r="'+(r*.14)+'" fill="'+INK+'"/>'+
    '<circle cx="'+(-r*.6)+'" cy="'+(cy+r*.38)+'" r="'+(r*.17)+'" fill="'+BOCH+'" opacity=".8"/>'+
    '<circle cx="'+(r*.6)+'" cy="'+(cy+r*.38)+'" r="'+(r*.17)+'" fill="'+BOCH+'" opacity=".8"/>'+
    (bravo
      ? '<path d="M'+(-r*.3)+' '+(cy+r*.5)+' Q0 '+(cy+r*.3)+' '+(r*.3)+' '+(cy+r*.5)+'" stroke="'+INK+'" stroke-width="'+(r*.12)+'" fill="none" stroke-linecap="round"/>'+
        '<path d="M'+(-r*.6)+' '+(ey-r*.32)+' L'+(-r*.15)+' '+(ey-r*.18)+' M'+(r*.6)+' '+(ey-r*.32)+' L'+(r*.15)+' '+(ey-r*.18)+'" stroke="'+INK+'" stroke-width="'+(r*.12)+'" stroke-linecap="round"/>'
      : '<path d="M'+(-r*.28)+' '+(cy+r*.4)+' Q0 '+(cy+r*.65)+' '+(r*.28)+' '+(cy+r*.4)+'" stroke="'+INK+'" stroke-width="'+(r*.12)+'" fill="none" stroke-linecap="round"/>');
}
function pernas(cor){
  return '<rect x="-6" y="-1" width="4" height="8" rx="1.6" fill="'+(cor||SK)+'"/><rect x="2" y="-1" width="4" height="8" rx="1.6" fill="'+(cor||SK)+'"/>'+
    '<ellipse cx="-4" cy="7.4" rx="3.4" ry="1.7" fill="#5b2a12"/><ellipse cx="4" cy="7.4" rx="3.4" ry="1.7" fill="#5b2a12"/>';
}

/* ---------------- personagens (pés em y=7, cabeça perto de y=-56) ---------------- */
var P = {
  chapeu: function(){ return pernas()+
    '<path d="M-15 1 Q-14 -22 0 -40 Q14 -22 15 1 Z" fill="#dc2626"/>'+
    '<path d="M-5 1 L0 -26 L5 1Z" fill="#60a5fa"/>'+
    '<circle cx="0" cy="-48" r="13.5" fill="#dc2626"/>'+
    '<path d="M-13 -44 Q-15 -36 -10 -34" stroke="#b91c1c" stroke-width="2" fill="none"/>'+
    rosto(-45,9)+
    '<path d="M-9 -47 Q-8 -56 0 -56 Q8 -56 9 -47 Q5 -52 0 -51 Q-5 -52 -9 -47Z" fill="#92400e"/>'; },
  mae: function(){ return pernas()+
    '<path d="M-15 1 Q-12 -22 -8 -32 L8 -32 Q12 -22 15 1Z" fill="#2563eb"/>'+
    '<path d="M-7 -1 Q-7 -17 -5 -25 L5 -25 Q7 -17 7 -1Z" fill="#f8fafc" opacity=".92"/>'+
    '<circle cx="-12" cy="-17" r="2.6" fill="'+SK+'"/><circle cx="12" cy="-17" r="2.6" fill="'+SK+'"/>'+
    '<circle cx="0" cy="-57" r="4.5" fill="#78350f"/>'+
    rosto(-42,9)+
    '<path d="M-10 -41 Q-11 -54 0 -54 Q11 -54 10 -41 Q8 -49 0 -49 Q-8 -49 -10 -41Z" fill="#78350f"/>'; },
  vovo: function(){ return pernas('#e5c3a0')+
    '<path d="M-15 1 Q-13 -20 -9 -30 L9 -30 Q13 -20 15 1Z" fill="#7c3aed"/>'+
    '<path d="M-12 -28 L0 -14 L12 -28 Q0 -33 -12 -28Z" fill="#f9a8d4"/>'+
    '<circle cx="0" cy="-56" r="5" fill="#d1d5db"/>'+
    rosto(-41,9)+
    '<path d="M-10 -40 Q-11 -53 0 -53 Q11 -53 10 -40 Q8 -48 0 -48 Q-8 -48 -10 -40Z" fill="#d1d5db"/>'+
    '<circle cx="-3.4" cy="-41.6" r="2.6" fill="none" stroke="#475569" stroke-width="1"/>'+
    '<circle cx="3.4" cy="-41.6" r="2.6" fill="none" stroke="#475569" stroke-width="1"/>'; },
  cacador: function(){ return pernas('#5b3a1e')+
    '<path d="M-14 1 L-12 -30 L12 -30 L14 1Z" fill="#15803d"/>'+
    '<rect x="-14" y="-12" width="28" height="3" fill="#78350f"/>'+
    rosto(-40,9)+
    '<path d="M-8 -36 Q0 -28 8 -36 Q8 -31 0 -29 Q-8 -31 -8 -36Z" fill="#78350f"/>'+
    '<ellipse cx="0" cy="-49" rx="15" ry="3" fill="#7c2d12"/>'+
    '<path d="M-8 -49 Q-8 -59 0 -59 Q8 -59 8 -49Z" fill="#9a3412"/>'+
    '<path d="M6 -55 Q14 -62 12 -52" stroke="#dc2626" stroke-width="2" fill="none"/>'; },
  joao: function(){ return pernas()+
    '<rect x="-7" y="-14" width="14" height="14" rx="2" fill="#1d4ed8"/>'+
    '<path d="M-12 -12 L-10 -30 L10 -30 L12 -12Z" fill="#facc15"/>'+
    '<circle cx="-12" cy="-14" r="2.6" fill="'+SK+'"/><circle cx="12" cy="-14" r="2.6" fill="'+SK+'"/>'+
    rosto(-40,9)+
    '<path d="M-9.5 -42 Q-11 -52 -3 -52 L-1 -55 L1 -51 L4 -54 L5 -50 Q11 -49 9.5 -42 Q6 -48 0 -47 Q-6 -48 -9.5 -42Z" fill="#a16207"/>'; },
  lobo: function(){ return '<path d="M11 -6 Q30 -12 25 -32 Q21 -18 9 -15Z" fill="#6b7280"/>'+
    '<ellipse cx="0" cy="-15" rx="14" ry="19" fill="#6b7280"/>'+
    '<ellipse cx="0" cy="-11" rx="8" ry="12" fill="#d1d5db"/>'+
    '<ellipse cx="-6" cy="4" rx="5" ry="3" fill="#4b5563"/><ellipse cx="6" cy="4" rx="5" ry="3" fill="#4b5563"/>'+
    lobaCabeca(); },
  gigante: function(){ return '<rect x="-11" y="-2" width="8" height="10" rx="2" fill="#57534e"/><rect x="3" y="-2" width="8" height="10" rx="2" fill="#57534e"/>'+
    '<path d="M-20 0 L-17 -40 L17 -40 L20 0Z" fill="#92400e"/>'+
    '<rect x="-20" y="-16" width="40" height="4" fill="#451a03"/>'+
    '<circle cx="-20" cy="-22" r="4.5" fill="'+SK+'"/><circle cx="20" cy="-22" r="4.5" fill="'+SK+'"/>'+
    rosto(-54,13,true)+
    '<path d="M-12 -50 Q-14 -34 0 -32 Q14 -34 12 -50 Q8 -44 0 -45 Q-8 -44 -12 -50Z" fill="#3f2a14"/>'+
    '<path d="M-13 -57 Q-14 -70 0 -70 Q14 -70 13 -57 Q8 -64 0 -63 Q-8 -64 -13 -57Z" fill="#3f2a14"/>'; }
};
function lobaCabeca(touca){
  return '<path d="M-11 -46 L-9 -62 L-2 -52Z" fill="#6b7280"/><path d="M11 -46 L9 -62 L2 -52Z" fill="#6b7280"/>'+
    '<path d="M-9 -49 L-8 -57 L-4 -51Z" fill="#f9a8d4"/><path d="M9 -49 L8 -57 L4 -51Z" fill="#f9a8d4"/>'+
    '<ellipse cx="0" cy="-42" rx="13" ry="12" fill="#6b7280"/>'+
    '<ellipse cx="0" cy="-35" rx="7.5" ry="5.5" fill="#d1d5db"/>'+
    '<ellipse cx="0" cy="-38.5" rx="2.8" ry="2" fill="#111827"/>'+
    '<circle cx="-5" cy="-45" r="2.2" fill="#fde047"/><circle cx="5" cy="-45" r="2.2" fill="#fde047"/>'+
    '<circle cx="-5" cy="-45" r="1" fill="#111827"/><circle cx="5" cy="-45" r="1" fill="#111827"/>'+
    '<path d="M-9 -49.5 L-2.5 -47.5 M9 -49.5 L2.5 -47.5" stroke="#111827" stroke-width="1.4" stroke-linecap="round"/>'+
    '<path d="M-3.5 -32 Q0 -30 3.5 -32" stroke="#111827" stroke-width="1.1" fill="none"/>'+
    (touca ? '<path d="M-14 -46 Q-14 -60 0 -60 Q14 -60 14 -46 Q0 -50 -14 -46Z" fill="#f8fafc"/>'+
             '<path d="M-15 -46 Q0 -51 15 -46" stroke="#f9a8d4" stroke-width="2" fill="none"/>' : '');
}

/* ---------------- objetos e cenário ---------------- */
var O = {
  arvore: function(){ return '<rect x="-3" y="-16" width="6" height="18" fill="#7c4a1e"/>'+
    '<circle cx="0" cy="-26" r="13" fill="#15803d"/><circle cx="-8" cy="-19" r="8" fill="#16a34a"/><circle cx="8" cy="-19" r="8" fill="#16a34a"/>'; },
  casa: function(){ return '<rect x="-18" y="-24" width="36" height="26" fill="#fde68a"/>'+
    '<path d="M-22 -23 L0 -42 L22 -23Z" fill="#b91c1c"/><rect x="-5" y="-12" width="10" height="14" rx="1.5" fill="#92400e"/>'+
    '<rect x="8" y="-18" width="7" height="7" fill="#7dd3fc" stroke="#92400e" stroke-width="1"/>'; },
  cesta: function(){ return '<path d="M-9 -8 Q0 -22 9 -8" stroke="#92400e" stroke-width="2.2" fill="none"/>'+
    '<path d="M-11 -8 L11 -8 L8 2 L-8 2Z" fill="#b45309"/><path d="M-10 -8 L10 -8 L7 -11 L-7 -11Z" fill="#ef4444"/>'+
    '<path d="M-9 -4 L9 -4 M-8 -1 L8 -1" stroke="#78350f" stroke-width=".8"/>'; },
  vaca: function(){ return '<ellipse cx="0" cy="-14" rx="18" ry="11" fill="#f8fafc"/>'+
    '<path d="M-8 -22 Q-2 -18 -6 -12 Q-12 -14 -8 -22Z" fill="#1f2937"/><circle cx="7" cy="-11" r="4" fill="#1f2937"/>'+
    '<rect x="-14" y="-6" width="4" height="12" fill="#f8fafc"/><rect x="10" y="-6" width="4" height="12" fill="#f8fafc"/>'+
    '<rect x="-14" y="4" width="4" height="3" fill="#1f2937"/><rect x="10" y="4" width="4" height="3" fill="#1f2937"/>'+
    '<ellipse cx="-20" cy="-20" rx="7" ry="8" fill="#f8fafc"/><ellipse cx="-22" cy="-15" rx="5" ry="3.5" fill="#fbcfe8"/>'+
    '<circle cx="-18" cy="-23" r="1.1" fill="'+INK+'"/><path d="M-24 -27 L-27 -31 M-16 -27 L-13 -31" stroke="#a16207" stroke-width="1.6" stroke-linecap="round"/>'+
    '<path d="M18 -16 Q24 -10 21 -4" stroke="#94a3b8" stroke-width="1.4" fill="none"/>'; },
  feijoes: function(){ return estrela(-12,-18,4)+estrela(12,-22,3)+estrela(2,-30,2.6)+
    '<ellipse cx="-6" cy="-6" rx="5" ry="3.4" fill="#7c3aed" transform="rotate(-20 -6 -6)"/>'+
    '<ellipse cx="5" cy="-8" rx="5" ry="3.4" fill="#6d28d9" transform="rotate(25 5 -8)"/>'+
    '<ellipse cx="0" cy="-1" rx="5" ry="3.4" fill="#8b5cf6"/>'; },
  galinha: function(){ return '<ellipse cx="0" cy="-12" rx="13" ry="10" fill="#f59e0b"/>'+
    '<path d="M10 -16 Q20 -26 16 -8Z" fill="#b45309"/><circle cx="-10" cy="-22" r="6.5" fill="#f59e0b"/>'+
    '<path d="M-14 -28 Q-12 -32 -10 -28 Q-8 -32 -6 -28Z" fill="#dc2626"/><path d="M-16.5 -22 L-21 -20.5 L-16.5 -19Z" fill="#facc15"/>'+
    '<circle cx="-11.5" cy="-23" r="1.1" fill="'+INK+'"/>'+
    '<ellipse cx="13" cy="-2" rx="5" ry="6.5" fill="#facc15" stroke="#ca8a04" stroke-width="1"/><ellipse cx="11.4" cy="-4.4" rx="1.4" ry="2.2" fill="#fef9c3"/>'+
    '<path d="M-3 -2 L-3 3 M3 -2 L3 3" stroke="#b45309" stroke-width="1.6"/>'; },
  harpa: function(){ return '<path d="M-10 4 L-10 -32 Q8 -34 12 -14 Q14 -2 10 4Z" fill="none" stroke="#ca8a04" stroke-width="3.2" stroke-linejoin="round"/>'+
    '<path d="M-6 3 L-6 -30 M-2 3 L-2 -30 M2 3 L2 -27 M6 3 L6 -22" stroke="#fde68a" stroke-width="1"/>'+
    '<rect x="-13" y="3" width="26" height="3" rx="1.5" fill="#a16207"/>'+estrela(16,-30,3); },
  machado: function(){ return '<rect x="-2" y="-34" width="4" height="38" rx="2" fill="#92400e"/>'+
    '<path d="M2 -34 Q16 -36 16 -22 Q10 -24 2 -24Z" fill="#94a3b8"/><path d="M2 -33 Q13 -34 15 -24" stroke="#e2e8f0" stroke-width="1" fill="none"/>'; },
  nuvem: function(){ return '<circle cx="-10" cy="-4" r="8" fill="#fff"/><circle cx="2" cy="-9" r="10" fill="#fff"/><circle cx="13" cy="-3" r="7" fill="#fff"/><rect x="-16" y="-4" width="34" height="7" rx="3.5" fill="#fff"/>'; },
  castelo: function(){ return '<rect x="-20" y="-28" width="40" height="28" fill="#c4b5fd"/>'+
    '<rect x="-26" y="-40" width="12" height="40" fill="#a78bfa"/><rect x="14" y="-40" width="12" height="40" fill="#a78bfa"/>'+
    '<path d="M-28 -40 L-20 -52 L-12 -40Z M12 -40 L20 -52 L28 -40Z" fill="#7c3aed"/>'+
    '<path d="M-20 -28 h5 v-4 h5 v4 h5 v-4 h5 v4 h5 v-4 h5 v4 h5 v-4 h5 v4" fill="#c4b5fd"/>'+
    '<path d="M-6 0 L-6 -12 Q0 -18 6 -12 L6 0Z" fill="#5b21b6"/>'+
    '<path d="M20 -52 L20 -60 L27 -57 L20 -55" fill="#f43f5e" stroke="#7c3aed" stroke-width=".8"/>'; },
  cama: function(){ return '<rect x="-30" y="-24" width="6" height="28" rx="2" fill="#92400e"/>'+
    '<rect x="-26" y="-10" width="56" height="10" rx="3" fill="#b45309"/>'+
    '<path d="M-22 -12 Q4 -20 30 -12 L30 -2 L-22 -2Z" fill="#60a5fa"/><path d="M-10 -15 L-10 -3 M6 -16 L6 -3 M20 -14 L20 -3" stroke="#93c5fd" stroke-width="1.2"/>'+
    '<rect x="-24" y="-18" width="12" height="7" rx="3" fill="#f8fafc"/>'; },
  pe: function(){ return '<path d="M0 0 C-14 -20 14 -36 -2 -56 C-16 -74 12 -86 2 -106" stroke="#16a34a" stroke-width="5" fill="none" stroke-linecap="round"/>'+
    folha(-6,-14,-30)+folha(7,-30,30)+folha(-8,-48,-35)+folha(6,-66,25)+folha(-6,-84,-30); },
  janela: function(){ return '<rect x="-16" y="-34" width="32" height="34" rx="2" fill="#7dd3fc" stroke="#92400e" stroke-width="3"/>'+
    '<path d="M0 -34 L0 0 M-16 -17 L16 -17" stroke="#92400e" stroke-width="2"/>'; },
  lampada: function(){ return '<path d="M-12 -30 A14 14 0 1 1 12 -30 Q8 -24 7 -16 L-7 -16 Q-8 -24 -12 -30Z" fill="#fde047" stroke="#ca8a04" stroke-width="1.4"/>'+
    '<rect x="-7" y="-16" width="14" height="4" fill="#94a3b8"/><rect x="-6" y="-12" width="12" height="4" fill="#64748b"/><rect x="-3" y="-8" width="6" height="3" rx="1.5" fill="#475569"/>'+
    '<path d="M-4 -26 L0 -32 L4 -26" stroke="#ca8a04" stroke-width="1.3" fill="none"/>'; },
  roda: function(){ return '<circle cx="0" cy="-16" r="15" fill="none" stroke="#78350f" stroke-width="4"/>'+
    '<path d="M0 -31 L0 -1 M-15 -16 L15 -16 M-10.6 -26.6 L10.6 -5.4 M10.6 -26.6 L-10.6 -5.4" stroke="#a16207" stroke-width="2"/><circle cx="0" cy="-16" r="3.5" fill="#78350f"/>'; },
  aviao: function(){ return '<path d="M-24 -16 Q-22 -21 -14 -20 L18 -20 Q26 -18 24 -14 L-14 -12 Q-22 -12 -24 -16Z" fill="#e2e8f0" stroke="#64748b" stroke-width="1"/>'+
    '<path d="M-4 -19 L6 -34 L11 -34 L6 -19Z M-2 -13 L8 -2 L13 -2 L8 -13Z" fill="#38bdf8"/><path d="M-22 -18 L-26 -28 L-20 -28 L-16 -19Z" fill="#38bdf8"/>'+
    '<circle cx="14" cy="-16.5" r="1.6" fill="#0ea5e9"/><circle cx="8" cy="-16.5" r="1.6" fill="#0ea5e9"/><circle cx="2" cy="-16.5" r="1.6" fill="#0ea5e9"/>'; },
  fogo: function(){ return '<path d="M0 0 C-14 0 -16 -14 -8 -24 C-8 -16 -4 -16 -4 -20 C-4 -30 2 -34 4 -40 C6 -30 16 -24 12 -10 C10 -4 6 0 0 0Z" fill="#f97316"/>'+
    '<path d="M0 -2 C-7 -2 -8 -10 -3 -15 C-2 -10 2 -12 2 -18 C6 -12 9 -6 5 -3 C4 -2 2 -2 0 -2Z" fill="#fde047"/>'+
    '<path d="M-14 2 L14 -2 M-14 -2 L14 2" stroke="#78350f" stroke-width="3" stroke-linecap="round"/>'; },
  bicicleta: function(){ return '<circle cx="-14" cy="-10" r="9" fill="none" stroke="#334155" stroke-width="2.4"/><circle cx="14" cy="-10" r="9" fill="none" stroke="#334155" stroke-width="2.4"/>'+
    '<path d="M-14 -10 L-4 -26 L10 -26 L14 -10 M-4 -26 L0 -10 L10 -26 M0 -10 L-14 -10" stroke="#ef4444" stroke-width="2.2" fill="none" stroke-linejoin="round"/>'+
    '<path d="M-7 -29 L-1 -29 M10 -26 L8 -32 L13 -32" stroke="#334155" stroke-width="2" stroke-linecap="round" fill="none"/>'; },
  telefone: function(){ return '<rect x="-14" y="-24" width="28" height="22" rx="4" fill="#ef4444"/><path d="M-18 -26 Q0 -36 18 -26 L14 -20 L8 -22 L8 -26 Q0 -29 -8 -26 L-8 -22 L-14 -20Z" fill="#b91c1c"/>'+
    '<circle cx="0" cy="-13" r="6" fill="#fee2e2"/><circle cx="0" cy="-13" r="2" fill="#b91c1c"/>'; },
  relogio: function(){ return '<circle cx="0" cy="-16" r="15" fill="#fef3c7" stroke="#b45309" stroke-width="3"/>'+
    '<path d="M0 -16 L0 -26 M0 -16 L7 -12" stroke="#1f2937" stroke-width="2.2" stroke-linecap="round"/><circle cx="0" cy="-16" r="1.8" fill="#1f2937"/>'; },
  planta: function(){ return '<path d="M0 0 L0 -22" stroke="#15803d" stroke-width="2.6"/>'+folha(0,-8,-40)+folha(0,-14,40)+
    '<circle cx="0" cy="-27" r="5" fill="#f472b6"/><circle cx="0" cy="-27" r="2" fill="#facc15"/>'; },
  bicho: function(){ return '<ellipse cx="0" cy="-10" rx="14" ry="9" fill="#38bdf8"/><circle cx="-12" cy="-18" r="7" fill="#38bdf8"/>'+
    '<circle cx="-14" cy="-19" r="1.6" fill="#0f172a"/><path d="M12 -12 Q22 -18 20 -4" stroke="#0ea5e9" stroke-width="3" fill="none" stroke-linecap="round"/>'+
    '<path d="M-7 -2 L-7 4 M7 -2 L7 4" stroke="#0369a1" stroke-width="3"/><circle cx="2" cy="-12" r="2" fill="#f0abfc"/><circle cx="8" cy="-8" r="1.6" fill="#f0abfc"/>'; },
  livro: function(){ return '<path d="M-22 -4 Q-11 -10 0 -4 L0 -32 Q-11 -38 -22 -32Z" fill="#fff" stroke="#be185d" stroke-width="2"/>'+
    '<path d="M22 -4 Q11 -10 0 -4 L0 -32 Q11 -38 22 -32Z" fill="#fff" stroke="#be185d" stroke-width="2"/>'+
    '<path d="M-17 -26 L-5 -27 M-17 -21 L-5 -22 M-17 -16 L-8 -17 M5 -27 L17 -26 M5 -22 L17 -21 M5 -17 L14 -16" stroke="#f9a8d4" stroke-width="1.6" stroke-linecap="round"/>'+estrela(14,-40,4); },
  coracao: function(){ return '<path d="M0 0 C-22 -14 -20 -34 -9 -34 C-4 -34 -1 -30 0 -27 C1 -30 4 -34 9 -34 C20 -34 22 -14 0 0Z" fill="#f43f5e"/>'+
    '<ellipse cx="-9" cy="-26" rx="3" ry="4" fill="#fff" opacity=".5"/>'+estrela(-18,-38,3.4)+estrela(18,-36,2.6); },
  /* o 14-Bis, em silhueta simples de caixas (é o desenho mais conhecido dele) */
  catorzebis: function(){ return '<rect x="-24" y="-30" width="20" height="12" fill="#fef3c7" stroke="#92400e" stroke-width="1.2"/>'+
    '<path d="M-24 -24 L-4 -24 M-14 -30 L-14 -18" stroke="#92400e" stroke-width=".8"/>'+
    '<rect x="2" y="-36" width="22" height="7" fill="#fef3c7" stroke="#92400e" stroke-width="1.2"/><rect x="2" y="-20" width="22" height="7" fill="#fef3c7" stroke="#92400e" stroke-width="1.2"/>'+
    '<path d="M6 -29 L6 -20 M13 -29 L13 -20 M20 -29 L20 -20 M-4 -24 L24 -24" stroke="#92400e" stroke-width="1.2"/>'+
    '<circle cx="10" cy="-6" r="3" fill="none" stroke="#334155" stroke-width="1.4"/><path d="M10 -13 L10 -9" stroke="#334155" stroke-width="1.2"/>'; }
};
function folha(x,y,rot){ return '<ellipse cx="'+x+'" cy="'+y+'" rx="7" ry="3.4" fill="#22c55e" transform="rotate('+rot+' '+x+' '+y+')"/>'; }
function estrela(x,y,r){
  return '<path d="M'+x+' '+(y-r)+' Q'+x+' '+y+' '+(x+r)+' '+y+' Q'+x+' '+y+' '+x+' '+(y+r)+' Q'+x+' '+y+' '+(x-r)+' '+y+' Q'+x+' '+y+' '+x+' '+(y-r)+'Z" fill="#facc15"/>';
}
function bolha(x,y,w,h,marca){
  return '<g><rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+(h/2)+'" fill="#fff" stroke="#334155" stroke-width="1"/>'+
    '<path d="M'+(x+w*.3)+' '+(y+h-1)+' L'+(x+w*.22)+' '+(y+h+7)+' L'+(x+w*.45)+' '+(y+h-1)+'Z" fill="#fff" stroke="#334155" stroke-width="1"/>'+
    '<rect x="'+(x+w*.25)+'" y="'+(y+h-2)+'" width="'+(w*.24)+'" height="2.4" fill="#fff"/>'+
    '<text x="'+(x+w/2)+'" y="'+(y+h*.72)+'" text-anchor="middle" font-family="Arial,sans-serif" font-weight="900" font-size="'+(h*.7)+'" fill="#dc2626">'+marca+'</text></g>';
}

/* ---------------- fundos ---------------- */
var F = {
  ceu: '<rect width="160" height="110" fill="#cfeeff"/><circle cx="140" cy="16" r="9" fill="#fde047"/><rect y="90" width="160" height="20" fill="#86c56b"/>',
  floresta: '<rect width="160" height="110" fill="#d9f2dc"/><rect y="90" width="160" height="20" fill="#5fa84f"/>'+
    g(14,92,1.1,O.arvore())+g(146,92,1.2,O.arvore())+g(80,88,.7,O.arvore()),
  dentro: '<rect width="160" height="110" fill="#fde7c7"/><rect y="90" width="160" height="20" fill="#d9a066"/>'+
    '<path d="M0 90 L160 90" stroke="#b97a3f" stroke-width="1.5"/>',
  noite: '<rect width="160" height="110" fill="#1e3a8a"/><circle cx="24" cy="18" r="8" fill="#fef9c3"/><circle cx="28" cy="15" r="7" fill="#1e3a8a"/>'+
    estrela(60,14,2)+estrela(132,30,2.4)+estrela(100,10,1.6)+'<rect y="96" width="160" height="14" fill="#14532d"/>',
  alto: '<rect width="160" height="110" fill="#bae6fd"/>'+g(20,104,1.6,O.nuvem())+g(70,108,1.8,O.nuvem())+g(130,104,1.7,O.nuvem()),
  salao: '<rect width="160" height="110" fill="#ede9fe"/><rect y="92" width="160" height="18" fill="#a78bfa"/>'+
    '<rect x="66" y="18" width="28" height="40" rx="14" fill="#ddd6fe"/>'
};

/* ---------------- as cenas das duas histórias ---------------- */
var CENAS = {
  /* Chapeuzinho Vermelho — a sequência segura do roteiro */
  ch1: F.ceu+g(80,90,1.25,P.chapeu())+flor(30,90)+flor(130,90)+flor(116,92),
  ch2: F.dentro+g(52,90,1.15,P.mae())+g(108,90,1.05,P.chapeu())+g(82,76,1.1,O.cesta()),
  ch3: F.dentro+g(50,90,1.15,P.mae())+g(112,90,1.05,P.chapeu())+bolha(54,8,26,15,'!'),
  ch4: F.floresta+g(52,92,1.05,P.chapeu())+g(66,84,.8,O.cesta())+g(112,92,1.05,P.lobo()),
  ch5: F.floresta+'<path d="M20 100 Q70 80 120 96" stroke="#fef3c7" stroke-width="5" fill="none" stroke-dasharray="6 5"/>'+
    g(56,94,.85,P.lobo(),true)+g(130,92,1,O.casa()),
  ch6: F.dentro+'<rect x="112" y="24" width="30" height="26" fill="#7dd3fc" stroke="#92400e" stroke-width="2.5"/>'+
    g(84,96,1.3,O.cama())+g(64,97.6,.8,lobaCabeca(true)),
  ch7: F.dentro+g(98,96,1.2,O.cama())+g(80,98,.75,lobaCabeca(true))+g(30,92,1,P.chapeu())+bolha(36,6,24,14,'?'),
  ch8: F.dentro+g(40,92,1.05,P.cacador())+g(88,92,1,P.chapeu())+g(128,92,1,P.vovo()),
  /* João e o pé de feijão */
  jo1: F.ceu+g(26,90,.85,O.casa())+g(64,90,1,P.mae())+g(94,90,.95,P.joao())+g(134,90,.9,O.vaca()),
  jo2: F.ceu+g(48,90,1.1,P.joao())+g(76,74,1.15,O.feijoes())+g(128,90,.95,O.vaca(),true),
  jo3: F.dentro+g(116,72,1.3,O.janela())+g(50,90,1.15,P.mae())+g(112,40,.7,O.feijoes()),
  jo4: F.noite+g(80,104,.86,O.pe())+g(46,22,1.1,O.nuvem())+g(112,18,1.2,O.nuvem()),
  jo5: F.alto+g(112,90,1,O.castelo())+g(42,90,.95,P.joao())+'<path d="M24 110 C20 100 30 96 26 90" stroke="#16a34a" stroke-width="5" fill="none"/>',
  jo6: F.salao+g(50,92,1.35,O.galinha())+g(112,92,1.3,O.harpa()),
  jo7: F.alto+g(104,94,1.05,P.gigante())+g(34,92,.8,P.joao(),true),
  jo8: F.ceu+'<g transform="rotate(18 52 92)">'+g(52,92,.6,O.pe())+'</g>'+'<path d="M44 94 L60 88" stroke="#7c2d12" stroke-width="2.5"/>'+
    g(104,90,1,P.joao())+g(122,74,.8,O.machado()),
  jo9: F.ceu+g(28,90,.85,O.casa())+g(70,90,1,P.mae())+g(100,90,.95,P.joao())+g(136,90,.9,O.galinha())
};
function flor(x,y){ return '<path d="M'+x+' '+y+' L'+x+' '+(y-8)+'" stroke="#15803d" stroke-width="1.5"/><circle cx="'+x+'" cy="'+(y-10)+'" r="3" fill="#f472b6"/><circle cx="'+x+'" cy="'+(y-10)+'" r="1.2" fill="#facc15"/>'; }

function cena(k,rotulo){
  return '<svg class="cena" viewBox="0 0 160 110" role="img" aria-label="'+(rotulo||'')+'" preserveAspectRatio="xMidYMid slice">'+(CENAS[k]||'')+'</svg>';
}

/* ---------------- ícones das 12 lições (100x100) ---------------- */
var I = {
  conto: g(50,90,1.25,O.castelo())+estrela(18,22,5)+estrela(84,14,4)+estrela(76,34,3),
  chapeu: '<circle cx="50" cy="56" r="40" fill="#fee2e2"/>'+g(50,96,1.3,P.chapeu()),
  joao: g(52,102,.86,O.pe())+g(38,18,1,O.nuvem())+g(72,14,.9,O.nuvem()),
  parodia: '<g transform="rotate(-12 36 50)"><path d="M14 30 Q36 20 58 30 Q60 62 36 74 Q12 62 14 30Z" fill="#fde68a" stroke="#a16207" stroke-width="2"/>'+
      '<path d="M24 42 Q28 38 32 42 M40 42 Q44 38 48 42" stroke="#422006" stroke-width="3" fill="none" stroke-linecap="round"/>'+
      '<path d="M26 54 Q36 64 46 54" stroke="#422006" stroke-width="3" fill="none" stroke-linecap="round"/></g>'+
    '<g transform="rotate(12 66 54)"><path d="M44 34 Q66 24 88 34 Q90 66 66 78 Q42 66 44 34Z" fill="#c4b5fd" stroke="#5b21b6" stroke-width="2"/>'+
      '<path d="M54 46 Q58 50 62 46 M70 46 Q74 50 78 46" stroke="#2e1065" stroke-width="3" fill="none" stroke-linecap="round"/>'+
      '<path d="M56 64 Q66 56 76 64" stroke="#2e1065" stroke-width="3" fill="none" stroke-linecap="round"/></g>',
  h: '<rect x="10" y="14" width="56" height="70" rx="12" fill="#e0f2fe" stroke="#0369a1" stroke-width="3"/>'+
    '<text x="38" y="70" text-anchor="middle" font-family="Arial,sans-serif" font-weight="900" font-size="54" fill="#0369a1">H</text>'+
    '<path d="M68 46 L76 46 L86 38 L86 66 L76 58 L68 58Z" fill="#0f172a"/><path d="M62 72 L94 30" stroke="#dc2626" stroke-width="5" stroke-linecap="round"/>',
  jg: '<path d="M44 96 L40 46 L54 46 L58 96Z" fill="#fbbf24"/>'+
    '<circle cx="46" cy="60" r="3.4" fill="#b45309"/><circle cx="52" cy="74" r="3.6" fill="#b45309"/><circle cx="45" cy="86" r="3.2" fill="#b45309"/><circle cx="51" cy="52" r="2.6" fill="#b45309"/>'+
    '<ellipse cx="56" cy="36" rx="20" ry="12" fill="#fbbf24"/><ellipse cx="70" cy="40" rx="8" ry="6" fill="#fde68a"/>'+
    '<circle cx="54" cy="32" r="2.6" fill="'+INK+'"/><path d="M44 26 L42 12 M52 24 L52 10" stroke="#b45309" stroke-width="3" stroke-linecap="round"/>'+
    '<circle cx="42" cy="11" r="3" fill="#92400e"/><circle cx="52" cy="9" r="3" fill="#92400e"/><circle cx="73" cy="39" r="1.3" fill="'+INK+'"/>',
  ggu: '<g transform="rotate(-35 50 50)"><rect x="46" y="4" width="8" height="46" rx="3" fill="#78350f"/><rect x="43" y="0" width="14" height="10" rx="3" fill="#451a03"/>'+
    '<path d="M50 44 C30 44 28 62 36 70 C24 80 32 100 50 100 C68 100 76 80 64 70 C72 62 70 44 50 44Z" fill="#fb923c" stroke="#9a3412" stroke-width="2"/>'+
    '<circle cx="50" cy="72" r="7" fill="#7c2d12"/><rect x="42" y="86" width="16" height="4" rx="2" fill="#7c2d12"/>'+
    '<path d="M48.5 10 L48.5 88 M51.5 10 L51.5 88" stroke="#fef3c7" stroke-width=".8"/></g>',
  dic: '<path d="M8 26 Q28 18 50 28 L50 88 Q28 78 8 86Z" fill="#fff" stroke="#1d4ed8" stroke-width="3"/>'+
    '<path d="M92 26 Q72 18 50 28 L50 88 Q72 78 92 86Z" fill="#fff" stroke="#1d4ed8" stroke-width="3"/>'+
    '<text x="29" y="56" text-anchor="middle" font-family="Arial,sans-serif" font-weight="900" font-size="22" fill="#1d4ed8">A</text>'+
    '<text x="71" y="56" text-anchor="middle" font-family="Arial,sans-serif" font-weight="900" font-size="22" fill="#dc2626">Z</text>'+
    '<path d="M18 66 L40 68 M60 68 L82 66 M18 74 L36 75 M64 75 L82 74" stroke="#93c5fd" stroke-width="2.4" stroke-linecap="round"/>',
  invento: g(50,94,1.55,O.lampada())+'<path d="M50 6 L50 0 M82 20 L89 14 M18 20 L11 14 M90 46 L98 46 M10 46 L2 46" stroke="#ca8a04" stroke-width="3" stroke-linecap="round"/>',
  cqu: '<path d="M8 70 L74 30 L94 70Z" fill="#fde047" stroke="#ca8a04" stroke-width="2.5" stroke-linejoin="round"/>'+
    '<path d="M8 70 L94 70 L94 84 L8 84Z" fill="#facc15" stroke="#ca8a04" stroke-width="2.5" stroke-linejoin="round"/>'+
    '<circle cx="42" cy="62" r="5" fill="#eab308"/><circle cx="66" cy="54" r="4" fill="#eab308"/><circle cx="78" cy="64" r="3" fill="#eab308"/><circle cx="30" cy="77" r="3.4" fill="#eab308"/><circle cx="70" cy="78" r="3" fill="#eab308"/>',
  dig: '<circle cx="30" cy="50" r="20" fill="none" stroke="#0d9488" stroke-width="9"/>'+
    '<path d="M48 50 L94 50 M80 50 L80 64 M90 50 L90 60" stroke="#0d9488" stroke-width="9" stroke-linecap="round"/>'+
    '<circle cx="30" cy="50" r="6" fill="#5eead4"/>',
  /* v2 (12/10): lições do conto como GÊNERO e de paráfrase/paródia */
  cmf: '<path d="M8 50 L92 50" stroke="#94a3b8" stroke-width="4" stroke-linecap="round" stroke-dasharray="2 8"/>'+
    '<circle cx="18" cy="50" r="13" fill="#fb7185"/><circle cx="50" cy="50" r="13" fill="#fbbf24"/><circle cx="82" cy="50" r="13" fill="#34d399"/>'+
    '<text x="18" y="56" text-anchor="middle" font-family="Arial,sans-serif" font-weight="900" font-size="17" fill="#fff">1</text>'+
    '<text x="50" y="56" text-anchor="middle" font-family="Arial,sans-serif" font-weight="900" font-size="17" fill="#fff">2</text>'+
    '<text x="82" y="56" text-anchor="middle" font-family="Arial,sans-serif" font-weight="900" font-size="17" fill="#fff">3</text>',
  elem: '<path d="M22 86 L64 36" stroke="#4c1d95" stroke-width="8" stroke-linecap="round"/>'+
    '<path d="M22 86 L34 72" stroke="#f8fafc" stroke-width="8" stroke-linecap="round"/>'+
    estrela(70,28,18)+estrela(30,22,6)+estrela(86,62,5)+estrela(50,12,4),
  historias: '<circle cx="34" cy="56" r="28" fill="#fee2e2"/><circle cx="70" cy="56" r="28" fill="#dcfce7"/>'+
    g(32,90,.95,P.chapeu())+g(72,92,.95,P.joao()),
  parafrase: '<rect x="6" y="18" width="40" height="30" rx="10" fill="#c4b5fd"/><path d="M16 46 L12 58 L26 47Z" fill="#c4b5fd"/>'+
    '<rect x="54" y="52" width="40" height="30" rx="10" fill="#a5f3fc"/><path d="M84 80 L88 92 L74 81Z" fill="#a5f3fc"/>'+
    '<path d="M14 30 L38 30 M14 38 L32 38 M62 64 L86 64 M62 72 L80 72" stroke="#1e1b4b" stroke-width="3" stroke-linecap="round"/>'+
    '<path d="M44 58 L56 58 M44 66 L56 66" stroke="#7c3aed" stroke-width="4" stroke-linecap="round"/>',
  pp: '<circle cx="50" cy="50" r="40" fill="#e0e7ff"/>'+
    '<text x="50" y="70" text-anchor="middle" font-family="Arial,sans-serif" font-weight="900" font-size="56" fill="#4f46e5">?</text>'+
    estrela(18,22,6)+estrela(84,80,5),
  plural: balao(24,52,12,'#f87171')+'<path d="M40 50 L52 50 M47 44 L53 50 L47 56" stroke="#64748b" stroke-width="3" fill="none" stroke-linecap="round"/>'+
    balao(66,40,10,'#60a5fa')+balao(86,46,10,'#facc15')+balao(74,62,10,'#34d399')
};
function balao(x,y,r,cor){
  return '<path d="M'+x+' '+(y+r)+' Q'+(x-3)+' '+(y+r+12)+' '+(x+2)+' '+(y+r+22)+'" stroke="#64748b" stroke-width="1.4" fill="none"/>'+
    '<ellipse cx="'+x+'" cy="'+y+'" rx="'+r+'" ry="'+(r*1.18)+'" fill="'+cor+'"/>'+
    '<ellipse cx="'+(x-r*.35)+'" cy="'+(y-r*.4)+'" rx="'+(r*.22)+'" ry="'+(r*.35)+'" fill="#fff" opacity=".55"/>'+
    '<path d="M'+(x-2)+' '+(y+r*1.18+2)+' L'+(x+2)+' '+(y+r*1.18+2)+' L'+x+' '+(y+r*1.18-1)+'Z" fill="'+cor+'"/>';
}
function icone(k){
  return '<svg class="icone" viewBox="0 0 100 100" aria-hidden="true">'+(I[k]||'')+'</svg>';
}
/* figurinha avulsa (personagem ou objeto) num quadro quadrado */
function figura(k, fundo){
  var src = P[k] ? P[k]() : (O[k] ? O[k]() : '');
  var ESC={livro:1.45,coracao:1.4,gigante:.84,castelo:.95,pe:.6,casa:1.3,cama:1.05,vaca:1.15,galinha:1.75,harpa:1.6,machado:1.6,
    feijoes:1.7,cesta:2.2,lampada:1.3,roda:1.75,aviao:1.4,fogo:1.4,bicicleta:1.45,telefone:1.8,relogio:1.75,
    planta:1.9,bicho:1.8,catorzebis:1.35,arvore:1.6,janela:1.5,nuvem:1.6};
  var alto = ESC[k] || 1.02;
  return '<svg class="fig" viewBox="0 0 80 80" aria-hidden="true">'+
    '<rect width="80" height="80" rx="12" fill="'+(fundo||'#eef6ff')+'"/>'+g(k==='vaca'?46:40,72,alto,src)+'</svg>';
}

return { icone:icone, cena:cena, figura:figura, CENAS:Object.keys(CENAS) };
})();
