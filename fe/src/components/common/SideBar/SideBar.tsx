import react, { useState } from 'react';
import "./SideBar.css";
import { LayoutDashboard, LogOut, Settings, Ticket, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { logoutApi } from '../../../services/auth.api';
import { useAuth } from '../../../contexts/AuthContext';
const SideBar: React.FC = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard' },
    { icon: Ticket, label: 'My Bookings' },
    { icon: User, label: 'Profile' },
    { icon: Settings, label: 'Settings' },
  ];
const [activeTab, setActiveTab] = useState('My Bookings');

  // Ham logout
  const handleLogout = async () => {
  // Implementation for logout
  try{
    await logoutApi();
    setUser(null);
    alert("Đăng xuất thành công");
    navigate("/login");
  }catch(error) {
    console.error("Logout failed:", error);
    setUser(null); // Dù logout thất bại, vẫn setUser về null để cập nhật UI
  }
};
return (
    
    <aside className="sidebar">
        <div className="sidebar-logo-section">
          <h1 className="sidebar-title">CourtMaster</h1>
          <p className="sidebar-subtitle">Player Portal</p>
        </div>

        <nav className="nav-menu">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={`nav-item ${
                activeTab === item.label ? 'nav-item-active' : 'nav-item-inactive'
              }`}
            >
              <item.icon size={20} />
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <button className="sign-out-btn" onClick={() => handleLogout()}>
          <LogOut size={20} />
          <span className="nav-label">Đăng xuất</span>
        </button>
      </aside>

);
};

export default SideBar;