# PROPOSTA de mapas v2 (GAME_DESIGN_v2.md). NAO gera o jogo: imprime os mapas
# ASCII e roda os portoes de encaixe. O loop principal porta isto para gen_mapas.py
# quando os tiles novos existirem no parser/motor.
# Fisica medida em ING3_jogo_motor.js: GRAV 1900, VPULO -760 (sobe 152 px = 3,4 tiles),
# VAND 270 (pulo correndo ~216 px = 4,8 tiles), VMOLA -1150 (sobe ~348 px = 7,7 tiles).
# Legenda (antiga): # solido  = plataforma fina  f cai  m movel(→, 3 tiles)  n movel(↕)
#   S mola  ^ espinho  W agua  B tijolo  o/O moeda  c checkpoint  F bandeira  U inicio
#   H maca(cresce)  A capa  J bota(pulo duplo)  P ovo do Pip  i mancha de tinta  g corvo de tinta(voa)
#   1-4 cano (par com o submundo)  K barril/bola rolando (←)  v gota/bolota que cai  C canhao (←)
# Legenda NOVA (v2):
#   D  ENTRADA do ambiente de questoes (porta/bau/arca; 2 tiles de altura)
#   Y  saco de estrelas (3 tiros do poder global)     e  bicho espinhento (nao se pisa: tiro ou desvio)
#   l  cipo/corda (ancora; o heroi pendura 3 tiles abaixo e balanca)  R  argolas (mesma mecanica, arte de ginastica)
#   X  barra (agarra e gira; PULAR solta)   L  trave (plataforma fina estreita, arte de trave)
#   V  trampolim de salto (impulso para frente: vx 520, vy -950)
#   t  bloco do ritmo grupo A   u  bloco do ritmo grupo B (alternam a cada 2 batidas, 100 bpm)
#   %  parede de espinheiro/migalha (so o PODER do reino quebra)   s  zagueiro de tinta (avisa e desliza)
#   E  mini-chefe do reino      &  item da historia (reino 8, ordem fixa nos dados)
import sys
H = 12
SOLID = set('#B%')
THIN = set('=fLtumn')

class Mapa:
    def __init__(s, w, chao=True):
        s.w = w; s.g = [[' '] * w for _ in range(H)]
        if chao:
            for c in range(w): s.g[10][c] = s.g[11][c] = '#'
    def p(s, c, r, ch): s.g[r][c] = ch
    def fx(s, c0, c1, r, ch):
        for c in range(c0, c1 + 1): s.g[r][c] = ch
    def buraco(s, c0, n, ch=' '):
        assert n <= 3, ('buraco > 3', c0, n)
        for c in range(c0, c0 + n): s.g[10][c] = s.g[11][c] = ch
    def bloco(s, c0, c1, r0, r1):
        for r in range(r0, r1 + 1):
            for c in range(c0, c1 + 1): s.g[r][c] = '#'
    def rows(s): return [''.join(l) for l in s.g]

EXCECOES = {'6 Gym': [(103, 118, 'fosso do solo no ritmo: travessia garantida pelos blocos t/u, 1 tile de vao')]}
def portao(nome, m):
    """encaixe do heroi grande (110 px): sobre toda superficie, 3 linhas livres de
    solido grosso e 2 livres de plataforma fina; buraco no chao <= 3 tiles."""
    g = m.g; erros = []
    for c in range(m.w):
        for r in range(1, H):
            ch = g[r][c]
            if (ch in SOLID or ch in THIN) and g[r-1][c] not in SOLID and g[r-1][c] not in THIN:
                for k in (1, 2, 3):
                    rr = r - k
                    if rr < 0: break
                    a = g[rr][c]
                    if a in SOLID or (a in THIN and k < 3):
                        erros.append('%s: superficie (%d,%d) %r com %r %d linha(s) acima' % (nome, c, r, ch, a, k))
    n = 0
    for c in range(m.w + 1):
        vazio = c < m.w and g[10][c] in ' W'
        if vazio: n += 1
        else:
            ex = any(a <= c - 1 <= b for a, b, _ in EXCECOES.get(nome, []))
            if n > 3 and not ex: erros.append('%s: buraco de %d tiles terminando em %d' % (nome, n, c))
            n = 0
    return erros

