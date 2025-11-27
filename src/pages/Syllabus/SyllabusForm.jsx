import React, { useState } from "react";
import { db, storage } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

export default function SyllabusForm(){
  const [form, setForm] = useState({ subjectName:"", className:"", pdfFile:null });
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFile = e => setForm({...form, pdfFile: e.target.files[0]});
  const handleChange = e => setForm({...form,[e.target.name]: e.target.value});

  const handleSubmit = async e => {
    e.preventDefault();
    if(!form.pdfFile) return alert("Upload PDF");
    setLoading(true);
    try {
      const storageRef = ref(storage, `syllabus/${Date.now()}_${form.pdfFile.name}`);
      await uploadBytes(storageRef, form.pdfFile);
      const url = await getDownloadURL(storageRef);
      await addDoc(collection(db,"syllabus"), { subjectName: form.subjectName, className: form.className, pdfURL: url, createdAt: new Date() });
      alert("Syllabus added");
      navigate("/dashboard/syllabus/list");
    } catch(err){ console.error(err); alert("Error"); } finally { setLoading(false); }
  };

  return (
    <div className="form-card">
      <h2>Syllabus Add</h2>
      <form onSubmit={handleSubmit}>
        <label>Subject Name</label>
        <input name="subjectName" value={form.subjectName} onChange={handleChange} required />
        <label>Class</label>
        <input name="className" value={form.className} onChange={handleChange} required />
        <label>Upload PDF</label>
        <input type="file" accept="application/pdf" onChange={handleFile} required />
        <button className="btn" type="submit" disabled={loading}>{loading ? "Uploading..." : "Add"}</button>
      </form>
    </div>
  );
}
