# Recorta (nunca redesenha) as figuras dos slides da escola para ferramentas/media/cie3/.
import os,sys
from PIL import Image
SRC=sys.argv[1]; DST=sys.argv[2]
ORIG={'p01':'mapa','p02':'corpo-mao','p03':'sala','p04':'preposicoes','p05':'objetos','p06':'push-pull','p07':'perspectiva','p08':'agua-vento'}
for k,n in ORIG.items():
    im=Image.open(f'{SRC}/{k}.jpeg').convert('RGB'); im.save(f'{DST}/orig/{n}.jpg',quality=88)
    print(k,n,im.size)
C={}
xs=[(26,348),(370,688),(712,1038)]
rows=[(345,528),(675,852),(1005,1165),(1315,1512)]
names=[['in','on','under'],['behind','in-front-of','between'],['next-to','near','far-from'],['above','below','inside']]
for r,row in enumerate(names):
    for c,n in enumerate(row): C[f'prep-{n}']=('p04',(xs[c][0],rows[r][0],xs[c][1],rows[r][1]))
top=[('bounce',[('soccer-ball',20,190),('tennis-ball',195,362),('basketball',368,543)]),('fly',[('airplane',560,725),('balloon',730,897),('kite',902,1062)]),('roll',[('wheel',1076,1240),('can',1245,1410),('beach-ball',1415,1582)])]
bot=[('slide',[('slide',20,192),('ice-cube',197,368),('book',372,543)]),('spin',[('pinwheel',557,718),('fan',724,900),('top',906,1062)]),('swing',[('swing',1076,1238),('plant',1242,1412),('door',1416,1582)])]
for g,(y0,y1) in ((top,(235,418)),(bot,(638,825))):
    for m,l in g:
        for n,a,b in l: C[f'obj-{m}-{n}']=('p05',(a,y0,b,y1))
for n,b in {'push-bike':(26,258,396,545),'push-box':(412,258,778,545),'push-door':(26,565,396,866),'push-ball':(412,565,778,866),'pull-rope':(828,258,1202,545),'pull-wagon':(1218,258,1577,545),'pull-drawer':(828,565,1202,866),'pull-fish':(1218,565,1577,866)}.items(): C[n]=('p06',b)
for n,b in {'view-front':(600,222,960,492),'view-top':(981,224,1553,482),'view-side':(478,559,960,824),'view-bottom':(981,559,1553,820),'view-shadow':(22,92,362,386),'view-giraffe':(22,420,362,876)}.items(): C[n]=('p07',b)
for n,b in {'help-water-plants':(32,350,406,560),'help-water-energy':(424,350,792,560),'help-wind-energy':(38,630,406,860),'help-wind-seeds':(424,630,792,860),'harm-tsunami':(826,350,1196,560),'harm-floods':(1218,350,1570,560),'harm-tornado':(826,630,1200,860),'harm-winds':(1216,630,1570,860)}.items(): C[n]=('p08',b)
C['map-school']=('p01',(992,260,1582,880))
C['room']=('p03',(20,40,392,262))
for n,(k,b) in C.items():
    im=Image.open(f'{SRC}/{k}.jpeg').convert('RGB').crop(b)
    if n in('room',): im=im.resize((im.width*2,im.height*2),Image.LANCZOS)
    if n=='map-school': im=im.resize((int(im.width*1.5),int(im.height*1.5)),Image.LANCZOS)
    im.save(f'{DST}/{n}.jpg',quality=85)
print(len(C),'recortes')
# prova visual: folha de contato
fs=sorted(C); W=8; T=170
sh=Image.new('RGB',(W*T,(len(fs)//W+1)*T),'white')
for i,n in enumerate(fs):
    im=Image.open(f'{DST}/{n}.jpg'); im.thumbnail((T-6,T-6)); sh.paste(im,(i%W*T+3,i//W*T+3))
sh.save(sys.argv[3]); print(fs)
