let mongoose = require("mongoose");

let adminProfileSchema = new mongoose.Schema(
    {
        adminName: {
            type: String,
            minLength: 2,
            maxLength: 30,
            required: [true, "Admin name is required"]
        },
        adminEmail: {
            type: String,
            minLength: 5,
            maxLength: 50,
            unique: true,
            required: [true, "Admin email is required"]
        },
        adminMobile: {
            type: String,
            minLength: 10,
            maxLength: 15,
            required: [true, "Mobile number is required"]
        },
        adminAvatar: {
            type: String, 
            default: ""
        }
    },
    { timestamps: true }
);

let adminProfileModel = mongoose.model("adminProfile", adminProfileSchema);

module.exports = { adminProfileModel };