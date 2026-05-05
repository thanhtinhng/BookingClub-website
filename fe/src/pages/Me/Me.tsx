import { useAuth } from "../../contexts/authContext";
import { logoutApi } from "../../services/auth.api";
import { useNavigate } from "react-router";

function Home() {
  const { user, setUser, loading  } = useAuth();
  console.log("User in Home:", user);
  console.log("Loading in Home:", loading);

  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;

   if (!user) return <p>Not logged in</p>;

const handleLogout = async () => {
  // Implementation for logout
  try{
    await logoutApi();
    setUser(null);
    alert("Đăng xuất thành công");
    navigate("/login");
  }catch(error) {
    console.error("Logout failed:", error);
    setUser(null); // Dù logout thất bại, vẫn setUser về null để cập nhật UI
  }

};

  return (
    <div>
      <h1>Home Page</h1>

      {user ? (
        <div>
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Phone:</b> {user.phone}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button 
      onClick={handleLogout}
      style={{ padding: '8px 16px', backgroundColor: '#ff4d4f', color: '#fff', border: 'none', cursor: 'pointer' }}
    >
      Đăng xuất
    </button>
    </div>
  );
}

export default Home;
