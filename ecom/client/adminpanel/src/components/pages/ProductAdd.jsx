
import React, { useState, useRef, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Link } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";

export default function ProductAdd() {

    let apiBaseurl = import.meta.env.VITE_APIBASEURL;

    const [parentCategories, setParentCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [subSubCategories, setSubSubCategories] = useState([]);
    const [colors, setColors] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [staticPath, setStaticPath] = useState("");
    const [formValue, setFormValue] = useState({
        productName: "",
        productPrice: "",
        productDescription: "",
        parentCategory: "",
        subCategory: "",
        subSubCategory: "",
        material: [], // now array for react-select multi
        color: [], // now array for react-select multi
        productType: "",
        isBestSelling: "",
        isTopRated: "",
        isUpsell: "",
        actualPrice: "",
        salePrice: "",
        totalInStocks: "",
        order: ""
    });
    const [description, setDescription] = useState("");
    // State for image previews and files
    const [productImageFile, setProductImageFile] = useState(null);
    const [productImagePreview, setProductImagePreview] = useState(null);
    const [backImageFile, setBackImageFile] = useState(null);
    const [backImagePreview, setBackImagePreview] = useState(null);
    const [galleryImageFile, setGalleryImageFile] = useState(null);
    const [galleryImagePreview, setGalleryImagePreview] = useState(null);


    // Fetch parent categories
    const fetchParentCategories = () => {
        axios.get(`${apiBaseurl}product/get-parent-category`)
            .then((response) => response.data)
            .then((finResponse) => {
                if (finResponse.status === "success") {
                    setParentCategories(finResponse.categoryData || []);
                    setStaticPath(finResponse.staticPath || "");
                }
            });
    };

    // Fetch subcategories for selected parent
    const fetchSubCategories = (parentId) => {
        console.log('Fetching subcategories for parentId:', parentId);
        if (!parentId) {
            setSubCategories([]);
            return;
        }
        axios.get(`${apiBaseurl}product/get-sub-category/${parentId}`)
            .then((response) => response.data)
            .then((finResponse) => {
                console.log('Subcategory API response:', finResponse);
                if (finResponse.status === "success") {
                    setSubCategories(finResponse.categoryData || []);
                } else {
                    setSubCategories([]);
                }
            });
    };

    // Fetch subsubcategories for selected subcategory
    const fetchSubSubCategories = (subId) => {
        console.log('Fetching subsubcategories for subId:', subId);
        if (!subId) {
            setSubSubCategories([]);
            return;
        }
        axios.get(`${apiBaseurl}product/get-sub-sub-category/${subId}`)
            .then((response) => response.data)
            .then((finResponse) => {
                console.log('SubSubcategory API response:', finResponse);
                if (finResponse.status === "success") {
                    setSubSubCategories(finResponse.categoryData || []);
                } else {
                    setSubSubCategories([]);
                }
            });
    };

    // Fetch colors
    const fetchColors = () => {
        axios.get(`${apiBaseurl}product/get-colors`)
            .then((response) => response.data)
            .then((finResponse) => {
                if (finResponse.status === "success") {
                    setColors(finResponse.categoryData || []);
                }
            });
    };

    // Fetch materials
    const fetchMaterials = () => {
        axios.get(`${apiBaseurl}product/get-material`)
            .then((response) => response.data)
            .then((finResponse) => {
                if (finResponse.status === "success") {
                    setMaterials(finResponse.categoryData || []);
                }
            });
    };

    useEffect(() => {
        fetchParentCategories();
        fetchColors();
        fetchMaterials();
    }, [apiBaseurl]);

    // When parentCategory changes, fetch subcategories
    useEffect(() => {
        console.log('Parent category changed:', formValue.parentCategory);
        if (formValue.parentCategory) {
            fetchSubCategories(formValue.parentCategory);
        } else {
            setSubCategories([]);
        }
        setFormValue((prev) => ({ ...prev, subCategory: "", subSubCategory: "" }));
        setSubSubCategories([]);
    }, [formValue.parentCategory]);

    // When subCategory changes, fetch subsubcategories
    useEffect(() => {
        console.log('Subcategory changed:', formValue.subCategory);
        if (formValue.subCategory) {
            fetchSubSubCategories(formValue.subCategory);
        } else {
            setSubSubCategories([]);
        }
        setFormValue((prev) => ({ ...prev, subSubCategory: "" }));
    }, [formValue.subCategory]);



    // Refs for file inputs
    const productImageInputRef = useRef(null);
    const backImageInputRef = useRef(null);
    const galleryImageInputRef = useRef(null);


    // Handle input changes (including for react-select)
    const handleInputChange = (e) => {
        const { name, value, type, multiple, options } = e.target;
        setFormValue((prev) => ({ ...prev, [name]: value }));
    };

    // For react-select multi (color, material)
    const handleMultiSelectChange = (selected, { name }) => {
        setFormValue((prev) => ({ ...prev, [name]: selected ? selected.map((opt) => opt.value) : [] }));
    };
    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("productName", formValue.productName);
        formData.append("productPrice", formValue.productPrice);
        formData.append("productDescription", description);
        formData.append("parentCategory", formValue.parentCategory);
        formData.append("subCategory", formValue.subCategory);
        formData.append("subSubCategory", formValue.subSubCategory);
        // Multi-select material
        if (formValue.material && formValue.material.length > 0) {
            formValue.material.forEach((m) => formData.append("material", m));
        }
        formData.append("productType", formValue.productType);
        formData.append("isBestSelling", formValue.isBestSelling === "Yes");
        formData.append("isTopRated", formValue.isTopRated === "Yes");
        formData.append("isUpsell", formValue.isUpsell === "Yes");
        formData.append("actualPrice", formValue.actualPrice);
        formData.append("salePrice", formValue.salePrice);
        formData.append("totalInStocks", formValue.totalInStocks);
        formData.append("order", formValue.order);
        // Multi-select color
        if (formValue.color && formValue.color.length > 0) {
            formValue.color.forEach((c) => formData.append("color", c));
        }
        if (productImageFile) formData.append("productImage", productImageFile);
        if (backImageFile) formData.append("backImage", backImageFile);
        if (galleryImageFile) formData.append("galleryImage", galleryImageFile);
        try {
            const response = await axios.post(`${apiBaseurl}product/`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            if (response.data.status) {
                toast.success("Product created successfully!");
                // Optionally reset form
                setFormValue({
                    productName: "",
                    productPrice: "",
                    productDescription: "",
                    parentCategory: "",
                    subCategory: "",
                    subSubCategory: "",
                    material: "",
                    color: [],
                    productType: "",
                    isBestSelling: "",
                    isTopRated: "",
                    isUpsell: "",
                    actualPrice: "",
                    salePrice: "",
                    totalInStocks: "",
                    order: ""
                });
                setDescription("");
                setProductImageFile(null);
                setProductImagePreview(null);
                setBackImageFile(null);
                setBackImagePreview(null);
                setGalleryImageFile(null);
                setGalleryImagePreview(null);
            } else {
                toast.error(response.data.message || "Failed to create product");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Error creating product");
        }
    };

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
            <ToastContainer />
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
                    <form className="p-0" onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Product Images */}
                            <div className="flex flex-col gap-8 min-w-[11rem] max-w-[18.5rem]"> {/* w-44 to w-74 */}
                                {/* Product Image */}
                                <div>
                                    <label className="block font-medium mb-3 text-gray-700">Product Image</label>
                                    <div
                                        className="border-2 border-dashed border-gray-300 rounded-xl bg-white flex flex-col items-center justify-center h-48 w-60 mb-4 cursor-pointer relative hover:border-blue-400 shadow-md transition-all p-3"
                                        onDragOver={handleDragOver}
                                        onDrop={handleProductDrop}
                                        onClick={() => productImageInputRef.current && productImageInputRef.current.click()}
                                        style={{ position: 'relative' }}
                                    >
                                        {
                                            productImagePreview ?
                                                (
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
                                                )
                                                :
                                                (
                                                    <span className="text-gray-400 flex items-center justify-center h-full w-full text-center">Drag & drop or click to upload</span>
                                                )
                                        }
                                        <input
                                            type="file"
                                            ref={productImageInputRef}
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
                                        className="border-2 border-dashed border-gray-300 rounded-xl bg-white flex flex-col items-center justify-center h-48 w-60 mb-4 cursor-pointer relative hover:border-blue-400 shadow-md transition-all p-3"
                                        onDragOver={handleDragOver}
                                        onDrop={handleBackDrop}
                                        onClick={() => backImageInputRef.current && backImageInputRef.current.click()}
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
                                            <span className="text-gray-400 flex items-center justify-center h-full w-full text-center">Drag & drop or click to upload</span>
                                        )}
                                        <input
                                            type="file"
                                            ref={backImageInputRef}
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
                                        className="border-2 border-dashed border-gray-300 rounded-xl bg-white flex flex-col items-center justify-center h-48 w-60 mb-4 cursor-pointer relative hover:border-blue-400 shadow-md transition-all p-3"
                                        onDragOver={handleDragOver}
                                        onDrop={handleGalleryDrop}
                                        onClick={() => galleryImageInputRef.current && galleryImageInputRef.current.click()}
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
                                            <span className="text-gray-400 flex items-center justify-center h-full w-full text-center">Drag & drop or click to upload</span>
                                        )}
                                        <input
                                            type="file"
                                            ref={galleryImageInputRef}
                                            name="galleryImage"
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            onChange={handleGalleryFileChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Product Details */}
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-8"> {/* wider gap-x for more width */}
                                {/* Product Name */}
                                <div>
                                    <label className="block font-medium mb-3 text-gray-700">Product Name</label>
                                    <input
                                        type="text"
                                        className='rounded-lg border border-gray-300 w-full h-12 p-3 font-medium mb-3 md:col-span-2'
                                        placeholder="Product Name"
                                        name="productName"
                                        value={formValue.productName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                {/* Parent Category */}
                                <div>
                                    <label className="block font-medium mb-3 text-gray-700">Select Parent Category</label>
                                    <select
                                        className="rounded-lg border border-gray-300 w-full h-12 p-3 font-medium focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-200"
                                        name="parentCategory"
                                        id="parentCategory"
                                        value={formValue.parentCategory}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        {
                                            parentCategories.map((cat) => (
                                                <option key={cat._id} value={cat._id}>{cat.categoryName}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                {/* Sub Category */}
                                <div>
                                    <label className="block font-medium mb-3 text-gray-700">Select Sub Category</label>
                                    <select
                                        className="rounded-lg border border-gray-300 w-full h-12 p-3 font-medium focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-200"
                                        name="subCategory"
                                        id="subCategory"
                                        value={formValue.subCategory}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        {
                                            subCategories.map((cat) => (
                                                <option key={cat._id} value={cat._id}>{cat.subcategoryName}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                {/* Sub Sub Category */}
                                <div>
                                    <label className="block font-medium mb-3 text-gray-700">Select Sub Sub Category</label>
                                    <select
                                        className="rounded-lg border border-gray-300 w-full h-12 p-3 font-medium focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-200"
                                        name="subSubCategory"
                                        id="subSubCategory"
                                        value={formValue.subSubCategory}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select Category</option>
                                        {
                                            subSubCategories.map((cat) => (
                                                <option key={cat._id} value={cat._id}>{cat.subsubcategoryName}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                {/* Material */}
                                <div>
                                    <label className="block font-medium mb-3 text-gray-700">Select Material</label>
                                    <Select
                                        isMulti
                                        name="material"
                                        options={materials.map((mat) => ({ value: mat._id, label: mat.categoryName }))}
                                        value={materials.filter((mat) => formValue.material.includes(mat._id)).map((mat) => ({ value: mat._id, label: mat.categoryName }))}
                                        onChange={handleMultiSelectChange}
                                        classNamePrefix="react-select"
                                        placeholder="Select Material"
                                    />
                                </div>
                                {/* Color */}
                                <div>
                                    <label className="block font-medium mb-3 text-gray-700">Select Color</label>
                                    <Select
                                        isMulti
                                        name="color"
                                        options={colors.map((color) => ({ value: color._id, label: color.colorName }))}
                                        value={colors.filter((color) => formValue.color.includes(color._id)).map((color) => ({ value: color._id, label: color.colorName }))}
                                        onChange={handleMultiSelectChange}
                                        classNamePrefix="react-select"
                                        placeholder="Select Color"
                                    />
                                </div>
                                {/* Product Type */}
                                <div>
                                    <label className="block font-medium mb-3 text-gray-700">Select Product Type</label>
                                    <select
                                        className='rounded-lg border border-gray-300 w-full h-12 p-3 font-medium mb-3 md:col-span-2'
                                        name="productType"
                                        value={formValue.productType}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Nothing Selected</option>
                                        <option value="Featured">Featured</option>
                                        <option value="New Arrivals">New Arrivals</option>
                                        <option value="On Sale">On Sale</option>
                                    </select>
                                </div>
                                {/* Is Best Selling */}
                                <div>
                                    <label className="block font-medium mb-3 text-gray-700">Is Best Selling</label>
                                    <select
                                        className='rounded-lg border border-gray-300 w-full h-12 p-3 font-medium mb-3 md:col-span-2'
                                        name="isBestSelling"
                                        value={formValue.isBestSelling}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Nothing Selected</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                                {/* Is Top Rated */}
                                <div>
                                    <label className="block font-medium mb-3 text-gray-700">Is Top Rated</label>
                                    <select
                                        className='rounded-lg border border-gray-300 w-full h-12 p-3 font-medium mb-6'
                                        name="isTopRated"
                                        value={formValue.isTopRated}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Nothing Selected</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                                {/* Is Upsell */}
                                <div>
                                    <label className="block font-medium mb-3 text-gray-700">Is Upsell</label>
                                    <select
                                        className='rounded-lg border border-gray-300 w-full h-12 p-3 font-medium mb-6'
                                        name="isUpsell"
                                        value={formValue.isUpsell}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Nothing Selected</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                                {/* Actual Price */}
                                <div>
                                    <label className="block font-medium mb-3 text-gray-700">Actual Price</label>
                                    <input
                                        type="text"
                                        className='rounded-lg border border-gray-300 w-full h-12 p-3 font-medium mb-3 md:col-span-2'
                                        placeholder="Actual Price"
                                        name="actualPrice"
                                        value={formValue.actualPrice}
                                        onChange={handleInputChange}
                                    />
                                </div>                                
                                {/* Sale Price */}
                                <div>
                                    <label className="block font-medium mb-3 text-gray-700">Sale Price</label>
                                    <input
                                        type="text"
                                        className='rounded-lg border border-gray-300 w-full h-12 p-3 font-medium mb-3 md:col-span-2'
                                        placeholder="Sale Price"
                                        name="salePrice"
                                        value={formValue.salePrice}
                                        onChange={handleInputChange}
                                    />
                                </div>                                
                                {/* Total In Stocks */}
                                <div>
                                    <label className="block font-medium mb-3 text-gray-700">Total In Stocks</label>
                                    <input
                                        type="text"
                                        className='rounded-lg border border-gray-300 w-full h-12 p-3 font-medium mb-3 md:col-span-2'
                                        placeholder="Total In Stocks"
                                        name="totalInStocks"
                                        value={formValue.totalInStocks}
                                        onChange={handleInputChange}
                                    />
                                </div>                                
                                {/* Order */}
                                <div>
                                    <label className="block font-medium mb-3 text-gray-700">Order</label>
                                    <input
                                        type="text"
                                        className='rounded-lg border border-gray-300 w-full h-12 p-3 font-medium mb-3 md:col-span-2'
                                        placeholder="Order"
                                        name="order"
                                        value={formValue.order}
                                        onChange={handleInputChange}
                                    />
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