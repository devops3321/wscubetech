"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../redux/slice/userSlice';
import { redirect } from 'next/navigation';

export default function Header() {
    const [openMenu, setOpenMenu] = useState(null);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const closeTimeout = useRef();
    const [clientLoginUser, setClientLoginUser] = useState(null);


    // Then conditionally render based on clientLoginUser, so server and client render differencing is avoided

    // Handles mouse enter for menu buttons
    const handleMenuOpen = (menu) => {
        clearTimeout(closeTimeout.current);
        setOpenMenu(menu);
    };

    // Handles mouse leave with timeout
    const handleMenuClose = () => {
        closeTimeout.current = setTimeout(() => setOpenMenu(null), 250);
    };

    // Handles mouse enter for mega menu itself (to persist open)
    const handleMenuPersist = (menu) => {
        clearTimeout(closeTimeout.current);
        setOpenMenu(menu);
    };

    // Toggle mobile nav
    const toggleMobileNav = () => {
        setMobileNavOpen((prev) => !prev);
        setOpenMenu(null);
    };

    let loginUser = useSelector((store) => store.myUser.user);

    let dispatch = useDispatch();

    let logOutUser = () => {
        dispatch(logOut());
        redirect('/login-register');
    }

    let cart = useSelector((mystore) => {
        // console.log("mystore.cart", mystore);  // access the store
        // console.log("mystore.mycart", mystore.mycart); // access the cart state
        // console.log("cart items", mystore.mycart.cartItem); // log the number of items in the cart

        return mystore.mycart.cartItem;
    });

    useEffect(() => {
        setClientLoginUser(loginUser);
    }, [loginUser]);


    return (
        <div>
            {/* Top Contact Bar */}
            <div className="w-full border-b border-gray-200 bg-white flex flex-col md:flex-row justify-evenly items-center px-4 md:px-8 py-3 text-sm gap-y-2 md:gap-x-40 text-black">
                <div>
                    Contact us 24/7 : <a href="tel:+9198745612330" className="hover:text-[#C09578] transition-colors duration-150">+91-98745612330</a> / <a href="mailto:furnitureinfo@gmail.com" className="hover:text-[#C09578] transition-colors duration-150">furnitureinfo@gmail.com</a>
                </div>
                <div>
                    {loginUser ?
                        (
                            <div>
                                <span className="mr-2">Welcome, {loginUser.userName}</span>
                                <button onClick={logOutUser} className="hover:text-[#C09578] hover:font-bold transition-colors duration-150 cursor-pointer">Logout</button>
                            </div>
                        )
                        :

                        (
                            <Link href={"/login-register"} className="hover:text-[#C09578] transition-colors duration-150">Login / Register</Link>
                        )
                    }
                </div>
            </div>
            {/* Logo, Search, Wishlist, Cart Section */}
            <div className="w-full bg-white flex flex-col md:flex-row items-center justify-evenly px-4 md:px-8 py-2 border-t border-b border-gray-200 gap-y-4">
                {/* Logo */}
                <div className="flex items-center">
                    <Link href="/"><img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/company-profile/logo/cccfbdab-3bec-439f-88b9-5694698cd302-1670132652.png" alt="MONSTA" className="h-8 w-auto" /></Link>
                </div>
                {/* Search, Wishlist, Cart */}
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                    {/* Search */}
                    <div className="flex items-center border-gray-400 border rounded px-4 py-2 bg-white w-full sm:min-w-[300px]">
                        <input
                            type="text"
                            placeholder="Search product..."
                            className="outline-none border-none bg-transparent flex-1 text-sm text-black"
                        />
                        <button className="ml-2 text-black hover:text-[#C09578]">
                            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                        </button>
                    </div>
                    {/* Wishlist */}
                    <button className="border border-gray-200 rounded px-4 py-2 bg-white flex items-center justify-center hover:bg-gray-100 transition-colors duration-150 group w-full sm:w-auto">
                        <svg
                            width="20"
                            height="20"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            className="text-black group-hover:text-[#C09578] transition-colors duration-150"
                        >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    </button>
                    {/* Cart */}
                    <div className="flex items-center border border-gray-300 rounded px-4 py-2 bg-white hover:bg-gray-100 w-full sm:w-auto">
                        <span className="relative flex items-center mr-3">
                            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-black">
                                <circle cx="9" cy="21" r="1" />
                                <circle cx="20" cy="21" r="1" />
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                            </svg>
                            <span className="absolute -top-3 -right-4 bg-[#C09578] text-white text-xs rounded-full px-2 py-0.5">{cart.length}</span>
                        </span>
                        {/* Separator line */}
                        <span className="h-6 w-px bg-gray-300 mx-2"></span>
                        <span className="font-bold text-black flex items-center">
                            <span className="mr-1">₹.</span>
                            <span>0.00</span>
                        </span>
                        <svg className="w-4 h-4 text-black ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </div>
                </div>
            </div>
            {/* Mobile Nav Toggle */}
            <div className="md:hidden flex justify-end px-4 py-2">
                <button
                    className="text-black text-2xl"
                    aria-label="Toggle navigation"
                    onClick={toggleMobileNav}
                >
                    <i className={mobileNavOpen ? "fa fa-times" : "fa fa-bars"}></i>
                </button>
            </div>
            {/* Navigation */}
            <nav className="bg-white border-gray-200 w-full">
                <div className="bg-white border-1 shadow-lg w-full flex flex-wrap items-center justify-center mx-auto p-4">
                    <div className={`${mobileNavOpen ? "block" : "hidden"} w-full md:block md:w-auto`} id="navbar-dropdown">
                        <ul className="flex flex-col font-bold p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-white md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
                            {/* HOME */}
                            <li>
                                <Link
                                    href={"/"}
                                    className="block py-2 px-3 bg-white rounded-sm md:bg-white md:p-0 font-bold cursor-pointer"
                                    style={{ color: '#C09578' }}
                                    aria-current="page"
                                >
                                    HOME
                                </Link>
                            </li>
                            {/* LIVING */}
                            <li
                                className="relative"
                                onMouseEnter={() => handleMenuOpen('living')}
                                onMouseLeave={handleMenuClose}
                            >
                                <button
                                    className="flex items-center justify-between w-full py-2 px-3 text-black font-bold rounded-sm hover:text-[#C09578] hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 md:w-auto transition-colors duration-300 cursor-pointer"
                                    type="button"
                                >
                                    LIVING
                                    <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </button>
                                {/* MEGA MENU */}
                                {openMenu === 'living' && (
                                    <div
                                        className="absolute left-0 top-10 z-20 min-w-max bg-white shadow-lg rounded-lg py-6 px-8 mt-2"
                                        onMouseEnter={() => handleMenuPersist('living')}
                                        onMouseLeave={handleMenuClose}
                                    >
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                                            {/* TABLES COLUMN */}
                                            <div>
                                                <h4 className="font-bold font-playfair mb-3 text-black text-base">TABLES</h4>
                                                <ul className="space-y-2 font-normal text-sm">
                                                    <li>
                                                        <a href="#" className="text-gray-700 hover:text-[#C09578] transition-colors duration-300 cursor-pointer">
                                                            Side And End Tables
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" className="text-gray-700 hover:text-[#C09578] transition-colors duration-300 cursor-pointer">
                                                            Nest Of Tables
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" className="text-gray-700 hover:text-[#C09578] transition-colors duration-300 cursor-pointer">
                                                            Coffee Table Sets
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" className="text-gray-700 hover:text-[#C09578] transition-colors duration-300 cursor-pointer">
                                                            Coffee Tables
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            {/* LIVING STORAGE COLUMN */}
                                            <div>
                                                <h4 className="font-bold font-playfair mb-3 text-black text-base">LIVING STORAGE</h4>
                                                <ul className="space-y-2 font-normal text-sm">
                                                    <li>
                                                        <a href="#" className="text-gray-700 hover:text-[#C09578] transition-colors duration-300 cursor-pointer">
                                                            Prayer Units
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" className="text-gray-700 hover:text-[#C09578] transition-colors duration-300 cursor-pointer">
                                                            Display Unit
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" className="text-gray-700 hover:text-[#C09578] transition-colors duration-300 cursor-pointer">
                                                            Shoe Racks
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" className="text-gray-700 hover:text-[#C09578] transition-colors duration-300 cursor-pointer">
                                                            Chest Of Drawers
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" className="text-gray-700 hover:text-[#C09578] transition-colors duration-300 cursor-pointer">
                                                            Cabinets And Sideboard
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" className="text-gray-700 hover:text-[#C09578] transition-colors duration-300 cursor-pointer">
                                                            Bookshelves
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" className="text-gray-700 hover:text-[#C09578] transition-colors duration-300 cursor-pointer">
                                                            Tv Units
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            {/* MIRROR COLUMN */}
                                            <div>
                                                <h4 className="font-bold font-playfair mb-3 text-black text-base">MIRROR</h4>
                                                <ul className="space-y-2 font-normal text-sm">
                                                    <li>
                                                        <a href="#" className="text-gray-700 hover:text-[#C09578] transition-colors duration-300 cursor-pointer">
                                                            Wooden Mirrors
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </li>
                            {/* SOFA */}
                            <li
                                className="relative"
                                onMouseEnter={() => handleMenuOpen('sofa')}
                                onMouseLeave={handleMenuClose}
                            >
                                <button
                                    className="flex items-center justify-between w-full py-2 px-3 text-black font-bold rounded-sm hover:text-[#C09578] hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 md:w-auto transition-colors duration-300 cursor-pointer"
                                    type="button"
                                >
                                    SOFA
                                    <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </button>
                                {/* SOFA MEGA MENU */}
                                {openMenu === 'sofa' && (
                                    <div
                                        className="absolute left-0 top-10 z-20 min-w-max bg-white shadow-lg rounded-lg py-6 px-8 mt-2"
                                        onMouseEnter={() => handleMenuPersist('sofa')}
                                        onMouseLeave={handleMenuClose}
                                    >
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                                            {/* SOFA CUM BED COLUMN */}
                                            <div>
                                                <h4 className="font-bold font-playfair mb-3 text-black text-base">SOFA CUM BED</h4>
                                                <ul className="space-y-2 font-normal text-sm">
                                                    <li>
                                                        <a href="#" className="text-gray-700 hover:text-[#C09578] transition-colors duration-300 cursor-pointer">
                                                            Wooden Sofa Cum Bed
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            {/* SOFA SETS COLUMN */}
                                            <div>
                                                <h4 className="font-bold font-playfair mb-3 text-black text-base">SOFA SETS</h4>
                                                <ul className="space-y-2 font-normal text-sm">
                                                    <li>
                                                        <a href="#" className="text-gray-700 hover:text-[#C09578] transition-colors duration-300 cursor-pointer">
                                                            L Shape Sofa
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" className="text-gray-700 hover:text-[#C09578] transition-colors duration-300 cursor-pointer">
                                                            1 Seater Sofa
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" className="text-gray-700 hover:text-[#C09578] transition-colors duration-300 cursor-pointer">
                                                            2 Seater Sofa
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" className="text-gray-700 hover:text-[#C09578] transition-colors duration-300 cursor-pointer">
                                                            3 Seater Sofa
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" className="text-gray-700 hover:text-[#C09578] transition-colors duration-300 cursor-pointer">
                                                            Wooden Sofa Sets
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" className="text-gray-700 hover:text-[#C09578] transition-colors duration-300 cursor-pointer">
                                                            Normal
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            {/* SWING JHULA COLUMN */}
                                            <div>
                                                <h4 className="font-bold font-playfair mb-3 text-black text-base">SWING JHULA</h4>
                                                <ul className="space-y-2 font-normal text-sm">
                                                    <li>
                                                        <a href="#" className="text-gray-700 hover:text-[#C09578] transition-colors duration-300 cursor-pointer">
                                                            Wooden Jhula
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </li>
                            {/* PAGES */}
                            <li
                                className="relative"
                                onMouseEnter={() => handleMenuOpen('pages')}
                                onMouseLeave={handleMenuClose}
                            >
                                <button
                                    className="flex items-center justify-between w-25 py-2 px-3 text-black font-bold rounded-sm hover:text-[#C09578] hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 md:w-auto transition-colors duration-300 cursor-pointer"
                                    type="button"
                                >
                                    PAGES
                                    <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </button>
                                {/* PAGES MEGA MENU */}
                                {openMenu === 'pages' && (
                                    <div
                                        className="absolute left-0 top-10 z-20 bg-white shadow-lg rounded-lg py-6 px-8 mt-2 w-fit min-w-[220px]"
                                        onMouseEnter={() => handleMenuPersist('pages')}
                                        onMouseLeave={handleMenuClose}
                                    >
                                        <div>
                                            <h4 className="font-bold font-playfair mb-3 text-black text-base">PAGES</h4>
                                            <ul className="space-y-2 font-normal text-sm">
                                                <li>
                                                    <Link href={"/about-us"} className="text-gray-700 hover:text-[#C09578] transition-colors duration-300 cursor-pointer">
                                                        About Us
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href={"/cart"} className="text-gray-700 hover:text-[#C09578] transition-colors duration-300 cursor-pointer">
                                                        Cart
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href={"/checkout"} className="text-gray-700 hover:text-[#C09578] transition-colors duration-300 cursor-pointer">
                                                        Checkout
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href={"/faq"} className="text-gray-700 hover:text-[#C09578] transition-colors duration-300 cursor-pointer">
                                                        Frequently Asked Questions
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </li>
                            {/* CONTACT US */}
                            <li>
                                <Link href={"/contact-us"} className="block py-2 px-3 text-black bg-white rounded-sm md:bg-white md:text-black md:p-0 font-bold cursor-pointer" aria-current="page">CONTACT US</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <hr className="border-[#f2f2f2] border-1" />
        </div>
    );
}