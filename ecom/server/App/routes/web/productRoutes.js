let express = require("express");
let productRoutes = express.Router();
const {
	getAllProducts,
	getProductById,
	getFeaturedProducts,
	getRelatedProducts
} = require("../../controllers/web/productControllers");

// Get all products (with filters, pagination, search)
productRoutes.get("/", getAllProducts);

// Get a single product by ID
productRoutes.get("/:id", getProductById);

// Get featured/best-selling/top-rated/upsell products
productRoutes.get("/featured/list", getFeaturedProducts);

// Get related products
productRoutes.get("/related/list", getRelatedProducts);

module.exports = { productRoutes };