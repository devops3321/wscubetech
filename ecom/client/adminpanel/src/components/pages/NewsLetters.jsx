import React, { useEffect, useState } from 'react';
import { FaFilter, FaPen, FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import ResponsivePagination from 'react-responsive-pagination';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';

export default function NewsLetters() {
  const API_BASE = (import.meta.env.VITE_APIBASEURL_WEB).replace(/\/+$/,"");
  const NEWSLETTER_BASE = `${API_BASE}/newsletter`;

  const [newsletterData, setNewsletterData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPage, setTotalPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [ids, setIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all | active | inactive
  const [showFilter, setShowFilter] = useState(false); // toggles search row

  // Edit modal state
  const [editing, setEditing] = useState(null); // { _id, newsletterEmail, newsletterStatus }
  const [editSaving, setEditSaving] = useState(false);

  useEffect(() => {
    fetchNewsletters(1, limit, search, statusFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, search, statusFilter]);

  useEffect(() => {
    fetchNewsletters(currentPage, limit, search, statusFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const fetchNewsletters = async (page = 1, lim = 10, searchTerm = '', status = 'all') => {
    try {
      setLoading(true);
      const params = { page, limit: lim };
      if (String(searchTerm || '').trim() !== '') params.search = String(searchTerm).trim();
      if (status === 'active') params.status = 'active';
      if (status === 'inactive') params.status = 'inactive';

      const resp = await axios.get(`${NEWSLETTER_BASE}/view`, { params });
      if (resp.data && resp.data.status === 'success') {
        const list = resp.data.data || [];
        setNewsletterData(list);
        const total = parseInt(resp.data.totalCount || 0, 10);
        setTotalCount(total);
        setTotalPage(Math.max(1, Math.ceil(total / lim)));
        setCurrentPage(resp.data.page || page);
        // keep only ids visible on current page
        const currentIds = list.map(i => String(i._id));
        setIds(prev => prev.filter(id => currentIds.includes(id)));
      } else {
        toast.error(resp.data?.message || 'Failed to load newsletters');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || 'Server error');
    } finally {
      setLoading(false);
    }
  };

  const getCheckedIds = (e) => {
    const val = String(e.target.value);
    if (e.target.checked) {
      if (!ids.includes(val)) setIds(prev => [...prev, val]);
    } else {
      setIds(prev => prev.filter(v => v !== val));
    }
  };

  const allCheckId = (e) => {
    if (e.target.checked) {
      const allIds = newsletterData.map(v => String(v._id));
      setIds(allIds);
    } else {
      setIds([]);
    }
  };

  // Bulk status update (uses Swal for confirmation)
  const bulkStatusUpdate = async (selectedIds, newStatus) => {
    if (!Array.isArray(selectedIds) || selectedIds.length === 0) {
      toast.error('Please select at least one item.');
      return;
    }
    try {
      await Promise.all(selectedIds.map(id =>
        axios.post(`${NEWSLETTER_BASE}/statusupdate`, { id, newsletterStatus: newStatus })
      ));
      toast.success('Status updated for selected items');
      setIds([]);
      fetchNewsletters(currentPage, limit, search, statusFilter);
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || 'Server error');
    }
  };

  const handleBulkChangeStatus = async () => {
    if (!Array.isArray(ids) || ids.length === 0) {
      toast.error('Please select at least one newsletter to change status.');
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
      bulkStatusUpdate(ids, true);
    } else if (isDenied) {
      bulkStatusUpdate(ids, false);
    }
  };

  // Delete selected (supports multidelete)
  const deleteSelected = async (selectedIds) => {
    const idsToDelete = selectedIds || ids;
    if (!Array.isArray(idsToDelete) || idsToDelete.length === 0) {
      toast.error('No item selected');
      return;
    }
    const result = await Swal.fire({
      title: `Delete ${idsToDelete.length} selected newsletter(s)?`,
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    });
    if (!result.isConfirmed) return;
    try {
      const resp = await axios.delete(`${NEWSLETTER_BASE}/multidelete`, { data: { ids: idsToDelete } });
      if (resp.data && resp.data.status === 'success') {
        toast.success('Deleted successfully');
        setIds([]);
        fetchNewsletters(currentPage, limit, search, statusFilter);
      } else {
        toast.error(resp.data?.message || 'Failed to delete');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || 'Server error');
    }
  };

  // Open edit modal
  const openEdit = (row) => {
    setEditing({ ...row });
  };

  const closeEdit = () => setEditing(null);

  const saveEdit = async () => {
    if (!editing || !editing._id) return;
    if (!editing.newsletterEmail || typeof editing.newsletterEmail !== 'string') {
      toast.error('Valid email is required');
      return;
    }
    try {
      setEditSaving(true);
      const payload = {
        newsletterEmail: editing.newsletterEmail,
        newsletterStatus: !!editing.newsletterStatus
      };
      const resp = await axios.put(`${NEWSLETTER_BASE}/update/${editing._id}`, payload);
      if (resp.data && resp.data.status === 'success') {
        toast.success('Updated successfully');
        closeEdit();
        fetchNewsletters(currentPage, limit, search, statusFilter);
      } else {
        toast.error(resp.data?.message || 'Failed to update');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || 'Server error');
    } finally {
      setEditSaving(false);
    }
  };

  // data for current page (server paginated response)
  const pageData = newsletterData;

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 py-8">
      <ToastContainer />
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-700 mb-2 tracking-tight flex items-center gap-2">
            <Link to={"/dashboard"} className="hover:text-blue-700 transition-colors">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to={"/newsletter"} className="hover:text-blue-700 transition-colors">Newsletter</Link>
            <span className="text-gray-400">/</span>
            <span className="text-blue-700">View</span>
          </h1>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-3xl font-semibold text-gray-800">Newsletters Management</h2>

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
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg p-2 shadow-sm cursor-pointer ml-2"
                title="Filter by status"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              {/* items per page - always visible */}
              <label htmlFor="limit" className="font-medium text-gray-700 ml-2">Items:</label>
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
                className="text-white bg-green-600 hover:bg-green-700 font-semibold rounded-lg text-md px-4 py-2 shadow transition-all duration-150 cursor-pointer ml-2"
              >
                Change Status
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
                placeholder="Search email..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                className="border px-3 py-2 rounded-md shadow-sm w-full md:w-64"
              />
              <button
                onClick={() => fetchNewsletters(1, limit, search, statusFilter)}
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
                      checked={ids.length === newsletterData.length && newsletterData.length > 0}
                      className="accent-blue-600 w-5 h-5 cursor-pointer" />
                  </th>
                  <th className="px-4 py-3 text-center w-2/12">SR.NO</th>
                  <th className="px-4 py-3 text-left w-1/2">EMAIL</th>
                  <th className="px-4 py-3 text-center w-1/6">STATUS</th>
                  <th className="px-4 py-3 text-center">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {
                  loading ?
                    (
                      <tr>
                        <td colSpan="5" className="text-center py-8 text-gray-500">Loading...</td>
                      </tr>
                    )
                    :
                    pageData.length >= 1 ?
                      pageData.map((row, i) => (
                        <tr
                          key={row._id}
                          className={`transition-colors duration-200 ${i % 2 === 0 ? 'bg-white' : 'bg-blue-50'} hover:bg-blue-100 text-gray-800`}
                        >
                          <td className="px-4 py-2 align-middle sticky left-0 bg-inherit w-12">
                            <input
                              type="checkbox"
                              onChange={getCheckedIds}
                              checked={ids.includes(String(row._1d))}
                              value={row._id}
                              className="accent-blue-600 w-5 h-5 cursor-pointer" />
                          </td>
                          <td className="px-4 py-2 text-center font-semibold">{(currentPage - 1) * limit + i + 1}</td>
                          <td className="px-4 py-2 align-middle font-medium">{row.newsletterEmail}</td>
                          <td className="px-4 py-2 align-middle text-center">
                            {
                              row.newsletterStatus ?
                                <span className="px-4 py-1 rounded-full font-semibold bg-green-100 text-green-700 border border-green-300 text-xs">Active</span>
                                :
                                <span className="px-4 py-1 rounded-full font-semibold bg-red-100 text-red-700 border border-red-300 text-xs">Inactive</span>
                            }
                          </td>
                          <td className="px-4 py-2 align-middle text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer"
                                title="Edit"
                                onClick={() => openEdit(row)}
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
                          <td colSpan="5" className="text-center py-8 text-2xl font-bold text-gray-400">
                            No newsletter entries.
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
              onPageChange={(p) => setCurrentPage(p)}
            />
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Edit Newsletter</h3>
            <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <input
              value={editing.newsletterEmail || ''}
              onChange={(e) => setEditing(prev => ({ ...prev, newsletterEmail: e.target.value }))}
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex items-center gap-2 mb-4">
              <input
                id="edit-status"
                type="checkbox"
                checked={!!editing.newsletterStatus}
                onChange={(e) => setEditing(prev => ({ ...prev, newsletterStatus: e.target.checked }))}
                className="w-4 h-4 cursor-pointer"
              />
              <label htmlFor="edit-status">Active</label>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={closeEdit} className="px-4 py-2 rounded border cursor-pointer">Cancel</button>
              <button
                onClick={saveEdit}
                className="px-4 py-2 rounded bg-blue-600 text-white cursor-pointer"
                disabled={editSaving}
              >
                {editSaving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}