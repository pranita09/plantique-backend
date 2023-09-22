const User = require("../models/users.model");

// read all addresses of an user
async function readAllAddresses(userId) {
  try {
    const user = await User.findById(userId);
    return user.address;
  } catch (error) {
    throw error;
  }
}

// add new address to the user
async function addNewAddress(userId, newAddress) {
  try {
    const user = await User.findById(userId);
    user.address = [newAddress, ...user.address];
    const updatedUser = await user.save();
    return updatedUser.address;
  } catch (error) {
    throw error;
  }
}

// update an address
async function updateAddress(userId, addressId, updatedAddress) {
  try {
    const user = await User.findById(userId);
    const updatedUserAddresses = user.address.map((item) => {
      return item._id.toString() === addressId
        ? { _id: item._id, ...updatedAddress }
        : item;
    });
    user.address = updatedUserAddresses;
    const updatedUser = await user.save();
    return updatedUser.address;
  } catch (error) {
    throw error;
  }
}

// delete an address
async function deleteAddress(userId, addressId) {
  try {
    const user = await User.findById(userId);
    const updatedUserAddresses = user.address.filter(
      ({ _id }) => _id.toString() !== addressId
    );
    user.address = updatedUserAddresses;
    const updatedUser = await user.save();
    return updatedUser.address;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  readAllAddresses,
  addNewAddress,
  updateAddress,
  deleteAddress,
};
