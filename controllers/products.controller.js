const mongoose = require("mongoose");
const products = require("../data/products");
const Product = require("../models/products.model");

// seed products database
async function seedProductsDatabase() {
  try {
    for (const product of products) {
      const {
        title,
        imgSrc,
        description,
        price,
        updatedPrice,
        startRating,
        size,
        inStock,
        fastDelivery,
        onSale,
        category,
      } = product;
      const newProduct = new Product({
        title,
        imgSrc,
        description,
        price,
        updatedPrice,
        startRating,
        size,
        inStock,
        fastDelivery,
        onSale,
        category,
      });
      await newProduct.save();
      console.log(`New product ${title} added`);
    }
    console.log("Products data seeded successfully");
  } catch (error) {
    console.error("Error while seeding products database", error);
  } finally {
    mongoose.disconnect();
  }
}

// get all products
async function readAllProducts() {
  try {
    const products = await Product.find({});
    return products;
  } catch (error) {
    throw error;
  }
}

// get a product by id
async function readProductById(productId) {
  try {
    const product = await Product.findById(productId);
    return product;
  } catch (error) {
    throw error;
  }
}

module.exports = { seedProductsDatabase, readAllProducts, readProductById };
