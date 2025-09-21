import React from 'react';
import { useEffect } from 'react';
import { FaFilter, FaPen } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import ResponsivePagination from 'react-responsive-pagination';
import axios from 'axios';

export default function CategoryView() {

  let apiBaseurl = import.meta.env.VITE_APIBASEURL;

  let [categoryData, setCategoryData] = React.useState([]);
  let [currentPage, setCurrentPage] = React.useState(1);
  let [limit, setLimit] = React.useState(5);
  let [totalPage, setTotalPage] = React.useState(0);
  let [staticPath, setStaticPath] = React.useState([]);

  let getCategoryData = async () => {
    axios.get(`${apiBaseurl}category/view`,
      {
        params: {
          page: currentPage,
          limit: limit
        }
      }
    )
      .then((response) => response.data)
      .then((finResponse) => {
        setCategoryData(Array.isArray(finResponse.categoryData) ? finResponse.categoryData : []);
        setTotalPage(finResponse.totalPage || 0);
        setStaticPath(finResponse.staticPath || []);
      })
      .catch(() => {
        toast.error("Failed to fetch category data.");
        setCategoryData([]); // fallback to empty array on error
      });
  }


  useEffect(() => {
    getCategoryData();
  }, [currentPage, limit]);

  return (
    <section>
      <ToastContainer />
      <div className='mt-5'>
        <hr className='border-t border-gray-600' />
        <h1 className='font-semibold p-4 text-xl text-gray-400'> <span><Link to={"/dashboard"} className='hover:text-blue-900'>Home</Link> / <Link to={"/category/view"} className='hover:text-blue-900'>Category</Link> / View</span></h1>
        <hr className='border-t border-gray-600 mb-5' />
      </div>
      <div className="max-w-[1400px] mx-auto px-3">
        <div className='flex flex-col md:flex-row bg-[#F1F5F9] px-2 rounded-lg border border-black-200 items-center justify-between mt-9 py-4'>
          <h1 className='text-3xl font-semibold mb-3 ms-2'>View Category</h1>
          <div className='flex flex-col md:flex-row'>
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-md px-3 py-3 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"><FaFilter /></button>
            <button type="button" className=" text-white bg-green-700 hover:bg-green-800  font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700">Change Status</button>
            <button type="button" className=" text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 ">Delete</button>
          </div>
        </div>
        <div>
          <table className="min-w-full rounded-lg table-fixed">
            <thead>
              <tr className='bg-[#374151] text-white'>
                <th className="px-4 py-2 text-left sticky left-0 bg-[#374151] w-12 z-10">
                  <input type="checkbox" className="accent-blue-600 w-5 h-5" />
                </th>
                <th className="px-4 py-5 text-left bg-[#374151] w-1 z-10 ">NAME</th>
                <th className="px-4 py-5 text-center w-1/6">IMAGE</th>
                <th className="px-4 py-5 text-center ">ORDER</th>
                <th className="px-4 py-5 text-center w-1/8 ">STATUS</th>
                <th className="px-4 py-5 text-center ">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {
                categoryData.length >= 1 ?

                  (
                    categoryData.map((row, i) => (
                      <tr
                        key={row._id}
                        className="bg-[#232B38] text-white transition-colors duration-200 hover:bg-[#374151]"
                      >
                        <td className="px-4 py-2 align-middle sticky left-0 bg-[#232B38] w-12" style={{ background: 'inherit' }}>
                          <input type="checkbox" className="accent-blue-600 w-5 h-5" />
                        </td>
                        <td className="px-4 py-6 align-middle sticky left-12 bg-[#232B38] w-48" style={{ background: 'inherit' }}>
                          {row.categoryName}
                        </td>
                        <td className="px-4 py-2 align-middle text-center">
                          <div className="flex justify-center items-center h-full">
                            <img src={`${staticPath}${row.categoryImage}`} alt="" className='w-25 h-25 object-cover' />
                          </div>
                        </td>
                        <td className="px-4 py-2 align-middle text-center w-1/8">{row.categoryOrder}</td>
                        <td className="px-4 py-2 align-middle text-center w-1/8">
                          {
                            row.categoryStatus ?
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
                        <td className="px-4 py-2 align-middle text-center w-1/6">
                          <div className="flex items-center justify-center h-full">
                            <button className="bg-blue-700 hover:bg-blue-800 text-white p-2 rounded-full transition-colors duration-200" title="Edit Category">
                              <FaPen />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )

                  :

                  (
                    <tr>
                      <td colSpan="7" className="text-center py-4 text-2xl font-bold text-gray-400">
                        No Category available.
                      </td>
                    </tr>
                  )
              }
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};