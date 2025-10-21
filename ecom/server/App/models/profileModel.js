let mongoose = require("mongoose");

let profileSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            enum: ["Mr", "Mrs"],
            default: "Mr"
        },
        name: {
            type: String,
            required: [true, "Name is required"],
            minlength: 2,
            maxlength: 100,
            trim: true
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            default: "johndoe@example.com",
            match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"]
        },
        mobileNumber: {
            type: String,
            required: [true, "Mobile number is required"],
            trim: true,
            match: [/^[0-9]{7,15}$/, "Please provide a valid mobile number (7-15 digits)"]
        },
        address: {
            type: String,
            required: [true, "Address is required"],
            minlength: 5,
            maxlength: 500,
            trim: true
        },
        profileStatus: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

let profileModel = mongoose.model("profiles", profileSchema);

module.exports = { profileModel };