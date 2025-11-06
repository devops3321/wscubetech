let express = require("express");
let productRoutes = express.Router();
const {
	getAllProducts,
	getProductById,
	getFeaturedProducts,
	getRelatedProducts,
	getCategoriesForFilter,
	getMaterialsForFilter,
	getColorsForFilter
} = require("../../controllers/web/productControllers");

// Get filter data (categories, materials, colors)
productRoutes.get("/filters/categories", getCategoriesForFilter);
productRoutes.get("/filters/materials", getMaterialsForFilter);
productRoutes.get("/filters/colors", getColorsForFilter);

// Get featured/best-selling/top-rated/upsell products
productRoutes.get("/featured/list", getFeaturedProducts);

// Get related products
productRoutes.get("/related/list", getRelatedProducts);

// Get all products (with filters, pagination, search)
productRoutes.get("/", getAllProducts);

// Get a single product by ID
productRoutes.get("/:id", getProductById);

module.exports = { productRoutes };