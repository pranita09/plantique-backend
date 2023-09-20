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

// get all categories
async function readAllCategories() {
  try {
    const categories = await Category.find({});
    return categories;
  } catch (error) {
    throw error;
  }
}

// get category by id
async function readCategoryById(categoryId) {
  try {
    const category = await Category.findById(categoryId);
    return category;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  seedCategoriesDatabase,
  readAllCategories,
  readCategoryById,
};
