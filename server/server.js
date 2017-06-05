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

  // create a custom event, emitted from the server to the client
  socket.emit('newMessage', {
    from: 'mike@example.com',
    text: 'Hey, what is going on?',
    createdAt: 12345,
  });

  socket.on('createMessage', (newMessage) => {
    console.log('createMessage', newMessage);
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
