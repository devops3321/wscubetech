import React, { useState, useContext } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { FaLock } from "react-icons/fa";
import { HiMiniUserCircle } from "react-icons/hi2";
import { RiIdCardLine } from "react-icons/ri";
import { LoginContext } from '../context/MainContext.jsx';
import { Link } from 'react-router-dom';


export default function Header() {
    const { id, setId } = useContext(LoginContext);

    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Open dropdown on user photo hover, close on mouse leave from photo or dropdown
    const handlePhotoEnter = () => setDropdownOpen(true);
    const handleDropdownLeave = () => setDropdownOpen(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-blue-100 via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-2xl rounded-b-3xl border-b border-blue-200 dark:border-gray-700">
            <nav className="flex items-center justify-between px-6 py-3">
                {/* Dashboard left */}
                <div className="flex items-center gap-4" id="navbar-user">
                    <a href="#" className="flex items-center gap-2 px-4 py-2 text-lg font-bold text-blue-900 bg-white rounded-xl shadow-sm hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 dark:text-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:shadow-lg">
                        <span className='text-2xl'><GiHamburgerMenu /></span>
                        <span className='text-xl'>Dashboard</span>
                    </a>
                </div>
                {/* User photo right */}
                <div className="flex items-center relative">
                    <button
                        type="button"
                        className="flex text-sm bg-gray-200 dark:bg-gray-700 rounded-full focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-600 border-2 border-blue-200 dark:border-gray-600"
                        id="user-menu-button"
                        aria-expanded={dropdownOpen}
                        onMouseEnter={handlePhotoEnter}
                    >
                        <span className="sr-only">Open user menu</span>
                        <img className="w-12 h-12 rounded-full object-cover border-2 border-blue-300 dark:border-gray-500" src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="user photo" />
                    </button>
                    {/* Dropdown menu - absolutely positioned outside header */}
                    {dropdownOpen && (
                        <div
                            className="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-xl shadow-lg dark:bg-gray-800 dark:divide-gray-700 border border-blue-100 dark:border-gray-700"
                            id="user-dropdown"
                            style={{ position: 'absolute', top: '60px', right: '0px' }}
                            onMouseLeave={handleDropdownLeave}
                        >
                            <ul className="py-2 w-44" aria-labelledby="user-menu-button">
                                <li>
                                    <Link to={'/adminprofile'} className="block flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-white rounded-lg transition-all duration-200"><span><HiMiniUserCircle /></span>Profile</Link>
                                </li>
                                <li>
                                    <Link to={'/companyprofile'} className="block flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-white rounded-lg transition-all duration-200"><span><RiIdCardLine /></span>Company Profile</Link>
                                </li>
                                <li>
                                    <Link onClick= {()=> setId('')} className="block flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-white rounded-lg transition-all duration-200"><span><FaLock /></span>Logout</Link>
                                </li>
                            </ul>
                        </div>
                    )}
                    <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-blue-600" aria-controls="navbar-user" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
            </nav>
        </header>
    )
}