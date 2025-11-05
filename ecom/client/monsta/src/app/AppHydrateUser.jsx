"use client";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "./redux/slice/userSlice";
import { fetchCartItems } from "./redux/slice/cartSlice";
import { useEffect, useRef } from "react";

export default function AppHydrateUser() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.myUser.user);
  const token = useSelector(state => state.myUser.token);
  const cartFetched = useRef(false);

  // Hydrate user from cookies on mount
  useEffect(() => {
    const userCookie = Cookies.get("USER");
    const tokenCookie = Cookies.get("TOKEN");
    const email = Cookies.get("USER_EMAIL");
    if (userCookie && tokenCookie && email) {
      dispatch(userData({ user: JSON.parse(userCookie), token: tokenCookie, email }));
    }
  }, [dispatch]);

  // Fetch cart items when user is logged in (only once per user change)
  useEffect(() => {
    if (user && token && !cartFetched.current) {
      const userId = user?.userId || user?._id || user?.id;
      if (userId) {
        cartFetched.current = true;
        dispatch(fetchCartItems({ userId, token }))
          .then((result) => {
          })
          .catch((error) => {
            cartFetched.current = false; // Reset on error to allow retry
          });
      }
    }
    // Reset flag when user changes
    if (!user || !token) {
      cartFetched.current = false;
    }
  }, [user, token, dispatch]);

  return null;
}