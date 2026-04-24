import React, { useState } from 'react';
import './StarRating.css';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  onSelectStar?: (rating: number) => void;
  readonly?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxStars = 5,
  onSelectStar,
  readonly = false
}) => {
  // State nội bộ để quản lý hiệu ứng khi rê chuột (hover)
  const [hover, setHover] = useState(0);

  const handleClick = (starValue: number) => {
    // Nếu có truyền hàm onSelectStar thì mới gọi
    if (!readonly && onSelectStar) {
      onSelectStar(starValue);
    }
  };

  return (
    <div className={`star-rating-input ${readonly ? 'readonly' : ''}`}>
      {/* Tạo ra một mảng có độ dài là maxStars (mặc định là 5) và duyệt qua để vẽ sao */}
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;

        // Ngôi sao sẽ 'sáng' (active) nếu giá trị của nó <= giá trị đang rê chuột (hover)
        // Nếu không rê chuột (hover = 0) thì tính theo điểm rating đã chọn.
        const isActive = starValue <= (hover || rating);

        return (
          <span
            key={starValue}
            className={`star ${isActive ? 'active' : ''}`}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => !readonly && setHover(starValue)}
            onMouseLeave={() => !readonly && setHover(0)}
            style={{ 
              cursor: readonly ? 'default' : 'pointer' // Đổi con trỏ chuột
            }}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};
