import json, os

BASE = r"C:\Users\paulo\OneDrive\td junto outlook hotmail\MAPLE BEAR\provas"

CONFIGS = [
    ("quiz_nb1_raw.json", "ferramentas/media/quiz_geo_nb1.html", "Quiz: Periodos e Estacoes", "GEO NB1"),
    ("quiz_nb2_raw.json", "ferramentas/media/quiz_geo_nb2.html", "Quiz: Povos, Culturas e Espaco", "GEO NB2"),
]

TMPL = open(os.path.join(BASE, "gen_quiz_geo_tmpl.html"), encoding="utf-8").read()

for raw_file, out_path, title, label in CONFIGS:
    raw = json.load(open(os.path.join(BASE, raw_file), encoding='utf-8', errors='replace'))
    qs = raw.get('questions', [])
    qs_json = json.dumps(qs, ensure_ascii=True)
    html = TMPL.replace("{{TITLE}}", title).replace("{{LABEL}}", label).replace("{{QUESTIONS_JSON}}", qs_json)
    out = os.path.join(BASE, out_path)
    open(out, 'w', encoding='utf-8').write(html)
    print(f"Written: {out_path} ({len(qs)} questions)")
