import { useState } from "react";
import { Eye, EyeOff, Image } from "lucide-react";
import "./Register.css";

const Register: React.FC = () => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  // State lưu lỗi
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let newErrors = { fullName: "", email: "", phone: "", password: "", confirmPassword: "" };
    let isValid = true;

    // Validate Họ tên
    if (!fullName.trim()) {
      newErrors.fullName = "Họ và tên không được để trống";
      isValid = false;
    }

    // Validate Email
    if (!email) {
      newErrors.email = "Email không được để trống";
      isValid = false;
    } else if (!email.includes("@")) {
      newErrors.email = "Email chưa đúng định dạng";
      isValid = false;
    }

    // Validate Số điện thoại (Cơ bản: 10 số)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phone) {
      newErrors.phone = "Số điện thoại không được để trống";
      isValid = false;
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone = "Số điện thoại phải gồm 10 chữ số";
      isValid = false;
    }

    // Validate Mật khẩu
    let typesCount = 0;
    if (/[a-z]/.test(password)) typesCount++; // Có chữ thường
    if (/[A-Z]/.test(password)) typesCount++; // Có chữ hoa
    if (/[0-9]/.test(password)) typesCount++; // Có số
    if (/[^a-zA-Z0-9]/.test(password)) typesCount++; // Có ký tự đặc biệt

    if (!password) {
      newErrors.password = "Mật khẩu không được để trống";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự";
      isValid = false;
    } else if (typesCount < 3) {
      newErrors.password = "Mật khẩu yếu! Phải chứa ít nhất 3 loại: chữ thường, chữ hoa, số, ký tự đặc biệt";
      isValid = false;
    }

    // Validate Xác nhận mật khẩu
    if (!confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
      isValid = false;
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      console.log("Dữ liệu đăng ký:", { fullName, email, phone, password });
      alert("Đăng ký hợp lệ! Vui lòng kiểm tra email để kích hoạt tài khoản.");
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
        {/* Left: Image placeholder */}
        <div className="register-image-placeholder">
          <Image size={40} className="register-image-icon" />
        </div>

        {/* Right: Form */}
        <div className="register-form-section">
          <div className="register-form-box">
            <h2 className="register-title">Đăng ký</h2>

            {/* Họ và tên */}
            <div className="register-field">
              <label className="register-label">Họ và tên</label>
              <div className={`register-input-wrapper ${errors.fullName ? 'input-error' : ''}`}>
                <input
                  type="text"
                  className="register-input"
                  placeholder="Nhập họ và tên"
                  value={fullName}
                  onChange={(e) => { setFullName(e.target.value); setErrors({ ...errors, fullName: "" }); }}
                />
              </div>
              {errors.fullName && <span className="register-error-text">{errors.fullName}</span>}
            </div>

            {/* Email */}
            <div className="register-field">
              <label className="register-label">Email</label>
              <div className={`register-input-wrapper ${errors.email ? 'input-error' : ''}`}>
                <input
                  type="email"
                  className="register-input"
                  placeholder="Nhập email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors({ ...errors, email: "" }); }}
                />
              </div>
              {errors.email && <span className="register-error-text">{errors.email}</span>}
            </div>

            {/* Số điện thoại */}
            <div className="register-field">
              <label className="register-label">Số điện thoại</label>
              <div className={`register-input-wrapper ${errors.phone ? 'input-error' : ''}`}>
                <input
                  type="tel"
                  className="register-input"
                  placeholder="Nhập số điện thoại"
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value); setErrors({ ...errors, phone: "" }); }}
                />
              </div>
              {errors.phone && <span className="register-error-text">{errors.phone}</span>}
            </div>

            {/* Mật khẩu */}
            <div className="register-field">
              <label className="register-label">Mật khẩu</label>
              <div className={`register-input-wrapper ${errors.password ? 'input-error' : ''}`}>
                <input
                  type={showPassword ? "text" : "password"}
                  className="register-input"
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors({ ...errors, password: "" }); }}
                />
                <button
                  type="button"
                  className="register-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <span className="register-error-text">{errors.password}</span>}
            </div>

            {/* Xác nhận mật khẩu */}
            <div className="register-field">
              <label className="register-label">Xác nhận mật khẩu</label>
              <div className={`register-input-wrapper ${errors.confirmPassword ? 'input-error' : ''}`}>
                <input
                  type={showConfirm ? "text" : "password"}
                  className="register-input"
                  placeholder="Nhập lại mật khẩu"
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); setErrors({ ...errors, confirmPassword: "" }); }}
                />
                <button
                  type="button"
                  className="register-toggle-btn"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && <span className="register-error-text">{errors.confirmPassword}</span>}
            </div>

            {/* Submit button */}
            <button type="button" className="register-btn" onClick={handleRegister}>
              Đăng ký
            </button>
          </div>

          {/* Footer links */}
          <p className="register-footer-text">
            Bạn đã có tài khoản?{" "}
            <a href="/login" className="register-link">
              Đăng nhập
            </a>
          </p>
          <p className="register-footer-text">
            <a href="/register-owner" className="register-owner-link">
              Bấm vào đây để đăng ký dành cho chủ sân
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;