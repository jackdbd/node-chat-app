const moment = require('moment');

const generateMessage = (from, text) => {
  const message = {
    from,
    text,
    createdAt: moment().valueOf(),
  };
  return message;
};

const generateLocationMessage = (from, latitude, longitude) => {
  const location = {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: moment().valueOf(),
  };
  return location;
};

module.exports = {
  generateMessage,
  generateLocationMessage,
};
