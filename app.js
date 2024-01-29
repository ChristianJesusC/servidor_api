const express = require("express");
const mongoose = require('mongoose');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
const morgan = require("morgan");

const app = express();
app.use(express.json());

const server = http.createServer(app);

const io = socketio(server, {
  cors: { origin: '*' }
});

// ChatA - Namespace '/chatA'
const chatANamespace = io.of('/chatA');
chatANamespace.on('connection', (socket) => {
  console.log('Se ha conectado un usuario a chatA');

  socket.on("mensajeChatA", (data) => {
    chatANamespace.emit("mensajeChatA", data);
  });
});

// ChatB - Namespace '/chatB'
const chatBNamespace = io.of('/chatB');
chatBNamespace.on('connection', (socket) => {
  console.log('Se ha conectado un usuario a chatB');

  socket.on("mensajeChatB", (data) => {
    chatBNamespace.emit("mensajeChatB", data);
  });
});

// Chat Global
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
app.use('/puntaje', puntajeRouter);
app.use('/publicacion', publicacionRouter);

const PORT = process.env.PORT || 3300;

server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});