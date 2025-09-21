import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { FaFilter, FaPen } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import ResponsivePagination from 'react-responsive-pagination';

export default function ColorView() {

  let apiBaseurl = import.meta.env.VITE_APIBASEURL;

  let [colorData, setcolorData] = React.useState([]);
  let [ids, setids] = React.useState([]);
  let [currentPage, setCurrentPage] = React.useState(1);
  let [limit, setLimit] = React.useState(5);
  let [totalPage, setTotalPage] = React.useState(0);

  let getColorData = async () => {
    axios.get(`${apiBaseurl}color/view`,
      {
        params: {
          page: currentPage,
          limit: limit
        }
      }
    )
      .then((response) => response.data)
      .then((finResponse) => {
        setcolorData(Array.isArray(finResponse.colorData) ? finResponse.colorData : []);
        setTotalPage(finResponse.totalPage || 0);
      })
      .catch(() => {
        toast.error("Failed to fetch color data.");
        setcolorData([]); // fallback to empty array on error
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
      let allIds = colorData.map((v) => v._id);
      setids(allIds);
    }
    else {
      setids([]);
    }
  }

  let multidelete = () => {
    if (ids.length >= 1) {
      axios.delete(`${apiBaseurl}color/multidelete/`,
        {
          data: { ids: ids }
        }
      )
        .then((response) => response.data)
        .then((finResponse) => {
          toast.success(finResponse.message);
          getColorData();
          setids([]);
        })
    }
    else {
      toast.error("Please select at least one item");
    }
  }

  let statusUpdate = () => {
    if (ids.length >= 1) {
      axios.post(`${apiBaseurl}color/statusupdate/`, { ids: ids })
        .then((response) => response.data)
        .then((finResponse) => {
          toast.success(finResponse.message);
          getColorData();
          setids([]);
        })
    }
    else {
      toast.error("Please select at least one item");
    }
  }

  useEffect(() => {
    getColorData();
  }, [currentPage, limit]);

  return (
    <section>
      <ToastContainer />
      <div className='mt-5'>
        <hr className='border-t border-gray-600' />
        <h1 className='font-semibold p-4 text-xl text-gray-400'>
          <span>
            <Link to={"/dashboard"} className='hover:text-blue-900'>Home</Link> /
            <Link to={"/viewcolor"} className='hover:text-blue-900'> Color</Link> / View
          </span>
        </h1>
        <hr className='border-t border-gray-600 mb-5' />
      </div>
      <div className="max-w-[1400px] mx-auto px-3">
        <div className='flex flex-col md:flex-row bg-[#F1F5F9] px-4 rounded-lg border border-black-200 items-center justify-between mt-9 py-4 gap-4'>
          <h1 className='text-3xl font-semibold mb-3 md:mb-0 ms-0 md:ms-4 text-[#232B38]'>View Color</h1>
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
                    checked={ids.length === colorData.length && colorData.length > 0}
                    className="accent-blue-600 w-5 h-5" />
                </th>
                <th className="px-4 py-4 text-center w-2/12">SR.NO</th>
                <th className="px-4 py-4 text-center w-3/12">COLOR NAME</th>
                <th className="px-4 py-4 text-center w-2/12">CODE</th>
                <th className="px-4 py-4 text-center w-2/12">ORDER</th>
                <th className="px-4 py-4 text-center w-2/12">STATUS</th>
                <th className="px-4 py-4 text-center w-2/12">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {
                colorData.length >= 1 ?
                  (
                    colorData.map((row, idx) => (
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
                        <td className="px-4 py-4 text-center">{row.colorName}</td>
                        <td className="px-4 py-4 text-center">{row.colorCode}</td>
                        <td className="px-4 py-4 text-center">{row.colorOrder}</td>
                        <td className="px-4 py-4 text-center">
                          {
                            row.colorStatus ?
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
                            <Link to={`/editcolor/${row._id}`} >
                              <button className="bg-blue-700 hover:bg-blue-800 text-white p-2 rounded-full transition-colors duration-200" title="Edit Color">
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
                      <td colSpan="7" className="text-center py-4 text-2xl font-bold text-gray-400">
                        No colors available.
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