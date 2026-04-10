import { useState } from "react";
import { Eye, EyeOff, Image } from "lucide-react";
import "./Login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showEmail, setShowEmail] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  


// Phần Validate 

  //  Thêm State để lưu thông báo lỗi
  const [errors, setErrors] = useState({ email: "", password: "" });


  //  Hàm kiểm tra dữ liệu khi bấm nút Đăng nhập
  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Ngăn trình duyệt tự tải lại trang
    

    let newErrors = { email: "", password: "" };
    let isValid = true;

    // Validate Email
    if (!email) {
      newErrors.email = "Email không được để trống";
      isValid = false;
    } else if (!email.includes("@")) {
      newErrors.email = "Email chưa đúng định dạng";
      isValid = false;
    }

    // Validate Mật khẩu
    if (!password) {
      newErrors.password = "Mật khẩu không được để trống";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
      isValid = false;
    }

    // Cập nhật lỗi lên màn hình
    setErrors(newErrors);

    // Nếu không có lỗi gì thì báo thành công (Sau này sẽ ghép API ở đây)
    if (isValid) {
      console.log("Dữ liệu chuẩn có thể gửi Back-end:", { email, password });
      alert("Đăng nhập hợp lệ!");
    }
  };

  
  
  return (
    <div className="login-wrapper">
      <div className="login-card">
        {/* Left: Image placeholder */}
        <div className="login-image-placeholder">
          <Image size={40} className="login-image-icon" />
        </div>

        {/* Right: Form */}
        <div className="login-form-section">
          <div className="login-form-box">
            <h2 className="login-title">Đăng nhập</h2>

            {/*Email field */}
            <div className="login-field">
              <label className="login-label">Email</label>
              {/* Nếu có lỗi thì thêm class error vào để viền đỏ */}
              <div className={`login-input-wrapper ${errors.email ? 'input-error' : ''}`}>
              
                <input
                  type={showEmail ? "text" : "email"}
                  className="login-input"
                  placeholder="Nhập email của bạn"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors({ ...errors, email: "" }); // Gõ vào là mất lỗi
                  }}
                />
                <button
                  type="button"
                  className="login-toggle-btn"
                  onClick={() => setShowEmail(!showEmail)}
                >
               
                </button>
              </div>
              {/* Hiển thị dòng chữ đỏ nếu có lỗi */}
              {errors.email && <span className="login-error-text">{errors.email}</span>}
            </div>

            {/* Password field */}
            <div className="login-field">
              <label className="login-label">Mật khẩu</label>
              <div className={`login-input-wrapper ${errors.password ? 'input-error' : ''}`}>
                <input
                  type={showPassword ? "text" : "password"}
                  className="login-input"
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors({ ...errors, password: "" }); // Gõ vào là mất lỗi
                  }}
                />
                <button
                  type="button"
                  className="login-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {/* Hiển thị dòng chữ đỏ nếu có lỗi */}
              {errors.password && <span className="login-error-text">{errors.password}</span>}
            </div>

            {/* Submit button - Gắn hàm handleLogin vào sự kiện onClick */}
            <button type="button" className="login-btn" onClick={handleLogin}>
              Đăng nhập
            </button>
          </div>

          {/* Footer link */}
          <p className="login-footer-text">
            Bạn chưa có tài khoản?{" "}
            <a href="/register" className="login-link">
              Đăng ký
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;