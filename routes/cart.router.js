const express = require("express");
const cartRouter = express.Router();
const {
  readCartItems,
  addItemToCart,
  removeItemFromCart,
  updateQuantityOfCartItem,
} = require("../controllers/cart.controller");

// All the routes related to Cart are present here.
// These are private routes.
// Client needs to add "authorization" header with JWT token in itto access it.

// get cart items
cartRouter.get("/", async (req, res) => {
  try {
    const userId = req.user.userId;
    if (!userId) {
      res.status(404).json({
        error: "The email you entered is not registered. Not found error.",
      });
    } else {
      const cart = await readCartItems(userId);
      res.json({ cart });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart items." });
  }
});

// add item to cart
cartRouter.post("/", async (req, res) => {
  try {
    const { product } = req.body;
    const userId = req.user.userId;
    if (!userId) {
      res.status(404).json({
        error: "The email you entered is not registered. Not found error.",
      });
    } else {
      const cart = await addItemToCart(userId, product);
      res.status(201).json({ cart, message: "Item added to cart." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to add item to the cart." });
  }
});

// remove item from cart
cartRouter.delete("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.user.userId;
    if (!userId) {
      res.status(404).json({
        error: "The email you entered is not registered. Not found error.",
      });
    } else {
      const cart = await removeItemFromCart(userId, productId);
      res.status(200).json({ cart, message: "Item removed from the cart." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to remove item from the cart." });
  }
});

// update quantity of cart item
cartRouter.post("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const { action } = req.body;
    const userId = req.user.userId;
    if (!userId) {
      res.status(404).json({
        error: "The email you entered is not registered. Not found error.",
      });
    } else {
      const cart = await updateQuantityOfCartItem(userId, productId, action);
      res
        .status(200)
        .json({ cart, message: "Quantity of an item updated in the cart." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update quantity of an item from the cart." });
  }
});

module.exports = cartRouter;
