// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBOCRl9nXQcHa4vOGo43sv_TJAfaxnSSWE",
  authDomain: "bright-future-academy-e313e.firebaseapp.com",
  projectId: "bright-future-academy-e313e",
  storageBucket: "bright-future-academy-e313e.firebasestorage.app",
  messagingSenderId: "945489536326",
  appId: "1:945489536326:web:f5371bb53f13ca14b1b147"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
