
import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

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
    event.preventDefault();
    if (id) {
      axios.put(`${apiBaseurl}faq/update/${id}`, formValue)
        .then((response) => response.data)
        .then((finRespone) => {
          if (finRespone.status == "success") {
            toast.success(finRespone.message);
            setformValue({ question: "", answer: "", order: "" });
          } else {
            toast.error(finRespone.message);
          }
        });
    } else {
      axios.post(`${apiBaseurl}faq/create`, formValue)
        .then((response) => response.data)
        .then((finRespone) => {
          if (finRespone.status == "success") {
            toast.success(finRespone.message);
            setformValue({ question: "", answer: "", order: "" });
            setTimeout(() => {
              navigate("/faq/view");
            }, 2000);
          } else {
            toast.error(finRespone.message);
          }
        })
        .catch(() => {
          toast.error("API Fetch Error");
        });
    }
  };

  let funObj = id ? "Edit FAQ" : "Add FAQ";

  useEffect(() => {
    setformValue({ question: "", answer: "", order: "" });
    if (id) {
      axios.get(`${apiBaseurl}faq/view/${id}`)
        .then((response) => response.data)
        .then((finRespone) => {
          setformValue({
            question: finRespone.faqData.question,
            answer: finRespone.faqData.answer,
            order: finRespone.faqData.order,
          });
        });
    }
  }, [id]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 py-8">
      <ToastContainer />
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-700 mb-2 tracking-tight flex items-center gap-2">
            <Link to={"/dashboard"} className="hover:text-blue-700 transition-colors">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to={"/faq/add"} className="hover:text-blue-700 transition-colors">FAQ</Link>
            <span className="text-gray-400">/</span>
            <span className="text-blue-700">{funObj}</span>
          </h1>
        </div>
        <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">{funObj}</h2>
          <form onSubmit={faqSave}>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 flex flex-col gap-6 justify-between">
                <div>
                  <label htmlFor="question" className="block font-medium mb-2 text-gray-700">Question</label>
                  <input
                    type="text"
                    id="question"
                    name="question"
                    value={formValue.question}
                    onChange={(e) => setformValue({ ...formValue, question: e.target.value })}
                    className="rounded-lg border border-gray-300 w-full h-12 p-3 font-medium focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-200"
                    placeholder="Enter Question"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="answer" className="block font-medium mb-2 text-gray-700">Answer</label>
                  <textarea
                    id="answer"
                    name="answer"
                    value={formValue.answer}
                    onChange={(e) => setformValue({ ...formValue, answer: e.target.value })}
                    className="rounded-lg border border-gray-300 w-full h-32 p-3 font-medium focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-200 resize-none"
                    placeholder="Enter Answer"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="order" className="block font-medium mb-2 text-gray-700">Order</label>
                  <input
                    type="text"
                    id="order"
                    name="order"
                    value={formValue.order}
                    onChange={(e) => setformValue({ ...formValue, order: e.target.value })}
                    className="rounded-lg border border-gray-300 w-full h-12 p-3 font-medium focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-200"
                    placeholder="Enter Order"
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