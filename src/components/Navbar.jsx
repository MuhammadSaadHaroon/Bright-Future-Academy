// src/components/Navbar.jsx
import React from "react";
import Logo from "../assets/logo.png";

export default function Navbar({ user, onLogout }) {
  return (
    <div className="navbar">
      <div className="left">
        <div className="school-logo">
          <img src={Logo} alt="School Logo" style={{ width: 40, height: 40 }} />
        </div>
        <div className="school-name">Bright Future Academy</div>
      </div>

      <div className="right">
        <div style={{ color: "#e6eef8", fontSize: 14, marginRight: 8 }}>
          {user?.email || ""}
        </div>

        <div className="author">
          <div className="avatar">A</div>
          <div className="dropdown">
            <div
              style={{ padding: "6px 10px", cursor: "pointer" }}
              onClick={onLogout}
            >
              Logout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
