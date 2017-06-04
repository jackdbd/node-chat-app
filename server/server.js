const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
// configure the express static middleware
app.use(express.static(publicPath));

// setup a route for the home page
app.get('/', (req, res) => {
//   res.send('<h1>Hello Express!</h1>');
  res.render('index.html');
});

app.listen(port, () => {
  console.log(`Server is up at port ${port}`);
});
