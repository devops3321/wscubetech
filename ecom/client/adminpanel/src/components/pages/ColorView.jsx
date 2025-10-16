import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { FaFilter, FaPen, FaSearch } from "react-icons/fa";
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
  let [showSearch, setShowSearch] = React.useState(false);
  let [searchTerm, setSearchTerm] = React.useState("");

  let getColorData = async () => {
    axios.get(`${apiBaseurl}color/view`,
      {
        params: {
          page: currentPage,
          limit: limit,
          searchTerm: searchTerm   // <-- include searchTerm so backend receives it
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

  let handleSearch = () => {
    // reset to first page on new search
    setCurrentPage(1);
    // reuse getColorData (it now sends searchTerm)
    getColorData();
  };

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

  useEffect(() => {
    if (searchTerm) {
      // debounce could be added if needed; keep behavior consistent
      handleSearch();
    } else {
      getColorData();
    }
  }, [searchTerm]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 py-8">
      <ToastContainer />
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-700 mb-2 tracking-tight flex items-center gap-2">
            <Link to={"/dashboard"} className="hover:text-blue-700 transition-colors">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to={"/color/view"} className="hover:text-blue-700 transition-colors">Color</Link>
            <span className="text-gray-400">/</span>
            <span className="text-blue-700">View</span>
          </h1>
        </div>
        <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-3xl font-semibold text-gray-800">View Color</h2>
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
              <button
                type="button"
                className="text-white bg-blue-600 hover:bg-blue-700 font-semibold rounded-lg text-md px-3 py-2 shadow transition-all duration-150"
                title="Filter"
                onClick={() => setShowSearch(!showSearch)}
              >
                <FaFilter />
              </button>
              <button type="button" onClick={statusUpdate} className="text-white bg-green-600 hover:bg-green-700 font-semibold rounded-lg text-md px-5 py-2 shadow transition-all duration-150">Change Status</button>
              <button type="button" onClick={multidelete} className="text-white bg-red-600 hover:bg-red-700 font-semibold rounded-lg text-md px-5 py-2 shadow transition-all duration-150">Delete</button>
            </div>
          </div>
          {showSearch && (
            <div className="flex items-center gap-2 mb-4">
              <input
                type="text"
                placeholder="Search color..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 py-2 flex items-center cursor-pointer shadow transition-all duration-150"
                onClick={handleSearch}
                title="Search"
              >
                <FaSearch />
              </button>
            </div>
          )}
          <div className="overflow-x-auto rounded-xl border border-gray-100 bg-gray-50">
            <table className="min-w-full table-auto text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-blue-700 to-blue-500 text-white">
                  <th className="px-4 py-3 text-left sticky left-0 bg-blue-700/90 w-12 z-10">
                    <input
                      type="checkbox"
                      onChange={allCheckId}
                      checked={ids.length === colorData.length && colorData.length > 0}
                      className="accent-blue-600 w-5 h-5" />
                  </th>
                  <th className="px-4 py-3 text-center w-2/12">SR.NO</th>
                  <th className="px-4 py-3 text-left w-3/12">COLOR NAME</th>
                  <th className="px-4 py-3 text-center w-2/12">CODE</th>
                  <th className="px-4 py-3 text-center w-2/12">ORDER</th>
                  <th className="px-4 py-3 text-center w-2/12">STATUS</th>
                  <th className="px-4 py-3 text-center w-2/12">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {
                  colorData.length >= 1 ?
                    colorData.map((row, idx) => (
                      <tr
                        key={row._id}
                        className={
                          `transition-colors duration-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'} hover:bg-blue-100 text-gray-800`
                        }>
                        <td className="px-4 py-2 align-middle sticky left-0 bg-inherit w-12">
                          <input
                            type="checkbox"
                            onChange={getCheckedIds}
                            checked={ids.includes(row._id)}
                            value={row._id}
                            className="accent-blue-600 w-5 h-5" />
                        </td>
                        <td className="px-4 py-2 text-center font-semibold">{(currentPage - 1) * limit + idx + 1}</td>
                        <td className="px-4 py-2 align-middle font-medium">{row.colorName}</td>
                        <td className="px-4 py-2 align-middle text-center">
                          <span className="inline-block w-8 h-8 rounded-full border border-gray-300 shadow-sm" style={{ backgroundColor: row.colorCode }} title={row.colorCode}></span>
                          <span className="ml-2 text-xs text-gray-700">{row.colorCode}</span>
                        </td>
                        <td className="px-4 py-2 align-middle text-center font-semibold">{row.colorOrder}</td>
                        <td className="px-4 py-2 align-middle text-center">
                          {
                            row.colorStatus ?
                              (
                                <span className="px-4 py-1 rounded-full font-semibold bg-green-100 text-green-700 border border-green-300 text-xs">Active</span>
                              )
                              :
                              (
                                <span className="px-4 py-1 rounded-full font-semibold bg-red-100 text-red-700 border border-red-300 text-xs">Deactivate</span>
                              )
                          }
                        </td>
                        <td className="px-4 py-2 align-middle text-center">
                          <div className="flex items-center justify-center h-full">
                            <Link to={`/editcolor/${row._id}`}>
                              <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow transition-colors duration-200 cursor-pointer" title="Edit Color">
                                <FaPen />
                              </button>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                    :
                    (
                      <tr>
                        <td colSpan="7" className="text-center py-8 text-2xl font-bold text-gray-400">
                          No colors available.
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