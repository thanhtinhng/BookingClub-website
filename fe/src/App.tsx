import axios from "./utils/axios.customize"
import { useEffect, useState } from 'react'
import { Routes, Route } from "react-router-dom"
import AppRoutes from "./routes/routes"
import Navbar from "./components/layout/Navbar/Navbar"

function App() {

  return (
    <>
      <Navbar />
      <AppRoutes />
    </>
  )
}

export default App
