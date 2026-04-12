import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "./InputField.css";

interface InputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  isPassword?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ 
  label, type, placeholder, value, onChange, error, isPassword = false 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="input-field-container">
      <label className="input-field-label">{label}</label>
      <div className={`input-field-wrapper ${error ? 'input-error' : ''}`}>
        <input
          type={inputType}
          className="input-field-input"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)} 
        />
        {isPassword && (
          <button
            type="button"
            className="input-field-toggle-btn"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1} // Bỏ qua nút mắt khi người dùng nhấn phím Tab
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <span className="input-field-error-text">{error}</span>}
    </div>
  );
};

export default InputField;