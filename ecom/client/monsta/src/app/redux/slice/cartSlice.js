const { createSlice } = require("@reduxjs/toolkit");

let cartSlice = createSlice(
    {
        name: "cart",
        initialState: {
            cartItem: [{
                id: 1,
                title: "Sample Product",
                price: 29.99,
                description: "This is a sample product description.",
                category: "Sample Category",
            },
            {
                id: 2,
                title: "Another Product",
                price: 49.99,
                description: "This is another product description.",
                category: "Another Category",
            },
            {
                id: 3,
                title: "Yet Another Product",
                price: 39.99,
                description: "This is another product description.",
                category: "Another Category",
            },
            ]
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
            }
        }
    }
);

export default cartSlice.reducer;

export const { addToCart, deleteCart } = cartSlice.actions;


