import React, { useState } from 'react';

function MedicineDetail({ medicine, setCurrentPage, addToCart }) {
  const [added, setAdded] = useState(false);

  if (!medicine) return null;

  function handleAddToCart() {
    if (addToCart) addToCart(medicine);
    setAdded(true);
  }

  return (
    <div className="detail-page">
      <button className="back-btn" onClick={() => setCurrentPage('home')}>← Back to Home</button>

      <div className="detail-container">
        {/* Left: Image */}
        <div className="detail-left">
          <img src={medicine.image} alt={medicine.name} className="detail-image" />
          <span className="detail-category-badge">{medicine.category}</span>
          <div className={`detail-stock ${medicine.stock === 'In Stock' ? 'in-stock' : 'out-stock'}`}>
            {medicine.stock === 'In Stock' ? '✅ In Stock' : '❌ Out of Stock'}
          </div>
          <div className={`detail-rx ${medicine.prescription === 'Required' ? 'rx-yes' : 'rx-no'}`}>
            {medicine.prescription === 'Required' ? '📋 Prescription Required' : '✅ No Prescription Needed'}
          </div>
        </div>

        {/* Right: Details */}
        <div className="detail-right">
          <h1 className="detail-name">{medicine.name}</h1>
          <p className="detail-manufacturer">by {medicine.manufacturer}</p>
          <div className="detail-price-row">
            <span className="detail-price">₹{medicine.price}</span>
            <span className="detail-pack">{medicine.packSize}</span>
          </div>

          {/* Add to cart + go to cart */}
          {!added ? (
            <button className="detail-cart-btn" onClick={handleAddToCart}>
              🛒 Add to Cart
            </button>
          ) : (
            <div className="detail-added-row">
              <span className="detail-added-msg">✅ Added to Cart!</span>
              <button className="detail-goto-cart-btn" onClick={() => setCurrentPage('cart')}>
                Go to Cart →
              </button>
            </div>
          )}

          {/* Info Grid */}
          <div className="detail-info-grid">
            <div className="detail-info-card"><h3>📦 Composition</h3><p>{medicine.composition}</p></div>
            <div className="detail-info-card"><h3>🏭 Manufacturer</h3><p>{medicine.manufacturer}</p></div>
            <div className="detail-info-card highlight-green"><h3>📅 Manufacture Date</h3><p>{medicine.manufactureDate}</p></div>
            <div className="detail-info-card highlight-red"><h3>⏳ Expiry Date</h3><p>{medicine.expiryDate}</p></div>
            <div className="detail-info-card"><h3>🔢 Batch Number</h3><p>{medicine.batchNo}</p></div>
            <div className="detail-info-card"><h3>💊 Pack Size</h3><p>{medicine.packSize}</p></div>
          </div>

          <div className="detail-section"><h3>🩺 Uses</h3><p>{medicine.uses}</p></div>
          <div className="detail-section"><h3>💉 Dosage Instructions</h3><p>{medicine.dosage}</p></div>
          <div className="detail-section"><h3>⚠️ Side Effects</h3><p>{medicine.sideEffects}</p></div>
          <div className="detail-section highlight-yellow"><h3>🚨 Warnings</h3><p>{medicine.warnings}</p></div>
          <div className="detail-section"><h3>🌡️ Storage Instructions</h3><p>{medicine.storage}</p></div>
        </div>
      </div>
    </div>
  );
}

export default MedicineDetail;