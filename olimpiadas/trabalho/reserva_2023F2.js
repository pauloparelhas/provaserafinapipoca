/* ============================================================
   reserva_2023F2.js — BLOCO DE ITENS: Olimpíada de Português
   2023 · 2ª FASE · Categoria G · 2º ano · 15 questões

   O QUE É: só o array de itens, no formato do banco de produção
   ferramentas/OP_data.js. Colar dentro da lista ITENS existente,
   antes da sentinela {id:'FIM'}. Não traz window.OP nem função.

   DE ONDE VEIO:
   - Enunciados e alternativas, verbatim e em caixa alta:
     olimpiadas/_fontes_md/OP_2023_catG_fase2_prova.md
   - Análise de cada distrator:
     olimpiadas/_fontes/DOSSIE_2023.md, seção FASE 2
   - Imagens das páginas (conferência da Q4, da Q8 e dos quadros):
     olimpiadas/_fontes/png/OP_2023_catG_fase2_prova_p*.png
   - Gabarito oficial da 2ª fase de 2023, já lido e conferido:
     1=E 2=B 3=D 4=D 5=B 6=E 7=C 8=A 9=C 10=E 11=E 12=D 13=A 14=D 15=D
   Nenhum enunciado, alternativa ou gabarito foi inventado.

   POLÍTICA DE CORTE DA 5ª ALTERNATIVA — o que é diferente aqui:
   em 2023 a prova tinha CINCO alternativas (A a E); a prova de hoje tem
   QUATRO. Cada questão entrou com quatro, cortando UMA errada — sempre a
   mais fraca, isto é, a de descarte óbvio ou a que só repete a lição de
   outra alternativa. A alternativa CERTA nunca saiu, e nenhuma armadilha
   típica (a quase-certa que para cedo) foi cortada. A ordem das
   alternativas que sobraram é a mesma da prova. Todo item reduzido traz
   o campo `nota` avisando a criança de que a questão é de 2023 e que ali
   ela está com quatro respostas.

   O QUE FOI CORTADO, QUESTÃO A QUESTÃO:
     Q1  (A) NASCEMOS   — erra tempo e número ao mesmo tempo, e as duas
                          lições já estão em NASCERAM e NASCERÃO
     Q2  (C) A ÁRVORE   — não se move, não está no céu: descarte imediato
     Q3  (E) ANUNCIAVA  — única que nem começa como as outras (ACEN...)
     Q4  (E) E          — não sai de nenhuma leitura possível da grade
     Q5  (D) OMTEM      — mesma lição de TENPO (M e N), e mais visível
     Q6  (D) BRASA      — repete FOGO e é a palavra mais rara para 7 anos
     Q7  (B) PARA       — deixa a frase sem pé nem cabeça
     Q8  (C) GELO       — o que menos conversa com o poema
     Q9  (E) BONECA...  — quatro palavras curtas e famosas, 3 palmas cada:
                          a criança risca em dois segundos
     Q10 (C) A VIDA É MINHA — pede duas peças inventadas (MI, NHA)
     Q11 (C) HONESTIDADE— repete BONDADE e é a palavra mais difícil
     Q12 (A) EU VENCI!  — duas palavras contra uma conta de quatro números
     Q13 (E) VIAJANTE   — uma palavra solta, sem gancho no poema
     Q14 (E) DIREÇÃO ERRADA — inventa um fato que o texto não tem
     Q15 (E) PROFESSORA DE MATEMÁTICA — erra tudo: nem o começo nem o fim

   AS 15 ENTRARAM. NENHUMA FICOU DE FORA.
   As duas que dependiam de figura estão declaradas no campo `nota`,
   numa frase só, junto com o aviso das cinco alternativas:
   - Q4 (cruzadinha): os três animais aparecem na prova só desenhados —
     aqui MACACO, GIRAFA e OVELHA vêm escritos, e o desenho da grade vem
     dito em palavras (quem fica em pé, onde os nomes deitados terminam e
     qual quadradinho a flecha aponta). A conta que a criança faz —
     testar os três nomes no lugar em pé — continua inteira.
   - Q8 (CHARCO): na prova só a imagem mostra qual palavra está
     sublinhada. Aqui a palavra sublinhada vem dita na `nota`.
   As demais figuras da prova são decorativas (abelha, nuvem de chuva,
   retrato, mão com lápis). Os quadros da Q10, da Q12 e da Q15 foram
   reconstruídos como tabela `tbc`, igual ao item 25F1Q15.

   TRUQUES NOVOS (os outros treze foram copiados palavra por palavra de
   frases que já existem no banco):
   - Q4 'Teste um nome de cada vez no lugar em pé e veja se as letras do
         cruzamento batem.'
   - Q5 'Cace o erro de uma frase de cada vez, até o fim. A que sobrar
         sem erro nenhum é a resposta.'
   ============================================================ */

/* ===================== 2023 · 2ª FASE ===================== */

{id:'23F2Q1', eixo:'buraco', origem:'Olimpíada 2023 · 2ª fase · questão 1',
 pede:'QUE PALAVRA COMPLETA A FRASE A SEGUIR?',
 quadro:'ONTEM, PAPAI E MAM&Atilde;E ME DISSERAM QUE, DAQUI A ALGUNS MESES, <span class="bl">_______</span> O MEU IRM&Atilde;ZINHO!',
 nota:'Esta questão é de 2023, quando a prova tinha cinco respostas. Aqui ela está com quatro, como na prova de hoje.',
 opts:[
  {t:'NASCERAM.', no:'O ONTEM do começo puxa para o que já passou, e é por isso que essa dá vontade. Mas o ONTEM é do DISSERAM: quem falou ontem foram papai e mamãe. Nascer é DAQUI A ALGUNS MESES, ainda vai acontecer.'},
  {t:'NASCERÃO.', no:'NASCERÃO é para mais de um bebê, e na frase é O MEU IRMÃZINHO, um só. A diferença para a certa é o til, e é aí que quase todo mundo escorrega.'},
  {t:'NASCI.', no:'NASCI é eu, e já aconteceu. Quem vai nascer é o irmãzinho, e daqui a alguns meses.'},
  {t:'NASCERÁ.', ok:1}
 ],
 dica:'Duas pistas mandam na frase: DAQUI A ALGUNS MESES (ainda vai acontecer) e O MEU IRMÃZINHO (é um só). Ponha cada palavra no buraco e veja se as duas fecham.',
 truque:'Ponha cada palavra no buraco e leia a frase inteira, do começo.',
 visual:'<p class="vx"><span class="mk">DAQUI A ALGUNS MESES</span> &rarr; ainda vai acontecer &nbsp;&middot;&nbsp; <span class="mk">O MEU IRM&Atilde;ZINHO</span> &rarr; &eacute; um s&oacute;</p>'+
        '<div class="pcs"><span class="pc bad">NASCERAM</span><span class="arw">&rarr;</span><span class="pc bad">j&aacute; aconteceu</span></div>'+
        '<div class="pcs"><span class="pc bad">NASCER&Atilde;O</span><span class="arw">&rarr;</span><span class="pc bad">mais de um</span></div>'+
        '<div class="pcs"><span class="pc hit">NASCER&Aacute;</span><span class="arw">&rarr;</span><span class="pc hit">vai acontecer &middot; um s&oacute;</span></div>',
 porque:'A frase diz DAQUI A ALGUNS MESES, então ainda vai acontecer. E diz O MEU IRMÃZINHO, que é um só. NASCERÁ é a única que fecha as duas coisas ao mesmo tempo.',
 proximo:'Quando a frase tem duas pistas, confira as duas na palavra que você escolheu. Passar em uma só não basta.'},

