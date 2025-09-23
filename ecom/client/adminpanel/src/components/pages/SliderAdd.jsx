
import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function SliderAdd() {
  let { id } = useParams();
  let navigate = useNavigate();

  const [sliderImageFile, setSliderImageFile] = React.useState(null);
  const [imagePreview, setImagePreview] = React.useState(null);
  const [formValue, setFormValue] = React.useState({
    sliderTitle: "",
    sliderImage: "",
    sliderOrder: ""
  });
  const [staticPath, setStaticPath] = React.useState("");
  const apiBaseurl = import.meta.env.VITE_APIBASEURL;

  let saveSlider = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("sliderTitle", formValue.sliderTitle);
    formData.append("sliderOrder", formValue.sliderOrder);
    if (sliderImageFile) {
      formData.append("sliderImage", sliderImageFile);
    }
    if (id) {
      axios.put(`${apiBaseurl}slider/update/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
        .then((response) => response.data)
        .then((finRespone) => {
          if (finRespone.status === "success") {
            toast.success(finRespone.message);
            setFormValue({ sliderTitle: "", sliderImage: "", sliderOrder: "" });
            setSliderImageFile(null);
            setImagePreview(null);
          } else {
            toast.error(finRespone.message);
          }
        });
    } else {
      axios.post(`${apiBaseurl}slider/create/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
        .then((response) => response.data)
        .then((finRespone) => {
          if (finRespone.status === "success") {
            toast.success(finRespone.message);
            setFormValue({ sliderTitle: "", sliderImage: "", sliderOrder: "" });
            setSliderImageFile(null);
            setImagePreview(null);
          } else {
            toast.error(finRespone.message);
          }
        });
    }
  };

  let funObj = id ? "Edit Slider" : "Add Slider";

  useEffect(() => {
    setFormValue({ sliderTitle: "", sliderImage: "", sliderOrder: "" });
    if (id) {
      axios.get(`${apiBaseurl}slider/view/${id}`)
        .then((response) => response.data)
        .then((finRespone) => {
          setFormValue({
            sliderTitle: finRespone.sliderData.sliderTitle,
            sliderImage: finRespone.sliderData.sliderImage,
            sliderOrder: finRespone.sliderData.sliderOrder
          });
          setStaticPath(finRespone.staticPath || "");
          if (finRespone.sliderData.sliderImage) {
            setImagePreview(`${finRespone.staticPath || ""}${finRespone.sliderData.sliderImage}`);
          } else {
            setImagePreview(null);
          }
        });
    } else {
      setImagePreview(null);
    }
  }, [id]);

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
      setSliderImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSliderImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setSliderImageFile(null);
    setImagePreview(null);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 py-8">
      <ToastContainer />
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-700 mb-2 tracking-tight flex items-center gap-2">
            <Link to={"/dashboard"} className="hover:text-blue-700 transition-colors">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to={"/slider/add"} className="hover:text-blue-700 transition-colors">Slider</Link>
            <span className="text-gray-400">/</span>
            <span className="text-blue-700">{funObj}</span>
          </h1>
        </div>
        <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">{funObj}</h2>
          <form onSubmit={saveSlider}>
            <div className="flex flex-col md:flex-row gap-8">
              {/* Slider Image */}
              <div className="flex-1">
                <label htmlFor="sliderImage" className="block font-medium mb-2 text-gray-700">Slider Image</label>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 flex flex-col items-center justify-center h-60 mb-4 cursor-pointer relative hover:border-blue-400 transition-all"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('sliderImageInput').click()}
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
                    id="sliderImageInput"
                    name="sliderImage"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              {/* Slider Title & Order */}
              <div className="flex-1 flex flex-col gap-6 justify-between">
                <div>
                  <label htmlFor="sliderTitle" className="block font-medium mb-2 text-gray-700">Slider Title</label>
                  <input
                    type="text"
                    id="sliderTitle"
                    name="sliderTitle"
                    value={formValue.sliderTitle}
                    onChange={(e) => {
                      setFormValue({ ...formValue, sliderTitle: e.target.value })
                    }}
                    className="rounded-lg border border-gray-300 w-full h-12 p-3 font-medium focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-200"
                    placeholder="Slider Title"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="sliderOrder" className="block font-medium mb-2 text-gray-700">Order</label>
                  <input
                    type="text"
                    id="sliderOrder"
                    name="sliderOrder"
                    value={formValue.sliderOrder}
                    onChange={(e) => {
                      setFormValue({ ...formValue, sliderOrder: e.target.value })
                    }}
                    className="rounded-lg border border-gray-300 w-full h-12 p-3 font-medium focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-200"
                    placeholder="Order"
                    required
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="mt-8 text-white bg-blue-700 hover:bg-blue-800 font-semibold rounded-lg text-md px-8 py-3 shadow transition-all duration-150">{funObj}</button>
          </form>
        </div>
      </div>
    </section>
  );
}