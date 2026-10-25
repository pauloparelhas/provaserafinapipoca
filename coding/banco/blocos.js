/* ============================================================
   blocos.js — os BLOCOS das regras (a "programação" da Mariana)

   Uma regra tem três partes, como os eventos do Construct 3:
     QUANDO acontecer…   (acontecimento = evento)
     SÓ SE…              (cadeado = condição; opcional)
     ENTÃO FAÇA…         (fila de 1 a 3 ações = sequência)

   Formato de uma regra no jogo dela:
     { id, liga:true, quando:{t:'toca', obj:'moeda'},
       se:null | {t:'tem', obj:'chave'},
       faca:[ {t:'ponto', n:1}, {t:'some'} ] }

   Cada bloco: nome (o que aparece no cartão, curto), fala (o que a
   voz lê), icone ('spr:<sprite>' ou um ícone de FAB.ICONES), param
   (o que se escolhe dentro do cartão) e conceito (carta do saber).
   ============================================================ */
window.FAB = window.FAB || {};

/* opções que os parâmetros oferecem */
FAB.OPCOES = {
  objToca:  ['moeda','estrela','coracao','chave','porta','placa','bandeira','controle','mola','espinho','lava','agua','inimigo','gosma','besouro','abelha','fantasma','sapo','cristal','relogio','cogumelo','pontovolta','morcego','caracol','robozinho'],
  objPisa:  ['inimigo','gosma','besouro','abelha','fantasma','sapo','morcego','caracol','robozinho'],
  objTem:   ['chave','estrela','moeda','coracao','cristal','cogumelo','relogio'],
  objCria:  ['moeda','estrela','coracao','gosma','abelha','fantasma','cristal','cogumelo','relogio','morcego'],
  num:      [1, 2, 3, 5, 10],
  numSinal: [1, 2, 5, 10, -1, -5],
  seg:      [1, 2, 3, 5, 10],
  pontos:   [5, 10, 20, 50, 100],
  tecla:    ['X', 'C', 'V'],
  sons:     ['moeda', 'pulo', 'magia', 'ai', 'vitoria', 'bum'],
  falas:    ['Oba!', 'Cuidado!', 'Você conseguiu!', 'Ai, ai, ai!', 'Achei!', 'Quase!', 'Vamos lá!',
             'Que legal!', 'Pega!', 'Uhuu!', 'Mais rápido!', 'Estou com fome!', 'Que frio!', 'Brilhou!', 'Ponto de volta!', 'Eu consigo!']
};

FAB.QUANDO = {
  toca:   { nome: 'tocar em',           fala: 'Quando o herói tocar em', icone: 'mao',     param: 'objToca', conceito: 'evento' },
  pisa:   { nome: 'pular em cima de',   fala: 'Quando o herói pular em cima de', icone: 'pisa', param: 'objPisa', conceito: 'evento' },
  comeca: { nome: 'a fase começar',     fala: 'Quando a fase começar',   icone: 'play',    param: null,      conceito: 'evento' },
  cada:   { nome: 'a cada',             fala: 'De novo e de novo, a cada tantos segundos', icone: 'relogio', param: 'seg', sufixo: 'segundos', conceito: 'laco' },
  tecla:  { nome: 'apertar a tecla',    fala: 'Quando apertar a tecla',  icone: 'tecla',   param: 'tecla',   conceito: 'evento' },
  pontos: { nome: 'os pontos chegarem a', fala: 'Quando a caixinha de pontos chegar a', icone: 'caixinha', param: 'pontos', conceito: 'variavel' },
  cai:    { nome: 'cair no buraco',     fala: 'Quando o herói cair no buraco', icone: 'buraco', param: null,   conceito: 'evento' },
  acerta: { nome: 'acertar a pergunta', fala: 'Quando acertar a pergunta', icone: 'certo',   param: null,      conceito: 'evento' },
  erra:   { nome: 'errar a pergunta',   fala: 'Quando errar a pergunta',   icone: 'errado',  param: null,      conceito: 'evento' },
  vidas0: { nome: 'as vidas acabarem',  fala: 'Quando as vidas acabarem',  icone: 'semvida', param: null,      conceito: 'variavel' },
  tempo0: { nome: 'o tempo acabar',     fala: 'Quando o relógio chegar no zero', icone: 'tempofim', param: null, conceito: 'variavel' },
  passavolta: { nome: 'passar no ponto de volta', fala: 'Quando o herói passar no ponto de volta', icone: 'pontovolta', param: null, conceito: 'evento' }
};

FAB.SE = {
  tem:       { nome: 'tiver na mochila', fala: 'Só se tiver na mochila', icone: 'mochila', param: 'objTem', conceito: 'condicao' },
  naotem:    { nome: 'NÃO tiver na mochila', fala: 'Só se não tiver na mochila', icone: 'mochila', param: 'objTem', conceito: 'condicao' },
  pontosMin: { nome: 'tiver pontos', fala: 'Só se tiver pelo menos estes pontos', icone: 'caixinha', param: 'pontos', sufixo: 'ou mais', conceito: 'condicao' },
  sorte:     { nome: 'a sorte deixar', fala: 'Só se a sorte deixar: metade das vezes sim, metade não', icone: 'dado', param: null, conceito: 'condicao' }
};

