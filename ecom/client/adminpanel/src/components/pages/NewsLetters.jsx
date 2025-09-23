import React, { useState } from 'react';
import { FaFilter, FaPen } from "react-icons/fa";
import { Link } from 'react-router-dom';
import ResponsivePagination from 'react-responsive-pagination';

export default function NewsLetters() {
  // Dummy data for demonstration; replace with API data as needed
  const [newsletterData, setNewsletterData] = useState([
    { _id: 1, name: "Neil Sims", email: "xyz@gmail.com", mobile: "9876543210", status: true },
    { _id: 2, name: "Jane Doe", email: "jane@example.com", mobile: "9123456789", status: false }
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPage, setTotalPage] = useState(1);
  const [ids, setIds] = useState([]);

  const getCheckedIds = (e) => {
    if (e.target.checked) {
      if (!ids.includes(e.target.value)) {
        setIds([...ids, e.target.value]);
      }
    } else {
      let filteredData = ids.filter((v) => v !== e.target.value);
      setIds(filteredData);
    }
  };

  const allCheckId = (e) => {
    if (e.target.checked) {
      let allIds = newsletterData.map((v) => v._id.toString());
      setIds(allIds);
    } else {
      setIds([]);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-700 mb-2 tracking-tight flex items-center gap-2">
            <Link to={"/dashboard"} className="hover:text-blue-700 transition-colors">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to={"/newsletter"} className="hover:text-blue-700 transition-colors">Newsletter</Link>
            <span className="text-gray-400">/</span>
            <span className="text-blue-700">View</span>
          </h1>
        </div>
        <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-3xl font-semibold text-gray-800">Newsletters Management</h2>
            <div className="flex items-center gap-3">
              <label htmlFor="limit" className="font-medium text-gray-700">Items per page:</label>
              <select
                name="limit"
                id="limit"
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 shadow-sm"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>
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
                    <input
                      type="checkbox"
                      onChange={allCheckId}
                      checked={ids.length === newsletterData.length && newsletterData.length > 0}
                      className="accent-blue-600 w-5 h-5" />
                  </th>
                  <th className="px-4 py-3 text-center w-2/12">SR.NO</th>
                  <th className="px-4 py-3 text-left sticky left-12 bg-blue-700/90 w-48 z-10">NAME</th>
                  <th className="px-4 py-3 text-center w-1/6">EMAIL ID</th>
                  <th className="px-4 py-3 text-center">MOBILE NUMBER</th>
                  <th className="px-4 py-3 text-center w-1/8">STATUS</th>
                  <th className="px-4 py-3 text-center">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {
                  newsletterData.length >= 1 ?
                    newsletterData.map((row, i) => (
                      <tr
                        key={row._id}
                        className={
                          `transition-colors duration-200 ${i % 2 === 0 ? 'bg-white' : 'bg-blue-50'} hover:bg-blue-100 text-gray-800`
                        }>
                        <td className="px-4 py-2 align-middle sticky left-0 bg-inherit w-12">
                          <input
                            type="checkbox"
                            onChange={getCheckedIds}
                            checked={ids.includes(row._id.toString())}
                            value={row._id}
                            className="accent-blue-600 w-5 h-5" />
                        </td>
                        <td className="px-4 py-2 text-center font-semibold">{(currentPage - 1) * limit + i + 1}</td>
                        <td className="px-4 py-2 align-middle sticky left-12 bg-inherit w-48 font-medium">{row.name}</td>
                        <td className="px-4 py-2 align-middle text-center">{row.email}</td>
                        <td className="px-4 py-2 align-middle text-center">{row.mobile}</td>
                        <td className="px-4 py-2 align-middle text-center w-1/8">
                          {
                            row.status ?
                              (
                                <span className="px-4 py-1 rounded-full font-semibold bg-green-100 text-green-700 border border-green-300 text-xs">Active</span>
                              )
                              :
                              (
                                <span className="px-4 py-1 rounded-full font-semibold bg-red-100 text-red-700 border border-red-300 text-xs">Deactivate</span>
                              )
                          }
                        </td>
                        <td className="px-4 py-2 align-middle text-center w-1/6">
                          <div className="flex items-center justify-center h-full">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow transition-colors duration-200 cursor-pointer" title="Edit Newsletter">
                              <FaPen />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                    :
                    (
                      <tr>
                        <td colSpan="7" className="text-center py-8 text-2xl font-bold text-gray-400">
                          No Newsletter available.
                        </td>
                      </tr>
                    )
                }
              </tbody>
            </table>
          </div>
          <div className="my-8 flex justify-center">
            <ResponsivePagination
              current={currentPage}
              total={totalPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}