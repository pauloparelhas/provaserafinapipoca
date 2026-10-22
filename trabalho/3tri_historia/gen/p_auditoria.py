# Correções da auditoria de cobertura (22/10) nas lições, no pocket, no jogo e no roteiro.
import os
B = os.path.join(os.path.dirname(__file__), '..', '..', '..')
def sub(rel, R):
    p = os.path.join(B, rel); s = open(p, encoding='utf-8').read(); falta = []
    for a, b in R:
        if a not in s: falta.append(a[:70]); continue
        s = s.replace(a, b, 1)
    open(p, 'w', encoding='utf-8').write(s); print(rel, 'NAO ACHEI:', falta or 'nada')

SIMNAO_ESC = """ {tipo:'escolha', tit:'Pode ser mais de uma: é fonte ESCRITA?', fala:'Pode ser mais de uma. Esta pista é fonte escrita?', pergunta:'Esta pista é fonte ESCRITA? (na prova, marque TODAS as escritas)',
  rotulo:'Pista', proxRot:'Próxima', op:['Sim','Não'], itens:[
   {m:'a carta antiga', c:'Sim', d:'Tem texto escrito.'},
   {m:'o chapéu antigo, o objeto', c:'Não', d:'É objeto: material.'},
   {m:'o diário da tia', c:'Sim', d:'Tem texto escrito.'},
   {m:'as fotos do álbum', c:'Não', d:'São imagens: visual.'},
   {m:'a certidão de nascimento', c:'Sim', d:'Documento escrito.'},
   {m:'o mapa antigo', c:'Não', d:'Mapa é imagem: visual.'},
   {m:'a mensagem escrita no verso do cartão-postal', c:'Sim', d:'A parte com letras é escrita; a foto da frente seria visual.'}
  ]}
]},"""

