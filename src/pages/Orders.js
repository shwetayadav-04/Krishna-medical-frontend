import React, { useState, useEffect } from 'react';
import { apiGetOrders, apiCancelOrder } from '../api';

const STATUS_STEPS = ['Order Placed', 'Confirmed', 'Packed', 'Out for Delivery', 'Delivered'];

function Orders({ setCurrentPage, loggedInUser }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      if (!loggedInUser) { setLoading(false); return; }
      try {
        const data = await apiGetOrders(loggedInUser.email);
        setOrders(data);
      } catch { setOrders([]); }
      setLoading(false);
    }
    loadOrders();
  }, [loggedInUser]);

  async function cancelOrder(orderId) {
    if (!window.confirm('Cancel this order?')) return;
    try {
      await apiCancelOrder(orderId);
      setOrders(orders.map((o) => o.orderId === orderId ? { ...o, status: 'Cancelled' } : o));
    } catch { alert('Could not cancel. Try again.'); }
  }

  function getStepIndex(status) {
    const idx = STATUS_STEPS.indexOf(status);
    return idx === -1 ? 0 : idx;
  }

  if (!loggedInUser) {
    return (
      <div className="orders-page">
        <div className="orders-header"><h1 className="orders-title">📦 My Orders</h1></div>
        <div className="orders-body">
          <div className="orders-empty">
            <div className="orders-empty-icon">🔐</div>
            <h3>Please login to view your orders</h3>
            <button className="orders-shop-btn" onClick={() => setCurrentPage('login')}>Login</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h1 className="orders-title">📦 My Orders</h1>
        <p className="orders-subtitle">Track all your medicine orders here</p>
      </div>
      <div className="orders-body">
        {loading ? (
          <p style={{ textAlign: 'center', padding: '40px', color: '#888' }}>Loading orders...</p>
        ) : orders.length === 0 ? (
          <div className="orders-empty">
            <div className="orders-empty-icon">📦</div>
            <h3>No orders yet!</h3>
            <p>Place your first order from the cart.</p>
            <button className="orders-shop-btn" onClick={() => setCurrentPage('home')}>Browse Medicines</button>
          </div>
        ) : (
          orders.map((order) => (
            <div className="order-card" key={order.orderId}>
              <div className="order-card-header">
                <div>
                  <p className="order-id">Order ID: <strong>{order.orderId}</strong></p>
                  <p className="order-date">{order.date} at {order.time}</p>
                </div>
                <span className={`order-status-badge ${order.status === 'Cancelled' ? 'cancelled' : order.status === 'Delivered' ? 'delivered' : 'active'}`}>
                  {order.status}
                </span>
              </div>
              <div className="order-items-list">
                {order.items.map((item, i) => (
                  <div className="order-item-row" key={i}>
                    <img src={item.image} alt={item.name} className="order-item-img" />
                    <span className="order-item-name">{item.name}</span>
                    <span className="order-item-qty">x{item.qty}</span>
                    <span className="order-item-price">₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>
              {order.status !== 'Cancelled' && (
                <div className="tracking-steps">
                  {STATUS_STEPS.map((step, index) => {
                    const currentIdx = getStepIndex(order.status);
                    const isDone = index <= currentIdx;
                    return (
                      <div className="tracking-step" key={step}>
                        <div className={`tracking-dot ${isDone ? 'done' : ''}`}>{isDone ? '✓' : index + 1}</div>
                        <p className={`tracking-label ${isDone ? 'done' : ''}`}>{step}</p>
                        {index < STATUS_STEPS.length - 1 && <div className={`tracking-line ${index < currentIdx ? 'done' : ''}`}></div>}
                      </div>
                    );
                  })}
                </div>
              )}
              {order.status === 'Cancelled' && <div className="order-cancelled-msg">❌ This order has been cancelled.</div>}
              <div className="order-card-footer">
                <span className="order-total">Total: <strong>₹{order.total}</strong></span>
                {order.status === 'Order Placed' && (
                  <button className="cancel-order-btn" onClick={() => cancelOrder(order.orderId)}>Cancel Order</button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Orders;