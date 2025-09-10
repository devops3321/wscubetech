import React from 'react'

export default function ProductFilter() {
    return (
        <aside className="bg-white rounded-lg p-4 md:p-6 border w-full md:w-auto">
            <div className='overflow-y-auto max-h-96 mb-4 pb-4 border-b-2 border-gray-200'>
                <h2 className="font-bold text-2xl mb-6 font-playfair text-black">Categories</h2>
                {/* Tables */}
                <div className="mb-6">
                    <h3 className="font-bold font-playfair text-lg mb-3 text-black">Tables</h3>
                    <ul className="space-y-3">
                        <li>
                            <label className="flex items-center cursor-pointer">
                                <input type="checkbox" className="accent-blue-600 mr-2" />
                                <span className="text-gray-700">Side and End Tables</span>
                            </label>
                        </li>
                        <li>
                            <label className="flex items-center cursor-pointer">
                                <input type="checkbox" className="accent-blue-600 mr-2" />
                                <span className="text-gray-700">Nest Of Tables</span>
                            </label>
                        </li>
                        <li>
                            <label className="flex items-center cursor-pointer">
                                <input type="checkbox" className="accent-blue-600 mr-2" />
                                <span className="text-gray-700">Coffee Table Sets</span>
                            </label>
                        </li>
                        <li>
                            <label className="flex items-center cursor-pointer">
                                <input type="checkbox" className="accent-blue-600 mr-2" />
                                <span className="text-gray-700">Coffee Tables</span>
                            </label>
                        </li>
                    </ul>
                </div>
                {/* Living Storage */}
                <div className="mb-6">
                    <h3 className="font-bold font-playfair text-lg mb-3 text-black">Living Storage</h3>
                    <ul className="space-y-3">
                        <li>
                            <label className="flex items-center cursor-pointer">
                                <input type="checkbox" className="accent-blue-600 mr-2" />
                                <span className="text-gray-700">Prayer Units</span>
                            </label>
                        </li>
                        <li>
                            <label className="flex items-center cursor-pointer">
                                <input type="checkbox" className="accent-blue-600 mr-2" />
                                <span className="text-gray-700">Display Unit</span>
                            </label>
                        </li>
                        <li>
                            <label className="flex items-center cursor-pointer">
                                <input type="checkbox" className="accent-blue-600 mr-2" />
                                <span className="text-gray-700">Shoe Racks</span>
                            </label>
                        </li>
                        <li>
                            <label className="flex items-center cursor-pointer">
                                <input type="checkbox" className="accent-blue-600 mr-2" />
                                <span className="text-gray-700">Chest Of Drawers</span>
                            </label>
                        </li>
                        <li>
                            <label className="flex items-center cursor-pointer">
                                <input type="checkbox" className="accent-blue-600 mr-2" />
                                <span className="text-gray-700">Cabinets and Sideboard</span>
                            </label>
                        </li>
                        <li>
                            <label className="flex items-center cursor-pointer">
                                <input type="checkbox" className="accent-blue-600 mr-2" />
                                <span className="text-gray-700">Bookshelves</span>
                            </label>
                        </li>
                        <li>
                            <label className="flex items-center cursor-pointer">
                                <input type="checkbox" className="accent-blue-600 mr-2" />
                                <span className="text-gray-700">Tv Units</span>
                            </label>
                        </li>
                    </ul>
                </div>
                {/* Mirror */}
                <div className="mb-6">
                    <h3 className="font-bold font-playfair text-lg mb-3 text-black">Mirror</h3>
                    <ul className="space-y-3">
                        <li>
                            <label className="flex items-center cursor-pointer">
                                <input type="checkbox" className="accent-blue-600 mr-2" />
                                <span className="text-gray-700">Wooden Mirrors</span>
                            </label>
                        </li>
                    </ul>
                </div>
                {/* Sofa Cum Bed */}
                <div className="mb-6">
                    <h3 className="font-bold font-playfair text-lg mb-3 text-black">Sofa Cum Bed</h3>
                    <ul className="space-y-3">
                        <li>
                            <label className="flex items-center cursor-pointer">
                                <input type="checkbox" className="accent-blue-600 mr-2" />
                                <span className="text-gray-700">Wooden Sofa Cum Bed</span>
                            </label>
                        </li>
                    </ul>
                </div>

                {/* Sofa Sets */}
                <div className="mb-6">
                    <h3 className="font-bold font-playfair text-lg mb-3 text-black">Sofa Sets</h3>
                    <ul className="space-y-3">
                        <li>
                            <label className="flex items-center cursor-pointer">
                                <input type="checkbox" className="accent-blue-600 mr-2" />
                                <span className="text-gray-700">L Shape Sofa</span>
                            </label>
                        </li>
                        <li>
                            <label className="flex items-center cursor-pointer">
                                <input type="checkbox" className="accent-blue-600 mr-2" />
                                <span className="text-gray-700">1 Seater Sofa</span>
                            </label>
                        </li>
                        <li>
                            <label className="flex items-center cursor-pointer">
                                <input type="checkbox" className="accent-blue-600 mr-2" />
                                <span className="text-gray-700">2 Seater Sofa</span>
                            </label>
                        </li>
                        <li>
                            <label className="flex items-center cursor-pointer">
                                <input type="checkbox" className="accent-blue-600 mr-2" />
                                <span className="text-gray-700">3 Seater Sofa</span>
                            </label>
                        </li>
                        <li>
                            <label className="flex items-center cursor-pointer">
                                <input type="checkbox" className="accent-blue-600 mr-2" />
                                <span className="text-gray-700">Wooden Sofa Sets</span>
                            </label>
                        </li>
                        <li>
                            <label className="flex items-center cursor-pointer">
                                <input type="checkbox" className="accent-blue-600 mr-2" />
                                <span className="text-gray-700">Normal</span>
                            </label>
                        </li>
                    </ul>
                </div>

                {/* Swing Jhula */}
                <div className="mb-6">
                    <h3 className="font-bold font-playfair text-lg mb-3 text-black">Swing Jhula</h3>
                    <ul className="space-y-3">
                        <li>
                            <label className="flex items-center cursor-pointer">
                                <input type="checkbox" className="accent-blue-600 mr-2" />
                                <span className="text-gray-700">Wooden Jhula</span>
                            </label>
                        </li>
                    </ul>
                </div>
            </div>
            {/* Material */}
            <div className="mb-4 pb-4 border-b-2 border-gray-200 ">
                <h3 className="font-bold font-playfair text-lg mb-3 text-black">Material</h3>
                <ul className="space-y-3">
                    <li>
                        <label className="flex items-center cursor-pointer">
                            <input type="checkbox" className="accent-blue-600 mr-2" />
                            <span className="text-gray-700">Teak Wood</span>
                        </label>
                    </li>
                    <li>
                        <label className="flex items-center cursor-pointer">
                            <input type="checkbox" className="accent-blue-600 mr-2" />
                            <span className="text-gray-700">Rose Wood</span>
                        </label>
                    </li>
                    <li>
                        <label className="flex items-center cursor-pointer">
                            <input type="checkbox" className="accent-blue-600 mr-2" />
                            <span className="text-gray-700">Satin Wood</span>
                        </label>
                    </li>
                    <li>
                        <label className="flex items-center cursor-pointer">
                            <input type="checkbox" className="accent-blue-600 mr-2" />
                            <span className="text-gray-700">Sal Wood</span>
                        </label>
                    </li>
                    <li>
                        <label className="flex items-center cursor-pointer">
                            <input type="checkbox" className="accent-blue-600 mr-2" />
                            <span className="text-gray-700">Marandi Wood</span>
                        </label>
                    </li>
                    <li>
                        <label className="flex items-center cursor-pointer">
                            <input type="checkbox" className="accent-blue-600 mr-2" />
                            <span className="text-gray-700">Mahogany Wood</span>
                        </label>
                    </li>
                    <li>
                        <label className="flex items-center cursor-pointer">
                            <input type="checkbox" className="accent-blue-600 mr-2" />
                            <span className="text-gray-700">Mulberry Wood</span>
                        </label>
                    </li>
                    <li>
                        <label className="flex items-center cursor-pointer">
                            <input type="checkbox" className="accent-blue-600 mr-2" />
                            <span className="text-gray-700">JackFruit</span>
                        </label>
                    </li>
                </ul>
            </div>

            {/* Color */}
            <div className="mb-6">
                <h3 className="font-bold font-playfair text-lg mb-3 text-black">Color</h3>
                <ul className="space-y-3">
                    <li>
                        <label className="flex items-center cursor-pointer">
                            <input type="checkbox" className="accent-blue-600 mr-2" />
                            <span className="text-gray-700">Burnt Amber</span>
                        </label>
                    </li>
                    <li>
                        <label className="flex items-center cursor-pointer">
                            <input type="checkbox" className="accent-blue-600 mr-2" />
                            <span className="text-gray-700">Golden Teak</span>
                        </label>
                    </li>
                    <li>
                        <label className="flex items-center cursor-pointer">
                            <input type="checkbox" className="accent-blue-600 mr-2" />
                            <span className="text-gray-700">Carbon Black</span>
                        </label>
                    </li>
                    <li>
                        <label className="flex items-center cursor-pointer">
                            <input type="checkbox" className="accent-blue-600 mr-2" />
                            <span className="text-gray-700">Faded Oak</span>
                        </label>
                    </li>
                    <li>
                        <label className="flex items-center cursor-pointer">
                            <input type="checkbox" className="accent-blue-600 mr-2" />
                            <span className="text-gray-700">Weathered French Grey</span>
                        </label>
                    </li>
                    <li>
                        <label className="flex items-center cursor-pointer">
                            <input type="checkbox" className="accent-blue-600 mr-2" />
                            <span className="text-gray-700">Faded Ochre</span>
                        </label>
                    </li>
                    <li>
                        <label className="flex items-center cursor-pointer">
                            <input type="checkbox" className="accent-blue-600 mr-2" />
                            <span className="text-gray-700">Weathered Walnut</span>
                        </label>
                    </li>
                    <li>
                        <label className="flex items-center cursor-pointer">
                            <input type="checkbox" className="accent-blue-600 mr-2" />
                            <span className="text-gray-700">Mango Green</span>
                        </label>
                    </li>
                    <li>
                        <label className="flex items-center cursor-pointer">
                            <input type="checkbox" className="accent-blue-600 mr-2" />
                            <span className="text-gray-700">Cobalt Blue</span>
                        </label>
                    </li>
                    <li>
                        <label className="flex items-center cursor-pointer">
                            <input type="checkbox" className="accent-blue-600 mr-2" />
                            <span className="text-gray-700">Black Finish</span>
                        </label>
                    </li>
                </ul>
            </div>

            {/* Filter By Price */}
            <div className="mb-6">
                <h3 className="font-bold text-lg mb-3 text-black font-playfair">Filter By Price</h3>
                <div className="flex items-center mb-2">
                    <input
                        type="range"
                        min="0"
                        max="200000"
                        defaultValue="200000"
                        className="w-full accent-[#C09578]"
                    />
                </div>
                <div className="mb-2 text-black font-semibold">
                    Rs. 0 - Rs. 200000
                </div>
                <button className="bg-black text-white font-bold px-4 py-2 rounded hover:bg-[#C09578] cursor-pointer">Filter</button>
            </div>

        </aside>
    )
}
