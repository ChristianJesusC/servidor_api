const express = require ("express")
const publicacion = require("../controllers/publicacionesController")

const router = express.Router();

router.post("/crear",publicacion.guardarPublicacion)
router.get("/visual",publicacion.visualizaPublicaciones)

module.exports = router;