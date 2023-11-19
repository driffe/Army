// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZBzOA-rndFsBpJVPQDi4p1PoeAq1Hh40",
  authDomain: "money-tracker-f82b9.firebaseapp.com",
  projectId: "money-tracker-f82b9",
  storageBucket: "money-tracker-f82b9.appspot.com",
  messagingSenderId: "758146027382",
  appId: "1:758146027382:web:ff6a93fde273dd7b8bb457"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {app, db}