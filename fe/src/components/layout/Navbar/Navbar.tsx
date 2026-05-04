import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/me">Me</Link>
      <Link to="/court-detail-demo">Court Detail</Link>
      <Link to="/BookingTest"> BookingTest</Link>
    </nav>
  )
}

export default Navbar
