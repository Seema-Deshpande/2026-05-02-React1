import React, { useState } from 'react';
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
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
          />
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder='Password'
          />
          <button>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;