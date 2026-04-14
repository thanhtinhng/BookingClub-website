import React, { useState } from "react";
import BookingCard from "../../components/common/BookingCard/BookingCard";
import "./BookingTest.css"; 

interface CourtInfo {
  id: string;
  name: string;
  price: number;
}

const BookingTest: React.FC = () => {
  const [selectedCourt, setSelectedCourt] = useState<CourtInfo | null>(null);
// Fake dữ liệu để test UI

  const courtList: CourtInfo[] = [
    { id: "C_001", name: "Sân số 1", price: 250000 },
    { id: "C_002", name: "Sân VIP (Có mái che)", price: 350000 },
  ];

  return (
    <div className="booking-wrapper">
      <div className="booking-container">
        
        {/* --- CỘT TRÁI --- */}
        <div className="booking-main">
          <div className="booking-placeholder-content">
            <h2 className="booking-title" style={{ fontSize: "24px", marginBottom: "16px" }}>
              Danh sách sân bóng(test cho trang chi tiết sân sau này)
            </h2>
            <p style={{ color: "#6b7280", marginBottom: "24px" }}>
              Bấm vào một trong các nút bên dưới để chọn sân.
            </p>

            <div className="court-list-container">
              {courtList.map((court) => (
                <button
                  key={court.id}
                  onClick={() => setSelectedCourt(court)}
                  className={`court-btn ${selectedCourt?.id === court.id ? "active" : ""}`}
                >
                  <div className="court-btn-name">{court.name}</div>
                  <div className="court-btn-price">
                    {court.price.toLocaleString("vi-VN")}đ/h
                  </div>
                </button>
              ))}
            </div>

            <div className="booking-fake-scroll"></div>
          </div>
        </div>

        {/* --- CỘT PHẢI --- */}
        <div className="booking-sidebar">
          {selectedCourt ? (
            <BookingCard 
              courtId={selectedCourt.id}
              courtName={selectedCourt.name}
              basePricePerHour={selectedCourt.price}
              onClearSelection={() => setSelectedCourt(null)}
            />
          ) : (
            <div className="empty-state-card">
              <h3 className="empty-state-title">Chưa chọn sân</h3>
              <p className="empty-state-desc">Vui lòng chọn một sân ở cột bên trái</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default BookingTest;