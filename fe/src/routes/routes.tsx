import { Routes, Route } from "react-router-dom"
import Login from "../pages/Login/Login.tsx"
import Register from "../pages/Register/Register"
import Me from "../pages/Me/Me"
import CourtDetailGalleryDemo from "../pages/CourtDetail/CourtDetailGalleryDemo"
import CheckoutPage from "../pages/CheckoutPage/CheckoutPage.tsx"
import CourtSearch from "../pages/CourtSearch/CourtSearch"
import Booking from "../pages/BookingTest/Booking.tsx"
import BookingTest from "../pages/BookingForm/BookingTest.tsx"
import PaymentSuccess from "../pages/Payment/PaymentSuccess.tsx"
import PaymentFailed from "../pages/Payment/PaymentFailed.tsx"

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/me" element={<Me />} />
      <Route path="/court-detail-demo" element={<CourtDetailGalleryDemo />} />
      <Route path="/BookingTest" element={<BookingTest />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/search" element={<CourtSearch />} />
      <Route path="/complexes/:complexId/booking" element={<Booking />} />
      <Route path="/complexes/:complexId/booking/confirm" element={<CheckoutPage />} />
      <Route path="/courts/search" element={<CourtSearch />} />
      <Route path="/payment/success" element={<PaymentSuccess />} />
      <Route path="/payment/failed" element={<PaymentFailed />} />
    </Routes>
  )
}

export default AppRoutes
