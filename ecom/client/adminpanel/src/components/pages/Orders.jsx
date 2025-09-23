import React, { useState } from 'react';
import { FaFilter, FaRegEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
export default function Orders() {
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  return (
    <section className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8 py-6">
      {/* Breadcrumb */}
      <div className="mb-6">
        <nav className="flex items-center text-sm text-gray-500 gap-2">
          <Link to="/dashboard" className="hover:text-blue-700 font-medium">Home</Link>
          <span>/</span>
          <Link to="/product/product-items" className="hover:text-blue-700 font-medium">Orders</Link>
          <span>/</span>
          <span className="text-blue-700 font-semibold">View</span>
        </nav>
      </div>

      {/* Card */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl shadow-xl border border-blue-100 dark:border-gray-800 p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-900 dark:text-gray-100">Order's List</h1>
        </div>
        <div className="overflow-x-auto rounded-2xl shadow-md">
          <table className="min-w-full bg-white dark:bg-gray-900 rounded-2xl overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-blue-700 to-purple-700 text-white">
                <th className="px-4 py-4 text-center w-20">
                  <button
                    type="button"
                    className="mx-auto flex items-center justify-center text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 shadow-md"
                  >
                    Delete
                  </button>
                </th>
                <th className="px-4 py-4 text-center w-20">SL. NO.</th>
                <th className="px-4 py-4 text-center w-32">ORDER ID</th>
                <th className="px-4 py-4 text-center w-64">NAME</th>
                <th className="px-4 py-4 text-center w-24">QUANTITY</th>
                <th className="px-4 py-4 text-center w-32">PRICE</th>
                <th className="px-4 py-4 text-center w-24">DATE</th>
                <th className="px-4 py-4 text-center w-24">STATUS</th>
                <th className="px-4 py-4 text-center w-40">VIEW</th>
              </tr>
            </thead>
            <tbody>
              {[1].map((row, i) => (
                <tr
                  key={i}
                  className="bg-white dark:bg-gray-800 text-black dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200 hover:bg-blue-50 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-3 align-middle text-center">
                    <input type="checkbox" className="accent-purple-600 w-5 h-5" />
                  </td>
                  <td className="px-4 py-3 align-middle text-center">
                    {i + 1}
                  </td>
                  <td className="px-4 py-3 align-middle text-center">Frank01</td>
                  <td className="px-4 py-3 align-middle text-center">John Doe</td>
                  <td className="px-4 py-3 align-middle text-center">2</td>
                  <td className="px-4 py-3 align-middle text-center">
                    <span className="inline-block bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200 rounded px-3 py-1 font-semibold">₹ 3500</span>
                  </td>
                  <td className="px-4 py-3 align-middle text-center">10/06/2024</td>
                  <td className="px-4 py-3 align-middle text-center">
                    <span className="inline-block px-3 py-1 rounded bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200 font-semibold text-xs">Processing...</span>
                  </td>
                  <td className="px-4 py-3 align-middle text-center">
                    <div className="flex items-center justify-center h-full">
                      <button
                        type="button"
                        className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br font-medium rounded-3xl border-0 text-sm px-5 py-2.5 transition-colors duration-200 shadow-md cursor-pointer"
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
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 bg-black/60 backdrop-blur-sm"
        >
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-6xl p-8 relative flex flex-col md:flex-row animate-fade-in border border-blue-100 dark:border-gray-800">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white cursor-pointer"
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
    <div className="w-full">
      <h2 className="text-xl font-bold text-blue-900 dark:text-gray-100 p-2 border-b border-blue-100 dark:border-gray-700 mb-4">Product Images & Price</h2>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          {/* Product 1 */}
          <div className="flex items-center mb-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-xl shadow p-4">
            <img
              src="https://www.navygear.com/cdn/shop/files/UM0752148-NBATstack_900x.jpg?v=1748613715"
              alt=""
              className="w-24 h-24 object-cover rounded-lg mr-4 border border-blue-100 dark:border-gray-700"
            />
            <div>
              <h3 className="text-md font-semibold text-purple-700 dark:text-purple-300 mb-1">Men Navy Blue & Off White Typography Printed Pure Cotton T-shirt</h3>
              <p className="text-gray-700 dark:text-gray-200"><b>Price :</b> ₹ 1500</p>
              <p className="text-gray-700 dark:text-gray-200"><b>Quantity :</b> 1</p>
              <p className="text-gray-700 dark:text-gray-200"><b>Size :</b> XL</p>
              <p className="text-gray-700 dark:text-gray-200"><b>Color :</b> Red</p>
            </div>
          </div>
          {/* Product 2 */}
          <div className="flex items-center mb-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-xl shadow p-4">
            <img
              src="https://www.navygear.com/cdn/shop/files/shortsleeveangled_900x.jpg?v=1750785247"
              alt=""
              className="w-24 h-24 object-cover rounded-lg mr-4 border border-blue-100 dark:border-gray-700"
            />
            <div>
              <h3 className="text-md font-semibold text-purple-700 dark:text-purple-300 mb-1">Men Navy Blue & Off White Typography Printed Pure Cotton T-shirt</h3>
              <p className="text-gray-700 dark:text-gray-200"><b>Price :</b> ₹ 1500</p>
              <p className="text-gray-700 dark:text-gray-200"><b>Quantity :</b> 1</p>
              <p className="text-gray-700 dark:text-gray-200"><b>Size :</b> XL</p>
              <p className="text-gray-700 dark:text-gray-200"><b>Color :</b> Red</p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-xl border border-blue-100 dark:border-gray-700 p-6 shadow-lg">
            <h3 className="text-lg font-bold text-blue-900 dark:text-gray-100 mb-2">Product Details</h3>
            <p className="text-gray-700 dark:text-gray-200 mb-4">
              Roshan Chaurasia, First Floor, Laxmi Tower, Bhaskar Circle, Ratanada, PRAYAGRAJ, UTTAR PRADESH 211003 India
            </p>
            <h3 className="text-lg font-bold text-blue-900 dark:text-gray-100 mb-2">Order Summary</h3>
            <p className="text-gray-700 dark:text-gray-200"><b>Item(s) Subtotal :</b> ₹ 3500</p>
            <p className="text-gray-700 dark:text-gray-200"><b>Cash / Pay on Delivery :</b> ₹ 0</p>
            <p className="text-gray-700 dark:text-gray-200"><b>Shipping :</b> ₹ 0</p>
            <p className="text-gray-700 dark:text-gray-200"><b>Grand Total :</b> ₹ 3500</p>
          </div>
        </div>
      </div>
    </div>
  );
}
