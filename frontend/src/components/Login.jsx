import "./css/Login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Darkmode } from "./Darkmode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [darkMode, setDarkMode] = useState(false);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", {
        email,
        password,
      })
      .then(res => {
        console.log(res);
        if (res.data.message === "Login successful") {
          navigate("/home");
        } else if (res.data.message === "Invalid password") {
          alert("Invalid password or username");
        } else if (res.data.message === "User not found") {
          alert("User not found");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={`page-container ${darkMode ? "dark-mode" : ""}`}>
      <Navbar setToggle={setDarkMode} />
      <div className={`login-container ${darkMode ? "dark-mode" : ""}`}>
        {/* Form with controlled components and submission handler */}
        <form onSubmit={handleSubmit}>
        <h1>Create Your Account</h1>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
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
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          {/* Submit button wrapped in Link component */}
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
