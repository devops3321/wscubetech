let express = require("express");
let cartRoutes = express.Router();
const {
	getAllcarts,
	deleteCartItem,
	addToCart,
	updateCartItem
} = require("../../controllers/web/cartControllers");

const { checkToken } = require("../../middleware/checkToken");

// Get all carts items (GET and POST supported since GET requests don't have body)
cartRoutes.get("/get-cart-items", checkToken, getAllcarts);
cartRoutes.post("/get-cart-items", checkToken, getAllcarts);

cartRoutes.delete("/delete-cart-item/:pid", checkToken, deleteCartItem);

cartRoutes.post("/add-to-cart", checkToken, addToCart);

cartRoutes.put("/update-cart-item/:pid", checkToken, updateCartItem);

module.exports = { cartRoutes };