{id:'23F2Q2', eixo:'ler', origem:'Olimpíada 2023 · 2ª fase · questão 2',
 texto:['SOU UM PEQUENO MUNDO;',
        'MOVO-ME, ROLO E DANÇO',
        'POR ESTE CÉU PROFUNDO;',
        'POR SORTE DEUS ME DEU',
        'MOVER-ME SEM DESCANSO,',
        'EM TORNO DE OUTRO MUNDO,',
        'QUE INDA É MAIOR DO QUE EU.'],
 pede:'QUE NOME PODERÍAMOS DAR A ESTE TRECHO DO POEMA O UNIVERSO, DO OLAVO BILAC?',
 nota:'Esta questão é de 2023, quando a prova tinha cinco respostas. Aqui ela está com quatro, como na prova de hoje.',
 opts:[
  {t:'AS ESTRELAS.', no:'Estrela fica no céu, e por isso essa é a mais tentadora de todas. Mas quem fala no poema é UM só — SOU UM PEQUENO MUNDO — e AS ESTRELAS são muitas. E estrela não fica dando voltas em volta de outro mundo.'},
  {t:'A LUA.', ok:1},
  {t:'O AVIÃO.', no:'O avião voa no céu e não para quieto, essa parte combina. Mas avião não é um pequeno mundo, e ele não dá voltas em volta de um mundo maior.'},
  {t:'AS FOLHAS.', no:'Folha rola e dança no vento, e essa parte engana mesmo. Só que folha fica no chão, não no CÉU PROFUNDO, e são muitas, não uma só.'}
 ],
 dica:'Quem está falando dá três pistas sobre si: é UM só, está no céu e dá voltas em volta de outro mundo maior. Procure quem faz as três.',
 truque:'A resposta mora no texto. Volte com a régua e ache a linha que responde.',
 acende:[0,2,5,6],
 visual:'<p class="vx"><span class="mk">SOU UM PEQUENO MUNDO</span> &rarr; &eacute; um s&oacute;</p>'+
        '<p class="vx"><span class="mk">POR ESTE C&Eacute;U PROFUNDO</span> &rarr; est&aacute; no c&eacute;u</p>'+
        '<p class="vx"><span class="mk">EM TORNO DE OUTRO MUNDO, QUE INDA &Eacute; MAIOR DO QUE EU</span> &rarr; d&aacute; voltas em volta de um maior</p>'+
        '<div class="pcs"><span class="pc hit">A LUA</span><span class="arw">&rarr;</span><span class="pc hit">fecha as tr&ecirc;s</span></div>'+
        '<div class="pcs"><span class="pc bad">AS ESTRELAS</span><span class="arw">&rarr;</span><span class="pc bad">s&atilde;o muitas e n&atilde;o d&atilde;o voltas</span></div>',
 porque:'A Lua é uma só, fica no céu e dá voltas em volta da Terra, que é um mundo maior do que ela. As três pistas do poema fecham só com a Lua.',
 proximo:'Junte TODAS as pistas do texto antes de marcar. Uma resposta pode fechar uma pista e brigar com a outra.'},

{id:'23F2Q3', eixo:'letras', origem:'Olimpíada 2023 · 2ª fase · questão 3',
 pede:'SE MISTURARMOS TODAS AS LETRAS DAS DUAS PALAVRAS A SEGUIR, QUE OUTRA PALAVRA OBTEREMOS?',
 quadro:'<b>CANETA</b> &nbsp;&nbsp;&nbsp;&nbsp; <b>UVA</b>',
 nota:'Esta questão é de 2023, quando a prova tinha cinco respostas. Aqui ela está com quatro, como na prova de hoje.',
 opts:[
  {t:'ACENTUAR.', no:'Conte: as duas palavras juntas dão 9 letras, e ACENTUAR tem 8. E ela ainda pede um R, que não existe nem em CANETA nem em UVA.'},
  {t:'ACENAVA.', no:'ACENAVA tem só 7 letras. Sobram o T e o U na mesa — e peça que sobra quer dizer palavra errada.'},
  {t:'ACENTAVAM.', no:'Essa é a mais perigosa: tem 9 letras, igualzinho ao monte. Mas ela pede um M, que ninguém deu, e deixa o U sem uso. Só riscando letra por letra dá para ver.'},
  {t:'ACENTUAVA.', ok:1}
 ],
 dica:'Escreva as letras de CANETA e as de UVA juntas e conte quantas são. Depois escreva a palavra da alternativa e risque uma letra do monte para cada letra dela.',
 truque:'Cada letra vale uma vez. Escreva e vá riscando: sobrou ou faltou letra, está errada.',
 visual:'<div class="pcs"><span class="pc">C</span><span class="pc">A</span><span class="pc">N</span><span class="pc">E</span><span class="pc">T</span><span class="pc">A</span><span class="pc">U</span><span class="pc">V</span><span class="pc">A</span><span class="arw">&rarr;</span><span class="pc hit">9 letras</span></div>'+
        '<div class="pcs"><span class="pc hit">A</span><span class="pc hit">C</span><span class="pc hit">E</span><span class="pc hit">N</span><span class="pc hit">T</span><span class="pc hit">U</span><span class="pc hit">A</span><span class="pc hit">V</span><span class="pc hit">A</span></div>'+
        '<p class="vx">ACENTUAVA gasta as nove, inclusive os <b>tr&ecirc;s A</b>. Nada sobrou, nada faltou.</p>'+
        '<div class="pcs"><span class="pc bad">ACENTUA<b>R</b></span><span class="pc bad">ACENTAVA<b>M</b></span><span class="arw">&rarr;</span><span class="pc bad">pedem letra que ningu&eacute;m deu</span></div>',
 porque:'CANETA e UVA juntas dão nove letras: três A, mais C, E, N, T, U e V. ACENTUAVA usa exatamente essas nove, uma vez cada.',
 proximo:'Conte primeiro quantas letras o monte tem. A alternativa com número de letras diferente já cai sem precisar conferir uma por uma.'},

