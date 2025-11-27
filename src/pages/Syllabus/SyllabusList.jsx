import React, { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function SyllabusList(){
  const [items,setItems]=useState([]);
  const navigate = useNavigate();

  useEffect(()=> {
    const fetch = async () => {
      try {
        const snap = await getDocs(collection(db,"syllabus"));
        const arr=[]; snap.forEach(d=>arr.push({id:d.id,...d.data()}));
        setItems(arr);
      } catch(e){ console.error(e); }
    }; fetch();
  },[]);

  return (
    <div className="table-card">
      <div className="table-header">
        <h3>Syllabus List</h3>
        <div><button className="btn secondary" onClick={() => navigate("/dashboard/syllabus/form")}>Add</button></div>
      </div>

      <table>
        <thead><tr><th>ID</th><th>Subject</th><th>Class</th><th>PDF</th></tr></thead>
        <tbody>
          {items.length===0 ? <tr><td colSpan={4}>No syllabus added</td></tr> :
            items.map(s => (
              <tr key={s.id}>
                <td style={{fontSize:12}}>{s.id}</td>
                <td>{s.subjectName}</td>
                <td>{s.className}</td>
                <td><a href={s.pdfURL} target="_blank" rel="noreferrer">Download</a></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
