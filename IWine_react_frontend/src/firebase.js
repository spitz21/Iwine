// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOWBoSppBDMpf0eYbocuAXES0tW6qQ5rE",
  authDomain: "watch-party-224bc.firebaseapp.com",
  databaseURL: "https://watch-party-224bc-default-rtdb.firebaseio.com",
  projectId: "watch-party-224bc",
  storageBucket: "watch-party-224bc.appspot.com",
  messagingSenderId: "781420058248",
  appId: "1:781420058248:web:1e1d71d6aff65b8e9db13d",
  measurementId: "G-YDTN67SC7W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

