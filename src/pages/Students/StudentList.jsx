import React, { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const snap = await getDocs(collection(db, "students"));
        const arr = [];
        snap.forEach(doc => arr.push({ id: doc.id, ...doc.data() }));
        setStudents(arr);
      } catch(err) { console.error(err); }
    };
    fetchStudents();
  }, []);

  return (
    <div className="table-card">
      <div className="table-header">
        <h3>Students List</h3>
        <div>
          <button className="btn secondary" onClick={() => navigate("/dashboard/students/register")}>Add</button>
        </div>
      </div>

      <table>
        <thead>
          <tr><th>ID</th><th>First</th><th>Last</th><th>Email</th><th>Class</th><th>Gender</th></tr>
        </thead>
        <tbody>
          {students.length===0 ? <tr><td colSpan={6}>No students yet</td></tr> :
            students.map(s => (
              <tr key={s.id}>
                <td style={{fontSize:12}}>{s.id}</td>
                <td>{s.firstName}</td>
                <td>{s.lastName}</td>
                <td>{s.email}</td>
                <td>{s.className}</td>
                <td>{s.gender}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
