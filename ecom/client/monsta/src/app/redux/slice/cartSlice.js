const { createSlice } = require("@reduxjs/toolkit");

let cartSlice = createSlice(
    {
        name: "cart",
        initialState: {
            cartItem: [{
                id: 1,
                title: "Modern Wooden Chair",
                price: 2499,
                qty: 2,
                image: "https://wscubetech.co/Assignments/furniture/public/frontend/img/product/1.jpg",
                description: "This is a sample product description.",
                category: "Furniture",
            },
            {
                id: 2,
                title: "Elegant Sofa Set",
                price: 7999,
                qty: 1,
                image: "https://wscubetech.co/Assignments/furniture/public/frontend/img/product/2.jpg",
                description: "This is another product description.",
                category: "Furniture",
            },
            {
                id: 3,
                title: "Coffee Table",
                price: 3999,
                qty: 1,
                image: "https://wscubetech.co/Assignments/furniture/public/frontend/img/product/3.jpg",
                description: "This is another product description.",
                category: "Furniture",
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


