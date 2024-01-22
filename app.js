const express = require ("express")
const mongoose = require('mongoose');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
const morgan = require("morgan");

const app = express();
app.use(express.json());

const server = http.createServer(app);

const io = require("socket.io")(server,{
  cors:{origin:'*'}
})

io.on('connection', (socket) => {
  console.log('Se ha conectado un usuario');

  socket.on("mensajeChat",(data)=>{
    io.emit("mensajeChat",data)
  })
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

app.use('/usuarios', usuariosRoutes);
app.use('/mensajes', mensajesRoutes);

const PORT = process.env.PORT || 3300;

server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
    