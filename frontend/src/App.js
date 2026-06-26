import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Register from "./components/Register";
import Home from "./components/Home";
import Login from "./components/Login";
import Explore from "./components/Explore";
import Library from "./components/Library";
import Player from "./components/Player";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider } from "./context/ThemeContext";
import { PlayerProvider } from "./context/PlayerContext";
import CustomCursor from "./components/CustomCursor";

function App() {
  return (
    <ThemeProvider>
      <PlayerProvider>
        <Router>
          <CustomCursor />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/explore" element={<ProtectedRoute><Explore /></ProtectedRoute>} />
            <Route path="/library" element={<ProtectedRoute><Library /></ProtectedRoute>} />
          </Routes>
          <Player />
        </Router>
      </PlayerProvider>
    </ThemeProvider>
  );
}

export default App;
