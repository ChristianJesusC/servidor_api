const mongoose = require("mongoose")

const publicacionesModel = new mongoose.Schema({
    usuario:{
        type:String,
        required:true
    },
    contenido:{
        type: String,
        require: true
    },
    fecha:{
        type: String,
        require: true
    }
})
const publicaciones = mongoose.model('publicaciones', publicacionesModel);

module.exports = publicaciones;