const express = require ("express")
const puntajeController = require("../controllers/puntajeController")

const router = express.Router();

router.post("/guardar",puntajeController.guardarPuntaje)
router.get("/visualizar",puntajeController.visualizarPuntaje)

module.exports = router;