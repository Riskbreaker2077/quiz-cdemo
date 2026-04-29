#!/data/workspace/.venv/bin/python
import json
import subprocess
from pathlib import Path

SHEET_ID = '17_Uu3Uq5YK1SBUpVXHNOqXQ4O6G-hQ11NEba8nHhsfk'
RANGE = 'EVA_10A!A1:N200'
OUT = Path('/data/workspace/quiz-cdemo/data/eva_10a.json')
GOG = '/data/workspace/bin/gogc'

SUBJECTS = [
    ('Matematicas', 'Matemáticas'),
    ('Lenguaje', 'Lenguaje'),
    ('Quimica', 'Química'),
    ('Fisica', 'Física'),
    ('Sociales', 'Sociales'),
    ('Filosofia', 'Filosofía'),
    ('Ingles', 'Inglés'),
]


def parse_num(value):
    if value in (None, ''):
        return None
    text = str(value).strip().replace('.', '').replace(',', '.')
    try:
        return round(float(text), 2)
    except ValueError:
        return None


def qualitative(score):
    if score is None:
        return None
    if score >= 70:
        return 'Alto'
    if score >= 60:
        return 'Básico'
    return 'Bajo'


cmd = [GOG, 'sheets', 'get', SHEET_ID, RANGE, '--json']
raw = subprocess.check_output(cmd, text=True)
payload = json.loads(raw)
values = payload['values']
header = values[0]
rows = values[1:]
index = {name: i for i, name in enumerate(header)}

students = []
for row in rows:
    if not row:
        continue
    code = row[index['COD']] if len(row) > index['COD'] else ''
    first = row[index['Nombres']] if len(row) > index['Nombres'] else ''
    last = row[index['Apellidos']] if len(row) > index['Apellidos'] else ''
    period = row[index['P']] if len(row) > index['P'] else ''
    overall = row[index['Puntaje']] if len(row) > index['Puntaje'] else ''
    if not code:
        continue
    overall_num = parse_num(overall)
    subject_scores = []
    for raw_key, label in SUBJECTS:
        val = row[index[raw_key]] if len(row) > index[raw_key] else ''
        num = parse_num(val)
        subject_scores.append({
            'clave': raw_key,
            'materia': label,
            'puntaje': num,
        })

    students.append({
        'codigo': str(code).strip(),
        'nombreCompleto': f'{first} {last}'.strip(),
        'periodo': str(period).strip(),
        'puntajeGeneral': overall_num,
        'desempenoGeneral': qualitative(overall_num),
        'materias': subject_scores,
    })

students = [s for s in students if s['puntajeGeneral'] is not None or any(m['puntaje'] is not None for m in s['materias'])]
students.sort(key=lambda s: int(s['codigo']))

result = {
    'origen': 'EVA_10A',
    'sheetId': SHEET_ID,
    'range': RANGE,
    'totalEstudiantes': len(students),
    'estudiantes': students,
}

OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding='utf-8')
print(f'Wrote {OUT} with {len(students)} students from {RANGE}')
