let mongoose = require("mongoose");

let categorySchema = new mongoose.Schema(
    {
        categoryName:{
            type:String,
            minLength:2,
            maxLength:30,
            unique:true,
            required:[true,"Category Name is required"]    
        },
        categoryImage: String,
        categoryOrder: Number,
        categoryStatus: {
            type: Boolean,
            default: true
        }
    }
)

let categoryModel = mongoose.model("category",categorySchema);

module.exports = {categoryModel};