const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    pid: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true, min: 1 },
    image: { type: String, default: '' },
    category: { type: String, default: '' },
    salePrice: { type: Number },
    actualPrice: { type: Number }
}, { _id: false });

const billingAddressSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    address: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true }
}, { _id: false });

const shippingAddressSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    mobile: { type: String },
    address: { type: String },
    country: { type: String },
    state: { type: String },
    city: { type: String }
}, { _id: false });

const orderSchema = new mongoose.Schema({
    userId: { 
        type: String, 
        required: true,
        index: true 
    },
    orderNumber: { 
        type: String, 
        required: true,
        unique: true,
        index: true 
    },
    items: [orderItemSchema],
    billingAddress: { 
        type: billingAddressSchema, 
        required: true 
    },
    shippingAddress: { 
        type: shippingAddressSchema 
    },
    subtotal: { 
        type: Number, 
        required: true,
        min: 0 
    },
    discount: { 
        type: Number, 
        default: 0,
        min: 0 
    },
    total: { 
        type: Number, 
        required: true,
        min: 0 
    },
    orderNotes: { 
        type: String, 
        default: '' 
    },
    status: { 
        type: String, 
        enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending',
        index: true 
    },
    paymentStatus: { 
        type: String, 
        enum: ['pending', 'paid', 'failed', 'refunded'],
        default: 'pending' 
    },
    paymentMethod: { 
        type: String, 
        default: 'cash_on_delivery' 
    }
}, { timestamps: true });

// Generate unique order number before saving
orderSchema.pre('save', async function(next) {
    if (!this.orderNumber) {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        this.orderNumber = `ORD-${timestamp}-${random}`;
    }
    next();
});

const orderModel = mongoose.model("order", orderSchema);

module.exports = { orderModel };

