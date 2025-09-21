"use client";
import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    text: "These guys have been absolutely outstanding. Perfect Themes and the best of all that you have many options to choose! Best Support team ever! Very fast responding! Thank you very much! I highly recommend this theme and these people!",
    name: "KATHY YOUNG",
    role: "CEO of SunPark",
    image: "https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/testimonial/3023f95a-ce85-434c-b9c5-2b0943b865e2-1670161621.jpg",
    rating: 5
  },
  {
    text: "These guys have been absolutely outstanding. Perfect Themes and the best of all that you have many options to choose! Best Support team ever! Very fast responding! Thank you very much! I highly recommend this theme and these people!",
    name: "KATHY YOUNG",
    role: "CEO of SunPark",
    image: "https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/testimonial/c6381687-5a5e-4914-9373-9cbec4937be6-1670161604.jpg",
    rating: 5
  },
  {
    text: "These guys have been absolutely outstanding. Perfect Themes and the best of all that you have many options to choose! Best Support team ever! Very fast responding! Thank you very much! I highly recommend this theme and these people!",
    name: "KATHY YOUNG",
    role: "CEO of SunPark",
    image: "https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/testimonial/35b5a0a0-e80f-4038-a75a-2811de92118b-1670161614.png",
    rating: 5
  },    
  // Add more testimonials if needed
];

export default function Testimonial() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    appendDots: dots => (
      <div>
        <ul style={{ margin: "0px" }}>{dots}</ul>
      </div>
    ),
    customPaging: i => (
      <div
        style={{
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          background: "#C09578",
          opacity: 0.5,
          margin: "0 4px",
          transition: "opacity 0.2s"
        }}
      ></div>
    ),
  };

  return (
    <div className="bg-[#fafafa] py-12">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl text-black md:text-3xl font-bold mb-6 font-playfair">What Our Customers Say ?</h2>
        <Slider {...settings}>
          {testimonials.map((t, idx) => (
            <div key={idx}>
              <p className="text-gray-700 mb-8">{t.text}</p>
              <div className="flex flex-col items-center">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-20 h-20 rounded-full object-cover mb-4"
                />
                <div className="font-bold text-lg text-black mb-3">{t.name}</div>
                <div className="text-gray-500 mb-4">{t.role}</div>
                <div className="flex justify-center mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i} className="text-[#C09578] text-xl">&#9733;</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <style jsx global>{`
        .slick-dots li.slick-active div {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  )
}
