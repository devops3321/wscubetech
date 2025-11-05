import Cookies from "js-cookie";
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: Cookies.get("USER") ? JSON.parse(Cookies.get("USER")) : null,
        token: Cookies.get("TOKEN") || null,
        email: Cookies.get("USER_EMAIL") ? Cookies.get("USER_EMAIL") : null
    },
    reducers: {
        // used when logging in / setting user normally
        userData: (state, action) => {
            const { payload } = action;
            state.user = payload.user;
            state.token = payload.token;
            state.email = payload.user.userEmail;
            Cookies.set("USER", JSON.stringify(state.user));
            Cookies.set("TOKEN", state.token);
            Cookies.set("USER_EMAIL", state.email);
        },
        logOut: (state) => {
            state.user = null;
            state.token = '';
            Cookies.remove("USER");
            Cookies.remove("TOKEN");
            Cookies.remove("USER_EMAIL");
        },
    },
});

export default userSlice.reducer;
export const { userData, logOut } = userSlice.actions;