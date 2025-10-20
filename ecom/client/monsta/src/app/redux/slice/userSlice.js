const { createSlice } = require("@reduxjs/toolkit");
import Cookies from "js-cookie";

let userSlice = createSlice(
    {

        name: "user",
        initialState: {
            user: Cookies.get("USER") ? JSON.parse(Cookies.get("USER")) : null
        },
        reducers: {
            userData: function (state, reqData) {
                let { payload } = reqData;
                state.user = payload;
                Cookies.set("USER", JSON.stringify(payload));
            },
            logOut: function (state) {
                state.user = null;
                Cookies.remove("USER");
            }
        }
    }
);

export default userSlice.reducer;

export const { userData, logOut } = userSlice.actions;