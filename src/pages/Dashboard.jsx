// src/pages/Dashboard.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

// Students
import StudentRegistration from "./Students/StudentRegistration";
import StudentList from "./Students/StudentList";

// Teachers
import TeacherRegistration from "./Teachers/TeacherRegistration";
import TeacherList from "./Teachers/TeacherList";

// School (duplicate forms allowed)
import SchoolStudentReg from "./School/StudentRegistration";
import SchoolTeacherReg from "./School/TeacherRegistration";

// Syllabus
import SyllabusForm from "./Syllabus/SyllabusForm";
import SyllabusList from "./Syllabus/SyllabusList";

// Class
import AdmissionForm from "./Class/AdmissionForm";
import ClassList from "./Class/ClassList";

// Fees
import FeeStructure from "./Fees/FeeStructure";
import FeeVoucher from "./Fees/FeeVoucher";
import FeeSubmission from "./Fees/FeeSubmission";

// Admission
import MainAdmissionForm from "./Admission/AdmissionForm";

// Exams
import ExamSchedule from "./Exams/ExamSchedule";
import ExamResult from "./Exams/ExamResult";

// Subjects
import SubjectsAdd from "./Subjects/SubjectsAdd";
import SubjectsList from "./Subjects/SubjectsList";

export default function Dashboard({ user, onLogout }) {
  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      <Sidebar />

      <div className="content">
        <Routes>

          {/* Dashboard Home */}
          <Route path="/" element={
            <div className="form-card">
              <h2>Welcome to Bright Future Academy Dashboard</h2>
            </div>
          } />

          {/* Students */}
          <Route path="students/register" element={<StudentRegistration />} />
          <Route path="students/list" element={<StudentList />} />

          {/* Teachers */}
          <Route path="teachers/register" element={<TeacherRegistration />} />
          <Route path="teachers/list" element={<TeacherList />} />

          {/* School */}
          <Route path="school/student-register" element={<SchoolStudentReg />} />
          <Route path="school/teacher-register" element={<SchoolTeacherReg />} />

          {/* Syllabus */}
          <Route path="syllabus/form" element={<SyllabusForm />} />
          <Route path="syllabus/list" element={<SyllabusList />} />

          {/* Class */}
          <Route path="class/admission" element={<AdmissionForm />} />
          <Route path="class/list" element={<ClassList />} />

          {/* Fees */}
          <Route path="fees/structure" element={<FeeStructure />} />
          <Route path="fees/voucher" element={<FeeVoucher />} />
          <Route path="fees/submission" element={<FeeSubmission />} />

          {/* Admission */}
          <Route path="admission/form" element={<MainAdmissionForm />} />

          {/* Exams */}
          <Route path="exams/schedule" element={<ExamSchedule />} />
          <Route path="exams/result" element={<ExamResult />} />

          {/* Subjects */}
          <Route path="subjects/add" element={<SubjectsAdd />} />
          <Route path="subjects/list" element={<SubjectsList />} />

          {/* Invalid Routes */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </>
  );
}
