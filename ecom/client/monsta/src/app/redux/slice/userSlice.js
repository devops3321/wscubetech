import Cookies from "js-cookie";
import { createSlice } from "@reduxjs/toolkit";

function safeParse(cookieValue) {
    try {
        if (!cookieValue || cookieValue === "undefined" || cookieValue === "null") return null;
        return JSON.parse(cookieValue);
    } catch (err) {
        console.warn("Invalid cookie data for USER:", err);
        return null;
    }
}

const initialUser = typeof window !== "undefined" ? safeParse(Cookies.get("USER")) : null;
const initialToken = typeof window !== "undefined" ? Cookies.get("TOKEN") || '' : '';

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: initialUser,
        token: initialToken,
    },
    reducers: {
        userData: (state, action) => {
            const { payload } = action;
            state.user = payload.user;
            state.token = payload.token;
            Cookies.set("USER", JSON.stringify(state.user));
            Cookies.set("TOKEN", state.token);
        },
        logOut: (state) => {
            state.user = null;
            state.token = '';
            Cookies.remove("USER");
            Cookies.remove("TOKEN");
        },
    },
});

export default userSlice.reducer;
export const { userData, logOut } = userSlice.actions;
