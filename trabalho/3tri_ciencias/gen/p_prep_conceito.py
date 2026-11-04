# Paulo 03/11: (1) sala e mapa da escola minusculos no simulado -> cada questao mostra o RECORTE ampliado da parte
# que ela pergunta (recorta, nunca redesenha); (2) preposicoes com figuras novas (bola + mesa/caixa/casa, passaro +
# arvore): o mesmo par muda de lugar e so a posicao muda, para entender a ideia em vez de decorar o slide.
# Teto de 100 questoes: saem do lente 8 repetidas da sala/estante (continuam guardadas em banco/).
import json,os
from PIL import Image
R=os.path.abspath(os.path.join(os.path.dirname(__file__),'..','..','..'))
M=os.path.join(R,'ferramentas','media','cie3');B=os.path.join(R,'trabalho','3tri_ciencias','banco')
def corta(src,nome,box,esc=2):
    im=Image.open(os.path.join(M,src)).convert('RGB').crop(box)
    if esc!=1: im=im.resize((int(im.width*esc),int(im.height*esc)),Image.LANCZOS)
    im.save(os.path.join(M,nome),quality=90); return 'media/cie3/'+nome
RC={'a38':(220,30,480,215),'a42':(0,100,230,315),'a43':(250,255,520,430),'a47':(160,160,610,440),'x08':(590,280,744,444),'x09':(0,0,230,110)}
MC={'d01':(40,300,845,705),'d02':(40,300,845,705),'d03':(40,300,845,705),'d13':(370,290,870,570),'d14':(40,290,870,600)}
img={}
for k,b in RC.items(): img[k]=corta('room.jpg','room-'+k+'.jpg',b,2.2 if (b[2]-b[0])<300 else 1.6)
for k,b in MC.items(): img[k]=corta('map-school.jpg','map-'+k+'.jpg',b,1.2 if (b[2]-b[0])>700 else 1.5)
n=0
for f in sorted(os.listdir(B)):
    if not (f.startswith('T') and f.endswith('.json')): continue
    p=os.path.join(B,f);a=json.load(open(p,encoding='utf-8'));m=0
    for it in a:
        if it['id'] in img: it['img']=img[it['id']];m+=1;n+=1
    if m: open(p,'w',encoding='utf-8',newline='\n').write(json.dumps(a,ensure_ascii=False,indent=1)+'\n')
assert n==len(img),n
def I(id,cena,obj,o,o_pt,ex,ex_pt,dica_en,dica,at):
    return {'id':id,'tema':'position','tipo':'rapida','at':[at],'p':'Where is the '+obj+'?','p_pt':'Onde está '+('a bola' if obj=='ball' else 'o pássaro')+'?',
            'o':o,'o_pt':o_pt,'dica':dica,'dica_en':dica_en,'ex':ex,'ex_pt':ex_pt,'img':'media/cie3/cena-'+cena+'.png','c':0}
N=[I('c01','on','ball',['on the table','under the table','next to the table'],['sobre a mesa','embaixo da mesa','ao lado da mesa'],'The ball touches the top of the table: on.','A bola encosta em cima da mesa: on.','Is the ball at the top or at the bottom?','A bola está em cima ou embaixo?','A2'),
   I('c02','under','ball',['under the table','on the table','next to the table'],['embaixo da mesa','sobre a mesa','ao lado da mesa'],'The table is over the ball: the ball is under it.','A mesa está por cima da bola: a bola está embaixo.','Is the ball at the top or at the bottom?','A bola está em cima ou embaixo?','A3'),
   I('c03','in','ball',['in the box','under the box','next to the box'],['dentro da caixa','embaixo da caixa','ao lado da caixa'],'The box is open and the ball is inside it: in.','A caixa está aberta e a bola está dentro: in.','Look at the open box.','Olhe a caixa aberta.','A1'),
   I('c04','behind','ball',['behind the box','in front of the box','in the box'],['atrás da caixa','na frente da caixa','dentro da caixa'],'The box hides part of the ball: the ball is behind the box.','A caixa esconde parte da bola: a bola está atrás.','Can you see all of the ball?','Dá para ver a bola inteira?','A4'),
   I('c05','front','ball',['in front of the box','behind the box','in the box'],['na frente da caixa','atrás da caixa','dentro da caixa'],'Nothing hides the ball. It covers part of the box: in front of.','Nada esconde a bola; ela cobre parte da caixa: na frente.','Can you see all of the ball?','Dá para ver a bola inteira?','A5'),
   I('c06','next','ball',['next to the box','in the box','behind the box'],['ao lado da caixa','dentro da caixa','atrás da caixa'],'The ball is right beside the box: next to.','A bola está bem do lado da caixa: next to.','Is the ball inside, beside or hidden?','A bola está dentro, do lado ou escondida?','A7'),
   I('c07','between','ball',['between the two boxes','in the box','behind the boxes'],['entre as duas caixas','dentro da caixa','atrás das caixas'],'There is a box on each side of the ball: between.','Tem uma caixa de cada lado da bola: between.','How many boxes are next to the ball?','Quantas caixas estão do lado da bola?','A6'),
   I('c08','above','bird',['above the tree','under the tree','in the tree'],['acima da árvore','embaixo da árvore','na árvore'],'The bird is up in the sky, higher than the tree: above.','O pássaro está no céu, mais alto que a árvore: above.','Is the bird higher or lower than the tree?','O pássaro está mais alto ou mais baixo que a árvore?','A10'),
   I('c09','near','ball',['near the house','far from the house','in the house'],['perto da casa','longe da casa','dentro da casa'],'The ball is close to the house: near.','A bola está pertinho da casa: near.','Is the ball close or far?','A bola está perto ou longe?','A8'),
   I('c10','far','ball',['far from the house','near the house','in the house'],['longe da casa','perto da casa','dentro da casa'],'The ball is a long way from the house: far from.','A bola está bem longe da casa: far from.','Is the ball close or far?','A bola está perto ou longe?','A9')]
open(os.path.join(B,'T9_prep_conceito.json'),'w',encoding='utf-8',newline='\n').write(json.dumps(N,ensure_ascii=False,indent=1)+'\n')
lf=os.path.join(B,'_lente.json');L=json.load(open(lf,encoding='utf-8'))
for k in ['a41','a46','a48','a50','a51','x10','a32','a34']: L['position'].remove(k)
L['position']+= [x['id'] for x in N]
open(lf,'w',encoding='utf-8',newline='\n').write(json.dumps(L,ensure_ascii=False,indent=1)+'\n')
print('ok', sum(len(v) for v in L.values()))
