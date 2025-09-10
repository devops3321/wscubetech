"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function StudentForm() {
  const [students, setStudents] = useState([]);
  let getStudentList = async () => {
    axios.get('http://localhost:7000/student/view')
    .then((res)=>res.data)
    .then((finalRes)=> {
      console.log("API response:", finalRes);
      setStudents(finalRes.data);
    })
  }

  let insertStudent = async (e) => {
    e.preventDefault();
    const insertObj = {
      fullName: form.fullName,
      email: form.email,
      phone: form.phone
    };
    try {
      await axios.post('http://localhost:7000/student/insert', insertObj);
      await getStudentList(); 
      setForm({ fullName: '', email: '', phone: '' }); 
    } catch (err) {
      alert("Insert failed: " + err.message);
    }
  }

  const updateStudent = async (e) => {
    e.preventDefault();
    const updateObj = {
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      oldFullName: oldForm.fullName,
      oldEmail: oldForm.email,
      oldPhone: oldForm.phone
    };
    await axios.patch('http://localhost:7000/student/update', updateObj);
    await getStudentList();
    setForm({ fullName: '', email: '', phone: '' });
    setEditId(null);
  };

  useEffect(() => {
    getStudentList();
  }, []);
  
  const [form, setForm] = useState({ fullName: '', email: '', phone: '' });
  const [oldForm, setOldForm] = useState({ fullName: '', email: '', phone: '' });
  const [editId, setEditId] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDelete = async (index) => {
    const studentToDelete = students[index];
    const delObj = {
      fullName: studentToDelete.fullName,
      email: studentToDelete.email,
      phone: studentToDelete.phone
    };
    await axios.delete('http://localhost:7000/student/delete', { data: delObj });
    getStudentList();
  };

  const handleEdit = (student, index) => {
    setForm({ fullName: student.fullName, email: student.email, phone: student.phone });
    setOldForm({ fullName: student.fullName, email: student.email, phone: student.phone });
    setEditId(index);
  };

  return (
    <div className="max-w-[1320px] mx-auto mt-3 grid lg:grid-cols-[25%_auto] md:grid-cols-[20%_auto] gap-10 p-8 bg-[#f9f9f9]">
      {/* Form */}
      <form onSubmit={editId !== null ? updateStudent : insertStudent} className="bg-white border border-gray-300 rounded-lg shadow-lg p-8 flex flex-col gap-6 w-full max-w-xs">
        <h2 className="text-2xl font-bold mb-4 text-black">Student Form</h2>
        <div>
          <label className="font-bold text-black block mb-1" htmlFor="fullname">Name</label>
          <input
            id="fullname"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="border border-black font-bold text-black rounded px-3 py-2 w-full focus:outline-none focus:border-[#C09578] transition"
            required
            placeholder="Full Name"
          />
        </div>
        <div>
          <label className="font-bold text-black block mb-1" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="border border-black font-bold text-black rounded px-3 py-2 w-full focus:outline-none focus:border-[#C09578] transition"
            required
            placeholder="Email"
            type="email"
          />
        </div>
        <div>
          <label className="font-bold text-black block mb-1" htmlFor="phone">Phone</label>
          <input
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="border border-black font-bold text-black rounded px-3 py-2 w-full focus:outline-none focus:border-[#C09578] transition"
            required
            placeholder="Phone"
            type="tel"
          />
        </div>
        <button
          type="submit"
          className="bg-[#C09578] text-white font-bold px-4 py-2 rounded hover:bg-[#a67c52] transition"
        >
          {editId !== null ? 'Update' : 'Submit'}
        </button>
      </form>

      {/* Table */}
      <div className="flex-1 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4 text-black">Student List</h2>
        <table className="min-w-[700px] w-full bg-white border border-black rounded-lg shadow-lg">
          <thead>
            <tr className="bg-[#f5f5f5]">
              <th className="border-2 border-black px-3 py-2 text-center font-bold text-black">ID</th>
              <th className="border-2 border-black px-3 py-2 text-center font-bold text-black">NAME</th>
              <th className="border-2 border-black px-3 py-2 text-center font-bold text-black">PHONE</th>
              <th className="border-2 border-black px-3 py-2 text-center font-bold text-black">EMAIL</th>
              <th className="border-2 border-black px-3 py-2 text-center font-bold text-black">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, index) => (
              <tr key={index} className="hover:bg-[#f9f6f3]">
                <td className="border-2 border-black px-3 py-2 text-center font-bold text-black">{index + 1}</td>
                <td className="border-2 border-black px-3 py-2 text-center font-bold text-black">{s.fullName}</td>
                <td className="border-2 border-black px-3 py-2 text-center font-bold text-black">{s.phone}</td>
                <td className="border-2 border-black px-3 py-2 text-center font-bold text-black">{s.email}</td>
                <td className="border-2 border-black px-3 py-2 text-center">
                  <button
                    className="text-red-600 font-bold mr-5 hover:underline border-r-2 pr-5 cursor-pointer"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                  <button
                    className="text-blue-600 font-bold hover:underline cursor-pointer"
                    onClick={() => handleEdit({ ...s, id: index })}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            {/* Fill empty rows for grid look */}
            {Array.from({ length: Math.max(7 - students.length, 0) }).map((_, i) => (
              <tr key={`empty-${i}`}>
                <td className="border-2 border-black px-3 py-2">&nbsp;</td>
                <td className="border-2 border-black px-3 py-2">&nbsp;</td>
                <td className="border-2 border-black px-3 py-2">&nbsp;</td>
                <td className="border-2 border-black px-3 py-2">&nbsp;</td>
                <td className="border-2 border-black px-3 py-2">&nbsp;</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}