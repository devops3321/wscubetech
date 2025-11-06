"use client";
import React, { useState, useMemo, useEffect } from 'react';
import ProductCard from '@/app/common/ProductCard';

// Accept productTypes and productsByType as props
export default function FeaturedProducts({ productTypes = [], productsByType = {}, staticPath = "" }) {
  // Use the first productType as the default active tab
  const [activeTab, setActiveTab] = useState(productTypes[0] || '');
  const [loading, setLoading] = useState(productTypes.length === 0 || Object.keys(productsByType).length === 0);

  // Memoize the tab list for rendering
  const tabs = useMemo(() => productTypes.map(pt => ({ label: pt, value: pt })), [productTypes]);

  // Get products for the active tab
  const products = productsByType[activeTab] || [];

  useEffect(() => {
    if (productTypes.length > 0 && Object.keys(productsByType).length > 0) {
      setLoading(false);
    }
  }, [productTypes, productsByType]);

  // Skeleton loader component
  const SkeletonCard = () => (
    <div className="skeleton-card" style={{ width: 260, minWidth: 260, maxWidth: 260, height: 380, minHeight: 380, maxHeight: 380, display: 'flex', flexDirection: 'column', margin: '0 auto' }}>
      <div className="skeleton" style={{ width: '100%', height: 160, marginBottom: '0.5rem' }}></div>
      <div className="px-5 py-4 flex flex-col h-full justify-between" style={{ flex: 1 }}>
        <div>
          <div className="skeleton mb-2" style={{ height: '14px', width: '60%', margin: '0 auto', borderRadius: '4px' }}></div>
          <div className="skeleton mb-3" style={{ height: '20px', width: '90%', margin: '0 auto 0.75rem', borderRadius: '4px' }}></div>
          <div className="skeleton mb-3" style={{ height: '20px', width: '70%', margin: '0 auto', borderRadius: '4px' }}></div>
          <div className="skeleton mb-2" style={{ height: '2px', width: '100%', borderRadius: '4px' }}></div>
          <div className="flex justify-center items-center gap-2 mb-5">
            <div className="skeleton" style={{ height: '16px', width: '60px', borderRadius: '4px' }}></div>
            <div className="skeleton" style={{ height: '16px', width: '80px', borderRadius: '4px' }}></div>
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-auto">
          <div className="skeleton" style={{ height: '36px', width: '36px', borderRadius: '4px' }}></div>
          <div className="skeleton" style={{ height: '36px', width: '120px', borderRadius: '4px' }}></div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-10 bg-white">
      <div> <hr className="border-t border-[#f2f2f2] w-full border-2 mb-10" /> </div>
      <div className="max-w-6xl mx-auto">
        {/* Tabs with line */}
        <div className="relative flex flex-col items-center mb-8">
          {/* Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[#f2f2f2] z-0" style={{ transform: 'translateY(-50%)' }} />
          {/* Tabs */}
          <div className="relative flex z-10 bg-transparent">
            {tabs.map((tab, idx) => (
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
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 cursor-pointer">
            {products.map((product, idx) => {
              let imageUrl = product.image || product.productImage || '';
              if (imageUrl && !/^https?:\/\//i.test(imageUrl)) {
                let basePath = staticPath || product.staticPath || "";
                if (basePath.endsWith("/")) basePath = basePath.slice(0, -1);
                imageUrl = `${basePath}/${imageUrl}`;
              }
              // Map API fields to ProductCard props
              const cardProps = {
                ...product, // spread first
                id: product._id || product.id || idx, // id last so it always wins
                category: product.subSubCategory?.name || product.subCategory?.name || product.parentCategory?.name || '',
                name: product.productName || product.name || '',
                image: imageUrl,
                oldPrice: product.actualPrice ? `Rs. ${product.actualPrice}` : '',
                price: product.salePrice ? `Rs. ${product.salePrice}` : ''
              };
              const productId = product._id || product.id || idx;
              return <ProductCard key={productId} {...cardProps} />;
            })}
          </div>
        )}
      </div>
    </section>
  );
}