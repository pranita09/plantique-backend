const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    imgSrc: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    updatedPrice: {
      type: Number,
    },
    starRating: {
      type: Number,
    },
    size: {
      type: String,
    },
    inStock: {
      type: Boolean,
    },
    fastDelivery: {
      type: Boolean,
    },
    onSale: {
      type: Boolean,
    },
    category: {
      type: "String",
    },
    qty: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const wishlistItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    imgSrc: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    updatedPrice: {
      type: Number,
    },
    starRating: {
      type: Number,
    },
    size: {
      type: String,
    },
    inStock: {
      type: Boolean,
    },
    fastDelivery: {
      type: Boolean,
    },
    onSale: {
      type: Boolean,
    },
    category: {
      type: "String",
    },
  },
  {
    timestamps: true,
  }
);

const addressSchema = new mongoose.Schema(
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
    },
  },
  {
    timestamps: true,
  }
);

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
    address: [addressSchema],
    cart: [cartItemSchema],
    wishlist: [wishlistItemSchema],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
