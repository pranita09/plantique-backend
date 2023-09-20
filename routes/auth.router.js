const express = require("express");
const authRouter = express.Router();

const User = require("../models/users.model");
const { generateToken } = require("../utils/utils");
const { signup, login } = require("../controllers/users.controller");

// signup
authRouter.post("/signup", async (req, res) => {
  try {
    const { email, password, ...rest } = req.body;
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      res
        .status(422)
        .json({ error: "Unapproachable Entity. Email already exists." });
    }
    const createdUser = await signup(req.body);
    const encodedToken = generateToken(createdUser._id);
    res
      .status(201)
      .json({ createdUser, encodedToken, message: "User sign up successful." });
  } catch (error) {
    res.status(500).json({ error: "Failed to create new user" });
  }
});

// login
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await login(email, password);
    if (!foundUser) {
      res
        .status(404)
        .json({
          error: "The email you entered is not registered. Not found error.",
        });
    }
    const encodedToken = generateToken(foundUser._id);
    res.json({ foundUser, encodedToken, message: "User login successful." });
  } catch (error) {
    res.status(401).json({
      error:
        "The credentials you entered are invalid. Unauthorized access error.",
    });
  }
});

module.exports = authRouter;
