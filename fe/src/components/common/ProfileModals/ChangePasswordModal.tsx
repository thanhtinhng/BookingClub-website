import React, { useState } from 'react';
import './ProfileModals.css';

interface Props {
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
}

const ChangePasswordModal: React.FC<Props> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      return alert("Mật khẩu xác nhận không khớp!");
    }
    if (formData.newPassword.length < 6) {
      return alert("Mật khẩu mới phải có ít nhất 6 ký tự!");
    }
    setLoading(true);
    await onSave(formData);
    setLoading(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Đổi mật khẩu</h3>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label>Mật khẩu hiện tại</label>
            <input 
              type="password" 
              className="modal-input" 
              value={formData.currentPassword}
              onChange={e => setFormData({...formData, currentPassword: e.target.value})}
              placeholder="Nhập mật khẩu cũ"
            />
          </div>
          <div className="form-group">
            <label>Mật khẩu mới</label>
            <input 
              type="password" 
              className="modal-input" 
              value={formData.newPassword}
              onChange={e => setFormData({...formData, newPassword: e.target.value})}
              placeholder="Ít nhất 6 ký tự"
            />
          </div>
          <div className="form-group">
            <label>Xác nhận mật khẩu mới</label>
            <input 
              type="password" 
              className="modal-input" 
              value={formData.confirmPassword}
              onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
              placeholder="Nhập lại mật khẩu mới"
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-modal btn-cancel" onClick={onClose}>Hủy</button>
          <button 
            className="btn-modal btn-save" 
            onClick={handleSubmit}
            disabled={loading || !formData.currentPassword || !formData.newPassword}
          >
            {loading ? "Đang lưu..." : "Cập nhật"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;