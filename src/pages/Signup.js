import React, { useState } from 'react';
import { apiSignup } from '../api';

function Signup({ setCurrentPage }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await apiSignup(name, email, password);
      setSuccess('✅ Account created! Redirecting to login...');
      setTimeout(() => setCurrentPage('login'), 1800);
    } catch (err) {
      const msg = err.response?.data?.message || '';
      if (err.code === 'ERR_NETWORK' || !err.response) {
        setError('⚠️ Server is starting up. Please wait 30-60 seconds and try again.');
      } else {
        setError(msg || 'Something went wrong. Try again.');
      }
    }
    setLoading(false);
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">⚕️</div>
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Join Krishna Medical Store for free</p>

        {error && <div className="auth-error">⚠️ {error}</div>}
        {success && <div className="auth-success">{success}</div>}

        {/* Server wake up notice */}
        <div className="server-notice">
          💡 First time? Server may take <strong>30-60 seconds</strong> to wake up.
        </div>

        <div className="auth-field">
          <label>Full Name</label>
          <input type="text" placeholder="Enter your full name" value={name}
            onChange={(e) => { setName(e.target.value); setError(''); }} />
        </div>
        <div className="auth-field">
          <label>Email Address</label>
          <input type="email" placeholder="Enter your email" value={email}
            onChange={(e) => { setEmail(e.target.value); setError(''); }} />
        </div>
        <div className="auth-field">
          <label>Password</label>
          <input type="password" placeholder="Minimum 6 characters" value={password}
            onChange={(e) => { setPassword(e.target.value); setError(''); }} />
        </div>
        <div className="auth-field">
          <label>Confirm Password</label>
          <input type="password" placeholder="Re-enter your password" value={confirmPassword}
            onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }} />
        </div>

        <button className="auth-btn" onClick={handleSignup} disabled={loading}>
          {loading ? '⏳ Creating Account...' : 'Create Account'}
        </button>

        <p className="auth-switch">
          Already have an account?{' '}
          <span onClick={() => setCurrentPage('login')}>Login here</span>
        </p>
      </div>
    </div>
  );
}

export default Signup;