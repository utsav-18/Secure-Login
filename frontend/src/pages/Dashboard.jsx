import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 text-white">
      
      <h1 className="text-3xl font-bold mb-4">
        Welcome to Dashboard 🎉
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