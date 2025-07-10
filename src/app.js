const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
app.use(express.json());
const User = require("./models/user");

app.post("/signup" , async (req, res) => {
    const user = new User({
      firstName : "Shyam",
      lastName : "Damani",
      emailId : "shyam123@gmail.com",
      password : "shyam@123"
    });

    try{
      await user.save();
      res.send("User Added Successfully")
    }
    catch (err) {
      res.status(500).send("ERROR OCCURED" + err.message);

    }
})


connectDB()
  .then(() => {
    console.log("Database Connection Established....");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected...");
  });
