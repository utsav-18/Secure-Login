import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUsername(payload.username);
      } catch {
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-indigo-900 to-black text-white">

      {/* 🔹 Navbar */}
      <div className="flex justify-between items-center px-8 py-4 bg-white/10 backdrop-blur-md">
        <h1 className="text-xl font-bold">My Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-1 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      {/* 🔹 Main Content */}
      <div className="flex flex-col items-center justify-center mt-16 px-4">

        {/* Welcome Card */}
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
          
          <h2 className="text-2xl font-bold mb-2">
            Welcome, {username || "User"} 👋
          </h2>

          <p className="text-gray-300 mb-6">
            You are successfully logged in.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-indigo-500/20 p-4 rounded-xl">
              <h3 className="text-lg font-semibold">Projects</h3>
              <p className="text-2xl font-bold">12</p>
            </div>

            <div className="bg-green-500/20 p-4 rounded-xl">
              <h3 className="text-lg font-semibold">Tasks</h3>
              <p className="text-2xl font-bold">34</p>
            </div>

            <div className="bg-yellow-500/20 p-4 rounded-xl">
              <h3 className="text-lg font-semibold">Messages</h3>
              <p className="text-2xl font-bold">5</p>
            </div>

            <div className="bg-pink-500/20 p-4 rounded-xl">
              <h3 className="text-lg font-semibold">Notifications</h3>
              <p className="text-2xl font-bold">3</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;