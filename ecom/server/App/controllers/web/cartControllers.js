
const { cartModel } = require("../../models/cartModel");
const mongoose = require("mongoose");


// Get all cart items for the userId from token (req.body.id set by checkToken middleware) or req.body
const getAllcarts = async (req, res) => {
	try {
		// userId can come from token (req.body.id) or explicitly from req.body.userId
		// Convert to string to ensure consistent format
		const userId = String(req.body?.userId || req.body?.id || '');
		if (!userId || userId === 'undefined' || userId === 'null') {
			return res.status(400).json({ success: false, message: "userId is required", error: "userId is required" });
		}
		const cart = await cartModel.findOne({ userId });
		const cartItems = cart ? cart.products : [];
		const staticImagePath = process.env.PRODUCT_IMAGE_PATH || "";
		res.status(200).json({ success: true, cart: cartItems, staticImagePath, message: "Cart items fetched successfully" });
	} catch (err) {
		res.status(500).json({ success: false, message: "Error fetching cart items", error: err.message });
	}
};


// Add to cart (add product or increase qty if exists) for the userId from token or req.body
const addToCart = async (req, res) => {
	try {
		// userId can come from token (req.body.id) or explicitly from req.body.userId
		// Convert to string to ensure consistent format
		const userId = String(req.body.userId || req.body.id || '');
		if (!userId || userId === 'undefined' || userId === 'null') {
			return res.status(400).json({ success: false, message: "userId is required" });
		}

		const { pid, name, price, qty = 1, image, category, salePrice, actualPrice } = req.body;
		if (!pid || !name || price === undefined || price === null) {
			return res.status(400).json({ success: false, message: "pid, name, and price are required" });
		}

		// Prevent product pid from being the same as userId
		if (String(pid) === String(userId)) {
			console.warn('Add to cart - product pid is the same as userId! This will cause only one product in cart. Product will not be appended.', { pid, userId });
		}

		// Ensure qty is a number
		const productQty = Number(qty) || 1;

		const productData = {
			pid: String(pid),
			name: String(name),
			price: Number(price),
			qty: productQty,
			image: image || '',
			category: category || '',
			salePrice: salePrice ? Number(salePrice) : undefined,
			actualPrice: actualPrice ? Number(actualPrice) : undefined
		};

		// First, ensure cart exists (create empty cart if it doesn't)
		let cart = await cartModel.findOne({ userId });

		if (!cart) {
			cart = new cartModel({ userId, products: [] });
			await cart.save();
		}


		// Check if product already exists in the cart
		const existingProduct = cart.products.find(p => String(p.pid) === String(pid));

		if (existingProduct) {
			// Update existing product - replace entire products array to ensure all items are preserved
			const updatedProducts = cart.products.map(p => {
				if (String(p.pid) === String(pid)) {
					// Update the matching product
					return {
						pid: String(pid),
						name: String(name),
						price: Number(price),
						qty: productQty,
						image: image || p.image || '',
						category: category || p.category || '',
						salePrice: salePrice !== undefined ? Number(salePrice) : p.salePrice,
						actualPrice: actualPrice !== undefined ? Number(actualPrice) : p.actualPrice
					};
				}
				// Keep all other products unchanged
				return p;
			});

			// Use $set to replace entire products array - this preserves all items
			cart = await cartModel.findOneAndUpdate(
				{ userId },
				{ $set: { products: updatedProducts } },
				{ new: true }
			);
		} else {
			// Add new product using $push - this appends to the array atomically
			cart = await cartModel.findOneAndUpdate(
				{ userId },
				{ $push: { products: productData } },
				{ new: true }
			);
		}

		// Always fetch fresh cart data to ensure we have the latest state
		cart = await cartModel.findOne({ userId });

		if (!cart) {
			return res.status(500).json({ success: false, message: "Failed to save cart to database" });
		}

		// Ensure we always return an array, even if empty
		const cartItems = Array.isArray(cart.products) ? cart.products : [];
		const staticImagePath = process.env.PRODUCT_IMAGE_PATH || "";

		res.status(200).json({
			success: true,
			cart: cartItems,
			staticImagePath,
			message: "Added to cart",
			itemCount: cartItems.length
		});
	} catch (err) {
		res.status(500).json({ success: false, message: "Error adding to cart", error: err.message });
	}
};


