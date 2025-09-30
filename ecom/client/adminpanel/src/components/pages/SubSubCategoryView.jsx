import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPen, FaFilter } from "react-icons/fa";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";

export default function SubSubCategoryView() {
  let apiBaseurl = import.meta.env.VITE_APIBASEURL;
  const [subsubcategoryData, setSubsubcategoryData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPage, setTotalPage] = useState(0);
  const [staticPath, setStaticPath] = useState("");
  const [ids, setIds] = useState([]);
  const [parentCategories, setParentCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const getSubSubCategoryData = () => {
    axios.get(`${apiBaseurl}subsubcategory/view`, {
      params: { page: currentPage, limit: limit }
    })
      .then((response) => response.data)
      .then((finResponse) => {
        setSubsubcategoryData(Array.isArray(finResponse.subsubcategoryData) ? finResponse.subsubcategoryData : []);
        setTotalPage(finResponse.totalPage || 0);
        setStaticPath(finResponse.staticPath || "");
      })
      .catch(() => {
        toast.error("Failed to fetch subsubcategory data.");
        setSubsubcategoryData([]);
      });
  };

  const getCheckedIds = (e) => {
    if (e.target.checked) {
      if (!ids.includes(e.target.value)) {
        setIds([...ids, e.target.value]);
      }
    } else {
      let filtered = ids.filter((v) => v !== e.target.value);
      setIds(filtered);
    }
  };

  const allCheckId = (e) => {
    if (e.target.checked) {
      let allIds = subsubcategoryData.map((v) => v._id);
      setIds(allIds);
    } else {
      setIds([]);
    }
  };

  const multidelete = () => {
    if (ids.length >= 1) {
      axios.delete(`${apiBaseurl}subsubcategory/multidelete/`, {
        data: { ids: ids }
      })
        .then((response) => response.data)
        .then((finResponse) => {
          toast.success(finResponse.message);
          getSubSubCategoryData();
          setIds([]);
        });
    } else {
      toast.error("Please select at least one item");
    }
  };

  const statusUpdate = () => {
    if (ids.length >= 1) {
      axios.post(`${apiBaseurl}subsubcategory/statusupdate/`, { ids: ids })
        .then((response) => response.data)
        .then((finResponse) => {
          toast.success(finResponse.message);
          getSubSubCategoryData();
          setIds([]);
        });
    } else {
      toast.error("Please select at least one item");
    }
  };

  // Fetch parent categories and subcategories for filtering or display (future-proofing)
  useEffect(() => {
    axios.get(`${apiBaseurl}subsubcategory/parent-category/view`)
      .then((response) => response.data)
      .then((finResponse) => {
        if (finResponse.status === "success") {
          setParentCategories(finResponse.categoryData || []);
        }
      });
    axios.get(`${apiBaseurl}subsubcategory/subcategory/view`)
      .then((response) => response.data)
      .then((finResponse) => {
        if (finResponse.status === "success") {
          setSubCategories(finResponse.subcategoryData || []);
        }
      });
  }, []);

  useEffect(() => {
    getSubSubCategoryData();
    // eslint-disable-next-line
  }, [currentPage, limit]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 py-8">
      <ToastContainer />
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-700 mb-2 tracking-tight flex items-center gap-2">
            <Link to="/dashboard" className="hover:text-blue-700 transition-colors">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to="/subsubcategory/view" className="hover:text-blue-700 transition-colors">Sub Sub Category</Link>
            <span className="text-gray-400">/</span>
            <span className="text-blue-700">View</span>
          </h1>
        </div>
        <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-3xl font-semibold text-gray-800">View Sub Sub Category</h2>
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
              <button type="button" onClick={statusUpdate} className="text-white bg-green-600 hover:bg-green-700 font-semibold rounded-lg text-md px-5 py-2 shadow transition-all duration-150">Change Status</button>
              <button type="button" onClick={multidelete} className="text-white bg-red-600 hover:bg-red-700 font-semibold rounded-lg text-md px-5 py-2 shadow transition-all duration-150">Delete</button>
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
                      checked={ids.length === subsubcategoryData.length && subsubcategoryData.length > 0}
                      className="accent-blue-600 w-5 h-5" />
                  </th>
                  <th className="px-4 py-3 text-center w-2/12">SR.NO</th>
                  <th className="px-4 py-3 text-left sticky left-12 bg-blue-700/90 w-48 z-10">PARENT CATEGORY NAME</th>
                  <th className="px-4 py-3 text-center w-1/6">SUB CATEGORY NAME</th>
                  <th className="px-4 py-3 text-center w-1/6">SUB SUB CATEGORY NAME</th>
                  <th className="px-4 py-3 text-center">IMAGE</th>
                  <th className="px-4 py-3 text-center w-1/8">ORDER</th>
                  <th className="px-4 py-3 text-center w-1/8">STATUS</th>
                  <th className="px-4 py-3 text-center">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {subsubcategoryData.length >= 1 ?
                  subsubcategoryData.map((row, i) => (
                    <tr
                      key={row._id}
                      className={`transition-colors duration-200 ${i % 2 === 0 ? 'bg-white' : 'bg-blue-50'} hover:bg-blue-100 text-gray-800`}
                    >
                      <td className="px-4 py-2 align-middle sticky left-0 bg-inherit w-12">
                        <input
                          type="checkbox"
                          onChange={getCheckedIds}
                          checked={ids.includes(row._id)}
                          value={row._id}
                          className="accent-blue-600 w-5 h-5" />
                      </td>
                      <td className="px-4 py-2 text-center font-semibold">{(currentPage - 1) * limit + i + 1}</td>
                      <td className="px-4 py-2 align-middle sticky left-12 bg-inherit w-48 font-medium">{row.parentCategory?.categoryName || '-'}</td>
                      <td className="px-4 py-2 align-middle text-center w-1/8">{row.subcategory?.subcategoryName || '-'}</td>
                      <td className="px-4 py-2 align-middle text-center w-1/8">{row.subsubcategoryName}</td>
                      <td className="px-4 py-2 align-middle text-center">
                        <div className="flex justify-center items-center h-full">
                          <img src={`${staticPath}${row.subsubcategoryImage}`} alt="" className="w-12 h-12 object-cover rounded-lg border border-gray-200 shadow-sm" />
                        </div>
                      </td>
                      <td className="px-4 py-2 align-middle text-center w-1/8 font-semibold">{row.subsubcategoryOrder}</td>
                      <td className="px-4 py-2 align-middle text-center w-1/8">
                        {row.subsubcategoryStatus ? (
                          <span className="px-4 py-1 rounded-full font-semibold bg-green-100 text-green-700 border border-green-300 text-xs">Active</span>
                        ) : (
                          <span className="px-4 py-1 rounded-full font-semibold bg-red-100 text-red-700 border border-red-300 text-xs">Deactivate</span>
                        )}
                      </td>
                      <td className="px-4 py-2 align-middle text-center w-1/6">
                        <div className="flex items-center justify-center h-full">
                          <Link to={`/editsubsubcategory/${row._id}`}>
                          <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow transition-colors duration-200 cursor-pointer" title="Edit Sub Subcategory">
                            <FaPen />
                          </button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                  : (
                    <tr>
                      <td colSpan="9" className="text-center py-8 text-2xl font-bold text-gray-400">
                        No Sub Subcategory available.
                      </td>
                    </tr>
                  )}
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
