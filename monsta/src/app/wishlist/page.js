import React from 'react'
import Breadcrumb from '../common/Breadcrumb'

export default function Wishlist() {
  return (
    <div>
        <Breadcrumb pageName={"My Wishlist"} />
        <div >
        <img 
        src='https://wscubetech.co/Assignments/furniture/public/frontend/img/icon/wishlist-Empty.jpg' alt=''
        className='justify-center mx-auto mb-5'
        ></img>
        <p className='text-black text-lg text-center mb-10'>Your wishlist is empty!</p>
        </div>
    </div>
  )
}
