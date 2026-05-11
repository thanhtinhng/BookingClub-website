import { Routes, Route } from "react-router-dom"
// import Home from "../pages/Home"
import Login from "../pages/Login/Login.tsx"
import Register from "../pages/Register/Register"
import Me from "../pages/Me/Me"
import CourtDetailGalleryDemo from "../pages/CourtDetail/CourtDetailGalleryDemo"
import CheckoutPage from "../pages/CheckoutPage/CheckoutPage.tsx" 
import ProfilePage from "../pages/Profile/ProfilePage.tsx"
import CourtSearch from "../pages/CourtSearch/CourtSearch"
import Booking from "../pages/BookingTest/Booking.tsx"
import PaymentSuccess from "../pages/Payment/PaymentSuccess.tsx"

function AppRoutes() {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/me" element={<Me />} />
      <Route path="/court-detail-demo" element={<CourtDetailGalleryDemo />} />
      
      {/* ===== PHẦN ĐÃ MERGE CHUẨN ===== */}
      <Route path="/complexes/:complexId/booking" element={<Booking />} />
      <Route path="/complexes/:complexId/booking/confirm" element={<CheckoutPage />} />
      <Route path="/profile" element={<ProfilePage />} /> {/* Đổi URL thành /profile */}
      {/* ================================ */}
      
      <Route path="/courts/search" element={<CourtSearch />} />
      <Route path="/payment/success" element={<PaymentSuccess />} />
    </Routes>
  )
}

export default AppRoutes