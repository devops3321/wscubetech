import React, { useEffect, useRef } from 'react'
import { FaFilter, FaPen } from "react-icons/fa";
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


export default function CategoryAdd() {

  let { id } = useParams();

  let navigate = useNavigate();


  const [categoryImageFile, setCategoryImageFile] = React.useState(null);
  const [imagePreview, setImagePreview] = React.useState(null);
  const [formValue, setformValue] = React.useState({
    categoryName: "",
    categoryImage: "",
    categoryOrder: ""
  });
  const [staticPath, setStaticPath] = React.useState("");

  const apiBaseurl = import.meta.env.VITE_APIBASEURL;

  let saveCategory = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("categoryName", formValue.categoryName);
    formData.append("categoryOrder", formValue.categoryOrder);
    // Only append image if a new file is selected
    if (categoryImageFile) {
      formData.append("categoryImage", categoryImageFile);
    }
    if (id) {
      // Edit mode: send FormData with/without image
      axios.put(`${apiBaseurl}category/update/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
        .then((response) => response.data)
        .then((finRespone) => {
          if (finRespone.status == "success") {
            toast.success(finRespone.message);
            setformValue({
              categoryName: "",
              categoryImage: "",
              categoryOrder: ""
            });
            setCategoryImageFile(null);
            setImagePreview(null);
          } else {
            toast.error(finRespone.message);
          }
        });
    } else {
      // Add mode: send FormData with file
      axios.post(`${apiBaseurl}category/create/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
        .then((response) => response.data)
        .then((finRespone) => {
          if (finRespone.status == "success") {
            toast.success(finRespone.message);
            setformValue({
              categoryName: "",
              categoryImage: "",
              categoryOrder: ""
            });
            setCategoryImageFile(null);
            setImagePreview(null);
          } else {
            toast.error(finRespone.message);
          }
        });
    }
  }

  let funObj = id ? "Edit Category" : "Add Category";

  useEffect(() => {
    setformValue({
      categoryName: "",
      categoryImage: "",
      categoryOrder: ""
    });
    if (id) {
      axios.get(`${apiBaseurl}category/view/${id}`)
        .then((response) => response.data)
        .then((finRespone) => {
          setformValue({
            categoryName: finRespone.categoryData.categoryName,
            categoryImage: finRespone.categoryData.categoryImage,
            categoryOrder: finRespone.categoryData.categoryOrder
          });
          setStaticPath(finRespone.staticPath || "");
          // Set preview for edit mode
          if (finRespone.categoryData.categoryImage) {
            setImagePreview(`${finRespone.staticPath || ""}${finRespone.categoryData.categoryImage}`);
          } else {
            setImagePreview(null);
          }
        });
    } else {
      setImagePreview(null);
    }
  }, [id]);



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
      setCategoryImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCategoryImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setCategoryImageFile(null);
    setImagePreview(null);
  };

  return (
    <section>
      < ToastContainer />
      <div className='mt-5'>
        <hr className='border-t border-gray-600' />
        <h1 className='font-semibold p-4 text-xl text-gray-400'> <span><Link to={"/dashboard"} className='hover:text-blue-900'>Home</Link> / <Link to={"/category/add"} className='hover:text-blue-900'>Category</Link> / Add</span></h1>
        <hr className='border-t border-gray-600 mb-5' />
      </div>
      <div className="max-w-[1400px] mx-auto px-3">
        <div className='flex flex-col md:flex-row bg-[#F1F5F9] px-2 rounded-t-lg border border-black-200 items-center justify-between mt-9 py-4'>
          <h1 className='text-3xl font-semibold mb-3 ms-2'>{funObj}</h1>
        </div>
        <form onSubmit={saveCategory} className='bg-white p-6 rounded-b-lg border border-black-200'>
          <div className='flex flex-col md:flex-row gap-8 p-4'>
            {/* Category Image */}
            <div className="flex-1">
              <label htmlFor="categoryImage" className='block font-bold mb-2'>Category Image</label>
              <div
                className="border border-dashed border-2 border-gray-300 rounded-lg bg-white flex flex-col items-center justify-center h-60 mb-4 cursor-pointer relative"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => document.getElementById('categoryImageInput').click()}
                style={{ position: 'relative' }}
              >
                {imagePreview ? (
                  <div className="relative w-full h-full flex flex-col items-center justify-center">
                    <img src={imagePreview} alt="Preview" className="h-full object-contain" />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full px-2 py-1 text-xs hover:bg-red-800 z-10"
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
                  id="categoryImageInput"
                  name="categoryImage"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </div>
            </div>
            {/* Category Name & Order */}
            <div className="flex-1">
              <label htmlFor="categoryName" className='block font-bold mb-2'>Category Name</label>
              <input
                type="text"
                id="categoryName"
                name="categoryName"
                value={formValue.categoryName}
                onChange={(e) => {
                  setformValue({ ...formValue, categoryName: e.target.value })
                }}
                className='rounded-lg border border-gray-300 w-full h-12 p-3 font-medium mb-6'
                placeholder='Category Name'
                required
              />
              <label htmlFor="categoryOrder" className='block font-bold mb-2'>Order</label>
              <input
                type="text"
                id="categoryOrder"
                name="categoryOrder"
                value={formValue.categoryOrder}
                onChange={(e) => {
                  setformValue({ ...formValue, categoryOrder: e.target.value })
                }}
                className='rounded-lg border border-gray-300 w-full h-12 p-3 font-medium'
                placeholder='Order'
                required
              />
            </div>
          </div>
          <button type="submit" className="mt-4 text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm ms-4 px-5 py-2.5">{funObj}</button>
        </form>
      </div>
    </section>
  );
};