const { createSlice } = require("@reduxjs/toolkit");

let cartSlice = createSlice(
    {
        name: "cart",
        initialState: {
            cartItem: []
        },
        reducers: {
            addToCart: (state, reqData) => {
                const { payload } = reqData;
                state.cartItem.push(payload);
            },
            deleteCart: (state, reqData) => {
                const { payload } = reqData;
                // const {id} = payload;
                const pid = payload.id;
                state.cartItem = state.cartItem.filter((item) => item.id !== pid);
            },
            updateQuantity: (state, reqData) => {
                const { payload } = reqData;
                const { id, qty } = payload;
                const item = state.cartItem.find(item => item.id === id);
                if (item) {
                    item.qty = qty;
                }
            }
        }
    }
);

export default cartSlice.reducer;

export const { addToCart, deleteCart, updateQuantity } = cartSlice.actions;


