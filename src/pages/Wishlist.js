import React from 'react';

function Wishlist({ wishlist, setWishlist, addToCart, setCurrentPage }) {

  function removeFromWishlist(id) {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  }

  function handleAddToCart(item) {
    addToCart(item);
    alert(`✅ "${item.name}" added to cart!`);
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h1 className="wishlist-title">❤️ My Wishlist</h1>
        <p className="wishlist-subtitle">Your saved medicines</p>
      </div>

      <div className="wishlist-body">
        {wishlist.length === 0 ? (
          <div className="wishlist-empty">
            <div className="wishlist-empty-icon">❤️</div>
            <h3>Your wishlist is empty!</h3>
            <p>Tap the ❤️ button on any medicine to save it here.</p>
            <button className="wishlist-shop-btn" onClick={() => setCurrentPage('home')}>
              Browse Medicines
            </button>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlist.map((item) => (
              <div className="wishlist-card" key={item.id}>
                <img src={item.image} alt={item.name} className="wishlist-image" />
                <div className="wishlist-info">
                  <span className="wishlist-category">{item.category}</span>
                  <h3 className="wishlist-name">{item.name}</h3>
                  <p className="wishlist-price">₹{item.price}</p>
                  <div className="wishlist-btns">
                    <button className="wishlist-cart-btn" onClick={() => handleAddToCart(item)}>
                      🛒 Add to Cart
                    </button>
                    <button className="wishlist-remove-btn" onClick={() => removeFromWishlist(item.id)}>
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;