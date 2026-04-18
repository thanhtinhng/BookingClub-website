import React from 'react';
import './Review.css'; 

interface Metric {
  label: string;
  score: number;
}

interface ReviewItem {
  id: string | number;
  userName: string;
  date: string;
  comment: string;
  avatarUrl?: string;
}

export interface ReviewProps {
  overallRating: number;
  totalReviews: number;
  metrics: Metric[];
  reviews: ReviewItem[];
  onShowAllClick?: () => void; 
}

export const Review: React.FC<ReviewProps> = ({
  overallRating,
  totalReviews,
  metrics,
  reviews,
  onShowAllClick
}) => {
  return (
    <div className="ui-review-container">
      
      {/*TỔNG QUAN ĐIỂM SỐ & THANH TIẾN ĐỘ */}
      <div className="review-header">
        <div className="rating-overview">
          <h2 className="title">Reviews</h2>
          <div className="score-display">
            <span className="star-icon">★</span>
            <span className="score-number">{overallRating.toFixed(1)}</span>
          </div>
        </div>

        <div className="metrics-grid">
          {metrics.map((metric, index) => (
            <div key={index} className="metric-row">
              <span className="metric-label">{metric.label}</span>
              <div className="progress-track">
                <div 
                  className="progress-fill" 
                  style={{ width: `${(metric.score / 5) * 100}%` }}
                ></div>
              </div>
              <span className="metric-score">{metric.score.toFixed(1)}</span>
            </div>
          ))}
        </div>
      </div>

      {/*DANH SÁCH BÌNH LUẬN (CHIA 2 CỘT) */}
      <div className="reviews-grid">
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="reviewer-info">
              {review.avatarUrl ? (
                <img src={review.avatarUrl} alt="avatar" className="avatar" />
              ) : (
                <div className="avatar-placeholder"></div>
              )}
              <div className="reviewer-details">
                <div className="reviewer-name">{review.userName}</div>
                <div className="review-date">{review.date}</div>
              </div>
            </div>
            <p className="review-text">{review.comment}</p>
          </div>
        ))}
      </div>

      {/*NÚT BẤM XEM THÊM */}
      <button className="btn-show-all" onClick={onShowAllClick}>
        Show All {totalReviews} Reviews
      </button>

    </div>
  );
};