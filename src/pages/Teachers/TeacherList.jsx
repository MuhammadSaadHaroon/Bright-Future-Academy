import React, { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function TeacherList(){
  const [teachers,setTeachers] = useState([]);
  const navigate = useNavigate();

  useEffect(()=> {
    const fetch = async () => {
      try {
        const snap = await getDocs(collection(db,"teachers"));
        const arr = []; snap.forEach(d=>arr.push({id:d.id,...d.data()}));
        setTeachers(arr);
      } catch(e){ console.error(e); }
    }; fetch();
  },[]);

  return (
    <div className="table-card">
      <div className="table-header">
        <h3>Teacher List</h3>
        <div><button className="btn secondary" onClick={() => navigate("/dashboard/teachers/register")}>Add</button></div>
      </div>
      <table>
        <thead><tr><th>ID</th><th>First</th><th>Last</th><th>Email</th><th>Class</th><th>Gender</th></tr></thead>
        <tbody>
          {teachers.length===0 ? <tr><td colSpan={6}>No teachers yet</td></tr> :
            teachers.map(t => (
              <tr key={t.id}>
                <td style={{fontSize:12}}>{t.id}</td>
                <td>{t.firstName}</td>
                <td>{t.lastName}</td>
                <td>{t.email}</td>
                <td>{t.className}</td>
                <td>{t.gender}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
