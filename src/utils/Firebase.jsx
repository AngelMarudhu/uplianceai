// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCH3186eIsoo9AVTYj8F_r0_tJfhTnWEAQ",
  authDomain: "upliance-ai-d1d23.firebaseapp.com",
  projectId: "upliance-ai-d1d23",
  storageBucket: "upliance-ai-d1d23.firebasestorage.app",
  messagingSenderId: "188220272735",
  appId: "1:188220272735:web:d00e0cf0a7a0527b402bea",
  measurementId: "G-P82CGFVYBD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const authProvider = new GoogleAuthProvider();

export { auth, authProvider };
