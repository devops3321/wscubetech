"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { fetchWishlistItems, deleteWishlistItemAsync } from "../redux/slice/wishlistSlice";
import { addToCartAsync, addToCartOptimistic } from "../redux/slice/cartSlice";
import { toast } from "react-toastify";

export default function Wishlist() {
  const dispatch = useDispatch();
  const router = useRouter();
  const wishlist = useSelector(state => state.myWishlist.wishlist || []);
  const staticImagePath = useSelector(state => state.myWishlist.staticImagePath || "");
  const wishlistLoading = useSelector(state => state.myWishlist.loading);
  const wishlistError = useSelector(state => state.myWishlist.error);
  const token = useSelector(state => state.myUser.token);
  const user = useSelector(state => state.myUser.user);
  const userId = user?.userId || user?._id || user?.id;
  const cartLoading = useSelector(state => state.mycart.loading);

  useEffect(() => {
    if (token) {
      dispatch(fetchWishlistItems(token));
    }
  }, [token, dispatch]);

  const handleRemove = async (e, pid) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      await dispatch(deleteWishlistItemAsync({ productId: pid, token })).unwrap();
      toast.info("Removed from wishlist.");
    } catch (error) {
      toast.error(error?.message || "Failed to remove from wishlist");
    }
  };

  const handleMoveToCart = async (e, product) => {
    e.stopPropagation();
    e.preventDefault();
    if (!userId || !token) {
      toast.error('Please login to add to cart');
      return;
    }
    const productId = product._id || product;
    if (!productId) {
      toast.error('Product ID is missing. Cannot add to cart.');
      return;
    }
    const priceValue = product.salePrice || product.actualPrice || 0;
    const actualPriceValue = product.actualPrice || priceValue;
    const cartItemObj = {
      userId: String(userId),
      pid: String(productId),
      name: String(product.productName || ''),
      price: priceValue,
      qty: 1,
      image: String(product.productImage || ''),
      category: String(product.parentCategory?.categoryName || ''),
      salePrice: product.salePrice || priceValue,
      actualPrice: actualPriceValue
    };
    dispatch(addToCartOptimistic(cartItemObj));
    try {
      await dispatch(addToCartAsync({ cartItem: cartItemObj, token })).unwrap();
      // If unwrap() succeeds, the item was added successfully
      toast.success('Product moved to cart!');
    } catch (error) {
      toast.error(error?.message || 'Failed to add to cart');
    }
  };

  const handleCardClick = (productId) => {
    router.push(`/product-details?id=${productId}`);
  };

  if (wishlistLoading) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Loading wishlist...</div>;
  }
  if (wishlistError) {
    return <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">{wishlistError}</div>;
  }
  if (!wishlist.length) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center bg-white rounded-2xl shadow-lg p-12">
            <div className="mb-8">
              <div className="mx-auto w-24 h-24 bg-[#C09578] bg-opacity-10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-[#C09578]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-black mb-4">Your Wishlist is Empty</h2>
              <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                Start building your dream furniture collection by adding items to your wishlist
              </p>
            </div>
            <Link 
              href="/online-store"
              className="inline-flex items-center px-8 py-4 bg-[#C09578] text-white font-semibold rounded-lg hover:bg-[#A07A5A] transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-black mb-2">My Wishlist</h1>
              <p className="text-gray-600">{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {wishlist.map(item => {
            const product = item.product || {};
            const category = product.parentCategory?.categoryName || "Category";
            let imageUrl = product.productImage || '';
            if (imageUrl && !/^https?:\/\//i.test(imageUrl)) {
              let basePath = (staticImagePath || "").replace(/\/+$/, "");
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
            return (
              <div 
                key={product._id || product} 
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group flex flex-col cursor-pointer"
                onClick={() => handleCardClick(product._id || product)}
              >
                <div className="relative bg-gray-100 flex items-center justify-center overflow-hidden" style={{ width: '100%', height: '200px' }}>
                  {imageUrl ? (
                    <img
                      key={`img-${product._id || product}-${imageUrl}`}
                      src={imageUrl}
                      alt={product.productName || "Product"}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      className="group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        const currentSrc = e.target.src;
                        if (currentSrc && !currentSrc.includes('/no-image.png') && !currentSrc.includes('data:')) {
                          e.target.onerror = null;
                          e.target.src = "/no-image.png";
                        }
                      }}
                    />
                  ) : null}
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="mb-1">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">{category}</span>
                  </div>
                  <h3 className="text-base font-bold text-black line-clamp-2 min-h-[2.5rem]">{product.productName}</h3>
                  <div className="mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-black">₹{product.salePrice?.toLocaleString() || product.actualPrice?.toLocaleString() || 0}</span>
                      {product.actualPrice && product.salePrice && product.salePrice < product.actualPrice && (
                        <span className="text-sm text-gray-500 line-through">₹{product.actualPrice?.toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2 mt-auto">
                    <button
                      onClick={(e) => handleMoveToCart(e, product)}
                      className="block w-full text-center border-2 border-[#C09578] bg-[#C09578] text-white font-semibold py-2 px-3 rounded-lg hover:bg-[#A07A5A] hover:border-[#A07A5A] transition-colors duration-200 text-sm cursor-pointer"
                      disabled={cartLoading || wishlistLoading}
                    >
                      Move to Cart
                    </button>
                    <button
                      onClick={(e) => handleRemove(e, product._id || product)}
                      className="block w-full text-center border-2 border-red-500 text-red-500 font-semibold py-2 px-3 rounded-lg hover:bg-red-500 hover:text-white transition-colors duration-200 cursor-pointer text-sm"
                      disabled={wishlistLoading}
                    >
                      Remove from Wishlist
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}