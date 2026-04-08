import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const stats = [
    { label: "Projects", value: 12, hint: "+2 this week", tone: "bg-cyan-500/15 border-cyan-300/30" },
    { label: "Tasks", value: 34, hint: "8 due today", tone: "bg-amber-500/15 border-amber-300/30" },
    { label: "Messages", value: 5, hint: "2 unread", tone: "bg-emerald-500/15 border-emerald-300/30" },
    {
      label: "Notifications",
      value: 3,
      hint: "1 high priority",
      tone: "bg-rose-500/15 border-rose-300/30",
    },
  ];

  const todaysPlan = ["Review pull requests", "Ship onboarding updates", "Sync with design team"];

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
    <div className="min-h-screen overflow-hidden bg-slate-950 text-slate-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-28 top-24 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute right-0 top-0 h-96 w-96 translate-x-1/3 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-500/15 blur-3xl" />
      </div>

      <header className="relative z-10 border-b border-white/10 bg-slate-900/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-8">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">Workspace</p>
            <h1 className="text-2xl font-black tracking-tight md:text-3xl">Command Center</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-slate-200 sm:block">
              Signed in as <span className="font-semibold text-white">{username || "User"}</span>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-full border border-rose-300/40 bg-rose-500/20 px-5 py-2 text-sm font-semibold text-rose-100 transition hover:-translate-y-0.5 hover:bg-rose-500/30"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto grid max-w-6xl gap-6 px-6 py-8 md:grid-cols-[1.3fr_1fr] md:px-8 md:py-10">
        <section className="rounded-3xl border border-white/15 bg-white/5 p-6 shadow-2xl backdrop-blur-xl md:p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-amber-300">Today</p>
          <h2 className="mt-2 text-3xl font-black leading-tight md:text-4xl">
            Welcome back,
            <span className="block bg-gradient-to-r from-cyan-200 via-white to-amber-200 bg-clip-text text-transparent">
              {username || "User"}
            </span>
          </h2>

          <p className="mt-4 max-w-xl text-slate-300">
            Everything is synced and ready. Track your momentum, check priorities, and keep execution smooth.
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {stats.map((item) => (
              <article
                key={item.label}
                className={`rounded-2xl border p-4 transition hover:-translate-y-0.5 ${item.tone}`}
              >
                <p className="text-sm uppercase tracking-wide text-slate-300">{item.label}</p>
                <p className="mt-2 text-3xl font-extrabold text-white">{item.value}</p>
                <p className="mt-1 text-xs text-slate-200">{item.hint}</p>
              </article>
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-3xl border border-white/15 bg-slate-900/65 p-6 backdrop-blur-xl">
            <h3 className="text-lg font-bold text-white">Today's Focus</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-200">
              {todaysPlan.map((task) => (
                <li key={task} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-3">
                  <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-cyan-300" />
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-3xl border border-white/15 bg-gradient-to-br from-amber-500/20 via-transparent to-cyan-500/20 p-6">
            <h3 className="text-lg font-bold text-white">System Status</h3>
            <p className="mt-2 text-sm text-slate-200">Secure session is active and all services are operational.</p>

            <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-white/15">
              <div className="h-full w-[88%] rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300" />
            </div>
            <p className="mt-2 text-xs text-slate-200">88% productivity target reached</p>
          </section>
        </aside>
      </main>
    </div>
  );
}

export default Dashboard;