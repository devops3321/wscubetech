import React, { useState } from 'react'
import { FaUser } from "react-icons/fa";
import { FaRegDotCircle } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { FaDroplet } from "react-icons/fa6";
import { FaBarsStaggered } from "react-icons/fa6";
import { FaExpandArrowsAlt } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaSliders } from "react-icons/fa6";
import { FaLocationArrow } from "react-icons/fa";
import { FaUserPen } from "react-icons/fa6";
import { IoMdChatboxes } from "react-icons/io";
import { LuFileSpreadsheet } from "react-icons/lu";
import { Link } from 'react-router-dom';

export default function Sidebar() {
    const [openUsers, setOpenUsers] = useState(false);
    const [openEnquires, setOpenEnquires] = useState(false);
    const [openColors, setOpenColors] = useState(false);
    const [openMaterials, setOpenMaterials] = useState(false);
    const [openParentCategories, setOpenParentCategories] = useState(false);
    const [openSubCategories, setOpenSubCategories] = useState(false);
    const [openSubSubCategories, setOpenSubSubCategories] = useState(false);
    const [openProducts, setOpenProducts] = useState(false);
    const [openWhyChooseUs, setOpenWhyChooseUs] = useState(false);
    const [openOrders, setOpenOrders] = useState(false);
    const [openSlider, setOpenSlider] = useState(false);
    const [openCountry, setOpenCountry] = useState(false);
    const [openTestimonials, setOpenTestimonials] = useState(false);
    const [openFaqs, setOpenFaqs] = useState(false);
    const [openTnc, setOpenTnc] = useState(false);


    return (
        <div>
            <button data-drawer-target="sidebar-multi-level-sidebar" data-drawer-toggle="sidebar-multi-level-sidebar" aria-controls="sidebar-multi-level-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="sidebar-multi-level-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <div className='mb-4'>
                        <Link to={'/dashboard'}><img className="ms-4 my-1" src="https://www.wscubetech.com/images/ws-cube-white-logo.svg" alt="companyLogo" /></Link>
                        <hr className="w-full border-t border-gray-300 my-4" />
                    </div>
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link to={"/dashboard"} className="flex cursor-pointer items-center mb-5 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                </svg>
                                <span className="ms-3">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="flex cursor-pointer items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                aria-controls="dropdown"
                                onClick={() => setOpenUsers(!openUsers)}
                            >
                                <FaUser />
                                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Users</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <ul id="dropdown" className={`${openUsers ? '' : 'hidden'} py-2 space-y-2`}>
                                <li>
                                    <Link to={'/viewuser'} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-2 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"> <span className='me-3'><FaRegDotCircle /></span> View User</Link>
                                </li>

                            </ul>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="flex cursor-pointer items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                aria-controls="dropdown"
                                onClick={() => setOpenEnquires(!openEnquires)}
                            >
                                <FaMessage />
                                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Enquires</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <ul id="dropdown" className={`${openEnquires ? '' : 'hidden'} py-2 space-y-2`}>
                                <li>
                                    <Link to={'contactenquirymgmt'} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-2 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"> <span className='me-3'><FaRegDotCircle /></span>Contact Enquiries</Link>
                                </li>
                                <li>
                                    <Link to={'/newsletter'} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-2 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"> <span className='me-3'><FaRegDotCircle /></span>Newsletters</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="flex cursor-pointer items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                aria-controls="dropdown"
                                onClick={() => setOpenColors(!openColors)}
                            >
                                <FaDroplet />
                                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Colors</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <ul id="dropdown" className={`${openColors ? '' : 'hidden'} py-2 space-y-2`}>
                                <li>
                                    <Link to={'/color/add'} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-2 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"> <span className='me-3'><FaRegDotCircle /></span>Add Color</Link>
                                </li>
                                <li>
                                    <Link to={'/color/view'} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-2 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"> <span className='me-3'><FaRegDotCircle /></span>View Color</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="flex cursor-pointer items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                aria-controls="dropdown"
                                onClick={() => setOpenMaterials(!openMaterials)}
                            >
                                <FaExpandArrowsAlt />
                                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Materials</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <ul id="dropdown" className={`${openMaterials ? '' : 'hidden'} py-2 space-y-2`}>
                                <li>
                                    <Link to={'/material/add'} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-2 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"> <span className='me-3'><FaRegDotCircle /></span>Add Material</Link>
                                </li>
                                <li>
                                    <Link to={'/material/view'} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-2 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"> <span className='me-3'><FaRegDotCircle /></span>View Material</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="flex cursor-pointer items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                aria-controls="dropdown"
                                onClick={() => setOpenParentCategories(!openParentCategories)}
                            >
                                <FaBarsStaggered />
                                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Parent Categories</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <ul id="dropdown" className={`${openParentCategories ? '' : 'hidden'} py-2 space-y-2`}>
                                <li>
                                    <Link to={'/category/add'} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-2 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"> <span className='me-3'><FaRegDotCircle /></span>Add Category</Link>
                                </li>
                                <li>
                                    <Link to={'/category/view'} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-2 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"> <span className='me-3'><FaRegDotCircle /></span>View Category</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="flex cursor-pointer items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                aria-controls="dropdown"
                                onClick={() => setOpenSubCategories(!openSubCategories)}
                            >
                                <FaBarsStaggered />
                                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Sub Categories</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <ul id="dropdown" className={`${openSubCategories ? '' : 'hidden'} py-2 space-y-2`}>
                                <li>
                                    <Link to={'/subcategory/add'} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-2 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"> <span className='me-3'><FaRegDotCircle /></span>Add Sub Category</Link>
                                </li>
                                <li>
                                    <Link to={'/subcategory/view'} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-2 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"> <span className='me-3'><FaRegDotCircle /></span>View Sub Category</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="flex cursor-pointer items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                aria-controls="dropdown"
                                onClick={() => setOpenSubSubCategories(!openSubSubCategories)}
                            >
                                <FaBarsStaggered />
                                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Sub Sub Categories</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <ul id="dropdown" className={`${openSubSubCategories ? '' : 'hidden'} py-2 space-y-2`}>
                                <li>
                                    <Link to={'/subsubcategory/add'} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-2 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"> <span className='me-3'><FaRegDotCircle /></span>Add Sub Sub Category</Link>
                                </li>
                                <li>
                                    <Link to={'/subsubcategory/view'} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-2 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"> <span className='me-3'><FaRegDotCircle /></span>View Sub Sub Category</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="flex cursor-pointer items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                aria-controls="dropdown"
                                onClick={() => setOpenProducts(!openProducts)}
                            >
                                <FaShoppingBag />
                                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Products</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <ul id="dropdown" className={`${openProducts ? '' : 'hidden'} py-2 space-y-2`}>
                                <li>
                                    <Link to={'/product/add'} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-2 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"> <span className='me-3'><FaRegDotCircle /></span>Add Product</Link>
                                </li>
                                <li>
                                    <Link to={'/product/product-items'} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-2 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"> <span className='me-3'><FaRegDotCircle /></span>View Product</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="flex cursor-pointer items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                aria-controls="dropdown"
                                onClick={() => setOpenWhyChooseUs(!openWhyChooseUs)}
                            >
                                <FaHistory />
                                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Why Choose Us</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <ul id="dropdown" className={`${openWhyChooseUs ? '' : 'hidden'} py-2 space-y-2`}>
                                <li>
                                    <Link to={'/whychooseus/add'} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-2 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"> <span className='me-3'><FaRegDotCircle /></span>Add Why Choose Us</Link>
                                </li>
                                <li>
                                    <Link to={'/whychooseus/view'} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-2 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"> <span className='me-3'><FaRegDotCircle /></span>View Why Choose Us</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="flex cursor-pointer items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                aria-controls="dropdown"
                                onClick={() => setOpenOrders(!openOrders)}
                            >
                                <FaEdit />
                                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Orders</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <ul id="dropdown" className={`${openOrders ? '' : 'hidden'} py-2 space-y-2`}>
                                <li>
                                    <Link to={'/orders'} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-2 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"> <span className='me-3'><FaRegDotCircle /></span>Orders</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="flex cursor-pointer items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                aria-controls="dropdown"
                                onClick={() => setOpenSlider(!openSlider)}
                            >
                                <FaSliders />
                                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Sliders</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <ul id="dropdown" className={`${openSlider ? '' : 'hidden'} py-2 space-y-2`}>
                                <li>
                                    <Link to={'/slider/add'} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-2 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"> <span className='me-3'><FaRegDotCircle /></span>Add Slider</Link>
                                </li>
                                <li>
                                    <Link to={'/slider/view'} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-2 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"> <span className='me-3'><FaRegDotCircle /></span>View Slider</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="flex cursor-pointer items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                aria-controls="dropdown"
                                onClick={() => setOpenCountry(!openCountry)}
                            >
                                <FaLocationArrow />
                                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Country</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <ul id="dropdown" className={`${openCountry ? '' : 'hidden'} py-2 space-y-2`}>
                                <li>
                                    <Link to={'/country/add'} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-2 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"> <span className='me-3'><FaRegDotCircle /></span>Add Country</Link>
                                </li>
                                <li>
                                    <Link to={'/country/view'} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-2 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"> <span className='me-3'><FaRegDotCircle /></span>View Country</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="flex cursor-pointer items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                aria-controls="dropdown"
                                onClick={() => setOpenTestimonials(!openTestimonials)}
                            >
                                <FaUserPen />
                                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Testimonials</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <ul id="dropdown" className={`${openTestimonials ? '' : 'hidden'} py-2 space-y-2`}>
                                <li>
                                    <Link to={'/testimonial/add'} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-2 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"> <span className='me-3'><FaRegDotCircle /></span>Add Testimonial</Link>
                                </li>
                                <li>
                                    <Link to={'/testimonial/view'} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-2 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"> <span className='me-3'><FaRegDotCircle /></span>View Testimonial</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="flex cursor-pointer items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                aria-controls="dropdown"
                                onClick={() => setOpenFaqs(!openFaqs)}
                            >
                                <IoMdChatboxes />
                                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Faqs</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <ul id="dropdown" className={`${openFaqs ? '' : 'hidden'} py-2 space-y-2`}>
                                <li>
                                    <Link to={'/faq/add'} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-2 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"> <span className='me-3'><FaRegDotCircle /></span>Add Faq</Link>
                                </li>
                                <li>
                                    <Link to={'/faq/view'} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-2 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"> <span className='me-3'><FaRegDotCircle /></span>View Faq</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="flex cursor-pointer items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                aria-controls="dropdown"
                                onClick={() => setOpenTnc(!openTnc)}
                            >
                                <LuFileSpreadsheet />
                                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Terms & Conditions</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    )
}