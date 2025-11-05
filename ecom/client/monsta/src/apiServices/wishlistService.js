import axios from 'axios';
// Safely get API_BASE_URL with fallback
const API_BASE_URL = (process.env.NEXT_PUBLIC_APIBASEURL || '').replace(/\/+$/, '');

// Get all wishlist items for the logged-in user
export const getWishlistItems = async (token) => {
	try {
		const res = await axios.get(`${API_BASE_URL}/wishlist/get-wishlist-items`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		return res.data;
	} catch (error) {
		throw error.response?.data || error;
	}
};

// Add a product to the wishlist
export const addToWishlist = async (productId, token) => {
	try {
		const res = await axios.post(
			`${API_BASE_URL}/wishlist/add-to-wishlist`,
			{ product: productId },
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		return res.data;
	} catch (error) {
		throw error.response?.data || error;
	}
};

// Delete a wishlist item by product ID
export const deleteWishlistItem = async (productId, token) => {
	try {
		const res = await axios.delete(
			`${API_BASE_URL}/wishlist/delete-wishlist-item/${productId}`,
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		return res.data;
	} catch (error) {
		throw error.response?.data || error;
	}
};

