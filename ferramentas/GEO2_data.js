/* ============================================================
   GEO2_data.js — banco UNICO de classificacao (Geografia 2tri)
   Unidade 2 — "Diferentes comunidades e sua relacao com os lugares".
   Compartilhado por GEO2_dragdrop.html (Arrasta e classifica) e
   GEO2_popit.html (Estoura o balao). 1 fonte, 2 produtos.

   Materia em PORTUGUES: o campo `en` carrega o texto principal e o
   campo `pt` carrega a DICA (mostrada pelo botao 💡 da barra).
   Conteudo 100% derivado de trabalho/2tri_geografia/_roteiro.md
   (extraido do PDF Toddle da Unidade 2). Nada inventado.

   Ambiguidades tratadas (ver §7 do roteiro): "Festa do Divino",
   "festa da uva", "sertanejo" e "carnaval" NUNCA aparecem sozinhos
   como carta de resposta unica — so com o nome completo.
   ============================================================ */
const REG = {
  n:  {id:'norte',        en:'Norte',         pt:'floresta e rios',      emo:"\u{1F333}", co:'#34d399'},
  ne: {id:'nordeste',     en:'Nordeste',      pt:'sol e praia',          emo:"\u{2600}\u{FE0F}", co:'#fb923c'},
  co: {id:'centrooeste',  en:'Centro-Oeste',  pt:'cerrado e pantanal',   emo:"\u{1F99C}", co:'#fbbf24'},
  se: {id:'sudeste',      en:'Sudeste',       pt:'cidades grandes',      emo:"\u{1F3D9}\u{FE0F}", co:'#a78bfa'},
  s:  {id:'sul',          en:'Sul',           pt:'o mais frio',          emo:"\u{1F332}", co:'#38bdf8'}
};
const CINCO = [REG.n, REG.ne, REG.co, REG.se, REG.s];

