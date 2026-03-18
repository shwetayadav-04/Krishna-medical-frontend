import React, { useState } from 'react';
import { apiBookAppointment } from '../api';

const labTests = [
  { id: 1, name: 'Complete Blood Count (CBC)', price: 250, duration: '1 Day', category: 'Blood Test', icon: '🩸' },
  { id: 2, name: 'Blood Sugar (Fasting)', price: 80, duration: 'Same Day', category: 'Diabetes', icon: '💉' },
  { id: 3, name: 'Thyroid Profile (T3/T4/TSH)', price: 450, duration: '1 Day', category: 'Thyroid', icon: '🧬' },
  { id: 4, name: 'Liver Function Test (LFT)', price: 550, duration: '1 Day', category: 'Liver', icon: '🫀' },
  { id: 5, name: 'Kidney Function Test (KFT)', price: 500, duration: '1 Day', category: 'Kidney', icon: '🫁' },
  { id: 6, name: 'Lipid Profile', price: 400, duration: '1 Day', category: 'Heart', icon: '❤️' },
  { id: 7, name: 'Urine Routine Test', price: 120, duration: 'Same Day', category: 'Urine', icon: '🧪' },
  { id: 8, name: 'COVID-19 RT-PCR', price: 700, duration: '24 Hours', category: 'Infection', icon: '🦠' },
  { id: 9, name: 'Dengue NS1 Antigen', price: 600, duration: 'Same Day', category: 'Infection', icon: '🦟' },
  { id: 10, name: 'HbA1c (Diabetes Control)', price: 350, duration: '1 Day', category: 'Diabetes', icon: '📊' },
  { id: 11, name: 'Vitamin D Test', price: 900, duration: '2 Days', category: 'Vitamins', icon: '☀️' },
  { id: 12, name: 'Vitamin B12 Test', price: 800, duration: '2 Days', category: 'Vitamins', icon: '💊' },
];

