"use client";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { userData } from "./redux/slice/userSlice";
import { useEffect } from "react";

export default function AppHydrateUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = Cookies.get("USER");
    const token = Cookies.get("TOKEN");
    const email = Cookies.get("USER_EMAIL");
    if (user && token && email) {
      dispatch(userData({ user: JSON.parse(user), token, email }));
    }
  }, [dispatch]);

  return null;
}