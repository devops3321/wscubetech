let mongoose = require("mongoose");

let contactSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            minLength:2,
            maxLength:30,
            unique:true,
            required:[true,"contact Name is required"]    
        },
        email: {
            type: String,
            minLength: 2,
            maxLength: 30,
            required:[true,"contact Email is required"]    

        },
        phone: {
            type: String,
            minLength: 10,
            maxLength: 20,
            required:[true,"Phone Number is required"]    

        },   
        subject: {
            type: String,
            minLength: 10,
            maxLength: 80
        },    
        message:{
            type: String,
            minLength: 10,
            maxLength: 500
        },
        contactStatus: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true } // <-- added timestamps so sorting by createdAt works
)

let contactModel = mongoose.model("contact",contactSchema);

module.exports = {contactModel};