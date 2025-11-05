"use client";
import React, { useState } from 'react'
import Breadcrumb from '../common/Breadcrumb'
import Link from 'next/link'

const demoWishlist = [
  {
    id: 1,
    name: "Modern Wooden Chair",
    image: "https://wscubetech.co/Assignments/furniture/public/frontend/img/product/1.jpg",
    price: 2499,
    originalPrice: 2999,
    discount: 17,
    category: "Furniture",
    rating: 4.5,
    reviews: 23
  },
  {
    id: 2,
    name: "Elegant Sofa Set",
    image: "https://wscubetech.co/Assignments/furniture/public/frontend/img/product/2.jpg",
    price: 7999,
    originalPrice: 9999,
    discount: 20,
    category: "Furniture",
    rating: 4.8,
    reviews: 45
  },
  {
    id: 3,
    name: "Coffee Table",
    image: "https://wscubetech.co/Assignments/furniture/public/frontend/img/product/3.jpg",
    price: 3999,
    originalPrice: 4999,
    discount: 20,
    category: "Furniture",
    rating: 4.3,
    reviews: 18
  }
];

export default function Wishlist() {
  // Set to [] for empty wishlist, or demoWishlist for demo data
  const [wishlist, setWishlist] = useState(demoWishlist);

  const handleRemove = (pid) => {
    setWishlist(wishlist => wishlist.filter(item => item.pid !== pid));
  };

  if (!wishlist.length) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Breadcrumb pageName={"My Wishlist"} />
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center bg-white rounded-2xl shadow-lg p-12">
            <div className="mb-8">
              <div className="mx-auto w-24 h-24 bg-[#C09578] bg-opacity-10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-[#C09578]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-black mb-4">Your Wishlist is Empty</h2>
              <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                Start building your dream furniture collection by adding items to your wishlist
              </p>
            </div>
            <Link 
              href="/online-store"
              className="inline-flex items-center px-8 py-4 bg-[#C09578] text-white font-semibold rounded-lg hover:bg-[#A07A5A] transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb pageName={"My Wishlist"} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-black mb-2">My Wishlist</h1>
              <p className="text-gray-600">{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <button
                onClick={() => setWishlist([])}
                className="px-6 py-3 bg-red-50 text-red-600 font-semibold rounded-lg hover:bg-red-100 transition-colors duration-200 border border-red-200 cursor-pointer"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>

        {/* Wishlist Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map(item => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Discount Badge */}
                {item.discount && (
                  <div className="absolute top-4 left-4 bg-[#C09578] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    -{item.discount}%
                  </div>
                )}
                {/* Remove Button */}
                <button
                  onClick={() => handleRemove(item.pid)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-red-500 hover:bg-opacity-100 hover:text-red-700 transition-all duration-200 shadow-lg cursor-pointer"
                  title="Remove from wishlist"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                {/* Quick View Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <Link 
                    href={`/product-details?id=${item.id}`}
                    className="opacity-0 group-hover:opacity-100 bg-white text-[#C09578] px-6 py-3 rounded-lg font-semibold hover:bg-[#C09578] hover:text-white transition-all duration-200"
                  >
                    Quick View
                  </Link>
                </div>
              </div>

              {/* Product Details */}
              <div className="p-6">
                <div className="mb-2">
                  <span className="text-sm text-gray-500 uppercase tracking-wide">{item.category}</span>
                </div>
                <h3 className="text-xl font-bold text-black mb-3 line-clamp-2">{item.name}</h3>
                
                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">({item.reviews} reviews)</span>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-black">₹{item.price.toLocaleString()}</span>
                    {item.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">₹{item.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button className="w-full bg-[#C09578] text-white font-semibold py-3 px-4 rounded-lg hover:bg-[#A07A5A] transition-colors duration-200 shadow-lg hover:shadow-xl cursor-pointer">
                    Add to Cart
                  </button>
                  <Link 
                    href={`/product-details?id=${item.id}`}
                    className="block w-full text-center border-2 border-[#C09578] text-[#C09578] font-semibold py-3 px-4 rounded-lg hover:bg-[#C09578] hover:text-white transition-colors duration-200"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        {wishlist.length > 0 && (
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-black mb-4">Ready to Make Your Dreams Come True?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Transform your space with our carefully curated furniture collection. 
              Add your favorite items to cart and create the perfect home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/online-store"
                className="inline-flex items-center px-8 py-4 bg-[#C09578] text-white font-semibold rounded-lg hover:bg-[#A07A5A] transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Continue Shopping
              </Link>
              <Link 
                href="/cart"
                className="inline-flex items-center px-8 py-4 border-2 border-[#C09578] text-[#C09578] font-semibold rounded-lg hover:bg-[#C09578] hover:text-white transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                View Cart
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
