const express = require("express");
const multer = require("multer");
const path = require("path");
const {
    getParentCategory,
    getSubCategory,
    getSubSubCategory,
    getColors,
    getMaterial,
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    updateProductStatus,
    deleteMultipleProducts
} = require("../../controllers/admin/productControllers");

const productRoutes = express.Router();

// Multer config for product images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../../uploads/product/'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

productRoutes.get("/get-parent-category", getParentCategory);
productRoutes.get("/get-sub-category/:parentId", getSubCategory);
productRoutes.get("/get-sub-sub-category/:subId", getSubSubCategory);
productRoutes.get("/get-colors", getColors);
productRoutes.get("/get-material", getMaterial);

// Product CRUD routes
productRoutes.post("/add", upload.fields([
    { name: 'productImage', maxCount: 1 },
    { name: 'productBackImage', maxCount: 1 },
    { name: 'galleryImage', maxCount: 10 }
]), createProduct);

productRoutes.get("/view", getAllProducts);

// --- Place static routes BEFORE dynamic ones ---
productRoutes.post("/statusupdate", updateProductStatus);
productRoutes.delete("/multidelete", deleteMultipleProducts);

// --- Dynamic routes at the end ---
productRoutes.get("/:id", getProductById);
productRoutes.put("/:id", upload.fields([
    { name: 'productImage', maxCount: 1 },
    { name: 'productBackImage', maxCount: 1 },
    { name: 'galleryImage', maxCount: 10 }
]), updateProduct);
productRoutes.delete("/:id", deleteProduct);

module.exports = { productRoutes };