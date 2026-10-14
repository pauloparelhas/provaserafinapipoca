# Gera ferramentas/ING3_jogo_mapas.js: os reinos desenhados em tiles (12 linhas,
# chão nas linhas 10-11). Cada reino é montado por coordenadas (coluna, linha)
# para não errar alinhamento. Regras (JOGO_SPEC.md): buraco <= 3 tiles; depois
# de cada Q, 19 tiles de chão plano e livre (praça das placas); nenhum perigo
# antes do 1º checkpoint; caixa/plataforma nunca a 1-3 linhas de outra coisa
# sólida acima (o herói grande tem 110 px).
import sys, os
OUT = sys.argv[1]

class Mapa:
    def __init__(s, w):
        s.w = w; s.g = [[' '] * w for _ in range(12)]
        for c in range(w): s.g[10][c] = s.g[11][c] = '#'
    def p(s, c, r, ch):
        s.g[r][c] = ch
    def faixa(s, c0, c1, r, ch):
        for c in range(c0, c1 + 1): s.g[r][c] = ch
    def buraco(s, c0, n):
        assert n <= 3
        for c in range(c0, c0 + n): s.g[10][c] = s.g[11][c] = ' '
    def bloco(s, c0, c1, r0, r1):
        for r in range(r0, r1 + 1):
            for c in range(c0, c1 + 1): s.g[r][c] = '#'
    def praca(s, c):
        """morador em c; 19 tiles livres depois dele"""
        s.p(c, 9, 'Q')
        for cc in range(c + 1, c + 20):
            for r in range(0, 10): assert s.g[r][cc] in ' o', ('praca ocupada', c, cc, r, s.g[r][cc])
            assert s.g[10][cc] == '#', ('praca com buraco', cc)
    def rows(s): return [''.join(l) for l in s.g]

def vila():
    m = Mapa(140)
    m.p(2, 9, 'U')
    m.faixa(6, 10, 7, 'o')                       # moedas no caminho
    m.faixa(12, 15, 7, '=');  m.p(13, 6, 'H')    # maçã mágica numa plataforma baixa
    m.faixa(17, 19, 5, 'o')
    m.p(23, 9, 'c')
    m.praca(26)                                  # 1º morador
    m.buraco(47, 2)
    m.faixa(50, 53, 7, '='); m.faixa(50, 53, 6, 'o')
    m.p(57, 9, 'i')                              # 1ª manchinha de tinta
    m.faixa(60, 62, 6, 'B')
    m.p(64, 9, 'c')
    m.praca(67)                                  # 2º morador
    m.buraco(88, 3)
    m.faixa(92, 95, 7, '='); m.faixa(97, 100, 5, '='); m.faixa(97, 100, 4, 'o')
    m.p(99, 9, 'S')
    m.p(103, 9, 'i')
    m.buraco(106, 2)
    m.p(110, 9, 'c')
    m.praca(113)                                 # 3º morador
    m.faixa(134, 136, 7, 'o')
    m.p(137, 9, 'F')
    return m

def bosque():
    m = Mapa(150)
    m.p(2, 9, 'U')
    m.p(7, 9, 'P')                               # ovo do Pip: montaria
    m.faixa(11, 14, 6, 'o')
    m.faixa(16, 19, 7, '='); m.faixa(21, 24, 5, '='); m.faixa(21, 24, 4, 'o')
    m.p(27, 9, 'c')
    m.praca(30)                                  # fada madrinha
    m.buraco(51, 3)
    m.faixa(55, 57, 8, '='); m.faixa(59, 61, 6, '='); m.faixa(63, 66, 4, '='); m.faixa(63, 66, 3, 'o')
    m.buraco(58, 3)
    m.p(68, 9, 'i'); m.p(73, 9, 'i')
    m.p(76, 9, 'c')
    m.praca(79)                                  # coruja
    m.buraco(100, 3)
    m.faixa(104, 106, 7, 'm')                    # plataforma que vai e volta
    m.p(105, 6, 'o'); m.p(106, 6, 'o')
    m.buraco(110, 3)
    m.p(116, 9, 'i')
    m.p(119, 9, 'c')
    m.praca(122)                                 # fada madrinha de novo
    m.faixa(144, 146, 7, 'o')
    m.p(147, 9, 'F')
    return m

def recife():
    """fundo do mar: nada-se livre; corais (plataformas) e manchas de tinta no fundo"""
    m = Mapa(150)
    m.p(2, 9, 'U')
    m.faixa(8, 12, 6, 'o'); m.faixa(14, 16, 7, '='); m.faixa(19, 22, 4, 'o')
    m.p(26, 9, 'c')
    m.praca(29)
    m.bloco(50, 51, 6, 9); m.faixa(53, 56, 3, 'o')               # rocha alta: nadar por cima
    m.p(60, 9, 'i'); m.faixa(63, 66, 6, '='); m.p(70, 9, 'i')
    m.bloco(73, 74, 7, 9)
    m.p(77, 9, 'c')
    m.praca(80)
    m.bloco(101, 103, 2, 5)                                      # rocha pendurada: passar por baixo ou por cima
    m.faixa(106, 109, 7, 'o'); m.p(111, 9, 'i')
    m.p(117, 9, 'c')
    m.praca(120)
    m.faixa(142, 145, 6, 'o'); m.p(147, 9, 'F')
    return m

def ceu():
    """céu: voo livre com a capa; nuvens sólidas (#) e muitos buracos; cair = volta ao checkpoint"""
    m = Mapa(160)
    for c in range(18, 160): m.g[10][c] = m.g[11][c] = ' '     # sem chão depois do começo
    m.p(2, 9, 'U'); m.p(9, 8, 'A')                               # a capa logo no começo
    m.faixa(20, 24, 7, '#'); m.faixa(20, 24, 6, 'o')
    m.faixa(29, 33, 5, '#'); m.faixa(29, 33, 4, 'o')
    m.faixa(38, 61, 10, '#'); m.faixa(38, 61, 11, '#')            # nuvem grande: praça 1
    m.p(39, 9, 'c'); m.praca(41)
    m.faixa(66, 69, 6, '#'); m.faixa(74, 77, 3, '#'); m.faixa(74, 77, 2, 'o'); m.faixa(82, 85, 7, '#')
    m.faixa(90, 113, 10, '#'); m.faixa(90, 113, 11, '#')          # praça 2
    m.p(91, 9, 'c'); m.praca(93)
    m.faixa(118, 121, 5, '#'); m.faixa(118, 121, 4, 'o'); m.faixa(126, 129, 8, '#')
    m.faixa(133, 159, 10, '#'); m.faixa(133, 159, 11, '#')        # praça 3 e fim
    m.p(134, 9, 'c'); m.praca(136)
    m.p(157, 9, 'F')
    return m

MAPAS = {1: vila(), 2: bosque(), 4: recife(), 5: ceu()}
js = ['/* ING3_jogo_mapas.js — GERADO por trabalho/3tri_ingles/gen/gen_mapas.py. Não editar à mão. */', 'window.MAPAS = {']
for k, m in MAPAS.items():
    js.append('  %d:{main:[' % k)
    js.append(',\n'.join("    '" + r + "'" for r in m.rows()))
    js.append('  ]},')
js.append('};')
open(OUT, 'w', encoding='utf-8').write('\n'.join(js) + '\n')
print('ok', {k: m.w for k, m in MAPAS.items()})