sub('ferramentas/HIS3_estudo_licoes.js', [
 # L3: sim/não escrita, depois da legenda
 ("   caixa('Histórias escondidas nas fotografias','<p>Quem são as pessoas? Onde e quando foi tirada? O que estava acontecendo? Por que a foto é importante para a família?</p>')}\n]},",
  "   caixa('Histórias escondidas nas fotografias','<p>Quem são as pessoas? Onde e quando foi tirada? O que estava acontecendo? Por que a foto é importante para a família?</p>')},\n" + SIMNAO_ESC),
 # L4: foto também é "documento" na fala da escola, mas não é ESCRITA
 ("{m:'a foto antiga da turma', c:'Não', d:'Foto é fonte da escola, mas VISUAL.'}", "{m:'a foto antiga da turma', c:'Não', d:'A foto também guarda lembranças da escola, mas é fonte VISUAL, não escrita.'}"),
 # L6: liga fonte → para quem
 ("   {m:'uma propaganda antiga de alimento para crianças', op:['Vender o alimento','Guardar uma receita'], c:'Vender o alimento', d:'Propaganda quer que você compre.'}\n  ]}\n]},",
  "   {m:'uma propaganda antiga de alimento para crianças', op:['Vender o alimento','Guardar uma receita'], c:'Vender o alimento', d:'Propaganda quer que você compre.'}\n  ]},\n"
  " {tipo:'liga', tit:'Quem fez e para quem?', regra:'Toque na fonte e depois em quem fez ou para quem foi feita.', fala:'Ligue a fonte a quem fez ou para quem foi feita.',\n"
  "  pares:[['cartão-postal de Salvador: quem escreveu?','quem viajou'],['cartão-postal: para quem?','os amigos de quem viajou'],['propaganda do alimento: para quem?','as famílias'],['anúncio de leite: para quem?','quem queria comprar leite']]}\n]},"),
 # L7: imagens da aula + continua existindo?
 ("   R('<b>Desapareceu</b> × <b>mudou</b>: o acendedor de lampião desapareceu; o carteiro mudou, mas continua existindo.')},",
  "   R('<b>Desapareceu</b> × <b>mudou</b>: o acendedor de lampião desapareceu; o carteiro mudou, mas continua existindo.')+\n"
  "   caixa('Nas fotos antigas da aula','<p>• o <b>leiteiro</b> entregava garrafas de leite na porta das casas<br>• a <b>datilógrafa</b> escrevia numa máquina de escrever<br>• vendedores de rua levavam cestos de frutas e vassouras</p>')},\n"
  " {tipo:'escolha', tit:'Pode ser mais de uma: continua existindo?', fala:'Esta profissão das histórias continua existindo hoje?', pergunta:'Esta profissão continua existindo hoje? (pode ser mais de uma)',\n"
  "  rotulo:'Profissão', proxRot:'Próxima', op:['Sim','Não'], itens:[\n"
  "   {m:'carteiro, do Seu Francisco', c:'Sim', d:'Continua, de um jeito diferente.'},{m:'professora, da Dona Lúcia', c:'Sim', d:'Continua, com computador e lousa digital.'},\n"
  "   {m:'fazendeiro, do Seu Pedro', c:'Sim', d:'Continua, com trator e celular.'},{m:'médico, do Doutor João', c:'Sim', d:'Continua, com exames no celular.'},\n"
  "   {m:'acendedor de lampião', c:'Não', d:'Desapareceu com a energia elétrica.'}\n  ]},"),
 # L11: sim/não médico e construtor
 ("  pares:[['estetoscópio e termômetro de mercúrio','médico'],['câmera antiga de tripé','fotógrafo'],['lousa e globo','professora'],['marreta e colher de pedreiro','construtor'],['bolsa de couro com cartas','carteiro'],['arado puxado por bois','fazendeiro']]}\n]},",
  "  pares:[['estetoscópio e termômetro de mercúrio','médico'],['câmera antiga de tripé','fotógrafo'],['lousa e globo','professora'],['marreta e colher de pedreiro','construtor'],['bolsa de couro com cartas','carteiro'],['arado puxado por bois','fazendeiro']]},\n"
  " {tipo:'escolha', tit:'Pode ser mais de uma: é do MÉDICO?', fala:'É ferramenta do médico?', pergunta:'É ferramenta do MÉDICO? (pode ser mais de uma)', rotulo:'Ferramenta', proxRot:'Próxima', op:['Sim','Não'], itens:[\n"
  "   {m:'maleta', c:'Sim', d:'Do médico.'},{m:'seringa antiga', c:'Sim', d:'Do médico.'},{m:'termômetro de mercúrio', c:'Sim', d:'Do médico.'},{m:'estetoscópio', c:'Sim', d:'Do médico.'},{m:'globo', c:'Não', d:'É da professora.'},{m:'marreta', c:'Não', d:'É do construtor.'}\n  ]},\n"
  " {tipo:'escolha', tit:'Pode ser mais de uma: é do CONSTRUTOR?', fala:'É ferramenta do construtor?', pergunta:'É ferramenta do CONSTRUTOR? (pode ser mais de uma)', rotulo:'Ferramenta', proxRot:'Próxima', op:['Sim','Não'], itens:[\n"
  "   {m:'marreta', c:'Sim', d:'Do construtor.'},{m:'colher de pedreiro', c:'Sim', d:'Do construtor.'},{m:'pincel, junto da marreta e da colher', c:'Sim', d:'Do construtor.'},{m:'lousa', c:'Não', d:'É da professora.'},{m:'câmera de tripé', c:'Não', d:'É do fotógrafo.'}\n  ]}\n]},"),
 # L13: âncora do álbum fiel ao material
 ("passos([{t:'jornal'},{t:'carta'},{t:'diário'},{t:'álbum de fotos',s:'tempo dos bisavós e avós'},{t:'foto digital',s:'quando papai e mamãe eram crianças'},{t:'redes sociais',s:'hoje'}])",
  "passos([{t:'jornal'},{t:'carta'},{t:'diário'},{t:'álbum de fotos',s:'bem antigo'},{t:'foto digital',s:'quando papai e mamãe eram crianças'},{t:'redes sociais',s:'hoje'}])"),
 ("tema:'tempo', nome:'Tempo e memória (revisão)'", "tema:'tempo', nome:'Tempo e memória (revisão)'"),
])