FAB.FACA = {
  ponto:    { nome: 'pontos',              fala: 'Mudar a caixinha de pontos', icone: 'caixinha', param: 'numSinal', prefixo: '+', conceito: 'variavel' },
  vida:     { nome: 'vidas',               fala: 'Mudar as vidas',            icone: 'coracao',  param: 'numSinal', prefixo: '+', conceito: 'variavel' },
  some:     { nome: 'a peça some',         fala: 'A peça que ele tocou some', icone: 'some',     param: null, conceito: 'sequencia' },
  guarda:   { nome: 'guardar na mochila',  fala: 'Guardar na mochila',        icone: 'mochila',  param: null, conceito: 'variavel' },
  gasta:    { nome: 'usar da mochila',     fala: 'Usar uma coisa da mochila', icone: 'mochila',  param: 'objTem', conceito: 'variavel' },
  pulo:     { nome: 'super pulo',          fala: 'Dar um super pulo',         icone: 'mola',     param: null, conceito: 'sequencia' },
  volta:    { nome: 'voltar ao controle',  fala: 'Voltar para o ponto de controle', icone: 'volta', param: null, conceito: 'sequencia' },
  marca:    { nome: 'marcar o controle',   fala: 'Marcar aqui como ponto de controle', icone: 'controle', param: null, conceito: 'sequencia' },
  ganha:    { nome: 'ganhar a fase',       fala: 'Ganhar a fase',             icone: 'trofeu',   param: null, conceito: 'sequencia' },
  perde:    { nome: 'fim de jogo',         fala: 'Fim de jogo',               icone: 'fim',      param: null, conceito: 'sequencia' },
  pergunta: { nome: 'fazer uma pergunta',  fala: 'Fazer uma pergunta',        icone: 'pergunta', param: null, conceito: 'sequencia' },
  fala:     { nome: 'mostrar balão',       fala: 'Mostrar um balão com uma frase', icone: 'balao', param: 'falas', conceito: 'sequencia' },
  som:      { nome: 'tocar som',           fala: 'Tocar um som',              icone: 'som',      param: 'sons', conceito: 'sequencia' },
  rapido:   { nome: 'correr rápido',       fala: 'Correr rápido por 5 segundos', icone: 'raio',  param: null, conceito: 'sequencia' },
  cria:     { nome: 'fazer aparecer',      fala: 'Fazer aparecer uma peça',   icone: 'magica',   param: 'objCria', conceito: 'sequencia' },
  tempo:    { nome: 'segundos no relógio', fala: 'Pôr mais segundos no relógio', icone: 'maistempo', param: 'num', prefixo: '+', conceito: 'variavel' },
  treme:    { nome: 'tremer a tela',       fala: 'Tremer a tela',             icone: 'treme',    param: null, conceito: 'sequencia' },
  confete:  { nome: 'soltar confete',      fala: 'Soltar confete',            icone: 'confete',  param: null, conceito: 'sequencia' },
  pulaalto: { nome: 'pular mais alto',     fala: 'Pular mais alto por 8 segundos', icone: 'pulaalto', param: null, conceito: 'sequencia' },
  gigante:  { nome: 'ficar gigante',       fala: 'O herói fica gigante por 6 segundos', icone: 'gigante', param: null, conceito: 'sequencia' },
  pequeno:  { nome: 'ficar pequeno',       fala: 'O herói fica pequeno por 6 segundos', icone: 'pequeno', param: null, conceito: 'sequencia' },
  cenario:  { nome: 'trocar o cenário',    fala: 'Trocar o cenário do fundo', icone: 'cenario', param: null, conceito: 'sequencia' }
};

/* nomes que aparecem para o objeto "inimigo" genérico */
FAB.NOME_OBJ = { inimigo: 'qualquer inimigo' };

/* ---------------- REGRAS-MODELO (todo jogo novo nasce com elas) ----------------
   Ela não monta do zero: troca a peça do cartão. Cada uma mostra uma ideia.   */
FAB.REGRAS_PADRAO = [
  { quando: { t: 'toca', obj: 'moeda' },    faca: [{ t: 'ponto', n: 1 }, { t: 'some' }, { t: 'som', v: 'moeda' }] },
  { quando: { t: 'toca', obj: 'estrela' },  faca: [{ t: 'ponto', n: 5 }, { t: 'some' }, { t: 'confete' }] },
  { quando: { t: 'toca', obj: 'coracao' },  faca: [{ t: 'vida', n: 1 }, { t: 'some' }] },
  { quando: { t: 'toca', obj: 'chave' },    faca: [{ t: 'guarda' }, { t: 'som', v: 'magia' }] },
  { quando: { t: 'toca', obj: 'porta' }, se: { t: 'tem', obj: 'chave' }, faca: [{ t: 'gasta', obj: 'chave' }, { t: 'some' }] },
  { quando: { t: 'toca', obj: 'espinho' },  faca: [{ t: 'vida', n: -1 }, { t: 'volta' }] },
  { quando: { t: 'toca', obj: 'lava' },     faca: [{ t: 'vida', n: -1 }, { t: 'volta' }] },
  { quando: { t: 'cai' },                   faca: [{ t: 'vida', n: -1 }, { t: 'volta' }] },
  { quando: { t: 'toca', obj: 'inimigo' },  faca: [{ t: 'vida', n: -1 }, { t: 'som', v: 'ai' }] },
  { quando: { t: 'pisa', obj: 'inimigo' },  faca: [{ t: 'some' }, { t: 'ponto', n: 5 }, { t: 'pulo' }] },
  { quando: { t: 'toca', obj: 'mola' },     faca: [{ t: 'pulo' }, { t: 'som', v: 'pulo' }] },
  { quando: { t: 'toca', obj: 'controle' }, faca: [{ t: 'marca' }] },
  { quando: { t: 'toca', obj: 'placa' },    faca: [{ t: 'pergunta' }] },
  { quando: { t: 'acerta' },                faca: [{ t: 'ponto', n: 10 }, { t: 'confete' }] },
  { quando: { t: 'erra' },                  faca: [{ t: 'fala', v: 'Quase!' }] },
  { quando: { t: 'toca', obj: 'bandeira' }, faca: [{ t: 'ganha' }] },
  { quando: { t: 'vidas0' },                faca: [{ t: 'perde' }] },
  /* peças novas (23/10/2026) */
  { quando: { t: 'toca', obj: 'cristal' },  faca: [{ t: 'guarda' }, { t: 'som', v: 'moeda' }] },
  { quando: { t: 'toca', obj: 'relogio' },  faca: [{ t: 'tempo', n: 10 }, { t: 'some' }, { t: 'som', v: 'magia' }] },
  { quando: { t: 'toca', obj: 'cogumelo' }, faca: [{ t: 'pulaalto' }, { t: 'some' }, { t: 'fala', v: 'Uhuu!' }] },
  { quando: { t: 'passavolta' },            faca: [{ t: 'fala', v: 'Ponto de volta!' }, { t: 'som', v: 'magia' }] }
];

