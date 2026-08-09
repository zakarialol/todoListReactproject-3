// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANYIJDBGBJ61Q0ITA700YD4vyrD4akBh8",
  authDomain: "todo-list-357eb.firebaseapp.com",
  projectId: "todo-list-357eb",
  storageBucket: "todo-list-357eb.firebasestorage.app",
  messagingSenderId: "649822178887",
  appId: "1:649822178887:web:4b9b467dd1d39f354fab62",
  measurementId: "G-ZXQ22SDBE7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
