import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWishlistItems, addToWishlist, deleteWishlistItem } from '@/apiServices/wishlistService';

// Async thunk to fetch wishlist items
export const fetchWishlistItems = createAsyncThunk(
    'wishlist/fetchWishlistItems',
    async (token, { rejectWithValue }) => {
        try {
            const response = await getWishlistItems(token);
            if (response && response.success) {
                // Return the full response object with data and staticImagePath
                return {
                    data: Array.isArray(response.data) ? response.data : [],
                    staticImagePath: response.staticImagePath || ""
                };
            } else {
                const errorMessage = response?.message || 'Failed to fetch wishlist items';
                return rejectWithValue(errorMessage);
            }
        } catch (error) {
            // Handle both error.response?.data format and direct error objects
            const errorMessage = error?.message || error?.response?.data?.message || 'Failed to fetch wishlist items';
            return rejectWithValue(errorMessage);
        }
    }
);

// Async thunk to add item to wishlist
export const addToWishlistAsync = createAsyncThunk(
    'wishlist/addToWishlist',
    async ({ productId, token }, { rejectWithValue }) => {
        try {
            const response = await addToWishlist(productId, token);
            if (response && response.success) {
                return productId;
            } else {
                const errorMessage = response?.message || 'Failed to add to wishlist';
                return rejectWithValue(errorMessage);
            }
        } catch (error) {
            // Handle both error.response?.data format and direct error objects
            const errorMessage = error?.message || error?.response?.data?.message || 'Failed to add to wishlist';
            return rejectWithValue(errorMessage);
        }
    }
);

// Async thunk to delete item from wishlist
export const deleteWishlistItemAsync = createAsyncThunk(
    'wishlist/deleteWishlistItem',
    async ({ productId, token }, { rejectWithValue }) => {
        try {
            const response = await deleteWishlistItem(productId, token);
            if (response && response.success) {
                return productId;
            } else {
                const errorMessage = response?.message || 'Failed to remove from wishlist';
                return rejectWithValue(errorMessage);
            }
        } catch (error) {
            // Handle both error.response?.data format and direct error objects
            const errorMessage = error?.message || error?.response?.data?.message || 'Failed to remove from wishlist';
            return rejectWithValue(errorMessage);
        }
    }
);

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        wishlist: [],
        staticImagePath: "",
        loading: false,
        error: null,
        lastUpdated: null,
    },
    reducers: {
        // Optimistic update for immediate UI feedback
        addToWishlistOptimistic: (state, action) => {
            const pid = action.payload;
            if (!state.wishlist.includes(pid)) {
                state.wishlist.push(pid);
            }
        },
        removeFromWishlistOptimistic: (state, action) => {
            const pid = action.payload;
            state.wishlist = state.wishlist.filter(id => id !== pid);
        },
        clearWishlist: (state) => {
            state.wishlist = [];
            state.error = null;
        },
        clearWishlistError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlistItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWishlistItems.fulfilled, (state, action) => {
                state.loading = false;
                if (Array.isArray(action.payload.data)) {
                    state.wishlist = action.payload.data;
                } else {
                    state.wishlist = [];
                }
                state.staticImagePath = action.payload.staticImagePath || "";
                // Debug log in development
                if (process.env.NODE_ENV === 'development') {
                    console.log("[WISHLIST SLICE] Setting staticImagePath:", action.payload.staticImagePath);
                }
                state.lastUpdated = new Date().toISOString();
                state.error = null;
            })
            .addCase(fetchWishlistItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch wishlist items';
            })
            .addCase(addToWishlistAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToWishlistAsync.fulfilled, (state, action) => {
                state.loading = false;
                // Instead of pushing just the productId, trigger a refetch in the component after add
                // so the wishlist is always in sync with backend (handled in thunk/component)
                state.lastUpdated = new Date().toISOString();
                state.error = null;
            })
            .addCase(addToWishlistAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteWishlistItemAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteWishlistItemAsync.fulfilled, (state, action) => {
                state.loading = false;
                // Filter out the item where product._id matches the deleted productId
                const deletedProductId = String(action.payload);
                state.wishlist = state.wishlist.filter(item => {
                    const productId = item?.product?._id || item?.product;
                    return String(productId) !== deletedProductId;
                });
                state.lastUpdated = new Date().toISOString();
                state.error = null;
            })
            .addCase(deleteWishlistItemAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default wishlistSlice.reducer;
export const { addToWishlistOptimistic, removeFromWishlistOptimistic, clearWishlist, clearWishlistError } = wishlistSlice.actions;


