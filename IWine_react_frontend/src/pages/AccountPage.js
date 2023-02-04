import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import React, { useEffect, useRef, useState } from "react";
import "../App.css";

function AccountPage() {
  const auth = firebase.auth();
  //useStates for taking inputs
  const [email, setEmail] = useState("");
  const [passValue, setPassValue] = useState("");
  const [username, setUsername] = useState("");
  const [PFP, setPFP] = useState("");

  //placeholders for displaying in the input box
  const [emailPlaceholder, setEmailPlaceHoler] = useState(
    auth.currentUser.email
  );
  const [userNamePlaceholder, setuserPlaceHoler] = useState(
    auth.currentUser.displayName
  );
  const [PFPplaceholder, setPFPplaceholder] = useState(
    auth.currentUser.photoURL
  );

  //CR: identify use
  useEffect(() => {
    setEmail("");
  }, [emailPlaceholder]);

  useEffect(() => {
    setUsername("");
  }, [userNamePlaceholder]);

  useEffect(() => {
    setPFP("");
  }, [PFPplaceholder]);

  const handlePFPChange = (e) => {
    e.preventDefault(); //CR: Prevents page refresh
    auth.currentUser.updateProfile({ displayName: null, photoURL: PFP });
    setPFPplaceholder(PFP);
  };

  const handleUsernameChange = (e) => {
    e.preventDefault();
    auth.currentUser.updateProfile({ displayName: username, photoURL: null });
    setuserPlaceHoler(username);
  };

  const handleEmailChange = (e) => {
    e.preventDefault();
    auth.currentUser.updateEmail(email);
    setEmailPlaceHoler(email);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    auth.currentUser.updatePassword(passValue);
    setPassValue("");
  };

  return (
    <>
      <img className="pfp" src={PFPplaceholder} alt="profile" />
      <h2>Profile Picture URL</h2>
      <form>
        <input
          className="input"
          value={PFP}
          onChange={(e) => setPFP(e.target.value)}
          placeholder={PFPplaceholder}
        />
        <button className="button" onClick={handlePFPChange} disabled={!PFP}>
          save
        </button>
      </form>

      <h2>Username</h2>
      <form>
        <input
          className="input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={userNamePlaceholder}
        />
        <button
          className="button"
          onClick={handleUsernameChange}
          disabled={!username}
        >
          save
        </button>
      </form>

      <h2>Email</h2>
      <form>
        <input
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={emailPlaceholder}
        />
        <button
          className="button"
          onClick={handleEmailChange}
          disabled={!email}
        >
          save
        </button>
      </form>

      <h2>Password</h2>

      <form>
        <input
          className="input"
          value={passValue}
          onChange={(e) => setPassValue(e.target.value)}
          placeholder="enter new password"
        />
        <button
          className="button"
          onClick={handlePasswordChange}
          disabled={!passValue}
        >
          save
        </button>
      </form>
    </>
  );
}

export default AccountPage;
