const express = require("express");
const addressRouter = express.Router();
const {
  readAllAddresses,
  addNewAddress,
  updateAddress,
  deleteAddress,
} = require("../controllers/address.controller");

// All the routes related to Address are present here.
// These are private routes.
// Client needs to add "authorization" header with JWT token in itto access it.

// read all addresses of an user
addressRouter.get("/", async (req, res) => {
  try {
    const userId = req.user.userId;
    if (!userId) {
      res.status(404).json({
        error: "The email you entered is not Registered. Not Found error",
      });
    } else {
      const addresses = await readAllAddresses(userId);
      res.json({ address: addresses });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to read all addresses for the user." });
  }
});

// add new address to the user
addressRouter.post("/", async (req, res) => {
  try {
    const address = req.body;
    const userId = req.user.userId;
    if (!userId) {
      res.status(404).json({
        error: "The email you entered is not Registered. Not Found error",
      });
    } else {
      const addresses = await addNewAddress(userId, address);
      res.status(201).json({
        address: addresses,
        message: "New address added successfully.",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to add new address to the user." });
  }
});

// update an address
addressRouter.post("/:addressId", async (req, res) => {
  try {
    const addressId = req.params.addressId;
    const address = req.body;
    const userId = req.user.userId;
    if (!userId) {
      res.status(404).json({
        error: "The email you entered is not Registered. Not Found error",
      });
    } else {
      const addresses = await updateAddress(userId, addressId, address);
      res
        .status(201)
        .json({ address: addresses, message: "Address updated successfully." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update an address." });
  }
});

// delete an address
addressRouter.delete("/:addressId", async (req, res) => {
  try {
    const addressId = req.params.addressId;
    const userId = req.user.userId;
    if (!userId) {
      res.status(404).json({
        error: "The email you entered is not Registered. Not Found error.",
      });
    } else {
      const addresses = await deleteAddress(userId, addressId);
      res
        .status(200)
        .json({ address: addresses, message: "Address deleted successfully." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete an address." });
  }
});

module.exports = addressRouter;
