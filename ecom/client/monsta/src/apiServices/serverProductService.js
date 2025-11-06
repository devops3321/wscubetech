// Server-side API service for Next.js server components
// Uses fetch instead of axios for SSR compatibility

const API_BASE_URL = process.env.NEXT_PUBLIC_APIBASEURL?.replace(/\/+$/, '') || '';

async function fetchAPI(endpoint, params = {}) {
  try {
    if (!API_BASE_URL) {
      console.error('API_BASE_URL is not configured');
      throw new Error('API_BASE_URL is not configured');
    }

    // Ensure endpoint starts with /
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    // Ensure API_BASE_URL doesn't have trailing slash
    const cleanBaseUrl = API_BASE_URL.replace(/\/+$/, '');
    
    // Construct full URL - for server-side fetch, we need absolute URL
    let fullUrl = `${cleanBaseUrl}${cleanEndpoint}`;
    
    // Build query string
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => queryParams.append(key, v));
      } else if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value);
      }
    });
    
    const queryString = queryParams.toString();
    if (queryString) {
      fullUrl += `?${queryString}`;
    }

    const response = await fetch(fullUrl, {
      cache: 'no-store', // Ensure fresh data on each request
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      console.error(`API error ${response.status} for ${fullUrl}:`, errorText);
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API fetch error:', error.message, 'for endpoint:', endpoint);
    throw error;
  }
}

// Get all products (with filters, pagination, search)
export async function getAllProducts(params = {}) {
  try {
    const res = await fetchAPI('/product', params);
    return {
      ...res,
      staticPath: res.staticPath || ""
    };
  } catch (error) {
    return { data: [], totalCount: 0, page: 1, totalPage: 1, staticPath: "", status: false };
  }
}

// Get categories with subcategories for filtering
export async function getCategoriesForFilter() {
  try {
    const res = await fetchAPI('/product/filters/categories');
    return res;
  } catch (error) {
    console.warn('Failed to fetch categories for filter:', error.message);
    return { data: [], status: false };
  }
}

// Get materials for filtering
export async function getMaterialsForFilter() {
  try {
    const res = await fetchAPI('/product/filters/materials');
    return res;
  } catch (error) {
    console.warn('Failed to fetch materials for filter:', error.message);
    return { data: [], status: false };
  }
}

// Get colors for filtering
export async function getColorsForFilter() {
  try {
    const res = await fetchAPI('/product/filters/colors');
    return res;
  } catch (error) {
    console.warn('Failed to fetch colors for filter:', error.message);
    return { data: [], status: false };
  }
}

