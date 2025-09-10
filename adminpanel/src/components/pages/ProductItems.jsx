import React from 'react';
import { FaFilter, FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from 'react-router-dom';

export default function ProductItems() {
  return (
    <section>
      <div className='mt-5'>
        <hr className='border-t border-gray-600' />
        <h1 className='font-semibold p-4 text-xl text-gray-400'>
          <span>
            <Link to={"/dashboard"} className='hover:text-blue-900'>Home</Link> /
            <Link to={"/product/product-items"} className='hover:text-blue-900'> Product Items</Link> / View
          </span>
        </h1>
        <hr className='border-t border-gray-600' />
      </div>
      <div className='flex flex-col md:flex-row bg-[#F1F5F9] px-2 rounded-lg border border-black-200 items-center justify-between mt-9 py-4'>
        <h1 className='text-3xl font-semibold mb-3 ms-2'>Product Items</h1>
        <div className='flex flex-col md:flex-row'>
          <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-md px-3 py-3 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"><FaFilter /></button>
          <button type="button" className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700">Change Status</button>
          <button type="button" className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700">Delete</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-lg table-fixed border border-gray-200">
          <thead>
            <tr className='bg-[#374151] text-white'>
              <th className="px-4 py-5 text-left w-12">Delete</th>
              <th className="px-4 py-5 text-center w-20">SL. NO.</th>
              <th className="px-4 py-5 text-center w-32">PRODUCT NAME</th>
              <th className="px-4 py-5 text-center w-64">DESCRIPTION</th>
              <th className="px-4 py-5 text-center w-64">SHORT DESCRIPTION</th>
              <th className="px-4 py-5 text-center w-32">THUMBNAILS</th>
              <th className="px-4 py-5 text-center w-40">ACTION</th>
              <th className="px-4 py-5 text-center w-24">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4].map((row, i) => (
              <tr
                key={i}
                className="bg-white text-black border-b border-gray-200 transition-colors duration-200 hover:bg-blue-50 items-center justify-content-center"
              >
                <td className="px-4 py-2 align-middle">
                  <input type="checkbox" className="accent-blue-600 w-5 h-5" />
                </td>
                <td className="px-4 py-2 align-middle text-center">
                  {i + 1}
                </td>
                <td className="px-4 py-2 align-middle text-center">Mens</td>
                <td className="px-4 py-2 align-middle text-left">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit, consequuntur eaque omnis maxime corporis delectus dolor fugit deleniti ab? Facere hic placeat praesentium tenetur dolorum neque pariatur? Corrupti, delectus sequi?
                  <Link className="text-blue-500 cursor-pointer ms-2">Read More</Link>
                </td>
                <td className="px-4 py-2 align-middle text-left">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit, consequuntur eaque omnis maxime corporis delectus dolor fugit deleniti ab? Facere hic placeat praesentium tenetur dolorum neque pariatur? Corrupti, delectus sequi?
                  <Link className="text-blue-500 cursor-pointer ms-2">Read More</Link>
                </td>
                <td className="px-4 py-2 align-middle">
                  <div className="flex items-center justify-center">
                    <img
                      className="w-16 h-16 object-cover rounded"
                      src="https://i.pinimg.com/originals/bf/e0/39/bfe03930f2a1bfff7515a14dc47d34d1.png"
                      alt="thumbnail"
                    />
                  </div>
                </td>
                <td className="px-4 py-2 align-middle text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button className="hover:bg-blue-100 text-red-500 p-2 rounded-full transition-colors" title="Delete">
                      <RiDeleteBin5Line size={20} />
                    </button>
                    <span className="text-gray-400">|</span>
                    <button className="hover:bg-blue-100 text-yellow-500 p-2 rounded-full transition-colors" title="Edit">
                      <FaRegEdit size={20} />
                    </button>
                  </div>
                </td>
                <td className="px-4 py-2 align-middle text-center">
                  <span className="inline-block px-3 py-1 rounded bg-green-100 text-green-700 font-semibold text-xs">Active</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}