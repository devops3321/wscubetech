// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB06j38pGowo4DHyefzGybhTu2pezdqq3s",
  authDomain: "monsta-95879.firebaseapp.com",
  projectId: "monsta-95879",
  storageBucket: "monsta-95879.firebasestorage.app",
  messagingSenderId: "120157619869",
  appId: "1:120157619869:web:e474e9d981591ac4d5b674",
  measurementId: "G-GBQWNVMQDG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);