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

def ginasio():
    """ginásio: trampolins (molas), traves altas e argolas (plataformas), nenhum perigo grave"""
    m = Mapa(150)
    m.p(2, 9, 'U')
    m.p(9, 9, 'S'); m.faixa(11, 15, 5, '='); m.faixa(11, 15, 4, 'o')
    m.faixa(18, 22, 7, '=')
    m.p(26, 9, 'c'); m.praca(29)
    m.p(50, 9, 'S'); m.faixa(52, 55, 4, '='); m.faixa(52, 55, 3, 'o'); m.faixa(58, 61, 6, '='); m.buraco(63, 2)
    m.p(67, 9, 'i'); m.p(71, 9, 'S'); m.faixa(73, 76, 5, '=')
    m.p(78, 9, 'c'); m.praca(81)
    m.faixa(102, 104, 7, '='); m.faixa(106, 108, 5, '='); m.faixa(110, 112, 7, '='); m.buraco(105, 3)
    m.p(114, 9, 'i'); m.p(116, 9, 'c'); m.praca(119)
    m.faixa(141, 144, 7, 'o'); m.p(146, 9, 'F')
    return m

def biscoito():
    """a roda do biscoito: a fase COMEÇA e TERMINA no prato com o biscoito (é uma circle story)"""
    m = Mapa(150)
    m.p(2, 9, 'U')
    m.faixa(6, 9, 7, '='); m.faixa(6, 9, 6, 'o')                 # o prato com o biscoito (início)
    m.faixa(13, 16, 5, '='); m.faixa(19, 22, 7, '=')
    m.p(25, 9, 'c'); m.praca(28)
    m.bloco(49, 50, 7, 9); m.faixa(52, 55, 5, '='); m.p(58, 9, 'i'); m.buraco(61, 3)
    m.faixa(65, 68, 6, '='); m.faixa(65, 68, 5, 'o')
    m.p(72, 9, 'c'); m.praca(75)
    m.bloco(96, 97, 7, 9); m.faixa(99, 101, 5, '='); m.p(104, 9, 'i'); m.buraco(107, 3); m.p(112, 9, 'i')
    m.p(115, 9, 'c'); m.praca(118)
    m.faixa(140, 143, 7, '='); m.faixa(140, 143, 6, 'o')         # o mesmo prato com biscoito (fim)
    m.p(146, 9, 'F')
    return m

def castelo():
    """sala do Conde Rabisco: uma tela só; ele fica na sacada (direita), o herói desvia da tinta em baixo"""
    m = Mapa(22)
    m.p(2, 9, 'U')
    m.bloco(17, 21, 6, 9)                                        # sacada do Conde (alta: o herói não sobe)
    m.faixa(4, 6, 7, '='); m.faixa(10, 12, 7, '=')               # 18/10: prateleiras BAIXAS (3 tiles): um pulo alcança o tinteiro
    return m

# v2 (Game Design v2): os reinos já portados vêm do arquivo da proposta, que tem o portão de encaixe próprio
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import gen_mapas_v2_proposta as V2
def sub_generico(var=0):
    """submundo curto (porão, toca, vestiário, armário): entra pelo cano 1, a 3ª entrada D, um perigo, sai pelo cano 2"""
    m = V2.Mapa(28)
    for r in (0, 1): m.fx(0, 27, r, '#')
    m.bloco(0, 1, 2, 9); m.bloco(26, 27, 2, 9)
    m.fx(3, 4, 8, '1'); m.p(8, 9, 'i'); m.fx(9, 12, 7, '='); m.fx(9, 12, 6, 'o')
    m.p(15, 9, 'D')
    if var == 1: m.p(19, 9, 'e')
    else: m.p(18, 9, '^'); m.p(19, 9, '^'); m.fx(17, 20, 7, '=')
    m.fx(23, 24, 8, '2')
    return m
def parede_inteira(m):
    """a parede de espinheiro/migalhas é % de cima a baixo (a estrela quebra a parede toda)"""
    for c in range(m.w):
        for r in range(12):
            if m.g[r][c] == '%':
                rr = r + 1
                while rr < 10 and m.g[rr][c] == '#': m.g[rr][c] = '%'; rr += 1
    # 17/10: sem saco de estrelas: cada reino tem o seu poder (ING3_jogo_poderes.js) e a parede de 2 tiles se pula
    return m
def estadio_v2():
    m = V2.estadio()
    m.p(55, 9, 'S')   # irrigador-mola colado no gol: é por ele que se sobe no travessão
    return m
