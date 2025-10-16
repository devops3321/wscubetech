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
            type:String, 
            minLength:10,
            maxLength:20, 
            unique:true,
            required:[true,"User Phone is required"]    
        },        
        userPassword: {
            type: String,
            minLength: 2,
            maxLength: 100, 
            required:[true,"User Password is required"]
        },
        userStatus: {                // <-- added to allow disable/enable
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
)

let userModel = mongoose.model("user",userSchema);

module.exports = {userModel};