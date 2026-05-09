import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, type User } from "../../contexts/AuthContext";
import { logoutApi } from "../../services/auth.api";
import { Image, Map, Award, Target, Lock, ShieldAlert } from 'lucide-react';
import "./ProfilePage.css";

// Interface nội bộ 
// interface User {
//   _id: string;
//   email: string;
//   phone: string;
//   name: string;
//   status: string;
//   role: string;
//   avatar_url: string;
//   date_of_birth: Date | string;
//   location?: string;
//   sportLevel?: string;
//   goal?: string;
// }

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser, loading } = useAuth();
  
  // Chỉ dùng isEditing cho nhóm thông tin cơ bản
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<User>>({});
  
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clear memory leak
  useEffect(() => {
    return () => {
      if (avatarPreview && avatarPreview.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  // Đổ dữ liệu
  useEffect(() => {
    if (user) {
      setFormData(user);
      setAvatarPreview(user.avatar_url || null);
    }
  }, [user]);

  useEffect(() => {
    if (!loading && !user) {
      alert("Bạn chưa đăng nhập");
      navigate("/login");
    }
  }, [user, loading, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) return alert("Vui lòng chọn file hình ảnh!");
      const MAX_SIZE = 5 * 1024 * 1024;
      if (file.size > MAX_SIZE) return alert("Kích thước ảnh quá lớn! Vui lòng chọn ảnh dưới 5MB.");
      
      setAvatarFile(file); 
      setAvatarPreview(URL.createObjectURL(file)); 
    }
  };

  const handleDeleteAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(null); // Preview null tương đương với việc muốn xóa avatar
    if (fileInputRef.current) fileInputRef.current.value = ""; 
  };

  // ===================== LOGIC KIỂM TRA THAY ĐỔI (DIRTY CHECK) =====================
  const checkIsDirty = () => {
    if (!user) return false;
    
    // 1. Kiểm tra có thay đổi file ảnh không
    if (avatarFile !== null) return true;
    
    // 2. Kiểm tra trường hợp user bấm Xóa ảnh (avatarPreview thành null trong khi gốc có ảnh)
    if (avatarPreview === null && user.avatar_url) return true;

    // 3. Kiểm tra các trường text (name)
    if (formData.name !== user.name) return true;

    // 4. Kiểm tra date_of_birth (Cần format về cùng chuẩn YYYY-MM-DD để so sánh)
    const originDob = user.date_of_birth ? new Date(user.date_of_birth).toISOString().split('T')[0] : "";
    const formDob = formData.date_of_birth ? new Date(formData.date_of_birth).toISOString().split('T')[0] : "";
    if (formDob !== originDob) return true;

    return false;
  };

  // ===================== XỬ LÝ LƯU =====================
  const handleSave = async () => {
    // DIRTY CHECK: Nếu không có gì thay đổi thì tắt form, ko gọi API
    if (!checkIsDirty()) {
      setIsEditing(false);
      return; 
    }

    try {
      const submitData = new FormData();
      submitData.append("name", formData.name || "");
      
      // Xử lý ngày sinh gửi lên BE
      if (formData.date_of_birth) {
        submitData.append("date_of_birth", formData.date_of_birth as string);
      }
      
      // Xử lý Avatar
      if (avatarFile) {
        submitData.append("avatar_url", avatarFile); // Đổi tên field theo backend 
      } else if (avatarPreview === null) {
        submitData.append("removeAvatar", "true"); 
      }

      console.log("Payload gửi đi:", Object.fromEntries(submitData.entries()));
      
      // GIẢ LẬP GỌI API THÀNH CÔNG -> Update Context
      setUser({ ...user, ...formData, avatar_url: avatarPreview } as User); 
      setIsEditing(false); 
      alert("Cập nhật hồ sơ thành công!");
    } catch (error) {
      alert("Lỗi khi cập nhật!");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (user) {
      setFormData(user); 
      setAvatarPreview(user.avatar_url || null); 
      setAvatarFile(null);
    }
  };

  const handleLogout = async () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      try { await logoutApi(); } catch (e) {}
      localStorage.removeItem("access_token");
      localStorage.removeItem("isLoggedIn"); 
      sessionStorage.clear();
      navigate("/login");
    }
  };

  // Hàm hỗ trợ parse Date ra value cho thẻ <input type="date">
  const getFormattedDateForInput = (dateValue: Date | string | undefined) => {
    if (!dateValue) return "";
    try {
      return new Date(dateValue).toISOString().split('T')[0];
    } catch (error) {
      return "";
    }
  };

  if (loading) return <div className="loading-container">Đang tải dữ liệu...</div>;
  if (!user) return null;

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        
        <div className="profile-header">
          <h2>Thiết lập hồ sơ cá nhân</h2>
          {!isEditing && (
            <button className="btn-update-mode" onClick={() => setIsEditing(true)}>Cập nhật cơ bản</button>
          )}
        </div>

        <div className="profile-table">
          {/* ================= NHÓM THÔNG TIN CƠ BẢN (Cho phép Edit cùng lúc) ================= */}
          <div style={{ paddingBottom: '8px', fontWeight: 'bold', color: '#1e3a5f', fontSize: '18px' }}>
            Thông tin cơ bản
          </div>

          <div className="profile-row">
            <div className="profile-col-label">Ảnh đại diện</div>
            <div className="profile-col-value avatar-col">
              <div className="avatar-circle">
                {avatarPreview ? <img src={avatarPreview} alt="Avatar" className="avatar-img" /> : <Image size={24} color="#9ca3af" />}
              </div>
              {isEditing && (
                <div className="avatar-actions">
                  <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden-file-input" />
                  <button className="btn-upload" onClick={handleUploadClick}>Tải lên</button>
                  <button className="btn-delete" onClick={handleDeleteAvatar}>Xóa</button>
                </div>
              )}
            </div>
          </div>

          <div className="profile-row">
            <div className="profile-col-label">Tên hiển thị (Username)</div>
            <div className="profile-col-value">
              {isEditing ? (
                <input type="text" name="name" value={formData.name || ""} onChange={handleChange} className="edit-input" />
              ) : (
                <span className="read-only-text">{user.name}</span>
              )}
            </div>
          </div>

          <div className="profile-row" style={{marginBottom: '20px'}}>
            <div className="profile-col-label">Ngày sinh</div>
            <div className="profile-col-value">
              {isEditing ? (
                <input 
                  type="date" 
                  name="date_of_birth" 
                  value={getFormattedDateForInput(formData.date_of_birth)} 
                  onChange={handleChange} 
                  className="edit-input" 
                />
              ) : (
                <span className="read-only-text">
                  {user.date_of_birth ? new Date(user.date_of_birth).toLocaleDateString('vi-VN') : "Chưa cập nhật"}
                </span>
              )}
            </div>
          </div>

          {/* ================= NHÓM THÔNG TIN NHẠY CẢM (Tách biệt logic Edit) ================= */}
          <div style={{ paddingBottom: '8px', fontWeight: 'bold', color: '#1e3a5f', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            Thông tin bảo mật <ShieldAlert size={18} color="#ef4444" />
          </div>

          <div className="profile-row">
            <div className="profile-col-label">Email</div>
            <div className="profile-col-value" style={{ justifyContent: 'space-between' }}>
              <span className="read-only-text email-text">{user.email}</span>
              {!isEditing && (
                <button 
                  style={{ background: 'none', border: 'none', color: '#3d5a80', cursor: 'pointer', display: 'flex', gap: '4px', alignItems: 'center' }}
                  onClick={() => alert("Tính năng đổi Email cần xác thực Mật khẩu hiện tại (Đang phát triển)")}
                >
                  <Lock size={14} /> Sửa
                </button>
              )}
            </div>
          </div>

          <div className="profile-row" style={{marginBottom: '20px'}}>
            <div className="profile-col-label">Số điện thoại</div>
            <div className="profile-col-value" style={{ justifyContent: 'space-between' }}>
              <span className="read-only-text">{user.phone || "Chưa cập nhật"}</span>
              {!isEditing && (
                <button 
                  style={{ background: 'none', border: 'none', color: '#3d5a80', cursor: 'pointer', display: 'flex', gap: '4px', alignItems: 'center' }}
                  onClick={() => alert("Tính năng đổi Số điện thoại cần xác thực mã OTP (Đang phát triển)")}
                >
                  <Lock size={14} /> Sửa
                </button>
              )}
            </div>
          </div>

          {/* ================= NHÓM CÁ NHÂN HÓA (Chỉ hiển thị tĩnh) ================= */}
          <div style={{ paddingBottom: '8px', fontWeight: 'bold', color: '#1e3a5f', fontSize: '18px' }}>
            Hồ sơ thể thao (Đang phát triển)
          </div>
          <div className="profile-row">
            <div className="profile-col-label" style={{ backgroundColor: '#6b7280' }}>Cá nhân hóa</div>
            <div className="profile-col-value personal-col" style={{ borderColor: '#6b7280' }}>
              <div className="personal-item">
                <Map size={16} />
                <div className="personal-info">
                  <strong>Vị trí:</strong>
                  <span>{user.location || "Chưa có dữ liệu"}</span>
                </div>
              </div>
              <div className="personal-item">
                <Award size={16} />
                <div className="personal-info">
                  <strong>Trình độ:</strong>
                  <span>{user.sportLevel || "Chưa có dữ liệu"}</span>
                </div>
              </div>
              <div className="personal-item">
                <Target size={16} />
                <div className="personal-info">
                  <strong>Mục tiêu:</strong>
                  <span>{user.goal || "Chưa có dữ liệu"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= FOOTER ACTIONS ================= */}
        {isEditing && (
          <div className="profile-footer">
            <button className="btn-cancel-action" onClick={handleCancel}>Hủy</button>
            <button className="btn-save-action" onClick={handleSave}>Lưu thay đổi</button>
          </div>
        )}
        
        {!isEditing && (
          <div className="profile-logout-wrapper">
            <button className="btn-logout" onClick={handleLogout}>Đăng Xuất</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;