{id:'23F2Q4', eixo:'letras', origem:'Olimpíada 2023 · 2ª fase · questão 4',
 enun:'COMPLETE OS QUADRADINHOS ABAIXO COM O NOME DOS ANIMAIS, COLOCANDO UMA LETRA EM CADA QUADRADINHO:',
 quadro:'OS TR&Ecirc;S ANIMAIS DESENHADOS: <b>MACACO</b> &ndash; <b>GIRAFA</b> &ndash; <b>OVELHA</b>'+
        '<div class="sep"></div>NA CRUZADINHA, UM NOME FICA EM P&Eacute;, COM 6 QUADRADINHOS. OS OUTROS DOIS FICAM DEITADOS, COM 6 QUADRADINHOS CADA UM.'+
        '<div class="sep"></div>CADA NOME DEITADO <b>TERMINA</b> DENTRO DO NOME EM P&Eacute;: UM NO 2&ordm; QUADRADINHO, O OUTRO NO 4&ordm;.'+
        '<div class="sep"></div>A FLECHA APONTA O <b>6&ordm;</b> QUADRADINHO DO NOME EM P&Eacute;, QUE &Eacute; O &Uacute;LTIMO.',
 pede:'QUAL É A LETRA QUE DEVERÁ FICAR NO QUADRADINHO INDICADO COM A FLECHA?',
 nota:'Esta questão é de 2023, quando a prova tinha cinco respostas: aqui ela está com quatro, como na prova de hoje, e os três animais que na prova aparecem só desenhados (macaco, girafa e ovelha) vêm com o nome escrito, junto com o desenho da cruzadinha contado em palavras.',
 opts:[
  {t:'A.', no:'A é a letra dos dois cruzamentos, onde GIRAFA e OVELHA terminam. Mas a flecha não aponta o cruzamento: ela aponta o último quadradinho do nome em pé.'},
  {t:'M.', no:'M é a PRIMEIRA letra de MACACO. A flecha está lá embaixo, no sexto quadradinho, e não no primeiro.'},
  {t:'G.', no:'G é o começo de GIRAFA. Mas GIRAFA não pode ficar em pé: o 2º quadradinho dela seria o I, e nenhum dos outros dois nomes termina em I.'},
  {t:'O.', ok:1}
 ],
 dica:'Os três nomes têm 6 letras cada. Teste um de cada vez no lugar em pé: o 2º e o 4º quadradinho dele têm de ser a ÚLTIMA letra dos nomes deitados.',
 truque:'Teste um nome de cada vez no lugar em pé e veja se as letras do cruzamento batem.',
 visual:'<div class="pcs"><span class="pc">M</span><span class="pc hit">A</span><span class="pc">C</span><span class="pc hit">A</span><span class="pc">C</span><span class="pc bad">O</span><span class="arw">&rarr;</span><span class="pc bad">a flecha aponta aqui</span></div>'+
        '<p class="vx">Com MACACO em p&eacute;, os cruzamentos caem em <b>A</b> e <b>A</b>. E GIRAF<b>A</b> e OVELH<b>A</b> terminam em A: fecha.</p>'+
        '<div class="pcs"><span class="pc bad">G I R A F A</span><span class="arw">&rarr;</span><span class="pc bad">o 2&ordm; seria I, e nenhum nome termina em I</span></div>'+
        '<div class="pcs"><span class="pc bad">O V E L H A</span><span class="arw">&rarr;</span><span class="pc bad">o 2&ordm; seria V e o 4&ordm; seria L: n&atilde;o fecha</span></div>',
 porque:'Só MACACO pode ficar em pé: o 2º e o 4º quadradinhos dele são A e A, e GIRAFA e OVELHA terminam em A. A flecha aponta o 6º quadradinho de MACACO, que é o O.',
 proximo:'Teste os três nomes, um de cada vez, antes de responder. E confira bem qual quadradinho a flecha aponta: o primeiro ou o último.'},

{id:'23F2Q5', eixo:'letras', origem:'Olimpíada 2023 · 2ª fase · questão 5',
 pede:'QUE FRASE NÃO CONTÉM NENHUM ERRO DE ESCRITA?',
 nota:'Esta questão é de 2023, quando a prova tinha cinco respostas. Aqui ela está com quatro, como na prova de hoje.',
 opts:[
  {t:'EU E MEU AMIGO ESTUDARAM MUITO PARA A ATIVIDADE DE PORTUGUÊS.', no:'Aqui não tem nenhuma letra trocada, e é por isso que essa é a mais traiçoeira. O erro está em ESTUDARAM: eu e meu amigo somos NÓS, e nós ESTUDAMOS.'},
  {t:'TENHO UMA ESTANTE CHEIA DE LIVROS.', ok:1},
  {t:'EU PASSO MUITO TENPO LENDO.', no:'TENPO está escrito com N, e a gente escreve TEMPO com M: antes de P e de B vem sempre M, nunca N. Essa passa batido porque a boca fala igualzinho.'},
  {t:'NÃO CONSIGO VER O ERROS DESTA FRASE.', no:'ERROS é mais de um, então tem de ser OS ERROS. Falta uma letrinha só, o S do O, e por isso o olho pula.'}
 ],
 dica:'Não procure a frase certa: cace o erro de cada frase, uma por uma. A que sobrar sem erro nenhum é a resposta.',
 truque:'Cace o erro de uma frase de cada vez, até o fim. A que sobrar sem erro nenhum é a resposta.',
 visual:'<p class="vx">EU E MEU AMIGO <b class="bad2">ESTUDARAM</b> <span class="dm">&mdash; n&oacute;s ESTUDAMOS</span></p>'+
        '<p class="vx">EU PASSO MUITO <b class="bad2">TENPO</b> <span class="dm">&mdash; antes de P vem M: TEMPO</span></p>'+
        '<p class="vx">N&Atilde;O CONSIGO VER <b class="bad2">O ERROS</b> <span class="dm">&mdash; s&atilde;o v&aacute;rios: OS ERROS</span></p>'+
        '<p class="vx"><b class="mk">TENHO UMA ESTANTE CHEIA DE LIVROS.</b> <span class="dm">&mdash; sobrou sem erro nenhum</span></p>',
 porque:'As outras três têm um erro cada uma: ESTUDARAM no lugar de ESTUDAMOS, TENPO no lugar de TEMPO e O ERROS no lugar de OS ERROS. TENHO UMA ESTANTE CHEIA DE LIVROS está inteirinha certa.',
 proximo:'Erro nem sempre é letra trocada: às vezes a palavra é que não combina com quem está fazendo aquilo. Leia a frase inteira antes de dar por certa.'},

