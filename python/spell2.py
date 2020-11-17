# Spelling Corrector

import re
# import pandas as pd
# import time
import pymongo
import nltk

client = pymongo.MongoClient(
    "mongodb+srv://federico:uUmQB7B1sF5ytXg8@cluster0.ix9a2.mongodb.net/chatbot?retryWrites=true&w=majority")
db = client.chatbot

# inicio = time.time()
letters = 'abcdefghijklmnopqrstuvwxyzáéíóúüñ'


def most_frequent(words):
    query = [
        {
            '$match': {
                'palabra': {
                    '$in': list(words)
                }
            }
        }, {
            '$sort': {
                'frecuencia': -1
            }
        }, {
            '$limit': 1
        }
    ]

    res = list(db.vocabulario.aggregate(query))
    if len(res) > 0:
        # print(res[0]['palabra'])
        return res[0]['palabra']

    return ''


def correction(word):
    word = word.lower()
    word_cleaned = clean(word)
    word_cleaned = reduce_lengthening(word_cleaned)

    if(len(word_cleaned) == 0):
        return word

    if(most_frequent([word_cleaned]) == word_cleaned):
        return word_cleaned

    "Most probable spelling correction for word."
    res = most_frequent(candidates(word_cleaned))

    if(res != ''):
        return res

    return word


def candidates(word):
    "Generate possible spelling corrections for word."
    lst2 = edits1(word)
    lst3 = edits2(word)

    return (lst2 or lst3)


def edits1(word):
    "All edits that are one edit away from `word`."
    splits = [(word[:i], word[i:]) for i in range(len(word) + 1)]
    deletes = [L + R[1:] for L, R in splits if R]
    transposes = [L + R[1] + R[0] + R[2:] for L, R in splits if len(R) > 1]
    replaces = [L + c + R[1:] for L, R in splits if R for c in letters]
    inserts = [L + c + R for L, R in splits for c in letters]

    return set(deletes + transposes + replaces + inserts)


def edits2(word):
    "All edits that are two edits away from `word`."
    return (e2 for e1 in edits1(word) for e2 in edits1(e1))


def reduce_lengthening(text):
    pattern = re.compile(r"(.)\1{2,}")
    return pattern.sub(r"\1\1", text)

def clean(text):
    return re.sub("[^"+letters+"]","", text)

def correct_sentence(text):
    text.lower()
    palabras = nltk.word_tokenize(text=text, language="spanish")
    oracion_corregida = ''

    for p in palabras:
        oracion_corregida += correction(p) + ' '

    return oracion_corregida

# print(correction('Holaaaa?'))