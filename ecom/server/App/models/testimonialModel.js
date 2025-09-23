const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
    testimonialImage: {
        type: String,
        required: [true, "Image is required"]
    },
    testimonialName: {
        type: String,
        required: [true, "Name is required"],
        minLength: 2,
        maxLength: 50
    },
    testimonialDesignation: {
        type: String,
        required: [true, "Designation is required"],
        minLength: 2,
        maxLength: 50
    },
    testimonialRating: {
        type: Number,
        required: [true, "Rating is required"],
        min: 1,
        max: 5
    },
    testimonialOrder: {
        type: Number,
        required: [true, "Order is required"]
    },
    testimonialMessage: {
        type: String,
        required: [true, "Message is required"],
        minLength: 5,
        maxLength: 500
    },
    testimonialStatus: {
        type: Boolean,
        default: true
    }
});

const testimonialModel = mongoose.model("testimonial", testimonialSchema);
module.exports = { testimonialModel };