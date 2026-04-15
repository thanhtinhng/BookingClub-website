import { useState } from "react";
import { Image } from "lucide-react";
import "./Login.css";
import InputField from "../../components/layout/InputField/InputField";
import { loginApi } from "../../utils/api";
import { useNavigate } from "react-router-dom";


const Login: React.FC = () => {
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  // State lưu thông báo lỗi
  const [errors, setErrors] = useState({ phone: "", password: "" });

  // Hàm validate khi bấm nút Đăng nhập
  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let newErrors = { phone: "", password: "" };
    let isValid = true;

    // Validate Email
    if (!phone) {
      newErrors.phone = "Số điện thoại không được để trống";
      isValid = false;
    }

    // Validate Mật khẩu
    if (!password) {
      newErrors.password = "Mật khẩu không được để trống";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {

      try {
        const res = await loginApi(phone, password);
        console.log(">>> res:", res);
        localStorage.setItem("access_token", res.access_token)

        alert("Đăng nhập thành công");
        navigate("/home");
      } catch (error: any) {
        console.log(">>> error: ", error);

        const message =
          error?.response?.data?.message || "Có lỗi xảy ra";

        alert(message);
      }
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
              label="Số điện thoại"
              type="tel"
              placeholder="Nhập số điện thoại"
              value={phone}
              onChange={(val) => { setPhone(val); setErrors({ ...errors, phone: "" }); }}
              error={errors.phone}
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