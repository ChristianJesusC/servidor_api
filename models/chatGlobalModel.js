const mongoose = require("mongoose")

const chatModels = new mongoose.Schema({
    usuario:{
        type:String,
        required:true
    },
    mensaje:{
        type: String,
        require: true
    },
    fecha:{
        type: String,
        require: true
    }
})
const chatGlobal = mongoose.model('chatGlobal', chatModels);

module.exports = chatGlobal;