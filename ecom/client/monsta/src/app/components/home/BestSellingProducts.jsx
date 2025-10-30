"use client";
import React, { useRef } from 'react'
import Slider from "react-slick";
import ProductCard from '@/app/common/ProductCard'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function BestSellingProducts({ bestSellingProducts, staticPath = "" }) {
    const sliderRef = useRef(null);

    const settings = {
        dots: false,
        infinite: bestSellingProducts.length > 4,
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
                        {bestSellingProducts.map((product, idx) => {
                            const categoryName = product?.subSubCategory?.name || product?.subSubCategory?.subsubcategoryName || "";
                            // Build image URL using per-item or list-level staticPath
                            let basePath = (product.staticPath || staticPath || "").replace(/\/+$/, "");
                            let imageUrl = product.productImage ? `${basePath}/${product.productImage}` : '';
                            const cardProps = {
                                category: categoryName,
                                name: product?.productName || product?.name || "",
                                image: imageUrl,
                                oldPrice: product?.actualPrice ? `Rs. ${product.actualPrice}` : "",
                                price: product?.salePrice ? `Rs. ${product.salePrice}` : "",
                            };
                            return (
                                <div key={idx}>
                                    <ProductCard {...cardProps} />
                                </div>
                            );
                        })}
                    </Slider>
                </div>
            </div>
        </section>
    )
}