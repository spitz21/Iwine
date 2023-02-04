import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import "../App.css";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const auth = firebase.auth();

function SignUp() {
  const navigate = useNavigate();
  const [usernameValue, setUsernameValue] = useState("");
  const [passValue, setPassValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loggedIn] = useAuthState(auth);

  //useEffect detect changes on the state loggedIn, navigate to the homepage if the user is logged in
  //CR: Consider changing
  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  /*signs the user in with eamil and password, propmp error message if input is invalid*/
  const handleSigninClick = (e) => {
    e.preventDefault(); //prevent refreshing, if page is refreshed, all the useStates will reset
    auth.signInWithEmailAndPassword(usernameValue, passValue).catch((error) => {
      setErrorMessage(error.message);
    });
  };

  /*create user and signin the user, propmp error message if input is invalid*/
  const handleSignupClick = (e) => {
    e.preventDefault(); //prevent refreshing
    auth
      .createUserWithEmailAndPassword(usernameValue, passValue)
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  /*When button is clicked for Google Authentication, performs authentication*/
  const handleGoogleClick = (e) => {
    e.preventDefault(); //prevent refreshing
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <>
      <div className="App">
        <header>
          <h1>IWine</h1>
          <button className="loginButton" onClick={() => navigate("/")}>
            Return
          </button>
        </header>
        <section>
          <div className="login"> //CR: Change name
            <input
              className="input"
              value={usernameValue}
              onChange={(e) => setUsernameValue(e.target.value)}
              placeholder="Enter Email"
            />

            <input
              className="input"
              value={passValue}
              onChange={(e) => setPassValue(e.target.value)}
              placeholder="Enter Password"
            />

            {/* Change name of dividers*/}
            <hr className="myhr"></hr>
            <button className="loginButton" onClick={handleSignupClick}>
              SignUp
            </button>
            <hr className="myhr"></hr>
            <button className="loginButton" onClick={handleSigninClick}>
              Sign in
            </button>
            <hr className="myhr"></hr>
            <button className="loginButton" onClick={handleGoogleClick}>
              Google
            </button>
            <hr className="myhr"></hr>

            {/*Display error message*/}
            {errorMessage && <h3 color="white"> {errorMessage} </h3>}
          </div>
        </section>
      </div>
    </>
  );
}

export default SignUp;
