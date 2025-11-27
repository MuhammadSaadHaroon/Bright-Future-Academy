// src/pages/Login.jsx
import React, { useState } from "react";
import { auth, googleProvider } from "../firebase/config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      setErr(error.message);
    }
  };

  const handleGoogle = async () => {
    setErr("");
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <div style={{maxWidth:420, margin:"100px auto"}}>
      <div className="form-card">
        <h2>Bright Future Academy - Login</h2>
        {err && <div style={{color:'red',marginBottom:8}}>{err}</div>}
        <form onSubmit={handleEmailLogin}>
          <label>Email</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />

          <label>Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />

          <button className="btn" type="submit">Login</button>
        </form>

        <div style={{margin:'12px 0', textAlign:'center'}}>OR</div>

        <button className="btn" style={{background:'#db4437'}} onClick={handleGoogle}>Login with Google</button>

        <div style={{marginTop:10}}>
          Don't have an account? <Link to="/signup">Signup</Link>
        </div>
      </div>
    </div>
  );
}
