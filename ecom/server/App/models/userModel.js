let mongoose = require("mongoose");

let userSchema = new mongoose.Schema(
    {
        userName:{
            type:String,
            minLength:2,
            maxLength:30,
            required:[true,"User Name is required"]    
        },        
        userEmail:{
            type:String,
            minLength:2,
            maxLength:30,
            unique:true,
            required:[true,"User Email is required"]    
        },
        userPhone:{
            type:Number,
            minLength:10,
            maxLength:10,
            unique:true,
            required:[true,"User Phone is required"]    
        },        
        userPassword: {
            type: String,
            minLength: 2,
            maxLength: 30,
            required:[true,"User Password is required"]
        }
    }
)

let userModel = mongoose.model("user",userSchema);

module.exports = {userModel};