R=[
("try{ say((ok?'Yes! ':'Not quite. ')+(q.item.ex||'')); }catch(e){}","try{ say((ok?'Isso! ':'Quase! ')+(q.item.ex||'')); }catch(e){}"),
("G.toast('You found a lost page! ('+n+' of '+E.length+')',2600,'Você achou uma página perdida! ('+n+' de '+E.length+')');","G.toast('Você recuperou uma carta de fonte! ('+n+' de '+E.length+')',2600);"),
("c.fillText(q.i<q.itens.length-1?'Next ▶':'Done ▶',0,1);","c.fillText(q.i<q.itens.length-1?'Próxima ▶':'Pronto ▶',0,1);"),
("var en=resp?((ok?'Yes! ':(q.escolha<0?'Time is up! ':'Not quite! '))+(it.ex||'')):it.p;","var en=resp?((ok?'Isso! ':(q.escolha<0?'Acabou o tempo! ':'Quase! '))+(it.ex||'')):it.p;"),
("var pt=resp?((ok?'Isso! ':(q.escolha<0?'Acabou o tempo! ':'Quase! '))+(it.ex_pt||'')):(it.p_pt||'');","var pt='';"),
("var dl=quebra(c,'Hint: '+d,bw-28);","var dl=quebra(c,'Dica: '+d,bw-28);"),
("try{ say(q.item.dica_en||''); }catch(e){}","try{ say(q.item.dica||''); }catch(e){}"),
]
