// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEjv3Vo58vi33HrXRQc3G_8EWx4lK64E8",
  authDomain: "srebmahc-studios.firebaseapp.com",
  projectId: "srebmahc-studios",
  storageBucket: "srebmahc-studios.appspot.com", 
  messagingSenderId: "818269198203",
  appId: "1:818269198203:web:3c562abd6b3265e1120fde",
  measurementId: "G-SDGV3S4SQ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // creates Firestore instance

export { db }; 
