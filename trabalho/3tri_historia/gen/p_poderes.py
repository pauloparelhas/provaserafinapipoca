# Poderes, objetos da Trilha do Tempo e dicas do jogo de História (HIS3_jogo_poderes.js)
import os
F = os.path.join(os.path.dirname(__file__), '..', '..', '..', 'ferramentas')
p = os.path.join(F, 'HIS3_jogo_poderes.js'); s = open(p, encoding='utf-8').read()
def troca_bloco(ini, fim_marca, novo, incl_fim=True):
    global s
    i = s.index(ini); j = s.index(fim_marca, i) + (len(fim_marca) if incl_fim else 0)
    s = s[:i] + novo + s[j:]
def P(id_, **k):
    pass
TAB = r'''var TAB={
  1:{id:'botas', tiro:null, suporte:'barraca', verbo:'Calce!', verboPt:'Calce!', nome:'tênis saltador', nomePt:'tênis saltador',
     tit:'Tênis saltador da educação física!', titPt:'Tênis saltador da educação física!',
     txt:'Pule e aperte PULAR de novo no ar. Um pulo bem alto!', txtPt:'Pule e aperte PULAR de novo no ar. Um pulo bem alto!'},
  2:{id:'botas', tiro:null, suporte:'barraca', verbo:'Calce!', verboPt:'Calce!', nome:'pantufas saltadoras', nomePt:'pantufas saltadoras',
     tit:'As pantufas saltadoras da Vovó!', titPt:'As pantufas saltadoras da Vovó!',
     txt:'Pule e aperte PULAR de novo no ar: pulo duplo! Assim você sobe do porão até o sótão.', txtPt:'Pule e aperte PULAR de novo no ar: pulo duplo! Assim você sobe do porão até o sótão.'},
  4:{id:'pip', tiro:'faisca', montado:true, nome:'Pangaré', nomePt:'Pangaré',
     tit:'Pangaré, o cavalo do Seu Pedro!', titPt:'Pangaré, o cavalo do Seu Pedro!',
     txt:'Antigamente os animais ajudavam no trabalho da fazenda! Monte no Pangaré e segure PULAR para saltar longe. Aperte ESPAÇO: ele relincha e espanta as traças.', txtPt:'Antigamente os animais ajudavam no trabalho da fazenda! Monte no Pangaré e segure PULAR para saltar longe. Aperte ESPAÇO: ele relincha e espanta as traças.'},
  5:{id:'traje', tiro:'bolha', suporte:'arara', verbo:'Vista!', verboPt:'Vista!', nome:'roupa de mergulho', nomePt:'roupa de mergulho',
     tit:'Uma roupa de mergulho!', titPt:'Uma roupa de mergulho!',
     txt:'Pule no rio. Toque PULAR para nadar para cima. Aperte ESPAÇO: as bolhas prendem as traças.', txtPt:'Pule no rio. Toque PULAR para nadar para cima. Aperte ESPAÇO: as bolhas prendem as traças.'},
  6:{desligado:true, id:'giz', tiro:null, suporte:'pedestal', verbo:'Pegue!', verboPt:'Pegue!', nome:'capacete', nomePt:'capacete',
     tit:'Capacete!', titPt:'Capacete!', txt:'Segure firme nos ganchos e nas vigas.', txtPt:'Segure firme nos ganchos e nas vigas.'},
  7:{id:'bolas', tiro:'bola', suporte:'rack', verbo:'Pegue!', verboPt:'Pegue!', nome:'bolas de futebol', nomePt:'bolas de futebol',
     tit:'Bolas de futebol!', titPt:'Bolas de futebol!',
     txt:'Aperte ESPAÇO (ou o botão da bola) para chutar. Chute a bola nas traças e na máquina de bolas!', txtPt:'Aperte ESPAÇO (ou o botão da bola) para chutar. Chute a bola nas traças e na máquina de bolas!'},
  8:{id:'biscoitos', tiro:'biscoito', nome:'biscoitos da Vovó', nomePt:'biscoitos da Vovó',
     tit:'Biscoitos da Vovó!', titPt:'Biscoitos da Vovó!',
     txt:'Aperte ESPAÇO (ou o botão do biscoito) para jogar um biscoito. As traças adoram biscoito: viram borboletas!', txtPt:'Aperte ESPAÇO (ou o botão do biscoito) para jogar um biscoito. As traças adoram biscoito: viram borboletas!'}
};
'''
troca_bloco('var TAB={', '/* a história do ratinho', TAB, incl_fim=False)
HIST = r'''var HIST={ /* HIS3: a Trilha da Linha do Tempo — os registros na ORDEM do material (jornal → carta → diário → álbum) */
  cookie:{verbo:'Pegue!',verboPt:'Pegue!',fala:'A ampulheta do Tic: o tempo começa a contar!',falaPt:'A ampulheta do Tic: o tempo começa a contar!'},
  milk:{verbo:'Pegue!',verboPt:'Pegue!',fala:'O jornal: um dos primeiros registros, de muito tempo atrás.',falaPt:'O jornal: um dos primeiros registros, de muito tempo atrás.'},
  napkin:{verbo:'Pegue!',verboPt:'Pegue!',fala:'A carta, escrita à mão. Abra o envelope: ele vira paraquedas!',falaPt:'A carta, escrita à mão. Abra o envelope: ele vira paraquedas!'},
  mirror:{verbo:'Pegue!',verboPt:'Pegue!',fala:'O diário: alguém escrevia o que vivia todo dia.',falaPt:'O diário: alguém escrevia o que vivia todo dia.'},
  scissors:{verbo:'Pegue!',verboPt:'Pegue!',fala:'O álbum de fotos, do tempo dos bisavós e dos avós.',falaPt:'O álbum de fotos, do tempo dos bisavós e dos avós.'},
  broom:{verbo:'Pegue!',verboPt:'Pegue!',fala:'O espanador! Espante a poeira das traças.',falaPt:'O espanador! Espante a poeira das traças.'},
  tape:{verbo:'Pegue!',verboPt:'Pegue!',fala:'A fita! Conserte a ponte de papel rasgada.',falaPt:'A fita! Conserte a ponte de papel rasgada.'},
  fim:{fala:'Depois vieram a foto digital e as redes sociais. A ampulheta vira de novo: o tempo não para!',falaPt:'Depois vieram a foto digital e as redes sociais. A ampulheta vira de novo: o tempo não para!'}
};'''
troca_bloco('var HIST={', '};', HIST)
R = [
("var QUIZ_ITEM={milk:['c11','c20'],napkin:['c13'],mirror:['c14'],scissors:['c24'],broom:['c15'],tape:['c19']};", "var QUIZ_ITEM={milk:['t01'],napkin:['t02'],mirror:['t03'],scissors:['t04'],broom:['t05'],tape:['t06']};"),
("var NOME_ITEM={milk:['a glass of milk','um copo de leite'],napkin:['a napkin','um guardanapo'],mirror:['a mirror','um espelho'],scissors:['scissors','uma tesoura'],broom:['a broom','uma vassoura'],tape:['tape','fita adesiva']};", "var NOME_ITEM={milk:['o jornal','o jornal'],napkin:['a carta','a carta'],mirror:['o diário','o diário'],scissors:['o álbum de fotos','o álbum de fotos'],broom:['o espanador','o espanador'],tape:['a fita','a fita']};"),
("G.toast(ajuda?'The mouse helps you: '+n[0]+'!':'Right! You get '+n[0]+'!',2400,ajuda?'O ratinho te ajuda: '+n[1]+'!':'Certo! Você ganhou '+n[1]+'!');", "G.toast(ajuda?'O Tic te ajuda: '+n[1]+'!':'Certo! Você ganhou '+n[1]+'!',2400);"),
("var CARTAO_GUARDANAPO={tit:'A napkin!',titPt:'Um guardanapo!',", "var CARTAO_GUARDANAPO={tit:'A carta!',titPt:'A carta!',"),
("tipo:'mouse',falando:0}", "tipo:'tic',falando:0}"),
]
falta = []
for a, b in R:
    if a not in s: falta.append(a[:70])
    s = s.replace(a, b)
