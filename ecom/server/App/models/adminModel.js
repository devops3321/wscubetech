let mongoose = require("mongoose");

let adminSchema = new mongoose.Schema(
    {
        adminEmail:{
            type:String,
            minLength:2,
            maxLength:30,
            unique:true,
            required:[true,"admin Email is required"]    
        },
        adminPassword: {
            type: String,
            minLength: 2,
            maxLength: 30
        }
    }
)

let adminModel = mongoose.model("admin",adminSchema);

module.exports = {adminModel};