/* os bugs de propósito do modelo "quebrado" (missão do caça-bichinho) */
FAB.BUGS_QUEBRADO = function (regras) {
  regras.forEach(function (r) {
    if (r.quando.t === 'toca' && r.quando.obj === 'moeda') r.faca[0].n = 0;      /* bug 1: moeda não soma */
    if (r.quando.t === 'toca' && r.quando.obj === 'bandeira') r.liga = false;   /* bug 2: bandeira desligada */
  });
  /* bug 3 está no MAPA: um buraco largo demais para pular */
  /* o valor 0 não está nas opções: o cartão mostra "+0" e ela troca */
};

/* ---------------- ÍCONES (desenhos simples em SVG, viewBox 0 0 24 24) ---------------- */
FAB.ICONES = {
  mao:      '<path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V11m0-1.5V4a1.5 1.5 0 0 1 3 0v6m0-4.5a1.5 1.5 0 0 1 3 0V12m0-4a1.5 1.5 0 0 1 3 0v6c0 4-3 7-7 7h-1c-3 0-4.5-1.5-6-4l-2.5-4a1.6 1.6 0 0 1 2.6-1.8L8 13" fill="#ffd6a8" stroke="#1a1c2c" stroke-width="1.6" stroke-linejoin="round"/>',
  pisa:     '<path d="M5 20h14" stroke="#1a1c2c" stroke-width="2"/><rect x="7" y="13" width="10" height="6" rx="3" fill="#63c74d" stroke="#1a1c2c" stroke-width="1.6"/><path d="M12 3v6m-3-3 3 3 3-3" stroke="#e43b44" stroke-width="2.4" fill="none" stroke-linecap="round"/>',
  play:     '<circle cx="12" cy="12" r="10" fill="#63c74d" stroke="#1a1c2c" stroke-width="1.6"/><path d="M10 7.5v9l7-4.5z" fill="#fff"/>',
  relogio:  '<circle cx="12" cy="12" r="10" fill="#fee761" stroke="#1a1c2c" stroke-width="1.6"/><path d="M12 6v6l4 2" stroke="#1a1c2c" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M19.5 4.5 21 7" stroke="#e43b44" stroke-width="2"/>',
  tecla:    '<rect x="3" y="5" width="18" height="14" rx="3" fill="#e6e9f0" stroke="#1a1c2c" stroke-width="1.6"/><rect x="5" y="6.5" width="14" height="9" rx="2" fill="#fff"/>',
  caixinha: '<rect x="3" y="8" width="18" height="12" rx="2" fill="#feae34" stroke="#1a1c2c" stroke-width="1.6"/><path d="M3 8l3-4h12l3 4" fill="#fee761" stroke="#1a1c2c" stroke-width="1.6"/><text x="12" y="17.5" font-size="8" font-weight="900" text-anchor="middle" fill="#1a1c2c">123</text>',
  buraco:   '<path d="M2 10h6v10H2zM16 10h6v10h-6z" fill="#2f8a4a" stroke="#1a1c2c" stroke-width="1.4"/><path d="M12 4v9m-3-3 3 3 3-3" stroke="#e43b44" stroke-width="2.2" fill="none" stroke-linecap="round"/>',
  certo:    '<circle cx="12" cy="12" r="10" fill="#63c74d" stroke="#1a1c2c" stroke-width="1.6"/><path d="M7 12.5l3.2 3.2L17 9" stroke="#fff" stroke-width="2.8" fill="none" stroke-linecap="round"/>',
  errado:   '<circle cx="12" cy="12" r="10" fill="#ff9ad5" stroke="#1a1c2c" stroke-width="1.6"/><path d="M8.5 8.5l7 7m0-7-7 7" stroke="#1a1c2c" stroke-width="2.6" stroke-linecap="round"/>',
  semvida:  '<path d="M12 20 4 12a4.5 4.5 0 0 1 8-5 4.5 4.5 0 0 1 8 5z" fill="#a7b0bd" stroke="#1a1c2c" stroke-width="1.6"/><path d="M12 7l-1.5 4 3 2-1.5 4" stroke="#1a1c2c" stroke-width="1.6" fill="none"/>',
  ampulheta:'<path d="M6 3h12M6 21h12M7 3c0 5 10 5 10 9s-10 4-10 9M17 3c0 5-10 5-10 9s10 4 10 9" stroke="#1a1c2c" stroke-width="1.6" fill="#fee761"/>',
  mochila:  '<rect x="5" y="7" width="14" height="14" rx="4" fill="#3b9bff" stroke="#1a1c2c" stroke-width="1.6"/><path d="M9 7V5a3 3 0 0 1 6 0v2" stroke="#1a1c2c" stroke-width="1.6" fill="none"/><rect x="8" y="12" width="8" height="5" rx="1.5" fill="#1e4fa8" stroke="#1a1c2c" stroke-width="1.2"/>',
  dado:     '<rect x="3" y="3" width="18" height="18" rx="4" fill="#fff" stroke="#1a1c2c" stroke-width="1.6"/><circle cx="8" cy="8" r="1.7" fill="#1a1c2c"/><circle cx="12" cy="12" r="1.7" fill="#1a1c2c"/><circle cx="16" cy="16" r="1.7" fill="#1a1c2c"/>',
  coracao:  '<path d="M12 20 4 12a4.5 4.5 0 0 1 8-5 4.5 4.5 0 0 1 8 5z" fill="#e43b44" stroke="#1a1c2c" stroke-width="1.6"/>',
  some:     '<circle cx="12" cy="12" r="5" fill="#fee761" stroke="#1a1c2c" stroke-width="1.4" stroke-dasharray="2 2"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" stroke="#feae34" stroke-width="2" stroke-linecap="round"/>',
  mola:     '<path d="M6 20h12M8 17h8l-8-3h8l-8-3h8" stroke="#1a1c2c" stroke-width="1.8" fill="none"/><rect x="5" y="5" width="14" height="4" rx="1.5" fill="#e43b44" stroke="#1a1c2c" stroke-width="1.4"/>',
  volta:    '<path d="M9 7H15a5 5 0 0 1 0 10H8" stroke="#1a1c2c" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M10 3 6 7l4 4" stroke="#1a1c2c" stroke-width="2.2" fill="none" stroke-linecap="round"/>',
  controle: '<path d="M7 21V3" stroke="#1a1c2c" stroke-width="2"/><path d="M8 4h11l-3 4 3 4H8z" fill="#fee761" stroke="#1a1c2c" stroke-width="1.4"/>',
  trofeu:   '<path d="M7 3h10v6a5 5 0 0 1-10 0z" fill="#fee761" stroke="#1a1c2c" stroke-width="1.6"/><path d="M7 5H4a3 3 0 0 0 3 4M17 5h3a3 3 0 0 1-3 4M12 14v4M8 21h8" stroke="#1a1c2c" stroke-width="1.6" fill="none"/>',
  fim:      '<rect x="3" y="3" width="18" height="18" rx="4" fill="#566070" stroke="#1a1c2c" stroke-width="1.6"/><text x="12" y="15.5" font-size="7.5" font-weight="900" text-anchor="middle" fill="#fff">FIM</text>',
  pergunta: '<rect x="3" y="3" width="18" height="16" rx="3" fill="#8b5cf6" stroke="#1a1c2c" stroke-width="1.6"/><text x="12" y="16" font-size="13" font-weight="900" text-anchor="middle" fill="#fff">?</text>',
  balao:    '<path d="M4 5h16v10H10l-4 4v-4H4z" fill="#fff" stroke="#1a1c2c" stroke-width="1.6" stroke-linejoin="round"/><path d="M8 9h8M8 12h5" stroke="#1a1c2c" stroke-width="1.4"/>',
  som:      '<path d="M4 9h4l5-4v14l-5-4H4z" fill="#3b9bff" stroke="#1a1c2c" stroke-width="1.6" stroke-linejoin="round"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" stroke="#1a1c2c" stroke-width="1.6" fill="none"/>',
  raio:     '<path d="M13 2 5 13h6l-1 9 8-11h-6z" fill="#fee761" stroke="#1a1c2c" stroke-width="1.6" stroke-linejoin="round"/>',
  magica:   '<path d="M4 20 16 8" stroke="#1a1c2c" stroke-width="2.4" stroke-linecap="round"/><path d="M17 2l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" fill="#fee761" stroke="#1a1c2c" stroke-width="1"/><circle cx="20" cy="13" r="1.5" fill="#ff9ad5"/><circle cx="10" cy="4" r="1.3" fill="#2ce8f5"/>',
  treme:    '<rect x="7" y="6" width="10" height="12" rx="2" fill="#a7b0bd" stroke="#1a1c2c" stroke-width="1.6"/><path d="M4 8v8M2 10v4M20 8v8M22 10v4" stroke="#1a1c2c" stroke-width="1.6" stroke-linecap="round"/>',
  confete:  '<path d="M3 21 8 8l8 8z" fill="#feae34" stroke="#1a1c2c" stroke-width="1.6" stroke-linejoin="round"/><circle cx="15" cy="5" r="1.5" fill="#e43b44"/><circle cx="20" cy="9" r="1.5" fill="#3b9bff"/><rect x="18" y="3" width="2.5" height="2.5" fill="#63c74d"/><rect x="11" y="3" width="2" height="2" fill="#8b5cf6"/><circle cx="20" cy="15" r="1.4" fill="#ff9ad5"/>',
  cadeado:  '<rect x="5" y="10" width="14" height="11" rx="2.5" fill="#feae34" stroke="#1a1c2c" stroke-width="1.6"/><path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="#1a1c2c" stroke-width="1.8" fill="none"/><circle cx="12" cy="15.5" r="1.6" fill="#1a1c2c"/>',
  pontovolta:'<path d="M6 22V3" stroke="#1a1c2c" stroke-width="2"/><path d="M7 4h11l-3 3.5 3 3.5H7z" fill="#63c74d" stroke="#1a1c2c" stroke-width="1.4"/><path d="M20 21h-9a3 3 0 0 1 0-6h6" stroke="#3b9bff" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M15 13l2.5 2-2.5 2" stroke="#3b9bff" stroke-width="2" fill="none" stroke-linecap="round"/>',
  pulaalto: '<path d="M12 21V6M7 10l5-5 5 5" stroke="#2f8a4a" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 21h16" stroke="#1a1c2c" stroke-width="2"/><path d="M5 5a4 3 0 0 1 8 0z" fill="#e43b44" stroke="#1a1c2c" stroke-width="1.2" transform="translate(-1 9)"/>',
  gigante:  '<rect x="8" y="4" width="10" height="16" rx="3" fill="#feae34" stroke="#1a1c2c" stroke-width="1.6"/><circle cx="11" cy="9" r="1.2" fill="#1a1c2c"/><circle cx="15" cy="9" r="1.2" fill="#1a1c2c"/><path d="M3 9V3M1 5l2-2 2 2" stroke="#1a1c2c" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M2 21h20" stroke="#1a1c2c" stroke-width="2"/>',
  pequeno:  '<rect x="10" y="14" width="6" height="6" rx="2" fill="#ff9ad5" stroke="#1a1c2c" stroke-width="1.4"/><circle cx="12" cy="16.5" r=".8" fill="#1a1c2c"/><circle cx="14" cy="16.5" r=".8" fill="#1a1c2c"/><path d="M5 4v8M3 10l2 2 2-2" stroke="#1a1c2c" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M2 21h20" stroke="#1a1c2c" stroke-width="2"/>',
  cenario:  '<rect x="2" y="4" width="20" height="16" rx="2" fill="#5ec8ff" stroke="#1a1c2c" stroke-width="1.6"/><circle cx="17" cy="8.5" r="2.2" fill="#fee761"/><path d="M2 18l6-7 4 4 3-3 7 6v2H2z" fill="#63c74d" stroke="#1a1c2c" stroke-width="1.2" stroke-linejoin="round"/>',
  lupa:     '<circle cx="10" cy="10" r="6.5" fill="#bdf0ff" stroke="#1a1c2c" stroke-width="2"/><path d="M15 15l6 6" stroke="#1a1c2c" stroke-width="3" stroke-linecap="round"/>',
  /* barra de telas */
  t_painel: '<path d="M3 11 12 3l9 8v10H3z" fill="#fee761" stroke="#1a1c2c" stroke-width="1.6" stroke-linejoin="round"/><rect x="9.5" y="14" width="5" height="7" fill="#b86f50" stroke="#1a1c2c" stroke-width="1.4"/>',
  t_ideia:  '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" fill="#fee761" stroke="#1a1c2c" stroke-width="1.6"/>',
  t_pixel:  '<rect x="3" y="3" width="6" height="6" fill="#e43b44"/><rect x="9" y="3" width="6" height="6" fill="#fee761"/><rect x="15" y="3" width="6" height="6" fill="#3b9bff"/><rect x="3" y="9" width="6" height="6" fill="#63c74d"/><rect x="9" y="9" width="6" height="6" fill="#ff9ad5"/><rect x="15" y="9" width="6" height="6" fill="#8b5cf6"/><rect x="3" y="15" width="6" height="6" fill="#f77622"/><rect x="9" y="15" width="6" height="6" fill="#2ce8f5"/><rect x="15" y="15" width="6" height="6" fill="#b86f50"/><rect x="3" y="3" width="18" height="18" fill="none" stroke="#1a1c2c" stroke-width="1.6"/>',
  t_fases:  '<rect x="2" y="15" width="20" height="6" fill="#2f8a4a" stroke="#1a1c2c" stroke-width="1.4"/><rect x="5" y="9" width="5" height="3" fill="#e43b44" stroke="#1a1c2c" stroke-width="1.2"/><circle cx="16" cy="10" r="2.2" fill="#fee761" stroke="#1a1c2c" stroke-width="1.2"/><path d="M19 15V4" stroke="#1a1c2c" stroke-width="1.6"/><path d="M19 4h-4l1.5 2-1.5 2h4" fill="#63c74d" stroke="#1a1c2c" stroke-width="1.2"/>',
  t_regras: '<rect x="2" y="4" width="9" height="7" rx="2" fill="#feae34" stroke="#1a1c2c" stroke-width="1.4"/><rect x="13" y="4" width="9" height="7" rx="2" fill="#3b9bff" stroke="#1a1c2c" stroke-width="1.4"/><rect x="2" y="13" width="9" height="7" rx="2" fill="#feae34" stroke="#1a1c2c" stroke-width="1.4"/><rect x="13" y="13" width="9" height="7" rx="2" fill="#3b9bff" stroke="#1a1c2c" stroke-width="1.4"/><path d="M11 7.5h2M11 16.5h2" stroke="#1a1c2c" stroke-width="1.6"/>',
  t_testar: '<circle cx="12" cy="12" r="10" fill="#63c74d" stroke="#1a1c2c" stroke-width="1.6"/><path d="M10 7.5v9l7-4.5z" fill="#fff" stroke="#1a1c2c" stroke-width="1.2" stroke-linejoin="round"/>',
  t_diario: '<rect x="4" y="2" width="15" height="20" rx="2" fill="#ff9ad5" stroke="#1a1c2c" stroke-width="1.6"/><path d="M8 7h8M8 11h8M8 15h5" stroke="#1a1c2c" stroke-width="1.5"/><path d="M4 2v20" stroke="#b55088" stroke-width="3"/>',
  t_robo:   '<rect x="5" y="7" width="14" height="11" rx="3" fill="#a7b0bd" stroke="#1a1c2c" stroke-width="1.6"/><circle cx="9.5" cy="12" r="1.8" fill="#2ce8f5" stroke="#1a1c2c"/><circle cx="14.5" cy="12" r="1.8" fill="#2ce8f5" stroke="#1a1c2c"/><path d="M12 7V4" stroke="#1a1c2c" stroke-width="1.6"/><circle cx="12" cy="3" r="1.6" fill="#e43b44" stroke="#1a1c2c"/><path d="M9 15.5h6M3 11v4M21 11v4" stroke="#1a1c2c" stroke-width="1.6" stroke-linecap="round"/>',
  t_missoes:'<path d="M12 2l2.9 6.2 6.6.7-5 4.5 1.4 6.6L12 16.8 6.1 20l1.4-6.6-5-4.5 6.6-.7z" fill="#fee761" stroke="#1a1c2c" stroke-width="1.6" stroke-linejoin="round"/>',
  t_jogar:  '<rect x="2" y="7" width="20" height="11" rx="5.5" fill="#8b5cf6" stroke="#1a1c2c" stroke-width="1.6"/><path d="M7 10.5v4M5 12.5h4" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/><circle cx="16" cy="11" r="1.4" fill="#fee761"/><circle cx="18.5" cy="13.8" r="1.4" fill="#2ce8f5"/>',
  falar:    '<path d="M4 9h4l5-4v14l-5-4H4z" fill="#fff" stroke="#1a1c2c" stroke-width="1.6" stroke-linejoin="round"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" stroke="#fff" stroke-width="1.8" fill="none"/>',
  microfone:'<rect x="9" y="2" width="6" height="12" rx="3" fill="#e43b44" stroke="#1a1c2c" stroke-width="1.6"/><path d="M6 11a6 6 0 0 0 12 0M12 17v4M8 21h8" stroke="#1a1c2c" stroke-width="1.8" fill="none"/>',
  lixo:     '<path d="M5 7h14l-1.2 14H6.2z" fill="#a7b0bd" stroke="#1a1c2c" stroke-width="1.6" stroke-linejoin="round"/><path d="M3 7h18M9 7V4h6v3M10 11v6M14 11v6" stroke="#1a1c2c" stroke-width="1.6"/>',
  mais:     '<circle cx="12" cy="12" r="10" fill="#63c74d" stroke="#1a1c2c" stroke-width="1.6"/><path d="M12 7v10M7 12h10" stroke="#fff" stroke-width="2.8" stroke-linecap="round"/>',
  foto:     '<rect x="2" y="6" width="20" height="14" rx="3" fill="#3b9bff" stroke="#1a1c2c" stroke-width="1.6"/><circle cx="12" cy="13" r="4" fill="#bdf0ff" stroke="#1a1c2c" stroke-width="1.6"/><path d="M8 6l1.5-3h5L16 6" fill="#3b9bff" stroke="#1a1c2c" stroke-width="1.6"/>',
  desfazer: '<path d="M9 7H15a5 5 0 0 1 0 10H8" stroke="#1a1c2c" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M10 3 6 7l4 4" stroke="#1a1c2c" stroke-width="2.2" fill="none" stroke-linecap="round"/>'
};


