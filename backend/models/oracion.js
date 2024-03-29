const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    oracion: { type: String, required: true },
    intencion: { type: String },
    subintencion: { type: String },
    carrera: { type: String },
    w5: { type: String },
    feedback: { type: Boolean },
});

module.exports = mongoose.model('oraciones', schema, 'oraciones');