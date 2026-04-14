import React, { useState } from "react";
import "./BookingCard.css";

// Interface
interface ServiceItem {
  id: string;
  name: string;
  price: number;
  unit: 'hour' | 'flat'; // 'hour': tính nhân theo giờ | 'flat': tính 1 lần
}

interface BookingCardProps {
  courtId: string;       // ID thực tế của sân dùng để lưu DB
  courtName: string;     // Tên hiển thị
  basePricePerHour: number;
  onClearSelection: () => void;
}

const BookingCard: React.FC<BookingCardProps> = ({ 
  courtId,
  courtName, 
  basePricePerHour, 
  onClearSelection 
}) => {

  // Mock data để test UI
  const timeSlots = ["17:00-18:00", "18:00-19:00", "19:00-20:00", "20:00-21:00", "21:00-22:00"];
  
  const availableServices: ServiceItem[] = [
    { id: "referee", name: "Thuê trọng tài", price: 200000, unit: "hour" },
    { id: "racket", name: "Thuê vợt", price: 200000, unit: "flat" },
    { id: "ballboy", name: "Thuê nhặt banh", price: 50000, unit: "hour" },
  ];

  //State
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]); 
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

// Logic
  const handleToggleSlot = (slot: string) => {
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  const handleToggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId]
    );
  };

// Tính tiền ở Front-end
  const totalHours = selectedSlots.length;
  
  const totalServicesPrice = selectedServices.reduce((total, serviceId) => {
    const service = availableServices.find(s => s.id === serviceId);
    if (!service) return total;
    
    const cost = service.unit === 'hour' ? service.price * totalHours : service.price;
    return total + cost;
  }, 0);

  const totalPrice = (totalHours * basePricePerHour) + totalServicesPrice;


  const handlePayment = async () => {
    setIsSubmitting(true);

    // Gói dữ liệu được gửi
    const bookingPayload = {
      courtId,
      courtName,
      slots: selectedSlots,
      selectedServiceIds: selectedServices,
      totalAmount: totalPrice,
    };

    console.log("Payload gửi đi:", bookingPayload);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); 
      
      alert("UI Completed. Awaiting API integration.");
      
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="booking-card-container">
      {/* Header */}
      <div className="booking-card-header">
        <div>
          <h3 className="booking-card-title">Đặt {courtName}</h3>
          <p className="booking-card-subtitle">Giá: {basePricePerHour.toLocaleString("vi-VN")}đ/h</p>
        </div>
        <button 
          onClick={onClearSelection} 
          style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}
        >
          Đổi sân
        </button>
      </div>

      <hr className="booking-divider" />

      {/* Grid Chọn giờ */}
      <div className="booking-section">
        <h4 className="booking-section-title">Chọn khung giờ chi tiết</h4>
        <div className="time-pill-grid">
          {timeSlots.map((slot) => (
            <button
              key={slot}
              type="button"
              className={`time-pill ${selectedSlots.includes(slot) ? "active" : ""}`}
              onClick={() => handleToggleSlot(slot)}
              disabled={isSubmitting}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      <hr className="booking-divider" />

      {/* Render danh sách dịch vụ động */}
      {availableServices.length > 0 && (
        <div className="booking-section">
          <h4 className="booking-section-title">Dịch vụ tiện ích</h4>
          
          {availableServices.map((service) => (
            <div className="service-row" key={service.id}>
              <div className="service-info">
                <span className="service-name">{service.name}</span>
                <span className="service-price">
                  +{service.price.toLocaleString("vi-VN")}k {service.unit === 'hour' ? '/h' : '(Cố định)'}
                </span>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={selectedServices.includes(service.id)} 
                  onChange={() => handleToggleService(service.id)} 
                  disabled={isSubmitting || totalHours === 0} 
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          ))}
        </div>
      )}

      {/* Footer Tổng tiền & Nút Submit */}
      <div className="booking-footer-box">
        <div className="total-price-row">
          <span className="total-label">Tổng tiền:</span>
          <span className="total-amount">{totalPrice.toLocaleString("vi-VN")}đ</span>
        </div>
        
        <button 
          className="booking-pay-btn" 
          onClick={handlePayment}
          disabled={totalHours === 0 || isSubmitting}
        >
          {isSubmitting ? "Đang xử lý..." : totalHours === 0 ? "Vui lòng chọn giờ" : "Thanh toán"}
        </button>
      </div>
    </div>
  );
};

export default BookingCard;