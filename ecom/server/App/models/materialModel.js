let mongoose = require("mongoose");

let materialSchema = new mongoose.Schema(
    {
        categoryName: {
            type: String,
            minLength:2,
            maxLength:30,
            unique:true,
            required:[true,"Category Name is required"]
        },
        order: {
            type: Number,
            required: [true, "Order Qty is required"]
        },
        materialStatus: {
            type: Boolean,
            default: true
        }
    }
)

let materialModel = mongoose.model("materials", materialSchema);

module.exports = {materialModel};