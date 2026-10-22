/* ============================================================
   HIS3_jogo_partituras.js — trilha do The Lost Endings: as peças do
   WiseBear (LP3_jornada_partituras.js) + três melodias de DOMÍNIO
   PÚBLICO, na mesma notação (u=8 colcheias por compasso):
     · Beethoven, "Ode à Alegria" (9ª Sinfonia)  → final feliz
     · Grieg, "Na Gruta do Rei da Montanha"      → castelo do Conde
     · Mozart, "Ah vous dirai-je, Maman" (o tema de "Twinkle, Twinkle")
                                                 → a roda do biscoito
   Melodias transcritas do tema original (Dó maior / Lá menor), sem
   invenção de notas; o acompanhamento é o gerador de acordes do motor.
   E o mapa de qual peça toca em cada cena do jogo de Inglês.
   ============================================================ */
(function(P){
'use strict';
var M=P.PECAS, C=P.CENAS;

/* ---------- Ode à Alegria (Dó maior) ---------- */
var odeA ='E5:2 E5:2 F5:2 G5:2 | G5:2 F5:2 E5:2 D5:2 | C5:2 C5:2 D5:2 E5:2 | E5:3 D5 D5:4 | E5:2 E5:2 F5:2 G5:2 | G5:2 F5:2 E5:2 D5:2 | C5:2 C5:2 D5:2 E5:2 | D5:3 C5 C5:4';
var odeB ='D5:2 D5:2 E5:2 C5:2 | D5:2 E5 F5 E5:2 C5:2 | D5:2 E5 F5 E5:2 D5:2 | C5:2 D5:2 G4:4 | E5:2 E5:2 F5:2 G5:2 | G5:2 F5:2 E5:2 D5:2 | C5:2 C5:2 D5:2 E5:2 | D5:3 C5 C5:4';
M.ode={bpm:108, prog:'C G C G C G C C | C G C G C G C C | G G G G C G C C | G G G G C G C C',
  vozes:[{inst:'flauta', mel:[odeA,odeA,odeB,odeB]}, {inst:'harpa', arp:'sobe'}, {inst:'baixo', baixo:'passeio'}, {inst:'pad', pad:true}, {inst:'perc', pat:'K . H . S . H .'}]};

/* ---------- Na Gruta do Rei da Montanha (Lá menor; o tema e a resposta na dominante) ---------- */
var reiA ='A4 B4 C5 D5 E5 C5 E5:2 | D#5 B4 D#5:2 D5 A#4 D5:2 | A4 B4 C5 D5 E5 C5 E5 A5 | G5 E5 C5 E5 G5:4 | A4 B4 C5 D5 E5 C5 E5:2 | D#5 B4 D#5:2 D5 A#4 D5:2 | A4 B4 C5 D5 E5 C5 E5 A5 | G5 E5 C5 E5 G5:4';
var reiB ='E5 F#5 G#5 A5 B5 G#5 B5:2 | A#5 F#5 A#5:2 A5 F5 A5:2 | E5 F#5 G#5 A5 B5 G#5 B5 E6 | D6 B5 G#5 B5 D6:4 | A4 B4 C5 D5 E5 C5 E5:2 | D#5 B4 D#5:2 D5 A#4 D5:2 | A4 B4 C5 D5 E5 C5 E5 A5 | G5 E5 C5 E5 G5:4';
M.rei={bpm:126, prog:'Am E Am C Am E Am C | Am E Am C Am E Am C | E B E E Am E Am C | Am E Am C Am E Am C',
  vozes:[{inst:'oboe', mel:[reiA,reiA,reiB,reiA]}, {inst:'baixo', baixo:'pulso'}, {inst:'pad', pad:true}, {inst:'perc', pat:'K . . . S . . .'}]};

/* ---------- Ah vous dirai-je, Maman (Dó maior) ---------- */
var brA ='C5:2 C5:2 G5:2 G5:2 | A5:2 A5:2 G5:4 | F5:2 F5:2 E5:2 E5:2 | D5:2 D5:2 C5:4 | G5:2 G5:2 F5:2 F5:2 | E5:2 E5:2 D5:4 | G5:2 G5:2 F5:2 F5:2 | E5:2 E5:2 D5:4';
var brB ='C5:2 C5:2 G5:2 G5:2 | A5:2 A5:2 G5:4 | F5:2 F5:2 E5:2 E5:2 | D5:2 D5:2 C5:4 | C5:2 C5:2 G5:2 G5:2 | A5:2 A5:2 G5:4 | F5:2 F5:2 E5:2 E5:2 | D5:2 D5:2 C5:4';
M.brilha={bpm:96, prog:'C F C G C G C G | C F C G C G C G | C F C G C F C C | C F C G C F C C',
  vozes:[{inst:'sino', mel:[brA,brA,brB,brB]}, {inst:'harpa', arp:'vaivem'}, {inst:'baixo', baixo:'pulso'}, {inst:'pad', pad:true}, {inst:'perc', pat:'K . . . H . . .', vol:.5}]};

/* ---------- cenas do jogo de Inglês ---------- */
C.vila={peca:'bosque', tr:0, lead:'flauta'};
C.bosque={peca:'bosque', tr:-3, lead:'ocarina'};
C.biblioteca={peca:'mapa', tr:0};
C.recife={peca:'gelo', tr:2, lead:'sino'};
C.nuvens={peca:'gelo', tr:5, lead:'flauta'};
C.ginasio={peca:'cidade', tr:2, lead:'tecla'};
C.estadio={peca:'cidade', tr:0, lead:'oboe'};
C.pista={peca:'bosque', tr:2, lead:'tecla'};
C.biscoito={peca:'brilha', tr:0};
C.tinta={peca:'rei', tr:0};
C.chefao={peca:'rei', tr:0};
C.final={peca:'ode', tr:0};
C.vitoria={peca:'ode', tr:0};
})(window.PARTITURAS);
