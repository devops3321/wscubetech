let mongoose = require("mongoose");

let subsubcategorySchema = new mongoose.Schema(
    {
        subsubcategoryName: {
            type: String,
            minLength: 2,
            maxLength: 30,
            unique: true,
            required: [true, "Subsubcategory Name is required"]
        },
        parentCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "category"
        },
        subcategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "subcategory"
        },
        subsubcategoryImage: String,
        subsubcategoryOrder: Number,
        subsubcategoryStatus: {
            type: Boolean,
            default: true
        }
    }
)

let subsubcategoryModel = mongoose.model("subsubcategory", subsubcategorySchema);

module.exports = { subsubcategoryModel };