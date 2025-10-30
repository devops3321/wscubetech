"use client";
import React, { useState } from 'react';
import ProductCard from '@/app/common/ProductCard';


const TABS = [
  { label: 'Featured', value: 'featured' },
  { label: 'New Arrivals', value: 'newArrivals' },
  { label: 'On Sale', value: 'onSale' },
];

export default function FeaturedProducts({ featuredProducts = [], newArrivalsProducts = [], onSaleProducts = [], staticPath = "" }) {
  const [activeTab, setActiveTab] = useState('featured');

  const tabProductMap = {
    featured: featuredProducts,
    newArrivals: newArrivalsProducts,
    onSale: onSaleProducts,
  };

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
                className={`px-10 py-4 text-xl font-playfair font-bold border border-[#e5e5e5] border-b-0 rounded-t transition-colors duration-150 cursor-pointer
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 cursor-pointer">
          {tabProductMap[activeTab]?.map((product, idx) => {
            let imageUrl = product.image || product.productImage || '';
            if (imageUrl && !/^https?:\/\//i.test(imageUrl)) {
              let basePath = staticPath || product.staticPath || "";
              if (basePath.endsWith("/")) basePath = basePath.slice(0, -1);
              imageUrl = `${basePath}/${imageUrl}`;
            }
            // Map API fields to ProductCard props
            const cardProps = {
              category: product.subSubCategory?.name || product.subCategory?.name || product.parentCategory?.name || '',
              name: product.productName || product.name || '',
              image: imageUrl,
              oldPrice: product.actualPrice ? `Rs. ${product.actualPrice}` : '',
              price: product.salePrice ? `Rs. ${product.salePrice}` : '',
              ...product // pass all other fields as well
            };
            return <ProductCard key={idx} {...cardProps} />;
          })}
        </div>
      </div>
    </section>
  );
}