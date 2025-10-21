import React, { useEffect, useState } from 'react';
import { FaFilter, FaPen, FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import ResponsivePagination from 'react-responsive-pagination';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function ViewUser() {
  let apiBaseurl = import.meta.env.VITE_APIBASEURL_WEB;

  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPage, setTotalPage] = useState(1);
  const [ids, setIds] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const getUsers = async (page = currentPage, lim = limit, term = searchTerm) => {
    try {
      const resp = await axios.get(`${apiBaseurl}user/view-user`, {
        params: { page, limit: lim, searchTerm: term }
      });
      const fin = resp.data;
      if (fin && fin.status === "success") {
        setUserData(fin.users || []);
        setTotalPage(fin.totalPage || 1);
      } else {
        setUserData([]);
        setTotalPage(1);
        toast.error(fin.message || "Failed to load users");
      }
    } catch (err) {
      toast.error("Error fetching users");
      setUserData([]);
      setTotalPage(1);
    }
  };

  useEffect(() => {
    getUsers(1, limit, "");
  }, []);

  // fetch when page or limit changes
  useEffect(() => {
    getUsers(currentPage, limit, searchTerm);
  }, [currentPage, limit]);

  // handle search - reset to page 1
  const handleSearch = () => {
    setCurrentPage(1);
    getUsers(1, limit, searchTerm);
  };

  const getCheckedIds = (e) => {
    const val = e.target.value.toString();
    if (e.target.checked) {
      if (!ids.includes(val)) setIds([...ids, val]);
    } else {
      setIds(ids.filter(i => i !== val));
    }
  };

  const allCheckId = (e) => {
    if (e.target.checked) {
      const allIds = currentPageData.map(v => v._id.toString());
      setIds(allIds);
    } else {
      setIds([]);
    }
  };

  // delete selected users
  const multidelete = async () => {
    if (ids.length === 0) {
      toast.error("Please select at least one user to delete.");
      return;
    }
    try {
      const resp = await axios.delete(`${apiBaseurl}user/delete`, { data: { ids } });
      const fin = resp.data;
      if (fin && fin.status === "success") {
        toast.success(fin.message || "Users deleted");
        setIds([]);
        getUsers(1, limit, searchTerm);
      } else {
        toast.error(fin.message || "Delete failed");
      }
    } catch (err) {
      toast.error("Error deleting users");
    }
  };

  // disable / enable (set userStatus = false / true) selected users
  const statusUpdate = async (newStatus) => {
    // guard: protect from event object being passed accidentally
    if (typeof newStatus !== "boolean") {
      toast.error("Invalid action. Please click Enable or Disable.");
      return;
    }
    if (ids.length === 0) {
      toast.error("Please select at least one user to update status.");
      return;
    }
    try {
      const resp = await axios.post(`${apiBaseurl}user/statusupdate`, { ids, status: newStatus });
      const fin = resp.data;
      if (fin && fin.status === "success") {
        toast.success(fin.message || "Status updated");
        setIds([]);
        // refresh current page results
        getUsers(currentPage, limit, searchTerm);
      } else {
        toast.error(fin.message || "Status update failed");
      }
    } catch (err) {
      toast.error("Error updating status");
    }
  };

  // client-side search/filter
  const filteredData = React.useMemo(() => {
    if (!searchTerm) return userData;
    const term = searchTerm.toLowerCase();
    return userData.filter(u =>
      (u.userName && u.userName.toLowerCase().includes(term)) ||
      (u.userEmail && u.userEmail.toLowerCase().includes(term)) ||
      (u.userPhone && u.userPhone.toLowerCase().includes(term))
    );
  }, [userData, searchTerm]);

  // data for current page
  const startIdx = (currentPage - 1) * limit;
  const currentPageData = filteredData.slice(startIdx, startIdx + limit);

  useEffect(() => {
    setTotalPage(Math.max(1, Math.ceil(filteredData.length / limit)));
    if ((currentPage - 1) * limit >= filteredData.length && currentPage > 1) {
      setCurrentPage(1);
    }
  }, [filteredData, limit]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 py-8">
      <ToastContainer />
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-700 mb-2 tracking-tight flex items-center gap-2">
            <Link to={"/dashboard"} className="hover:text-blue-700 transition-colors">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to={"/viewuser"} className="hover:text-blue-700 transition-colors">User</Link>
            <span className="text-gray-400">/</span>
            <span className="text-blue-700">View</span>
          </h1>
        </div>
        <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-3xl font-semibold text-gray-800">View User</h2>
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

              <button
                type="button"
                onClick={() => statusUpdate(false)}
                className="text-white bg-red-600 hover:bg-red-700 font-semibold rounded-lg text-md px-5 py-2 shadow transition-all duration-150"
                title="Disable selected users"
              >
                Disable
              </button>
              <button
                type="button"
                onClick={() => statusUpdate(true)}
                className="text-white bg-green-600 hover:bg-green-700 font-semibold rounded-lg text-md px-5 py-2 shadow transition-all duration-150"
                title="Enable selected users"
              >
                Enable
              </button>

              <button type="button" onClick={multidelete} className="text-white bg-red-700 hover:bg-red-800 font-semibold rounded-lg text-md px-5 py-2 shadow transition-all duration-150">Delete</button>
            </div>
          </div>

          {showSearch && (
            <div className="flex items-center gap-2 mb-4">
              <input
                type="text"
                placeholder="Search by name, email or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/2"
              />
              <button
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 flex items-center gap-2"
              >
                <FaSearch />
                Search
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
                      checked={ids.length === currentPageData.length && currentPageData.length > 0}
                      className="accent-blue-600 w-5 h-5" />
                  </th>
                  <th className="px-4 py-3 text-center w-2/12">SR.NO</th>
                  <th className="px-4 py-3 text-left sticky left-12 bg-blue-700/90 w-48 z-10">NAME</th>
                  <th className="px-4 py-3 text-center w-1/6">EMAIL ID</th>
                  <th className="px-4 py-3 text-center">MOBILE NUMBER</th>
                  <th className="px-4 py-3 text-center w-1/8">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {
                  currentPageData.length >= 1 ?
                    currentPageData.map((row, i) => (
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
                        <td className="px-4 py-2 text-center font-semibold">{startIdx + i + 1}</td>
                        <td className="px-4 py-2 align-middle sticky left-12 bg-inherit w-48 font-medium">{row.userName || '-'}</td>
                        <td className="px-4 py-2 align-middle text-center">{row.userEmail || '-'}</td>
                        <td className="px-4 py-2 align-middle text-center">{row.userPhone || '-'}</td>
                        <td className="px-4 py-2 align-middle text-center w-1/8">
                          {
                            row.userStatus ?
                              (
                                <span className="px-4 py-1 rounded-full font-semibold bg-green-100 text-green-700 border border-green-300 text-xs">Active</span>
                              )
                              :
                              (
                                <span className="px-4 py-1 rounded-full font-semibold bg-red-100 text-red-700 border border-red-300 text-xs">Deactivated</span>
                              )
                          }
                        </td>
                      </tr>
                    ))
                    :
                    (
                      <tr>
                        <td colSpan="7" className="text-center py-8 text-2xl font-bold text-gray-400">
                          No users available.
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