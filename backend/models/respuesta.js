const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    respuesta: { type: String, required: true },
    intencion: { type: String, required: true },
    subintencion: { type: String },
    carrera: { type: String },
    w5: { type: String },
    modalidad: { type: String },
});

module.exports = mongoose.model('respuesta', schema, 'respuestas');