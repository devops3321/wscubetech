import React from 'react';
import { FaArrowRight } from "react-icons/fa6";
import { MdOutlineStar } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import Header from '../common/Header';
import Footer from '../common/Footer';
const Home = () => {
    return (
        <>
            <div className='grid lg:grid-cols-[60%_auto] grid-cols-1 bg-[#111827] p-8 gap-8 text-start mb-3'>
                <div>
                    <h1 className="text-white text-[50px] font-bold mb-4">The experience makes <br /> all the difference.</h1>
                    <p className="text-gray-300 mb-6">
                        From checkout to global sales tax compliance, companies around the world use <br /> Flowbite to simplify their payment stack.
                    </p>
                    <div className='flex gap-2'>
                        <button
                            type="button"
                            className="flex items-center gap-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        >
                            Get started <FaArrowRight />
                        </button>

                        <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                            OFFERS</button>
                    </div>
                </div>
                <div>
                    <img
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
                        alt=""
                        className='border border-black-300 border-2 p-2 w-[400px] h-[350px] shadow-[1px_1px_10px_rgb(0,0,0,0.5)]'
                    />
                </div>
            </div>
            <div className='font-extrabold text-5xl py-3 mb-6 '>Shop By Category</div>

            <div className='grid grid-cols-3 gap-5'>
                <div className='relative'>
                    <img src="https://i.ibb.co/ThPFmzv/omid-armin-m-VSb6-PFk-VXw-unsplash-1-1.png" alt="" className='items-stretch h-[600px]' />
                    <button type="button" class="absolute bottom-10 left-30 capitalize text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-sm px-7 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                        Women
                    </button>
                </div>
                <div className='space-y-5'>
                    <div className='relative'>
                        <img src="https://i.ibb.co/SXZvYHs/irene-kredenets-DDqx-X0-7v-KE-unsplash-1.png" alt="" className='items-stretch h-[300px]' />
                        <button type="button" class="absolute bottom-0 left-35 capitalize text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-sm px-7 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                            Shoes
                        </button>
                    </div>
                    <div className='relative'>
                        <img src="https://i.ibb.co/Hd1pVxW/louis-mornaud-Ju-6-TPKXd-Bs-unsplash-1-2.png" alt="" className='items-stretch h-[280px] ' />
                        <button type="button" class="absolute bottom-0 left-33 capitalize text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-sm px-7 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                            Watches
                        </button>
                    </div>
                </div>

                <div className='relative'>
                    <img src="https://i.ibb.co/PTtRBLL/olive-tatiane-Im-Ez-F9-B91-Mk-unsplash-1.png" alt="" className='items-stretch h-[600px] w-100' />
                    <button type="button" class="absolute bottom-0 left-30 capitalize text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-sm px-7 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                        Accessories
                    </button>
                </div>
            </div>

            <div className='mb-5 mt-5'>
                <h1 className='font-extrabold text-5xl shadow-lg p-3'> Get difference Product</h1>
            </div>

            <div className='grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-4'>
                {Array.from({ length: 30 }).map((_, idx) => (
                    <ProductItem key={idx} />
                ))}
            </div>
        </>
    );
};

export default Home;


function ProductItem() {
    return (
        <>
            <div className='relative text-start border border-[white] shadow-xl p-3'>
                <FaHeart className="text-red-600 absolute top-3 right-3 text-xl cursor-pointer" />
                <img src="https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp" alt="" />
                <p className='font-semibold text-[14px] leading-6'>Essence Mascara Lash Princess</p>
                <p className='text-[#B45309] font-bold'>Rs. 9.99</p>
                <p className='text-[#4B5563] text-[12px]'>Essence</p>
                <div className='flex items-center justify-between gap-1'>
                    <div className='flex items-center gap-0'>
                        <MdOutlineStar className="text-yellow-400" />
                        <MdOutlineStar className="text-yellow-400" />
                        <MdOutlineStar className="text-yellow-400" />
                        <MdOutlineStar className="text-yellow-400" />
                        <MdOutlineStar className="text-yellow-400" />
                        <span className='ml-1'>(4.19)</span>
                    </div>
                    <button
                        type="button"
                        className="absolute bottom-0 right-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        Add
                    </button>
                </div>
            </div>

        </>
    );
};

