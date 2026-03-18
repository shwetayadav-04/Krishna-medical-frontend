import React from 'react';

function Review({ text, date }) {
  return (
    <div className="review-card">
      <div className="review-avatar">👤</div>
      <div className="review-body">
        <p className="review-text">{text}</p>
        <span className="review-date">{date}</span>
      </div>
    </div>
  );
}

export default Review;