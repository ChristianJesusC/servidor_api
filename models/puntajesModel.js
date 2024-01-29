const mongoose = require("mongoose")

const puntajeSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    puntaje:{
        type: Number,
        required: true
    }
})
const puntaje = mongoose.model('puntaje', puntajeSchema);

module.exports = puntaje;