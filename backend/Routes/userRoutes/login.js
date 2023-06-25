const express = require("express");
const bcrypt = require("bcrypt");
require("dotenv").config();
const Login = express.Router();
const jwt = require("jsonwebtoken");
const { UserModel } = require("../../Model/UserModel");
const { auth } = require("../../middleware/auth");

Login.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  // console.log(user);
  try {
    bcrypt.compare(password, user.password, async (err, result) => {
      if (!result) {
        res.status(403).send({ message: "Password is incorrect" });
      } else {
        const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });

        res.status(200).send({ user, token });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

Login.get("/login", auth, async (req, res) => {
  let loginedUser = await UserModel.find();
  res.send(loginedUser);
});

module.exports = {
  Login,
};
