import React from 'react';
import { useEffect } from 'react';
import { FaFilter, FaPen } from "react-icons/fa";
import { Link } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';


export default function CountryAdd() {
  let { id } = useParams();

  let navigate = useNavigate();

  let [formValue, setformValue] = React.useState({
    countryName: "",
    order: "",
    countryStatus: ""
  });

  let apiBaseurl = import.meta.env.VITE_APIBASEURL;

  let countrySave = async (event) => {

    if (id) {
      // edit country api
      event.preventDefault();

      axios.put(`${apiBaseurl}country/update/${id}`, formValue)
        .then((response) => { return response.data })
        .then((finRespone) => {

          // console.log(finRespone);

          if (finRespone.status == "success") {
            toast.success(finRespone.message);
            setformValue({
              countryName: "",
              order: "",
              countryStatus: ""
            })
          }
          else {
            toast.error(finRespone.message);
          }
        });
    }
    else {
      // add country api
      event.preventDefault();

      axios.post(`${apiBaseurl}country/create`, formValue)
        .then((response) => { return response.data })
        .then((finRespone) => {
          console.log(finRespone);
          if (finRespone.status == "success") {
            // Sending Success Message
            toast.success(finRespone.message);
            // Clear Form
            setformValue({
              categoryName: "",
              order: "",
              countryStatus: ""
            })
            // Redirect to View Page
            setTimeout(() => {
              navigate("/country/view");
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

  let funObj = id ? "Edit Country" : "Add Country";

  useEffect(() => {
    setformValue({
      countryName: "",
      order: "",
      countryStatus: ""
    })
    if (id) {
      axios.get(`${apiBaseurl}country/view/${id}`)
        .then((response) => response.data)
        .then((finRespone) => {
          console.log(finRespone);
          setformValue({
            countryName: finRespone.countryData.countryName,
            order: finRespone.countryData.order,
            countryStatus: finRespone.countryData.countryStatus
          })
        })
    }
  }, [id]);

  return (
    <section>
      <ToastContainer />
      <div className='mt-5'>
        <hr className='border-t border-gray-600' />
        <h1 className='font-semibold p-4 text-xl text-gray-400'> <span><Link to={"/dashboard"} className='hover:text-blue-900'>Home</Link> / <Link to={"/country/add"} className='hover:text-blue-900'>Country</Link> / Add</span></h1>
        <hr className='border-t border-gray-600 mb-5' />
      </div>
      <div className="max-w-[1400px] mx-auto px-3">
        <div className='flex flex-col md:flex-row bg-[#F1F5F9] px-2 rounded-t-lg border border-black-200 items-center justify-between mt-9 py-4'>
          <h1 className='text-3xl font-semibold mb-3 ms-4'>{funObj}</h1>
        </div>
        <form action="" onSubmit={countrySave} className='bg-white p-6 rounded-b-lg border-2'>
          <div className='md:flex-row gap-4 p-4'>
            <label htmlFor="colorName" className='block font-bold mb-1'>Country Name</label>
            <input
              type="text"
              id="colorName"
              name="colorName"
              value={formValue.countryName}
              onChange={(e) => {
                setformValue({ ...formValue, countryName: e.target.value })
              }}
              className='rounded-xl border-3 border-gray-300 w-full h-15 p-3 font-medium'
              placeholder='Country Name'
              required />
          </div>
          <div className='md:flex-row gap-4 p-4 mb-9'>
            <label htmlFor="order" className='block font-bold mb-1'>Order</label>
            <textarea
              id="order"
              name="order"
              value={formValue.order}
              onChange={(e) => {
                setformValue({ ...formValue, order: e.target.value })
              }}
              className='rounded-xl border-3 border-gray-300 w-full h-15 p-3 font-medium resize-none'
              placeholder='Order'
              required
            />
          </div>
          <button type="submit" className="focus:outline-none ms-4 text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 ">Add Country</button>
        </form>
      </div>
    </section>
  );
};