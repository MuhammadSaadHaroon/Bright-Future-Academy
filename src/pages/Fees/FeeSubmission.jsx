import React, { useState } from "react";
import { db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";

export default function FeeSubmission(){
  const [form,setForm]=useState({ name:"", className:"", amount:"", method:"Credit Card" });
  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await addDoc(collection(db,"payments"), {...form, createdAt: new Date()});
      alert("Payment recorded (dummy)");
      setForm({ name:"", className:"", amount:"", method:"Credit Card" });
    } catch(e){ console.error(e); alert("Error"); }
  };

  return (
    <div className="form-card">
      <h2>Fees Payment</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label><input name="name" value={form.name} onChange={handleChange} required />
        <label>Class</label><input name="className" value={form.className} onChange={handleChange} required />
        <label>Amount</label><input name="amount" value={form.amount} onChange={handleChange} required />
        <label>Payment Method</label>
        <select name="method" value={form.method} onChange={handleChange}>
          <option>Credit Card</option><option>Debit Card</option><option>Net Banking</option><option>UPI</option>
        </select>
        <button className="btn" type="submit">Submit Payment</button>
      </form>
    </div>
  );
}
