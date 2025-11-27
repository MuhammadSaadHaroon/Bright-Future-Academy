import React, { useState } from "react";
import { db } from "../../firebase/config";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function ExamResult(){
  const [form,setForm] = useState({ className:"", studentName:"", roll:"", grade:"", percentage:"" });
  const [results,setResults] = useState([]);

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});

  const addResult = async e => {
    e.preventDefault();
    try {
      await addDoc(collection(db,"results"), {...form, createdAt:new Date()});
      alert("Result added");
      setForm({ className:"", studentName:"", roll:"", grade:"", percentage:"" });
    } catch(e){ console.error(e); alert("Error"); }
  };

  const fetchResults = async () => {
    try {
      const snap = await getDocs(collection(db,"results"));
      const arr=[]; snap.forEach(d=>arr.push({id:d.id,...d.data()}));
      setResults(arr);
    } catch(e){ console.error(e); }
  };

  return (
    <div>
      <div className="form-card">
        <h2>Exam Result - Add</h2>
        <form onSubmit={addResult}>
          <label>Class</label><input name="className" value={form.className} onChange={handleChange} required />
          <label>Student Name</label><input name="studentName" value={form.studentName} onChange={handleChange} required />
          <div className="form-row">
            <div className="col"><label>Roll Number</label><input name="roll" value={form.roll} onChange={handleChange} required /></div>
            <div className="col"><label>Grade</label><input name="grade" value={form.grade} onChange={handleChange} required /></div>
          </div>
          <label>Percentage</label><input name="percentage" value={form.percentage} onChange={handleChange} required />
          <button className="btn" type="submit">Add Result</button>
        </form>
      </div>

      <div className="form-card" style={{marginTop:12}}>
        <h3>Results</h3>
        <button className="btn secondary" onClick={fetchResults}>Load Results</button>
        <div style={{marginTop:12}}>
          {results.map(r => <div key={r.id} style={{padding:8,borderBottom:"1px solid #eee"}}>{r.className} - {r.studentName} - {r.grade} ({r.percentage}%)</div>)}
        </div>
      </div>
    </div>
  );
}
