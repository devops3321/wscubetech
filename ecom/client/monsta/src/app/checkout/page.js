"use client";
import React, { useState, useEffect } from 'react'
import Breadcrumb from '../common/Breadcrumb'
import { useSelector, useDispatch } from 'react-redux';
import { fetchCartItems, clearCart } from '../redux/slice/cartSlice';
import { placeOrderAPI } from '@/apiServices/orderService';
import { getDefaultAddressAPI } from '@/apiServices/addressService';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import countries from '../staticData/countryData';
import Swal from 'sweetalert2';

export default function Checkout() {
  const dispatch = useDispatch();
  const router = useRouter();
  const cart = useSelector(state => state.mycart.cartItem);
  const staticImagePath = useSelector(state => state.mycart.staticImagePath || "");
  const user = useSelector(state => state.myUser.user);
  const userId = user?.userId || user?._id || user?.id;
  const token = useSelector(state => state.myUser.token);
  const loading = useSelector(state => state.mycart.loading);

  const [showShipping, setShowShipping] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    billingName: '',
    billingEmail: '',
    billingMobile: '',
    billingAddress: '',
    billingCountry: '',
    billingState: '',
    billingCity: '',
    shippingName: '',
    shippingEmail: '',
    shippingMobile: '',
    shippingAddress: '',
    shippingCountry: '',
    shippingState: '',
    shippingCity: '',
    orderNotes: ''
  });

  // Fetch cart items on mount
  useEffect(() => {
    if (userId && token) {
      dispatch(fetchCartItems({ userId, token }));
    }
  }, [userId, token, dispatch]);

  // Fetch default addresses on mount
  useEffect(() => {
    if (userId && token) {
      loadDefaultAddresses();
    }
  }, [userId, token]);

  const loadDefaultAddresses = async () => {
    try {
      const [billingResponse, shippingResponse] = await Promise.all([
        getDefaultAddressAPI('billing', userId, token),
        getDefaultAddressAPI('shipping', userId, token)
      ]);

      if (billingResponse.success && billingResponse.address) {
        const addr = billingResponse.address;
        setFormData(prev => ({
          ...prev,
          billingName: addr.name || '',
          billingEmail: addr.email || '',
          billingMobile: addr.mobile || '',
          billingAddress: addr.address || '',
          billingCountry: addr.country || '',
          billingState: addr.state || '',
          billingCity: addr.city || ''
        }));
      }

      if (shippingResponse.success && shippingResponse.address) {
        const addr = shippingResponse.address;
        setFormData(prev => ({
          ...prev,
          shippingName: addr.name || '',
          shippingEmail: addr.email || '',
          shippingMobile: addr.mobile || '',
          shippingAddress: addr.address || '',
          shippingCountry: addr.country || '',
          shippingState: addr.state || '',
          shippingCity: addr.city || ''
        }));
        setShowShipping(true);
      }
    } catch (error) {
      console.error('Error loading default addresses:', error);
      // Don't show error toast as addresses are optional
    }
  };

  // Redirect if not logged in or cart is empty
  useEffect(() => {
    if (!userId || !token) {
      toast.error('Please login to proceed to checkout');
      router.push('/login-register');
      return;
    }
    if (cart && cart.length === 0 && !loading) {
      toast.error('Your cart is empty');
      router.push('/cart');
    }
  }, [userId, token, cart, loading, router]);

  // Calculate totals
  const calculateTotals = () => {
    let subtotal = 0;
    cart.forEach(item => {
      const itemPrice = item.salePrice !== undefined && item.salePrice !== null 
        ? item.salePrice 
        : item.price;
      subtotal += itemPrice * item.qty;
    });
    const discount = 0; // Can be calculated based on coupons/promotions
    const total = Math.max(0, subtotal - discount);
    return { subtotal, discount, total };
  };

  const { subtotal, discount, total } = calculateTotals();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.mobile) {
      toast.error('Please fill in your name and mobile number');
      return false;
    }
    if (!formData.billingName || !formData.billingEmail || !formData.billingMobile || 
        !formData.billingAddress || !formData.billingCountry || !formData.billingState || !formData.billingCity) {
      toast.error('Please fill in all billing address fields');
      return false;
    }
    if (showShipping) {
      if (!formData.shippingName || !formData.shippingEmail || !formData.shippingMobile || 
          !formData.shippingAddress || !formData.shippingCountry || !formData.shippingState || !formData.shippingCity) {
        toast.error('Please fill in all shipping address fields');
        return false;
      }
    }
    return true;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (!cart || cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsPlacingOrder(true);

    try {
      const orderData = {
        userId: String(userId),
        billingAddress: {
          name: formData.billingName,
          email: formData.billingEmail,
          mobile: formData.billingMobile,
          address: formData.billingAddress,
          country: formData.billingCountry,
          state: formData.billingState,
          city: formData.billingCity
        },
        orderNotes: formData.orderNotes || '',
        paymentMethod: 'cash_on_delivery',
        discount: discount
      };

      if (showShipping) {
        orderData.shippingAddress = {
          name: formData.shippingName,
          email: formData.shippingEmail,
          mobile: formData.shippingMobile,
          address: formData.shippingAddress,
          country: formData.shippingCountry,
          state: formData.shippingState,
          city: formData.shippingCity
        };
      }

      const response = await placeOrderAPI(orderData, token);

      if (response.success) {
        // Clear cart
        dispatch(clearCart());
        
        // Show success message
        await Swal.fire({
          title: 'Order Placed!',
          text: `Your order has been placed successfully. Order Number: ${response.order.orderNumber}`,
          icon: 'success',
          confirmButtonColor: '#C09578',
          confirmButtonText: 'View Order'
        });

        // Redirect to thank you page with order details
        router.push(`/thankyou?orderNumber=${response.order.orderNumber}&orderId=${response.order.orderId}`);
      } else {
        toast.error(response.error || 'Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error(error.message || 'Failed to place order. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  // Show loading state
  if (loading && (!cart || cart.length === 0)) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Breadcrumb pageName={"Checkout"} />
        <div className="max-w-4xl mx-auto mt-4 mb-10">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C09578] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading checkout...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show empty cart message
  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Breadcrumb pageName={"Checkout"} />
        <div className="max-w-4xl mx-auto mt-4 mb-10">
          <div className="text-center bg-white rounded-lg shadow p-12">
            <h2 className="text-2xl font-bold text-black mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-6">Please add items to your cart before checkout.</p>
            <button
              onClick={() => router.push('/cart')}
              className="bg-[#C09578] text-white font-bold py-2 px-6 rounded hover:bg-[#A07A5A] transition-colors"
            >
              Go to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumb pageName={"Checkout"} />
      <div className="max-w-4xl mx-auto mt-4 mb-10">
        {/* Billing Details */}
        <div className="border border-gray-200 rounded-lg mb-8">
          <div className="bg-black text-white font-bold font-playfair px-4 py-3 rounded-t">BILLING DETAILS</div>
          <form className="p-6" onSubmit={handlePlaceOrder}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-black mb-1 font-playfair">Name*</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 text-black rounded px-3 py-2" 
                  required
                />
              </div>
              <div>
                <label className="block text-black mb-1 font-playfair">Mobile Number*</label>
                <input 
                  type="text" 
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 text-black rounded px-3 py-2" 
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-black mb-1 font-playfair">Billing Name*</label>
                <input 
                  type="text" 
                  name="billingName"
                  value={formData.billingName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 text-black rounded px-3 py-2" 
                  required
                />
              </div>
              <div>
                <label className="block text-black mb-1 font-playfair">Billing Email*</label>
                <input 
                  type="email" 
                  name="billingEmail"
                  value={formData.billingEmail}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 text-black rounded px-3 py-2" 
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-black mb-1 font-playfair">Billing Mobile Number*</label>
              <input 
                type="text" 
                name="billingMobile"
                value={formData.billingMobile}
                onChange={handleInputChange}
                className="w-full border border-gray-300 text-black rounded px-3 py-2" 
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-black mb-1 font-playfair">Billing Address*</label>
              <input 
                type="text" 
                name="billingAddress"
                value={formData.billingAddress}
                onChange={handleInputChange}
                className="w-full border border-gray-300 text-black rounded px-3 py-2" 
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-black mb-1 font-playfair">Country*</label>
                <select 
                  name="billingCountry"
                  value={formData.billingCountry}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 text-black rounded px-3 py-2" 
                  required
                >
                  <option value="">Select Country</option>
                  {countries.filter(c => c !== 'Select Country').map((country, index) => (
                    <option key={index} value={country}>{country}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-black mb-1 font-playfair">State*</label>
                  <input 
                    type="text" 
                    name="billingState"
                    value={formData.billingState}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 text-black rounded px-3 py-2" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-black mb-1 font-playfair">City*</label>
                  <input 
                    type="text" 
                    name="billingCity"
                    value={formData.billingCity}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 text-black rounded px-3 py-2" 
                    required
                  />
                </div>
              </div>
            </div>
            {/* Ship to Different Address */}
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="ship-different"
                className="accent-black mr-2"
                checked={showShipping}
                onChange={() => setShowShipping(!showShipping)}
              />
              <label htmlFor="ship-different" className="font-bold font-playfair cursor-pointer bg-black text-white px-2 py-1 rounded">
                Ship To A Different Address?
              </label>
            </div>
            {/* Shipping Address Section */}
            {showShipping && (
              <div className="mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-black mb-1 font-playfair">Shipping Name*</label>
                    <input 
                      type="text" 
                      name="shippingName"
                      value={formData.shippingName}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 text-black rounded px-3 py-2" 
                      required={showShipping}
                    />
                  </div>
                  <div>
                    <label className="block text-black mb-1 font-playfair">Shipping Email*</label>
                    <input 
                      type="email" 
                      name="shippingEmail"
                      value={formData.shippingEmail}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 text-black rounded px-3 py-2" 
                      required={showShipping}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-black mb-1 font-playfair">Shipping Mobile Number*</label>
                  <input 
                    type="text" 
                    name="shippingMobile"
                    value={formData.shippingMobile}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 text-black rounded px-3 py-2" 
                    required={showShipping}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-black mb-1 font-playfair">Shipping Address*</label>
                  <input 
                    type="text" 
                    name="shippingAddress"
                    value={formData.shippingAddress}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 text-black rounded px-3 py-2" 
                    required={showShipping}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-black mb-1 font-playfair">Country*</label>
                  <select 
                    name="shippingCountry"
                    value={formData.shippingCountry}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 text-black rounded px-3 py-2" 
                    required={showShipping}
                  >
                    <option value="">Select Country</option>
                    {countries.filter(c => c !== 'Select Country').map((country, index) => (
                      <option key={index} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-black mb-1 font-playfair">State*</label>
                    <input 
                      type="text" 
                      name="shippingState"
                      value={formData.shippingState}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 text-black rounded px-3 py-2" 
                      required={showShipping}
                    />
                  </div>
                  <div>
                    <label className="block text-black mb-1 font-playfair">City*</label>
                    <input 
                      type="text" 
                      name="shippingCity"
                      value={formData.shippingCity}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 text-black rounded px-3 py-2" 
                      required={showShipping}
                    />
                  </div>
                </div>
              </div>
            )}
            {/* Order Notes */}
            <div className="mb-4">
              <label className="block text-black mb-1 font-playfair">Order Notes</label>
              <textarea 
                name="orderNotes"
                value={formData.orderNotes}
                onChange={handleInputChange}
                className="w-full border border-gray-300 text-black rounded px-3 py-2 resize-none" 
                rows={3} 
                placeholder="Notes about your order, e.g. special notes for delivery." 
              />
            </div>
          </form>
        </div>
        {/* Your Order */}
        <div className="border border-gray-200 rounded-lg mb-8">
          <div className="bg-black text-white font-bold font-playfair px-4 py-3 mb-2">YOUR ORDER</div>
          <table className="min-w-full border-1 text-center mb-4">
            <thead>
              <tr className="bg-[#F2F2F2]">
                <th className="py-2 px-4 font-bold font-playfair text-black text-center">Product</th>
                <th className="py-2 px-4 font-bold font-playfair text-black text-center">Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => {
                const itemPrice = item.salePrice !== undefined && item.salePrice !== null 
                  ? item.salePrice 
                  : item.price;
                const itemTotal = itemPrice * item.qty;
                return (
                  <tr key={item.pid || index}>
                    <td className="py-2 px-4 border-b text-black font-playfair text-left">
                      {item.name} × {item.qty}
                    </td>
                    <td className="py-2 px-4 border-b text-black">₹{itemTotal.toLocaleString()}</td>
                  </tr>
                );
              })}
              <tr>
                <td className="py-2 px-4 border-b text-black font-playfair">Cart Subtotal</td>
                <td className="py-2 px-4 border-b text-black">₹{subtotal.toLocaleString()}</td>
              </tr>
              {discount > 0 && (
                <tr>
                  <td className="py-2 px-4 border-b text-black font-playfair">Discount (-)</td>
                  <td className="py-2 px-4 border-b text-black">₹{discount.toLocaleString()}</td>
                </tr>
              )}
              <tr>
                <td className="py-2 px-4 text-black font-bold font-playfair">Order Total</td>
                <td className="py-2 px-4 text-black font-bold">₹{total.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-center px-4 py-2">
            <button 
              onClick={handlePlaceOrder}
              disabled={isPlacingOrder || loading}
              className="bg-[#C09578] text-white font-bold py-2 px-4 rounded cursor-pointer hover:bg-black hover:text-white duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
