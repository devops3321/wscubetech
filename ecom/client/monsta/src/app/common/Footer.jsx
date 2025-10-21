"use client";
import React, { useEffect, useState } from 'react'
import Link from 'next/link';

export default function Footer() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 1000);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className="bg-white pt-12 pb-4 border-t-2 border-[#f2f2f2]">
      <div className="max-w-7xl mx-auto px-2">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {/* Contact Us */}
          <div>
            <h3 className="font-bold font-playfair text-[22px] md:text-[25px] text-black mb-6 md:mb-8">Contact Us</h3>
            <p className="text-gray-700 mb-1 text-sm md:text-base">Address: Claritas est etiam processus dynamicus</p>
            <p className="text-gray-700 mb-1 text-sm md:text-base">Phone: 98745612330</p>
            <p className="text-gray-700 mb-4 text-sm md:text-base">Email: furnitureinfo@gmail.com</p>
            <div className="flex gap-3 flex-wrap">
              <Link href="#" className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full border border-[#e5e5e5] text-gray-500 hover:text-[#C09578]">
                <i className="fa fa-facebook"></i>
              </Link>
              <Link href="#" className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full border border-[#e5e5e5] text-gray-500 hover:text-[#C09578]">
                <i className="fa fa-instagram"></i>
              </Link>
              <Link href="#" className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full border border-[#e5e5e5] text-gray-500 hover:text-[#C09578]">
                <i className="fa fa-twitter"></i>
              </Link>
              <Link href="#" className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full border border-[#e5e5e5] text-gray-500 hover:text-[#C09578]">
                <i className="fa fa-linkedin"></i>
              </Link>
              <Link href="#" className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full border border-[#e5e5e5] text-gray-500 hover:text-[#C09578]">
                <i className="fa fa-youtube"></i>
              </Link>
              <Link href="#" className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full border border-[#e5e5e5] text-gray-500 hover:text-[#C09578]">
                <i className="fa fa-telegram"></i>
              </Link>
            </div>
          </div>
          {/* Information */}
          <div className='ms-1'>
            <h3 className="font-bold font-playfair text-[22px] md:text-[25px] text-black mb-6 md:mb-8">Information</h3>
            <ul className="space-y-2">
              <li><Link href={"/about-us"} className="text-gray-700 hover:text-[#C09578] text-sm md:text-base">About Us</Link></li>
              <li><Link href={"/contact-us"} className="text-gray-700 hover:text-[#C09578] text-sm md:text-base">Contact Us</Link></li>
              <li><Link href={"/faq"} className="text-gray-700 hover:text-[#C09578] text-sm md:text-base">Frequently Asked Questions</Link></li>
              <li><Link href={"/terms-of-use"} className="text-gray-700 hover:text-[#C09578] text-sm md:text-base">Terms of Use</Link></li>
            </ul>
          </div>
          {/* My Account */}
          <div>
            <h3 className="font-bold font-playfair text-[22px] md:text-[25px] text-black mb-6 md:mb-8">My Account</h3>
            <ul className="space-y-2">
              <li><Link href="/dashboard" className="text-gray-700 hover:text-[#C09578] text-sm md:text-base">My Dashboard</Link></li>
              <li><Link href="/wishlist" className="text-gray-700 hover:text-[#C09578] text-sm md:text-base">Wishlist</Link></li>
              <li><Link href="/cart" className="text-gray-700 hover:text-[#C09578] text-sm md:text-base">Cart</Link></li>
              <li><Link href="/checkout" className="text-gray-700 hover:text-[#C09578] text-sm md:text-base">Checkout</Link></li>
            </ul>
          </div>
          {/* Top Rated Products */}
          <div>
            <h3 className="font-bold font-playfair text-[22px] md:text-[25px] text-black mb-6 md:mb-8">Top Rated Products</h3>
            <div className="mb-4 flex items-center gap-3 border-b border-[#e5e5e5] pb-2">
              <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1621171973378Isaac%20Chest%20of%20Drawer_.jpg" alt="Isaac Chest of Drawer" className="w-14 h-12 object-cover rounded" />
              <div>
                <div className="text-xs text-gray-500">Chest Of Drawers</div>
                <a href="#" className="text-[#222] font-medium font-playfair text-sm hover:text-[#C09578]">Isaac Chest of Drawer</a>
                <div className='mt-2'>
                  <span className="line-through text-xs text-gray-400 mr-2">Rs. 32,000</span>
                  <span className="text-[#C09578] font-bold text-sm">Rs. 25,000</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617816851291Calina%20Swing%20Jhula__.jpg" alt="Calina Swing Jhula" className="w-14 h-12 object-cover rounded" />
              <div>
                <div className="text-xs text-gray-500">Wooden Jhula</div>
                <Link href="#" className="text-[#222] font-medium font-playfair text-sm hover:text-[#C09578]">Calina Swing Jhula</Link>
                <div className='mt-2'>
                  <span className="line-through text-xs text-gray-400 mr-2">Rs. 65,000</span>
                  <span className="text-[#C09578] font-bold text-sm">Rs. 58,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer Links */}
        <div className="border-t-2 border-b-2 border-[#e5e5e5] text-[16px] md:text-[18px] font-rubik font-semibold py-6 flex flex-wrap justify-center gap-4 md:gap-8 mb-10">
          <Link href="/" className="text-gray-700 hover:text-[#C09578]">Home</Link>
          <Link href="/online-store" className="text-gray-700 hover:text-[#C09578]">Online Store</Link>
          <Link href={"/privacy-policy"} className="text-gray-700 hover:text-[#C09578]">Privacy Policy</Link>
          <Link href={"/terms-of-use"} className="text-gray-700 hover:text-[#C09578]">Terms Of Use</Link>
        </div>
        {/* Copyright & Payment */}
        <div className="text-center text-gray-500 text-base md:text-lg mb-6">
          All Rights Reserved By Monsta | © 2025
        </div>
        <div className="flex justify-center gap-2 md:gap-4 mb-5 flex-wrap">
          <img 
          src="https://wscubetech.co/Assignments/furniture/public/frontend/img/icon/papyel2.png" 
          alt="Skrill" className="h-8" />
        </div>
        {/* Scroll to top button */}
        {showScroll && (
          <button
            className="fixed bottom-6 right-4 md:bottom-8 md:right-8 bg-[#222] text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-[#C09578] transition-colors cursor-pointer"
            aria-label="Scroll to top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <i className="fa fa-angle-up text-2xl animate-bounce-up"></i>
          </button>
        )}
      </div>
    </footer>
  )
}

