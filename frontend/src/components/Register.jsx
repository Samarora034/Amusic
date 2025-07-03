import "./css/Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";

function Register() {
  const [darkMode, setDarkMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(" https://amusic-hm8o.onrender.com/register", {
        name,
        email,
        password,
      });

      if (res.data && res.data._id) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        alert("Registration failed or email already in use.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during registration.");
    }
  };

  return (
    <div className={`page-container ${darkMode ? "dark-mode" : ""}`}>
      <Navbar setToggle={setDarkMode} />
      <div className={`register-container ${darkMode ? "dark-mode" : ""}`}>
        <form onSubmit={handleSubmit}>
          <h1>Create Your Account</h1>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>
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
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