{id:'23F2Q6', eixo:'intruso', origem:'Olimpíada 2023 · 2ª fase · questão 6',
 pede:'QUE PALAVRA NÃO FAZ PARTE DO GRUPO DE PALAVRAS A SEGUIR?',
 nota:'Esta questão é de 2023, quando a prova tinha cinco respostas. Aqui ela está com quatro, como na prova de hoje.',
 opts:[
  {t:'CALOR.', no:'Calor não é uma coisa que a gente pega na mão, como o fogo, e alguns marcam essa por isso. Mas o grupo não é de coisas: é de quem esquenta. Calor esquenta, então ele fica no grupo.'},
  {t:'QUENTE.', no:'QUENTE também não é uma coisa que se pega, e engana pelo mesmo motivo. Só que quente é justamente esquentar, e é isso que as outras têm de igual.'},
  {t:'FOGO.', no:'Fogo é uma coisa que dá para ver, e as outras duas não são — daí a vontade de marcar. Mas o que junta o grupo é esquentar, e fogo é o que mais esquenta de todos.'},
  {t:'FRESCO.', ok:1}
 ],
 dica:'Pergunte de cada palavra: ela esquenta ou ela esfria? Junte as que fazem a mesma coisa.',
 truque:'O que os outros três têm de igual? Quem não tem isso é o intruso.',
 visual:'<div class="pcs"><span class="pc hit">CALOR</span><span class="pc hit">QUENTE</span><span class="pc hit">FOGO</span><span class="arw">&rarr;</span><span class="pc hit">esquentam</span></div>'+
        '<div class="pcs"><span class="pc bad">FRESCO</span><span class="arw">&rarr;</span><span class="pc bad">esfria</span></div>'+
        '<p class="vx">Um dia fresco &eacute; um dia com um friozinho bom. &Eacute; o contr&aacute;rio de quente.</p>',
 porque:'CALOR, QUENTE e FOGO falam todos de esquentar. FRESCO é o contrário: é o friozinho. Por isso é ele que não pertence ao grupo.',
 proximo:'Não escolha o intruso porque a palavra é diferente das outras no jeito de escrever. Escolha pelo que a palavra QUER DIZER.'},

{id:'23F2Q7', eixo:'buraco', origem:'Olimpíada 2023 · 2ª fase · questão 7',
 pede:'QUE PALAVRA COMPLETA A FRASE A SEGUIR?',
 quadro:'UMA ABELINHA SAIU EM BUSCA DE &Aacute;GUA, <span class="bl">_______</span> ESTAVA COM MUITA SEDE.',
 nota:'Esta questão é de 2023, quando a prova tinha cinco respostas. Aqui ela está com quatro, como na prova de hoje.',
 opts:[
  {t:'MAIS.', no:'MAIS é de quantidade: mais água, mais bolo. Ponha no buraco e leia tudo: "saiu em busca de água, mais estava com muita sede" — a frase não anda.'},
  {t:'PORQUE.', ok:1},
  {t:'MAS.', no:'MAS serve para dizer o contrário do que veio antes. Aqui a segunda parte não briga com a primeira: ela explica por que a abelinha saiu.'},
  {t:'PURQUE.', no:'Essa é a pegadinha da questão: é a palavra certa escrita errada. A gente fala "purque", mas escreve PORQUE, com O.'}
 ],
 dica:'A segunda parte da frase conta o MOTIVO de a abelinha ter saído. E, depois de escolher, olhe bem as letras da palavra.',
 truque:'Ponha cada palavra no buraco e leia a frase inteira, do começo.',
 visual:'<p class="vx">SAIU EM BUSCA DE &Aacute;GUA <span class="mk">PORQUE</span> ESTAVA COM MUITA SEDE <span class="dm">&mdash; a segunda parte explica a primeira</span></p>'+
        '<div class="pcs"><span class="pc hit">P<b>O</b>RQUE</span><span class="arw">&rarr;</span><span class="pc bad">P<b>U</b>RQUE</span></div>'+
        '<p class="vx">A mesma palavra, uma letra trocada. A boca fala com U; o l&aacute;pis escreve com <b>O</b>.</p>',
 porque:'A segunda parte diz o motivo: ela saiu atrás de água porque estava com sede. E a palavra se escreve PORQUE, com O.',
 proximo:'Depois de achar a palavra certa, confira letra por letra se ela está escrita direito. A prova gosta de pôr a mesma palavra escrita errada logo ao lado.'},

{id:'23F2Q8', eixo:'intruso', origem:'Olimpíada 2023 · 2ª fase · questão 8',
 enun:'LEIA O POEMA NA CHÁCARA DO CHICO BOLACHA, DE CECÍLIA MEIRELES:',
 texto:['NA CHÁCARA DO CHICO BOLACHA',
        'O QUE SE PROCURA',
        'NUNCA SE ACHA!',
        'QUANDO CHOVE MUITO,',
        'O CHICO BRINCA DE BARCO,',
        'PORQUE A CHÁCARA VIRA CHARCO.',
        'QUANDO NÃO CHOVE NADA,',
        'CHICO TRABALHA COM A ENXADA',
        'E LOGO SE MACHUCA',
        'E FICA DE MÃO INCHADA.'],
 pede:'PODEMOS TROCAR A PALAVRA SUBLINHADA POR QUAL OUTRA, SEM MUDAR O ENTENDIMENTO DO POEMA?',
 nota:'Esta questão é de 2023, quando a prova tinha cinco respostas: aqui ela está com quatro, como na prova de hoje, e a palavra que na prova aparece sublinhada dentro do poema é CHARCO.',
 opts:[
  {t:'BANHADO.', ok:1},
  {t:'DESERTO.', no:'Deserto é lugar seco, sem nada de água. É o contrário do que o poema conta: choveu muito e o Chico está brincando de barco.'},
  {t:'BURACO.', no:'Charco faz pensar em buraco fundo, e é por isso que essa atrai. Mas buraco não quer dizer cheio de água, e dentro de um buraco não dá para brincar de barco.'},
  {t:'NUVEM.', no:'Nuvem tem tudo a ver com chuva, e é a que mais engana. Só que quem virou charco foi a CHÁCARA, que é o chão. Chão não vira nuvem.'}
 ],
 dica:'Você não precisa saber o que é CHARCO. Duas linhas do poema contam: QUANDO CHOVE MUITO e O CHICO BRINCA DE BARCO.',
 truque:'Tire a palavra velha, ponha a nova, leia a frase de novo. Continua dizendo a mesma coisa?',
 acende:[3,4,5],
 visual:'<p class="vx"><span class="mk">QUANDO CHOVE MUITO</span> ... <span class="mk">O CHICO BRINCA DE BARCO</span> <span class="dm">&mdash; a ch&aacute;cara ficou cheia de &aacute;gua</span></p>'+
        '<p class="vx">A CH&Aacute;CARA VIRA <b class="mk">BANHADO</b> <span class="dm">&mdash; continua dizendo a mesma coisa</span></p>'+
        '<p class="vx">A CH&Aacute;CARA VIRA <b class="bad2">DESERTO</b> <span class="dm">&mdash; deserto &eacute; seco: briga com a chuva</span></p>'+
        '<p class="vx">A CH&Aacute;CARA VIRA <b class="bad2">NUVEM</b> <span class="dm">&mdash; nuvem fica no c&eacute;u, e a ch&aacute;cara &eacute; o ch&atilde;o</span></p>',
 porque:'O poema diz que choveu muito e que o Chico brinca de barco: a chácara ficou coberta de água. BANHADO é justamente o chão encharcado, e a frase continua dizendo a mesma coisa.',
 proximo:'Palavra difícil se descobre pelas linhas de perto. Leia a linha de antes e a de depois antes de escolher.'},

