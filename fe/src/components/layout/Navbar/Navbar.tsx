import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import "./Navbar.css"
import avatarPlaceholder from "../../../assets/avatar-placeholder.png";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

function Navbar() {
  const { user } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (

    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          BookingClub
        </Link>

        <div className={`navbar-right ${mobileMenuOpen ? "active" : ""}`}>
          <nav className="navbar-links">

            <Link to="/complexes/search">
              Tìm kiếm sân
            </Link>

            <Link to="/bookings">
              Sân đã đặt
            </Link>

            <Link to="/map">
              Bản đồ
            </Link>

            <Link to="/complexes/san-bong-thang-long">
              Test Booking
            </Link>
            <Link to="/management">Management</Link>
            {/* Sau này có thêm thì thêm vào link nữa */}
          </nav>

          {!user ? (
            <div className="navbar-actions">
              <Link
                to="/register"
                className="register-link-nav"
              >
                Đăng ký
              </Link>

              <Link
                to="/login"
                className="login-btn-nav"
              >
                Đăng nhập
              </Link>
            </div>
          ) : (
            <Link to="/profile" className="profile-btn">
              <img
                src={
                  user.avatar_url || avatarPlaceholder
                }
                alt="avatar"
                className="profile-avatar"
              />

              <span>{user.name}</span>
            </Link>
          )}
        </div>
        <button
          className="menu-toggle"
          onClick={() =>
            setMobileMenuOpen(!mobileMenuOpen)
          }
        >
          {mobileMenuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>
    </header>
  );
}

export default Navbar;
