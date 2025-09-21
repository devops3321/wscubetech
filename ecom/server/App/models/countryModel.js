let mongoose = require("mongoose");

let countrySchema = new mongoose.Schema(
    {
        countryName: {
            type: String,
            minLength:2,
            maxLength:30,
            unique:true,
            required:[true,"Country Name is required"]
        },
        order: {
            type: Number,
            required: [true, "Order Qty is required"]
        },
        countryStatus: {
            type: Boolean,
            default: true
        }
    }
)

let countryModel = mongoose.model("countries", countrySchema);

module.exports = {countryModel};