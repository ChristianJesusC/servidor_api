const Puntaje = require("../models/puntajesModel");
const express = require("express");

const puntajeResponses = [];

const enviarPuntajes = (nuevosPuntajes) => {
  for (const response of puntajeResponses) {
    clearTimeout(response.timeout);
    response.res.json(nuevosPuntajes);
  }

  puntajeResponses.length = 0;
};

const puntajeController = {
  guardarPuntaje: async (req, res) => {
    try {
      const datosJugador = new Puntaje({
        nombre: req.body.nombre,
        puntaje: req.body.puntaje,
      });

      await datosJugador.save();

      enviarPuntajes(datosJugador);

      res.status(201).json(datosJugador);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  visualizarPuntaje: async (req, res) => {
    const response = {
      res,
      timeout: null,
    };

    puntajeResponses.push(response);

    const limpiarResponse = () => {
      const index = puntajeResponses.indexOf(response);
      if (index !== -1) {
        puntajeResponses.splice(index, 1);
      }
    };

    try {
      const datosJugador = await Puntaje.find();
      datosJugador.sort((a, b) => b.puntaje - a.puntaje);

      res.json(datosJugador);

      response.timeout = setTimeout(() => {
        limpiarResponse();
        res.status(204).end();
      }, 30000);
    } catch (error) {
      limpiarResponse();
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = puntajeController;