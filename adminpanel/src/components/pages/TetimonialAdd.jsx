import React from 'react'
import { FaFilter, FaPen } from "react-icons/fa";
import { Link } from 'react-router-dom'


export default function TestimonialAdd() {
  return (
    <section>
      <div className='mt-5'>
        <hr className='border-t border-gray-600' />
        <h1 className='font-semibold p-4 text-xl text-gray-400'> <span><Link to={"/dashboard"} className='hover:text-blue-900'>Home</Link> / <Link to={"/testimonial/add"} className='hover:text-blue-900'>Testimonial</Link> / Add</span></h1>
        <hr className='border-t border-gray-600 mb-5' />
      </div>
      <div className='flex flex-col md:flex-row bg-[#F1F5F9] px-2 rounded-t-lg border border-black-200 items-center justify-between mt-9 py-4'>
        <h1 className='text-3xl font-semibold mb-3 ms-2'>Add Testimonial</h1>
      </div>
      <form className='bg-white p-6 rounded-b-lg border border-black-200'>
        <div className='flex flex-col md:flex-row gap-8 p-4'>
          {/* Category Image */}
          <div className="flex-1">
            <label htmlFor="CategoryImage" className='block font-bold mb-2'>Choose Image</label>
            <div className="border border-gray-300 rounded-lg bg-white flex flex-col items-center justify-center h-80 mb-4">
              <input
                type="file"
                id="CategoryImage"
                name="CategoryImage"
                className="hidden"
              />
              <label htmlFor="CategoryImage" className="flex flex-col items-center cursor-pointer">
                <svg width="40" height="40" fill="none" stroke="#bbb" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 16V4M8 8l4-4 4 4M20 16v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4" />
                </svg>
                <span className="text-gray-400 mt-2">Drag and drop</span>
              </label>
            </div>
          </div>
          {/* Testimonial & Order */}
          <div className="flex-1">
            <label htmlFor="Testimonial" className='block font-bold mb-2'>Name</label>
            <input
              type="text"
              id="Testimonial"
              name="Testimonial"
              className='rounded-lg border border-gray-300 w-full h-12 p-3 mb-5 font-medium'
              placeholder='Name'
              required
            />            
            <label htmlFor="Testimonial" className='block font-bold mb-2'>Designation</label>
            <input
              type="text"
              id="Testimonial"
              name="Testimonial"
              className='rounded-lg border border-gray-300 w-full h-12 p-3 mb-5 font-medium'
              placeholder='Designation'
              required
            />
            <label htmlFor="Testimonial" className='block font-bold mb-2'>Rating</label>
            <input
              type="text"
              id="Testimonial"
              name="Testimonial"
              className='rounded-lg border border-gray-300 w-full h-12 p-3 mb-5 font-medium'
              placeholder='Rating'
              required
            />
            <label htmlFor="Testimonial" className='block font-bold mb-2'>Order</label>
            <input
              type="text"
              id="Testimonial"
              name="Testimonial"
              className='rounded-lg border border-gray-300 w-full h-12 p-3 mb-5 font-medium'
              placeholder='Order'
              required
            />                        
            <label htmlFor="Testimonial" className='block font-bold mb-2'>Message</label>
            <textarea
              id="Testimonial"
              name="Testimonial"
              className='rounded-lg border border-gray-300 w-full h-32 p-3 font-medium resize-none'
              placeholder='Message'
              required
            ></textarea>
          </div>
        </div>
        <button type="submit" className="mt-4 text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm ms-4 px-5 py-2.5">Add Testimonial</button>
      </form>
    </section>
  );
};