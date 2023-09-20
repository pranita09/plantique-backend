const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: [
      {
        name: {
          type: String,
        },
        street: {
          type: String,
        },
        city: {
          type: String,
        },
        state: {
          type: String,
        },
        zipcode: {
          type: String,
        },
        country: {
          type: String,
        },
        mobile: {
          type: String,
          unique: true,
        },
      },
    ],
    cart: [],
    wishlist: [],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
