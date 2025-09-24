import React from 'react';
import { FaFilter, FaPen } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function SubCategoryView() {
  // Placeholder data for demonstration
  const subcategoryData = [
    {
      _id: '1',
      parentCategory: { categoryName: 'Shoe' },
      subcategoryName: 'Men',
      subcategoryImage: 'https://packshifts.in/images/iso.png',
      subcategoryOrder: 1,
      subcategoryStatus: true
    }
  ];
  const ids = [];

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-700 mb-2 tracking-tight flex items-center gap-2">
            <Link to="/dashboard" className="hover:text-blue-700 transition-colors">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to="/subcategory/view" className="hover:text-blue-700 transition-colors">Sub Category</Link>
            <span className="text-gray-400">/</span>
            <span className="text-blue-700">View</span>
          </h1>
        </div>
        <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-3xl font-semibold text-gray-800">View Sub Category</h2>
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
                  <th className="px-4 py-3 text-left sticky left-0 bg-blue-700/90 w-12 z-10">
                    <input type="checkbox" className="accent-blue-600 w-5 h-5" />
                  </th>
                  <th className="px-4 py-3 text-left sticky left-12 bg-blue-700/90 w-48 z-10">PARENT CATEGORY NAME</th>
                  <th className="px-4 py-3 text-center w-1/6">SUB CATEGORY NAME</th>
                  <th className="px-4 py-3 text-center">IMAGE</th>
                  <th className="px-4 py-3 text-center w-1/8">ORDER</th>
                  <th className="px-4 py-3 text-center w-1/8">STATUS</th>
                  <th className="px-4 py-3 text-center">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {subcategoryData.length >= 1 ?
                  subcategoryData.map((row, i) => (
                    <tr
                      key={row._id}
                      className={`transition-colors duration-200 ${i % 2 === 0 ? 'bg-white' : 'bg-blue-50'} hover:bg-blue-100 text-gray-800`}
                    >
                      <td className="px-4 py-2 align-middle sticky left-0 bg-inherit w-12">
                        <input type="checkbox" className="accent-blue-600 w-5 h-5" />
                      </td>
                      <td className="px-4 py-2 align-middle sticky left-12 bg-inherit w-48 font-medium">{row.parentCategory.categoryName}</td>
                      <td className="px-4 py-2 align-middle text-center w-1/8">{row.subcategoryName}</td>
                      <td className="px-4 py-2 align-middle text-center">
                        <div className="flex justify-center items-center h-full">
                          <img src={row.subcategoryImage} alt="" className="w-12 h-12 object-cover rounded-lg border border-gray-200 shadow-sm" />
                        </div>
                      </td>
                      <td className="px-4 py-2 align-middle text-center w-1/8 font-semibold">{row.subcategoryOrder}</td>
                      <td className="px-4 py-2 align-middle text-center w-1/8">
                        {row.subcategoryStatus ? (
                          <span className="px-4 py-1 rounded-full font-semibold bg-green-100 text-green-700 border border-green-300 text-xs">Active</span>
                        ) : (
                          <span className="px-4 py-1 rounded-full font-semibold bg-red-100 text-red-700 border border-red-300 text-xs">Deactivate</span>
                        )}
                      </td>
                      <td className="px-4 py-2 align-middle text-center w-1/6">
                        <div className="flex items-center justify-center h-full">
                          <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow transition-colors duration-200 cursor-pointer" title="Edit Subcategory">
                            <FaPen />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                  : (
                    <tr>
                      <td colSpan="7" className="text-center py-8 text-2xl font-bold text-gray-400">
                        No Subcategory available.
                      </td>
                    </tr>
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}