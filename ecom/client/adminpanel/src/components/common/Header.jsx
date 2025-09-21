import React, { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { FaLock } from "react-icons/fa";
import { HiMiniUserCircle } from "react-icons/hi2";
import { RiIdCardLine } from "react-icons/ri";
export default function Header() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Open dropdown on user photo hover, close on mouse leave from photo or dropdown
    const handlePhotoEnter = () => setDropdownOpen(true);
    const handleDropdownLeave = () => setDropdownOpen(false);

    return (
        <div>
            <nav className="bg-white border-white-200 dark:bg-white-900 shadow-lg">
                <div className="w-full flex items-center justify-between mx-auto p-3">
                    {/* Dashboard left */}
                    <div className="flex items-center" id="navbar-user">
                        <a href="#" className="block py-3 items-center gap-4 flex px-3 text-black bg-blue-700 rounded-sm md:bg-transparent md:text-white-700 md:p-0 md:dark:text-black-500 font-bold " aria-current="page"> <span className='hover:text-blue-900 text-xl'><GiHamburgerMenu /></span><span className='hover:text-blue-900 text-xl'>Dashboard</span></a>
                    </div>
                    {/* User photo right */}
                    <div className="flex items-center" style={{ position: 'relative' }}>
                        <button
                            type="button"
                            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                            id="user-menu-button"
                            aria-expanded={dropdownOpen}
                            onMouseEnter={handlePhotoEnter}
                        >
                            <span className="sr-only">Open user menu</span>
                            <img className="w-12 h-12 rounded-full" src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="user photo" />
                        </button>
                        {/* Dropdown menu - absolutely positioned outside header */}
                        {dropdownOpen && (
                            <div
                                className="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600"
                                id="user-dropdown"
                                style={{ position: 'absolute', top: '60px', right: '0px' }}
                                onMouseLeave={handleDropdownLeave}
                            >
                                <ul className="py-2 w-40" aria-labelledby="user-menu-button">
                                    <li>
                                        <a href="#" className="block flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"><span><HiMiniUserCircle /></span>Profile</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"><span><RiIdCardLine /></span>Company Profile</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"><span><FaLock /></span>Logout</a>
                                    </li>
                                </ul>
                            </div>
                        )}
                        <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    )
}