/**
 * Signup.test performs unit tests on the Signup app page.
 * 
 * Tests:
 * "Page renders correctly"
 * "Google provider pop-up triggers"
 * 
 * @author John Spitz (spitz3)
 * @version 2022.12.12
 * 
 * @Changelog
 * 12/12/22 Added commenting
 * 12/11/22 Google sign in provider test added
 * 12/10/22 File Created
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import React from 'react'
import '@testing-library/jest-dom'
import SignUp from '../SignUp';
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

//Tests that the page renders properly and expected text can be read.
test("Page renders correctly", async () => {
    await firebase.intializeTestApp({fireConfig})
    render(<SignUp></SignUp>)
    expect(screen.getByText("Google"))
})

//Tests that when a user clicks on the google sign in, the google authentication window is displayed. 
test("Google provider pop-up triggers", async () => {
    await firebase.intializeTestApp({fireConfig})
    const user = userEvent.setup()
    render(<SignUp></SignUp>)
    await user.click(screen.getByText("Google"))
    expect(screen.getByText("Sign in with Google"))
})