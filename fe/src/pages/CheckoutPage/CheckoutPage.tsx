import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css';

// Mock data giả lập kết quả trả về từ getMeApi
const mockUser = {
  _id: "USER_123456",
  email: "test@gmail.com",
  phone: "0901234567",
  name: "NGUYỄN VĂN A"
};

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState<number>(600); // 10 phút
  const [bookingData, setBookingData] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const orderCode = useMemo(() => {
      return `ORD-${Math.floor(Math.random() * 100000)}`;
    }, []);

  useEffect(() => {
    const savedData = sessionStorage.getItem('pendingBooking');
    if (!savedData) {
      alert("Không tìm thấy thông tin đơn hàng!");
      navigate('/');
      return;
    }
    setBookingData(JSON.parse(savedData));
  }, [navigate]);

  useEffect(() => {
    if (timeLeft <= 0) {
      alert("Hết thời gian thanh toán! Đơn hàng đã bị hủy.");
      sessionStorage.removeItem('pendingBooking');
      navigate('/');
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, navigate]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleConfirmPayment = async () => {
    setIsProcessing(true);
    try {
      // làm sạch data trước khi gửi BE
      const backendPayload = {
        complex_id: bookingData.complex_id,
        booking_date: bookingData.booking_date,
        total_price: bookingData.total_price,
        booking_details: bookingData.booking_details.map((d: any) => ({
          sub_field_id: d.sub_field_id,
          startTime: d.startTime,
          endTime: d.endTime,
          // Rút trích mảng Object services {id, name, price} về lại mảng string ID ["referee", "racket"]
          services: d.services ? d.services.map((s: any) => s.id) : [] 
        }))
      };

      console.log(JSON.stringify(backendPayload, null, 2));
      
      // Giả lập call API
      await new Promise(resolve => setTimeout(resolve, 2000)); 
      
      alert("Xác nhận thành công! Vui lòng chờ admin duyệt.");
      sessionStorage.removeItem('pendingBooking');
      navigate('/BookingTest'); 
    } catch (error) {
      alert("Có lỗi xảy ra khi xác nhận!");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!bookingData) return null;

  // Cấu hình VietQR
  const BANK_ID = "MB"; 
  const ACCOUNT_NO = "0987654321"; 
  const ACCOUNT_NAME = "NGUYEN CHU SAN";
  const AMOUNT = bookingData.total_price;
  const DESCRIPTION = `THANH TOAN SAN ${bookingData.booking_date.replace(/-/g, '')}`;
  const QR_URL = `https://img.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-compact2.png?amount=${AMOUNT}&addInfo=${encodeURIComponent(DESCRIPTION)}&accountName=${encodeURIComponent(ACCOUNT_NAME)}`;

  return (
    <div className="checkout-wrapper">

      <div className="checkout-container">
        <div className="checkout-left">
          
          <div className="user-info-box">
            <div className="info-row">
              <span className="info-label">TÊN NGƯỜI ĐẶT</span>
              <span className="info-value">{mockUser.name}</span>
            </div>
            <div className="info-row">
              <span className="info-label">SỐ ĐIỆN THOẠI</span>
              <span className="info-value">{mockUser.phone}</span>
            </div>
            <div className="info-row">
              <span className="info-label">MÃ ĐƠN</span>
              <span className="info-value">{orderCode}</span>
            </div>
          </div>

          <div className="details-table-wrapper">
            <div className="details-table-header">
              <div className="col-item">CHI TIẾT ĐƠN</div>
              <div className="col-info">THÔNG TIN THÊM</div>
              <div className="col-price">GIÁ</div>
            </div>

            <div className="details-table-body">
              {bookingData.booking_details.map((detail: any, index: number) => (
                <React.Fragment key={index}>
                  {/* Dòng hiển thị Tiền Sân */}
                  <div className="table-row">
                    <div className="col-item fw-bold">{detail.courtName}</div>
                    <div className="col-info">{detail.startTime} - {detail.endTime}</div>
                    <div className="col-price">{detail.price.toLocaleString('vi-VN')}VND</div>
                  </div>
                  
                  {/* Dòng hiển thị Tiền Dịch vụ (Nếu có) */}
                  {detail.services && detail.services.map((srv: any, sIdx: number) => (
                    <div className="table-row" key={`srv-${index}-${sIdx}`}>
                      <div className="col-item">{srv.name.toUpperCase()}</div>
                      <div className="col-info"></div>
                      <div className="col-price">{srv.price > 0 ? `${srv.price.toLocaleString('vi-VN')}VND` : '---'}</div>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>

            <div className="details-divider"></div>

            <div className="details-total-row">
              <div className="col-item fw-bold">TỔNG TIỀN:</div>
              <div className="col-info"></div>
              <div className="col-price fw-bold">{bookingData.total_price.toLocaleString('vi-VN')}VND</div>
            </div>
          </div>
        </div>

        <div className="checkout-right">
          <div className="timer-text">CHUYỂN KHOẢN TRONG</div>
          <div className="timer-countdown">{formatTime(timeLeft)}</div>

          <div className="qr-box">
            <img src={QR_URL} alt="QR Code" />
          </div>

          <div className="bank-info-box">
            <p className="bank-label">TÊN TÀI KHOẢN</p>
            <p className="bank-value">{ACCOUNT_NAME}</p>
            <p className="bank-label mt-3">SỐ TÀI KHOẢN</p>
            <p className="bank-value">{ACCOUNT_NO}</p>
            <p className="bank-label mt-3">NGÂN HÀNG</p>
            <p className="bank-value">MB BANK</p>
          </div>

          <div className="total-amount-box">
            {bookingData.total_price.toLocaleString('vi-VN')}VND
          </div>

          <button 
            className="confirm-payment-btn" 
            onClick={handleConfirmPayment}
            disabled={isProcessing}
          >
            {isProcessing ? "ĐANG XỬ LÝ..." : "ĐÃ CHUYỂN KHOẢN"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;