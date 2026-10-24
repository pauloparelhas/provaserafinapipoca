/* fase_recheio.js — "jeitos" da tela de criar fases e o recheio da fase nova.
   JEITOS_TELA: quantas peças e botões a tela mostra (pouca coisa, médio, tudo).
   Peça que já está no mapa aparece sempre, em qualquer jeito.
   RECHEIOS: como a fase Reta nova começa (vazia, algumas coisas, cheia de ideias). */
var FAB = window.FAB = window.FAB || {};
FAB.JEITOS_TELA = [
  { id: 'pouca', nome: 'Pouca coisa', fala: 'Só as peças principais.',
    pecas: ['grama','tijolo','nuvem','moeda','estrela','espinho','mola','gosma','inicio','bandeira'],
    botoes: [] },
  { id: 'medio', nome: 'Médio', fala: 'Mais peças e mais botões.',
    pecas: ['grama','terra','tijolo','caixa','gelo','nuvem','moeda','estrela','coracao','chave','porta','placa','espinho','lava','mola','gosma','besouro','abelha','fantasma','inicio','controle','bandeira','cipo','cano','agua','pena'],
    botoes: ['zoom','tamanho'] },
  { id: 'tudo', nome: 'Tudo', fala: 'Todas as peças e todos os botões.', pecas: null, botoes: ['zoom','tamanho','alto','apaga'] }
];
FAB.RECHEIOS = [
  { id: 'vazia',   nome: 'Vazia',            fala: 'Só o chão. Você põe tudo.', mapa: ["........................................","........................................","........................................","........................................","........................................","........................................","........................................","........................................","........................................",".@....................................F.","########################################","TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT"] },
  { id: 'algumas', nome: 'Algumas coisas',   fala: 'Moedas, um inimigo e uma mola.', mapa: ["........................................","........................................","........................................","........................................","......................ooo...............",".....................=====..............","........................................","..........ooo...........................",".........#####.................o.o......",".@....o.o.........g.......^^......M...F.","########################################","TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT"] },
  { id: 'cheia',   nome: 'Cheia de ideias',  fala: 'Gelo, lava, cipó, chave e porta. Mude o que quiser.', mapa: ["................................................","................................................","..................................k.............",".........................*h...YBBBBB............","........................====..Y.................","............w.................Y.................","..........BBBBB.....ooo.......Y....a............","...................=====......Y.................","..............................Y.................",".@..oo..?.......g........M....Y...^^..C..D.s..F.","##############IIIII#LLL#########################","TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT"] }
];
