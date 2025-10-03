const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productImage: { type: String, default: "" },
    productBackImage: { type: String, default: "" },
    galleryImage: [{ type: String }],
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
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: "subcategory" },
    subSubCategory: { type: mongoose.Schema.Types.ObjectId, ref: "subsubcategory" },
    material: [{ type: mongoose.Schema.Types.ObjectId, ref: "materials" }],
    color: [{ type: mongoose.Schema.Types.ObjectId, ref: "colorModel" }],
    productType: {
        type: String,
        enum: ['Featured', 'New Arrivals', 'On Sale'],
    },
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
    productOrder: Number,
    productDescription: String,
    productStatus: {
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