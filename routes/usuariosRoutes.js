const express = require ("express")
const usuarioController = require("../controllers/usuariosController")

const router = express.Router();

router.post("/crear",usuarioController.agregarUsuario)
router.get("/",usuarioController.visualizarUsuarios)
router.get("/:id",usuarioController.obtenerUnUsuario)
router.post('/login', usuarioController.iniciarSesion);
module.exports = router;