function LabTest({ loggedInUser, setCurrentPage }) {
  const [selectedTest, setSelectedTest] = useState(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: loggedInUser ? loggedInUser.name : '',
    phone: '', age: '', gender: '', date: '', time: '',
    address: '', sampleCollection: 'walkin',
  });
  const [errors, setErrors] = useState({});
  const today = new Date().toISOString().split('T')[0];

  function handleSelectTest(test) {
    setSelectedTest(test);
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required.';
    if (!form.phone.trim() || form.phone.length < 10) e.phone = 'Enter valid 10-digit phone.';
    if (!form.age || form.age < 1 || form.age > 120) e.age = 'Enter valid age.';
    if (!form.gender) e.gender = 'Select gender.';
    if (!form.date) e.date = 'Select a date.';
    if (!form.time) e.time = 'Select a time slot.';
    if (form.sampleCollection === 'home' && !form.address.trim()) e.address = 'Address required for home collection.';
    return e;
  }

  async function handleSubmit() {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    try {
      // Save appointment to MongoDB
      await apiBookAppointment({
        userEmail: loggedInUser ? loggedInUser.email : 'guest@krishna.com',
        testName: selectedTest.name,
        testPrice: selectedTest.price,
        patientName: form.name,
        phone: form.phone,
        age: form.age,
        gender: form.gender,
        date: form.date,
        time: form.time,
        sampleCollection: form.sampleCollection,
        address: form.address,
        total: grandTotal,
        status: 'Booked',
      });
      setStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      alert('Could not book appointment. Please try again.');
    }
    setLoading(false);
  }

  function handlePrint() {
    const printContent = `
      <html><head><title>Appointment Slip</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 30px; max-width: 500px; margin: 0 auto; }
        .header { text-align: center; border-bottom: 2px solid #1a7a4a; padding-bottom: 16px; margin-bottom: 20px; }
        .header h2 { color: #1a7a4a; margin: 0; font-size: 22px; }
        .header p { color: #666; margin: 4px 0; font-size: 13px; }
        .badge { background: #1a7a4a; color: white; padding: 4px 14px; border-radius: 20px; font-size: 12px; }
        .row { display: flex; justify-content: space-between; padding: 9px 0; border-bottom: 1px solid #eee; font-size: 14px; }
        .row span { color: #888; }
        .row strong { color: #222; }
        .total { font-size: 16px; color: #1a7a4a; font-weight: bold; }
        .footer { margin-top: 24px; text-align: center; font-size: 12px; color: #aaa; }
        .note { background: #fff8e1; border-left: 4px solid #f9a825; padding: 10px; margin-top: 16px; font-size: 13px; color: #555; border-radius: 6px; }
      </style></head><body>
      <div class="header">
        <h2>⚕️ Krishna Medical Store</h2>
        <p>24×7 Medical Service | Lab Test Appointment</p>
        <span class="badge">APPOINTMENT SLIP</span>
      </div>
      <div class="row"><span>Test Name</span><strong>${selectedTest.icon} ${selectedTest.name}</strong></div>
      <div class="row"><span>Patient Name</span><strong>${form.name}</strong></div>
      <div class="row"><span>Age / Gender</span><strong>${form.age} yrs / ${form.gender}</strong></div>
      <div class="row"><span>Phone</span><strong>${form.phone}</strong></div>
      <div class="row"><span>Date</span><strong>${form.date}</strong></div>
      <div class="row"><span>Time Slot</span><strong>${form.time}</strong></div>
      <div class="row"><span>Collection</span><strong>${form.sampleCollection === 'home' ? '🏠 Home Collection' : '🏪 Walk-in at Store'}</strong></div>
      ${form.sampleCollection === 'home' ? `<div class="row"><span>Address</span><strong>${form.address}</strong></div>` : ''}
      <div class="row total"><span>Total Amount</span><strong>₹${grandTotal}</strong></div>
      <div class="note">📞 We will call you to confirm. Please carry a valid ID.</div>
      <div class="footer">Krishna Medical Store — Near District Government Hospital — Open 24×7<br/>Run by Dinesh Kumar Yadav & Anuj Yadav</div>
      </body></html>
    `;
    const win = window.open('', '_blank');
    win.document.write(printContent);
    win.document.close();
    win.print();
  }

  function handleBookAnother() {
    setSelectedTest(null); setStep(1);
    setForm({ name: loggedInUser ? loggedInUser.name : '', phone: '', age: '', gender: '', date: '', time: '', address: '', sampleCollection: 'walkin' });
    setErrors({});
  }

  const grandTotal = selectedTest ? selectedTest.price + (form.sampleCollection === 'home' ? 50 : 0) : 0;

  return (
    <div className="lab-page">
      <div className="lab-header">
        <h1 className="lab-title">🔬 Book Lab Test</h1>
        <p className="lab-subtitle">Trusted diagnostics at affordable prices — Home collection available</p>
        <div className="step-indicator">
          {['Select Test', 'Your Details', 'Confirmed'].map((label, i) => (
            <React.Fragment key={label}>
              <div className={`step-dot ${step >= i + 1 ? 'active' : ''}`}>
                <span>{i + 1}</span><p>{label}</p>
              </div>
              {i < 2 && <div className={`step-line ${step >= i + 2 ? 'active' : ''}`}></div>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* STEP 1 - Select Test */}
      {step === 1 && (
        <div className="lab-tests-grid-wrapper">
          <h2 className="lab-section-title">Choose a Lab Test</h2>
          <div className="lab-tests-grid">
            {labTests.map((test) => (
              <div className="lab-test-card" key={test.id} onClick={() => handleSelectTest(test)}>
                <div className="lab-test-icon">{test.icon}</div>
                <div className="lab-test-info">
                  <h3>{test.name}</h3>
                  <span className="lab-test-category">{test.category}</span>
                  <div className="lab-test-meta">
                    <span className="lab-test-price">₹{test.price}</span>
                    <span className="lab-test-duration">⏱ {test.duration}</span>
                  </div>
                </div>
                <button className="lab-book-btn">Book →</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2 - Fill Details */}
      {step === 2 && selectedTest && (
        <div className="lab-form-wrapper">
          <div className="selected-test-banner">
            <span className="selected-test-icon">{selectedTest.icon}</span>
            <div>
              <p className="selected-test-name">{selectedTest.name}</p>
              <p className="selected-test-meta">₹{selectedTest.price} &nbsp;•&nbsp; Result in {selectedTest.duration}</p>
            </div>
            <button className="change-test-btn" onClick={() => setStep(1)}>Change Test</button>
          </div>

          <div className="lab-form-card">
            <h2 className="lab-form-title">Patient Details</h2>
            <div className="form-row">
              <div className="form-field">
                <label>Full Name *</label>
                <input type="text" name="name" placeholder="Patient name" value={form.name} onChange={handleChange} />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>
              <div className="form-field">
                <label>Phone Number *</label>
                <input type="tel" name="phone" placeholder="10-digit mobile" value={form.phone} onChange={handleChange} maxLength="10" />
                {errors.phone && <span className="form-error">{errors.phone}</span>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label>Age *</label>
                <input type="number" name="age" placeholder="Age" value={form.age} onChange={handleChange} min="1" max="120" />
                {errors.age && <span className="form-error">{errors.age}</span>}
              </div>
              <div className="form-field">
                <label>Gender *</label>
                <select name="gender" value={form.gender} onChange={handleChange}>
                  <option value="">Select gender</option>
                  <option>Male</option><option>Female</option><option>Other</option>
                </select>
                {errors.gender && <span className="form-error">{errors.gender}</span>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label>Appointment Date *</label>
                <input type="date" name="date" value={form.date} min={today} onChange={handleChange} />
                {errors.date && <span className="form-error">{errors.date}</span>}
              </div>
              <div className="form-field">
                <label>Time Slot *</label>
                <select name="time" value={form.time} onChange={handleChange}>
                  <option value="">Select time</option>
                  <option>7:00 AM – 8:00 AM</option>
                  <option>8:00 AM – 9:00 AM</option>
                  <option>9:00 AM – 10:00 AM</option>
                  <option>10:00 AM – 11:00 AM</option>
                  <option>11:00 AM – 12:00 PM</option>
                  <option>2:00 PM – 3:00 PM</option>
                  <option>3:00 PM – 4:00 PM</option>
                  <option>5:00 PM – 6:00 PM</option>
                </select>
                {errors.time && <span className="form-error">{errors.time}</span>}
              </div>
            </div>
            <div className="form-field full-width">
              <label>Sample Collection *</label>
              <div className="collection-options">
                <label className={`collection-option ${form.sampleCollection === 'walkin' ? 'selected' : ''}`}>
                  <input type="radio" name="sampleCollection" value="walkin" checked={form.sampleCollection === 'walkin'} onChange={handleChange} />
                  🏪 Walk-in at Store
                </label>
                <label className={`collection-option ${form.sampleCollection === 'home' ? 'selected' : ''}`}>
                  <input type="radio" name="sampleCollection" value="home" checked={form.sampleCollection === 'home'} onChange={handleChange} />
                  🏠 Home Collection (+₹50)
                </label>
              </div>
            </div>
            {form.sampleCollection === 'home' && (
              <div className="form-field full-width">
                <label>Home Address *</label>
                <textarea name="address" placeholder="Full address for sample collection" value={form.address} onChange={handleChange} rows="3" />
                {errors.address && <span className="form-error">{errors.address}</span>}
              </div>
            )}
            <div className="form-total">
              <span>Test Fee: ₹{selectedTest.price}</span>
              {form.sampleCollection === 'home' && <span>Home Collection: ₹50</span>}
              <strong>Total: ₹{grandTotal}</strong>
            </div>
            <div className="form-actions">
              <button className="form-back-btn" onClick={() => setStep(1)}>← Back</button>
              <button className="form-submit-btn" onClick={handleSubmit} disabled={loading}>
                {loading ? 'Booking...' : 'Confirm Appointment →'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3 - Confirmation */}
      {step === 3 && selectedTest && (
        <div className="lab-confirm-wrapper">
          <div className="confirm-card">
            <div className="confirm-icon">✅</div>
            <h2 className="confirm-title">Appointment Booked!</h2>
            <p className="confirm-subtitle">Saved to database successfully!</p>
            <div className="confirm-details">
              {[
                ['Test', `${selectedTest.icon} ${selectedTest.name}`],
                ['Patient', form.name],
                ['Age / Gender', `${form.age} yrs / ${form.gender}`],
                ['Phone', form.phone],
                ['Date', form.date],
                ['Time', form.time],
                ['Collection', form.sampleCollection === 'home' ? '🏠 Home Collection' : '🏪 Walk-in at Store'],
                ...(form.sampleCollection === 'home' ? [['Address', form.address]] : []),
              ].map(([label, value]) => (
                <div className="confirm-row" key={label}>
                  <span>{label}</span><strong>{value}</strong>
                </div>
              ))}
              <div className="confirm-row total-row">
                <span>Total Amount</span><strong>₹{grandTotal}</strong>
              </div>
            </div>
            <p className="confirm-note">
              📞 We will call you on <strong>{form.phone}</strong> to confirm. Please carry a valid ID.
            </p>
            <div className="confirm-actions">
              <button className="confirm-home-btn" onClick={() => setCurrentPage('home')}>← Home</button>
              <button className="confirm-print-btn" onClick={handlePrint}>🖨️ Print Slip</button>
              <button className="confirm-another-btn" onClick={handleBookAnother}>Book Another</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LabTest;