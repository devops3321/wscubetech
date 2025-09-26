import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function SubCategoryAdd() {
  const [parentData, setParentData] = useState([]);
  const [subcategoryImageFile, setSubcategoryImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formValue, setFormValue] = useState({
    subcategoryName: '',
    subcategoryOrder: '',
    parentCategory: ''
  });

  let apiBaseurl = import.meta.env.VITE_APIBASEURL;

  let getParentCategory = () => {
    axios.get(`${apiBaseurl}subcategory/parent-category/view`)
      .then((response) => response.data)
      .then((finResponse) => {
        if (finResponse.status === "success") {
          setParentData(finResponse.categoryData);
        }
      });
  }

  let saveSubCategory = (e) => {
    e.preventDefault();
    let formValue = new FormData();
    axios.post(`${apiBaseurl}subcategory/create`, formValue, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => response.data)
      .then((finResponse) => {
        if (finResponse.status === "success") {
          // Reset form and image preview
          setFormValue({
            subcategoryName: '',
            subcategoryOrder: '',
            parentCategory: ''
          });
          setSubcategoryImageFile(null);
          setImagePreview(null);
        }
      })
  }


  useEffect(() => {
    getParentCategory();
  }, []);

  // Custom drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSubcategoryImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSubcategoryImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setSubcategoryImageFile(null);
    setImagePreview(null);
  };

  // Placeholder for parent categories (should be fetched from API)
  const parentCategories = [
    { _id: '1', categoryName: 'Shoe' },
    { _id: '2', categoryName: 'Bag' },
  ];

  const handleInputChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement API call for subcategory creation
    // Use formValue and subcategoryImageFile
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-700 mb-2 tracking-tight flex items-center gap-2">
            <Link to="/dashboard" className="hover:text-blue-700 transition-colors">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to="/subcategory/add" className="hover:text-blue-700 transition-colors">Sub Category</Link>
            <span className="text-gray-400">/</span>
            <span className="text-blue-700">Add Sub Category</span>
          </h1>
        </div>
        <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Add Sub Category</h2>
          <form onSubmit={saveSubCategory}>
            <div className="flex flex-col md:flex-row gap-8">
              {/* Subcategory Image */}
              <div className="flex-1">
                <label htmlFor="subcategoryImage" className="block font-medium mb-2 text-gray-700">Subcategory Image</label>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 flex flex-col items-center justify-center h-60 mb-4 cursor-pointer relative hover:border-blue-400 transition-all"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('subcategoryImageInput').click()}
                  style={{ position: 'relative' }}
                >
                  {imagePreview ? (
                    <div className="relative w-full h-full flex flex-col items-center justify-center">
                      <img src={imagePreview} alt="Preview" className="h-full object-contain rounded-lg border border-gray-200 shadow-sm" />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
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
                    id="subcategoryImageInput"
                    name="subcategoryImage"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              {/* Subcategory Name, Parent, Order */}
              <div className="flex-1 flex flex-col gap-6 justify-between">
                <div>
                  <label htmlFor="parentCategory" className="block font-medium mb-2 text-gray-700">Parent Category Name</label>
                  <select
                    className="rounded-lg border border-gray-300 w-full h-12 p-3 font-medium focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-200"
                    name="parentCategory"
                    id="parentCategory"
                    value={formValue.parentCategory}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {parentCategories.map((cat) => (
                      <option key={cat._id} value={cat._id}>{cat.categoryName}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="subcategoryName" className="block font-medium mb-2 text-gray-700">Subcategory Name</label>
                  <input
                    type="text"
                    id="subcategoryName"
                    name="subcategoryName"
                    value={formValue.subcategoryName}
                    onChange={handleInputChange}
                    className="rounded-lg border border-gray-300 w-full h-12 p-3 font-medium focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-200"
                    placeholder="Subcategory Name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subcategoryOrder" className="block font-medium mb-2 text-gray-700">Order</label>
                  <input
                    type="text"
                    id="subcategoryOrder"
                    name="subcategoryOrder"
                    value={formValue.subcategoryOrder}
                    onChange={handleInputChange}
                    className="rounded-lg border border-gray-300 w-full h-12 p-3 font-medium focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-200"
                    placeholder="Order"
                    required
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="mt-8 text-white bg-blue-700 hover:bg-blue-800 font-semibold rounded-lg text-md px-8 py-3 shadow transition-all duration-150">Add Sub Category</button>
          </form>
        </div>
      </div>
    </section>
  );
}