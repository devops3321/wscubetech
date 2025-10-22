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
            minlength: 2,
            maxlength: 100,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
            default: "johndoe@example.com",
            match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"]
        },
        mobileNumber: {
            type: String,
            trim: true,
            unique: true
        },
        address: {
            type: String,
            minlength: 0,
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