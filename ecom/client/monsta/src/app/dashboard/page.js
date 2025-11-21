"use client";
import React, { useEffect, useState } from 'react';
import Breadcrumb from '../common/Breadcrumb';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../redux/slice/userSlice';
import { redirect } from 'next/navigation';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import countries from '../staticData/countryData'; 
import Cookies from 'js-cookie';
import { getUserOrdersAPI, getOrderByIdAPI } from '@/apiServices/orderService';
import { useRouter } from 'next/navigation';
import { 
  getUserAddressesAPI, 
  createAddressAPI, 
  updateAddressAPI, 
  deleteAddressAPI, 
  setDefaultAddressAPI 
} from '@/apiServices/addressService';

export default function Dashboard() {

  const apiBaseurl = process.env.NEXT_PUBLIC_APIBASEURL;
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  
  // Address state
  const [addresses, setAddresses] = useState([]);
  const [addressesLoading, setAddressesLoading] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressForm, setAddressForm] = useState({
    addressType: 'billing',
    name: '',
    email: '',
    mobile: '',
    address: '',
    country: '',
    state: '',
    city: '',
    isDefault: false
  });

  let token = useSelector((store) => store.myUser.token);

  let user = useSelector((store) => store.myUser.user);
  const userId = user?.userId || user?._id || user?.id;

  let dispatch = useDispatch();

  let logOutUser = () => {
    dispatch(logOut());
    redirect('/login-register');
  }

  // form state to keep values before & after update
  const [profile, setProfile] = useState({
    id: "",
    title: "Mr",
    name: "",
    // email removed from local editable state - always taken from redux `user`
    mobileNumber: "",
    address: ""
  });

  // cookie fallback for email (auto-fill)
  const cookieEmail = Cookies.get('USER_EMAIL');

  // fetch profile on mount (uses view-user endpoint with searchTerm)
  useEffect(() => {
    if (!token || !apiBaseurl || !user?.id) return;

    const fetchProfile = async () => {
      try {
        const resp = await axios.get(`${apiBaseurl}/user/get-profile`, {
          params: { id: user.id }, // <-- use user.id here
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = resp.data;
        if (data && data.status === "success" && data.profile) {
          setProfile({
            id: data.profile._id,
            title: data.profile.title,
            name: data.profile.name,
            mobileNumber: data.profile.mobileNumber,
            address: data.profile.address
          });
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [token, apiBaseurl, user]);

  let changePassword = (e) => {
    e.preventDefault();

    const reqObj = {
      oldPassword: e.target.oldPassword.value,
      newPassword: e.target.newPassword.value,
      confirmPassword: e.target.confirmPassword.value
    };

    axios.post(`${apiBaseurl}user/change-password`, reqObj, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => response.data)
      .then((finRes) => {
        if (finRes.status === "success") {
          toast.success(finRes.message);
          e.target.reset();
        } else {
          toast.error(finRes.message);
        }
      });
  }

  let updateProfile = (e) => {
    e.preventDefault();

    // email must come from redux user and not be editable
    const emailToSend = cookieEmail || "";

    const reqObj = {
      id: user.id, // <-- use user.id here
      title: profile.title,
      name: profile.name,
      email: emailToSend,
      mobileNumber: profile.mobileNumber,
      address: profile.address
    };

    axios.post(`${apiBaseurl}user/update-profile`, reqObj, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => response.data)
      .then((finRes) => {
        if (finRes.status === "success") {
          if (finRes.profile) {
            setProfile({
              id: finRes.profile._id,
              title: finRes.profile.title,
              name: finRes.profile.name,
              mobileNumber: finRes.profile.mobileNumber,
              address: finRes.profile.address
            });
          }
          toast.success(finRes.message);
        } else {
          toast.error(finRes.message);
        }
      })
      .catch(err => {
        toast.error("Update failed");
        console.error(err);
      });
  }

  // Fetch orders when orders tab is active
  useEffect(() => {
    if (activeTab === 'orders' && userId && token) {
      fetchOrders();
    }
  }, [activeTab, userId, token]);

  // Fetch addresses when addresses tab is active
  useEffect(() => {
    if (activeTab === 'addresses' && userId && token) {
      fetchAddresses();
    }
  }, [activeTab, userId, token]);

  const fetchOrders = async () => {
    if (!userId || !token) return;
    
    setOrdersLoading(true);
    try {
      const response = await getUserOrdersAPI(userId, token);
      if (response.success) {
        setOrders(response.orders || []);
      } else {
        toast.error(response.error || 'Failed to fetch orders');
        setOrders([]);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to fetch orders');
      setOrders([]);
    } finally {
      setOrdersLoading(false);
    }
  };

  const handleViewOrder = async (orderId) => {
    if (!userId || !token) return;
    
    try {
      const response = await getOrderByIdAPI(orderId, userId, token);
      if (response.success) {
        setSelectedOrder(response.order);
        setShowOrderDetail(true);
      } else {
        toast.error(response.error || 'Failed to fetch order details');
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
      toast.error('Failed to fetch order details');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getStatusBadgeClass = (status) => {
    const statusLower = status?.toLowerCase() || '';
    switch (statusLower) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-purple-100 text-purple-800';
      case 'shipped':
        return 'bg-indigo-100 text-indigo-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getItemCount = (items) => {
    if (!items || !Array.isArray(items)) return 0;
    return items.reduce((total, item) => total + (item.qty || 1), 0);
  };

  // Address management functions
  const fetchAddresses = async () => {
    if (!userId || !token) return;
    
    setAddressesLoading(true);
    try {
      const response = await getUserAddressesAPI(userId, token);
      if (response.success) {
        setAddresses(response.addresses || []);
      } else {
        toast.error(response.error || 'Failed to fetch addresses');
        setAddresses([]);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
      toast.error('Failed to fetch addresses');
      setAddresses([]);
    } finally {
      setAddressesLoading(false);
    }
  };

  const handleAddressInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddressForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const resetAddressForm = () => {
    setAddressForm({
      addressType: 'billing',
      name: '',
      email: '',
      mobile: '',
      address: '',
      country: '',
      state: '',
      city: '',
      isDefault: false
    });
    setEditingAddress(null);
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address._id);
    setAddressForm({
      addressType: address.addressType,
      name: address.name || '',
      email: address.email || '',
      mobile: address.mobile || '',
      address: address.address || '',
      country: address.country || '',
      state: address.state || '',
      city: address.city || '',
      isDefault: address.isDefault || false
    });
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    if (!userId || !token) return;

    // Validate form
    if (!addressForm.name || !addressForm.email || !addressForm.mobile || 
        !addressForm.address || !addressForm.country || !addressForm.state || !addressForm.city) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const addressData = {
        userId: String(userId),
        ...addressForm
      };

      let response;
      if (editingAddress) {
        response = await updateAddressAPI(editingAddress, addressData, token);
      } else {
        response = await createAddressAPI(addressData, token);
      }

      if (response.success) {
        toast.success(response.message || 'Address saved successfully');
        resetAddressForm();
        fetchAddresses();
      } else {
        toast.error(response.error || 'Failed to save address');
      }
    } catch (error) {
      console.error('Error saving address:', error);
      toast.error('Failed to save address');
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (!userId || !token) return;
    if (!window.confirm('Are you sure you want to delete this address?')) return;

    try {
      const response = await deleteAddressAPI(addressId, userId, token);
      if (response.success) {
        toast.success('Address deleted successfully');
        fetchAddresses();
      } else {
        toast.error(response.error || 'Failed to delete address');
      }
    } catch (error) {
      console.error('Error deleting address:', error);
      toast.error('Failed to delete address');
    }
  };

  const handleSetDefault = async (addressId) => {
    if (!userId || !token) return;

    try {
      const response = await setDefaultAddressAPI(addressId, userId, token);
      if (response.success) {
        toast.success('Default address updated successfully');
        fetchAddresses();
      } else {
        toast.error(response.error || 'Failed to set default address');
      }
    } catch (error) {
      console.error('Error setting default address:', error);
      toast.error('Failed to set default address');
    }
  };

  const getBillingAddresses = () => {
    return addresses.filter(addr => addr.addressType === 'billing');
  };

  const getShippingAddresses = () => {
    return addresses.filter(addr => addr.addressType === 'shipping');
  };

  const getDefaultBillingAddress = () => {
    return addresses.find(addr => addr.addressType === 'billing' && addr.isDefault);
  };

  const getDefaultShippingAddress = () => {
    return addresses.find(addr => addr.addressType === 'shipping' && addr.isDefault);
  };

  // controlled input handlers
  const onChange = (key) => (e) => {
    let val = e.target.value;
    // radio inputs in UI used "Mr." / "Mrs." previously; normalize to "Mr"/"Mrs"
    if (key === 'title') {
      val = val.replace(/\./g, "").trim();
    }
    setProfile(prev => ({ ...prev, [key]: val }));
  };

  return (
    <div>
      <ToastContainer />
      <Breadcrumb pageName={"My Dashboard"} />
      <div className="max-w-6xl mx-auto mt-8 mb-10 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <ul className="space-y-2">
            <li>
              <button
                className={`w-full font-bold py-3 px-4 rounded text-left cursor-pointer ${activeTab === 'dashboard' ? 'bg-[#C09578] text-white' : 'bg-black text-white hover:bg-[#C09578]'}`}
                onClick={() => setActiveTab('dashboard')}
              >
                My Dashboard
              </button>
            </li>
            <li>
              <button
                className={`w-full font-bold py-3 px-4 rounded text-left cursor-pointer ${activeTab === 'orders' ? 'bg-[#C09578] text-white' : 'bg-black text-white hover:bg-[#C09578]'}`}
                onClick={() => setActiveTab('orders')}
              >
                Orders
              </button>
            </li>
            <li>
              <button
                className={`w-full font-bold py-3 px-4 rounded text-left cursor-pointer ${activeTab === 'addresses' ? 'bg-[#C09578] text-white' : 'bg-black text-white hover:bg-[#C09578]'}`}
                onClick={() => setActiveTab('addresses')}
              >
                Addresses
              </button>
            </li>
            <li>
              <button
                className={`w-full font-bold py-3 px-4 rounded text-left cursor-pointer ${activeTab === 'profile' ? 'bg-[#C09578] text-white' : 'bg-black text-white hover:bg-[#C09578]'}`}
                onClick={() => setActiveTab('profile')}
              >
                My Profile
              </button>
            </li>
            <li>
              <button
                className={`w-full font-bold py-3 px-4 rounded text-left cursor-pointer ${activeTab === 'password' ? 'bg-[#C09578] text-white' : 'bg-black text-white hover:bg-[#C09578]'}`}
                onClick={() => setActiveTab('password')}
              >
                Change Password
              </button>
            </li>
            <li>
              <button
                className={`w-full font-bold py-3 px-4 rounded text-left cursor-pointer ${activeTab === 'logout' ? 'bg-[#C09578] text-white' : 'bg-black text-white hover:bg-[#C09578]'}`}
                onClick={logOutUser}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
        {/* Main Content */}
        <div className="w-full md:w-3/4">
          {activeTab === 'dashboard' && (
            <>
              <h2 className="font-bold font-playfair text-2xl md:text-3xl mb-4 text-black">My Dashboard</h2>
              <p className="text-gray-700 text-base md:text-lg">
                From your account dashboard, you can easily check &amp; view your <span className="font-bold text-black">recent orders</span>, manage your <span className="font-bold text-black">shipping and billing addresses</span> and <span className="font-bold text-black">Edit your password and account details</span>.
              </p>
            </>
          )}
          {activeTab === 'orders' && (
            <>
              <h2 className="font-bold font-playfair text-2xl md:text-3xl mb-4 text-black">Orders</h2>
              {ordersLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C09578] mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading orders...</p>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                  <p className="text-gray-600 text-lg mb-4">You haven't placed any orders yet.</p>
                  <button
                    onClick={() => router.push('/online-store')}
                    className="bg-[#C09578] text-white font-bold px-6 py-2 rounded-full cursor-pointer hover:bg-[#A07A5A] transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 text-black">
                    <thead>
                      <tr className="bg-[#F2F2F2] font-playfair border border-black">
                        <th className="py-3 px-4 font-bold border-b border-r text-black">Order Number</th>
                        <th className="py-3 px-4 font-bold border-b border-r text-black">Date</th>
                        <th className="py-3 px-4 font-bold border-b border-r text-black">Status</th>
                        <th className="py-3 px-4 font-bold border-b border-r text-black">Total</th>
                        <th className="py-3 px-4 font-bold border-b text-black">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => {
                        const itemCount = getItemCount(order.items);
                        return (
                          <tr key={order._id} className="text-black text-center border border-black hover:bg-gray-50 transition-colors">
                            <td className="py-3 px-4 border text-black font-semibold">{order.orderNumber || 'N/A'}</td>
                            <td className="py-3 px-4 border text-black">{formatDate(order.createdAt)}</td>
                            <td className="py-3 px-4 border">
                              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadgeClass(order.status)}`}>
                                {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'N/A'}
                              </span>
                            </td>
                            <td className="py-3 px-4 border text-black font-semibold">
                              ₹{order.total?.toLocaleString() || '0'} For {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
                            </td>
                            <td className="py-3 px-4 border">
                              <button
                                onClick={() => handleViewOrder(order._id)}
                                className="text-[#C09578] font-bold cursor-pointer hover:underline hover:text-[#A07A5A] transition-colors"
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
          {activeTab === 'addresses' && (
            <>
              <h2 className="font-bold font-playfair text-2xl md:text-3xl mb-4 text-black">Addresses</h2>
              <p className="mb-6 text-gray-700">
                Manage your billing and shipping addresses. Default addresses will be used during checkout.
              </p>

              {addressesLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C09578] mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading addresses...</p>
                </div>
              ) : (
                <>
                  {/* Add/Edit Address Form */}
                  <div className="border border-gray-200 rounded-lg p-6 mb-8 bg-gray-50">
                    <h3 className="font-bold font-playfair text-xl mb-4 text-black">
                      {editingAddress ? 'Edit Address' : 'Add New Address'}
                    </h3>
                    <form onSubmit={handleSaveAddress}>
                      <div className="mb-4">
                        <label className="block text-black mb-1">Address Type*</label>
                        <select 
                          name="addressType"
                          value={addressForm.addressType}
                          onChange={handleAddressInputChange}
                          className="w-full border border-gray-300 text-black rounded px-3 py-2"
                          required
                        >
                          <option value="billing">Billing Address</option>
                          <option value="shipping">Shipping Address</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-black mb-1">Name*</label>
                          <input 
                            type="text" 
                            name="name"
                            value={addressForm.name}
                            onChange={handleAddressInputChange}
                            className="w-full border border-gray-300 text-black rounded px-3 py-2" 
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-black mb-1">Email*</label>
                          <input 
                            type="email" 
                            name="email"
                            value={addressForm.email}
                            onChange={handleAddressInputChange}
                            className="w-full border border-gray-300 text-black rounded px-3 py-2" 
                            required
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-black mb-1">Mobile Number*</label>
                        <input 
                          type="text" 
                          name="mobile"
                          value={addressForm.mobile}
                          onChange={handleAddressInputChange}
                          className="w-full border border-gray-300 text-black rounded px-3 py-2" 
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-black mb-1">Address*</label>
                        <input 
                          type="text" 
                          name="address"
                          value={addressForm.address}
                          onChange={handleAddressInputChange}
                          className="w-full border border-gray-300 text-black rounded px-3 py-2" 
                          required
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <label className="block text-black mb-1">Country*</label>
                          <select 
                            name="country"
                            value={addressForm.country}
                            onChange={handleAddressInputChange}
                            className="w-full border border-gray-300 text-black rounded px-3 py-2" 
                            required
                          >
                            <option value="">Select Country</option>
                            {countries.filter(c => c !== 'Select Country').map((country, index) => (
                              <option key={index} value={country}>{country}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-black mb-1">State*</label>
                          <input 
                            type="text" 
                            name="state"
                            value={addressForm.state}
                            onChange={handleAddressInputChange}
                            className="w-full border border-gray-300 text-black rounded px-3 py-2" 
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-black mb-1">City*</label>
                          <input 
                            type="text" 
                            name="city"
                            value={addressForm.city}
                            onChange={handleAddressInputChange}
                            className="w-full border border-gray-300 text-black rounded px-3 py-2" 
                            required
                          />
                        </div>
                      </div>
                      <div className="mb-4 flex items-center">
                        <input
                          type="checkbox"
                          name="isDefault"
                          checked={addressForm.isDefault}
                          onChange={handleAddressInputChange}
                          className="accent-black mr-2"
                        />
                        <label className="text-black">Set as default {addressForm.addressType} address</label>
                      </div>
                      <div className="flex gap-3">
                        <button 
                          type="submit" 
                          className="bg-[#C09578] text-white font-bold px-6 py-2 rounded-full cursor-pointer hover:bg-[#A07A5A] transition-colors"
                        >
                          {editingAddress ? 'Update Address' : 'Add Address'}
                        </button>
                        {editingAddress && (
                          <button 
                            type="button"
                            onClick={resetAddressForm}
                            className="bg-gray-500 text-white font-bold px-6 py-2 rounded-full cursor-pointer hover:bg-gray-600 transition-colors"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </form>
                  </div>

                  {/* Display Addresses */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Billing Addresses */}
                    <div>
                      <h3 className="font-bold font-playfair text-xl mb-4 text-black">Billing Addresses</h3>
                      {getBillingAddresses().length === 0 ? (
                        <p className="text-gray-600 mb-4">No billing addresses saved yet.</p>
                      ) : (
                        <div className="space-y-4">
                          {getBillingAddresses().map((address) => (
                            <div 
                              key={address._id} 
                              className={`border rounded-lg p-4 ${address.isDefault ? 'border-[#C09578] bg-[#C09578] bg-opacity-5' : 'border-gray-200'}`}
                            >
                              {address.isDefault && (
                                <span className="inline-block bg-[#C09578] text-white text-xs font-bold px-2 py-1 rounded mb-2">
                                  DEFAULT
                                </span>
                              )}
                              <div className="text-gray-700 mb-2">
                                <p className="font-semibold text-black">{address.name}</p>
                                <p>{address.email}</p>
                                <p>{address.mobile}</p>
                                <p className="mt-2">{address.address}</p>
                                <p>{address.city}, {address.state}</p>
                                <p>{address.country}</p>
                              </div>
                              <div className="flex gap-2 mt-3">
                                <button
                                  onClick={() => handleEditAddress(address)}
                                  className="text-[#C09578] font-semibold text-sm hover:underline cursor-pointer"
                                >
                                  Edit
                                </button>
                                {!address.isDefault && (
                                  <button
                                    onClick={() => handleSetDefault(address._id)}
                                    className="text-blue-600 font-semibold text-sm hover:underline cursor-pointer"
                                  >
                                    Set Default
                                  </button>
                                )}
                                <button
                                  onClick={() => handleDeleteAddress(address._id)}
                                  className="text-red-600 font-semibold text-sm hover:underline cursor-pointer"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Shipping Addresses */}
                    <div>
                      <h3 className="font-bold font-playfair text-xl mb-4 text-black">Shipping Addresses</h3>
                      {getShippingAddresses().length === 0 ? (
                        <p className="text-gray-600 mb-4">No shipping addresses saved yet.</p>
                      ) : (
                        <div className="space-y-4">
                          {getShippingAddresses().map((address) => (
                            <div 
                              key={address._id} 
                              className={`border rounded-lg p-4 ${address.isDefault ? 'border-[#C09578] bg-[#C09578] bg-opacity-5' : 'border-gray-200'}`}
                            >
                              {address.isDefault && (
                                <span className="inline-block bg-[#C09578] text-white text-xs font-bold px-2 py-1 rounded mb-2">
                                  DEFAULT
                                </span>
                              )}
                              <div className="text-gray-700 mb-2">
                                <p className="font-semibold text-black">{address.name}</p>
                                <p>{address.email}</p>
                                <p>{address.mobile}</p>
                                <p className="mt-2">{address.address}</p>
                                <p>{address.city}, {address.state}</p>
                                <p>{address.country}</p>
                              </div>
                              <div className="flex gap-2 mt-3">
                                <button
                                  onClick={() => handleEditAddress(address)}
                                  className="text-[#C09578] font-semibold text-sm hover:underline cursor-pointer"
                                >
                                  Edit
                                </button>
                                {!address.isDefault && (
                                  <button
                                    onClick={() => handleSetDefault(address._id)}
                                    className="text-blue-600 font-semibold text-sm hover:underline cursor-pointer"
                                  >
                                    Set Default
                                  </button>
                                )}
                                <button
                                  onClick={() => handleDeleteAddress(address._id)}
                                  className="text-red-600 font-semibold text-sm hover:underline cursor-pointer"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </>
          )}
          {activeTab === 'profile' && (
            <>
              <h2 className="font-bold font-playfair text-2xl md:text-3xl mb-4 text-black">My Profile</h2>
              <div className="border border-gray-200 rounded-lg p-6">
                <form onSubmit={updateProfile}>
                  <div className="mb-4 flex items-center gap-6">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="title"
                        value="Mr"
                        checked={profile.title === "Mr"}
                        onChange={onChange('title')}
                        className="accent-black" />
                      <span className="ml-2 text-black">Mr.</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="title"
                        value="Mrs"
                        checked={profile.title === "Mrs"}
                        onChange={onChange('title')}
                        className="accent-black" />
                      <span className="ml-2 text-black">Mrs.</span>
                    </label>
                  </div>
                  <div className="mb-3">
                    <label className="block text-black mb-1">Name*</label>
                    <input
                      type="text"
                      name='name'
                      value={profile.name}
                      onChange={onChange('name')}
                      className="w-full text-black border border-gray-300 rounded px-3 py-2" />
                  </div>
                  <div className="mb-3">
                    <label className="block text-black mb-1">Email*</label>
                    <input
                      type="email"
                      name='email'
                      value={cookieEmail || ""}
                      readOnly
                      disabled
                      className="w-full text-black border border-gray-300 rounded px-3 py-2 bg-gray-100" />
                  </div>
                  <div className="mb-3">
                    <label className="block text-black mb-1">Mobile Number*</label>
                    <input
                      type="text"
                      name='mobileNumber'
                      value={profile.mobileNumber}
                      onChange={onChange('mobileNumber')}
                      className="w-full text-black border border-gray-300 rounded px-3 py-2" />
                  </div>
                  <div className="mb-6">
                    <label className="block text-black mb-1">Address*</label>
                    <input
                      type="text"
                      name='address'
                      value={profile.address}
                      onChange={onChange('address')}
                      className="w-full text-black border border-gray-300 rounded px-3 py-2" />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-[#C09578] text-white font-bold px-6 py-2 rounded-full cursor-pointer"
                    >
                      UPDATE
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
          {activeTab === 'password' && (
            <>
              <h2 className="font-bold font-playfair text-2xl md:text-3xl mb-4 text-black">Change Password</h2>
              <div className="border border-gray-200 rounded-lg p-6">
                <form onSubmit={changePassword}>
                  <div className="mb-4">
                    <label className="block text-black mb-1">Current Password</label>
                    <input
                      type="password"
                      name="oldPassword"
                      // value={oldPassword}
                      // onChange={(e) => setOldPassword(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-black" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-black mb-1">New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      // value={newPassword}
                      // onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-black" />
                  </div>
                  <div className="mb-6">
                    <label className="block text-black mb-1">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      // value={confirmPassword}
                      // onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-black" />
                  </div>
                  <div className="flex justify-end">
                    <button type="submit" className="bg-[#C09578] text-white font-bold px-6 py-2 rounded-full cursor-pointer">CHANGE PASSWORD</button>
                  </div>
                </form>
              </div>
            </>
          )}
          {/* You can add similar sections for other tabs if needed */}
        </div>
      </div>

      {/* Order Detail Modal */}
      {showOrderDetail && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="text-2xl font-bold font-playfair text-black">Order Details</h3>
              <button
                onClick={() => {
                  setShowOrderDetail(false);
                  setSelectedOrder(null);
                }}
                className="text-gray-500 hover:text-black text-2xl font-bold cursor-pointer"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              {/* Order Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Order Number</p>
                  <p className="font-bold text-black">{selectedOrder.orderNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Order Date</p>
                  <p className="font-bold text-black">{formatDate(selectedOrder.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadgeClass(selectedOrder.status)}`}>
                    {selectedOrder.status ? selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1) : 'N/A'}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Payment Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    selectedOrder.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                    selectedOrder.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {selectedOrder.paymentStatus ? selectedOrder.paymentStatus.charAt(0).toUpperCase() + selectedOrder.paymentStatus.slice(1) : 'N/A'}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-6">
                <h4 className="font-bold font-playfair text-xl mb-4 text-black">Order Items</h4>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-[#F2F2F2]">
                      <tr>
                        <th className="py-3 px-4 text-left font-bold text-black">Product</th>
                        <th className="py-3 px-4 text-center font-bold text-black">Quantity</th>
                        <th className="py-3 px-4 text-right font-bold text-black">Price</th>
                        <th className="py-3 px-4 text-right font-bold text-black">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items?.map((item, index) => {
                        const itemPrice = item.salePrice || item.price;
                        const itemTotal = itemPrice * item.qty;
                        return (
                          <tr key={index} className="border-b border-gray-200">
                            <td className="py-3 px-4 text-black">{item.name}</td>
                            <td className="py-3 px-4 text-center text-black">{item.qty}</td>
                            <td className="py-3 px-4 text-right text-black">₹{itemPrice.toLocaleString()}</td>
                            <td className="py-3 px-4 text-right font-semibold text-black">₹{itemTotal.toLocaleString()}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Order Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-bold font-playfair text-xl mb-4 text-black">Billing Address</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-black font-semibold">{selectedOrder.billingAddress?.name}</p>
                    <p className="text-gray-700">{selectedOrder.billingAddress?.email}</p>
                    <p className="text-gray-700">{selectedOrder.billingAddress?.mobile}</p>
                    <p className="text-gray-700 mt-2">{selectedOrder.billingAddress?.address}</p>
                    <p className="text-gray-700">
                      {selectedOrder.billingAddress?.city}, {selectedOrder.billingAddress?.state}
                    </p>
                    <p className="text-gray-700">{selectedOrder.billingAddress?.country}</p>
                  </div>
                </div>
                {selectedOrder.shippingAddress && (
                  <div>
                    <h4 className="font-bold font-playfair text-xl mb-4 text-black">Shipping Address</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-black font-semibold">{selectedOrder.shippingAddress?.name}</p>
                      <p className="text-gray-700">{selectedOrder.shippingAddress?.email}</p>
                      <p className="text-gray-700">{selectedOrder.shippingAddress?.mobile}</p>
                      <p className="text-gray-700 mt-2">{selectedOrder.shippingAddress?.address}</p>
                      <p className="text-gray-700">
                        {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state}
                      </p>
                      <p className="text-gray-700">{selectedOrder.shippingAddress?.country}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Totals */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-end">
                  <div className="w-full md:w-1/2 space-y-2">
                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal:</span>
                      <span className="font-semibold text-black">₹{selectedOrder.subtotal?.toLocaleString() || '0'}</span>
                    </div>
                    {selectedOrder.discount > 0 && (
                      <div className="flex justify-between text-gray-700">
                        <span>Discount:</span>
                        <span className="font-semibold text-red-600">-₹{selectedOrder.discount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-lg font-bold text-black pt-2 border-t border-gray-200">
                      <span>Total:</span>
                      <span>₹{selectedOrder.total?.toLocaleString() || '0'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {selectedOrder.orderNotes && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-bold font-playfair text-lg mb-2 text-black">Order Notes</h4>
                  <p className="text-gray-700">{selectedOrder.orderNotes}</p>
                </div>
              )}
            </div>
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end">
              <button
                onClick={() => {
                  setShowOrderDetail(false);
                  setSelectedOrder(null);
                }}
                className="bg-[#C09578] text-white font-bold px-6 py-2 rounded-full cursor-pointer hover:bg-[#A07A5A] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
