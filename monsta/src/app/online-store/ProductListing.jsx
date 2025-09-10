import React from 'react'
import ProductCard from '../common/ProductCard';

const products = [
  {
    category: 'Side and End Tables',
    name: 'Hrithvik Stool',
    image: 'https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617981904164Hrithvik%20Stool__.jpg',
    oldPrice: 'Rs. 7,000',
    price: 'Rs. 6,000',
  },
  {
    category: 'Shoe Racks',
    name: 'Gloria Shoe Racks',
    image: 'https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/16253167208651620078433247Louise%20Cabinet_.jpg',
    oldPrice: 'Rs. 7,400',
    price: 'Rs. 2,900',
  },
  {
    category: '3 Seater Sofa',
    name: 'Victoria Sheesham Wood Sofa Set',
    image: 'https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1661502549484Group%201.jpg',
    oldPrice: 'Rs. 8,000',
    price: 'Rs. 7,000',
  },
  {
    category: 'Wooden Sofa Sets',
    name: 'Grace Sheesham Wood Sofa Set',
    image: 'https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1621171973378Isaac%20Chest%20of%20Drawer_.jpg',
    oldPrice: 'Rs. 90,000',
    price: 'Rs. 72,000',
  },
];

export default function ProductListing() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-2 md:px-4">
      {/* Sort & Results Row */}
      <div className="flex flex-col md:flex-row justify-end items-center mb-8 border-2 border-gray-200 p-4 rounded gap-4">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-black font-semibold font-playfair">Sort By :</span>
          <select className="border px-3 py-2 rounded text-black w-full md:w-auto">
            <option defaultValue={0}>Sort By</option>
            <optgroup label="Featured">
                <option>Featured Products</option>
                <option>New Arrivals</option>
                <option>On sale</option>
                <option>Best Sellings</option>
            </optgroup>
            <optgroup label="Price">
                <option>Sort by price: low to high</option>
                <option>Sort by price: high to low</option>
            </optgroup>
            <optgroup label="Name">
                <option>Product Name: A to Z</option>
                <option>Product Name: Z to A</option>
            </optgroup>
          </select>
        </div>
        <div className="text-black w-full md:w-auto text-right">
          Showing 1-4 of 4 results
        </div>
      </div>
      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product, idx) => (
          <ProductCard
            key={idx}
            category={product.category}
            name={product.name}
            image={product.image}
            oldPrice={product.oldPrice}
            price={product.price}
          />
        ))}
      </div>
    </div>
  )
}
