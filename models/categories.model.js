const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    img: {
      type: String,
      required: true,
    },
    categoryName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
