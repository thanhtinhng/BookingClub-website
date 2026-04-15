import React, { useState, useEffect } from "react";
import "./BookingCard.css";

// Interface
interface TimeSlot {
  time: string;
  isOccupied: boolean;
}

interface ServiceItem {
  id: string;
  name: string;
  price: number;
  unit: 'hour' | 'flat'; // 'hour': tính nhân theo giờ | 'flat': tính 1 lần
}


interface BookingCardProps {
  complexId: string;
  complexName: string;
  courtId: string;  
  courtName: string;  
  sportType: string; 
  basePricePerHour: number;
  onClearSelection: () => void;
}

  // Mock data để test UI
const mockTimeSlotsData: Record<string, TimeSlot[]> = {
  "PB_001": [ 
    { time: "17:00-18:00", isOccupied: false },
    { time: "18:00-19:00", isOccupied: true },
    { time: "19:00-20:00", isOccupied: false },
    { time: "20:00-21:00", isOccupied: false },
    { time: "21:00-22:00", isOccupied: true },
  ],
  "PB_VIP": [ 
    { time: "17:00-18:00", isOccupied: true },
    { time: "18:00-19:00", isOccupied: true },
    { time: "19:00-20:00", isOccupied: false },
    { time: "20:00-21:00", isOccupied: false },
    { time: "21:00-22:00", isOccupied: false },
  ],
  "BM_001": [ 
    { time: "17:00-18:00", isOccupied: false },
    { time: "18:00-19:00", isOccupied: false },
    { time: "19:00-20:00", isOccupied: true },
    { time: "20:00-21:00", isOccupied: true },
    { time: "21:00-22:00", isOccupied: false },
  ],
  "BM_002": [ 
    { time: "17:00-18:00", isOccupied: false },
    { time: "18:00-19:00", isOccupied: false },
    { time: "19:00-20:00", isOccupied: false },
    { time: "20:00-21:00", isOccupied: false },
    { time: "21:00-22:00", isOccupied: false },
  ]
};

const BookingCard: React.FC<BookingCardProps> = ({ 
  complexId,
  complexName,
  courtId,
  courtName, 
  sportType,
  basePricePerHour, 
  onClearSelection 
}) => {

  const timeSlots: TimeSlot[] = mockTimeSlotsData[courtId] || [];
  
  const availableServices: ServiceItem[] = [
    { id: "referee", name: "Thuê trọng tài", price: 200000, unit: "hour" },
    { id: "racket", name: "Thuê vợt", price: 200000, unit: "flat" },
    { id: "ballboy", name: "Thuê nhặt banh", price: 50000, unit: "hour" },
  ];
//State
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]); 
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    setSelectedSlots([]);
    setSelectedServices([]);
  }, [courtId]);

  const handleToggleSlot = (slotTime: string, isOccupied: boolean) => {
    if (isOccupied) return;
    setSelectedSlots((prev) =>
      prev.includes(slotTime) ? prev.filter((s) => s !== slotTime) : [...prev, slotTime]
    );
  };

  const handleToggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId]
    );
  };

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
    
    // Gói Payload được gửi
    const bookingPayload = {
      complexId, 
      courtId,
      slots: selectedSlots,
      selectedServiceIds: selectedServices,
      totalAmount: totalPrice,
    };

    console.log("Booking Payload:", bookingPayload);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); 
      alert(`Đã thanh toán: ${courtName} (${sportType}) tại ${complexName}. Check console!`);
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="booking-card-container">
      <div className="booking-card-header">
        <div className="booking-card-header-info">
          {/* Hiển thị tên Cụm sân cho đẹp */}
          <span style={{ fontSize: "11px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: "700" }}>
             {complexName}
          </span>
          <h3 className="booking-card-title">Đặt {courtName}</h3>
          
          <span className="booking-sport-badge">
            Môn: {sportType} 
          </span>
          <p className="booking-card-subtitle">Giá: {basePricePerHour.toLocaleString("vi-VN")}đ/h</p>
        </div>
        <button className="booking-clear-btn" onClick={onClearSelection}>
          Đổi sân
        </button>
      </div>

      <hr className="booking-divider" />

      <div className="booking-section">
        <h4 className="booking-section-title">Chọn khung giờ chi tiết</h4>
        <div className="time-pill-grid">
          {timeSlots.map((slot) => {
            const isSelected = selectedSlots.includes(slot.time);
            return (
              <button
                key={slot.time}
                type="button"
                className={`time-pill ${isSelected ? "active" : ""} ${slot.isOccupied ? "occupied" : ""}`}
                onClick={() => handleToggleSlot(slot.time, slot.isOccupied)}
                disabled={isSubmitting || slot.isOccupied} 
              >
                {slot.time}
              </button>
            );
          })}
        </div>
      </div>

      <hr className="booking-divider" />

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