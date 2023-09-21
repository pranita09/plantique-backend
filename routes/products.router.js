const express = require("express");
const productRouter = express.Router();
const {
  readAllProducts,
  readProductById,
} = require("../controllers/products.controller");

// All the routes related to Product are present here.
// These are publicaly accessible routes.

// get all products
productRouter.get("/", async (req, res) => {
  try {
    const products = await readAllProducts();
    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch all products." });
  }
});

// get product by id
productRouter.get("/:productId", async (req, res) => {
  try {
    const product = await readProductById(req.params.productId);
    if (product) {
      res.status(200).json({ product });
    } else {
      res
        .status(404)
        .json({ error: "Product does not exists. Not found error" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to read a product." });
  }
});

module.exports = productRouter;
