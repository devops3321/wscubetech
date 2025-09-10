import React, { useState } from 'react';
import { FaFilter, FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { Link } from 'react-router-dom';

export default function Orders() {
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  return (
    <section>
      <div className='mt-5'>
        <hr className='border-t border-gray-600' />
        <h1 className='font-semibold p-4 text-xl text-gray-400'>
          <span>
            <Link to={"/dashboard"} className='hover:text-blue-900'>Home</Link> /
            <Link to={"/product/product-items"} className='hover:text-blue-900'>Orders</Link> / View
          </span>
        </h1>
        <hr className='border-t border-gray-600' />
      </div>
      <div className='flex flex-col md:flex-row bg-[#F1F5F9] px-2 rounded-lg border border-black-200 items-center justify-between mt-9 py-4'>
        <h1 className='text-3xl font-semibold mb-3 ms-2'>Order's List</h1>

      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-lg table-fixed border border-gray-200">
          <thead>
            <tr className='bg-[#374151] text-white'>
              <th className="px-4 py-5 text-center w-20">
                <button
                  type="button"
                  className="mx-auto flex items-center justify-center text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Delete
                </button>
              </th>
              <th className="px-4 py-5 text-center w-20">SL. NO.</th>
              <th className="px-4 py-5 text-center w-32">ORDER ID</th>
              <th className="px-4 py-5 text-center w-64">NAME</th>
              <th className="px-4 py-5 text-center w-64">QUANTITY</th>
              <th className="px-4 py-5 text-center w-32">PRICE</th>
              <th className="px-4 py-5 text-center w-24">DATE</th>
              <th className="px-4 py-5 text-center w-24">STATUS</th>
              <th className="px-4 py-5 text-center w-40">VIEW</th>
            </tr>
          </thead>
          <tbody>
            {[1].map((row, i) => (
              <tr
                key={i}
                className="bg-white text-black border-b border-gray-200 transition-colors duration-200 hover:bg-purple-50"
              >
                <td className="px-4 py-2 align-middle text-center">
                  <input type="checkbox" className="accent-purple-600 w-5 h-5" />
                </td>
                <td className="px-4 py-2 align-middle text-center">
                  {i + 1}
                </td>
                <td className="px-4 py-2 align-middle text-center">Frank01</td>
                <td className="px-4 py-2 align-middle text-center">
                  John Doe
                </td>
                <td className="px-4 py-2 align-middle text-center">
                  2
                </td>
                <td className="px-4 py-2 align-middle text-center">
                  <span className="inline-block bg-purple-100 text-purple-700 rounded px-3 py-1 font-semibold">₹ 3500</span>
                </td>
                <td className="px-4 py-2 align-middle text-center">
                  10/06/2024
                </td>
                <td className="px-4 py-2 align-middle text-center">
                  <span className="inline-block px-3 py-1 rounded bg-yellow-100 text-yellow-700 font-semibold text-xs">Processing...</span>
                </td>
                <td className="px-4 py-2 align-middle text-center">
                  <div className="flex items-center justify-center h-full">
                    <button
                      type="button"
                      className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br font-medium rounded-3xl border-0 text-sm px-5 py-2.5 transition-colors duration-200"
                      title="View Order"
                      onClick={() => setShowOrderDetails(true)}
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showOrderDetails && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 transition-all duration-300"
          style={{
            background: "rgba(0,0,0,0.6)", // true transparent black overlay
            backdropFilter: "blur(2px)"     // optional: adds a subtle blur for lightbox effect
          }}
        >
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl p-8 relative flex flex-col md:flex-row animate-fade-in">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setShowOrderDetails(false)}
              title="Close"
            >
              <IoMdClose size={28} />
            </button>
            <ViewOrderDetails />
          </div>
        </div>
      )}
    </section>
  );
}


function ViewOrderDetails() {
  return (
    <div>
      <h2 className="text-lg  font-2xl font-bold text-gray-700 p-2 border-b mb-4">Product Image's & Price</h2>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          {/* Product 1 */}
          <div className="flex items-center mb-6">
            <img
              src="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/19796322/2022/9/15/e17ac111-a42a-48be-b5ef-c627ae91db811663233930653-Roadster-Mens--Printed-Navy-Blue-Round-Neck-Short-Sleeves-T--1.jpg"
              alt=""
              className="w-24 h-24 object-cover rounded mr-4"
            />
            <div>
              <h3 className="text-md font-semibold text-red-600 mb-1">Men Navy Blue & Off White Typography Printed Pure Cotton T-shirt</h3>
              <p className="text-black"><b>Price :</b> ₹ 1500</p>
              <p className="text-black"><b>Quantity :</b> 1</p>
              <p className="text-black"><b>Size :</b> XL</p>
              <p className="text-black"><b>Color :</b> Red</p>
            </div>
          </div>
          {/* Product 2 */}
          <div className="flex items-center mb-6">
            <img
              src="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/23644364/2023/10/6/2e563247-3f1e-4822-adf9-fa233c62e8fd1696582792046-Mast--Harbour-Men-Sweaters-8961696582791747-2.jpg"
              alt=""
              className="w-24 h-24 object-cover rounded mr-4"
            />
            <div>
              <h3 className="text-md font-semibold text-red-600 mb-1">Men Navy Blue & Off White Typography Printed Pure Cotton T-shirt</h3>
              <p className="text-black"><b>Price :</b> ₹ 1500</p>
              <p className="text-black"><b>Quantity :</b> 1</p>
              <p className="text-black"><b>Size :</b> XL</p>
              <p className="text-black"><b>Color :</b> Red</p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <div className="bg-white rounded-lg border p-4 shadow-sm">
            <h3 className="text-md  font-2xl font-bold text-gray-700 mb-2">Product Details</h3>
            <p className="text-gray-700 mb-4">
              Roshan Chaurasia, First Floor , Laxmi Tower, Bhaskar Circle, Ratanada, PRAYAGRAJ, UTTAR PRADESH 211003 India
            </p>
            <h3 className="text-md font-bold font-2xl text-gray-700 mb-2">Order Summary</h3>
            <p className="text-black"><b>Item(s) Subtotal :</b> ₹ 3500</p>
            <p className="text-black"><b>Cash / Pay on Delivery :</b> ₹ 0</p>
            <p className="text-black"><b>Shipping :</b> ₹ 0</p>
            <p className="text-black"><b>Grand Total :</b> ₹ 3500</p>
          </div>
        </div>
      </div>
    </div>
  );
};
