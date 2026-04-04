import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    } else {
      // 🧠 decode token
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUsername(payload.username);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-indigo-950 text-white">
      
      <h1 className="text-3xl font-bold mb-4">
        Welcome {username} 🎉
      </h1>

      <button
        onClick={handleLogout}
        className="bg-white text-black px-4 py-2 rounded-lg"
      >
        Logout
      </button>

    </div>
  );
}

export default Dashboard;