def conta(m):
    t = ''.join(m.rows())
    k = lambda s: sum(t.count(x) for x in s)
    buracos = 0; dentro = False
    for c in range(m.w):
        v = m.g[10][c] in ' W'
        if v and not dentro: buracos += 1
        dentro = v
    return dict(buracos=buracos, inimigos=k('igesE'), espinhos=k('^'), quedas=k('v'), rolantes=k('KC'),
                moveis=k('mn'), caem=sum(1 for r in m.rows() for i, ch in enumerate(r) if ch == 'f' and (i == 0 or r[i-1] != 'f')),
                aparelhos=k('lRXV'), ritmo=k('tu'), paredes=k('%'), molas=k('S'), entradas=k('D'), checkpoints=k('c'))

# ---------------- 1. Once Upon a Time Village ----------------
def vila():
    m = Mapa(132)
    m.p(5, 9, 'U'); m.fx(6, 8, 8, 'o')
    m.fx(10, 13, 7, '='); m.fx(10, 13, 6, 'o')            # toldo da feira = telhado da barraca do sapateiro
    m.p(11, 9, '*')                                      # PODER do reino: Botas de Sete Leguas na barraca (antes do D1)
    m.p(16, 9, 'D')                                      # D1: casa do contador de historias (cedo, sem perigo)
    m.p(20, 9, 'S'); m.fx(21, 24, 4, '='); m.p(23, 3, 'O')  # monte de feno = mola; telhado com moeda grande
    m.p(27, 9, 'c')
    m.p(41, 9, 'i')                                      # 1a mancha: pisar (longe do riacho: regra R2)
    m.buraco(34, 3, 'W')                                 # riacho
    m.fx(38, 40, 7, '=')
    m.fx(43, 45, 6, 'B'); m.p(44, 5, 'o')                # tijolos com moeda
    m.p(47, 6, 'g')                                      # corvo de tinta em onda
    m.p(53, 9, 'i'); m.p(56, 9, 'e')                     # 1o espinhento: so tiro ou pulo por cima
    m.p(60, 9, 'c')
    m.p(63, 9, 'D')                                      # D2: padaria
    m.fx(66, 68, 7, '='); m.p(67, 6, 'O')                # plataforma de apoio para o muro (com ou sem botas)
    m.bloco(71, 72, 7, 9)                                # muro de 3 tiles: um pulo normal passa (as botas so ajudam)
    m.fx(73, 78, 6, '#'); m.fx(74, 77, 5, 'o')           # muralha (telhados) — superficie linha 6
    m.p(80, 3, 'v'); m.p(82, 3, 'v')                     # telhas que caem quando passa embaixo
    m.buraco(84, 3); m.fx(84, 86, 8, 'f')                # telhas que caem sobre buraco
    m.buraco(90, 2); m.p(88, 6, 'g')                     # ilha de 3 tiles entre os buracos (regra R1)
    m.p(94, 9, 'c')
    m.fx(97, 98, 8, '1')                                 # poco = cano para o porao (D3 no submundo)
    m.p(103, 9, 'H')
    m.bloco(105, 105, 9, 9); m.bloco(106, 106, 8, 9)  # rampa do castelo (barris sairam: rolavam logo antes do fosso, regra R2)
    m.fx(107, 108, 6, 'o')
    m.p(109, 9, 'c')
    m.buraco(113, 3, 'W'); m.p(114, 8, 'm')              # fosso com ponte levadica (movel)
    m.p(120, 9, 'E')                                     # Grande Mancha (mini-chefe)
    m.fx(100, 101, 8, '2')                               # saida do porao (cano 2)
    m.p(129, 9, 'F')
    return m

