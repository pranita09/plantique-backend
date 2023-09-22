const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const users = require("../data/users");
const User = require("../models/users.model");

// seed user database
async function seedUsersDatabase() {
  try {
    for (const user of users) {
      const { firstName, lastName, email, password, address, cart, wishlist } =
        user;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        address,
        cart,
        wishlist,
      });
      await newUser.save();
      console.log(`User ${firstName} added`);
    }
    console.log("User database seeded successfully");
  } catch (error) {
    console.error("Error while seeding users database", error);
  } finally {
    mongoose.disconnect();
  }
}

// signup
async function signup(userDetails) {
  try {
    const user = new User({ ...userDetails });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    const createdUser = await user.save();
    return createdUser;
  } catch (error) {
    console.error("Error saving user:", error);
    throw error;
  }
}

// login
async function login(email, password) {
  try {
    const foundUser = await User.findOne({ email });
    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (foundUser && passwordMatch) {
      return foundUser;
    } else {
      throw new Error("Invalid credentials.");
    }
  } catch (error) {
    throw error;
  }
}

module.exports = { seedUsersDatabase, signup, login };
