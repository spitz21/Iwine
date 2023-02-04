/**
 * AccountPage.test performs unit tests on the Account Page in the app.
 * 
 * Tests:
 * "Can read from user db"
 * "Can update user information" (TODO)
 * 
 * @author John Spitz (spitz3)
 * @version 2022.12.11
 * 
 * @Changelog
 * 12/12/22 Added commenting
 * 12/09/22 Added routing tests and fixed formatting
 * 12/05/22 File Created
 */

import { render, screen } from '@testing-library/react';
import React from 'react'
import '@testing-library/jest-dom'
import firebase from "firebase/compat/app";
import userEvent from '@testing-library/user-event'
import '@firebase/testing'

  var fireConfig = {
    apiKey: "AIzaSyAOWBoSppBDMpf0eYbocuAXES0tW6qQ5rE",
    authDomain: "watch-party-224bc.firebaseapp.com",
    databaseURL: "https://watch-party-224bc-default-rtdb.firebaseio.com",
    projectId: "watch-party-224bc",
    storageBucket: "watch-party-224bc.appspot.com",
    messagingSenderId: "781420058248",
    appId: "1:781420058248:web:1e1d71d6aff65b8e9db13d",
    measurementId: "G-YDTN67SC7W",
}

//Checks that firebase can be initialized and account information can be retrieved
test("Can read from user db",  async () => {
    await firebase.initializeTestApp({
        projectId: "watch-party-224bc",
        auth: { uid: "John Spitz", email: "spitz3@wisc.edu" }
      });
    const userDoc = db.collection("users").doc("userTest")
    await firebase.assertSucceeds(userTest.get())
})

//TODO: click user info and change.
// test("Can update Account information", async () => {
//     await firebase.initializeTestApp({
//         projectId: "watch-party-224bc",
//         auth: { uid: "John Spitz", email: "spitz3@wisc.edu" }
//       });
//     const user = userEvent.setup()
//     render(<AccountPage></AccountPage>)
//     await user.click(screen.getByDisplayValue("spitz3@wisc.edu"))
// })