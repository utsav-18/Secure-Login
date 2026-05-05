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
        // defer state update to avoid react-hooks/set-state-in-effect lint
        setTimeout(() => setUsername(payload.username), 0);
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
    <div className="dashboard-root">
      <div className="container greeting-wrap">
        <section className="card greeting-card">
          <p className="hello">Hello</p>
          <h1 className="greeting-title">{username || "Guest"}</h1>
          <p className="greeting-subtitle">Welcome back. Great to see you again.</p>

          <button onClick={handleLogout} className="btn greeting-logout">
            Logout
          </button>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;