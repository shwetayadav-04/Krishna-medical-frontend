import React from 'react';

function ProductCard({ medicine, setCurrentPage, setSelectedMedicine, addToCart }) {
  const { name, price, image, category } = medicine;

  function handleAddToCart() {
    addToCart(medicine);
    alert(`✅ "${name}" added to cart!\nPrice: ₹${price}`);
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
      </div>
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <p className="product-price">₹{price}</p>
        <div className="product-btn-row">
          <button className="view-detail-btn" onClick={handleViewDetails}>👁️ Details</button>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>🛒 Add</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;