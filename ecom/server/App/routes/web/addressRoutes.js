let express = require("express");
let addressRoutes = express.Router();
const {
    getUserAddresses,
    getDefaultAddress,
    createAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress
} = require("../../controllers/web/addressControllers");

const { checkToken } = require("../../middleware/checkToken");

// Get all addresses for the logged-in user
addressRoutes.get("/get-addresses", checkToken, getUserAddresses);
addressRoutes.post("/get-addresses", checkToken, getUserAddresses);

// Get default address by type (billing or shipping)
addressRoutes.get("/get-default/:type", checkToken, getDefaultAddress);
addressRoutes.post("/get-default/:type", checkToken, getDefaultAddress);

// Create a new address
addressRoutes.post("/create", checkToken, createAddress);

// Update an address
addressRoutes.put("/update/:addressId", checkToken, updateAddress);
addressRoutes.post("/update/:addressId", checkToken, updateAddress);

// Delete an address
addressRoutes.delete("/delete/:addressId", checkToken, deleteAddress);
addressRoutes.post("/delete/:addressId", checkToken, deleteAddress);

// Set address as default
addressRoutes.put("/set-default/:addressId", checkToken, setDefaultAddress);
addressRoutes.post("/set-default/:addressId", checkToken, setDefaultAddress);

module.exports = { addressRoutes };

