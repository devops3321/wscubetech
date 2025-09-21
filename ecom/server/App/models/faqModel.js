let mongoose = require("mongoose");

let faqSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            minLength:2,
            maxLength:500,
            unique:true,
            required:[true,"Question is required"]
        },
        answer: {
            type: String,
            minLength:2,
            maxLength:500,
            required: [true, "Answer is required"]
        },
        order:{
            type: Number,
            required: [true, "Order Qty is required"]
        },
        faqStatus: {
            type: Boolean,
            default: true
        }
    }
)

let faqModel = mongoose.model("faqs", faqSchema);

module.exports = {faqModel};