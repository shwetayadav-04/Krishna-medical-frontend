import React, { useState } from 'react';

function Signup({ setCurrentPage }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function handleSignup() {
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
    const users = JSON.parse(localStorage.getItem('kms_users') || '[]');
    if (users.find((u) => u.email === email)) {
      setError('This email is already registered. Please login.');
      return;
    }
    users.push({ name, email, password });
    localStorage.setItem('kms_users', JSON.stringify(users));
    setSuccess('Account created successfully! Redirecting to login...');
    setError('');
    setTimeout(() => setCurrentPage('login'), 1800);
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">⚕️</div>
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Join Krishna Medical Store for free</p>

        {error && <div className="auth-error">⚠️ {error}</div>}
        {success && <div className="auth-success">✅ {success}</div>}

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

        <button className="auth-btn" onClick={handleSignup}>Create Account</button>

        <p className="auth-switch">
          Already have an account?{' '}
          <span onClick={() => setCurrentPage('login')}>Login here</span>
        </p>
      </div>
    </div>
  );
}

export default Signup;