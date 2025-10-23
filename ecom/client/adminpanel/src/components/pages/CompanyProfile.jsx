import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CompanyProfile() {
  const API_BASE = (import.meta.env.VITE_APIBASEURL).replace(/\/+$/, "");
  const PROFILE_API = `${API_BASE}/auth/companyprofileupdate/`;

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    mapUrl: '',
    avatar: '',
    facebook: '',
    youtube: '',
    instagram: '',
    twitter: '',
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch company profile on mount
  useEffect(() => {
    axios
      .get(`${API_BASE}/auth/view-company-profile/`)
      .then((res) => res.data)
      .then((finResponse) => {
        console.log("Company Profile Response:", finResponse);

        if (finResponse.status === "success" && finResponse.data) {
          setProfile({
            name: finResponse.data.name || '',
            email: finResponse.data.email || '',
            mobile: finResponse.data.mobile || '',
            address: finResponse.data.address || '',
            mapUrl: finResponse.data.mapUrl || '',
            avatar: finResponse.data.avatar || '',
            facebook: finResponse.data.facebook || '',
            youtube: finResponse.data.youtube || '',
            instagram: finResponse.data.instagram || '',
            twitter: finResponse.data.twitter || '',
          });

          // Set avatar preview if avatar exists
          if (finResponse.data.avatar) {
            setAvatarPreview(`${finResponse.staticPath}${finResponse.data.avatar}`);
          } else {
            setAvatarPreview(null);
          }
        }
      })
      .catch(() => {
        toast.error('Failed to fetch company profile');
      });
  }, [API_BASE]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfile((prev) => ({ ...prev, avatar: e.target.files[0] }));
      setAvatarPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let formData = new FormData();
      Object.entries(profile).forEach(([key, value]) => {
        if (key === 'avatar') {
          if (value && value instanceof File) formData.append('avatar', value);
        } else {
          formData.append(key, value || '');
        }
      });

      const res = await axios.post(`${PROFILE_API}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data.status === 'success') {
        toast.success(res.data.message || 'Profile updated!');
        // Refresh profile data after update
        const updatedProfile = res.data.data;
        setProfile({
          name: updatedProfile.name || '',
          email: updatedProfile.email || '',
          mobile: updatedProfile.mobile || '',
          address: updatedProfile.address || '',
          mapUrl: updatedProfile.mapUrl || '',
          avatar: updatedProfile.avatar || '',
          facebook: updatedProfile.facebook || '',
          youtube: updatedProfile.youtube || '',
          instagram: updatedProfile.instagram || '',
          twitter: updatedProfile.twitter || '',
        });
        // Build full URL for avatar if present
        if (updatedProfile.avatar) {
          setAvatarPreview(`${API_BASE}/uploads/companyprofile/${updatedProfile.avatar}`);
        } else {
          setAvatarPreview(null);
        }
      } else {
        toast.error(res.data.message || 'Update failed');
      }
    } catch (err) {
      toast.error('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-200 mt-8">
      <ToastContainer />
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Avatar Upload */}
          <div className="md:w-1/3">
            <label className="block mb-2 text-md font-semibold text-gray-700">Company Logo</label>
            <div className="w-full h-56 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 cursor-pointer">
              <label
                htmlFor="avatar-upload"
                className="flex flex-col items-center cursor-pointer w-full h-full justify-center"
              >
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="avatar"
                    className="w-32 h-32 rounded-full object-cover mb-2"
                  />
                ) : (
                  <>
                    <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M12 16v-8M8 12h8" />
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    <span className="mt-2 text-sm">Click to upload or drag and drop</span>
                    <span className="text-xs text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</span>
                  </>
                )}
                <input
                  id="avatar-upload"
                  type="file"
                  name="avatar"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </label>
            </div>
          </div>
          {/* Profile Fields */}
          <div className="md:w-2/3 flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-blue-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                value={profile.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                value={profile.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-700">
                Mobile
              </label>
              <input
                type="text"
                name="mobile"
                id="mobile"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                value={profile.mobile}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        {/* Address */}
        <div>
          <label htmlFor="address" className="block mb-2 text-md font-semibold text-gray-700">
            Address
          </label>
          <textarea
            name="address"
            id="address"
            rows={3}
            className="w-full bg-blue-50 border border-gray-300 rounded-lg p-2.5 resize-none"
            placeholder="Enter address"
            value={profile.address}
            onChange={handleInputChange}
          />
        </div>
        {/* Google Map URL */}
        <div>
          <label htmlFor="mapUrl" className="block mb-2 text-md font-semibold text-gray-700">
            Google Map URL
          </label>
          <textarea
            name="mapUrl"
            id="mapUrl"
            rows={2}
            className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 resize-none"
            placeholder="Google Map URL"
            value={profile.mapUrl}
            onChange={handleInputChange}
          />
        </div>
        {/* Social Media URLs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="facebook" className="block mb-2 text-sm font-medium text-gray-700">
              Facebook URL
            </label>
            <input
              type="url"
              name="facebook"
              id="facebook"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
              placeholder="Facebook URL"
              value={profile.facebook}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="youtube" className="block mb-2 text-sm font-medium text-gray-700">
              YouTube URL
            </label>
            <input
              type="url"
              name="youtube"
              id="youtube"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
              placeholder="YouTube URL"
              value={profile.youtube}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="instagram" className="block mb-2 text-sm font-medium text-gray-700">
              Instagram URL
            </label>
            <input
              type="url"
              name="instagram"
              id="instagram"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
              placeholder="Instagram URL"
              value={profile.instagram}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="twitter" className="block mb-2 text-sm font-medium text-gray-700">
              Twitter URL
            </label>
            <input
              type="url"
              name="twitter"
              id="twitter"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
              placeholder="Twitter URL"
              value={profile.twitter}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg text-md px-5 py-2.5 shadow transition-all duration-150 cursor-pointer"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}