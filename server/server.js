const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

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
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the Chat app',
    createdAt: new Date().getTime(),
  });
  // fire an event to everybody except this user
  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New User joined',
    createdAt: new Date().getTime(),
  });

  socket.on('createMessage', (newMessage) => {
    console.log('createMessage', newMessage);
    io.emit('newMessage', {
      from: newMessage.from,
      text: newMessage.text,
      createdAt: new Date().getTime(),
    });
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
