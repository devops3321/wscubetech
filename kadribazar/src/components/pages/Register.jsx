import React from 'react'

export default function Register() {
    return (
        <>
        <div className="max-w-full min-h-screen flex flex-col items-center justify-start bg-white">
            <form className="max-w-lg w-full border rounded-lg shadow-sm p-8 bg-white text-left">
                <div className="capitalize font-bold text-2xl text-start mb-5 pb-4 border-b">
                    Register For A Free Account
                </div>
                <div className="mb-5 text-start">
                    <label htmlFor="email" className="block mb-2 text-sm font-bold text-black">Email Address</label>
                    <input type="email" id="email" className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Your email address" required />
                </div>
                <div className="mb-2 text-start">
                    <label htmlFor="password" className="block mb-2 text-sm font-bold text-black">Password</label>
                    <input type="password" id="password" className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Your secure password" required />
                </div>
                <div className="mb-5 text-start">
                    <label className="block text-xs text-black" htmlFor="">At least 6 characters</label>
                </div>
                <button
                    type="submit"
                    className="text-white font-bold rounded-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-sm px-7 py-2.5 mb-2 ml-0"
                >
                    Sign Up
                </button>
            </form>
            <div className="mt-8 text-center">
                I already have an account
            </div>
            <div className="mt-12 text-center">
                This is a product of <span className="font-bold text-sm">Your Company</span>
            </div>
        </div>
    </>
    )
}