def recife_v2():
    """18/10: sem espinhos no fundo (teste das criancas-robo: 82 quedas). fundo do mar: nado livre; águas-vivas em fila fora de fase, baiacus, ouriços, correntes, navio afundado"""
    m = V2.Mapa(150)
    m.fx(14, 18, 7, 'o')                                  # mergulho calmo: moedas, nada de perigo nem pergunta
    m.p(20, 9, 'c')
    for k, c in enumerate((26, 34)): m.p(c, 7, 'j')   # águas-vivas espaçadas (eram 4 coladas: o teste das crianças-robo morria ali)
    m.fx(24, 38, 9, ' ')
    m.fx(40, 42, 4, 'o'); m.p(44, 9, 'c')
    m.p(52, 6, '<'); m.p(58, 6, '<'); m.p(55, 8, 'p'); m.fx(53, 57, 3, 'o')   # corrente contrária + baiacu
    m.p(64, 9, 'i')
    m.p(48, 9, 'D')                                        # D1: baú, depois do 1º trecho (imersão antes das perguntas)
    m.p(68, 9, 'c'); m.p(71, 9, 'D')                       # D2
    m.fx(76, 77, 8, '1'); m.p(81, 7, 'j'); m.p(85, 7, 'j'); m.p(89, 8, 'p')
    m.bloco(92, 94, 2, 5)                                  # rocha pendurada
    m.p(100, 5, '>'); m.p(103, 8, 'p'); m.p(106, 9, 'c')
    m.fx(109, 110, 8, '2'); m.p(114, 7, 'j'); m.p(118, 9, 'e')
    m.p(128, 9, 'c'); m.p(135, 9, 'E'); m.fx(140, 143, 6, 'o'); m.p(147, 9, 'F')
    return praia(m)
def praia(m, n=4, larg=12):
    """recife: o herói começa FORA d'água, na praia (Paulo); 4 linhas de céu em cima;
    pega a roupa de mergulho (d) e só então mergulha."""
    ceu = [[' '] * m.w for _ in range(n)]
    m.g = ceu + m.g
    for r in range(n - 1, len(m.g)):
        for c in range(larg): m.g[r][c] = '#'
    m.p(4, n - 2, 'U'); m.p(8, n - 2, 'd'); m.fx(5, 6, n - 3, 'o')
    return m
def ceu_v2():
    """céu: voo com capa; nuvens de tempestade com raio avisado, vento para baixo, corvos; chão só nas nuvens"""
    m = V2.Mapa(160)
    for c in range(26, 160): m.g[10][c] = m.g[11][c] = ' '
    m.p(5, 9, 'U'); m.fx(7, 9, 7, 'o'); m.p(15, 9, 'A')    # começa ANDANDO; a capa no caminho: só depois dela se voa
    m.fx(19, 22, 6, 'o')
    m.fx(29, 33, 5, '#'); m.fx(29, 33, 4, 'o'); m.p(36, 2, 'g')
    m.fx(38, 50, 10, '#'); m.fx(38, 50, 11, '#'); m.p(39, 9, 'c'); m.p(44, 9, 'D')
    m.p(54, 1, 'Z'); m.p(60, 5, '~'); m.p(64, 3, 'g'); m.p(68, 1, 'Z'); m.fx(66, 69, 7, '#')
    m.fx(74, 77, 4, '#'); m.fx(74, 77, 3, 'o'); m.p(80, 5, '~'); m.p(84, 2, 'g'); m.fx(82, 85, 8, '#')
    m.fx(90, 101, 10, '#'); m.fx(90, 101, 11, '#'); m.p(91, 9, 'c'); m.fx(94, 95, 8, '1'); m.fx(98, 99, 8, '2')
    m.p(106, 1, 'Z'); m.p(110, 5, '~'); m.p(114, 3, 'g'); m.p(118, 1, 'Z'); m.fx(116, 119, 6, '#'); m.fx(116, 119, 5, 'o')
    m.p(124, 4, 'g'); m.p(128, 1, 'Z'); m.fx(126, 129, 8, '#')
    m.fx(133, 159, 10, '#'); m.fx(133, 159, 11, '#'); m.p(134, 9, 'c'); m.p(146, 9, 'E'); m.p(157, 9, 'F')
    m.p(101, 9, 'D')                                       # D3 (era no começo): no fim da 2ª nuvem grande
    return m
MAPAS = {1: (V2.vila(), V2.vila_sub()), 2: (parede_inteira(V2.bosque()), sub_generico(1)), 4: (recife_v2(), sub_generico(1)), 5: (ceu_v2(), sub_generico(0)), 6: (V2.ginasio(), sub_generico(0)),
         7: (estadio_v2(), sub_generico(1)), 8: (parede_inteira(V2.biscoito()), sub_generico(0)), 9: castelo()}
js = ['/* ING3_jogo_mapas.js — GERADO por trabalho/3tri_ingles/gen/gen_mapas.py. Não editar à mão. */', 'window.MAPAS = {']
for k, m in MAPAS.items():
    main, sub = (m if isinstance(m, tuple) else (m, None))
    js.append('  %d:{%smain:[' % (k, 'sup:4, ' if k == 4 else ''))
    js.append(',\n'.join("    '" + r + "'" for r in main.rows()))
    if sub:
        js.append('  ], sub:[')
        js.append(',\n'.join("    '" + r + "'" for r in sub.rows()))
    js.append('  ]},')
js.append('};')
open(OUT, 'w', encoding='utf-8').write('\n'.join(js) + '\n')
print('ok', {k: (m[0].w if isinstance(m, tuple) else m.w) for k, m in MAPAS.items()})
