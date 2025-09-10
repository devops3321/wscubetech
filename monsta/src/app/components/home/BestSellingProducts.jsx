"use client";
import React, { useRef } from 'react'
import Slider from "react-slick";
import ProductCard from '@/app/common/ProductCard'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const products = [
    {
        category: 'Cabinets and Sideboard',
        name: 'Louise Cabinet',
        image: 'https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/16253167208651620078433247Louise%20Cabinet_.jpg',
        oldPrice: 'Rs. 28,000',
        price: 'Rs. 23,000',
    },
    {
        category: 'Bookshelves',
        name: 'Erica Bookshelfs',
        image: 'https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1620077669499Erica%20Bookshelfs_brown.jpg',
        oldPrice: 'Rs. 38,000',
        price: 'Rs. 30,000',
    },
    {
        category: 'Side and End Tables',
        name: 'Hrithvik Stool',
        image: 'https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617981904164Hrithvik%20Stool__.jpg',
        oldPrice: 'Rs. 7,000',
        price: 'Rs. 6,000',
    },
    {
        category: 'Nest Of Tables',
        name: 'Caroline Study Tables',
        image: 'https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829052195Caroline%20Study%20Tables__.jpg',
        oldPrice: 'Rs. 3,000',
        price: 'Rs. 2,500',
    },
    {
        category: 'Nest Of Tables',
        name: 'Caroline Study Tables',
        image: 'https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829052195Caroline%20Study%20Tables__.jpg',
        oldPrice: 'Rs. 3,000',
        price: 'Rs. 2,500',
    },
    {
        category: 'Nest Of Tables',
        name: 'Caroline Study Tables',
        image: 'https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829052195Caroline%20Study%20Tables__.jpg',
        oldPrice: 'Rs. 3,000',
        price: 'Rs. 2,500',
    },        
];

export default function BestSellingProducts() {
    const sliderRef = useRef(null);

    const settings = {
        dots: false,
        infinite: products.length > 4,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <section className="py-10 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center mb-8">
                    <h2 className="text-3xl font-bold font-playfair text-black whitespace-nowrap">Bestselling Products</h2>
                    <div className="flex-1 mx-6 border-t border-[#f2f2f2]"></div>
                    <div className="flex">
                        <button
                            className="text-[#C09578] text-2xl font-bold cursor-pointer"
                            onClick={() => sliderRef.current?.slickPrev()}
                            aria-label="Previous"
                            type="button"
                        >
                            <i className="fas fa-chevron-left text-2xl"></i>
                        </button>
                        <button
                            className="text-[#C09578] text-2xl font-bold cursor-pointer"
                            onClick={() => sliderRef.current?.slickNext()}
                            aria-label="Next"
                            type="button"
                        >
                            <i className="fas fa-chevron-right text-2xl"></i>
                        </button>
                    </div>
                </div>
                <div className="custom-row product_row1 slick-initialized slick-slider">
                    <Slider ref={sliderRef} {...settings}>
                        {products.map((product, idx) => (
                            <div key={idx}>
                                <ProductCard {...product} />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    )
}