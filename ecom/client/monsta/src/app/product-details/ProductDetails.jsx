"use client";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartAsync, addToCartOptimistic } from '../redux/slice/cartSlice';
import { toast } from 'react-toastify';

export default function ProductDetails({ product, staticPath = '' }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.myUser.user);
  const userId = user?.userId || user?._id || user?.id;
  const token = useSelector((store) => store.myUser.token);

  useEffect(() => {
    if (product) {
      // Build image URLs
      const productImages = product.productImages || [];
      const productImage = product.productImage || '';
      
      let imageList = [];
      
      if (productImages && productImages.length > 0) {
        imageList = productImages.map(img => {
          if (!img) return null;
          if (/^https?:\/\//i.test(img)) {
            return img;
          }
          const basePath = (staticPath || '').replace(/\/+$/, '');
          const imagePath = String(img).replace(/^\/+/, '');
          return basePath && imagePath ? `${basePath}/${imagePath}` : imagePath || '/no-image.png';
        }).filter(Boolean);
      } else if (productImage) {
        if (/^https?:\/\//i.test(productImage)) {
          imageList = [productImage];
        } else {
          const basePath = (staticPath || '').replace(/\/+$/, '');
          const imagePath = String(productImage).replace(/^\/+/, '');
          imageList = basePath && imagePath ? [`${basePath}/${imagePath}`] : [imagePath || '/no-image.png'];
        }
      }
      
      if (imageList.length === 0) {
        imageList = ['/no-image.png'];
      }
      
      setImages(imageList);
    }
  }, [product, staticPath]);

  if (!product) {
    return null;
  }

  const productName = product.productName || 'Product';
  const salePrice = product.salePrice || 0;
  const actualPrice = product.actualPrice || salePrice;
  const hasDiscount = salePrice > 0 && actualPrice > salePrice;
  const displayPrice = salePrice > 0 ? salePrice : actualPrice;
  const oldPrice = hasDiscount ? actualPrice : null;

  const categoryName = product.parentCategory?.name || 
                       product.parentCategory?.categoryName || 
                       product.subCategory?.name || 
                       product.subCategory?.subcategoryName || 
                       product.subSubCategory?.name || 
                       product.subSubCategory?.subsubcategoryName || 
                       'N/A';

  const productCode = product.productCode || product.sku || 'N/A';
  const dimension = product.dimension || product.dimensions || 'N/A';
  const estimateDeliveryDays = product.estimateDeliveryDays || product.deliveryDays || 'N/A';
  const description = product.productDescription || product.description || `${productName} details.`;

  // Get colors and materials (they should be populated objects from backend)
  const getColorNames = () => {
    if (!product.color || (Array.isArray(product.color) && product.color.length === 0)) {
      return 'N/A';
    }
    if (Array.isArray(product.color)) {
      // Filter out any ID strings and only get objects with colorName
      const colorNames = product.color
        .map(c => {
          // If it's an object with colorName, use it
          if (c && typeof c === 'object' && c.colorName) {
            return c.colorName;
          }
          // If it's just an ID string, skip it (shouldn't happen if backend populates correctly)
          return null;
        })
        .filter(Boolean);
      return colorNames.length > 0 ? colorNames.join(', ') : 'N/A';
    }
    // Single color object
    if (product.color && typeof product.color === 'object' && product.color.colorName) {
      return product.color.colorName;
    }
    return 'N/A';
  };

  const getMaterialNames = () => {
    if (!product.material || (Array.isArray(product.material) && product.material.length === 0)) {
      return 'N/A';
    }
    if (Array.isArray(product.material)) {
      // Filter out any ID strings and only get objects with categoryName
      const materialNames = product.material
        .map(m => {
          // If it's an object with categoryName, use it
          if (m && typeof m === 'object' && m.categoryName) {
            return m.categoryName;
          }
          // If it's just an ID string, skip it (shouldn't happen if backend populates correctly)
          return null;
        })
        .filter(Boolean);
      return materialNames.length > 0 ? materialNames.join(', ') : 'N/A';
    }
    // Single material object
    if (product.material && typeof product.material === 'object' && product.material.categoryName) {
      return product.material.categoryName;
    }
    return 'N/A';
  };

  const handleAddToCart = async () => {
    if (!userId || !token) {
      toast.error('Please login to add items to cart');
      return;
    }

    try {
      // Optimistic update
      dispatch(addToCartOptimistic({
        pid: product._id,
        title: productName,
        price: displayPrice,
        image: images[0] || '/no-image.png',
        qty: 1
      }));

      // Backend sync
      await dispatch(addToCartAsync({
        pid: product._id,
        qty: 1,
        userId,
        token
      })).unwrap();

      toast.success('Product added to cart!');
    } catch (error) {
      toast.error('Failed to add product to cart');
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left: Images */}
        <div className="md:w-1/2">
          {images.length > 0 && (
            <>
              <img
                src={images[selectedImageIndex] || images[0]}
                alt={productName}
                className="w-full h-[340px] object-cover rounded mb-4 border"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/no-image.png';
                }}
              />
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto">
                  {images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${productName} ${idx + 1}`}
                      className={`w-20 h-16 object-cover rounded border cursor-pointer transition-opacity ${
                        selectedImageIndex === idx ? 'opacity-100 border-[#C09578] border-2' : 'opacity-70 hover:opacity-100'
                      }`}
                      onClick={() => setSelectedImageIndex(idx)}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/no-image.png';
                      }}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
        {/* Right: Details */}
        <div className="md:w-1/2">
          <h1 className="font-playfair text-2xl md:text-3xl font-bold text-black mb-2">{productName}</h1>
          <div className="flex items-center gap-4 mb-2">
            {oldPrice && (
              <span className="line-through text-gray-400 text-lg">Rs. {oldPrice.toLocaleString()}</span>
            )}
            <span className="text-[#C09578] font-bold text-xl">Rs. {displayPrice.toLocaleString()}</span>
          </div>
          {description && (
            <p className="text-gray-700 mb-6">{description}</p>
          )}
          <hr className="mb-4 border-[#e5e5e5]" />
          <button 
            onClick={handleAddToCart}
            className="bg-[#C09578] text-white font-bold px-8 py-2 rounded mt-3 mb-6 cursor-pointer hover:bg-[#A07A5A] transition-colors"
          >
            Add To Cart
          </button>
          <div className="space-y-2 text-black text-base">
            <div><span className="font-bold">Code:</span> {productCode}</div>
            {dimension !== 'N/A' && (
              <div><span className="font-bold">Dimension:</span> {dimension}</div>
            )}
            {estimateDeliveryDays !== 'N/A' && (
              <div><span className="font-bold">Estimate Delivery Days:</span> {estimateDeliveryDays} Days</div>
            )}
            <div><span className="font-bold">Category:</span> {categoryName}</div>
            <div><span className="font-bold">Color:</span> {getColorNames()}</div>
            <div><span className="font-bold">Material:</span> {getMaterialNames()}</div>
          </div>
        </div>
      </div>
      {/* Description */}
      {description && (
        <div className="mt-10">
          <h2 className="text-[#C09578] font-bold text-xl mb-2">Description</h2>
          <hr className="mb-4 border-[#e5e5e5]" />
          <p className="text-gray-700 text-base">
            {description}
          </p>
        </div>
      )}
    </div>
  );
}
