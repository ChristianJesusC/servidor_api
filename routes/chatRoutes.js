const express = require ("express")
const chatController = require("../controllers/chatController")

const router = express.Router();

router.post("/enviar",chatController.guardarMensaje)

module.exports = router;