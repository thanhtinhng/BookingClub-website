import { useState } from "react";
import { Image } from "lucide-react"; 
import "./Login.css";
import InputField from "../../components/layout/InputField/InputField";



const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  
  // State lưu thông báo lỗi
  const [errors, setErrors] = useState({ email: "", password: "" });

  // Hàm validate khi bấm nút Đăng nhập
  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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

    setErrors(newErrors);

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

            {/* Gọi Component */}
            <InputField
              label="Email"
              type="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(val) => { setEmail(val); setErrors({ ...errors, email: "" }); }}
              error={errors.email}
            />

            <InputField
              label="Mật khẩu"
              type="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(val) => { setPassword(val); setErrors({ ...errors, password: "" }); }}
              error={errors.password}
              isPassword={true}
            />

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