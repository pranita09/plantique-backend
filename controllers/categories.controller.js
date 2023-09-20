const mongoose = require("mongoose");
const categories = require("../data/categories");
const Category = require("../models/categories.model");

// seed categories database
async function seedCategoriesDatabase() {
  try {
    for (const category of categories) {
      const { img, categoryName, description } = category;
      const newCategory = new Category({ img, categoryName, description });
      await newCategory.save();
      console.log(`New ${categoryName} category added`);
    }
    console.log("Category database seeded successfully");
  } catch (error) {
    console.error("Error while seeding categories database", error);
  } finally {
    mongoose.disconnect();
  }
}

module.exports = { seedCategoriesDatabase };
