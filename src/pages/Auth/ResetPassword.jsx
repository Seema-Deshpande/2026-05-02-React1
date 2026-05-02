import  { useState } from 'react';
import "./Auth.css";

function ResetPassword({ onResetPassword }) {
  const [form, setForm] = useState({
    email: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // If validation passes
    setError('');
    if (onResetPassword) {
      onResetPassword(form);
    }
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="auth-container">
        <div className="auth-box">
          <h2>Success!</h2>
          <p>Your password has been successfully reset.</p>
          <button onClick={() => setSuccess(false)}>Reset Another</button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />

          <label htmlFor="oldPassword">Old Password</label>
          <input
            id="oldPassword"
            name="oldPassword"
            type="password"
            value={form.oldPassword}
            onChange={handleChange}
            placeholder="Old Password"
            required
          />

          <label htmlFor="newPassword">New Password</label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            value={form.newPassword}
            onChange={handleChange}
            placeholder="New Password"
            required
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />

          <button type="submit">Reset Password</button>
        </form>
        {error && <p style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>{error}</p>}
      </div>
    </div>
  );
}

export default ResetPassword;
