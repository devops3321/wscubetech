const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, "Product name is required"],
        trim: true,
        minLength: 2,
        maxLength: 100
    },
    productDescription: {
        type: String,
        required: false
    },
    productPrice: {
        type: Number,
        required: [true, "Product price is required"]
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subcategory",
        required: true
    },
    subSubCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subsubcategory",
        required: false
    },
    productImage: String,
    backImage: String,
    galleryImage: String,
    material: String,
    color: String,
    productType: String,
    isBestSelling: {
        type: Boolean,
        default: false
    },
    isTopRated: {
        type: Boolean,
        default: false
    },
    isUpsell: {
        type: Boolean,
        default: false
    },
    actualPrice: Number,
    salePrice: Number,
    totalInStocks: Number,
    order: Number,
    status: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const productModel = mongoose.model("product", productSchema);

module.exports = { productModel };