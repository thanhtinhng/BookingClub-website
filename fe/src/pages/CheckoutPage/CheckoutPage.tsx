import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CheckoutPage.css';
import { useAuth } from "../../contexts/authContext";
import {
  createBookingApi,
  createVnpayPaymentApi
} from "../../services/booking.api";

const CheckoutPage: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [bookingData, setBookingData] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      alert("Vui lòng đăng nhập");
      navigate("/login");
      return;
    }

    const stateBookingData = location.state?.bookingData;

    if (stateBookingData) {
      setBookingData(stateBookingData);
      sessionStorage.setItem(
        "pendingBooking",
        JSON.stringify(stateBookingData)
      );
      return;
    }

    const savedData = sessionStorage.getItem("pendingBooking");

    if (savedData) {
      setBookingData(JSON.parse(savedData));
      return;
    }

    alert("Không tìm thấy thông tin đơn hàng!");
    navigate("/courts/search"); //chuyển về trang search
  }, [loading, user, navigate, location.state]);

  if (loading) return <p>Loading...</p>;
  if (!user || !bookingData) return null;

  const handleConfirmPayment = async () => {
    setIsProcessing(true);
    try {
      // làm sạch data trước khi gửi BE
      const backendPayload = {
        complex_id: bookingData.complex_id,
        booking_date: new Date().toISOString(),
        booking_details: bookingData.booking_details.map((d: any) => ({
          sub_field_id: d.sub_field_id,
          play_date: bookingData.booking_date,
          startTime: d.startTime,
          endTime: d.endTime,
          // Rút trích mảng Object services {id, name, price} về lại mảng string ID ["referee", "racket"]
          services: d.services ? d.services.map((s: any) => s.id) : []
        }))
      };

      console.log(JSON.stringify(backendPayload, null, 2));

      // call API
      const bookingRes = await createBookingApi(backendPayload); //tạo booking

      const bookingId = bookingRes.data._id;

      const paymentRes = await createVnpayPaymentApi(bookingId); // lấy url vnpay

      sessionStorage.removeItem('pendingBooking');

      window.location.href = paymentRes.paymentUrl; //chuyển đến site vnpay

    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Có lỗi xảy ra khi xác nhận";

      alert(message);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!bookingData) return null;

  // Cấu hình VietQR
  // const BANK_ID = "MB"; 
  // const ACCOUNT_NO = "0987654321"; 
  // const ACCOUNT_NAME = "NGUYEN CHU SAN";
  // const AMOUNT = bookingData.total_price;
  // const DESCRIPTION = `THANH TOAN SAN ${bookingData.booking_date.replace(/-/g, '')}`;
  // const QR_URL = `https://img.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-compact2.png?amount=${AMOUNT}&addInfo=${encodeURIComponent(DESCRIPTION)}&accountName=${encodeURIComponent(ACCOUNT_NAME)}`;

  return (
    <div className="checkout-wrapper">
      <h1 className="checkout-page-title">XÁC NHẬN ĐƠN HÀNG</h1>

      <div className="checkout-container">
        <div className="checkout-left">

          <div className="user-info-box">
            <div className="info-row">
              <span className="info-label">TÊN NGƯỜI ĐẶT</span>
              <span className="info-value">{user.name}</span>
            </div>
            <div className="info-row">
              <span className="info-label">SỐ ĐIỆN THOẠI</span>
              <span className="info-value">{user.phone}</span>
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
          <div className="total-amount-box">
            {bookingData.total_price.toLocaleString("vi-VN")} VND
          </div>

          <div className="checkout-action-buttons">
            <button
              type="button"
              className="edit-booking-btn"
              onClick={() => navigate(`/complexes/${bookingData.complex_id}/booking`)}
              disabled={isProcessing}
            >
              CHỈNH SỬA ĐƠN
            </button>

            <button
              type="button"
              className="cancel-booking-btn"
              onClick={() => {
                const confirmed = window.confirm(
                  "Bạn có chắc muốn hủy đơn đã chọn không?"
                );

                if (!confirmed) return;
                sessionStorage.removeItem("pendingBooking");
                navigate("/courts/search");
              }}
              disabled={isProcessing}
            >
              HỦY ĐƠN
            </button>

            <button
              type="button"
              className="confirm-payment-btn"
              onClick={handleConfirmPayment}
              disabled={isProcessing}
            >
              {isProcessing ? "ĐANG XỬ LÝ..." : "XÁC NHẬN ĐẶT SÂN"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;