L14 = """,

/* ===================== 14. RESPOSTAS DE DETETIVE (perguntas abertas) ===================== */
{k:'respostas', tema:'fontes', nome:'Respostas de detetive (com as suas palavras)', cor:'#7c3aed', quem:'Dra. Clio',
 treino:[[['fontes','escola','profissoes','olhar'],4,'conceito']], telas:[
 {tipo:'texto', tit:'Na prova pode ter pergunta aberta',
  fala:'Na prova pode ter pergunta para responder com as suas palavras. Leia a pergunta, pense e depois toque para ver um jeito de responder.',
  html:fala('Dra. Clio','Pergunta aberta = responder com as suas palavras. Pense primeiro, depois toque no cartão e compare com o modelo!')},
 {tipo:'revela', tit:'Fontes e escola', regra:'Pense na resposta. Depois toque para ver o modelo.', fala:'Respostas de detetive sobre fontes e escola.',
  cartoes:[
   {f:'Como registramos o passado?', b:'Com fontes históricas: relatos contados (oral), textos (escrita), imagens (visual) e objetos (material).'},
   {f:'O que são fontes históricas?', b:'São pistas do passado: tudo o que a gente pode ver, ouvir, tocar ou ler para aprender sobre outras épocas.'},
   {f:'Como objetos e documentos da escola contam o passado dela?', b:'Fotos de turmas, cadernos, boletins, uniformes e troféus mostram como era o ensino, as regras e o dia a dia, e o que mudou.'},
   {f:'O que objetos, documentos e festas têm a ver com História?', b:'Eles guardam lembranças e contam o passado das pessoas e da escola.'}
  ]},
 {tipo:'revela', tit:'Pontos de vista e profissões', regra:'Pense na resposta. Depois toque para ver o modelo.', fala:'Respostas de detetive sobre pontos de vista e profissões.',
  cartoes:[
   {f:'Por que existem histórias diferentes a partir de um mesmo documento?', b:'Porque cada pessoa olha com a sua experiência, imaginação e ponto de vista. Por isso o historiador compara várias fontes.'},
   {f:'Como as formas de trabalho mudaram com o tempo?', b:'Surgiram novas máquinas e tecnologias: o carteiro passou da bicicleta para a moto e o aparelho com tela; o fazendeiro, dos bois para o trator.'},
   {f:'O que mudou e o que continuou nas profissões?', b:'Mudaram as ferramentas e o jeito de trabalhar. Continuou o mais importante: cuidar das pessoas, ensinar com alegria, amar a terra.'},
   {f:'Por que o acendedor de lampião não existe mais?', b:'Porque chegou a energia elétrica, e os postes passaram a acender sozinhos.'}
  ]}
]}
"""
p = os.path.join(B, 'ferramentas/HIS3_estudo_licoes.js'); s = open(p, encoding='utf-8').read()
i = s.rindex(']}\n\n];')
s = s[:i] + ']}' + L14 + '\n];' + s[i + len(']}\n\n];'):]
open(p, 'w', encoding='utf-8').write(s); print('L14 ok')

sub('ferramentas/HIS3_pocket.html', [("<div>álbum de fotos<small>bisavós e avós</small></div>", "<div>álbum de fotos<small>bem antigo</small></div>")])
sub('ferramentas/HIS3_jogo_poderes.js', [("O álbum de fotos, do tempo dos bisavós e dos avós.','O álbum de fotos, do tempo dos bisavós e dos avós.'", "O álbum de fotos guarda fotos bem antigas.','O álbum de fotos guarda fotos bem antigas.'"),
  ("fala:'O álbum de fotos, do tempo dos bisavós e dos avós.',falaPt:'O álbum de fotos, do tempo dos bisavós e dos avós.'", "fala:'O álbum de fotos guarda fotos bem antigas.',falaPt:'O álbum de fotos guarda fotos bem antigas.'")])
sub('ferramentas/HIS3_jogo_fases.js', [("at:['F2','F3','F4','F5','F6','F8','F12','M1','B6','B7']", "at:['F2','F3','F4','F5','F6','F7','F8','F9','F12','M1','B6','B7']")])
sub('trabalho/3tri_historia/_roteiro.md', [
 ("  - **Fora do banco:** cartão-postal inteiro para classificar tipo (frente visual, verso escrito)",
  "  - **Cartão-postal (auditoria 22/10):** só com a PARTE nomeada — \"a mensagem escrita no verso\" = escrita; \"a foto da frente\" = visual. O cartão inteiro, sem dizer a parte, fica fora.\n  - **Fora do banco:** cartão-postal inteiro, sem a parte nomeada"),
 ("| 4 | **Álbum de fotos** | Guarda memórias visuais impressas | do tempo dos bisavós/avós |", "| 4 | **Álbum de fotos** | Guarda memórias visuais impressas | bem antigo |"),
])
