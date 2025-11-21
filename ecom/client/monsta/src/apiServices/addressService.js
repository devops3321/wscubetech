import axios from 'axios';

// Safely get API_BASE_URL with fallback
const API_BASE_URL = (process.env.NEXT_PUBLIC_APIBASEURL || '').replace(/\/+$/, '');

// Get all addresses for the logged-in user
export async function getUserAddressesAPI(userId, token) {
    try {
        if (!API_BASE_URL) {
            return { success: false, error: 'API base URL is not configured' };
        }

        if (!token) {
            return { success: false, error: 'Authentication token is required' };
        }

        const url = `${API_BASE_URL}/address/get-addresses`;
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
            error: err.response?.data?.message || err.message || 'Failed to fetch addresses' 
        };
    }
}

// Get default address by type (billing or shipping)
export async function getDefaultAddressAPI(addressType, userId, token) {
    try {
        if (!API_BASE_URL) {
            return { success: false, error: 'API base URL is not configured' };
        }

        if (!token) {
            return { success: false, error: 'Authentication token is required' };
        }

        const url = `${API_BASE_URL}/address/get-default/${addressType}`;
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
            error: err.response?.data?.message || err.message || 'Failed to fetch default address' 
        };
    }
}

// Create a new address
export async function createAddressAPI(addressData, token) {
    try {
        if (!API_BASE_URL) {
            return { success: false, error: 'API base URL is not configured' };
        }

        if (!token) {
            return { success: false, error: 'Authentication token is required' };
        }

        const url = `${API_BASE_URL}/address/create`;
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.post(url, addressData, config);
        return res.data;
    } catch (err) {
        return { 
            success: false, 
            error: err.response?.data?.message || err.message || 'Failed to create address' 
        };
    }
}

// Update an address
export async function updateAddressAPI(addressId, addressData, token) {
    try {
        if (!API_BASE_URL) {
            return { success: false, error: 'API base URL is not configured' };
        }

        if (!token) {
            return { success: false, error: 'Authentication token is required' };
        }

        const url = `${API_BASE_URL}/address/update/${addressId}`;
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.post(url, addressData, config);
        return res.data;
    } catch (err) {
        return { 
            success: false, 
            error: err.response?.data?.message || err.message || 'Failed to update address' 
        };
    }
}

// Delete an address
export async function deleteAddressAPI(addressId, userId, token) {
    try {
        if (!API_BASE_URL) {
            return { success: false, error: 'API base URL is not configured' };
        }

        if (!token) {
            return { success: false, error: 'Authentication token is required' };
        }

        const url = `${API_BASE_URL}/address/delete/${addressId}`;
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
            error: err.response?.data?.message || err.message || 'Failed to delete address' 
        };
    }
}

// Set address as default
export async function setDefaultAddressAPI(addressId, userId, token) {
    try {
        if (!API_BASE_URL) {
            return { success: false, error: 'API base URL is not configured' };
        }

        if (!token) {
            return { success: false, error: 'Authentication token is required' };
        }

        const url = `${API_BASE_URL}/address/set-default/${addressId}`;
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
            error: err.response?.data?.message || err.message || 'Failed to set default address' 
        };
    }
}

