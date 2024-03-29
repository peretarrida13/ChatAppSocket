const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const env = require('dotenv').config();
const port = process.env.PORT || 3000;


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
} );

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});