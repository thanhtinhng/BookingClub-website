import axios from "./utils/axios.customize"
import { useEffect, useState } from 'react'
import { Outlet, useLocation } from "react-router-dom"
import AppRoutes from "./routes/routes"
import Footer from "./components/layout/Footer/Footer"
import Navbar from "./components/layout/Navbar/Navbar"

function App() {
  const location = useLocation();

  const hideFooterRoutes = ["/map"]; // bỏ qua footer ở trang /map

  const shouldHideFooter = hideFooterRoutes.some(
    (route) =>
      location.pathname.startsWith(
        route
      )
  );
  return (
    <div className="app-layout">
      <Navbar />

      <main className="main-content">
        <AppRoutes />
      </main>

      {!shouldHideFooter && (
        <Footer />
      )}
    </div>
  );
}

export default App
