const Puntaje = require("../models/puntajesModel");

const puntajeController = {
  guardarPuntaje: async (req, res) => {
    try {
      const datosJugador = new Puntaje({
        nombre: req.body.nombre,
        puntaje: req.body.puntaje,
      });
      await datosJugador.save();
      responderClientes(datosJugador);
      res.status(201).json(datosJugador);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  visualizarPuntaje: async (req, res) => {
    try {
      const datosJugador = await Puntaje.find();
      datosJugador.sort((a, b) => b.puntaje - a.puntaje);
      res.json(datosJugador);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
   }
};

module.exports = puntajeController;