import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../App.css";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { useAuthState } from "react-firebase-hooks/auth";
import UserPage from "./UserPage";
import WineList from "./WineList.js";

/*firebase initialization*/
firebase.initializeApp({
  apiKey: "AIzaSyAOWBoSppBDMpf0eYbocuAXES0tW6qQ5rE",
  authDomain: "watch-party-224bc.firebaseapp.com",
  databaseURL: "https://watch-party-224bc-default-rtdb.firebaseio.com",
  projectId: "watch-party-224bc",
  storageBucket: "watch-party-224bc.appspot.com",
  messagingSenderId: "781420058248",
  appId: "1:781420058248:web:1e1d71d6aff65b8e9db13d",
  measurementId: "G-YDTN67SC7W",
});
const auth = firebase.auth();

/*Loads the homepage based on if user is signed in or not. Header provides option to sign in or out.*/
function HomePage() {
  const [user] = useAuthState(auth);

  return (
    <body>
      <div className="App">
        <header>
          <h1>IWine</h1>
          <SignIn />
          <SignOut />
        </header>
        <section>{user ? <UserPage /> : <WineList />}</section>
      </div>
    </body>
  );
}

function SignIn() {
  const navigate = useNavigate();
  return (
    !auth.currentUser && (
      <button className="loginButton" onClick={() => navigate("/login")}>
        Sign In
      </button>
    )
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <button className="loginButton" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
}

export default HomePage;
