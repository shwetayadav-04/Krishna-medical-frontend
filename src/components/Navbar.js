import React from 'react';

function Navbar({ currentPage, setCurrentPage, loggedInUser, setLoggedInUser, cartCount, darkMode, setDarkMode }) {

  function handleLogout() {
    localStorage.removeItem('kms_loggedIn');
    setLoggedInUser(null);
    setCurrentPage('home');
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => setCurrentPage('home')} style={{ cursor: 'pointer' }}>
        <span className="brand-icon">⚕️</span>
        <span className="brand-name">Krishna Medical Store</span>
      </div>

      <ul className="navbar-links">
        <li>
          <button className={currentPage === 'home' ? 'nav-btn active' : 'nav-btn'} onClick={() => setCurrentPage('home')}>
            Home
          </button>
        </li>
        <li>
          <button className={currentPage === 'labtest' ? 'nav-btn active' : 'nav-btn'} onClick={() => setCurrentPage('labtest')}>
            🔬 Lab Test
          </button>
        </li>
        <li>
          <button className={currentPage === 'orders' ? 'nav-btn active' : 'nav-btn'} onClick={() => setCurrentPage('orders')}>
            📦 Orders
          </button>
        </li>
        <li>
          <button className={currentPage === 'about' ? 'nav-btn active' : 'nav-btn'} onClick={() => setCurrentPage('about')}>
            About
          </button>
        </li>

        {/* Cart button with item count badge */}
        <li>
          <button className="nav-cart-btn" onClick={() => setCurrentPage('cart')}>
            🛒
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </li>

        {/* Dark mode toggle */}
        <li>
          <button className="dark-mode-btn" onClick={() => setDarkMode(!darkMode)} title="Toggle Dark Mode">
            {darkMode ? '☀️' : '🌙'}
          </button>
        </li>

        {!loggedInUser && (
          <li>
            <button className="nav-btn nav-signup" onClick={() => setCurrentPage('signup')}>
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