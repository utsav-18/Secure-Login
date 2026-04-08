import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const stats = [
    { title: "Projects", value: 12, note: "2 updated today" },
    { title: "Tasks", value: 34, note: "8 pending" },
    { title: "Messages", value: 5, note: "2 unread" },
    { title: "Notifications", value: 3, note: "1 urgent" },
  ];

  const activities = [
    "Profile settings updated",
    "New task assigned in Product Team",
    "Weekly report generated",
  ];

  const highlights = [
    "Secure login session active",
    "All core services online",
    "No critical alerts right now",
  ];

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
    <div className="min-h-screen bg-indigo-950 text-white">
      <header className="border-b border-indigo-800 bg-indigo-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-2xl font-bold">Secure Workspace</h1>
            <p className="text-sm text-indigo-200">Welcome back, {username || "User"}</p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-indigo-700 bg-indigo-900/60 p-6 shadow-xl sm:p-8">
          <p className="text-sm text-indigo-200">One Place. One View.</p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Manage your work from a single landing page</h2>
          <p className="mt-3 max-w-2xl text-indigo-100">
            This page gives you a quick snapshot of what matters most so you can jump into work without switching between screens.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600">
              Start New Project
            </button>
            <button className="rounded-md border border-indigo-300/40 px-4 py-2 text-sm font-medium text-indigo-100 hover:bg-indigo-800/70">
              View Tasks
            </button>
          </div>
        </section>

        <section className="mt-6 rounded-xl border border-indigo-300/30 bg-white p-5 text-slate-900 shadow-xl">
          <h3 className="text-lg font-semibold">Overview</h3>
          <p className="mt-1 text-sm text-slate-600">Your account is active and everything is running normally.</p>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <div key={item.title} className="rounded-lg border border-indigo-100 bg-indigo-50 p-4">
                <p className="text-sm font-medium text-slate-600">{item.title}</p>
                <p className="mt-1 text-2xl font-bold text-slate-900">{item.value}</p>
                <p className="mt-1 text-xs text-slate-500">{item.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-indigo-300/30 bg-white p-5 text-slate-900 shadow-xl">
            <h3 className="text-base font-semibold">Highlights</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {highlights.map((item) => (
                <li key={item} className="rounded-md border border-indigo-100 bg-indigo-50 px-3 py-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-indigo-300/30 bg-white p-5 text-slate-900 shadow-xl">
            <h3 className="text-base font-semibold">Recent Activity</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {activities.map((activity) => (
                <li key={activity} className="rounded-md border border-indigo-100 bg-indigo-50 px-3 py-2">
                  {activity}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;