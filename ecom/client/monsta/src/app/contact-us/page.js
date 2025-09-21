import React from 'react'
import Breadcrumb from '../common/Breadcrumb'

export default function ContactUs() {
    return (
        <div>
            <Breadcrumb pageName="Contact Us" />
            <div className='flex items-center justify-center mt-2 mb-20'>
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7155.251016816475!2d73.030606!3d26.273815!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418c5b1dfafdd7%3A0xf992fd41c21a238e!2sLaxmi%20Dairy%20%26%20Provision%20Store!5e0!3m2!1sen!2sin!4v1756364993111!5m2!1sen!2sin" width="600" height="450" loading="lazy"></iframe>
            </div>
            {/* Contact Info & Form Section */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                {/* Contact Info */}
                <div>
                    <h2 className="font-bold text-2xl mb-6 font-playfair text-black border-b-1 border-gray-500 pb-5 ">Contact Us</h2>
                    <div className="mb-4 flex items-center gap-3 border-b-1 border-gray-500  pb-5">
                        <span className="text-xl text-black"><i className="fa fa-file-text-o"></i></span>
                        <span className="text-black ">Address : Claritas est etiam processus dynamicus</span>
                    </div>
                    <div className="mb-4 flex items-center gap-3 border-b-1 border-gray-500 pb-5">
                        <span className="text-xl text-black"><i className="fa fa-phone"></i></span>
                        <span className="text-black">98745612330</span>
                    </div>
                    <div className="mb-4 flex items-center gap-3 border-b-1 border-gray-500 pb-5">
                        <span className="text-xl text-black"><i className="fa fa-envelope-o"></i></span>
                        <span className="text-black">furnitureinfo@gmail.com</span>
                    </div>
                </div>
                {/* Contact Form */}
                <div>
                    <h2 className="font-bold text-2xl mb-6 font-playfair text-black">Tell Us Your Question</h2>
                    <form className="space-y-5">
                        <div>
                            <label className="block font-semibold mb-2 text-black">Your Name (required)</label>
                            <input type="text" placeholder="Name *" className="w-full border px-4 py-3 rounded focus:outline-none text-black placeholder:text-gray-400" />
                        </div>
                        <div>
                            <label className="block font-semibold mb-2 text-black">Your Email (required)</label>
                            <input type="email" placeholder="Email *" className="w-full border px-4 py-3 rounded focus:outline-none text-black placeholder:text-gray-400" />
                        </div>
                        <div>
                            <label className="block font-semibold mb-2 text-black">Your Mobile Number (required)</label>
                            <input type="text" placeholder="Mobile Number *" className="w-full border px-4 py-3 rounded focus:outline-none text-black placeholder:text-gray-400" />
                        </div>
                        <div>
                            <label className="block font-semibold mb-2 text-black">Subject</label>
                            <input type="text" placeholder="Subject *" className="w-full border px-4 py-3 rounded focus:outline-none text-black placeholder:text-gray-400" />
                        </div>
                        <div>
                            <label className="block font-semibold mb-2 text-black">Your Message</label>
                            <textarea rows={4} placeholder="Message *" className="w-full border px-4 py-3 rounded focus:outline-none text-black placeholder:text-gray-400 resize-none"></textarea>
                        </div>
                        <button type="submit" className="bg-black text-white font-bold px-8 py-2 rounded mt-2">Send</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
