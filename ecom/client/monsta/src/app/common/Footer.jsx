"use client";
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { viewCompanyProfile } from '../../apiServices/addressUpdate';

export default function Footer({ topRatedProducts = [], staticPath = "" }) {
  const [showScroll, setShowScroll] = useState(false);
  const [clientLoginUser, setClientLoginUser] = useState(null);
  const [companyInfo, setCompanyInfo] = useState({
    address: '',
    phone: '',
    email: ''
  });

  let loginUser = useSelector((store) => store.myUser.user);

  let dispatch = useDispatch();

  useEffect(() => {
    setClientLoginUser(loginUser);

    // Fetch company profile details
    async function fetchCompanyDetails() {
      try {
        const res = await viewCompanyProfile();
        if (res.status === "success" && res.data) {
          setCompanyInfo({
            address: res.data.address || '',
            phone: res.data.mobile || '',
            email: res.data.email || '',
            facebook: res.data.facebook || '',
            instagram: res.data.instagram || '',
            twitter: res.data.twitter || '',
            youtube: res.data.youtube || '',
            linkedin: res.data.linkedin || '',
            telegram: res.data.telegram || ''
          });
        }
      } catch (err) {
        // fallback to default if error
        setCompanyInfo({
          address: '',
          phone: '',
          email: '',
          facebook: '',
          instagram: '',
          twitter: '',
          youtube: '',
          linkedin: '',
          telegram: ''
        });
      }
    }
    fetchCompanyDetails();
  }, [loginUser]);


  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 1000);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const smoothScrollToTop = () => {
    const duration = 900; // milliseconds
    const start = window.scrollY;
    const startTime = performance.now();

    function scrollStep(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      window.scrollTo(0, start * (1 - ease));
      if (progress < 1) {
        requestAnimationFrame(scrollStep);
      }
    }

    requestAnimationFrame(scrollStep);
  };

  return (
    <footer className="bg-white pt-12 pb-4 border-t-2 border-[#f2f2f2]">
      <div className="max-w-7xl mx-auto px-2">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {/* Contact Us */}
          <div>
            <h3 className="font-bold font-playfair text-[22px] md:text-[25px] text-black mb-6 md:mb-8">Contact Us</h3>
            <p className="text-gray-700 mb-1 text-sm md:text-base">Address: {companyInfo.address || 'Claritas est etiam processus dynamicus'}</p>
            <p className="text-gray-700 mb-1 text-sm md:text-base">Phone: {companyInfo.phone || '+9198745612330'}</p>
            <p className="text-gray-700 mb-4 text-sm md:text-base">Email: {companyInfo.email || 'furnitureinfo@gmail.com'}</p>
            <div className="flex gap-3 flex-wrap">
              <Link href={companyInfo.facebook || '#'} className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full border border-[#e5e5e5] text-gray-500 hover:text-[#C09578] cursor-pointer">
                <i className="fa fa-facebook"></i>
              </Link>
              <Link href={companyInfo.instagram || '#'} className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full border border-[#e5e5e5] text-gray-500 hover:text-[#C09578] cursor-pointer">
                <i className="fa fa-instagram"></i>
              </Link>
              <Link href={companyInfo.twitter || '#'} className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full border border-[#e5e5e5] text-gray-500 hover:text-[#C09578] cursor-pointer">
                <i className="fa fa-twitter"></i>
              </Link>
              <Link href={companyInfo.linkedin || '#'} className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full border border-[#e5e5e5] text-gray-500 hover:text-[#C09578] cursor-pointer">
                <i className="fa fa-linkedin"></i>
              </Link>
              <Link href={companyInfo.youtube || '#'} className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full border border-[#e5e5e5] text-gray-500 hover:text-[#C09578] cursor-pointer">
                <i className="fa fa-youtube"></i>
              </Link>
              <Link href={companyInfo.telegram || '#'} className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full border border-[#e5e5e5] text-gray-500 hover:text-[#C09578] cursor-pointer">
                <i className="fa fa-telegram"></i>
              </Link>
            </div>
          </div>
          {/* Information */}
          <div className='ms-1'>
            <h3 className="font-bold font-playfair text-[22px] md:text-[25px] text-black mb-6 md:mb-8">Information</h3>
            <ul className="space-y-2">
              <li><Link href={"/about-us"} className="text-gray-700 hover:text-[#C09578] text-sm md:text-base cursor-pointer">About Us</Link></li>
              <li><Link href={"/contact-us"} className="text-gray-700 hover:text-[#C09578] text-sm md:text-base cursor-pointer">Contact Us</Link></li>
              <li><Link href={"/faq"} className="text-gray-700 hover:text-[#C09578] text-sm md:text-base cursor-pointer">Frequently Asked Questions</Link></li>
              <li><Link href={"/terms-of-use"} className="text-gray-700 hover:text-[#C09578] text-sm md:text-base cursor-pointer">Terms of Use</Link></li>
            </ul>
          </div>
          {/* My Account */}
          <div>
            <h3 className="font-bold font-playfair text-[22px] md:text-[25px] text-black mb-6 md:mb-8">My Account</h3>
            <ul className="space-y-2">
              <li><Link href="/dashboard" className="text-gray-700 hover:text-[#C09578] text-sm md:text-base cursor-pointer">My Dashboard</Link></li>
              <li><Link href="/wishlist" className="text-gray-700 hover:text-[#C09578] text-sm md:text-base cursor-pointer">Wishlist</Link></li>
              <li><Link href="/cart" className="text-gray-700 hover:text-[#C09578] text-sm md:text-base cursor-pointer">Cart</Link></li>
              <li><Link href="/checkout" className="text-gray-700 hover:text-[#C09578] text-sm md:text-base cursor-pointer">Checkout</Link></li>
            </ul>
          </div>
          {/* Top Rated Products */}
          <div>
            <h3 className="font-bold font-playfair text-[22px] md:text-[25px] text-black mb-6 md:mb-8">Top Rated Products</h3>
            {topRatedProducts && topRatedProducts.length > 0 ? (
              topRatedProducts.map((prod, idx) => {
                const categoryName = prod?.subCategory?.name || prod?.parentCategory?.name || '';
                const oldPrice = prod?.actualPrice ? `Rs. ${Number(prod.actualPrice).toLocaleString('en-IN')}` : '';
                const salePrice = prod?.salePrice ? `Rs. ${Number(prod.salePrice).toLocaleString('en-IN')}` : '';
                const imgSrc = (() => {
                  const raw = prod?.productImage || '';
                  if (!raw) return '';
                  if (/^https?:\/\//i.test(raw)) return raw;
                  const base = (staticPath || '').replace(/\/+$/, '');
                  const path = String(raw).replace(/^\/+/, '');
                  return `${base}/${path}`;
                })();
                return (
                  <div key={prod?._id || idx} className={idx === 0 ? "mb-4 flex items-center gap-3 border-b border-[#e5e5e5] pb-2" : "flex items-center gap-3"}>
                    {imgSrc ? (
                      <img src={imgSrc} alt={prod?.productName || 'Product'} className="w-14 h-12 object-cover rounded" />
                    ) : (
                      <div className="w-14 h-12 bg-gray-100 rounded" />
                    )}
                    <div>
                      <div className="text-xs text-gray-500">{categoryName}</div>
                      <Link href={`/product/${prod?._id || ''}`} className="text-[#222] font-medium font-playfair text-sm hover:text-[#C09578] cursor-pointer">
                        {prod?.productName || 'Product'}
                      </Link>
                      <div className='mt-2'>
                        {oldPrice ? <span className="line-through text-xs text-gray-400 mr-2">{oldPrice}</span> : null}
                        {salePrice ? <span className="text-[#C09578] font-bold text-sm">{salePrice}</span> : null}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <>
                <div className="mb-4 flex items-center gap-3 border-b border-[#e5e5e5] pb-2">
                  <div className="w-14 h-12 bg-gray-100 rounded" />
                  <div className="flex-1">
                    <div className="h-3 bg-gray-100 w-24 mb-2 rounded" />
                    <div className="h-4 bg-gray-100 w-40 rounded" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-12 bg-gray-100 rounded" />
                  <div className="flex-1">
                    <div className="h-3 bg-gray-100 w-24 mb-2 rounded" />
                    <div className="h-4 bg-gray-100 w-40 rounded" />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        {/* Footer Links */}
        <div className="border-t-2 border-b-2 border-[#e5e5e5] text-[16px] md:text-[18px] font-rubik font-semibold py-6 flex flex-wrap justify-center gap-4 md:gap-8 mb-10">
          <Link href="/" className="text-gray-700 hover:text-[#C09578] cursor-pointer">Home</Link>
          <Link href="/online-store" className="text-gray-700 hover:text-[#C09578] cursor-pointer">Online Store</Link>
          <Link href={"/privacy-policy"} className="text-gray-700 hover:text-[#C09578] cursor-pointer">Privacy Policy</Link>
          <Link href={"/terms-of-use"} className="text-gray-700 hover:text-[#C09578] cursor-pointer">Terms Of Use</Link>
        </div>
        {/* Copyright & Payment */}
        <div className="text-center text-gray-500 text-base md:text-lg mb-6">
          All Rights Reserved By Monsta | © 2025
        </div>
        <div className="flex justify-center gap-2 md:gap-4 mb-5 flex-wrap">
          <img
            src="https://wscubetech.co/Assignments/furniture/public/frontend/img/icon/papyel2.png"
            alt="Skrill" className="h-8" />
        </div>
        {/* Scroll to top button */}
        {showScroll && (
          <button
            className="fixed bottom-6 right-4 md:bottom-8 md:right-8 bg-[#222] text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-[#C09578] transition-colors cursor-pointer"
            aria-label="Scroll to top"
            onClick={smoothScrollToTop}
          >
            <i className="fa fa-angle-up text-2xl animate-bounce-up"></i>
          </button>
        )}
      </div>
    </footer>
  )
}