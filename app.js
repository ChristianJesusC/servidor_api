const express = require("express");
const mongoose = require('mongoose');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
const morgan = require("morgan");

const app = express();
app.use(express.json());

const Agenda = require("./models/agendaModel");

const server = http.createServer(app);

const io = socketio(server, {
  cors: { origin: '*' }
});

const chatANamespace = io.of('/chatA');
chatANamespace.on('connection', (socket) => {
  console.log('Se ha conectado un usuario a chatA');

  socket.on("mensajeChatA", (data) => {
    chatANamespace.emit("mensajeChatA", data);
  });
});

const chatBNamespace = io.of('/chatB');
chatBNamespace.on('connection', (socket) => {
  console.log('Se ha conectado un usuario a chatB');

  socket.on("mensajeChatB", (data) => {
    chatBNamespace.emit("mensajeChatB", data);
  });
});

const chatGlobalNamespace = io.of('/chatGlobal');
chatGlobalNamespace.on('connection', (socket) => {
  console.log('Se ha conectado un usuario al chat global');

  socket.on("mensajeChatGlobal", (data) => {
    chatGlobalNamespace.emit("mensajeChatGlobal", data);
  });
});

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const conectarAMongoDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/FaceLook');
    console.log('Conexión a MongoDB exitosa');
  } catch (error) {
    console.error('Error en la conexión a MongoDB:', error);
  }
};

conectarAMongoDB();

const usuariosRoutes = require('./routes/usuariosRoutes');
const mensajesRoutes = require('./routes/chatRoutes');
const puntajeRouter = require('./routes/puntajeRouter');
const publicacionRouter = require('./routes/publicacionesRouter');
const chatA = require('./routes/chatARouter');

app.use('/usuarios', usuariosRoutes);
app.use('/mensajes', mensajesRoutes);
app.use('/chatA', chatA);
app.use('/publicacion', publicacionRouter);
app.use('/puntaje', puntajeRouter);



let responsesClientes = [];

app.get("/agenda/ver", async (req, res) => {
  try {
    const notificaciones = await Agenda.find();
    res.status(200).json({
      notificaciones,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener las notificaciones",
    });
  }
  console.log("Hola")
});

//ObtenerLong
app.get("/agenda/nueva-agenda", (req, res) => {
  responsesClientes.push(res);
});

function responderClientes(notificacion) {
  for (res of responsesClientes) {
    res.status(200).json({
      success: true,
      notificacion,
    });
  }

  responsesClientes = [];
}

//Guardar
app.post("/agenda/guardar", async (req, res) => {
  try {
    const notificacion = new Agenda({
      fecha: req.body.fecha,
      usuario: req.body.usuario,
      mensaje: req.body.mensaje,
    });
    await notificacion.save();

    responderClientes(notificacion);

    return res.status(201).json({
      success: true,
      message: "evento guardada",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al guardar el evento",
    });
  }
  console.clear()
});

app.delete('/agenda', async (req, res) => {
  try {
    await Agenda.deleteMany();
    res.status(200).json({ message: 'Todos los eventos han sido eliminadas' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar los eventos' });
  }
});


const PORT = process.env.PORT || 3300;

server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});