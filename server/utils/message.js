const generateMessage = (from, text) => {
  const message = {
    from,
    text,
    createdAt: new Date().getTime(),
  };
  return message;
};


module.exports = {
  generateMessage,
};
