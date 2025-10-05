import React, { useContext } from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import { LoginContext } from '../context/MainContext.jsx';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react'

export default function Layout() {

    let { id, setId } = useContext(LoginContext);

    let navigate = useNavigate();

    useEffect(() => {
        if (id == '' || id == null || id == undefined) {
            navigate('/login');
        }
    }, [id]);
    return (
        <section className="min-h-screen grid grid-cols-1 md:grid-cols-[250px_1fr] lg:grid-cols-[220px_1fr] xl:grid-cols-[15%_auto]">
            {/* Sidebar always visible, logo always at top. Never overlaps content. */}
            <aside className="min-w-[200px] max-w-xs md:sticky md:top-0 md:h-screen bg-transparent z-20 flex flex-col overflow-y-auto">
                <Sidebar />
            </aside>
            <div className="flex flex-col min-h-[calc(100vh-0px)] min-w-0 overflow-hidden">
                <Header />
                <main className="flex-1 px-2 sm:px-4 md:px-6 py-4 w-full max-w-full mx-auto min-w-0 overflow-x-auto">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </section>
    )
}