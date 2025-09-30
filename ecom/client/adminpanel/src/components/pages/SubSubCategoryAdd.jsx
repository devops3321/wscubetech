import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SubSubCategoryAdd() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [subSubCategoryImageFile, setSubSubCategoryImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formValue, setFormValue] = useState({
    subsubcategoryName: '',
    subsubcategoryOrder: '',
    parentCategory: '',
    subcategory: ''
  });
  const [parentCategories, setParentCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [staticPath, setStaticPath] = useState("");
  let apiBaseurl = import.meta.env.VITE_APIBASEURL;

  // Fetch parent categories and subcategories
  useEffect(() => {
    axios.get(`${apiBaseurl}subsubcategory/parent-category/view`)
      .then((response) => response.data)
      .then((finResponse) => {
        if (finResponse.status === "success") {
          setParentCategories(finResponse.categoryData || []);
          setStaticPath(finResponse.staticPath || "");
        }
      });
    axios.get(`${apiBaseurl}subsubcategory/subcategory/view`)
      .then((response) => response.data)
      .then((finResponse) => {
        if (finResponse.status === "success") {
          setSubCategories(finResponse.subcategoryData || []);
        }
      });
  }, [apiBaseurl]);

  // Fetch subsubcategory data for edit mode
  useEffect(() => {
    if (id) {
      axios.get(`${apiBaseurl}subsubcategory/view/${id}`)
        .then((response) => response.data)
        .then((finResponse) => {
          if (finResponse.status === "success" && finResponse.data) {
            const data = finResponse.data;
            setFormValue({
              subsubcategoryName: data.subsubcategoryName || '',
              subsubcategoryOrder: data.subsubcategoryOrder || '',
              parentCategory: data.parentCategory?._id || data.parentCategory || '',
              subcategory: data.subcategory?._id || data.subcategory || ''
            });
            if (data.subsubcategoryImage && finResponse.staticPath) {
              setImagePreview(finResponse.staticPath + data.subsubcategoryImage);
            } else {
              setImagePreview(null);
            }
          }
        });
    }
  }, [id, apiBaseurl]);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSubSubCategoryImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSubSubCategoryImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setSubSubCategoryImageFile(null);
    setImagePreview(null);
  };

  const handleInputChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("subsubcategoryName", formValue.subsubcategoryName);
    formData.append("subsubcategoryOrder", formValue.subsubcategoryOrder);
    formData.append("parentCategory", formValue.parentCategory);
    formData.append("subcategory", formValue.subcategory);
    // Only append image if a new one is selected
    if (subSubCategoryImageFile) {
      formData.append("subsubcategoryImage", subSubCategoryImageFile);
    }
    if (id) {
      // Edit mode: PUT request
      axios.put(`${apiBaseurl}subsubcategory/update/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
        .then((response) => response.data)
        .then((finResponse) => {
          if (finResponse.status === "success") {
            toast.success(finResponse.message);
            setTimeout(() => navigate('/subsubcategory/view'), 1000);
          } else {
            toast.error(finResponse.message);
          }
        });
    } else {
      // Add mode: POST request
      axios.post(`${apiBaseurl}subsubcategory/create`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
        .then((response) => response.data)
        .then((finResponse) => {
          if (finResponse.status === "success") {
            toast.success(finResponse.message);
            setFormValue({
              subsubcategoryName: '',
              subsubcategoryOrder: '',
              parentCategory: '',
              subcategory: ''
            });
            setSubSubCategoryImageFile(null);
            setImagePreview(null);
            setTimeout(() => navigate('/subsubcategory/view'), 1000);
          } else {
            toast.error(finResponse.message);
          }
        });
    }
  };

  let funObj = id ? "Edit Sub Sub Category" : "Add Sub Sub Category";

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 py-8">
      <ToastContainer />
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-700 mb-2 tracking-tight flex items-center gap-2">
            <Link to="/dashboard" className="hover:text-blue-700 transition-colors">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to="/subsubcategory/add" className="hover:text-blue-700 transition-colors">Sub Sub Category</Link>
            <span className="text-gray-400">/</span>
            <span className="text-blue-700">{funObj}</span>
          </h1>
        </div>
        <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">{funObj}</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-8">
              {/* SubSubCategory Image */}
              <div className="flex-1">
                <label htmlFor="subSubCategoryImage" className="block font-medium mb-2 text-gray-700">Sub Sub Category Image</label>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 flex flex-col items-center justify-center h-60 mb-4 cursor-pointer relative hover:border-blue-400 transition-all"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('subSubCategoryImageInput').click()}
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
                    id="subSubCategoryImageInput"
                    name="subSubCategoryImage"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              {/* SubSubCategory Name, Parent, Sub, Order */}
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
                  <label htmlFor="subcategory" className="block font-medium mb-2 text-gray-700">Sub Category Name</label>
                  <select
                    className="rounded-lg border border-gray-300 w-full h-12 p-3 font-medium focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-200"
                    name="subcategory"
                    id="subcategory"
                    value={formValue.subcategory}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Sub Category</option>
                    {subCategories
                      .filter((cat) => !formValue.parentCategory || cat.parentCategory === formValue.parentCategory || (cat.parentCategory?._id === formValue.parentCategory))
                      .map((cat) => (
                        <option key={cat._id} value={cat._id}>{cat.subcategoryName}</option>
                      ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="subSubCategoryName" className="block font-medium mb-2 text-gray-700">Sub Sub Category Name</label>
                  <input
                    type="text"
                    id="subsubcategoryName"
                    name="subsubcategoryName"
                    value={formValue.subsubcategoryName}
                    onChange={handleInputChange}
                    className="rounded-lg border border-gray-300 w-full h-12 p-3 font-medium focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-200"
                    placeholder="Sub Sub Category Name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subSubCategoryOrder" className="block font-medium mb-2 text-gray-700">Order</label>
                  <input
                    type="text"
                    id="subsubcategoryOrder"
                    name="subsubcategoryOrder"
                    value={formValue.subsubcategoryOrder}
                    onChange={handleInputChange}
                    className="rounded-lg border border-gray-300 w-full h-12 p-3 font-medium focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-200"
                    placeholder="Order"
                    required
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="mt-8 text-white bg-blue-700 hover:bg-blue-800 font-semibold rounded-lg text-md px-8 py-3 shadow transition-all duration-150">{funObj}</button>
          </form>
        </div>
      </div>
    </section>
  );
}