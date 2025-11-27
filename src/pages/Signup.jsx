// src/pages/Signup.jsx
import React, { useState } from "react";
import { auth, googleProvider, db } from "../firebase/config";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const user = cred.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        firstName,
        lastName,
        email,
        createdAt: new Date()
      });
      navigate("/dashboard");
    } catch (error) {
      setErr(error.message);
    }
  };

  const handleGoogleSignup = async () => {
    setErr("");
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      // add to users collection (optional duplication ok)
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        firstName: user.displayName?.split(" ")[0] || "",
        lastName: user.displayName?.split(" ")[1] || "",
        email: user.email,
        createdAt: new Date()
      });
      navigate("/dashboard");
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <div style={{maxWidth:500, margin:"80px auto"}}>
      <div className="form-card">
        <h2>Create account - Bright Future Academy</h2>
        {err && <div style={{color:'red'}}>{err}</div>}
        <form onSubmit={handleEmailSignup}>
          <div className="form-row">
            <div className="col">
              <label>First Name</label>
              <input type="text" value={firstName} onChange={e=>setFirstName(e.target.value)} required />
            </div>
            <div className="col">
              <label>Last Name</label>
              <input type="text" value={lastName} onChange={e=>setLastName(e.target.value)} required />
            </div>
          </div>

          <label>Email</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />

          <label>Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />

          <button className="btn" type="submit">Signup</button>
        </form>

        <div style={{margin:'12px 0', textAlign:'center'}}>OR</div>

        <button className="btn" style={{background:'#db4437'}} onClick={handleGoogleSignup}>Signup with Google</button>

        <div style={{marginTop:10}}>
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
