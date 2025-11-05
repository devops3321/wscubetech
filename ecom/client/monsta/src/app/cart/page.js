"use client";
import React, { useEffect } from 'react';
import Breadcrumb from '../common/Breadcrumb';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { updateCartItemAsync, deleteCartItemAsync, fetchCartItems } from '../redux/slice/cartSlice';
import { toast } from 'react-toastify';

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.mycart.cartItem);
  const staticImagePath = useSelector(state => state.mycart.staticImagePath || "");
  const loading = useSelector(state => state.mycart.loading);
  const error = useSelector(state => state.mycart.error);
  const user = useSelector(state => state.myUser.user);
  const userId = user?.userId || user?._id || user?.id;
  const token = useSelector(state => state.myUser.token);

  // Fetch cart items on mount and when component becomes visible
  useEffect(() => {
    if (userId && token) {
      dispatch(fetchCartItems({ userId, token }));
    }
  }, [userId, token, dispatch]);

  // Refetch when the page becomes visible or window gets focus (in case user navigated from another page)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && userId && token) {
        dispatch(fetchCartItems({ userId, token }));
      }
    };
    const handleFocus = () => {
      if (userId && token) {
        dispatch(fetchCartItems({ userId, token }));
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [userId, token, dispatch]);

  const handleQtyChange = async (pid, newQty) => {
    if (newQty < 1) newQty = 1;
    if (!userId || !token) {
      toast.error('Please login to update cart');
      return;
    }
    try {
      await dispatch(updateCartItemAsync({ pid, qty: newQty, userId, token })).unwrap();
    } catch (error) {
      toast.error(error || 'Failed to update cart');
    }
  };

  const handleRemove = async (pid) => {
    if (!userId || !token) {
      toast.error('Please login to remove from cart');
      return;
    }
    try {
      await dispatch(deleteCartItemAsync({ pid, userId, token })).unwrap();
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error(error || 'Failed to remove item');
    }
  };

  const handleClearCart = async () => {
    if (!userId || !token) {
      toast.error('Please login to clear cart');
      return;
    }
    try {
      // Remove all items one by one or implement a clear cart API
      for (const item of cart) {
        await dispatch(deleteCartItemAsync({ pid: item.pid, userId, token })).unwrap();
      }
      toast.success('Cart cleared');
    } catch (error) {
      toast.error(error || 'Failed to clear cart');
    }
  };

  const total = cart.reduce((sum, item) => sum + (Number(item.price || 0) * Number(item.qty || 1)), 0);

  // Show loading state while fetching
  if (loading && (!cart || cart.length === 0)) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Breadcrumb pageName={"Shopping Cart"} />
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center bg-white rounded-2xl shadow-lg p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C09578] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading cart items...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!cart || !cart.length) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Breadcrumb pageName={"Shopping Cart"} />
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center bg-white rounded-2xl shadow-lg p-12">
            <div className="mb-8">
              <div className="mx-auto w-24 h-24 bg-[#C09578] bg-opacity-10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-[#C09578]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-black mb-4">Your Cart is Empty</h2>
              <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
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
      <Breadcrumb pageName={"Shopping Cart"} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-black mb-2">Shopping Cart</h1>
              <p className="text-gray-600">{cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <button
                onClick={handleClearCart}
                disabled={loading}
                className="px-6 py-3 bg-red-50 text-red-600 font-semibold rounded-lg hover:bg-red-100 transition-colors duration-200 border border-red-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Clearing...' : 'Clear Cart'}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => {
              // Build image URL using staticImagePath if image is present
              let imageUrl = item.image || '';
              if (imageUrl && !/^https?:\/\//i.test(imageUrl)) {
                let basePath = (staticImagePath || "").replace(/\/+$/, "");
                const imagePath = String(imageUrl).replace(/^\/+/, "");
                if (basePath && imagePath) {
                  imageUrl = `${basePath}/${imagePath}`;
                } else if (imagePath) {
                  imageUrl = imagePath;
                } else {
                  imageUrl = "/no-image.png";
                }
              } else if (!imageUrl) {
                imageUrl = "/no-image.png";
              }
              return (
              <div key={item.pid} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col sm:flex-row">
                  {/* Product Image */}
                  <div className="sm:w-48 h-48 sm:h-auto bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        const currentSrc = e.target.src;
                        if (currentSrc && !currentSrc.includes('/no-image.png') && !currentSrc.includes('data:')) {
                          e.target.onerror = null;
                          e.target.src = "/no-image.png";
                        }
                      }}
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                      <div className="flex-1">
                        <div className="mb-2">
                          <span className="text-sm text-gray-500 uppercase tracking-wide">{item.category}</span>
                        </div>
                        <h3 className="text-xl font-bold text-black mb-3">{item.name}</h3>
                        
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
                            <span className="text-2xl font-bold text-black">₹{Number(item.price || 0).toLocaleString()}</span>
                            {(item.actualPrice || item.originalPrice) && (
                              <span className="text-lg text-gray-500 line-through">₹{Number(item.actualPrice || item.originalPrice || 0).toLocaleString()}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Quantity and Actions */}
                      <div className="flex flex-col sm:items-end space-y-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button 
                            onClick={() => handleQtyChange(item.pid, Math.max(1, item.qty - 1))}
                            disabled={loading}
                            className="px-4 py-2 text-gray-600 hover:text-black hover:bg-gray-100 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="px-4 py-2 text-center text-black border-x border-gray-300 min-w-[60px]">{item.qty}</span>
                          <button 
                            onClick={() => handleQtyChange(item.pid, item.qty + 1)}
                            disabled={loading}
                            className="px-4 py-2 text-gray-600 hover:text-black hover:bg-gray-100 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          </button>
                        </div>

                        {/* Item Total */}
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Item Total</p>
                          <p className="text-2xl font-bold text-black">₹{(Number(item.price || 0) * Number(item.qty || 1)).toLocaleString()}</p>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemove(item.pid)}
                          disabled={loading}
                          className="flex items-center px-4 py-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Remove from cart"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="text-xl font-bold text-black mb-6">Order Summary</h3>
              
              {/* Summary Details */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({cart.length} items)</span>
                  <span className="font-semibold text-black">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold text-black">₹{(total * 0.18).toLocaleString()}</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-black">Total</span>
                  <span className="text-black">₹{(total * 1.18).toLocaleString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link 
                  href="/checkout"
                  className="block w-full bg-[#C09578] text-white font-semibold py-4 px-6 rounded-lg hover:bg-[#A07A5A] transition-colors duration-200 shadow-lg hover:shadow-xl text-center"
                >
                  Proceed to Checkout
                </Link>
                <Link 
                  href="/online-store"
                  className="block w-full text-center border-2 border-[#C09578] text-[#C09578] font-semibold py-3 px-6 rounded-lg hover:bg-[#C09578] hover:text-white transition-colors duration-200"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Security Badge */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Secure Checkout
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-black mb-4">Need Help?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our customer support team is here to help you with any questions about your order or our products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact-us"
              className="inline-flex items-center px-8 py-4 bg-[#C09578] text-white font-semibold rounded-lg hover:bg-[#A07A5A] transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Contact Support
            </Link>
            <Link 
              href="/faq"
              className="inline-flex items-center px-8 py-4 border-2 border-[#C09578] text-[#C09578] font-semibold rounded-lg hover:bg-[#C09578] hover:text-white transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              View FAQ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
