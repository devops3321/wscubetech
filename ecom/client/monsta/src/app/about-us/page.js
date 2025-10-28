"use client";
import React from 'react'
import { ImUsers } from "react-icons/im";
import Breadcrumb from '../common/Breadcrumb'
import Testimonial from '../components/home/Testimonial';

export default function Aboutus() {
  return (
    <div>
      <Breadcrumb pageName="About Us" />
      <img
        src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/983cc349-1718-4290-b7cd-c8eb20459536-1671213069.jpg"
        alt="About Us"
        className='mx-auto mb-6'
      />

      {/* Welcome Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl text-black md:text-4xl font-bold mb-6 font-playfair">Welcome To Monsta!</h2>
        <p className="text-lg text-gray-700 mb-6">
          Monsta is dedicated to bringing you the finest in modern furniture and home décor. Our mission is to blend style, comfort, and quality, offering a curated selection of products that transform your living spaces. With a passion for design and a commitment to customer satisfaction, we strive to make every home unique and inspiring.
        </p>
        <p className="italic text-[#C09578] text-lg mb-2">
          “Discover the difference with Monsta – where creativity meets craftsmanship, and your vision for a beautiful home becomes reality.”
        </p>
      </div>

      {/* Why Choose Us Section */}
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl text-black md:text-4xl font-bold mb-10 font-playfair">Why Chose Us?</h2>
        <div className="flex flex-col md:flex-row justify-center items-start gap-10 md:gap-20">
          {/* Creative Design */}
          <div className="flex-1 flex flex-col items-center">
            <div className="w-24 h-24 flex items-center justify-center mb-4">
              <span className="text-8xl text-[#C09578]">
                <i className="fa fa-smile-o"></i>
              </span>
            </div>
            <h3 className="font-bold text-xl text-black mb-2 font-playfair">Creative Design</h3>
            <p className="text-gray-700 text-base">
              Our team of designers brings you the latest trends and timeless styles, ensuring every piece is both beautiful and functional. We believe in creativity that enhances your lifestyle and reflects your personality.
            </p>
          </div>
          {/* 100% Money Back Guarantee */}
          <div className="flex-1 flex flex-col items-center">
            <div className="w-24 h-24 flex items-center justify-center mb-4">
              <span className="text-8xl text-[#C09578]">
                <i className="fa fa-home"></i>
              </span>
            </div>
            <h3 className="font-bold text-xl text-black mb-2 font-playfair">100% Money Back Guarantee</h3>
            <p className="text-gray-700 text-base">
              Shop with confidence at Monsta. If you’re not completely satisfied with your purchase, we offer a hassle-free money back guarantee to ensure your peace of mind.
            </p>
          </div>
          {/* Online Support 24/7 */}
          <div className="flex-1 flex flex-col items-center">
            <div className="w-24 h-24 flex items-center justify-center mb-4">
              <span className="text-8xl text-[#C09578]">
                <ImUsers />
              </span>
            </div>
            <h3 className="font-bold text-xl text-black mb-2 font-playfair">Online Support 24/7</h3>
            <p className="text-gray-700 text-base">
              Our dedicated support team is available around the clock to assist you with any questions or concerns. We’re here to help you every step of the way.
            </p>
          </div>
        </div>
      </div>

      {/* What We Do, Our Mission, History Of Us Section */}
      <div className="max-w-7xl mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* What Do We Do? */}
          <div className="flex flex-col items-center">
            <img
              src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/dbfbc372-1550-40ef-a372-19566e1776b2-1671213170.jpg"
              alt="What Do We Do"
              className="w-full h-64 object-cover mb-6"
            />
            <h3 className="font-bold text-2xl text-black mb-3 font-playfair text-center">What Do We Do?</h3>
            <p className="text-gray-700 text-lg text-center">
              At Monsta, we source, design, and deliver premium furniture and décor to elevate your home. From contemporary sofas to elegant lighting, our curated collections are crafted to suit every taste and space.
            </p>
          </div>
          {/* Our Mission */}
          <div className="flex flex-col items-center">
            <img
              src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/0eb1dffc-23c4-4a66-bb02-f5028e3658d3-1671213170.jpg"
              alt="Our Mission"
              className="w-full h-64 object-cover mb-6"
            />
            <h3 className="font-bold text-2xl text-black mb-3 font-playfair text-center">Our Mission</h3>
            <p className="text-gray-700 text-lg text-center">
              Our mission is to inspire and empower our customers to create homes they love. We are committed to quality, sustainability, and exceptional service, making stylish living accessible to everyone.
            </p>
          </div>
          {/* History Of Us */}
          <div className="flex flex-col items-center">
            <img
              src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/028a3c98-0fb9-4fc0-8e7c-0076d254de41-1671213170.jpg"
              alt="History Of Us"
              className="w-full h-64 object-cover mb-6"
            />
            <h3 className="font-bold text-2xl text-black mb-3 font-playfair text-center">History Of Us</h3>
            <p className="text-gray-700 text-lg text-center">
              Founded with a vision to redefine home interiors, Monsta has grown from a small team of enthusiasts to a trusted name in furniture and décor. Our journey is built on passion, innovation, and a deep understanding of our customers’ needs.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonial Section (Dynamic) */}
      <Testimonial />

    </div>
  )
}