{id:'23F2Q9', eixo:'contar', origem:'Olimpíada 2023 · 2ª fase · questão 9',
 pede:'EM QUAL ITEM ABAIXO AS PALAVRAS, ENTRE SI, NÃO TÊM A MESMA QUANTIDADE DE SÍLABAS?',
 nota:'Esta questão é de 2023, quando a prova tinha cinco respostas. Aqui ela está com quatro, como na prova de hoje.',
 opts:[
  {t:'TELEFONEMA — INDIFERENÇA — MATEMÁTICA — DETERMINAÇÃO.', no:'DETERMINAÇÃO é a mais comprida no papel e faz muita gente marcar este item. Mas bata palma: DE-TER-MI-NA-ÇÃO dá 5, e TE-LE-FO-NE-MA, IN-DI-FE-REN-ÇA e MA-TE-MÁ-TI-CA dão 5 também. Todas iguais.'},
  {t:'VELOCIDADE — SAGACIDADE — SERENIDADE — COMORBIDADE.', no:'COMORBIDADE é uma palavra estranha e dá medo. Mas bata palma nas quatro: VE-LO-CI-DA-DE, SA-GA-CI-DA-DE, SE-RE-NI-DA-DE e CO-MOR-BI-DA-DE dão 5 cada uma. Todas iguais.'},
  {t:'ESPERANÇA — ILUMINAÇÃO — COLABORAÇÃO — TELEVISÃO.', ok:1},
  {t:'RELATIVO — ATIVISTA — MONÓTONO — SUBESTIMAR.', no:'As quatro têm cara de tamanhos diferentes, e é isso que engana. Bata palma: RE-LA-TI-VO, A-TI-VIS-TA, MO-NÓ-TO-NO e SUB-ES-TI-MAR dão 4 cada uma. Todas iguais.'}
 ],
 dica:'A pergunta tem um NÃO: você procura o item em que as palavras são DIFERENTES entre si. Bata palma em cada palavra e escreva o número ao lado.',
 truque:'Pontinho embaixo de cada uma, uma por uma. Só no fim conte os pontinhos.',
 visual:'<div class="pcs"><span class="pc">ES PE RAN &Ccedil;A</span><span class="arw">&rarr;</span><span class="pc bad">4 palmas</span></div>'+
        '<div class="pcs"><span class="pc">I LU MI NA &Ccedil;&Atilde;O</span><span class="arw">&rarr;</span><span class="pc hit">5 palmas</span></div>'+
        '<div class="pcs"><span class="pc">CO LA BO RA &Ccedil;&Atilde;O</span><span class="arw">&rarr;</span><span class="pc hit">5 palmas</span></div>'+
        '<div class="pcs"><span class="pc">TE LE VI S&Atilde;O</span><span class="arw">&rarr;</span><span class="pc bad">4 palmas</span></div>'+
        '<p class="vx">Duas de 4 e duas de 5. S&oacute; nesse item as palavras <b>n&atilde;o</b> t&ecirc;m o mesmo tanto de palmas &mdash; e era isso que a pergunta pedia.</p>',
 porque:'Batendo palma: ES-PE-RAN-ÇA dá 4, I-LU-MI-NA-ÇÃO dá 5, CO-LA-BO-RA-ÇÃO dá 5 e TE-LE-VI-SÃO dá 4. Nos outros itens as quatro palavras dão sempre o mesmo número.',
 proximo:'Nunca escolha pela palavra mais comprida no papel. Bata palma e escreva o número ao lado de cada palavra antes de comparar.'},

{id:'23F2Q10', eixo:'silabas', origem:'Olimpíada 2023 · 2ª fase · questão 10',
 pede:'QUE ALTERNATIVA MOSTRA UMA FRASE FORMADA APENAS PELAS SÍLABAS A SEGUIR?',
 quadro:'<table class="tbc"><tr><td>LA</td><td>&Eacute;</td><td>VI</td><td>A</td><td>DA</td><td>BE</td></tr></table>',
 nota:'Esta questão é de 2023, quando a prova tinha cinco respostas. Aqui ela está com quatro, como na prova de hoje.',
 opts:[
  {t:'A VILA É DA BI.', no:'Essa é a mais perigosa: quase tudo bate. Mas ela pede a peça BI, e no quadro só tem BE. Uma letra de diferença — e o BE ainda fica sobrando na mesa.'},
  {t:'É A VIDA DA VELA.', no:'Essa usa o DA duas vezes, e cada peça vale uma vez só. Ainda pede um VE que não existe no quadro, e deixa o BE parado.'},
  {t:'A BELEZA É DA VILA.', no:'Ela usa as seis peças, é verdade, mas ainda pede LE e ZA, que ninguém deu. Quando a frase precisa de peça a mais, está errada do mesmo jeito.'},
  {t:'A VIDA É BELA.', ok:1}
 ],
 dica:'São seis peças, e todas têm de ser usadas, uma vez cada. Monte a frase de cada alternativa com as peças e veja se sobra ou falta alguma.',
 truque:'Bata palma em cada pedaço. Use TODAS as peças, uma vez cada.',
 visual:'<div class="pcs"><span class="pc">LA</span><span class="pc">&Eacute;</span><span class="pc">VI</span><span class="pc">A</span><span class="pc">DA</span><span class="pc">BE</span><span class="arw">&rarr;</span><span class="pc hit">6 pe&ccedil;as</span></div>'+
        '<div class="pcs"><span class="pc hit">A</span><span class="pc hit">VI</span><span class="pc hit">DA</span><span class="pc hit">&Eacute;</span><span class="pc hit">BE</span><span class="pc hit">LA</span></div>'+
        '<p class="vx">A VIDA &Eacute; BELA gasta as seis, uma vez cada. Nada sobrou, nada faltou.</p>'+
        '<div class="pcs"><span class="pc bad">B<b>I</b></span><span class="arw">&rarr;</span><span class="pc bad">no quadro s&oacute; tem B<b>E</b></span></div>',
 porque:'A VIDA É BELA se monta com A + VI + DA + É + BE + LA: são as seis peças do quadro, uma vez cada, sem sobrar nem faltar.',
 proximo:'Conte as peças do quadro e conte as peças da frase que você escolheu. Os dois números têm de bater, e as peças também.'},

