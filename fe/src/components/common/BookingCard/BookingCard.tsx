import React, { useState, useEffect } from "react";
import "./BookingCard.css";

// --- INTERFACES ---
interface TimeSlot {
  time: string;
  isOccupied: boolean;
}

interface ServiceItem {
  id: string;
  name: string;
  price: number;
  unit: 'hour' | 'flat'; 
}

interface BookingCardProps {
  complexId: string;
  complexName: string;
  courtId?: string;  
  courtName?: string;  
  sportType: string; 
  basePricePerHour?: number;
  onClearSelection: () => void;
}

interface CartItem {
  courtName: string;
  sportType: string;
  basePricePerHour: number;
  slots: string[];
  services: string[];
}

// --- MOCK DATA ---
const mockTimeSlotsData: Record<string, TimeSlot[]> = {
  "PB_001": [ 
    { time: "17:00 - 17:30", isOccupied: false },
    { time: "17:30 - 18:00", isOccupied: false },
    { time: "18:00 - 18:30", isOccupied: true },
    { time: "18:30 - 19:00", isOccupied: true },
    { time: "19:00 - 19:30", isOccupied: false },
    { time: "19:30 - 20:00", isOccupied: false },
  ],
  "PB_VIP": [ 
    { time: "17:00 - 17:30", isOccupied: true },
    { time: "17:30 - 18:00", isOccupied: true },
    { time: "18:00 - 18:30", isOccupied: false },
    { time: "18:30 - 19:00", isOccupied: false },
    { time: "19:00 - 19:30", isOccupied: false },
    { time: "19:30 - 20:00", isOccupied: false },
  ],
  "BM_001": [ 
    { time: "17:00 - 17:30", isOccupied: false },
    { time: "17:30 - 18:00", isOccupied: false },
    { time: "18:00 - 18:30", isOccupied: false },
    { time: "18:30 - 19:00", isOccupied: true },
    { time: "19:00 - 19:30", isOccupied: true },
    { time: "19:30 - 20:00", isOccupied: false },
  ],
  "BM_002": [ 
    { time: "17:00 - 17:30", isOccupied: false },
    { time: "17:30 - 18:00", isOccupied: false },
    { time: "18:00 - 18:30", isOccupied: false },
    { time: "18:30 - 19:00", isOccupied: false },
    { time: "19:00 - 19:30", isOccupied: false },
    { time: "19:30 - 20:00", isOccupied: false },
  ]
};

const availableServices: ServiceItem[] = [
  { id: "referee", name: "Thuê trọng tài", price: 200000, unit: "hour" },
  { id: "racket", name: "Thuê vợt", price: 200000, unit: "flat" },
  { id: "ballboy", name: "Thuê nhặt banh", price: 50000, unit: "hour" },
];

