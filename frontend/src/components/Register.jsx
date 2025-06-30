import "./css/Register.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Darkmode } from "./Darkmode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [darkMode, setDarkMode] = useState(false);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/register", {
        name,
        email,
        password,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
      navigate("/login");
  };

  return (
    <div className={`page-container ${darkMode ? "dark-mode" : ""}`}>
      <Navbar setToggle={setDarkMode} />
      <div className={`register-container ${darkMode ? "dark-mode" : ""}`}>
        {/* Form with controlled components and submission handler */}
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
          {/* Submit button wrapped in Link component */}
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
