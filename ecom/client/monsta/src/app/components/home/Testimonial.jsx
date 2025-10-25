"use client";
import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { viewTestimonials } from '@/apiServices/testimonialView';

export default function Testimonial() {

  const [testimonials, setTestimonials] = React.useState([]);

  let testimonialData = async () => {
    let data = await viewTestimonials();
    // Convert API object to list of testimonials with staticPath
    if (data && Array.isArray(data.testimonialData)) {
      // Attach staticPath to each testimonial for easy access
      const list = data.testimonialData.map(t => ({
        ...t,
        staticPath: data.staticPath || ""
      }));
      setTestimonials(list);
    } else {
      setTestimonials([]);
    }
  }

  React.useEffect(() => {
    testimonialData();
  }, [])

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
              <p className="text-gray-700 mb-8">{t.testimonialMessage}</p>
              <div className="flex flex-col items-center">
                <img
                  src={`${t.staticPath}${t.testimonialImage}`}
                  alt={t.testimonialName}
                  className="w-20 h-20 rounded-full object-cover mb-4"
                />
                <div className="font-bold text-lg text-black mb-3">{t.testimonialName}</div>
                <div className="text-gray-500 mb-4">{t.testimonialDesignation}</div>
                <div className="flex justify-center mb-6">
                  {[...Array(t.testimonialRating)].map((_, i) => (
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
