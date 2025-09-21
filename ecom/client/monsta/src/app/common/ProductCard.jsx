import React from 'react'
import { FaHeart } from 'react-icons/fa'

export default function ProductCard({
  category,
  name,
  image,
  oldPrice,
  price,
}) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-[260px] mx-auto">
      {/* Product Image */}
      <div className="relative w-full h-[160px] mb-2 bg-gray-100 flex items-center justify-center">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Product Info */}
      <div className="px-5 py-4 text-center">
        <div className="text-gray-500 text-sm mb-4">{category}</div>
        <div className="font-bold text-lg mb-3 font-playfair text-black">{name}</div>
        <div> <hr className='border-t border-[#f2f2f2] w-full border-2 mb-2' /></div>
        <div className="flex justify-center items-center gap-2 mb-5">
          <span className="text-gray-400 line-through text-base">{oldPrice}</span>
          <span className="text-[#C09578] font-semibold text-base">{price}</span>
        </div>
        <div className="flex justify-center gap-2">
          {/* Solid Heart Icon for Wishlist */}
          <button className="border border-gray-300 rounded px-3 py-2 bg-white flex items-center justify-center hover:bg-gray-100 transition-colors duration-150 group" aria-label="Add to Wishlist">
            <FaHeart className="text-black group-hover:text-[#C09578] text-[22px] transition-colors duration-150" />
          </button>
          <button className="border border-gray-300 rounded px-5 py-2 bg-[#f7f7f7] text-gray-700 font-medium hover:bg-[#C09578] hover:text-white transition-colors duration-150">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  )
}
