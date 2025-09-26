import React from 'react';
import { FaFilter, FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from 'react-router-dom';

export default function ProductItems() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-700 mb-2 tracking-tight flex items-center gap-2">
            <Link to="/dashboard" className="hover:text-blue-700 transition-colors">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to="/product/product-items" className="hover:text-blue-700 transition-colors">Product Items</Link>
            <span className="text-gray-400">/</span>
            <span className="text-blue-700">View</span>
          </h1>
        </div>
        <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-3xl font-semibold text-gray-800">View Product Items</h2>
            <div className="flex flex-wrap gap-2">
              <button type="button" className="text-white bg-blue-600 hover:bg-blue-700 font-semibold rounded-lg text-md px-3 py-2 shadow transition-all duration-150" title="Filter"><FaFilter /></button>
              <button type="button" className="text-white bg-green-600 hover:bg-green-700 font-semibold rounded-lg text-md px-5 py-2 shadow transition-all duration-150">Change Status</button>
              <button type="button" className="text-white bg-red-600 hover:bg-red-700 font-semibold rounded-lg text-md px-5 py-2 shadow transition-all duration-150">Delete</button>
            </div>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-100 bg-gray-50">
            <table className="min-w-full table-auto text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-blue-700 to-blue-500 text-white">
                  <th className="px-4 py-3 text-left sticky left-0 bg-blue-700/90 w-12 z-10">Delete</th>
                  <th className="px-4 py-3 text-center w-20">SL. NO.</th>
                  <th className="px-4 py-3 text-center w-32">PRODUCT NAME</th>
                  <th className="px-4 py-3 text-center w-64">DESCRIPTION</th>
                  <th className="px-4 py-3 text-center w-64">SHORT DESCRIPTION</th>
                  <th className="px-4 py-3 text-center w-32">THUMBNAILS</th>
                  <th className="px-4 py-3 text-center w-40">ACTION</th>
                  <th className="px-4 py-3 text-center w-24">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4].map((row, i) => (
                  <tr
                    key={i}
                    className={`transition-colors duration-200 ${i % 2 === 0 ? 'bg-white' : 'bg-blue-50'} hover:bg-blue-100 text-gray-800`}
                  >
                    <td className="px-4 py-2 align-middle sticky left-0 bg-inherit w-12">
                      <input type="checkbox" className="accent-blue-600 w-5 h-5" />
                    </td>
                    <td className="px-4 py-2 align-middle text-center w-20">{i + 1}</td>
                    <td className="px-4 py-2 align-middle text-center w-32">Mens</td>
                    <td className="px-4 py-2 align-middle text-left w-64">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit, consequuntur eaque omnis maxime corporis delectus dolor fugit deleniti ab? Facere hic placeat praesentium tenetur dolorum neque pariatur? Corrupti, delectus sequi?
                      <Link className="text-blue-500 cursor-pointer ms-2">Read More</Link>
                    </td>
                    <td className="px-4 py-2 align-middle text-left w-64">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit, consequuntur eaque omnis maxime corporis delectus dolor fugit deleniti ab? Facere hic placeat praesentium tenetur dolorum neque pariatur? Corrupti, delectus sequi?
                      <Link className="text-blue-500 cursor-pointer ms-2">Read More</Link>
                    </td>
                    <td className="px-4 py-2 align-middle text-center w-32">
                      <div className="flex items-center justify-center h-full">
                        <img
                          className="w-16 h-16 object-cover rounded-lg border border-gray-200 shadow-sm"
                          src="https://i.pinimg.com/originals/bf/e0/39/bfe03930f2a1bfff7515a14dc47d34d1.png"
                          alt="thumbnail"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-2 align-middle text-center w-40">
                      <div className="flex items-center justify-center gap-2 h-full">
                        <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow transition-colors duration-200 cursor-pointer" title="Delete">
                          <RiDeleteBin5Line size={20} />
                        </button>
                        <span className="text-gray-400">|</span>
                        <button className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded-full shadow transition-colors duration-200 cursor-pointer" title="Edit">
                          <FaRegEdit size={20} />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-2 align-middle text-center w-24">
                      <span className="px-4 py-1 rounded-full font-semibold bg-green-100 text-green-700 border border-green-300 text-xs">Active</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}