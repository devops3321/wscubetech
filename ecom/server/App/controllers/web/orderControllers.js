const { orderModel } = require("../../models/orderModel");
const { cartModel } = require("../../models/cartModel");

// Place a new order
const placeOrder = async (req, res) => {
    try {
        const userId = String(req.body.userId || req.body.id || '');
        if (!userId || userId === 'undefined' || userId === 'null') {
            return res.status(400).json({ 
                success: false, 
                message: "userId is required" 
            });
        }

        const { 
            billingAddress, 
            shippingAddress, 
            orderNotes, 
            paymentMethod = 'cash_on_delivery',
            discount = 0 
        } = req.body;

        // Validate billing address
        if (!billingAddress || 
            !billingAddress.name || 
            !billingAddress.email || 
            !billingAddress.mobile || 
            !billingAddress.address || 
            !billingAddress.country || 
            !billingAddress.state || 
            !billingAddress.city) {
            return res.status(400).json({ 
                success: false, 
                message: "Billing address fields are required" 
            });
        }

        // Get cart items for the user
        const cart = await cartModel.findOne({ userId });
        if (!cart || !cart.products || cart.products.length === 0) {
            return res.status(400).json({ 
                success: false, 
                message: "Cart is empty. Please add items to cart before placing an order." 
            });
        }

        // Calculate totals
        let subtotal = 0;
        cart.products.forEach(item => {
            const itemPrice = item.salePrice !== undefined && item.salePrice !== null 
                ? item.salePrice 
                : item.price;
            subtotal += itemPrice * item.qty;
        });

        const discountAmount = Number(discount) || 0;
        const total = Math.max(0, subtotal - discountAmount);

        // Create order
        const orderData = {
            userId,
            items: cart.products.map(item => ({
                pid: String(item.pid),
                name: String(item.name),
                price: Number(item.price),
                qty: Number(item.qty),
                image: item.image || '',
                category: item.category || '',
                salePrice: item.salePrice ? Number(item.salePrice) : undefined,
                actualPrice: item.actualPrice ? Number(item.actualPrice) : undefined
            })),
            billingAddress: {
                name: String(billingAddress.name),
                email: String(billingAddress.email),
                mobile: String(billingAddress.mobile),
                address: String(billingAddress.address),
                country: String(billingAddress.country),
                state: String(billingAddress.state),
                city: String(billingAddress.city)
            },
            subtotal: subtotal,
            discount: discountAmount,
            total: total,
            orderNotes: orderNotes || '',
            paymentMethod: paymentMethod || 'cash_on_delivery',
            status: 'pending',
            paymentStatus: 'pending'
        };

        // Add shipping address if provided
        if (shippingAddress && 
            shippingAddress.name && 
            shippingAddress.email && 
            shippingAddress.mobile && 
            shippingAddress.address && 
            shippingAddress.country && 
            shippingAddress.state && 
            shippingAddress.city) {
            orderData.shippingAddress = {
                name: String(shippingAddress.name),
                email: String(shippingAddress.email),
                mobile: String(shippingAddress.mobile),
                address: String(shippingAddress.address),
                country: String(shippingAddress.country),
                state: String(shippingAddress.state),
                city: String(shippingAddress.city)
            };
        }

        // Generate unique order number before creating order
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        orderData.orderNumber = `ORD-${timestamp}-${random}`;

        const order = new orderModel(orderData);
        await order.save();

        // Clear cart after successful order placement
        await cartModel.findOneAndUpdate(
            { userId },
            { $set: { products: [] } }
        );

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order: {
                orderId: order._id,
                orderNumber: order.orderNumber,
                total: order.total,
                status: order.status,
                createdAt: order.createdAt
            }
        });
    } catch (err) {
        console.error('Error placing order:', err);
        res.status(500).json({ 
            success: false, 
            message: "Error placing order", 
            error: err.message 
        });
    }
};

// Get all orders for a user
const getUserOrders = async (req, res) => {
    try {
        const userId = String(req.body.userId || req.body.id || '');
        if (!userId || userId === 'undefined' || userId === 'null') {
            return res.status(400).json({ 
                success: false, 
                message: "userId is required" 
            });
        }

        const orders = await orderModel.find({ userId })
            .sort({ createdAt: -1 })
            .select('-__v');

        res.status(200).json({
            success: true,
            orders: orders,
            message: "Orders fetched successfully"
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Error fetching orders", 
            error: err.message 
        });
    }
};

// Get order by ID
const getOrderById = async (req, res) => {
    try {
        const userId = String(req.body.userId || req.body.id || '');
        if (!userId || userId === 'undefined' || userId === 'null') {
            return res.status(400).json({ 
                success: false, 
                message: "userId is required" 
            });
        }

        const orderId = req.params.orderId || req.body.orderId;
        if (!orderId) {
            return res.status(400).json({ 
                success: false, 
                message: "orderId is required" 
            });
        }

        const order = await orderModel.findOne({ 
            _id: orderId, 
            userId: userId 
        }).select('-__v');

        if (!order) {
            return res.status(404).json({ 
                success: false, 
                message: "Order not found" 
            });
        }

        res.status(200).json({
            success: true,
            order: order,
            message: "Order fetched successfully"
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Error fetching order", 
            error: err.message 
        });
    }
};

// Get order by order number
const getOrderByOrderNumber = async (req, res) => {
    try {
        const userId = String(req.body.userId || req.body.id || '');
        if (!userId || userId === 'undefined' || userId === 'null') {
            return res.status(400).json({ 
                success: false, 
                message: "userId is required" 
            });
        }

        const orderNumber = req.params.orderNumber || req.body.orderNumber;
        if (!orderNumber) {
            return res.status(400).json({ 
                success: false, 
                message: "orderNumber is required" 
            });
        }

        const order = await orderModel.findOne({ 
            orderNumber: orderNumber, 
            userId: userId 
        }).select('-__v');

        if (!order) {
            return res.status(404).json({ 
                success: false, 
                message: "Order not found" 
            });
        }

        res.status(200).json({
            success: true,
            order: order,
            message: "Order fetched successfully"
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Error fetching order", 
            error: err.message 
        });
    }
};

module.exports = {
    placeOrder,
    getUserOrders,
    getOrderById,
    getOrderByOrderNumber
};

