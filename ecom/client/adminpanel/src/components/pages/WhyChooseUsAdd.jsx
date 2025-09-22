import React, { useEffect, useRef } from 'react'
import { FaFilter, FaPen } from "react-icons/fa";
import { Link } from 'react-router-dom'
import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function WhyChooseUsAdd() {
  const dropzoneRef = useRef(null);

  const [whychooseusImageFile, setwhychooseusImageFile] = React.useState(null);

    const [formValue, setformValue] = React.useState({
      whychooseusTitle: "",
      whychooseusImage: "",
      whychooseusOrder: "",
      whychooseusDescription: ""
    });
    
    const apiBaseurl = import.meta.env.VITE_APIBASEURL;

  let savewhychooseus = (e) => {
    e.preventDefault();
    let formValue = new FormData(e.target);

    // Append the Dropzone file to FormData
    if (whychooseusImageFile) {
      formValue.append("whychooseusImage", whychooseusImageFile);
    }

    axios.post(`${apiBaseurl}whychooseus/create/`, formValue)
      .then((response) => { return response.data })
      .then((finRespone) => {
        if (finRespone.status == "success") {
          toast.success(finRespone.message);
          setformValue({
            whychooseusTitle: "",            
            whychooseusImage: "",
            whychooseusOrder: "",
            whychooseusDescription: ""
          });
          setwhychooseusImageFile(null); // Reset file
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
        setwhychooseusImageFile(file);
      });

      dz.on("removedfile", () => {
        setwhychooseusImageFile(null);
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
      < ToastContainer />
      <div className='mt-5'>
        <hr className='border-t border-gray-600' />
        <h1 className='font-semibold p-4 text-xl text-gray-400'> <span><Link to={"/dashboard"} className='hover:text-blue-900'>Home</Link> / <Link to={"/whychooseus/add"} className='hover:text-blue-900'>Why Choose Us</Link> / Add</span></h1>
        <hr className='border-t border-gray-600 mb-5' />
      </div>
      <div className="max-w-[1400px] mx-auto px-3">
      <div className='flex flex-col md:flex-row bg-[#F1F5F9] px-2 rounded-t-lg border border-black-200 items-center justify-between mt-9 py-4'>
        <h1 className='text-3xl font-semibold mb-3 ms-2'>Add Why Choose Us</h1>
      </div>
      <form onSubmit={savewhychooseus} className='bg-white p-6 rounded-b-lg border border-black-200'>
        <div className='flex flex-col md:flex-row gap-8 p-4'>
          {/* whychooseus Image */}
          <div className="flex-1">
            <label htmlFor="whychooseusImage" className='block font-bold mb-2'>Choose Image</label>
            <div
              id="whyChooseUsDropzone"
              name = "whychooseusImage"
              ref={dropzoneRef}
              className="border border-gray-300 rounded-lg bg-white flex flex-col items-center justify-center h-60 mb-4 dropzone"
              style={{ width: "100%", maxWidth: 600, margin: "0 auto" }}
            >
              {/* Dropzone will auto-inject its UI here */}
              <div
                className="dz-preview-container w-full flex flex-wrap justify-center items-center gap-2"
                style={{
                  maxWidth: "100%",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                }}
              ></div>
            </div>
          </div>
          {/* Title & Order */}
          <div className="flex-1">
            <label htmlFor="whychooseusTitle" className='block font-bold mb-2'>Title</label>
            <input
              type="text"
              id="whychooseusTitle"
              name="whychooseusTitle"
              className='rounded-lg border border-gray-300 w-full h-12 p-3 mb-5 font-medium'
              placeholder='Title'
              required
            />            
            <label htmlFor="whychooseusOrder" className='block font-bold mb-2'>Order</label>
            <input
              type="text"
              id="whychooseusOrder"
              name="whychooseusOrder"
              className='rounded-lg border border-gray-300 w-full h-12 p-3 mb-5 font-medium'
              placeholder='Order'
              required
            />
            <label htmlFor="whychooseusDescription" className='block font-bold mb-2'>Description</label>
            <textarea
              id="whychooseusDescription"
              name="whychooseusDescription"
              className='rounded-lg border border-gray-300 w-full h-32 p-3 font-medium resize-none'
              placeholder='Description'
              required
            ></textarea>
          </div>
        </div>
        <button type="submit" className="mt-4 text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm ms-4 px-5 py-2.5">Add Why Choose Us</button>
      </form>
      </div>
    </section>
  );
};