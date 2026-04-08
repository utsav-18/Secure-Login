import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const categories = [
    { name: "Electronics", desc: "Latest gadgets and accessories" },
    { name: "Fashion", desc: "Trending outfits for every season" },
    { name: "Home", desc: "Comfort and decor essentials" },
    { name: "Beauty", desc: "Daily care and premium products" },
  ];

  const products = [
    { name: "Wireless Headphones", price: "$99", tag: "Best Seller" },
    { name: "Smart Watch", price: "$149", tag: "New Arrival" },
    { name: "Running Shoes", price: "$79", tag: "Limited" },
    { name: "Skin Care Kit", price: "$59", tag: "Top Rated" },
  ];

  const benefits = [
    "Free shipping on orders above $50",
    "Secure checkout with instant confirmation",
    "Easy returns within 7 days",
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
            <h1 className="text-2xl font-bold">ShopSphere</h1>
            <p className="text-sm text-indigo-200">Welcome, {username || "Guest"}</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="rounded-md border border-indigo-300/40 px-4 py-2 text-sm font-medium text-indigo-100 hover:bg-indigo-800/70">
              Cart (2)
            </button>
            <button
              onClick={handleLogout}
              className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-indigo-700 bg-indigo-900/60 p-6 shadow-xl sm:p-8">
          <p className="text-sm text-indigo-200">New Season Collection</p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Discover products made for everyday life</h2>
          <p className="mt-3 max-w-2xl text-indigo-100">
            Explore curated picks across fashion, electronics, and home essentials. Fast delivery, trusted quality, and simple checkout.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600">
              Shop Now
            </button>
            <button className="rounded-md border border-indigo-300/40 px-4 py-2 text-sm font-medium text-indigo-100 hover:bg-indigo-800/70">
              View Offers
            </button>
          </div>
        </section>

        <section className="mt-6 rounded-xl border border-indigo-300/30 bg-white p-5 text-slate-900 shadow-xl">
          <h3 className="text-lg font-semibold">Shop by Category</h3>
          <p className="mt-1 text-sm text-slate-600">Choose a category and start exploring products.</p>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((item) => (
              <div key={item.name} className="rounded-lg border border-indigo-100 bg-indigo-50 p-4">
                <p className="text-base font-semibold text-slate-900">{item.name}</p>
                <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-indigo-300/30 bg-white p-5 text-slate-900 shadow-xl">
            <h3 className="text-base font-semibold">Featured Products</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              {products.map((item) => (
                <div key={item.name} className="flex items-center justify-between rounded-md border border-indigo-100 bg-indigo-50 px-3 py-3">
                  <div>
                    <p className="font-medium text-slate-900">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.tag}</p>
                  </div>
                  <p className="font-semibold text-indigo-700">{item.price}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-indigo-300/30 bg-white p-5 text-slate-900 shadow-xl">
            <h3 className="text-base font-semibold">Why Shop With Us</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {benefits.map((item) => (
                <li key={item} className="rounded-md border border-indigo-100 bg-indigo-50 px-3 py-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-6 rounded-xl border border-indigo-700 bg-indigo-900/60 p-5 shadow-xl">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-xl font-semibold">Limited Time Offer</h3>
              <p className="mt-1 text-sm text-indigo-100">Get 20% off on your first order with code: WELCOME20</p>
            </div>
            <button className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-indigo-900 hover:bg-indigo-100">
              Claim Offer
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;