def vila_sub():
    m = Mapa(28)
    for r in (0, 1): m.fx(0, 27, r, '#')
    m.bloco(0, 1, 2, 9); m.bloco(26, 27, 2, 9)
    m.fx(3, 4, 8, '1'); m.p(8, 9, 'i'); m.fx(9, 12, 7, '='); m.fx(9, 12, 6, 'o')
    m.p(15, 9, 'D')                                      # D3: porao do castelo
    m.p(18, 9, '^'); m.p(19, 9, '^'); m.fx(17, 20, 7, '=')
    m.fx(23, 24, 8, '2')
    return m

# ---------------- 2. Enchanted Forest ----------------
def bosque():
    m = Mapa(134)
    m.p(4, 9, 'U'); m.p(7, 9, 'P')                       # ovo do Pip: montaria (planar)
    m.fx(9, 12, 7, '='); m.fx(9, 12, 6, 'o')
    m.p(15, 9, 'D')                                      # D1: arvore oca da fada madrinha
    m.p(19, 9, 'c')
    m.buraco(22, 3); m.p(23, 2, 'l')                     # 1o cipo: balancar sobre a ravina
    m.p(28, 9, 'i'); m.p(30, 3, 'v'); m.p(32, 3, 'v')    # bolotas caem quando passa
    m.buraco(34, 3); m.buraco(40, 3); m.p(35, 2, 'l'); m.p(41, 2, 'l')  # ravina dupla: 2 cipos, com chao de 3 tiles no meio (regra R1)
    m.p(47, 9, 'e')
    m.p(50, 9, 'c')
    m.fx(53, 54, 8, '%'); m.bloco(53, 54, 9, 9)          # espinheiro BAIXO (2 tiles): pula-se por cima ou queima com a estrela (Paulo: nada intransponivel)
    m.p(57, 9, 'D')                                      # D2: casa da coruja
    m.p(60, 9, 'T')                                      # troncos rolando
    m.fx(62, 64, 7, '='); m.fx(66, 68, 5, '=') ; m.p(67, 4, 'O')
    m.p(70, 9, 'S'); m.fx(72, 75, 3, '='); m.p(74, 2, 'o')
    m.p(78, 9, 'i'); m.p(80, 6, 'g'); m.p(83, 9, 'e')
    m.p(86, 9, 'c')
    m.buraco(89, 3); m.p(90, 7, 'm')                     # folha-plataforma que vai e volta
    m.buraco(95, 3); m.fx(95, 97, 8, 'f')
    m.fx(100, 101, 8, '1')                               # toca do coelho = cano (D3 no submundo)
    m.p(104, 9, 'c')
    m.buraco(106, 3); m.p(107, 2, 'l'); m.buraco(112, 3); m.p(113, 2, 'l')  # gran-final: cipo, cipo, com 3 tiles de chao no meio
    m.fx(115, 116, 8, '%'); m.bloco(115, 116, 9, 9)      # espinheiro baixo (pula ou queima)
    m.p(120, 9, 'E')                                     # Ogro de tinta (mini-chefe comico)
    m.fx(102, 103, 8, '2')
    m.p(130, 9, 'F')
    return m

