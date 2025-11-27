import React, { useState } from "react";
import { db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function TeacherRegistration() {
  const [form, setForm] = useState({ firstName:"", lastName:"", email:"", className:"", gender:"" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "teachers"), { ...form, createdAt: new Date() });
      alert("Teacher added");
      setForm({ firstName:"", lastName:"", email:"", className:"", gender:"" });
      navigate("/dashboard/teachers/list");
    } catch(err){ console.error(err); alert("Error"); } finally { setLoading(false); }
  };

  return (
    <div className="form-card">
      <h2>Teacher Registration</h2>
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

        <label>Email</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} required />

        <label>Class</label>
        <input name="className" value={form.className} onChange={handleChange} />

        <label>Gender</label>
        <select name="gender" value={form.gender} onChange={handleChange} required>
          <option value="">Select Gender</option><option value="Female">Female</option><option value="Male">Male</option>
        </select>

        <button className="btn" type="submit">Submit</button>
      </form>
    </div>
  );
}