// Update cart item quantity for the userId from token or req.body
const updateCartItem = async (req, res) => {
	try {
		// userId can come from token (req.body.id) or explicitly from req.body.userId
		// Convert to string to ensure consistent format
		const userId = String(req.body.userId || req.body.id || '');
		if (!userId || userId === 'undefined' || userId === 'null') {
			return res.status(400).json({ success: false, message: "userId is required" });
		}
		const { qty } = req.body;
		// Accept pid from params, body, or query for flexibility
		const pid = req.params.pid || req.body.pid || req.query.pid;
		if (!pid) {
			return res.status(400).json({ success: false, message: "pid is required" });
		}
		// Parse qty to number (could be string from frontend)
		const productQty = Number(qty);
		if (isNaN(productQty) || productQty < 1) {
			return res.status(400).json({ success: false, message: "qty must be a valid number >= 1" });
		}
		let cart = await cartModel.findOne({ userId });
		if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });
		const existingItem = cart.products.find(p => String(p.pid) === String(pid));
		if (!existingItem) return res.status(404).json({ success: false, message: "Product not found in cart" });

		   // Update the quantity directly in the found product
		   const product = cart.products.find(p => String(p.pid) === String(pid));
		   if (!product) return res.status(404).json({ success: false, message: "Product not found in cart" });

		   product.qty = productQty;
		   cart.markModified('products');
		   await cart.save();
		   const staticImagePath = process.env.PRODUCT_IMAGE_PATH || "";

		   res.status(200).json({ success: true, cart: cart.products, staticImagePath });
	} catch (err) {
		res.status(500).json({ success: false, message: "Error updating cart item", error: err.message });
	}
};


// Delete cart item for the userId from token or req.body
const deleteCartItem = async (req, res) => {
	try {
		// userId can come from token (req.body.id set by checkToken middleware) or explicitly from req.body.userId
		// For DELETE requests, body might not be parsed, so checkToken sets req.body.id
		// Convert to string to ensure consistent format
		const userId = String(req.body?.userId || req.body?.id || req.query?.id || '');
		if (!userId || userId === 'undefined' || userId === 'null') {
			return res.status(400).json({ success: false, message: "userId is required" });
		}
		// Accept pid from params, body, or query for flexibility
		const pid = req.params.pid || req.body.pid || req.query.pid;
		if (!pid) {
			return res.status(400).json({ success: false, message: "pid is required" });
		}
		let cart = await cartModel.findOne({ userId });
		if (!cart) {
			return res.status(404).json({ success: false, message: "Cart not found" });
		}

		// Check if product exists before attempting to delete
		const productExists = cart.products.some(p => String(p.pid) === String(pid));
		if (!productExists) {
			return res.status(404).json({ success: false, message: "Product not found in cart" });
		}

		// Use atomic $pull operator to remove the product from database
		const result = await cartModel.findOneAndUpdate(
			{ userId },
			{ $pull: { products: { pid: String(pid) } } },
			{ new: true }
		);

		if (!result) {
			return res.status(500).json({ success: false, message: "Failed to delete cart item from database" });
		}
		const staticImagePath = process.env.PRODUCT_IMAGE_PATH || "";

		res.status(200).json({ success: true, cart: result.products, staticImagePath });
	} catch (err) {
		res.status(500).json({ success: false, message: "Error deleting cart item", error: err.message });
	}
};

module.exports = {
	getAllcarts,
	addToCart,
	updateCartItem,
	deleteCartItem
};


