"use client";
import React, { useState } from 'react'
import Breadcrumb from '../common/Breadcrumb'

export default function Checkout() {
  const [showShipping, setShowShipping] = useState(false);

  return (
    <div>
      <Breadcrumb pageName={"Checkout"} />
      <div className="max-w-4xl mx-auto mt-4 mb-10">
        {/* Billing Details */}
        <div className="border border-gray-200 rounded-lg mb-8">
          <div className="bg-black text-white font-bold font-playfair px-4 py-3 rounded-t">BILLING DETAILS</div>
          <form className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-black mb-1 font-playfair ">Name*</label>
                <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-black mb-1 font-playfair">Mobile Number*</label>
                <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-black mb-1 font-playfair">Billing Name*</label>
                <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-black mb-1 font-playfair">Billing Email*</label>
                <input type="email" className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-black mb-1 font-playfair">Billing Mobile Number*</label>
              <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
            </div>
            <div className="mb-4">
              <label className="block text-black mb-1 font-playfair">Billing Address*</label>
              <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-black mb-1 font-playfair">Country*</label>
                <select className="w-full border border-gray-300 rounded px-3 py-2">
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-black mb-1 font-playfair">State*</label>
                  <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-black mb-1 font-playfair">City*</label>
                  <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
              </div>
            </div>
            {/* Ship to Different Address */}
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="ship-different"
                className="accent-black mr-2 "
                checked={showShipping}
                onChange={() => setShowShipping(!showShipping)}
              />
              <label htmlFor="ship-different" className="text-black font-bold font-playfair cursor-pointer bg-black text-white px-2 py-1 rounded">
                Ship To A Different Address?
              </label>
            </div>
            {/* Shipping Address Section */}
            {showShipping && (
              <div className="mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-black mb-1 font-playfair">Shipping Name*</label>
                    <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-black mb-1 font-playfair">Shipping Email*</label>
                    <input type="email" className="w-full border border-gray-300 rounded px-3 py-2" />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-black mb-1 font-playfair">Shipping Mobile Number*</label>
                  <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div className="mb-4">
                  <label className="block text-black mb-1 font-playfair">Shipping Address*</label>
                  <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div className="mb-4">
                  <label className="block text-black mb-1 font-playfair">Country*</label>
                  <select className="w-full border border-gray-300 rounded px-3 py-2">
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-black mb-1 font-playfair">State*</label>
                    <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-black mb-1 font-playfair">City*</label>
                    <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
                  </div>
                </div>
              </div>
            )}
            {/* Order Notes */}
            <div className="mb-4">
              <label className="block text-black mb-1 font-playfair">Order Notes</label>
              <textarea className="w-full border border-gray-300 rounded px-3 py-2 resize-none" rows={3} placeholder="Notes about your order, e.g. special notes for delivery." />
            </div>
          </form>
        </div>
        {/* Your Order */}
        <div className="border border-gray-200 rounded-lg mb-8">
          <div className="bg-black text-white font-bold font-playfair px-4 py-3 mb-2">YOUR ORDER</div>
          <table className="min-w-full border-1 text-center mb-4">
            <thead>
              <tr className="bg-[#F2F2F2]">
                <th className="py-2 px-4 font-bold font-playfair text-black text-center">Product</th>
                <th className="py-2 px-4 font-bold font-playfair text-black text-center">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b text-black font-playfair">Cart Subtotal</td>
                <td className="py-2 px-4 border-b text-black ">Rs. 0</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b text-black font-playfair">Discount (-)</td>
                <td className="py-2 px-4 border-b text-black ">Rs. 0</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-black font-bold font-playfair">Order Total</td>
                <td className="py-2 px-4 text-black font-bold ">Rs. 0</td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-center px-4 py-2">
            <button className="bg-[#C09578] text-white font-bold py-2 px-4 rounded cursor-pointer hover:bg-black hover:text-white duration-200">Place Order</button>
          </div>
        </div>
      </div>
    </div>
  )
}
