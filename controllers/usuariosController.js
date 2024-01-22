const Usuarios = require("../models/usuariosModel");
const express = require("express");

const usuarioController = {
  agregarUsuario: async (req, res) => {
    try {
      const usuarios = new Usuarios({
        nombre: req.body.nombre,
        correo: req.body.correo,
        contrasena: req.body.contrasena,
      });

      await usuarios.save();
      res.status(201).json(usuarios);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  obtenerUnUsuario: async (req, res) => {
    try {
      const usuario = await Usuarios.findById(req.params.id);
      if (!usuario) {
        return res.status(404).json({ error: "Usario no encontrado" });
      }
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  visualizarUsuarios: async (req, res) => {
    try {
      const usuarios = await Usuarios.find();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  iniciarSesion: async (req, res) => {
    try {
      const { correo, contrasena } = req.body;
      const usuario = await Usuarios.findOne({ correo });

      if (!usuario) {
        return res
          .status(401)
          .json({ error: "Usuario o contraseña incorrectos" });
      }

      if (contrasena !== usuario.contrasena) {
        return res
          .status(401)
          .json({ error: "Usuario o contraseña incorrectos" });
      }
      const datosUsuario = {
        nombre: usuario.nombre,
        correo: usuario.correo,
      };
      res.json(datosUsuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = usuarioController;
