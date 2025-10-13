import React, { useState } from 'react';
import { LoginContext } from '../context/MainContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminProfile() {
  const apiBaseurl = import.meta.env.VITE_APIBASEURL;
  const [activeTab, setActiveTab] = useState('edit');
  const [profile, setProfile] = useState({
    name: '',
    email: 'xyz@gmail.com',
    mobile: '',
    avatar: null,
  });
  const [formValue, setFormValue] = useState();

  const { id, setId } = React.useContext(LoginContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfile((prev) => ({ ...prev, avatar: e.target.files[0] }));
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const oldPassword = formData.get('oldPassword');
    const newPassword = formData.get('newPassword');
    const confirmPassword = formData.get('confirmPassword');

    try {
      const response = await axios.put(
        `${apiBaseurl}auth/changepassword/${id}`,
        { oldPassword, newPassword, confirmPassword }
      );
      const finResponse = response.data;

      if (finResponse.status === "success") {
        toast.success(finResponse.message);
        e.target.reset();
      } else {
        toast.error(finResponse.message || "Password change failed");
      }
    } catch (error) {
      toast.error("Server error. Please try again.");
    }
  }
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-200 mt-8">
      <ToastContainer />
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Profile Card */}
        <div className="md:w-1/3 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-purple-200 flex items-center justify-center text-4xl mb-2">
            {/* Avatar preview */}
            {profile.avatar ? (
              <img
                src={URL.createObjectURL(profile.avatar)}
                alt="avatar"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <span role="img" aria-label="avatar">🧑‍💼</span>
            )}
          </div>
          <div className="font-semibold text-lg mb-4">Admin</div>
          <div className="bg-gray-50 rounded-xl p-4 w-full text-center">
            <div className="font-semibold mb-2">Contact Information</div>
            <div className="flex items-center justify-center gap-2 text-gray-700 mb-1">
              <span>📞</span>
              <span>1234567890</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-700">
              <span>✉️</span>
              <span>xyz@gmail.com</span>
            </div>
          </div>
        </div>
        {/* Right: Tabs and Forms */}
        <div className="md:w-2/3">
          {/* Tabs */}
          <div className="flex border-b mb-6">
            <button
              className={`px-4 py-2 font-semibold cursor-pointer ${activeTab === 'edit' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('edit')}
            >
              Edit profile
            </button>
            <button
              className={`ml-4 px-4 py-2 font-semibold cursor-pointer ${activeTab === 'password' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('password')}
            >
              Change password
            </button>
          </div>
          {/* Tab Content */}
          {activeTab === 'edit' ? (
            <form className="flex gap-8" onSubmit={e => e.preventDefault()}>
              {/* Avatar Upload */}
              <div className="w-56 h-56 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 cursor-pointer mr-4">
                <label htmlFor="avatar-upload" className="flex flex-col items-center cursor-pointer w-full h-full justify-center">
                  <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 16v-8M8 12h8" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  <span className="mt-2 text-sm">Click to upload or drag and drop</span>
                  <span className="text-xs text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</span>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>
              {/* Profile Fields */}
              <div className="flex-1 space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                    placeholder="Name"
                    value={profile.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                    value={profile.email}
                    disabled
                  />
                </div>
                <div>
                  <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-700">Mob.</label>
                  <input
                    type="text"
                    name="mobile"
                    id="mobile"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                    placeholder="Full mobile number"
                    value={profile.mobile}
                    onChange={handleInputChange}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg text-md px-5 py-2.5 shadow transition-all duration-150 cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={changePassword}>
              <div>
                <label htmlFor="oldPassword" className="block mb-2 text-sm font-medium text-gray-700">Old Password</label>
                <input
                  type="password"
                  name="oldPassword"
                  id="oldPassword"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                  placeholder="Enter old password"
                  required
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-700">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                  placeholder="Enter new password"
                  required
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                  placeholder="Confirm new password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg text-md px-5 py-2.5 shadow transition-all duration-150 cursor-pointer"
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}