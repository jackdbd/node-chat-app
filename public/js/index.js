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
  console.log('message:', message);
  // eslint-disable-next-line
  const li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  // eslint-disable-next-line
  $('#messages').append(li);
});

// add an acknowledgement on the client side
socket.emit('createMessage', {
  from: 'Frank',
  text: 'Hi',
}, (ackData) => {
  console.log('ack:', ackData);
});

// eslint-disable-next-line
$('#message-form').on('submit', (event) => {
  // prevent the default behavior of the form, which is refreshing the entire page
  event.preventDefault();
  console.log('Form submitted');
  socket.emit('createMessage', {
    from: 'User',
    // eslint-disable-next-line
    text: $('[name=message]').val(),
  }, (ackData) => {
    console.log('ack:', ackData);
  });
});