const BookingCard: React.FC<BookingCardProps> = ({ 
  complexId,
  complexName,
  courtId,
  courtName, 
  sportType,
  basePricePerHour, 
  onClearSelection 
}) => {

  // --- State giỏ hàng ---
  const [cart, setCart] = useState<Record<string, CartItem>>({});
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);


  // logic Đổi ngày là dọn sạch hóa đơn
  useEffect(() => {
    //Đảm bảo 1 bill thanh toán chỉ dành cho 1 ngày duy nhất
    setCart({});
  }, [selectedDate]);

  // Lấy dữ liệu của sân "đang được xem" trên màn hình
  const timeSlots: TimeSlot[] = courtId ? (mockTimeSlotsData[courtId] || []) : [];
  const currentActiveSlots = courtId ? (cart[courtId]?.slots || []) : [];
  const currentActiveServices = courtId ? (cart[courtId]?.services || []) : [];

  const handleToggleSlot = (slotTime: string, isOccupied: boolean) => {
    if (isOccupied || !courtId || !courtName || !basePricePerHour) return;

    setCart(prev => {
      const courtCart = prev[courtId] || { courtName, sportType, basePricePerHour, slots: [], services: [] };
      const hasSlot = courtCart.slots.includes(slotTime);
      const newSlots = hasSlot 
        ? courtCart.slots.filter(s => s !== slotTime) 
        : [...courtCart.slots, slotTime].sort(); 

      return { ...prev, [courtId]: { ...courtCart, slots: newSlots } };
    });
  };

  const handleToggleService = (serviceId: string) => {
    if (!courtId || !courtName || !basePricePerHour) return;

    setCart(prev => {
      const courtCart = prev[courtId] || { courtName, sportType, basePricePerHour, slots: [], services: [] };
      const hasService = courtCart.services.includes(serviceId);
      const newServices = hasService 
        ? courtCart.services.filter(s => s !== serviceId) 
        : [...courtCart.services, serviceId];

      return { ...prev, [courtId]: { ...courtCart, services: newServices } };
    });
  };

  const handleRemoveCartItem = (idToRemove: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      delete newCart[idToRemove];
      return newCart;
    });
    if (idToRemove === courtId) {
      onClearSelection();
    }
  };

  // --- TÍNH TỔNG TIỀN ---
  let globalTotalPrice = 0;
  let totalSelectedCourts = 0;

  Object.keys(cart).forEach(id => {
    const item = cart[id];
    if (item.slots.length === 0) return; 
    
    totalSelectedCourts += 1;
    const hours = item.slots.length * 0.5; 
    const courtCost = hours * item.basePricePerHour;
    
    const servicesCost = item.services.reduce((sum, sId) => {
      const s = availableServices.find(x => x.id === sId);
      if (!s) return sum;
      return sum + (s.unit === 'hour' ? s.price * hours : s.price);
    }, 0);

    globalTotalPrice += (courtCost + servicesCost);
  });

  const handlePayment = async () => {
    setIsSubmitting(true);
    
    const bookingPayload = {
      complexId, 
      date: selectedDate,
      bookings: Object.keys(cart)
        .filter(id => cart[id].slots.length > 0)
        .map(id => ({
          courtId: id,
          slots: cart[id].slots,
          selectedServiceIds: cart[id].services
      })),
      totalAmount: globalTotalPrice,
    };

    console.log("Multi-Booking Payload:", bookingPayload);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); 
      alert(`Đã đặt thành công ${totalSelectedCourts} sân ngày ${selectedDate}!`);
      setCart({}); 
      onClearSelection();
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="booking-card-container">
      {courtId ? (
        <>
          <div className="booking-card-header">
            <div className="booking-card-header-info">
              <span className="booking-complex-name">📍 {complexName}</span>
              <h3 className="booking-card-title">Đặt {courtName}</h3>
              <span className="booking-sport-badge">Môn: {sportType}</span>
              <p className="booking-card-subtitle">Giá: {(basePricePerHour || 0).toLocaleString("vi-VN")}đ/h</p>
            </div>
            <button className="booking-clear-btn" onClick={onClearSelection}>Đóng</button>
          </div>

          <hr className="booking-divider" />

          {/* CHỌN NGÀY */}
          <div className="booking-section">
            <div className="date-picker-wrapper">
              <label className="booking-section-title" style={{marginBottom: 0}}>Ngày chơi:</label>
              <input 
                type="date" 
                className="date-picker-input"
                value={selectedDate} 
                onChange={(e) => setSelectedDate(e.target.value)} 
                min={new Date().toISOString().split('T')[0]} 
                disabled={isSubmitting}
              />
            </div>
          </div>

          <hr className="booking-divider" />

          {/* CHỌN GIỜ */}
          <div className="booking-section">
            <h4 className="booking-section-title">Chọn khung giờ chi tiết</h4>
            <div className="time-pill-grid">
              {timeSlots.map((slot) => {
                const isSelected = currentActiveSlots.includes(slot.time);
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

          {/* DỊCH VỤ */}
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
                      checked={currentActiveServices.includes(service.id)} 
                      onChange={() => handleToggleService(service.id)} 
                      disabled={isSubmitting || currentActiveSlots.length === 0} 
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="empty-selection-state">
          <h3>Chưa chọn sân</h3>
          <p>Vui lòng chọn một sân ở cột bên trái để xem lịch</p>
        </div>
      )}

      {/* HÓA ĐƠN MINI-CART */}
      {totalSelectedCourts > 0 && (
        <div className="booking-footer-box">
          <h4 className="mini-cart-title">Hóa đơn ngày {selectedDate.split('-').reverse().join('/')}</h4>
          
          <div className="mini-cart-list">
            {Object.keys(cart).map(id => {
              const item = cart[id];
              if (item.slots.length === 0) return null;

              return (
                <div className="mini-cart-item" key={id}>
                  <div className="mini-cart-item-header">
                    <span className="mini-cart-court-name">
                      {item.courtName} ({item.sportType})
                    </span>
                    <button className="remove-item-btn" onClick={() => handleRemoveCartItem(id)} title="Xóa sân này">✕</button>
                  </div>
                  <div className="mini-cart-item-details">
                    <div>⏱ {item.slots.length * 0.5} giờ: {item.slots.join(', ')}</div>
                    {item.services.length > 0 && (
                      <div style={{marginTop: '4px'}}>
                        🛠 Dịch vụ: {item.services.map(sId => availableServices.find(s => s.id === sId)?.name).join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="total-price-row">
            <span className="total-label">Tổng tiền ({totalSelectedCourts} sân):</span>
            <span className="total-amount">{globalTotalPrice.toLocaleString("vi-VN")}đ</span>
          </div>
          
          <button className="booking-pay-btn" onClick={handlePayment} disabled={isSubmitting}>
            {isSubmitting ? "Đang xử lý..." : "Thanh toán ngay"}
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingCard;