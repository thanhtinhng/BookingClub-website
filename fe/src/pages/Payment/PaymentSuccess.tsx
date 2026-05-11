import { useSearchParams, Link } from "react-router-dom";
import "./PaymentSucces.css"

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();

  const bookingStatus = searchParams.get("bookingStatus");

  return (
    <div className="payment-success-page">
      <div className="payment-success-card">
        <h2 className="payment-success-title">Thanh toán thành công</h2>

        <p className="payment-success-status">
          Trạng thái booking: <span>{bookingStatus}</span>
        </p>

        <Link to="/" className="payment-success-btn">
          Trở về trang chủ
        </Link>
      </div>
    </div>
  );
}