# ---------------- 6. Rhythm Gym ----------------
def ginasio():
    m = Mapa(136)
    m.p(5, 9, 'U'); m.fx(6, 9, 8, 'o')                   # 18/10: sem poder no ginasio (o giz nao interagia com a fase)
    m.p(11, 9, 'S'); m.fx(13, 16, 4, '='); m.fx(13, 16, 3, 'o')   # trampolim
    m.p(19, 9, 'D')                                      # D1: vestiario
    m.p(23, 9, 'c')
    m.fx(26, 37, 7, 'L'); m.p(30, 6, 'o'); m.p(34, 6, 'o') # TRAVE longa (linha 7) sobre fosso de espuma
    # 18/10: sem fosso de espuma sob a trave (as criancas-robo caiam e voltavam sem parar)
    m.g[10][30] = m.g[11][30] = '#'; m.g[10][34] = m.g[11][34] = '#'
    m.p(32, 6, 'i')                                      # mancha rolando NA trave
    m.p(41, 9, 'c')
    m.p(44, 2, 'R'); m.p(48, 2, 'R'); m.p(52, 2, 'R')  # ARGOLAS sobre o tapete (sem fosso)
    m.g[10][46] = m.g[11][46] = '#'; m.g[10][50] = m.g[11][50] = '#'
    m.p(56, 9, 'D')                                      # D2: mesa dos juizes
    m.p(60, 9, 'c')
    m.p(63, 6, 'X'); m.p(66, 4, 'X')                     # BARRAS ASSIMETRICAS: baixa (6) -> alta (4), perto uma da outra
    m.fx(70, 75, 4, '='); m.fx(70, 75, 3, 'o')           # pouso alto
    m.p(73, 9, 'e'); m.p(77, 9, 'i')
    m.p(80, 9, 'c')
    m.p(86, 9, 'V'); m.bloco(89, 93, 6, 9); m.p(91, 5, 'O')  # SALTO: trampolim perto da mesa (4 tiles), parapeito alto
    m.fx(95, 96, 8, '1')                                 # alcapao (D3 no submundo: sala de aquecimento)
    m.p(99, 9, 'c')
    for k, c in enumerate(range(103, 118, 3)): m.fx(c, c + 1, 7, 't' if k % 2 == 0 else 'u'); m.p(c, 6, 'o')  # SOLO NO RITMO (2 grupos)
    # 18/10 (teste das criancas-robo: 80 quedas): sem fosso de espuma aqui; os blocos do ritmo viram caminho de moedas
    m.p(124, 9, 'E')                                     # mini-chefe: Mancha Malabarista (3 bolas no ritmo)
    m.fx(97, 98, 8, '2')
    m.p(132, 9, 'F')
    return m

# ---------------- 7. Cause & Effect Stadium (aventura 2D) ----------------
def estadio():
    m = Mapa(140)
    m.p(5, 9, 'U')
    m.fx(6, 9, 7, '='); m.fx(12, 15, 7, '=')             # bancos do vestiario
    m.p(10, 9, '*')                                      # PODER do reino: rack de bolas (chutar)
    m.p(18, 9, 'D')                                      # D1: marca do penalti 1
    m.p(22, 9, 'c')
    m.p(26, 9, 'C')                                      # maquina de bolas (atira para a esquerda)
    m.p(30, 9, 's'); m.p(36, 9, 's')                     # zagueiros que deslizam (avisam 0,6 s)
    m.p(39, 9, 'S'); m.fx(40, 43, 4, '='); m.p(42, 3, 'O')  # irrigador = mola
    # 18/10: a poca logo depois do irrigador-mola derrubava sempre (teste das criancas-robo): saiu
    m.p(50, 9, 'c')
    m.p(53, 9, 'D')                                      # D2: marca do penalti 2
    m.bloco(57, 57, 4, 9); m.fx(58, 63, 4, '=')          # trave do gol (travessao) como plataforma
    m.bloco(64, 64, 4, 9)
    m.p(60, 9, 'i'); m.p(61, 9, 'S')                     # rede do gol = mola
    m.p(67, 9, 'c')
    # ARQUIBANCADA: degraus + a OLA (moveis verticais em fila, fora de fase)
    for c, r in ((70, 7), (73, 6), (76, 6), (79, 5), (82, 5)): m.p(c, r, 'n')  # a OLA: sobem/descem fora de fase
    m.p(76, 9, 'i'); m.p(84, 9, 'e')
    m.bloco(86, 90, 7, 9); m.fx(87, 89, 6, 'o')          # camarote de 3 tiles (era 6: as criancas-robo travavam)
    m.p(95, 9, 'c')
    m.fx(97, 98, 8, '1')                                 # tunel = cano (D3 no submundo: vestiario dos juizes)
    m.p(103, 9, 's'); m.p(106, 9, 'C'); m.p(109, 9, 's')
    # 18/10: a poca com carrinho saiu (vinha logo depois da maquina e do zagueiro: regra R2)
    m.p(118, 9, 'c')
    m.p(124, 9, 'E')                                     # Goleiro-Mancha: chutar a bola nele 3x (abre os bracos)
    m.fx(100, 101, 8, '2')
    m.p(136, 9, 'F')                                     # bandeirinha de escanteio = fim
    return m

