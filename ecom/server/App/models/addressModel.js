const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    userId: { 
        type: String, 
        required: true,
        index: true 
    },
    addressType: {
        type: String,
        enum: ['billing', 'shipping'],
        required: true,
        index: true
    },
    name: { 
        type: String, 
        required: true,
        trim: true 
    },
    email: { 
        type: String, 
        required: true,
        trim: true,
        lowercase: true 
    },
    mobile: { 
        type: String, 
        required: true,
        trim: true 
    },
    address: { 
        type: String, 
        required: true,
        trim: true 
    },
    country: { 
        type: String, 
        required: true,
        trim: true 
    },
    state: { 
        type: String, 
        required: true,
        trim: true 
    },
    city: { 
        type: String, 
        required: true,
        trim: true 
    },
    isDefault: { 
        type: Boolean, 
        default: false,
        index: true 
    }
}, { timestamps: true });

// Compound index to ensure only one default address per type per user
addressSchema.index({ userId: 1, addressType: 1, isDefault: 1 }, { 
    unique: true, 
    partialFilterExpression: { isDefault: true } 
});

const addressModel = mongoose.model("address", addressSchema);

module.exports = { addressModel };

