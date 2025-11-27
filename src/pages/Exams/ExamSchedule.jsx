import React, { useState } from "react";
import { db } from "../../firebase/config";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function ExamSchedule(){
  const [form,setForm] = useState({ className:"", subject:"", date:"", start:"", end:"" });
  const [list,setList] = useState([]);

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});

  const addSchedule = async e => {
    e.preventDefault();
    try {
      await addDoc(collection(db,"exams"), {...form, createdAt:new Date()});
      alert("Exam schedule added");
      setForm({ className:"", subject:"", date:"", start:"", end:"" });
      // optional: fetch list
    } catch(e){ console.error(e); alert("Error"); }
  };

  const fetchList = async () => {
    try {
      const snap = await getDocs(collection(db,"exams"));
      const arr=[]; snap.forEach(d=>arr.push({id:d.id,...d.data()}));
      setList(arr);
    } catch(e){ console.error(e); }
  };

  return (
    <div>
      <div className="form-card">
        <h2>Exam Schedule - Add</h2>
        <form onSubmit={addSchedule}>
          <label>Class</label><input name="className" value={form.className} onChange={handleChange} required />
          <label>Subject</label><input name="subject" value={form.subject} onChange={handleChange} required />
          <div className="form-row">
            <div className="col"><label>Date</label><input type="date" name="date" value={form.date} onChange={handleChange} required /></div>
            <div className="col"><label>Start Time</label><input name="start" value={form.start} onChange={handleChange} required /></div>
            <div className="col"><label>End Time</label><input name="end" value={form.end} onChange={handleChange} required /></div>
          </div>
          <button className="btn" type="submit">Add Schedule</button>
        </form>
      </div>

      <div className="form-card" style={{marginTop:16}}>
        <h3>Existing Schedules</h3>
        <button className="btn secondary" onClick={fetchList}>Load Schedules</button>
        <div style={{marginTop:12}}>
          {list.map(l => (
            <div key={l.id} style={{padding:8,borderBottom:"1px solid #eee"}}>{l.className} - {l.subject} ({l.date}) {l.start} - {l.end}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