{id:'23F2Q11', eixo:'intruso', origem:'Olimpíada 2023 · 2ª fase · questão 11',
 enun:'LEIA A SEGUIR UM TRECHO DE O PICAPAU AMARELO, DE MONTEIRO LOBATO:',
 quadro:'&mdash; EU SEI O QUE QUER DIZER "ABSTRATO" &mdash; DISSE EM&Iacute;LIA. &mdash; &Eacute; TUDO QUANTO A GENTE N&Atilde;O V&Ecirc;, NEM CHEIRA, NEM OUVE, NEM PROVA, NEM PEGA &mdash; MAS SENTE QUE H&Aacute;.',
 pede:'DE ACORDO COM O QUE A EMÍLIA EXPLICOU, ASSINALE A ALTERNATIVA QUE NÃO TEM ALGO ABSTRATO:',
 nota:'Esta questão é de 2023, quando a prova tinha cinco respostas. Aqui ela está com quatro, como na prova de hoje.',
 opts:[
  {t:'BONDADE.', no:'Bondade ninguém vê, cheira, ouve, prova nem pega: só sente que existe. Pelo que a Emília explicou, ela é abstrata — e a pergunta pede o contrário.'},
  {t:'JUSTIÇA.', no:'Justiça também não se vê nem se pega. Ela passa em todos os testes da Emília, então é abstrata, e não era isso que a pergunta pediu.'},
  {t:'BELEZA.', no:'Essa é a mais escondida: a gente pensa "eu vejo uma pessoa bonita" e acha que está vendo a beleza. O que se vê é a PESSOA; a beleza mesmo você não pega na mão.'},
  {t:'LIVRO.', ok:1}
 ],
 dica:'A Emília deu cinco testes: ver, cheirar, ouvir, provar e pegar. Faça os cinco com cada palavra. E cuidado: a pergunta tem um NÃO.',
 truque:'O que os outros três têm de igual? Quem não tem isso é o intruso.',
 visual:'<div class="pcs"><span class="pc hit">BONDADE</span><span class="pc hit">JUSTI&Ccedil;A</span><span class="pc hit">BELEZA</span><span class="arw">&rarr;</span><span class="pc hit">n&atilde;o d&aacute; para pegar</span></div>'+
        '<div class="pcs"><span class="pc bad">LIVRO</span><span class="arw">&rarr;</span><span class="pc bad">v&ecirc;, cheira e pega</span></div>'+
        '<p class="vx">Livro passa nos cinco testes da Em&iacute;lia. Por isso &eacute; ele que <b>n&atilde;o</b> combina com os outros tr&ecirc;s.</p>',
 porque:'Pela explicação da Emília, abstrato é o que a gente não vê, não cheira, não ouve, não prova e não pega. Livro a gente vê, cheira e pega — então é o único que não é abstrato.',
 proximo:'Quando a pergunta tem NÃO, ponha o dedo em cima do NÃO antes de olhar as respostas. A errada é quase sempre a que seria certa sem ele.'},

{id:'23F2Q12', eixo:'contar', origem:'Olimpíada 2023 · 2ª fase · questão 12',
 enun:'NA ÚLTIMA AULA, A PROFESSORA GERTRUDES RESOLVEU FAZER UMA BRINCADEIRA COM SEUS ALUNOS: ELA COLOCAVA UMA CONTA NO QUADRO E, AO LADO, CINCO FRASES, DEPOIS PEDIA PARA QUE AS CRIANÇAS ADVINHASSEM QUAL DAS FRASES REPRESENTAVA AQUELA CONTA. JÚLIA, UMA ALUNA MUITO ESPERTA, DESCOBRIU A REGRA DO JOGO E ACERTOU AS RESPOSTAS PARA AS QUATRO PRIMEIRAS CONTAS QUE A PROFESSORA PASSOU. VEJA AS RESPOSTAS DE JÚLIA:',
 quadro:'<table class="tbc"><tr><td>CONTA</td><td>FRASE</td></tr>'+
        '<tr><td>2 + 1 + 3 + 3</td><td>HOJE, EU ESTIVE CANSADO.</td></tr>'+
        '<tr><td>2 + 1 + 1 + 2</td><td>MINHA M&Atilde;E &Eacute; LEGAL.</td></tr>'+
        '<tr><td>3 + 1</td><td>ADORO LER!</td></tr>'+
        '<tr><td>2 + 1 + 3 + 2 + 2</td><td>TIVE QUE ACORDAR CEDO ONTEM.</td></tr></table>'+
        '<div class="sep"></div>FINALMENTE, PARA TERMINAR A AULA, A PROFESSORA GERTRUDES PASSOU UMA &Uacute;LTIMA CONTA, PEDINDO QUE SEUS ALUNOS ADVINHASSEM QUE FRASE A REPRESENTAVA:'+
        '<div class="seq">2 + 2 + 1 + 2</div>',
 pede:'DE NOVO, JÚLIA ACERTOU. QUAL DAS CINCO FRASES A SEGUIR ELA ESCOLHEU?',
 nota:'Esta questão é de 2023, quando a prova tinha cinco respostas. Aqui ela está com quatro, como na prova de hoje.',
 opts:[
  {t:'NÃO TENHO CORAGEM PARA RESPONDER.', no:'Conte as palavras antes de bater palma: são cinco, e a conta tem só quatro números. Essa já cai na contagem das palavras.'},
  {t:'ESTA QUESTÃO É DIFÍCIL.', no:'Essa é a armadilha da questão: as três primeiras palavras batem certinho, 2, 2 e 1. Mas DI-FÍ-CIL dá três palmas, e a conta pede 2 no fim. Quem para na terceira palavra marca esta.'},
  {t:'ESTA QUESTÃO É FÁCIL.', ok:1},
  {t:'EU PERDEREI UM PONTO.', no:'São quatro palavras, e isso engana. Mas bata palma: EU dá 1, PER-DE-REI dá 3, UM dá 1 e PON-TO dá 2. Sai 1+3+1+2, e a conta pede 2+2+1+2.'}
 ],
 dica:'Olhe as respostas da Júlia: cada número é o tanto de palmas de uma palavra da frase, na ordem. HO-JE dá 2, EU dá 1, ES-TI-VE dá 3.',
 truque:'Pontinho embaixo de cada uma, uma por uma. Só no fim conte os pontinhos.',
 visual:'<div class="pcs"><span class="pc">HO JE</span><span class="pc">EU</span><span class="pc">ES TI VE</span><span class="pc">CAN SA DO</span><span class="arw">&rarr;</span><span class="pc hit">2 + 1 + 3 + 3</span></div>'+
        '<p class="vx">Cada n&uacute;mero &eacute; o tanto de palmas de UMA palavra, na ordem em que ela aparece.</p>'+
        '<div class="pcs"><span class="pc hit">ES TA</span><span class="pc hit">QUES T&Atilde;O</span><span class="pc hit">&Eacute;</span><span class="pc hit">F&Aacute; CIL</span><span class="arw">&rarr;</span><span class="pc hit">2 + 2 + 1 + 2</span></div>'+
        '<div class="pcs"><span class="pc">ES TA</span><span class="pc">QUES T&Atilde;O</span><span class="pc">&Eacute;</span><span class="pc bad">DI F&Iacute; CIL</span><span class="arw">&rarr;</span><span class="pc bad">2 + 2 + 1 + <b>3</b></span></div>',
 porque:'A regra da brincadeira é: cada número conta as palmas de uma palavra, na ordem. Para 2+2+1+2 serve ES-TA (2), QUES-TÃO (2), É (1) e FÁ-CIL (2) — ESTA QUESTÃO É FÁCIL.',
 proximo:'Descubra a regra nos exemplos ANTES de olhar as respostas. E vá até a última palavra: duas frases podem começar iguaizinhas e mudar só no fim.'},

