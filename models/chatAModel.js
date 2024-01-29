const mongoose = require("mongoose")

const chatA = new mongoose.Schema({
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
const chatsA = mongoose.model('chatA', chatA);

module.exports = chatsA;