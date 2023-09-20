const mongoose = require("mongoose");
const users = require("../data/users");
const User = require("../models/users.model");

// seed user database
async function seedUsersDatabase() {
  try {
    for (const user of users) {
      const { firstName, lastName, email, password, address } = user;
      const newUser = new User({
        firstName,
        lastName,
        email,
        password,
        address,
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

module.exports = { seedUsersDatabase };
