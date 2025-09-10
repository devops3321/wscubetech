import React from 'react'
import Breadcrumb from '../common/Breadcrumb'

export default function LoginRegister() {
    return (
        <div>
            <Breadcrumb pageName={"My Account"} />
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
                <div >
                    <h2 className="text-3xl font-playfair mb-6 text-black">Register</h2>
                    <form className="bg-white border-1 border-gray-300 rounded-lg p-6">
                        <div className="mb-4">
                            <label className="block font-semibold mb-2 text-black" htmlFor="register-email">Email address *</label>
                            <input
                                type="email"
                                id="register-email"
                                placeholder="Email Address"
                                className="w-full border px-4 py-3 rounded focus:outline-none text-black placeholder:text-gray-400"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold mb-2 text-black" htmlFor="register-password">Password *</label>
                            <input
                                type="password"
                                id="register-password"
                                placeholder="Password"
                                className="w-full border px-4 py-3 mb-2 rounded focus:outline-none text-black placeholder:text-gray-400"
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
                </div>
            </div>
        </div>
    )
}
