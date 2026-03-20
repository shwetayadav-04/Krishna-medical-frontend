import React from 'react';

function Profile({ loggedInUser, setLoggedInUser, setCurrentPage, darkMode, setDarkMode }) {

  function handleLogout() {
    localStorage.removeItem('kms_loggedIn');
    localStorage.removeItem('kms_token');
    setLoggedInUser(null);
    setCurrentPage('home');
  }

  if (!loggedInUser) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-logo">👤</div>
          <h2 className="auth-title">Not Logged In</h2>
          <p className="auth-subtitle">Please login to view your profile</p>
          <button className="auth-btn" onClick={() => setCurrentPage('login')}>Login</button>
          <p className="auth-switch">
            Don't have an account?{' '}
            <span onClick={() => setCurrentPage('signup')}>Sign Up</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">

      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-avatar">
          {loggedInUser.name.charAt(0).toUpperCase()}
        </div>
        <h2 className="profile-name">{loggedInUser.name}</h2>
        <p className="profile-email">{loggedInUser.email}</p>
      </div>

      <div className="profile-body">

        {/* Quick Actions */}
        <div className="profile-section">
          <h3 className="profile-section-title">Quick Actions</h3>

          <div className="profile-action-card" onClick={() => setCurrentPage('orders')}>
            <span className="action-icon">📦</span>
            <div className="action-info">
              <p className="action-title">Order History</p>
              <p className="action-desc">View all your past orders</p>
            </div>
            <span className="action-arrow">→</span>
          </div>

          <div className="profile-action-card" onClick={() => setCurrentPage('wishlist')}>
            <span className="action-icon">❤️</span>
            <div className="action-info">
              <p className="action-title">Wishlist</p>
              <p className="action-desc">View your saved medicines</p>
            </div>
            <span className="action-arrow">→</span>
          </div>

          <div className="profile-action-card" onClick={() => setCurrentPage('cart')}>
            <span className="action-icon">🛒</span>
            <div className="action-info">
              <p className="action-title">My Cart</p>
              <p className="action-desc">View items in your cart</p>
            </div>
            <span className="action-arrow">→</span>
          </div>

          <div className="profile-action-card" onClick={() => setCurrentPage('labtest')}>
            <span className="action-icon">🔬</span>
            <div className="action-info">
              <p className="action-title">Book Lab Test</p>
              <p className="action-desc">Schedule a lab appointment</p>
            </div>
            <span className="action-arrow">→</span>
          </div>
        </div>

        {/* Settings */}
        <div className="profile-section">
          <h3 className="profile-section-title">Settings</h3>

          {/* Dark Mode Toggle */}
          <div className="profile-setting-card">
            <span className="action-icon">{darkMode ? '☀️' : '🌙'}</span>
            <div className="action-info">
              <p className="action-title">{darkMode ? 'Light Mode' : 'Dark Mode'}</p>
              <p className="action-desc">Switch app appearance</p>
            </div>
            <div className={`toggle-switch ${darkMode ? 'on' : ''}`} onClick={() => setDarkMode(!darkMode)}>
              <div className="toggle-knob"></div>
            </div>
          </div>

        </div>

        {/* Account */}
        <div className="profile-section">
          <h3 className="profile-section-title">Account</h3>

          <div className="profile-info-card">
            <div className="info-row">
              <span>Full Name</span>
              <strong>{loggedInUser.name}</strong>
            </div>
            <div className="info-row">
              <span>Email</span>
              <strong>{loggedInUser.email}</strong>
            </div>
            <div className="info-row">
              <span>Member Since</span>
              <strong>March 2026</strong>
            </div>
          </div>

          {/* Logout Button */}
          <button className="profile-logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>

      </div>
    </div>
  );
}

export default Profile;