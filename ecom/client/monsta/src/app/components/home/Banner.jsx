"use client";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomeBanner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: dots => (
      <div className="absolute w-full left-0 bottom-8 flex justify-center z-10">
        <ul className="flex justify-center m-0">{dots}</ul>
      </div>
    ),
    dotsClass: "slick-dots custom-dots"
  };

  return (
    <section className="overflow-hidden relative w-screen">
      <Slider {...settings}>
        <div className="relative w-full h-[600px]">
          <Image
            src="/images/imgi_34_add8f1ce-ae5a-4d6b-b573-8c208b6745d5-1671388062.jpg"
            alt="Banner 1"
            fill
            className="absolute inset-0 w-full h-full object-cover"
            priority
          />
        </div>
        <div className="relative w-full h-[600px]">
          <Image
            src="/images/imgi_35_648e23d4-5e5d-4fd0-b0f7-856ee45c6629-1671388137.jpg"
            alt="Banner 2"
            fill
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </Slider>
      <style jsx global>{`
        .custom-dots {
          position: static !important;
          margin-top: 0px;
        }
        .custom-dots li {
          margin: 0 6px;
        }
        .custom-dots li button:before {
          font-size: 14px;
          color: #C09578;
          opacity: 0.5;
        }
        .custom-dots li.slick-active button:before {
          color: #C09578;
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
