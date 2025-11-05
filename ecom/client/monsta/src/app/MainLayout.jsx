"use client"
import React from 'react';
import AppHydrateUser from './AppHydrateUser.jsx';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MainLayout({ children }) {
    return (
        <Provider store={store}>
            <AppHydrateUser />
            {children}
            {/* Single ToastContainer for the entire app */}
            <ToastContainer 
                position="top-right" 
                autoClose={2000} 
                hideProgressBar={false} 
                newestOnTop 
                closeOnClick 
                pauseOnFocusLoss 
                draggable 
                pauseOnHover 
            />
        </Provider>
    )
}