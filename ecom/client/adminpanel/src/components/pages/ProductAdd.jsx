import React, { useState, useRef, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";

export default function ProductAdd() {
    let apiBaseurl = import.meta.env.VITE_APIBASEURL;
    const { id } = useParams();
    const navigate = useNavigate();

    // State
    const [parentCategories, setParentCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [subSubCategories, setSubSubCategories] = useState([]);
    const [colors, setColors] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [staticPath, setStaticPath] = useState("");
    const [formValue, setFormValue] = useState({
        productName: "",
        productDescription: "",
        parentCategory: "",
        subCategory: "",
        subSubCategory: "",
        material: [],
        color: [],
        productType: "",
        isBestSelling: "",
        isTopRated: "",
        isUpsell: "",
        actualPrice: "",
        salePrice: "",
        totalInStocks: "",
        productOrder: ""
    });

    // Image states
    const [productImageFile, setProductImageFile] = useState(null);
    const [productImagePreview, setProductImagePreview] = useState(null);
    const [backImageFile, setBackImageFile] = useState(null);
    const [backImagePreview, setBackImagePreview] = useState(null);
    const [galleryImageFiles, setGalleryImageFiles] = useState([]);
    const [galleryImagePreviews, setGalleryImagePreviews] = useState([]);

    // Refs
    const productImageInputRef = useRef(null);
    const backImageInputRef = useRef(null);
    const galleryImageInputRef = useRef(null);

    // API call functions
    const fetchParentCategories = async (apiBaseurl) => {
        const res = await axios.get(`${apiBaseurl}product/get-parent-category`);
        return res.data;
    };

    const fetchColors = async (apiBaseurl) => {
        const res = await axios.get(`${apiBaseurl}product/get-colors`);
        return res.data;
    };

    const fetchMaterials = async (apiBaseurl) => {
        const res = await axios.get(`${apiBaseurl}product/get-material`);
        return res.data;
    };

    const fetchSubCategories = async (apiBaseurl, parentCategory) => {
        const res = await axios.get(`${apiBaseurl}product/get-sub-category/${parentCategory}`);
        return res.data;
    };

    const fetchSubSubCategories = async (apiBaseurl, subCategory) => {
        const res = await axios.get(`${apiBaseurl}product/get-sub-sub-category/${subCategory}`);
        return res.data;
    };

    const fetchProductDetails = async (apiBaseurl, id) => {
        const res = await axios.get(`${apiBaseurl}product/${id}`);
        return res.data;
    };

    // Fetch functions
    useEffect(() => {
        fetchParentCategories(apiBaseurl)
            .then(finResponse => {
                if (finResponse.status === "success") {
                    setParentCategories(finResponse.categoryData || []);
                    setStaticPath(finResponse.staticPath || "");
                }
            });
        fetchColors(apiBaseurl)
            .then(finResponse => {
                if (finResponse.status === "success") setColors(finResponse.categoryData || []);
            });
        fetchMaterials(apiBaseurl)
            .then(finResponse => {
                if (finResponse.status === "success") setMaterials(finResponse.categoryData || []);
            });
    }, [apiBaseurl]);

    useEffect(() => {
        if (formValue.parentCategory) {
            fetchSubCategories(apiBaseurl, formValue.parentCategory)
                .then(finResponse => {
                    if (finResponse.status === "success") setSubCategories(finResponse.categoryData || []);
                    else setSubCategories([]);
                });
        } else {
            setSubCategories([]);
        }
        setFormValue(prev => ({ ...prev, subCategory: "", subSubCategory: "" }));
        setSubSubCategories([]);
    }, [formValue.parentCategory]);

    useEffect(() => {
        if (formValue.subCategory) {
            fetchSubSubCategories(apiBaseurl, formValue.subCategory)
                .then(finResponse => {
                    if (finResponse.status === "success") setSubSubCategories(finResponse.categoryData || []);
                    else setSubSubCategories([]);
                });
        } else {
            setSubSubCategories([]);
        }
        // Only reset subSubCategory if not editing or if subCategory was changed by user
        if (!id) {
            setFormValue(prev => ({ ...prev, subSubCategory: "" }));
        }
    }, [formValue.subCategory, id]);

    // Fetch product details if editing
    useEffect(() => {
        if (id) {
            fetchProductDetails(apiBaseurl, id)
                .then(res => {
                    const data = res.data;
                    // Set all simple fields first
                    setFormValue(prev => ({
                        ...prev,
                        productName: data.productName || "",
                        productDescription: data.productDescription || "",
                        parentCategory: data.parentCategory || "",
                        material: data.material || [],
                        color: data.color || [],
                        productType: data.productType || "",
                        isBestSelling: data.isBestSelling === true ? "true" : data.isBestSelling === false ? "false" : "",
                        isTopRated: data.isTopRated === true ? "true" : data.isTopRated === false ? "false" : "",
                        isUpsell: data.isUpsell === true ? "true" : data.isUpsell === false ? "false" : "",
                        actualPrice: data.actualPrice || "",
                        salePrice: data.salePrice || "",
                        totalInStocks: data.totalInStocks || "",
                        productOrder: data.productOrder || ""
                    }));
                    setProductImagePreview(data.productImage ? `${res.productStaticPath}${data.productImage}` : null);
                    setBackImagePreview(data.productBackImage ? `${res.productStaticPath}${data.productBackImage}` : null);

                    // Fetch subcategories and subsubcategories in sequence
                    if (data.parentCategory) {
                        fetchSubCategories(apiBaseurl, data.parentCategory)
                            .then(finResponse2 => {
                                setSubCategories(finResponse2.categoryData || []);
                                setFormValue(prev => ({ ...prev, subCategory: data.subCategory || "" }));

                                if (data.subCategory) {
                                    fetchSubSubCategories(apiBaseurl, data.subCategory)
                                        .then(finResponse3 => {
                                            setSubSubCategories(finResponse3.categoryData || []);
                                            // Set subSubCategory only after options are loaded
                                            setFormValue(prev => ({ ...prev, subSubCategory: data.subSubCategory || "" }));
                                        });
                                }
                            });
                    }
                    // Gallery images
                    if (data.galleryImage && Array.isArray(data.galleryImage)) {
                        setGalleryImagePreviews(data.galleryImage.map(img => `${res.productStaticPath}${img}`));
                    }
                });
        }
    }, [id, apiBaseurl]);

    useEffect(() => {
        if (!id) {
            setFormValue({
                productName: "",
                productDescription: "",
                parentCategory: "",
                subCategory: "",
                subSubCategory: "",
                material: [],
                color: [],
                productType: "",
                isBestSelling: "",
                isTopRated: "",
                isUpsell: "",
                actualPrice: "",
                salePrice: "",
                totalInStocks: "",
                productOrder: ""
            });
            setProductImageFile(null);
            setProductImagePreview(null);
            setBackImageFile(null);
            setBackImagePreview(null);
            setGalleryImageFiles([]);
            setGalleryImagePreviews([]);
            setSubCategories([]);
            setSubSubCategories([]);
        }
    }, [id]);

    // Input handlers
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValue(prev => ({ ...prev, [name]: value }));
    };
    const handleMultiSelectChange = (selected, { name }) => {
        setFormValue(prev => ({ ...prev, [name]: selected ? selected.map(opt => opt.value) : [] }));
    };

    // Product Image handlers
    const handleProductFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setProductImageFile(file);
            setProductImagePreview(URL.createObjectURL(file));
        }
    };
    const handleProductDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            setProductImageFile(file);
            setProductImagePreview(URL.createObjectURL(file));
        }
    };
    const handleRemoveProductImage = (e) => {
        e.stopPropagation();
        setProductImageFile(null);
        setProductImagePreview(null);
    };

    // Back Image handlers
    const handleProductBackImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setBackImageFile(file);
            setBackImagePreview(URL.createObjectURL(file));
        }
    };
    const handleBackDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            setBackImageFile(file);
            setBackImagePreview(URL.createObjectURL(file));
        }
    };
    const handleRemoveBackImage = (e) => {
        e.stopPropagation();
        setBackImageFile(null);
        setBackImagePreview(null);
    };

    // Gallery Image handlers
    const handleGalleryImageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const files = Array.from(e.target.files);
            setGalleryImageFiles(files);
            setGalleryImagePreviews(files.map(file => URL.createObjectURL(file)));
        }
    };
    const handleGalleryDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const files = Array.from(e.dataTransfer.files);
            setGalleryImageFiles(files);
            setGalleryImagePreviews(files.map(file => URL.createObjectURL(file)));
        }
    };
    const handleRemoveGalleryImage = (index) => {
        setGalleryImageFiles(prev => prev.filter((_, i) => i !== index));
        setGalleryImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    // Description handler
    const setProductDescription = (value) => {
        setFormValue(prev => ({ ...prev, productDescription: value }));
    };

    // Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("productName", formValue.productName);
        formData.append("productDescription", formValue.productDescription);
        formData.append("parentCategory", formValue.parentCategory);
        formData.append("subCategory", formValue.subCategory);
        formData.append("subSubCategory", formValue.subSubCategory);
        if (formValue.material && formValue.material.length > 0) {
            formValue.material.forEach((m) => formData.append("material", m));
        }
        if (formValue.color && formValue.color.length > 0) {
            formValue.color.forEach((c) => formData.append("color", c));
        }
        formData.append("productType", formValue.productType);
        formData.append("isBestSelling", formValue.isBestSelling === "true" || formValue.isBestSelling === true);
        formData.append("isTopRated", formValue.isTopRated === "true" || formValue.isTopRated === true);
        formData.append("isUpsell", formValue.isUpsell === "true" || formValue.isUpsell === true);
        formData.append("actualPrice", formValue.actualPrice);
        formData.append("salePrice", formValue.salePrice);
        formData.append("totalInStocks", formValue.totalInStocks);
        formData.append("productOrder", formValue.productOrder);
        if (productImageFile) formData.append("productImage", productImageFile);
        if (backImageFile) formData.append("productBackImage", backImageFile);
        if (galleryImageFiles && galleryImageFiles.length > 0) {
            galleryImageFiles.forEach((file) => formData.append("galleryImage", file));
        }
        try {
            if (id) {
                // Edit mode
                await axios.put(`${apiBaseurl}product/${id}`, formData);
                toast.success("Product updated successfully!");
            } else {
                // Add mode
                const response = await axios.post(`${apiBaseurl}product/add`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                if (response.data.status === "success") {
                    toast.success("Product created successfully!");
                } else {
                    toast.error(response.data.message || "Failed to create product");
                }
            }
            setTimeout(() => {
                navigate("/product/product-items");
            }, 500);
        } catch (err) {
            toast.error(err.response?.data?.message || "Error saving product");
        }
    };

    let funObj = id ? "Edit Product" : "Add Product";

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
                        <span className="text-blue-700">{funObj}</span>
                    </h1>
                </div>
                <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6">{funObj}</h2>
                    <form className="p-0" onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Product Images */}
                            <div className="flex flex-col gap-8 min-w-[11rem] max-w-[18.5rem]">
                                {/* Product Image */}
                                <div>
                                    <label className="block font-medium mb-3 text-gray-700">Product Image</label>
                                    <div
                                        className="border-2 border-dashed border-gray-300 rounded-xl bg-white flex flex-col items-center justify-center h-48 w-60 mb-4 cursor-pointer relative hover:border-blue-400 shadow-md transition-all p-3"
                                        onDragOver={e => e.preventDefault()}
                                        onDrop={handleProductDrop}
                                        onClick={() => productImageInputRef.current && productImageInputRef.current.click()}
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
                                            <span className="text-gray-400 flex items-center justify-center h-full w-full text-center">Drag & drop or click to upload</span>
                                        )}
                                        <input
                                            type="file"
                                            name="productImage"
                                            accept="image/*"
                                            ref={productImageInputRef}
                                            style={{ display: "none" }}
                                            onChange={handleProductFileChange}
                                        />
                                    </div>
                                </div>
                                {/* Back Image */}
                                <div>
                                    <label className="block font-medium mb-3 text-gray-700">Back Image</label>
                                    <div
                                        className="border-2 border-dashed border-gray-300 rounded-xl bg-white flex flex-col items-center justify-center h-48 w-60 mb-4 cursor-pointer relative hover:border-blue-400 shadow-md transition-all p-3"
                                        onDragOver={e => e.preventDefault()}
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
                                            name="productBackImage"
                                            accept="image/*"
                                            ref={backImageInputRef}
                                            style={{ display: "none" }}
                                            onChange={handleProductBackImageChange}
                                        />
                                    </div>
                                </div>
                                {/* Gallery Images */}
                                <div>
                                    <label className="block font-medium mb-3 text-gray-700">Gallery Images</label>
                                    <div
                                        className="border-2 border-dashed border-gray-300 rounded-xl bg-white flex flex-col items-center justify-center h-48 w-60 mb-4 cursor-pointer relative hover:border-blue-400 shadow-md transition-all p-3"
                                        onDragOver={e => e.preventDefault()}
                                        onDrop={handleGalleryDrop}
                                        onClick={() => galleryImageInputRef.current && galleryImageInputRef.current.click()}
                                        style={{ position: 'relative' }}
                                    >
                                        {galleryImagePreviews && galleryImagePreviews.length > 0 ? (
                                            <div className="flex flex-wrap gap-2 w-full h-full items-center justify-center">
                                                {galleryImagePreviews.map((preview, idx) => (
                                                    <div key={idx} className="relative">
                                                        <img src={preview} alt={`Preview ${idx + 1}`} className="h-16 w-16 object-cover rounded-lg border border-gray-200 shadow-sm" />
                                                        <button
                                                            type="button"
                                                            onClick={e => { e.stopPropagation(); handleRemoveGalleryImage(idx); }}
                                                            className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-1 py-0 text-xs hover:bg-red-800 shadow z-10"
                                                            style={{ zIndex: 2 }}
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <span className="text-gray-400 flex items-center justify-center h-full w-full text-center">Drag & drop or click to upload</span>
                                        )}
                                        <input
                                            multiple
                                            type="file"
                                            name="galleryImage"
                                            accept="image/*"
                                            ref={galleryImageInputRef}
                                            style={{ display: "none" }}
                                            onChange={handleGalleryImageChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Product Details */}
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-8">
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
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
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
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
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
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
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
                                        name="productOrder"
                                        value={formValue.productOrder}
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
                                    name="productDescription"
                                    value={formValue.productDescription}
                                    onChange={setProductDescription}
                                    height={200}
                                    style={{ background: "#fff" }}
                                    textareaProps={{ style: { background: "#fff" } }}
                                />
                            </div>
                        </div>
                        <button type="submit" className="mt-10 text-white bg-blue-700 hover:bg-blue-800 font-semibold rounded-lg text-md px-8 py-3 shadow transition-all duration-150">
                            {funObj}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}