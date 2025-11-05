import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addToCartAPI, getCartItemsAPI, deleteCartItemAPI, updateCartItemAPI } from "@/apiServices/cartService";

/**
 * Async Thunks Structure:
 * We use separate async thunks for each cart operation (fetch, add, update, delete) because:
 * 1. Each operation has different API endpoints and parameters
 * 2. Different loading states and error handling per operation
 * 3. Better code organization and maintainability
 * 4. Redux Toolkit best practice - one thunk per distinct async operation
 * 
 * This allows us to handle each operation independently with proper loading/error states.
 */

// Async thunk to fetch cart items from database
export const fetchCartItems = createAsyncThunk(
    'cart/fetchCartItems',
    async ({ userId, token }, { rejectWithValue }) => {
        try {
            const response = await getCartItemsAPI(userId, token);
            // Handle both success and status fields (some APIs use status: "success")
            const isSuccess = response.success === true || response.status === "success";
            if (isSuccess) {
                // Ensure we return an array and handle null/undefined
                const cartItems = response.cart || [];
                return {
                    cart: Array.isArray(cartItems) ? cartItems : [],
                    staticImagePath: response.staticImagePath || ""
                };
            } else {
                // Handle different error response formats
                const errorMsg = response.error || response.message || 'Failed to fetch cart items';
                return rejectWithValue(errorMsg);
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.response?.data?.error || error.message || 'Failed to fetch cart items';
            return rejectWithValue(errorMsg);
        }
    }
);

// Async thunk to add item to cart
export const addToCartAsync = createAsyncThunk(
    'cart/addToCart',
    async ({ cartItem, token }, { rejectWithValue }) => {
        try {
            const response = await addToCartAPI(cartItem, token);
            if (response.success) {
                // Return both cart and staticImagePath
                const cartItems = response.cart || [];
                return {
                    cart: Array.isArray(cartItems) ? cartItems : [],
                    staticImagePath: response.staticImagePath || ""
                };
            } else {
                // Handle different error response formats
                const errorMsg = response.error || response.message || 'Failed to add item to cart';
                return rejectWithValue(errorMsg);
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message || 'Failed to add item to cart';
            return rejectWithValue(errorMsg);
        }
    }
);

// Async thunk to update cart item quantity
export const updateCartItemAsync = createAsyncThunk(
    'cart/updateCartItem',
    async ({ pid, qty, userId, token }, { rejectWithValue }) => {
        try {
            const response = await updateCartItemAPI(pid, qty, userId, token);
            if (response.success) {
                const cartItems = response.cart || [];
                return {
                    cart: Array.isArray(cartItems) ? cartItems : [],
                    staticImagePath: response.staticImagePath || ""
                };
            } else {
                const errorMsg = response.error || response.message || 'Failed to update cart item';
                return rejectWithValue(errorMsg);
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message || 'Failed to update cart item';
            return rejectWithValue(errorMsg);
        }
    }
);

// Async thunk to delete cart item
export const deleteCartItemAsync = createAsyncThunk(
    'cart/deleteCartItem',
    async ({ pid, userId, token }, { rejectWithValue }) => {
        try {
            const response = await deleteCartItemAPI(pid, userId, token);
            if (response.success) {
                const cartItems = response.cart || [];
                return {
                    pid,
                    cart: Array.isArray(cartItems) ? cartItems : [],
                    staticImagePath: response.staticImagePath || ""
                };
            } else {
                const errorMsg = response.error || response.message || 'Failed to delete cart item';
                return rejectWithValue(errorMsg);
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message || 'Failed to delete cart item';
            return rejectWithValue(errorMsg);
        }
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItem: [], // Always start empty, fetch from database
        staticImagePath: "",
        loading: false,
        error: null,
        lastUpdated: null
    },
    reducers: {
        // Optimistic update for immediate UI feedback (before server confirms)
        addToCartOptimistic: (state, action) => {
            const { payload } = action;
            const existing = state.cartItem.find(item => item.pid === payload.pid);
            if (existing) {
                existing.qty = payload.qty || (existing.qty + 1);
            } else {
                state.cartItem.push(payload);
            }
        },
        // Clear cart
        clearCart: (state) => {
            state.cartItem = [];
            state.error = null;
        },
        // Clear error
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch cart items
            .addCase(fetchCartItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.loading = false;
                // Handle new response structure with cart and staticImagePath
                if (action.payload && typeof action.payload === 'object') {
                    if (Array.isArray(action.payload.cart)) {
                        state.cartItem = action.payload.cart;
                    } else if (Array.isArray(action.payload)) {
                        // Backward compatibility: if payload is directly an array
                        state.cartItem = action.payload;
                    } else {
                        state.cartItem = [];
                    }
                    state.staticImagePath = action.payload.staticImagePath || "";
                } else {
                    state.cartItem = [];
                }
                state.lastUpdated = new Date().toISOString();
                state.error = null;
            })
            .addCase(fetchCartItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch cart items';
            })
            // Add to cart
            .addCase(addToCartAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCartAsync.fulfilled, (state, action) => {
                state.loading = false;
                // Handle response with cart array and staticImagePath
                if (action.payload && typeof action.payload === 'object') {
                    if (Array.isArray(action.payload.cart)) {
                        state.cartItem = action.payload.cart;
                    } else if (Array.isArray(action.payload)) {
                        state.cartItem = action.payload;
                    } else {
                        state.cartItem = [];
                    }
                    if (action.payload.staticImagePath) {
                        state.staticImagePath = action.payload.staticImagePath;
                    }
                } else if (Array.isArray(action.payload)) {
                    state.cartItem = action.payload;
                } else {
                    state.cartItem = [];
                }
                state.lastUpdated = new Date().toISOString();
                state.error = null;
            })
            .addCase(addToCartAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update cart item
            .addCase(updateCartItemAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCartItemAsync.fulfilled, (state, action) => {
                state.loading = false;
                // Handle response with cart array and staticImagePath
                if (action.payload && typeof action.payload === 'object') {
                    if (Array.isArray(action.payload.cart)) {
                        state.cartItem = action.payload.cart;
                    } else if (Array.isArray(action.payload)) {
                        state.cartItem = action.payload;
                    } else {
                        state.cartItem = [];
                    }
                    if (action.payload.staticImagePath) {
                        state.staticImagePath = action.payload.staticImagePath;
                    }
                } else if (Array.isArray(action.payload)) {
                    state.cartItem = action.payload;
                } else {
                    state.cartItem = [];
                }
                state.lastUpdated = new Date().toISOString();
                state.error = null;
            })
            .addCase(updateCartItemAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete cart item
            .addCase(deleteCartItemAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCartItemAsync.fulfilled, (state, action) => {
                state.loading = false;
                // Handle response with cart array and staticImagePath
                if (action.payload && typeof action.payload === 'object') {
                    if (Array.isArray(action.payload.cart)) {
                        state.cartItem = action.payload.cart;
                    } else if (Array.isArray(action.payload)) {
                        state.cartItem = action.payload;
                    } else {
                        state.cartItem = [];
                    }
                    if (action.payload.staticImagePath) {
                        state.staticImagePath = action.payload.staticImagePath;
                    }
                } else if (Array.isArray(action.payload)) {
                    state.cartItem = action.payload;
                } else {
                    state.cartItem = [];
                }
                state.lastUpdated = new Date().toISOString();
                state.error = null;
            })
            .addCase(deleteCartItemAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default cartSlice.reducer;

export const { addToCartOptimistic, clearCart, clearError } = cartSlice.actions;


