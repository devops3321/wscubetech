
import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function MaterialAdd() {
  let { id } = useParams();
  let navigate = useNavigate();
  let [formValue, setformValue] = React.useState({
    categoryName: "",
    order: "",
    materialStatus: ""
  });
  let apiBaseurl = import.meta.env.VITE_APIBASEURL;

  let materialSave = async (event) => {
    event.preventDefault();
    if (id) {
      axios.put(`${apiBaseurl}material/update/${id}`, formValue)
        .then((response) => response.data)
        .then((finRespone) => {
          if (finRespone.status == "success") {
            toast.success(finRespone.message);
            setformValue({ categoryName: "", order: "", materialStatus: "" });
          } else {
            toast.error(finRespone.message);
          }
        });
    } else {
      axios.post(`${apiBaseurl}material/create`, formValue)
        .then((response) => response.data)
        .then((finRespone) => {
          if (finRespone.status == "success") {
            toast.success(finRespone.message);
            setformValue({ categoryName: "", order: "", materialStatus: "" });
            setTimeout(() => {
              navigate("/material/view");
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

  let funObj = id ? "Edit Material" : "Add Material";

  useEffect(() => {
    setformValue({ categoryName: "", order: "", materialStatus: "" });
    if (id) {
      axios.get(`${apiBaseurl}material/view/${id}`)
        .then((response) => response.data)
        .then((finRespone) => {
          setformValue({
            categoryName: finRespone.materialData.categoryName,
            order: finRespone.materialData.order,
            materialStatus: finRespone.materialData.materialStatus
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
            <Link to={"/material/add"} className="hover:text-blue-700 transition-colors">Material</Link>
            <span className="text-gray-400">/</span>
            <span className="text-blue-700">{funObj}</span>
          </h1>
        </div>
        <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">{funObj}</h2>
          <form onSubmit={materialSave}>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 flex flex-col gap-6 justify-between">
                <div>
                  <label htmlFor="categoryName" className="block font-medium mb-2 text-gray-700">Material Name</label>
                  <input
                    type="text"
                    id="categoryName"
                    name="categoryName"
                    value={formValue.categoryName}
                    onChange={(e) => setformValue({ ...formValue, categoryName: e.target.value })}
                    className="rounded-lg border border-gray-300 w-full h-12 p-3 font-medium focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-200"
                    placeholder="Enter Material Name"
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