/* ================================================================
   MUNDO (v3, frente B, 24/10/2026): blocos das peças novas.
   requer = peça(s) que precisam existir em alguma fase para o bloco
   aparecer na escolha ('@nada' = alguma fase de nadar). Bloco que ela
   já usa numa regra aparece sempre. A fase reta continua vendo a
   mesma lista de antes.
   ================================================================ */
FAB.OPCOES.objToca = FAB.OPCOES.objToca.concat(['bolha', 'peixe', 'pena', 'luva', 'cogroxo', 'cavalo']);
FAB.OPCOES.objPisa = FAB.OPCOES.objPisa.concat(['peixe']);
FAB.OPCOES.falas = FAB.OPCOES.falas.concat(['Pulo duplo!', 'Caí do cavalo!', 'Acabou o poder!']);
FAB.OPCOES.poderes = ['duplo:fim', 'duplo:10', 'grudar:fim', 'grudar:10', 'pequeno:fim', 'pequeno:10'];
FAB.OPCOES.poder1 = ['duplo', 'grudar', 'pequeno'];
FAB.OPCOES.destinos = ['outro', 'proxima'];
/* o nome de criança de cada opção que não é peça nem número */
FAB.NOME_OPCAO = {
  'duplo:fim': 'pulo duplo até o fim da fase', 'duplo:10': 'pulo duplo por 10 segundos',
  'grudar:fim': 'grudar na parede até o fim da fase', 'grudar:10': 'grudar na parede por 10 segundos',
  'pequeno:fim': 'ficar pequenino até o fim da fase', 'pequeno:10': 'ficar pequenino por 10 segundos',
  duplo: 'pulo duplo', grudar: 'grudar na parede', pequeno: 'ficar pequenino',
  outro: 'o outro cano', proxima: 'a próxima fase'
};
FAB.PODER_PECAS = ['pena', 'luva', 'cogroxo'];
Object.assign(FAB.QUANDO, {
  folego0:     { nome: 'o fôlego acabar',  fala: 'Quando o fôlego acabar embaixo da água', icone: 'semfolego', param: null, conceito: 'variavel', requer: ['bolha', '@nada'] },
  cano:        { nome: 'entrar no cano',   fala: 'Quando o herói entrar no cano, apertando para baixo', icone: 'cano', param: null, conceito: 'evento', requer: ['cano'] },
  poderacaba:  { nome: 'o poder acabar',   fala: 'Quando o tempo do poder acabar', icone: 'poderfim', param: null, conceito: 'evento', requer: FAB.PODER_PECAS }
});
Object.assign(FAB.SE, {
  tempoder:    { nome: 'tiver o poder',     fala: 'Só se o herói tiver este poder', icone: 'poder', param: 'poder1', conceito: 'condicao', requer: FAB.PODER_PECAS },
  montada:     { nome: 'estiver no cavalo', fala: 'Só se o herói estiver montado no cavalo', icone: 'cavalo', param: null, conceito: 'condicao', requer: ['cavalo'] },
  naomontada:  { nome: 'NÃO estiver no cavalo', fala: 'Só se o herói não estiver no cavalo', icone: 'cavalo', param: null, conceito: 'condicao', requer: ['cavalo'] }
});
Object.assign(FAB.FACA, {
  folego:      { nome: 'de fôlego',         fala: 'Encher o fôlego',            icone: 'folego',   param: 'num', prefixo: '+', conceito: 'variavel', requer: ['bolha', '@nada'] },
  ligar:       { nome: 'ligar o poder',     fala: 'Ligar um poder no herói',    icone: 'poder',    param: 'poderes', conceito: 'sequencia', requer: FAB.PODER_PECAS },
  desligar:    { nome: 'desligar o poder',  fala: 'Desligar um poder do herói', icone: 'poderfim', param: 'poder1', conceito: 'sequencia', requer: FAB.PODER_PECAS },
  montar:      { nome: 'montar no cavalo',  fala: 'Montar no cavalo que ele tocou', icone: 'cavalo', param: null, conceito: 'sequencia', requer: ['cavalo'] },
  desmontar:   { nome: 'descer do cavalo',  fala: 'Descer do cavalo, que volta para o lugar dele', icone: 'desmonta', param: null, conceito: 'sequencia', requer: ['cavalo'] },
  iraoutro:    { nome: 'ir para',           fala: 'Ir para outro lugar pelo cano', icone: 'vaicano', param: 'destinos', conceito: 'sequencia', requer: ['cano'] }
});
Object.assign(FAB.ICONES, {
  folego:    '<circle cx="9" cy="14" r="5.5" fill="#bdf0ff" stroke="#1a1c2c" stroke-width="1.6"/><circle cx="16.5" cy="7.5" r="3.5" fill="#bdf0ff" stroke="#1a1c2c" stroke-width="1.4"/><circle cx="17.5" cy="17.5" r="2.3" fill="#bdf0ff" stroke="#1a1c2c" stroke-width="1.2"/><path d="M6.3 12.5a3 3 0 0 1 2.4-2.2" stroke="#fff" stroke-width="1.5" fill="none" stroke-linecap="round"/>',
  semfolego: '<circle cx="12" cy="12" r="8.5" fill="#d9dee6" stroke="#1a1c2c" stroke-width="1.6" stroke-dasharray="3 2"/><path d="M8 13.5h8" stroke="#1a1c2c" stroke-width="2.2" stroke-linecap="round"/><circle cx="9" cy="9.5" r="1.1" fill="#1a1c2c"/><circle cx="15" cy="9.5" r="1.1" fill="#1a1c2c"/>',
  cano:      '<rect x="3" y="7" width="18" height="5" rx="1" fill="#63c74d" stroke="#1a1c2c" stroke-width="1.6"/><rect x="5" y="12" width="14" height="10" fill="#63c74d" stroke="#1a1c2c" stroke-width="1.6"/><path d="M8 13v8" stroke="#fff" stroke-width="1.6"/><path d="M12 .5v5m-2.5-2.5L12 5.5l2.5-2.5" stroke="#e43b44" stroke-width="2" fill="none" stroke-linecap="round"/>',
  vaicano:   '<rect x="2" y="12" width="7" height="10" fill="#63c74d" stroke="#1a1c2c" stroke-width="1.4"/><rect x="15" y="12" width="7" height="10" fill="#63c74d" stroke="#1a1c2c" stroke-width="1.4"/><path d="M5.5 10C6 3 18 3 18.5 9" stroke="#3b9bff" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M15.8 7.5l2.7 2.3 2.3-2.7" stroke="#3b9bff" stroke-width="2" fill="none" stroke-linecap="round"/>',
  poder:     '<path d="M12 2l2.6 5.6 6.1.6-4.6 4.1 1.3 6L12 15.3l-5.4 3 1.3-6-4.6-4.1 6.1-.6z" fill="#8b5cf6" stroke="#1a1c2c" stroke-width="1.5" stroke-linejoin="round"/><path d="M12.7 6.5 10.3 11h3.2l-1.6 4" stroke="#fee761" stroke-width="1.7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  poderfim:  '<path d="M12 2l2.6 5.6 6.1.6-4.6 4.1 1.3 6L12 15.3l-5.4 3 1.3-6-4.6-4.1 6.1-.6z" fill="#a7b0bd" stroke="#1a1c2c" stroke-width="1.5" stroke-linejoin="round"/><path d="M4 21 20 5" stroke="#e43b44" stroke-width="2.4" stroke-linecap="round"/>',
  cavalo:    '<path d="M6 22c0-6 1-9 4-12L9 4.5l3 2.2c4 0 7 2.3 8 6.3l-2 2-3-1-2 2V22z" fill="#b86f50" stroke="#1a1c2c" stroke-width="1.6" stroke-linejoin="round"/><circle cx="14.5" cy="9" r="1.1" fill="#1a1c2c"/><path d="M10 9.5c-1.6 2-2.2 4.5-2.2 7.5" stroke="#6b3a2e" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M11 16h4" stroke="#e43b44" stroke-width="2.4"/>',
  desmonta:  '<path d="M9 22c0-5 .8-7.5 3.3-10l-.8-4.6 2.5 1.8c3.4 0 5.9 2 6.7 5.3l-1.7 1.7-2.5-.8-1.7 1.7V22z" fill="#b86f50" stroke="#1a1c2c" stroke-width="1.5" stroke-linejoin="round"/><circle cx="16.2" cy="11" r="1" fill="#1a1c2c"/><path d="M4 2v9m-3-3 3 3 3-3" stroke="#e43b44" stroke-width="2.2" fill="none" stroke-linecap="round"/>'
});

