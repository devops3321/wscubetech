import React from 'react';


export default function ProductDetails({ productName }) {
  const images = [
    "https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617981904164Hrithvik%20Stool__.jpg",
    "https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617981904164Hrithvik%20Stool__.jpg",
    "https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617981904164Hrithvik%20Stool__.jpg",
    "https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617981904164Hrithvik%20Stool__.jpg",
    "https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617981904164Hrithvik%20Stool__.jpg"
  ];

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left: Images */}
        <div className="md:w-1/2">
          <img
            src={images[0]}
            alt="Hrithvik Stool"
            className="w-full h-[340px] object-cover rounded mb-4 border"
          />
          <div className="flex gap-3">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Hrithvik Stool ${idx + 1}`}
                className="w-20 h-16 object-cover rounded border cursor-pointer"
              />
            ))}
          </div>
        </div>
        {/* Right: Details */}
        <div className="md:w-1/2">
          <h1 className="font-playfair text-2xl md:text-3xl font-bold text-black mb-2">{productName}</h1>
          <div className="flex items-center gap-4 mb-2">
            <span className="line-through text-gray-400 text-lg">Rs. 7,000</span>
            <span className="text-[#C09578] font-bold text-xl">Rs. 6,000</span>
            
          </div>
          <p className="text-gray-700 mb-6">{productName} is sturdy and great for placing in any area of the house.</p>
          <hr className="mb-4 border-[#e5e5e5]" />
          <button className="bg-[#C09578] text-white font-bold px-8 py-2 rounded mt-3 mb-6 cursor-pointer">Add To Cart</button>
          <div className="space-y-2 text-black text-base">
            <div><span className="font-bold">Code:</span> jod3333</div>
            <div><span className="font-bold">Dimension:</span> 72L * 32H * 30W</div>
            <div><span className="font-bold">Estimate Delivery Days:</span> "30-35" Days</div>
            <div><span className="font-bold">Category:</span> Side and End Tables</div>
            <div><span className="font-bold">Color:</span> Black Finish</div>
            <div><span className="font-bold">Material:</span> JackFruit</div>
          </div>
        </div>
      </div>
      {/* Description */}
      <div className="mt-10">
        <h2 className="text-[#C09578] font-bold text-xl mb-2">Description</h2>
        <hr className="mb-4 border-[#e5e5e5]" />
        <p className="text-gray-700 text-base">
          Hrithvik Stool is sturdy and great for placing in any area of the house. There are days when we make our living area the dining area and on days like that instead of cradling the plate on the knees why not create a comfortable seating area with the help of this Sheesham stool, so go ahead watch some tv and enjoy the downtime without troubling yourself. The stool does not take up much space which makes it multifunctional.
        </p>
      </div>
    </div>
  );
}
