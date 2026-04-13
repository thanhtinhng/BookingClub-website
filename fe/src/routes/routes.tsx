import { Routes, Route } from "react-router-dom"
// import Home from "../pages/Home"
import Login from "../pages/Login/Login.tsx"
import Register from "../pages/Register/Register"

function AppRoutes() {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default AppRoutes
