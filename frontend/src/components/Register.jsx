import React, { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "https://amusic-hm8o.onrender.com";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (localStorage.getItem("token")) {
    return <Navigate to="/home" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/register`, { name, email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-radial min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-margin-mobile pt-24 pb-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        
        <div className="glass-panel rounded-2xl shadow-2xl w-full max-w-[480px] p-8 md:p-10 relative z-10">
          <div className="text-center mb-8">
            <h1 className="font-headline-lg text-[32px] md:text-headline-lg text-on-surface mb-2">Create Account</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Join Amusic to start listening.</p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-error/10 border border-error/20 text-error p-3 rounded-lg text-center text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="font-label-sm text-label-sm text-on-surface-variant block" htmlFor="name">Full Name</label>
              <div className="relative">
                <span className="font-bold absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[10px]">[ USER ]</span>
                <input 
                  className="input-glass w-full rounded-lg py-3 pl-14 pr-4 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50 transition-colors" 
                  id="name" placeholder="John Doe" required type="text"
                  value={name} onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-label-sm text-label-sm text-on-surface-variant block" htmlFor="email">Email Address</label>
              <div className="relative">
                <span className="font-bold absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[10px]">[ MAIL ]</span>
                <input 
                  className="input-glass w-full rounded-lg py-3 pl-14 pr-4 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50 transition-colors" 
                  id="email" placeholder="name@example.com" required type="email"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="font-label-sm text-label-sm text-on-surface-variant block" htmlFor="password">Password</label>
              <div className="relative">
                <span className="font-bold absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[10px]">[ LOCK ]</span>
                <input 
                  className="input-glass w-full rounded-lg py-3 pl-14 pr-10 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50 transition-colors" 
                  id="password" placeholder="Min 6 characters" required type="password" minLength={6}
                  value={password} onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            
            <button className="w-full bg-primary text-on-primary-fixed font-label-md text-label-md py-3 rounded-lg btn-primary-glow flex justify-center items-center gap-2 active:scale-[0.98] transition-transform" type="submit" disabled={loading}>
              {loading ? "Creating account..." : "Sign Up"}
              <span className="font-bold text-[14px]">[ -&gt; ]</span>
            </button>
          </form>
          
          <div className="mt-8 text-center font-body-md text-body-md text-on-surface-variant">
            Already have an account? <Link to="/login" className="text-primary hover:underline font-label-md text-label-md">Sign In</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Register;
