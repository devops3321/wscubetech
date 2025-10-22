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

export default function Dashboard() {

  const apiBaseurl = process.env.NEXT_PUBLIC_APIBASEURL;

  const [activeTab, setActiveTab] = useState('dashboard');

  let token = useSelector((store) => store.myUser.token);

  let user = useSelector((store) => store.myUser.user);

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
        const resp = await axios.get(`${apiBaseurl}user/get-profile`, {
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
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 text-black">
                  <thead>
                    <tr className="bg-[#F2F2F2] font-playfair border border-black">
                      <th className="py-3 px-4 font-bold border-b border-r text-black ">Order</th>
                      <th className="py-3 px-4 font-bold border-b border-r text-black ">Date</th>
                      <th className="py-3 px-4 font-bold border-b border-r text-black ">Status</th>
                      <th className="py-3 px-4 font-bold border-b border-r text-black ">Total</th>
                      <th className="py-3 px-4 font-bold border-b text-black ">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-black text-center font-bold border border-black">
                      <td className="py-3 px-4 border text-black font-bold ">1</td>
                      <td className="py-3 px-4 border text-black font-bold ">May 10, 2018</td>
                      <td className="py-3 px-4 border text-black font-bold ">Completed</td>
                      <td className="py-3 px-4 border text-black font-bold ">Rs. 25.00 For 1 Item</td>
                      <td className="py-3 px-4 border text-black font-bold ">
                        <span className="text-[#C09578] font-bold cursor-pointer hover:underline hover:text-[#C09578] text-black">View</span>
                      </td>
                    </tr>
                    <tr className="text-black text-center font-bold border border-black">
                      <td className="py-3 px-4 border text-black font-bold ">2</td>
                      <td className="py-3 px-4 border text-black font-bold ">May 10, 2018</td>
                      <td className="py-3 px-4 border text-black font-bold ">Processing</td>
                      <td className="py-3 px-4 border text-black font-bold ">Rs. 17.00 For 1 Item</td>
                      <td className="py-3 px-4 border text-black font-bold ">
                        <span className="text-[#C09578] font-bold cursor-pointer hover:underline hover:text-[#C09578] text-black">View</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
          {activeTab === 'addresses' && (
            <>
              <p className="mb-6 text-black">
                The following addresses will be used on the checkout page by default.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Billing Address */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold font-playfair text-xl mb-4 text-black">Billing Address</h3>
                  <form>
                    <div className="mb-3">
                      <label className="block text-black mb-1">Billing Name*</label>
                      <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
                    </div>
                    <div className="mb-3">
                      <label className="block text-black mb-1">Billing Email*</label>
                      <input type="email" className="w-full border border-gray-300 rounded px-3 py-2" />
                    </div>
                    <div className="mb-3">
                      <label className="block text-black mb-1">Billing Mobile Number*</label>
                      <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
                    </div>
                    <div className="mb-3">
                      <label className="block text-black mb-1">Billing Address*</label>
                      <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
                    </div>
                    <div className="mb-3">
                      <label className="block text-black mb-1">Country*</label>
                      <select className="w-full border text-black border-gray-300 rounded px-3 py-2" value={undefined} onChange={()=>{}}>
                        {countries.map((c) => (
                          <option key={c} className="text-black">{c}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="block text-black mb-1">State*</label>
                      <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
                    </div>
                    <div className="mb-6">
                      <label className="block text-black mb-1">City*</label>
                      <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
                    </div>
                    <div className="flex justify-end">
                      <button type="submit" className="bg-[#C09578] text-white font-bold px-6 py-2 rounded-full cursor-pointer">UPDATE</button>
                    </div>
                  </form>
                </div>
                {/* Shipping Address */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold font-playfair text-xl mb-4 text-black">Shipping Address</h3>
                  <form>
                    <div className="mb-3">
                      <label className="block text-black mb-1">Shipping Name*</label>
                      <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
                    </div>
                    <div className="mb-3">
                      <label className="block text-black mb-1">Shipping Email*</label>
                      <input type="email" className="w-full border border-gray-300 rounded px-3 py-2" />
                    </div>
                    <div className="mb-3">
                      <label className="block text-black mb-1">Shipping Mobile Number*</label>
                      <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
                    </div>
                    <div className="mb-3">
                      <label className="block text-black mb-1">Shipping Address*</label>
                      <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
                    </div>
                    <div className="mb-3">
                      <label className="block text-black mb-1">Country*</label>
                      <select className="w-full text-black border border-gray-300 rounded px-3 py-2" value={undefined} onChange={()=>{}}>
                        {countries.map((c) => (
                          <option key={c} className="text-black">{c}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="block text-black mb-1">State*</label>
                      <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
                    </div>
                    <div className="mb-6">
                      <label className="block text-black mb-1">City*</label>
                      <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
                    </div>
                    <div className="flex justify-end">
                      <button type="submit" className="bg-[#C09578] text-white font-bold px-6 py-2 rounded-full cursor-pointer">UPDATE</button>
                    </div>
                  </form>
                </div>
              </div>
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
                      className="w-full text-black border border-gray-300 rounded px-3 py-2 bg-gray-100 text-black" />
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
    </div>
  )
}
