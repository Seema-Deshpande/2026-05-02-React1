import React, { useState } from 'react';
import "./Auth.css";

function Login() {
  // Define relevant state variables for login form
  const [ email, setEmail] = useState('');
  const [ password, setPassword] = useState('')

  const handleSubmit = e => {
    // Implement logic to print it on console and success on alert
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <input 
          value={email}
          onChange = {(event) => setEmail(event.target.value)}
          placeholder="Email"
        />
        <input 
          value={password}
          onChange = {(event) => setPassword(event.target.value)}
          placeholder='Password'
          />
      </div>
    </div>
  );
}

export default Login;