# ---------------- 8. The Cookie Circle ----------------
def biscoito():
    m = Mapa(132)
    m.p(4, 9, 'U')
    m.p(6, 9, '&'); m.p(10, 9, '&')                       # mesa do cafe: biscoito e o copo de leite COM o canudo (o PODER: esguicho de leite)
    m.p(15, 9, 'D')                                      # D1: porta da geladeira
    m.p(21, 9, 'c')
    m.p(24, 9, 'i'); m.p(27, 3, 'v'); m.p(29, 3, 'v')    # gotas da TORNEIRA (desenhada no armario)
    m.p(38, 9, 'q')                                      # Chef de Tinta: joga pratos do escorredor (aviso antes)
    m.p(43, 9, 'c')                                      # 16/10 (jogador): checkpoint antes do buraco da pia
    m.buraco(46, 2)                                      # buraco pequeno, longe do Chef (regra R2)
    m.fx(45, 47, 7, '='); m.p(46, 6, '&')                # guardanapo no porta-guardanapos do balcao
    m.p(50, 9, 'c')
    m.buraco(53, 2); m.buraco(59, 1)                     # vao da pia em duas partes com ilha LARGA (55-58; 16/10 jogador: era 55-57 e exigia pulo exato)
    m.p(60, 9, 'D')                                      # D2: forno
    m.p(63, 9, '&')                                      # espelho na comoda
    m.p(66, 9, '&')                                      # tesoura na caneca
    m.fx(69, 72, 4, '='); m.p(70, 3, 'O')
    m.p(68, 9, 'S')                                      # torradeira = mola
    m.p(75, 9, 'c')
    m.p(78, 9, '&')                                      # vassoura encostada na parede
    m.fx(81, 82, 8, '%'); m.bloco(81, 82, 9, 9)          # monte de migalhas BAIXO: pula ou varre com a vassoura
    m.p(85, 9, 'i'); m.p(87, 6, 'g'); m.p(90, 9, 'e')
    m.fx(93, 94, 8, '1')                                 # gaveta = cano (D3 no submundo: armario)
    m.p(97, 9, 'c')
    m.p(101, 7, 'n')                                     # prateleira da geladeira que sobe e desce
    m.fx(104, 108, 5, '='); m.p(106, 4, '&')             # fita adesiva na prateleira (abaixo do HUD; conserta a ponte)
    m.buraco(114, 3)                                     # ponte quebrada (a fita conserta; da para pular)
    m.p(119, 9, 'E')                                     # Mancha Rolo-de-massa
    m.fx(95, 96, 8, '2')
    m.p(127, 9, '&')                                     # o MESMO biscoito na mesma mesa do cafe (fecha o circulo)
    m.p(130, 9, 'F')
    return m

MAPAS = [('1 Village', vila()), ('1 Village submundo', vila_sub()), ('2 Forest', bosque()),
         ('6 Gym', ginasio()), ('7 Stadium', estadio()), ('8 Cookie', biscoito())]
if __name__ == '__main__':
    tudo = []
    for nome, m in MAPAS:
        print('### ' + nome + '  ' + str(conta(m)))
        print('\n'.join("    '" + r + "'" for r in m.rows()))
        tudo += portao(nome, m)
    print('PORTAO:', 'OK' if not tudo else '\n'.join(tudo))
