"use client";
import React, { useState } from 'react'
import Breadcrumb from '../common/Breadcrumb'
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../redux/slice/userSlice';
import { redirect } from 'next/navigation';

export default function Dashboard() {

  const [activeTab, setActiveTab] = useState('dashboard');

  let loginUser = useSelector((store) => store.myUser.user);

  let dispatch = useDispatch();

  let logOutUser = () => {
    dispatch(logOut());
    redirect('/login-register');
  }

  return (
    <div>
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
                      <select className="w-full border text-black border-gray-300 rounded px-3 py-2">
                        <option className="text-black">Select Country</option>
                        <option className="text-black">India</option>
                        <option className="text-black">Afghanistan</option>
                        <option className="text-black">Albania</option>
                        <option className="text-black">Algeria</option>
                        <option className="text-black">Andorra</option>
                        <option className="text-black">Angola</option>
                        <option className="text-black">Argentina</option>
                        <option className="text-black">Armenia</option>
                        <option className="text-black">Australia</option>
                        <option className="text-black">Austria</option>
                        <option className="text-black">Azerbaijan</option>
                        <option className="text-black">Bahrain</option>
                        <option className="text-black">Bangladesh</option>
                        <option className="text-black">Belarus</option>
                        <option className="text-black">Belgium</option>
                        <option className="text-black">Benin</option>
                        <option className="text-black">Bosnia and Herzegovina</option>
                        <option className="text-black">Botswana</option>
                        <option className="text-black">Brazil</option>
                        <option className="text-black">Bulgaria</option>
                        <option className="text-black">Burkina Faso</option>
                        <option className="text-black">Cambodia</option>
                        <option className="text-black">Cameroon</option>
                        <option className="text-black">Canada</option>
                        <option className="text-black">Cape Verde</option>
                        <option className="text-black">Central African Republic</option>
                        <option className="text-black">Chile</option>
                        <option className="text-black">China</option>
                        <option className="text-black">Colombia</option>
                        <option className="text-black">Comoros</option>
                        <option className="text-black">Croatia</option>
                        <option className="text-black">Cyprus</option>
                        <option className="text-black">Czech Republic</option>
                        <option className="text-black">Denmark</option>
                        <option className="text-black">Djibouti</option>
                        <option className="text-black">Democratic Republic of the Congo</option>
                        <option className="text-black">Ecuador</option>
                        <option className="text-black">Egypt</option>
                        <option className="text-black">Equatorial Guinea</option>
                        <option className="text-black">Estonia</option>
                        <option className="text-black">Eritrea</option>
                        <option className="text-black">Ethiopia</option>
                        <option className="text-black">Fiji</option>
                        <option className="text-black">Finland</option>
                        <option className="text-black">France</option>
                        <option className="text-black">Gabon</option>
                        <option className="text-black">Gambia</option>
                        <option className="text-black">Georgia</option>
                        <option className="text-black">Germany</option>
                        <option className="text-black">Ghana</option>
                        <option className="text-black">Greece</option>
                        <option className="text-black">Greenland</option>
                        <option className="text-black">Guinea</option>
                        <option className="text-black">Hong Kong</option>
                        <option className="text-black">Hungary</option>
                        <option className="text-black">Iceland</option>
                        <option className="text-black">Indonesia</option>
                        <option className="text-black">Iran</option>
                        <option className="text-black">Iraq</option>
                        <option className="text-black">Ireland</option>
                        <option className="text-black">Israel</option>
                        <option className="text-black">Italy</option>
                        <option className="text-black">Ivory Coast</option>
                        <option className="text-black">Japan</option>
                        <option className="text-black">Jordan</option>
                        <option className="text-black">Kazakhstan</option>
                        <option className="text-black">Kenya</option>
                        <option className="text-black">Kuwait</option>
                        <option className="text-black">Laos</option>
                        <option className="text-black">Latvia</option>
                        <option className="text-black">Lebanon</option>
                        <option className="text-black">Lesotho</option>
                        <option className="text-black">Liberia</option>
                        <option className="text-black">Liechtenstein</option>
                        <option className="text-black">Lithuania</option>
                        <option className="text-black">Luxembourg</option>
                        <option className="text-black">Madagascar</option>
                        <option className="text-black">Malawi</option>
                        <option className="text-black">Malaysia</option>
                        <option className="text-black">Malta</option>
                        <option className="text-black">Mauritius</option>
                        <option className="text-black">Mexico</option>
                        <option className="text-black">Moldova</option>
                        <option className="text-black">Monaco</option>
                        <option className="text-black">Mongolia</option>
                        <option className="text-black">Montenegro</option>
                        <option className="text-black">Morocco</option>
                        <option className="text-black">Mozambique</option>
                        <option className="text-black">Myanmar</option>
                        <option className="text-black">Namibia</option>
                        <option className="text-black">Nepal</option>
                        <option className="text-black">Netherlands</option>
                        <option className="text-black">New Zealand</option>
                        <option className="text-black">Nigeria</option>
                        <option className="text-black">North Macedonia</option>
                        <option className="text-black">Norway</option>
                        <option className="text-black">Oman</option>
                        <option className="text-black">Pakistan</option>
                        <option className="text-black">Papua New Guinea</option>
                        <option className="text-black">Peru</option>
                        <option className="text-black">Philippines</option>
                        <option className="text-black">Poland</option>
                        <option className="text-black">Portugal</option>
                        <option className="text-black">Qatar</option>
                        <option className="text-black">Republic of the Congo</option>
                        <option className="text-black">Romania</option>
                        <option className="text-black">Russia</option>
                        <option className="text-black">Rwanda</option>
                        <option className="text-black">San Marino</option>
                        <option className="text-black">Saudi Arabia</option>
                        <option className="text-black">Senegal</option>
                        <option className="text-black">Serbia</option>
                        <option className="text-black">Seychelles</option>
                        <option className="text-black">Sierra Leone</option>
                        <option className="text-black">Singapore</option>
                        <option className="text-black">Slovakia</option>
                        <option className="text-black">Slovenia</option>
                        <option className="text-black">Solomon Islands</option>
                        <option className="text-black">Somalia</option>
                        <option className="text-black">South Africa</option>
                        <option className="text-black">South Korea</option>
                        <option className="text-black">South Sudan</option>
                        <option className="text-black">Spain</option>
                        <option className="text-black">Sri Lanka</option>
                        <option className="text-black">Sudan</option>
                        <option className="text-black">Swaziland</option>
                        <option className="text-black">Sweden</option>
                        <option className="text-black">Switzerland</option>
                        <option className="text-black">Syria</option>
                        <option className="text-black">Taiwan</option>
                        <option className="text-black">Tanzania</option>
                        <option className="text-black">Thailand</option>
                        <option className="text-black">Togo</option>
                        <option className="text-black">Tonga</option>
                        <option className="text-black">Turkey</option>
                        <option className="text-black">Uganda</option>
                        <option className="text-black">Ukraine</option>
                        <option className="text-black">United Arab Emirates</option>
                        <option className="text-black">United Kingdom</option>
                        <option className="text-black">United States</option>
                        <option className="text-black">Uruguay</option>
                        <option className="text-black">Uzbekistan</option>
                        <option className="text-black">Vatican City</option>
                        <option className="text-black">Venezuela</option>
                        <option className="text-black">Vietnam</option>
                        <option className="text-black">Zimbabwe</option>
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
                      <select className="w-full text-black border border-gray-300 rounded px-3 py-2">
                        <option className="text-black">Select Country</option>
                        <option className="text-black">India</option>
                        <option className="text-black">Afghanistan</option>
                        <option className="text-black">Albania</option>
                        <option className="text-black">Algeria</option>
                        <option className="text-black">Andorra</option>
                        <option className="text-black">Angola</option>
                        <option className="text-black">Argentina</option>
                        <option className="text-black">Armenia</option>
                        <option className="text-black">Australia</option>
                        <option className="text-black">Austria</option>
                        <option className="text-black">Azerbaijan</option>
                        <option className="text-black">Bahrain</option>
                        <option className="text-black">Bangladesh</option>
                        <option className="text-black">Belarus</option>
                        <option className="text-black">Belgium</option>
                        <option className="text-black">Benin</option>
                        <option className="text-black">Bosnia and Herzegovina</option>
                        <option className="text-black">Botswana</option>
                        <option className="text-black">Brazil</option>
                        <option className="text-black">Bulgaria</option>
                        <option className="text-black">Burkina Faso</option>
                        <option className="text-black">Cambodia</option>
                        <option className="text-black">Cameroon</option>
                        <option className="text-black">Canada</option>
                        <option className="text-black">Cape Verde</option>
                        <option className="text-black">Central African Republic</option>
                        <option className="text-black">Chile</option>
                        <option className="text-black">China</option>
                        <option className="text-black">Colombia</option>
                        <option className="text-black">Comoros</option>
                        <option className="text-black">Croatia</option>
                        <option className="text-black">Cyprus</option>
                        <option className="text-black">Czech Republic</option>
                        <option className="text-black">Denmark</option>
                        <option className="text-black">Djibouti</option>
                        <option className="text-black">Democratic Republic of the Congo</option>
                        <option className="text-black">Ecuador</option>
                        <option className="text-black">Egypt</option>
                        <option className="text-black">Equatorial Guinea</option>
                        <option className="text-black">Estonia</option>
                        <option className="text-black">Eritrea</option>
                        <option className="text-black">Ethiopia</option>
                        <option className="text-black">Fiji</option>
                        <option className="text-black">Finland</option>
                        <option className="text-black">France</option>
                        <option className="text-black">Gabon</option>
                        <option className="text-black">Gambia</option>
                        <option className="text-black">Georgia</option>
                        <option className="text-black">Germany</option>
                        <option className="text-black">Ghana</option>
                        <option className="text-black">Greece</option>
                        <option className="text-black">Greenland</option>
                        <option className="text-black">Guinea</option>
                        <option className="text-black">Hong Kong</option>
                        <option className="text-black">Hungary</option>
                        <option className="text-black">Iceland</option>
                        <option className="text-black">Indonesia</option>
                        <option className="text-black">Iran</option>
                        <option className="text-black">Iraq</option>
                        <option className="text-black">Ireland</option>
                        <option className="text-black">Israel</option>
                        <option className="text-black">Italy</option>
                        <option className="text-black">Ivory Coast</option>
                        <option className="text-black">Japan</option>
                        <option className="text-black">Jordan</option>
                        <option className="text-black">Kazakhstan</option>
                        <option className="text-black">Kenya</option>
                        <option className="text-black">Kuwait</option>
                        <option className="text-black">Laos</option>
                        <option className="text-black">Latvia</option>
                        <option className="text-black">Lebanon</option>
                        <option className="text-black">Lesotho</option>
                        <option className="text-black">Liberia</option>
                        <option className="text-black">Liechtenstein</option>
                        <option className="text-black">Lithuania</option>
                        <option className="text-black">Luxembourg</option>
                        <option className="text-black">Madagascar</option>
                        <option className="text-black">Malawi</option>
                        <option className="text-black">Malaysia</option>
                        <option className="text-black">Malta</option>
                        <option className="text-black">Mauritius</option>
                        <option className="text-black">Mexico</option>
                        <option className="text-black">Moldova</option>
                        <option className="text-black">Monaco</option>
                        <option className="text-black">Mongolia</option>
                        <option className="text-black">Montenegro</option>
                        <option className="text-black">Morocco</option>
                        <option className="text-black">Mozambique</option>
                        <option className="text-black">Myanmar</option>
                        <option className="text-black">Namibia</option>
                        <option className="text-black">Nepal</option>
                        <option className="text-black">Netherlands</option>
                        <option className="text-black">New Zealand</option>
                        <option className="text-black">Nigeria</option>
                        <option className="text-black">North Macedonia</option>
                        <option className="text-black">Norway</option>
                        <option className="text-black">Oman</option>
                        <option className="text-black">Pakistan</option>
                        <option className="text-black">Papua New Guinea</option>
                        <option className="text-black">Peru</option>
                        <option className="text-black">Philippines</option>
                        <option className="text-black">Poland</option>
                        <option className="text-black">Portugal</option>
                        <option className="text-black">Qatar</option>
                        <option className="text-black">Republic of the Congo</option>
                        <option className="text-black">Romania</option>
                        <option className="text-black">Russia</option>
                        <option className="text-black">Rwanda</option>
                        <option className="text-black">San Marino</option>
                        <option className="text-black">Saudi Arabia</option>
                        <option className="text-black">Senegal</option>
                        <option className="text-black">Serbia</option>
                        <option className="text-black">Seychelles</option>
                        <option className="text-black">Sierra Leone</option>
                        <option className="text-black">Singapore</option>
                        <option className="text-black">Slovakia</option>
                        <option className="text-black">Slovenia</option>
                        <option className="text-black">Solomon Islands</option>
                        <option className="text-black">Somalia</option>
                        <option className="text-black">South Africa</option>
                        <option className="text-black">South Korea</option>
                        <option className="text-black">South Sudan</option>
                        <option className="text-black">Spain</option>
                        <option className="text-black">Sri Lanka</option>
                        <option className="text-black">Sudan</option>
                        <option className="text-black">Swaziland</option>
                        <option className="text-black">Sweden</option>
                        <option className="text-black">Switzerland</option>
                        <option className="text-black">Syria</option>
                        <option className="text-black">Taiwan</option>
                        <option className="text-black">Tanzania</option>
                        <option className="text-black">Thailand</option>
                        <option className="text-black">Togo</option>
                        <option className="text-black">Tonga</option>
                        <option className="text-black">Turkey</option>
                        <option className="text-black">Uganda</option>
                        <option className="text-black">Ukraine</option>
                        <option className="text-black">United Arab Emirates</option>
                        <option className="text-black">United Kingdom</option>
                        <option className="text-black">United States</option>
                        <option className="text-black">Uruguay</option>
                        <option className="text-black">Uzbekistan</option>
                        <option className="text-black">Vatican City</option>
                        <option className="text-black">Venezuela</option>
                        <option className="text-black">Vietnam</option>
                        <option className="text-black">Zimbabwe</option>
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
                <form>
                  <div className="mb-4 flex items-center gap-6">
                    <label className="inline-flex items-center">
                      <input type="radio" name="salutation" value="Mr." defaultChecked className="accent-black" />
                      <span className="ml-2 text-black">Mr.</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input type="radio" name="salutation" value="Mrs." className="accent-black" />
                      <span className="ml-2 text-black">Mrs.</span>
                    </label>
                  </div>
                  <div className="mb-3">
                    <label className="block text-black mb-1">Name*</label>
                    <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
                  </div>
                  <div className="mb-3">
                    <label className="block text-black mb-1">Email*</label>
                    <input type="email" value="johndoe@example.com" readOnly className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 text-black" />
                  </div>
                  <div className="mb-3">
                    <label className="block text-black mb-1">Mobile Number*</label>
                    <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
                  </div>
                  <div className="mb-6">
                    <label className="block text-black mb-1">Address*</label>
                    <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
                  </div>
                  <div className="flex justify-end">
                    <button type="submit" className="bg-[#C09578] text-white font-bold px-6 py-2 rounded-full cursor-pointer">UPDATE</button>
                  </div>
                </form>
              </div>
            </>
          )}
          {activeTab === 'password' && (
            <>
              <h2 className="font-bold font-playfair text-2xl md:text-3xl mb-4 text-black">Change Password</h2>
              <div className="border border-gray-200 rounded-lg p-6">
                <form>
                  <div className="mb-4">
                    <label className="block text-black mb-1">Current Password</label>
                    <input type="password" className="w-full border border-gray-300 rounded px-3 py-2" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-black mb-1">New Password</label>
                    <input type="password" className="w-full border border-gray-300 rounded px-3 py-2" />
                  </div>
                  <div className="mb-6">
                    <label className="block text-black mb-1">Confirm Password</label>
                    <input type="password" className="w-full border border-gray-300 rounded px-3 py-2" />
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
