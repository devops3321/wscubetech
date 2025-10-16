import React from 'react';
import { useEffect } from 'react';
import { FaFilter, FaPen, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import ResponsivePagination from 'react-responsive-pagination';
import axios from 'axios';

export default function SliderView() {
  let apiBaseurl = (import.meta.env.VITE_APIBASEURL || "").replace(/\/+$/,"");
  const SLIDER_BASE = `${apiBaseurl}/slider`;

  let [sliderData, setSliderData] = React.useState([]);
  let [currentPage, setCurrentPage] = React.useState(1);
  let [limit, setLimit] = React.useState(5);
  let [totalPage, setTotalPage] = React.useState(0);
  let [staticPath, setStaticPath] = React.useState("");
  let [ids, setids] = React.useState([]);
  let [loading, setLoading] = React.useState(false);

  // filters
  const [search, setSearch] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState("all"); // all | active | inactive
  const [showFilter, setShowFilter] = React.useState(false);

  let getSliderData = async (page = 1, lim = 5, searchTerm = "", statusFilter = "all") => {
    try {
      setLoading(true);
      const params = { page, limit: lim };
      if (searchTerm && String(searchTerm).trim() !== "") params.search = String(searchTerm).trim();
      if (statusFilter === "active") params.status = "active";
      if (statusFilter === "inactive") params.status = "inactive";

      const resp = await axios.get(`${SLIDER_BASE}/view`, { params });
      const finResponse = resp.data;

      if (finResponse && finResponse.status === "success") {
        setSliderData(Array.isArray(finResponse.sliderData) ? finResponse.sliderData : []);
        setTotalPage(finResponse.totalPage || Math.max(1, Math.ceil((finResponse.totalCount || 0) / lim)));
        setStaticPath(finResponse.staticPath || "");
      } else {
        toast.error(finResponse?.message || "Failed to fetch Slider data");
        setSliderData([]);
        setTotalPage(0);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || "Failed to fetch Slider data");
      setSliderData([]);
      setTotalPage(0);
    } finally {
      setLoading(false);
    }
  }

  let getCheckedIds = (e) => {
    const val = e.target.value.toString();
    if (e.target.checked) {
      if (!ids.includes(val)) {
        setids(prev => [...prev, val]);
      }
    }
    else {
      setids(prev => prev.filter((v) => v !== val));
    }
  }

  let allCheckId = (e) => {
    if (e.target.checked) {
      let allIds = sliderData.map((v) => v._id.toString());
      setids(allIds);
    }
    else {
      setids([]);
    }
  }

  let multidelete = async () => {
    if (ids.length >= 1) {
      try {
        const resp = await axios.delete(`${SLIDER_BASE}/multidelete/`, { data: { ids: ids } });
        const finResponse = resp.data;
        if (finResponse && finResponse.status === "success") {
          toast.success(finResponse.message || "Deleted successfully");
          getSliderData(currentPage, limit, search, filterStatus);
          setids([]);
        } else {
          toast.error(finResponse?.message || "Delete failed");
        }
      } catch (err) {
        toast.error(err?.response?.data?.message || err.message || "Delete failed");
      }
    }
    else {
      toast.error("Please select at least one item");
    }
  }

  let statusUpdate = async () => {
    if (ids.length >= 1) {
      try {
        const resp = await axios.post(`${SLIDER_BASE}/statusupdate/`, { ids: ids });
        const finResponse = resp.data;
        if (finResponse && finResponse.status === "success") {
          toast.success(finResponse.message || "Status updated");
          getSliderData(currentPage, limit, search, filterStatus);
          setids([]);
        } else {
          toast.error(finResponse?.message || "Status update failed");
        }
      } catch (err) {
        toast.error(err?.response?.data?.message || err.message || "Status update failed");
      }
    }
    else {
      toast.error("Please select at least one item");
    }
  }

  useEffect(() => {
    getSliderData(currentPage, limit, search, filterStatus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, limit, search, filterStatus]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 py-8">
      <ToastContainer />
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-700 mb-2 tracking-tight flex items-center gap-2">
            <Link to={"/dashboard"} className="hover:text-blue-700 transition-colors cursor-pointer">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to={"/slider/view"} className="hover:text-blue-700 transition-colors cursor-pointer">Slider</Link>
            <span className="text-gray-400">/</span>
            <span className="text-blue-700">View</span>
          </h1>
        </div>
        <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-3xl font-semibold text-gray-800">View Slider</h2>
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
              <button type="button" onClick={() => setShowFilter(prev => !prev)} className="text-white bg-blue-600 hover:bg-blue-700 font-semibold rounded-lg text-md px-3 py-2 shadow transition-all duration-150 cursor-pointer" title="Filter">
                <FaFilter />
              </button>
              <button type="button" onClick={statusUpdate} className="text-white bg-green-600 hover:bg-green-700 font-semibold rounded-lg text-md px-5 py-2 shadow transition-all duration-150 cursor-pointer">Change Status</button>
              <button type="button" onClick={multidelete} className="text-white bg-red-600 hover:bg-red-700 font-semibold rounded-lg text-md px-5 py-2 shadow transition-all duration-150 cursor-pointer">Delete</button>
            </div>
          </div>

          {showFilter && (
            <div className="mb-4 flex items-center gap-2">
              <input
                type="text"
                placeholder="Search by title or description"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                className="border px-3 py-2 rounded-md shadow-sm w-full md:w-64"
              />
              <button
                type="button"
                onClick={() => getSliderData(1, limit, search, filterStatus)}
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
                      checked={ids.length === sliderData.length && sliderData.length > 0}
                      className="accent-blue-600 w-5 h-5 cursor-pointer" />
                  </th>
                  <th className="px-4 py-3 text-center w-2/12">SR.NO</th>
                  <th className="px-4 py-3 text-left sticky left-12 bg-blue-700/90 w-48 z-10">NAME</th>
                  <th className="px-4 py-3 text-center w-1/6">IMAGE</th>
                  <th className="px-4 py-3 text-center">ORDER</th>
                  <th className="px-4 py-3 text-center w-1/8">STATUS</th>
                  <th className="px-4 py-3 text-center">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {
                  loading ? (
                    <tr><td colSpan="7" className="text-center py-8">Loading...</td></tr>
                  ) : (
                    sliderData.length >= 1 ?
                      sliderData.map((row, i) => (
                        <tr
                          key={row._id}
                          className={
                            `transition-colors duration-200 ${i % 2 === 0 ? 'bg-white' : 'bg-blue-50'} hover:bg-blue-100 text-gray-800`
                          }
                        >
                          <td className="px-4 py-2 align-middle sticky left-0 bg-inherit w-12">
                            <input
                              type="checkbox"
                              onChange={getCheckedIds}
                              checked={ids.includes(row._id.toString())}
                              value={row._id}
                              className="accent-blue-600 w-5 h-5 cursor-pointer" />
                          </td>
                          <td className="px-4 py-2 text-center font-semibold">{(currentPage - 1) * limit + i + 1}</td>
                          <td className="px-4 py-2 align-middle sticky left-12 bg-inherit w-48 font-medium">{row.sliderTitle}</td>
                          <td className="px-4 py-2 align-middle text-center">
                            <div className="flex justify-center items-center h-full">
                              <img src={`${staticPath}${row.sliderImage}`} alt="" className="w-16 h-16 object-cover rounded-lg border border-gray-200 shadow-sm" />
                            </div>
                          </td>
                          <td className="px-4 py-2 align-middle text-center w-1/8 font-semibold">{row.sliderOrder}</td>
                          <td className="px-4 py-2 align-middle text-center w-1/8">
                            {
                              row.sliderStatus ?
                                (
                                  <span className="px-4 py-1 rounded-full font-semibold bg-green-100 text-green-700 border border-green-300 text-xs cursor-pointer">Active</span>
                                )
                                :
                                (
                                  <span className="px-4 py-1 rounded-full font-semibold bg-red-100 text-red-700 border border-red-300 text-xs cursor-pointer">Deactivate</span>
                                )
                            }
                          </td>
                          <td className="px-4 py-2 align-middle text-center w-1/6">
                            <div className="flex items-center justify-center h-full">
                              <Link to={`/editslider/${row._id}`}>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow transition-colors duration-200 cursor-pointer" title="Edit Slider">
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
                            No Slider available.
                          </td>
                        </tr>
                      )
                  )
                }
              </tbody>
            </table>
          </div>
          <div className="my-8 flex justify-center">
            <ResponsivePagination
              current={currentPage}
              total={totalPage}
              onPageChange={(p) => { setCurrentPage(p); }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}