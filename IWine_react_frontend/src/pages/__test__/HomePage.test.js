/**
 * Homepage.test performs unit tests on the homepage file which displays a different page
 * based on whether the user is signed in. Also tests part of the sign in/out buttons in the header.
 * 
 * Tests:
 * "Verify wine page is shown when not logged in."
 * "Verify account page is shown when logged in.."
 * "Verify sign in button is displayed when not logged in."
 * "Verify sign out button is displayed when logged in."
 * "Click sign in button and verify reroute to SignUp page when not logged in.""
 * 
 * @author John Spitz (spitz3)
 * @version 2022.12.11
 * 
 * @Changelog
 * 12/12/22 Added commenting and fixed formatting
 * 12/11/22 initial commit and sign in/out button tests
 * 12/06/22 File created
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import React from 'react'
import '@testing-library/jest-dom'
import '@firebase/testing'
import HomePage from '../HomePage';

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

//Verify wine page is shown when not logged in.
test("Loads wine page when not logged in", async () => {
    await firebase.intializeTestApp({fireConfig})
    render(<HomePage></HomePage>)
    expect(screen.getByText("1. Enclosed above, beneath, before, behind")).toBeInTheDocument()
})

//Verify account page is shown when logged in.
test("Loads user page when logged in", async () => {
    await firebase.initializeTestApp({
        projectId: "watch-party-224bc",
        auth: { uid: "John Spitz", email: "spitz3@wisc.edu" }
    })
    render(<HomePage></HomePage>)
    expect(screen.getByText("Username")).toBeInTheDocument()
})

//Verify sign in button is displayed when not logged in.
test("Sign in button displayed when not signed in", async () => {
    await firebase.intializeTestApp({fireConfig})
    render(<HomePage></HomePage>)
    expect(screen.getByText("Sign in")).toBeInTheDocument()
})

//Verify sign out button is displayed when logged in.
test("Sign out button displayed when signed in", async () => {
    await firebase.initializeTestApp({
        projectId: "watch-party-224bc",
        auth: { uid: "John Spitz", email: "spitz3@wisc.edu" }
    })
    render(<HomePage></HomePage>)
    expect(screen.getByText("Sign in")).toBeInTheDocument()
})

//Click sign in button and verify reroute to SignUp page when not logged in.
test("Sign in button routes to sign up page", async () => {
    await firebase.intializeTestApp({fireConfig})
    const user = userEvent.setup()
    render(<HomePage></HomePage>)
    await user.click(screen.getByText("Sign in"))
    expect(screen.getByText("Google")).toBeInTheDocument()
})
