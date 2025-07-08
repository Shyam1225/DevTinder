const express = require('express');

const app = express();

app.get('/user', (req, res) => {
  res.send('Hello World!');
});

app.post('/user', (req, res) => {
  console.log(req.body);
  res.send("Data Successfully saved to the database");
});

app.delete('/user', (req, res) => {
  res.send("Data Successfully deleted from the database");
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});