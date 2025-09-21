import React from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'

export default function Layout() {
    return (
        <section className='grid lg:grid-cols-[15%_auto] md:grid-cols-[5%_auto] '>
            <aside>
                <Sidebar />
            </aside>
            <div>
                <Header />
                <Outlet />
                <Footer />
            </div>
        </section>
    )
}