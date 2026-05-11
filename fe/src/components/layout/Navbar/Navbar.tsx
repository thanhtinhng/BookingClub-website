import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/courts/search">Tìm kiếm sân</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/me">Me</Link>
      <Link to="/court-detail-demo">Court Detail</Link>
      
      {/* ===== PHẦN ĐÃ MERGE CHUẨN ===== */}
      <Link to="/profile">Profile</Link> {/* Link tới trang của bạn */}
      <Link to="/complexes/65f1a2b3c4d5e6f7a8b90123/booking">TestBooking</Link>
      {/* trang booking phải được chuyển từ trang danh sách complex:
      <Link to={`/complexes/${complex._id}/booking`}>
        Đặt sân
      </Link> */}
      {/* ================================ */}
      
    </nav>
  )
}

export default Navbar