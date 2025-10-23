"use client";
import React, { useState } from 'react';
import Breadcrumb from '../common/Breadcrumb'

const demoCart = [
  {
    id: 1,
    name: "Modern Wooden Chair",
    image: "https://wscubetech.co/Assignments/furniture/public/frontend/img/product/1.jpg",
    price: 2499,
    qty: 1
  },
  {
    id: 2,
    name: "Elegant Sofa",
    image: "https://wscubetech.co/Assignments/furniture/public/frontend/img/product/2.jpg",
    price: 7999,
    qty: 2
  }
];

export default function Cart() {
  // Set to [] for empty cart, or demoCart for demo data
  const [cart, setCart] = useState(demoCart);

  const handleQtyChange = (id, newQty) => {
    setCart(cart =>
      cart.map(item =>
        item.id === id ? { ...item, qty: newQty < 1 ? 1 : newQty } : item
      )
    );
  };

  const handleRemove = (id) => {
    setCart(cart => cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (!cart.length) {
    return (
      <div>
        <Breadcrumb pageName={"Shopping Cart"} />
        <div>
          <img
            src='https://wscubetech.co/Assignments/furniture/public/frontend/img/icon/my-Order.jpg'
            alt=''
            className='justify-center mx-auto mb-5'
          />
          <p className='text-black text-lg text-center mb-10'>Your shopping cart is empty!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <Breadcrumb pageName={"Shopping Cart"} />
      <div className="max-w-4xl mx-auto mt-8 bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-6 text-black">Your Cart</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-black">Product</th>
                <th className="py-2 px-4 text-black">Name</th>
                <th className="py-2 px-4 text-black">Price</th>
                <th className="py-2 px-4 text-black">Quantity</th>
                <th className="py-2 px-4 text-black">Total</th>
                <th className="py-2 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td className="py-3 px-4 font-medium text-black">{item.name}</td>
                  <td className="py-3 px-4 text-purple-700 font-semibold text-black">₹{item.price}</td>
                  <td className="py-3 px-4">
                    <input
                      type="number"
                      min="1"
                      value={item.qty}
                      onChange={e => handleQtyChange(item.id, parseInt(e.target.value) || 1)}
                      className="w-16 border rounded px-2 py-1 text-center text-black"
                    />
                  </td>
                  <td className="py-3 px-4 font-semibold text-black">₹{item.price * item.qty}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-red-500 hover:text-red-700 font-bold"
                      title="Remove"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-6">
          <div className="bg-gray-100 rounded-lg p-4 w-full max-w-xs">
            <div className="flex justify-between mb-2">
              <span className="font-medium text-black">Subtotal</span>
              <span className="font-semibold text-black">₹{total}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-black">Shipping</span>
              <span className="text-black">Free</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span className="text-black">Total</span>
              <span className="text-black">₹{total}</span>
            </div>
            <button
              className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg shadow transition-all duration-200"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
