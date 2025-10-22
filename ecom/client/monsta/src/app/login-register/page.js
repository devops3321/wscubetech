"use client"
import React, { useState } from 'react'
import Breadcrumb from '../common/Breadcrumb'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { redirect, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../redux/slice/userSlice';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../../config/fireBaseConfig';

export default function LoginRegister() {
    const apiBaseurl = process.env.NEXT_PUBLIC_APIBASEURL;

    const [showOtp, setShowOtp] = useState(false);
    const [registerData, setRegisterData] = useState({
        userName: '',
        userEmail: '',
        userPhone: '',
        userPassword: '',
        otp: ''
    });

    const [loginData, setLoginData] = useState({
        userEmail: '',
        userPassword: ''
    });
    const [googleLoading, setGoogleLoading] = useState(false);

    const router = useRouter();

    const dispatch = useDispatch();

    const loginUser = useSelector((store) => store.myUser.user);

    const handleRegisterChange = (e) => {
        setRegisterData({ ...registerData, [e.target.id]: e.target.value });
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        axios.post(`${apiBaseurl}user/send-otp`, registerData)
            .then((res) => res.data)
            .then((finResponse) => {
                console.log(finResponse);
            })

        setShowOtp(true);
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        axios.post(`${apiBaseurl}user/create-user`, registerData)
            .then((res) => res.data)
            .then((finResponse) => {
                if (finResponse.status === "success") {
                    toast.success(finResponse.message);
                    setTimeout(() => {
                        toast.info("Redirecting to Thank You Page...");
                        router.push('/thankyou');
                    }, 2000);
                }
                else {
                    toast.error(finResponse.message);
                }
            })

        setShowOtp(false);
        setRegisterData({ userName: '', userEmail: '', userPhone: '', userPassword: '' });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        axios.post(`${apiBaseurl}user/login`, loginData)
            .then((res) => res.data)
            .then((finResponse) => {
                if (finResponse.status === "success") {
                    let userObj = {
                        id: finResponse.user._id,
                        userName: finResponse.user.userName,
                        userEmail: finResponse.user.userEmail
                    };
                    dispatch(userData({ user: userObj, token: finResponse.token, email: finResponse.user.userEmail }));
                    toast.success(finResponse.message);
                    router.push('/dashboard');
                }
                else {
                    toast.error(finResponse.message);
                }
            })

        setLoginData({ userEmail: '', userPassword: '' });
    };


    const provider = new GoogleAuthProvider();

    const auth = getAuth(app);

    auth.languageCode = 'it';

    let handleGoogleSignIn = async (e) => {
        e?.preventDefault?.();
        try {
            setGoogleLoading(true);
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken ?? null;
            const user = result?.user;
            if (!user || !user.email) throw new Error("Failed to get Google user info");

            // send providerId so backend can link/store provider-specific id
            const resp = await axios.post(`${apiBaseurl}user/google-login`, {
                userName: user.displayName,
                userEmail: user.email,
                providerId: user.uid
            });
            const finResponse = resp.data;

            if (finResponse?.status === "success") {
                const userObj = {
                    id: finResponse.user._id,
                    userName: finResponse.user.userName,
                    userEmail: finResponse.user.userEmail
                };

                // dispatch both user and token (userSlice expects { user, token, email })
                dispatch(userData({ user: userObj, token: finResponse.token, email: finResponse.user.userEmail }));

                toast.success(finResponse.message || "Login successful");
                router.push('/dashboard');
            } else {
                toast.error(finResponse?.message || "Google login failed");
                router.push('/login-register');
            }
        } catch (err) {
            console.error("Google sign-in error:", err);
            const msg = err?.response?.data?.message || err?.message || "Google sign-in failed";
            toast.error(msg);
        } finally {
            setGoogleLoading(false);
        }
    }

    return (
        <div>
            <Breadcrumb pageName={"My Account"} />
            <ToastContainer />
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-15">
                {/* Login */}
                <div>
                    <h2 className="text-3xl font-playfair mb-6 text-black">Login</h2>
                    <form onSubmit={handleLoginSubmit} className="bg-white border-1 border-gray-300 rounded-lg p-6">
                        <div className="mb-4">
                            <label className="block font-semibold mb-2 text-black" htmlFor="login-email">Email *</label>
                            <input
                                type="email"
                                name='userEmail'
                                value={loginData.userEmail}
                                onChange={(e) => setLoginData({ ...loginData, userEmail: e.target.value })}
                                id="userEmail"
                                placeholder="Email Address"
                                className="w-full border px-4 py-3 rounded focus:outline-none text-black placeholder:text-gray-400"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold mb-2 text-black" htmlFor="login-password">Password *</label>
                            <input
                                type="password"
                                name='userPassword'
                                value={loginData.userPassword}
                                onChange={(e) => setLoginData({ ...loginData, userPassword: e.target.value })}
                                id="userPassword"
                                placeholder="Password"
                                className="w-full border px-4 py-3 mb-2 rounded focus:outline-none text-black placeholder:text-gray-400"
                            />
                        </div>
                        <div className="mb-4 flex items-center">
                            <a href="#" className="text-[#C09578] text-[15px] font-bold">Lost your password?</a>
                            <div className="flex-1"></div>
                            <button
                                type="submit"
                                className="bg-[#C09578] text-white font-bold px-5 py-2 rounded-full cursor-pointer mr-3"
                            >
                                LOGIN
                            </button>
                        </div>
                        <div className="flex items-center justify-center mt-4 w-full">
                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                disabled={googleLoading}
                                aria-label="Sign in with Google"
                                aria-busy={googleLoading}
                                className={
                                    "flex items-center justify-center gap-3 w-full md:w-auto " +
                                    "bg-white text-gray-800 border border-gray-200 px-4 py-2 rounded-full " +
                                    "shadow-sm hover:shadow-md hover:-translate-y-0.5 transform transition-all duration-150 " +
                                    "font-semibold focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#C09578] " +
                                    "disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                                }
                            >
                                {/* Google icon */}
                                <span className="w-5 h-5 flex-shrink-0">
                                    <svg viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                        <path d="M533.5 278.4c0-18.5-1.5-37.6-4.9-55.6H272v105.3h147.4c-6.4 34.6-26.5 63.9-56.6 83.4v69.3h91.5C498.1 421.9 533.5 355 533.5 278.4z" fill="#4285F4" />
                                        <path d="M272 544.3c74.5 0 137.1-24.7 182.8-66.9l-91.5-69.3c-25.5 17.2-58.2 27.4-91.3 27.4-70.1 0-129.5-47.3-150.6-110.9H27.7v69.8C73.8 482.6 166.6 544.3 272 544.3z" fill="#34A853" />
                                        <path d="M121.4 327.6c-6.1-18.2-9.6-37.6-9.6-57.6s3.5-39.4 9.6-57.6V142.6H27.7C10 180.5 0 221.4 0 270s10 89.5 27.7 127.4l93.7-69.8z" fill="#FBBC05" />
                                        <path d="M272 108.1c39.7 0 75.4 13.7 103.5 40.6l77.6-77.6C409.1 24 346.5 0 272 0 166.6 0 73.8 61.7 27.7 162.6l93.7 69.8C142.5 155.4 201.9 108.1 272 108.1z" fill="#EA4335" />
                                    </svg>
                                </span>

                                {/* Label */}
                                <span className="hidden sm:inline">
                                    {googleLoading ? 'Signing in with Google...' : 'Continue with Google'}
                                </span>
                                <span className="sm:hidden">
                                    {googleLoading ? 'Signing in...' : 'Google'}
                                </span>

                                {/* spinner */}
                                {googleLoading && (
                                    <svg className="w-4 h-4 ml-1 text-gray-600 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                    </svg>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
                {/* Register */}
                <div>
                    <h2 className="text-3xl font-playfair mb-6 text-black">Register</h2>
                    <form className="bg-white border-1 border-gray-300 rounded-lg p-6" onSubmit={handleRegisterSubmit}>
                        <div className="mb-4">
                            <label className="block font-semibold mb-2 text-black" htmlFor="name">Name *</label>
                            <input
                                type="text"
                                name="userName"
                                id="userName"
                                placeholder="Name"
                                className="w-full border px-4 py-3 rounded focus:outline-none text-black placeholder:text-gray-400"
                                value={registerData.userName}
                                onChange={handleRegisterChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold mb-2 text-black" htmlFor="register-email">Email address *</label>
                            <input
                                type="email"
                                name='userEmail'
                                id="userEmail"
                                placeholder="Email Address"
                                className="w-full border px-4 py-3 rounded focus:outline-none text-black placeholder:text-gray-400"
                                value={registerData.userEmail}
                                onChange={handleRegisterChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold mb-2 text-black" htmlFor="phone">Phone *</label>
                            <input
                                type="text"
                                name='userPhone'
                                id="userPhone"
                                placeholder="Phone"
                                className="w-full border px-4 py-3 rounded focus:outline-none text-black placeholder:text-gray-400"
                                value={registerData.userPhone}
                                onChange={handleRegisterChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold mb-2 text-black" htmlFor="register-password">Password *</label>
                            <input
                                type="password"
                                name='userPassword'
                                id="userPassword"
                                placeholder="Password"
                                className="w-full border px-4 py-3 mb-2 rounded focus:outline-none text-black placeholder:text-gray-400"
                                value={registerData.userPassword}
                                onChange={handleRegisterChange}
                                required
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-[#C09578] text-white font-bold px-5 py-2 rounded-full cursor-pointer "
                            >
                                REGISTER
                            </button>
                        </div>
                    </form>
                    {/* OTP Step below Register Form */}
                    {showOtp && (
                        <form className="bg-white border-1 border-gray-300 rounded-lg p-6 mt-6" onSubmit={handleOtpSubmit}>
                            <div className="mb-4">
                                <label className="block font-semibold mb-2 text-black" htmlFor="otp">Enter OTP *</label>
                                <input
                                    type="text"
                                    id="otp"
                                    placeholder="Enter OTP"
                                    className="w-full border px-4 py-3 rounded focus:outline-none text-black placeholder:text-gray-400"
                                    value={registerData.otp}
                                    onChange={e => setRegisterData({ ...registerData, otp: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-[#C09578] text-white font-bold px-5 py-2 rounded-full cursor-pointer "
                                >
                                    VERIFY OTP
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}
