/* ============================================================
   HIS3_banco_prova.js — questões no FORMATO das avaliações da escola
   (certo/errado, comparar imagens, ler e responder, dois tipos de fonte,
   resposta completa). Só o SIMULADO usa (o jogo e o treininho seguem com
   HIS3_banco.js). Conteúdo: trabalho/3tri_historia/_roteiro.md.
   o[0] é a certa (a tela embaralha). fotos = par antes/hoje; img = foto;
   texto = linhas de leitura; grupo = só uma por rodada.
   ============================================================ */
window.HIS3_PROVA=(function(){
'use strict';
var I=[];
function Q(tema,id,at,p,o,dica,ex,mais){ I.push(Object.assign({id:id,tema:tema,tipo:'prova',at:at,p:p,o:o,c:0,dica:dica,ex:ex},mais||{})); }
function CE(tema,id,at,frase,certo,dica,ex,mais){ Q(tema,id,at,'Certo ou errado? “'+frase+'”',certo?['Certo','Errado']:['Errado','Certo'],dica,ex,mais); }
var TIPOS4='Pense: alguém CONTA? alguém ESCREVEU? a gente VÊ uma imagem? a gente TOCA um objeto?';
var F=function(k){ return {fotos:['media/his3/'+k+'-antes.jpg','media/his3/'+k+'-hoje.jpg'],grupo:k}; };

/* ---- certo ou errado: fontes, escola, pontos de vista ---- */
CE('fontes','v01',['F1'],'Um objeto da nossa casa pode ser uma fonte histórica.',true,'Lembre: tudo ao nosso redor pode contar uma história.','Tudo ao nosso redor pode contar uma história. Um objeto da casa também pode ser pista do passado.');
CE('fontes','v02',['F2'],'O relato de uma avó sobre a infância dela é uma fonte histórica.',true,'Alguém conta o que viveu.','O relato contado é fonte histórica oral.');
CE('fontes','v03',['F4','F3'],'Uma fotografia antiga é uma fonte escrita.',false,TIPOS4,'A fotografia é uma imagem: fonte visual.');
CE('fontes','v04',['F2'],'As cantigas que a avó ensinou cantando são uma fonte oral.',true,TIPOS4,'As cantigas passam de uma pessoa para outra pela fala: fonte oral.');
CE('fontes','v05',['F11'],'As fontes históricas ajudam a preservar a memória das pessoas.',true,'Pense no que acontece quando as pistas do passado se perdem.','As fontes históricas preservam a memória das pessoas e dos povos.');
CE('fontes','v06',['F5','F7'],'Uma roupa antiga pode mostrar como as pessoas se vestiam.',true,'O que uma roupa conta?','A roupa é fonte material e mostra como as pessoas se vestiam em outra época.');
CE('escola','v07',['S2'],'Cadernos e boletins antigos mostram como era o ensino.',true,'São documentos da vida escolar.','Os documentos da vida escolar mostram o ensino, as regras e o dia a dia da escola.');
CE('escola','v08',['S5'],'Permanência é aquilo que mudou com o tempo.',false,'Permanecer é continuar.','Permanência é o que continuou igual. O que ficou diferente é mudança.');
CE('escola','v09',['S6'],'Estudantes e professores podem ter memórias diferentes da mesma escola.',true,'Cada um viveu a escola do seu jeito.','Cada pessoa viveu a escola do seu jeito, por isso as memórias podem ser diferentes.');
CE('escola','v10',['S1','F7'],'Um uniforme antigo mostra quais lições os alunos copiavam do quadro.',false,'O que uma roupa conta?','O uniforme mostra como os alunos se vestiam. As lições aparecem nos cadernos.');
CE('olhar','v11',['I5'],'Duas pessoas podem contar histórias diferentes sobre a mesma foto.',true,'Cada pessoa olha de um jeito.','Cada pessoa olha com a sua experiência e o seu ponto de vista.');
CE('olhar','v12',['I3'],'Uma suposição sobre uma foto está sempre certa.',false,'Suposição é o que a gente imagina.','A suposição nem sempre está certa. O historiador compara várias fontes.');

/* ---- certo ou errado com imagens de antes e hoje ---- */
CE('profissoes','v13',['P8'],'As imagens mostram que o jeito de entregar mudou.',true,'Compare o carrinho e o drone.','Antes, o carrinho de mão; hoje existe até entrega com drone.',F('entrega'));
CE('profissoes','v14',['P8'],'As duas imagens mostram a mesma ferramenta de entrega.',false,'Compare o que leva as caixas em cada imagem.','Na primeira imagem há um carrinho de mão; na segunda, um drone.',F('entrega'));
CE('profissoes','v15',['P8','P6'],'A tecnologia trouxe novos equipamentos para a cirurgia.',true,'O que aparece na imagem de hoje?','Hoje há até robô que ajuda na cirurgia.',F('cirurgia'));
CE('profissoes','v16',['P6'],'Com os novos equipamentos, o cuidado com o paciente deixou de ser importante para o médico.',false,'Lembre da história do Doutor João.','O cuidado e a atenção com cada paciente continuam sendo a parte mais importante.',F('cirurgia'));
CE('profissoes','v17',['P5','P8'],'Na imagem de antes, os animais ajudam no trabalho do campo.',true,'Olhe os dois animais da imagem.','Antes, os bois ajudavam a arar a terra.',F('campo'));
CE('profissoes','v18',['P1','P5'],'As máquinas deixaram o trabalho do campo mais lento.',false,'O que as novas máquinas trouxeram?','Com as novas máquinas, o trabalho ficou mais rápido.',F('campo'));
CE('profissoes','v19',['P8'],'Na engenharia, a tecnologia trouxe o computador e o robô.',true,'Olhe a imagem de hoje.','Antes, desenhos no papel; hoje, também computador e robô.',F('engenharia'));
CE('profissoes','v20',['P2'],'O acendedor de lampião deixou de existir com a chegada da energia elétrica.',true,'O que acende os postes hoje?','A energia elétrica passou a acender os postes.');
CE('profissoes','v21',['P3'],'A profissão de carteiro deixou de existir por causa do celular.',false,'Lembre do Seu Francisco.','O carteiro continua existindo: hoje entrega também as compras da internet.');

/* ---- qual frase conta a diferença? (modelo de frase escrita) ---- */
var DIF='Qual frase conta a diferença entre as imagens?';
Q('profissoes','d01',['P8'],DIF,['Antes usavam um carrinho de mão; hoje existe drone.','Antes usavam drone; hoje existe carrinho de mão.','Antes e hoje usam o mesmo carrinho de mão.'],'Primeiro diga como era antes; depois, como é hoje.','A frase completa fala dos dois tempos: antes, carrinho de mão; hoje, drone.',F('entrega'));
Q('profissoes','d02',['P8'],DIF,['Antes os bois ajudavam no campo; hoje há máquinas.','Antes havia máquinas no campo; hoje os bois ajudam.','Antes e hoje só os bois ajudam no campo.'],'Primeiro diga como era antes; depois, como é hoje.','Antes, bois e arado; hoje, máquinas no campo.',F('campo'));
Q('profissoes','d03',['P8'],DIF,['Antes a cirurgia não tinha robô; hoje há robô que ajuda.','Antes a cirurgia tinha robô; hoje não há robô.','Antes e hoje a cirurgia usa os mesmos equipamentos.'],'Procure o que só existe na imagem de hoje.','O robô que ajuda na cirurgia é uma novidade de hoje.',F('cirurgia'));
Q('profissoes','d04',['P8'],DIF,['Antes usavam desenhos no papel; hoje usam também computador e robô.','Antes usavam computador e robô; hoje usam só desenhos no papel.','Antes e hoje usam só os desenhos no papel.'],'Primeiro diga como era antes; depois, como é hoje.','Na engenharia, antes havia desenhos no papel; hoje há também computador e robô.',F('engenharia'));

/* ---- profissões antigas das fotos da aula ---- */
Q('profissoes','r01',['P2'],'Que profissão antiga aparece na foto?',['Leiteiro','Carteiro','Acendedor de lampião'],'Olhe o que ele deixa na porta.','O leiteiro entregava garrafas de leite na porta das casas.',{img:'media/his3/prof-leiteiro.jpg',grupo:'leiteiro'});
Q('profissoes','r02',['P2'],'Que profissão antiga aparece na foto?',['Datilógrafa','Professora','Fotógrafa'],'Olhe a máquina na mesa.','A datilógrafa trabalhava com a máquina de escrever.',{img:'media/his3/prof-datilografa.jpg',grupo:'datilografa'});
Q('profissoes','r03',['P2'],'Nas aulas, quais são as profissões antigas que desapareceram? — escolha o grupo certo',['Acendedor de lampião, leiteiro e datilógrafa','Carteiro, fazendeiro e professora','Designer gráfico, médico e cientista de dados'],'São as profissões das fotos e do texto da aula.','Acendedor de lampião, leiteiro e datilógrafa são profissões antigas mostradas na aula.',{grupo:'sumiram'});
Q('profissoes','r04',['P2'],'O que fazia o leiteiro de antigamente?',['Entregava garrafas de leite nas casas','Entregava cartas numa bolsa de couro','Acendia os postes das ruas'],'Lembre da foto com as garrafas.','O leiteiro entregava garrafas de leite na porta das casas.',{grupo:'leiteiro'});
Q('profissoes','r05',['P2'],'Por que algumas profissões antigas deixaram de existir?',['Novas tecnologias passaram a fazer o trabalho','O trabalho voltou a ser feito só com as mãos','As cartas voltaram a ser entregues a pé'],'Lembre da energia elétrica e do acendedor de lampião.','Novas tecnologias passaram a fazer coisas que antes eram feitas por pessoas.');

/* ---- um par com dois tipos de fonte ---- */
Q('fontes','u01',['F2','F4','F6'],'Qual par tem uma fonte ORAL e uma fonte VISUAL?',['A entrevista e a fotografia','A entrevista e o chapéu','A carta e a fotografia'],TIPOS4,'Entrevista é oral; fotografia é visual.',{grupo:'par'});
Q('fontes','u02',['F5','F2','F6'],'Qual par tem uma fonte MATERIAL e uma fonte ORAL?',['O brinquedo antigo e o relato da avó','O brinquedo antigo e a pintura','A certidão de nascimento e o relato da avó'],TIPOS4,'Brinquedo é material; relato é oral.',{grupo:'par'});
Q('fontes','u03',['F3','F4','F6'],'Qual par tem uma fonte ESCRITA e uma fonte VISUAL?',['A certidão de nascimento e a pintura','A certidão de nascimento e o sofá antigo','A cantiga da avó e a pintura'],TIPOS4,'Certidão é escrita; pintura é visual.',{grupo:'par'});
Q('fontes','u04',['F5','F3','F6'],'Qual par tem uma fonte MATERIAL e uma fonte ESCRITA?',['O chapéu antigo e o bilhete','O chapéu antigo e a fotografia','A entrevista e o bilhete'],TIPOS4,'Chapéu é material; bilhete é escrita.',{grupo:'par'});

/* ---- leia e responda ---- */
var T1=['Seu Antônio é fotógrafo desde jovem.','No começo, ele usava uma câmera grande, apoiada num tripé.','Com o tempo, passou a usar uma câmera menor e mais leve.','Hoje, ele usa uma câmera digital e manda as fotos pelo computador.','Mesmo com as mudanças, ele continua registrando as festas das famílias.'];
var G1={texto:T1,grupo:'fotografo'};
Q('profissoes','l01',['P1','P7'],'Como era a câmera do Seu Antônio no começo?',['Grande, apoiada num tripé','Menor e mais leve','Digital, ligada ao computador'],'Procure “No começo” no texto.','O texto diz: “No começo, ele usava uma câmera grande, apoiada num tripé”.',G1);
Q('profissoes','l02',['P1'],'Como a tecnologia ajuda Seu Antônio hoje?',['Ele manda as fotos pelo computador','Ele apoia a câmera num tripé','Ele registra as festas das famílias'],'Procure “Hoje” no texto.','Hoje ele usa uma câmera digital e manda as fotos pelo computador.',G1);
Q('profissoes','l03',['P1','S5'],'O que continuou igual no trabalho do Seu Antônio?',['Registrar as festas das famílias','Usar a câmera grande','Mandar as fotos pelo computador'],'Procure “continua” no texto.','Mesmo com as mudanças, ele continua registrando as festas das famílias.',G1);
var T2=['Quando Seu Pedro era pequeno, o trabalho na fazenda era feito com as mãos e com a ajuda dos animais.','Para arar a terra, usavam um arado puxado por bois.','Depois chegaram os tratores, e o trabalho ficou mais rápido.','Hoje, Seu Pedro usa o celular para saber se vai chover.','Mesmo com tantas mudanças, ele continua cuidando da natureza.'];
var G2={texto:T2,grupo:'fazenda'};
Q('profissoes','l04',['P5'],'No texto, o que usavam para arar a terra antes dos tratores?',['Um arado puxado por bois','Um celular','Uma máquina que colhe sozinha'],'Leia a segunda linha.','O texto diz: “usavam um arado puxado por bois”.',G2);
Q('profissoes','l05',['P5'],'No texto, que tecnologia ajuda Seu Pedro a saber se vai chover?',['O celular','O trator','O arado'],'Procure “Hoje” no texto.','Hoje, Seu Pedro usa o celular para saber se vai chover.',G2);
Q('profissoes','l06',['P5','S5'],'No texto, o que continuou igual para Seu Pedro?',['Cuidar da natureza','Arar a terra com bois','Plantar sem tratores'],'Procure “continua” no texto.','Mesmo com tantas mudanças, ele continua cuidando da natureza.',G2);

/* ---- resposta completa (diz de quem se fala) ---- */
Q('fontes','k01',['F7','F11'],'Por que as fontes históricas são importantes? Qual resposta diz DE QUEM está falando?',['Elas mostram como as pessoas viviam.','Para saber como eles viviam.','Como viviam e se vestiam.'],'Procure a resposta que diz QUEM vivia.','A resposta completa diz de quem se fala: as pessoas.',{grupo:'completa'});
Q('profissoes','k02',['P6'],'Como o médico trabalhava antigamente? Qual resposta diz DE QUEM está falando?',['O médico anotava tudo no papel.','Ele anotava tudo no papel.','Com papel e caneta.'],'Procure a resposta que diz QUEM anotava.','A resposta completa diz de quem se fala: o médico.',{grupo:'completa'});
Q('escola','k03',['S3'],'Por que guardar os documentos da escola? Qual resposta diz O QUE eles preservam?',['Eles preservam a memória da escola.','Porque eles preservam.','Para preservar sempre.'],'Procure a resposta que diz O QUE se preserva.','A resposta completa diz o que os documentos preservam: a memória da escola.',{grupo:'completa'});
return I;
})();
