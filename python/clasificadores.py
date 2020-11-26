import numpy as np
import pickle
import os
dir = os.path.dirname(__file__)

import warnings
warnings.filterwarnings("ignore")

def clasificador_intenciones(oracion_input):
    """
        Cargamos el archivo donde está guardado el cerebro_intenciones 
        y el vectorizador_intenciones con pickle
    """
    cerebro_filename = dir + '/cerebros/ridge_intenciones.sav'
    logReg = pickle.load(open(cerebro_filename, 'rb'))
    vectorizer_filename= dir + '/cerebros/vectorizer_intenciones.sav'
    vectorizador_intenciones = pickle.load(open(vectorizer_filename, 'rb'))
    
    '''
    Si había un preprocesamiento, efectuarlo aquí
    '''
    oracion_input_array=[oracion_input]  
        
    # La vectorizamos
    oracion_vectorizada=vectorizador_intenciones.transform(oracion_input_array).toarray()
    intencion_pronosticada= logReg.predict(oracion_vectorizada)
    probabilidad= np.max(logReg.predict_proba(oracion_vectorizada))
    
    return intencion_pronosticada[0], probabilidad

def clasificador_subintenciones_pagos(oracion_input):
    """
        Cargamos el archivo donde está guardado el cerebro_intenciones 
        y el vectorizador_intenciones con pickle
    """
    cerebro_filename = dir + '/cerebros/ridge_subintenciones.sav'
    logReg = pickle.load(open(cerebro_filename, 'rb'))
    vectorizer_filename= dir + '/cerebros/vectorizer_subintenciones.sav'
    vectorizador_intenciones = pickle.load(open(vectorizer_filename, 'rb'))
    
    '''
    Si había un preprocesamiento, efectuarlo aquí
    '''
    oracion_input_array=[oracion_input]  
        
    # La vectorizamos
    oracion_vectorizada=vectorizador_intenciones.transform(oracion_input_array).toarray()
    intencion_pronosticada= logReg.predict(oracion_vectorizada)
    probabilidad= np.max(logReg.predict_proba(oracion_vectorizada))
    
    return intencion_pronosticada[0], probabilidad

def clasificador_subintenciones_tramites(oracion_input):
    """
        Cargamos el archivo donde está guardado el cerebro_intenciones 
        y el vectorizador_intenciones con pickle
    """
    cerebro_filename = dir + '/cerebros/ridge_subintenciones_tramites.sav'
    logReg = pickle.load(open(cerebro_filename, 'rb'))
    vectorizer_filename= dir + '/cerebros/vectorizer_subintenciones_tramites.sav'
    vectorizador_intenciones = pickle.load(open(vectorizer_filename, 'rb'))
    
    '''
    Si había un preprocesamiento, efectuarlo aquí
    '''
    oracion_input_array=[oracion_input]  
        
    # La vectorizamos
    oracion_vectorizada=vectorizador_intenciones.transform(oracion_input_array).toarray()
    intencion_pronosticada= logReg.predict(oracion_vectorizada)
    probabilidad= np.max(logReg.predict_proba(oracion_vectorizada))
    
    return intencion_pronosticada[0], probabilidad

def clasificador_carreras(oracion_input):
    """
        Cargamos el archivo donde está guardado el cerebro_intenciones 
        y el vectorizador_intenciones con pickle
    """
    cerebro_filename = dir + '/cerebros/ridge_carreras.sav'
    logReg = pickle.load(open(cerebro_filename, 'rb'))
    vectorizer_filename= dir + '/cerebros/vectorizer_carreras.sav'
    vectorizador_intenciones = pickle.load(open(vectorizer_filename, 'rb'))
    
    '''
    Si había un preprocesamiento, efectuarlo aquí
    '''
    oracion_input_array=[oracion_input]  
        
    # La vectorizamos
    oracion_vectorizada=vectorizador_intenciones.transform(oracion_input_array).toarray()
    intencion_pronosticada= logReg.predict(oracion_vectorizada)
    probabilidad= np.max(logReg.predict_proba(oracion_vectorizada))
    
    return intencion_pronosticada[0], probabilidad

def clasificador_w5(oracion_input):
    """
        Cargamos el archivo donde está guardado el cerebro_intenciones 
        y el vectorizador_intenciones con pickle
    """
    cerebro_filename = dir + '/cerebros/ridge_w5.sav'
    logReg = pickle.load(open(cerebro_filename, 'rb'))
    vectorizer_filename= dir + '/cerebros/vectorizer_w5.sav'
    vectorizador_intenciones = pickle.load(open(vectorizer_filename, 'rb'))
    
    '''
    Si había un preprocesamiento, efectuarlo aquí
    '''
    oracion_input_array=[oracion_input]  
        
    # La vectorizamos
    oracion_vectorizada=vectorizador_intenciones.transform(oracion_input_array).toarray()
    intencion_pronosticada= logReg.predict(oracion_vectorizada)
    probabilidad= np.max(logReg.predict_proba(oracion_vectorizada))
    
    return intencion_pronosticada[0], probabilidad

# intencion, proba=clasificador_intenciones("Quiero saber cuánto cuesta la carrera de IA")
# print(intencion, proba)

# intencion, proba=clasificador_subintenciones("Quiero saber cuánto cuesta la carrera de IA")
# print(intencion, proba)

# intencion, proba=clasificador_carreras("Quiero saber cuánto cuesta la carrera de IA")
# print(intencion, proba)