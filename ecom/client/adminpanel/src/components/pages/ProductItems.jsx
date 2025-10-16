import React, { useState, useEffect } from 'react';
import { FaFilter, FaRegEdit, FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";

export default function ProductItems() {
  const API_BASE = (import.meta.env.VITE_APIBASEURL || "").replace(/\/+$/, "");
  const PRODUCT_BASE = `${API_BASE}/product`;

  const [productData, setProductData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPage, setTotalPage] = useState(0);
  const [productStaticPath, setproductStaticPath] = useState("");
  const [ids, setIds] = useState([]);

  // filters
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // all | active | inactive
  const [showFilter, setShowFilter] = useState(false);

  // Fetch product data (server-side filtering + pagination)
  const getProductData = (page = 1, lim = 5, searchTerm = "", statusFilter = "all") => {
    const params = { page, limit: lim };
    if (searchTerm && String(searchTerm).trim() !== "") params.search = String(searchTerm).trim();
    if (statusFilter === "active") params.status = "active";
    if (statusFilter === "inactive") params.status = "inactive";

    axios.get(`${PRODUCT_BASE}/view`, { params })
      .then((response) => response.data)
      .then((finResponse) => {
        if (finResponse && finResponse.status) {
          setProductData(Array.isArray(finResponse.data) ? finResponse.data : []);
          setTotalPage(finResponse.totalPage || Math.max(1, Math.ceil((finResponse.totalCount || 0) / lim)));
          setproductStaticPath(finResponse.productStaticPath || "");
        } else {
          toast.error(finResponse?.message || "Failed to fetch product data.");
          setProductData([]);
          setTotalPage(0);
        }
      })
      .catch(() => {
        toast.error("Failed to fetch product data.");
        setProductData([]);
        setTotalPage(0);
      });
  };

  // Checkbox logic
  const getCheckedIds = (e) => {
    const val = e.target.value;
    if (e.target.checked) {
      if (!ids.includes(val)) {
        setIds(prev => [...prev, val]);
      }
    } else {
      setIds(prev => prev.filter((v) => v !== val));
    }
  };

  const allCheckId = (e) => {
    if (e.target.checked) {
      let allIds = productData.map((v) => v._id);
      setIds(allIds);
    } else {
      setIds([]);
    }
  };

  // Bulk delete
  const multidelete = () => {
    if (ids.length >= 1) {
      axios.delete(`${PRODUCT_BASE}/multidelete`, {
        data: { ids: ids }
      })
        .then((response) => response.data)
        .then((finResponse) => {
          toast.success(finResponse.message || "Deleted successfully");
          getProductData(currentPage, limit, search, filterStatus);
          setIds([]);
        })
        .catch(() => toast.error("Failed to delete products"));
    } else {
      toast.error("Please select at least one item");
    }
  };

  // Bulk status update
  const statusUpdate = () => {
    if (ids.length >= 1) {
      axios.post(`${PRODUCT_BASE}/statusupdate`, { ids: ids })
        .then((response) => response.data)
        .then((finResponse) => {
          toast.success(finResponse.message || "Status updated");
          getProductData(currentPage, limit, search, filterStatus);
          setIds([]);
        })
        .catch(() => toast.error("Failed to update status"));
    } else {
      toast.error("Please select at least one item");
    }
  };

  useEffect(() => {
    getProductData(currentPage, limit, search, filterStatus);
    // eslint-disable-next-line
  }, [currentPage, limit, search, filterStatus]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 py-8">
      <ToastContainer />
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-700 mb-2 tracking-tight flex items-center gap-2">
            <Link to="/dashboard" className="hover:text-blue-700 transition-colors cursor-pointer">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to="/product/product-items" className="hover:text-blue-700 transition-colors cursor-pointer">Product Items</Link>
            <span className="text-gray-400">/</span>
            <span className="text-blue-700">View</span>
          </h1>
        </div>
        <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-3xl font-semibold text-gray-800">View Product Items</h2>
            <div className="flex items-center gap-3">
              <select
                name="filterStatus"
                id="filterStatus"
                value={filterStatus}
                onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg p-2 shadow-sm cursor-pointer"
                title="Filter by status"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              <label htmlFor="limit" className="font-medium text-gray-700">Items per page:</label>
              <select
                name="limit"
                id="limit"
                value={limit}
                onChange={(e) => { setLimit(Number(e.target.value)); setCurrentPage(1); }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg p-2 shadow-sm cursor-pointer"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" className="text-white bg-blue-600 hover:bg-blue-700 font-semibold rounded-lg text-md px-3 py-2 shadow transition-all duration-150 cursor-pointer" title="Filter" onClick={() => setShowFilter(prev => !prev)}><FaFilter /></button>
              <button type="button" onClick={statusUpdate} className="text-white bg-green-600 hover:bg-green-700 font-semibold rounded-lg text-md px-5 py-2 shadow transition-all duration-150 cursor-pointer">Change Status</button>
              <button type="button" onClick={multidelete} className="text-white bg-red-600 hover:bg-red-700 font-semibold rounded-lg text-md px-5 py-2 shadow transition-all duration-150 cursor-pointer">Delete</button>
            </div>
          </div>

          {showFilter && (
            <div className="mb-4 flex items-center gap-2">
              <input
                type="text"
                placeholder="Search by product / category / subcategory"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                className="border px-3 py-2 rounded-md shadow-sm w-full md:w-64"
              />
              <button
                type="button"
                onClick={() => getProductData(1, limit, search, filterStatus)}
                title="Search"
                className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-md cursor-pointer"
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
                      checked={ids.length === productData.length && productData.length > 0}
                      className="accent-blue-600 w-5 h-5 cursor-pointer" />
                  </th>
                  <th className="px-4 py-3 text-center w-20">SL. NO.</th>
                  <th className="px-4 py-3 text-center w-32">PRODUCT NAME</th>
                  <th className="px-4 py-3 text-center w-64">DESCRIPTION</th>
                  <th className="px-4 py-3 text-center w-64">PRODUCT TYPE</th>
                  <th className="px-4 py-3 text-center w-64">ACTUAL PRICE</th>
                  <th className="px-4 py-3 text-center w-64">SALE PRICE</th>
                  <th className="px-4 py-3 text-center w-64">STOCK</th>
                  <th className="px-4 py-3 text-center w-32">THUMBNAILS</th>
                  <th className="px-4 py-3 text-center w-40">ACTION</th>
                  <th className="px-4 py-3 text-center w-24">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {productData.length >= 1 ? productData.map((row, i) => (
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
                          className="accent-blue-600 w-5 h-5 cursor-pointer" />
                      </td>
                      <td className="px-4 py-2 align-middle text-center w-20">{(currentPage - 1) * limit + i + 1}</td>
                      <td className="px-4 py-2 align-middle text-center w-32">{row.productName}</td>
                      <td className="px-4 py-2 align-middle text-center w-64">
                        {row.productDescription?.slice(0, 80)}{row.productDescription?.length > 80 && "..." }
                        <Link className="text-blue-500 cursor-pointer ms-2">Read More</Link>
                      </td>
                      <td className="px-4 py-2 align-middle text-center w-64">{row.productType}</td>
                      <td className="px-4 py-2 align-middle text-center w-64">{row.actualPrice}</td>
                      <td className="px-4 py-2 align-middle text-center w-64">{row.salePrice}</td>
                      <td className="px-4 py-2 align-middle text-center w-64">{row.totalInStocks}</td>
                      <td className="px-4 py-2 align-middle text-center w-32">
                        <div className="flex items-center justify-center h-full">
                          <img
                            className="w-16 h-16 object-cover rounded-lg border border-gray-200 shadow-sm"
                            src={row.productImage ? `${productStaticPath}${row.productImage}` : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"}
                            alt="thumbnail"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-2 align-middle text-center w-40">
                        <div className="flex items-center justify-center gap-2 h-full">
                          <Link to={`/editproduct/${row._id}`}>
                            <button className="bg-[#1A5FF3] hover:bg-blue-500 text-white p-2 rounded-full shadow transition-colors duration-200 cursor-pointer" title="Edit">
                              <FaRegEdit size={20} />
                            </button>
                          </Link>
                        </div>
                      </td>
                      <td className="px-4 py-2 align-middle text-center w-24">
                        {row.productStatus ? (
                          <span className="px-4 py-1 rounded-full font-semibold bg-green-100 text-green-700 border border-green-300 text-xs cursor-pointer">Active</span>
                        ) : (
                          <span className="px-4 py-1 rounded-full font-semibold bg-red-100 text-red-700 border border-red-300 text-xs cursor-pointer">Deactivate</span>
                        )}
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="11" className="text-center py-8 text-2xl font-bold text-gray-400">
                        No Product Items available.
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
              onPageChange={(p) => setCurrentPage(p)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}