const GAMES = [

 /* ---------- 1. em que a cultura aparece ----------
    O jogo "Palavras da Unidade" (tradição × migração × identidade cultural)
    FOI REMOVIDO em 09/08. Motivo (auditoria de escolhas, regra R1): o material
    define os três conceitos ENCADEADOS na mesma frase — "essas tradições…
    vieram com as pessoas que migraram… trazendo consigo hábitos, crenças e
    modos de viver que influenciaram os lugares onde chegaram". Opor os três
    como caixas mutuamente exclusivas produzia itens em que a criança que
    marcasse a outra caixa TINHA argumento. O significado de cada palavra
    continua treinado — mas em formato de pergunta com alternativas
    inequivocamente erradas (simulado e Expedição Brasil), não em caixa.       */
 { key:'manifest', emo:"\u{1F3AD}",
   en:"Onde a cultura aparece", pt:"comida · dança e música · festa",
   info:"A cultura aparece na comida, na roupa, na religião, nas festas e na arquitetura. Classifique cada exemplo.",
   infopt:"Todos estes exemplos estão no material da Unidade 2.",
   tip:"O material diz: a cultura de quem migra aparece na culinária, nas vestimentas, na religião, nas festas e na arquitetura.",
   tippt:"Se dá para comer → culinária. Se dá para dançar ou cantar → dança e música. Se junta muita gente na rua → festa.",
   cols:[
     {id:'comida', en:'Culinária',       pt:'para comer e beber', emo:"\u{1F372}", co:'#34d399'},
     {id:'danca',  en:'Dança e música',  pt:'para dançar e cantar', emo:"\u{1F3B5}", co:'#f472b6'},
     {id:'festa',  en:'Festa e celebração', pt:'para comemorar juntos', emo:"\u{1F389}", co:'#fbbf24'}
   ],
   cards:[
     {en:"Acarajé",              pt:"", col:'comida'},
     {en:"Pão de queijo",        pt:"", col:'comida'},
     {en:"Chimarrão",            pt:"bebida da cultura gaúcha", col:'comida'},
     {en:"Farinha de mandioca",  pt:"", col:'comida'},
     {en:"Carimbó",              pt:"", col:'danca'},
     {en:"Maracatu",             pt:"", col:'danca'},
     {en:"Samba",                pt:"", col:'danca'},
     {en:"Jongo",                pt:"dança, percussão e cantos em roda", col:'danca'},
     {en:"Oktoberfest de Blumenau", pt:"", col:'festa'},
     {en:"Festival de Parintins",   pt:"", col:'festa'},
     {en:"Semana Farroupilha",      pt:"", col:'festa'},
     {en:"Festa do peão de Barretos", pt:"", col:'festa'}
   ] },

 /* ---------- 3. comidas típicas por região ---------- */
 { key:'comidas', emo:"\u{1F35B}",
   en:"Comidas típicas — qual região?", pt:"as 5 regiões do Brasil",
   info:"Arraste cada comida para a região de onde ela é.",
   infopt:"Estão todas no painel das 5 regiões do material.",
   tip:"Norte: tacacá e açaí · Nordeste: acarajé, baião de dois, vatapá · Centro-Oeste: arroz com pequi e pamonha · Sudeste: feijoada, pão de queijo, tutu de feijão, moqueca capixaba · Sul: churrasco gaúcho e arroz carreteiro.",
   tippt:"Cuidado com o cuscuz: existe o paulista (Sudeste) e o nordestino (Nordeste)!",
   cols:CINCO,
   cards:[
     {en:"Tacacá",              pt:"", col:'norte'},
     {en:"Açaí",                pt:"fruta da floresta amazônica", col:'norte'},
     {en:"Acarajé",             pt:"", col:'nordeste'},
     {en:"Baião de dois",       pt:"", col:'nordeste'},
     {en:"Vatapá",              pt:"", col:'nordeste'},
     {en:"Cuscuz nordestino",   pt:"flocos de milho cozidos no vapor", col:'nordeste'},
     {en:"Arroz com pequi",     pt:"", col:'centrooeste'},
     {en:"Pamonha",             pt:"", col:'centrooeste'},
     {en:"Feijoada",            pt:"", col:'sudeste'},
     {en:"Pão de queijo",       pt:"", col:'sudeste'},
     {en:"Tutu de feijão",      pt:"", col:'sudeste'},
     {en:"Moqueca capixaba",    pt:"capixaba = do Espírito Santo", col:'sudeste'},
     {en:"Cuscuz paulista",     pt:"paulista = de São Paulo", col:'sudeste'},
     {en:"Churrasco gaúcho",    pt:"", col:'sul'},
     {en:"Arroz carreteiro",    pt:"", col:'sul'}
   ] },

 /* ---------- 4. festas e comemorações por região ---------- */
 { key:'festas', emo:"\u{1F386}",
   en:"Festas e comemorações — qual região?", pt:"as 5 regiões do Brasil",
   info:"Arraste cada festa para a região onde ela acontece.",
   infopt:"Todas saíram do painel das 5 regiões.",
   tip:"Norte: festival de Parintins (boi-bumbá) · Nordeste: carnaval de Salvador, festa de São João, bumba meu boi, Senhor do Bonfim, Iemanjá · Centro-Oeste: Divino Espírito Santo, São Benedito, São Sebastião, Romaria do Divino Pai Eterno · Sudeste: peão de Barretos, carnaval do Rio, festa da uva de Jundiaí, Nossa Senhora Aparecida, congada · Sul: Oktoberfest, pinhão, festa do vinho, Semana Farroupilha.",
   tippt:"Pegadinha: boi-bumbá é do NORTE (Parintins) e bumba meu boi é do NORDESTE.",
   cols:CINCO,
   cards:[
     {en:"Festival de Parintins (boi-bumbá)", pt:"Parintins fica no Amazonas", col:'norte'},
     {en:"Carnaval de Salvador",              pt:"", col:'nordeste'},
     {en:"Festa de São João",                 pt:"", col:'nordeste'},
     {en:"Bumba meu boi",                     pt:"não confunda com o boi-bumbá de Parintins", col:'nordeste'},
     {en:"Festa do Senhor do Bonfim",         pt:"", col:'nordeste'},
     {en:"Festa de Iemanjá",                  pt:"", col:'nordeste'},
     {en:"Desfile dos Bonecos Gigantes de Olinda", pt:"Olinda fica em Pernambuco", col:'nordeste'},
     {en:"Festa do Divino Espírito Santo",    pt:"o nome completo é a pista", col:'centrooeste'},
     {en:"Festa de São Benedito",             pt:"", col:'centrooeste'},
     {en:"Romaria do Divino Pai Eterno",      pt:"", col:'centrooeste'},
     {en:"Festa do peão de Barretos",         pt:"Barretos fica em São Paulo", col:'sudeste'},
     {en:"Carnaval do Rio",                   pt:"", col:'sudeste'},
     {en:"Festa da uva de Jundiaí",           pt:"Jundiaí fica em São Paulo", col:'sudeste'},
     {en:"Festa de Nossa Senhora Aparecida",  pt:"", col:'sudeste'},
     {en:"Festa da congada",                  pt:"", col:'sudeste'},
     {en:"Oktoberfest de Blumenau",           pt:"Blumenau fica em Santa Catarina", col:'sul'},
     {en:"Festa nacional do pinhão",          pt:"o pinhão vem da araucária", col:'sul'},
     {en:"Semana Farroupilha",                pt:"", col:'sul'}
   ] },

 /* ---------- 5. danças e músicas por região ---------- */
 { key:'ritmos', emo:"\u{1F483}",
   en:"Danças e músicas — qual região?", pt:"as 5 regiões do Brasil",
   info:"Arraste cada dança ou música para a sua região.",
   infopt:"No Nordeste, frevo, forró, baião e maracatu são dança E música — a região é a resposta.",
   tip:"Norte: carimbó, toada, boi-bumbá · Nordeste: frevo, forró, baião, maracatu, axé, xote · Centro-Oeste: siriri, cururu, moda de viola · Sudeste: samba, funk, pagode, MPB · Sul: xote gaúcho, pau de fita, sertanejo universitário.",
   tippt:"Cuidado: moda de viola é do Centro-Oeste; sertanejo universitário é do Sul; xote gaúcho é do Sul.",
   cols:CINCO,
   cards:[
     {en:"Carimbó",               pt:"", col:'norte'},
     {en:"Toada",                 pt:"", col:'norte'},
     {en:"Frevo",                 pt:"", col:'nordeste'},
     {en:"Forró",                 pt:"", col:'nordeste'},
     {en:"Baião",                 pt:"", col:'nordeste'},
     {en:"Maracatu",              pt:"", col:'nordeste'},
     {en:"Axé",                   pt:"", col:'nordeste'},
     {en:"Siriri",                pt:"", col:'centrooeste'},
     {en:"Cururu",                pt:"", col:'centrooeste'},
     {en:"Moda de viola",         pt:"vem junto com o sertanejo do Centro-Oeste", col:'centrooeste'},
     {en:"Samba",                 pt:"", col:'sudeste'},
     {en:"Pagode",                pt:"", col:'sudeste'},
     {en:"Funk",                  pt:"", col:'sudeste'},
     {en:"MPB",                   pt:"Música Popular Brasileira", col:'sudeste'},
     {en:"Xote gaúcho",           pt:"gaúcho = do Rio Grande do Sul", col:'sul'},
     {en:"Pau de fita",           pt:"", col:'sul'},
     {en:"Sertanejo universitário", pt:"", col:'sul'}
   ] },

 /* ---------- 6. as 10 tradições e costumes ---------- */
 { key:'tradicoes', emo:"\u{1F5BC}\u{FE0F}",
   en:"Tradições e costumes — de onde são?", pt:"as fotos da Aula 4",
   info:"Estas são as tradições das fotos do material. De qual região é cada uma?",
   infopt:"Só entram aqui as que o material diz a região.",
   tip:"Farinha de mandioca e Santo Daime: Amazônia (Norte) · Bonecos de Olinda, xilogravura do cordel e cuscuz nordestino: Nordeste · Cuscuz paulista: Sudeste · Oktoberfest de Blumenau e chimarrão: Sul.",
   tippt:"O jongo (matriz africana) e o jiu-jitsu brasileiro não têm região no material — por isso não estão aqui.",
   /* só 4 regiões: o material NÃO traz nenhuma das 10 tradições no Centro-Oeste
      (inventar uma seria fabricar dado — roteiro §5 + protocolo anti-invenção) */
   cols:[REG.n, REG.ne, REG.se, REG.s],
   cards:[
     {en:"Produção artesanal de farinha de mandioca", pt:"prática dos povos indígenas da Amazônia", col:'norte'},
     {en:"Celebração do Santo Daime",                 pt:"ritual religioso amazônico dos anos 1930", col:'norte'},
     {en:"Bonecos Gigantes de Olinda",                pt:"", col:'nordeste'},
     {en:"Xilogravura da literatura de cordel",       pt:"arte tradicional do Nordeste", col:'nordeste'},
     {en:"Cuscuz nordestino",                         pt:"", col:'nordeste'},
     {en:"Cuscuz paulista",                           pt:"o nome já diz de qual estado é", col:'sudeste'},
     {en:"Oktoberfest de Blumenau",                   pt:"veio da Alemanha e ficou em Santa Catarina", col:'sul'},
     {en:"Chimarrão",                                 pt:"", col:'sul'}
   ] }
];
