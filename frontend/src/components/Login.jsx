import "./css/Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";

function Login() {
  const [darkMode, setDarkMode] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });

      const msg = res.data.message;

      if (msg === "Login successful") {
        alert("Login successful!");
        navigate("/home");
      } else if (msg === "Invalid password") {
        alert("Incorrect password. Please try again.");
      } else if (msg === "User not found") {
        alert("User does not exist.");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Try again later.");
    }
  };

  return (
    <div className={`page-container ${darkMode ? "dark-mode" : ""}`}>
      <Navbar setToggle={setDarkMode} />
      <div className={`login-container ${darkMode ? "dark-mode" : ""}`}>
        <form onSubmit={handleSubmit}>
          <h1>Login to Your Account</h1>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