{id:'23F2Q13', eixo:'ler', origem:'Olimpíada 2023 · 2ª fase · questão 13',
 enun:'HELENA KOLODY GOSTAVA DE ESCREVER PEQUENAS POESIAS. VEJA UMA DELAS:',
 texto:['QUEM É ESSA',
        'QUE ME OLHA',
        'DE TÃO LONGE,',
        'COM OLHOS QUE FORAM MEUS?'],
 pede:'PENSE SOBRE O PEQUENO POEMA ACIMA E RESPONDA: QUE NOME HELENA KOLODY DEU A ELE?',
 nota:'Esta questão é de 2023, quando a prova tinha cinco respostas. Aqui ela está com quatro, como na prova de hoje.',
 opts:[
  {t:'RETRATO ANTIGO.', ok:1},
  {t:'OLHANDO PARA O FUTURO.', no:'O poema olha para trás, não para a frente: os olhos FORAM meus quer dizer que isso já passou.'},
  {t:'TOTALMENTE DESCONHECIDA.', no:'QUEM É ESSA soa mesmo como não conhecer ninguém, e por isso essa engana muito. Mas a última linha entrega: os olhos FORAM dela. Quem ela vê é ela mesma, de um tempo antigo.'},
  {t:'BELOS OLHOS.', no:'OLHOS é palavra que está no poema, e a mão vai nela. Só que o poema não diz que os olhos são bonitos: diz que eles FORAM dela.'}
 ],
 dica:'Leia com a régua a última linha: COM OLHOS QUE FORAM MEUS. FORAM quer dizer que já passou. Quem será que ela está vendo?',
 truque:'A resposta mora no texto. Volte com a régua e ache a linha que responde.',
 acende:[2,3],
 visual:'<p class="vx">COM OLHOS QUE <b class="mk">FORAM</b> MEUS <span class="dm">&mdash; FORAM &eacute; coisa que j&aacute; passou</span></p>'+
        '<p class="vx"><span class="mk">DE T&Atilde;O LONGE</span> <span class="dm">&mdash; longe no tempo, e n&atilde;o longe daqui</span></p>'+
        '<div class="pcs"><span class="pc hit">RETRATO ANTIGO</span><span class="arw">&rarr;</span><span class="pc hit">ela se v&ecirc; numa foto de muito tempo atr&aacute;s</span></div>',
 porque:'A última linha diz COM OLHOS QUE FORAM MEUS: os olhos já foram dela, então ela está se vendo como era antigamente. Isso é um retrato antigo.',
 proximo:'Uma palavrinha só pode mudar tudo. Olhe se o texto está falando de agora ou de uma coisa que já passou.'},

{id:'23F2Q14', eixo:'ler', origem:'Olimpíada 2023 · 2ª fase · questão 14',
 enun:'LEIA A FÁBULA A SEGUIR:',
 texto:['O SAPO E O ESCORPIÃO',
        'À BEIRA DO RIO OPEZUDIS, UM SAPO E UM ESCORPIÃO SE ENCONTRARAM:',
        '— SAPO, O SENHOR PODERIA ME AJUDAR A ATRAVESSAR ESTE GRANDE RIO.',
        '— E COMO FARÍAMOS ISSO, SENHOR ESCORPIÃO?',
        '— ORA, COLOQUE-ME NAS SUAS COSTAS E NADE ATÉ A OUTRA MARGEM.',
        '— MEU AMIGO ESCORPIÃO, NÃO POSSO FAZER ISSO, POIS, SE O FIZER, O SENHOR ME PICARÁ NO MEIO DA TRAVESSIA, E ACABARÍAMOS MORTOS.',
        '— ISSO NÃO FAZ SENTIDO, SENHOR SAPO, SE EU O PICAR, MORREREI AFOGADO. NÃO QUERO MORRER, POIS TENHO OS MEUS NEGÓCIOS, A MINHA FAMÍLIA.',
        '— ESTÁ BEM, VAMOS ENTÃO ATRAVESSAR, SUBA NAS MINHAS COSTAS.',
        'O SAPO PULOU NA ÁGUA COM O ESCORPIÃO NAS COSTAS E INICIARAM A TRAVESSIA. NA METADE DO CAMINHO, PORÉM, O SAPO SENTIU UMA PROFUNDA E DOLOROSA FERROADA. TRISTE PELA CERTEZA DE QUE MORRERIA, PERGUNTOU AO ESCORPIÃO:',
        '— POR QUE FEZ ISSO, AMIGO ESCORPIÃO?',
        'MAS ANTES QUE O ESCORPIÃO RESPONDESSE, AMBOS AFUNDARAM E NUNCA MAIS FORAM VISTOS.'],
 pede:'SE HOUVESSE TEMPO, QUAL DAS RESPOSTAS ABAIXO O ESCORPIÃO PODERIA TER DADO AO SAPO?',
 nota:'Esta questão é de 2023, quando a prova tinha cinco respostas. Aqui ela está com quatro, como na prova de hoje.',
 opts:[
  {t:'O SENHOR ME TRATOU MUITO MAL, SAPO, POR ISSO O PIQUEI.', no:'Volte com a régua e procure: em nenhuma linha o sapo trata mal o escorpião. Ele foi educado o tempo todo e ainda deu carona.'},
  {t:'NADA ME IMPORTA NA VIDA, SENHOR SAPO, POR ISSO PUDE FERROÁ-LO, MESMO SABENDO QUE MORRERIA JUNTO.', no:'Essa é a mais perigosa, porque a parte do morrer junto foi mesmo o que aconteceu. Mas o próprio escorpião tinha dito que NÃO QUERIA MORRER, porque tinha os negócios dele e a família. Então não é verdade que nada lhe importa.'},
  {t:'DEI-LHE MINHA PICADA MORTAL, PORQUE SENTI QUE O SENHOR ESTAVA ME AMEAÇANDO.', no:'O sapo não ameaçou ninguém: ele só avisou que tinha medo da picada. Essa resposta inventa uma coisa que o texto não conta.'},
  {t:'HÁ COISAS QUE NÃO PODEMOS MUDAR, SENHOR SAPO, É DA MINHA NATUREZA FAZER O QUE FIZ.', ok:1}
 ],
 dica:'O escorpião picou sabendo que ia morrer junto. Procure a resposta que combina com isso E com o que ele mesmo tinha dito antes de subir nas costas do sapo.',
 truque:'A resposta mora no texto. Volte com a régua e ache a linha que responde.',
 acende:[6,8],
 visual:'<p class="vx"><span class="mk">N&Atilde;O QUERO MORRER, POIS TENHO OS MEUS NEG&Oacute;CIOS, A MINHA FAM&Iacute;LIA</span> <span class="dm">&mdash; ele disse isso antes de subir</span></p>'+
        '<p class="vx"><span class="mk">O SAPO SENTIU UMA PROFUNDA E DOLOROSA FERROADA</span> <span class="dm">&mdash; e mesmo assim ele picou</span></p>'+
        '<div class="pcs"><span class="pc hit">&Eacute; DA MINHA NATUREZA</span><span class="arw">&rarr;</span><span class="pc hit">ele picou sem conseguir evitar</span></div>'+
        '<div class="pcs"><span class="pc bad">NADA ME IMPORTA NA VIDA</span><span class="arw">&rarr;</span><span class="pc bad">briga com os neg&oacute;cios e a fam&iacute;lia</span></div>',
 porque:'O escorpião não queria morrer: ele mesmo falou dos negócios e da família. Mesmo assim picou o sapo no meio do rio. A única resposta que cabe é a que diz que ele não conseguiu evitar, porque é da natureza dele.',
 proximo:'Quando a pergunta é sobre o motivo de um bicho da história, confira se a resposta briga com alguma coisa que ele já tinha dito antes.'},

