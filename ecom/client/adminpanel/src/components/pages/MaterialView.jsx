import React, { useState, useEffect } from 'react';
import { FaFilter, FaPen } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import ResponsivePagination from 'react-responsive-pagination';

export default function ViewMaterial() {

  let apiBaseurl = import.meta.env.VITE_APIBASEURL;

  let [materialData, setmaterialData] = React.useState([]);
  let [currentPage, setCurrentPage] = React.useState(1);
  let [totalPage, setTotalPage] = React.useState(1);
  let [limit, setLimit] = React.useState(5);
  let [ids, setids] = React.useState([]);

  let getMaterialData = async () => {
    axios.get(`${apiBaseurl}material/view`,
      {
        params: {
          page: currentPage,
          limit: limit
        }
      }
    )
      .then((response) => response.data)
      .then((finResponse) => {
        setmaterialData(Array.isArray(finResponse.materialData) ? finResponse.materialData : []);
        setTotalPage(finResponse.totalPage || 0);
      })
      .catch(() => {
        toast.error("Failed to fetch material data.");
        setmaterialData([]);
      });
  }

  let getCheckedIds = (e) => {
    if (e.target.checked) {
      if (!ids.includes(e.target.value)) {
        setids([...ids, e.target.value]);
      }
    }
    else {
      let filtedData = ids.filter((v) => v !== e.target.value);
      setids(filtedData);
    }
  }

  let allCheckId = (e) => {
    if (e.target.checked) {
      let allIds = materialData.map((v) => v._id);
      setids(allIds);
    }
    else {
      setids([]);
    }
  }

  let multidelete = () => {
    if (ids.length >= 1) {
      axios.delete(`${apiBaseurl}material/multidelete/`,
        {
          data: { ids: ids }
        }
      )
        .then((response) => response.data)
        .then((finResponse) => {
          toast.success(finResponse.message);
          getMaterialData();
          setids([]);
        })
    }
    else {
      toast.error("Please select at least one item");
    }
  }

  let statusUpdate = () => {
    if (ids.length >= 1) {
      axios.post(`${apiBaseurl}material/statusupdate/`, { ids: ids })
        .then((response) => response.data)
        .then((finResponse) => {
          toast.success(finResponse.message);
          getMaterialData();
          setids([]);
        })
    }
    else {
      toast.error("Please select at least one item");
    }
  }

  useEffect(() => {
    getMaterialData();
  }, [currentPage, limit]);

  return (
    <section>
      <ToastContainer />
      <div className='mt-5'>
        <hr className='border-t border-gray-600' />
        <h1 className='font-semibold p-4 text-xl text-gray-400'>
          <span>
            <Link to={"/dashboard"} className='hover:text-blue-900'>Home</Link> /
            <Link to={"/material/view"} className='hover:text-blue-900'> Material</Link> / View
          </span>
        </h1>
        <hr className='border-t border-gray-600 mb-5' />
      </div>
      <div className="max-w-[1400px] mx-auto px-3">
        <div className='flex flex-col md:flex-row bg-[#F1F5F9] px-4 rounded-lg border border-black-200 items-center justify-between mt-9 py-4 gap-4'>
          <h1 className='text-3xl font-semibold mb-3 md:mb-0 ms-0 md:ms-4 text-[#232B38]'>View Material</h1>
          <div className='flex items-center gap-2'>
            <label htmlFor="limit" className='font-bold text-gray-700'>Items per page:</label>
            <select
              name="limit"
              id="limit"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className='bg-white border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5'
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>
          <div className='flex flex-col md:flex-row gap-2'>
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-md px-3 py-3" title="Filter"><FaFilter /></button>
            <button type="button" onClick={statusUpdate} className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-md px-5 py-2.5">Change Status</button>
            <button type="button" onClick={multidelete} className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-md px-5 py-2.5">Delete</button>
          </div>
        </div>
        <div className="overflow-x-auto mt-2 rounded-lg shadow">
          <table className="w-full table-auto bg-white rounded-lg">
            <thead>
              <tr className='bg-[#374151] text-white'>
                <th className="px-4 py-4 text-center w-1/12">
                  <input
                    type="checkbox"
                    onChange={allCheckId}
                    checked={ids.length === materialData.length && materialData.length > 0}
                    className="accent-blue-600 w-5 h-5" />
                </th>
                <th className="px-4 py-4 text-center w-2/12">SR.NO</th>
                <th className="px-4 py-4 text-center w-3/12">MATERIAL NAME</th>
                <th className="px-4 py-4 text-center w-2/12">ORDER</th>
                <th className="px-4 py-4 text-center w-2/12">STATUS</th>
                <th className="px-4 py-4 text-center w-2/12">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {
                materialData.length >= 1 ?
                  (
                    materialData.map((row, idx) => (
                      <tr
                        key={row._id}
                        className="bg-[#232B38] text-white transition-colors duration-200 hover:bg-[#374151]"
                      >
                        <td className="px-4 py-4 text-center">
                          <input
                            type="checkbox"
                            onChange={getCheckedIds}
                            checked={ids.includes(row._id)}
                            value={row._id}
                            className="accent-blue-600 w-5 h-5" />
                        </td>
                        <td className="px-4 py-4 text-center">{(currentPage - 1) * limit + idx + 1}</td>
                        <td className="px-4 py-4 text-center">{row.categoryName}</td>
                        <td className="px-4 py-4 text-center">{row.order}</td>
                        <td className="px-4 py-4 text-center">
                          {
                            row.materialStatus ?
                              (
                                <span className="px-5 py-2 rounded-lg font-semibold transition-colors duration-200 cursor-pointer bg-green-600 hover:bg-green-700">
                                  Active
                                </span>
                              )
                              :
                              (
                                <span className="px-5 py-2 rounded-lg font-semibold transition-colors duration-200 cursor-pointer bg-red-600 hover:bg-red-700">
                                  Deactivate
                                </span>
                              )
                          }
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="flex items-center justify-center h-full">
                            <Link to={`/editmaterial/${row._id}`}>
                              <button className="bg-blue-700 hover:bg-blue-800 text-white p-2 rounded-full transition-colors duration-200" title="Edit Material">
                                <FaPen />
                              </button>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  )
                  :
                  (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-2xl font-bold text-gray-400">
                        No materials available.
                      </td>
                    </tr>
                  )
              }
            </tbody>
          </table>
        </div>
        <div className='my-6 flex justify-center'>
          <ResponsivePagination
            current={currentPage}
            total={totalPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </section>
  );
};