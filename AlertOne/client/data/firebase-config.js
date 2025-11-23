// Import the functions you need from the Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDKU2dkIUZTiyLhZIpSaWno-mypI5guoic",
  authDomain: "vision-angels.firebaseapp.com",
  databaseURL: "https://vision-angels-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "vision-angels",
  storageBucket: "vision-angels.firebasestorage.app",
  messagingSenderId: "197950307507",
  appId: "1:197950307507:web:863ce9311979b882c5c4c6",
  measurementId: "G-NJBHE4PV6S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