/* regras que nascem com a peça (na primeira vez que ela aparece no jogo).
   antesDe = entra antes da primeira regra com este QUANDO (o cadeado do
   cavalo precisa vir antes de "tocar em inimigo -> vidas -1"). */
FAB.PACOTES = {
  pena:    [{ quando: { t: 'toca', obj: 'pena' },    faca: [{ t: 'ligar', v: 'duplo:fim' }, { t: 'some' }, { t: 'fala', v: 'Pulo duplo!' }] }],
  luva:    [{ quando: { t: 'toca', obj: 'luva' },    faca: [{ t: 'ligar', v: 'grudar:fim' }, { t: 'some' }, { t: 'fala', v: 'Uhuu!' }] }],
  cogroxo: [{ quando: { t: 'toca', obj: 'cogroxo' }, faca: [{ t: 'ligar', v: 'pequeno:10' }, { t: 'some' }, { t: 'som', v: 'magia' }] }],
  cavalo:  [{ quando: { t: 'toca', obj: 'cavalo' },  faca: [{ t: 'montar' }, { t: 'fala', v: 'Vamos lá!' }] },
            { quando: { t: 'toca', obj: 'inimigo' }, se: { t: 'montada' }, faca: [{ t: 'desmontar' }, { t: 'som', v: 'ai' }, { t: 'fala', v: 'Caí do cavalo!' }], antesDe: 'toca:inimigo' }],
  bolha:   [{ quando: { t: 'toca', obj: 'bolha' },   faca: [{ t: 'folego', n: 5 }, { t: 'some' }, { t: 'som', v: 'magia' }] }],
  '@nada': [{ quando: { t: 'folego0' },              faca: [{ t: 'vida', n: -1 }, { t: 'volta' }] }],
  cano:    [{ quando: { t: 'cano' },                 faca: [{ t: 'iraoutro', v: 'outro' }, { t: 'som', v: 'pulo' }] }]
};
/* a peça existe em alguma fase do jogo? ('@nada' = alguma fase de nadar) */
FAB.temPeca = function (J, req) {
  var fs = (J && J.fases) || [];
  if (req === '@nada') return fs.some(function (f) { return !!f.nada; });
  var T = FAB.TIPOS[req]; if (!T) return false;
  return fs.some(function (f) { return (f.mapa || []).some(function (l) { return l.indexOf(T.letra) >= 0; }); });
};
/* põe as regras do pacote no jogo, uma vez por peça (se ela apagar, não volta) */
FAB.pacoteNasce = function (J) {
  if (!J || !Array.isArray(J.regras) || !FAB.novaRegra) return false;
  var novo = false; J.pacotes = J.pacotes || {};
  Object.keys(FAB.PACOTES).forEach(function (k) {
    if (J.pacotes[k] || !FAB.temPeca(J, k)) return;
    J.pacotes[k] = 1; novo = true;
    FAB.PACOTES[k].forEach(function (m) {
      var r = FAB.novaRegra({ quando: m.quando, se: m.se || null, faca: m.faca }), i = -1; r.pacote = k;
      if (m.antesDe) { var p = m.antesDe.split(':'); for (var j = 0; j < J.regras.length; j++) if (J.regras[j].quando.t === p[0] && J.regras[j].quando.obj === p[1]) { i = j; break; } }
      if (i >= 0) J.regras.splice(i, 0, r); else J.regras.push(r);
    });
  });
  return novo;
};
/* o bloco aparece na escolha? (sem "requer" = sempre; em uso numa regra = sempre) */
FAB.blocoAparece = function (def, J, usado) {
  if (!def.requer || usado) return true;
  return def.requer.some(function (q) { return FAB.temPeca(J, q); });
};

