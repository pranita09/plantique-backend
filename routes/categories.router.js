const express = require("express");
const categoryRouter = express.Router();
const {
  readAllCategories,
  readCategoryById,
} = require("../controllers/categories.controller");

// All the routes related to Category are present here.
// These are publicaly accessible routes.

// get all categories
categoryRouter.get("/", async (req, res) => {
  try {
    const categories = await readAllCategories();
    res.json({ categories });
  } catch (error) {
    res.status(500).json({ error: "Failed to read all categories." });
  }
});

// get category by id
categoryRouter.get("/:categoryId", async (req, res) => {
  try {
    const category = await readCategoryById(req.params.categoryId);
    if (category) {
      res.status(200).json({ category });
    } else {
      res
        .status(404)
        .json({ error: "Category does not exists. Not found error" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to read a category." });
  }
});

module.exports = categoryRouter;
