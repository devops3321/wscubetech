"use client";
import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import ProductCard from '../common/ProductCard';
import { getAllProducts } from '@/apiServices/productService';

export default function ProductListing({ initialProducts = [], initialPagination = {}, initialSort = 'newest', staticImagePath = '' }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState(initialSort);
  const [pagination, setPagination] = useState({
    page: initialPagination.page || 1,
    limit: initialPagination.limit || 12,
    totalCount: initialPagination.totalCount || 0,
    totalPage: initialPagination.totalPage || 1
  });
  const [staticPath, setStaticPath] = useState(staticImagePath);

  // Fetch products when filters/sort/page change
  useEffect(() => {
    let isMounted = true;
    let abortController = new AbortController();

    const fetchProducts = async () => {
      if (!isMounted) return;
      
      setLoading(true);
      try {
        // Get current page from URL, not state (to stay in sync)
        const urlPage = parseInt(searchParams.get('page') || '1', 10);
        const urlLimit = parseInt(searchParams.get('limit') || '12', 10);
        const urlSortBy = searchParams.get('sortBy') || 'newest';
        
        // Get all filter values from URL
        const materialArray = searchParams.getAll('material').filter(id => id);
        const colorArray = searchParams.getAll('color').filter(id => id);
        
        const params = {
          page: urlPage,
          limit: urlLimit,
          sortBy: urlSortBy
        };

        // Only add non-empty filter values
        const search = searchParams.get('search');
        if (search && search.trim()) {
          params.search = search.trim();
        }

        const category = searchParams.get('category');
        if (category && category.trim()) {
          params.category = category.trim();
        }

        const subcategory = searchParams.get('subcategory');
        if (subcategory && subcategory.trim()) {
          params.subcategory = subcategory.trim();
        }

        const subsubcategory = searchParams.get('subsubcategory');
        if (subsubcategory && subsubcategory.trim()) {
          params.subsubcategory = subsubcategory.trim();
        }

        // Add material and color arrays only if they have values
        if (materialArray.length > 0) {
          params.material = materialArray;
        }
        if (colorArray.length > 0) {
          params.color = colorArray;
        }

        const minPrice = searchParams.get('minPrice');
        if (minPrice && minPrice.trim()) {
          params.minPrice = minPrice.trim();
        }

        const maxPrice = searchParams.get('maxPrice');
        if (maxPrice && maxPrice.trim()) {
          params.maxPrice = maxPrice.trim();
        }
        
        const response = await getAllProducts(params);

        // Check if component is still mounted before updating state
        if (!isMounted) return;

        if (response && (response.status !== false) && response.data) {
          setProducts(response.data || []);
          setPagination({
            page: response.page || urlPage,
            limit: response.limit || urlLimit,
            totalCount: response.totalCount || 0,
            totalPage: response.totalPage || 1
          });
          if (response.staticPath) {
            setStaticPath(response.staticPath);
          }
          // Sync sortBy state with URL
          if (urlSortBy !== sortBy) {
            setSortBy(urlSortBy);
          }
        } else {
          // Handle error response
          setProducts([]);
          setPagination(prev => ({ ...prev, totalCount: 0, totalPage: 1 }));
        }
      } catch (error) {
        // Only log error if component is still mounted and not aborted
        // Also ignore browser extension errors
        if (isMounted && !abortController.signal.aborted) {
          // Ignore browser extension errors
          if (error?.message?.includes('message channel closed') || 
              error?.message?.includes('listener indicated an asynchronous response')) {
            // This is likely a browser extension error, not our code
            return;
          }
          setProducts([]);
          setPagination(prev => ({ ...prev, totalCount: 0, totalPage: 1 }));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    // Cleanup function
    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [searchParams.toString()]); // Use toString() to detect URL changes - Next.js requires this

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    setSortBy(newSort);
    const params = new URLSearchParams(searchParams.toString());
    params.set('sortBy', newSort);
    params.set('page', '1'); // Reset to first page on sort change
    router.push(`/online-store?${params.toString()}`);
  };

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`/online-store?${params.toString()}`);
  };

  const getSortLabel = (value) => {
    switch (value) {
      case 'newest': return 'Newest First';
      case 'oldest': return 'Oldest First';
      case 'priceLow': return 'Price: Low to High';
      case 'priceHigh': return 'Price: High to Low';
      case 'nameAsc': return 'Product Name: A to Z';
      case 'nameDesc': return 'Product Name: Z to A';
      default: return 'Sort By';
    }
  };

  const getImageUrl = (product) => {
    let imageUrl = product.productImage || (product.productImages && product.productImages[0]) || '';
    if (imageUrl && !/^https?:\/\//i.test(imageUrl)) {
      let basePath = (staticPath || "").replace(/\/+$/, "");
      const imagePath = String(imageUrl).replace(/^\/+/, "");
      if (basePath && imagePath) {
        imageUrl = `${basePath}/${imagePath}`;
      } else if (imagePath) {
        imageUrl = imagePath;
      } else {
        imageUrl = "/no-image.png";
      }
    } else if (!imageUrl) {
      imageUrl = "/no-image.png";
    }
    return imageUrl;
  };

  const getCategoryName = (product) => {
    return product.parentCategory?.categoryName || product.parentCategory?.name || product.subCategory?.subcategoryName || product.subCategory?.name || "Category";
  };

  const getPrice = (product) => {
    const salePrice = product.salePrice || 0;
    const actualPrice = product.actualPrice || salePrice;
    return {
      salePrice,
      actualPrice,
      displayPrice: salePrice > 0 ? `Rs. ${salePrice.toLocaleString()}` : `Rs. ${actualPrice.toLocaleString()}`,
      displayOldPrice: salePrice > 0 && actualPrice > salePrice ? `Rs. ${actualPrice.toLocaleString()}` : null
    };
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-2 md:px-4">
      {/* Sort & Results Row */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-2 border-gray-200 p-4 rounded gap-4">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-black font-semibold font-playfair">Sort By :</span>
          <select 
            value={sortBy} 
            onChange={handleSortChange}
            className="border px-3 py-2 rounded text-black w-full md:w-auto cursor-pointer"
            disabled={loading}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <optgroup label="Price">
              <option value="priceLow">Sort by price: low to high</option>
              <option value="priceHigh">Sort by price: high to low</option>
            </optgroup>
            <optgroup label="Name">
              <option value="nameAsc">Product Name: A to Z</option>
              <option value="nameDesc">Product Name: Z to A</option>
            </optgroup>
          </select>
        </div>
        <div className="text-black w-full md:w-auto text-right">
          {loading ? (
            <span>Loading...</span>
          ) : (
            <span>
              Showing {((pagination.page - 1) * pagination.limit) + 1}-{Math.min(pagination.page * pagination.limit, pagination.totalCount)} of {pagination.totalCount} results
            </span>
          )}
        </div>
      </div>

      {/* Loading State - Skeleton Loaders */}
      {loading && products.length === 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="skeleton-card" style={{ width: 260, minWidth: 260, maxWidth: 260, height: 380, minHeight: 380, maxHeight: 380, display: 'flex', flexDirection: 'column', margin: '0 auto' }}>
              {/* Image Skeleton */}
              <div className="skeleton" style={{ width: '100%', height: 160, marginBottom: '0.5rem' }}></div>
              
              {/* Content Skeleton */}
              <div className="px-5 py-4 flex flex-col h-full justify-between" style={{ flex: 1 }}>
                <div>
                  {/* Category Skeleton */}
                  <div className="skeleton mb-2" style={{ height: '14px', width: '60%', margin: '0 auto', borderRadius: '4px' }}></div>
                  
                  {/* Title Skeleton */}
                  <div className="skeleton mb-3" style={{ height: '20px', width: '90%', margin: '0 auto 0.75rem', borderRadius: '4px' }}></div>
                  <div className="skeleton mb-3" style={{ height: '20px', width: '70%', margin: '0 auto', borderRadius: '4px' }}></div>
                  
                  {/* Divider */}
                  <div className="skeleton mb-2" style={{ height: '2px', width: '100%', borderRadius: '4px' }}></div>
                  
                  {/* Price Skeleton */}
                  <div className="flex justify-center items-center gap-2 mb-5">
                    <div className="skeleton" style={{ height: '16px', width: '60px', borderRadius: '4px' }}></div>
                    <div className="skeleton" style={{ height: '16px', width: '80px', borderRadius: '4px' }}></div>
                  </div>
                </div>
                
                {/* Button Skeleton */}
                <div className="flex justify-center gap-2 mt-auto">
                  <div className="skeleton" style={{ height: '36px', width: '36px', borderRadius: '4px' }}></div>
                  <div className="skeleton" style={{ height: '36px', width: '120px', borderRadius: '4px' }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No products found. Try adjusting your filters.</p>
        </div>
      )}

      {/* Product Cards */}
      {!loading && products.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => {
              const priceInfo = getPrice(product);
              return (
                <ProductCard
                  key={product._id}
                  productId={product._id}
                  category={getCategoryName(product)}
                  name={product.productName}
                  image={getImageUrl(product)}
                  oldPrice={priceInfo.displayOldPrice || ''}
                  price={priceInfo.displayPrice}
                  salePrice={priceInfo.salePrice}
                  actualPrice={priceInfo.actualPrice}
                  {...product}
                />
              );
            })}
          </div>

          {/* Pagination */}
          {pagination.totalPage > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1 || loading}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-black cursor-pointer"
              >
                Previous
              </button>
              
              {Array.from({ length: Math.min(5, pagination.totalPage) }, (_, i) => {
                let pageNum;
                if (pagination.totalPage <= 5) {
                  pageNum = i + 1;
                } else if (pagination.page <= 3) {
                  pageNum = i + 1;
                } else if (pagination.page >= pagination.totalPage - 2) {
                  pageNum = pagination.totalPage - 4 + i;
                } else {
                  pageNum = pagination.page - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    disabled={loading}
                    className={`px-4 py-2 border rounded cursor-pointer ${
                      pagination.page === pageNum
                        ? 'bg-[#C09578] text-white border-[#C09578]'
                        : 'border-gray-300 hover:bg-gray-100 text-black'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPage || loading}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-black cursor-pointer"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
