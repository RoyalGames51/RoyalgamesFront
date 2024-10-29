// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDZPhjzbQaNzPJIp10_Yrt-0nYBTdrjH0",
  authDomain: "royalgames-87913.firebaseapp.com",
  projectId: "royalgames-87913",
  storageBucket: "royalgames-87913.appspot.com",
  messagingSenderId: "194747711353",
  appId: "1:194747711353:web:72067ae448d496eb77f9a8",
  measurementId: "G-ZF2QTPWCEN"
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth(app);