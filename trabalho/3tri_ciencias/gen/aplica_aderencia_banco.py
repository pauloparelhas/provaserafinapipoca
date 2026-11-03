# Aplica o resultado do detector de alucinacao ao banco: REPROVA com correcao troca o item; EXCLUIR (e d09, pergunta forcada) sai do lente.
import json,glob
B='trabalho/3tri_ciencias/banco/';R=json.load(open('trabalho/3tri_ciencias/avaliacao/aderencia_banco_resultado.json',encoding='utf-8'))
rep={r['id']:r for r in R if r['decisao']=='REPROVA'}
fora={k for k,r in rep.items() if r.get('correcao')=='EXCLUIR'}|{'d09'}
lente=json.load(open(B+'_lente.json',encoding='utf-8'))
for k in lente: lente[k]=[i for i in lente[k] if i not in fora]
json.dump(lente,open(B+'_lente.json','w',encoding='utf-8'),ensure_ascii=False,indent=1)
livro='trabalho/3tri_ciencias/_avaliacao_questoes.json';L=json.load(open(livro,encoding='utf-8'))
for f in glob.glob(B+'T*.json'):
    it=json.load(open(f,encoding='utf-8'));mud=0
    for i in it:
        r=rep.get(i['id'])
        if r and i['id'] not in fora and isinstance(r.get('correcao'),dict):
            for k,v in r['correcao'].items():
                if k in ('p','p_pt','o','o_pt','ex','ex_pt','dica','dica_en'): i[k]=v
            assert len(i['o'])==len(i['o_pt']),i['id']; L[i['id']]={'decisao':'APROVA'};mud+=1;print('corrigido',i['id'])
    json.dump(it,open(f,'w',encoding='utf-8'),ensure_ascii=False,indent=1)
json.dump(L,open(livro,'w',encoding='utf-8'),ensure_ascii=False,indent=1)
print('fora',sorted(fora),'total',sum(len(v) for v in lente.values()))
