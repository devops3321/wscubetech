
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function TestimonialAdd() {
  let { id } = useParams();
  let navigate = useNavigate();
  const [testimonialImageFile, setTestimonialImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formValue, setFormValue] = useState({
    testimonialName: "",
    testimonialDesignation: "",
    testimonialRating: "",
    testimonialOrder: "",
    testimonialMessage: ""
  });
  const [staticPath, setStaticPath] = useState("");
  const apiBaseurl = import.meta.env.VITE_APIBASEURL;

  useEffect(() => {
    setFormValue({
      testimonialName: "",
      testimonialDesignation: "",
      testimonialRating: "",
      testimonialOrder: "",
      testimonialMessage: ""
    });
    if (id) {
      axios.get(`${apiBaseurl}testimonial/view/${id}`)
        .then((response) => response.data)
        .then((finRespone) => {
          setFormValue({
            testimonialName: finRespone.testimonialData.testimonialName,
            testimonialDesignation: finRespone.testimonialData.testimonialDesignation,
            testimonialRating: finRespone.testimonialData.testimonialRating,
            testimonialOrder: finRespone.testimonialData.testimonialOrder,
            testimonialMessage: finRespone.testimonialData.testimonialMessage
          });
          setStaticPath(finRespone.staticPath || "");
          if (finRespone.testimonialData.testimonialImage) {
            setImagePreview(`${finRespone.staticPath || ""}${finRespone.testimonialData.testimonialImage}`);
          } else {
            setImagePreview(null);
          }
        });
    } else {
      setImagePreview(null);
    }
  }, [id]);

  let saveTestimonial = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("testimonialName", formValue.testimonialName);
    formData.append("testimonialDesignation", formValue.testimonialDesignation);
    formData.append("testimonialRating", formValue.testimonialRating);
    formData.append("testimonialOrder", formValue.testimonialOrder);
    formData.append("testimonialMessage", formValue.testimonialMessage);
    if (testimonialImageFile) {
      formData.append("testimonialImage", testimonialImageFile);
    }
    if (id) {
      axios.put(`${apiBaseurl}testimonial/update/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
        .then((response) => response.data)
        .then((finRespone) => {
          if (finRespone.status === "success") {
            toast.success(finRespone.message);
            setFormValue({ testimonialName: "", testimonialDesignation: "", testimonialRating: "", testimonialOrder: "", testimonialMessage: "" });
            setTestimonialImageFile(null);
            setImagePreview(null);
          } else {
            toast.error(finRespone.message);
          }
        });
    } else {
      axios.post(`${apiBaseurl}testimonial/create/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
        .then((response) => response.data)
        .then((finRespone) => {
          if (finRespone.status === "success") {
            toast.success(finRespone.message);
            setFormValue({ testimonialName: "", testimonialDesignation: "", testimonialRating: "", testimonialOrder: "", testimonialMessage: "" });
            setTestimonialImageFile(null);
            setImagePreview(null);
          } else {
            toast.error(finRespone.message);
          }
        });
    }
  };

  // Custom drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setTestimonialImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setTestimonialImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setTestimonialImageFile(null);
    setImagePreview(null);
  };

  let funObj = id ? "Edit Testimonial" : "Add Testimonial";

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-100 to-purple-100 py-8">
      <ToastContainer />
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-700 mb-2 tracking-tight flex items-center gap-2">
            <Link to={"/dashboard"} className="hover:text-purple-700 transition-colors">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to={"/testimonial/add"} className="hover:text-purple-700 transition-colors">Testimonial</Link>
            <span className="text-gray-400">/</span>
            <span className="text-purple-700">{funObj}</span>
          </h1>
        </div>
        <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">{funObj}</h2>
          <form onSubmit={saveTestimonial}>
            <div className="flex flex-col md:flex-row gap-8">
              {/* Testimonial Image */}
              <div className="flex-1">
                <label htmlFor="testimonialImage" className="block font-medium mb-2 text-gray-700">Testimonial Image</label>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 flex flex-col items-center justify-center h-60 mb-4 cursor-pointer relative hover:border-purple-400 transition-all"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('testimonialImageInput').click()}
                  style={{ position: 'relative' }}
                >
                  {imagePreview ? (
                    <div className="relative w-full h-full flex flex-col items-center justify-center">
                      <img src={imagePreview} alt="Preview" className="h-full object-contain rounded-lg border border-gray-200 shadow-sm" />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 bg-red-600 text-white rounded-full px-2 py-1 text-xs hover:bg-red-800 shadow z-10"
                        style={{ zIndex: 2 }}
                      >
                        Remove/Change
                      </button>
                      <span className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">Current image will be replaced</span>
                    </div>
                  ) : (
                    <span className="text-gray-400">Drag & drop or click to upload</span>
                  )}
                  <input
                    type="file"
                    id="testimonialImageInput"
                    name="testimonialImage"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              {/* Testimonial Fields */}
              <div className="flex-1 flex flex-col gap-6 justify-between">
                <div>
                  <label htmlFor="testimonialName" className="block font-medium mb-2 text-gray-700">Name</label>
                  <input
                    type="text"
                    id="testimonialName"
                    name="testimonialName"
                    value={formValue.testimonialName}
                    onChange={(e) => setFormValue({ ...formValue, testimonialName: e.target.value })}
                    className="rounded-lg border border-gray-300 w-full h-12 p-3 font-medium focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-all duration-200"
                    placeholder="Name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="testimonialDesignation" className="block font-medium mb-2 text-gray-700">Designation</label>
                  <input
                    type="text"
                    id="testimonialDesignation"
                    name="testimonialDesignation"
                    value={formValue.testimonialDesignation}
                    onChange={(e) => setFormValue({ ...formValue, testimonialDesignation: e.target.value })}
                    className="rounded-lg border border-gray-300 w-full h-12 p-3 font-medium focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-all duration-200"
                    placeholder="Designation"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="testimonialRating" className="block font-medium mb-2 text-gray-700">Rating</label>
                  <input
                    type="number"
                    id="testimonialRating"
                    name="testimonialRating"
                    value={formValue.testimonialRating}
                    onChange={(e) => setFormValue({ ...formValue, testimonialRating: e.target.value })}
                    className="rounded-lg border border-gray-300 w-full h-12 p-3 font-medium focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-all duration-200"
                    placeholder="Rating (1-5)"
                    min={1}
                    max={5}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="testimonialOrder" className="block font-medium mb-2 text-gray-700">Order</label>
                  <input
                    type="number"
                    id="testimonialOrder"
                    name="testimonialOrder"
                    value={formValue.testimonialOrder}
                    onChange={(e) => setFormValue({ ...formValue, testimonialOrder: e.target.value })}
                    className="rounded-lg border border-gray-300 w-full h-12 p-3 font-medium focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-all duration-200"
                    placeholder="Order"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="testimonialMessage" className="block font-medium mb-2 text-gray-700">Message</label>
                  <textarea
                    id="testimonialMessage"
                    name="testimonialMessage"
                    value={formValue.testimonialMessage}
                    onChange={(e) => setFormValue({ ...formValue, testimonialMessage: e.target.value })}
                    className="rounded-lg border border-gray-300 w-full h-32 p-3 font-medium resize-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-all duration-200"
                    placeholder="Message"
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            <button type="submit" className="mt-8 text-white bg-purple-700 hover:bg-purple-800 font-semibold rounded-lg text-md px-8 py-3 shadow transition-all duration-150">{funObj}</button>
          </form>
        </div>
      </div>
    </section>
  );
}