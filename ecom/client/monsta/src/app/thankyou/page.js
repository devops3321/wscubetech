"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getOrderByOrderNumberAPI } from "@/apiServices/orderService";
import { useSelector } from "react-redux";

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const orderId = searchParams.get("orderId");
  const user = useSelector(state => state.myUser.user);
  const userId = user?.userId || user?._id || user?.id;
  const token = useSelector(state => state.myUser.token);
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (orderNumber && userId && token) {
      setLoading(true);
      getOrderByOrderNumberAPI(orderNumber, userId, token)
        .then(response => {
          if (response.success) {
            setOrder(response.order);
          }
        })
        .catch(error => {
          console.error("Error fetching order:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [orderNumber, userId, token]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f8e7d7] to-[#fff] px-4 py-12">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-2xl w-full text-center">
        <svg
          className="mx-auto mb-6"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle cx="12" cy="12" r="12" fill="#C09578" />
          <path
            d="M7 13l3 3 7-7"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h1 className="text-3xl font-bold text-[#C09578] mb-4 font-playfair">
          {orderNumber ? "Thank You for Your Order!" : "Thank You!"}
        </h1>
        
        {loading ? (
          <div className="py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C09578] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading order details...</p>
          </div>
        ) : order ? (
          <div className="text-left mb-6">
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-black mb-4 font-playfair">Order Details</h2>
              <div className="space-y-2 text-gray-700">
                <p><span className="font-semibold">Order Number:</span> {order.orderNumber}</p>
                <p><span className="font-semibold">Order Status:</span> 
                  <span className={`ml-2 px-3 py-1 rounded-full text-sm ${
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'processing' ? 'bg-purple-100 text-purple-800' :
                    order.status === 'shipped' ? 'bg-indigo-100 text-indigo-800' :
                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </p>
                <p><span className="font-semibold">Total Amount:</span> ₹{order.total.toLocaleString()}</p>
                <p><span className="font-semibold">Payment Method:</span> {order.paymentMethod === 'cash_on_delivery' ? 'Cash on Delivery' : order.paymentMethod}</p>
                <p><span className="font-semibold">Payment Status:</span> 
                  <span className={`ml-2 px-3 py-1 rounded-full text-sm ${
                    order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                    order.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                  </span>
                </p>
                {order.orderNotes && (
                  <p><span className="font-semibold">Order Notes:</span> {order.orderNotes}</p>
                )}
              </div>
            </div>
            
            {order.items && order.items.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-bold text-black mb-3 font-playfair">Order Items</h3>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-2">
                      <span className="text-gray-700">{item.name} × {item.qty}</span>
                      <span className="font-semibold text-black">
                        ₹{((item.salePrice || item.price) * item.qty).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : orderNumber ? (
          <p className="text-gray-700 mb-6">
            Your order has been placed successfully!<br />
            Order Number: <span className="font-bold">{orderNumber}</span>
          </p>
        ) : (
          <p className="text-gray-700 mb-6">
            Your account has been created successfully.<br />
            We're excited to have you join our community.
          </p>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {orderNumber && (
            <Link
              href="/dashboard"
              className="inline-block bg-[#C09578] text-white font-bold px-6 py-3 rounded-full shadow hover:bg-[#a67c52] transition cursor-pointer"
            >
              View My Orders
            </Link>
          )}
          <Link
            href="/online-store"
            className="inline-block border-2 border-[#C09578] text-[#C09578] font-bold px-6 py-3 rounded-full hover:bg-[#C09578] hover:text-white transition cursor-pointer"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
      <div className="mt-8 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Monsta. All rights reserved.
      </div>
    </div>
  );
}
