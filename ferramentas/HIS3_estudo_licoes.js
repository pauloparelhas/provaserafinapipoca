/* ============================================================
   HIS3_estudo_licoes.js — as 9 LIÇÕES da teoria de História Y2, 3º trimestre.
   v2 (22/11, Paulo: "use o que fizemos na prova de Math"): mesmo molde de MAT3/GEO3 — título-conceito,
   figura REAL da aula e 2 a 4 linhas "termo — explicação". Sem perguntas (ficam no simulado), sem rolagem.
   Fonte única: trabalho/3tri_historia/_roteiro.md. Figuras: media/his3/ (recortes dos slides da U3 e da U4).
   A versão com 14 lições e atividades está no histórico do git (antes de 22/11/2026).
   ============================================================ */
window.HIS3_LICOES = (function(){
'use strict';
function I(n){ return 'media/his3/'+n+'.jpg'; }
/* linha: termo (rótulo) — explicação curta */
function LN(t,e){ return '<p class="ml"><b class="mt rot">'+t+'</b>'+(e?' — '+e:'')+'</p>'; }
/* definição de conceito-base: frase inteira "Termo é ..." */
function D(t,e){ return '<p class="ml"><b class="mt rot">'+t+'</b> '+e+'</p>'; }
function FIG(img,cap){ return '<figure class="mfig">'+(img.charAt(0)==='<'?img:'<img src="'+I(img)+'" alt="'+(cap||'').replace(/"/g,'')+'">')+(cap?'<figcaption>'+cap+'</figcaption>':'')+'</figure>'; }
/* molde 1: figura + linhas */
function M(img,cap,linhas,cl){ return '<div class="m1'+(cl?' '+cl:'')+'">'+FIG(img,cap)+'<div class="mlin">'+linhas.join('')+'</div></div>'; }
/* duas, três ou quatro figuras com nome dentro do molde 1 */
function QUAD(fs){ return '<div class="mq'+(fs.length===2?' mq2':fs.length===3?' mq3':'')+'">'+fs.map(function(f){ return '<figure class="mqf"><img src="'+I(f[0])+'" alt="'+f[1]+'"><figcaption>'+f[1]+'</figcaption></figure>'; }).join('')+'</div>'; }
/* molde 2: colunas iguais (figura + linhas) */
function MC(cols){ return '<div class="mg h3" style="--mc:'+cols.length+'">'+cols.map(function(c){ return '<div class="mcol">'+FIG(c[0],c[1])+'<div class="mlin">'+c[2].join('')+'</div></div>'; }).join('')+'</div>'; }
/* tabela curta: [cor, coluna 1, coluna 2, ...] */
function TAB(cab,ls){ return '<table class="mtab ig-svg">'+(cab?'<tr>'+cab.map(function(c){ return '<th class="rot">'+c+'</th>'; }).join('')+'</tr>':'')+ls.map(function(l){ return '<tr style="--bc:'+l[0]+'">'+l.slice(1).map(function(c,i){ return i?'<td>'+c+'</td>':'<td><b class="rot">'+c+'</b></td>'; }).join('')+'</tr>'; }).join('')+'</table>'; }
function T(tit,html){ return {tipo:'texto', tit:tit, html:html}; }
var C={oral:'#a855f7',escrita:'#3b82f6',visual:'#f97316',material:'#22c55e'};

return [

{k:'fontes', tema:'fontes', unid:3, nome:'O que são fontes históricas', curto:'Fontes históricas', capa:'fonte-carta', cor:'#9333ea', treino:[], telas:[
 T('O que são <em>fontes históricas</em>?', M(QUAD([['fonte-entrevista','Ouvir uma entrevista'],['fonte-carta','Ler uma carta'],['fonte-album','Ver fotos'],['fonte-chapeu','Tocar um chapéu']]),'',[
  D('Fonte histórica','é aquilo que a gente pode ver, ouvir, tocar ou ler para aprender sobre outras épocas.'),
  LN('Pistas','as fontes são pistas do passado.'),
  LN('Em todo lugar','tudo ao nosso redor pode contar uma história.')])),
 T('Por que as fontes são <em>importantes</em>?', M('fonte-quadros','Fotos antigas na parede',[
  LN('Mostram','como as pessoas viviam, se vestiam, brincavam e se comunicavam.'),
  LN('Preservam a memória','as fontes guardam lembranças das pessoas e dos povos.'),
  LN('Você também','o que você faz hoje será a fonte histórica de amanhã.')])),
 T('O <em>detetive</em> da história', M('fonte-album','Fotos de família',[
  LN('Observa','olha cada detalhe com atenção.'),
  LN('Pergunta','quem aparece? Onde e quando foi? O que acontecia? Por que é importante?'),
  LN('Compara','junta várias pistas para entender melhor o passado.')]))
]},

{k:'tipos', tema:'fontes', unid:3, nome:'Os 4 tipos de fonte histórica', curto:'Os 4 tipos de fonte', capa:'fonte-entrevista', cor:'#2563eb', treino:[], telas:[
 T('Os <em>4 tipos</em>', MC([
  ['fonte-entrevista','',[D('Oral','é quando alguém conta.')]],['fonte-carta','',[D('Escrita','é quando alguém escreveu.')]],
  ['fonte-album','',[D('Visual','é uma imagem que a gente vê.')]],['fonte-chapeu','',[D('Material','é um objeto que a gente toca.')]]])),
 T('Fonte <em>oral</em>', M(QUAD([['fonte-entrevista','Uma entrevista'],['fonte-roda','Cantigas de roda']]),'',[
  D('Fonte oral','é um relato ou uma história contada por alguém.'),
  LN('Exemplos','a avó contando a infância, entrevista, cantigas.'),
  LN('Passa pela fala','de geração em geração: dos avós para os pais, dos pais para os filhos.')])),
 T('Fonte <em>escrita</em>', M(QUAD([['fonte-carta','Uma carta'],['fonte-certidao','Certidão de nascimento']]),'',[
  D('Fonte escrita','é um texto que alguém escreveu.'),
  LN('Exemplos','diário, lei, jornal, carta, bilhete, receita, certidão de nascimento.')])),
 T('Fonte <em>visual</em>', M(QUAD([['fonte-album','Fotografias'],['fonte-mapa','Um mapa']]),'',[
  D('Fonte visual','é uma imagem que mostra um momento do passado.'),
  LN('Exemplos','pintura, fotografia, mapa, escultura.')])),
 T('Fonte <em>material</em>', M(QUAD([['fonte-chapeu','Chapéu e casaco'],['fonte-sofa','Sofá'],['fonte-bonecas','Bonecas'],['fonte-castelo','Castelo']]),'',[
  D('Fonte material','é um objeto ou uma construção do passado.'),
  LN('Exemplos','brinquedo, roupa, móvel, panela, castelo.')])),
 T('A <em>ficha</em> do objeto', M('f-livros','Livros antigos',[
  LN('Como é esse objeto?','cor, tamanho, material.'),
  LN('Conta uma história do passado?','sim, não ou não tenho certeza. Por quê?'),
  LN('O que faz lembrar?','uma pessoa da família, algo que já aconteceu ou um lugar.')])),
 T('Objeto, foto ou <em>texto</em>?', MC([
  ['fonte-bonecas','',[LN('A boneca','é um objeto: material.'),LN('A foto da boneca','é uma imagem: visual.')]],
  ['fonte-livros','',[LN('O livro fechado','é um objeto: material.'),LN('O que está escrito nele','é um texto: escrita.')]],
  ['fonte-carta','',[LN('A avó escreveu','a carta é escrita.'),LN('A avó contou','o relato é oral.')]]])),
 T('A <em>legenda</em> de uma fonte', M('trem','Trem a vapor antigo',[
  LN('O que a imagem mostra?','um trem a vapor antigo.'),
  LN('Que tipo de fonte é?','a foto do trem é visual.'),
  LN('O que pode contar?','como as pessoas viajavam antigamente.')]))
]},

{k:'escola', tema:'escola', unid:3, nome:'A escola tem história', curto:'A escola tem história', capa:'f-lousa', cor:'#0284c7', treino:[], telas:[
 T('A escola <em>guarda pistas</em>', M(TAB(['Na escola','Tipo de fonte'],[[C.visual,'Fotos antigas das turmas','visual'],[C.escrita,'Cadernos, boletins, bilhetes','escrita'],[C.material,'Uniformes e troféus','material'],[C.oral,'Lembranças contadas','oral']]),'',[
  LN('A escola','tem uma história cheia de acontecimentos, pessoas e mudanças.'),
  LN('Memórias diferentes','alunos, professores e funcionários lembram da mesma escola de jeitos diferentes.')])),
 T('Documentos da <em>vida escolar</em>', M('p-professora-antiga','Uma aula antigamente',[
  D('Documentos da vida escolar','são cadernos, boletins, bilhetes e registros de eventos. São fontes escritas.'),
  LN('Mostram','como era o ensino, as regras e o dia a dia.'),
  LN('Por que guardar?','para preservar a memória e contar a história da escola.')])),
 T('<em>Mudança</em> e <em>permanência</em>', MC([
  ['f-lousa','',[D('Mudança','é o que ficou diferente com o tempo.'),LN('Na escola','do quadro de giz para a lousa digital; da biblioteca para a internet.')]],
  ['p-professora','',[D('Permanência','é o que continuou igual.'),LN('Na escola','conversar com os alunos e ouvir as ideias deles.')]]]))
]},

{k:'olhar', tema:'olhar', unid:3, nome:'Cada um vê de um jeito', curto:'Cada um vê de um jeito', capa:'aniversario', cor:'#ea580c', treino:[], telas:[
 T('A mesma imagem, <em>histórias diferentes</em>', M('aniversario','Uma festa de aniversário',[
  LN('Cada pessoa','repara em coisas diferentes na mesma imagem.'),
  LN('Olhando de novo','a gente percebe coisas novas.'),
  D('Ponto de vista','é o jeito de cada um ver uma história.')])),
 T('<em>Quem fez</em> e por quê?', MC([
  ['postal-frente','',[LN('Cartão-postal','quem viajou escreveu para contar a viagem aos amigos.')]],
  ['anuncio','',[LN('Anúncio de jornal','foi feito para vender leite.')]],
  ['propaganda','',[LN('Propaganda','foi feita para vender um alimento às famílias.')]]])),
 T('O que é <em>suposição</em>?', M('navio','Pessoas num navio, antigamente',[
  D('Suposição','é o que a gente imagina quando não sabe tudo. Nem sempre está certa.'),
  D('Historiador','é quem estuda o passado. Ele reúne várias fontes e compara.'),
  LN('Esquecidas','algumas histórias são registradas; outras acabam esquecidas.')]))
]},

{k:'mudaram', tema:'profissoes', unid:4, nome:'Profissões que mudaram', curto:'Profissões que mudaram', capa:'p-carteiro', cont:1, cor:'#16a34a', treino:[], telas:[
 T('Por que as profissões <em>mudam</em>?', M(QUAD([['p-carteiro','Carteiro'],['p-professora','Professora'],['p-fazendeiro','Fazendeiro'],['p-medico','Médico']]),'',[
  LN('Novidades','surgem máquinas, tecnologias e jeitos de se comunicar.'),
  LN('O trabalho','fica mais rápido ou mais confortável.'),
  LN('Continuam existindo','o que muda é o jeito de trabalhar.')])),
 T('O <em>carteiro</em>, Seu Francisco', M('p-carteiro','',[
  LN('Antes','ia a pé, com bolsa de couro, levando cartas escritas à mão.'),
  LN('Depois','ganhou bicicleta e, mais tarde, vieram as motos.'),
  LN('Hoje','os carteiros usam aparelho com tela e entregam compras da internet.'),
  LN('Continua','a profissão existe, de um jeito diferente.')])),
 T('A <em>professora</em>, Dona Lúcia', M('p-professora','',[
  LN('Antes','quadro de giz, livros grandes e pesados, tudo escrito à mão, pesquisa na biblioteca.'),
  LN('Hoje','computador, vídeos, lousa digital, internet.'),
  LN('Continua','conversar com os alunos e ajudá-los a aprender com alegria.')])),
 T('O <em>fazendeiro</em>, Seu Pedro', M('p-fazendeiro','',[
  LN('Antes','trabalho com as mãos e arado puxado por bois.'),
  LN('Hoje','tratores, máquinas que plantam e colhem, celular para saber se vai chover.'),
  LN('Futuro','plantar em cima de prédios ou com robôs.'),
  LN('Continua','amar a terra e cuidar da natureza.')])),
 T('O <em>médico</em>, Doutor João', M('p-medico','',[
  LN('Antes','poucos aparelhos, papel e caneta; os exames demoravam dias.'),
  LN('Hoje','computador, exames pelo celular, consulta por vídeo.'),
  LN('Continua','o cuidado e a atenção com cada paciente.')]))
]},

{k:'anteshoje', tema:'profissoes', unid:4, nome:'Antes e hoje', curto:'Antes e hoje', capa:'campo-hoje', cor:'#0d9488', treino:[], telas:[
 T('O trabalho no <em>campo</em>', M(QUAD([['campo-antes','Antes'],['campo-hoje','Hoje']]),'',[LN('Antes','os bois ajudavam a trabalhar a terra.'),LN('Hoje','há máquinas no campo.'),LN('Numa frase','“Antigamente, os bois ajudavam no campo. Hoje, há máquinas.”')])),
 T('A <em>cirurgia</em>', M(QUAD([['cirurgia-antes','Antes'],['cirurgia-hoje','Hoje']]),'',[LN('Antes','a cirurgia não tinha robô.'),LN('Hoje','há até robô que ajuda.'),LN('Numa frase','“Antigamente, a cirurgia não tinha robô. Hoje, há robô que ajuda.”')])),
 T('A <em>entrega</em>', M(QUAD([['entrega-antes','Antes'],['entrega-hoje','Hoje']]),'',[LN('Antes','carrinho de mão.'),LN('Hoje','existe até entrega com drone.'),LN('Numa frase','“Antigamente, usavam carrinho de mão. Hoje, existe até drone.”')])),
 T('A <em>engenharia</em>', M(QUAD([['engenharia-antes','Antes'],['engenharia-hoje','Hoje']]),'',[LN('Antes','desenhos no papel.'),LN('Hoje','também computador e robô.'),LN('Numa frase','“Antigamente, usavam desenhos no papel. Hoje, usam também computador e robô.”')])),
 T('<em>Ferramentas</em> de antigamente', MC([
  ['f-maleta','',[LN('Médico','maleta, termômetro de mercúrio, seringa.')]],['f-camera','',[LN('Fotógrafo','câmera grande de tripé.')]],
  ['f-globo','',[LN('Professora','lousa, livros, globo.')]],['f-colher','',[LN('Construtor','marreta, colher de pedreiro, pincel.')]]]))
]},

{k:'antigas', tema:'profissoes', unid:4, nome:'Profissões antigas e profissões novas', curto:'Antigas e novas', capa:'prof-leiteiro', cont:1, cor:'#b45309', treino:[], telas:[
 T('Profissões <em>antigas</em>', MC([
  ['prof-leiteiro','',[LN('Leiteiro','entregava garrafas de leite na porta das casas.')]],
  ['prof-datilografa','',[LN('Datilógrafa','escrevia na máquina de escrever.')]],
  ['prof-vendedor-frutas','',[LN('Vendedor com cestos','levava frutas pelas ruas.')]]])),
 T('O <em>acendedor de lampião</em>', M('<svg class="lamp ig-svg" viewBox="0 0 120 150" role="img" aria-label="lampião de rua"><rect width="120" height="150" rx="10" fill="#1e293b"/><circle cx="60" cy="52" r="44" fill="#fde047" opacity=".22"/><path d="M60 148V82M42 148h36" stroke="#94a3b8" stroke-width="8" stroke-linecap="round"/><path d="M42 34h36l-8 48H50z" fill="#fde047" stroke="#cbd5e1" stroke-width="5" stroke-linejoin="round"/><path d="M37 34 60 14l23 20z" fill="#cbd5e1"/><path d="M60 74c-9-7-7-15 0-25 7 10 9 18 0 25z" fill="#f97316"/></svg>','Um lampião de rua',[
  LN('O que fazia','acendia os postes das ruas, um a um.'),
  LN('Por que acabou','chegou a energia elétrica.'),
  LN('A regra','novas tecnologias passaram a fazer coisas que antes eram feitas por pessoas.'),
  LN('Atenção','o carteiro mudou, mas continua existindo.')])),
 T('Profissões <em>novas</em>', M('engenharia-hoje','Trabalho com computador e robô',[
  LN('Criadas pela tecnologia','designer gráfico, desenvolvedor de aplicativos, cientista de dados.'),
  LN('No tempo dos avós','elas não existiam, porque ainda não havia essa tecnologia.')])),
 T('<em>Todo trabalho</em> é importante', M('p-construtor-antigo','Um construtor, antigamente',[
  LN('Em todo lugar','na escola, em casa, nas ruas, nas fazendas, nos hospitais.'),
  LN('Pouco notados','alguns trabalhos passam despercebidos, mas são muito importantes.'),
  LN('A vida de cada um','o lugar e as condições de vida influenciam o trabalho da pessoa.'),
  LN('Natureza','alguns trabalhos ajudam o meio ambiente; outros causam problemas e precisam mudar.')]))
]},

{k:'mundo', tema:'mundo', unid:3, nome:'Pistas no mundo e no tempo', curto:'Mundo e tempo', capa:'fonte-castelo', cor:'#a16207', treino:[], telas:[
 T('As primeiras <em>cidades</em>', M(TAB(null,[['#a16207','1','Nômades viajavam em busca de comida.'],['#65a30d','2','Com a agricultura, aprenderam a cultivar a terra.'],['#0d9488','3','Surgiram acampamentos fixos.'],['#2563eb','4','Os acampamentos deram origem às cidades.']]),'',[
  D('Nômade','é quem viaja de um lugar para outro em busca de comida.'),
  D('Agricultura','é cultivar a terra.')])),
 T('Os <em>grandes rios</em>', M(TAB(['Rio','Lugar'],[['#0284c7','Nilo','Egito'],['#0d9488','Tigre e Eufrates','Mesopotâmia'],['#ca8a04','Amarelo','China']]),'',[
  LN('As cidades mais antigas','cresceram “abraçadas” aos rios.'),
  LN('Sem os rios','a vida não seria possível nessas regiões.')])),
 T('O que é <em>patrimônio</em>?', M(TAB(['Patrimônio','Exemplos'],[['#a16207','Material','museu, praça, estátua'],['#9333ea','Imaterial','capoeira, festa junina, receita de família']]),'',[
  D('Patrimônio','é tudo o que é importante para a memória de um povo.'),
  LN('Sua família','também carrega tradições.')])),
 T('O <em>tempo</em>', M(TAB(null,[['#db2777','Relógio','marca igual para todos'],['#16a34a','Rápido','brincar, festa, jogo'],['#ea580c','Devagar','fila, esperar o recreio'],['#2563eb','Medir','ampulheta, calendário, relógio']]),'',[
  LN('Sentir o tempo','cada pessoa pode sentir o tempo de um jeito.'),
  LN('A natureza','dia e noite, as estações e as pessoas envelhecendo mostram o tempo passar.'),
  LN('A árvore generosa','o menino cresceu, e o que ele queria mudou.')])),
 T('Registros na <em>linha do tempo</em>', M(TAB(null,[['#a16207','1','jornal'],['#b45309','2','carta'],['#ea580c','3','diário'],['#db2777','4','álbum de fotos'],['#9333ea','5','foto digital'],['#2563eb','6','redes sociais']]),'',[
  D('Registro','é um jeito de guardar o que aconteceu.'),
  LN('Documentos pessoais','como a certidão de nascimento, registram a nossa história.'),
  LN('Museus e arquivos','guardam memórias para o futuro.')]))
]},

{k:'resposta', tema:'fontes', unid:4, nome:'A resposta completa', curto:'Resposta completa', capa:'f-livros', cor:'#7c3aed', treino:[], telas:[
 T('Como <em>escrever</em>', M(TAB(null,[['#7c3aed','1','Use as palavras da pergunta.'],['#2563eb','2','Diga quem: as pessoas, o médico.'],['#16a34a','3','Compare: antigamente e hoje.'],['#ea580c','4','Letra maiúscula e ponto final.']]),'',[
  LN('Incompleta','“Para saber como eles viviam.” Eles quem?'),
  LN('Completa','“As fontes mostram como as pessoas viviam antigamente.”')])),
 T('Como era <em>no passado</em>?', M(TAB(['Profissão','No passado'],[['#ca8a04','Carteiro','entregava as cartas a pé'],['#0284c7','Professora','usava quadro de giz'],['#65a30d','Fazendeiro','usava arado puxado por bois'],['#0d9488','Médico','anotava tudo no papel'],['#ea580c','Fotógrafo','usava câmera grande de tripé']]),'',[
  LN('Numa frase','“No passado, o carteiro entregava as cartas a pé.”')]))
]}
];
})();
