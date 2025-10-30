import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_APIBASEURL.replace(/\/+$/, '');

// Get all subcategories for a parent category
export const getSubCategories = async (parentCategoryId) => {
	try {
		const res = await axios.get(`${API_BASE_URL}/subcategory`, { params: { parentCategory: parentCategoryId } });
		return res.data;
	} catch (error) {
		throw error?.response?.data || error;
	}
};

// Get all subsubcategories for a subcategory
export const getSubSubCategories = async (subcategoryId) => {
	try {
		const res = await axios.get(`${API_BASE_URL}/subsubcategory`, { params: { subcategory: subcategoryId } });
		return res.data;
	} catch (error) {
		throw error?.response?.data || error;
	}
};


// Get all products (with filters, pagination, search)
export const getAllProducts = async (params = {}) => {
	try {
		const res = await axios.get(`${API_BASE_URL}/product`, { params });
		let resObj = {
			...res.data,
			staticPath: res.data.staticPath || ""
		};
		return resObj;
	} catch (error) {
		throw error?.response?.data || error;
	}
};

// Get a single product by ID
export const getProductById = async (id) => {
	try {
		const res = await axios.get(`${API_BASE_URL}/product/${id}`);
		let resObj = {
			...res.data,
			staticPath: res.data.staticPath || ""
		};
		return resObj;
	} catch (error) {
		throw error?.response?.data || error;
	}
};

// Get featured/best-selling/top-rated/upsell products
export const getFeaturedProducts = async (params = {}) => {
	try {
		const res = await axios.get(`${API_BASE_URL}/product/featured/list`, { params });
		let resObj = {
			...res.data,
            staticPath: res.data.staticPath || ""
		};
		return resObj;
	} catch (error) {
		throw error?.response?.data || error;
	}
};

// Get related products
export const getRelatedProducts = async (params = {}) => {
	try {
		const res = await axios.get(`${API_BASE_URL}/product/related/list`, { params });
		let resObj = {
			...res.data,
			staticPath: res.data.staticPath || ""
		};
		return resObj;
	} catch (error) {
		throw error?.response?.data || error;
	}
};