DICA = r'''var DICA_PODER={1:['Tênis saltador: pule e aperte PULAR de novo no ar para um superpulo.','Tênis saltador: pule e aperte PULAR de novo no ar para um superpulo.'],
  2:['Pantufas saltadoras: pule e aperte PULAR de novo no ar. Suba até o sótão!','Pantufas saltadoras: pule e aperte PULAR de novo no ar. Suba até o sótão!'],
  4:['Pangaré: segure PULAR para saltar longe. Aperte ESPAÇO para ele relinchar e espantar as traças.','Pangaré: segure PULAR para saltar longe. Aperte ESPAÇO para ele relinchar e espantar as traças.'],
  5:['Roupa de mergulho: toque PULAR para nadar para cima. Aperte ESPAÇO para soprar bolhas.','Roupa de mergulho: toque PULAR para nadar para cima. Aperte ESPAÇO para soprar bolhas.'],
  7:['Bolas de futebol: aperte ESPAÇO para chutar uma bola nas traças e na máquina.','Bolas de futebol: aperte ESPAÇO para chutar uma bola nas traças e na máquina.'],
  8:['Biscoitos: aperte ESPAÇO para jogar um biscoito. As traças viram borboletas!','Biscoitos: aperte ESPAÇO para jogar um biscoito. As traças viram borboletas!']};'''
troca_bloco('var DICA_PODER={', '};', DICA)
open(p, 'w', encoding='utf-8').write(s)
print('NAO ACHEI:', falta or 'nada')
