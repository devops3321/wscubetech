import React, { useEffect } from 'react'
import { FaFilter, FaPen } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function ColorAdd() {
  let { id } = useParams();

  let navigate = useNavigate();

  let [formValue, setformValue] = React.useState({
    colorName: "",
    colorCode: "",
    colorOrder: ""
  });

  let apiBaseurl = import.meta.env.VITE_APIBASEURL;
  // console.log("apiBaseurl", apiBaseurl);

  let colorSave = async (event) => {
    if (id) {
      // edit color api
      event.preventDefault();
      
      axios.put(`${apiBaseurl}color/update/${id}`, formValue)
        .then((response) => { return response.data })
        .then((finRespone) => {

          // console.log(finRespone);

          if (finRespone.status == "success") {
            toast.success(finRespone.message);
            setformValue({
              colorName: "",
              colorCode: "",
              colorOrder: ""
            })
          }
          else {
            toast.error(finRespone.message);
          }
        });
    }
    else {
      // add color api
      event.preventDefault();
      // console.log(formValue);
      axios.post(`${apiBaseurl}color/create`, formValue)
        .then((response) => { return response.data })
        .then((finRespone) => {
          console.log(finRespone);
          if (finRespone.status == "success") {
            // Sending Success Message
            toast.success(finRespone.message);
            // Clear Form
            setformValue({
              colorName: "",
              colorCode: "",
              colorOrder: ""
            })
            // Redirect to View Page
            setTimeout(() => {
              navigate("/color/view");
            }, 2000);
          } else {
            toast.error(finRespone.message);
          }
        })
        .catch(error => {
          toast.error("API Fetch Error");
        });
    }
  }

  let funObj = id ? "Edit Color" : "Add Color";

  useEffect(() => {
    setformValue({
      colorName: "",
      colorCode: "",
      colorOrder: ""
    })
    if (id) {
      axios.get(`${apiBaseurl}color/view/${id}`)
        .then((response) => response.data)
        .then((finRespone) => {
          console.log(finRespone);
          setformValue({
            colorName: finRespone.colorData.colorName,
            colorCode: finRespone.colorData.colorCode,
            colorOrder: finRespone.colorData.colorOrder
          })
        })
    }
  }, [id]);


  return (
    <section>
      <ToastContainer />
      <div className='mt-5'>
        <hr className='border-t border-gray-600' />
        <h1 className='font-semibold p-4 text-xl text-gray-400'> <span><Link to={"/dashboard"} className='hover:text-blue-900'>Home</Link> / <Link to={"/color/add"} className='hover:text-blue-900'>Color</Link> / Add</span></h1>
        <hr className='border-t border-gray-600 mb-5' />
      </div>
      <div className="max-w-[1400px] mx-auto px-3">
        <div className='flex flex-col md:flex-row bg-[#F1F5F9] px-2 rounded-t-lg border border-black-200 items-center justify-between mt-9 py-4'>
          <h1 className='text-3xl font-semibold mb-3 ms-4'>{funObj}</h1>
          <div className='flex flex-col md:flex-row'>
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-md px-3 py-3 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"><FaFilter /></button>
            <button type="button" className=" text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 ">Delete</button>
          </div>
        </div>
        <form action="" onSubmit={colorSave} className='bg-white p-6 rounded-b-lg border-2'>
          <div className='md:flex-row gap-4 p-4'>
            <label htmlFor="colorName" className='block font-bold mb-1'>Color Name</label>
            <input
              type="text"
              id="colorName"
              value={formValue.colorName}
              onChange={(e) => {
                setformValue({ ...formValue, colorName: e.target.value })
              }}
              name="colorName" className='rounded-xl border-3 border-gray-300 w-full h-15 p-3 font-medium' placeholder='Enter Color Name' required />
          </div>
          <div className='md:flex-row gap-4 p-4'>
            <label htmlFor="colorCode" className='block font-bold mb-1'>Color Picker</label>
            <input type="color"
              id="colorCode"
              value={formValue.colorCode}
              onChange={(e) => {
                let obj = { ...formValue };
                obj['colorCode'] = e.target.value;
                setformValue(obj)
              }}
              name="colorCode" className='shadow-lg border-3 border-gray-300 w-50 h-50 p-3' required />
          </div>
          <div className='md:flex-row gap-4 p-4 mb-9'>
            <label htmlFor="colorOrder" className='block font-bold mb-1'>Order</label>
            <textarea
              id="colorOrder"
              name="colorOrder"
              value={formValue.colorOrder}
              onChange={(e) => {
                let obj = { ...formValue };
                obj['colorOrder'] = e.target.value;
                setformValue(obj)
              }}
              className='rounded-xl border-3 border-gray-300 w-full h-15 p-3 font-medium resize-none'
              placeholder='Enter Order'
              required
            />
          </div>
          <button type="submit" className="focus:outline-none ms-4 text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 ">{funObj}</button>
        </form>
      </div>
    </section>
  );
};