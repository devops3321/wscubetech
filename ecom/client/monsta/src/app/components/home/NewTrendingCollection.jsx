import React from 'react'

export default function NewTrendingCollection() {
    return (
        <section>
            <div className="w-full h-[400px] overflow-hidden relative group">
                <img
                    src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/e9234fa4-3ff6-4a6e-a00e-0c9ff26e7b20-1670180400.jpg"
                    alt=""
                    className="w-full h-[500px] object-cover"
                />
                {/* Overlay content aligned left */}
                <div className="absolute inset-0 flex flex-col justify-center items-start pl-16">
                    <div className="bg-transparent bg-opacity-80 p-5 rounded transform transition-transform duration-300 group-hover:scale-110">
                        <h2 className="text-5xl text-black font-playfair font-bold mb-4">New Trending Collection</h2>
                        <p className="text-gray-600">We Believe That Good Design is Always in Season</p>
                        <button className="mt-15 bg-transparent text-[#C09578] font-bold uppercase px-20 py-3 rounded border-2 border-[#C09578] transition-transform duration-300 group-hover:scale-110 cursor-pointer">
                            Shop Now
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
