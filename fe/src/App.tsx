import axios from "./utils/axios.customize"
import { useEffect, useState } from 'react'
import { Routes, Route } from "react-router-dom"
import AppRoutes from "./routes/routes"
import Footer from "./components/layout/Footer/Footer"
import Navbar from "./components/layout/Navbar/Navbar"

function App() {
  return (
    <div className="app-layout">
      <Navbar />

      <main className="main-content">
        <AppRoutes />
      </main>

      <Footer />
    </div>
  );
}

export default App
