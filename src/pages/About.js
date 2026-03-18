import React from 'react';

function About() {
  return (
    <div className="about-page">

      {/* About Header */}
      <div className="about-header">
        <div className="about-icon">🏪</div>
        <h1 className="about-title">About Us</h1>
        <p className="about-subtitle">Know more about Krishna Medical Store</p>
      </div>

      {/* About Description */}
      <div className="about-card">
        <h2 className="about-card-heading">Who We Are</h2>
        <p className="about-text">
          Krishna Medical Store is a <strong>24×7 service medical shop</strong> providing medicines
          related to district government multi-specialist hospitals and other healthcare needs.
          We are committed to providing genuine and affordable medicines to all patients at any
          hour of the day or night.
        </p>
      </div>

      {/* Team Section */}
      <div className="about-card">
        <h2 className="about-card-heading">Our Team</h2>
        <p className="about-text">
          This store is run by <strong>Dinesh Kumar Yadav</strong> and <strong>Anuj Yadav</strong>,
          who are dedicated to serving the community with quality healthcare products and
          excellent customer service.
        </p>
        <div className="team-cards">
          <div className="team-member">
            <div className="team-avatar">👨‍⚕️</div>
            <h3>Dinesh Kumar Yadav</h3>
            <p>Owner & Pharmacist</p>
          </div>
          <div className="team-member">
            <div className="team-avatar">👨‍💼</div>
            <h3>Anuj Yadav</h3>
            <p>Co-Owner & Manager</p>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="about-card">
        <h2 className="about-card-heading">Our Services</h2>
        <ul className="services-list">
          <li>✅ All Government Hospital Medicines Available</li>
          <li>✅ 24×7 Open – Day and Night Service</li>
          <li>✅ Affordable and Genuine Medicines</li>
          <li>✅ Fast and Friendly Service</li>
          <li>✅ Home Delivery Available on Request</li>
          <li>✅ Expert Guidance on Medicines</li>
        </ul>
      </div>

      {/* Contact Section */}
      <div className="about-card contact-card">
        <h2 className="about-card-heading">Contact Us</h2>
        <p className="about-text">📍 Near District Government Multi-Specialist Hospital</p>
        <p className="about-text">📞 Call us anytime: <strong>+91-9125312597</strong></p>
        <p className="about-text">🕐 Open: <strong>24 Hours / 7 Days a Week</strong></p>
      </div>

    </div>
  );
}

export default About;