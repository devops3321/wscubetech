import React from 'react'

export default function NewsLetter() {
  return (
    <div className="bg-[#F8F9F9] py-12 border-2 border-gray-200">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl text-black md:text-3xl font-bold mb-4 font-playfair">Our Newsletter</h2>
        <p className="text-gray-600 mb-8">Get E-mail updates about our latest shop and special offers.</p>
        <form className="flex flex-col sm:flex-row items-center justify-center gap-0">
          <input
            type="email"
            placeholder="Email address..."
            className="w-full sm:w-[800px] px-4 py-4 rounded-l-md border border-[#e5e5e5] focus:outline-none text-gray-700 bg-white"
          />
          <button
            type="submit"
            className="bg-[#C09578] text-white font-bold px-10 py-4 rounded-r-md text-base sm:text-lg"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  )
}