/* nome que aparece para cada som (o id do som continua o mesmo nas regras salvas) */
FAB.NOME_SOM = { vitoria: 'vitória' };
/* B2: "o tempo acabar" e "segundos no relógio" com desenhos diferentes (antes os dois eram a ampulheta) */
Object.assign(FAB.ICONES, {
  tempofim:  '<path d="M5 3h11M5 21h11M6 3c0 5 9 5 9 9s-9 4-9 9M15 3c0 5-9 5-9 9s9 4 9 9" stroke="#1a1c2c" stroke-width="1.6" fill="#d9dee6"/><circle cx="18" cy="17" r="5" fill="#e43b44" stroke="#1a1c2c" stroke-width="1.4"/><path d="M16 15l4 4m0-4-4 4" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>',
  maistempo: '<path d="M5 3h11M5 21h11M6 3c0 5 9 5 9 9s-9 4-9 9M15 3c0 5-9 5-9 9s9 4 9 9" stroke="#1a1c2c" stroke-width="1.6" fill="#fee761"/><circle cx="18" cy="17" r="5" fill="#3fbf5a" stroke="#1a1c2c" stroke-width="1.4"/><path d="M18 14.2v5.6M15.2 17h5.6" stroke="#fff" stroke-width="2" stroke-linecap="round"/>'
});
