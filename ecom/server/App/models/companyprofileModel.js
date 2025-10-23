let mongoose = require("mongoose");

let companyProfileSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Company name is required"],
            minLength: 2,
            maxLength: 100
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            match: [/.+\@.+\..+/, "Please fill a valid email address"]
        },
        mobile: {
            type: String,
            required: [true, "Mobile number is required"],
            minLength: 10,
            maxLength: 20
        },
        address: {
            type: String,
            default: ""
        },
        mapUrl: {
            type: String,
            default: ""
        },
        avatar: {
            type: String, 
            default: ""
        },
        facebook: {
            type: String,
            default: ""
        },
        youtube: {
            type: String,
            default: ""
        },
        instagram: {
            type: String,
            default: ""
        },
        twitter: {
            type: String,
            default: ""
        }
    },
    { timestamps: true }
);

let companyProfileModel = mongoose.model("companyprofile", companyProfileSchema);

module.exports = { companyProfileModel };