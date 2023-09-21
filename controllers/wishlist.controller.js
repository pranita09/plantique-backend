const User = require("../models/users.model");

// get wishlist items
async function readWishlistItems(userId) {
  try {
    const user = await User.findById(userId);
    console.log(user.wishlist);
    return user.wishlist;
  } catch (error) {
    throw error;
  }
}

// add item to the wishlist
async function addItemToWishlist(userId, product) {
  try {
    const user = await User.findById(userId);
    user.wishlist.push(product);
    const updatedUser = await user.save();
    return updatedUser.wishlist;
  } catch (error) {
    throw error;
  }
}

// remove item from wishlist
async function removeItemFromWishlist(userId, productId) {
  try {
    const user = await User.findById(userId);
    const userWishlist = user.wishlist.filter(({ _id }) => _id !== productId);
    user.wishlist = userWishlist;
    const updatedUser = await user.save();
    console.log(updatedUser.wishlist);
    return updatedUser.wishlist;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  readWishlistItems,
  addItemToWishlist,
  removeItemFromWishlist,
};
