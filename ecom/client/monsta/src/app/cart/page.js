import React from 'react'
import Breadcrumb from '../common/Breadcrumb'

export default function Cart() {
  return (
    <div>
        <Breadcrumb pageName={"Shopping Cart"} />
        <div >
        <img 
        src='https://wscubetech.co/Assignments/furniture/public/frontend/img/icon/my-Order.jpg' alt=''
        className='justify-center mx-auto mb-5'
        ></img>
        <p className='text-black text-lg text-center mb-10'>Your shopping cart is empty!</p>
        </div>
    </div>
  )
}
