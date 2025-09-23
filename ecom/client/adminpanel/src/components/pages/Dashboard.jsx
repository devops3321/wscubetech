
import React from 'react';

import { FaLongArrowAltDown, FaLongArrowAltUp, FaRupeeSign, FaUserPlus, FaBoxOpen, FaExclamationTriangle } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from 'react-router-dom';

export default function Dashboard() {
    return (
        <section className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 py-8">
            <div className="max-w-6xl mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-700 mb-2 tracking-tight flex items-center gap-2">
                        <Link to="/dashboard" className="hover:text-blue-700 transition-colors">Home</Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-blue-700">Dashboard</span>
                    </h1>
                </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                            {/* Users Card */}
                            <div className="bg-[#5956D3] text-white rounded-2xl shadow-xl p-6 flex flex-col gap-4 border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <span className="flex items-baseline">
                                        <span className="text-3xl font-bold">26K</span>
                                        <span className="flex items-baseline text-base font-bold ml-2">
                                            (<span>-12.4%</span> <FaLongArrowAltDown className="ml-1" />)
                                        </span>
                                    </span>
                                    <button className="text-xl cursor-pointer"><BsThreeDotsVertical /></button>
                                </div>
                                <h2 className="text-xl font-semibold tracking-wide">Users</h2>
                            </div>
                            {/* Product Card */}
                            <div className="bg-[#2998FE] text-white rounded-2xl shadow-xl p-6 flex flex-col gap-4 border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <span className="flex items-baseline">
                                        <span className="text-3xl font-bold">$6200</span>
                                        <span className="flex items-baseline text-base font-bold ml-2">
                                            (<span>40.9%</span> <FaLongArrowAltUp className="ml-1" />)
                                        </span>
                                    </span>
                                    <button className="text-xl cursor-pointer"><BsThreeDotsVertical /></button>
                                </div>
                                <h2 className="text-xl font-semibold tracking-wide">Product</h2>
                            </div>
                            {/* Category Card */}
                            <div className="bg-[#FCB01E] text-white rounded-2xl shadow-xl p-6 flex flex-col gap-4 border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <span className="flex items-baseline">
                                        <span className="text-3xl font-bold">2.49%</span>
                                        <span className="flex items-baseline text-base font-bold ml-2">
                                            (<span>84.7%</span> <FaLongArrowAltUp className="ml-1" />)
                                        </span>
                                    </span>
                                    <button className="text-xl cursor-pointer"><BsThreeDotsVertical /></button>
                                </div>
                                <h2 className="text-xl font-semibold tracking-wide">Category</h2>
                            </div>
                            {/* Orders Card */}
                            <div className="bg-[#E95353] text-white rounded-2xl shadow-xl p-6 flex flex-col gap-4 border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <span className="flex items-baseline">
                                        <span className="text-3xl font-bold">44K</span>
                                        <span className="flex items-baseline text-base font-bold ml-2">
                                            (<span>-23.6%</span> <FaLongArrowAltDown className="ml-1" />)
                                        </span>
                                    </span>
                                    <button className="text-xl cursor-pointer"><BsThreeDotsVertical /></button>
                                </div>
                                <h2 className="text-xl font-semibold tracking-wide">Orders</h2>
                            </div>
                            {/* Total Revenue Card */}
                            <div className="bg-[#1abc9c] text-white rounded-2xl shadow-xl p-6 flex flex-col gap-4 border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-2">
                                        <FaRupeeSign className="text-2xl" />
                                        <span className="text-3xl font-bold">1,20,000</span>
                                    </span>
                                    <span className="text-green-200 font-bold">+8.2%</span>
                                </div>
                                <h2 className="text-xl font-semibold tracking-wide">Total Revenue</h2>
                            </div>
                            {/* New Customers Card */}
                            <div className="bg-[#8e44ad] text-white rounded-2xl shadow-xl p-6 flex flex-col gap-4 border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-2">
                                        <FaUserPlus className="text-2xl" />
                                        <span className="text-3xl font-bold">320</span>
                                    </span>
                                    <span className="text-green-200 font-bold">+3.5%</span>
                                </div>
                                <h2 className="text-xl font-semibold tracking-wide">New Customers</h2>
                            </div>
                            {/* Pending Orders Card */}
                            <div className="bg-[#f39c12] text-white rounded-2xl shadow-xl p-6 flex flex-col gap-4 border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-2">
                                        <FaBoxOpen className="text-2xl" />
                                        <span className="text-3xl font-bold">58</span>
                                    </span>
                                    <span className="text-yellow-200 font-bold">-1.2%</span>
                                </div>
                                <h2 className="text-xl font-semibold tracking-wide">Pending Orders</h2>
                            </div>
                            {/* Out of Stock Products Card */}
                            <div className="bg-[#c0392b] text-white rounded-2xl shadow-xl p-6 flex flex-col gap-4 border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-2">
                                        <FaExclamationTriangle className="text-2xl" />
                                        <span className="text-3xl font-bold">12</span>
                                    </span>
                                    <span className="text-red-200 font-bold">0%</span>
                                </div>
                                <h2 className="text-xl font-semibold tracking-wide">Out of Stock</h2>
                            </div>
                        </div>
                        {/* You can add more dashboard widgets or charts here for further enhancement */}
            </div>
        </section>
    );
}
