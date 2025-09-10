import React from 'react'
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from 'react-router-dom'

export default function Dashboard() {
    return (
        <section className='mt-5'>
            <div >
                <hr className='border-t border-gray-600' />
                <h1 className='font-bold p-4 text-xl text-gray-400'> <Link to={"/dashboard"} className='hover:text-blue-900'>Home</Link> / <Link to={"/dashboard"} className='hover:text-blue-900'>Dashboard</Link> </h1>
                <hr className='border-t border-gray-600 mb-5' />
            </div>
            <div className='grid grid-cols-3 gap-3 mt-10 mb-15 mx-3'>
                <div className='w-100 h-55 bg-[#5956D3] text-white p-4 ms-3 rounded-lg shadow-md mb-4'>
                    <div className='flex items-center justify-between'>
                        <span className='flex items-baseline'>
                            <span className='text-2xl font-bold'>26K</span>
                            <span className='flex items-baseline text-sm font-bold ml-2' style={{ color: 'white' }}>
                                (<span>-12.4%</span> <FaLongArrowAltDown style={{ marginLeft: '4px' }} />)
                            </span>
                        </span>
                        <button className='text-lg cursor-pointer'><BsThreeDotsVertical /></button>
                    </div>
                    <h1 className='text-xl font-semibold'>Users</h1>
                </div>
                <div className='w-100 h-55 bg-[#2998FE] text-white p-4 ms-3 rounded-lg shadow-md'>
                    <div className='flex items-center justify-between'>
                        <span className='flex items-baseline'>
                            <span className='text-2xl font-bold'>$6200</span>
                            <span className='flex items-baseline text-sm font-bold ml-2' style={{ color: 'white' }}>
                                (<span>40.9%</span> <FaLongArrowAltUp style={{ marginLeft: '4px' }} />)
                            </span>
                        </span>
                        <button className='text-lg cursor-pointer'><BsThreeDotsVertical /></button>
                    </div>
                    <h1 className='text-xl font-semibold'>Product</h1>
                </div>
                <div className='w-100 h-55 bg-[#FCB01E] text-white p-4 ms-3 rounded-lg shadow-md'>
                    <div className='flex items-center justify-between'>
                        <span className='flex items-baseline'>
                            <span className='text-2xl font-bold'>2.49%</span>
                            <span className='flex items-baseline text-sm font-bold ml-2' style={{ color: 'white' }}>
                                (<span>84.7%</span> <FaLongArrowAltUp style={{ marginLeft: '4px' }} />)
                            </span>
                        </span>
                        <button className='text-lg cursor-pointer'><BsThreeDotsVertical /></button>
                    </div>
                    <h1 className='text-xl font-semibold'>Category</h1>
                </div>
                <div className='w-100 h-55 bg-[#E95353] text-white p-4 ms-3 rounded-lg shadow-md'>
                    <div className='flex items-center justify-between'>
                        <span className='flex items-baseline'>
                            <span className='text-2xl font-bold'>44K</span>
                            <span className='flex items-baseline text-sm font-bold ml-2' style={{ color: 'white' }}>
                                (<span>-23.6%</span> <FaLongArrowAltDown style={{ marginLeft: '4px' }} />)
                            </span>
                        </span>
                        <button className='text-lg cursor-pointer'><BsThreeDotsVertical /></button>
                    </div>
                    <h1 className='text-xl font-semibold'>Orders</h1>
                </div>
            </div>
        </section>
    )
}
