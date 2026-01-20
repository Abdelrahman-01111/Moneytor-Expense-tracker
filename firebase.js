// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwcNOJp-zz4dDcXwhZE26gIuoVZt5RETI",
  authDomain: "moneytor-dbce0.firebaseapp.com",
  projectId: "moneytor-dbce0",
  storageBucket: "moneytor-dbce0.firebasestorage.app",
  messagingSenderId: "186274850231",
  appId: "1:186274850231:web:891c46dfee3254dedb3432",
  measurementId: "G-BQ1DCMH43J"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const Auth = getAuth(app);
