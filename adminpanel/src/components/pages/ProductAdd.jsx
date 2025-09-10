import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Link } from "react-router-dom";

export default function ProductAdd() {
    const [description, setDescription] = useState("");

    return (
        <section>
            <div className='mt-5'>
                <hr className='border-t border-gray-600' />
                <h1 className='font-semibold p-4 text-xl text-gray-400'> <span><Link to={"/dashboard"} className='hover:text-blue-900'>Home</Link> / <Link to={"/product/add"} className='hover:text-blue-900'>Product</Link> / Add</span></h1>
                <hr className='border-t border-gray-600 mb-5' />
            </div>
            <form className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Left column: Images */}
                    <div className="flex flex-col gap-4">
                        {/* Product Image */}
                        <div>
                            <label className="block font-semibold mb-1">Product Image</label>
                            <div className="border border-gray-300 rounded bg-white flex flex-col items-center justify-center h-48 mb-2">
                                <input type="file" id="productImage" className="hidden" />
                                <label htmlFor="productImage" className="flex flex-col items-center cursor-pointer">
                                    <svg width="40" height="40" fill="none" stroke="#bbb" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M12 16V4M8 8l4-4 4 4M20 16v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4" />
                                    </svg>
                                    <span className="text-gray-400 mt-2">Drag and drop</span>
                                </label>
                            </div>
                        </div>
                        {/* Back Image */}
                        <div>
                            <label className="block font-semibold mb-1">Back Image</label>
                            <div className="border border-gray-300 rounded bg-white flex flex-col items-center justify-center h-48 mb-2">
                                <input type="file" id="backImage" className="hidden" />
                                <label htmlFor="backImage" className="flex flex-col items-center cursor-pointer">
                                    <svg width="40" height="40" fill="none" stroke="#bbb" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M12 16V4M8 8l4-4 4 4M20 16v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4" />
                                    </svg>
                                    <span className="text-gray-400 mt-2">Drag and drop</span>
                                </label>
                            </div>
                        </div>
                        {/* Gallery Image */}
                        <div>
                            <label className="block font-semibold mb-1">Gallery Image</label>
                            <div className="border border-gray-300 rounded bg-white flex flex-col items-center justify-center h-48 mb-2">
                                <input type="file" id="galleryImage" className="hidden" />
                                <label htmlFor="galleryImage" className="flex flex-col items-center cursor-pointer">
                                    <svg width="40" height="40" fill="none" stroke="#bbb" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M12 16V4M8 8l4-4 4 4M20 16v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4" />
                                    </svg>
                                    <span className="text-gray-400 mt-2">Drag and drop</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    {/* Middle and Right columns: Inputs */}
                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Product Name */}
                        <div>
                            <label className="block font-semibold mb-1">Product Name</label>
                            <input type="text" className='rounded-lg border border-gray-300 w-full h-12 p-3 font-medium mb-6' placeholder="Product Name" />
                        </div>
                        {/* Parent Category */}
                        <div>
                            <label className="block font-semibold mb-1">Select Parent Category</label>
                            <select className='rounded-lg border border-gray-300 w-full h-12 p-3 font-medium mb-6'>
                                <option>Nothing Selected</option>
                                <option>Mobile Phones</option>
                                <option>Laptops</option>
                                <option>Men's Wear</option>
                                <option>Women's Wear</option>
                            </select>
                        </div>
                        {/* Sub Category */}
                        <div>
                            <label className="block font-semibold mb-1">Select Sub Category</label>
                            <select className='rounded-lg border border-gray-300 w-full h-12 p-3 font-medium mb-6'>
                                <option>Select Category</option>
                                <option>Mobile Phones</option>
                                <option>Laptops</option>
                                <option>Men's Wear</option>
                                <option>Women's Wear</option>

                            </select>
                        </div>
                        {/* Sub Sub Category */}
                        <div>
                            <label className="block font-semibold mb-1">Select Sub Sub Category</label>
                            <select className='rounded-lg border border-gray-300 w-full h-12 p-3 font-medium mb-6'>
                                <option>Nothing Selected</option>
                                <option>Mobile Phones</option>
                                <option>Laptops</option>
                                <option>Men's Wear</option>
                                <option>Women's Wear</option>
                            </select>
                        </div>
                        {/* Material */}
                        <div>
                            <label className="block font-semibold mb-1">Select Material</label>
                            <select className='rounded-lg border border-gray-300 w-full h-12 p-3 font-medium mb-6'>
                                <option>Nothing Selected</option>
                                <option>Cotton</option>
                                <option>Polyester</option>
                                <option>Leather</option>
                                <option>Wool</option>
                                <option>Silk</option>
                            </select>
                        </div>
                        {/* Color */}
                        <div>
                            <label className="block font-semibold mb-1">Select Color</label>
                            <select className='rounded-lg border border-gray-300 w-full h-12 p-3 font-medium mb-6'>
                                <option>Nothing Selected</option>
                                <option>Red</option>
                                <option>Blue</option>
                                <option>Green</option>
                                <option>Black</option>
                                <option>White</option>
                                <option>Gray</option>
                            </select>
                        </div>
                        {/* Product Type */}
                        <div>
                            <label className="block font-semibold mb-1">Select Product Type</label>
                            <select className='rounded-lg border border-gray-300 w-full h-12 p-3 font-medium mb-6'>
                                <option>Nothing Selected</option>
                                <option>Featured</option>
                                <option>New Arrivals</option>
                                <option>On Sale</option>
                            </select>
                        </div>
                        {/* Is Best Selling */}
                        <div>
                            <label className="block font-semibold mb-1">Is Best Selling</label>
                            <select className='rounded-lg border border-gray-300 w-full h-12 p-3 font-medium mb-6'>
                                <option>Nothing Selected</option>
                                <option>Yes</option>
                                <option>No</option>
                            </select>
                        </div>
                        {/* Is Top Rated */}
                        <div>
                            <label className="block font-semibold mb-1">Is Top Rated</label>
                            <select className='rounded-lg border border-gray-300 w-full h-12 p-3 font-medium mb-6'>
                                <option>Nothing Selected</option>
                                <option>Yes</option>
                                <option>No</option>
                            </select>
                        </div>
                        {/* Is Upsell */}
                        <div>
                            <label className="block font-semibold mb-1">Is Upsell</label>
                            <select className='rounded-lg border border-gray-300 w-full h-12 p-3 font-medium mb-6'>
                                <option>Nothing Selected</option>
                                <option>Yes</option>
                                <option>No</option>
                            </select>
                        </div>
                        {/* Actual Price */}
                        <div>
                            <label className="block font-semibold mb-1">Actual Price</label>
                            <input type="text" className='rounded-lg border border-gray-300 w-full h-12 p-3 font-medium mb-6' placeholder="Actual Price" />
                        </div>
                        {/* Sale Price */}
                        <div>
                            <label className="block font-semibold mb-1">Sale Price</label>
                            <input type="text" className='rounded-lg border border-gray-300 w-full h-12 p-3 font-medium mb-6' placeholder="Sale Price" />
                        </div>
                        {/* Total In Stocks */}
                        <div>
                            <label className="block font-semibold mb-1">Total In Stocks</label>
                            <input type="text" className='rounded-lg border border-gray-300 w-full h-12 p-3 font-medium mb-6' placeholder="Total In Stocks" />
                        </div>
                        {/* Order */}
                        <div>
                            <label className="block font-semibold mb-1">Order</label>
                            <input type="text" className='rounded-lg border border-gray-300 w-full h-12 p-3 font-medium mb-6' placeholder="Order" />
                        </div>
                    </div>
                </div>
                {/* Description */}
                <div className="mt-4">
                    <label className="block font-semibold text-xl mb-2">Description</label>
                    <div data-color-mode="light">
                        <MDEditor
                            value={description}
                            onChange={setDescription}
                            height={200}
                            style={{ background: "#fff" }}
                            textareaProps={{ style: { background: "#fff" } }}
                        />
                    </div>
                    <style>
                        {`
                    /* Make MDEditor toolbar icons bigger */
                    .w-md-editor-toolbar button svg {
                        width: 1.7em !important;
                        height: 1.7em !important;
                    }
                    `}
                    </style>
                </div>
                {/* Submit Button */}
                <button type="submit" className="mt-2 px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded">
                    Create Product
                </button>
            </form>
        </section>
    );
}