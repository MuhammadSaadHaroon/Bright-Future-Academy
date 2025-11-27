import React, { useState } from "react";
import { db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function AdmissionForm(){
  const [form,setForm] = useState({ firstName:"", lastName:"", fatherName:"", email:"", phone:"", dob:"", qualification:"", gender:"" });
  const navigate = useNavigate();

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await addDoc(collection(db,"admissions"), {...form, createdAt: new Date()});
      alert("Admission submitted");
      navigate("/dashboard/class/list");
    } catch(e){ console.error(e); alert("Error"); }
  };

  return (
    <div className="form-card">
      <h2>Admission Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="col">
            <label>First Name</label>
            <input name="firstName" value={form.firstName} onChange={handleChange} required />
          </div>
          <div className="col">
            <label>Last Name</label>
            <input name="lastName" value={form.lastName} onChange={handleChange} required />
          </div>
        </div>

        <label>Father Name</label>
        <input name="fatherName" value={form.fatherName} onChange={handleChange} required />

        <label>Email</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} required />

        <div className="form-row">
          <div className="col">
            <label>Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} required />
          </div>
          <div className="col">
            <label>Date of Birth</label>
            <input name="dob" type="date" value={form.dob} onChange={handleChange} required />
          </div>
        </div>

        <label>Qualification</label>
        <input name="qualification" value={form.qualification} onChange={handleChange} />

        <label>Gender</label>
        <select name="gender" value={form.gender} onChange={handleChange} required>
          <option value="">Select Gender</option><option value="Male">Male</option><option value="Female">Female</option>
        </select>

        <button className="btn" type="submit">Submit</button>
      </form>
    </div>
  );
}
