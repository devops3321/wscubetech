const wishlistModel = require("../../models/wishlistModel");
const mongoose = require("mongoose");

// Get all wishlist items for the logged-in user
async function getAllWishlists(req, res) {
	try {
		const userId = req.user._id;
		const wishlists = await wishlistModel.find({ user: userId })
			.populate({
				path: "product",
				select: "productName actualPrice salePrice productImage parentCategory rating reviewsCount",
				populate: { path: "parentCategory", select: "categoryName" },
			})
			.sort({ createdAt: -1 });
	const staticImagePath = process.env.PRODUCT_IMAGE_PATH || "";
		res.status(200).json({ success: true, data: wishlists, staticImagePath });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
}

// Add a product to the wishlist
async function addToWishlist(req, res) {
	try {
		const userId = req.user?._id;
		if (!userId) {
			return res.status(401).json({ success: false, message: "User not authenticated." });
		}
		const { product } = req.body;
		if (!product) {
			return res.status(400).json({ success: false, message: "Product ID is required." });
		}
		// Validate product ID is a valid MongoDB ObjectId
		if (!mongoose.Types.ObjectId.isValid(product)) {
			return res.status(400).json({ success: false, message: "Invalid product ID format." });
		}
		// Prevent duplicate wishlist items
		const exists = await wishlistModel.findOne({ user: userId, product });
		if (exists) {
			return res.status(200).json({ success: true, message: "Already in wishlist.", data: exists });
		}
		const wishlistItem = new wishlistModel({ user: userId, product });
		await wishlistItem.save();
		res.status(201).json({ success: true, message: "Added to wishlist.", data: wishlistItem });
	} catch (error) {
		console.error("Error adding to wishlist:", error);
		// Handle specific Mongoose errors
		if (error.name === 'ValidationError') {
			return res.status(400).json({ success: false, message: error.message, data: null });
		}
		if (error.name === 'CastError') {
			return res.status(400).json({ success: false, message: "Invalid ID format.", data: null });
		}
		res.status(500).json({ success: false, message: error.message, data: null });
	}
}

// Delete a wishlist item by product ID for the logged-in user
async function deleteWishlistItem(req, res) {
	try {
		const userId = req.user._id;
		const { pid } = req.params;
		const deleted = await wishlistModel.findOneAndDelete({ user: userId, product: pid });
		if (!deleted) {
			return res.status(404).json({ success: false, message: "Wishlist item not found.", data: null});
		}
		res.status(200).json({ success: true, message: "Removed from wishlist.", data: deleted });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message, data: null });
	}
}

module.exports = {
	getAllWishlists,
	addToWishlist,
	deleteWishlistItem,
};