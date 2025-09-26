import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Link } from "react-router-dom";

export default function ProductAdd() {
    const [description, setDescription] = useState("");
    // State for image previews and files
    const [productImageFile, setProductImageFile] = useState(null);
    const [productImagePreview, setProductImagePreview] = useState(null);
    const [backImageFile, setBackImageFile] = useState(null);
    const [backImagePreview, setBackImagePreview] = useState(null);
    const [galleryImageFile, setGalleryImageFile] = useState(null);
    const [galleryImagePreview, setGalleryImagePreview] = useState(null);

    // Drag and drop handlers for each image
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    // Product Image
    const handleProductDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            setProductImageFile(file);
            setProductImagePreview(URL.createObjectURL(file));
        }
    };
    const handleProductFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setProductImageFile(file);
            setProductImagePreview(URL.createObjectURL(file));
        }
    };
    const handleRemoveProductImage = (e) => {
        e.stopPropagation();
        setProductImageFile(null);
        setProductImagePreview(null);
    };
    // Back Image
    const handleBackDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            setBackImageFile(file);
            setBackImagePreview(URL.createObjectURL(file));
        }
    };
    const handleBackFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setBackImageFile(file);
            setBackImagePreview(URL.createObjectURL(file));
        }
    };
    const handleRemoveBackImage = (e) => {
        e.stopPropagation();
        setBackImageFile(null);
        setBackImagePreview(null);
    };
    // Gallery Image
    const handleGalleryDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            setGalleryImageFile(file);
            setGalleryImagePreview(URL.createObjectURL(file));
        }
    };
    const handleGalleryFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setGalleryImageFile(file);
            setGalleryImagePreview(URL.createObjectURL(file));
        }
    };
    const handleRemoveGalleryImage = (e) => {
        e.stopPropagation();
        setGalleryImageFile(null);
        setGalleryImagePreview(null);
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 py-8">
            <div className="max-w-5xl mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-700 mb-2 tracking-tight flex items-center gap-2">
                        <Link to="/dashboard" className="hover:text-blue-700 transition-colors">Home</Link>
                        <span className="text-gray-400">/</span>
                        <Link to="/product/add" className="hover:text-blue-700 transition-colors">Product</Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-blue-700">Add Product</span>
                    </h1>
                </div>
                <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6">Add Product</h2>
                    <form className="p-0">
                        <div className="flex flex-col md:flex-row gap-12">
                            {/* Product Images */}
                            <div className="flex-1 flex flex-col gap-10">
                                {/* Product Image */}
                                <div>
                                    <label className="block font-medium mb-3 text-gray-700">Product Image</label>
                                    <div
                                        className="border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 flex flex-col items-center justify-center h-48 mb-4 cursor-pointer relative hover:border-blue-400 transition-all"
                                        onDragOver={handleDragOver}
                                        onDrop={handleProductDrop}
                                        onClick={() => document.getElementById('productImageInput').click()}
                                        style={{ position: 'relative' }}
                                    >
                                        {productImagePreview ? (
                                            <div className="relative w-full h-full flex flex-col items-center justify-center">
                                                <img src={productImagePreview} alt="Preview" className="h-full object-contain rounded-lg border border-gray-200 shadow-sm" />
                                                <button
                                                    type="button"
                                                    onClick={handleRemoveProductImage}
                                                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full px-2 py-1 text-xs hover:bg-red-800 shadow z-10"
                                                    style={{ zIndex: 2 }}
                                                >
                                                    Remove/Change
                                                </button>
                                                <span className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">Current image will be replaced</span>
                                            </div>
                                        ) : (
                                            <span className="text-gray-400">Drag & drop or click to upload</span>
                                        )}
                                        <input
                                            type="file"
                                            id="productImageInput"
                                            name="productImage"
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            onChange={handleProductFileChange}
                                        />
                                    </div>
                                </div>
                                {/* Back Image */}
                                <div>
                                    <label className="block font-medium mb-3 text-gray-700">Back Image</label>
                                    <div
                                        className="border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 flex flex-col items-center justify-center h-48 mb-4 cursor-pointer relative hover:border-blue-400 transition-all"
                                        onDragOver={handleDragOver}
                                        onDrop={handleBackDrop}
                                        onClick={() => document.getElementById('backImageInput').click()}
                                        style={{ position: 'relative' }}
                                    >
                                        {backImagePreview ? (
                                            <div className="relative w-full h-full flex flex-col items-center justify-center">
                                                <img src={backImagePreview} alt="Preview" className="h-full object-contain rounded-lg border border-gray-200 shadow-sm" />
                                                <button
                                                    type="button"
                                                    onClick={handleRemoveBackImage}
                                                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full px-2 py-1 text-xs hover:bg-red-800 shadow z-10"
                                                    style={{ zIndex: 2 }}
                                                >
                                                    Remove/Change
                                                </button>
                                                <span className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">Current image will be replaced</span>
                                            </div>
                                        ) : (
                                            <span className="text-gray-400">Drag & drop or click to upload</span>
                                        )}
                                        <input
                                            type="file"
                                            id="backImageInput"
                                            name="backImage"
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            onChange={handleBackFileChange}
                                        />
                                    </div>
                                </div>
                                {/* Gallery Image */}
                                <div>
                                    <label className="block font-medium mb-3 text-gray-700">Gallery Image</label>
                                    <div
                                        className="border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 flex flex-col items-center justify-center h-48 mb-4 cursor-pointer relative hover:border-blue-400 transition-all"
                                        onDragOver={handleDragOver}
                                        onDrop={handleGalleryDrop}
                                        onClick={() => document.getElementById('galleryImageInput').click()}
                                        style={{ position: 'relative' }}
                                    >
                                        {galleryImagePreview ? (
                                            <div className="relative w-full h-full flex flex-col items-center justify-center">
                                                <img src={galleryImagePreview} alt="Preview" className="h-full object-contain rounded-lg border border-gray-200 shadow-sm" />
                                                <button
                                                    type="button"
                                                    onClick={handleRemoveGalleryImage}
                                                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full px-2 py-1 text-xs hover:bg-red-800 shadow z-10"
                                                    style={{ zIndex: 2 }}
                                                >
                                                    Remove/Change
                                                </button>
                                                <span className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">Current image will be replaced</span>
                                            </div>
                                        ) : (
                                            <span className="text-gray-400">Drag & drop or click to upload</span>
                                        )}
                                        <input
                                            type="file"
                                            id="galleryImageInput"
                                            name="galleryImage"
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            onChange={handleGalleryFileChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Product Details */}
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                                {/* ...existing code for all form fields... */}
                                {/* Product Name */}
                                <div>
                                    <label className="block font-medium mb-3 text-gray-700">Product Name</label>
                                    <input type="text" className='rounded-lg border border-gray-300 w-full h-12 p-3 font-medium mb-6' placeholder="Product Name" />
                                </div>
                                {/* Parent Category */}
                                <div>
                                    <label className="block font-medium mb-3 text-gray-700">Select Parent Category</label>
                                    <select className='rounded-lg border border-gray-300 w-full h-12 p-3 font-medium mb-6'>
                                        <option>Nothing Selected</option>
                                        <option>Mobile Phones</option>
                                        <option>Laptops</option>
                                        <option>Men's Wear</option>
                                        <option>Women's Wear</option>
                                    </select>
                                </div>
                                {/* ...existing code for all other fields... */}
                                {/* Sub Category */}
                                <div>
                                    <label className="block font-medium mb-3 text-gray-700">Select Sub Category</label>
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
                                    <label className="block font-medium mb-3 text-gray-700">Select Sub Sub Category</label>
                                    <select className='rounded-lg border border-gray-300 w-full h-12 p-3 font-medium mb-6'>
                                        <option>Nothing Selected</option>
                                        <option>Mobile Phones</option>
                                        <option>Laptops</option>
                                        <option>Men's Wear</option>
                                        <option>Women's Wear</option>
                                    </select>
                                </div>
                                {/* ...existing code for all other fields... */}
                                {/* Material */}
                                <div>
                                    <label className="block font-medium mb-3 text-gray-700">Select Material</label>
                                    <select className='rounded-lg border border-gray-300 w-full h-12 p-3 font-medium mb-6'>
                                        <option>Nothing Selected</option>
                                        <option>Cotton</option>
                                        <option>Polyester</option>
                                        <option>Leather</option>
                                        <option>Wool</option>
                                        <option>Silk</option>
                                    </select>
                                </div>
                                {/* ...existing code for all other fields... */}
                                {/* Color */}
                                <div>
                                    <label className="block font-medium mb-3 text-gray-700">Select Color</label>
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
                                {/* ...existing code for all other fields... */}
                                {/* Product Type */}
                                <div>
                                    <label className="block font-medium mb-3 text-gray-700">Select Product Type</label>
                                    <select className='rounded-lg border border-gray-300 w-full h-12 p-3 font-medium mb-6'>
                                        <option>Nothing Selected</option>
                                        <option>Featured</option>
                                        <option>New Arrivals</option>
                                        <option>On Sale</option>
                                    </select>
                                </div>
                                {/* ...existing code for all other fields... */}
                                {/* Is Best Selling */}
                                <div>
                                    <label className="block font-medium mb-3 text-gray-700">Is Best Selling</label>
                                    <select className='rounded-lg border border-gray-300 w-full h-12 p-3 font-medium mb-6'>
                                        <option>Nothing Selected</option>
                                        <option>Yes</option>
                                        <option>No</option>
                                    </select>
                                </div>
                                {/* ...existing code for all other fields... */}
                                {/* Is Top Rated */}
                                <div>
                                    <label className="block font-medium mb-3 text-gray-700">Is Top Rated</label>
                                    <select className='rounded-lg border border-gray-300 w-full h-12 p-3 font-medium mb-6'>
                                        <option>Nothing Selected</option>
                                        <option>Yes</option>
                                        <option>No</option>
                                    </select>
                                </div>
                                {/* ...existing code for all other fields... */}
                                {/* Is Upsell */}
                                <div>
                                    <label className="block font-medium mb-3 text-gray-700">Is Upsell</label>
                                    <select className='rounded-lg border border-gray-300 w-full h-12 p-3 font-medium mb-6'>
                                        <option>Nothing Selected</option>
                                        <option>Yes</option>
                                        <option>No</option>
                                    </select>
                                </div>
                                {/* ...existing code for all other fields... */}
                                {/* Actual Price */}
                                <div>
                                    <label className="block font-medium mb-3 text-gray-700">Actual Price</label>
                                    <input type="text" className='rounded-lg border border-gray-300 w-full h-12 p-3 font-medium mb-6' placeholder="Actual Price" />
                                </div>
                                {/* ...existing code for all other fields... */}
                                {/* Sale Price */}
                                <div>
                                    <label className="block font-medium mb-3 text-gray-700">Sale Price</label>
                                    <input type="text" className='rounded-lg border border-gray-300 w-full h-12 p-3 font-medium mb-6' placeholder="Sale Price" />
                                </div>
                                {/* ...existing code for all other fields... */}
                                {/* Total In Stocks */}
                                <div>
                                    <label className="block font-medium mb-3 text-gray-700">Total In Stocks</label>
                                    <input type="text" className='rounded-lg border border-gray-300 w-full h-12 p-3 font-medium mb-6' placeholder="Total In Stocks" />
                                </div>
                                {/* ...existing code for all other fields... */}
                                {/* Order */}
                                <div>
                                    <label className="block font-medium mb-3 text-gray-700">Order</label>
                                    <input type="text" className='rounded-lg border border-gray-300 w-full h-12 p-3 font-medium mb-6' placeholder="Order" />
                                </div>
                            </div>
                        </div>
                        {/* Description */}
                        <div className="mt-8">
                            <label className="block font-semibold text-xl mb-3">Description</label>
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
                        <button type="submit" className="mt-10 text-white bg-blue-700 hover:bg-blue-800 font-semibold rounded-lg text-md px-8 py-3 shadow transition-all duration-150">
                            Create Product
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}