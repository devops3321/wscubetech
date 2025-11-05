const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
    pid: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, default: 1 },
    image: { type: String, default: '' },
    category: { type: String, default: '' },
    salePrice: { type: Number },
    actualPrice: { type: Number }
}, { _id: false });

const cartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    products: [productSchema]
});

const cartModel = mongoose.model("cart", cartSchema);

module.exports = { cartModel };