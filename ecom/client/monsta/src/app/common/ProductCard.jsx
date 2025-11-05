import React, { useMemo } from 'react';
import { FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartAsync, deleteCartItemAsync, updateCartItemAsync, addToCartOptimistic } from '../redux/slice/cartSlice';
import { toast } from 'react-toastify';
import {
  fetchWishlistItems,
  addToWishlistAsync,
  deleteWishlistItemAsync,
  addToWishlistOptimistic,
  removeFromWishlistOptimistic
} from '../redux/slice/wishlistSlice';

export default function ProductCard({
  category,
  name,
  image,
  oldPrice,
  price,
  ...rest
}) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.mycart.cartItem);
  const cartLoading = useSelector(state => state.mycart.loading);
  const cartError = useSelector(state => state.mycart.error);
  const user = useSelector(state => state.myUser.user);
  const userId = user?.userId || user?._id || user?.id;
  const token = useSelector(state => state.myUser.token);

  // Get product PID (unique product id)
  const productPid = useMemo(() => {
    const pid = rest.productId || rest._id || rest.id || rest.sku || rest.slug || name;
    return pid ? String(pid) : null;
  }, [rest.productId, rest._id, rest.id, rest.sku, rest.slug, name]);

  // Wishlist state from Redux
  const wishlist = useSelector(state => state.myWishlist.wishlist);
  const wishlistLoading = useSelector(state => state.myWishlist.loading);
  // Check if product is in wishlist by comparing product._id with productPid
  const isInWishlist = wishlist.some(item => {
    const productId = item?.product?._id || item?.product;
    return String(productId) === String(productPid);
  });

  // Fetch wishlist on mount if needed
  React.useEffect(() => {
    if (token && wishlist.length === 0) {
      dispatch(fetchWishlistItems(token));
    }
  }, [token, dispatch]);
  // Add to wishlist using asyncThunk
  const handleAddToWishlist = async () => {
    if (!userId || !token) {
      toast.error('Please login to add to wishlist');
      return;
    }
    if (!productPid) {
      toast.error('Product ID is missing. Cannot add to wishlist.');
      return;
    }
    try {
      await dispatch(addToWishlistAsync({ productId: productPid, token })).unwrap();
      await dispatch(fetchWishlistItems(token)); // <-- Add this line
      toast.success('Added to wishlist!');
    } catch (error) {
      toast.error(error?.message || 'Failed to add to wishlist');
    }
  };

  // Remove from wishlist using asyncThunk
  const handleRemoveFromWishlist = async () => {
    if (!userId || !token) {
      toast.error('Please login to remove from wishlist');
      return;
    }
    if (!productPid) {
      toast.error('Product ID is missing. Cannot remove from wishlist.');
      return;
    }
    try {
      await dispatch(deleteWishlistItemAsync({ productId: productPid, token })).unwrap();
      await dispatch(fetchWishlistItems(token));
      toast.info('Removed from wishlist.');
    } catch (error) {
      toast.error(error?.message || 'Failed to remove from wishlist');
    }
  };


  // Compare as strings to ensure proper matching
  const cartItem = useMemo(() => {
    if (!productPid) return null;
    return cartItems.find(item => String(item.pid) === String(productPid)) || null;
  }, [cartItems, productPid]);
  const isInCart = !!cartItem;
  const cartQty = cartItem?.qty || 1;

  // Extract price values - handle both string and number formats
  const extractPrice = (priceValue) => {
    if (priceValue === null || priceValue === undefined) return 0;
    if (typeof priceValue === 'number') return priceValue;
    if (typeof priceValue === 'string') {
      const cleaned = priceValue.replace(/[^0-9.]/g, '');
      const parsed = parseFloat(cleaned);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  };

  // Add to cart
  const handleAddToCart = async () => {
    if (!userId || !token) {
      toast.error('Please login to add to cart');
      return;
    }
    if (!productPid) {
      toast.error('Product ID is missing. Cannot add to cart.');
      return;
    }
    const priceValue = extractPrice(rest.salePrice || rest.price || price);
    const actualPriceValue = extractPrice(oldPrice) || priceValue;
    const cartItemObj = {
      userId: String(userId),
      pid: String(productPid),
      name: String(name || ''),
      price: priceValue,
      qty: 1,
      image: String(image || ''),
      category: String(category || ''),
      salePrice: extractPrice(rest.salePrice) || priceValue,
      actualPrice: actualPriceValue
    };
    // Optimistic update for immediate UI feedback
    dispatch(addToCartOptimistic(cartItemObj));
    try {
      const backendCart = await dispatch(addToCartAsync({ cartItem: cartItemObj, token })).unwrap();
      // Check if the product is in the backend response
      const found = backendCart && backendCart.find && backendCart.find(i => String(i.pid) === String(productPid));
      if (found) {
        toast.success('Product added to cart!');
      } else {
        toast.error('Backend did not return the added product. Please check backend logic.');
      }
    } catch (error) {
      toast.error(error || 'Failed to add to cart');
    }
  };

  // Remove from cart
  const handleRemoveFromCart = async () => {
    if (!userId || !token) {
      toast.error('Please login to remove from cart');
      return;
    }
    if (!productPid) {
      toast.error('Product ID is missing. Cannot remove from cart.');
      return;
    }
    try {
  const backendCart = await dispatch(deleteCartItemAsync({ pid: String(productPid), userId: String(userId), token })).unwrap();
      // Check if the product is still in the backend response
      const found = backendCart && backendCart.cart && backendCart.cart.find && backendCart.cart.find(i => String(i.pid) === String(productPid));
      if (!found) {
        toast.info('Product removed from cart.');
      } else {
        toast.error('Backend did not remove the product. Please check backend logic.');
      }
    } catch (error) {
      toast.error(error || 'Failed to remove from cart');
    }
  };

  // Update quantity in cart
  const handleUpdateQty = async (newQty) => {
    if (!userId || !token) {
      toast.error('Please login to update cart');
      return;
    }
    if (!productPid) {
      toast.error('Product ID is missing. Cannot update cart.');
      return;
    }
    if (newQty < 1) {
      await handleRemoveFromCart();
      return;
    }
    try {
  const backendCart = await dispatch(updateCartItemAsync({ pid: String(productPid), qty: newQty, userId: String(userId), token })).unwrap();
      // Check if the product is in the backend response with correct qty
      const found = backendCart && backendCart.find && backendCart.find(i => String(i.pid) === String(productPid));
      if (found && found.qty === newQty) {
        // Success
      } else {
        toast.error('Backend did not update the product quantity. Please check backend logic.');
      }
    } catch (error) {
      toast.error(error || 'Failed to update cart');
    }
  };


  return (
    <div
      className="bg-white rounded-lg shadow-lg overflow-hidden mx-auto mb-3 cursor-pointer"
      style={{ width: 260, minWidth: 260, maxWidth: 260, height: 380, minHeight: 380, maxHeight: 380, display: 'flex', flexDirection: 'column' }}
    >
      {/* Product Image */}
      <div
        className="relative mb-2 bg-gray-100 flex items-center justify-center"
        style={{ width: '100%', height: 160 }}
      >
        {image ? (
          <img
            src={image}
            alt={name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={e => {
              e.target.onerror = null;
              e.target.style.display = 'none';
            }}
          />
        ) : null}
      </div>
      {/* Product Info */}
      <div className="px-5 py-4 text-center flex flex-col h-full justify-between" style={{ flex: 1 }}>
        <div>
          <div className="text-gray-500 text-sm font-playfair text-black mb-1">{category}</div>
          <div className="font-bold text-lg mb-3 font-playfair text-black" style={{ minHeight: 44, maxHeight: 44, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{name}</div>
          <div> <hr className='border-t border-[#f2f2f2] w-full border-2 mb-2' /></div>
          <div className="flex justify-center items-center gap-2 mb-5">
            <span className="text-gray-400 line-through text-base">{oldPrice}</span>
            <span className="text-[#C09578] font-semibold text-base">{price}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-auto">
          {/* Wishlist and Add to Cart/Remove/Qty side by side */}
          <div className="flex justify-center gap-2 mb-2">
            <button
              className={`border rounded px-3 py-2 flex items-center justify-center transition-colors duration-150 group cursor-pointer ${isInWishlist ? 'bg-[#C09578] border-[#C09578] text-white' : 'bg-white border-gray-300 text-black hover:bg-gray-100'}`}
              aria-label={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              onClick={isInWishlist ? handleRemoveFromWishlist : handleAddToWishlist}
              disabled={wishlistLoading}
            >
              <FaHeart className={`text-[22px] transition-colors duration-150 ${isInWishlist ? 'text-white' : 'group-hover:text-[#C09578] text-black'}`} />
            </button>
            {!isInCart ? (
              <button
                className="border border-gray-300 rounded px-5 py-2 bg-[#f7f7f7] text-gray-700 font-medium hover:bg-[#C09578] hover:text-white transition-colors duration-150 cursor-pointer"
                onClick={handleAddToCart}
                disabled={cartLoading}
              >
                Add To Cart
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  className="border border-red-400 rounded px-4 py-2 bg-red-100 text-red-700 font-medium hover:bg-red-500 hover:text-white transition-colors duration-150 cursor-pointer"
                  onClick={handleRemoveFromCart}
                  disabled={cartLoading}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}