import json
import sys
from clasificadores import *
from spell2 import correction
import nltk

# silenciar mensajes de advertencia
import warnings
warnings.filterwarnings("ignore")

def intencion(params):
    intencion, probabilidad = clasificador_intenciones(params['oracion'])
    return {'intencion': intencion, 'probabilidad': probabilidad}


def subintencion(params):
    intencion, probabilidad = clasificador_subintenciones(params['oracion'])
    return {'subintencion': intencion, 'probabilidad': probabilidad}


def carrera(params):
    intencion, probabilidad = clasificador_carreras(params['oracion'])
    return {'carrera': intencion, 'probabilidad': probabilidad}


def w5(params):
    return {'w5': 'todas', 'probabilidad': 1}

def spell(params):
    oracion = params['oracion'].lower()
    palabras = nltk.word_tokenize(text=oracion, language="spanish")
    oracion_corregida = ''

    for p in palabras:
        oracion_corregida += correction(p) + ' '

    return oracion_corregida

def main(argv):
    res = ""

    if len(argv) > 1:
        # Conversion from JSON to dic:
        dic = json.loads(argv[1])
        res = globals()[argv[0]](dic)
    else:
        res = globals()[argv[0]]()

    print(json.dumps(res, indent=2))


if __name__ == "__main__":
    main(sys.argv[1:])
