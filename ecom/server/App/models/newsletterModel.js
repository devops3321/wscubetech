let mongoose = require("mongoose");

let newsletterSchema = new mongoose.Schema(
    {
        newsletterEmail:{
            type:String,
            minLength:2,
            maxLength:30,
            unique:true,
            required:[true,"Newsletter Email is required"]    
        },
        newsletterStatus: {
            type: Boolean,
            default: true
        }
    }
)

let newsletterModel = mongoose.model("newsletter",newsletterSchema);

module.exports = {newsletterModel};