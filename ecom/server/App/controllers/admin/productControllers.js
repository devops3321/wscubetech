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
        let productImage = req.files?.productImage?.[0]?.filename || "";
        let productBackImage = req.files?.productBackImage?.[0]?.filename || "";
        let galleryImages = req.files?.galleryImage ? req.files.galleryImage.map(f => f.filename) : [];

        let color = req.body.color;
        let material = req.body.material;
        if (typeof color === "string") color = [color];
        if (typeof material === "string") material = [material];

        const newProduct = new productModel({
            productName: req.body.productName,
            productDescription: req.body.productDescription,
            parentCategory: req.body.parentCategory,
            subCategory: req.body.subCategory,
            subSubCategory: req.body.subSubCategory,
            material: material,
            color: color,
            productType: req.body.productType,
            isBestSelling: req.body.isBestSelling,
            isTopRated: req.body.isTopRated,
            isUpsell: req.body.isUpsell,
            actualPrice: req.body.actualPrice,
            salePrice: req.body.salePrice,
            totalInStocks: req.body.totalInStocks,
            order: req.body.order,
            productImage: productImage,
            productBackImage: productBackImage,
            galleryImage: galleryImages,

        });

        const product = await productModel.create(newProduct);
        res.status(201).json({
            status: "success",
            message: "Product created successfully",
            data: newProduct,
            productStaticPath: process.env.PRODUCT_IMAGE_PATH
        });
        console.log("Product created:", product);
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
        let updateData = {};
        if (req.files?.productImage?.[0]) updateData.productImage = req.files.productImage[0].filename;
        if (req.files?.productBackImage?.[0]) updateData.productBackImage = req.files.productBackImage[0].filename;
        if (req.files?.galleryImage) updateData.galleryImage = req.files.galleryImage.map(f => f.filename);

        const product = await productModel.findByIdAndUpdate(req.params.id, { ...productData, ...updateData }, { new: true });
        if (!product) {
            return res.status(404).json({ status: false, message: "Product not found" });
        }
        res.json({
            status: "success",
            message: "Product updated successfully",
            data: updatedProduct,
            productStaticPath: process.env.PRODUCT_IMAGE_PATH
        });
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