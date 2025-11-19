"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../redux/slice/userSlice';
import { updateCartItemAsync, deleteCartItemAsync } from '../redux/slice/cartSlice';
import { redirect } from 'next/navigation';
import { viewCompanyProfile } from '../../apiServices/addressUpdate';
import { getCategoriesForFilter } from '../../apiServices/productService';

export default function Header() {
    const [openMenu, setOpenMenu] = useState(null);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const [cartSliderOpen, setCartSliderOpen] = useState(false);
    const closeTimeout = useRef();
    const [clientLoginUser, setClientLoginUser] = useState(null);

    const [companyInfo, setCompanyInfo] = useState({
        address: '',
        phone: '',
        email: ''
    });
    const [categories, setCategories] = useState([]);

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

    // Helper function to find category/subcategory/subsubcategory by name
    const findCategoryByName = (name, categoryName = null) => {
        if (!name || categories.length === 0) return null;
        
        const searchName = name.toLowerCase().trim();
        
        for (const category of categories) {
            // First check if the category name itself matches (when searching for a category directly)
            if (!categoryName) {
                const catName = category.categoryName?.toLowerCase().trim();
                // Try exact match first, then partial match
                if (catName === searchName || catName?.includes(searchName)) {
                    return { type: 'category', id: category._id };
                }
            }
            
            // Check if category name matches (for LIVING, SOFA) when categoryName parameter is provided
            if (categoryName && category.categoryName?.toLowerCase().includes(categoryName.toLowerCase())) {
                // If we're looking for a specific category, search within it
                if (categoryName.toLowerCase() === 'living' || categoryName.toLowerCase() === 'sofa') {
                    // Search in subcategories
                    for (const subcat of category.subcategories || []) {
                        if (subcat.subcategoryName?.toLowerCase().includes(searchName)) {
                            return { type: 'subcategory', id: subcat._id };
                        }
                        // Search in subsubcategories
                        for (const subsubcat of subcat.subsubcategories || []) {
                            if (subsubcat.subsubcategoryName?.toLowerCase().includes(searchName)) {
                                return { type: 'subsubcategory', id: subsubcat._id };
                            }
                        }
                    }
                }
                return { type: 'category', id: category._id };
            }
            
            // Search in subcategories
            for (const subcat of category.subcategories || []) {
                if (subcat.subcategoryName?.toLowerCase().includes(searchName)) {
                    return { type: 'subcategory', id: subcat._id };
                }
                // Search in subsubcategories
                for (const subsubcat of subcat.subsubcategories || []) {
                    if (subsubcat.subsubcategoryName?.toLowerCase().includes(searchName)) {
                        return { type: 'subsubcategory', id: subsubcat._id };
                    }
                }
            }
        }
        return null;
    };

    // Helper function to build online store URL
    const getOnlineStoreUrl = (categoryName, itemName = null) => {
        if (itemName) {
            const found = findCategoryByName(itemName, categoryName);
            if (found) {
                if (found.type === 'category') {
                    return `/online-store?category=${found.id}&page=1`;
                } else if (found.type === 'subcategory') {
                    return `/online-store?subcategory=${found.id}&page=1`;
                } else if (found.type === 'subsubcategory') {
                    return `/online-store?subsubcategory=${found.id}&page=1`;
                }
            }
            // Fallback to search if not found
            return `/online-store?search=${encodeURIComponent(itemName)}&page=1`;
        } else {
            // Just category
            const found = findCategoryByName(categoryName);
            if (found && found.type === 'category') {
                return `/online-store?category=${found.id}&page=1`;
            }
            // Fallback to search
            return `/online-store?search=${encodeURIComponent(categoryName)}&page=1`;
        }
    };

    let loginUser = useSelector((store) => store.myUser.user);

    let dispatch = useDispatch();

    let logOutUser = () => {
        dispatch(logOut());
        redirect('/login-register');
    }

    let cart = useSelector((mystore) => mystore.mycart.cartItem);
    let staticImagePath = useSelector((mystore) => mystore.mycart.staticImagePath || "");
    let wishlist = useSelector((mystore) => mystore.myWishlist.wishlist || []);
    let user = useSelector((store) => store.myUser.user);
    let userId = user?.userId || user?._id || user?.id;
    let token = useSelector((store) => store.myUser.token);

    // Dynamic cart count: sum of all item quantities
    let cartCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    // Wishlist count: number of items in wishlist
    let wishlistCount = wishlist.length;

    // Backend-synced cart actions
    const handleUpdateQty = async (pid, qty) => {
        if (!userId || !token) return;
        try {
            const result = await dispatch(updateCartItemAsync({ pid, qty, userId, token })).unwrap();
        } catch (error) {
        }
    };

    const handleRemoveCart = async (pid) => {
        if (!userId || !token) return;
        try {
            await dispatch(deleteCartItemAsync({ pid, userId, token })).unwrap();
        } catch (error) {
        }
    };

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
                        email: res.data.email || ''
                    });
                }
            } catch (err) {
                // fallback to default if error
                setCompanyInfo({
                    address: '',
                    phone: '',
                    email: ''
                });
            }
        }
        fetchCompanyDetails();

        // Fetch categories for menu links
        async function fetchCategories() {
            try {
                const res = await getCategoriesForFilter();
                if (res && res.status !== false && res.data) {
                    setCategories(res.data);
                }
            } catch (err) {
                console.warn('Failed to fetch categories for header:', err);
            }
        }
        fetchCategories();
    }, [loginUser]);

    useEffect(() => {
        setClientLoginUser(loginUser);
    }, [loginUser]);

    return (
        <div>
            {/* Top Contact Bar */}
            <div className="w-full border-b border-gray-200 bg-white flex flex-col md:flex-row justify-evenly items-center px-4 md:px-8 py-3 text-sm gap-y-2 md:gap-x-40 text-black">
                <div>
                    Contact us 24/7 : <a href={`tel:${companyInfo.phone || '+9198745612330'}`} className="hover:text-[#C09578] transition-colors duration-150">{companyInfo.phone || '+91-98745612330'}</a> / <a href={`mailto:${companyInfo.email || 'furnitureinfo@gmail.com'}`} className="hover:text-[#C09578] transition-colors duration-150">{companyInfo.email || 'furnitureinfo@gmail.com'}</a>
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
                        <button className="ml-2 text-black hover:text-[#C09578] cursor-pointer">
                            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                        </button>
                    </div>
                    {/* Wishlist */}
                    <Link href={"/wishlist"} className="w-full sm:w-auto">
                        <button className="border border-gray-200 rounded px-4 py-2 bg-white flex items-center justify-center hover:bg-gray-100 transition-colors duration-150 group w-full sm:w-auto cursor-pointer relative">
                            <span className="relative flex items-center">
                                <svg
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    className="text-black group-hover:text-[#C09578] transition-colors duration-150"
                                >
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                                {wishlistCount > 0 && (
                                    <span className="absolute -top-3 -right-4 bg-[#C09578] text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">{wishlistCount}</span>
                                )}
                            </span>
                        </button>
                    </Link>
                    {/* Cart */}
                    <div
                        className="flex items-center border border-gray-300 rounded px-4 py-2 bg-white hover:bg-gray-100 w-full sm:w-auto cursor-pointer"
                        onClick={() => setCartSliderOpen(true)}
                    >
                        <span className="relative flex items-center mr-3">
                            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-black">
                                <circle cx="9" cy="21" r="1" />
                                <circle cx="20" cy="21" r="1" />
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                            </svg>
                            <span className="absolute -top-3 -right-4 bg-[#C09578] text-white text-xs rounded-full px-2 py-0.5">{cartCount}</span>
                        </span>
                        {/* Separator line */}
                        <span className="h-6 w-px bg-gray-300 mx-2"></span>
                        <span className="font-bold text-black flex items-center">
                            <span className="mr-1">₹.</span>
                            <span>{cart.reduce((total, item) => total + (Number(item.price || 0) * Number(item.qty || 1)), 0).toFixed(2)}</span>
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
                    className="text-black text-2xl cursor-pointer"
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
                                <Link
                                    href={getOnlineStoreUrl('living')}
                                    className="flex items-center justify-between w-full py-2 px-3 text-black font-bold rounded-sm hover:text-[#C09578] hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 md:w-auto transition-colors duration-300 cursor-pointer"
                                >
                                    LIVING
                                    <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </Link>
                                {/* MEGA MENU */}
                                {openMenu === 'living' && (
                                    <div
                                        className="absolute left-0 top-10 z-20 min-w-max bg-white shadow-lg rounded-lg py-6 px-8 mt-2 animate-flip-horizontal"
                                        onMouseEnter={() => handleMenuPersist('living')}
                                        onMouseLeave={handleMenuClose}
                                    >
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                                            {/* TABLES COLUMN */}
                                            <div>
                                                <h4 className="font-bold font-playfair mb-4 text-black text-lg">TABLES</h4>
                                                <ul className="space-y-3">
                                                    <li>
                                                        <Link href={getOnlineStoreUrl('living', 'Side And End Tables')} className="text-gray-800 hover:text-[#C09578] transition-all duration-300 cursor-pointer text-base font-medium tracking-wide">
                                                            Side And End Tables
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href={getOnlineStoreUrl('living', 'Nest Of Tables')} className="text-gray-800 hover:text-[#C09578] transition-all duration-300 cursor-pointer text-base font-medium tracking-wide">
                                                            Nest Of Tables
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href={getOnlineStoreUrl('living', 'Coffee Table Sets')} className="text-gray-800 hover:text-[#C09578] transition-all duration-300 cursor-pointer text-base font-medium tracking-wide">
                                                            Coffee Table Sets
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href={getOnlineStoreUrl('living', 'Coffee Tables')} className="text-gray-800 hover:text-[#C09578] transition-all duration-300 cursor-pointer text-base font-medium tracking-wide">
                                                            Coffee Tables
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                            {/* LIVING STORAGE COLUMN */}
                                            <div>
                                                <h4 className="font-bold font-playfair mb-4 text-black text-lg">LIVING STORAGE</h4>
                                                <ul className="space-y-3">
                                                    <li>
                                                        <Link href={getOnlineStoreUrl('living', 'Prayer Units')} className="text-gray-800 hover:text-[#C09578] transition-all duration-300 cursor-pointer text-base font-medium tracking-wide">
                                                            Prayer Units
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href={getOnlineStoreUrl('living', 'Display Unit')} className="text-gray-800 hover:text-[#C09578] transition-all duration-300 cursor-pointer text-base font-medium tracking-wide">
                                                            Display Unit
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href={getOnlineStoreUrl('living', 'Shoe Racks')} className="text-gray-800 hover:text-[#C09578] transition-all duration-300 cursor-pointer text-base font-medium tracking-wide">
                                                            Shoe Racks
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href={getOnlineStoreUrl('living', 'Chest Of Drawers')} className="text-gray-800 hover:text-[#C09578] transition-all duration-300 cursor-pointer text-base font-medium tracking-wide">
                                                            Chest Of Drawers
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href={getOnlineStoreUrl('living', 'Cabinets And Sideboard')} className="text-gray-800 hover:text-[#C09578] transition-all duration-300 cursor-pointer text-base font-medium tracking-wide">
                                                            Cabinets And Sideboard
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href={getOnlineStoreUrl('living', 'Bookshelves')} className="text-gray-800 hover:text-[#C09578] transition-all duration-300 cursor-pointer text-base font-medium tracking-wide">
                                                            Bookshelves
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href={getOnlineStoreUrl('living', 'Tv Units')} className="text-gray-800 hover:text-[#C09578] transition-all duration-300 cursor-pointer text-base font-medium tracking-wide">
                                                            Tv Units
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                            {/* MIRROR COLUMN */}
                                            <div>
                                                <h4 className="font-bold font-playfair mb-4 text-black text-lg">MIRROR</h4>
                                                <ul className="space-y-3">
                                                    <li>
                                                        <Link href={getOnlineStoreUrl('living', 'Wooden Mirrors')} className="text-gray-800 hover:text-[#C09578] transition-all duration-300 cursor-pointer text-base font-medium tracking-wide">
                                                            Wooden Mirrors
                                                        </Link>
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
                                <Link
                                    href={getOnlineStoreUrl('sofa')}
                                    className="flex items-center justify-between w-full py-2 px-3 text-black font-bold rounded-sm hover:text-[#C09578] hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 md:w-auto transition-colors duration-300 cursor-pointer"
                                >
                                    SOFA
                                    <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </Link>
                                {/* SOFA MEGA MENU */}
                                {openMenu === 'sofa' && (
                                    <div
                                        className="absolute left-0 top-10 z-20 min-w-max bg-white shadow-lg rounded-lg py-6 px-8 mt-2 animate-flip-horizontal"
                                        onMouseEnter={() => handleMenuPersist('sofa')}
                                        onMouseLeave={handleMenuClose}
                                    >
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                                            {/* SOFA CUM BED COLUMN */}
                                            <div>
                                                <h4 className="font-bold font-playfair mb-4 text-black text-lg">SOFA CUM BED</h4>
                                                <ul className="space-y-3">
                                                    <li>
                                                        <Link href={getOnlineStoreUrl('sofa', 'Wooden Sofa Cum Bed')} className="text-gray-800 hover:text-[#C09578] transition-all duration-300 cursor-pointer text-base font-medium tracking-wide">
                                                            Wooden Sofa Cum Bed
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                            {/* SOFA SETS COLUMN */}
                                            <div>
                                                <h4 className="font-bold font-playfair mb-4 text-black text-lg">SOFA SETS</h4>
                                                <ul className="space-y-3">
                                                    <li>
                                                        <Link href={getOnlineStoreUrl('sofa', 'L Shape Sofa')} className="text-gray-800 hover:text-[#C09578] transition-all duration-300 cursor-pointer text-base font-medium tracking-wide">
                                                            L Shape Sofa
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href={getOnlineStoreUrl('sofa', '1 Seater Sofa')} className="text-gray-800 hover:text-[#C09578] transition-all duration-300 cursor-pointer text-base font-medium tracking-wide">
                                                            1 Seater Sofa
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href={getOnlineStoreUrl('sofa', '2 Seater Sofa')} className="text-gray-800 hover:text-[#C09578] transition-all duration-300 cursor-pointer text-base font-medium tracking-wide">
                                                            2 Seater Sofa
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href={getOnlineStoreUrl('sofa', '3 Seater Sofa')} className="text-gray-800 hover:text-[#C09578] transition-all duration-300 cursor-pointer text-base font-medium tracking-wide">
                                                            3 Seater Sofa
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href={getOnlineStoreUrl('sofa', 'Wooden Sofa Sets')} className="text-gray-800 hover:text-[#C09578] transition-all duration-300 cursor-pointer text-base font-medium tracking-wide">
                                                            Wooden Sofa Sets
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href={getOnlineStoreUrl('sofa', 'Normal')} className="text-gray-800 hover:text-[#C09578] transition-all duration-300 cursor-pointer text-base font-medium tracking-wide">
                                                            Normal
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                            {/* SWING JHULA COLUMN */}
                                            <div>
                                                <h4 className="font-bold font-playfair mb-4 text-black text-lg">SWING JHULA</h4>
                                                <ul className="space-y-3">
                                                    <li>
                                                        <Link href={getOnlineStoreUrl('sofa', 'Wooden Jhula')} className="text-gray-800 hover:text-[#C09578] transition-all duration-300 cursor-pointer text-base font-medium tracking-wide">
                                                            Wooden Jhula
                                                        </Link>
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
                                        className="absolute left-0 top-10 z-20 bg-white shadow-lg rounded-lg py-6 px-8 mt-2 w-fit min-w-[220px] animate-flip-horizontal"
                                        onMouseEnter={() => handleMenuPersist('pages')}
                                        onMouseLeave={handleMenuClose}
                                    >
                                        <div>
                                            <h4 className="font-bold font-playfair mb-4 text-black text-lg">PAGES</h4>
                                            <ul className="space-y-3">
                                                <li>
                                                    <Link href={"/about-us"} className="text-gray-800 hover:text-[#C09578] transition-all duration-300 cursor-pointer text-base font-medium tracking-wide">
                                                        About Us
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href={"/cart"} className="text-gray-800 hover:text-[#C09578] transition-all duration-300 cursor-pointer text-base font-medium tracking-wide">
                                                        Cart
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href={"/checkout"} className="text-gray-800 hover:text-[#C09578] transition-all duration-300 cursor-pointer text-base font-medium tracking-wide">
                                                        Checkout
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href={"/faq"} className="text-gray-800 hover:text-[#C09578] transition-all duration-300 cursor-pointer text-base font-medium tracking-wide">
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

            {/* Cart Slider */}
            {cartSliderOpen && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0  bg-opacity-50 z-40"
                        onClick={() => setCartSliderOpen(false)}
                    ></div>

                    {/* Slider */}
                    <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out animate-slide-in-right">
                        <div className="flex flex-col h-full">
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
                                <h2 className="text-xl font-bold text-black">Shopping Cart</h2>
                                <button
                                    onClick={() => setCartSliderOpen(false)}
                                    className="text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
                                >
                                    ×
                                </button>
                            </div>

                            {/* Cart Items */}
                            <div className="flex-1 overflow-y-auto p-4">
                                {cart.length === 0 ? (
                                    <div className="text-center py-8">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <circle cx="9" cy="21" r="1" />
                                            <circle cx="20" cy="21" r="1" />
                                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                                        </svg>
                                        <p className="mt-2 text-gray-500">Your cart is empty</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {cart.map((item) => {
                                            // Build image URL using staticImagePath if image is present
                                            let imageUrl = item.image || '';
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
                                            <div key={item.pid || item._id || item.id} className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg">
                                                <img
                                                    src={imageUrl}
                                                    alt={item.title || item.name}
                                                    className="w-16 h-16 object-cover rounded"
                                                    onError={(e) => {
                                                        const currentSrc = e.target.src;
                                                        if (currentSrc && !currentSrc.includes('/no-image.png') && !currentSrc.includes('data:')) {
                                                            e.target.onerror = null;
                                                            e.target.src = "/no-image.png";
                                                        }
                                                    }}
                                                />
                                                <div className="flex-1">
                                                    <h3 className="font-medium text-black text-sm">{item.title || item.name}</h3>
                                                    <p className="text-gray-600 text-sm">₹{Number(item.price || 0).toLocaleString()}</p>
                                                    <div className="flex items-center space-x-2 mt-2">
                                                        <span className="text-sm text-gray-600">Qty:</span>
                                                        <div className="flex items-center border border-gray-300 rounded">
                                                            <button
                                                                onClick={() => handleUpdateQty(item.pid, Math.max(1, (item.qty || 1) - 1))}
                                                                className="px-2 py-1 text-gray-600 hover:text-black cursor-pointer"
                                                            >
                                                                -
                                                            </button>
                                                            <span className="px-3 py-1 text-sm text-black border-x border-gray-300">{item.qty || 1}</span>
                                                            <button
                                                                onClick={() => handleUpdateQty(item.pid, (item.qty || 1) + 1)}
                                                                className="px-2 py-1 text-gray-600 hover:text-black cursor-pointer"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-semibold text-black">₹{(Number(item.price || 0) * Number(item.qty || 1)).toFixed(2)}</p>
                                                    <button
                                                        onClick={() => handleRemoveCart(item.pid)}
                                                        className="text-red-500 hover:text-red-700 text-sm mt-1 cursor-pointer"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            {cart.length > 0 && (
                                <div className="border-t border-gray-200 p-4 bg-gray-50">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-lg font-semibold text-black">Total:</span>
                                        <span className="text-lg font-bold text-black">
                                            ₹{cart.reduce((total, item) => total + (Number(item.price || 0) * Number(item.qty || 1)), 0).toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="space-y-2">
                                        <Link
                                            href="/cart"
                                            className="block w-full bg-[#C09578] text-white text-center py-3 rounded-lg font-semibold hover:bg-[#A07A5A] transition-colors"
                                            onClick={() => setCartSliderOpen(false)}
                                        >
                                            View Cart
                                        </Link>
                                        <Link
                                            href="/checkout"
                                            className="block w-full bg-black text-white text-center py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                                            onClick={() => setCartSliderOpen(false)}
                                        >
                                            Checkout
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}