import express from 'express';
import cors from 'cors';
import { Server as SocketServer } from 'socket.io';
import { createServer } from 'http';

const ROOMS = [];

// Crear la aplicación de Express
const app = express();
const server = createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: '*',
  },
});

app.use(express.json());
app.use(cors());

io.on('connection', (socket) => {

  console.log(`Usuario conectado ${socket.id}`);

  socket.on('join', (room) => join(socket, room));

  socket.on('disconnect', disconnect);
});

const join = (socket, room) => {
  console.log({room});
  socket.join(room);
  console.log(`Usuario conectado a la sala ${room}`); 
  // informar al usuario a qué sala se ha conectado
  socket.emit('joined', room);

  // console.log({rooms: io.sockets.adapter.rooms.get(room), room});
  // send 'users' event to all users in the room
  io.to(room).emit('users', Array.from(io.sockets.adapter.rooms.get(room)));
}
const disconnect = () => console.log('user disconnected');

app.get('/newRoom', (req, res) => {
  const room = Math.floor(Math.random() * 1000);
  while (ROOMS.includes(room)) {
    room = Math.floor(Math.random() * 1000);
  }
  ROOMS.push(room);
  console.log(`Nueva sala creada ${room}`);
  console.log("ROOMS: ", ROOMS);
  return res.send({ room });
});

app.get('/joinRoom', (req, res) => {
  const { roomId } = req.query;
  const room = Number(roomId);
  console.log({room, roomId});

  if (ROOMS.includes(room)) {
    io.to(room).emit('joined', room);
    return res.status(200).send({ roomId: room, ok: true });
  }
  return res.status(400).send({ msg: 'Room not found', ok: false });
});

server.listen(4000, () => {
  console.log('Servidor escuchando en el puerto 4000');
});