/* ============================================================
   HIS3_banco.js — BANCO ÚNICO de História · 3º trimestre · Y2
   AF de História em 27/10/2026. Universo: "Detetives do Tempo".
   Fonte única: trabalho/3tri_historia/_roteiro.md (v1.1, validado
   pelo pedagogico). Nada aqui sai do roteiro.

   Usado por: jogo (HIS3_jogo), Caderno do Detetive (HIS3_estudo,
   treininho) e simulado (gerado por gen_simulado_his3.js).

   ANATOMIA
     TEMAS[k] = {nome, cor, emoji}
     ITENS    = {id, tema, tipo, at, p, o, c, dica, ex, [quem]}
       tema   fontes | escola | olhar | mundo | profissoes | tempo
       tipo   rapida | conceito | leitura (leitura = situação mais longa)
       at     átomos do roteiro (F1…, S1…, I1…, M1…, P1…, B1…)
       p      pergunta curta (1–2 linhas no jogo)
       o      3 alternativas; c = 0 sempre (a UI embaralha)
       dica   empurrão antes de responder (nunca a resposta)
       ex     explicação curta depois de responder
       img    foto da aula (só no simulado/estudo; o jogo desenha)
   Regras do pedagogico: classificar fonte só com o OBJETO NOMEADO
   ("o objeto" × "a foto"); vídeo de relato = oral; estetoscópio,
   quadro de giz, biblioteca e bicicleta AINDA existem (sempre ancorar
   na história: "na história do Doutor João, antes…"); termômetro
   sempre "de mercúrio"; robô e fazenda no prédio = FUTURO; único
   "desapareceu" inequívoco = acendedor de lampião; pincel só junto
   de marreta e colher de pedreiro; sem séculos.
   ============================================================ */
