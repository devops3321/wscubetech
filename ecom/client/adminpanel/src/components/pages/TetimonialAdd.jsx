import React, { useEffect, useRef } from 'react'
import { FaFilter, FaPen } from "react-icons/fa";
import { Link } from 'react-router-dom'
import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css";

export default function TestimonialAdd() {
  const dropzoneRef = useRef(null);

  useEffect(() => {
    Dropzone.autoDiscover = false;
    if (dropzoneRef.current) {
      if (dropzoneRef.current.dropzone) {
        dropzoneRef.current.dropzone.destroy();
      }
      new Dropzone(dropzoneRef.current, {
        url: "/file/post", // Change this to your upload endpoint
        maxFiles: 1,
        acceptedFiles: "image/*",
        addRemoveLinks: true,
        dictDefaultMessage: "Drag and drop or click to upload",
        previewsContainer: dropzoneRef.current.querySelector('.dz-preview-container'),
        thumbnailWidth: 120,
        thumbnailHeight: 120,
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
        <h1 className='font-semibold p-4 text-xl text-gray-400'> <span><Link to={"/dashboard"} className='hover:text-blue-900'>Home</Link> / <Link to={"/testimonial/add"} className='hover:text-blue-900'>Testimonial</Link> / Add</span></h1>
        <hr className='border-t border-gray-600 mb-5' />
      </div>
      <div className="max-w-[1400px] mx-auto px-3">
      <div className='flex flex-col md:flex-row bg-[#F1F5F9] px-2 rounded-t-lg border border-black-200 items-center justify-between mt-9 py-4'>
        <h1 className='text-3xl font-semibold mb-3 ms-2'>Add Testimonial</h1>
      </div>
      <form className='bg-white p-6 rounded-b-lg border border-black-200'>
        <div className='flex flex-col md:flex-row gap-8 p-4'>
          {/* Testimonial Image */}
          <div className="flex-1">
            <label htmlFor="TestimonialImage" className='block font-bold mb-2'>Choose Image</label>
            <div
              id="testimonialDropzone"
              ref={dropzoneRef}
              className="border border-gray-300 rounded-lg bg-white flex flex-col items-center justify-center h-80 mb-4 dropzone"
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
          {/* Testimonial & Order */}
          <div className="flex-1">
            <label htmlFor="TestimonialName" className='block font-bold mb-2'>Name</label>
            <input
              type="text"
              id="TestimonialName"
              name="TestimonialName"
              className='rounded-lg border border-gray-300 w-full h-12 p-3 mb-5 font-medium'
              placeholder='Name'
              required
            />            
            <label htmlFor="TestimonialDesignation" className='block font-bold mb-2'>Designation</label>
            <input
              type="text"
              id="TestimonialDesignation"
              name="TestimonialDesignation"
              className='rounded-lg border border-gray-300 w-full h-12 p-3 mb-5 font-medium'
              placeholder='Designation'
              required
            />
            <label htmlFor="TestimonialRating" className='block font-bold mb-2'>Rating</label>
            <input
              type="text"
              id="TestimonialRating"
              name="TestimonialRating"
              className='rounded-lg border border-gray-300 w-full h-12 p-3 mb-5 font-medium'
              placeholder='Rating'
              required
            />
            <label htmlFor="TestimonialOrder" className='block font-bold mb-2'>Order</label>
            <input
              type="text"
              id="TestimonialOrder"
              name="TestimonialOrder"
              className='rounded-lg border border-gray-300 w-full h-12 p-3 mb-5 font-medium'
              placeholder='Order'
              required
            />                        
            <label htmlFor="TestimonialMessage" className='block font-bold mb-2'>Message</label>
            <textarea
              id="TestimonialMessage"
              name="TestimonialMessage"
              className='rounded-lg border border-gray-300 w-full h-32 p-3 font-medium resize-none'
              placeholder='Message'
              required
            ></textarea>
          </div>
        </div>
        <button type="submit" className="mt-4 text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm ms-4 px-5 py-2.5">Add Testimonial</button>
      </form>
      </div>
    </section>
  );
};