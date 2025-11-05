import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../slice/counterSlice";  // import the reducer from counterSlice.js --> whole page
import cartReducer from "../slice/cartSlice"; // import the reducer from cartSlice.js --> whole page
import userReducer from "../slice/userSlice"; // import the reducer from userSlice.js --> whole page
import wishlistReducer from "../slice/wishlistSlice"; // import the reducer from wishlistSlice.js --> whole page

export const store = configureStore({
    reducer: {
        mycounter: counterReducer, // mycounter can be any name
        mycart: cartReducer, // mycart can be any name
        myUser: userReducer,
        myWishlist: wishlistReducer // myWishlist can be any name
    }
});