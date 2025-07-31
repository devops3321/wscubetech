import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router'

export default function Layout() {
  return (
    <div>
        <Header/>                    
            {/* Page Data */}
            <Outlet/>
        <Footer/>
    </div>
  )
}
