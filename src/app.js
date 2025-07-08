const express = require('express');

const app = express();

app.get('/user/:userId/:name/:password', (req, res) => {
  console.log(req.params);
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});