import React from 'react';
import { apiPlaceOrder } from '../api';

function Cart({ cartItems, setCartItems, setCurrentPage, loggedInUser }) {

  function updateQty(id, change) {
    setCartItems((prev) => prev.map((item) =>
      item.id === id ? { ...item, qty: Math.max(1, item.qty + change) } : item
    ));
  }

  function removeItem(id) {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  function clearCart() {
    if (window.confirm('Clear the cart?')) setCartItems([]);
  }

  async function placeOrder() {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    // ── Check if user is logged in ──
    if (!loggedInUser) {
      alert('⚠️ Please login first to place an order!');
      setCurrentPage('login');
      return;
    }

    const orderId = 'KMS' + Date.now();
    const today = new Date();
    const orderData = {
      orderId,
      userEmail: loggedInUser.email,
      userName: loggedInUser.name,
      items: cartItems,
      total: grandTotal,
      status: 'Order Placed',
      date: today.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
      time: today.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    };

    try {
      await apiPlaceOrder(orderData);
      setCartItems([]);
      alert(`✅ Order placed successfully!\nOrder ID: ${orderId}`);
      setCurrentPage('orders');
    } catch {
      alert('Could not place order. Please try again.');
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const delivery = cartItems.length > 0 ? 30 : 0;
  const grandTotal = subtotal + delivery;

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1 className="cart-title">🛒 My Cart</h1>
        <p className="cart-subtitle">Review your medicines before placing order</p>
      </div>

      {/* Show warning if not logged in */}
      {!loggedInUser && cartItems.length > 0 && (
        <div className="cart-login-warning">
          ⚠️ Please <span onClick={() => setCurrentPage('login')}>Login</span> to place your order!
        </div>
      )}

      <div className="cart-body">
        <div className="cart-items-section">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <h3>Your cart is empty!</h3>
              <p>Add medicines from the home page.</p>
              <button className="cart-shop-btn" onClick={() => setCurrentPage('home')}>Browse Medicines</button>
            </div>
          ) : (
            <>
              <div className="cart-items-header">
                <span>{cartItems.length} item(s) in cart</span>
                <button className="cart-clear-btn" onClick={clearCart}>Clear All</button>
              </div>
              {cartItems.map((item) => (
                <div className="cart-item-card" key={item.id}>
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-info">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <span className="cart-item-category">{item.category}</span>
                    <p className="cart-item-price">₹{item.price} per unit</p>
                  </div>
                  <div className="cart-item-controls">
                    <div className="qty-controls">
                      <button onClick={() => updateQty(item.id, -1)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)}>+</button>
                    </div>
                    <p className="cart-item-total">₹{item.price * item.qty}</p>
                    <button className="cart-remove-btn" onClick={() => removeItem(item.id)}>🗑️ Remove</button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-summary">
            <h3 className="summary-title">Order Summary</h3>
            {loggedInUser && (
              <div className="cart-user-info">
                👤 Ordering as <strong>{loggedInUser.name}</strong>
              </div>
            )}
            <div className="summary-row"><span>Subtotal</span><span>₹{subtotal}</span></div>
            <div className="summary-row"><span>Delivery</span><span>₹{delivery}</span></div>
            <div className="summary-divider"></div>
            <div className="summary-row total-row"><span>Grand Total</span><strong>₹{grandTotal}</strong></div>
            <button className="place-order-btn" onClick={placeOrder}>Place Order →</button>
            <button className="continue-shopping-btn" onClick={() => setCurrentPage('home')}>← Continue Shopping</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;