{id:'23F2Q15', eixo:'codigo', origem:'Olimpíada 2023 · 2ª fase · questão 15',
 enun:'OPEZINO DECIDIU ESCREVER DE UM JEITO SÓ DELE, TROCANDO AS LETRAS DAS PALAVRAS. VEJA ABAIXO UM QUADRO, EM QUE ESTÃO ALGUMAS PALAVRAS E O MODO COMO OPEZINO AS ESCREVE:',
 quadro:'<table class="tbc"><tr><td>ESCRITA NORMAL</td><td>ESCRITA DO OPEZINO</td></tr>'+
        '<tr><td>VIRTUDE</td><td>RAVDETU</td></tr>'+
        '<tr><td>MARGARIDA</td><td>GIVMIVATI</td></tr>'+
        '<tr><td>BELEZA</td><td>ZUPUBI</td></tr>'+
        '<tr><td>SERPENTE</td><td>NUVLUSDU</td></tr>'+
        '<tr><td>OLHO</td><td>YPJY</td></tr></table>'+
        '<div class="sep"></div>VEJA AGORA UMA FRASE QUE O MENINO ESCREVEU:'+
        '<div class="seq">I P&Aacute;SMEI LYVDEMEUNI &Uacute; GIVIRAPJYNI!</div>',
 pede:'COM BASE NISSO, PODEMOS DIZER QUE ELE:',
 nota:'Esta questão é de 2023, quando a prova tinha cinco respostas. Aqui ela está com quatro, como na prova de hoje.',
 opts:[
  {t:'ACHA A PROFESSORA DE PORTUGUÊS LEGAL.', no:'A frase tem quatro pedaços e essa resposta também, mas nenhum pedaço bate. O segundo pedaço, PÁSMEI, vira LÍNGUA — não vira PROFESSORA.'},
  {t:'ACHA A LÍNGUA PORTUGUESA DESASTROSA.', no:'O começo está certinho: A LÍNGUA PORTUGUESA. Quem decifra os dois primeiros pedaços e desiste do resto marca esta. O último pedaço não diz DESASTROSA.'},
  {t:'ACHA A PROFESSORA DE PORTUGUÊS MARAVILHOSA.', no:'Essa acerta a última palavra, MARAVILHOSA, e erra todo o resto. É a pegadinha para quem decifra só o fim e chuta o começo.'},
  {t:'ACHA A LÍNGUA PORTUGUESA MARAVILHOSA.', ok:1}
 ],
 dica:'Ache as parceiras das letras comparando OLHO com YPJY e BELEZA com ZUPUBI. Depois decifre uma letra de cada vez, sem pular nenhuma.',
 truque:'Um símbolo de cada vez: dedo no símbolo, dedo na tabela, escreva a peça. Junte só no fim.',
 visual:'<div class="pcs"><span class="pc">O</span><span class="arw">&harr;</span><span class="pc">Y</span><span class="pc">L</span><span class="arw">&harr;</span><span class="pc">P</span><span class="pc">H</span><span class="arw">&harr;</span><span class="pc">J</span></div>'+
        '<p class="vx">OLHO virou YPJY: cada letra tem uma parceira fixa, e a troca vale nos dois sentidos.</p>'+
        '<div class="pcs"><span class="pc hit">I</span><span class="arw">&rarr;</span><span class="pc hit">A</span><span class="pc hit">P&Aacute;SMEI</span><span class="arw">&rarr;</span><span class="pc hit">L&Iacute;NGUA</span></div>'+
        '<div class="pcs"><span class="pc hit">LYVDEMEUNI</span><span class="arw">&rarr;</span><span class="pc hit">PORTUGUESA</span><span class="pc hit">&Uacute;</span><span class="arw">&rarr;</span><span class="pc hit">&Eacute;</span></div>'+
        '<div class="pcs"><span class="pc hit">GIVIRAPJYNI</span><span class="arw">&rarr;</span><span class="pc hit">MARAVILHOSA</span></div>'+
        '<p class="vx">A frase inteira &eacute;: <b>A L&Iacute;NGUA PORTUGUESA &Eacute; MARAVILHOSA!</b></p>',
 porque:'Comparando as palavras do quadro, cada letra tem uma parceira fixa: A com I, E com U, O com Y, L com P, H com J, R com V, G com M, S com N, D com T e B com Z. Decifrando a frase inteira sai A LÍNGUA PORTUGUESA É MARAVILHOSA.',
 proximo:'Nunca chute o resto do código porque decifrou um pedaço. Vá até a última letra com o dedo.'},
