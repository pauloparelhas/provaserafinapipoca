/* ============================================================
   LP3_jornada_partituras.js — as MÚSICAS do jogo, escritas em
   notação compacta e tocadas pelo sequenciador (LP3_jornada_musica.js).

   Notação (cada compasso tem u=8 unidades = colcheias, 4/4):
     "C5"      nota de 1 colcheia          "C5:3"  nota de 3 colcheias
     "."       pausa de 1 colcheia         ".:2"   pausa de 2
     "C4+E4+G4:4"  acorde                  "|"     separa compassos
   Cada peça: bpm, progressão de acordes (1 por compasso, 32 compassos),
   melodia escrita à mão em frases de 8 compassos (forma A A' B A'),
   contracanto (quando escrito) e acompanhamento gerado dos acordes:
   baixo (padrões), harpa/arpejo, pad (tríade sustentada) e percussão.
   ============================================================ */
window.PARTITURAS = (function(){
'use strict';
var M={};

/* ---------- Mapa do Canadá (Dó maior, 100 bpm, 32 compassos) ---------- */
var mapaA ='G4 C5 E5:2 G5:3 E5 | D5:3 B4 G4:4 | A4 C5 E5:2 A5:3 G5 | F5:3 E5 C5:2 A4:2 | G4 C5 E5:2 G5:2 A5 G5 | F5:2 D5:2 B4:2 D5:2 | C5:2 A4 C5 F5:2 E5:2 | D5:4 G5:4';
var mapaA2='G4 C5 E5:2 G5:3 E5 | D5:3 B4 G4:4 | A4 C5 E5:2 A5:3 G5 | F5:3 E5 C5:2 A4:2 | G4 C5 E5:2 G5:2 A5 G5 | F5:2 D5:2 B4:2 D5:2 | C5:2 A4 C5 F5:2 G5:2 | C6:6 .:2';
var mapaB ='A5:2 G5:2 F5:2 E5:2 | E5:2 G5 E5 C5:4 | D5:2 E5:2 G5:3 F5 | E5:4 C5:2 A4:2 | A4 C5 F5:2 A5:2 G5:2 | G5:2 F5:2 D5:3 B4 | C5:2 E5:2 G5:2 C6:2 | B5:4 D5:2 G5:2';
M.mapa={bpm:100, prog:'C G Am F C G F G | C G Am F C G F G | F C G Am F G C G | C G Am F C G F G',
  vozes:[{inst:'flauta', mel:[mapaA,mapaA2,mapaB,mapaA2]}, {inst:'harpa', arp:'sobe'}, {inst:'baixo', baixo:'passeio'}, {inst:'pad', pad:true}, {inst:'perc', pat:'K . H . S . H .'}]};

/* ---------- Bosque (Sol maior, 112 bpm) — floresta, montanha, pradaria, mar ---------- */
var bosA ='D5 G5 B5:2 A5:2 G5:2 | A5:3 F#5 D5:4 | E5 G5 B5:2 E6:3 D6 | C6:2 B5:2 G5:2 E5:2 | D5 G5 B5:2 D6:2 B5 A5 | A5:2 F#5:2 D5:2 E5:2 | E5:2 G5:2 C6:2 E6:2 | D6:4 A5:2 F#5:2';
var bosA2='D5 G5 B5:2 A5:2 G5:2 | A5:3 F#5 D5:4 | E5 G5 B5:2 E6:3 D6 | C6:2 B5:2 G5:2 E5:2 | D5 G5 B5:2 D6:2 B5 A5 | A5:2 F#5:2 D5:2 E5:2 | E5:2 G5:2 C6:2 A5:2 | G5:6 .:2';
var bosB ='E6:2 D6:2 C6:2 B5:2 | B5:2 D6 B5 G5:4 | A5:2 B5:2 D6:3 C#6 | B5:4 G5:2 E5:2 | C5 E5 G5:2 C6:2 B5:2 | A5:2 F#5:2 D5:3 E5 | G5:2 B5:2 D6:2 G6:2 | F#6:4 D6:2 A5:2';
var bosCA='.:2 B4:2 .:2 D5:2 | .:2 A4:2 .:2 F#4:2 | .:2 G4:2 .:2 B4:2 | .:2 E4:2 .:2 G4:2 | .:2 B4:2 .:2 D5:2 | .:2 A4:2 .:2 F#4:2 | .:2 G4:2 .:2 C5:2 | .:2 A4:2 .:2 A4:2';
var bosCB='.:2 E4:2 .:2 G4:2 | .:2 D4:2 .:2 G4:2 | .:2 F#4:2 .:2 A4:2 | .:2 E4:2 .:2 B4:2 | .:2 E4:2 .:2 G4:2 | .:2 F#4:2 .:2 A4:2 | .:2 D4:2 .:2 G4:2 | .:2 A4:2 .:2 D5:2';
M.bosque={bpm:112, prog:'G D Em C G D C D | G D Em C G D C D | C G D Em C D G D | G D Em C G D C D',
  vozes:[{inst:'flauta', mel:[bosA,bosA2,bosB,bosA2]}, {inst:'tecla', mel:[bosCA,bosCA,bosCB,bosCA], vol:.6}, {inst:'harpa', arp:'vaivem', so:'B'}, {inst:'baixo', baixo:'passeio'}, {inst:'pad', pad:true}, {inst:'perc', pat:'K . H . S . H H'}]};

/* ---------- Gelo (Ré maior, 92 bpm, sonhador) — gelo, aurora, água ---------- */
var gelA ='A4:2 D5:2 F#5:4 | E5:3 C#5 A4:4 | B4:2 D5:2 F#5:3 E5 | D5:4 B4:2 G4:2 | A4:2 D5:2 F#5:2 A5:2 | G5:3 E5 C#5:4 | D5:2 B4:2 G4:2 B4:2 | A4:6 .:2';
var gelA2='A4:2 D5:2 F#5:4 | E5:3 C#5 A4:4 | B4:2 D5:2 F#5:3 E5 | D5:4 B4:2 G4:2 | A4:2 D5:2 F#5:2 A5:2 | G5:3 E5 C#5:4 | D5:2 E5:2 F#5:2 G5:2 | A5:4 F#5:2 D5:2';
var gelB ='F#5:2 D5:2 B4:4 | A4:2 C#5:2 E5:4 | G5:2 F#5:2 D5:2 B4:2 | A4:4 D5:2 F#5:2 | B5:2 A5:2 G5:2 D5:2 | E5:2 C#5:2 A4:4 | D5:2 F#5:2 A5:2 D6:2 | C#6:4 E5:2 G5:2';
M.gelo={bpm:92, prog:'D A Bm G D A G A | D A Bm G D A G A | Bm F#m G D G A D A | D A Bm G D A G A',
  vozes:[{inst:'sino', mel:[gelA,gelA2,gelB,gelA2]}, {inst:'harpa', arp:'sobe'}, {inst:'baixo', baixo:'pulso'}, {inst:'pad', pad:true}, {inst:'perc', pat:'K . . . H . . .', vol:.5}]};

/* ---------- Cidade (Fá maior, 120 bpm) — biblioteca, oficina ---------- */
var cidA ='C5 F5 A5:2 C6:2 A5:2 | D5:2 F5:2 A5:3 G5 | G5:2 Bb5:2 D6:2 Bb5:2 | C6:3 G5 E5:4 | A5 F5 C5:2 F5:2 A5:2 | D6:2 C6:2 A5:3 F5 | Bb5:2 D6:2 F5:2 D5:2 | E5:2 G5:2 C6:4';
var cidA2='C5 F5 A5:2 C6:2 A5:2 | D5:2 F5:2 A5:3 G5 | G5:2 Bb5:2 D6:2 Bb5:2 | C6:3 G5 E5:4 | A5 F5 C5:2 F5:2 A5:2 | D6:2 C6:2 A5:3 F5 | Bb5:2 D6:2 F5:2 D5:2 | F5:6 .:2';
var cidB ='D6:2 F6:2 D6:2 Bb5:2 | C6:2 E6 C6 G5:4 | A5:2 C6:2 E6:3 D6 | D6:4 A5:2 F5:2 | F5 Bb5 D6:2 F6:2 D6:2 | E6:2 C6:2 G5:3 E5 | F5:2 A5:2 C6:2 F6:2 | E6:4 G5:2 Bb5:2';
M.cidade={bpm:120, prog:'F Dm Gm C F Dm Bb C | F Dm Gm C F Dm Bb C | Bb C Am Dm Bb C F C | F Dm Gm C F Dm Bb C',
  vozes:[{inst:'oboe', mel:[cidA,cidA2,cidB,cidA2]}, {inst:'tecla', arp:'vaivem'}, {inst:'baixo', baixo:'passeio'}, {inst:'pad', pad:true}, {inst:'perc', pat:'K . H H S . H .'}]};

/* ---------- Submundo (Lá menor, 104 bpm, misterioso) ---------- */
var subA ='A4:2 C5:2 E5:3 D5 | C5:2 A4:4 .:2 | F5:2 E5:2 C5:2 A4:2 | G#4:4 B4:2 E5:2 | E5:2 C5:2 A4:2 B4:2 | D5:3 F5 A5:4 | G#5:2 E5:2 B4:4 | A4:6 .:2';
var subA2='A4:2 C5:2 E5:3 D5 | C5:2 A4:4 .:2 | F5:2 E5:2 C5:2 A4:2 | G#4:4 B4:2 E5:2 | E5:2 C5:2 A4:2 B4:2 | D5:3 F5 A5:4 | G#5:2 E5:2 B4:2 D5:2 | C5:4 A4:4';
var subB ='D5:2 F5:2 A5:4 | C6:2 A5:2 E5:4 | F5:2 A5:2 C6:3 A5 | B5:4 G#5:2 E5:2 | F5:2 D5:2 A4:4 | G#4:2 B4:2 E5:4 | A5:2 E5:2 C5:2 A4:2 | B4:4 G#4:2 E4:2';
M.sub={bpm:104, prog:'Am Am F E Am Dm E Am | Am Am F E Am Dm E Am | Dm Am F E Dm E Am E | Am Am F E Am Dm E Am',
  vozes:[{inst:'ocarina', mel:[subA,subA2,subB,subA2]}, {inst:'harpa', arp:'sobe', vol:.6}, {inst:'baixo', baixo:'pulso'}, {inst:'pad', pad:true}, {inst:'perc', pat:'K . . . H . K .', vol:.6}]};

/* ---------- Chefão (Mi menor, 132 bpm) ---------- */
var cheA ='E5 E5 G5:2 B5:2 G5:2 | E5:2 D5:2 E5:4 | C5 C5 E5:2 G5:2 E5:2 | D5:2 F#5:2 A5:2 F#5:2 | E5 G5 B5:2 E6:2 B5:2 | G5:2 E5:2 C5:4 | D5:2 F#5:2 A5:2 D6:2 | D#6:4 B5:2 F#5:2';
var cheA2='E5 E5 G5:2 B5:2 G5:2 | E5:2 D5:2 E5:4 | C5 C5 E5:2 G5:2 E5:2 | D5:2 F#5:2 A5:2 F#5:2 | E5 G5 B5:2 E6:2 B5:2 | G5:2 E5:2 C5:4 | D5:2 F#5:2 A5:2 D6:2 | E6:6 .:2';
var cheB ='A5:2 C6:2 E6:2 C6:2 | B5:2 G5:2 E5:4 | F#5:2 A5:2 D6:2 A5:2 | D#6:4 B5:4 | E6:2 C6:2 A5:4 | G5:2 E5:2 C5:2 E5:2 | F#5:2 D#5:2 B4:4 | F#5 F#5 F#5:2 B5:4';
M.chefao={bpm:132, prog:'Em Em C D Em C D B | Em Em C D Em C D B | Am Em D B Am C B B | Em Em C D Em C D B',
  vozes:[{inst:'oboe', mel:[cheA,cheA2,cheB,cheA2]}, {inst:'tecla', arp:'vaivem', vol:.7}, {inst:'baixo', baixo:'rock'}, {inst:'pad', pad:true, vol:.8}, {inst:'perc', pat:'K . S . K K S H'}]};

/* ---------- Vitória (Dó maior, 116 bpm, fanfarra) ---------- */
var vitA ='G4 C5 E5 G5 C6:4 | A5:2 F5:2 C6:4 | B5:2 G5:2 D6:3 B5 | C6:6 .:2 | E5 G5 C6:2 E6:2 C6:2 | A5:2 C6:2 F6:4 | D6:2 B5:2 G5:2 A5:2 | C6:8';
var vitB ='A5:2 C6:2 E6:4 | F6:2 E6:2 C6:4 | G5:2 C6:2 E6:3 D6 | D6:4 B5:2 G5:2 | A5:2 C6:2 F6:2 A6:2 | G6:2 F6:2 D6:2 B5:2 | C6:2 E6:2 G6:4 | C6:8';
M.vitoria={bpm:116, prog:'C F G C C F G C | Am F C G F G C C | C F G C C F G C | Am F C G F G C C',
  vozes:[{inst:'flauta', mel:[vitA,vitB,vitA,vitB]}, {inst:'sino', arp:'sobe', vol:.5}, {inst:'baixo', baixo:'passeio'}, {inst:'pad', pad:true}, {inst:'perc', pat:'K . H . S . H .'}]};

/* ---------- Arena de perguntas (Ré menor, 144 bpm, tensa e rápida) ---------- */
var areA ='D5 D5 F5 D5 A5:2 G5:2 | F5 E5 D5:2 A4:4 | D5 D5 F5 D5 Bb5:2 A5:2 | G5:2 F5:2 E5:4 | D5 F5 A5:2 D6:2 C6:2 | Bb5:2 A5:2 G5:4 | F5 G5 A5:2 Bb5:2 A5:2 | G5:4 E5:2 C#5:2';
var areA2='D5 D5 F5 D5 A5:2 G5:2 | F5 E5 D5:2 A4:4 | D5 D5 F5 D5 Bb5:2 A5:2 | G5:2 F5:2 E5:4 | D5 F5 A5:2 D6:2 C6:2 | Bb5:2 A5:2 G5:4 | F5 G5 A5:2 Bb5:2 C#6:2 | D6:6 .:2';
var areB ='A5:2 Bb5:2 A5:2 F5:2 | G5:2 A5:2 G5:2 E5:2 | F5 G5 A5:2 Bb5:2 D6:2 | C#6:4 A5:2 E5:2 | D6:2 C6:2 Bb5:2 A5:2 | G5:2 Bb5:2 A5:2 F5:2 | E5 F5 G5:2 A5:2 Bb5:2 | A5:4 C#5:2 E5:2';
M.arena={bpm:144, prog:'Dm Dm Gm A Dm Bb Gm A | Dm Dm Gm A Dm Bb Gm A | Bb Gm Dm A Bb Gm F A | Dm Dm Gm A Dm Bb Gm A',
  vozes:[{inst:'oboe', mel:[areA,areA2,areB,areA2]}, {inst:'tecla', arp:'vaivem', vol:.8}, {inst:'baixo', baixo:'rock'}, {inst:'pad', pad:true, vol:.7}, {inst:'perc', pat:'K . H . S . H H'}]};

/* ---------- qual peça toca em cada cena (transposição em semitons e timbre do solo) ---------- */
var CENAS={
  mapa:        {peca:'mapa',   tr:0},
  floresta:    {peca:'bosque', tr:0,  lead:'flauta'},
  montanha:    {peca:'bosque', tr:-2, lead:'oboe'},
  pradaria:    {peca:'bosque', tr:2,  lead:'tecla'},
  mar:         {peca:'bosque', tr:-4, lead:'sino'},
  agua:        {peca:'gelo',   tr:2,  lead:'flauta'},
  gelo:        {peca:'gelo',   tr:0,  lead:'sino'},
  aurora:      {peca:'gelo',   tr:-3, lead:'ocarina'},
  cidade:      {peca:'cidade', tr:0,  lead:'oboe'},
  oficina:     {peca:'cidade', tr:-3, lead:'tecla'},
  sub_caverna: {peca:'sub',    tr:0},
  sub_gelo:    {peca:'sub',    tr:3,  lead:'sino'},
  sub_mina:    {peca:'sub',    tr:-2, lead:'tecla'},
  castelo:     {peca:'chefao', tr:0},
  canal:       {peca:'gelo',   tr:4,  lead:'tecla'},
  farol:       {peca:'bosque', tr:-4, lead:'sino'},
  arena:       {peca:'arena',  tr:0},
  arena_gelo:  {peca:'arena',  tr:3,  lead:'sino'},
  arena_hist:  {peca:'arena',  tr:-2, lead:'flauta'},
  chefao:      {peca:'chefao', tr:0},
  final:       {peca:'vitoria',tr:0},
  vitoria:     {peca:'vitoria',tr:0}
};

return {PECAS:M, CENAS:CENAS};
})();
