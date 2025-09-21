let mongoose = require("mongoose");

let colorSchema = new mongoose.Schema(
    {
        colorName:{
            type:String,
            minLength:2,
            maxLength:30,
            unique:true,
            required:[true,"Color Name is required"]    
        },
        colorCode: {
            type: String,
            minLength: 2,
            maxLength: 30
        },
        colorOrder: Number,
        colorStatus: {
            type: Boolean,
            default: true
        }
    }
)

let colorModel = mongoose.model("color",colorSchema);

module.exports = {colorModel};