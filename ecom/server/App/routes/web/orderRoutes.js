let express = require("express");
let orderRoutes = express.Router();
const {
    placeOrder,
    getUserOrders,
    getOrderById,
    getOrderByOrderNumber
} = require("../../controllers/web/orderControllers");

const { checkToken } = require("../../middleware/checkToken");

// Place a new order
orderRoutes.post("/place-order", checkToken, placeOrder);

// Get all orders for the logged-in user
orderRoutes.get("/get-orders", checkToken, getUserOrders);
orderRoutes.post("/get-orders", checkToken, getUserOrders);

// Get order by ID
orderRoutes.get("/get-order/:orderId", checkToken, getOrderById);
orderRoutes.post("/get-order/:orderId", checkToken, getOrderById);

// Get order by order number
orderRoutes.get("/get-order-by-number/:orderNumber", checkToken, getOrderByOrderNumber);
orderRoutes.post("/get-order-by-number/:orderNumber", checkToken, getOrderByOrderNumber);

module.exports = { orderRoutes };

