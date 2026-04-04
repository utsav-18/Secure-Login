import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Bell,
  Search,
  Activity,
  TrendingUp,
  CreditCard,
  Sparkles,
} from "lucide-react";

const randomFacts = [
  "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.",
  "Octopuses have three hearts: two pump blood to the gills, and one pumps it to the rest of the body.",
  "Bananas are curved because they grow towards the sun in a process called negative geotropism.",
  "A day on Venus is longer than a year on Venus.",
  "The shortest war in history lasted just 38 minutes between Britain and Zanzibar on August 27, 1896.",
];

function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [fact, setFact] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    } else {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUsername(payload.username);
      } catch (err) {
        navigate("/");
      }
    }
    
    // Set a random fact on mount
    setFact(randomFacts[Math.floor(Math.random() * randomFacts.length)]);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-950 text-white flex flex-col hidden md:flex h-screen sticky top-0">
        <div className="p-6 text-2xl font-bold tracking-wider flex items-center gap-2 border-b border-indigo-900/50">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
            <LayoutDashboard size={20} className="text-white" />
          </div>
          NexusDash
        </div>
        
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-indigo-900/50 text-indigo-200 rounded-xl transition-colors">
            <LayoutDashboard size={20} />
            <span className="font-medium">Dashboard</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 text-indigo-300 hover:text-white rounded-xl transition-colors">
            <Users size={20} />
            <span className="font-medium">Audience</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 text-indigo-300 hover:text-white rounded-xl transition-colors">
            <Activity size={20} />
            <span className="font-medium">Analytics</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 text-indigo-300 hover:text-white rounded-xl transition-colors">
            <Settings size={20} />
            <span className="font-medium">Settings</span>
          </a>
        </nav>

        <div className="p-4 border-t border-indigo-900/50">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-indigo-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Log out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-neutral-200 flex items-center justify-between px-8 sticky top-0 z-10 w-full">
          <div className="relative w-96 hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-100/50 border border-transparent focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-sm rounded-xl outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-6 ml-auto">
            <button className="relative text-neutral-500 hover:text-neutral-800 transition-colors">
              <Bell size={22} />
              <span className="absolute 0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-neutral-200"></div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
                {username ? username.charAt(0).toUpperCase() : "U"}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-neutral-800">{username}</p>
                <p className="text-xs text-neutral-500">Admin User</p>
              </div>
            </div>
            {/* Mobile menu button (could add logic later) */}
            <button 
              onClick={handleLogout}
              className="md:hidden text-neutral-500 p-2 hover:bg-neutral-100 rounded-lg"
            >
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 space-y-8 overflow-y-auto w-full">
          {/* Welcome Banner */}
          <div className="bg-white rounded-2xl p-8 border border-neutral-200 shadow-sm relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="relative z-10 space-y-2">
              <h1 className="text-3xl font-bold text-neutral-800">
                Welcome back, {username}! 👋
              </h1>
              <p className="text-neutral-500">
                Here is what's happening with your projects today.
              </p>
            </div>
            
            {/* Random Fact Box */}
            <div className="relative z-10 w-full md:w-96 bg-indigo-50 border border-indigo-100 rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-2 text-indigo-700 font-semibold mb-2">
                <Sparkles size={16} className="text-yellow-500" />
                Random Fact
              </div>
              <p className="text-sm text-indigo-900/80 leading-relaxed italic">
                "{fact}"
              </p>
            </div>

            {/* Decorative background circle */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users size={24} />
                </div>
                <span className="flex items-center gap-1 text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                  <TrendingUp size={14} /> +12.5%
                </span>
              </div>
              <h3 className="text-neutral-500 text-sm font-medium">Total Users</h3>
              <p className="text-3xl font-bold text-neutral-800 mt-1">45,231</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CreditCard size={24} />
                </div>
                <span className="flex items-center gap-1 text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                  <TrendingUp size={14} /> +8.2%
                </span>
              </div>
              <h3 className="text-neutral-500 text-sm font-medium">Monthly Revenue</h3>
              <p className="text-3xl font-bold text-neutral-800 mt-1">$24,500</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Activity size={24} />
                </div>
                <span className="flex items-center gap-1 text-sm font-medium text-rose-600 bg-rose-50 px-2 py-1 rounded-md">
                   -2.4%
                </span>
              </div>
              <h3 className="text-neutral-500 text-sm font-medium">Active Sessions</h3>
              <p className="text-3xl font-bold text-neutral-800 mt-1">1,204</p>
            </div>
          </div>
          
          {/* Bottom section layout placeholder */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm min-h-80 flex flex-col justify-center items-center text-neutral-400 border-dashed">
                <Activity size={48} className="mb-4 opacity-50" />
                <p>Activity Chart Visualization</p>
             </div>
             <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm min-h-80">
                <h3 className="font-semibold text-neutral-800 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="w-2 h-2 mt-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></div>
                      <div>
                        <p className="text-sm font-medium text-neutral-800">User logged in</p>
                        <p className="text-xs text-neutral-500">Just now</p>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default Dashboard;