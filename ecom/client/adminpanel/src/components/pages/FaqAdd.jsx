import React from 'react';
import { useEffect } from 'react';
import { FaFilter, FaPen } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

export default function FaqAdd() {
  let { id } = useParams();

  let navigate = useNavigate();

  let [formValue, setformValue] = React.useState({
    question: "",
    answer: "",
    order: "",
  });

  let apiBaseurl = import.meta.env.VITE_APIBASEURL;

  let faqSave = async (event) => {

    if (id) {
      // edit faq api
      event.preventDefault();

      axios.put(`${apiBaseurl}faq/update/${id}`, formValue)
        .then((response) => { return response.data })
        .then((finRespone) => {

          // console.log(finRespone);

          if (finRespone.status == "success") {
            toast.success(finRespone.message);
            setformValue({
              question: "",
              answer: "",
              order: "",
            })
          }
          else {
            toast.error(finRespone.message);
          }
        });
    }
    else {
      // add faq api
      event.preventDefault();

      axios.post(`${apiBaseurl}faq/create`, formValue)
        .then((response) => { return response.data })
        .then((finRespone) => {
          if (finRespone.status == "success") {
            // Sending Success Message
            toast.success(finRespone.message);
            // Clear Form
            setformValue({
              question: "",
              answer: "",
              order: "",
            })
            // Redirect to View Page
            setTimeout(() => {
              navigate("/faq/view");
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

  let funObj = id ? "Edit Faq" : "Add Faq";

  useEffect(() => {
    setformValue({
      question: "",
      answer: "",
      order: "",
    })
    if (id) {
      axios.get(`${apiBaseurl}faq/view/${id}`)
        .then((response) => response.data)
        .then((finRespone) => {
          console.log(finRespone);
          setformValue({
            question: finRespone.faqData.question,
            answer: finRespone.faqData.answer,
            order: finRespone.faqData.order,
          })
        })
    }
  }, [id]);


  return (
    <section>
      <ToastContainer />
      <div className='mt-5'>
        <hr className='border-t border-gray-600' />
        <h1 className='font-semibold p-4 text-xl text-gray-400'> <span><Link to={"/dashboard"} className='hover:text-blue-900'>Home</Link> / <Link to={"/faq/add"} className='hover:text-blue-900'>FAQ</Link> / Add</span></h1>
        <hr className='border-t border-gray-600 mb-5' />
      </div>
      <div className="max-w-[1400px] mx-auto px-3">
        <div className='flex flex-col md:flex-row bg-[#F1F5F9] px-2 rounded-t-lg border border-black-200 items-center justify-between mt-9 py-4'>
          <h1 className='text-3xl font-semibold mb-3 ms-2'>{funObj}</h1>
        </div>
        <form action="" onSubmit={faqSave} className='bg-white p-6 rounded-b-lg border-2'>
          <div className='md:flex-row gap-4 p-4'>
            <label htmlFor="question" className='block font-bold mb-1'>Question</label>
            <input
              type="text"
              id="question"
              name="question"
              value={formValue.question}
              onChange={(e) => {
                setformValue({ ...formValue, question: e.target.value })
              }}
              className='rounded-xl border-3 border-gray-300 w-full h-15 p-3 font-medium'
              placeholder='Question'
              required />
          </div>
          <div className='md:flex-row gap-4 p-4 '>
            <label htmlFor="answer" className='block font-bold mb-1'>Answer</label>
            <textarea
              id="answer"
              name="answer"
              value={formValue.answer}
              onChange={(e) => {
                setformValue({ ...formValue, answer: e.target.value })
              }}
              className='rounded-xl border-3 border-gray-300 w-full h-40 p-3 font-medium resize-none'
              placeholder=' Answer'
              required
            />
          </div>
          <div className='md:flex-row gap-4 p-4 mb-5'>
            <label htmlFor="order" className='block font-bold'>Order</label>
            <input
              type="text"
              id="order"
              name="order"
              value={formValue.order}
              onChange={(e) => {
                setformValue({ ...formValue, order: e.target.value })
              }}
              className='rounded-xl border-3 border-gray-300 w-full h-15 p-3 font-medium'
              placeholder='Order'
              required />
          </div>
          <button type="submit" className="focus:outline-none ms-4 text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 ">{funObj}</button>
        </form>
      </div>
    </section>
  );
};