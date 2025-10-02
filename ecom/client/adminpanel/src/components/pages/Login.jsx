import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
    let apiBaseurl = import.meta.env.VITE_APIBASEURL;
    const navigate = useNavigate();

    const [formValue, setFormValue] = useState({ adminEmail: '', adminPassword: '' });
    const [error, setError] = useState(null);
    const [buttonState, setButtonState] = useState('default'); // 'default' | 'success' | 'error'

    const handleInputChange = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
        setError(null);
        setButtonState('default');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${apiBaseurl}auth/login/`, formValue)
            .then((response) => response.data)
            .then((finRespone) => {
                if (finRespone.status === "success") {
                    setButtonState('success');
                    setFormValue({ adminEmail: "", adminPassword: "" });
                    setTimeout(() => {
                        navigate('/dashboard');
                    }, 1000);
                } else {
                    setError(finRespone.message);
                    setButtonState('error');
                    setTimeout(() => {
                        setButtonState('default');
                    }, 1000);
                }
            })
            .catch(() => {
                setError("Server error");
                setButtonState('error');
                setTimeout(() => {
                    setButtonState('default');
                }, 1000);
            });
    };

    let buttonClass = "w-full text-white font-bold font-medium rounded-lg text-md px-5 py-2.5 text-center shadow transition-all duration-150";
    let buttonText = "Sign in";
    if (buttonState === 'success') {
        buttonClass += " bg-green-700 hover:bg-green-800 focus:ring-3 focus:outline-none focus:ring-green-300";
        buttonText = "Success";
    } else if (buttonState === 'error') {
        buttonClass += " bg-red-700 hover:bg-red-800 focus:ring-3 focus:outline-none focus:ring-red-300";
        buttonText = "Try Again";
    } else {
        buttonClass += " bg-blue-700 hover:bg-blue-800 focus:ring-3 focus:outline-none focus:ring-blue-300 cursor-pointer";
    }

    return (
        <section className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 py-8 flex items-center justify-center">
            <ToastContainer />
            <div className="w-full max-w-md mx-auto px-4">
                <div className="flex flex-col items-center mb-2">
                    <img
                        className="w-40 h-24 object-contain"
                        src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/company-profile/logo/cccfbdab-3bec-439f-88b9-5694698cd302-1670132652.png"
                        alt="logo"
                    />
                </div>
                <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Sign in to your account</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="adminEmail" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                            {error && <span className='text-red-500 text-sm'>Invalid Email</span>}
                            <input
                                type="email"
                                name="adminEmail"
                                id="adminEmail"
                                value={formValue.adminEmail}
                                onChange={handleInputChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="name@company.com"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="adminPassword" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                            {error && <span className='text-red-500 text-sm'>Invalid Password</span>}
                            <input
                                type="password"
                                name="adminPassword"
                                id="adminPassword"
                                value={formValue.adminPassword}
                                onChange={handleInputChange}
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                                />
                                <label htmlFor="remember" className="ml-2 text-sm text-gray-700">Remember me</label>
                            </div>
                            <a href="#" className="text-sm font-medium text-blue-600 hover:underline">Forgot password?</a>
                        </div>
                        <button
                            type="submit"
                            className={buttonClass}
                            disabled={buttonState === 'success'}
                        >
                            {buttonText}
                        </button>
                        <p className="text-sm font-light text-gray-500 text-center">
                            Don’t have an account yet?{' '}
                            <a href="#" className="font-medium text-blue-600 hover:underline">Sign up</a>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
}