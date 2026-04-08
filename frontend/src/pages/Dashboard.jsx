import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { name: "Electronics", desc: "Latest gadgets and accessories" },
    { name: "Fashion", desc: "Trending outfits for every season" },
    { name: "Home", desc: "Comfort and decor essentials" },
    { name: "Beauty", desc: "Daily care and premium products" },
  ];

  const products = [
    { name: "Wireless Headphones", category: "Electronics", price: 99, oldPrice: 129, rating: 4.8, tag: "Best Seller" },
    { name: "Smart Watch", category: "Electronics", price: 149, oldPrice: 189, rating: 4.6, tag: "New Arrival" },
    { name: "Running Shoes", category: "Fashion", price: 79, oldPrice: 99, rating: 4.5, tag: "Limited" },
    { name: "Skin Care Kit", category: "Beauty", price: 59, oldPrice: 79, rating: 4.7, tag: "Top Rated" },
    { name: "Minimal Desk Lamp", category: "Home", price: 45, oldPrice: 59, rating: 4.4, tag: "Popular" },
    { name: "Canvas Travel Bag", category: "Fashion", price: 69, oldPrice: 89, rating: 4.3, tag: "Trending" },
  ];

  const benefits = [
    "Free shipping on orders above $50",
    "Secure checkout with instant confirmation",
    "Easy returns within 7 days",
  ];

  const filteredProducts = products.filter((item) => {
    const search = searchTerm.toLowerCase();
    return item.name.toLowerCase().includes(search) || item.category.toLowerCase().includes(search) || item.tag.toLowerCase().includes(search);
  });

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

        <section className="mt-6 rounded-xl border border-indigo-300/30 bg-white p-5 text-slate-900 shadow-xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-semibold">Search Products</h3>
            <p className="text-sm text-slate-500">{filteredProducts.length} results found</p>
          </div>

          <div className="mt-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by product, category, or tag..."
              className="w-full rounded-md border border-indigo-200 bg-indigo-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-indigo-300/30 bg-white p-5 text-slate-900 shadow-xl lg:col-span-2">
            <h3 className="text-base font-semibold">Featured Products</h3>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((item) => (
                <article key={item.name} className="rounded-lg border border-indigo-100 bg-indigo-50 p-4">
                  <div className="h-32 rounded-md bg-gradient-to-br from-indigo-200 to-indigo-100" />

                  <div className="mt-3 flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-slate-900">{item.name}</p>
                      <p className="text-xs text-slate-500">{item.category}</p>
                    </div>
                    <span className="rounded bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700">{item.tag}</span>
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-sm">
                    <span className="font-semibold text-indigo-700">${item.price}</span>
                    <span className="text-slate-400 line-through">${item.oldPrice}</span>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-xs text-slate-600">Rating: {item.rating}/5</p>
                    <button className="rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700">
                      Add to Cart
                    </button>
                  </div>
                </article>
              ))}

              {filteredProducts.length === 0 && (
                <div className="rounded-lg border border-indigo-100 bg-indigo-50 p-6 text-center text-sm text-slate-600 sm:col-span-2 lg:col-span-3">
                  No products found for "{searchTerm}".
                </div>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-indigo-300/30 bg-white p-5 text-slate-900 shadow-xl lg:col-span-2">
            <h3 className="text-base font-semibold">Why Shop With Us</h3>
            <ul className="mt-4 grid grid-cols-1 gap-2 text-sm text-slate-700 sm:grid-cols-3">
              {benefits.map((item) => (
                <li key={item} className="rounded-md border border-indigo-100 bg-indigo-50 px-3 py-3">
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