import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [formValue, setFormValue] = useState({ email: '', password: '' });

    const handleInputChange = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Add authentication logic here
        navigate('/dashboard');
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 py-8 flex items-center justify-center">
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
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formValue.email}
                                onChange={handleInputChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="name@company.com"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={formValue.password}
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
                            className="w-full text-white font-bold bg-blue-700 hover:bg-blue-800 focus:ring-3 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center shadow transition-all duration-150"
                        >
                            Sign in
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