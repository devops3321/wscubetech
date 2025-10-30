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
    <div
      className="bg-white rounded-lg shadow-lg overflow-hidden mx-auto mb-3 cursor-pointer"
      style={{ width: 260, minWidth: 260, maxWidth: 260, height: 380, minHeight: 380, maxHeight: 380, display: 'flex', flexDirection: 'column' }}
    >
      {/* Product Image */}
      <div
        className="relative mb-2 bg-gray-100 flex items-center justify-center"
        style={{ width: '100%', height: 160 }}
      >
        {image ? (
          <img
            src={image}
            alt={name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={e => {
              e.target.onerror = null;
              e.target.style.display = 'none';
            }}
          />
        ) : null}
      </div>
      {/* Product Info */}
      <div className="px-5 py-4 text-center flex flex-col h-full justify-between" style={{ flex: 1 }}>
        <div>
          <div className="text-gray-500 text-sm font-playfair text-black mb-1">{category}</div>
          <div className="font-bold text-lg mb-3 font-playfair text-black" style={{ minHeight: 44, maxHeight: 44, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{name}</div>
          <div> <hr className='border-t border-[#f2f2f2] w-full border-2 mb-2' /></div>
          <div className="flex justify-center items-center gap-2 mb-5">
            <span className="text-gray-400 line-through text-base">{oldPrice}</span>
            <span className="text-[#C09578] font-semibold text-base">{price}</span>
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-auto">
          {/* Solid Heart Icon for Wishlist */}
          <button className="border border-gray-300 rounded px-3 py-2 bg-white flex items-center justify-center hover:bg-gray-100 transition-colors duration-150 group cursor-pointer" aria-label="Add to Wishlist">
            <FaHeart className="text-black group-hover:text-[#C09578] text-[22px] transition-colors duration-150" />
          </button>
          <button className="border border-gray-300 rounded px-5 py-2 bg-[#f7f7f7] text-gray-700 font-medium hover:bg-[#C09578] hover:text-white transition-colors duration-150 cursor-pointer">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  )
}
