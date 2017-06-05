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
  // eslint-disable-next-line
  const formattedTime = moment(message.createdAt).format('h:mm a');
  // eslint-disable-next-line
  const li = $('<li></li>');
  li.text(`${message.from} ${formattedTime}: ${message.text}`);
  // eslint-disable-next-line
  $('#messages').append(li);
});

socket.on('newLocationMessage', (message) => {
  /* eslint-disable no-undef */
  const formattedTime = moment(message.createdAt).format('h:mm a');
  const li = $('<li></li>');
  const a = $('<a target="_blank">My current location</a>');
  /* eslint-enable no-undef */
  li.text(`${message.from} ${formattedTime}:`);
  a.attr('href', message.url);
  li.append(a);
  // eslint-disable-next-line
  $('#messages').append(li);
});

// eslint-disable-next-line
$('#message-form').on('submit', (event) => {
  // prevent the default behavior of the form, which is refreshing the entire page
  event.preventDefault();
  // eslint-disable-next-line
  const messageTextBox = $('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val(),
  }, (ackData) => {
    messageTextBox.val('');
    console.log('ack:', ackData);
  });
});

// eslint-disable-next-line
const locationButton = $('#send-location');
locationButton.on('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  locationButton.attr('disabled', 'disabled').text('Send location...');

  navigator.geolocation.getCurrentPosition(
    (position) => {
      locationButton.removeAttr('disabled').text('Send location');
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    },
    () => {
      locationButton.removeAttr('disabled').text('Send location');
      alert('Unable to fetch location.');
    });
});
