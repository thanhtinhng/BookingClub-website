import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMeApi } from "../../services/auth.api";

interface User {
  _id: string;
  email: string;
  phone: string;
  name: string;
}

function Home() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      alert("Bạn chưa đăng nhập");
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await getMeApi();
        setUser(res);
      } catch (error: any) {
        alert("Hết phiên đăng nhập. Vui lòng đăng nhập lại");
        navigate("/login");
      }
    };

    fetchUser();
  }, []);

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
    </div>
  );
}

export default Home;
