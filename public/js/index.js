// eslint-disable-next-line
const socket = io();

socket.on('connect', () => {
  console.log('Connected to server');

  // create a custom event, emitted from the client to the server
  socket.emit('createMessage', {
    from: 'jen@example.com',
    text: 'Hey, this is a new message',
  });
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

// create a custom event handler
socket.on('newMessage', (message) => {
  console.log('You have got a new message:', message);
});
