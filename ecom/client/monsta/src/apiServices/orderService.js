import axios from 'axios';

// Safely get API_BASE_URL with fallback
const API_BASE_URL = (process.env.NEXT_PUBLIC_APIBASEURL || '').replace(/\/+$/, '');

// Place a new order
export async function placeOrderAPI(orderData, token) {
    try {
        if (!API_BASE_URL) {
            return { success: false, error: 'API base URL is not configured' };
        }

        if (!token) {
            return { success: false, error: 'Authentication token is required' };
        }

        const url = `${API_BASE_URL}/order/place-order`;
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.post(url, orderData, config);
        return res.data;
    } catch (err) {
        return { 
            success: false, 
            error: err.response?.data?.message || err.message || 'Failed to place order' 
        };
    }
}

// Get all orders for the logged-in user
export async function getUserOrdersAPI(userId, token) {
    try {
        if (!API_BASE_URL) {
            return { success: false, error: 'API base URL is not configured' };
        }

        if (!token) {
            return { success: false, error: 'Authentication token is required' };
        }

        const url = `${API_BASE_URL}/order/get-orders`;
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.post(url, { userId: String(userId) }, config);
        return res.data;
    } catch (err) {
        return { 
            success: false, 
            error: err.response?.data?.message || err.message || 'Failed to fetch orders' 
        };
    }
}

// Get order by ID
export async function getOrderByIdAPI(orderId, userId, token) {
    try {
        if (!API_BASE_URL) {
            return { success: false, error: 'API base URL is not configured' };
        }

        if (!token) {
            return { success: false, error: 'Authentication token is required' };
        }

        const url = `${API_BASE_URL}/order/get-order/${orderId}`;
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.post(url, { userId: String(userId), orderId }, config);
        return res.data;
    } catch (err) {
        return { 
            success: false, 
            error: err.response?.data?.message || err.message || 'Failed to fetch order' 
        };
    }
}

// Get order by order number
export async function getOrderByOrderNumberAPI(orderNumber, userId, token) {
    try {
        if (!API_BASE_URL) {
            return { success: false, error: 'API base URL is not configured' };
        }

        if (!token) {
            return { success: false, error: 'Authentication token is required' };
        }

        const url = `${API_BASE_URL}/order/get-order-by-number/${orderNumber}`;
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.post(url, { userId: String(userId), orderNumber }, config);
        return res.data;
    } catch (err) {
        return { 
            success: false, 
            error: err.response?.data?.message || err.message || 'Failed to fetch order' 
        };
    }
}

