/**
 * App.test performs rendering and routing unit tests on the main app file.
 * 
 * Tests:
 * 'app rendering/navigating'
 * 'landing on a bad page'
 * 
 * @author John Spitz (spitz3)
 * @version 2022.12.11
 * 
 * @Changelog
 * 12/12/22 Formating and commenting fixes
 * 12/11/22 Firebase fixes and commenting
 * 12/04/22 Updated for new design
 * 11/12/22 Rendering tests added
 * 10/06/22 File Created
 */

import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event'
import React from 'react'
import '@testing-library/jest-dom'
import {BrowserRouter, MemoryRouter} from 'react-router-dom'
import '@firebase/testing'

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

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

test('app rendering/navigating', async () => {
  await firebase.intializeTestApp({fireConfig})
  render(<App />, {wrapper: BrowserRouter})
  const user = userEvent.setup()

  // verify page for default route
  expect(screen.getByText("Enter Wine Name Here")).toBeInTheDocument()

  // verify correct page loading after routing
  await user.click(screen.getByText("Search"))
  expect(screen.getByText("Search Page")).toBeInTheDocument()
})

test('landing on a bad page', async () => {
  await firebase.intializeTestApp({fireConfig})
  const badRoute = '/bad/route'
  render(
    <MemoryRouter initialEntries={[badRoute]}>
      <App />
    </MemoryRouter>,
  )

  // verify navigation bad route
  expect(screen.getByText("can't reach this page")).toBeInTheDocument()
})

