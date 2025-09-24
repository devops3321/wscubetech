let mongoose = require("mongoose");

let subcategorySchema = new mongoose.Schema(
    {
        subcategoryName:{
            type:String,
            minLength:2,
            maxLength:30,
            unique:true,
            required:[true,"subcategory Name is required"]    
        },
        parentCategory: {   
            type: mongoose.Schema.Types.ObjectId,
            ref: "category"
        },
        subcategoryImage: String,
        subcategoryOrder: Number,
        subcategoryStatus: {
            type: Boolean,
            default: true
        }
    }
)

let subcategoryModel = mongoose.model("subcategory",subcategorySchema);

module.exports = {subcategoryModel};