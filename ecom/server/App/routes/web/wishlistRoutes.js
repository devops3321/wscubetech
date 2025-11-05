let express = require("express");
let wishlistRoutes = express.Router();
const {
	getAllWishlists,
	deleteWishlistItem,
	addToWishlist,

} = require("../../controllers/web/wishlistControllers");

const { checkToken } = require("../../middleware/checkToken");

// Get all wishlists items (GET and POST supported since GET requests don't have body)
wishlistRoutes.get("/get-wishlist-items", checkToken, getAllWishlists);

wishlistRoutes.delete("/delete-wishlist-item/:pid", checkToken, deleteWishlistItem);

wishlistRoutes.post("/add-to-wishlist", checkToken, addToWishlist);

module.exports = { wishlistRoutes };