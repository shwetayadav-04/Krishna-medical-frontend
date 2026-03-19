import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MedicineDetail from './pages/MedicineDetail';
import LabTest from './pages/LabTest';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const saved = localStorage.getItem('kms_loggedIn');
    return saved ? JSON.parse(saved) : null;
  });
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    if (!loggedInUser) {
      const timer = setTimeout(() => setShowPopup(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [loggedInUser]);

  // Add to cart - works WITHOUT login
  function addToCart(medicine) {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === medicine.id);
      if (existing) return prev.map((item) => item.id === medicine.id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { ...medicine, qty: 1 }];
    });
  }

  // Toggle wishlist
  function toggleWishlist(medicine) {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === medicine.id);
      if (exists) return prev.filter((item) => item.id !== medicine.id);
      return [...prev, medicine];
    });
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        loggedInUser={loggedInUser}
        setLoggedInUser={setLoggedInUser}
        cartCount={cartCount}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {currentPage === 'home' && (
        <Home setCurrentPage={setCurrentPage} setSelectedMedicine={setSelectedMedicine}
          loggedInUser={loggedInUser} addToCart={addToCart}
          wishlist={wishlist} toggleWishlist={toggleWishlist} />
      )}
      {currentPage === 'about' && <About />}
      {currentPage === 'login' && <Login setCurrentPage={setCurrentPage} setLoggedInUser={setLoggedInUser} />}
      {currentPage === 'signup' && <Signup setCurrentPage={setCurrentPage} />}
      {currentPage === 'detail' && <MedicineDetail medicine={selectedMedicine} setCurrentPage={setCurrentPage} addToCart={addToCart} />}
      {currentPage === 'labtest' && <LabTest loggedInUser={loggedInUser} setCurrentPage={setCurrentPage} />}
      {currentPage === 'cart' && <Cart cartItems={cartItems} setCartItems={setCartItems} setCurrentPage={setCurrentPage} loggedInUser={loggedInUser} />}
      {currentPage === 'orders' && <Orders setCurrentPage={setCurrentPage} loggedInUser={loggedInUser} />}
      {currentPage === 'profile' && (
        <Profile loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}
          setCurrentPage={setCurrentPage} darkMode={darkMode} setDarkMode={setDarkMode} />
      )}
      {currentPage === 'wishlist' && (
        <Wishlist wishlist={wishlist} setWishlist={setWishlist}
          addToCart={addToCart} setCurrentPage={setCurrentPage} />
      )}

      {/* Signup Popup */}
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <div className="popup-top">
              <span className="popup-store-icon">⚕️</span>
              <button className="popup-close-x" onClick={() => setShowPopup(false)}>✕</button>
            </div>
            <h2 className="popup-title">Welcome to Krishna Medical Store!</h2>
            <p className="popup-desc">Create a free account to track orders, book lab tests, and more.</p>
            <div className="popup-benefits">
              <span>✅ Free account</span><span>✅ Book lab tests</span><span>✅ Order history</span>
            </div>
            <button className="popup-signup-btn" onClick={() => { setShowPopup(false); setCurrentPage('signup'); }}>Create Free Account</button>
            <button className="popup-login-btn" onClick={() => { setShowPopup(false); setCurrentPage('login'); }}>Already have an account? Login</button>
            <button className="popup-later-btn" onClick={() => setShowPopup(false)}>Do it Later</button>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>⚕️ Krishna Medical Store — 24×7 Medical Service</p>
        <p style={{ marginTop: '6px', opacity: '0.8' }}>Run by Dinesh Kumar Yadav & Anuj Yadav</p>
      </footer>
    </div>
  );
}

export default App;