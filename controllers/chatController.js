const ChatGlobal = require("../models/chatGlobalModel")
const express = require("express")

const chatController={
    guardarMensaje: async (req, res) => {
        try {
          const chat = new ChatGlobal({
            usuario: req.body.usuario,
            mensaje: req.body.mensaje,
            fecha: req.body.fecha
          });
    
          await chat.save();
          res.status(201).json(chat);
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
      },
}

module.exports = chatController;