import React, { useState } from 'react';
import loginImg from "../../assets/login-bg.jpg";
import "./Auth.css";

function Login() {
  // Define relevant state variables for login form
  const [ email, setEmail] = useState('');
  const [ password, setPassword] = useState('')

  const handleSubmit = e => {
    e.preventDefault();
    // Implement logic to print it on console and success on alert
    console.log("Email:", email);
    console.log("Password:", password);
    alert("Login successful!");
  };

  return (
    <div className="login-container">
      <div className="login-form-side">
        <div className="login-form-inner">
          <h1 className="login-brand">Login</h1>
          <p className="login-tagline">Welcome back! Sign in to continue.</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="inline-placeholder">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email address"
            />
            <label htmlFor="password" className="inline-placeholder">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
            />
            <button type="submit" className="login-btn">Sign In</button>
          </form>
        </div>
      </div>
      <div className="login-image-side">
        <img src={loginImg} alt="Login background" />
      </div>
    </div>
  );
}

export default Login;