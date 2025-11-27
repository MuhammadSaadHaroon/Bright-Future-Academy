import React, { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function SubjectsList(){
  const [rows,setRows]=useState([]);
  const navigate = useNavigate();

  useEffect(()=> {
    const fetch = async () => {
      try {
        const snap = await getDocs(collection(db,"subjects"));
        const arr=[]; snap.forEach(d=>arr.push({id:d.id,...d.data()}));
        setRows(arr);
      } catch(e){ console.error(e); }
    }; fetch();
  },[]);

  return (
    <div className="table-card">
      <div className="table-header"><h3>Subject List</h3><div><button className="btn secondary" onClick={() => navigate("/dashboard/subjects/add")}>Add</button></div></div>
      <table>
        <thead><tr><th>ID</th><th>Subject</th><th>Class</th><th>Group</th></tr></thead>
        <tbody>
          {rows.length===0 ? <tr><td colSpan={4}>No subjects</td></tr> :
            rows.map(r => (
              <tr key={r.id}><td style={{fontSize:12}}>{r.id}</td><td>{r.subjectName}</td><td>{r.className}</td><td>{r.group}</td></tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
