import React, { useState } from 'react';

function ProductCard({ medicine, setCurrentPage, setSelectedMedicine, addToCart, wishlist, toggleWishlist }) {
  const { name, price, image, category } = medicine;
  const isWishlisted = wishlist && wishlist.some((item) => item.id === medicine.id);
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addToCart(medicine);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function handleViewDetails() {
    setSelectedMedicine(medicine);
    setCurrentPage('detail');
  }

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img src={image} alt={name} className="product-image" />
        <span className="product-category">{category}</span>
        <button
          className={`wishlist-heart-btn ${isWishlisted ? 'wishlisted' : ''}`}
          onClick={() => toggleWishlist && toggleWishlist(medicine)}
          title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {isWishlisted ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <p className="product-price">₹{price}</p>
        <div className="product-btn-row">
          <button className="view-detail-btn" onClick={handleViewDetails}>👁️ Details</button>
          <button
            className={`add-to-cart-btn ${added ? 'added' : ''}`}
            onClick={handleAddToCart}
          >
            {added ? '✅ Added!' : '🛒 Add'}
          </button>
        </div>
        {/* Go to cart button - shows after adding */}
        {added && (
          <button className="go-to-cart-btn" onClick={() => setCurrentPage('cart')}>
            View Cart →
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;