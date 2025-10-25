import React from 'react'

export default function HomeCollection() {
  return (
    <section className='py-[50px] bg-white'>
      <div className='max-w-[1320px] mx-auto grid grid-cols-3 gap-5'>
        {/* Card 1 */}
        <div className='group overflow-hidden relative rounded-lg bg-white shadow cursor-pointer'>
          <img
            className='group-hover:scale-110 duration-300 w-full h-[320px] object-cover'
            src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/124ad5ba-005d-4b47-a707-a9a87033833a-1670180400.webp"
            alt="Design Creative"
          />
          <div className='absolute left-0 top-0 w-full h-full p-[30px] flex flex-col justify-start'>
            <h3 className='text-[20px] text-black font-rubik font-medium mb-2'>Design Creative</h3>
            <h2 className='text-3xl font-bold text-black font-rubik'>Chair Collection</h2>
          </div>
        </div>
        {/* Card 2 */}
        <div className='group overflow-hidden relative rounded-lg bg-white shadow cursor-pointer'>
          <img
            className='group-hover:scale-110 duration-300 w-full h-[320px] object-cover'
            src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/0d588bec-d9a0-4645-8e7a-b49ef67b34be-1670180400.webp"
            alt="Bestselling Products"
          />
          <div className='absolute left-0 top-0 w-full h-full p-[30px] flex flex-col justify-start'>
            <h3 className='text-[20px] text-black font-rubik font-medium mb-2'>Bestselling Products</h3>
            <h2 className='text-3xl font-bold text-black font-rubik'>Chair Collection</h2>
          </div>
        </div>
        {/* Card 3 */}
        <div className='group overflow-hidden relative rounded-lg bg-white shadow cursor-pointer'>
          <img
            className='group-hover:scale-110 duration-300 w-full h-[320px] object-cover'
            src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/08e20925-4e58-4ad3-bbb9-b037d6da2466-1670180400.webp"
            alt="Onsale Products"
          />
          <div className='absolute left-0 top-0 w-full h-full p-[30px] flex flex-col justify-start'>
            <h3 className='text-[20px] text-black font-rubik font-medium mb-2'>Onsale Products</h3>
            <h2 className='text-3xl font-bold text-black font-rubik'>Chair Collection</h2>
          </div>
        </div>
      </div>
    </section>
  )
}