// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEAIR5yoATFbaLCc7MEKx2AAUSrlrrmLI",
  authDomain: "buddy-efos.firebaseapp.com",
  projectId: "buddy-efos",
  storageBucket: "buddy-efos.firebasestorage.app",
  messagingSenderId: "950627290842",
  appId: "1:950627290842:web:458c3e61a76743f392dfe3",
  measurementId: "G-3PLJ3S0XNW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
export const db = getFirestore(app);