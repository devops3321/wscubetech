"use client";
import React, { useState } from 'react'
import Breadcrumb from '../common/Breadcrumb'

const demoWishlist = [
  {
    id: 1,
    name: "Modern Wooden Chair",
    image: "https://wscubetech.co/Assignments/furniture/public/frontend/img/product/1.jpg",
    price: 2499,
  },
  {
    id: 2,
    name: "Elegant Sofa",
    image: "https://wscubetech.co/Assignments/furniture/public/frontend/img/product/2.jpg",
    price: 7999,
  }
];

export default function Wishlist() {
  // Set to [] for empty wishlist, or demoWishlist for demo data
  const [wishlist, setWishlist] = useState(demoWishlist);

  const handleRemove = (id) => {
    setWishlist(wishlist => wishlist.filter(item => item.id !== id));
  };

  if (!wishlist.length) {
    return (
      <div>
        <Breadcrumb pageName={"My Wishlist"} />
        <div>
          <img 
            src='https://wscubetech.co/Assignments/furniture/public/frontend/img/icon/wishlist-Empty.jpg'
            alt=''
            className='justify-center mx-auto mb-5'
          />
          <p className='text-black text-lg text-center mb-10'>Your wishlist is empty!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <Breadcrumb pageName={"My Wishlist"} />
      <div className="max-w-6xl mx-auto mt-8 bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-6 text-black text-center">Wishlist</h2>
        <div className="w-full">
          <table className="min-w-full bg-gray-100 rounded-xl overflow-hidden">
            <thead>
              <tr>
                <th className="py-3 px-4 text-left text-black">Product</th>
                <th className="py-3 px-4 text-left text-black">Name</th>
                <th className="py-3 px-4 text-left text-black">Price</th>
                <th className="py-3 px-4 text-left text-black"></th>
                <th className="py-3 px-4 text-left text-black"></th>
              </tr>
            </thead>
            <tbody>
              {wishlist.map(item => (
                <tr key={item.id} className="border-b last:border-b-0 hover:bg-gray-200 transition">
                  <td className="py-4 px-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg cursor-pointer"
                    />
                  </td>
                  <td className="py-4 px-4 text-black font-medium">{item.name}</td>
                  <td className="py-4 px-4 text-purple-700 font-bold text-lg">₹{item.price}</td>
                  <td className="py-4 px-4">
                    <button
                      className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition-all duration-200 cursor-pointer"
                    >
                      Add to Cart
                    </button>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-red-500 hover:text-red-700 font-bold text-xl cursor-pointer"
                      title="Remove from wishlist"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
