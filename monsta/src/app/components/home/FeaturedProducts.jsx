"use client";
import React, { useState } from 'react';
import ProductCard from '@/app/common/ProductCard';

const TABS = [
  { label: 'Featured', value: 'featured' },
  { label: 'New Arrivals', value: 'new' },
  { label: 'Onsale', value: 'onsale' },
];

const PRODUCTS = {
  featured: [
    {
      category: 'Nest Of Tables',
      name: 'Caroline Study Tables',
      image: 'https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829052195Caroline%20Study%20Tables__.jpg',
      oldPrice: 'Rs. 3,000',
      price: 'Rs. 2,500',
    },
    {
      category: 'Coffee Tables',
      name: 'Evan Coffee Table',
      image: 'https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829892944Evan%20Coffee%20Table__.jpg',
      oldPrice: 'Rs. 2,600',
      price: 'Rs. 2,300',
    },
    {
      category: 'Shoe Racks',
      name: 'Gloria Shoe Racks',
      image: 'https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1620666061907Gloria%20Shoe%20Racks_.jpg',
      oldPrice: 'Rs. 3,400',
      price: 'Rs. 2,900',
    },
    {
      category: 'Bookshelves',
      name: 'Erica Bookshelves',
      image: 'https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1620077669499Erica%20Bookshelfs_brown.jpg',
      oldPrice: 'Rs. 38,000',
      price: 'Rs. 30,000',
    },
    {
      category: 'Wooden Sofa Cum Bed',
      name: 'Sapien Sofa Cum Bed',
      image: 'https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1615277326496Sapien%20Sofa%20Cum%20Bed__.jpg',
      oldPrice: 'Rs. 64,000',
      price: 'Rs. 54,000',
    },
    {
      category: '2 Seater Sofa',
      name: 'Ganthur Sheesham Wood Sofa Set',
      image: 'https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1615225341228Ganthur%20Sheesham%20Wood%20Sofa%20Set___.jpg',
      oldPrice: 'Rs. 8,000',
      price: 'Rs. 7,600',
    },
    {
      category: 'Wooden Jhula',
      name: 'Calina Swing Jhula',
      image: 'https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617816851291Calina%20Swing%20Jhula__.jpg',
      oldPrice: 'Rs. 65,000',
      price: 'Rs. 58,000',
    },
  ],
  new: [
    {
      category: 'Side and End Tables',
      name: 'Hrithvik Stool',
      image: 'https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617981904164Hrithvik%20Stool__.jpg',
      oldPrice: 'Rs. 7,000',
      price: 'Rs. 6,000',
    },
    {
      category: 'Coffee Table Sets',
      name: 'Godfrey Coffee Table Set',
      image: 'https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617828302132Godfrey%20Coffee%20Table%20Set__.jpg',
      oldPrice: 'Rs. 3,000',
      price: 'Rs. 2,200',
    },
    {
      category: 'Display Unit',
      name: 'Dorian Shoe Rack',
      image: 'https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1608312103476Dorian%20Shoe%20Rack_.jpg',
      oldPrice: 'Rs. 7,500',
      price: 'Rs. 2,800',
    },
    {
      category: 'Cabinets and Sideboard',
      name: 'Louise Cabinet',
      image: 'https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/16253167208651620078433247Louise%20Cabinet_.jpg',
      oldPrice: 'Rs. 28,000',
      price: 'Rs. 23,000',
    },
    {
      category: 'Wooden Mirrors',
      name: 'Winona Mirror',
      image: 'https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617989633213Winona%20Mirror__.jpg',
      oldPrice: 'Rs. 2,000',
      price: 'Rs. 1,500',
    },
    {
      category: '1 Seater Sofa',
      name: 'Yuvi Sheesham Wood Sofa Set',
      image: 'https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1663411513681Group%201.jpg',
      oldPrice: 'Rs. 10,000',
      price: 'Rs. 7,600',
    },
    {
      category: 'Wooden Sofa Sets',
      name: 'Grace Sheesham Wood Sofa Set',
      image: 'https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1663996596738Group%201.jpg',
      oldPrice: 'Rs. 90,000',
      price: 'Rs. 72,000',
    },
  ],
  onsale: [
    {
      category: 'Prayer Units',
      name: 'Hardwell Temple Prayer Unit',
      image: 'https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/16253179270591620747711033Hardwell%20Temple%20Prayer%20Unit__.jpg',
      oldPrice: 'Rs. 10,000',
      price: 'Rs. 9,400',
    },
    {
      category: 'Chest Of Drawers',
      name: 'Isaac Chest Of Drawer',
      image: 'https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1621171973378Isaac%20Chest%20of%20Drawer_.jpg',
      oldPrice: 'Rs. 32,000',
      price: 'Rs. 25,000',
    },
    {
      category: 'Tv Units',
      name: 'Leo TV Cabinets',
      image: 'https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1619988418966Leo%20TV%20Cabinets.jpg',
      oldPrice: 'Rs. 26,000',
      price: 'Rs. 21,000',
    },
    {
      category: 'L Shape Sofa',
      name: 'Harper L Shaped Wooden Sofa With Drawer',
      image: 'https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1661762520951Group%201.jpg',
      oldPrice: 'Rs. 85,000',
      price: 'Rs. 76,000',
    },
    {
      category: '3 Seater Sofa',
      name: 'Victoria Sheesham Wood Sofa Set',
      image: 'https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1661502549484Group%201.jpg',
      oldPrice: 'Rs. 8,000',
      price: 'Rs. 7,000',
    },
  ],
};

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState('featured');

  return (
    <section className="py-10 bg-white">
        <div> <hr className="border-t border-[#f2f2f2] w-full border-2 mb-10"  /> </div>
      <div className="max-w-6xl mx-auto">
        {/* Tabs with line */}
        <div className="relative flex flex-col items-center mb-8">
          {/* Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[#f2f2f2] z-0" style={{ transform: 'translateY(-50%)' }} />
          {/* Tabs */}
          <div className="relative flex z-10 bg-transparent">
            {TABS.map((tab, idx) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-10 py-4 text-xl font-playfair font-bold border border-[#e5e5e5] border-b-0 rounded-t transition-colors duration-150
                  ${activeTab === tab.value
                    ? 'text-[#C09578] bg-white border-[#C09578] font-bold'
                    : 'text-black bg-white hover:text-[#C09578]' }
                  ${idx === 0 ? 'ml-0' : '-ml-px'}
                `}
                style={{
                  boxShadow: activeTab === tab.value ? '0 2px 0 0 #C09578' : 'none',
                  borderBottom: activeTab === tab.value ? '2px solid #C09578' : '1px solid #e5e5e5',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {PRODUCTS[activeTab].map((product, idx) => (
            <ProductCard key={idx} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}