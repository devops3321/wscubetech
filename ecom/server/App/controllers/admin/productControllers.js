const { categoryModel } = require("../../models/categoryModel");
const { subcategoryModel } = require("../../models/subcategoryModel");
const { subsubcategoryModel } = require("../../models/subsubcategoryModel");
const { colorModel } = require("../../models/colorModel");
const { materialModel } = require("../../models/materialModel");
const { productModel } = require("../../models/productModel");
const { get } = require("mongoose");

// Fetch all categories (for dropdowns)
const getParentCategory = async (req, res) => {
    let categoryData = await categoryModel.find({ categoryStatus: true }).select("categoryName");
    let resObj = {
        status: "success",
        message: "Parent categories retrieved successfully.",
        categoryData,
        staticPath: process.env.PRODUCT_IMAGE_PATH
    }
    res.send(resObj);
};

// Fetch all subcategories (for dropdowns)
const getSubCategory = async (req, res) => {
    let parentId = req.params.parentId;
    if (!parentId) {
        return res.status(400).json({
            status: "failed",
            message: "Parent ID is required."
        });
    }
    // Use correct parent reference field (parentCategory)
    let categoryData = await subcategoryModel.find({ subcategoryStatus: true, parentCategory: parentId }).select("subcategoryName");
    let resObj = {
        status: "success",
        message: "Subcategories retrieved successfully.",
        categoryData,
        staticPath: process.env.PRODUCT_IMAGE_PATH
    }
    res.send(resObj);
};

// Fetch all subsubcategories (for dropdowns)
const getSubSubCategory = async (req, res) => {
    let subId = req.params.subId;
    if (!subId) {
        return res.status(400).json({
            status: "failed",
            message: "Subcategory ID is required."
        });
    }
    // Use correct subcategory reference field (subcategory)
    let categoryData = await subsubcategoryModel.find({ subsubcategoryStatus: true, subcategory: subId }).select("subsubcategoryName");
    let resObj = {
        status: "success",
        message: "Sub-subcategories retrieved successfully.",
        categoryData,
        staticPath: process.env.PRODUCT_IMAGE_PATH
    }
    res.send(resObj);
};

// Fetch all colors (for dropdowns)
const getColors = async (req, res) => {
    let categoryData = await colorModel.find({ colorStatus: true }).select("colorName");
    let resObj = {
        status: "success",
        message: "Colors retrieved successfully.",
        categoryData,
        staticPath: process.env.PRODUCT_IMAGE_PATH
    }
    res.send(resObj);
};


// Fetch all materials (for dropdowns)
const getMaterial = async (req, res) => {
    let categoryData = await materialModel.find({ materialStatus: true }).select("categoryName");
    let resObj = {
        status: "success",
        message: "Materials retrieved successfully.",
        categoryData,
        staticPath: process.env.PRODUCT_IMAGE_PATH
    }
    res.send(resObj);
};


// Create a new product
const createProduct = async (req, res) => {
    try {
        const productData = req.body;
        if (req.files) {
            if (req.files.productImage && req.files.productImage[0]) {
                productData.productImage = req.files.productImage[0].filename;
            }
            if (req.files.backImage && req.files.backImage[0]) {
                productData.backImage = req.files.backImage[0].filename;
            }
            if (req.files.galleryImage && req.files.galleryImage[0]) {
                productData.galleryImage = req.files.galleryImage[0].filename;
            }
        }
        const product = await productModel.create(productData);
        res.status(201).json({ status: true, message: "Product created successfully", data: product });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find()
            .populate('parentCategory')
            .populate('subCategory')
            .populate('subSubCategory');
        res.status(200).json({ status: true, message: "Products fetched successfully", data: products });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

// Get a single product by ID
const getProductById = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id)
            .populate('parentCategory')
            .populate('subCategory')
            .populate('subSubCategory');
        if (!product) {
            return res.status(404).json({ status: false, message: "Product not found" });
        }
        res.status(200).json({ status: true, message: "Product fetched successfully", data: product });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

// Update a product by ID
const updateProduct = async (req, res) => {
    try {
        const productData = req.body;
        if (req.files) {
            if (req.files.productImage && req.files.productImage[0]) {
                productData.productImage = req.files.productImage[0].filename;
            }
            if (req.files.backImage && req.files.backImage[0]) {
                productData.backImage = req.files.backImage[0].filename;
            }
            if (req.files.galleryImage && req.files.galleryImage[0]) {
                productData.galleryImage = req.files.galleryImage[0].filename;
            }
        }
        const product = await productModel.findByIdAndUpdate(req.params.id, productData, { new: true });
        if (!product) {
            return res.status(404).json({ status: false, message: "Product not found" });
        }
        res.status(200).json({ status: true, message: "Product updated successfully", data: product });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ status: false, message: "Product not found" });
        }
        res.status(200).json({ status: true, message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

module.exports = {
    getParentCategory,
    getSubCategory,
    getSubSubCategory,
    getMaterial,
    getColors,
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};