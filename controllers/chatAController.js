const ChatA = require("../models/chatAModel")
const express = require("express")

const chatController={
    guardarMensaje: async (req, res) => {
        try {
          const chat = new ChatA({
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
      visualizarChat: async (req, res) => {
        try {
          const chat = await ChatA.find();
          res.json(chat);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },
}

module.exports = chatController;