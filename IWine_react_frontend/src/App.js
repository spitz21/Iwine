import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import UserPage from "./pages/UserPage";
import WineList from "./pages/WineList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<SignUp />} />
        <Route exact path="/UserPage" element={<UserPage />} />
        <Route path="/WineList" element={<WineList />} />
      </Routes>
    </Router>
  );
};

export default App;
