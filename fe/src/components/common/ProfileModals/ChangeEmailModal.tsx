import React, { useState } from 'react';
import './ProfileModals.css';

interface Props {
  currentEmail: string;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
}

const ChangeEmailModal: React.FC<Props> = ({ currentEmail, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    newEmail: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.newEmail)) {
      return alert("Email không hợp lệ!");
    }
    if (formData.newEmail === currentEmail) {
      return alert("Email mới phải khác Email hiện tại!");
    }
    setLoading(true);
    await onSave(formData);
    setLoading(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Thay đổi Email</h3>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label>Email mới</label>
            <input 
              type="email" 
              className="modal-input" 
              value={formData.newEmail}
              onChange={e => setFormData({...formData, newEmail: e.target.value})}
              placeholder="nhap-email-moi@gmail.com"
            />
          </div>
          <div className="form-group">
            <label>Xác nhận mật khẩu</label>
            <input 
              type="password" 
              className="modal-input" 
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
              placeholder="Nhập mật khẩu để xác minh"
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-modal btn-cancel" onClick={onClose}>Hủy</button>
          <button 
            className="btn-modal btn-save" 
            onClick={handleSubmit}
            disabled={loading || !formData.newEmail || !formData.password}
          >
            {loading ? "Đang xử lý..." : "Xác nhận đổi"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeEmailModal;