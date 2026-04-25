import { Routes, Route } from "react-router-dom"
// import Home from "../pages/Home"
import Login from "../pages/Login/Login.tsx"
import Register from "../pages/Register/Register"
import Me from "../pages/Me/Me"
import CourtDetailGalleryDemo from "../pages/CourtDetail/CourtDetailGalleryDemo"
import ComplexDetail from "../pages/ComplexDetail/ComplexDetail.tsx"

function AppRoutes() {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/me" element={<Me />} />
      <Route path="/court-detail-demo" element={<CourtDetailGalleryDemo />} />
      <Route path="/complex-detail" element={<ComplexDetail />} />
    </Routes>
  )
}

export default AppRoutes
