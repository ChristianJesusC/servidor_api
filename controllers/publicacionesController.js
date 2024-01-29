const Publicaciones = require("../models/publicacionesModel");
const express = require("express");

const publicacionController = {
  guardarPublicacion: async (req, res) => {
    try {
      const publicacion = new Publicaciones({
        usuario: req.body.usuario,
        contenido: req.body.contenido,
        fecha: req.body.fecha,
      });

      await publicacion.save();
      res.status(201).json(publicacion);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  visualizaPublicaciones: async (req, res) => {
    try {
      const publicacion = await Publicaciones.find();
      res.json(publicacion);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = publicacionController;
