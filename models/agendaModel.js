const mongoose = require("mongoose")

const agendaModel = new mongoose.Schema({
    fecha:{
        type: String,
        required:true
    },
    usuario:{
        type:String,
        required:true
    },
    mensaje:{
        type: String,
        required:true
    }
})
const agenda = mongoose.model('agenda', agendaModel);

module.exports = agenda;