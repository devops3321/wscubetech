import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../slice/counterSlice";  // import the reducer from counterSlice.js --> whole page
import cartReducer from "../slice/cartSlice"; // import the reducer from cartSlice.js --> whole page

export const store = configureStore({
    reducer: {
        mycounter: counterReducer, // mycounter can be any name
        mycart: cartReducer // mycart can be any name
    }
});