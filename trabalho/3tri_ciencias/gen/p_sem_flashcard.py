import re
L='ferramentas/CIE3_estudo_licoes.js';s=open(L,encoding='utf-8').read().replace('\r\n','\n')
i=s.index("{tipo:'revela', tit:'What the video adds'");j=re.compile(r"\n ?\{tipo:").search(s,i+5).start()
novo="""{tipo:'texto', tit:'What wind and water do',
  fala:'Wind is air in motion. Wind moves sand and makes dunes. It fills the sails of boats and turns wind turbines. Water is always moving. Rivers flow downhill. Water wears rock away. Water makes energy, carries boats and waters the fields.',
  html:caixa('Wind'+tr('Vento'),'<p>Wind is <b>air in motion</b>.'+tr('Vento é ar em movimento.')+'<br>It moves <b>sand</b> and makes <b>dunes</b>.'+tr('Move a areia e faz dunas.')+'<br>It fills <b>sails</b> and turns <b>wind turbines</b>.'+tr('Enche as velas e gira as turbinas.')+'</p>')+esp()+
   caixa('Water'+tr('Água'),'<p>Water is <b>always moving</b>. Rivers flow <b>downhill</b>.'+tr('A água está sempre em movimento. Os rios descem.')+'<br>It wears <b>rock</b> away.'+tr('Desgasta a pedra.')+'<br>It makes <b>energy</b>, carries <b>boats</b> and waters the <b>fields</b>.'+tr('Faz energia, leva barcos e rega os campos.')+'</p>')},"""
s=s[:i]+novo+s[j:]
s=s.replace("tit:'Forces in the video'","tit:'More examples'")
s=re.sub(r"(fala:')[^']*in the video[^']*",lambda m:m.group(0).replace(' in the video',''),s)
open(L,'w',encoding='utf-8',newline='').write(s)
print('revela restantes',s.count("tipo:'revela'"),'video',len(re.findall(r'\bvideo\b',s[s.index('return ['):],re.I)))
