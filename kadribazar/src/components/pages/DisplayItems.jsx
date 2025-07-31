import React from 'react'
import cartItems from '../data/Data.jsx'

export default function DisplayItems() {
  return (
    <div>
      {cartItems.map(item => (
        <div key={item.id} className="mb-4">
          <p>Name: <span>{item.name}</span></p>
          <p>Brand: <span>{item.brand}</span></p>
          <p>Price: <span>{item.price}</span></p>
          <p>Qty: <span>{item.qty}</span></p>
        </div>
      ))}
    </div>
  )
}