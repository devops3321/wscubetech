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
		// Debug logging in development
		if (process.env.NODE_ENV === 'development') {
			console.log('🌐 Axios - Params being sent:', {
				...params,
				material: params.material,
				materialIsArray: Array.isArray(params.material),
				color: params.color,
				colorIsArray: Array.isArray(params.color)
			});
		}
		
		// Axios automatically serializes arrays as ?key=value1&key=value2 which is what Express expects
		const res = await axios.get(`${API_BASE_URL}/product`, { 
			params,
			paramsSerializer: {
				indexes: null // Use ?key=value1&key=value2 format (not ?key[]=value1&key[]=value2)
			}
		});
		
		// Debug: Log the actual URL that was called
		if (process.env.NODE_ENV === 'development') {
			const url = new URL(`${API_BASE_URL}/product`);
			Object.keys(params).forEach(key => {
				if (Array.isArray(params[key])) {
					params[key].forEach(val => url.searchParams.append(key, val));
				} else {
					url.searchParams.append(key, params[key]);
				}
			});
			console.log('🌐 Axios - Actual URL called:', url.toString());
		}
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

// Get categories with subcategories for filtering
export const getCategoriesForFilter = async () => {
	try {
		const res = await axios.get(`${API_BASE_URL}/product/filters/categories`);
		return res.data;
	} catch (error) {
		throw error?.response?.data || error;
	}
};

// Get materials for filtering
export const getMaterialsForFilter = async () => {
	try {
		const res = await axios.get(`${API_BASE_URL}/product/filters/materials`);
		return res.data;
	} catch (error) {
		throw error?.response?.data || error;
	}
};

// Get colors for filtering
export const getColorsForFilter = async () => {
	try {
		const res = await axios.get(`${API_BASE_URL}/product/filters/colors`);
		return res.data;
	} catch (error) {
		throw error?.response?.data || error;
	}
};