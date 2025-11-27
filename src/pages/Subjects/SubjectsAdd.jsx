import React, { useState } from "react";
import { db } from "../../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function SubjectsAdd(){
  const [form,setForm] = useState({ subjectName:"", className:"", group:"GeneralScience" });
  const navigate = useNavigate();

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await addDoc(collection(db,"subjects"), {...form, createdAt:new Date()});
      alert("Subject added");
      navigate("/dashboard/subjects/list");
    } catch(e){ console.error(e); alert("Error"); }
  };

  return (
    <div className="form-card">
      <h2>Subject Add</h2>
      <form onSubmit={handleSubmit}>
        <label>Subject Name</label><input name="subjectName" value={form.subjectName} onChange={handleChange} required />
        <label>Class</label><input name="className" value={form.className} onChange={handleChange} required />
        <label>Select Group</label>
        <select name="group" value={form.group} onChange={handleChange}>
          <option>GeneralScience</option><option>Pre-Engineering</option>
        </select>
        <button className="btn" type="submit">Add</button>
      </form>
    </div>
  );
}
