import React from "react";
import { FaGoogle, FaFacebookF } from "react-icons/fa";

export default function Login() {
  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Side */}
        <div className="w-1/2 bg-blue-600 text-white flex flex-col justify-center items-center p-10">
          <div className="text-5xl font-bold mb-8">K-WD</div>
          <p className="mb-8 text-center text-lg">
            With the power of K-WD, you can now focus only on functionaries for your digital products, while leaving the UI design on us!
          </p>
          <div className="mb-4 text-center">
            Don't have an account?<br />
            <a href="#" className="underline font-semibold">Get Started!</a>
          </div>
          <div className="text-xs text-center">
            Read our <a href="#" className="underline">terms</a> and <a href="#" className="underline">conditions</a>
          </div>
        </div>
        {/* Right Side */}
        <div className="w-1/2 p-10">
          <div className="text-2xl font-bold mb-8">Account Login</div>
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 font-semibold text-gray-700">Email address</label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="block font-semibold text-gray-700">Password</label>
                <a href="#" className="text-blue-600 text-sm font-medium hover:underline">Forgot Password?</a>
              </div>
              <input
                type="password"
                id="password"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="mb-4 flex items-center">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-gray-700 text-sm">Remember me</label>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded transition mb-6 shadow"
            >
              Log in
            </button>
            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-400">or login with</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <button
              type="button"
              className="w-full flex items-center justify-center border border-gray-400 rounded py-2 mb-4 hover:bg-gray-50 transition"
            >
              <FaGoogle className="mr-2 text-lg" />
              Login with Google
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center border border-blue-600 rounded py-2 text-blue-700 hover:bg-blue-50 transition"
            >
              <FaFacebookF className="mr-2 text-lg" />
              Login with Facebook
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}