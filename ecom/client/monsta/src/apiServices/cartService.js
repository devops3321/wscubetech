import axios from 'axios';
// Safely get API_BASE_URL with fallback
const API_BASE_URL = (process.env.NEXT_PUBLIC_APIBASEURL || '').replace(/\/+$/, '');

// SSR-compatible addToCart API
export async function addToCartAPI(cartItem, token) {
    try {
        if (!API_BASE_URL) {
            return { success: false, error: 'API base URL is not configured' };
        }
        // Use absolute URL for SSR compatibility
        // Routes are mounted at /web/cart, API_BASE_URL already includes /web
        const url = `${API_BASE_URL}/cart/add-to-cart`;
        const config = token ? {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        } : {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        // Ensure userId is string and all fields are properly formatted
        const formattedCartItem = {
            ...cartItem,
            userId: String(cartItem.userId),
            pid: String(cartItem.pid),
            price: Number(cartItem.price),
            qty: Number(cartItem.qty) || 1
        };
        // Remove any accidental id property
        delete formattedCartItem.id;
        const res = await axios.post(url, formattedCartItem, config);
        return res.data;
    } catch (err) {
        return { success: false, error: err.response?.data?.message || err.message };
    }
}

export async function getCartItemsAPI(userId, token) {
    try {
        // Routes are mounted at /web/cart, API_BASE_URL already includes /web
        const url = `${API_BASE_URL}/cart/get-cart-items`;
        const config = token ? {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        } : {};
        // Server expects userId in request body, but GET requests don't support body
        // Using POST method to send userId in body (alternative: modify server to use query params)
        // Ensure userId is sent as string
        const res = await axios.post(url, { userId: String(userId) }, config);
        return res.data;
    } catch (err) {
        // Handle middleware error responses (status: "failed") or controller errors (success: false)
        const errorData = err.response?.data || {};
        const errorMessage = errorData.message || errorData.error || err.message || 'Failed to fetch cart items';
        return { success: false, status: "failed", error: errorMessage, message: errorMessage };
    }
}

export async function deleteCartItemAPI(pid, userId, token) {
    if (!pid || pid === 'undefined') {
        return { success: false, error: 'Product ID (pid) is required to delete cart item.' };
    }
    try {
        // DELETE /cart/delete-cart-item/:pid expects userId in query param
        const url = `${API_BASE_URL}/cart/delete-cart-item/${encodeURIComponent(pid)}?userId=${encodeURIComponent(userId)}`;
        const config = {
            headers: {
                ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.delete(url, config);
        return res.data;
    } catch (err) {
        return { success: false, error: err.response?.data?.message || err.message };
    }
}

export async function updateCartItemAPI(pid, qty, userId, token) {
    try {
        // PUT /cart/update-cart-item/:pid expects qty, userId, pid in body
        const url = `${API_BASE_URL}/cart/update-cart-item/${pid}`;
        const config = {
            headers: {
                ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                'Content-Type': 'application/json'
            }
        };
        const payload = { qty: Number(qty), userId: String(userId), pid: String(pid) };
        const res = await axios.put(url, payload, config);
        return res.data;
    } catch (err) {
        return { success: false, error: err.response?.data?.message || err.message };
    }
}