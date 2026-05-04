import { Routes, Route } from "react-router-dom"
// import Home from "../pages/Home"
import Login from "../pages/Login/Login.tsx"
import Register from "../pages/Register/Register"
import Me from "../pages/Me/Me"
import CourtDetailGalleryDemo from "../pages/CourtDetail/CourtDetailGalleryDemo"
import BookingTest from "../pages/BookingForm/BookingTest.tsx"
<<<<<<< HEAD
import CheckoutPage from "../pages/CheckoutPage/CheckoutPage.tsx"
import CourtSearch from "../pages/CourtSearch/CourtSearch"
=======
import CheckoutPage from "../pages/CheckoutPage/CheckoutPage.tsx" 
>>>>>>> 167370774dd8a261a2abb17c9bac4e8659c73689

function AppRoutes() {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/me" element={<Me />} />
      <Route path="/court-detail-demo" element={<CourtDetailGalleryDemo />} />
      <Route path="/BookingTest" element={<BookingTest />} />
<<<<<<< HEAD
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/courts/search" element={<CourtSearch />} />
=======
      <Route path="/checkout" element={<CheckoutPage/>} />
>>>>>>> 167370774dd8a261a2abb17c9bac4e8659c73689
    </Routes>
  )
}

export default AppRoutes
