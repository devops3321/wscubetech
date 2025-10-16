import React, { useEffect, useState } from 'react';
import { FaFilter, FaPen, FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import ResponsivePagination from 'react-responsive-pagination';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';

export default function ContactEnquiryMgmt() {
  const API_BASE = (import.meta.env.VITE_APIBASEURL).replace(/\/+$/,"");
  const CONTACT_BASE = `${API_BASE}/contact`;

  const [enquiryData, setEnquiryData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPage, setTotalPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [ids, setIds] = useState([]);
  const [loading, setLoading] = useState(false);

  // filters (moved to backend)
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // all | active | inactive
  const [showFilter, setShowFilter] = useState(false); // toggles only the search input

  // edit modal state
  const [editing, setEditing] = useState(null);
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    fetchContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // fetch when filter/page/limit/search changes (server-side filtering)
  useEffect(() => {
    fetchContacts(currentPage, limit, search, filterStatus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, limit, search, filterStatus]);

  const fetchContacts = async (page = 1, lim = 5, searchTerm = "", statusFilter = "all") => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: lim
      };
      if (searchTerm && String(searchTerm).trim() !== "") params.search = String(searchTerm).trim();
      if (statusFilter === "active") params.status = "active";
      if (statusFilter === "inactive") params.status = "inactive";

      const resp = await axios.get(`${CONTACT_BASE}/view`, { params });
      if (resp.data && resp.data.status === "success") {
        const list = resp.data.data || [];
        const mapped = list.map(item => ({
          _id: item._id,
          name: item.name,
          email: item.email,
          phone: item.phone,
          subject: item.subject,
          message: item.message,
          status: !!item.contactStatus
        }));
        setEnquiryData(mapped);
        const total = parseInt(resp.data.totalCount || 0, 10);
        setTotalCount(total);
        setTotalPage(Math.max(1, Math.ceil(total / lim)));
      } else {
        toast.error(resp.data?.message || "Failed to load enquiries");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  const getCheckedIds = (e) => {
    const val = e.target.value.toString();
    if (e.target.checked) {
      if (!ids.includes(val)) setIds(prev => [...prev, val]);
    } else {
      setIds(prev => prev.filter((v) => v !== val));
    }
  };

  const allCheckId = (e) => {
    if (e.target.checked) {
      let allIds = enquiryData.map((v) => v._id.toString());
      setIds(allIds);
    } else {
      setIds([]);
    }
  };

  // single row toggle (kept if needed). After update, refresh current page to reflect server state.
  const toggleStatus = async (row) => {
    try {
      const payload = { id: row._id, contactStatus: !row.status };
      const resp = await axios.post(`${CONTACT_BASE}/statusupdate`, payload);
      if (resp.data && resp.data.status === "success") {
        toast.success("Status updated");
        // refresh current page from server to ensure color/state is consistent
        fetchContacts(currentPage, limit, search, filterStatus);
      } else {
        toast.error(resp.data?.message || "Failed to update status");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || "Server error");
    }
  };

  // bulk status update for selected ids
  const bulkStatusUpdate = async (newStatus) => {
    if (!Array.isArray(ids) || ids.length === 0) {
      toast.error("Please select at least one enquiry to update status.");
      return;
    }

    try {
      // send parallel requests to existing endpoint
      await Promise.all(ids.map(id =>
        axios.post(`${CONTACT_BASE}/statusupdate`, { id, contactStatus: newStatus })
      ));
      toast.success("Status updated for selected items");
      setIds([]);
      // refresh current page
      fetchContacts(currentPage, limit, search, filterStatus);
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || "Server error");
    }
  };

  // use SweetAlert2 confirmation for bulk change status (removed window.confirm)
  const handleBulkChangeStatus = async () => {
    if (!Array.isArray(ids) || ids.length === 0) {
      toast.error("Please select at least one enquiry to change status.");
      return;
    }

    const { isConfirmed, isDenied } = await Swal.fire({
      title: 'Change status for selected items',
      text: 'Choose action for selected items',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Set Active',
      denyButtonText: 'Set Inactive',
      cancelButtonText: 'Cancel',
      icon: 'question'
    });

    if (isConfirmed) {
      bulkStatusUpdate(true);
    } else if (isDenied) {
      bulkStatusUpdate(false);
    }
    // cancel => do nothing
  };

  // delete one or multiple with SweetAlert2
  const deleteSelected = async (selectedIds) => {
    if (!selectedIds || selectedIds.length === 0) {
      toast.error("No item selected");
      return;
    }

    const result = await Swal.fire({
      title: 'Delete selected enquiry(s)?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    });

    if (!result.isConfirmed) return;

    try {
      const resp = await axios.delete(`${CONTACT_BASE}/multidelete`, { data: { ids: selectedIds } });
      if (resp.data && resp.data.status === "success") {
        toast.success("Deleted successfully");
        setIds([]);
        fetchContacts(currentPage, limit, search, filterStatus);
      } else {
        toast.error(resp.data?.message || "Failed to delete");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || "Server error");
    }
  };

  const openEdit = (row) => {
    setEditing({ ...row });
  };

  const closeEdit = () => setEditing(null);

  const saveEdit = async () => {
    if (!editing || !editing._id) return;
    setEditLoading(true);
    try {
      const dataToSend = {
        name: editing.name,
        email: editing.email,
        phone: editing.phone,
        subject: editing.subject,
        message: editing.message
      };
      const resp = await axios.put(`${CONTACT_BASE}/update/${editing._id}`, dataToSend);
      if (resp.data && resp.data.status === "success") {
        toast.success("Updated successfully");
        closeEdit();
        fetchContacts(currentPage, limit, search, filterStatus);
      } else {
        toast.error(resp.data?.message || "Failed to update");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || "Server error");
    } finally {
      setEditLoading(false);
    }
  };

  // data for current page (already server-paginated)
  const pageData = enquiryData;

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 py-8">
      <ToastContainer />
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-700 mb-2 tracking-tight flex items-center gap-2">
            <Link to={"/dashboard"} className="hover:text-blue-700 transition-colors cursor-pointer">Home</Link>
            <span className="text-gray-400">/</span>
            <span className="text-blue-700">Contact Enquiry</span>
          </h1>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-3xl font-semibold text-gray-800">Contact Enquiry Management</h2>

            <div className="flex items-center gap-3 flex-wrap">
              {/* filter toggle button - does NOT render search inline */}
              <button
                type="button"
                onClick={() => setShowFilter(prev => !prev)}
                title="Filter"
                className="text-white bg-blue-600 hover:bg-blue-700 font-semibold rounded-lg text-md px-3 py-2 shadow transition-all duration-150 cursor-pointer"
              >
                <FaFilter />
              </button>

              {/* status filter - always visible */}
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

              {/* items per page - always visible */}
              <label htmlFor="limit" className="font-medium text-gray-700">Items:</label>
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

              <button
                type="button"
                onClick={handleBulkChangeStatus}
                title="Change status for selected"
                className="text-white bg-green-600 hover:bg-green-700 font-semibold rounded-lg text-md px-4 py-2 shadow transition-all duration-150 cursor-pointer"
              >
                ChangeStatus
              </button>

              <button
                type="button"
                onClick={() => deleteSelected(ids)}
                title="Delete Selected"
                className="text-white bg-red-700 hover:bg-red-800 font-semibold rounded-lg text-md px-4 py-2 shadow transition-all duration-150 cursor-pointer"
              >
                Delete Selected
              </button>
            </div>
          </div>

          {/* Search input opens below the top buttons and does not alter top-row layout */}
          {showFilter && (
            <div className="mb-4 flex items-center gap-2">
              <input
                type="text"
                placeholder="Search by name/email/subject/message"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                className="border px-3 py-2 rounded-md shadow-sm w-full md:w-64"
              />
              <button
                type="button"
                onClick={() => fetchContacts(1, limit, search, filterStatus)}
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
                      checked={ids.length === enquiryData.length && enquiryData.length > 0}
                      className="accent-blue-600 w-5 h-5 cursor-pointer" />
                  </th>
                  <th className="px-4 py-3 text-center w-2/12">SR.NO</th>
                  <th className="px-4 py-3 text-left sticky left-12 bg-blue-700/90 w-48 z-10">User Info</th>
                  <th className="px-4 py-3 text-center w-1/6">Subject</th>
                  <th className="px-4 py-3 text-center">Message</th>
                  <th className="px-4 py-3 text-center w-1/8">STATUS</th>
                  <th className="px-4 py-3 text-center">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {
                  loading ?
                    (<tr><td colSpan="7" className="text-center py-8">Loading...</td></tr>)
                    :
                    (pageData.length >= 1 ?
                      pageData.map((row, i) => (
                        <tr
                          key={row._id}
                          className={`transition-colors duration-200 ${i % 2 === 0 ? 'bg-white' : 'bg-blue-50'} hover:bg-blue-100 text-gray-800`}>
                          <td className="px-4 py-2 align-middle sticky left-0 bg-inherit w-12">
                            <input
                              type="checkbox"
                              onChange={getCheckedIds}
                              checked={ids.includes(row._id.toString())}
                              value={row._id}
                              className="accent-blue-600 w-5 h-5 cursor-pointer" />
                          </td>
                          <td className="px-4 py-2 text-center font-semibold">{(currentPage - 1) * limit + i + 1}</td>
                          <td className="px-4 py-2 align-middle sticky left-12 bg-inherit w-48 font-medium">
                            <div>{row.name}</div>
                            <div className="text-xs text-gray-500">{row.email} • {row.phone}</div>
                          </td>
                          <td className="px-4 py-2 align-middle text-center">{row.subject}</td>
                          <td className="px-4 py-2 align-middle text-center">{row.message}</td>

                          {/* Status cell: show current status only */}
                          <td className="px-4 py-2 align-middle text-center w-1/8">
                            <div className="flex flex-col items-center gap-2">
                              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${row.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {row.status ? 'Active' : 'Inactive'}
                              </span>
                            </div>
                          </td>

                          <td className="px-4 py-2 align-middle text-center w-1/6">
                            <div className="flex items-center justify-center h-full gap-2">
                              <button
                                onClick={() => openEdit(row)}
                                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow transition-colors duration-200 cursor-pointer"
                                title="Edit Enquiry"
                              >
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
                            No Enquiry available.
                          </td>
                        </tr>
                      ))
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

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-40" onClick={closeEdit}></div>
          <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-2xl p-6 relative z-10">
            <h3 className="text-xl font-semibold mb-4">Edit Enquiry</h3>
            <div className="grid grid-cols-1 gap-3">
              <label className="text-sm">Name</label>
              <input value={editing.name || ''} onChange={(e) => setEditing({...editing, name: e.target.value})} className="border p-2 rounded" />
              <label className="text-sm">Email</label>
              <input value={editing.email || ''} onChange={(e) => setEditing({...editing, email: e.target.value})} className="border p-2 rounded" />
              <label className="text-sm">Phone</label>
              <input value={editing.phone || ''} onChange={(e) => setEditing({...editing, phone: e.target.value})} className="border p-2 rounded" />
              <label className="text-sm">Subject</label>
              <input value={editing.subject || ''} onChange={(e) => setEditing({...editing, subject: e.target.value})} className="border p-2 rounded" />
              <label className="text-sm">Message</label>
              <textarea value={editing.message || ''} onChange={(e) => setEditing({...editing, message: e.target.value})} className="border p-2 rounded h-28" />
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button onClick={closeEdit} className="px-4 py-2 rounded border cursor-pointer">Cancel</button>
              <button onClick={saveEdit} disabled={editLoading} className="px-4 py-2 rounded bg-blue-600 text-white cursor-pointer">
                {editLoading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}