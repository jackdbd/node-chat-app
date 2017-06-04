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

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

// setup a route for the home page
app.get('/', (req, res) => {
//   res.send('<h1>Hello Express!</h1>');
  res.render('index.html');
});

server.listen(port, () => {
  console.log(`Server is up at port ${port}`);
});
