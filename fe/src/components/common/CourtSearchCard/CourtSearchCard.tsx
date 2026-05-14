import React from "react";
import "./CourtSearchCard.css";

interface Props {
  court: {
    _id: string;
    name: string;
    address: string;
    city: string;
    district: string;
    slug?: string;
    phone?: string;
    email?: string;
    [key: string]: any;
  };
}

const CourtSearchCard: React.FC<Props> = ({ court }) => {
  const defaultImage = "https://via.placeholder.com/300x200?text=" + encodeURIComponent(court.name);
  const imageUrl = court.images && court.images[0] ? court.images[0] : defaultImage;
  
  return (
    <article className="court-card">
      <div className="card-image-wrap">
        <img src={imageUrl} alt={court.name} />
      </div>
      <div className="card-body">
        <h3 className="card-title">{court.name}</h3>
        <p className="card-address">{court.address}</p>
        <p className="card-location">
          {court.district && <span>{court.district}</span>}
          {court.city && <span> • {court.city}</span>}
        </p>
        {court.phone && <p className="card-phone">📞 {court.phone}</p>}
      </div>
    </article>
  );
};

export default CourtSearchCard;
