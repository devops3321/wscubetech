import React, { useState } from 'react';

export default function CompanyProfile() {
  const [profile, setProfile] = useState({
    name: 'Nehru Dyer',
    email: 'rowssyzy@mailinator.com',
    mobile: '567567567',
    address: '',
    mapUrl: '',
    avatar: null,
    facebook: '',
    youtube: '',
    instagram: '',
    twitter: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfile((prev) => ({ ...prev, avatar: e.target.files[0] }));
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-200 mt-8">
      <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Category Image Upload */}
          <div className="md:w-1/3">
            <label className="block mb-2 text-md font-semibold text-gray-700">Category Image</label>
            <div className="w-full h-56 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 cursor-pointer">
              <label
                htmlFor="avatar-upload"
                className="flex flex-col items-center cursor-pointer w-full h-full justify-center"
              >
                {profile.avatar ? (
                  <img
                    src={URL.createObjectURL(profile.avatar)}
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
                disabled
              />
            </div>
            <div>
              <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-700">
                Mob.
              </label>
              <input
                type="text"
                name="mobile"
                id="mobile"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                value={profile.mobile}
                disabled
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
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
