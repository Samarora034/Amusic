import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import LandingPage from "./components/LandingPage";
import Register from "./components/Register";
import Home from "./components/Home";
import Login from "./components/Login";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element = {<Login/>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
