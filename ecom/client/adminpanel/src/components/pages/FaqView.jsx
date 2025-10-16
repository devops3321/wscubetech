import React, { useEffect } from 'react';
import { FaPen, FaFilter, FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import ResponsivePagination from 'react-responsive-pagination';

export default function FaqView() {
  let apiBaseurl = import.meta.env.VITE_APIBASEURL;
  let [faqData, setfaqData] = React.useState([]);
  let [ids, setids] = React.useState([]);
  let [currentPage, setCurrentPage] = React.useState(1);
  let [limit, setLimit] = React.useState(5);
  let [totalPage, setTotalPage] = React.useState(0);
  let [loading, setLoading] = React.useState(false);

  // filters
  const [search, setSearch] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState("all"); // all | active | inactive
  const [showFilter, setShowFilter] = React.useState(false);

  let getFaqData = async (page = 1, lim = 5, searchTerm = "", statusFilter = "all") => {
    try {
      setLoading(true);
      const params = { page, limit: lim };
      if (searchTerm && String(searchTerm).trim() !== "") params.search = String(searchTerm).trim();
      if (statusFilter === "active") params.status = "active";
      if (statusFilter === "inactive") params.status = "inactive";

      const resp = await axios.get(`${apiBaseurl}faq/view`, { params });
      const finResponse = resp.data;
      if (finResponse && finResponse.status === "success") {
        setfaqData(Array.isArray(finResponse.faqData) ? finResponse.faqData : []);
        setTotalPage(finResponse.totalPage || 0);
      } else {
        toast.error(finResponse?.message || "Failed to fetch Faq data.");
        setfaqData([]);
        setTotalPage(0);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || "Failed to fetch Faq data.");
      setfaqData([]);
      setTotalPage(0);
    } finally {
      setLoading(false);
    }
  };

  let getCheckedIds = (e) => {
    if (e.target.checked) {
      if (!ids.includes(e.target.value)) {
        setids([...ids, e.target.value]);
      }
    } else {
      let filtedData = ids.filter((v) => v !== e.target.value);
      setids(filtedData);
    }
  };

  let allCheckId = (e) => {
    if (e.target.checked) {
      let allIds = faqData.map((v) => v._id);
      setids(allIds);
    } else {
      setids([]);
    }
  };

  let multiDelete = () => {
    if (ids.length >= 1) {
      axios.delete(`${apiBaseurl}faq/multidelete/`, { data: { ids: ids } })
        .then((response) => response.data)
        .then((finResponse) => {
          toast.success(finResponse.message || "Deleted successfully");
          getFaqData(currentPage, limit, search, filterStatus);
          setids([]);
        })
        .catch(() => toast.error("Delete failed"));
    } else {
      toast.error("Please select at least one item");
    }
  };

  let statusUpdate = () => {
    if (ids.length >= 1) {
      axios.post(`${apiBaseurl}faq/statusupdate/`, { ids: ids })
        .then((response) => response.data)
        .then((finResponse) => {
          toast.success(finResponse.message || "Status updated");
          getFaqData(currentPage, limit, search, filterStatus);
          setids([]);
        })
        .catch(() => toast.error("Status update failed"));
    } else {
      toast.error("Please select at least one item");
    }
  };

  useEffect(() => {
    getFaqData(currentPage, limit, search, filterStatus);
    // eslint-disable-next-line
  }, [currentPage, limit, search, filterStatus]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 py-8">
      <ToastContainer />
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-700 mb-2 tracking-tight flex items-center gap-2">
            <Link to={"/dashboard"} className="hover:text-blue-700 transition-colors cursor-pointer">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to={"/faq/view"} className="hover:text-blue-700 transition-colors cursor-pointer">FAQ</Link>
            <span className="text-gray-400">/</span>
            <span className="text-blue-700">View</span>
          </h1>
        </div>
        <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-3xl font-semibold text-gray-800">View FAQ</h2>
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
              <button type="button" onClick={() => setShowFilter(prev => !prev)} className="text-white bg-blue-600 hover:bg-blue-700 font-semibold rounded-lg text-md px-3 py-2 shadow transition-all duration-150 cursor-pointer" title="Filter"><FaFilter /></button>
              <button type="button" onClick={statusUpdate} className="text-white bg-green-600 hover:bg-green-700 font-semibold rounded-lg text-md px-5 py-2 shadow transition-all duration-150 cursor-pointer">Change Status</button>
              <button type="button" onClick={multiDelete} className="text-white bg-red-600 hover:bg-red-700 font-semibold rounded-lg text-md px-5 py-2 shadow transition-all duration-150 cursor-pointer">Delete</button>
            </div>
          </div>

          {showFilter && (
            <div className="mb-4 flex items-center gap-2">
              <input
                type="text"
                placeholder="Search by question or answer"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                className="border px-3 py-2 rounded-md shadow-sm w-full md:w-64"
              />
              <button
                type="button"
                onClick={() => getFaqData(1, limit, search, filterStatus)}
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
                      checked={ids.length === faqData.length && faqData.length > 0}
                      className="accent-blue-600 w-5 h-5 cursor-pointer" />
                  </th>
                  <th className="px-4 py-3 text-center w-2/12">SR.NO</th>
                  <th className="px-4 py-3 text-left w-4/12">QUESTION</th>
                  <th className="px-4 py-3 text-left w-4/12">ANSWER</th>
                  <th className="px-4 py-3 text-center w-1/12">ORDER</th>
                  <th className="px-4 py-3 text-center w-1/12">STATUS</th>
                  <th className="px-4 py-3 text-center w-2/12">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {
                  loading ? (
                    <tr><td colSpan="7" className="text-center py-8">Loading...</td></tr>
                  ) : (
                    faqData.length >= 1 ?
                      faqData.map((row, idx) => (
                        <tr
                          key={row._id}
                          className={`transition-colors duration-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'} hover:bg-blue-100 text-gray-800`}
                        >
                          <td className="px-4 py-2 align-middle sticky left-0 bg-inherit w-12">
                            <input
                              type="checkbox"
                              onChange={getCheckedIds}
                              checked={ids.includes(row._id)}
                              value={row._id}
                              className="accent-blue-600 w-5 h-5 cursor-pointer" />
                          </td>
                          <td className="px-4 py-2 text-center font-semibold">{(currentPage - 1) * limit + idx + 1}</td>
                          <td className="px-4 py-2 align-middle font-medium cursor-pointer">{row.question}</td>
                          <td className="px-4 py-2 align-middle font-medium">{row.answer}</td>
                          <td className="px-4 py-2 align-middle text-center font-semibold">{row.order}</td>
                          <td className="px-4 py-2 align-middle text-center">
                            {
                              row.faqStatus ?
                                (
                                  <span className="px-4 py-1 rounded-full font-semibold bg-green-100 text-green-700 border border-green-300 text-xs cursor-pointer">Active</span>
                                )
                                :
                                (
                                  <span className="px-4 py-1 rounded-full font-semibold bg-red-100 text-red-700 border border-red-300 text-xs cursor-pointer">Deactivate</span>
                                )
                            }
                          </td>
                          <td className="px-4 py-2 align-middle text-center">
                            <div className="flex items-center justify-center h-full">
                              <Link to={`/editfaq/${row._id}`}>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow transition-colors duration-200 cursor-pointer" title="Edit FAQ">
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
                            No FAQs available.
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
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}