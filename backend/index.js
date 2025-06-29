const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/user");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://sakshamarora034:ERXEZs6yLPbflC1F@cluster0.v1k7gqf.mongodb.net/user"
);

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
      .then((user) => {
        if (user) {
          if (user.password === password) {
            res.json({ message: "Login successful" });
          } else {
            res.json({ message: "Invalid password" });
          }
        } else {
          res.json({ message: "User not found" });
        }
      })
    })
  

app.post("/register", (req, res) => {
  UserModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
