// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjixRIUPTurJHfHNnV-sxoDJwob1wSZPk",
  authDomain: "shn-wayfinder-4dbf1.firebaseapp.com",
  projectId: "shn-wayfinder",
  storageBucket: "shn-wayfinder-4dbf1.firebasestorage.app",
  messagingSenderId: "272926547066",
  appId: "1:272926547066:web:1d49202154fc8203af6fc3",
  measurementId: "G-W5W7R2VXB4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db, analytics };