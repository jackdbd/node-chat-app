// eslint-disable-next-line
const socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

// create a custom event handler
socket.on('newMessage', (message) => {
  console.log('You have got a new message:', message);
});

// add an acknowledgement on the client side
socket.emit('createMessage', {
  from: 'Frank',
  text: 'Hi',
}, (ackData) => {
  console.log('Got it', ackData);
});
