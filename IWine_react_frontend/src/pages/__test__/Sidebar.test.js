/**
 * Sidebar.test performs unit tests on the SideBar page.
 * 
 * Tests:
 * "sidebar renders text correctly"
 * "sidebar routes correctly to search page"
 * "sidebar routes correctly to wine page"
 * "sidebar routes correctly to account page"
 * 
 * @author John Spitz (spitz3)
 * @version 2022.12.11
 * 
 * @Changelog
 * 12/12/22 Added commenting
 * 12/09/22 Added routing tests and fixed formatting
 * 12/05/22 File Created
 */

import React from 'react'
import Sidebar from "../Sidebar";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import '@firebase/testing'

//Checks that the sidebar renders and its elements can be read from the screen.
test("sidebar renders text correctly", () => {
    render(<Sidebar />)
    expect(screen.getByText("Search")).toBeInTheDocument()
    expect(screen.getByText("Wine Lists")).toBeInTheDocument()
    expect(screen.getByText("Account")).toBeInTheDocument()
    
})

//Tests that the default page or the sidebar is the search page.
test("sidebar routes correctly to search page", () => {
    render(<Sidebar />)
    expect(screen.getByText("Search Page")).toBeInTheDocument()
})

//Tests that sidebar routes to the wine page. Clicks the Wine Lists routing element and verifies that the sidebar is in the correct state.
test("sidebar routes correctly to wine page", async () => {
    const sidebar = new Sidebar
    const user = userEvent.setup()
    sidebar.render()
    await user.click(screen.getAllByText("Wine Lists"))
    expect(sidebar.state == 2)

})

test("sidebar routes correctly to account page", async () => {
    const sidebar = new Sidebar
    const user = userEvent.setup()
    sidebar.render()
    await user.click(screen.getAllByText("Account"))
    expect(sidebar.state == 3)

})



