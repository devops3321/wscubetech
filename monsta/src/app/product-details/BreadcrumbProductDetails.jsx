import React from 'react'
import Link from 'next/link'
export default function BreadcrumbProductDetails({ categoryName, productName }) {
    return (
        <div className="py-10 bg-white ">
            <h1 className="text-center font-bold text-[40px] text-black font-playfair mb-2">{productName}</h1>
            <div className="text-center text-lg text-[18px]">
                <Link href="/" className="text-[#222] hover:text-[#C09578]">Home</Link>
                <span className="mx-2 text-[#222]">{'>'}</span>
                <span className="text-[#222] hover:text-[#C09578] ">{categoryName}</span>
                <span className="mx-2 text-[#222]">{'>'}</span>
                <span className="text-[#C09578] font-bold ">{productName}</span>
            </div>
            <hr className="mt-8 border-t-2 border-[#f2f2f2]" />
        </div>
    )
}
