const generateMessage = (from, text) => {
  const message = {
    from,
    text,
    createdAt: new Date().getTime(),
  };
  return message;
};

const generateLocationMessage = (from, latitude, longitude) => {
  const location = {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: new Date().getTime(),
  };
  return location;
};

module.exports = {
  generateMessage,
  generateLocationMessage,
};
