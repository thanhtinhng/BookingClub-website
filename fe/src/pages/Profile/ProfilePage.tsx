import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, type User } from "../../contexts/AuthContext";
import { logoutApi } from "../../services/auth.api";
import { Image, Map, Award, Target, SquarePen } from 'lucide-react';
import "./ProfilePage.css";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  
  // GỌI CONTEXT LẤY DATA
  const { user, setUser, loading } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<User>>({});

  // --- STATE CHO AVATAR ---
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // DỌN RÁC CHỐNG MEMORY LEAK
  useEffect(() => {
    return () => {
      if (avatarPreview && avatarPreview.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  // ĐỔ DATA TỪ CONTEXT VÀO FORM KHI LOAD XONG
  useEffect(() => {
    if (user) {
      setFormData(user);
      setAvatarPreview(user.avatar || null);
    }
  }, [user]);

  // CHẶN NGƯỜI CHƯA ĐĂNG NHẬP
  useEffect(() => {
    if (!loading && !user) {
      alert("Bạn chưa đăng nhập");
      navigate("/login");
    }
  }, [user, loading, navigate]);

  // --- CÁC HÀM XỬ LÝ SỰ KIỆN ---

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Lỗi: Vui lòng chỉ tải lên file hình ảnh!");
        return; 
      }

      const MAX_SIZE = 5 * 1024 * 1024; // 5MB
      if (file.size > MAX_SIZE) {
        alert("Lỗi: Kích thước ảnh quá lớn! Vui lòng chọn ảnh dưới 5MB.");
        return; 
      }

      setAvatarFile(file); 
      setAvatarPreview(URL.createObjectURL(file)); 
    }
  };

  const handleDeleteAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = ""; 
  };

