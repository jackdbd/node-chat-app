const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { generateMessage } = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// configure the express static middleware
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');
  // fire an event to the user who has just connected to the chat app
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat app'));
  // fire an event to everybody except this user
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

// setup a route for the home page
app.get('/', (req, res) => {
  res.render('index.html');
});

server.listen(port, () => {
  console.log(`Server is up at port ${port}`);
});
