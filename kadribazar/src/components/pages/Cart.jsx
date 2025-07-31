import React, { useState } from "react";

const initialCartItems = [
  {
    id: 1,
    name: "Chanel Coco Noir Eau De",
    brand: "Chanel",
    brandColor: "text-red-400",
    img: "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp",
    price: 129.99,
    qty: 3,
  },
  {
    id: 2,
    name: "Dior J'adore",
    brand: "Dior",
    brandColor: "text-red-400",
    img: "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/thumbnail.webp",
    price: 89.99,
    qty: 1,
  },
  {
    id: 3,
    name: "Beef Steak",
    brand: "",
    brandColor: "",
    img: "https://cdn.dummyjson.com/product-images/groceries/beef-steak/thumbnail.webp",
    price: 12.99,
    qty: 2,
  },
  {
    id: 4,
    name: "Dog Food",
    brand: "",
    brandColor: "",
    img: "https://cdn.dummyjson.com/product-images/groceries/dog-food/thumbnail.webp",
    price: 10.99,
    qty: 1,
  },
  {
    id: 5,
    name: "Eggs",
    brand: "",
    brandColor: "",
    img: "https://cdn.dummyjson.com/product-images/groceries/eggs/thumbnail.webp",
    price: 2.99,
    qty: 1,
  },
  {
    id: 6,
    name: "Ice Cream",
    brand: "",
    brandColor: "",
    img: "https://cdn.dummyjson.com/product-images/groceries/ice-cream/thumbnail.webp",
    price: 5.49,
    qty: 1,
  },
  {
    id: 7,
    name: "Juice",
    brand: "",
    brandColor: "",
    img: "https://cdn.dummyjson.com/product-images/groceries/juice/thumbnail.webp",
    price: 3.99,
    qty: 1,
  },
];

const shippingCost = 100;

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleQtyChange = (id, delta) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item
      )
    );
  };

  const itemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const itemsTotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalCost = itemsTotal + shippingCost;

  return (
    <>
      <div className="min-h-screen bg-white p-6">
        <div className="max-w-7xl mx-auto bg-white">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Table */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Shopping Cart</h2>
                <span className="text-xl font-medium">{itemCount} Items</span>
              </div>
              <hr className="mb-4" />
              <div className="grid grid-cols-12 text-xs font-semibold text-gray-500 mb-4">
                <div className="col-span-5">PRODUCT DETAILS</div>
                <div className="col-span-2 text-center">QUANTITY</div>
                <div className="col-span-2 text-center">PRICE</div>
                <div className="col-span-3 text-center">TOTAL</div>
              </div>
              <div>
                {cartItems.map((item) => (
                  <div key={item.id} className="grid grid-cols-12 items-center py-6 border-b last:border-b-0">
                    <div className="col-span-5 flex items-center gap-4">
                      <img src={item.img} alt={item.name} className="w-16 h-16 object-contain" />
                      <div>
                        <div className="font-bold">{item.name}</div>
                        {item.brand && (
                          <div className={`${item.brandColor} text-xs`}>{item.brand}</div>
                        )}
                        <button className="text-xs text-gray-500 hover:underline mt-2">Remove</button>
                      </div>
                    </div>
                    <div className="col-span-2 flex items-center justify-center gap-2">
                      <button
                        className="border px-2 py-0.5 rounded text-lg"
                        onClick={() => handleQtyChange(item.id, -1)}
                      >
                        -
                      </button>
                      <span className="border px-3 py-1 rounded bg-gray-50">{item.qty}</span>
                      <button
                        className="border px-2 py-0.5 rounded text-lg"
                        onClick={() => handleQtyChange(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                    <div className="col-span-2 text-center font-semibold">
                      Rs. {item.price.toFixed(2)}
                    </div>
                    <div className="col-span-3 text-center font-semibold">
                      Rs. {(item.price * item.qty).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Order Summary */}
            <div className="w-full lg:w-96 bg-white border-l lg:pl-8">
              <div className="text-xl font-semibold mb-6">Order Summary</div>
              <div className="flex justify-between mb-2 text-sm">
                <span>ITEMS {itemCount}</span>
                <span className="font-semibold">Rs. {itemsTotal}</span>
              </div>
              <div className="mb-2 text-sm">
                <div className="font-semibold mb-1">SHIPPING</div>
                <select className="w-full border rounded px-2 py-1 text-gray-700">
                  <option>Standard shipping - Rs. 100</option>
                </select>
              </div>
              <div className="mb-2 text-sm">
                <div className="font-semibold mb-1">PROMO CODE</div>
                <input
                  type="text"
                  placeholder="Enter your code"
                  className="w-full border rounded px-2 py-1 mb-2"
                />
                <button className="bg-red-500 text-white px-4 py-1 rounded">APPLY</button>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between text-base font-semibold mb-4">
                <span>TOTAL COST</span>
                <span>Rs. {totalCost}</span>
              </div>
              <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 rounded">
                CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}