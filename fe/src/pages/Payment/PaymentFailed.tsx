import { useSearchParams, useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";
import "./PaymentResult.css"; // Dùng chung giao diện với trang Thành công

export default function PaymentFailed() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Đọc params từ URL
  const code = searchParams.get("code");
  const message = searchParams.get("message") || "Đã có lỗi xảy ra trong quá trình thanh toán.";

  return (
    <div className="payment-result-wrapper">
      <div className="payment-result-card">
        
        <div className="payment-icon-container">
          <XCircle size={72} color="#ef4444" strokeWidth={1.5} />
        </div>

        <h2 className="payment-result-title">Thanh toán thất bại</h2>
        <p className="payment-result-message">
          Giao dịch không thành công. Vui lòng kiểm tra lại hoặc thử phương thức thanh toán khác.
        </p>

        <div className="payment-info-box">
          {code && (
            <div className="info-box-row">
              <span className="info-box-label">Mã lỗi:</span>
              <span className="info-box-value value-error">{code}</span>
            </div>
          )}
          <div className="info-box-row">
            <span className="info-box-label">Chi tiết:</span>
            <span className="info-box-value value-error">{message}</span>
          </div>
        </div>

        <button className="payment-btn" onClick={() => navigate("/courts/search")}>
          Đặt sân lại
        </button>
        <button className="payment-btn-outline" onClick={() => navigate("/")}>
          Về trang chủ
        </button>

      </div>
    </div>
  );
}