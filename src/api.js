import axios from 'axios';

// Backend URL — change this if you deploy later
const BASE_URL = 'http://localhost:5000/api';

// ─── AUTH ─────────────────────────────────────────────

export async function apiSignup(name, email, password) {
  const res = await axios.post(`${BASE_URL}/auth/signup`, { name, email, password });
  return res.data;
}

export async function apiLogin(email, password) {
  const res = await axios.post(`${BASE_URL}/auth/login`, { email, password });
  return res.data;
}

// ─── ORDERS ───────────────────────────────────────────

export async function apiPlaceOrder(orderData) {
  const res = await axios.post(`${BASE_URL}/orders`, orderData);
  return res.data;
}

export async function apiGetOrders(email) {
  const res = await axios.get(`${BASE_URL}/orders/${email}`);
  return res.data;
}

export async function apiCancelOrder(orderId) {
  const res = await axios.patch(`${BASE_URL}/orders/${orderId}/cancel`);
  return res.data;
}

// ─── REVIEWS ──────────────────────────────────────────

export async function apiGetReviews() {
  const res = await axios.get(`${BASE_URL}/reviews`);
  return res.data;
}

export async function apiAddReview(userName, text, date) {
  const res = await axios.post(`${BASE_URL}/reviews`, { userName, text, date });
  return res.data;
}

// ─── APPOINTMENTS ─────────────────────────────────────

export async function apiBookAppointment(data) {
  const res = await axios.post(`${BASE_URL}/appointments`, data);
  return res.data;
}