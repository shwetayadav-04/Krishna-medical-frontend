import React, { useState } from 'react';

function Navbar({ currentPage, setCurrentPage, loggedInUser, setLoggedInUser, cartCount, darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    localStorage.removeItem('kms_loggedIn');
    localStorage.removeItem('kms_token');
    setLoggedInUser(null);
    setCurrentPage('home');
    setMenuOpen(false);
  }

  function navigate(page) {
    setCurrentPage(page);
    setMenuOpen(false);
  }

  return (
    <nav className="navbar">
      {/* Brand */}
      <div className="navbar-brand" onClick={() => navigate('home')}>
        <span className="brand-icon">⚕️</span>
        <span className="brand-name">Krishna Medical Store</span>
      </div>

      {/* Right side — cart + dark mode + hamburger */}
      <div className="navbar-right">
        {/* Cart button */}
        <button className="nav-cart-btn" onClick={() => navigate('cart')}>
          🛒
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>

        {/* Dark mode toggle */}
        <button className="dark-mode-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️' : '🌙'}
        </button>

        {/* Hamburger button - only on mobile */}
        <button className="hamburger-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Nav links - desktop always visible, mobile shows when menuOpen */}
      <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <li>
          <button className={currentPage === 'home' ? 'nav-btn active' : 'nav-btn'} onClick={() => navigate('home')}>
            🏠 Home
          </button>
        </li>
        <li>
          <button className={currentPage === 'labtest' ? 'nav-btn active' : 'nav-btn'} onClick={() => navigate('labtest')}>
            🔬 Lab Test
          </button>
        </li>
        <li>
          <button className={currentPage === 'orders' ? 'nav-btn active' : 'nav-btn'} onClick={() => navigate('orders')}>
            📦 Orders
          </button>
        </li>
        <li>
          <button className={currentPage === 'about' ? 'nav-btn active' : 'nav-btn'} onClick={() => navigate('about')}>
            ℹ️ About
          </button>
        </li>

        {!loggedInUser && (
          <li>
            <button className="nav-btn nav-signup" onClick={() => navigate('signup')}>
              Sign Up
            </button>
          </li>
        )}

        {loggedInUser && (
          <>
            <li><span className="nav-user">👤 {loggedInUser.name}</span></li>
            <li>
              <button className="nav-btn nav-logout" onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;