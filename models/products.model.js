const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imgSrc: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    updatedPrice: {
      type: Number,
      required: true,
    },
    starRating: {
      type: Number,
    },
    size: {
      type: String,
      enum: ["Small", "Medium", "Large"],
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
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
