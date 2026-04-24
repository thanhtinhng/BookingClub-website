import React, { useState } from "react";
import BookingCard from "../../components/common/BookingCard/BookingCard";
import "./BookingTest.css"; 

interface CourtInfo {
  id: string;
  name: string;
  price: number;
}

const currentComplex = {
  id: "CPX_001",
  name: "Trung tâm Thể thao Rạch Miễu"
};

const mockCourtsData: Record<string, CourtInfo[]> = {
  pickleball: [
    { id: "PB_001", name: "Sân 1", price: 250000 },
    { id: "PB_VIP", name: "Sân VIP", price: 350000 },
  ],
  badminton: [
    { id: "BM_001", name: "Sân 1", price: 150000 },
    { id: "BM_002", name: "Sân 2", price: 150000 }, 
  ],
};

const BookingTest: React.FC = () => {
  const [selectedSport, setSelectedSport] = useState<string>("pickleball");
  const [selectedCourt, setSelectedCourt] = useState<CourtInfo | null>(null);

  const currentCourts = mockCourtsData[selectedSport];

  const handleSportChange = (sportKey: string) => {
    setSelectedSport(sportKey);
    setSelectedCourt(null); 
  };

  return (
    <div className="booking-wrapper">
      <div className="booking-container">
        
        {/* --- CỘT TRÁI --- */}
        <div className="booking-main">
          <div className="booking-placeholder-content">
            <h2 className="booking-title" style={{ fontSize: "28px", marginBottom: "8px" }}>
              {currentComplex.name}
            </h2>
            <p style={{ color: "#6b7280", marginBottom: "24px" }}>
              Danh sách sân bóng (Test cho trang chi tiết sân sau này)
            </p>

            {/* --- BỘ LỌC THỂ THAO --- */}
            <div className="sport-filter-container">
              <button
                onClick={() => handleSportChange("pickleball")}
                className={`sport-filter-btn ${selectedSport === "pickleball" ? "active" : ""}`}
              >
                Pickleball
              </button>
              <button
                onClick={() => handleSportChange("badminton")}
                className={`sport-filter-btn ${selectedSport === "badminton" ? "active" : ""}`}
              >
                Cầu lông
              </button>
            </div>

            {/* --- DANH SÁCH SÂN --- */}
            <div className="court-list-container">
              {currentCourts.map((court) => {
                const isActive = selectedCourt?.id === court.id;
                return (
                  <button
                    key={court.id}
                    onClick={() => setSelectedCourt(court)}
                    className={`court-btn ${isActive ? "active" : ""}`}
                  >
                    <div className="court-btn-name">{court.name}</div>
                    <div className="court-btn-price">
                      {court.price.toLocaleString("vi-VN")}đ/h
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="booking-fake-scroll"></div>
          </div>
        </div>

        {/* --- CỘT PHẢI --- */}
        <div className="booking-sidebar">
          <BookingCard 
            complexId={currentComplex.id}       
            complexName={currentComplex.name}   
            courtId={selectedCourt?.id}
            courtName={selectedCourt?.name}
            sportType={selectedSport}  
            basePricePerHour={selectedCourt?.price}
            onClearSelection={() => setSelectedCourt(null)}
          />
        </div>

      </div>
    </div>
  );
};

export default BookingTest;