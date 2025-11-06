"use client";
import React, { useRef, useState, useEffect } from 'react'
import Slider from "react-slick";
import ProductCard from '@/app/common/ProductCard'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function BestSellingProducts({ bestSellingProducts, staticPath = "" }) {
    const sliderRef = useRef(null);
    const [loading, setLoading] = useState(!bestSellingProducts || bestSellingProducts.length === 0);

    useEffect(() => {
        if (bestSellingProducts && bestSellingProducts.length > 0) {
            setLoading(false);
        }
    }, [bestSellingProducts]);

    const settings = {
        dots: false,
        infinite: (bestSellingProducts && bestSellingProducts.length > 4) || false,
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

    // Skeleton loader component
    const SkeletonCard = () => (
        <div className="skeleton-card" style={{ width: 260, minWidth: 260, maxWidth: 260, height: 380, minHeight: 380, maxHeight: 380, display: 'flex', flexDirection: 'column', margin: '0 auto' }}>
            <div className="skeleton" style={{ width: '100%', height: 160, marginBottom: '0.5rem' }}></div>
            <div className="px-5 py-4 flex flex-col h-full justify-between" style={{ flex: 1 }}>
                <div>
                    <div className="skeleton mb-2" style={{ height: '14px', width: '60%', margin: '0 auto', borderRadius: '4px' }}></div>
                    <div className="skeleton mb-3" style={{ height: '20px', width: '90%', margin: '0 auto 0.75rem', borderRadius: '4px' }}></div>
                    <div className="skeleton mb-3" style={{ height: '20px', width: '70%', margin: '0 auto', borderRadius: '4px' }}></div>
                    <div className="skeleton mb-2" style={{ height: '2px', width: '100%', borderRadius: '4px' }}></div>
                    <div className="flex justify-center items-center gap-2 mb-5">
                        <div className="skeleton" style={{ height: '16px', width: '60px', borderRadius: '4px' }}></div>
                        <div className="skeleton" style={{ height: '16px', width: '80px', borderRadius: '4px' }}></div>
                    </div>
                </div>
                <div className="flex justify-center gap-2 mt-auto">
                    <div className="skeleton" style={{ height: '36px', width: '36px', borderRadius: '4px' }}></div>
                    <div className="skeleton" style={{ height: '36px', width: '120px', borderRadius: '4px' }}></div>
                </div>
            </div>
        </div>
    );

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
                {loading ? (
                    <div className="custom-row product_row1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            {Array.from({ length: 4 }).map((_, idx) => (
                                <SkeletonCard key={idx} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="custom-row product_row1 slick-initialized slick-slider">
                        <Slider ref={sliderRef} {...settings}>
                            {bestSellingProducts.map((product, idx) => {
                                const categoryName = product?.subSubCategory?.name || product?.subSubCategory?.subsubcategoryName || "";
                                // Build image URL using per-item or list-level staticPath
                                let basePath = (product.staticPath || staticPath || "").replace(/\/+$/, "");
                                let imageUrl = product.productImage ? `${basePath}/${product.productImage}` : '';
                                // Map API fields to ProductCard props - IMPORTANT: spread product to include _id
                                const cardProps = {
                                    ...product, // spread first
                                    id: product._id || product.id || idx, // id last so it always wins
                                    category: categoryName,
                                    name: product?.productName || product?.name || "",
                                    image: imageUrl,
                                    oldPrice: product?.actualPrice ? `Rs. ${product.actualPrice}` : "",
                                    price: product?.salePrice ? `Rs. ${product.salePrice}` : ""
                                };
                                const productId = product._id || product.id || idx;
                                return (
                                    <div key={productId}>
                                        <ProductCard {...cardProps} />
                                    </div>
                                );
                            })}
                        </Slider>
                    </div>
                )}
            </div>
        </section>
    )
}