"use client";
import React, { useRef, useState, useEffect } from 'react'
import Slider from "react-slick";
import ProductCard from '@/app/common/ProductCard'
import { getFeaturedProducts } from '@/apiServices/productService'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ProductSlider({ title, type, limit = 8, excludeProductId = null }) {
    const sliderRef = useRef(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [staticPath, setStaticPath] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await getFeaturedProducts({ type, limit: limit + 10 }); // Fetch extra to account for exclusions
                
                if (response && response.status !== false && response.data) {
                    // Filter out the current product if excludeProductId is provided
                    let filteredProducts = response.data;
                    if (excludeProductId) {
                        filteredProducts = response.data.filter(
                            product => String(product._id) !== String(excludeProductId)
                        );
                    }
                    // Limit to requested number after filtering
                    filteredProducts = filteredProducts.slice(0, limit);
                    setProducts(filteredProducts);
                    if (response.staticPath) {
                        setStaticPath(response.staticPath);
                    }
                } else {
                    setProducts([]);
                }
            } catch (error) {
                console.error(`Error fetching ${type} products:`, error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [type, limit, excludeProductId]);

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
                    slidesToShow: 3,
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

    if (loading) {
        return (
            <section className="py-10 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center mb-8">
                        <h2 className="text-3xl font-bold font-playfair text-black whitespace-nowrap">{title}</h2>
                        <div className="flex-1 mx-6 border-t border-[#f2f2f2]"></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {Array.from({ length: 4 }).map((_, idx) => (
                            <SkeletonCard key={idx} />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (!products || products.length === 0) {
        return null; // Don't render if no products
    }

    return (
        <section className="py-10 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center mb-8">
                    <h2 className="text-3xl font-bold font-playfair text-black whitespace-nowrap">{title}</h2>
                    <div className="flex-1 mx-6 border-t border-[#f2f2f2]"></div>
                    <div className="flex gap-2">
                        <button
                            className="text-[#C09578] text-2xl font-bold cursor-pointer hover:text-[#A07A5A] transition-colors"
                            onClick={() => sliderRef.current?.slickPrev()}
                            aria-label="Previous"
                            type="button"
                        >
                            <i className="fas fa-chevron-left text-2xl"></i>
                        </button>
                        <button
                            className="text-[#C09578] text-2xl font-bold cursor-pointer hover:text-[#A07A5A] transition-colors"
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
                        {products.map((product, idx) => {
                            const categoryName = product?.subSubCategory?.name || 
                                                product?.subSubCategory?.subsubcategoryName || 
                                                product?.subCategory?.name || 
                                                product?.subCategory?.subcategoryName ||
                                                product?.parentCategory?.name ||
                                                product?.parentCategory?.categoryName || 
                                                "";
                            
                            // Build image URL
                            let basePath = (product.staticPath || staticPath || "").replace(/\/+$/, "");
                            let imageUrl = product.productImage || '';
                            
                            if (imageUrl && !/^https?:\/\//i.test(imageUrl)) {
                                const imagePath = String(imageUrl).replace(/^\/+/, "");
                                imageUrl = basePath && imagePath ? `${basePath}/${imagePath}` : (imagePath || '/no-image.png');
                            } else if (!imageUrl) {
                                imageUrl = '/no-image.png';
                            }

                            // Calculate prices
                            const salePrice = product.salePrice || 0;
                            const actualPrice = product.actualPrice || salePrice;
                            const displayPrice = salePrice > 0 ? salePrice : actualPrice;
                            const displayOldPrice = salePrice > 0 && actualPrice > salePrice ? actualPrice : null;

                            // Map API fields to ProductCard props
                            const cardProps = {
                                ...product,
                                productId: product._id || product.id || idx,
                                category: categoryName,
                                name: product?.productName || product?.name || "",
                                image: imageUrl,
                                oldPrice: displayOldPrice ? `Rs. ${displayOldPrice.toLocaleString()}` : "",
                                price: `Rs. ${displayPrice.toLocaleString()}`,
                                salePrice: salePrice,
                                actualPrice: actualPrice
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
            </div>
        </section>
    );
}

