const express = require("express");
const wishlistRouter = express.Router();

const {
  readWishlistItems,
  addItemToWishlist,
  removeItemFromWishlist,
} = require("../controllers/wishlist.controller");

// get wishlist items
wishlistRouter.get("/", async (req, res) => {
  try {
    const userId = req.user.userId;
    if (!userId) {
      res.status(404).json({
        error: "The email you entered is not registered. Not found error.",
      });
    } else {
      const wishlist = await readWishlistItems(userId);
      res.json({ wishlist });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch wishlist items." });
  }
});

// add item to wishlist
wishlistRouter.post("/", async (req, res) => {
  try {
    const product = req.body;
    const userId = req.user.userId;
    if (!userId) {
      res.status(404).json({
        error: "The email you entered is not registered. Not found error.",
      });
    } else {
      const wishlist = await addItemToWishlist(userId, product);
      res.status(201).json({ wishlist, message: "Item added to wishlist." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to add item to the wishlist." });
  }
});

// remove item from wishlist
wishlistRouter.delete("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.user.userId;
    if (!userId) {
      res.status(404).json({
        error: "The email you entered is not registered. Not found error.",
      });
    } else {
      const wishlist = await removeItemFromWishlist(userId, productId);
      res
        .status(200)
        .json({ wishlist, message: "Item removed from the wishlist." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to remove item from the wishlist." });
  }
});

module.exports = wishlistRouter;
