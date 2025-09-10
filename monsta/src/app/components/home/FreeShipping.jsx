"use client";
import React from 'react'

export default function FreeShipping() {
  return (
    <div className="bg-[#F8F9F9] py-15 border-t-2 border-b-2 border-gray-300">
      <div className="max-w-5xl mx-auto flex justify-center items-center gap-10 md:gap-20">
        {/* Free Shipping */}
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 flex items-center justify-center rounded-full border-2 border-[#222] mb-4">
            <span className="text-3xl group">
              <i className="fa fa-globe text-black transition-colors duration-200 group-hover:text-[#C09578]" aria-hidden="true"></i>
            </span>
          </div>
          <h3 className="font-playfair font-bold text-xl mb-2 text-black" >Free Shipping</h3>
          <p className="text-gray-600">Free shipping on all order</p>
        </div>
        {/* Money Return */}
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 flex items-center justify-center rounded-full border-2 border-[#222] mb-4">
            <span className="text-3xl group">
              <i className="fa fa-check-circle-o text-black transition-colors duration-200 group-hover:text-[#C09578]" aria-hidden="true"></i>
            </span>
          </div>
          <h3 className="font-playfair font-bold text-xl text-black mb-2" >Money Return</h3>
          <p className="text-gray-600">Back guarantee under 7 days</p>
        </div>
        {/* Online Support */}
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 flex items-center justify-center rounded-full border-2 border-[#222] mb-4">
            <span className="text-3xl group">
              <i className="fa fa-clock-o text-black transition-colors duration-200 group-hover:text-[#C09578]" aria-hidden="true"></i>
            </span>
          </div>
          <h3 className="font-playfair font-bold text-xl text-black mb-2" >Online Support</h3>
          <p className="text-gray-600">Support online 24 hours a day</p>
        </div>
      </div>
      <style jsx global>{`
        .group:hover .fa {
          color: #C09578 !important;
        }
      `}</style>
    </div>
  )
}