const handleLogout = async () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      try {
        await logoutApi(); 
      } catch (error) {
        console.error("Lỗi khi gọi API logout:", error);
      } finally {
        localStorage.removeItem("access_token");
        localStorage.removeItem("isLoggedIn"); 
        sessionStorage.clear();
        navigate("/login");
      }
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (user) {
      setFormData(user); 
      setAvatarPreview(user.avatar || null); 
      setAvatarFile(null); 
    }
  };

  const handleSave = async () => {
    try {
      const submitData = new FormData();
      submitData.append("name", formData.name || "");
      submitData.append("dob", formData.dob || "");
      submitData.append("location", formData.location || "");
      submitData.append("sportLevel", formData.sportLevel || "");
      submitData.append("goal", formData.goal || "");
      
      if (avatarFile) {
        submitData.append("avatar", avatarFile); 
      } else if (avatarPreview === null) {
        submitData.append("removeAvatar", "true"); 
      }

      console.log( Object.fromEntries(submitData.entries()));
      
      setUser({ ...user, ...formData, avatar: avatarPreview } as User); 
      setIsEditing(false); 
      alert("Cập nhật hồ sơ thành công!");
    } catch (error) {
      alert("Lỗi khi cập nhật!");
    }
  };

  if (loading) return <div className="loading-text" style={{textAlign: "center", padding: "50px"}}>Đang tải dữ liệu...</div>;
  if (!user) return null;

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        
        {/* HEADER */}
        <div className="profile-header">
          <h2>Thiết lập hồ sơ cá nhân</h2>
          {!isEditing && (
            <button className="btn-update-mode" onClick={() => setIsEditing(true)}>
              Cập nhật
            </button>
          )}
        </div>

        {/* BẢNG THÔNG TIN */}
        <div className="profile-table">
          
          {/* Row: Ảnh đại diện */}
          <div className="profile-row">
            <div className="profile-col-label">Ảnh đại diện</div>
            <div className="profile-col-value avatar-col">
              <div className="avatar-circle">
                {avatarPreview ? (
                  <img 
                    src={avatarPreview} 
                    alt="Avatar" 
                    style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} 
                  />
                ) : (
                  <Image size={28} color="#5a6b8a" />
                )}
              </div>
              
              {isEditing && (
                <div className="avatar-actions">
                  <input 
                    type="file" 
                    accept="image/*" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    style={{ display: "none" }} 
                  />
                  <button className="btn-upload" onClick={handleUploadClick}>Tải lên</button>
                  <button className="btn-delete" onClick={handleDeleteAvatar}>Xóa</button>
                </div>
              )}
            </div>
          </div>

          {/* Row: Tên hiển thị */}
          <div className="profile-row">
            <div className="profile-col-label">Tên hiển thị</div>
            <div className="profile-col-value">
              {isEditing ? (
                <input type="text" name="name" value={formData.name || ""} onChange={handleChange} className="edit-input" />
              ) : (
                <span className="read-only-text">{user.name}</span>
              )}
            </div>
          </div>

          {/* Row: Email (Không cho sửa) */}
          <div className="profile-row">
            <div className="profile-col-label">Email</div>
            <div className="profile-col-value">
              <span className="read-only-text email-text">{user.email}</span>
            </div>
          </div>

          {/* Row: Ngày sinh */}
          <div className="profile-row">
            <div className="profile-col-label">Ngày sinh</div>
            <div className="profile-col-value">
              {isEditing ? (
                <input type="date" name="dob" value={formData.dob || ""} onChange={handleChange} className="edit-input" />
              ) : (
                <span className="read-only-text">{user.dob ? user.dob.split('-').reverse().join('/') : "Chưa cập nhật"}</span>
              )}
            </div>
          </div>

          {/* Row: Cá nhân hóa */}
          <div className="profile-row">
            <div className="profile-col-label">Cá nhân hóa</div>
            <div className="profile-col-value personal-col">
              <div className="personal-item">
                <Map size={18} />
                <div className="personal-info">
                  <strong>Vị trí của bạn:</strong>
                  {isEditing ? (
                    <input type="text" name="location" value={formData.location || ""} onChange={handleChange} className="edit-input small-input" />
                  ) : (
                    <span>{user.location || "Chưa có dữ liệu"}</span>
                  )}
                </div>
              </div>

              <div className="personal-item">
                <Award size={18} />
                <div className="personal-info">
                  <strong>Môn thể thao và trình độ:</strong>
                  {isEditing ? (
                    <input type="text" name="sportLevel" value={formData.sportLevel || ""} onChange={handleChange} className="edit-input small-input" />
                  ) : (
                    <span>{user.sportLevel || "Chưa có dữ liệu"}</span>
                  )}
                </div>
              </div>

              <div className="personal-item">
                <Target size={18} />
                <div className="personal-info">
                  <strong>Mục tiêu:</strong>
                  {isEditing ? (
                    <input type="text" name="goal" value={formData.goal || ""} onChange={handleChange} className="edit-input small-input" />
                  ) : (
                    <span>{user.goal || "Chưa có dữ liệu"}</span>
                  )}
                </div>
              </div>
              
              {!isEditing && (
                <span className="corner-edit-icon">
                  <SquarePen size={18} color="#5a6b8a" />
                </span>
              )}
            </div>
          </div>

        </div>

        {/* FOOTER: Nút Lưu & Hủy */}
        {isEditing && (
          <div className="profile-footer">
            <button className="btn-cancel-action" onClick={handleCancel}>Hủy</button>
            <button className="btn-save-action" onClick={handleSave}>Lưu thay đổi</button>
          </div>
        )}
        
        {/* Nút Đăng Xuất */}
        {!isEditing && (
          <div style={{ padding: "20px", textAlign: "right", backgroundColor: "#aeb4be" }}>
            <button 
              onClick={handleLogout} 
              style={{ padding: "10px 24px", backgroundColor: "white", color: "#ef4444", border: "1px solid #ef4444", borderRadius: "6px", fontWeight: "bold", cursor: "pointer", transition: "0.2s" }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#fee2e2"; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "white"; }}
            >
              Đăng Xuất
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProfilePage;