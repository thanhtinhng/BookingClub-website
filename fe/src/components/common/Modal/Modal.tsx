import React from 'react';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;           // Trạng thái đóng/mở
  onClose: () => void;        // Hàm để tắt popup khi bấm dấu X hoặc bấm ra ngoài
  children: React.ReactNode;  // Đây là nơi cái "Ruột" (ReviewForm) sẽ hiển thị
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Nếu không mở thì không vẽ gì ra màn hình cả

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* stopPropagation để khi bấm vào cái khung trắng nó không bị tự đóng */}
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
