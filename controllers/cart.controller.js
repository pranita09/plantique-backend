const User = require("../models/users.model");

// get cart items
async function readCartItems(userId) {
  try {
    const user = await User.findById(userId);
    return user.cart;
  } catch (error) {
    throw error;
  }
}

// add item to the cart
async function addItemToCart(userId, product) {
  try {
    const user = await User.findById(userId);
    user.cart = [{ ...product, qty: 1 }, ...user.cart];
    const updatedUser = await user.save();
    return updatedUser.cart;
  } catch (error) {
    throw error;
  }
}

// remove item from cart
async function removeItemFromCart(userId, productId) {
  try {
    const user = await User.findById(userId);
    const userCart = user.cart.filter(({ _id }) => _id !== productId);
    user.cart = userCart;
    const updatedUser = await user.save();
    return updatedUser.cart;
  } catch (error) {
    throw error;
  }
}

// update quantity of cart item
async function updateQuantityOfCartItem(userId, productId, action) {
  try {
    const user = await User.findById(userId);
    const userCart = user.cart.map((product) => {
      if (product._id === productId) {
        switch (action.type) {
          case "increment":
            return { ...product, qty: product.qty + 1 };
          case "decrement":
            return { ...product, qty: product.qty - 1 };
          default:
            return product;
        }
      } else {
        return product;
      }
    });
    user.cart = userCart;
    const updatedUser = await user.save();
    return updatedUser.cart;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  readCartItems,
  addItemToCart,
  removeItemFromCart,
  updateQuantityOfCartItem,
};
