import React, { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";

export default function ClassList(){
  const [items,setItems]=useState([]);
  useEffect(()=> {
    const fetch = async () => {
      try {
        const snap = await getDocs(collection(db,"admissions"));
        const arr=[]; snap.forEach(d=>arr.push({id:d.id,...d.data()}));
        setItems(arr);
      } catch(e){ console.error(e); }
    }; fetch();
  },[]);
  return (
    <div className="table-card">
      <div className="table-header"><h3>Class / Admissions</h3></div>
      <table>
        <thead><tr><th>ID</th><th>First</th><th>Last</th><th>Father</th><th>Email</th><th>Phone</th><th>DOB</th><th>Qualification</th><th>Gender</th></tr></thead>
        <tbody>
          {items.length===0 ? <tr><td colSpan={9}>No admissions</td></tr> :
            items.map(a => (
              <tr key={a.id}>
                <td style={{fontSize:12}}>{a.id}</td>
                <td>{a.firstName}</td>
                <td>{a.lastName}</td>
                <td>{a.fatherName}</td>
                <td>{a.email}</td>
                <td>{a.phone}</td>
                <td>{a.dob}</td>
                <td>{a.qualification}</td>
                <td>{a.gender}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
