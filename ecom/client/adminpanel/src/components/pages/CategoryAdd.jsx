import React, { useEffect, useRef } from 'react'
import { FaFilter, FaPen } from "react-icons/fa";
import { Link } from 'react-router-dom'
import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export default function CategoryAdd() {
  const dropzoneRef = useRef(null);
  const [categoryImageFile, setCategoryImageFile] = React.useState(null);

  const [formValue, setformValue] = React.useState({
    categoryName: "",
    categoryImage: "",
    categoryOrder: ""
  });
  const apiBaseurl = import.meta.env.VITE_APIBASEURL;

  let saveCategory = (e) => {
    e.preventDefault();
    let formValue = new FormData(e.target);

    // Append the Dropzone file to FormData
    if (categoryImageFile) {
      formValue.append("categoryImage", categoryImageFile);
    }

    axios.post(`${apiBaseurl}category/create/`, formValue)
      .then((response) => { return response.data })
      .then((finRespone) => {
        if (finRespone.status == "success") {
          toast.success(finRespone.message);
          setformValue({
            categoryName: "",
            categoryImage: "",
            categoryOrder: ""
          });
          setCategoryImageFile(null); // Reset file
        }
        else {
          toast.error(finRespone.message);
        }
      });
  }

  useEffect(() => {
    Dropzone.autoDiscover = false;
    if (dropzoneRef.current) {
      if (dropzoneRef.current.dropzone) {
        dropzoneRef.current.dropzone.destroy();
      }
      // Initialize Dropzone
      const dz = new Dropzone(dropzoneRef.current, {
        url: "/file/post",
        maxFiles: 1,
        acceptedFiles: "image/*",
        addRemoveLinks: true,
        dictDefaultMessage: "Drag and drop or click to upload",
        autoProcessQueue: false, // Prevent auto upload
      });

      dz.on("addedfile", (file) => {
        setCategoryImageFile(file);
      });

      dz.on("removedfile", () => {
        setCategoryImageFile(null);
      });
    }
    return () => {
      if (dropzoneRef.current && dropzoneRef.current.dropzone) {
        dropzoneRef.current.dropzone.destroy();
      }
    };
  }, []);

  return (
    <section>
      <div className='mt-5'>
        <hr className='border-t border-gray-600' />
        <h1 className='font-semibold p-4 text-xl text-gray-400'> <span><Link to={"/dashboard"} className='hover:text-blue-900'>Home</Link> / <Link to={"/category/add"} className='hover:text-blue-900'>Category</Link> / Add</span></h1>
        <hr className='border-t border-gray-600 mb-5' />
      </div>
      <div className="max-w-[1400px] mx-auto px-3">
        <div className='flex flex-col md:flex-row bg-[#F1F5F9] px-2 rounded-t-lg border border-black-200 items-center justify-between mt-9 py-4'>
          <h1 className='text-3xl font-semibold mb-3 ms-2'>Add Category</h1>
        </div>
        <form onSubmit={saveCategory} className='bg-white p-6 rounded-b-lg border border-black-200'>
          <div className='flex flex-col md:flex-row gap-8 p-4'>
            {/* Category Image */}
            <div className="flex-1">
              <label htmlFor="categoryImage" className='block font-bold mb-2'>Category Image</label>
              <div
                id="myId"
                name="categoryImage"
                ref={dropzoneRef}
                className="border border-gray-300 rounded-lg bg-white flex flex-col items-center justify-center h-60 mb-4 dropzone"
              >
                {/* Dropzone will auto-inject its UI here */}
              </div>
            </div>
            {/* Category Name & Order */}
            <div className="flex-1">
              <label htmlFor="categoryName" className='block font-bold mb-2'>Category Name</label>
              <input
                type="text"
                id="categoryName"
                name="categoryName"
                className='rounded-lg border border-gray-300 w-full h-12 p-3 font-medium mb-6'
                placeholder='Category Name'
                required
              />
              <label htmlFor="categoryOrder" className='block font-bold mb-2'>Order</label>
              <input
                type="text"
                id="categoryOrder"
                name="categoryOrder"
                className='rounded-lg border border-gray-300 w-full h-12 p-3 font-medium'
                placeholder='Order'
                required
              />
            </div>
          </div>
          <button type="submit" className="mt-4 text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm ms-4 px-5 py-2.5">Add Category</button>
        </form>
      </div>
    </section>
  );
};