const mongoose = require("mongoose")

const empleadosSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    correo:{
        type:String,
        required: true
    },
    contrasena:{
        type: String,
        required: true
    }
})
const usuarios = mongoose.model('usuarios', empleadosSchema);

module.exports = usuarios;