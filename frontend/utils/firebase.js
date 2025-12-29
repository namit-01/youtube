// Import the functions you need from the SDKs you need
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "fir-fc1fe.firebaseapp.com",
  projectId: "fir-fc1fe",
  storageBucket: "fir-fc1fe.firebasestorage.app",
  messagingSenderId: "501690640610",
  appId: "1:501690640610:web:b6ae10dc707f64ee8596bb",
  measurementId: "G-P4LWZFMC10",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
