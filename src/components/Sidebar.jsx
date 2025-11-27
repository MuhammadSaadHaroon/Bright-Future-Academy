// src/components/Sidebar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [open, setOpen] = useState("");

  const toggle = (name) => {
    setOpen(open === name ? "" : name);
  };

  return (
    <div className="sidebar">

      {/* Students */}
      <div className="menu-item" onClick={() => toggle("students")}>
        <span>Students</span>
        <span>{open === "students" ? "▾" : "▸"}</span>
      </div>
      {open === "students" && (
        <div className="submenu">
          <Link to="/dashboard/students/register">Student Registration</Link>
          <Link to="/dashboard/students/list">Student List</Link>
        </div>
      )}

      {/* Teachers */}
      <div className="menu-item" onClick={() => toggle("teachers")}>
        <span>Teachers</span>
        <span>{open === "teachers" ? "▾" : "▸"}</span>
      </div>
      {open === "teachers" && (
        <div className="submenu">
          <Link to="/dashboard/teachers/register">Teacher Registration</Link>
          <Link to="/dashboard/teachers/list">Teacher List</Link>
        </div>
      )}

      {/* School */}
      <div className="menu-item" onClick={() => toggle("school")}>
        <span>School</span>
        <span>{open === "school" ? "▾" : "▸"}</span>
      </div>
      {open === "school" && (
        <div className="submenu">
          <Link to="/dashboard/school/student-register">Student Registration</Link>
          <Link to="/dashboard/school/teacher-register">Teacher Registration</Link>
        </div>
      )}

      {/* Syllabus */}
      <div className="menu-item" onClick={() => toggle("syllabus")}>
        <span>Syllabus</span>
        <span>{open === "syllabus" ? "▾" : "▸"}</span>
      </div>
      {open === "syllabus" && (
        <div className="submenu">
          <Link to="/dashboard/syllabus/form">Syllabus Form</Link>
          <Link to="/dashboard/syllabus/list">Syllabus List</Link>
        </div>
      )}

      {/* Class */}
      <div className="menu-item" onClick={() => toggle("class")}>
        <span>Class</span>
        <span>{open === "class" ? "▾" : "▸"}</span>
      </div>
      {open === "class" && (
        <div className="submenu">
          <Link to="/dashboard/class/admission">Admission Form</Link>
          <Link to="/dashboard/class/list">Class List</Link>
        </div>
      )}

      {/* Fees */}
      <div className="menu-item" onClick={() => toggle("fees")}>
        <span>Fees</span>
        <span>{open === "fees" ? "▾" : "▸"}</span>
      </div>
      {open === "fees" && (
        <div className="submenu">
          <Link to="/dashboard/fees/structure">Fee Structure</Link>
          <Link to="/dashboard/fees/voucher">Fee Voucher</Link>
          <Link to="/dashboard/fees/submission">Fee Submission</Link>
        </div>
      )}

      {/* Admission */}
      <div className="menu-item" onClick={() => toggle("admission")}>
        <span>Admission</span>
        <span>{open === "admission" ? "▾" : "▸"}</span>
      </div>
      {open === "admission" && (
        <div className="submenu">
          <Link to="/dashboard/admission/form">Admission Form</Link>
        </div>
      )}

      {/* Exams */}
      <div className="menu-item" onClick={() => toggle("exams")}>
        <span>Exams</span>
        <span>{open === "exams" ? "▾" : "▸"}</span>
      </div>
      {open === "exams" && (
        <div className="submenu">
          <Link to="/dashboard/exams/schedule">Exam Schedule</Link>
          <Link to="/dashboard/exams/result">Exam Result</Link>
        </div>
      )}

      {/* Subjects */}
      <div className="menu-item" onClick={() => toggle("subjects")}>
        <span>Subjects</span>
        <span>{open === "subjects" ? "▾" : "▸"}</span>
      </div>
      {open === "subjects" && (
        <div className="submenu">
          <Link to="/dashboard/subjects/add">Add Subject</Link>
          <Link to="/dashboard/subjects/list">Subjects List</Link>
        </div>
      )}
    </div>
  );
}
