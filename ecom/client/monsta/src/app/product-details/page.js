"use client";
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import BreadcrumbProductDetails from './BreadcrumbProductDetails'
import ProductDetails from './ProductDetails'
import { getProductById } from '@/apiServices/productService'

export default function ProductDetailsView() {
  const searchParams = useSearchParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [staticPath, setStaticPath] = useState('');

  useEffect(() => {
    const productId = searchParams.get('id');
    
    if (!productId) {
      setError('Product ID is missing');
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getProductById(productId);
        
        if (response && response.status !== false && response.data) {
          setProduct(response.data);
          if (response.staticPath) {
            setStaticPath(response.staticPath);
          }
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-10 px-4">
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-6xl mx-auto py-10 px-4">
        <div className="text-center py-12">
          <p className="text-red-600 text-lg">{error || 'Product not found'}</p>
        </div>
      </div>
    );
  }

  const categoryName = product.parentCategory?.name || 
                       product.parentCategory?.categoryName || 
                       product.subCategory?.name || 
                       product.subCategory?.subcategoryName || 
                       product.subSubCategory?.name || 
                       product.subSubCategory?.subsubcategoryName || 
                       'Category';

  return (
    <div>
      <BreadcrumbProductDetails 
        categoryName={categoryName} 
        productName={product.productName || 'Product'} 
      />
      <ProductDetails product={product} staticPath={staticPath} />
    </div>
  )
}
