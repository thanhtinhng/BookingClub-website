import React from "react";
import "./CourtSearchCard.css";

interface Props {
  court: {
    id: string;
    name: string;
    address: string;
    priceRange: string;
    rating: number;
    images: string[];
  };
}

const CourtSearchCard: React.FC<Props> = ({ court }) => {
  return (
    <article className="court-card">
      <div className="card-image-wrap">
        <img src={court.images[0]} alt={court.name} />
      </div>
      <div className="card-body">
        <h3 className="card-title">{court.name}</h3>
        <p className="card-address">{court.address}</p>
        <div className="card-meta">
          <span className="card-price">{court.priceRange}</span>
          <span className="card-rating">⭐ {court.rating}</span>
        </div>
      </div>
    </article>
  );
};

export default CourtSearchCard;
