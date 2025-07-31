import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Header from './components/common/Header.jsx'
import Home from './components/pages/Home.jsx'
import Footer from './components/common/Footer.jsx'
import Register from './components/pages/Register.jsx'
import Login from './components/pages/Login.jsx'
import Cart from './components/pages/Cart.jsx'
import { BrowserRouter, Route, Routes } from "react-router"
import Layout from './components/common/Layout.jsx'
import DisplayItems from './components/pages/DisplayItems.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/items' element={<DisplayItems />}></Route>
        </Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