window.HIS3 = (function(){

var TEMAS = {
  fontes:     {nome:'Fontes históricas',      cor:'#a855f7', emoji:'🔎'},
  escola:     {nome:'A escola tem história',  cor:'#0ea5e9', emoji:'🏫'},
  olhar:      {nome:'Cada um vê de um jeito', cor:'#f97316', emoji:'👀'},
  mundo:      {nome:'Pistas no mundo',        cor:'#eab308', emoji:'🌍'},
  profissoes: {nome:'Profissões no tempo',    cor:'#22c55e', emoji:'🧰'},
  tempo:      {nome:'Tempo e memória',        cor:'#ec4899', emoji:'⏰'}
};
/* as 4 cores fixas dos tipos de fonte (iguais em todos os produtos) */
var TIPOS = {
  oral:     {nome:'Oral',     cor:'#a855f7', frase:'alguém CONTA'},
  escrita:  {nome:'Escrita',  cor:'#3b82f6', frase:'alguém ESCREVEU'},
  visual:   {nome:'Visual',   cor:'#f97316', frase:'a gente VÊ uma imagem'},
  material: {nome:'Material', cor:'#22c55e', frase:'a gente TOCA um objeto'}
};

var ITENS = [];
var IMG={"f11": "carta", "f12": "chapeu", "f13": "album", "f14": "mapa", "f15": "livros", "f16": "entrevista", "f17": "sofa", "f18": "certidao", "f19": "quadros", "f20": "bonecas", "f21": "castelo", "f22": "roda"}; /* foto da aula (media/his3/fonte-*.jpg), com o objeto NOMEADO no enunciado */
function Q(tema,tipo,id,at,p,o,dica,ex,quem){ ITENS.push({id:id,tema:tema,tipo:tipo,at:at,p:p,o:o,c:0,dica:dica,ex:ex,quem:quem||'',img:IMG[id]?'media/his3/fonte-'+IMG[id]+'.jpg':''}); }
var OR='Fonte oral', ES='Fonte escrita', VI='Fonte visual', MA='Fonte material';
var DT='Pense: alguém CONTA? alguém ESCREVEU? a gente VÊ uma imagem? a gente TOCA um objeto?';

/* ================= FONTES (F) ================= */
Q('fontes','conceito','f01',['F1'],'O que são fontes históricas?',['Pistas do passado que a gente pode ver, ouvir, tocar ou ler','Só os livros de História da escola','Coisas que acabaram de ser inventadas'],'Detetive procura PISTAS.','Fontes históricas são pistas do passado: tudo o que a gente pode ver, ouvir, tocar ou ler para aprender sobre outras épocas.');
Q('fontes','conceito','f02',['F1'],'Para que servem as fontes históricas?',['Para aprender sobre outras épocas','Para enfeitar a sala','Para adivinhar o futuro'],'Elas contam o passado.','As fontes ajudam a aprender como as pessoas viviam em outras épocas.');
Q('fontes','rapida','f03',['F1'],'Complete: "Tudo ao nosso redor pode contar uma…"',['história','mentira','música'],'Tudo pode contar uma…','"Tudo ao nosso redor pode contar uma história." Até um objeto simples é uma pista.');
Q('fontes','conceito','f04',['F1'],'"Tudo o que produzimos deixa um rastro." Esses rastros são as…',['fontes históricas','pegadas de bicho','notas da prova'],'São as pistas do passado.','Tudo o que as pessoas fazem deixa rastros. Esses rastros são as fontes históricas.');
Q('fontes','conceito','f05',['F1'],'Qual destes pode ser uma fonte histórica?',['Uma carta antiga da bisavó','Uma nuvem passando no céu','O barulho da chuva de agora'],'Uma pista que guarda o passado.','A carta antiga guarda o passado: é uma fonte histórica.');
Q('fontes','conceito','f06',['F2'],'O que é uma fonte ORAL?',['Um relato ou história contada por uma pessoa','Um desenho numa parede','Um brinquedo antigo'],'Oral vem de boca, de falar.','Fonte oral é um relato ou história CONTADA por uma pessoa.');
Q('fontes','conceito','f07',['F3'],'O que é uma fonte ESCRITA?',['Um texto: carta, diário, jornal ou lei','Uma foto antiga','Uma música cantada'],'Escrita tem letras num papel.','Fonte escrita é um texto: diários, leis, jornais e cartas.');
Q('fontes','conceito','f08',['F4'],'O que é uma fonte VISUAL?',['Uma imagem: pintura, fotografia ou mapa','Um relato do vovô','Uma panela antiga'],'Visual é o que a gente VÊ como imagem.','Fonte visual é uma imagem: pinturas, fotografias e mapas.');
Q('fontes','conceito','f09',['F5'],'O que é uma fonte MATERIAL?',['Um objeto: brinquedo, roupa, construção ou utensílio','Uma entrevista gravada','Uma carta'],'Material é o que a gente TOCA.','Fonte material é um objeto: brinquedos, roupas, construções e utensílios.');
Q('fontes','rapida','f10',['F2','F6'],'A vovó CONTOU como era a escola dela. Que fonte é essa?',[OR,ES,VI],DT,'A vovó contou falando: é fonte oral.');
Q('fontes','rapida','f11',['F3','F6'],'Uma carta antiga escrita pelo bisavô. Que fonte é essa?',[ES,OR,MA],DT,'A carta tem um texto escrito: é fonte escrita.');
Q('fontes','rapida','f12',['F5','F6'],'Um chapéu antigo, o objeto. Que fonte é essa?',[MA,VI,ES],DT,'O chapéu é um objeto que a gente toca: fonte material.');
Q('fontes','rapida','f13',['F4','F6'],'As fotos do álbum da família. Que fonte é essa?',[VI,ES,OR],DT,'Foto é imagem: fonte visual.');
Q('fontes','rapida','f14',['F4','F6'],'Um mapa antigo. Que fonte é essa?',[VI,ES,OR],'O mapa é um desenho de um lugar.','Mapa é imagem, como pintura e fotografia: fonte visual.');
Q('fontes','rapida','f15',['F3','F6'],'O que está escrito num livro antigo. Que fonte é essa?',[ES,VI,OR],DT,'É texto escrito: fonte escrita.');
Q('fontes','rapida','f16',['F2','F6'],'Uma entrevista gravada em que uma moça conta a vida dela. Que fonte é essa?',[OR,ES,MA],'Mesmo gravada, a pessoa está CONTANDO.','Entrevista é alguém contando: fonte oral, mesmo gravada.');
Q('fontes','rapida','f17',['F5','F6'],'Um sofá antigo, o móvel. Que fonte é essa?',[MA,VI,ES],DT,'O sofá é um objeto: fonte material.');
Q('fontes','rapida','f18',['F3','F6'],'Uma certidão de nascimento. Que fonte é essa?',[ES,VI,OR],'É um documento com informações escritas.','Certidão é documento escrito: fonte escrita.');
Q('fontes','rapida','f19',['F4','F6'],'As fotos nos quadros da parede. Que fonte é essa?',[VI,ES,OR],'Olhe para as FOTOS.','As fotos são imagens: fonte visual.');
Q('fontes','rapida','f20',['F5','F6'],'Bonecas antigas, os brinquedos. Que fonte é essa?',[MA,ES,OR],'Brinquedo a gente toca.','Brinquedos antigos são objetos: fonte material.');
Q('fontes','rapida','f21',['F5','F6'],'Um castelo antigo, a construção. Que fonte é essa?',[MA,ES,OR],'Construções estão na lista da fonte material.','Construção é fonte material (a FOTO do castelo seria visual).');
Q('fontes','rapida','f22',['F2','F6'],'As cantigas de roda que a vovó ensinou cantando. Que fonte é essa?',[OR,ES,VI],'Passou de boca em boca.','Cantigas passadas cantando, pela fala, são fonte oral.');
Q('fontes','rapida','f23',['F3','F6'],'O diário da tia, com o que ela escrevia todo dia. Que fonte é essa?',[ES,OR,VI],DT,'Diário é texto escrito: fonte escrita.');
Q('fontes','rapida','f24',['F3','F6'],'Um jornal antigo. Que fonte é essa?',[ES,MA,OR],DT,'Jornal tem textos escritos: fonte escrita.');
Q('fontes','rapida','f25',['F4','F6'],'Uma pintura antiga num museu. Que fonte é essa?',[VI,ES,OR],DT,'Pintura é imagem: fonte visual.');
Q('fontes','rapida','f26',['F5','F6'],'Uma panela antiga da bisavó, o utensílio. Que fonte é essa?',[MA,VI,ES],'Utensílio é objeto de usar.','Utensílios são objetos: fonte material.');
Q('fontes','rapida','f27',['F2','F6'],'Um vídeo de um senhor contando como era a cidade. Que fonte é essa?',[OR,VI,ES],'Pegadinha: é vídeo, mas o senhor está CONTANDO.','Vídeo de alguém contando uma história é fonte oral.');
Q('fontes','rapida','f28',['F3','F6'],'Um bilhete escrito pela professora. Que fonte é essa?',[ES,OR,MA],DT,'Bilhete tem texto: fonte escrita.');
Q('fontes','rapida','f29',['F3','F6'],'Uma receita escrita no caderno da avó. Que fonte é essa?',[ES,OR,MA],'Está escrita no caderno.','Receita escrita é fonte escrita.');
Q('fontes','rapida','f30',['F5','F6'],'Um uniforme antigo da escola, a roupa. Que fonte é essa?',[MA,VI,ES],'Roupa está na lista da fonte material.','Roupas são objetos: fonte material.');
Q('fontes','rapida','f31',['F4','F6'],'Uma escultura antiga. Que fonte é essa?',[VI,OR,ES],'O material da escola põe escultura junto de foto e pintura.','No material, escultura é uma imagem que registra o passado: fonte visual.');
Q('fontes','rapida','f32',['F4','F5'],'A FOTO de uma boneca antiga é fonte…',['visual','material','oral'],'Pegadinha! É a foto, não a boneca.','A foto é imagem: visual. A boneca em si seria material.');
Q('fontes','rapida','f33',['F4','F5'],'A boneca antiga, o brinquedo de verdade, é fonte…',['material','visual','escrita'],'Agora é o objeto.','O brinquedo é objeto que se toca: material.');
Q('fontes','rapida','f34',['F2','F3'],'A vovó ESCREVEU uma carta contando a infância dela. A carta é fonte…',['escrita','oral','material'],'Ela escreveu, não falou.','A carta é texto escrito: fonte escrita.');
Q('fontes','rapida','f35',['F2','F3'],'A vovó FALOU sobre a infância dela, sentada no sofá. Isso é fonte…',['oral','escrita','visual'],'Ela falou.','Contar falando é fonte oral.');
Q('fontes','conceito','f36',['F3','F6'],'Quais destas são fontes ESCRITAS? — escolha o grupo certo',['Diário e carta','Foto e pintura','Boneca e chapéu'],'Procure o que tem texto.','Diário e carta têm texto: fontes escritas.');
Q('fontes','conceito','f37',['F5','F6'],'Quais destas são fontes MATERIAIS? — escolha o grupo certo',['Brinquedo antigo e roupa antiga','Jornal e lei','Mapa e fotografia'],'Objetos que a gente toca.','Brinquedos e roupas são objetos: fontes materiais.');
Q('fontes','conceito','f38',['F4','F6'],'Quais destas são fontes VISUAIS? — escolha o grupo certo',['Fotografia, pintura e mapa','Carta e diário','Panela e sofá'],'Imagens.','Fotografias, pinturas e mapas são imagens: fontes visuais.');
Q('fontes','conceito','f39',['F2','F6'],'Quais destas são fontes ORAIS? — escolha o grupo certo',['Relato do vovô e entrevista','Certidão e bilhete','Castelo e uniforme'],'Alguém contando.','Relatos e entrevistas são pessoas contando: fontes orais.');
Q('fontes','rapida','f40',['F2'],'Fonte oral passa de geração em geração por meio da…',['fala','fotografia','construção'],'"Fonte falada, história guardada."','As memórias orais passam de geração em geração pela fala.');
Q('fontes','conceito','f41',['F2'],'Para entender um relato, o detetive pergunta: quem contou? o que contou? e…',['De que época a pessoa se lembrava?','Qual é a cor do sofá?','Quanto custa a entrevista?'],'Pense no passado que a pessoa lembra.','Perguntas do relato: quem conta, o que contou, de que época se lembrava, o que aprendi.');
Q('fontes','conceito','f42',['F7'],'Uma roupa antiga pode nos ensinar…',['como as pessoas se vestiam antigamente','que amanhã vai chover','o nome do presidente de hoje'],'O que essa pista mostra do passado?','A roupa antiga mostra como as pessoas se vestiam.');
Q('fontes','conceito','f43',['F7'],'Um brinquedo antigo pode nos ensinar…',['como as crianças brincavam antigamente','como funciona um celular','a tabuada do 2'],'É pista de quê?','O brinquedo antigo mostra como as crianças brincavam.');
Q('fontes','conceito','f44',['F7'],'Uma carta antiga pode nos contar…',['notícias e sentimentos de quem escreveu','o que vai acontecer no futuro','como é a chuva de hoje'],'Leia o que está escrito.','A carta conta o que a pessoa vivia e sentia.');
Q('fontes','conceito','f45',['F8'],'Na ficha de observação, o detetive pergunta: esse objeto conta uma história do…',['passado','futuro','sonho'],'É uma pista do tempo que já passou.','A ficha pergunta se o objeto conta uma história do passado.');
Q('fontes','conceito','f46',['F8'],'Na ficha do objeto, o que ele pode fazer você lembrar? — escolha o grupo certo',['Uma pessoa da família, algo que já aconteceu ou um lugar','Só a tarefa de casa','Nada, objeto não lembra nada'],'Pense em quem, o quê e onde.','Um objeto pode lembrar uma pessoa da família, algo que já aconteceu ou um lugar.');
Q('fontes','conceito','f47',['F9'],'Uma boa legenda de fonte diz o que a imagem mostra, que tipo de fonte é e…',['o que ela pode contar sobre o passado','quanto ela custou','quem ganhou o jogo ontem'],'Legenda de detetive.','A legenda diz: o que mostra, que tipo de fonte é e o que conta do passado.');
Q('fontes','rapida','f48',['F9','F4'],'A foto de um trem a vapor antigo é fonte…',['visual','oral','escrita'],'É uma foto.','Foto é fonte visual. Ela mostra como eram os trens antigamente.');
Q('fontes','conceito','f49',['F9'],'A foto antiga de pessoas chegando de navio pode contar…',['como as pessoas viajavam antigamente','como se faz bolo','qual é o celular mais novo'],'Olhe o navio cheio de gente.','A foto mostra como as pessoas viajavam e chegavam de outros lugares.');
Q('fontes','conceito','f50',['F10'],'O que faz um detetive da história?',['Observa com atenção, pergunta e compara as pistas','Inventa o passado do jeito que quer','Joga fora as coisas velhas'],'Lupa na mão!','O detetive da história observa, pergunta e compara as fontes.');
Q('fontes','conceito','f51',['F11'],'Por que as fontes históricas são importantes?',['Porque preservam a memória das pessoas e dos povos','Porque são novinhas','Porque servem para a prova só'],'Sem pistas, o passado se perde.','As fontes preservam a memória, em todas as culturas.');
Q('fontes','conceito','f52',['F12'],'Para descobrir a história de uma foto antiga da família, o que perguntar? — escolha o grupo certo',['Quem aparece, onde e quando foi tirada, o que acontecia','Qual é o preço da moldura','Que dia é hoje'],'São as perguntas da atividade de casa.','Perguntas da foto: quem aparece, onde e quando foi tirada, o que acontecia e por que é importante.');
Q('fontes','conceito','f53',['F12'],'Por que uma foto antiga pode ser importante para uma família?',['Guarda a lembrança de um momento especial','Porque é nova','Porque é grande'],'Pense numa festa ou passeio guardado na foto.','A foto guarda lembranças de momentos especiais da família.');
Q('fontes','rapida','f54',['F3','F6'],'Uma lei antiga, escrita no papel. Que fonte é essa?',[ES,VI,MA],'Leis estão na lista da fonte escrita.','Leis são textos: fonte escrita.');
Q('fontes','rapida','f55',['F2','F6'],'Seu Francisco contou para a turma como entregava cartas a pé. Que fonte é essa?',[OR,ES,MA],'Ele CONTOU.','Relato falado é fonte oral.');
Q('fontes','rapida','f56',['F5','F6'],'A bolsa de couro do carteiro, o objeto. Que fonte é essa?',[MA,ES,OR],'Objeto que se toca.','A bolsa é objeto: fonte material.');

/* ================= A ESCOLA TEM HISTÓRIA (S) ================= */
Q('escola','conceito','s01',['S1'],'A escola onde a gente estuda tem história?',['Sim, cheia de acontecimentos, pessoas e mudanças','Não, escola não tem passado','Só se for um castelo'],'Tudo ao nosso redor conta uma história.','A escola tem uma história cheia de acontecimentos, pessoas e mudanças.');
Q('escola','conceito','s02',['S1'],'Quais destas são fontes históricas que podemos achar na escola? — escolha o grupo certo',['Fotos antigas de turmas, cadernos guardados e troféus','Nuvens do céu','O lanche de hoje'],'Pistas guardadas na escola.','Fotos de turmas, cadernos, uniformes, troféus, bilhetes e livros antigos contam a história da escola.');
Q('escola','rapida','s03',['S1','F5'],'Um troféu antigo da escola é fonte…',['material','oral','escrita'],'É um objeto.','O troféu é objeto: fonte material da escola.');
Q('escola','rapida','s04',['S1','F4'],'A foto antiga de uma turma é fonte…',['visual','escrita','material'],'É uma foto.','Foto de turma é fonte visual.');
Q('escola','rapida','s05',['S2','F3'],'Um boletim antigo é fonte…',['escrita','visual','oral'],'Tem notas e nomes escritos.','Boletim é documento escrito da vida escolar.');
Q('escola','conceito','s06',['S2'],'Quais destes são documentos da vida escolar? — escolha o grupo certo',['Caderno, boletim e bilhete','Bola e chuteira','Árvore e flor'],'Documentos escritos da escola.','Cadernos, boletins, bilhetes e registros de eventos são documentos da vida escolar.');
Q('escola','conceito','s07',['S2'],'O que os documentos guardados na escola mostram?',['Como era o ensino, as regras e o dia a dia da escola','O que vai cair na prova do ano que vem','Só o nome do diretor'],'Eles registram fatos e decisões.','Os documentos mostram como era o ensino, as regras, o que se aprendia e como era o dia a dia.');
Q('escola','conceito','s08',['S2'],'Os documentos da escola registram…',['fatos e decisões que aconteceram ali','sonhos de quem dormiu','o tempo de amanhã'],'Registro = o que aconteceu.','Documentos da escola registram fatos e decisões que aconteceram ali.');
Q('escola','conceito','s09',['S2','S5'],'Comparando cadernos antigos e novos, a gente descobre…',['como a escola mudou com o tempo','o nome do vizinho','a cor do céu'],'Comparar ajuda a ver mudanças.','Comparar documentos de tempos diferentes mostra como a escola mudou.');
Q('escola','conceito','s10',['S3'],'Por que é importante guardar documentos da escola?',['Para preservar memórias e contar a história da escola','Para ocupar espaço no armário','Porque ninguém pode ler'],'Guardar = não esquecer.','Guardar documentos preserva a memória e conta a história da escola e de cada estudante.');
Q('escola','conceito','s11',['S4'],'Na pesquisa com a família, você pergunta sobre um documento da época de escola deles e…',['para que esse documento servia','quantos anos você tem','qual é seu desenho favorito'],'A ficha perguntava a utilidade.','A pesquisa pergunta qual documento era importante e para que ele servia.');
Q('escola','conceito','s12',['S5'],'O que é uma MUDANÇA?',['Algo que era de um jeito e ficou diferente','Algo que continua igual','Algo que nunca existiu'],'Mudou = ficou diferente.','Mudança é o que ficou diferente com o tempo.');
Q('escola','conceito','s13',['S5'],'O que é uma PERMANÊNCIA?',['Algo que continuou igual com o passar do tempo','Algo que sumiu','Algo que vai acontecer amanhã'],'Permanecer = continuar.','Permanência é o que continuou igual.');
Q('escola','rapida','s14',['S5','P4'],'Na história da Dona Lúcia, antes era quadro de giz; hoje algumas escolas têm lousa digital. Isso é…',['uma mudança','uma permanência','uma fonte oral'],'Ficou diferente?','Do quadro de giz para a lousa digital: mudança.');
Q('escola','rapida','s15',['S5','P4'],'Dona Lúcia sempre conversou com os alunos e ouviu as ideias deles, antes e hoje. Isso é…',['uma permanência','uma mudança','uma profissão nova'],'Continuou igual?','Conversar e ouvir os alunos continuou igual: permanência.');
Q('escola','rapida','s16',['S5','P4'],'Antes os alunos pesquisavam na biblioteca; hoje também pesquisam na internet. O que apareceu de novo?',['A internet','A biblioteca','O livro'],'O que é novidade?','A internet é a novidade: uma mudança no jeito de pesquisar.');
Q('escola','conceito','s17',['S6'],'Um aluno, uma professora e um funcionário lembram da mesma escola. As memórias deles…',['podem ser diferentes','são sempre iguais','não contam nada'],'Cada um viveu a escola de um jeito.','Estudantes, professores e funcionários podem ter memórias diferentes da mesma escola.');
Q('escola','conceito','s18',['S7'],'O que objetos, documentos e festas têm a ver com História?',['Guardam lembranças e contam o passado','Nada, são só enfeites','Só servem para festa'],'Lembre do mapa de conclusão.','Objetos, documentos e festas guardam lembranças e contam o passado das pessoas e da escola.');
Q('escola','rapida','s19',['S1','F3'],'Um bilhete antigo deixado por um aluno é fonte…',['escrita','material','oral'],'Tem texto.','Bilhete é texto: fonte escrita.');
Q('escola','conceito','s20',['S1','F7'],'Um uniforme antigo da escola pode contar…',['como os alunos se vestiam antigamente','quem ganhou a eleição','como fazer bolo'],'É uma roupa.','O uniforme antigo mostra como os alunos se vestiam.');
Q('escola','conceito','s21',['S1','F7'],'Quais fontes da escola contam como os alunos se vestiam? — escolha o grupo certo',['O uniforme antigo e a foto antiga da turma','O boletim e o bilhete','A lei e o jornal'],'Roupa e imagem de gente.','O uniforme (material) e a foto da turma (visual) mostram as roupas.');

/* ================= CADA UM VÊ DE UM JEITO (I) ================= */
Q('olhar','conceito','i01',['I1'],'Duas crianças olham a mesma foto. Cada uma repara em coisas diferentes. Por quê?',['Cada pessoa observa de um jeito','Uma delas está errada','A foto mudou sozinha'],'Lembre do desafio de olhar a foto por 1 minuto.','Cada pessoa observa de um jeito e repara em detalhes diferentes.');
Q('olhar','conceito','i02',['I1'],'Olhando a mesma imagem uma segunda vez, a gente…',['percebe coisas novas','vê sempre exatamente o mesmo','esquece tudo'],'Na 2ª observação vocês anotaram mais 5 coisas.','Olhar de novo ajuda a perceber detalhes novos.');
Q('olhar','conceito','i03',['I2'],'Toda fonte histórica foi criada por alguém, em um tempo e lugar, com…',['um objetivo','um feitiço','um sorteio'],'Quem fez e POR QUÊ?','Toda fonte foi criada por alguém, num tempo e lugar, com um objetivo.');
Q('olhar','conceito','i04',['I2'],'Para investigar uma fonte, o detetive pergunta: quem produziu? para quem foi feita? e…',['Qual era o objetivo de quem criou?','Qual é a cor favorita?','Quando é o recreio?'],'São as 3 colunas da tabela.','Quem produziu, para quem foi feita e qual era o objetivo.');
Q('olhar','leitura','i05',['I2'],'Um cartão-postal de Salvador foi escrito por quem viajou para os amigos. Qual era o objetivo?',['Contar sobre a viagem e mandar um abraço','Vender leite','Ensinar matemática'],'Quem viaja manda notícias.','O cartão-postal servia para contar da viagem aos amigos.');
Q('olhar','leitura','i06',['I2'],'Um anúncio de jornal antigo dizia que na rua tal vendia-se leite. Qual era o objetivo do anúncio?',['Vender leite','Contar uma história de fadas','Mostrar um mapa'],'Anúncio serve para…','Anúncio e propaganda servem para VENDER.');
Q('olhar','leitura','i07',['I2'],'Uma propaganda antiga dizia que um alimento era bom para as crianças. Para que ela foi feita?',['Para vender o alimento às famílias','Para guardar uma receita da vovó','Para ensinar a ler'],'Propaganda quer que você compre.','A propaganda foi feita para vender o alimento.');
Q('olhar','conceito','i08',['I3','I5'],'Por que podem existir histórias diferentes a partir de um mesmo documento?',['Cada pessoa olha com sua experiência, imaginação e ponto de vista','Porque o documento é falso','Porque só uma pessoa pode olhar'],'É a pergunta essencial da sequência 3.','Cada pessoa interpreta com sua experiência e ponto de vista: surgem histórias diferentes.');
Q('olhar','conceito','i09',['I3'],'Quando não temos todas as informações de uma foto, nós fazemos…',['suposições, que nem sempre estão certas','certeza absoluta','a foto falar'],'Lembre da atividade "imaginando outras histórias".','Sem todas as informações, fazemos suposições, e nem sempre elas são corretas.');
Q('olhar','conceito','i10',['I3'],'Para chegar mais perto da verdade, o historiador…',['reúne várias fontes, compara e ouve diferentes versões','escolhe a história mais bonita','usa uma fonte só'],'Detetive não confia numa pista só.','O historiador reúne várias fontes, compara e ouve versões diferentes.');
Q('olhar','conceito','i11',['I3'],'A turma imaginou a história de uma foto. Depois, o dono contou a história verdadeira. Por que algumas ficaram diferentes?',['Cada um usou a imaginação para preencher o que não estava claro','Porque a foto era colorida','Porque o dono errou'],'Suposição × fato.','Cada pessoa preencheu as partes que faltavam com a imaginação.');
Q('olhar','conceito','i12',['I4'],'Todas as histórias do passado foram registradas?',['Não, algumas foram registradas e outras esquecidas','Sim, todas estão nos livros','Só as tristes'],'Lembre: histórias escondidas.','Algumas histórias são registradas e outras acabam esquecidas.');
Q('olhar','conceito','i13',['I5'],'Numa história em quadrinhos com dois pontos de vista sobre a mesma pintura, cada personagem…',['tem sua própria fala e pensamento','diz exatamente a mesma coisa','fica calado'],'Pontos de vista diferentes.','Cada personagem tem sua fala e seu jeito de explicar a mesma cena.');
Q('olhar','conceito','i14',['I5'],'Quando um colega interpreta uma fonte de outro jeito, devemos…',['respeitar a opinião dele','rir dele','apagar a resposta dele'],'Valorizar todas as interpretações.','Devemos respeitar as opiniões e valorizar todas as interpretações.');
Q('olhar','conceito','i15',['I3'],'A história é feita de…',['muitos pontos de vista','uma única versão','só datas'],'Várias narrativas.','A história é feita de múltiplas narrativas e pontos de vista.');

/* ================= PISTAS NO MUNDO (M) ================= */
Q('mundo','conceito','m01',['M1'],'"A história começa em nós." O que cada família carrega?',['Tradições que formam o que somos hoje','Só documentos de carro','Nada do passado'],'Ancestralidade.','Cada família carrega tradições que formam o que somos hoje.');
Q('mundo','conceito','m02',['M1'],'Um objeto que está na família há muito tempo pode contar…',['a história da família','o futuro','a previsão do tempo'],'Pergunte em casa!','Objetos e histórias antigas da família contam a história dela.');
Q('mundo','conceito','m03',['M2'],'O que eram os NÔMADES?',['Pessoas que viajavam em busca de comida','Pessoas que moravam em prédios','Pessoas que dirigiam carros'],'Não tinham casa fixa.','Por milhares de anos os seres humanos foram nômades: viajavam em busca de comida.');
Q('mundo','conceito','m04',['M2'],'O que mudou tudo para os seres humanos nômades?',['Aprender a cultivar a terra (agricultura)','Inventar o celular','Construir shoppings'],'Plantar!','Com a agricultura, as pessoas pararam de viajar e fizeram acampamentos fixos.');
Q('mundo','conceito','m05',['M2'],'Os acampamentos fixos, que surgiram com a agricultura, deram origem…',['às cidades','aos dinossauros','aos rios'],'Ficaram num lugar só…','Os acampamentos fixos deram origem às primeiras cidades.');
Q('mundo','rapida','m06',['M3'],'Qual rio é do Egito?',['Rio Nilo','Rio Amarelo','Rio Tigre'],'Pense no rio mais famoso da África.','O Rio Nilo fica no Egito.');
Q('mundo','rapida','m07',['M3'],'Os rios Tigre e Eufrates ficam na…',['Mesopotâmia','China','Egito'],'Mesopotâmia quer dizer "entre rios".','Tigre e Eufrates: Mesopotâmia.');
Q('mundo','rapida','m08',['M3'],'O Rio Amarelo fica na…',['China','Mesopotâmia','Egito'],'O nome do rio é uma cor.','O Rio Amarelo fica na China.');
Q('mundo','conceito','m09',['M3'],'Por que as cidades mais antigas cresceram perto dos rios?',['Sem os rios a vida não seria possível ali','Porque gostavam de barulho de água','Porque era proibido morar longe'],'Água para beber e plantar.','As cidades cresceram "abraçadas" aos rios: sem eles a vida não seria possível.');
Q('mundo','conceito','m10',['M4'],'O que é patrimônio?',['Tudo o que é importante para a memória de um povo','Só dinheiro guardado','Um brinquedo novo'],'Tesouros que o tempo não apaga.','Patrimônio é tudo o que consideramos importante para a memória de um povo.');
Q('mundo','rapida','m11',['M4'],'Uma estátua numa praça é patrimônio…',['material','imaterial','escrito'],'Dá para tocar.','Museus, praças e estátuas são patrimônio material.');
Q('mundo','rapida','m12',['M4'],'A capoeira é patrimônio…',['imaterial','material','visual'],'Não é um objeto: é algo que se faz.','Capoeira, festas juninas e receitas de família são patrimônio imaterial.');
Q('mundo','rapida','m13',['M4'],'A festa junina é patrimônio…',['imaterial','material','escrito'],'É uma festa, um costume.','Festa junina é patrimônio imaterial.');
Q('mundo','rapida','m14',['M4'],'Um museu é patrimônio…',['material','imaterial','oral'],'É um prédio.','Museus são patrimônio material.');
Q('mundo','conceito','m15',['M4'],'Quais são patrimônio IMATERIAL? — escolha o grupo certo',['Capoeira, festa junina e receitas de família','Museu, praça e estátua','Sofá, chapéu e boneca'],'Costumes e saberes.','Capoeira, festas juninas e receitas de família: patrimônio imaterial.');
Q('mundo','conceito','m16',['M5'],'O que você faz hoje (desenhos, textos, escolhas) será…',['a fonte histórica de amanhã','lixo sem importância','apagado para sempre'],'O protagonista da história é você!','O que você faz hoje se tornará fonte histórica de amanhã.');
Q('mundo','conceito','m17',['M5'],'Complete: "Para entender para onde vamos, precisamos descobrir de onde…"',['viemos','corremos','dormimos'],'Último slide da unidade.','"Para entender para onde vamos, precisamos descobrir de onde viemos."');

/* ================= PROFISSÕES NO TEMPO (P) ================= */
Q('profissoes','conceito','p01',['P1'],'Por que muitas profissões mudaram com o tempo?',['Surgiram novas máquinas, tecnologias e formas de se comunicar','Porque as pessoas ficaram com preguiça','Porque mudou a cor do céu'],'Pense na tecnologia.','Novas máquinas, tecnologias e jeitos de se comunicar mudaram o trabalho.');
Q('profissoes','conceito','p02',['P1'],'Com as novas tecnologias, as pessoas passaram a trabalhar…',['mais rápido ou com mais conforto','sempre mais devagar','sem fazer nada'],'Diz o texto das transformações.','As pessoas passaram a trabalhar de um jeito diferente, mais rápido ou com mais conforto.');
Q('profissoes','conceito','p03',['P1'],'Uma profissão pode continuar existindo, mas com o jeito de trabalhar…',['diferente','sempre igual','proibido'],'Pense no carteiro.','Algumas profissões continuam existindo, mas o jeito de trabalhar mudou.');
Q('profissoes','conceito','p04',['P2'],'O que fazia o acendedor de lampião?',['Acendia os postes das ruas um a um','Entregava pizzas','Consertava celulares'],'Lampião = luz da rua antiga.','Ele caminhava pelas ruas acendendo os postes um a um.');
Q('profissoes','conceito','p05',['P2'],'Por que o acendedor de lampião deixou de existir?',['Chegou a energia elétrica','Os postes ficaram com medo','As ruas sumiram'],'O que acende as luzes hoje?','Com a energia elétrica, esse trabalho deixou de ser necessário.');
Q('profissoes','rapida','p06',['P2'],'Qual destas profissões DESAPARECEU?',['Acendedor de lampião','Carteiro','Professora'],'Uma delas ninguém faz mais.','O acendedor de lampião desapareceu. Carteiro e professora mudaram, mas continuam.');
Q('profissoes','conceito','p07',['P2'],'Algumas profissões deixaram de existir porque…',['novas tecnologias passaram a fazer o que pessoas faziam','as pessoas cansaram de ter nomes','choveu muito'],'Máquinas e tecnologias.','Novas tecnologias passaram a fazer coisas que antes eram feitas por pessoas.');
Q('profissoes','conceito','p08',['P3'],'No começo, como Seu Francisco entregava as cartas?',['A pé, com uma bolsa de couro no ombro','De drone','De avião'],'Ele era bem jovem.','Ele entregava cartas a pé, com uma grande bolsa de couro.','francisco');
Q('profissoes','conceito','p09',['P3'],'Depois de andar a pé, Seu Francisco ganhou… para entregar mais rápido.',['uma bicicleta','um foguete','um navio'],'Duas rodas e pedal.','Ele ganhou uma bicicleta para fazer as entregas mais rápido.','francisco');
Q('profissoes','conceito','p10',['P3'],'Com as motos, o que melhorou para o carteiro?',['Chegar a lugares mais distantes e levar mais encomendas','Ficar parado em casa','Não entregar nada'],'Motor é mais rápido.','As motos levaram os carteiros mais longe, com mais encomendas.','francisco');
Q('profissoes','leitura','p11',['P3'],'Ponha em ordem o jeito de entregar do Seu Francisco:',['a pé → bicicleta → moto → aparelho com tela','moto → a pé → bicicleta → aparelho com tela','aparelho com tela → moto → bicicleta → a pé'],'Do mais antigo ao mais novo.','A pé, depois bicicleta, depois moto; hoje os carteiros registram tudo num aparelho com tela.','francisco');
Q('profissoes','conceito','p12',['P3'],'As cartas diminuíram. O que o carteiro passou a entregar também?',['Contas, revistas e caixas de compras pela internet','Só flores','Nada'],'Compras feitas pela internet!','Ele passou a entregar contas, revistas e pequenas caixas de compras pela internet.','francisco');
Q('profissoes','conceito','p13',['P3'],'Hoje os carteiros usam… para registrar as entregas.',['aparelhos com tela','penas e tinteiros','sinais de fumaça'],'Tecnologia de hoje.','Hoje os carteiros usam aparelhos com tela para registrar as entregas.','francisco');
Q('profissoes','rapida','p14',['P3','P1'],'A profissão de carteiro…',['continua existindo, de um jeito diferente','desapareceu','nunca existiu'],'Seu Francisco se orgulha dela.','O carteiro continua existindo, mas de um jeito diferente.','francisco');
Q('profissoes','conceito','p15',['P10'],'Como as pessoas mandavam mensagens antes do celular?',['Cartas escritas à mão, levadas pelo carteiro','Por mensagem de voz','Por vídeo-chamada'],'Papel, envelope, selo.','Antes do celular, as pessoas mandavam cartas escritas à mão.');
Q('profissoes','conceito','p16',['P10'],'Hoje, com celular e computador, as mensagens chegam…',['em segundos','em meses','nunca'],'Rapidinho!','Hoje muitas pessoas mandam mensagens em segundos.');
Q('profissoes','conceito','p17',['P4'],'Quando era criança, como Dona Lúcia brincava?',['De dar aula para as bonecas, com uma lousinha de papelão','De pilotar avião','De médica'],'Ela sempre quis ser professora.','Ela brincava de dar aula para as bonecas numa lousinha de papelão.','lucia');
Q('profissoes','conceito','p18',['P4'],'Na escola de antigamente da Dona Lúcia, como era?',['Quadro de giz, livros pesados e tudo escrito à mão','Tablets e lousa digital','Aulas por vídeo'],'Não existia computador na sala.','Antes: quadro de giz, livros grandes e pesados, cadernos grossos e tudo escrito à mão.','lucia');
Q('profissoes','conceito','p19',['P4'],'O que Dona Lúcia usa hoje nas aulas?',['Computador e vídeos para a turma','Só uma lousinha de papelão','Pombo-correio'],'Tecnologia na sala.','Hoje ela usa computador e mostra vídeos para a turma.','lucia');
Q('profissoes','conceito','p20',['P4'],'Antigamente, para pesquisar, os alunos da Dona Lúcia…',['iam à biblioteca ou traziam um livro de casa','usavam a internet','perguntavam ao celular'],'Não existia internet na escola dela.','Antes pesquisavam na biblioteca ou em livros de casa.','lucia');
Q('profissoes','conceito','p21',['P4'],'O que NÃO mudou no trabalho da Dona Lúcia?',['Conversar com os alunos e ajudá-los a aprender com alegria','O quadro de giz','Escrever tudo à mão'],'O que ela mais ama.','Continuou igual: conversar com os alunos, ouvir suas ideias e ajudá-los a aprender com alegria.','lucia');
Q('profissoes','conceito','p22',['P5'],'Quando Seu Pedro era pequeno, como era o trabalho na fazenda?',['Feito com as mãos e com ajuda dos animais','Feito por robôs','Feito pelo celular'],'Bois puxavam o arado.','Antes, tudo era feito com as mãos e com a ajuda dos animais.','pedro');
Q('profissoes','rapida','p23',['P5'],'Para arar a terra, antigamente, Seu Pedro usava…',['um arado puxado por bois','um drone','um computador'],'Animais fortes ajudavam.','Ele usava um arado puxado por bois.','pedro');
Q('profissoes','conceito','p24',['P5'],'Que máquinas chegaram à fazenda e fizeram o trabalho mais rápido?',['Os tratores','As máquinas de escrever','Os lampiões'],'Máquina grande do campo.','Vieram os tratores, que fazem o trabalho mais rápido e com menos cansaço.','pedro');
Q('profissoes','conceito','p25',['P5'],'Hoje Seu Pedro usa o celular para…',['saber se vai chover e cuidar da plantação a distância','arar a terra com bois','escrever cartas'],'Tecnologia no campo.','Ele usa o celular para saber se vai chover e cuidar da plantação a distância.','pedro');
Q('profissoes','conceito','p26',['P5'],'Na história do Seu Pedro, o fazendeiro do FUTURO poderá…',['cultivar em cima de prédios ou com ajuda de robôs','usar só as mãos','parar de plantar'],'Futuro, não hoje!','O fazendeiro do futuro pode cultivar em cima de prédios ou com robôs.','pedro');
Q('profissoes','conceito','p27',['P5'],'O que continuou igual para o Seu Pedro?',['Amar a terra, cuidar da natureza e produzir alimentos saudáveis','O arado puxado por bois','Colher tudo com as mãos'],'O mais importante.','Continuou: amar a terra, cuidar da natureza e produzir alimentos saudáveis.','pedro');
Q('profissoes','conceito','p28',['P6'],'No começo da carreira, o Doutor João usava…',['estetoscópio, termômetro de mercúrio, papel e caneta','robôs e computador','exames pelo celular'],'Consultório simples.','No começo: estetoscópio, termômetro de mercúrio, papel e caneta.','joao');
Q('profissoes','conceito','p29',['P6'],'Na época em que o Doutor João começou, os exames…',['demoravam dias para ficar prontos','chegavam no celular','eram feitos por robôs'],'Era bem mais lento.','Os exames demoravam dias para ficar prontos.','joao');
Q('profissoes','conceito','p30',['P6'],'Onde ficavam as fichas dos pacientes, antigamente?',['Em grandes arquivos de papel','No computador','Na nuvem'],'Muito papel!','As fichas ficavam guardadas em grandes arquivos de papel.','joao');
Q('profissoes','conceito','p31',['P6'],'O que o Doutor João tem hoje? — escolha o grupo certo',['Computador, exames pelo celular e consultas por vídeo','Só papel e caneta','Arado e bois'],'Tecnologia na medicina.','Hoje: computador, exames pelo celular, consulta por vídeo e máquinas que mostram dentro do corpo.','joao');
Q('profissoes','conceito','p32',['P6'],'O que continua sendo a parte mais importante do trabalho do Doutor João?',['O cuidado e a atenção com cada paciente','O termômetro de mercúrio','Os arquivos de papel'],'Mesmo com tanta tecnologia…','O cuidado e a atenção com cada paciente não mudaram.','joao');
Q('profissoes','rapida','p33',['P7'],'Maleta, seringa antiga e termômetro de mercúrio são ferramentas de qual profissão?',['Médico','Pedreiro','Fotógrafo'],'Quem cuida da saúde?','São ferramentas do médico.');
Q('profissoes','rapida','p34',['P7'],'A câmera antiga de tripé era ferramenta de qual profissão?',['Fotógrafo','Professora','Médico'],'Tirava fotos.','Era a ferramenta do fotógrafo antigamente.');
Q('profissoes','rapida','p35',['P7'],'Lousa, livros e globo são ferramentas de qual profissão?',['Professora','Fotógrafo','Fazendeiro'],'Quem ensina?','São ferramentas da professora.');
Q('profissoes','rapida','p36',['P7'],'Marreta, colher de pedreiro e pincel são ferramentas de qual profissão?',['Construtor (pedreiro)','Médico','Carteiro'],'Quem constrói casas?','São ferramentas do construtor.');
Q('profissoes','conceito','p37',['P7'],'No jogo das cartas, cada profissão tinha…',['mais de uma ferramenta','só uma ferramenta','nenhuma ferramenta'],'Fique atento à regra do jogo.','Para cada profissão há mais de uma ferramenta.');
Q('profissoes','conceito','p38',['P8'],'Na entrega, antes havia carrinho de mão; hoje existe até…',['drone','arado','lampião'],'Voa!','Hoje existem entregas por drone.');
Q('profissoes','conceito','p39',['P8'],'Na agricultura, antes boi e arado; hoje…',['máquinas no campo','acendedor de lampião','carta à mão'],'Trator e máquina.','Hoje máquinas trabalham no campo.');
Q('profissoes','conceito','p40',['P8'],'Na medicina, uma novidade de hoje mostrada na aula é…',['o robô que ajuda na cirurgia','o termômetro de mercúrio','a ficha de papel'],'Máquina moderna.','Hoje existem robôs que ajudam nas cirurgias.');
Q('profissoes','conceito','p41',['P8'],'Na engenharia, antes desenhos de engrenagens no papel; hoje…',['engenheiros com robôs e computador','só régua de madeira','bois puxando'],'Tecnologia.','Hoje engenheiros trabalham com robôs e computadores.');
Q('profissoes','conceito','p42',['P9'],'Qual destas é uma profissão NOVA, criada pela tecnologia?',['Desenvolvedor de aplicativos','Acendedor de lampião','Nenhuma: todas são antigas'],'Aplicativo é coisa de celular.','Desenvolvedor de aplicativos é profissão nova, criada pela tecnologia.');
Q('profissoes','conceito','p43',['P9'],'Quais são profissões novas que a tecnologia criou? — escolha o grupo certo',['Designer gráfico e cientista de dados','Acendedor de lampião','Nenhuma'],'Computador e internet.','Designer gráfico, desenvolvedor de aplicativos e cientista de dados são profissões novas.');
Q('profissoes','conceito','p44',['P9'],'Numa entrevista com um profissional, o que podemos perguntar? — escolha o grupo certo',['Ferramentas, local de trabalho e o que a tecnologia mudou','A senha do celular dele','Nada'],'Lembre do quadro da visita.','Perguntas: profissão, ferramentas, local de trabalho, como trabalha e avanços tecnológicos.');
Q('profissoes','conceito','p45',['P14','P9'],'Todas as profissões de hoje já existiam no tempo dos nossos avós?',['Não, algumas são novas','Sim, todas','Os avós não trabalhavam'],'Desenvolvedor de aplicativos existia?','Não: algumas profissões, como desenvolvedor de aplicativos, são novas.');
Q('profissoes','conceito','p46',['P11'],'O que pode influenciar o trabalho que uma pessoa faz?',['O lugar onde vive, a família e as condições de vida','A cor do tênis','O signo'],'Diz a introdução da unidade.','O lugar onde a pessoa vive, a família e as condições de vida influenciam o trabalho.');
Q('profissoes','conceito','p47',['P11'],'Existem trabalhos que passam despercebidos. Eles são…',['muito importantes também','inúteis','proibidos'],'Todo trabalho conta.','Muitos trabalhos passam despercebidos, mas são muito importantes.');
Q('profissoes','conceito','p48',['P12'],'Sobre trabalho e meio ambiente, é certo dizer:',['Alguns trabalhos ajudam a natureza e outros podem causar problemas','Nenhum trabalho mexe com a natureza','Todo trabalho destrói a natureza'],'Existem os dois tipos.','Alguns trabalhos ajudam o meio ambiente; outros causam problemas e precisam mudar.');
Q('profissoes','conceito','p49',['P12'],'Existe trabalho que cuida da natureza?',['Sim','Não','Só nos contos de fadas'],'Pense em quem protege florestas.','Sim, existem trabalhos que cuidam da natureza.');
Q('profissoes','conceito','p50',['P13'],'Onde as pessoas trabalham? — escolha o grupo certo',['Na escola, em casa, nas ruas, nas fazendas e nos hospitais','Só em escritórios','Só na escola'],'O trabalho está em todo lugar.','O trabalho está em muitos lugares: escola, casa, ruas, fazendas, hospitais.');
Q('profissoes','rapida','p51',['P1','P3'],'Seu Francisco passou da bicicleta para a moto. Isso é…',['uma mudança','uma permanência','uma profissão nova'],'Ficou diferente.','Trocar a bicicleta pela moto é uma mudança.','francisco');
Q('profissoes','rapida','p52',['P1','P6'],'Doutor João sempre escutou com atenção os pacientes, antes e hoje. Isso é…',['uma permanência','uma mudança','uma fonte escrita'],'Continuou?','Escutar com atenção continuou: permanência.','joao');
Q('profissoes','rapida','p53',['P1','P5'],'Na fazenda do Seu Pedro, o arado puxado por bois deu lugar aos tratores. Isso é…',['uma mudança','uma permanência','um patrimônio'],'Ficou diferente.','Dos bois para o trator: mudança.','pedro');
Q('profissoes','conceito','p54',['P1'],'Como trabalhava um fotógrafo antigamente?',['Com uma câmera grande, de tripé','Com o celular','Com um drone'],'Lembre da carta do fotógrafo.','O fotógrafo antigo usava uma câmera grande de tripé.');

/* ================= TEMPO E MEMÓRIA (B) ================= */
Q('tempo','conceito','b01',['B1'],'O relógio marca o tempo…',['igual para todas as pessoas','mais rápido para as crianças','só de dia'],'Segundos, minutos e horas.','O relógio marca o tempo da mesma forma para todos.');
Q('tempo','conceito','b02',['B1'],'Brincando com os amigos, o tempo parece passar…',['rápido','devagar','para trás'],'Quando é divertido…','Quando é divertido, sentimos o tempo passar rápido.');
Q('tempo','conceito','b03',['B1'],'Esperando numa fila, o tempo parece passar…',['devagar','rápido','para trás'],'Esperar cansa.','Na espera, sentimos o tempo passar devagar.');
Q('tempo','conceito','b04',['B1'],'Mesmo com o relógio marcando o mesmo tempo, cada pessoa pode…',['sentir o tempo de um jeito diferente','parar o relógio','voltar no tempo'],'Tempo que sentimos.','Cada pessoa pode sentir o tempo de forma diferente.');
Q('tempo','rapida','b05',['B2'],'Qual destes é um instrumento de medir o tempo?',['Ampulheta','Lupa','Arado'],'Tem areia caindo.','A ampulheta mede o tempo com areia.');
Q('tempo','conceito','b06',['B2'],'Quais medem o tempo? — escolha o grupo certo',['Relógio de sol, ampulheta e calendário','Estetoscópio e termômetro','Marreta e pincel'],'Instrumentos da unidade 1.','Relógio de sol, ampulheta, relógio de água, cuco, ponteiros, calendário, digital e celular medem o tempo.');
Q('tempo','conceito','b07',['B3'],'Como a natureza mostra o tempo passando? — escolha o grupo certo',['Dia e noite e as estações do ano','O barulho do carro','A cor da camiseta'],'A árvore muda nas estações.','Dia e noite, as estações do ano e o crescimento mostram o tempo passando.');
Q('tempo','conceito','b08',['B4'],'Em "A árvore generosa", o menino cresceu. O que isso mostra?',['Que o tempo passou','Que a árvore era mágica','Que era um sonho'],'Menino → rapaz → homem → velho.','O menino cresceu e envelheceu: o tempo passou.');
Q('tempo','leitura','b09',['B5'],'Na linha do tempo dos registros do material, qual veio por ÚLTIMO?',['Redes sociais','Diário','Álbum de fotos'],'O mais novo, do nosso tempo.','Ordem do material: jornal, carta, diário, álbum de fotos, foto digital, redes sociais.');
Q('tempo','leitura','b10',['B5'],'Qual registro é do tempo de quando papai e mamãe eram crianças?',['Foto digital','Redes sociais','Jornal'],'Câmera digital.','A foto digital apareceu quando nossos pais eram crianças.');
Q('tempo','conceito','b11',['B6'],'A certidão de nascimento é um documento que…',['registra a nossa história','serve para jogar bola','mede o tempo'],'Documento pessoal.','Documentos pessoais registram a nossa história.');
Q('tempo','conceito','b12',['B7'],'O que fazem os museus e arquivos?',['Guardam memórias para as futuras gerações','Vendem brinquedos novos','Apagam o passado'],'Guardar memórias.','Museus e arquivos guardam memórias para as futuras gerações.');
Q('tempo','conceito','b13',['B7'],'As festas da família ajudam a…',['guardar lembranças e tradições','esquecer o passado','medir o tempo'],'Memória que celebramos.','Festas e seus objetos guardam lembranças e tradições.');

/* ===== TRILHA DA LINHA DO TEMPO (fase 8): a resposta É o objeto que a criança ganha ===== */
Q('tempo','conceito','t01',['B5'],'Na linha do tempo dos registros do material, qual é um dos PRIMEIROS?',['O jornal','As redes sociais','A foto digital'],'O mais antigo da lista.','O jornal é um dos primeiros registros. Ordem: jornal, carta, diário, álbum, foto digital, redes sociais.');
Q('tempo','conceito','t02',['B5'],'Na linha do tempo dos registros, o que vem depois do JORNAL?',['A carta','As redes sociais','A foto digital'],'Escrita à mão, dentro de um envelope.','Depois do jornal vem a carta.');
Q('tempo','conceito','t03',['B5'],'Na linha do tempo dos registros, o que vem depois da CARTA?',['O diário','A foto digital','As redes sociais'],'Alguém escrevia nele todo dia.','Depois da carta vem o diário.');
Q('tempo','conceito','t04',['B5'],'Na linha do tempo dos registros, o que vem depois do DIÁRIO?',['O álbum de fotos','O jornal','A carta'],'Fotos coladas nas páginas.','Depois do diário vem o álbum de fotos, do tempo dos bisavós e avós.');
Q('tempo','conceito','t05',['B7','F11'],'Quem guarda as fontes históricas para as futuras gerações?',['Os museus e os arquivos','As traças','Ninguém'],'Lugares onde as pistas ficam protegidas.','Museus e arquivos guardam memórias para as futuras gerações.');
Q('tempo','conceito','t06',['F11'],'Por que é importante cuidar e consertar as fontes antigas?',['Para preservar a memória','Para jogar fora depois','Para ficarem novas'],'Sem pistas, o passado se perde.','Cuidar das fontes preserva a memória das pessoas e dos povos.');

function embaralha(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i];a[i]=a[j];a[j]=t; } return a; }

return {TEMAS:TEMAS, TIPOS:TIPOS, ITENS:ITENS, embaralha:embaralha,
  doTema:function(k){ return ITENS.filter(function(i){ return i.tema===k; }); },
  sorteia:function(temas,n,tipo){
    if(typeof temas==='string') temas=[temas];
    var pool=ITENS.filter(function(i){ return temas.indexOf(i.tema)>=0 && (!tipo||i.tipo===tipo); });
    return embaralha(pool).slice(0,n);
  }};
})();
