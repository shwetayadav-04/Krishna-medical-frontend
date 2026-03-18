import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Review from '../components/Review';
import medicines from '../data/medicines';
import { apiGetReviews, apiAddReview } from '../api';

function Home({ setCurrentPage, setSelectedMedicine, loggedInUser, addToCart }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [reviewInput, setReviewInput] = useState('');
  const [reviews, setReviews] = useState([]);
  const [reviewLoading, setReviewLoading] = useState(true);

  // Load reviews from MongoDB on page load
  useEffect(() => {
    async function loadReviews() {
      try {
        const data = await apiGetReviews();
        setReviews(data);
      } catch {
        setReviews([
          { _id: '1', userName: 'Customer', text: 'Very good service!', date: 'March 10, 2026' },
        ]);
      }
      setReviewLoading(false);
    }
    loadReviews();
  }, []);

  const filteredMedicines = medicines.filter((med) =>
    med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    med.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  async function handleSubmitReview() {
    if (reviewInput.trim() === '') { alert('Please write a review.'); return; }
    const dateStr = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
    const userName = loggedInUser ? loggedInUser.name : 'Guest';
    try {
      const res = await apiAddReview(userName, reviewInput, dateStr);
      setReviews([res.review, ...reviews]);
      setReviewInput('');
    } catch {
      alert('Could not submit review. Please try again.');
    }
  }

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">🏥 Trusted Since 2010</div>
          <h1 className="hero-heading">24×7 Medical Service</h1>
          <p className="hero-subtext">All District Government Multi-Specialist Hospital Medicines Available</p>
          <div className="hero-features">
            <span className="feature-tag">✅ Genuine Medicines</span>
            <span className="feature-tag">✅ Fast Service</span>
            <span className="feature-tag">✅ Affordable Prices</span>
          </div>
        </div>
        <div className="hero-image-block">
          <div className="hero-circle"><span className="hero-emoji">💊</span></div>
        </div>
      </section>

      <section className="products-section">
        <h2 className="section-heading">Our Medicines</h2>
        <p className="section-subtext">Quality medicines at affordable prices</p>
        <div className="search-bar-wrapper">
          <span className="search-icon">🔍</span>
          <input type="text" className="search-bar" placeholder="Search medicines by name or category..."
            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          {searchQuery && <button className="search-clear" onClick={() => setSearchQuery('')}>✕</button>}
        </div>
        {searchQuery && (
          <p className="search-results-count">
            {filteredMedicines.length > 0 ? `Found ${filteredMedicines.length} result(s) for "${searchQuery}"` : `No medicines found for "${searchQuery}"`}
          </p>
        )}
        {filteredMedicines.length > 0 ? (
          <div className="products-grid">
            {filteredMedicines.map((med) => (
              <ProductCard key={med.id} medicine={med} setCurrentPage={setCurrentPage}
                setSelectedMedicine={setSelectedMedicine} addToCart={addToCart} />
            ))}
          </div>
        ) : (
          <div className="no-results"><p>😔 No medicines found. Try a different search.</p></div>
        )}
      </section>

      <section className="reviews-section">
        <h2 className="section-heading">Customer Reviews</h2>
        <p className="section-subtext">Share your experience with us</p>
        <div className="review-form">
          <textarea className="review-input" placeholder="Write your review here..."
            value={reviewInput} onChange={(e) => setReviewInput(e.target.value)} rows="3" />
          <button className="submit-review-btn" onClick={handleSubmitReview}>Submit Review</button>
        </div>
        <div className="reviews-list">
          {reviewLoading ? (
            <p style={{ textAlign: 'center', color: '#888' }}>Loading reviews...</p>
          ) : (
            reviews.map((review) => (
              <Review key={review._id} text={review.text} date={review.date} userName={review.userName} />
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;