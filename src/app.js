const express = require('express');
const { adminAuth , userAuth } = require('./middleware/auth.js');

const app = express();

app.use("/admin", adminAuth);

app.get("/admin/getAllData" , (req, res) => {
    res.send("All Data sent");
})

app.get('/user', userAuth, (req, res) => {
  console.log(req.params);
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});