"use client"
import React, { useState } from 'react'
import Breadcrumb from '../common/Breadcrumb'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation'; 

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

    const router = useRouter();

    const handleRegisterChange = (e) => {
        setRegisterData({ ...registerData, [e.target.id]: e.target.value });
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        // Send registration data to backend, which should trigger OTP send
        // Example: await axios.post('/api/register', registerData);
        // console.log('Registration data submitted:', registerData);
        axios.post(`${apiBaseurl}user/send-otp`, registerData)
        .then((res)=> res.data)
        .then((finResponse) => {
            console.log(finResponse);
        })

        setShowOtp(true);
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        // Send OTP and registration data to backend for verification
        // Example: await axios.post('/api/verify-otp', { ...registerData, otp });
        // On success, redirect or show success message
        axios.post(`${apiBaseurl}user/create-user`, registerData)
        .then((res)=> res.data)
        .then((finResponse) => {
            if(finResponse.status === "success") {
                toast.success(finResponse.message);
                router.push('/thankyou'); 
            }
            else{
                toast.error(finResponse.message);
            }
        })

        setShowOtp(false);
        setRegisterData({ userName: '', userEmail: '', userPhone: '', userPassword: '' });
    };

        
    return (
        <div>
            <Breadcrumb pageName={"My Account"} />
            <ToastContainer />
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-15">
                {/* Login */}
                <div>
                    <h2 className="text-3xl font-playfair mb-6 text-black">Login</h2>
                    <form className="bg-white border-1 border-gray-300 rounded-lg p-6">
                        <div className="mb-4">
                            <label className="block font-semibold mb-2 text-black" htmlFor="login-email">Email *</label>
                            <input
                                type="email"
                                id="login-email"
                                placeholder="Email Address"
                                className="w-full border px-4 py-3 rounded focus:outline-none text-black placeholder:text-gray-400"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold mb-2 text-black" htmlFor="login-password">Password *</label>
                            <input
                                type="password"
                                id="login-password"
                                placeholder="Password"
                                className="w-full border px-4 py-3 mb-2 rounded focus:outline-none text-black placeholder:text-gray-400"
                            />
                        </div>
                        <div className="mb-4 flex items-center">
                            <a href="#" className="text-[#C09578] text-[15px] font-bold">Lost your password?</a>
                            <div className="flex-1"></div>
                            <button
                                type="submit"
                                className="bg-[#C09578] text-white font-bold px-5 py-2 rounded-full cursor-pointer"
                            >
                                LOGIN
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
