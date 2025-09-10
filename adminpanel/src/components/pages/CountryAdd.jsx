import React from 'react'
import { FaFilter, FaPen } from "react-icons/fa";
import { Link } from 'react-router-dom'


export default function CountryAdd() {
  return (
    <section>
      <div className='mt-5'>
        <hr className='border-t border-gray-600' />
        <h1 className='font-semibold p-4 text-xl text-gray-400'> <span><Link to={"/dashboard"} className='hover:text-blue-900'>Home</Link> / <Link to={"/country/add"} className='hover:text-blue-900'>Country</Link> / Add</span></h1>
        <hr className='border-t border-gray-600 mb-5' />
      </div>
      <div className='flex flex-col md:flex-row bg-[#F1F5F9] px-2 rounded-t-lg border border-black-200 items-center justify-between mt-9 py-4'>
        <h1 className='text-3xl font-semibold mb-3 ms-2'>Add Country</h1>
      </div>
      <form action="" className='bg-white p-6 rounded-b-lg border-2'>
        <div className='md:flex-row gap-4 p-4'>
          <label htmlFor="colorName" className='block font-bold mb-1'>Country Name</label>
          <input type="text" id="colorName" name="colorName" className='rounded-xl border-3 border-gray-300 w-full h-15 p-3 font-medium' placeholder='Country Name' required />
        </div>
        <div className='md:flex-row gap-4 p-4 mb-9'>
          <label htmlFor="colorDescription" className='block font-bold mb-1'>Order</label>
          <textarea
            id="colorDescription"
            name="colorDescription"
            className='rounded-xl border-3 border-gray-300 w-full h-15 p-3 font-medium resize-none'
            placeholder='Order'
            required
          />
        </div>
        <button type="submit" className="focus:outline-none ms-4 text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 ">Add Country</button>
      </form>
    </section>
  );
};