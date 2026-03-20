import React, { useState } from 'react';
import { apiLogin } from '../api';

function Login({ setCurrentPage, setLoggedInUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) { setError('Please enter both email and password.'); return; }
    setLoading(true);
    setError('');
    try {
      const data = await apiLogin(email, password);
      localStorage.setItem('kms_loggedIn', JSON.stringify(data.user));
      localStorage.setItem('kms_token', data.token);
      setLoggedInUser(data.user);
      setCurrentPage('home');
    } catch (err) {
      const msg = err.response?.data?.message || '';
      if (err.code === 'ERR_NETWORK' || !err.response) {
        setError('Server is starting up. Please wait 30 seconds and try again.');
      } else if (msg.includes('Invalid')) {
        setError('Wrong email or password. Please check and try again.');
      } else {
        setError(msg || 'Something went wrong. Try again.');
      }
    }
    setLoading(false);
  }

  function handleKeyPress(e) { if (e.key === 'Enter') handleLogin(); }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">⚕️</div>
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Login to Krishna Medical Store</p>
        {error && <div className="auth-error">⚠️ {error}</div>}
        <div className="auth-field">
          <label>Email Address</label>
          <input type="email" placeholder="Enter your email" value={email}
            onChange={(e) => { setEmail(e.target.value); setError(''); }}
            onKeyPress={handleKeyPress} />
        </div>
        <div className="auth-field">
          <label>Password</label>
          <input type="password" placeholder="Enter your password" value={password}
            onChange={(e) => { setPassword(e.target.value); setError(''); }}
            onKeyPress={handleKeyPress} />
        </div>
        <button className="auth-btn" onClick={handleLogin} disabled={loading}>
          {loading ? '⏳ Logging in...' : 'Login'}
        </button>
        <p className="auth-switch">
          Don't have an account?{' '}
          <span onClick={() => setCurrentPage('signup')}>Sign Up</span>
        </p>
      </div>
    </div>
  );
}

export default Login;