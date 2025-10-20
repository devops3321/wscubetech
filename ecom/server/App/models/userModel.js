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
            sparse: true, // allow multiple docs without phone
            required:false
        },        
        userPassword: {
            type: String,
            minLength: 2,
            maxLength: 100,
            required:false // not required for OAuth users
        },
        userStatus: {
            type: Boolean,
            default: true
        },
        authProvider: {     // store how the user signed up (local / google / etc.)
            type: String,
            enum: ["local", "google", "facebook", "other"],
            default: "local"
        },
        providerId: {       // provider-specific id (optional)
            type: String,
            default: null,
            sparse: true
        }
    },
    { timestamps: true }
)

let userModel = mongoose.model("user",userSchema);

module.exports = {userModel};