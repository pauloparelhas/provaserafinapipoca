# Paulo 03/11: preposicoes com figuras NOVAS (nao as do slide), para a crianca entender a ideia e nao decorar
# "a maca esta no livro". Mesmo par de objetos (bola + mesa/caixa) mudando de lugar = so a POSICAO muda.
# So as preposicoes do material (A1..A13 do _roteiro.md). Desenho vetorial deterministico -> PNG.
# Uso: python gen_prep_cenas.py   (grava ferramentas/media/cie3/cena-*.png e as .svg ficam em trabalho/.../figuras/cenas/)
import os,subprocess,sys
from playwright.sync_api import sync_playwright
R=os.path.abspath(os.path.join(os.path.dirname(__file__),'..','..','..'))
OUT=os.path.join(R,'ferramentas','media','cie3');SV=os.path.join(R,'trabalho','3tri_ciencias','figuras','cenas');os.makedirs(SV,exist_ok=True)
W,H=480,300
DEFS='''<defs>
<radialGradient id="gb" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#ff8a80"/><stop offset=".55" stop-color="#e53935"/><stop offset="1" stop-color="#9b1c1c"/></radialGradient>
<linearGradient id="gw" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#c58b52"/><stop offset="1" stop-color="#8d5a2b"/></linearGradient>
<linearGradient id="gc" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#e0b47a"/><stop offset="1" stop-color="#b8834a"/></linearGradient>
<linearGradient id="gs" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#cfeeff"/><stop offset="1" stop-color="#f4fbff"/></linearGradient>
</defs>'''
def fundo(): return f'<rect width="{W}" height="{H}" fill="url(#gs)"/><rect y="236" width="{W}" height="64" fill="#cfe9b5"/><line x1="0" y1="236" x2="{W}" y2="236" stroke="#9cc77e" stroke-width="3"/>'
def bola(cx,cy,r=26): return f'<ellipse cx="{cx}" cy="{cy+r+3}" rx="{r*.8}" ry="4" fill="#000" opacity=".12"/><circle cx="{cx}" cy="{cy}" r="{r}" fill="url(#gb)" stroke="#5b0f0f" stroke-width="3"/><circle cx="{cx-r*.35}" cy="{cy-r*.4}" r="{r*.18}" fill="#fff" opacity=".6"/>'
def mesa(x=150,y=150,w=180):
    return (f'<rect x="{x+12}" y="{y+16}" width="14" height="{236-y-16}" rx="3" fill="#7a4a20" stroke="#4a2a0e" stroke-width="3"/>'
            f'<rect x="{x+w-26}" y="{y+16}" width="14" height="{236-y-16}" rx="3" fill="#7a4a20" stroke="#4a2a0e" stroke-width="3"/>'
            f'<rect x="{x}" y="{y}" width="{w}" height="20" rx="5" fill="url(#gw)" stroke="#4a2a0e" stroke-width="3"/>')
def caixa(x,y=150,w=120,h=86,aberta=False):
    s=f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="4" fill="url(#gc)" stroke="#6b4420" stroke-width="3"/><line x1="{x+w/2}" y1="{y}" x2="{x+w/2}" y2="{y+h}" stroke="#a87a44" stroke-width="3"/>'
    if aberta: s+=f'<path d="M{x} {y} l-26 -26 l{w*.45} 0 l26 26 z" fill="#d9a868" stroke="#6b4420" stroke-width="3"/><path d="M{x+w} {y} l26 -26 l-{w*.45} 0 l-26 26 z" fill="#d9a868" stroke="#6b4420" stroke-width="3"/>'
    return s
def casa(x,y=120):
    return (f'<rect x="{x}" y="{y}" width="120" height="{236-y}" fill="#ffe08a" stroke="#7a5a10" stroke-width="3"/>'
            f'<path d="M{x-14} {y} L{x+60} {y-62} L{x+134} {y} Z" fill="#e05a47" stroke="#7a2318" stroke-width="3"/>'
            f'<rect x="{x+46}" y="{y+56}" width="30" height="{236-y-56}" fill="#8d5a2b" stroke="#4a2a0e" stroke-width="3"/>'
            f'<rect x="{x+14}" y="{y+22}" width="26" height="24" fill="#bfe3ff" stroke="#4a6a8a" stroke-width="3"/><rect x="{x+82}" y="{y+22}" width="26" height="24" fill="#bfe3ff" stroke="#4a6a8a" stroke-width="3"/>')
def arvore(x,y=236):
    return (f'<rect x="{x-9}" y="{y-70}" width="18" height="70" fill="#8d5a2b" stroke="#4a2a0e" stroke-width="3"/>'
            f'<circle cx="{x}" cy="{y-100}" r="46" fill="#4caf50" stroke="#24632a" stroke-width="3"/><circle cx="{x-16}" cy="{y-112}" r="12" fill="#7bd17f" opacity=".7"/>')
def passaro(x,y):
    return (f'<ellipse cx="{x}" cy="{y}" rx="22" ry="15" fill="#3b82f6" stroke="#1e3a8a" stroke-width="3"/><circle cx="{x+20}" cy="{y-8}" r="10" fill="#3b82f6" stroke="#1e3a8a" stroke-width="3"/>'
            f'<path d="M{x+29} {y-9} l10 3 l-10 4 z" fill="#f59e0b" stroke="#92400e" stroke-width="2"/><circle cx="{x+22}" cy="{y-10}" r="2.5" fill="#111"/>'
            f'<path d="M{x-6} {y-4} q-14 -26 -30 -16 q10 12 30 22" fill="#60a5fa" stroke="#1e3a8a" stroke-width="3"/>')
C={
 'cena-on':     mesa()+bola(240,124),
 'cena-under':  mesa()+bola(240,208),
 'cena-in':     caixa(180,150,120,86,True)+'',  # bola aparece por cima da borda (dentro)
 'cena-behind': bola(300,206,30)+caixa(180,150,120,86),
 'cena-front':  caixa(180,150,120,86)+bola(240,218,30),
 'cena-next':   caixa(150)+bola(320,208,30),
 'cena-between':caixa(70,150,100,86)+bola(240,208,30)+caixa(310,150,100,86),
 'cena-above':  arvore(240)+passaro(232,40),
 'cena-near':   casa(150)+bola(300,208,24),
 'cena-far':    casa(40)+bola(430,208,24),
}
# dentro da caixa: a bola desenhada antes da frente da caixa, saindo pela abertura
C['cena-in']=bola(240,140,30)+caixa(180,150,120,86,True)
with sync_playwright() as p:
    b=p.chromium.launch();t=b.new_page(viewport={'width':W,'height':H},device_scale_factor=2)
    for k,v in C.items():
        svg=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">{DEFS}{fundo()}{v}</svg>'
        open(os.path.join(SV,k+'.svg'),'w',encoding='utf-8').write(svg)
        t.set_content(f'<html><body style="margin:0">{svg}</body></html>');t.screenshot(path=os.path.join(OUT,k+'.png'),clip={'x':0,'y':0,'width':W,'height':H})
        print(k)
    b.close()
